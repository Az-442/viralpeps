#!/usr/bin/env node
// Backfill known bots into the blocklist and flag their historical clicks.
//
// Reads ~/.hermes/viralpeps/bot-backfill-list.json (produced by
// scripts/bot-detect-scoring.mjs) and, for each listed visitor:
//   1. adds a permanent bot_blocklist row (kind='visitor')
//   2. sets clicks.is_bot = true on every one of their historical clicks
//
// Both steps are idempotent — safe to re-run.
//
// Usage:
//   node scripts/backfill-bots.mjs            # dry run, changes nothing
//   node scripts/backfill-bots.mjs --apply    # actually write

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", "..", ".hermes", "viralpeps", "neon.env");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const APPLY = process.argv.includes("--apply");

const { neon } = await import("@neondatabase/serverless");
const sql = neon(process.env.POSTGRES_URL);

const listPath = join(__dirname, "..", "..", ".hermes", "viralpeps", "bot-backfill-list.json");
const list = JSON.parse(readFileSync(listPath, "utf8"));
const ids = [...list.bots, ...list.likely];

console.log(`Mode: ${APPLY ? "APPLY" : "DRY RUN"}`);
console.log(`Visitors to blocklist: ${ids.length} (${list.bots.length} BOT + ${list.likely.length} LIKELY)\n`);

// --- 1. Ensure the is_bot column exists --------------------------------
const col = await sql`
  SELECT 1 FROM information_schema.columns
  WHERE table_name = 'clicks' AND column_name = 'is_bot'
`;

if (col.length === 0) {
  console.log("clicks.is_bot does not exist yet — will ADD COLUMN");
  if (APPLY) {
    await sql`ALTER TABLE clicks ADD COLUMN IF NOT EXISTS is_bot boolean NOT NULL DEFAULT false`;
    console.log("  added.");
  }
} else {
  console.log("clicks.is_bot already exists.");
}

// --- 2. Ensure bot_blocklist exists ------------------------------------
if (APPLY) {
  await sql`
    CREATE TABLE IF NOT EXISTS bot_blocklist (
      id          bigserial PRIMARY KEY,
      kind        text NOT NULL,
      value_hash  text NOT NULL,
      reason      text,
      hits        int NOT NULL DEFAULT 1,
      first_seen  timestamptz NOT NULL DEFAULT now(),
      last_seen   timestamptz NOT NULL DEFAULT now(),
      UNIQUE (kind, value_hash)
    )
  `;
}

// --- 3. Per-visitor: how many clicks would be flagged -------------------
let totalClicks = 0;
const perVisitor = [];

for (const id of ids) {
  const r = await sql`SELECT COUNT(*)::int AS n FROM clicks WHERE visitor_id = ${id}`;
  const n = r[0].n;
  totalClicks += n;
  perVisitor.push({ id, n });
}

console.log(`\nClicks that would be flagged is_bot = true: ${totalClicks}`);
console.log("visitor_id        clicks");
for (const p of perVisitor.sort((a, b) => b.n - a.n)) {
  console.log(`${p.id.padEnd(17)} ${String(p.n).padStart(6)}`);
}

if (!APPLY) {
  console.log("\nDry run complete. Re-run with --apply to write.");
  process.exit(0);
}

// --- 4. Write: blocklist rows -----------------------------------------
let blocked = 0;
for (const id of ids) {
  await sql`
    INSERT INTO bot_blocklist (kind, value_hash, reason, hits)
    VALUES ('visitor', ${id}, 'backfill-detect', 1)
    ON CONFLICT (kind, value_hash)
    DO UPDATE SET reason = EXCLUDED.reason, last_seen = now()
  `;
  blocked++;
}
console.log(`\nBlocklisted ${blocked} visitors.`);

// --- 5. Write: flag historical clicks ---------------------------------
const upd = await sql`
  UPDATE clicks SET is_bot = true
  WHERE visitor_id = ANY(${ids}) AND is_bot = false
`;
console.log(`Flagged ${upd.rowCount ?? "?"} historical clicks as is_bot.`);

// --- 6. Verify --------------------------------------------------------
const verify = await sql`
  SELECT COUNT(*)::int AS flagged FROM clicks WHERE is_bot = true
`;
const bl = await sql`SELECT COUNT(*)::int AS n FROM bot_blocklist`;
const tot = await sql`SELECT COUNT(*)::int AS n FROM clicks`;

console.log(`\nVERIFY`);
console.log(`  clicks flagged is_bot : ${verify[0].flagged}`);
console.log(`  clicks total          : ${tot[0].n}`);
console.log(`  bot_blocklist rows    : ${bl[0].n}`);
