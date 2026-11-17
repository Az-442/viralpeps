import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/sellers/approve-affiliate — owner approves a supplier's affiliate
// join request. Stamps affiliate_joined_at, after which that supplier's
// outbound clicks count as affiliate traffic.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = String(body?.slug ?? "").trim().toLowerCase();
    if (!slug) {
      return NextResponse.json({ ok: false, error: "slug required" }, { status: 400 });
    }
    await sql`UPDATE sellers SET affiliate_joined_at = now() WHERE slug = ${slug}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sellers/approve-affiliate] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
