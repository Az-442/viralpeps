import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the PT-141 (Bremelanotide) silo (hub + 6 spokes).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * PT-141 / Bremelanotide is a cyclic heptapeptide melanocortin receptor
 * agonist (free base C50H68N14O10, MW 1025.2; CAS 189691-06-3). In
 * compounds.json it is a single master entry (73 sources) plus several child
 * variant entries whose `compareSlug` is "pt-141-bremelanotide" — those are
 * folded in so the full UK market shows on one table.
 *
 * Three data quirks this builder sanitises:
 *   1. Several vendors publish pack sizes through an options[] array rather
 *      than one source per pack — that array is expanded into one row per pack.
 *   2. Many sources carry no dosage label at all. They are kept (they are real
 *      listings) but sink to the bottom of any per-mg ranking and render "—"
 *      rather than being compared unfairly.
 *   3. One source carries a junk price ("£—"). parsePrice returns NaN for it
 *      and the row is dropped rather than shown as £0.00.
 */

export interface Pt141Row {
  /** Row identity — vendor + price + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "10mg" / "10mg×10vials" / "—". */
  pack: string;
  /** Normalised milligram figure the pack label states (kit packs = total mg). */
  mg: number | null;
  price: number;
  priceLabel: string;
  /** True when the listed pack is a multi-vial kit rather than a single vial. */
  isKit: boolean;
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
  /**
   * Compound slug the /go/ route must resolve against for this vendor.
   * Master sources resolve at "pt-141-bremelanotide"; vendors that only appear
   * on a child variant entry resolve only at that child slug.
   */
  goCompoundSlug: string;
}

export interface Pt141Stats {
  suppliers: number;
  products: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bestPerMg: number | null;
  bestPerMgVendor: string | null;
  topTrustScore: number | null;
  topTrustVendor: string | null;
  packs: number;
}

const COMPOUND_SLUG = "pt-141-bremelanotide";

const pt141Compound = (compounds as any[]).find((c) => c?.slug === COMPOUND_SLUG);

