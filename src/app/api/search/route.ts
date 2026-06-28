import { NextRequest, NextResponse } from "next/server";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ compounds: [], vendors: [] });
  }

  const matchedCompounds = compounds
    .filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.aliases || []).some((a) => a.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    )
    .map(({ name, slug, category, aliases }) => ({ name, slug, category, aliases, type: "compound" }));

  const matchedVendors = vendors
    .filter((v) =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.categories.some((c) => c.toLowerCase().includes(q))
    )
    .map(({ name, slug, rating, verified }) => ({ name, slug, rating, verified, type: "vendor" }));

  return NextResponse.json({
    compounds: matchedCompounds,
    vendors: matchedVendors,
  });
}
