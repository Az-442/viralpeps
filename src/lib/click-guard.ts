// Outbound-click bot detection + anonymised visitor identity for ViralPeps.
//
// Two goals:
//   1. BOT FILTERING — don't log clicks from crawlers, prefetchers, link
//      scanners, headless browsers or scrapers sending a spoofed browser UA.
//   2. ANONYMISED VISITOR ID — so we can tell how many *unique* humans
//      clicked, without storing any PII.
//
// Privacy: the visitor id is a truncated SHA-256 hash of (salt + ip + ua),
// salted with a server-side secret. It is NOT reversible to an IP, contains no
// personal data, sets no cookie, and is used only for aggregate analytics.
// If CLICK_ID_SALT is unset we fall back to a constant salt (still one-way,
// just less collision-resistant).
//
// ---------------------------------------------------------------------------
// HARDENING (5 Nov 2026) — "UA-only detection has a hole"
// ---------------------------------------------------------------------------
// HISTORY: detectBot() originally inspected only the User-Agent. A scraper
// sending a normal Chrome UA passed as human. Real data proved it: visitor
// f79436134f26a4e3 logged 493 product clicks in 159 seconds (median gap 0s,
// 467 of 490 gaps under 2s) across ss-31/dsip/igf-1-lr3/cjc-1295 in sequence.
// 162 such visitors produced 4,701 clicks. 23,161 of 30,104 rows were direct
// /go/ hits with NO referrer at all.
//
// FIX — four independent signals, any one of which rejects the click:
//   1. UA patterns (unchanged, still the cheapest first pass).
//   2. Browser-integrity headers: a genuine top-level navigation from a real
//      browser sends Sec-Fetch-* AND Accept. Their ABSENCE is the single best
//      tell for a scripted client, because scripts rarely bother to fake them.
//   3. Referrer provenance: an outbound click on ViralPeps must come from a
//      ViralPeps page. A /go/ hit with no referrer is direct — not a click.
//      (Scrapers and anyone who knows the URL pattern produce exactly this.)
//   4. Behavioural rate limiting (see click-rate-limit.ts): sub-2s repeat
//      clicks from the same visitor are machine cadence, not human.
//
// NOTE: signals 2 and 3 are bypassable by a determined attacker who fakes
// headers and referrers. Combined with #4 they stop scrapers, prefetchers,
// monitoring, and the observed inflation. They are NOT a security boundary —
// see click-rate-limit.ts for the durable Postgres-backed ceiling.

import { createHash } from "crypto";

/** Known bot / crawler / automation UA substrings (case-insensitive). */
const BOT_UA_PATTERNS = [
  "bot", "crawler", "spider", "crawl", "slurp", "mediapartners",
  "googlebot", "bingbot", "yandex", "baidu", "duckduckbot", "sogou",
  "semrush", "ahrefs", "moz.com", "screaming frog", "sitebulb",
  "mj12bot", "dotbot", "petalbot", "bytespider", "gptbot", "chatgpt-user",
  "ccbot", "claudebot", "anthropic-ai", "perplexitybot", "google-extended",
  "applebot", "ia_archiver", "archive.org", "wayback",
  "facebookexternalhit", "facebookcatalog", "twitterbot", "linkedinbot",
  "whatsapp", "telegrambot", "slackbot", "discordbot", "embedly",
  "pingdom", "uptimerobot", "statuscake", "betteruptime", "newrelicpinger",
  "lighthouse", "pagespeed", "gtmetrix", "webpagetest",
  "headlesschrome", "headless", "phantomjs", "puppeteer", "playwright",
  "selenium", "electron", "curl/", "wget", "python-requests", "python-urllib",
  "go-http-client", "java/", "okhttp", "axios/", "node-fetch", "undici",
  "postmanruntime", "insomnia", "httpclient", "libwww", "scrapy",
  "linkchecker", "validator", "w3c_", "netcraft", "censys", "shodan",
  "nmap", "masscan", "zgrab",
  // Additional automation / scraping stacks
  "puppeteer-core", "pyppeteer", "splash", "htmlunit", "nitro", "jsdom",
  "mechanize", "urllib", "aiohttp", "httpx", "got (", "superagent",
  "datadog", "uptime", "monitor", "synthetic", "prerender", "prerenderer",
  "google-structured-data", "feedfetcher", "feedly", "rss",
];

/** UAs that look like prefetch/prerender even when a real browser sends them. */
const PREFETCH_HINTS = ["preview", "prefetch", "prerender"];

export interface BotVerdict {
  isBot: boolean;
  reason?: string;
}

/**
 * Classify a request as bot or human from its headers.
 * Absent UA => treated as bot (real browsers always send one).
 *
 * `requireReferrer` (default true) additionally rejects requests that carry no
 * Referer header at all, since a genuine badge/product click on ViralPeps
 * always sends one. Pass false only for testing/internal callers.
 */
