// Permanent honeypot trap + blocklist for ViralPeps outbound clicks.
//
// ---------------------------------------------------------------------------
// WHY THIS EXISTS (25 Nov 2026)
// ---------------------------------------------------------------------------
// The 23 Nov – 25 Nov scrape-proof audit found visitors walking every vendor
// page in sequence at 4-6 second intervals (`5942874dbd110300`: 21 clicks
// across 4 separate hour-long visits; `53d42d302f5ec45e`: 11 distinct vendors
// in ONE hour). Every header signal passed: real UA, real same-origin
// referrer from a live /vendors/* page, Sec-Fetch-* present. They were simply
// below the rate ceilings (6/hour max observed vs a 40/hour ceiling).
//
// No header or rate check can catch a slow, polite, full-header-queue crawler
// permanently. What DOES catch it is a target only a link-follower will ever
// touch:
//
//   A link that is invisible to humans and excluded from the accessibility
//   tree, present on every page that carries /go/ links. A human browsing
//   normally can never click it. Anything that clicks it is not a human.
//
// A hit is a POSITIVE bot identification — far stronger evidence than any
// header heuristic. We then record that visitor/IP permanently and refuse to
// count any of their future clicks.
//
// Two tables, both additive and safe to re-run:
//   bot_traps    — one row per honeypot hit (audit trail, never deleted)
//   bot_blocklist — permanent deny list keyed on visitor hash AND ip hash
//
// Blocking is on a HASH, not the raw IP, so no PII is stored. Hashing uses the
// same CLICK_ID_SALT scheme as visitorId(), meaning the values are directly
// comparable to clicks.visitor_id and clicks.ip.

import { createHash } from "crypto";
import { sql } from "@vercel/postgres";

/** Honeypot URL. Deliberately plausible to a scraper, useless to a human. */
export const HONEYPOT_PATH = "/go/__hp";

/** Hash used for blocklisting an IP or visitor — one-way, salted. */
export function trapHash(value: string): string {
  const salt = process.env.CLICK_ID_SALT || "viralpeps-click-salt-v1";
  return createHash("sha256").update(`${salt}|trap|${value}`).digest("hex").slice(0, 16);
}

let schemaReady = false;

/** Create the trap tables once per instance. Never throws. */
export async function ensureTrapSchema(): Promise<void> {
  if (schemaReady) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bot_traps (
        id          bigserial PRIMARY KEY,
        visitor_id  text,
        ip          text,
        user_agent  text,
        referer     text,
        trap_path   text,
        created_at  timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS bot_blocklist (
        id          bigserial PRIMARY KEY,
        kind        text NOT NULL,          -- 'visitor' | 'ip'
        value_hash  text NOT NULL,
        reason      text,
        hits        int NOT NULL DEFAULT 1,
        first_seen  timestamptz NOT NULL DEFAULT now(),
        last_seen   timestamptz NOT NULL DEFAULT now(),
        UNIQUE (kind, value_hash)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS bot_traps_created_idx ON bot_traps (created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS bot_blocklist_hash_idx ON bot_blocklist (kind, value_hash)`;
    schemaReady = true;
  } catch (err) {
    console.warn("[bot-trap] schema ensure failed", err);
  }
}

/**
 * Record a honeypot hit and permanently blocklist the visitor + IP.
 * Never throws — a trap failure must not break navigation.
 */
export async function recordTrapHit(headers: Headers, trapPath: string): Promise<void> {
  try {
    await ensureTrapSchema();

    const ip =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      "";
    const ua = headers.get("user-agent") || "";
    const referer = headers.get("referer") || "";

    // Mirror visitorId() exactly so the blocklist lines up with clicks.visitor_id.
    const lang = headers.get("accept-language") || "";
    const salt = process.env.CLICK_ID_SALT || "viralpeps-click-salt-v1";
    const visitor = createHash("sha256")
      .update(`${salt}|${ip || "0.0.0.0"}|${ua}|${lang}`)
      .digest("hex")
      .slice(0, 16);

    await sql`
      INSERT INTO bot_traps (visitor_id, ip, user_agent, referer, trap_path)
      VALUES (${visitor}, ${ip || null}, ${ua || null}, ${referer || null}, ${trapPath})
    `;

    // Blocklist by visitor hash always; by IP hash when we have one.
    await sql`
      INSERT INTO bot_blocklist (kind, value_hash, reason)
      VALUES ('visitor', ${visitor}, 'honeypot')
      ON CONFLICT (kind, value_hash)
      DO UPDATE SET hits = bot_blocklist.hits + 1, last_seen = now()
    `;

    if (ip) {
      await sql`
        INSERT INTO bot_blocklist (kind, value_hash, reason)
        VALUES ('ip', ${trapHash(ip)}, 'honeypot')
        ON CONFLICT (kind, value_hash)
        DO UPDATE SET hits = bot_blocklist.hits + 1, last_seen = now()
      `;
    }
  } catch (err) {
    console.warn("[bot-trap] recordTrapHit failed", err);
  }
}

/**
 * True if this visitor or IP has ever tripped a honeypot.
 * Fails OPEN (returns false) so a DB hiccup never blocks real traffic.
 */
export async function isBlocklisted(visitor: string, ip: string): Promise<boolean> {
  try {
    await ensureTrapSchema();
    const rows = await sql`
      SELECT 1 FROM bot_blocklist
      WHERE (kind = 'visitor' AND value_hash = ${visitor})
         OR (kind = 'ip'      AND value_hash = ${trapHash(ip)})
      LIMIT 1
    `;
    return rows.rows.length > 0;
  } catch (err) {
    console.warn("[bot-trap] isBlocklisted failed — allowing", err);
    return false;
  }
}
