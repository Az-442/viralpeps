import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Oxytocin Nasal Spray silo (hub + 6 spokes).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * PRODUCT IDENTITY — read before editing the price logic:
 * This silo covers OXYTOCIN NASAL SPRAY only, registered in compounds.json as
 * slug `oxytocin-nasal-spray` (12 listings). It is a different product from the
 * injectable oxytocin entries in the same file — `oxytocin`, `oxytocin-acetate`,
 * `oxytocin-vial-express` and `oxytocin-pen-express` — which are separate SKUs
 * sold as lyophilised vials or pens. Do not merge those source arrays in here:
 * a spray bottle price and a vial price are not comparable units.
 *
 * THE MEASUREMENT TRAP: spray bottles are sold by VOLUME (mL and spray count),
 * not by milligram. Dividing a bottle price by a milligram figure scraped from
 * a vendor's title would produce a meaningless rate. The honest unit here is
 * price per mL, with the stated spray count shown separately, and the per-mg
 * column is retained only where a vendor actually declares mg of oxytocin in
 * the bottle.
 *
 * Same sanitisation as the other silos: options[] arrays expand to one row per
 * pack; junk prices are dropped rather than rendered as £0.00; /go/ resolves
 * via vendors.json slugs.
 *
 * Two data quirks this builder sanitises:
 *   1. HiPeptides writes an image URL into `dosage` (the OLD PT-141 spray
 *      webp, copied across from the PT-141 entry). A URL is not a pack size,
 *      so sanitisePackLabel() rewrites it to "—" and the row is still listed
 *      rather than dropped — the price is real even if the pack label is not.
 *   2. Pack labels mix case and spacing ("15 mL", "10 mL", "5mg"). mlFromLabel
 *      is case-insensitive and mgFromLabel refuses a concentration such as
 *      "2mg/ml", because a concentration is not the mass of a bottle.
 */

const OX_SLUG = "oxytocin-nasal-spray";

/** True when a "pack" value is really an image path, not a pack size. */
function isImagePath(value: string): boolean {
  return /\.(webp|png|jpe?g|gif|svg)(\?|$)/i.test(String(value || "").trim());
}

/** A numeric price would otherwise leak into the packs set as "49.99". */
function isPriceLike(value: string): boolean {
  return /^[£$€]?\s*\d+(\.\d+)?$/.test(String(value || "").trim());
}

/** Normalise a pack label; returns "—" when the value carries no pack data. */
export function sanitisePackLabel(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "—";
  if (isImagePath(raw)) return "—";
  if (isPriceLike(raw)) return "—";
  return raw;
}

export interface OxRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "10mg" / "40 mg pen". */
  pack: string;
  price: number;
  priceLabel: string;
  perMg: number | null;
  perMgLabel: string;
  /** Normalised mL figure the pack label states (nasal spray bottles). */
  ml: number | null;
  /** Price per mL — the honest rate for a nasal spray bottle. */
  perMl: number | null;
  url: string;
  inStock: boolean;
  trustScore: number | null;
}

