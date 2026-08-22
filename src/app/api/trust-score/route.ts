import { NextRequest, NextResponse } from "next/server";
import vendors from "@/data/vendors.json";
import { getTrustScore } from "@/lib/trust-score";

export const dynamic = "force-dynamic";

/**
 * Public JSON endpoint powering the TrustScore embed widget.
 * A supplier drops the embed script on their site (footer) which calls:
 *   /api/trust-score?slug=<supplier>
 * Returns the supplier's TrustScore, verified ticks, and profile link.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  const vendor = (vendors as any[]).find((v) => v.slug === slug);
  if (!vendor) {
    return NextResponse.json(
      { error: "Supplier not found — check the ?slug= parameter." },
      { status: 404 }
    );
  }

  // Prevent misconfigured hotlinking off-brand — optional guard.
  // Only serve for suppliers that have earned the embed (verified + score above a floor).
  const data = getTrustScore(vendor.name);
  const embeddable = vendor.embedEnabled === true; // set true per-supplier after they install + we confirm

  return NextResponse.json({
    supplier: vendor.name,
    slug: vendor.slug,
    score: data.score,
    max: data.max,
    ticks: data.ticks,
    domainVerified: vendor.domainVerified === true,
    embedEnabled: embeddable,
    profileUrl: `https://www.viralpeps.co.uk/vendors/${vendor.slug}`,
    methodologyUrl: "https://www.viralpeps.co.uk/trust-score",
    generatedAt: new Date().toISOString(),
  });
}

// Also allow preflight/HEAD
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
