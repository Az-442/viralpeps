import { RETA_SPOKES, getRetaStats, type RetaStats } from "@/data/retatrutide-silo";
import { TIRZ_SPOKES, getTrizStats, type TrizStats } from "@/data/tirzepatide-silo";
import { SEMA_SPOKES, getSemaStats, type SemaStats } from "@/data/semaglutide-silo";
import { SEMAX_SPOKES, getSemaxStats, type SemaxStats } from "@/data/semax-silo";
import { SELANK_SPOKES, getSelankStats, type SelankStats } from "@/data/selank-silo";
import {
  IPAMORELIN_SPOKES,
  getIpamorelinStats,
  type IpamorelinStats,
} from "@/data/ipamorelin-silo";
import { MOTS_C_SPOKES, getMotsCStats, type MotsCStats } from "@/data/mots-c-silo";
import {
  BPC_157_SPOKES,
  getBpcStats,
  type BpcStats,
} from "@/data/bpc-157-silo";
import { GHK_CU_SPOKES, getGhkStats, type GhkStats } from "@/data/ghk-cu-silo";
import { TB_500_SPOKES, getTbStats, type TbStats } from "@/data/tb-500-silo";
import {
  IGF_1_LR3_SPOKES,
  getIgfStats,
  type IgfStats,
} from "@/data/igf-1-lr3-silo";
import { TESA_SPOKES, getTesaStats, type TesaStats } from "@/data/tesamorelin-silo";
import { NAD_SPOKES, getNadStats, type NadStats } from "@/data/nad-plus-silo";
import {
  BAC_SPOKES,
  getBacStats,
  type BacStats,
} from "@/data/bacteriostatic-water-silo";
import { SS_31_SPOKES, getSs31Stats, type Ss31Stats } from "@/data/ss-31-silo";
import {
  SERMORELIN_SPOKES,
  getSermorelinStats,
  type SermorelinStats,
} from "@/data/sermorelin-silo";
import { AOD_SPOKES, getAodStats, type AodStats } from "@/data/aod-9604-silo";
import { PT141_SPOKES, getPt141Stats, type Pt141Stats } from "@/data/pt-141-silo";

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
  {
    compoundSlug: "semaglutide",
    name: "Semaglutide",
    blurb:
      "GLP-1 receptor agonist buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: SEMA_SPOKES as unknown as SiloSpoke[],
    getStats: () => getSemaStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "semax",
    name: "Semax",
    blurb:
      "ACTH(4-10) heptapeptide buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: SEMAX_SPOKES as unknown as SiloSpoke[],
    getStats: () => getSemaxStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "selank",
    name: "Selank",
    blurb:
      "Tuftsin-analogue heptapeptide buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: SELANK_SPOKES as unknown as SiloSpoke[],
    getStats: () => getSelankStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "ipamorelin",
    name: "Ipamorelin",
    blurb:
      "Selective growth hormone secretagogue buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: IPAMORELIN_SPOKES as unknown as SiloSpoke[],
    getStats: () => getIpamorelinStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "mots-c",
    name: "MOTS-c",
    blurb:
      "Mitochondrial-derived peptide buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: MOTS_C_SPOKES as unknown as SiloSpoke[],
    getStats: () => getMotsCStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "bpc-157",
    name: "BPC-157",
    blurb:
      "Body Protection Compound 157 buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: BPC_157_SPOKES as unknown as SiloSpoke[],
    getStats: () => getBpcStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "ghk-cu",
    name: "GHK-Cu",
    blurb:
      "Copper tripeptide buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: GHK_CU_SPOKES as unknown as SiloSpoke[],
    getStats: () => getGhkStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "tb-500",
    name: "TB-500",
    blurb:
      "Thymosin beta-4 fragment buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: TB_500_SPOKES as unknown as SiloSpoke[],
    getStats: () => getTbStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "igf-1-lr3",
    name: "IGF-1 LR3",
    blurb:
      "Long R3 insulin-like growth factor-1 buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: IGF_1_LR3_SPOKES as unknown as SiloSpoke[],
    getStats: () => getIgfStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "tesamorelin",
    name: "Tesamorelin",
    blurb:
      "GHRH analogue buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: TESA_SPOKES as unknown as SiloSpoke[],
    getStats: () => getTesaStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "nad-plus",
    name: "NAD+",
    blurb:
      "Nicotinamide adenine dinucleotide buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: NAD_SPOKES as unknown as SiloSpoke[],
    getStats: () => getNadStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    blurb:
      "Laboratory diluent buying guides — verified UK suppliers, lowest cost per ml, full price comparison and evidence-ranked supplier checks.",
    spokes: BAC_SPOKES as unknown as SiloSpoke[],
    getStats: () => getBacStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "ss-31",
    name: "SS-31",
    blurb:
      "Elamipretide (mitochondria-targeted tetrapeptide) buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: SS_31_SPOKES as unknown as SiloSpoke[],
    getStats: () => getSs31Stats() as unknown as SiloStats,
  },
  {
    compoundSlug: "sermorelin",
    name: "Sermorelin",
    blurb:
      "GHRH(1-29) analogue buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: SERMORELIN_SPOKES as unknown as SiloSpoke[],
    getStats: () => getSermorelinStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "aod-9604",
    name: "AOD-9604",
    blurb:
      "hGH fragment 176-191 buying guides — verified UK suppliers, lowest price per mg, full price comparison and TrustScore rankings.",
    spokes: AOD_SPOKES as unknown as SiloSpoke[],
    getStats: () => getAodStats() as unknown as SiloStats,
  },
  {
    compoundSlug: "pt-141-bremelanotide",
    name: "PT-141",
    blurb:
      "Bremelanotide (PT-141) buying guides — verified UK suppliers, lowest price per mg, full price comparison, salt-form checks and TrustScore rankings.",
    spokes: PT141_SPOKES as unknown as SiloSpoke[],
    getStats: () => getPt141Stats() as unknown as SiloStats,
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

export type { RetaStats, TrizStats, SemaStats, SemaxStats, SelankStats, IpamorelinStats, MotsCStats, BpcStats, IgfStats, TbStats, TesaStats, NadStats, BacStats, Ss31Stats };
export type { SermorelinStats };
export type { AodStats };
export type { GhkStats };
export type { Pt141Stats };