export interface OxStats {
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

const compound = (compounds as any[]).find((c) => c?.slug === OX_SLUG);

/** Parse "£94.99" → 94.99 (returns NaN for junk). */
export function parsePrice(price: string): number {
  return parseFloat(String(price || "").replace(/[£$€,]/g, ""));
}

/** "10mg" → 10 ; "10 mg" → 10 ; "2mg/ml" → null (a concentration is not a mass). */
export function mgFromLabel(label: string): number | null {
  const raw = String(label || "");
  const m = raw.match(/([\d.]+)\s*mg\b/i);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return v > 0 ? v : null;
}

/** "10ml" / "10 ml bottle" → 10. */
export function mlFromLabel(label: string): number | null {
  const m = String(label || "").match(/([\d.]+)\s*ml\b/i);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return v > 0 ? v : null;
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const VENDOR_SLUGS = new Map<string, string>(
  (vendors as any[]).map((v) => [v?.name, v?.slug || slugifyVendor(v?.name)])
);

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

function makeRow(
  s: any,
  pack: string,
  price: number
): OxRow | null {
  if (!Number.isFinite(price) || price <= 0) return null;
  const vendorSlug = VENDOR_SLUGS.get(s.vendor) || slugifyVendor(s.vendor);
  const mg = mgFromLabel(pack);
  const ml = mlFromLabel(pack);
  return {
    key: `${vendorSlug}|${s.url}|${pack}`,
    vendor: s.vendor,
    vendorSlug,
    verified: VERIFIED_VENDORS.has(s.vendor),
    pack,
    price,
    priceLabel: `£${price.toFixed(2)}`,
    perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
    perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
    ml,
    perMl: ml ? Math.round((price / ml) * 100) / 100 : null,
    url: s.url,
    inStock: s.inStock !== false,
    trustScore: trustFor(vendorSlug),
  };
}

/**
 * Every Oxytocin Nasal Spray price listing, normalised. Options arrays
 * (multi-pack vendors) are expanded into one row per pack.
 */
export function getOxRows(): OxRow[] {
  if (!compound?.sources) return [];
  const rows: OxRow[] = [];
  for (const s of compound.sources as any[]) {
    if (Array.isArray(s.options) && s.options.length > 0) {
      for (const opt of s.options) {
        const row = makeRow(
          s,
          sanitisePackLabel(opt.size),
          parsePrice(opt.price)
        );
        if (row) rows.push(row);
      }
      continue;
    }
    const row = makeRow(
      s,
      sanitisePackLabel(s.dosage || s.note),
      parsePrice(s.price)
    );
    if (row) rows.push(row);
  }
  return rows;
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: OxRow[]): OxRow[] {
  return [...rows].sort(
    (a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor)
  );
}

/** Price per mL ascending — rows without a mL figure sink to the bottom. */
export function sortByPricePerMl(rows: OxRow[]): OxRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMl === null && b.perMl === null) return a.price - b.price;
    if (a.perMl === null) return 1;
    if (b.perMl === null) return -1;
    return a.perMl - b.perMl || a.price - b.price;
  });
}

/** Alias: the page imports this as `oxSortByPricePerMg`. */
export const sortByPricePerMg = sortByPricePerMl;

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: OxRow[]): OxRow[] {
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

export function getOxStats(): OxStats {
  const rows = getOxRows();
  const prices = rows.map((r) => r.price);
  const perMlRows = rows.filter((r) => r.perMl !== null);
  const bestPerMlRow = perMlRows.length
    ? perMlRows.reduce((min, r) => (r.perMl! < min.perMl! ? r : min))
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
    bestPerMg: bestPerMlRow?.perMl ?? null,
    bestPerMgVendor: bestPerMlRow?.vendor ?? null,
    topTrustScore: topTrustRow?.trustScore ?? null,
    topTrustVendor: topTrustRow?.vendor ?? null,
    packs: packs.size,
  };
}

export const oxytocinNasalSpray = compound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const OX_SPOKES = [
  {
    slug: "where-to-buy-oxytocin-nasal-spray-uk",
    num: "01",
    title: "Where to Buy Oxytocin Nasal Spray UK",
    desc: "Verified UK suppliers of the spray, shipping times and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-oxytocin-nasal-spray-uk",
    num: "02",
    title: "Cheapest Oxytocin Nasal Spray UK",
    desc: "Lowest verified price per mL of spray, updated weekly.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "oxytocin-nasal-spray-price-comparison-uk",
    num: "03",
    title: "Oxytocin Nasal Spray Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-oxytocin-nasal-spray-online-uk",
    num: "04",
    title: "Buy Oxytocin Nasal Spray Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "oxytocin-nasal-spray-uk-supplier",
    num: "05",
    title: "Oxytocin Nasal Spray UK Supplier",
    desc: "How to verify a UK supplier's COAs, stock and TrustScore before you buy.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Verified" as const,
  },
  {
    slug: "best-oxytocin-nasal-spray-peptide",
    num: "06",
    title: "Best Oxytocin Nasal Spray Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
