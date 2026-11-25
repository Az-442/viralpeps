#!/usr/bin/env node
// Show the exact click timeline for specific visitors, so a human can eyeball
// whether the verdict is right before anything is blocked. Read-only.
// Usage: node scripts/bot-inspect-visitor.mjs <visitor_id> [more ids...]

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

const ids = process.argv.slice(2);
if (!ids.length) {
  console.error("Usage: node scripts/bot-inspect-visitor.mjs <visitor_id> [...]");
  process.exit(1);
}

for (const id of ids) {
  const rows = await sql`
    SELECT created_at, vendor_slug, compound_slug, ref_page, ip
    FROM clicks WHERE visitor_id = ${id} ORDER BY created_at
  `;
  console.log(`\n=== ${id} — ${rows.length} clicks ===`);
  let prev = null;
  for (const r of rows) {
    const t = new Date(r.created_at);
    const gap = prev ? ((t - prev) / 1000).toFixed(0) + "s" : "";
    console.log(
      `${t.toISOString().slice(0, 19)}  +${gap.padEnd(6)} ${String(r.vendor_slug).padEnd(28)} ${r.ref_page ?? "-"}`
    );
    prev = t;
  }
}
