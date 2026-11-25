#!/usr/bin/env node
// Identify bot visitors in the ViralPeps clicks table.
// Read-only. Prints candidates with evidence so a human can approve the list.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load neon.env into process.env
const envPath = join(__dirname, "..", "..", ".hermes", "viralpeps", "neon.env");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const { neon } = await import("@neondatabase/serverless");
const sql = neon(process.env.POSTGRES_URL);

const rows = await sql`
  SELECT visitor_id,
         COUNT(*)::int AS clicks,
         COUNT(DISTINCT vendor_slug)::int AS vendors,
         MIN(created_at) AS first_seen,
         MAX(created_at) AS last_seen,
         COUNT(*) FILTER (WHERE created_at >= now() - interval '30 days')::int AS last30,
         array_agg(DISTINCT vendor_slug ORDER BY vendor_slug) AS vendor_list
  FROM clicks
  GROUP BY visitor_id
  ORDER BY clicks DESC
`;

console.log(`Total distinct visitors: ${rows.length}\n`);
console.log("visitor_id        clicks vendors last30  first_seen            last_seen");

for (const r of rows) {
  console.log(
    `${(r.visitor_id ?? "NULL").padEnd(17)} ${String(r.clicks).padStart(6)} ${String(r.vendors).padStart(7)} ${String(r.last30).padStart(6)}  ${r.first_seen.toISOString().slice(0,19)}  ${r.last_seen.toISOString().slice(0,19)}`
  );
}
