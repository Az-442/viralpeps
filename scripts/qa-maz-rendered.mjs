import fs from "node:fs";

const files = [
  "where-to-buy-mazdutide-uk",
  "cheapest-mazdutide-uk",
  "mazdutide-price-comparison-uk",
  "buy-mazdutide-online-uk",
  "mazdutide-uk-supplier",
  "best-mazdutide-peptide",
];

const textOf = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&pound;/g, "£").replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
      .replace(/\s+/g, " ");

let fail = 0;
for (const slug of files) {
  const p = `.next/server/app/compound-guides/${slug}.html`;
  if (!fs.existsSync(p)) { console.log(`MISSING BUILD FILE: ${p}`); fail++; continue; }
  const html = fs.readFileSync(p, "utf8");
  const text = textOf(html);

  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="(.*?)"/) || [])[1] || "";
  const h1 = (text.match(/Where to Buy Mazdutide|Cheapest Mazdutide|Mazdutide Price Comparison|Buy Mazdutide Online|Mazdutide UK Supplier|Best Mazdutide Peptide/) || [])[0] || "";

  // Gate checks on the RENDERED page.
  const issues = [];
  if (/https?:\/\/[^\s"]*\.webp/.test(text)) issues.push("RAW IMAGE URL IN TEXT");
  if (/\b\d{2,7}-\d{2}-\d\b/.test(text)) issues.push("CAS-LIKE NUMBER RENDERED");
  if (/\bmonth(s|ly)?\b/i.test(title + " " + desc)) issues.push("MONTH IN TITLE/DESC");
  if (!/£/.test(text)) issues.push("NO £ FOUND");
  if (/we sell|our vials|we stock|we ship/i.test(text)) issues.push("SELL CLAIM");

  // The live price table should be present with real vendor names.
  const hasVendors = /PeptX|VialVerse|Chilton Labs|Raccoon Peptides|UK Peptides|HiPeptides|BioPlex|Peptides UK 4U/i.test(text);

  console.log(`${slug}`);
  console.log(`  title(${title.length}): ${title}`);
  console.log(`  desc (${desc.length}): ${desc.slice(0, 80)}...`);
  console.log(`  vendors in table: ${hasVendors}`);
  console.log(`  issues: ${issues.length ? issues.join("; ") : "none"}`);
  if (issues.length) fail++;
}

// Compound hub page
const hubHtml = fs.readFileSync(".next/server/app/compounds/mazdutide.html", "utf8");
const hubText = textOf(hubHtml);
console.log("\n/compounds/mazdutide");
const siloLinks = [...hubHtml.matchAll(/href="\/compound-guides\/([a-z0-9-]*mazdutide[a-z0-9-]*)"/g)].map((m) => m[1]);
console.log(`  silo links found: ${[...new Set(siloLinks)].length}`);
console.log(`  ${[...new Set(siloLinks)].join(", ")}`);
console.log(`  raw image url: ${/https?:\/\/[^\s"]*\.webp/.test(hubText)}`);

process.exit(fail ? 1 : 0);
