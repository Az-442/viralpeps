import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  OWNER_COOKIE,
  OWNER_SESSION_DAYS,
  countOwners,
  ensureOwnerTable,
  findOwnerByEmail,
  hashPassword,
  newSessionToken,
  verifyPassword,
} from "@/lib/owner-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/owner/login
//   { email, password }  → sign in
//   { setup: true, email, password, name } → create the FIRST owner only.
//     Once any owner exists, setup returns 409 forever. This is the only way
//     an owner row is created; there is no public registration.
export async function POST(request: NextRequest) {
  try {
    await ensureOwnerTable();
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");
    const wantsSetup = body?.setup === true;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password required" },
        { status: 400 },
      );
    }
    if (password.length < 12) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 12 characters" },
        { status: 400 },
      );
    }

    // ---- first-run setup -------------------------------------------------
    if (wantsSetup) {
      const existing = await countOwners();
      if (existing > 0) {
        return NextResponse.json(
          { ok: false, error: "Owner account already exists" },
          { status: 409 },
        );
      }
      const name = String(body?.name ?? "Owner").trim() || "Owner";
      const hash = hashPassword(password);
      const r = await sql`
        INSERT INTO owners (email, name, password_hash)
        VALUES (${email}, ${name}, ${hash})
        RETURNING id, email, name
      `;
      const owner = r.rows[0] as { id: number; email: string; name: string };
      return NextResponse.json({ ok: true, created: true, email: owner.email });
    }

    // ---- normal sign-in --------------------------------------------------
    const owner = await findOwnerByEmail(email);
    if (!owner || !owner.password_hash || !verifyPassword(password, owner.password_hash)) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }
    if (!owner.active) {
      return NextResponse.json({ ok: false, error: "Account disabled" }, { status: 403 });
    }

    const token = newSessionToken();
    await sql`
      UPDATE owners
      SET session_token = ${token},
          session_expires = now() + (${OWNER_SESSION_DAYS} || ' days')::interval,
          last_login_at = now()
      WHERE id = ${owner.id}
    `;

    const res = NextResponse.json({ ok: true, email: owner.email, name: owner.name });
    res.cookies.set(OWNER_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * OWNER_SESSION_DAYS,
    });
    return res;
  } catch (err) {
    console.error("[owner/login] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
