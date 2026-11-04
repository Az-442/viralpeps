// Behavioural rate limiting for outbound-click attribution (ViralPeps).
//
// ---------------------------------------------------------------------------
// WHY THIS EXISTS (5 Nov 2026)
// ---------------------------------------------------------------------------
// The click report was inflated and unverifiable. Root causes found in real
// data from clicks.json (30,104 rows, 5 Sep - 30 Oct 2026):
//
//   * 23,161 rows (77%) were direct /go/ hits with NO referrer — not badge
//     clicks at all. The /go/ URLs are public and unauthenticated.
//   * Visitor f79436134f26a4e3 logged 493 product clicks in 159 seconds
//     (median inter-click gap 0 SECONDS, 467 of 490 gaps under 2s), walking
//     ss-31 -> dsip -> igf-1-lr3 -> cjc-1295 in sequence. A scraper.
//   * 162 visitors produced 4,701 clicks with sub-3s cadence.
//   * detectBot() only looked at User-Agent, so a normal Chrome UA passed.
//
// Header checks alone (click-guard.ts) are bypassable. This layer adds the
// ceiling that makes the number defensible:
//
//   1. DEBOUNCE — one attributed click per (visitor, destination) per window.
//      Double-clicks, back-button re-fires, and page refreshes collapse into
//      one click. This is the single biggest correctness win: a human who
//      clicks a supplier, comes back and clicks again is ONE click.
//   2. PER-VISITOR RATE — hard ceiling on clicks per visitor per minute/hour.
//      Exceeding it marks the visitor as automated and stops attributing,
//      so a scraper can no longer generate hundreds of "clicks".
//   3. PER-IP RATE — ceiling independent of the visitor hash, because the
//      hash can be varied by rotating UA or Accept-Language.
//
// HONEST LIMITATION — read before trusting the number:
// This limiter is IN-PROCESS (module state). Vercel serverless runs many
// concurrent instances, so the counters are per-instance, not global. That
// makes the ceiling approximate, not absolute: with N warm instances the
// effective limit is N times the configured rate. It is a large improvement
// (it kills the observed 0-second-gap bursts within any one instance) but it
// is NOT the durable fix. The durable fix is Postgres-backed counters (one
// UPDATE ... RETURNING per click, atomic across instances) — Phase 0 of the
// affiliate build, blocked on a Vercel token and POSTGRES_URL.
//
// Until Postgres lands, treat the output as "attributed outbound clicks under
// debounce + rate ceilings", not as certified human clicks. The debounce in
// particular is what makes the figure comparable month over month.

/** One attributed click per (visitor, destination) inside this window. */
export const DEBOUNCE_MS = 30 * 60 * 1000; // 30 minutes

/** Hard ceiling per visitor. Exceeding either marks the visitor automated. */
export const VISITOR_MAX_PER_MINUTE = 6;
export const VISITOR_MAX_PER_HOUR = 40;

/** Hard ceiling per IP, independent of the visitor hash. */
export const IP_MAX_PER_MINUTE = 20;
export const IP_MAX_PER_HOUR = 150;

/** How long a flagged visitor stays flagged. */
export const FLAG_TTL_MS = 60 * 60 * 1000; // 1 hour

interface VisitorState {
  /** destination key -> timestamp of last attributed click */
  debounce: Map<string, number>;
  /** timestamps of attributed clicks, pruned to the last hour */
  recent: number[];
  /** set when the visitor exceeds a ceiling */
  flaggedUntil: number;
}

const visitors = new Map<string, VisitorState>();
const ipRecent = new Map<string, number[]>();

/** Bound memory: drop the oldest entries when the maps grow past this. */
const MAX_TRACKED = 20000;

export type RateVerdict =
  | { allow: true }
  | { allow: false; reason: "debounced" | "visitor-rate" | "ip-rate"; flagged?: boolean };

