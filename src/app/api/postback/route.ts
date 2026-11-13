import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Commission defaults to 20% unless the seller row overrides it.
const DEFAULT_COMMISSION_PCT = 20;

// POST /api/postback — fired by a seller's checkout on a completed sale.
// Body: {
//   vendor_slug: string (required),
//   order_id:    string (required, unique — dedup key),
//   order_value: number (required, net order value),
//   customer_type?: "new" | "existing",
//   vpid?:        number  (optional click id for attribution),
//   secret:       string  (required, matches POSTBACK_SECRET)
// }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendor_slug, order_id, order_value, customer_type, vpid, secret } = body || {};

    // --- Auth ---
    if (!process.env.POSTBACK_SECRET || secret !== process.env.POSTBACK_SECRET) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    // --- Validate ---
    if (!vendor_slug || typeof vendor_slug !== "string") {
      return NextResponse.json({ ok: false, error: "vendor_slug required" }, { status: 400 });
    }
    if (!order_id || typeof order_id !== "string") {
      return NextResponse.json({ ok: false, error: "order_id required" }, { status: 400 });
    }
    const value = Number(order_value);
    if (!Number.isFinite(value) || value <= 0) {
      return NextResponse.json({ ok: false, error: "order_value must be a positive number" }, { status: 400 });
    }
    const ct = customer_type === "existing" ? "existing" : customer_type === "new" ? "new" : null;

    // --- Commission rate (seller override, else default) ---
    let pct = DEFAULT_COMMISSION_PCT;
    try {
      const seller = await sql`SELECT commission_rate FROM sellers WHERE slug = ${vendor_slug}`;
      if ((seller.rowCount ?? 0) > 0 && seller.rows[0].commission_rate != null) {
        pct = Number(seller.rows[0].commission_rate);
      }
    } catch {
      // sellers table lookup is best-effort; fall back to default
    }

    const commission = Math.round(value * pct) / 100; // value * pct%, rounded to 2dp

    // --- Dedup + insert (order_id is UNIQUE) ---
    const res = await sql`
      INSERT INTO sales (vendor_slug, order_id, order_value, currency, customer_type, commission_amount, click_id)
      VALUES (${vendor_slug}, ${order_id}, ${value}, 'GBP', ${ct}, ${commission}, ${vpid ?? null})
      ON CONFLICT (order_id) DO NOTHING
      RETURNING id
    `;

    if (res.rowCount === 0) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    return NextResponse.json({ ok: true, sale_id: res.rows[0].id, commission });
  } catch (err) {
    console.error("[postback] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
