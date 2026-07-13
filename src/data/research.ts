export interface ResearchArticle {
  title: string;
  desc: string;
  category: "Guide" | "Articles" | "Research Summaries" | "Compound Profiles";
  section: "peptides" | "comparisons" | "goals" | "research-hub";
  compound?: string;
  slug: string;
  minutes?: number;
  /** Path to cover image under /images/guides/ */
  image?: string;
  tags?: string[];
}

export const guides: ResearchArticle[] = [
  {
    title: "BPC-157 Research Summary",
    desc: "Overview of BPC-157, its research applications, dosing protocols, and current literature.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "BPC-157",
    slug: "bpc157-research-summary",
    image: "bpc157-summary",
    tags: ["healing", "tissue-repair", "recovery"],
  },
  {
    title: "Tirzepatide Research Summary",
    desc: "Overview of Tirzepatide as a dual GIP/GLP-1 receptor agonist, covering research into type 2 diabetes, obesity, MASH/NASH, and cardiovascular outcomes.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Tirzepatide",
    slug: "tirzepatide-research-summary",
    image: "tirzepatide-summary",
    tags: ["glp-1", "metabolic", "weight-loss"],
  },
  {
    title: "GHK-Cu Research Summary",
    desc: "Overview of GHK-Cu, a naturally occurring copper peptide complex that modulates gene expression, promotes tissue repair, and supports skin health research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "GHK-Cu",
    slug: "ghkcu-research-summary",
    image: "ghkcu-summary",
    tags: ["copper", "skin", "collagen", "wound-healing"],
  },
  {
    title: "Retatrutide Research Summary",
    desc: "Overview of Retatrutide (LY3437943), a first-in-class triple GLP-1/GIP/glucagon receptor agonist for metabolic and obesity research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Retatrutide",
    slug: "retatrutide-research-summary",
    image: "retatrutide-summary",
    tags: ["glp-1", "metabolic", "obesity", "triple-agonist"],
  },
  {
    title: "Semax Research Summary",
    desc: "Overview of Semax, a synthetic ACTH(4-10) analog that upregulates BDNF and NGF for neuroprotection, cognitive enhancement, and stroke recovery research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Semax",
    slug: "semax-research-summary",
    image: "semax-summary",
    tags: ["nootropic", "neuroprotection", "bdnf", "cognitive"],
  },
  {
    title: "Selank Research Summary",
    desc: "Overview of Selank (TP-7), a synthetic heptapeptide tuftsin analog with anxiolytic and nootropic properties for neuropeptide research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Selank",
    slug: "selank-research-summary",
    image: "selank-summary",
    tags: ["anxiolytic", "nootropic", "gaba", "neuropeptide"],
  },
  {
    title: "GHK-Cu vs BPC-157: Which Peptide for Tissue Repair?",
    desc: "A detailed comparison of GHK-Cu and BPC-157 — two of the most studied peptides in regenerative research. Explore their mechanisms, strengths, and ideal research applications side by side.",
    category: "Articles",
    section: "comparisons",
    slug: "ghkcu-vs-bpc157",
    image: "ghkcu-vs-bpc157",
    tags: ["ghk-cu", "bpc-157", "comparison", "tissue-repair"]
  },
  {
    title: "Retatrutide vs Tirzepatide: Triple vs Dual Agonist Showdown",
    desc: "A detailed comparison of retatrutide (triple GLP-1/GIP/glucagon agonist) and tirzepatide (dual GIP/GLP-1 agonist) — mechanism of action, clinical weight loss data, liver fat reduction, regulatory status, and where each stands in metabolic research.",
    category: "Articles",
    section: "comparisons",
    slug: "retatrutide-vs-tirzepatide",
    image: "retatrutide-vs-tirzepatide",
    tags: ["retatrutide", "tirzepatide", "comparison", "glp-1", "metabolic"],
  },
  {
    title: "Semax vs Selank: Nootropic & Anxiolytic Comparison",
    desc: "A side-by-side comparison of Semax and Selank — two Russian-developed regulatory heptapeptides with distinct primary mechanisms. Semax excels at cognitive enhancement and neuroprotection via BDNF/TrkB upregulation, while Selank provides anxiety reduction without sedation through GABAergic allosteric modulation and immunomodulation.",
    category: "Articles",
    section: "comparisons",
    slug: "semax-vs-selank",
    image: "semax-vs-selank",
    tags: ["semax", "selank", "comparison", "nootropic", "anxiolytic"],
  },
  {
    title: "Peptide Reconstitution Guide",
    desc: "A complete step-by-step guide to reconstituting lyophilised peptides with bacteriostatic water, including supplies, dosing math, storage, and common mistakes to avoid.",
    category: "Guide",
    section: "research-hub",
    slug: "peptide-reconstitution-guide",
    image: "peptide-reconstitution-guide",
    tags: ["reconstitution", "bac-water", "dosing", "storage", "guide"],
    minutes: 12,
  },
];

export const compoundList: string[] = [
  "BPC-157", "TB-500", "Tirzepatide", "Semaglutide", "Retatrutide",
  "GHK-Cu", "NAD+", "AOD 9604", "CJC-1295", "Ipamorelin",
  "Tesamorelin", "PT-141", "Melanotan 2", "Thymosin Alpha-1",
  "MOTS-C", "SS-31", "LL-37", "KPV", "Epitalon", "FOX04-DRI",
  "GLP-1", "Frag 176-191", "GHRP-2", "GHRP-6", "Sermorelin",
  "Selank", "Semax", "Oxytocin", "DSIP", "P21", "Dihexa",
  "Vilon", "Thymalin", "Pinealon", "Cerebrolysin",
];

// Nav sections matching PeptideGuide: Peptides, Comparisons, Goals, Research Hub
export const navSections = [
  { key: "all", label: "All" },
  { key: "peptides", label: "Peptides" },
  { key: "comparisons", label: "Comparisons" },
  { key: "goals", label: "Goals" },
  { key: "research-hub", label: "Research Hub" },
] as const;
