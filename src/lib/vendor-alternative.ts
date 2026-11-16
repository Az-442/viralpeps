// Dead-vendor re-routing helper.
//
// The TrustScore auto-check crawler marks each supplier `_autoChecks.live`.
// When a supplier's site is down (live === false), outbound clicks to it are
// wasted — we instead route the visitor to the best live alternative, with an
// honest "this supplier is offline" interstitial (see /go/down).
import vendorsData from "@/data/vendors.json";
import { getTrustScore } from "@/lib/trust-score";

type Vendor = {
  slug: string;
  name: string;
  website: string;
  _autoChecks?: { live?: boolean };
};

const vendors = vendorsData as Vendor[];

export interface Alternative {
  slug: string;
  name: string;
  website: string;
}

/** True only when the crawler explicitly found the site unreachable. */
export function isVendorDead(slug: string): boolean {
  const v = vendors.find((x) => x.slug === slug);
  return v ? v._autoChecks?.live === false : false;
}

function liveVendors(): Vendor[] {
  return vendors.filter((v) => v.website && v._autoChecks?.live !== false);
}

/** Best live alternative across the whole directory (vendor-level /go/[slug]). */
export function bestAlternativeVendor(excludeSlug?: string): Alternative | null {
  return pickBest(liveVendors().filter((v) => v.slug !== excludeSlug));
}

/**
 * Best live alternative that also sells this compound (product-level
 * /go/[slug]/[compound]). Falls back to any live vendor if none of the
 * compound's other suppliers are reachable.
 */
export function bestAlternativeForCompound(
  compound: { sources?: { vendor: string }[] },
  deadVendorName: string
): Alternative | null {
  const srcNames = new Set((compound.sources || []).map((s) => s.vendor));
  let candidates = liveVendors().filter(
    (v) => v.name !== deadVendorName && srcNames.has(v.name)
  );
  if (candidates.length === 0) {
    candidates = liveVendors().filter((v) => v.name !== deadVendorName);
  }
  return pickBest(candidates);
}

function pickBest(candidates: Vendor[]): Alternative | null {
  if (candidates.length === 0) return null;
  const sorted = [...candidates].sort((a, b) => {
    const sa = getTrustScore(a.name).score;
    const sb = getTrustScore(b.name).score;
    if (sb !== sa) return sb - sa;
    return a.name.localeCompare(b.name);
  });
  const best = sorted[0];
  return { slug: best.slug, name: best.name, website: best.website };
}
