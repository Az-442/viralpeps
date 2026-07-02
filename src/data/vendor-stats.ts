/** Visible product entries count matching what a vendor profile actually displays.
 *  For catalog vendors (those with compareSlug entries), this filters to
 *  only catalog entries + exclusive-only entries. For regular vendors it's
 *  the number of unique master compounds the vendor appears in. */
export function getVisibleCount(vendorName: string): number {
  const vc = compounds.filter((c) =>
    c.sources.some((s) => s.vendor === vendorName)
  );
  const hasCatalog = vc.some(
    (c) =>
      (c as any)?.compareSlug &&
      c.sources.every((s) => s.vendor === vendorName)
  );
  if (hasCatalog) {
    return vc.filter(
      (c) =>
        (c as any)?.compareSlug ||
        c.sources.every((s) => s.vendor === vendorName)
    ).length;
  }
  return vc.length;
}

/** Pre-computed visible counts for all vendors */
export const ALL_VISIBLE_COUNTS = Object.fromEntries(
  vendors.map((v) => [v.name, getVisibleCount(v.name)])
);

/**
 * Dynamically computed vendor stats — no hardcoded counts or categories.
 *
 * Derives `compoundCount` and `categories` for each vendor by
 * scanning compounds.json at module-import time.  Always in sync
 * with the actual data.
 */
import compounds from "./compounds.json";
import vendors from "./vendors.json";
import { CATEGORY_LABELS } from "./categories";

// ── Per-vendor data ──

export interface VendorStats {
  /** Total product listings for this vendor (counting all source entries and dosage variants) */
  productCount: number;
  /** Number of unique master compounds this vendor supplies (deprecated — kept for backwards compat) */
  compoundCount: number;
  /** Human-readable category labels this vendor's products fall under */
  categories: string[];
  /** Category slugs this vendor's products fall under */
  categorySlugs: string[];
  /** Minimum price across all this vendor's sources */
  minPrice: number;
  /** All distinct vendor names that appear in compounds.json sources */
  allVendorNames: string[];
}

// Build a lookup: vendor name → set of compound ids (only unique)
// Use all compounds — both master (no compareSlug) and catalog (has compareSlug)
// to get complete product counts per vendor
const allCompounds = compounds;

/** Map of vendor name → array of unique compounds they supply */
const vendorCompounds = new Map<string, typeof allCompounds>();

for (const c of allCompounds) {
  const seen = new Set<string>();
  for (const s of c.sources) {
    if (!seen.has(s.vendor)) {
      seen.add(s.vendor);
      const existing = vendorCompounds.get(s.vendor) || [];
      existing.push(c);
      vendorCompounds.set(s.vendor, existing);
    }
  }
}

export function getVendorStats(vendorName: string): VendorStats {
  const vc = vendorCompounds.get(vendorName) || [];
  const categorySlugs = [...new Set(vc.map((c) => c.category).filter((c): c is string => !!c))].sort();
  const categories = categorySlugs
    .map((slug) => CATEGORY_LABELS[slug] || slug)
    .filter(Boolean);

  let minPrice = Infinity;
  let productCount = 0;
  for (const c of vc) {
    for (const s of c.sources) {
      if (s.vendor === vendorName) {
        const p = parseFloat(s.price.replace(/[£$€,]/g, ""));
        if (!isNaN(p) && p < minPrice) minPrice = p;
        const opts = (s as any)?.options;
        if (opts && opts.length > 0) {
          productCount += opts.length;
        } else {
          productCount += 1;
        }
      }
    }
  }

  return {
    productCount,
    compoundCount: vc.length,
    categories: categories.filter((c): c is string => !!c),
    categorySlugs,
    minPrice: minPrice === Infinity ? 0 : minPrice,
    allVendorNames: [...new Set((allCompounds as any[]).flatMap((c: any) => c.sources.map((s: any) => s.vendor as string)))],
  };
}

/** Pre-compute for all vendors (for sorted listings) */
export const ALL_VENDOR_STATS = Object.fromEntries(
  vendors.map((v) => [v.name, getVendorStats(v.name)])
);
