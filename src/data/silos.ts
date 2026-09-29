import { RETA_SPOKES, getRetaStats, type RetaStats } from "@/data/retatrutide-silo";
import { TIRZ_SPOKES, getTrizStats, type TrizStats } from "@/data/tirzepatide-silo";

/**
 * Silo registry — the SINGLE list of which compounds have a live silo.
 * The /compound-guides hub index, cross-links and sitemap all read from here.
 *
 * Add a compound here only once its spokes are live (200 + real content).
 */

export interface SiloStats {
  suppliers: number;
  products: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  bestPerMg: number | null;
  topTrustScore: number | null;
  packs: number;
}

export interface SiloSpoke {
  slug: string;
  num: string;
  title: string;
  desc: string;
  icon: string;
  metric: string;
  badge?: string;
}

export interface Silo {
  /** Compound slug under /compounds/[slug] (the hub). */
  compoundSlug: string;
  /** Display name. */
  name: string;
  /** Short blurb for the hub index card. */
  blurb: string;
  spokes: readonly SiloSpoke[];
  getStats: () => SiloStats;
  /** Spoke content slug prefix = the route lives at /compound-guides/<spoke.slug>. */
}

export const SILOS: Silo[] = [
  {
    compoundSlug: "retatrutide",
    name: "Retatrutide",
    blurb:
      "Triple GIP/GLP-1/glucagon agonist buying guides — where to buy, cheapest price per mg, full comparison and TrustScore rankings.",
    spokes: RETA_SPOKES as unknown as SiloSpoke[],
    getStats: () => getRetaStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "tirzepatide",
    name: "Tirzepatide",
    blurb:
      "Dual GIP/GLP-1 agonist buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: TIRZ_SPOKES as unknown as SiloSpoke[],
    getStats: () => getTrizStats() as unknown as SiloStats,
  },
];

/** Every spoke slug across every silo — for generateStaticParams + sitemap. */
export function allSpokeSlugs(): string[] {
  return SILOS.flatMap((s) => s.spokes.map((sp) => sp.slug));
}

export function getSiloForSpoke(slug: string): { silo: Silo; spoke: SiloSpoke } | null {
  for (const silo of SILOS) {
    const spoke = silo.spokes.find((sp) => sp.slug === slug);
    if (spoke) return { silo, spoke };
  }
  return null;
}

export type { RetaStats, TrizStats };
