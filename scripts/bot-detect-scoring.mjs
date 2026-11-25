#!/usr/bin/env node
// Score each visitor for robotic behaviour. Read-only.
//
// Signals (each must be structurally impossible or implausible for a human):
//   SEQUENTIAL_VENDORS — clicked N distinct vendors, never repeating one
//   FAST_BURST         — median gap between consecutive clicks < 15s
//   NARROW_WINDOW      — all clicks inside a window < 30 min
//
// A human exploring suppliers clicks a vendor, reads the site, comes back,
// maybe revisits one. A scraper walks a list, one after another, no repeats,
// at machine cadence. The combination is the tell.

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

const clicks = await sql`
  SELECT visitor_id, vendor_slug, created_at
  FROM clicks
  WHERE visitor_id IS NOT NULL
  ORDER BY visitor_id, created_at
`;

const byVisitor = new Map();
for (const c of clicks) {
  if (!byVisitor.has(c.visitor_id)) byVisitor.set(c.visitor_id, []);
  byVisitor.get(c.visitor_id).push(c);
}

const results = [];

for (const [vid, rows] of byVisitor) {
  const n = rows.length;
  if (n < 3) continue;

  const vendors = rows.map((r) => r.vendor_slug);
  const distinct = new Set(vendors).size;
  const noRepeats = distinct === n;

  const gaps = [];
  for (let i = 1; i < n; i++) {
    gaps.push((new Date(rows[i].created_at) - new Date(rows[i - 1].created_at)) / 1000);
  }
  const sorted = [...gaps].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];

  const spanMin = (new Date(rows[n - 1].created_at) - new Date(rows[0].created_at)) / 60000;

  const signals = [];
  if (noRepeats) signals.push("SEQ");
  if (median < 15) signals.push("FAST");
  if (spanMin < 30) signals.push("NARROW");

  // Verdict: sequential + (fast OR narrow) is machine behaviour.
  // Sequential alone with a wide span and slow gaps is a genuine comparison shopper.
  const verdict =
    noRepeats && (median < 15 || spanMin < 30)
      ? "BOT"
      : noRepeats && median < 60 && spanMin < 120
        ? "LIKELY"
        : "HUMAN";

  results.push({
    vid,
    n,
    distinct,
    median: Math.round(median),
    spanMin: Math.round(spanMin * 10) / 10,
    signals: signals.join(","),
    verdict,
    first: rows[0].created_at,
  });
}

results.sort((a, b) => b.n - a.n);

const bots = results.filter((r) => r.verdict === "BOT");
const likely = results.filter((r) => r.verdict === "LIKELY");
const humans = results.filter((r) => r.verdict === "HUMAN");

console.log("=== BOT (sequential + machine cadence) ===");
console.log("visitor_id        clicks vendors medGap spanMin signals");
for (const r of bots) {
  console.log(
    `${r.vid.padEnd(17)} ${String(r.n).padStart(6)} ${String(r.distinct).padStart(7)} ${String(r.median).padStart(6)}s ${String(r.spanMin).padStart(7)}m ${r.signals}`
  );
}

console.log("\n=== LIKELY ===");
for (const r of likely) {
  console.log(
    `${r.vid.padEnd(17)} ${String(r.n).padStart(6)} ${String(r.distinct).padStart(7)} ${String(r.median).padStart(6)}s ${String(r.spanMin).padStart(7)}m ${r.signals}`
  );
}

console.log(
  `\nBOT ${bots.length} visitors / ${bots.reduce((a, r) => a + r.n, 0)} clicks`
);
console.log(
  `LIKELY ${likely.length} visitors / ${likely.reduce((a, r) => a + r.n, 0)} clicks`
);
console.log(
  `HUMAN-ish ${humans.length} visitors / ${humans.reduce((a, r) => a + r.n, 0)} clicks`
);
console.log(`TOTAL scored ${results.length}, skipped (<3 clicks) ${byVisitor.size - results.length}`);

// Machine-readable list for the backfill step
const outPath = join(__dirname, "..", "..", ".hermes", "viralpeps", "bot-backfill-list.json");
const { writeFileSync } = await import("fs");
writeFileSync(
  outPath,
  JSON.stringify(
    { generated: new Date().toISOString(), bots: bots.map((r) => r.vid), likely: likely.map((r) => r.vid) },
    null,
    2
  )
);
console.log(`\nWrote ${outPath}`);
