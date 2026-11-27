import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { findSellerByEmail, verifyPassword } from "@/lib/seller-auth";
import { createSession, SESSION_MAX_AGE } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/login — email + password → session cookie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
    }

    const seller = await findSellerByEmail(email);
    if (!seller || !seller.password_hash || !verifyPassword(password, seller.password_hash)) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }
    if (!seller.active) {
      return NextResponse.json({ ok: false, error: "Account pending approval" }, { status: 403 });
    }

    // Sessions live in their own table so logging in here never evicts a live
    // session in another browser (that was causing constant sign-outs).
    const token = await createSession("seller", seller.id);

    const res = NextResponse.json({ ok: true, slug: seller.slug, name: seller.name });
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE.seller,
    });
    return res;
  } catch (err) {
    console.error("[sellers/login] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}

