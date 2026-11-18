import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hashPassword } from "@/lib/seller-auth";
import vendors from "@/data/vendors.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Vendor = { slug: string; name: string; website?: string };

function emailDomain(email: string): string {
  return (email.split("@")[1] || "").toLowerCase().trim();
}

function siteDomain(website?: string): string {
  if (!website) return "";
  try {
    // Accept "ukpeptides.com" or "https://www.ukpeptides.com/path"
    const withProto = website.includes("://") ? website : `https://${website}`;
    const host = new URL(withProto).hostname.replace(/^www\./, "").toLowerCase();
    return host;
  } catch {
    return website.replace(/^www\./, "").toLowerCase();
  }
}

// Ownership signal: the claimant's email domain matches the listing's site domain.
function domainMatches(email: string, website?: string): boolean {
  const ed = emailDomain(email);
  const sd = siteDomain(website);
  if (!ed || !sd) return false;
  return ed === sd || ed.endsWith(`.${sd}`);
}

// POST /api/claim-listing — a supplier claims an existing listing (pending approval).
// Body: { slug, email, password }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const slug = String(body?.slug ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    const vendor = (vendors as Vendor[]).find((v) => v.slug === slug);
    if (!vendor) {
      return NextResponse.json({ ok: false, error: "Unknown listing" }, { status: 404 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ ok: false, error: "Password must be 8+ characters" }, { status: 400 });
    }

    // Block if a seller account already owns this slug.
    const owner = await sql`SELECT id FROM sellers WHERE slug = ${slug}`;
    if ((owner.rowCount ?? 0) > 0) {
      return NextResponse.json({ ok: false, error: "This listing already has an owner" }, { status: 409 });
    }

    // Block duplicate pending claims for the same slug.
    const dup = await sql`SELECT id FROM listing_claims WHERE slug = ${slug} AND status = 'pending'`;
    if ((dup.rowCount ?? 0) > 0) {
      return NextResponse.json({ ok: false, error: "A claim for this listing is already awaiting review" }, { status: 409 });
    }

    const match = domainMatches(email, vendor.website);
    const hash = hashPassword(password);
    await sql`
      INSERT INTO listing_claims (slug, name, email, password_hash, email_domain_match, status)
      VALUES (${slug}, ${vendor.name}, ${email}, ${hash}, ${match}, 'pending')
    `;

    return NextResponse.json({ ok: true, domainMatch: match });
  } catch (err) {
    console.error("[claim-listing] submit error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}

// GET /api/claim-listing — list claims (admin).
export async function GET() {
  try {
    const r = await sql`
      SELECT id, slug, name, email, email_domain_match, status, created_at
      FROM listing_claims
      ORDER BY
        CASE status WHEN 'pending' THEN 0 ELSE 1 END,
        created_at DESC
    `;
    const rows = (r.rows as Record<string, unknown>[]).map((x) => ({
      id: Number(x.id),
      slug: String(x.slug ?? ""),
      name: String(x.name ?? ""),
      email: String(x.email ?? ""),
      domainMatch: x.email_domain_match === true,
      status: String(x.status ?? "pending"),
      createdAt: x.created_at ? String(x.created_at) : null,
    }));
    return NextResponse.json({ ok: true, claims: rows });
  } catch (err) {
    console.error("[claim-listing] list error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
