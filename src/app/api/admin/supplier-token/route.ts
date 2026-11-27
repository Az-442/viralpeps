import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getOwnerFromRequest } from "@/lib/owner-auth";
import {
  ensureAffiliateSchema,
  hashToken,
  newServerToken,
} from "@/lib/affiliate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/supplier-token
 *
 * Issues or rotates a supplier's own server token for the affiliate network.
 * Owner-only. The plaintext token is returned ONCE and never stored — only its
 * SHA-256 hash is kept, so a database leak cannot be replayed against us.
 *
 * Body: { slug, rotate?: boolean }
 *   no token yet      → issues a fresh one
 *   rotate: true      → revokes the old one and issues a new one
 *   rotate omitted    → reports that a token already exists, reveals nothing
 */
export async function POST(request: NextRequest) {
  try {
    const owner = await getOwnerFromRequest({
      cookies: { get: (n: string) => request.cookies.get(n) },
    });
    if (!owner) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    await ensureAffiliateSchema();

    const body = await request.json().catch(() => null);
    const slug = String((body as Record<string, unknown>)?.slug ?? "").trim().toLowerCase();
    const rotate = (body as Record<string, unknown>)?.rotate === true;

    if (!slug) {
      return NextResponse.json({ ok: false, error: "slug required" }, { status: 400 });
    }

    const found = await sql`
      SELECT slug, name, postback_token_hash, postback_token_hint
      FROM sellers WHERE slug = ${slug}
    `;
    if ((found.rowCount ?? 0) === 0) {
      return NextResponse.json({ ok: false, error: "seller not found" }, { status: 404 });
    }
    const seller = found.rows[0];

    if (seller.postback_token_hash && !rotate) {
      return NextResponse.json({
        ok: true,
        already_issued: true,
        hint: seller.postback_token_hint,
        note: "A token already exists. Pass rotate:true to replace it — the old one stops working immediately.",
      });
    }

    const token = newServerToken();
    // Show the last 4 characters so the supplier can tell tokens apart without
    // us ever being able to recover the secret.
    const hint = `…${token.slice(-4)}`;

    await sql`
      UPDATE sellers
      SET postback_token_hash = ${hashToken(token)},
          postback_token_hint = ${hint}
      WHERE slug = ${slug}
    `;

    return NextResponse.json({
      ok: true,
      slug,
      name: seller.name,
      // Shown exactly once. Never logged, never stored.
      server_token: token,
      hint,
      warning: "Copy this now — it cannot be shown again. Store it server-side only.",
    });
  } catch (err) {
    console.error("[admin/supplier-token] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
