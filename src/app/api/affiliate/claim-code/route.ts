import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { ensureAffiliateSchema, hashToken, newServerToken } from "@/lib/affiliate";
import { findSellerBySession } from "@/lib/seller-auth";

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
 * Resolve the caller from the seller session cookie.
 *
 * A supplier must only ever mint a code for their OWN store, so the slug in
 * the body is checked against the session rather than trusted.
 */
async function callerSlug(request: NextRequest): Promise<{ slug: string } | null> {
  const token =
    request.cookies.get("vp_seller_session")?.value ??
    (await cookies()).get("vp_seller_session")?.value ??
    null;
  const seller = await findSellerBySession(token ?? null);
  if (!seller) return null;
  return { slug: seller.slug };
}

/**
 * POST /api/affiliate/claim-code
 *
 * Mints a single-use install code for the logged-in supplier. The code is
 * returned once and never stored in plaintext.
 *
 * Returns: { ok, claim_code, expires_at, vendor_slug, ttl_hours }
 */
export async function POST(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const who = await callerSlug(request);
    if (!who) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const slug = who.slug;

    const q = await sql`SELECT slug, active FROM sellers WHERE slug = ${slug}`;
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
 * Rotates the store token for the logged-in supplier. The old token stops
 * working immediately — the recovery path if a token leaks.
 */
export async function PUT(request: NextRequest) {
  try {
    await ensureAffiliateSchema();

    const who = await callerSlug(request);
    if (!who) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const token = newServerToken();
    await sql`
      UPDATE sellers
      SET postback_token_hash = ${hashToken(token)},
          postback_token_hint = ${hintFor(token)}
      WHERE slug = ${who.slug}
    `;

    return NextResponse.json({
      ok: true,
      token,
      token_hint: hintFor(token),
      vendor_slug: who.slug,
      warning: "Put this in the plugin now; the old token no longer works.",
    });
  } catch (err) {
    console.error("[claim-code:rotate] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
