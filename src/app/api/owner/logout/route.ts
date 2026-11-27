import { NextRequest, NextResponse } from "next/server";
import { OWNER_COOKIE } from "@/lib/owner-auth";
import { revokeSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/owner/logout — revoke the session server-side and clear the cookie.
export async function POST(request: NextRequest) {
  const token = request.cookies.get(OWNER_COOKIE)?.value ?? null;
  await revokeSession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
