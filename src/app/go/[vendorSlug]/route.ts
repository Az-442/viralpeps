import { NextRequest, NextResponse } from "next/server";
import vendorsData from "@/data/vendors.json";
import { logClick } from "@/lib/click-logger";
import { detectBot, visitorId } from "@/lib/click-guard";
import { allowClickDurable } from "@/lib/click-rate-limit";
import { isBlocklisted } from "@/lib/bot-trap";
import { isVendorDead, bestAlternativeVendor } from "@/lib/vendor-alternative";

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
      const verdict = await allowClickDurable({ visitor: vid, ip, vendorSlug });
      // A honeypot hit is a positive bot identification — permanent, header-proof.
      const banned = await isBlocklisted(vid, ip);
      if (verdict.allow && !banned) {
        await logClick({
          type: "vendor-site",
          vendorSlug,
          vendorName: vendor.name,
          destUrl: vendor.website,
          refPage: request.headers.get("referer") || undefined,
          visitorId: vid,
          ip,
        });
      }
    }
  } catch {
    /* never block the redirect on a logging failure */
  }

  // Re-route: if this supplier's site is down, send the visitor to the best
  // live alternative (via an honest "offline" interstitial) instead of a dead
  // page.
  if (isVendorDead(vendorSlug)) {
    const alt = bestAlternativeVendor(vendorSlug);
    const p = new URLSearchParams({ vendor: vendor.name });
    if (alt) {
      p.set("alt", alt.name);
      p.set("altPath", `/go/${alt.slug}`);
    }
    const res = NextResponse.redirect(new URL(`/go/down?${p.toString()}`, request.url), 302);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const res = NextResponse.redirect(vendor.website, 302);
  // Keep these redirect URLs out of the search index and stop passing link
  // equity to supplier sites. noindex requires crawlers to fetch the URL, so
  // robots.txt Disallow would be contradictory and is deliberately NOT used.
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
