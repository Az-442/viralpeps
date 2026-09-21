const fs = require('fs');

const VENDOR_NAME = 'HelixCore';
const VENDOR_SLUG = 'helix-core';
const IMG_BASE = `/images/products/${VENDOR_SLUG}`;

// slug -> { url, price (from £), dosage }
const P = {
  'bpc-157': { u: 'https://helixcore.co.uk/products/bpc-157', p: 14.99, d: '5mg' },
  'tb-500': { u: 'https://helixcore.co.uk/products/tb-500', p: 15.99, d: '5mg' },
  'bpc-157-tb-500': { u: 'https://helixcore.co.uk/products/bpc-157-tb-500-blend', p: 35.99, d: '10mg blend' },
  'cjc-1295-ipamorelin-blend': { u: 'https://helixcore.co.uk/products/cjc-1295-ipamorelin-blend', p: 39.99, d: '10mg blend' },
  'ipamorelin': { u: 'https://helixcore.co.uk/products/ipamorelin', p: 18.99, d: '5mg' },
  'cjc-1295-no-dac': { u: 'https://helixcore.co.uk/products/cjc-1295-no-dac', p: 24.99, d: '5mg' },
  'cjc-1295-with-dac': { u: 'https://helixcore.co.uk/products/cjc-1295-with-dac', p: 34.99, d: '5mg' },
  'ghk-cu': { u: 'https://helixcore.co.uk/products/ghk-cu', p: 23.99, d: '50mg' },
  'semax': { u: 'https://helixcore.co.uk/products/semax', p: 13.99, d: '5mg' },
  'selank': { u: 'https://helixcore.co.uk/products/selank', p: 12.99, d: '5mg' },
  'ghrp-6': { u: 'https://helixcore.co.uk/products/ghrp-6', p: 10.99, d: '5mg' },
  'mots-c': { u: 'https://helixcore.co.uk/products/mots-c', p: 26.99, d: '10mg' },
  'tesamorelin': { u: 'https://helixcore.co.uk/products/tesamorelin', p: 64.99, d: '10mg' },
  'aod-9604': { u: 'https://helixcore.co.uk/products/aod-9604', p: 22.99, d: '5mg' },
  'epitalon': { u: 'https://helixcore.co.uk/products/epitalon', p: 17.99, d: '10mg' },
  'nad-plus': { u: 'https://helixcore.co.uk/products/nad-plus', p: 64.99, d: '500mg' },
  'sermorelin': { u: 'https://helixcore.co.uk/products/sermorelin', p: 31.99, d: '5mg' },
  'kisspeptin-10': { u: 'https://helixcore.co.uk/products/kisspeptin-10', p: 17.99, d: '5mg' },
  'pt-141': { u: 'https://helixcore.co.uk/products/pt-141', p: 21.99, d: '10mg' },
  'melanotan-i': { u: 'https://helixcore.co.uk/products/mt-1', p: 26.99, d: '10mg' },
  'thymosin-alpha-1': { u: 'https://helixcore.co.uk/products/thymosin-alpha-1', p: 21.99, d: '5mg' },
  'kpv': { u: 'https://helixcore.co.uk/products/kpv', p: 29.99, d: '10mg' },
  'dsip': { u: 'https://helixcore.co.uk/products/dsip', p: 15.99, d: '5mg' },
  'ss-31': { u: 'https://helixcore.co.uk/products/ss-31', p: 29.99, d: '10mg' },
  'll-37': { u: 'https://helixcore.co.uk/products/ll-37', p: 34.99, d: '5mg' },
  'ara-290': { u: 'https://helixcore.co.uk/products/ara-290', p: 48.99, d: '10mg' },
  'thymalin': { u: 'https://helixcore.co.uk/products/thymalin', p: 24.99, d: '10mg' },
  'glow': { u: 'https://helixcore.co.uk/products/glow-research-blend', p: 49.99, d: '50mg blend' },
  'bacteriostatic-water': { u: 'https://helixcore.co.uk/products/bacteriostatic-water', p: 6.99 },
  '5-amino-1mq': { u: 'https://helixcore.co.uk/products/5-amino-1mq', p: 39.99, d: '10mg' },
};

function fmt(n) { return '£' + n.toFixed(2); }
function entry(slug, o) {
  const e = {
    vendor: VENDOR_NAME,
    url: o.u,
    price: fmt(o.p),
    inStock: true
  };
  if (o.d) e.dosage = o.d;
  e.image = `${IMG_BASE}/${slug}.webp`;
  return e;
}

// ---- 1. compounds.json ----
const cpath = 'src/data/compounds.json';
const compounds = JSON.parse(fs.readFileSync(cpath, 'utf8'));
let added = 0, skipped = [];
for (const [slug, o] of Object.entries(P)) {
  const comp = compounds.find((x) => x.slug === slug && Array.isArray(x.sources));
  if (!comp) { skipped.push('NOCOMP:' + slug); continue; }
  if (comp.sources.some((s) => s.vendor === VENDOR_NAME)) { skipped.push('DUP:' + slug); continue; }
  comp.sources.push(entry(slug, o));
  added++;
}
fs.writeFileSync(cpath, JSON.stringify(compounds, null, 2));
console.log('compounds added=', added, 'skipped=', skipped.join(','));

// ---- 2. vendors.json ----
const vpath = 'src/data/vendors.json';
const vendors = JSON.parse(fs.readFileSync(vpath, 'utf8'));
if (vendors.some((v) => v.slug === VENDOR_SLUG)) {
  console.log('VENDOR ALREADY PRESENT - not adding');
} else {
  const block = {
    id: VENDOR_SLUG,
    name: VENDOR_NAME,
    slug: VENDOR_SLUG,
    website: 'https://helixcore.co.uk',
    rating: 4,
    verified: false,
    founded: 2026,
    country: 'UK',
    description: 'HelixCore (HelixCore Ltd, Companies House no. 17247085) is a UK-registered research peptide and research-compound supplier with an 8-category range of 31+ stocked items spanning BPC-157, TB-500, GHK-Cu, CJC-1295, Ipamorelin, MOTS-c, Tesamorelin, Semax, Selank, AOD-9604, Epitalon, thymalin/SS-31/LL-37/AOD blends and laboratory utilities. Each listed product carries an identifiable batch reference with its supplied certificate of analysis published (98%+ purity per source specifications), research-use-only labelling and an 18+ research-gated website. Stocked and dispatched from within the UK via Royal Mail Tracked 24 with same-day dispatch on orders before 2pm and free UK delivery on every order.',
    highlights: [
      'UK-registered (HelixCore Ltd, Companies House 17247085)',
      '31+ products across 8 research categories, all UK-stocked',
      'Batch certificates / COA published per batch',
      'Research-use-only, 18+ gated site',
      'Royal Mail Tracked 24, same-day dispatch before 2pm',
      'Free UK delivery on every order; plain lab packaging'
    ],
    shipping: [
      'UK addresses only (England, Scotland, Wales, Northern Ireland)',
      'Free Royal Mail Tracked 24 on every order (1–3 business days)',
      'Same-day dispatch before 2pm Mon–Fri on cleared orders'
    ],
    payment: [
      'Bank transfer',
      'Approved pay-by-bank methods'
    ],
    lastTested: '',
    labTested: true
  };
  vendors.push(block);
  fs.writeFileSync(vpath, JSON.stringify(vendors, null, 2));
  console.log('vendor added, total =', vendors.length);
}
