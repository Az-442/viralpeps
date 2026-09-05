#!/usr/bin/env node
/**
 * ViralPeps — outbound supplier click report.
 *
 * Reads clicks.json (in this repo; appended by the /go/ logger + /api/click)
 * and prints a report you can send to suppliers or use internally:
 *   - clicks per supplier (total)
 *   - clicks per supplier-product (vendor + compound)
 *   - click destinations (URLs), optional
 *
 * Usage:
 *   node scripts/click-report.mjs            # full history
 *   node scripts/click-report.mjs --days 30  # last 30 days only
 *   node scripts/click-report.mjs --urls     # include destination URLs
 *   node scripts/click-report.mjs --top 20   # only top N suppliers
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(__dirname, "../clicks.json");

const args = process.argv.slice(2);
const days = (() => {
  const i = args.indexOf("--days");
  return i >= 0 && args[i + 1] ? parseInt(args[i + 1], 10) : 0;
})();
const showUrls = args.includes("--urls");
const top = (() => {
  const i = args.indexOf("--top");
  return i >= 0 && args[i + 1] ? parseInt(args[i + 1], 10) : 0;
})();

if (!fs.existsSync(FILE)) {
  console.log("clicks.json not found yet (no clicks recorded).");
  process.exit(0);
}

const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
const since = days ? Date.now() - days * 86400000 : 0;
const filtered = since ? rows.filter((r) => new Date(r.ts).getTime() >= since) : rows;

if (!filtered.length) {
  console.log(`No clicks recorded${days ? ` in the last ${days} days` : ""}.`);
  process.exit(0);
}

// Per supplier total
const byVendor = new Map(); // vendorSlug -> {name, total, url: Set}
const byProduct = new Map(); // "vendorSlug/compoundSlug" -> count
const byUrl = new Map(); // destUrl -> count

for (const r of filtered) {
  const key = r.vendorSlug;
  if (!byVendor.has(key)) byVendor.set(key, { name: r.vendorName || r.vendorSlug, total: 0, urls: new Set() });
  const v = byVendor.get(key);
  v.total++;
  if (r.destUrl) v.urls.add(r.destUrl);

  if (r.compoundSlug) {
    const pkey = `${r.vendorSlug}|${r.compoundSlug}`;
    byProduct.set(pkey, (byProduct.get(pkey) || 0) + 1);
  }
  if (r.destUrl) byUrl.set(r.destUrl, (byUrl.get(r.destUrl) || 0) + 1);
}

const vendorRows = [...byVendor.entries()]
  .map(([slug, v]) => ({ slug, name: v.name, total: v.total, urls: v.urls }))
  .sort((a, b) => b.total - a.total);

const limited = top ? vendorRows.slice(0, top) : vendorRows;

console.log(`\n=== OUTBOUND SUPPLIER CLICKS (${filtered.length} total${days ? `, last ${days}d` : " all-time"}) ===\n`);
console.log("PER SUPPLIER:");
for (const v of limited) {
  console.log(`  ${v.total.toString().padStart(4)}  ${v.name}  (${v.slug})`);
}

console.log("\nPER SUPPLIER-PRODUCT:");
const productRows = [...byProduct.entries()]
  .map(([k, count]) => ({ k, count }))
  .sort((a, b) => b.count - a.count);
for (const { k, count } of productRows) {
  const [vendorSlug, compoundSlug] = k.split("|");
  const vname = byVendor.get(vendorSlug)?.name || vendorSlug;
  console.log(`  ${count.toString().padStart(3)}  ${vname} -> ${compoundSlug}`);
}

if (showUrls) {
  console.log("\nDESTINATIONS:");
  const urlRows = [...byUrl.entries()].sort((a, b) => b[1] - a[1]);
  for (const [url, count] of urlRows) {
    console.log(`  ${count.toString().padStart(3)}  ${url}`);
  }
}
console.log("");
