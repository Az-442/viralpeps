import { NextRequest, NextResponse } from "next/server";
import { logClick } from "@/lib/click-logger";
import { detectBot, visitorId } from "@/lib/click-guard";

export const runtime = "nodejs";

// POST /api/click
// Body: { type, vendorSlug, vendorName?, compoundSlug?, destUrl?, refPage? }
// Used by client-side instrumentation of direct outbound anchors that bypass
// the /go/ routes (e.g. "Visit {vendor}" buttons linking straight to
// vendor.website). Logging is fire-and-forget; we return ok even if the
// persistence is rate-guarded, so the navigation is never blocked.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, vendorSlug, vendorName, compoundSlug, destUrl, refPage } = body || {};

    if (!vendorSlug || typeof vendorSlug !== "string") {
      return NextResponse.json({ ok: false, error: "vendorSlug required" }, { status: 400 });
    }
    const validTypes = ["vendor-site", "product", "vendor-profile"];
    const clickType = validTypes.includes(type) ? type : "vendor-site";

    // Skip logging for bots / prefetchers — same rule as the /go/ routes.
    if (detectBot(request.headers).isBot) {
      return NextResponse.json({ ok: true, skipped: "bot" });
    }

    // Await so the GitHub write completes on Vercel (un-awaited work can be
    // terminated once the response is returned). Log failures are swallowed.
    await logClick({
      type: clickType,
      vendorSlug,
      vendorName: typeof vendorName === "string" ? vendorName : undefined,
      compoundSlug: typeof compoundSlug === "string" ? compoundSlug : undefined,
      destUrl: typeof destUrl === "string" ? destUrl : undefined,
      refPage: typeof refPage === "string" ? refPage : undefined,
      visitorId: visitorId(request.headers),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // never fail the client click
  }
}