function prune(arr: number[], cutoff: number): number[] {
  // arrays are append-only ascending; drop everything older than cutoff
  let i = 0;
  while (i < arr.length && arr[i] < cutoff) i++;
  return i === 0 ? arr : arr.slice(i);
}

function evictIfNeeded() {
  if (visitors.size <= MAX_TRACKED && ipRecent.size <= MAX_TRACKED) return;
  // Map preserves insertion order — drop the oldest quarter.
  const dropVisitors = Math.floor(visitors.size * 0.25);
  let n = 0;
  for (const k of visitors.keys()) {
    visitors.delete(k);
    if (++n >= dropVisitors) break;
  }
  const dropIps = Math.floor(ipRecent.size * 0.25);
  n = 0;
  for (const k of ipRecent.keys()) {
    ipRecent.delete(k);
    if (++n >= dropIps) break;
  }
}

/**
 * Decide whether this outbound click should be ATTRIBUTED to the visitor.
 *
 * Call this only after detectBot() has cleared the request as human. A return
 * of { allow: true } means "count this click"; anything else means "let the
 * redirect proceed but do not write a row".
 *
 * `destKey` should uniquely identify the destination (e.g. the vendor slug +
 * compound slug, or the resolved destination URL) so the debounce collapses
 * repeat clicks on the same supplier.
 */
export function allowClick(
  visitor: string,
  ip: string,
  destKey: string,
  now: number = Date.now()
): RateVerdict {
  if (!visitor) return { allow: false, reason: "visitor-rate", flagged: true };

  evictIfNeeded();

  let st = visitors.get(visitor);
  if (!st) {
    st = { debounce: new Map(), recent: [], flaggedUntil: 0 };
    visitors.set(visitor, st);
  }

  // Already known automated — keep letting the redirect through, never count.
  if (st.flaggedUntil > now) {
    return { allow: false, reason: "visitor-rate", flagged: true };
  }
  if (st.flaggedUntil !== 0) {
    // flag expired
    st.flaggedUntil = 0;
    st.recent = [];
  }

  // --- 1. debounce ---------------------------------------------------------
  const last = st.debounce.get(destKey);
  if (last !== undefined && now - last < DEBOUNCE_MS) {
    return { allow: false, reason: "debounced" };
  }

  // --- 2. per-visitor rate -------------------------------------------------
  st.recent = prune(st.recent, now - 60 * 60 * 1000);
  const lastMinute = st.recent.filter((t) => t > now - 60 * 1000).length;
  if (lastMinute >= VISITOR_MAX_PER_MINUTE || st.recent.length >= VISITOR_MAX_PER_HOUR) {
    st.flaggedUntil = now + FLAG_TTL_MS;
    return { allow: false, reason: "visitor-rate", flagged: true };
  }

  // --- 3. per-IP rate ------------------------------------------------------
  const ipTrimmed = prune(ipRecent.get(ip) ?? [], now - 60 * 60 * 1000);
  const ipLastMinute = ipTrimmed.filter((t) => t > now - 60 * 1000).length;
  if (ipLastMinute >= IP_MAX_PER_MINUTE || ipTrimmed.length >= IP_MAX_PER_HOUR) {
    ipRecent.set(ip, ipTrimmed);
    return { allow: false, reason: "ip-rate", flagged: true };
  }

  // --- accept --------------------------------------------------------------
  st.debounce.set(destKey, now);
  st.recent.push(now);
  ipTrimmed.push(now);
  ipRecent.set(ip, ipTrimmed);

  // Bound the debounce map too
  if (st.debounce.size > 200) {
    const cutoff = now - DEBOUNCE_MS;
    for (const [k, t] of st.debounce) if (t < cutoff) st.debounce.delete(k);
  }

  return { allow: true };
}

/** Diagnostics only — never used on the redirect hot path. */
export function rateLimitState() {
  return {
    trackedVisitors: visitors.size,
    trackedIps: ipRecent.size,
    flaggedNow: [...visitors.values()].filter((v) => v.flaggedUntil > Date.now()).length,
  };
}
