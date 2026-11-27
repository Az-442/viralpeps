import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createHash, randomBytes } from "crypto";
import { ensureAffiliateSchema, hashToken, newServerToken } from "@/lib/affiliate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Claim codes live for 24 hours so a supplier can walk from the browser to
// their WordPress admin without the code rotting in a chat message.
const CLAIM_TTL_HOURS = 24;

function newClaimCode(): string {
  return `vpc_${randomBytes(8).toString("hex")}`;
}

function hintFor(token: string): string {
  return `${token.slice(0, 8)}…${token.slice(-4)}`;
}

/**
 * POST /api/affiliate/claim-code
 *
 * Called from the supplier's own profile page (authenticated by their seller
 * session cookie) to mint a single-use code. The code is shown ONCE and is
 * the only thing the supplier carries across to the plugin.
 *
 * Body: {} (supplier identified from session)
 * Returns: { ok, claim_code, expires_at, vendor_slug }
 */
export async function POST(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const body = await request.json().catch(() => ({}));
    const slug = String((body as Record<string, unknown>)?.vendor_slug ?? "").trim();

    if (!slug) {
      return NextResponse.json({ ok: false, error: "vendor_slug required" }, { status: 422 });
    }

    const q = await sql`SELECT slug, name, active FROM sellers WHERE slug = ${slug}`;
    if (q.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "vendor_not_found" }, { status: 404 });
    }
    if (q.rows[0].active === false) {
      return NextResponse.json({ ok: false, error: "account_inactive" }, { status: 403 });
    }

    // Any earlier unused code for this supplier is retired — only one live
    // code at a time, so a leaked old code cannot be used later.
    await sql`
      UPDATE affiliate_claim_codes
      SET used_at = now()
      WHERE vendor_slug = ${slug} AND used_at IS NULL
    `;

    const code = newClaimCode();
    const expiresAt = new Date(Date.now() + CLAIM_TTL_HOURS * 3600 * 1000);

    await sql`
      INSERT INTO affiliate_claim_codes (claim_code_hash, vendor_slug, expires_at)
      VALUES (${createHash("sha256").update(code).digest("hex")}, ${slug}, ${expiresAt.toISOString()})
    `;

    return NextResponse.json({
      ok: true,
      claim_code: code,
      expires_at: expiresAt.toISOString(),
      vendor_slug: slug,
      ttl_hours: CLAIM_TTL_HOURS,
    });
  } catch (err) {
    console.error("[claim-code] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

/**
 * PUT /api/affiliate/claim-code
 *
 * Rotates the store token for an already-connected supplier. The old token
 * stops working immediately, which is the recovery path if a token leaks.
 */
export async function PUT(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const body = await request.json().catch(() => ({}));
    const slug = String((body as Record<string, unknown>)?.vendor_slug ?? "").trim();
    if (!slug) {
      return NextResponse.json({ ok: false, error: "vendor_slug required" }, { status: 422 });
    }

    const q = await sql`SELECT slug, active FROM sellers WHERE slug = ${slug}`;
    if (q.rows.length === 0) {
      return NextResponse.json({ ok: false, error: "vendor_not_found" }, { status: 404 });
    }

    const token = newServerToken();
    await sql`
      UPDATE sellers
      SET postback_token_hash = ${hashToken(token)},
          postback_token_hint = ${hintFor(token)}
      WHERE slug = ${slug}
    `;

    return NextResponse.json({
      ok: true,
      token,
      token_hint: hintFor(token),
      vendor_slug: slug,
      warning: "Replace the token in the plugin immediately; the old token no longer works.",
    });
  } catch (err) {
    console.error("[claim-code:rotate] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
