import compounds from "@/data/compounds.json";
import trustScore from "@/data/trustscore-autocheck.json";
import vendors from "@/data/vendors.json";

/**
 * Shared data + helpers for the Melanotan II silo (hub + 6 spoke pages).
 * SINGLE SOURCE OF TRUTH — the hub and every spoke read from here.
 * Prices come live from compounds.json (refreshed weekly by the scraper).
 * Never hardcode prices in page markup.
 *
 * Melanotan II (MT-II, MT-2, NDP-α-MSH) is a synthetic cyclic heptapeptide
 * analogue of α-melanocyte-stimulating hormone. In compounds.json it is a
 * single master entry with 69 sources and no child variant entries.
 *
 * Four data quirks this builder sanitises:
 *   1. UK Peptides appears twice — once with an options[] array (5mg £15.00 /
 *      10mg £29.99) and once as two separate dosage rows at the same prices.
 *      Expanding the array AND keeping the flat rows would double-list the
 *      same vial, so the de-dupe pass runs on vendor + price + pack and the
 *      duplicate collapses.
 *   2. HiPeptides writes an image URL into `dosage`. A URL is not a pack size;
 *      sanitisePackLabel turns it into "—" so no raw webp string leaks into
 *      the Dosage column.
 *   3. Pack labels are inconsistent across vendors — "10mg", "10 mg",
 *      "5mg×10vials", "5mg-10mg" (a range), "10mg nasal spray". mgFromLabel
 *      handles kits and ranges honestly and returns null where a single
 *      milligram figure cannot be stated.
 *   4. Prices are strings with a currency symbol; parsePrice returns NaN for
 *      junk and the row is dropped rather than shown as £0.
 *
 * /go/ links resolve through vendorSlugFor(), which reads the real slug from
 * vendors.json. The synthesised slug is only a fallback — the Semax silo found
 * 11 vendors whose slug does not derive from their display name, and those
 * produced 404 go-links.
 */

export interface Mt2Row {
  /** Row identity — vendor + price + pack, unique per price listing. */
  key: string;
  vendor: string;
  vendorSlug: string;
  verified: boolean;
  /** Human-readable pack label, e.g. "10mg" / "5mg×10vials" / "—". */
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
  /** Compound slug the /go/ route must resolve against for this vendor. */
  goCompoundSlug: string;
}