export function detectBot(
  headers: Headers,
  opts: { requireReferrer?: boolean } = {}
): BotVerdict {
  const requireReferrer = opts.requireReferrer !== false;
  const ua = (headers.get("user-agent") || "").trim();
  const purpose = (headers.get("purpose") || headers.get("x-purpose") || "").toLowerCase();
  const secFetchMode = (headers.get("sec-fetch-mode") || "").toLowerCase();
  const secFetchDest = (headers.get("sec-fetch-dest") || "").toLowerCase();
  const secFetchSite = (headers.get("sec-fetch-site") || "").toLowerCase();
  const accept = (headers.get("accept") || "").toLowerCase();
  const acceptLang = (headers.get("accept-language") || "").trim();
  const referer = (headers.get("referer") || headers.get("referrer") || "").trim();

  // --- Signal 1: User-Agent ------------------------------------------------
  if (!ua) return { isBot: true, reason: "no-user-agent" };

  const lower = ua.toLowerCase();
  for (const p of BOT_UA_PATTERNS) {
    if (lower.includes(p)) return { isBot: true, reason: `ua:${p}` };
  }
  for (const p of PREFETCH_HINTS) {
    if (lower.includes(p)) return { isBot: true, reason: `ua:${p}` };
  }

  // Speculative prefetch/prerender (Chrome sends these) — not a real click.
  if (purpose === "prefetch" || purpose === "prerender") {
    return { isBot: true, reason: `purpose:${purpose}` };
  }

  // A real top-level outbound navigation from a page is fetch-mode=navigate.
  // Direct hits with sec-fetch-dest=empty&mode=no-cors that aren't navigations
  // are typically embeds/scanners. Only flag when BOTH are present and wrong.
  if (secFetchMode && secFetchDest && secFetchMode !== "navigate" && secFetchDest === "empty") {
    return { isBot: true, reason: "sec-fetch:non-navigate" };
  }

  // --- Signal 2: browser-integrity headers ---------------------------------
  // A genuine click in a real browser is a top-level navigation that sends a
  // full header set. Scripted clients overwhelmingly send the bare minimum
  // (often just a spoofed UA). Any missing member of the set is disqualifying.
  // We only apply this to navigation-looking requests; if Sec-Fetch-Mode is
  // absent entirely we cannot verify, so we require Accept + Accept-Language.
  if (secFetchMode === "navigate") {
    if (secFetchDest && secFetchDest !== "document") {
      return { isBot: true, reason: `sec-fetch-dest:${secFetchDest}` };
    }
    if (!accept.includes("text/html")) {
      return { isBot: true, reason: "navigate-without-html-accept" };
    }
  } else if (secFetchMode) {
    // Present but not a navigation — not a link click.
    return { isBot: true, reason: `sec-fetch-mode:${secFetchMode}` };
  } else {
    // No Sec-Fetch-* at all. Modern browsers ALWAYS send these on navigation.
    // Fall back to requiring the two headers every browser sends regardless.
    if (!accept.includes("text/html")) {
      return { isBot: true, reason: "no-sec-fetch-and-no-html-accept" };
    }
    if (!acceptLang) {
      return { isBot: true, reason: "no-accept-language" };
    }
  }

  // Same-origin referrer is expected for an in-site badge click. A cross-site
  // Sec-Fetch-Site on a /go/ URL is not how an outbound badge works.
  if (secFetchSite && secFetchSite === "cross-site" && !referer) {
    return { isBot: true, reason: "cross-site-without-referer" };
  }

  // --- Signal 3: referrer provenance ---------------------------------------
  // A badge or product click happens ON a ViralPeps page, so the browser
  // sends ViralPeps as the Referer. No referrer = direct hit on the /go/ URL
  // (scraper, curl-with-UA, link scanner, or someone who knows the pattern).
  // 23,161 of the original 30,104 rows were exactly this and inflated the
  // report by ~77%.
  if (requireReferrer) {
    if (!referer) return { isBot: true, reason: "no-referrer" };
    let host = "";
    try {
      host = new URL(referer).hostname.toLowerCase();
    } catch {
      return { isBot: true, reason: "malformed-referrer" };
    }
    const okHost =
      host === "viralpeps.co.uk" ||
      host === "www.viralpeps.co.uk" ||
      host.endsWith(".viralpeps.co.uk");
    if (!okHost) return { isBot: true, reason: `offsite-referrer:${host}` };
  }

  return { isBot: false };
}

/**
 * Build a stable, anonymous, one-way visitor id from request headers.
 * Returns a 16-char hex string. Never reversible to an IP or identity.
 */
export function visitorId(headers: Headers): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "0.0.0.0";
  const ua = headers.get("user-agent") || "";
  const lang = headers.get("accept-language") || "";
  const salt = process.env.CLICK_ID_SALT || "viralpeps-click-salt-v1";
  return createHash("sha256")
    .update(`${salt}|${ip}|${ua}|${lang}`)
    .digest("hex")
    .slice(0, 16);
}
