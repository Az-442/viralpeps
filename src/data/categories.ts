/**
 * Central category definitions — single source of truth for all pages.
 *
 * Every CategorySlug here must match a `category` value in compounds.json.
 * Homepage groups can span multiple slugs (e.g. Healing & Tissue Repair).
 */

/** Every category slug that appears in compounds.json */
export type CategorySlug =
  | "glp-1-agonists"
  | "growth-hormone"
  | "anti-aging"
  | "immunity-peptides"
  | "tanning-libido"
  | "thymosin-bpc"
  | "tb-500"
  | "peptide-fragments"
  | "cognitive"
  | "aod-fragments"
  | "peptide-blends"
  | "research-compounds"
  | "research-solutions"
  | "nasal-sprays"
  | "lab-supplies"
  | "supplies"
  | "other"
  | "auto-imported";

/** Slug → human-readable label (for badges on compound cards / filters) */
export const CATEGORY_LABELS: Record<string, string> = {
  "glp-1-agonists": "GLP-1 Agonists",
  "growth-hormone": "Growth Hormone",
  "anti-aging": "Anti-Aging & Longevity",
  "immunity-peptides": "Immunity & Defence",
  "tanning-libido": "Tanning & Libido",
  "thymosin-bpc": "Thymosin / BPC",
  "tb-500": "TB-500",
  "peptide-fragments": "Peptide Fragments",
  cognitive: "Cognitive",
  "aod-fragments": "AOD / Fragments",
  "peptide-blends": "Peptide Blends",
  "research-compounds": "Research Compounds",
  "research-solutions": "Research Solutions",
  "nasal-sprays": "Nasal Sprays",
  "lab-supplies": "Lab Supplies",
  supplies: "Supplies",
  other: "Other Research Peptides",
  "auto-imported": "Auto-Imported",
};

/** Slug → badge colour class for visual distinction */
export const CATEGORY_BADGE_COLORS: Record<string, string> = {
  "glp-1-agonists": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "growth-hormone": "bg-blue-100 text-blue-700 border-blue-200",
  "anti-aging": "bg-purple-100 text-purple-700 border-purple-200",
  "immunity-peptides": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "tanning-libido": "bg-rose-100 text-rose-700 border-rose-200",
  "thymosin-bpc": "bg-amber-100 text-amber-700 border-amber-200",
  "tb-500": "bg-orange-100 text-orange-700 border-orange-200",
  "peptide-fragments": "bg-teal-100 text-teal-700 border-teal-200",
  cognitive: "bg-indigo-100 text-indigo-700 border-indigo-200",
  "aod-fragments": "bg-pink-100 text-pink-700 border-pink-200",
  "peptide-blends": "bg-slate-100 text-slate-700 border-slate-200",
  "research-compounds": "bg-gray-100 text-gray-700 border-gray-200",
  "research-solutions": "bg-lime-100 text-lime-700 border-lime-200",
  "nasal-sprays": "bg-violet-100 text-violet-700 border-violet-200",
  "lab-supplies": "bg-yellow-100 text-yellow-700 border-yellow-200",
  supplies: "bg-stone-100 text-stone-700 border-stone-200",
  other: "bg-slate-100 text-slate-700 border-slate-200",
  "auto-imported": "bg-sky-100 text-sky-700 border-sky-200",
};

/** A homepage section that groups one or more categories */
export interface HomepageCategoryGroup {
  badge: string;
  title: string;
  desc: string;
  slugs: string[];
  icon?: "star" | "fire" | "bolt" | "dna" | "shield" | "sun" | "brain" | "atom" | "box";
}

/** Homepage category groups — used by page.tsx to render scroll sections */
export const HOMEPAGE_CATEGORY_GROUPS: HomepageCategoryGroup[] = [
  {
    badge: "WEIGHT LOSS & METABOLISM",
    title: "Compare weight loss & metabolism peptides",
    desc: "GLP-1 agonists and metabolic peptides researchers are comparing most.",
    slugs: ["glp-1-agonists"],
  },
  {
    badge: "HEALING & TISSUE REPAIR",
    title: "Compare healing & tissue repair peptides",
    desc: "BPC-157, TB-500, and repair-focused peptides for tissue recovery research.",
    slugs: ["thymosin-bpc", "tb-500", "peptide-fragments"],
  },
  {
    badge: "GROWTH HORMONE",
    title: "Compare growth hormone peptides",
    desc: "GHRPs, GHRHs, IGF-1, and growth hormone secretagogues for research.",
    slugs: ["growth-hormone"],
  },
  {
    badge: "ANTI-AGING & LONGEVITY",
    title: "Compare anti-aging & longevity peptides",
    desc: "GHK-Cu, Epitalon, NAD+, and peptides studied for cellular health and aging research.",
    slugs: ["anti-aging"],
  },
  {
    badge: "IMMUNITY & DEFENCE",
    title: "Compare immunity & defence peptides",
    desc: "Thymosin Alpha-1, KPV, Selank, and immune-support research peptides.",
    slugs: ["immunity-peptides"],
  },
  {
    badge: "TANNING & LIBIDO",
    title: "Compare tanning & libido peptides",
    desc: "Melanotan II, PT-141, Kisspeptin, and melanocortin-based research compounds.",
    slugs: ["tanning-libido"],
  },
  {
    badge: "PEPTIDE BLENDS & STACKS",
    title: "Compare peptide blends and stacks",
    desc: "Pre-formulated peptide stacks and blends for targeted research protocols.",
    slugs: ["peptide-blends"],
  },
  {
    badge: "COGNITIVE & NOOTROPICS",
    title: "Compare cognitive peptides",
    desc: "Research peptides being studied for cognitive function and neuroprotection.",
    slugs: ["cognitive"],
  },
  {
    badge: "AOD & FRAGMENTS",
    title: "Compare AOD & fragment peptides",
    desc: "AOD-9604 and fragment-based research compounds.",
    slugs: ["aod-fragments"],
  },
  {
    badge: "OTHER RESEARCH PEPTIDES",
    title: "Compare other research peptides",
    desc: "Additional research compounds not covered in other categories.",
    slugs: ["other", "research-compounds", "research-solutions", "nasal-sprays", "lab-supplies", "supplies", "auto-imported"],
  },
];
