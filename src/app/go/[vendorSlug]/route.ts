import { NextRequest, NextResponse } from "next/server";
import vendorsData from "@/data/vendors.json";
import { logClick } from "@/lib/click-logger";
import { detectBot, visitorId } from "@/lib/click-guard";
import { allowClick } from "@/lib/click-rate-limit";

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

  // Log the outbound click (visit to the vendor's website) BEFORE redirecting.
  // Three gates, cheapest first: bot detection (headers), then behavioural
  // rate limiting (debounce + ceilings). Bots and suppressed clicks still get
  // redirected normally — they are simply not counted.
  try {
    const bot = detectBot(request.headers);
    if (!bot.isBot) {
      const vid = visitorId(request.headers);
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "0.0.0.0";
      const verdict = allowClick(vid, ip, `site:${vendorSlug}`);
      if (verdict.allow) {
        await logClick({
          type: "vendor-site",
          vendorSlug,
          vendorName: vendor.name,
          destUrl: vendor.website,
          refPage: request.headers.get("referer") || undefined,
          visitorId: vid,
        });
      }
    }
  } catch {
    /* never block the redirect on a logging failure */
  }

  const res = NextResponse.redirect(vendor.website, 302);
  // Keep these redirect URLs out of the search index and stop passing link
  // equity to supplier sites. noindex requires crawlers to fetch the URL, so
  // robots.txt Disallow would be contradictory and is deliberately NOT used.
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
