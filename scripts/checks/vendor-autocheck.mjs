#!/usr/bin/env node
/**
 * ViralPeps — automated TrustScore vetting.
 *
 * Fetches each listed supplier's website and checks the 5 AUTOMATED signals:
 *   - Lab-Tested (+25): a COA / certificate-of-analysis is available on the site
 *   - Compliant  (+5): Research-Use-Only (RUO) disclaimer on site AND product pages
 *   - Reviews    (+10): an independent review platform is linked (Trustpilot/Reviews.io/Google/Feefo)
 *   - Shipping   (+5): tracked shipping is mentioned
 *   - Contact    (+10): a working contact route (email / phone / contact page) exists
 *
 * MANUAL signals (Business +25, Domain +20) are set separately in vendors.json by us
 * during onboarding (see below) — never by this script.
 *
 * Output: writes results into a JSON cache the score lib reads, and (optionally)
 * updates a `_autoChecks` block in memory if --write-data is passed.
 *
 * Usage: node scripts/checks/vendor-autocheck.mjs [--write-data] [--slug=X]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VENDOR_FILE = path.resolve(__dirname, "../../src/data/vendors.json");
const CACHE_FILE = path.resolve(__dirname, "../../src/data/trustscore-autocheck.json");

const args = process.argv.slice(2);
const WRITE_DATA = args.includes("--write-data");
const ONLY_SLUG = args.find(a => a.startsWith("--slug="))?.split("=")[1] || null;

const HTTP = "https://";
const REQUEST_TIMEOUT_MS = 12000;

// ---- Evidence keyword sets -------------------------------------------------
const COA = [
  "certificate of analys", "certificate of analysis", "coa", "analysis certificate",
  "hplc", "third-party test", "third party test", "independent lab", "batch spec",
  "purity report", "janoshik", "lab report", "test results",
];

const RUO = [
  "research use only", "research-use only", "in vitro", "in-vitro", "for research purposes",
  "research purposes", "research purpose", "laboratory use", "laboratory research",
  "research purposes only", "not for human", "not for human use", "laboratory and scientific",
  "for laboratory and scientific", "not for injection", "antibody research",
];

const REVIEW = [
  "trustpilot", "reviews.io", "feefo", "google reviews", "trusted shop",
];

const SHIPPING_TRACKED = [
  "tracked", "tracking", "royal mail", "dpd", "dhl", "ups", "next day", "next-day",
  "signed for", "delivery notification", "free shipping", "free delivery", "free postage",
  "free uk shipping", "free uk delivery", "free tracked", "free dispatch", "free over",
  "ships free",
];

const CONTACT = [
  "contact", "email", "phone", "tel:", "mailto:", "live chat", "support", "get in touch",
  "whatsapp", "telegram", "send us a message", "reach us", "enquire",
];

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s+/g, " ");
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (ViralPeps/TrustScore-bot) AppleWebKit/537.36" },
      signal: controller.signal,
    });
    const text = await res.text();
    return { status: res.status, text };
  } finally {
    clearTimeout(timer);
  }
}

function findEvidence(text, keywords) {
  const n = normalize(text);
  return keywords.find((k) => n.includes(k.toLowerCase())) || null;
}

function titleOrH1(text) {
  const n = normalize(text);
  const title = (n.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1];
  const h1 = (n.match(/<h1[^>]*>([^<]*)<\/h1>/) || [])[1];
  return title || h1 || null;
}

async function checkVendor(vendor) {
  const siteRaw = vendor.website;
  // Accept the website with or without a scheme.
  const site = /^https?:\/\//i.test(siteRaw) ? siteRaw : HTTP + siteRaw;
  const result = {
    slug: vendor.slug,
    website: site,
    checkedAt: new Date().toISOString(),
    live: false,
    home: { status: 0, coa: null, ruo: null, review: null, shipping: null, contact: null, title: null },
    product: { fetched: false, coa: null, ruo: null },
  };

  let home;
  try {
    home = await fetchText(site);
    result.live = home.status >= 200 && home.status < 400;
    result.home.status = home.status;
  } catch (e) {
    result.live = false;
    result.error = e?.message || String(e);
    return result;
  }
  const homeText = home.text;
  result.home.title = titleOrH1(homeText);

  // Auto signals on the homepage
  result.home.coa = findEvidence(homeText, COA);
  result.home.ruo = findEvidence(homeText, RUO);
  result.home.review = findEvidence(homeText, REVIEW);
  result.home.shipping = findEvidence(homeText, SHIPPING_TRACKED);
  result.home.contact = findEvidence(homeText, CONTACT);

  // Probe common secondary pages where RUO / shipping / contact / COA often live
  // (many stores keep disclaimers on terms, shipping details on a shipping/faq page,
  //  and contact details on a dedicated contact page). Only follows same-site links.
  const origin = site.replace(/\/+$/, "");
  const pageCandidates = [];
  const navMatches = homeText.matchAll(/href=["']([^"']*?)?["'][^>]*>(?:<[^>]+>)*\s*(contact|shipping|faq|terms|notice|disclaimer|privacy|support)\s*/gi);
  for (const m of navMatches) {
    const href = m[1];
    if (!href || href.startsWith("http") && !href.startsWith(origin)) continue;
    const url = href.startsWith("http") ? href : origin + "/" + href.replace(/^\//, "");
    if (!pageCandidates.includes(url)) pageCandidates.push(url);
  }
  // Guard: also try common direct paths even if not linked
  for (const p of ["/contact", "/contact-us", "/faq", "/terms", "/shipping", "/delivery", "/support"]) {
    if (result.home.shipping || result.home.contact) break; // already found, skip extra hits
    const url = origin + p;
    if (!pageCandidates.includes(url)) pageCandidates.push(url);
  }
  const secondary = { contact: null, ruo: null, shipping: null, coa: null, review: null };
  for (const url of pageCandidates.slice(0, 4)) {
    try {
      const page = await fetchText(url);
      if (page.status < 200 || page.status >= 400) continue;
      secondary.contact = secondary.contact || findEvidence(page.text, CONTACT);
      secondary.ruo = secondary.ruo || findEvidence(page.text, RUO);
      secondary.shipping = secondary.shipping || findEvidence(page.text, SHIPPING_TRACKED);
      secondary.coa = secondary.coa || findEvidence(page.text, COA);
      secondary.review = secondary.review || findEvidence(page.text, REVIEW);
    } catch (e) { /* ignore secondary page failures */ }
  }
  result.secondary = { probed: pageCandidates.length > 0 ? pageCandidates.length : 0, ...secondary };

  // Try a product page if linked (search for a /product or /shop path) to check COA + RUO there too.
  const productHref = (homeText.match(/href=["']([^"']*(?:\/product|\/products|\/shop|\/catalogue)[^"']*)(?:["'])[^>]*/i) || [])[1];
  if (productHref) {
    const productUrl = productHref.startsWith("http")
      ? productHref
      : site.replace(/\/+$/, "") + "/" + productHref.replace(/^\/+/, "");
    try {
      const prod = await fetchText(productUrl);
      result.product.fetched = true;
      result.product.status = prod.status;
      result.product.coa = findEvidence(prod.text, COA);
      result.product.ruo = findEvidence(prod.text, RUO);
    } catch (e) {
      result.product.error = e?.message || String(e);
    }
  }

  return result;
}

async function main() {
  const vendors = JSON.parse(fs.readFileSync(VENDOR_FILE, "utf-8"));
  const targets = ONLY_SLUG
    ? vendors.filter((v) => v.slug === ONLY_SLUG)
    : vendors;
  if (ONLY_SLUG && targets.length === 0) {
    console.error(`No vendor with slug "${ONLY_SLUG}".`);
    process.exit(1);
  }

  const results = {};
  let i = 0;
  for (const v of targets) {
    i++;
    const r = await checkVendor(v);
    results[v.slug] = r;
    const title = r.home.title ? ` — "${r.home.title}"` : "";
    const sec = r.secondary ? ` sec[pages=${r.secondary.probed || 0} ship=${r.secondary.shipping || "✗"} cont=${r.secondary.contact || "✗"} ruo=${r.secondary.ruo || "✗"} coa=${r.secondary.coa || "✗"}]` : "";
    process.stdout.write(
      `[${i}/${targets.length}] ${v.name}: live=${r.live} COA=${r.home.coa || "✗"} RUO(home)=${r.home.ruo || "✗"} ` +
      `reviews=${r.home.review || "✗"} shipping=${r.home.shipping || "✗"} contact=${r.home.contact || "✗"}` +
      (r.product.fetched ? ` productRUO=${r.product.ruo || "✗"} productCOA=${r.product.coa || "✗"}` : "") +
      sec + title + "\n"
    );
  }

  // Cache the raw results
  fs.writeFileSync(CACHE_FILE, JSON.stringify(results, null, 2));
  console.log(`\nWrote raw cache → ${CACHE_FILE}`);

  // Optionally fold automated results into the vendor data as _autoChecks
  if (WRITE_DATA) {
    for (const v of vendors) {
      const r = results[v.slug];
      if (!r) continue;
      const sec = r.secondary || {};
      v._autoChecks = {
        live: r.live,
        coa: Boolean(r.home.coa || r.product.coa || sec.coa),
        ruo: Boolean(r.home.ruo || r.product.ruo || sec.ruo),
        reviews: Boolean(r.home.review || sec.review),
        shipping: Boolean(r.home.shipping || sec.shipping),
        contact: Boolean(r.home.contact || sec.contact),
        productPageFetched: r.product.fetched,
        evidence: {
          coa: r.home.coa || r.product.coa || sec.coa,
          ruo: r.home.ruo || r.product.ruo || sec.ruo,
          reviews: r.home.review || sec.review,
          shipping: r.home.shipping || sec.shipping,
          contact: r.home.contact || sec.contact,
        },
        checkedAt: r.checkedAt,
      };
    }
    fs.writeFileSync(VENDOR_FILE, JSON.stringify(vendors, null, 2));
    console.log(`Folded _autoChecks → ${VENDOR_FILE}`);
  }
}

main().catch((e) => {
  console.error("Failed:", e);
  process.exit(1);
});