/** Parse "£24.99" → 24.99. Ranges take the low end. Returns NaN for junk ("£—"). */
export function parsePrice(price: string): number {
  const cleaned = String(price || "").replace(/[£$€,]/g, "");
  const m = cleaned.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

/**
 * Pack label → milligram figure.
 *   "10mg" / "10 mg" / "10mg vial"  → 10
 *   "10mg×10vials" / "5mg x 10"     → 100 (kit: total material in the pack)
 *   "—" / ""                        → null
 * Microgram packs are normalised ("500mcg" → 0.5).
 */
export function mgFromLabel(label: string): number | null {
  const raw = String(label || "");
  const unit = raw.match(/([\d.]+)\s*mg/i);
  let mg: number | null = null;
  if (unit) {
    mg = parseFloat(unit[1]);
  } else {
    const micro = raw.match(/([\d.]+)\s*(?:mcg|µg|ug)/i);
    if (micro) mg = parseFloat(micro[1]) / 1000;
  }
  if (mg === null || !(mg > 0)) return null;
  // Multi-vial kit, e.g. "10mg×10vials" or "5 mg x 10" — multiply out.
  const kit = raw.match(/[x×]\s*(\d+)\s*(?:vials?|pcs?|units?)?/i);
  if (kit) mg = mg * parseInt(kit[1], 10);
  return mg;
}

/** True when the pack label describes more than one vial. */
function isKitLabel(label: string): boolean {
  return /[x×]\s*\d+/i.test(String(label || ""));
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Vendor name → vendors.json slug. The synthesised slug is only a fallback:
 * vendors whose slug does not derive from their display name (e.g. "JGPep+" →
 * jgpeptidesplus) would otherwise produce broken /go/ links. Always prefer the
 * registry slug.
 */
const VENDOR_SLUGS = new Map(
  (vendors as any[]).map((v) => [v.name, v.slug as string])
);

export function vendorSlugFor(name: string): string {
  return VENDOR_SLUGS.get(name) || slugifyVendor(name);
}

const VERIFIED_VENDORS = new Set(
  (vendors as any[]).filter((v) => v?.verified).map((v) => v.name)
);

function trustFor(vendorSlug: string): number | null {
  const entry = (trustScore as any)[vendorSlug];
  if (!entry) return null;
  let score = 0;
  const home = entry.home || {};
  const secondary = entry.secondary || {};
  if (entry.live) score += 10;
  if (home.status === 200) score += 5;
  if (home.coa || secondary.coa) score += 25;
  if (home.ruo || secondary.ruo) score += 5;
  if (home.review || secondary.review) score += 10;
  if (home.shipping || secondary.shipping) score += 5;
  if (home.contact || secondary.contact) score += 10;
  if (home.title) score += 5;
  return Math.min(100, score);
}

/**
 * Every PT-141 price listing, normalised. Options arrays (multi-pack vendors)
 * are expanded into one row per pack. Child variant entries
 * (compareSlug === "pt-141-bremelanotide") are folded in so the full market shows.
 */
export function getPt141Rows(): Pt141Row[] {
  const entries = (compounds as any[]).filter(
    (c) => c?.slug === COMPOUND_SLUG || c?.compareSlug === COMPOUND_SLUG
  );
  // Vendors present on the master entry — these resolve /go/ at the master slug.
  const masterVendors = new Set(
    ((entries.find((c) => c?.slug === COMPOUND_SLUG)?.sources || []) as any[]).map(
      (s) => s.vendor
    )
  );
  const rows: Pt141Row[] = [];
  for (const entry of entries) {
    for (const s of (entry.sources || []) as any[]) {
      const vendorSlug = vendorSlugFor(s.vendor);
      const verified = VERIFIED_VENDORS.has(s.vendor);
      const trustScoreValue = trustFor(vendorSlug);
      // Master wins when a vendor is listed on both; otherwise use the child
      // slug the vendor actually appears on so /go/ can find its source URL.
      const goCompoundSlug = masterVendors.has(s.vendor) ? COMPOUND_SLUG : entry.slug;

      if (Array.isArray(s.options) && s.options.length > 0) {
        for (const opt of s.options) {
          const price = parsePrice(opt.price);
          if (!Number.isFinite(price) || price <= 0) continue;
          const pack = String(opt.size || "—");
          const mg = mgFromLabel(pack);
          rows.push({
            key: `${vendorSlug}|${price.toFixed(2)}|${pack}`,
            vendor: s.vendor,
            vendorSlug,
            verified,
            pack,
            mg,
            price,
            priceLabel: `£${price.toFixed(2)}`,
            isKit: isKitLabel(pack),
            perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
            perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
            url: s.url,
            inStock: s.inStock !== false,
            trustScore: trustScoreValue,
            goCompoundSlug,
          });
        }
        continue;
      }

      const price = parsePrice(s.price);
      if (!Number.isFinite(price) || price <= 0) continue;
      const pack = String(s.dosage || s.note || "—");
      const mg = mgFromLabel(pack);
      rows.push({
        key: `${vendorSlug}|${price.toFixed(2)}|${pack}`,
        vendor: s.vendor,
        vendorSlug,
        verified,
        pack,
        mg,
        price,
        priceLabel: `£${price.toFixed(2)}`,
        isKit: isKitLabel(pack),
        perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
        perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
        url: s.url,
        inStock: s.inStock !== false,
        trustScore: trustScoreValue,
        goCompoundSlug,
      });
    }
  }
  // De-duplicate on vendor + price + pack. A vendor legitimately has several
  // listings at different prices (different pack sizes) — those all survive.
  // What must not survive is the same listing appearing on both the master and
  // a child entry, which is what the PT-141 child variants duplicate.
  const seen = new Set<string>();
  return rows.filter((r) => {
    const k = `${r.vendorSlug}|${r.price.toFixed(2)}|${r.pack}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: Pt141Row[]): Pt141Row[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: Pt141Row[]): Pt141Row[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: Pt141Row[]): Pt141Row[] {
  return [...rows].sort((a, b) => {
    const av = a.verified ? 1 : 0;
    const bv = b.verified ? 1 : 0;
    if (av !== bv) return bv - av;
    const at = a.trustScore ?? 0;
    const bt = b.trustScore ?? 0;
    if (at !== bt) return bt - at;
    return a.price - b.price;
  });
}

export function getPt141Stats(): Pt141Stats {
  const rows = getPt141Rows();
  const prices = rows.map((r) => r.price);
  const perMgRows = rows.filter((r) => r.perMg !== null);
  const bestPerMgRow = perMgRows.length
    ? perMgRows.reduce((min, r) => (r.perMg! < min.perMg! ? r : min))
    : null;
  const packs = new Set(rows.map((r) => r.pack).filter((p) => p && p !== "—"));
  const scored = rows.filter((r) => r.verified && r.trustScore !== null);
  const topTrustRow = scored.length
    ? scored.reduce((best, r) => (r.trustScore! > best.trustScore! ? r : best))
    : null;
  return {
    suppliers: new Set(rows.map((r) => r.vendor)).size,
    products: rows.length,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    avgPrice: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
    bestPerMg: bestPerMgRow?.perMg ?? null,
    bestPerMgVendor: bestPerMgRow?.vendor ?? null,
    topTrustScore: topTrustRow?.trustScore ?? null,
    topTrustVendor: topTrustRow?.vendor ?? null,
    packs: packs.size,
  };
}

export const pt141 = pt141Compound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const PT141_SPOKES = [
  {
    slug: "where-to-buy-pt-141-uk",
    num: "01",
    title: "Where to Buy PT-141 UK",
    desc: "Verified UK suppliers, bremelanotide naming and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-pt-141-uk",
    num: "02",
    title: "Cheapest PT-141 UK",
    desc: "Lowest verified price per mg, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "pt-141-price-comparison-uk",
    num: "03",
    title: "PT-141 Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-pt-141-online-uk",
    num: "04",
    title: "Buy PT-141 Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "pt-141-uk-supplier",
    num: "05",
    title: "PT-141 UK Supplier",
    desc: "How to verify a UK supplier's COAs, stock and TrustScore before you buy.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Verified" as const,
  },
  {
    slug: "best-pt-141-peptide",
    num: "06",
    title: "Best PT-141 Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
