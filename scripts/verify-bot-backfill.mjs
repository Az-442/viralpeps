#!/usr/bin/env node
// Post-backfill verification: confirm stats now exclude bot rows.
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", "..", ".hermes", "viralpeps", "neon.env");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}
const { neon } = await import("@neondatabase/serverless");
const sql = neon(process.env.POSTGRES_URL);

const t = await sql`
  SELECT count(*)::int AS total,
         count(*) FILTER (WHERE is_bot)::int AS bots,
         count(*) FILTER (WHERE NOT is_bot)::int AS humans
  FROM clicks`;
const r = t[0];

console.log(`clicks total        : ${r.total}`);
console.log(`  identified bots   : ${r.bots}  (${((r.bots / r.total) * 100).toFixed(1)}%)`);
console.log(`  human (counted)   : ${r.humans}  (${((r.humans / r.total) * 100).toFixed(1)}%)`);

const bl = await sql`SELECT kind, count(*)::int AS n FROM bot_blocklist GROUP BY kind`;
console.log(`\nblocklist: ${bl.map((b) => `${b.n} ${b.kind}`).join(", ")}`);

const traps = await sql`SELECT count(*)::int AS n FROM bot_traps`;
console.log(`honeypot hits recorded: ${traps[0].n}`);

const top = await sql`
  SELECT vendor_slug, count(*)::int AS n
  FROM clicks WHERE NOT is_bot
  GROUP BY vendor_slug ORDER BY n DESC LIMIT 5`;
console.log("\nTop vendors by HUMAN clicks:");
for (const x of top) console.log(`  ${x.vendor_slug.padEnd(30)} ${x.n}`);
