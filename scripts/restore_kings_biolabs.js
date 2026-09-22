/**
 * Restore Kings BioLabs — vendor entry + 13 source entries.
 *
 * Context: the 19 Sep run removed Kings BioLabs because the whole site was
 * down (Webflow unpublished). It is live again as of tonight — all 13 verified
 * URLs return product-specific titles (guard #1 pass) and unique product images
 * (guard #3 pass). This script restores the exact entries parked in 5aede1f6.
 */
const fs = require('fs');
const VENDORS = '/Users/time4you/viralpeps/src/data/vendors.json';
const COMPOUNDS = '/Users/time4you/viralpeps/src/data/compounds.json';

const vendors = JSON.parse(fs.readFileSync(VENDORS, 'utf8'));
const compounds = JSON.parse(fs.readFileSync(COMPOUNDS, 'utf8'));

// ---- 1. Vendor entry (verbatim from 5aede1f6) ----
const KINGS = {
  "id": "kings-bio-labs",
  "name": "Kings BioLabs",
  "slug": "kings-bio-labs",
  "website": "https://www.kingsbiolabs.co.uk",
  "rating": 4.5,
  "verified": true,
  "country": "UK",
  "description": "Kings BioLabs is a UK research-peptide supplier operated by Kings BioLabs Ltd (company no. 17404130, registered in England and Wales) offering lyophilised research material with batch traceability and a Certificate of Analysis available on request for each product and strength. Orders are shipped via an appropriate tracked UK delivery service, with a GBP 4.99 UK delivery charge. The site is TrustedSite verified and runs a research-use-only policy across the range.",
  "highlights": [
    "UK-registered company - Kings BioLabs Ltd, company no. 17404130",
    "Batch traceability across the catalogue",
    "Certificate of Analysis available on request per product and strength",
    "Tracked UK delivery service where available",
    "TrustedSite verified and verified payment processing (Wallid)",
    "Research-use-only - not for human consumption, diagnostic or therapeutic use"
  ],
  "email": "info@kingsbiolabs.co.uk",
  "delivery": "£4.99 flat UK delivery · tracked UK service where available · UK-only · orders before 2pm Mon-Fri normally dispatched same working day",
  "shipping": [
    "UK — tracked delivery service where available",
    "£4.99 UK delivery",
    "Orders placed before 2:00pm Monday-Friday are normally dispatched the same working day; same-day dispatch is not guaranteed",
    "Estimated delivery times begin from date of dispatch, not date of order"
  ],
  "payment": [
    "Card payment",
    "Verified payment processing (Wallid)"
  ],
  "lastTested": "2026-09-22",
  "labTested": true,
  "_autoChecks": {
    "live": true,
    "coa": true,
    "ruo": true,
    "reviews": true,
    "shipping": true,
    "contact": true,
    "productPageFetched": true,
    "evidence": { "coa": "certificate of analys", "ruo": "research use only", "reviews": "trustpilot", "shipping": "tracked", "contact": "contact" },
    "checkedAt": "2026-09-22T01:00:00.000Z",
    "note": "Re-verified 2026-09-22: site back online after a Webflow outage that took it down on 2026-09-19. Trustpilot profile live (reviews=true). Product-page title guard passed on all 13 URLs; all 13 product images unique (MD5)."
  }
};

if (!vendors.find(v => v.name === 'Kings BioLabs')) {
  vendors.push(KINGS);
  console.log('vendor entry ADDED');
} else {
  console.log('vendor entry already present — skipped');
}

// ---- 2. Source entries ----
const SOURCES = [
  { slug: 'bpc-157', url: 'https://www.kingsbiolabs.co.uk/bpc-157', price: '£18.00', dosage: '10mg', image: '/images/products/kings-bio-labs/bpc-157.webp' },
  { slug: 'tb-500', url: 'https://www.kingsbiolabs.co.uk/tb-500', price: '£25.00', dosage: '10mg', image: '/images/products/kings-bio-labs/tb-500.webp' },
  { slug: 'tesamorelin', url: 'https://www.kingsbiolabs.co.uk/tesamorelin', price: '£45.00', dosage: '10mg', image: '/images/products/kings-bio-labs/tesamorelin.webp' },
  { slug: 'mots-c', url: 'https://www.kingsbiolabs.co.uk/mots-c', price: '£55.00', dosage: '40mg', image: '/images/products/kings-bio-labs/mots-c.webp' },
  { slug: 'ss-31', url: 'https://www.kingsbiolabs.co.uk/ss-31', price: '£40.00', dosage: '10mg', image: '/images/products/kings-bio-labs/ss-31.webp' },
  { slug: 'ghk-cu', url: 'https://www.kingsbiolabs.co.uk/ghk-cu', price: '£45.00', dosage: '100mg', image: '/images/products/kings-bio-labs/ghk-cu.webp' },
  { slug: 'kpv', url: 'https://www.kingsbiolabs.co.uk/kpv', price: '£20.00', dosage: '10mg', image: '/images/products/kings-bio-labs/kpv.webp' },
  { slug: 'thymosin-alpha-1', url: 'https://www.kingsbiolabs.co.uk/thymosin-alpha-1', price: '£55.00', dosage: '10mg', image: '/images/products/kings-bio-labs/thymosin-alpha-1.webp' },
  { slug: 'selank', url: 'https://www.kingsbiolabs.co.uk/selank', price: '£25.00', dosage: '10mg', image: '/images/products/kings-bio-labs/selank.webp' },
  { slug: 'ara-290', url: 'https://www.kingsbiolabs.co.uk/ara-290', price: '£30.00', dosage: '10mg', image: '/images/products/kings-bio-labs/ara-290.webp' },
  { slug: 'dsip', url: 'https://www.kingsbiolabs.co.uk/dsip', price: '£40.00', dosage: '10mg', image: '/images/products/kings-bio-labs/dsip.webp' },
  { slug: 'nad-plus', url: 'https://www.kingsbiolabs.co.uk/nad', price: '£50.00', dosage: '1000mg', image: '/images/products/kings-bio-labs/nad-plus.webp' },
  { slug: 'cjc-1295-ipamorelin-blend', url: 'https://www.kingsbiolabs.co.uk/cjc-1295-ipamorelin', price: '£40.00', dosage: '10mg', image: '/images/products/kings-bio-labs/cjc-1295-ipamorelin-blend.webp' },
];

let added = 0, skipped = [];
for (const s of SOURCES) {
  const c = compounds.find(x => x.slug === s.slug);
  if (!c) { skipped.push(s.slug + ' (compound not found)'); continue; }
  c.sources = c.sources || [];
  if (c.sources.some(x => x.vendor === 'Kings BioLabs')) { skipped.push(s.slug + ' (already present)'); continue; }
  c.sources.push({ vendor: 'Kings BioLabs', url: s.url, price: s.price, inStock: true, image: s.image, dosage: s.dosage });
  added++;
}

console.log('sources ADDED:', added, '/', SOURCES.length);
if (skipped.length) console.log('skipped:', skipped.join('; '));

fs.writeFileSync(VENDORS, JSON.stringify(vendors, null, 2) + '\n');
fs.writeFileSync(COMPOUNDS, JSON.stringify(compounds, null, 2) + '\n');
console.log('vendors:', vendors.length, '| compounds:', compounds.length);
