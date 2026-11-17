import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";
import { sendFormEmail } from "@/lib/smtp-send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/join-affiliate — seller requests to join the affiliate program.
// Records the request durably in Postgres, then best-effort emails the site owner.
export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);
  if (!seller) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const name = seller.name || seller.slug;

  // 1. Durable record — never lose a request.
  let recorded = false;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS affiliate_requests (
        id SERIAL PRIMARY KEY,
        seller_slug TEXT UNIQUE NOT NULL,
        seller_name TEXT,
        seller_email TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `;
    await sql`
      INSERT INTO affiliate_requests (seller_slug, seller_name, seller_email)
      VALUES (${seller.slug}, ${name}, ${seller.email ?? null})
      ON CONFLICT (seller_slug) DO NOTHING
    `;
    recorded = true;
  } catch (e) {
    console.warn("[join-affiliate] db write failed", e);
  }

  // 2. Best-effort email notification — only works once SMTP creds are valid.
  let emailed = false;
  try {
    const r = await sendFormEmail({
      subject: `Affiliate program join request — ${name}`,
      text: [
        "A supplier has requested to join the ViralPeps affiliate program.",
        "",
        `Supplier: ${name}`,
        `Slug: ${seller.slug}`,
        `Email: ${seller.email || "—"}`,
        `Commission rate: ${seller.commission_rate ?? 20}%`,
        "",
        "Action: review and onboard them to the affiliate program.",
      ].join("\n"),
    });
    emailed = r.ok;
  } catch (e) {
    console.warn("[join-affiliate] email failed", e);
  }

  return NextResponse.json({ ok: true, recorded, emailed });
}
