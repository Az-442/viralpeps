import { NextRequest, NextResponse } from "next/server";
import { recordTrapHit } from "@/lib/bot-trap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /go/hp-8f2c1a — honeypot. Linked from an invisible, aria-hidden anchor that
// no human can see or reach by keyboard. Any request here is a bot.
//
// We return a harmless 204 rather than redirecting: a scraper gets no signal
// about what happened, while we permanently blocklist its visitor + IP hash.
// Humans never arrive, so nothing is lost.
export async function GET(request: NextRequest) {
  await recordTrapHit(request.headers, "/go/hp-8f2c1a");

  const res = new NextResponse(null, { status: 204 });
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
