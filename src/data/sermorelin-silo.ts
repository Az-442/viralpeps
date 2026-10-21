import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Sermorelin silo (hub + 6 spoke pages).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * Sermorelin (GRF 1-29) is sold under several names — sermorelin acetate,
 * sermorelin (GRF 1-29), sermorelin pen — and appears in compounds.json as a
 * master entry plus five child variant entries (compareSlug === "sermorelin").
 * All of them are folded into one row set here.
 *
 * Two data quirks this builder sanitises (they exist in compounds.json today):
 *   1. String prices can be a range ("£29.00 – £45.00") — the low end is used
 *      and the row is flagged so the table label stays honest.
 *   2. Pack label can be missing ("—") — those rows sort to the bottom of any
 *      per-mg ranking and render "—" rather than being compared unfairly.
 */

export interface SermorelinRow {
  /** Row identity — vendor + url + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "5mg" / "10mg" / "—". */
  pack: string;
  price: number;
  priceLabel: string;
  /** True when the source price was a range and we used the low end. */
  priceIsRange: boolean;
  perMg: number | null;
  perMgLabel: string;
  url: string;
  inStock: boolean;
  trustScore: number | null;
  /**
   * Compound slug the /go/ route must resolve against for this vendor.
   * Master sources resolve at "sermorelin"; vendors that only appear on a
   * child variant entry resolve only at that child slug.
   */
  goCompoundSlug: string;
}

export interface SermorelinStats {
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

const sermorelinCompound = (compounds as any[]).find((c) => c?.slug === "sermorelin");

/** Parse "£24.00" → 24.00; ranges take the low end. Returns NaN for junk. */
export function parsePrice(price: string): number {
  const cleaned = String(price || "").replace(/[£$€,]/g, "");
  const m = cleaned.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

/** True when the source price string is a range rather than a single figure. */
function isRangePrice(price: string): boolean {
  return /[–—-]\s*[£$€]?\s*[\d]/.test(String(price || "").replace(/^[£$€]\s*/, ""));
}

/** "10mg" / "10 mg" / "10mg/5ml" → 10. Null when no mg figure. */
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
 * Vendor name → vendors.json slug. The synthesised slug is only a fallback:
 * several vendors have a slug that does not derive from their display name,
 * and guessing it produces broken /go/ links. Always prefer the real registry slug.
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
 * Every Sermorelin price listing, normalised. Options arrays (multi-pack
 * vendors) are expanded into one row per pack. Child variant entries
 * (compareSlug === "sermorelin") are folded in so the full market shows.
 */
export function getSermorelinRows(): SermorelinRow[] {
  const entries = (compounds as any[]).filter(
    (c) => c?.slug === "sermorelin" || c?.compareSlug === "sermorelin"
  );
  // Vendors present on the master entry — these resolve /go/ at "sermorelin".
  const masterVendors = new Set(
    ((entries.find((c) => c?.slug === "sermorelin")?.sources || []) as any[]).map(
      (s) => s.vendor
    )
  );
  const rows: SermorelinRow[] = [];
  for (const entry of entries) {
    for (const s of (entry.sources || []) as any[]) {
      const vendorSlug = vendorSlugFor(s.vendor);
      const verified = VERIFIED_VENDORS.has(s.vendor);
      const trustScoreValue = trustFor(vendorSlug);
      // Master wins when a vendor is listed on both; otherwise use the child
      // slug the vendor actually appears on so /go/ can find its source URL.
      const goCompoundSlug = masterVendors.has(s.vendor) ? "sermorelin" : entry.slug;

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
            priceIsRange: isRangePrice(opt.price),
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
      const packLabel = s.dosage || s.note || "—";
      const mg = mgFromLabel(packLabel);
      const pack = packLabel;
      rows.push({
        key: `${vendorSlug}|${s.url}|${pack}`,
        vendor: s.vendor,
        vendorSlug,
        verified,
        pack,
        price,
        priceLabel: `£${price.toFixed(2)}`,
        priceIsRange: isRangePrice(s.price),
        perMg: mg ? Math.round((price / mg) * 100) / 100 : null,
        perMgLabel: mg ? `£${(price / mg).toFixed(2)}/mg` : "—",
        url: s.url,
        inStock: s.inStock !== false,
        trustScore: trustScoreValue,
        goCompoundSlug,
      });
    }
  }
  // De-duplicate. A vendor legitimately has two listings at different prices
  // (e.g. 2mg and 5mg vials) — those must both survive. What must NOT survive is
  // a child variant entry repeating a master row for the same vendor at the same
  // price: seven vendors carry such a duplicate, and the child copy usually has
  // no `dosage`, so it renders as an extra unlabelled row that looks like a
  // second product. Pass 1 collapses an unlabelled row into a labelled row for
  // the same vendor+price; pass 2 then removes any remaining exact repeats.
  const labelled = new Set(
    rows.filter((r) => r.pack !== "—").map((r) => `${r.vendorSlug}|${r.price.toFixed(2)}`)
  );
  const kept = rows.filter(
    (r) => r.pack !== "—" || !labelled.has(`${r.vendorSlug}|${r.price.toFixed(2)}`)
  );
  const seen = new Set<string>();
  return kept.filter((r) => {
    const k = `${r.vendorSlug}|${r.price.toFixed(2)}|${r.pack}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: SermorelinRow[]): SermorelinRow[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: SermorelinRow[]): SermorelinRow[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: SermorelinRow[]): SermorelinRow[] {
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

export function getSermorelinStats(): SermorelinStats {
  const rows = getSermorelinRows();
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

export const sermorelin = sermorelinCompound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const SERMORELIN_SPOKES = [
  {
    slug: "where-to-buy-sermorelin-uk",
    num: "01",
    title: "Where to Buy Sermorelin UK",
    desc: "Verified UK suppliers, brand names and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-sermorelin-uk",
    num: "02",
    title: "Cheapest Sermorelin UK",
    desc: "Lowest verified price per mg, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "sermorelin-price-comparison-uk",
    num: "03",
    title: "Sermorelin Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-sermorelin-online-uk",
    num: "04",
    title: "Buy Sermorelin Online UK",
    desc: "Ordering, payment methods and delivery expectations from UK vendors.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "sermorelin-for-sale-uk",
    num: "05",
    title: "Sermorelin for Sale UK",
    desc: "Which UK suppliers actually hold Sermorelin stock, and how to verify each listing.",
    icon: "swap",
    metric: "trust" as const,
  },
  {
    slug: "best-sermorelin-peptide",
    num: "06",
    title: "Best Sermorelin Peptide",
    desc: "Ranked by independent TrustScore, purity verification and price.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
