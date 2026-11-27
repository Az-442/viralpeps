import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { OWNER_COOKIE } from "@/lib/owner-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/owner/logout — revoke the session server-side and clear the cookie.
export async function POST(request: NextRequest) {
  const token = request.cookies.get(OWNER_COOKIE)?.value ?? null;
  if (token) {
    try {
      await sql`UPDATE owners SET session_token = NULL, session_expires = NULL WHERE session_token = ${token}`;
    } catch {
      /* table may not exist yet — cookie is cleared regardless */
    }
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
