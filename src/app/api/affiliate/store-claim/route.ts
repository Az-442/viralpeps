import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createHash } from "crypto";
import { ensureAffiliateSchema, hashToken, newServerToken } from "@/lib/affiliate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hintFor(token: string): string {
  return `${token.slice(0, 8)}…${token.slice(-4)}`;
}

/**
 * POST /api/affiliate/store-claim
 *
 * The WordPress plugin calls this with the claim code the supplier was given.
 * It exchanges the single-use code for that store's own server token.
 *
 * This endpoint is UNAUTHENTICATED by design — the claim code IS the
 * credential. It is single-use, expires in 24 hours, and is stored only as a
 * SHA-256 hash, so possessing it is the same thing as being the supplier
 * mid-setup. Nothing else about the network is readable through it.
 *
 * Body:
 *   claim_code  string  (required) vpc_xxxxxxxxxxxxxxxx
 *   store_url   string  (optional) recorded for the supplier's records
 *   store_name  string  (optional)
 *   platform    string  (optional) woocommerce | shopify | ...
 *   plugin_ver  string  (optional)
 *
 * Returns:
 *   200 { ok:true, token, token_hint, vendor_slug }
 *   400 { ok:false, reason:"invalid_claim_code"|"claim_code_expired"|"claim_code_used" }
 *   403 { ok:false, reason:"account_inactive" }
 */
export async function POST(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, reason: "invalid_claim_code" }, { status: 400 });
    }
    const b = body as Record<string, unknown>;

    const code = String(b.claim_code ?? "").trim();
    if (!code || !code.startsWith("vpc_")) {
      return NextResponse.json({ ok: false, reason: "invalid_claim_code" }, { status: 400 });
    }

    const codeHash = createHash("sha256").update(code).digest("hex");

    const q = await sql`
      SELECT id, vendor_slug, expires_at, used_at
      FROM affiliate_claim_codes
      WHERE claim_code_hash = ${codeHash}
    `;
    const row = q.rows[0];
    if (!row) {
      return NextResponse.json({ ok: false, reason: "invalid_claim_code" }, { status: 400 });
    }
    if (row.used_at) {
      return NextResponse.json({ ok: false, reason: "claim_code_used" }, { status: 400 });
    }
    if (new Date(row.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ ok: false, reason: "claim_code_expired" }, { status: 400 });
    }

    const slug = String(row.vendor_slug);
    const sellerQ = await sql`SELECT slug, name, active FROM sellers WHERE slug = ${slug}`;
    const seller = sellerQ.rows[0];
    if (!seller) {
      return NextResponse.json({ ok: false, reason: "vendor_not_found" }, { status: 400 });
    }
    if (seller.active === false) {
      return NextResponse.json({ ok: false, reason: "account_inactive" }, { status: 403 });
    }

    const token = newServerToken();
    const storeUrl = String(b.store_url ?? "").slice(0, 500);
    const storeName = String(b.store_name ?? "").slice(0, 200);
    const platform = String(b.platform ?? "woocommerce").slice(0, 50);
    const pluginVer = String(b.plugin_ver ?? "").slice(0, 50);

    // Burn the code and install the new token in one transaction-shaped pair
    // of statements. If the second fails the code is already spent, which
    // fails safe: the supplier simply generates a fresh one.
    await sql`
      UPDATE affiliate_claim_codes
      SET used_at = now(),
          store_url = ${storeUrl},
          store_name = ${storeName},
          platform = ${platform},
          plugin_version = ${pluginVer},
          used_ip = ${request.headers.get("x-forwarded-for") ?? null}
      WHERE id = ${row.id}
    `;

    await sql`
      UPDATE sellers
      SET postback_token_hash = ${hashToken(token)},
          postback_token_hint = ${hintFor(token)},
          postback_connected_at = now(),
          postback_store_url = ${storeUrl}
      WHERE slug = ${slug}
    `;

    return NextResponse.json({
      ok: true,
      token,
      token_hint: hintFor(token),
      vendor_slug: slug,
      vendor_name: seller.name ?? slug,
    });
  } catch (err) {
    console.error("[store-claim] error", err);
    return NextResponse.json({ ok: false, reason: "server_error" }, { status: 500 });
  }
}
