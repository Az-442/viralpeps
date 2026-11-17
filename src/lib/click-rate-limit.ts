// Durable, Postgres-backed outbound-click rate limiting (ViralPeps).
//
// ---------------------------------------------------------------------------
// WHY THIS REPLACES THE IN-PROCESS LIMITER (13 Nov 2026)
// ---------------------------------------------------------------------------
// The old limiter kept counters in module memory, so with N warm Vercel
// instances the effective ceiling was N× the configured rate. A scraper that
// rotates its visitor hash (and/or IP) walked straight through. The observed
// burst: 56 raccoon-peptides product clicks in 40 seconds across 54 distinct
// visitor hashes, all with a bare homepage referrer, walking 19 compounds in
// sequence. Per-visitor ceilings are useless against a hash-rotating scraper;
// per-IP and site-wide ceilings are the durable fix.
//
// This version counts against the `clicks` table itself — the same durable
// store every attributed click lands in — so the ceilings hold across ALL
// instances. One cheap indexed SELECT per click, then the INSERT.
//
// HONEST LIMITATION:
// The check is a SELECT-then-INSERT, not a single atomic UPDATE...RETURNING,
// so a perfectly-parallel burst (dozens of requests landing in the same
// millisecond across instances) can slip a few rows past the ceiling. That
// residual race is ~1-2 orders of magnitude smaller than the in-memory
// limiter's, and it stops the observed sequential scraper cold. A fully
// atomic counter table is Phase 0 of the affiliate build.
//
// Ceilings (same numbers as before, now durable + two new ones):
//   debounce — one click per (visitor, vendor, compound) per 30 min
//   visitor  — 6/min, 40/hour
//   ip       — 20/min, 150/hour   (NEW: durable, per client IP)
//   global   — 600/min, 10000/hour (NEW: site-wide sanity ceiling)

import { sql } from "@vercel/postgres";

/** One attributed click per (visitor, destination) inside this window. */
export const DEBOUNCE_MS = 30 * 60 * 1000; // 30 minutes

/** Hard ceiling per visitor. */
export const VISITOR_MAX_PER_MINUTE = 6;
export const VISITOR_MAX_PER_HOUR = 40;

/** Hard ceiling per IP, independent of the visitor hash. */
export const IP_MAX_PER_MINUTE = 20;
export const IP_MAX_PER_HOUR = 150;

/** Site-wide ceiling — catches a scraper that rotates BOTH visitor and IP. */
export const GLOBAL_MAX_PER_MINUTE = 600;
export const GLOBAL_MAX_PER_HOUR = 10000;

export type RateVerdict =
  | { allow: true }
  | { allow: false; reason: "debounced" | "visitor-rate" | "ip-rate" | "global-rate" };

export interface RateInput {
  visitor: string;
  ip: string;
  vendorSlug: string;
  compoundSlug?: string;
}

/**
 * Decide whether this outbound click should be ATTRIBUTED (counted).
 *
 * Durable: reads counters from Postgres, so the ceilings hold across every
 * serverless instance. Call only after detectBot() has cleared the request as
 * human. Returns { allow: true } to count the click; anything else means "let
 * the redirect proceed but do not write a row".
 */
export async function allowClickDurable(input: RateInput): Promise<RateVerdict> {
  if (!input.visitor) return { allow: false, reason: "visitor-rate" };

  try {
    const r = await sql`
      SELECT
        (SELECT count(*)::int FROM clicks
          WHERE visitor_id = ${input.visitor}
            AND vendor_slug = ${input.vendorSlug}
            AND coalesce(compound_slug, '') = coalesce(${input.compoundSlug ?? null}, '')
            AND created_at > now() - interval '30 minutes') AS debounced,
        (SELECT count(*)::int FROM clicks
          WHERE visitor_id = ${input.visitor}
            AND created_at > now() - interval '1 minute') AS v_min,
        (SELECT count(*)::int FROM clicks
          WHERE visitor_id = ${input.visitor}
            AND created_at > now() - interval '1 hour') AS v_hour,
        (SELECT count(*)::int FROM clicks
          WHERE ip = ${input.ip}
            AND created_at > now() - interval '1 minute') AS ip_min,
        (SELECT count(*)::int FROM clicks
          WHERE ip = ${input.ip}
            AND created_at > now() - interval '1 hour') AS ip_hour,
        (SELECT count(*)::int FROM clicks
          WHERE created_at > now() - interval '1 minute') AS g_min,
        (SELECT count(*)::int FROM clicks
          WHERE created_at > now() - interval '1 hour') AS g_hour
    `;
    const c = r.rows[0] as Record<string, number>;

    if (c.debounced > 0) return { allow: false, reason: "debounced" };
    if (c.v_min >= VISITOR_MAX_PER_MINUTE || c.v_hour >= VISITOR_MAX_PER_HOUR)
      return { allow: false, reason: "visitor-rate" };
    if (c.ip_min >= IP_MAX_PER_MINUTE || c.ip_hour >= IP_MAX_PER_HOUR)
      return { allow: false, reason: "ip-rate" };
    if (c.g_min >= GLOBAL_MAX_PER_MINUTE || c.g_hour >= GLOBAL_MAX_PER_HOUR)
      return { allow: false, reason: "global-rate" };

    return { allow: true };
  } catch (err) {
    // Fail OPEN — never block a redirect on a rate-limiter failure. The
    // logger has its own try/catch too.
    console.warn("[click-rate-limit] check failed — allowing click", err);
    return { allow: true };
  }
}

/** Diagnostics only — no in-memory state anymore, so always zero. */
export function rateLimitState() {
  return { trackedVisitors: 0, trackedIps: 0, flaggedNow: 0 };
}
