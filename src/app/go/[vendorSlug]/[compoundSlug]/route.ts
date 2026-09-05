import { NextRequest, NextResponse } from "next/server";
import compoundsData from "@/data/compounds.json";
import vendorsData from "@/data/vendors.json";
import { logClick } from "@/lib/click-logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vendorSlug: string; compoundSlug: string }> }
) {
  const { vendorSlug, compoundSlug } = await params;

  // 1. Find vendor by slug
  const vendor = (vendorsData as any[]).find((v) => v.slug === vendorSlug);
  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  // 2. Find compound by slug — try master (no compareSlug) first, then any variant
  let compound = (compoundsData as any[]).find(
    (c) => c.slug === compoundSlug && !c.compareSlug
  );
  if (!compound) {
    compound = (compoundsData as any[]).find((c) => c.slug === compoundSlug);
  }
  if (!compound) {
    return NextResponse.json({ error: "Compound not found" }, { status: 404 });
  }

  // 3. Follow redirect if compound has one (e.g. epithalon → epitalon)
  if (compound.redirect) {
    const resolved = (compoundsData as any[]).find(
      (c) => c.slug === compound.redirect && !c.compareSlug
    );
    if (resolved) compound = resolved;
  }

  // 4. Find source entry matching this vendor name
  const sources: any[] = compound.sources || [];
  const match = sources.find((s) => s.vendor === vendor.name);

  if (!match?.url) {
    return NextResponse.json(
      { error: "No product URL found for this vendor and compound combination" },
      { status: 404 }
    );
  }

  // 5. Log the outbound product click BEFORE redirecting. The logger never
  //    throws and is safe to await; a failure only means the click isn't
  //    counted — never breaks the redirect.
  try {
    await logClick({
      type: "product",
      vendorSlug,
      vendorName: vendor.name,
      compoundSlug: compound.slug,
      destUrl: match.url,
      refPage: request.headers.get("referer") || undefined,
    });
  } catch {
    /* never block the redirect on a logging failure */
  }

  // 6. 302 redirect to the supplier's product page
  return NextResponse.redirect(match.url, 302);
}
