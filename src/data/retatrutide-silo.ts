import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Retatrutide silo (hub + 6 spoke pages).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 */

export interface RetaRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "20mg" / "40 mg pen". */
  pack: string;
  price: number;
  priceLabel: string;
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
}

export interface RetaStats {
  suppliers: number;
  products: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bestPerMg: number | null;
  bestPerMgVendor: string | null;
  /** Highest TrustScore among tracked retatrutide listings (null if none). */
  topTrustScore: number | null;
  topTrustVendor: string | null;
  packs: number;
}

const retaCompound = (compounds as any[]).find((c) => c?.slug === "retatrutide");

/** Parse "£94.99" → 94.99 (returns NaN for junk). */
export function parsePrice(price: string): number {
  return parseFloat(String(price || "").replace(/[£$€,]/g, ""));
}

/** "20mg" / "40 mg pen" / "10 mg" → 20 / 40 / 10. Null when no mg figure. */
export function mgFromLabel(label: string): number | null {
  const m = String(label || "").match(/([\d.]+)\s*mg/i);
  if (!m) return null;
  const mg = parseFloat(m[1]);
  return mg > 0 ? mg : null;
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Supplier verification comes from vendors.json (`verified` flag) — source
 * entries in compounds.json do NOT carry a `verified` field. Resolve by name.
 */
const VERIFIED_VENDORS = new Set(
  (vendors as any[]).filter((v) => v?.verified).map((v) => v.name)
);

function trustFor(vendorSlug: string): number | null {
  const entry = (trustScore as any)[vendorSlug];
  if (!entry) return null;
  // The autocheck payload is a signal bag, not a numeric score — derive a
  // transparent 0-100 score from the same signals the TrustScore page lists.
  let score = 0;
  const home = entry.home || {};
  const secondary = entry.secondary || {};
  if (entry.live) score += 10; // reachable site
  if (home.status === 200) score += 5;
  if (home.coa || secondary.coa) score += 25; // COAs & lab testing
  if (home.ruo || secondary.ruo) score += 5; // research-use compliance
  if (home.review || secondary.review) score += 10; // genuine reviews
  if (home.shipping || secondary.shipping) score += 5; // shipping & support
  if (home.contact || secondary.contact) score += 10; // contact verified
  if (home.title) score += 5; // real storefront
  return Math.min(100, score);
}

/**
 * Every retatrutide price listing, normalised. Options arrays (multi-pack
 * vendors like UK Peptides) are expanded into one row per pack.
 */
export function getRetaRows(): RetaRow[] {
  if (!retaCompound?.sources) return [];
  const rows: RetaRow[] = [];
  for (const s of retaCompound.sources as any[]) {
    const vendorSlug = slugifyVendor(s.vendor);
    const verified = VERIFIED_VENDORS.has(s.vendor);
    const trustScoreValue = trustFor(vendorSlug);

    if (Array.isArray(s.options) && s.options.length > 0) {
      for (const opt of s.options) {
        const price = parsePrice(opt.price);
        if (!Number.isFinite(price) || price <= 0) continue;
        const mg = mgFromLabel(opt.size);
        rows.push({
          key: `${vendorSlug}|${s.url}|${opt.size}`,
          vendor: s.vendor,
          vendorSlug,
          verified,
          pack: opt.size,
          price,
          priceLabel: `£${price.toFixed(2)}`,
          perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
          perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
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
    const mg = mgFromLabel(pack);
    rows.push({
      key: `${vendorSlug}|${s.url}|${pack}`,
      vendor: s.vendor,
      vendorSlug,
      verified,
      pack,
      price,
      priceLabel: `£${price.toFixed(2)}`,
      perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
      perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
      url: s.url,
      inStock: s.inStock !== false,
      trustScore: trustScoreValue,
    });
  }
  return rows;
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: RetaRow[]): RetaRow[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: RetaRow[]): RetaRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: RetaRow[]): RetaRow[] {
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

export function getRetaStats(): RetaStats {
  const rows = getRetaRows();
  const prices = rows.map((r) => r.price);
  const perMgRows = rows.filter((r) => r.perMg !== null);
  const bestPerMgRow = perMgRows.length
    ? perMgRows.reduce((min, r) => (r.perMg! < min.perMg! ? r : min))
    : null;
  const packs = new Set(rows.map((r) => r.pack).filter((p) => p && p !== "—"));
  // Highest TrustScore across all tracked listings (verified vendors only).
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

export const reta = retaCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const RETA_SPOKES = [
  {
    slug: "where-to-buy-retatrutide",
    num: "01",
    title: "Where to Buy Retatrutide UK",
    desc: "Verified UK suppliers, shipping times and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-retatrutide-uk",
    num: "02",
    title: "Cheapest Retatrutide UK",
    desc: "Lowest verified price per mg, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "retatrutide-price-comparison-uk",
    num: "03",
    title: "Retatrutide Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-retatrutide-online-uk",
    num: "04",
    title: "Buy Retatrutide Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "retatrutide-for-sale",
    num: "05",
    title: "Retatrutide for Sale",
    desc: "Current listings across UK suppliers, with stock status and pack sizes.",
    icon: "swap",
    metric: "from" as const,
    badge: "Popular" as const,
  },
  {
    slug: "best-retatrutide-peptide",
    num: "06",
    title: "Best Retatrutide Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
