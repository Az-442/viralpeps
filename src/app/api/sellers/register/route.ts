import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hashPassword, newApiKey, newBadgeToken } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/sellers/register — a supplier creates an account (pending owner approval).
// Body: { slug, name, email, password }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = String(body?.slug ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!slug || !name || !email || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "slug, name, email and a password (8+ chars) are required" },
        { status: 400 }
      );
    }

    const exists = await sql`SELECT id FROM sellers WHERE slug = ${slug} OR lower(email) = ${email}`;
    if ((exists.rowCount ?? 0) > 0) {
      return NextResponse.json({ ok: false, error: "A seller with that slug or email already exists" }, { status: 409 });
    }

    const hash = hashPassword(password);
    await sql`
      INSERT INTO sellers (slug, name, email, password_hash, commission_rate, active, api_key, badge_token)
      VALUES (${slug}, ${name}, ${email}, ${hash}, 20, true, ${newApiKey(slug)}, ${newBadgeToken()})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sellers/register] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
