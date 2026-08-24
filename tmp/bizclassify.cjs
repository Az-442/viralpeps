const r = JSON.parse(require("fs").readFileSync("/tmp/bizcheck_results.json", "utf8"));
const genuineNames = ["Pure Progress Ltd","Pure Peptides UK","Imperial Peptides UK","Research Sciences Ltd","Tide Labs","TL Research Ltd","Dr P Research","R V Research Ltd","New Wave Peptides","New Wave Solutions","Anglo Peptides","Proforma Peptides","XL Peptides","Bio Research","Premio Peptides","BELL RED","ThePeptideCode","Stratford Peptides","Peptify UK","PeptidesX","Polygon Peptides","DEB Ventures","Crown Peptides","Bio Peptides UK","UK Peptide Lab","RETA UK","TEST TRADER","Trutide","Express Peptides","Prism Industries","The Peptide Company","Auto Trading Machine"];

const confirmed = [];
for (const x of r) {
  if (!x.found) continue;
  const ctx = x.matched.map((m) => m.ctx).join(" ");
  const hasCompanyNo = /Company\s*(?:Registration\s*)?No\.?\s*\d{6,}/i.test(ctx) || /Companies\s*House/i.test(ctx);
  const hasTradingName = /(?:trading (?:name|as)|trading name of)\s+[A-Za-z&' \-]{2,}(?:Ltd|Limited)/i.test(ctx);
  const hasLtdName = /[A-Z][A-Za-z&'\- ]{2,}(Ltd|Limited)/.test(ctx);
  const isGenuine = hasCompanyNo || hasTradingName || (hasLtdName && /England|copyright|© 2026/.test(ctx));
  if (isGenuine) confirmed.push(x.name);
}
console.log("Genuine registered-business presences: " + confirmed.length);
console.log(confirmed.sort().join("\n"));
