export interface ResearchArticle {
  title: string;
  desc: string;
  category: "Guide" | "Articles" | "Research Summaries" | "Compound Profiles";
  compound?: string;
  slug: string;
  minutes?: number;
  /** Path to cover image under /images/guides/ */
  image?: string;
}

export const guides: ResearchArticle[] = [
  {
    title: "Peptide Reconstitution Guide",
    desc: "How to properly reconstitute research peptides with bacteriostatic water, including calculations and best practices.",
    category: "Guide",
    slug: "peptide-reconstitution-guide",
    image: "peptide-reconstitution",
  },
  {
    title: "Understanding Peptide Purity",
    desc: "What HPLC purity tests mean, why 98%+ matters, and how to read COAs from UK suppliers.",
    category: "Guide",
    slug: "understanding-peptide-purity",
    image: "peptide-purity",
  },
  {
    title: "Peptide Storage & Handling",
    desc: "Proper storage temperatures, lyophilized vs reconstituted, and how to avoid degradation.",
    category: "Guide",
    slug: "peptide-storage-handling",
    image: "peptide-storage",
  },
  {
    title: "GLP-1 Research Overview",
    desc: "An introduction to GLP-1 receptor agonists including Tirzepatide and Semaglutide for research purposes.",
    category: "Compound Profiles",
    compound: "Tirzepatide",
    slug: "glp1-research-overview",
    image: "glp1-overview",
  },
  {
    title: "BPC-157 Research Summary",
    desc: "Overview of BPC-157, its research applications, dosing protocols, and current literature.",
    category: "Compound Profiles",
    compound: "BPC-157",
    slug: "bpc157-research-summary",
    image: "bpc157-summary",
  },
  {
    title: "Choosing a UK Supplier",
    desc: "What to look for when selecting a research peptide supplier in the UK: testing, shipping, and reputation.",
    category: "Guide",
    slug: "choosing-uk-supplier",
    image: "choosing-supplier",
  },
  {
    title: "Tirzepatide Research Summary",
    desc: "Overview of Tirzepatide as a dual GIP/GLP-1 receptor agonist, covering research into type 2 diabetes, obesity, MASH/NASH, and cardiovascular outcomes.",
    category: "Compound Profiles",
    compound: "Tirzepatide",
    slug: "tirzepatide-research-summary",
    image: "tirzepatide-summary",
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
