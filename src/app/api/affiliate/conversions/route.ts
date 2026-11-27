import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  commissionBase,
  commissionFor,
  ensureAffiliateSchema,
  hashToken,
  tokenMatches,
  withinAttributionWindow,
  type ConversionItem,
  type ConversionStatus,
  type IgnoreReason,
} from "@/lib/affiliate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUSES: ConversionStatus[] = [
  "pending",
  "completed",
  "refunded",
  "cancelled",
  "failed",
];

/**
 * POST /api/affiliate/conversions
 *
 * The supplier's store calls this on every referred order — not only on
 * completion. Idempotent per (supplier, order_id), so a retry after a timeout
 * updates rather than duplicates.
 *
 * Auth: X-Affiliate-Token header carrying the supplier's own server token.
 * There is deliberately no shared secret — one leaked key must never
 * compromise another supplier's data.
 *
 * Body:
 *   order_id      string  (required, <= 191 chars)
 *   status        "pending" | "completed" | "refunded" | "cancelled" | "failed"
 *   subtotal      number  what the customer paid for goods, inc tax, ex shipping
 *   total         number  full order total, reference only
 *   refunded_amount number amount refunded so far
 *   currency      string  3-letter code
 *   click_ref     string  the click id we issued, from the referral parameter
 *   customer_ref  string  sha256(lowercased trimmed email)
 *   items         array   [{ sku, name, quantity, price }] up to 100
 *   occurred_at   string  ISO 8601, for replaying historical orders
 *   source        string  short platform label
 *   test          boolean validate and report, write nothing
 *
 * Responses:
 *   201 first record          { conversion_status, commission, matures_at }
 *   200 updated / ignored     { ok, ignored?, reason? }
 *   401 bad token
 *   422 validation failed     { ok:false, field }
 *   429 rate limited
 */
