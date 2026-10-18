import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Bacteriostatic Water silo (hub + 6 spoke pages).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * Bacteriostatic Water is a diluent / laboratory supply, not a research compound,
 * so the meaningful unit here is VOLUME (ml), not mass (mg). Every listing in the
 * UK market is priced per vial, in 3ml / 5ml / 10ml / 30ml presentations, so this
 * silo ranks on price per ml. `perMg` is kept in the row shape only because the
 * shared PriceTable expects the field — for this silo it always renders "—".
 *
 * Child entries under compareSlug "bacteriostatic-water" include a few items that
 * are NOT bacteriostatic water (acetic acid 0.6%, PBS). Those are excluded so the
 * table only ever compares like with like.
 */

const COMPOUND_SLUG = "bacteriostatic-water";

/** Child entries that genuinely contain bacteriostatic water listings. */
const WATER_CHILD_SLUGS = new Set([
  "bacteriostatic-water-0-9-benzyl",
  "bacteriostatic-water-0-9-sodium-chloride",
  "bac-water-10ml-the-peptide-company",
  "sterling-bac-water-10ml",
  "sterling-bac-water-3ml",
]);

export interface BacRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "10ml" / "30ml" / "3 mL". */
  pack: string;
  price: number;
  priceLabel: string;
  /** Price per millilitre — the ranking metric for a diluent. */
  perMl: number | null;
  perMlLabel: string;
  /** Always null for this silo — kept for the shared PriceTable row shape. */
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
  /**
   * Verification signals from trustscore-autocheck.json, used to break the
   * TrustScore ties that a single site-wide formula cannot separate.
   * For a supply item, a Certificate of Analysis on the actual product page
   * outranks a site-wide one, so these are reported alongside the score.
   */
  productCoa: boolean;
  homeCoa: boolean;
  reviewSource: string | null;
  live: boolean;
  /**
   * Compound slug the /go/ route must resolve against for this vendor.
   * Master sources resolve at "bacteriostatic-water"; vendors that only appear
   * on a child variant entry resolve only at that child slug.
   */
  goCompoundSlug: string;
}

export interface BacStats {
  suppliers: number;
  products: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bestPerMl: number | null;
  bestPerMlVendor: string | null;
  /**
   * Alias of bestPerMl for the shared spoke route's stats strip, which labels
   * this figure generically. For this diluent it is cost per MILLILITRE.
   */
  bestPerMg: number | null;
  topTrustScore: number | null;
  topTrustVendor: string | null;
  packs: number;
}

const bacCompound = (compounds as any[]).find((c) => c?.slug === COMPOUND_SLUG);

/** Parse "£24.00" → 24.00 (returns NaN for junk). */
export function parsePrice(price: string): number {
  return parseFloat(String(price || "").replace(/[£$€,]/g, ""));
}

/**
 * "10ml" / "10 mL vial" / "USP 30ml" / "5ml" → 10 / 10 / 30 / 5.
 * Null when no ml figure is stated (we never guess a volume).
 */
