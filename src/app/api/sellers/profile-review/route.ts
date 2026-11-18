import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Profile review — admin approval gate for score-affecting self-claims.
// A supplier's entity_type / payment_method claim lands in review_status='pending'
// and only touches the score after the owner approves it here.

// GET /api/sellers/profile-review — list pending (and recently decided) reviews.
export async function GET() {
  try {
    const r = await sql`
      SELECT
        p.seller_slug AS slug,
        s.name,
        s.email,
        p.entity_type,
        p.payment_method,
        p.entity_type_verified,
        p.payment_method_verified,
        p.review_status,
        p.updated_at
      FROM seller_profiles p
      JOIN sellers s ON s.slug = p.seller_slug
      WHERE p.review_status IS NOT NULL AND p.review_status <> 'none'
      ORDER BY
        CASE p.review_status WHEN 'pending' THEN 0 ELSE 1 END,
        p.updated_at DESC
    `;
    const rows = (r.rows as Record<string, unknown>[]).map((x) => ({
      slug: String(x.slug ?? ""),
      name: String(x.name ?? ""),
      email: String(x.email ?? ""),
      entityType: (x.entity_type as string) ?? null,
      paymentMethod: (x.payment_method as string) ?? null,
      entityTypeVerified: (x.entity_type_verified as string) ?? null,
      paymentMethodVerified: (x.payment_method_verified as string) ?? null,
      status: (x.review_status as string) ?? null,
      updatedAt: x.updated_at ? String(x.updated_at) : null,
    }));
    return NextResponse.json({ ok: true, reviews: rows });
  } catch (err) {
    console.error("[profile-review] list error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}

// POST /api/sellers/profile-review — { slug, action: "approve" | "reject" }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = String(body?.slug ?? "").trim();
    const action = String(body?.action ?? "").trim();

    if (!slug || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ ok: false, error: "slug + action (approve|reject) required" }, { status: 400 });
    }

    if (action === "reject") {
      await sql`UPDATE seller_profiles SET review_status = 'rejected', updated_at = now() WHERE seller_slug = ${slug}`;
      return NextResponse.json({ ok: true });
    }

    // Approve: promote the pending claim into the verified fields that feed the score.
    await sql`
      UPDATE seller_profiles
      SET review_status = 'approved',
          entity_type_verified = entity_type,
          payment_method_verified = payment_method,
          updated_at = now()
      WHERE seller_slug = ${slug}
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[profile-review] action error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
