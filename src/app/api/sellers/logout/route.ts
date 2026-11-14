import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/logout — clear session (HTML form posts here)
export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  if (token) {
    await sql`UPDATE sellers SET session_token = NULL WHERE session_token = ${token}`;
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
