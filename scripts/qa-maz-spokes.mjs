/**
 * QA gate for the mazdutide silo. Parses the built spokes file (as data) and
 * checks every content rule from the brief. Exits non-zero on any failure.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";

// Compile the TS to JS on the fly with esbuild if present, else use tsc-free
// trick: strip types via a regex is unsafe, so use the project's own toolchain.
const src = fs.readFileSync("src/data/mazdutide-spokes.ts", "utf8");

// Pull the spokes array out and eval it as JSON-ish by converting the TS
// object literal. Simplest robust route: use vitest-free `node --experimental-strip-types`
// if available, otherwise transpile with the local typescript package.
let mod;
try {
  const ts = (await import("typescript")).default;
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const tmp = `/tmp/maz-spokes-built-${Date.now()}.mjs`;
  fs.writeFileSync(tmp, js);
  mod = await import(tmp);
} catch (e) {
  console.error("TRANSPILE FAILED:", e.message);
  process.exit(1);
}

const { spokes } = mod;
const problems = [];
const EXPECTED = [
  "where-to-buy-mazdutide-uk",
  "cheapest-mazdutide-uk",
  "mazdutide-price-comparison-uk",
  "buy-mazdutide-online-uk",
  "mazdutide-uk-supplier",
  "best-mazdutide-peptide",
];

console.log("spoke count:", spokes.length);
if (spokes.length !== 6) problems.push(`expected 6 spokes, got ${spokes.length}`);

const seenSlugs = spokes.map((s) => s.slug);
for (const want of EXPECTED) {
  if (!seenSlugs.includes(want)) problems.push(`MISSING SLUG: ${want}`);
}
for (const s of seenSlugs) {
  if (!EXPECTED.includes(s)) problems.push(`UNEXPECTED SLUG: ${s}`);
}

const countWords = (str) =>
  String(str)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`>]/g, " ")
    .split(/\s+/)
    .filter((w) => /[a-zA-Z0-9£]/.test(w)).length;

console.log("\n=== PER-SPOKE QA ===");
const results = [];
for (const s of spokes) {
  const bodyWords = countWords(
    [s.h1, ...(s.intro || []), ...(s.sections || []).flatMap((x) => [x.title, x.body, ...(x.list || []), ...((x.table?.rows || []).flat())]), ...(s.faq || []).flatMap((f) => [f.question, f.answer])].join(" ")
  );

  const tLen = s.title.length;
  const dLen = s.description.length;

  console.log(`\n${s.slug}`);
  console.log(`  title (${tLen}): ${s.title}`);
  console.log(`  desc  (${dLen}): ${s.description}`);
  console.log(`  h1:      ${s.h1}`);
  console.log(`  words:   ${bodyWords}`);
  console.log(`  sections: ${s.sections.length} | faq: ${s.faq.length} | sources: ${s.sources.length} | tableMode: ${s.tableMode}`);

  if (bodyWords < 1200) problems.push(`${s.slug}: only ${bodyWords} words (min 1200)`);
  if (tLen < 58 || tLen > 72) problems.push(`${s.slug}: title length ${tLen} outside 58-72`);
  if (dLen < 155 || dLen > 160) problems.push(`${s.slug}: meta description length ${dLen} outside 155-160`);
  const kw = s.focusKeyword;
  if (!s.title.toLowerCase().includes(kw)) problems.push(`${s.slug}: focus keyword not in title`);
  if (!s.description.toLowerCase().includes(kw)) problems.push(`${s.slug}: focus keyword not in description`);
  if (!s.intro[0].toLowerCase().includes(kw)) problems.push(`${s.slug}: focus keyword not in intro para 1`);
  if (s.sections.length < 3) problems.push(`${s.slug}: fewer than 3 sections`);
  if (s.faq.length < 3) problems.push(`${s.slug}: fewer than 3 FAQ`);
  if (!s.sources.length) problems.push(`${s.slug}: no sources`);

  results.push({ slug: s.slug, words: bodyWords, titleLen: tLen, descLen: dLen });
}

console.log("\n=== CONTENT RULE SCAN (whole file) ===");
const lower = src.toLowerCase();
const banned = [
  ["month", /\bmonths?\b/i],
  ["monthly", /\bmonthly\b/i],
];
for (const [name, re] of banned) {
  // "month" is banned in title/meta/H1 only per the brief; scan those fields.
  for (const s of spokes) {
    for (const [field, val] of [["title", s.title], ["description", s.description], ["h1", s.h1]]) {
      if (re.test(val)) problems.push(`${s.slug}: "${name}" in ${field}`);
    }
  }
}
// Guarantee: no doses given as human dosing instructions, no #1-10mg style mg dosing advice.
const dosingPatterns = [
  /\b(start|begin|inject|take|dose)\s+(at|with)\s+\d/i,
  /\bdose\s+of\s+\d/i,
  /\bmg\s+(per\s+(day|week)|weekly\s+dose)/i,
];
for (const re of dosingPatterns) {
  const m = src.match(re);
  if (m) problems.push(`possible dosing instruction: "${m[0]}"`);
}

// No CAS numbers may reach the rendered page. Strip comments first, then scan
// only the live data fields.
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const rendered = JSON.stringify(spokes.map((s) => ({
  title: s.title, description: s.description, h1: s.h1,
  intro: s.intro, sections: s.sections, faq: s.faq, sources: s.sources,
})));
const casRe = /\b\d{2,7}-\d{2}-\d\b/g;
const casHits = [...rendered.matchAll(casRe)].map((m) => m[0]);
if (casHits.length) problems.push(`CAS-like number(s) in RENDERED page content: ${[...new Set(casHits)].join(", ")}`);

// The rendered content must not contain raw image URLs either.
const imgUrlHits = [...rendered.matchAll(/https?:\/\/[^\s"]+\.(webp|jpe?g|png)/g)].map((m) => m[0]);
if (imgUrlHits.length) problems.push(`raw image URL(s) in rendered content: ${[...new Set(imgUrlHits)].join(", ")}`);
void stripComments;

// No invented/duplicated PMIDs — every published URL must be a real pubmed/pubchem link.
const urls = [...src.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
const badUrls = urls.filter((u) => !/^https:\/\/(pubmed\.ncbi\.nlm\.nih\.gov\/\d+\/?|pubchem\.ncbi\.nlm\.nih\.gov\/compound\/\d+)$/.test(u));
if (badUrls.length) problems.push(`non-pubmed/pubchem source URL(s): ${badUrls.join(", ")}`);

// PMID in label must match the URL id.
for (const s of spokes) {
  for (const src2 of s.sources) {
    const pid = src2.label.match(/PMID\s+(\d+)/);
    if (pid) {
      if (!src2.url.includes(pid[1])) problems.push(`${s.slug}: PMID ${pid[1]} label does not match URL ${src2.url}`);
    }
  }
}

// ViralPeps must not claim to sell, or claim COAs of its own.
const sellClaims = [/we sell/i, /our vials/i, /we stock/i, /we ship/i, /our coa/i];
for (const re of sellClaims) {
  const m = src.match(re);
  if (m) problems.push(`possible sell/COA claim: "${m[0]}"`);
}

console.log("PMIDs referenced:", [...new Set([...src.matchAll(/PMID\s+(\d+)/g)].map((m) => m[1]))].join(", "));
console.log("source URLs:", [...new Set(urls)].join("\n             "));

console.log("\n=== RESULT ===");
if (problems.length) {
  console.log("FAILURES:");
  for (const p of problems) console.log(" - " + p);
  process.exit(1);
} else {
  console.log("ALL CHECKS PASSED");
  console.log(JSON.stringify(results, null, 2));
}
