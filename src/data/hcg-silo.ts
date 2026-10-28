import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the hCG silo (hub + 6 spokes).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed by the scraper).
 * Never hardcode prices in page markup.
 *
 * hCG (Human Chorionic Gonadotropin) is a heterodimeric glycoprotein hormone —
 * a 237-residue preproprotein cleaved into a 92-residue alpha subunit (shared
 * with LH, FSH and TSH) and a 145-residue beta subunit that confers receptor
 * specificity at the LH/CG receptor. UniProt P01233 (CGB), P01215 (CGA).
 *
 * IT HAS NO CAS, NO FORMULA AND NO MOLECULAR WEIGHT IN THE PEPTIDE SENSE.
 * The active substance is a glycosylated protein; "molar mass" depends on
 * glycoform. Any listing that advertises a neat molecular weight in daltons as
 * a purity claim is advertising something it cannot know.
 *
 * TWO unit quirks that change the whole data model versus every other silo:
 *   1. hCG is dosed in IU, not mg. There is no milligram to divide by, so the
 *      per-mg column is deliberately the per-1,000 IU rate. mgFromLabel is
 *      replaced by iuFromLabel.
 *   2. Child variant entries (compareSlug === "hcg") are folded in — the
 *      named "hcg-human-chorionic-gonadotropin" entry carries sources the
 *      master does not.
 *
 * Same sanitisation as the other silos: options[] arrays expand to one row per
 * pack; an image URL written into `dosage` becomes "—"; junk prices are dropped
 * rather than rendered as £0.00; /go/ resolves via vendors.json slugs.
 */

export interface HcgRow {
  /** Row identity — vendor + price + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "5000IU" / "10000iu" / "5000iu pen" / "—". */
  pack: string;
  /** Normalised IU figure the pack label states (kits = total IU). */
  iu: number | null;
  price: number;
  priceLabel: string;
  /** True when the listed pack is a multi-vial kit rather than a single vial. */
  isKit: boolean;
  /** Price per 1,000 IU — the only honest rate when the article is dosed in IU. */
  perIu: number | null;
  perIuLabel: string;
  /** True when the pack is a pre-filled pen rather than a lyophilised vial. */
  isPen: boolean;
  url: string;
  inStock: boolean;
  trustScore: number | null;
  /**
   * Compound slug the /go/ route must resolve against for this vendor.
   * Master sources resolve at "hcg"; vendors that only appear on a child
   * variant entry resolve only at that child slug.
   */
  goCompoundSlug: string;
}

export interface HcgStats {
  suppliers: number;
  products: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bestPerIu: number | null;
  bestPerIuVendor: string | null;
  topTrustScore: number | null;
  topTrustVendor: string | null;
  packs: number;
}

const COMPOUND_SLUG = "hcg";

const hcgCompound = (compounds as any[]).find((c) => c?.slug === COMPOUND_SLUG);

