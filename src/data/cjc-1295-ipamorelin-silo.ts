import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the CJC-1295 + Ipamorelin silo (hub + 6 spokes).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * PRODUCT IDENTITY — read before editing the price logic:
 * This silo covers the CJC-1295 + Ipamorelin BLEND as a co-lyophilised vial,
 * registered in compounds.json as slug `cjc-1295-ipamorelin-blend`. It is a
 * different product from the single-agent CJC-1295 silo (`cjc-1295`), which
 * carries 55 listings of its own. Do not merge the two source arrays.
 *
 * THE PACK-LABEL TRAP: blend vials are labelled by the TOTAL content of the
 * two components (e.g. "5mg+5mg", "10mg+10mg"), not by a single active mass.
 * mgFromLabel() sums every mg figure in the label so that a "5mg+5mg" 10mg
 * vial yields 10 rather than 5. A per-mg rate computed off half the vial would
 * understate cost per milligram by 2x and make the blend look artificially
 * cheap against single-agent listings.
 *
 * Same sanitisation as the other silos: options[] arrays expand to one row per
 * pack; junk prices are dropped rather than rendered as £0.00; /go/ resolves
 * via vendors.json slugs.
 */

export interface CjcIpaRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "5mg+5mg" / "10mg+10mg" / "10mg". */
  pack: string;
  price: number;
  priceLabel: string;
  /** Total mg in the vial (both components summed for a blend label). */
  totalMg: number | null;
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
}

export interface CjcIpaStats {
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

const blendCompound = (compounds as any[]).find(
  (c) => c?.slug === "cjc-1295-ipamorelin-blend"
);

/** Parse "£94.99" → 94.99 (returns NaN for junk). */
export function parsePrice(price: string): number {
  return parseFloat(String(price || "").replace(/[£$€,]/g, ""));
}

/**
 * "5mg+5mg" → 10 ; "10mg" → 10 ; "10 mg pen" → 10.
 * Sums every mg figure present so blend labels give total vial content.
 */
export function mgFromLabel(label: string): number | null {
  const matches = String(label || "").match(/([\d.]+)\s*mg/gi);
  if (!matches || matches.length === 0) return null;
  const total = matches.reduce((sum, m) => {
    const v = parseFloat(m.replace(/mg/i, "").trim());
    return sum + (Number.isFinite(v) ? v : 0);
  }, 0);
  return total > 0 ? total : null;
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
 * Every CJC-1295 + Ipamorelin blend price listing, normalised. Options arrays
 * (multi-pack vendors) are expanded into one row per pack.
 */
export function getCjcIpaRows(): CjcIpaRow[] {
  if (!blendCompound?.sources) return [];
  const rows: CjcIpaRow[] = [];
  for (const s of blendCompound.sources as any[]) {
    const vendorSlug = slugifyVendor(s.vendor);
    const verified = VERIFIED_VENDORS.has(s.vendor);
    const trustScoreValue = trustFor(vendorSlug);

    if (Array.isArray(s.options) && s.options.length > 0) {
      for (const opt of s.options) {
        const price = parsePrice(opt.price);
        if (!Number.isFinite(price) || price <= 0) continue;
        const totalMg = mgFromLabel(opt.size);
        rows.push({
          key: `${vendorSlug}|${s.url}|${opt.size}`,
          vendor: s.vendor,
          vendorSlug,
          verified,
          pack: opt.size,
          price,
          priceLabel: `£${price.toFixed(2)}`,
          totalMg,
          perMg: totalMg ? Math.round((price / totalMg) * 100) / 100 : null,
          perMgLabel: totalMg ? `£${(price / totalMg).toFixed(2)}/mg` : "—",
          url: s.url,
          inStock: s.inStock !== false,
          trustScore: trustScoreValue,
        });
      }
      continue;
    }

    const price = parsePrice(s.price);
    if (!Number.isFinite(price) || price <= 0) continue;
    const pack = s.dosage || s.note || "—";
    const totalMg = mgFromLabel(pack);
    rows.push({
      key: `${vendorSlug}|${s.url}|${pack}`,
      vendor: s.vendor,
      vendorSlug,
      verified,
      pack,
      price,
      priceLabel: `£${price.toFixed(2)}`,
      totalMg,
      perMg: totalMg ? Math.round((price / totalMg) * 100) / 100 : null,
      perMgLabel: totalMg ? `£${(price / totalMg).toFixed(2)}/mg` : "—",
      url: s.url,
      inStock: s.inStock !== false,
      trustScore: trustScoreValue,
    });
  }
  return rows;
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: CjcIpaRow[]): CjcIpaRow[] {
  return [...rows].sort(
    (a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor)
  );
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: CjcIpaRow[]): CjcIpaRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: CjcIpaRow[]): CjcIpaRow[] {
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

export function getCjcIpaStats(): CjcIpaStats {
  const rows = getCjcIpaRows();
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
    avgPrice: prices.length
      ? prices.reduce((a, b) => a + b, 0) / prices.length
      : 0,
    bestPerMg: bestPerMgRow?.perMg ?? null,
    bestPerMgVendor: bestPerMgRow?.vendor ?? null,
    topTrustScore: topTrustRow?.trustScore ?? null,
    topTrustVendor: topTrustRow?.vendor ?? null,
    packs: packs.size,
  };
}

export const cjcIpamorelin = blendCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const CJC_IPA_SPOKES = [
  {
    slug: "where-to-buy-cjc-1295-ipamorelin-uk",
    num: "01",
    title: "Where to Buy CJC-1295 + Ipamorelin UK",
    desc: "Verified UK suppliers of the blend, shipping times and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-cjc-1295-ipamorelin-uk",
    num: "02",
    title: "Cheapest CJC-1295 + Ipamorelin UK",
    desc: "Lowest verified price per milligram of combined vial content, updated weekly.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "cjc-1295-ipamorelin-price-uk",
    num: "03",
    title: "CJC-1295 + Ipamorelin Price UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-cjc-1295-ipamorelin-online-uk",
    num: "04",
    title: "Buy CJC-1295 + Ipamorelin Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "cjc-1295-ipamorelin-supplier-uk",
    num: "05",
    title: "CJC-1295 + Ipamorelin Supplier UK",
    desc: "How to verify a UK supplier's COAs, stock and TrustScore before you buy.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Verified" as const,
  },
  {
    slug: "best-cjc-1295-ipamorelin-peptide",
    num: "06",
    title: "Best CJC-1295 + Ipamorelin Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
