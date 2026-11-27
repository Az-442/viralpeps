import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { newApiKey, newBadgeToken } from "@/lib/seller-auth";
import { getOwnerFromRequest } from "@/lib/owner-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/claim-listing/decide — { id, action: "approve" | "reject" }
// Approve creates the seller account (active, with api_key + badge_token) from the claim.
export async function POST(request: NextRequest) {
  // ── OWNER GATE ──────────────────────────────────────────────────────────
  // Approving a claim mints a live seller account with API + badge tokens.
  // Owner-only.
  const owner = await getOwnerFromRequest(request);
  if (!owner) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }
  // ────────────────────────────────────────────────────────────────────────
  try {
    const body = await request.json();
    const id = Number(body?.id);
    const action = String(body?.action ?? "").trim();

    if (!Number.isInteger(id) || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ ok: false, error: "id + action (approve|reject) required" }, { status: 400 });
    }

    const claim = await sql`SELECT id, slug, name, email, password_hash, status FROM listing_claims WHERE id = ${id}`;
    if (claim.rowCount === 0) {
      return NextResponse.json({ ok: false, error: "Claim not found" }, { status: 404 });
    }
    const c = claim.rows[0];
    if (c.status !== "pending") {
      return NextResponse.json({ ok: false, error: `Claim already ${c.status}` }, { status: 409 });
    }

    if (action === "reject") {
      await sql`UPDATE listing_claims SET status = 'rejected' WHERE id = ${id}`;
      return NextResponse.json({ ok: true });
    }

    // Approve: guard against a seller account appearing since the claim was made.
    const owner = await sql`SELECT id FROM sellers WHERE slug = ${c.slug}`;
    if ((owner.rowCount ?? 0) > 0) {
      return NextResponse.json({ ok: false, error: "This listing already has an owner account" }, { status: 409 });
    }

    await sql`
      INSERT INTO sellers (slug, name, email, password_hash, commission_rate, active, api_key, badge_token)
      VALUES (${c.slug}, ${c.name}, ${c.email}, ${c.password_hash}, 20, true, ${newApiKey(c.slug)}, ${newBadgeToken()})
    `;
    await sql`UPDATE listing_claims SET status = 'approved' WHERE id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[claim-listing/decide] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
