import { NextRequest, NextResponse } from "next/server";
import vendorsData from "@/data/vendors.json";
import { logClick } from "@/lib/click-logger";
import { detectBot, visitorId } from "@/lib/click-guard";

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
  // BEFORE redirecting — humans only. Bots still get redirected normally.
  try {
    const bot = detectBot(request.headers);
    if (!bot.isBot) {
      await logClick({
        type: "vendor-site",
        vendorSlug,
        vendorName: vendor.name,
        destUrl: vendor.website,
        refPage: request.headers.get("referer") || undefined,
        visitorId: visitorId(request.headers),
      });
    }
  } catch {
    /* never block the redirect on a logging failure */
  }

  return NextResponse.redirect(vendor.website, 302);
}