export function mlFromLabel(label: string): number | null {
  const m = String(label || "").match(/([\d.]+)\s*ml/i);
  if (!m) return null;
  const ml = parseFloat(m[1]);
  return ml > 0 ? ml : null;
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Vendor name → vendors.json slug. The synthesised slug is only a fallback:
 * several vendors have a slug that does not derive from their display name
 * (e.g. "HelixCore" → `helix-core`, "JGPep+" → `jgpeptidesplus`), and guessing
 * it produces broken /go/ links. Always prefer the real registry slug.
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
 * Raw verification signals for a vendor. The shared TrustScore formula is
 * site-wide and therefore identical for most suppliers here (58 land on 65 and
 * 28 on 75), which makes it useless on its own for ranking a supply item.
 * These signals break the tie on evidence rather than on price:
 *   1. a COA on the product page (was the actual item tested?)
 *   2. a COA on the site
 *   3. a third-party review presence
 *   4. a live site
 */
function signalsFor(vendorSlug: string) {
  const entry = (trustScore as any)[vendorSlug];
  const home = entry?.home || {};
  const secondary = entry?.secondary || {};
  const product = entry?.product || {};
  return {
    productCoa: Boolean(product.coa),
    homeCoa: Boolean(home.coa || secondary.coa),
    reviewSource: (home.review || secondary.review || null) as string | null,
    live: Boolean(entry?.live) && home.status === 200,
  };
}

/**
 * Every Bacteriostatic Water price listing, normalised. Options arrays
 * (multi-pack vendors) are expanded into one row per pack. Genuine bac-water
 * child variant entries are folded in so the full market shows; non-water
 * siblings (acetic acid, PBS) are skipped.
 */
export function getBacRows(): BacRow[] {
  const entries = (compounds as any[]).filter(
    (c) =>
      c?.slug === COMPOUND_SLUG ||
      (c?.compareSlug === COMPOUND_SLUG && WATER_CHILD_SLUGS.has(c?.slug))
  );
  // Vendors present on the master entry — these resolve /go/ at the master slug.
  const masterVendors = new Set(
    ((entries.find((c) => c?.slug === COMPOUND_SLUG)?.sources || []) as any[]).map(
      (s) => s.vendor
    )
  );
  const rows: BacRow[] = [];
  for (const entry of entries) {
    for (const s of (entry.sources || []) as any[]) {
      const vendorSlug = vendorSlugFor(s.vendor);
      const verified = VERIFIED_VENDORS.has(s.vendor);
      const trustScoreValue = trustFor(vendorSlug);
      const signals = signalsFor(vendorSlug);
      // Master wins when a vendor is listed on both; otherwise use the child
      // slug the vendor actually appears on so /go/ can find its source URL.
      const goCompoundSlug = masterVendors.has(s.vendor) ? COMPOUND_SLUG : entry.slug;

      if (Array.isArray(s.options) && s.options.length > 0) {
        for (const opt of s.options) {
          const price = parsePrice(opt.price);
          if (!Number.isFinite(price) || price <= 0) continue;
          const ml = mlFromLabel(opt.size);
          rows.push({
            key: `${vendorSlug}|${s.url}|${opt.size}`,
            vendor: s.vendor,
            vendorSlug,
            verified,
            pack: opt.size,
            price,
            priceLabel: `£${price.toFixed(2)}`,
            perMl: ml ? Math.round((price / ml) * 100) / 100 : null,
            perMlLabel: ml ? `£${(price / ml).toFixed(2)}/ml` : "—",
            perMg: null,
            perMgLabel: "—",
            url: s.url,
            inStock: s.inStock !== false,
            trustScore: trustScoreValue,
            ...signals,
            goCompoundSlug,
          });
        }
        continue;
      }

      // Range prices (e.g. "£5.00–£9.00") resolve on the lower bound — the
      // entry price a buyer actually sees.
      const price = parsePrice(String(s.price || "").split(/[–-]/)[0]);
      if (!Number.isFinite(price) || price <= 0) continue;
      // Child entries for this compound carry no dosage field; their product
      // names state the volume instead (all current ones are 10 mL).
      const pack =
        s.dosage ||
        s.note ||
        (entry.slug !== COMPOUND_SLUG ? (String(entry.name || "").match(/([\d.]+\s*m[lL])/) || [])[1] : null) ||
        "—";
      const ml = mlFromLabel(pack);
      rows.push({
        key: `${vendorSlug}|${s.url}|${pack}`,
        vendor: s.vendor,
        vendorSlug,
        verified,
        pack,
        price,
        priceLabel: `£${price.toFixed(2)}`,
        perMl: ml ? Math.round((price / ml) * 100) / 100 : null,
        perMlLabel: ml ? `£${(price / ml).toFixed(2)}/ml` : "—",
        perMg: null,
        perMgLabel: "—",
        url: s.url,
        inStock: s.inStock !== false,
        trustScore: trustScoreValue,
        ...signals,
        goCompoundSlug,
      });
    }
  }
  // De-duplicate rows that appear on both a master entry and a child variant.
  const seen = new Set<string>();
  return rows.filter((r) => {
    if (seen.has(r.key)) return false;
    seen.add(r.key);
    return true;
  });
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: BacRow[]): BacRow[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price per ml ascending — rows without a stated volume sink to the bottom. */
export function sortByPricePerMl(rows: BacRow[]): BacRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMl === null && b.perMl === null) return a.price - b.price;
    if (a.perMl === null) return 1;
    if (b.perMl === null) return -1;
    return a.perMl - b.perMl || a.price - b.price;
  });
}

