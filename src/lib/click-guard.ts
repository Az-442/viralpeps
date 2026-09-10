// Outbound-click bot detection + anonymised visitor identity for ViralPeps.
//
// Two goals:
//   1. BOT FILTERING — don't log clicks from crawlers, prefetchers, link
//      scanners or headless browsers. They pollute the supplier report.
//   2. ANONYMISED VISITOR ID — so we can tell how many *unique* humans
//      clicked, without storing any PII.
//
// Privacy: the visitor id is a truncated SHA-256 hash of (salt + ip + ua),
// salted with a server-side secret. It is NOT reversible to an IP, contains no
// personal data, sets no cookie, and is used only for aggregate analytics.
// If CLICK_ID_SALT is unset we fall back to a constant salt (still one-way,
// just less collision-resistant).

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
 */
export function detectBot(headers: Headers): BotVerdict {
  const ua = (headers.get("user-agent") || "").trim();
  const purpose = (headers.get("purpose") || headers.get("x-purpose") || "").toLowerCase();
  const secFetchMode = (headers.get("sec-fetch-mode") || "").toLowerCase();
  const secFetchDest = (headers.get("sec-fetch-dest") || "").toLowerCase();

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