/** Parse "£24.99" → 24.99. Ranges take the low end. Returns NaN for junk. */
export function parsePrice(price: string): number {
  const cleaned = String(price || "").replace(/[£$€,]/g, "");
  const m = cleaned.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

/**
 * Pack label → IU figure.
 *   "5000IU" / "5000 iu" / "10,000 IU"  → 5000 / 10000
 *   "5000IU x 3"                        → 15000 (kit: total units in the pack)
 *   "—" / "" / a URL                    → null
 * "mcg" is honoured for the rare microgram-labelled pack (1 mcg ≠ 1 IU but the
 * listing's own unit is preserved rather than silently converted).
 */
export function iuFromLabel(label: unknown): number | null {
  const raw = String(label || "").replace(iuUrlPattern(), "");
  const m = raw.match(/([\d,]+(?:\.\d+)?)\s*(?:iu|i\.u\.|mcg|µg|ug)\b/i);
  if (!m) return null;
  let iu = parseFloat(m[1].replace(/,/g, ""));
  if (!(iu > 0)) return null;
  // Multi-vial kit, e.g. "5000IU x 3" — multiply out.
  const kit = raw.match(/[x×]\s*(\d+)\s*(?:vials?|pens?|pcs?|units?)?\s*$/i);
  if (kit) iu = iu * parseInt(kit[1], 10);
  return iu;
}

/** True when the label is a web asset URL, not a pack size. */
function iuUrlPattern(): RegExp {
  return /https?:\/\/\S+/gi;
}

/** True when the pack label describes more than one vial. */
function isKitLabel(label: string): boolean {
  return /[x×]\s*\d+\s*(?:vials?|pens?|pcs?|units?)?\s*$/i.test(String(label || ""));
}

export function sanitisePackLabel(label: unknown): string {
  const raw = String(label ?? "").trim();
  if (!raw || /^https?:\/\//i.test(raw) || raw === "None" || raw === "null") return "—";
  return raw;
}

function slugifyVendor(name: string): string {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Vendor name → vendors.json slug. The synthesised slug is only a fallback:
 * vendors whose slug does not derive from their display name would otherwise
 * produce broken /go/ links. Always prefer the registry slug.
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
 * Every hCG price listing, normalised. Options arrays (multi-pack vendors)
 * are expanded into one row per pack. Child variant entries
 * (compareSlug === "hcg") are folded in so the full market shows.
 */
export function getHcgRows(): HcgRow[] {
  const entries = (compounds as any[]).filter(
    (c) => c?.slug === COMPOUND_SLUG || c?.compareSlug === COMPOUND_SLUG
  );
  const masterVendors = new Set(
    ((entries.find((c) => c?.slug === COMPOUND_SLUG)?.sources || []) as any[]).map(
      (s) => s.vendor
    )
  );
  const rows: HcgRow[] = [];
  for (const entry of entries) {
    for (const s of (entry.sources || []) as any[]) {
      const vendorSlug = vendorSlugFor(s.vendor);
      const verified = VERIFIED_VENDORS.has(s.vendor);
      const trustScoreValue = trustFor(vendorSlug);
      const goCompoundSlug = masterVendors.has(s.vendor) ? COMPOUND_SLUG : entry.slug;

      const push = (rawPrice: string, rawPack: unknown) => {
        const price = parsePrice(rawPrice);
        if (!Number.isFinite(price) || price <= 0) return;
        const pack = sanitisePackLabel(rawPack);
        const iu = iuFromLabel(pack);
        rows.push({
          key: `${vendorSlug}|${price.toFixed(2)}|${pack}`,
          vendor: s.vendor,
          vendorSlug,
          verified,
          pack,
          iu,
          price,
          priceLabel: `£${price.toFixed(2)}`,
          isKit: isKitLabel(pack),
          perIu: iu ? Math.round((price / (iu / 1000)) * 100) / 100 : null,
          perIuLabel: iu ? `£${(price / (iu / 1000)).toFixed(2)}/1k IU` : "—",
          isPen: /\bpen\b/i.test(pack),
          url: s.url,
          inStock: s.inStock !== false,
          trustScore: trustScoreValue,
          goCompoundSlug,
        });
      };

      if (Array.isArray(s.options) && s.options.length > 0) {
        for (const opt of s.options) push(opt.price, opt.size);
        continue;
      }
      push(s.price, s.dosage || s.note);
    }
  }
  // De-duplicate on vendor + price + pack — the same listing must not appear
  // twice via both the master and a child variant entry.
  const seen = new Set<string>();
  return rows.filter((r) => {
    const k = `${r.vendorSlug}|${r.price.toFixed(2)}|${r.pack}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: HcgRow[]): HcgRow[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-1,000 IU ascending — rows without an IU figure sink to the bottom. */
export function sortByPricePerIu(rows: HcgRow[]): HcgRow[] {
  return [...rows].sort((a, b) => {
    if (a.perIu === null && b.perIu === null) return a.price - b.price;
    if (a.perIu === null) return 1;
    if (b.perIu === null) return -1;
    return a.perIu - b.perIu || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: HcgRow[]): HcgRow[] {
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

export function getHcgStats(): HcgStats {
  const rows = getHcgRows();
  const prices = rows.map((r) => r.price);
  const perIuRows = rows.filter((r) => r.perIu !== null);
  const bestPerIuRow = perIuRows.length
    ? perIuRows.reduce((min, r) => (r.perIu! < min.perIu! ? r : min))
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
    bestPerIu: bestPerIuRow?.perIu ?? null,
    bestPerIuVendor: bestPerIuRow?.vendor ?? null,
    topTrustScore: topTrustRow?.trustScore ?? null,
    topTrustVendor: topTrustRow?.vendor ?? null,
    packs: packs.size,
  };
}

export const hcg = hcgCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const HCG_SPOKES = [
  {
    slug: "where-to-buy-hcg-uk",
    num: "01",
    title: "Where to Buy hCG UK",
    desc: "Verified UK suppliers, hCG naming and subunit identity, and what to check first.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-hcg-uk",
    num: "02",
    title: "Cheapest hCG UK",
    desc: "Lowest verified price per 1,000 IU, computed live from UK supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "hcg-price-comparison-uk",
    num: "03",
    title: "hCG Price Comparison UK",
    desc: "Full side-by-side IU price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-hcg-online-uk",
    num: "04",
    title: "Buy hCG Online UK",
    desc: "Ordering, payment methods, delivery and what a legal UK listing looks like.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "hcg-supplier-uk",
    num: "05",
    title: "hCG Supplier UK",
    desc: "How to verify a UK supplier's COA, batch number and TrustScore before buying.",
    icon: "swap",
    metric: "trust" as const,
    badge: "Verified" as const,
  },
  {
    slug: "best-hcg-peptide",
    num: "06",
    title: "Best hCG Peptide",
    desc: "Ranked by independent TrustScore, documentation and price per 1,000 IU.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
