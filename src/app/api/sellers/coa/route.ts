import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/coa — upsert a per-product COA record for the logged-in seller.
export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);
  if (!seller) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const compoundSlug = typeof body?.compoundSlug === "string" ? body.compoundSlug.trim() : "";
  const dosage = typeof body?.dosage === "string" ? body.dosage.trim() : "";
  const labTested = body?.labTested === true;
  const provider = typeof body?.provider === "string" ? body.provider.slice(0, 200) : null;
  const coaUrl = typeof body?.coaUrl === "string" ? body.coaUrl.slice(0, 1000) : null;

  if (!compoundSlug) {
    return NextResponse.json({ ok: false, error: "compoundSlug required" }, { status: 400 });
  }

  await sql`
    INSERT INTO coas (vendor_slug, compound_slug, dosage, lab_tested, provider, coa_url)
    VALUES (${seller.slug}, ${compoundSlug}, ${dosage}, ${labTested}, ${provider}, ${coaUrl})
    ON CONFLICT (vendor_slug, compound_slug, dosage)
    DO UPDATE SET lab_tested = EXCLUDED.lab_tested, provider = EXCLUDED.provider, coa_url = EXCLUDED.coa_url, updated_at = now()
  `;

  return NextResponse.json({ ok: true });
}
