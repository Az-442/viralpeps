import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// Whitelist of self-edit fields (everything NOT gated behind admin verification).
const SELF_EDIT = new Set([
  "company_name",
  "contact_email",
  "contact_phone",
  "address",
  "ruo_statement",
  "shipping_info",
  "entity_type",
  "payment_method",
  "price_overrides",
]);

// PUT /api/sellers/profile — seller edits their own profile + TrustScore inputs.
// Body: { company_name?, contact_email?, ..., price_overrides?: { [compoundSlug]: { price, inStock } } }
export async function PUT(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);
  if (!seller) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  // Only accept whitelisted fields.
  const updates: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (SELF_EDIT.has(k)) updates[k] = v;
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: false, error: "no editable fields supplied" }, { status: 400 });
  }

  const existing = await sql`SELECT id FROM seller_profiles WHERE seller_slug = ${seller.slug}`;
  if ((existing.rowCount ?? 0) === 0) {
    await sql`
      INSERT INTO seller_profiles (seller_slug) VALUES (${seller.slug})
    `;
  }

  // Build a dynamic UPDATE from the whitelisted keys.
  const cols = Object.keys(updates);
  const sets = cols.map((c, i) => `${c} = $${i + 2}`).join(", ");
  const vals = cols.map((c) => updates[c]);
  const params = [seller.slug, ...vals];

  // Entity + payment are score-affecting and admin-gated: a new claim puts the
  // profile back into review and clears any prior verified value until approved.
  const isScoreClaim =
    updates.entity_type !== undefined || updates.payment_method !== undefined;
  const reviewClause = isScoreClaim
    ? `, review_status = 'pending', entity_type_verified = NULL, payment_method_verified = NULL`
    : "";

  await sql.query(
    `UPDATE seller_profiles SET ${sets}${reviewClause}, updated_at = now() WHERE seller_slug = $1`,
    params
  );

  return NextResponse.json({ ok: true, review: isScoreClaim ? "pending" : null });
}
