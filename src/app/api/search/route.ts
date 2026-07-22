import { NextRequest, NextResponse } from "next/server";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";
import { getVendorStats } from "@/data/vendor-stats";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ compounds: [], vendors: [] });
  }

  const matchedCompounds = compounds
    .filter((c) => !(c as any).compareSlug)
    .filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.aliases || []).some((a) => a.toLowerCase().includes(q)) ||
      (c.category || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    )
    .map(({ name, slug, category, aliases }) => ({ name, slug, category, aliases, type: "compound" }));

  const matchedVendors = vendors
    .filter((v) => {
      const stats = getVendorStats(v.name);
      return (
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        stats.categories.some((c: string) => c.toLowerCase().includes(q))
      );
    })
    .map(({ name, slug, rating, verified }) => ({ name, slug, rating, verified, type: "vendor" }));

  return NextResponse.json({
    compounds: matchedCompounds,
    vendors: matchedVendors,
  });
}
