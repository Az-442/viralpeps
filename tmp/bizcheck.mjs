#!/usr/bin/env node
/* Scans each supplier's live site for registered-business markers:
   company name, registration number, companies house, registered address.
   Checks home + footer + /contact + /about + /contact-us pages. */
import fs from "node:fs";

const VENDOR_FILE = "/Users/time4you/viralpeps/src/data/vendors.json";
const vendors = JSON.parse(fs.readFileSync(VENDOR_FILE, "utf8"));

const MARKERS = [
  /registered in england/i,
  /company (registration )?no\.?:?\s*[0-9]/i,
  /companies house/i,
  /\bltd\b/i,
  /\blimited\b(?! liability)/i,
  /registered (office )?address/i,
  /company number/i,
];

const CONTACT_SLUGS = ["contact", "contact-us", "about", "about-us", "about-us/", "pages/contact"];

function norm(href, base) {
  try { return new URL(href, base).href; } catch { return null; }
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36" } });
    clearTimeout(t);
    if (!r.ok) return { ok: false, html: "", status: r.status };
    const html = await r.text();
    return { ok: true, html, status: r.status, url: r.url };
  } catch (e) { clearTimeout(t); return { ok: false, html: "", status: 0 }; }
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

async function scan() {
  const results = [];
  let i = 0;
  for (const v of vendors) {
    i++;
    const base = /^https?:\/\//i.test(v.website || "") ? (v.website + (v.website.endsWith("/") ? "" : "/")) : null;
    if (!base) { results.push({ name: v.name, website: v.website, found: false, reason: "no URL", matched: [] }); continue; }
    const baseNoSlash = base.replace(/\/$/, "");

    // pages to scan: home + a few deep links via <a href>
    let pages = [base, baseNoSlash + "/contact", baseNoSlash + "/contact-us", baseNoSlash + "/about", baseNoSlash + "/about-us"];
    let matched = [];
    let anyOk = false;
    let scannedPages = 0;

    for (const url of pages) {
      const { ok, html, url: finalUrl } = await fetchText(url);
      if (!ok) continue;
      anyOk = true; scannedPages++;
      const text = stripTags(html);
      for (const m of MARKERS) {
        const hit = text.match(m);
        if (hit) {
          const start = Math.max(0, hit.index - 60);
          const ctx = text.slice(start, start + 120).replace(/\s+/g, " ").trim();
          matched.push({ pattern: m.toString(), ctx });
          break; // one marker per page is enough to report
        }
      }
      if (matched.length >= 3) break;
    }

    results.push({ name: v.name, website: v.website, found: matched.length > 0, reason: anyOk ? (matched.length ? `matched ${matched.length}` : "no match") : "site unreachable", matched: matched.slice(0, 3), scannedPages });
  }
  return results;
}

scan().then((r) => {
  fs.writeFileSync("/tmp/bizcheck_results.json", JSON.stringify(r, null, 2));
  const found = r.filter((x) => x.found);
  console.log("TOTAL:", r.length);
  console.log("WITH registered-business markers:", found.length);
  console.log("WITHOUT:", r.length - found.length);
  console.log("\n--- WITH ---");
  for (const x of r) { if (x.found) { console.log(`* ${x.name}`); for (const m of x.matched) console.log(`    ${m.pattern} :: ${m.ctx}`); } }
  console.log("\n--- WITHOUT ---");
  for (const x of r) { if (!x.found) console.log(`- ${x.name} (${x.reason})`); }
}).catch((e) => { console.error("FATAL", e); process.exit(1); });
