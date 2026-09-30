import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Semaglutide silo (hub + 6 spoke pages).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 */

export interface SemaRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "10mg" / "5mg". */
  pack: string;
  price: number;
  priceLabel: string;
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
}

export interface SemaStats {
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

const semaCompound = (compounds as any[]).find((c) => c?.slug === "semaglutide");

/** Parse "£94.99" → 94.99 (returns NaN for junk). */
export function parsePrice(price: string): number {
  return parseFloat(String(price || "").replace(/[£$€,]/g, ""));
}

/** "10mg" / "2mg×10vials" / "45mg" → 10 / 2 / 45. Null when no mg figure. */
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
 * Every semaglutide price listing, normalised. Options arrays (multi-pack
 * vendors) are expanded into one row per pack.
 */
export function getSemaRows(): SemaRow[] {
  if (!semaCompound?.sources) return [];
  const rows: SemaRow[] = [];
  for (const s of semaCompound.sources as any[]) {
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
export function sortByPrice(rows: SemaRow[]): SemaRow[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: SemaRow[]): SemaRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: SemaRow[]): SemaRow[] {
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

export function getSemaStats(): SemaStats {
  const rows = getSemaRows();
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

export const sema = semaCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const SEMA_SPOKES = [
  {
    slug: "where-to-buy-semaglutide-uk",
    num: "01",
    title: "Where to Buy Semaglutide UK",
    desc: "Verified UK suppliers, shipping times and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-semaglutide-uk",
    num: "02",
    title: "Cheapest Semaglutide UK",
    desc: "Lowest verified price per mg, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "semaglutide-price-comparison-uk",
    num: "03",
    title: "Semaglutide Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-semaglutide-online-uk",
    num: "04",
    title: "Buy Semaglutide Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "semaglutide-uk-supplier",
    num: "05",
    title: "Semaglutide UK Supplier",
    desc: "How to verify a UK supplier's COAs, stock and TrustScore before you buy.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Verified" as const,
  },
  {
    slug: "best-semaglutide-peptide",
    num: "06",
    title: "Best Semaglutide Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
