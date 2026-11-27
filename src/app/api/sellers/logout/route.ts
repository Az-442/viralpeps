import { NextRequest, NextResponse } from "next/server";
import { revokeSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/logout — clear session (HTML form posts here)
export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  await revokeSession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
