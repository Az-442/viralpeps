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
  /** Number of unique products (master compounds) this vendor supplies */
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

// Build a lookup: vendor name → set of compound ids (master only)
const masterCompounds = compounds.filter((c) => !(c as any)?.compareSlug);

/** Map of vendor name → array of master compounds they supply */
const vendorCompounds = new Map<string, typeof masterCompounds>();

for (const c of masterCompounds) {
  for (const s of c.sources) {
    const existing = vendorCompounds.get(s.vendor) || [];
    existing.push(c);
    vendorCompounds.set(s.vendor, existing);
  }
}

export function getVendorStats(vendorName: string): VendorStats {
  const vc = vendorCompounds.get(vendorName) || [];
  const categorySlugs = [...new Set(vc.map((c) => c.category))].sort();
  const categories = categorySlugs
    .map((slug) => CATEGORY_LABELS[slug] || slug)
    .filter(Boolean);

  let minPrice = Infinity;
  for (const c of vc) {
    for (const s of c.sources) {
      if (s.vendor === vendorName) {
        const p = parseFloat(s.price.replace(/[£$€,]/g, ""));
        if (!isNaN(p) && p < minPrice) minPrice = p;
      }
    }
  }

  return {
    compoundCount: vc.length,
    categories,
    categorySlugs,
    minPrice: minPrice === Infinity ? 0 : minPrice,
    allVendorNames: [...new Set(masterCompounds.flatMap((c) => c.sources.map((s) => s.vendor)))],
  };
}

/** Pre-compute for all vendors (for sorted listings) */
export const ALL_VENDOR_STATS = Object.fromEntries(
  vendors.map((v) => [v.name, getVendorStats(v.name)])
);