/**
 * Evidence-first ranking for this silo.
 *
 * The shared site-wide TrustScore collapses almost every supplier here onto one
 * of two values (58 at 65, 28 at 75), so it cannot rank 71 suppliers on its own.
 * Ranking is therefore by verification evidence, in the order that matters when
 * buying a sterile diluent:
 *   1. productCoa   — the actual product page publishes a Certificate of Analysis
 *   2. homeCoa      — the site publishes a COA
 *   3. reviewSource — an independent third-party review presence
 *   4. live         — the site resolves
 *   5. TrustScore   — the shared score, as a final discriminator
 *   6. price        — cheapest first within an identical evidence tier
 *
 * Exported as both `sortByTrust` and `sortByPricePerMg` so the shared spoke
 * route's generic table resolver can treat this silo like the peptide silos.
 */
export function sortByTrust(rows: BacRow[]): BacRow[] {
  return [...rows].sort((a, b) => {
    const av = a.verified ? 1 : 0;
    const bv = b.verified ? 1 : 0;
    if (av !== bv) return bv - av;
    if (a.productCoa !== b.productCoa) return a.productCoa ? -1 : 1;
    if (a.homeCoa !== b.homeCoa) return a.homeCoa ? -1 : 1;
    const ar = a.reviewSource ? 1 : 0;
    const br = b.reviewSource ? 1 : 0;
    if (ar !== br) return br - ar;
    if (a.live !== b.live) return a.live ? -1 : 1;
    const at = a.trustScore ?? 0;
    const bt = b.trustScore ?? 0;
    if (at !== bt) return bt - at;
    return a.price - b.price;
  });
}

/** Alias so the spoke's "perMg" table mode ranks on price per ml for this diluent. */
export const sortByPricePerMg = sortByPricePerMl;

export function getBacStats(): BacStats {
  const rows = getBacRows();
  const prices = rows.map((r) => r.price);
  const perMlRows = rows.filter((r) => r.perMl !== null);
  const bestPerMlRow = perMlRows.length
    ? perMlRows.reduce((min, r) => (r.perMl! < min.perMl! ? r : min))
    : null;
  const packs = new Set(rows.map((r) => r.pack).filter((p) => p && p !== "—"));
  // Top TrustScore, resolved within the strongest-scoring vendors to the best
  // per-ml value — a 3ml vial at the same score is not the better buy.
  const scored = rows.filter((r) => r.verified && r.trustScore !== null);
  const maxScore = scored.length ? Math.max(...scored.map((r) => r.trustScore!)) : null;
  const topTier = scored.filter((r) => r.trustScore === maxScore);
  const topTrustRow = topTier.length
    ? sortByTrust(rows).find((r) => topTier.some((t) => t.key === r.key)) ?? topTier[0]
    : null;
  return {
    suppliers: new Set(rows.map((r) => r.vendor)).size,
    products: rows.length,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
    avgPrice: prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0,
    bestPerMl: bestPerMlRow?.perMl ?? null,
    bestPerMlVendor: bestPerMlRow?.vendor ?? null,
    bestPerMg: bestPerMlRow?.perMl ?? null,
    topTrustScore: topTrustRow?.trustScore ?? null,
    topTrustVendor: topTrustRow?.vendor ?? null,
    packs: packs.size,
  };
}

export const bacteriostaticWater = bacCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const BAC_SPOKES = [
  {
    slug: "where-to-buy-bacteriostatic-water-uk",
    num: "01",
    title: "Where to Buy Bacteriostatic Water UK",
    desc: "Verified UK suppliers, vial sizes, stock and what to check before you order.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-bacteriostatic-water-uk",
    num: "02",
    title: "Cheapest Bacteriostatic Water UK",
    desc: "Lowest verified price per ml, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "bacteriostatic-water-price-comparison-uk",
    num: "03",
    title: "Bacteriostatic Water Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-bacteriostatic-water-online-uk",
    num: "04",
    title: "Buy Bacteriostatic Water Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "bacteriostatic-water-uk-supplier",
    num: "05",
    title: "Bacteriostatic Water UK Supplier",
    desc: "Who actually supplies BAC water in the UK, and how to verify a listing.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Lab Supply" as const,
  },
  {
    slug: "best-bacteriostatic-water-peptide",
    num: "06",
    title: "Best Bacteriostatic Water for Peptides",
    desc: "Ranked by independent TrustScore, specification clarity and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
