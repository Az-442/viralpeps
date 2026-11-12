// Durable outbound-click logger for ViralPeps.
//
// Clicks are written directly to Neon Postgres (one INSERT per click).
// This replaced the old GitHub-file logger (clicks.json) which hit GitHub's
// 1 MB Contents API limit at 30,104 rows (8 MB) and silently dropped every
// click from 30 Oct 2026. The GitHub-file approach was a dead end: it also
// lost clicks to serverless instance recycling (in-RAM buffer), a 30-min
// flush delay, concurrent-write 409 conflicts, and per-instance rate limits.
//
// One INSERT per click is durable and correct. The redirect that accompanies
// each click is never blocked on a log-write failure (wrapped in try/catch,
// returns boolean, never throws).
//
// Uses @vercel/postgres `sql`, which reads POSTGRES_URL from env and pools
// connections through Vercel + Neon's pooler.

import { sql } from "@vercel/postgres";

export type ClickType = "vendor-site" | "product" | "vendor-profile";

/** In-memory row supplied by callers (timestamp added by Postgres DEFAULT). */
export interface ClickRow {
  type: ClickType;
  vendorSlug: string;
  vendorName?: string;
  compoundSlug?: string;
  destUrl?: string; // exact URL left to (for direct /go/{vendor} and /go/{vendor}/{compound})
  refPage?: string; // page the click happened on (referrer)
  visitorId?: string; // anonymous, one-way hash — lets us count unique humans
}

/**
 * Record one outbound click as a single INSERT. Never throws — a failure only
 * means the click isn't counted; the redirect still proceeds. Returns true on
 * success, false on failure or invalid row.
 */
export async function logClick(row: ClickRow): Promise<boolean> {
  try {
    if (!row || !row.vendorSlug) return false;

    await sql`
      INSERT INTO clicks (
        click_type, vendor_slug, vendor_name, compound_slug,
        dest_url, ref_page, visitor_id
      ) VALUES (
        ${row.type}, ${row.vendorSlug}, ${row.vendorName ?? null},
        ${row.compoundSlug ?? null}, ${row.destUrl ?? null},
        ${row.refPage ?? null}, ${row.visitorId ?? null}
      )
    `;

    return true;
  } catch (err) {
    // Never throw on the redirect hot path — a log failure must not break the
    // outbound navigation. Log it so Vercel runtime logs surface the cause.
    console.warn("[click-logger] insert failed — click NOT persisted", err);
    return false;
  }
}