export interface Mt2Stats {
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

const mt2Compound = (compounds as any[]).find((c) => c?.slug === "melanotan-ii");

/**
 * Sanitise a pack label scraped from a vendor page.
 * HiPeptides publishes an image URL in `dosage`; anything that is not a usable
 * size label renders "—" instead, which is honest — the listing is real, we
 * simply do not know the pack size from the data we hold.
 */
export function sanitisePackLabel(label: unknown): string {
  const raw = String(label ?? "").trim();
  if (!raw) return "—";
  if (/^(https?:\/\/|\/|www\.)/i.test(raw)) return "—";
  if (/\.(webp|jpe?g|png|gif|svg|avif)(\?|$)/i.test(raw)) return "—";
  return raw;
}

/** Parse "£24.99" → 24.99. Ranges take the low end. Returns NaN for junk ("£—"). */
export function parsePrice(price: string): number {
  const cleaned = String(price || "").replace(/[£$€,]/g, "");
  const m = cleaned.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

/**
 * Pack label → milligram figure.
 *   "10mg" / "10 mg" / "10mg vial"  → 10
 *   "5mg×10vials" / "5mg x 10"      → 50  (kit: total material in the pack)
 *   "10mg nasal spray"              → 10  (the mg figure still describes the fill)
 *   "5mg-10mg" (a range)            → null (cannot compare a range on £/mg)
 *   "—" / ""                        → null
 * Microgram packs are normalised ("500mcg" → 0.5).
 */
export function mgFromLabel(label: string): number | null {
  const raw = String(label || "");
  // A range states two quantities — a per-mg figure would be fiction.
  if (/\d\s*mg\s*[-–]\s*\d/i.test(raw)) return null;
  const unit = raw.match(/([\d.]+)\s*mg/i);
  let mg: number | null = null;
  if (unit) {
    mg = parseFloat(unit[1]);
  } else {
    const micro = raw.match(/([\d.]+)\s*(?:mcg|µg|ug)/i);
    if (micro) mg = parseFloat(micro[1]) / 1000;
  }
  if (mg === null || !(mg > 0)) return null;
  // Multi-vial kit, e.g. "5mg×10vials" or "5 mg x 10" — multiply out.
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
 * vendors whose slug does not derive from their display name would otherwise
 * produce broken /go/ links. Always prefer the registry slug.
 */
const VENDOR_SLUGS = new Map((vendors as any[]).map((v) => [v.name, v.slug as string]));

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
 * Every Melanotan II price listing, normalised. Options arrays (multi-pack
 * vendors) are expanded into one row per pack. Child variant entries are
 * folded in so the full market shows.
 */
export function getMt2Rows(): Mt2Row[] {
  const entries = (compounds as any[]).filter(
    (c) => c?.slug === "melanotan-ii" || c?.compareSlug === "melanotan-ii"
  );
  const masterVendors = new Set(
    ((entries.find((c) => c?.slug === "melanotan-ii")?.sources || []) as any[]).map(
      (s) => s.vendor
    )
  );
  const rows: Mt2Row[] = [];
  for (const entry of entries) {
    for (const s of (entry.sources || []) as any[]) {
      const vendorSlug = vendorSlugFor(s.vendor);
      const verified = VERIFIED_VENDORS.has(s.vendor);
      const trustScoreValue = trustFor(vendorSlug);
      const goCompoundSlug = masterVendors.has(s.vendor) ? "melanotan-ii" : entry.slug;

      if (Array.isArray(s.options) && s.options.length > 0) {
        for (const opt of s.options) {
          const price = parsePrice(opt.price);
          if (!Number.isFinite(price) || price <= 0) continue;
          const pack = sanitisePackLabel(opt.size);
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
      const pack = sanitisePackLabel(s.dosage || s.note);
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
  // De-duplicate on vendor + price + pack. UK Peptides lists its 5mg and 10mg
  // twice — once as an options[] array and once as flat dosage rows at
  // identical prices — which would otherwise show four rows for two vials.
  const seen = new Set<string>();
  return rows.filter((r) => {
    const k = `${r.vendorSlug}|${r.price.toFixed(2)}|${r.pack}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Price ascending (ties broken by vendor name for stable output). */
export function sortByPrice(rows: Mt2Row[]): Mt2Row[] {
  return [...rows].sort((a, b) => a.price - b.price || a.vendor.localeCompare(b.vendor));
}

/** Price-per-mg ascending — rows without a mg figure sink to the bottom. */
export function sortByPricePerMg(rows: Mt2Row[]): Mt2Row[] {
  return [...rows].sort((a, b) => {
    if (a.perMg === null && b.perMg === null) return a.price - b.price;
    if (a.perMg === null) return 1;
    if (b.perMg === null) return -1;
    return a.perMg - b.perMg || a.price - b.price;
  });
}

/** TrustScore descending (verified vendors first, then price). */
export function sortByTrust(rows: Mt2Row[]): Mt2Row[] {
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

export function getMt2Stats(): Mt2Stats {
  const rows = getMt2Rows();
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

export const mt2 = mt2Compound;

/** The 6 silo spokes — ordering here drives the hub tile grid. */
export const MT2_SPOKES = [
  {
    slug: "where-to-buy-melanotan-ii-uk",
    num: "01",
    title: "Where to Buy Melanotan II UK",
    desc: "Verified UK suppliers, MT-2 naming and what to check before ordering.",
    icon: "cart",
    metric: "from" as const,
  },
  {
    slug: "cheapest-melanotan-ii-uk",
    num: "02",
    title: "Cheapest Melanotan II UK",
    desc: "Lowest verified price per mg, updated weekly from live supplier data.",
    icon: "coin",
    metric: "perMg" as const,
  },
  {
    slug: "melanotan-ii-price-comparison-uk",
    num: "03",
    title: "Melanotan II Price Comparison UK",
    desc: "Full side-by-side price table across every UK supplier we track.",
    icon: "chart",
    metric: "range" as const,
  },
  {
    slug: "buy-melanotan-ii-peptide",
    num: "04",
    title: "Buy Melanotan II Peptide",
    desc: "Ordering, payment methods, delivery and reconstitution supplies.",
    icon: "card",
    metric: "typical" as const,
  },
  {
    slug: "melanotan-ii-supplier-guide-uk",
    num: "05",
    title: "Melanotan II Supplier Guide UK",
    desc: "Which UK suppliers actually stock MT-II, and how to verify each listing.",
    icon: "swap",
    metric: "trust" as const,
  },
  {
    slug: "best-melanotan-ii-peptide",
    num: "06",
    title: "Best Melanotan II Peptide",
    desc: "Ranked by TrustScore, purity documentation and price per mg.",
    icon: "star",
    metric: "trust" as const,
  },
] as const;
