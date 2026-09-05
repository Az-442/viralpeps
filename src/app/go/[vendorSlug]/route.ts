import { NextRequest, NextResponse } from "next/server";
import vendorsData from "@/data/vendors.json";
import { logClick } from "@/lib/click-logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vendorSlug: string }> }
) {
  const { vendorSlug } = await params;

  const vendor = (vendorsData as any[]).find((v) => v.slug === vendorSlug);
  if (!vendor?.website) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  // Log the outbound click (site visit to the vendor's homepage/website)
  // BEFORE redirecting. The logger never throws and is safe to await; a
  // failure only means this click isn't counted — never breaks the redirect.
  try {
    await logClick({
      type: "vendor-site",
      vendorSlug,
      vendorName: vendor.name,
      destUrl: vendor.website,
      refPage: request.headers.get("referer") || undefined,
    });
  } catch {
    /* never block the redirect on a logging failure */
  }

  return NextResponse.redirect(vendor.website, 302);
}