export async function POST(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const raw = request.headers.get("x-affiliate-token") ?? "";
    const token = raw.trim();

    // ---- auth -----------------------------------------------------------
    // A client-side token must never be accepted here: it can report and
    // retract sales.
    if (!token || token.startsWith("vpck_")) {
      return NextResponse.json(
        { ok: false, error: "unauthorized", detail: "server token required" },
        { status: 401 }
      );
    }

    const tokenHash = hashToken(token);
    const sellerQ = await sql`
      SELECT slug, name, commission_rate, postback_token_hash, active
      FROM sellers
      WHERE postback_token_hash IS NOT NULL
    `;
    const seller = sellerQ.rows.find(
      (r) => r.postback_token_hash && tokenMatches(token, String(r.postback_token_hash))
    );
    // Belt and braces: the query above cannot use the hash index, so also try
    // a direct lookup. Cheap, and it keeps the constant-time path honest.
    const direct = seller
      ? null
      : (
          await sql`SELECT slug, name, commission_rate, postback_token_hash, active
                    FROM sellers WHERE postback_token_hash = ${tokenHash}`
        ).rows[0];
    const who = seller ?? direct;

    if (!who) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    if (who.active === false) {
      return NextResponse.json(
        { ok: false, error: "account_inactive" },
        { status: 401 }
      );
    }

    const vendorSlug = String(who.slug);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid json" }, { status: 422 });
    }
    const b = body as Record<string, unknown>;

    // ---- validate -------------------------------------------------------
    const orderId = String(b.order_id ?? "").trim();
    if (!orderId) {
      return NextResponse.json({ ok: false, field: "order_id", error: "required" }, { status: 422 });
    }
    if (orderId.length > 191) {
      return NextResponse.json(
        { ok: false, field: "order_id", error: "max 191 characters" },
        { status: 422 }
      );
    }

    const status: ConversionStatus = VALID_STATUSES.includes(b.status as ConversionStatus)
      ? (b.status as ConversionStatus)
      : "completed";

    const currency = String(b.currency ?? "GBP").toUpperCase().slice(0, 3) || "GBP";
    const isTest = b.test === true;

    // ---- idempotency: has this supplier already reported this order? -----
    const existingQ = await sql`
      SELECT id, status, subtotal, refunded_amount, commission_amount,
             customer_type, ignored_reason
      FROM sales WHERE vendor_slug = ${vendorSlug} AND order_id = ${orderId}
    `;
    const existing = existingQ.rows[0] ?? null;

    // ---- eligibility (only judged on the FIRST report of an order) ------
    let reason: IgnoreReason | null = null;
    let clickId: number | null = null;
    let customerType: "new" | "existing" | null = null;

    if (!existing) {
      const clickRef = String(b.click_ref ?? "").trim();
      const customerRef = String(b.customer_ref ?? "").trim().toLowerCase();

      if (clickRef) {
        // Our click ids are numeric (clicks.id). A ref that is not one of ours
        // is treated as not-referred rather than trusted.
        const numeric = /^\d+$/.test(clickRef) ? Number(clickRef) : NaN;
        if (Number.isFinite(numeric)) {
          const clickQ = await sql`
            SELECT id, created_at, is_bot FROM clicks
            WHERE id = ${numeric} AND vendor_slug = ${vendorSlug}
          `;
          const click = clickQ.rows[0];
          if (click && click.is_bot !== true) {
            if (withinAttributionWindow(click.created_at)) {
              clickId = Number(click.id);
            } else {
              reason = "outside_attribution_window";
            }
          } else {
            reason = "not_referred";
          }
        } else {
          reason = "not_referred";
        }
      }

      // No usable click — but a customer we introduced before still counts
      // (lifetime commission), which is what makes repeat orders payable.
      if (!reason && !clickId && customerRef) {
        const priorQ = await sql`
          SELECT 1 FROM sales
          WHERE vendor_slug = ${vendorSlug} AND customer_ref = ${customerRef}
            AND customer_type = 'new' AND status IN ('pending','completed')
          LIMIT 1
        `;
        if (priorQ.rows.length > 0) customerType = "existing";
      }

      if (!reason && !clickId && !customerType) {
        reason = "not_referred";
      }
      if (!reason && clickId && !customerType) {
        customerType = "new";
      }
      if (!reason && !clickId && customerType === "existing") {
        // Lifetime customer: payable, but no click to bind.
        customerType = "existing";
      }
    }

    const occurredAt = b.occurred_at ? new Date(String(b.occurred_at)) : new Date();
    const safeOccurred = isNaN(occurredAt.getTime()) ? new Date() : occurredAt;
    const safeOccurredDate = safeOccurred.toISOString();

    // ---- test mode: report what WOULD happen, write nothing -------------
    if (isTest) {
      const base = commissionBase(b.items as ConversionItem[] | undefined, b.subtotal);
      return NextResponse.json({
        ok: true,
        status: "test",
        outcome: reason ? "would_ignore" : "would_record",
        reason: reason ?? undefined,
        would_be_customer_type: customerType ?? undefined,
        commission_base: base ?? undefined,
        commission: base && !reason ? commissionFor(base, Number(who.commission_rate ?? 20)) : 0,
        note: "test flag set — nothing recorded",
      });
    }

    // ---- rejected / ignored orders are stored, never charged ------------
    if (reason && reason !== "outside_attribution_window") {
      // Store the fact so the supplier can see why, and so a replay does not
      // resurrect a written-off order.
      await sql`
        INSERT INTO sales (vendor_slug, order_id, order_value, currency, status,
                           commission_amount, ignored_reason, customer_ref, source, occurred_at)
        VALUES (${vendorSlug}, ${orderId}, 0, ${currency}, ${status}, 0, ${reason},
                ${String(b.customer_ref ?? "").toLowerCase() || null},
                ${String(b.source ?? "api").slice(0, 32)},
                ${safeOccurredDate})
        ON CONFLICT (vendor_slug, order_id) DO NOTHING
      `;
      return NextResponse.json({ ok: true, ignored: true, reason });
    }

    // ---- commission -----------------------------------------------------
    const pct = Number(who.commission_rate ?? 20);
    const refundedAmount = Math.max(0, Number(b.refunded_amount ?? 0) || 0);

    // On a refund we keep the ORIGINAL base and simply stop paying on the
    // refunded part. Never recompute from a fresh payload that may omit items.
    const storedBase = existing?.subtotal != null ? Number(existing.subtotal) : null;
    const base =
      status === "refunded" || status === "cancelled" || storedBase !== null
        ? (storedBase ?? commissionBase(b.items as ConversionItem[] | undefined, b.subtotal))
        : commissionBase(b.items as ConversionItem[] | undefined, b.subtotal);

    if (base === null || base <= 0) {
      return NextResponse.json(
        { ok: false, field: "subtotal", error: "subtotal or items required" },
        { status: 422 }
      );
    }

    // A refund or cancellation owes nothing; a pending order has not earned
    // anything yet; only completed earns commission.
    const effectiveRefunded =
      status === "refunded" || status === "cancelled" ? base : refundedAmount;
    const commission =
      status === "pending" || status === "failed"
        ? 0
        : commissionFor(base, pct, effectiveRefunded);


    // ---- upsert ---------------------------------------------------------
    if (existing) {
      await sql`
        UPDATE sales SET
          status = ${status},
          subtotal = ${base},
          order_value = ${base},
          refunded_amount = ${effectiveRefunded},
          commission_amount = ${commission},
          currency = ${currency},
          customer_ref = COALESCE(${String(b.customer_ref ?? "").toLowerCase() || null}, customer_ref),
          source = COALESCE(${String(b.source ?? "").slice(0, 32) || null}, source),
          occurred_at = COALESCE(occurred_at, ${safeOccurredDate}),
          updated_at = now()
        WHERE id = ${existing.id}
      `;

      return NextResponse.json({
        ok: true,
        updated: true,
        conversion_status: status,
        commission,
        commission_base: base,
        // Commission only becomes invoiceable after the approval hold.
        matures_at:
          status === "completed"
            ? new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
            : null,
      });
    }

    const inserted = await sql`
      INSERT INTO sales (vendor_slug, order_id, order_value, subtotal, currency,
                         customer_type, commission_amount, status, refunded_amount,
                         click_id, customer_ref, source, occurred_at)
      VALUES (${vendorSlug}, ${orderId}, ${base}, ${base}, ${currency},
              ${customerType}, ${commission}, ${status}, ${effectiveRefunded},
              ${clickId}, ${String(b.customer_ref ?? "").toLowerCase() || null},
              ${String(b.source ?? "api").slice(0, 32)}, ${safeOccurredDate})
      ON CONFLICT (vendor_slug, order_id) DO NOTHING
      RETURNING id
    `;

    if ((inserted.rowCount ?? 0) === 0) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    return NextResponse.json(
      {
        ok: true,
        conversion_status: status,
        sale_id: inserted.rows[0].id,
        commission,
        commission_base: base,
        customer_type: customerType,
        matures_at:
          status === "completed"
            ? new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString()
            : null,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[affiliate/conversions] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
