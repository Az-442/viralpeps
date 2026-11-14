import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// GET /api/sellers/me — return the logged-in seller (or 401)
export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);
  if (!seller) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  // Load profile (TrustScore inputs + company details + price overrides)
  const prof = await sql`SELECT * FROM seller_profiles WHERE seller_slug = ${seller.slug}`;
  const profile = prof.rows[0] ?? null;

  return NextResponse.json({
    ok: true,
    seller: {
      slug: seller.slug,
      name: seller.name,
      email: seller.email,
      commissionRate: seller.commission_rate == null ? null : Number(seller.commission_rate),
      apiKey: seller.api_key,
    },
    profile,
  });
}
