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
    title: "Peptide Reconstitution Guide",
    desc: "How to properly reconstitute research peptides with bacteriostatic water, including calculations and best practices.",
    category: "Guide",
    section: "research-hub",
    slug: "peptide-reconstitution-guide",
    image: "peptide-reconstitution",
    tags: ["reconstitution", "administration", "basics"],
  },
  {
    title: "Understanding Peptide Purity",
    desc: "What HPLC purity tests mean, why 98%+ matters, and how to read COAs from UK suppliers.",
    category: "Guide",
    section: "research-hub",
    slug: "understanding-peptide-purity",
    image: "peptide-purity",
    tags: ["quality", "COA", "hplc"],
  },
  {
    title: "Peptide Storage & Handling",
    desc: "Proper storage temperatures, lyophilized vs reconstituted, and how to avoid degradation.",
    category: "Guide",
    section: "research-hub",
    slug: "peptide-storage-handling",
    image: "peptide-storage",
    tags: ["storage", "handling", "basics"],
  },
  {
    title: "GLP-1 Research Overview",
    desc: "An introduction to GLP-1 receptor agonists including Tirzepatide and Semaglutide for research purposes.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Tirzepatide",
    slug: "glp1-research-overview",
    image: "glp1-overview",
    tags: ["glp-1", "metabolic", "diabetes"],
  },
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
    title: "Choosing a UK Supplier",
    desc: "What to look for when selecting a research peptide supplier in the UK: testing, shipping, and reputation.",
    category: "Guide",
    section: "research-hub",
    slug: "choosing-uk-supplier",
    image: "choosing-supplier",
    tags: ["suppliers", "buying-guide", "quality"],
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
