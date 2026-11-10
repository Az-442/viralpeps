/**
 * HMG silo spoke 5 of 6 — HMG supplier UK.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "hmg-supplier-uk",
  title: "HMG Supplier UK: How to Verify Before You Buy",
  description:
    "HMG supplier UK — the checks that carry real weight in order, how to read a gonadotropin COA properly, and why lot-specific documentation finally decides it.",
  h1: "HMG Supplier UK",
  focusKeyword: "hmg supplier uk",
  intro: [
    "Choosing an HMG supplier UK is a different exercise from choosing a peptide supplier, because the article being supplied is not a defined chemical you can sanity-check against a sequence. HMG, or menotropin, is a urinary gonadotropin extract with no molecular weight, no CAS number and no chemical formula in the peptide sense, standardised by biological activity in international units. The verification burden therefore falls entirely on the supplier's documentation and identity, and the checks that matter are the ones that establish what the supplier actually has and who they actually are.",
    "This page orders those checks by how much weight they carry, so you can work down the list and stop once you are satisfied rather than collecting checkboxes. The point is not to gather documents for their own sake — it is to filter out the two failure modes that dominate this market: the seller who has not characterised what they are selling, and the seller who is not a traceable UK business at all.",
    "The table below is generated from the live price data in our tracker. It lists every HMG listing from the UK suppliers ViralPeps tracks, with the pack label, headline price, per 1,000 IU rate, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "Everything on this page is research-use-only and nothing here is medical advice. For the full market picture, start at the [**HMG UK price comparison hub →**](/compounds/hmg).",
  ],
  sections: [
    {
      title: "The Checks That Carry Real Weight, in Order",
      body:
        "Verification is not a flat list; some checks eliminate more risk than others, and the order matters because you should stop once you are satisfied rather than collect everything.\n\nFirst and heaviest: lot-specific identity. For HMG the meaningful document is a Certificate of Analysis that is tied to a specific batch, states the FSH and LH activity, and names the assay used. This is the check that separates a characterised preparation from a label, and it outweighs every other check combined.\n\nSecond: business identity. The supplier should be a traceable UK company with a contact route that replies before you pay, and — ideally — a domain they demonstrably operate. A TrustScore badge installed on their own domain is proof of the latter, which is why it is the cheapest reliable filter for throwaway storefronts.\n\nThird: labelling discipline. Research-use-only language throughout, with no human-use, bodybuilding or fertility self-treatment claims, and no licensed brand names such as Menopur or Merional. A supplier who borrows the medicine's language is selling across a legal boundary.\n\nFourth: the unit question. The supplier states the pack in international units — the 75 IU standard — rather than a mass, and can explain why HMG has no milligram figure to divide by. A supplier who answers that question well has understood the product; a supplier who cannot has not.",
      list: [
        "Lot-specific COA — FSH/LH activity plus the assay used.",
        "Business identity — traceable UK company, contact that replies.",
        "Labelling discipline — research-use-only, no licensed brand names.",
        "The unit question — dosed in IU, not mg, and can say why.",
      ],
    },
    {
      title: "Reading an HMG Certificate of Analysis Properly",
      body:
        "A Certificate of Analysis is the document that does the work in this market, and most of the mistakes buyers make come from not reading it rather than not receiving it. The first question is not whether a COA exists — almost every listing shows one — but whether it is lot-specific and whether it states the right things for a biological.\n\nA peptide COA reports a molecular weight and a purity percentage computed against a known sequence. A gonadotropin COA has no molecular weight to report, and a single purity percentage does not establish that a urinary extract is present. The meaningful certificate for HMG reports identity by activity: an immunoassay or equivalent for FSH and for LH, alongside an HPLC trace, tied to a batch number that matches the label on the vial. A certificate that only shows a purity percentage is a peptide certificate reused for a biological.\n\nThe second question is the batch link. A generic COA that is served as a static PDF for every customer is a marketing document, not a characterisation. The certificate must reference the batch you are buying, and the batch number must match the vial when it arrives. This is the single most common failure in the unregulated tail of the market, and it is invisible until you check.\n\nThe third question is the assay detail. Because a 2024 analysis showed the LH activity in urinary HMG is largely hCG, a supplier who can tell you how their certificate distinguishes FSH from LH activity — and ideally how much of the LH signal is hCG — is a supplier who has actually read their own documentation.",
      table: {
        header: ["COA element", "For a peptide", "For HMG (a biological)"],
        rows: [
          ["Identity", "Molecular weight vs sequence", "FSH and LH activity by immunoassay"],
          ["Purity", "Single HPLC percentage", "HPLC trace plus activity confirmation"],
          ["Batch", "Batch number", "Batch number that must match the vial label"],
          ["Assay", "Often omitted", "Must name the FSH/LH assay used"],
          ["MW", "Required", "Does not exist — its absence is correct, not a gap"],
        ],
      },
    },
    {
      title: "Storage, Cold Chain and Why HMG Is Less Forgiving",
      body:
        "A supplier's answer to the storage question tells you more than their marketing copy does, because it is a question only a supplier who has thought about the material can answer well.\n\nHMG is a protein mixture, and lyophilised gonadotropins are less forgiving than small synthetic peptides. The dry form is stable, but the supplier should still state storage conditions — refrigerated or frozen — and a reconstitution window, because once reconstituted a gonadotropin degrades over days rather than months. A supplier who publishes those conditions is describing a product they understand; a supplier who says nothing is either selling a label or has never been asked.\n\nThe cold-chain question matters for the same reason. A vial warehoused at ambient temperature may be fine on the day it was tested and less fine on the day it reaches you. You cannot verify storage conditions from outside, but the answer you get tells you whether the question was ever considered — and in this market that is itself the signal.\n\nThe practical consequence for supplier choice is that documentation and handling discipline are worth more than a small price difference. In a market with a handful of listings the spread is narrow, so the difference between the cheapest and the safest supplier is small in absolute terms. Buy the cheapest supplier who passes the checks, not the cheapest supplier overall.",
    },
    {
      title: "The Identity Trap — What a Supplier Should Know About Menotropin",
      body:
        "The single most revealing question you can ask an HMG supplier is what they think the product is, because the answer exposes whether they are selling a characterised preparation or a label. The correct answer, in brief: menotropin is a urinary extract supplying FSH and LH activity, standardised by bioassay in international units, with no molecular weight and no CAS number, whose LH activity is largely hCG and a substantial fraction of whose material is non-gonadotropin urinary protein.\n\nA supplier who gives some version of that answer has understood the product and is worth the next question. A supplier who instead quotes a molecular weight, a CAS number such as 61489-71-2, or a neat chemical formula is advertising properties the product does not have — the vendor CAS is unverified and pairs with a nonsense formula, and any molecular weight is an artefact. That supplier is either misinformed or misrepresenting, and neither is the basis of a purchase.\n\nTwo further identity points separate the careful supplier from the rest. The first is the urinary-versus-recombinant distinction: urinary menotropin and recombinant FSH are different articles with different glycoform profiles and receptor residency, and they are not interchangeable. The second is the lot question: two vials of equal mass are not equal potency unless they are from the same characterised lot, because IU is a bioassay. A supplier who understands both is the one whose [TrustScore](/vendors) and documentation you should weight most heavily.",
    },
    {
      title: "Building a Shortlist and Making the Call",
      body:
        "The output of all these checks is a shortlist, and for HMG the shortlist is short because the market is small. The procedure is the same regardless of how many listings you start with.\n\nWork down the four checks in order — lot-specific COA, business identity, labelling discipline, the unit question — and discard at the first failure rather than the end. For the survivors, confirm the storage and handling statement, then rank on price per 1,000 IU using the [cheapest HMG UK leaderboard](/compound-guides/cheapest-hmg-uk). Buy the cheapest of the survivors.\n\nTwo resources make this concrete. The [**HMG UK price comparison hub →**](/compounds/hmg) shows the full live market with verification state, and the [**HMG research guide**](/research/hmg-research-guide) explains the identity background — why a urinary extract has no CAS, no formula and no molecular weight — that makes these checks necessary rather than optional. If a supplier fails the identity question, no price in the table below fixes that.",
    },
  ],
  faq: [
    {
      question: "What is the most important thing to check on an HMG supplier?",
      answer:
        "That their Certificate of Analysis is lot-specific and states the FSH and LH activity plus the assay used, and that the batch number matches the vial label. Everything else — price, stock, marketing — is downstream of whether the supplier has actually characterised what they are selling.",
    },
    {
      question: "Does HMG have a CAS number or molecular weight?",
      answer:
        "No. HMG is a urinary extract standardised by bioassay, not a defined molecule, so it has no molecular weight, no CAS number and no chemical formula in the peptide sense. A supplier quoting a vendor CAS such as 61489-71-2 is advertising a property the product does not have.",
    },
    {
      question: "Why does the LH activity in HMG matter to a supplier check?",
      answer:
        "Because a 2024 composition analysis showed the LH activity in urinary HMG is largely hCG rather than luteinising hormone. A supplier who can explain how their certificate distinguishes the two is a supplier who has read their own documentation; one who cannot has not.",
    },
    {
      question: "Should I always choose the cheapest verified supplier?",
      answer:
        "Within the verified shortlist, yes — the spread is narrow, so the cheapest survivor is genuinely the cheapest. The key word is survivor: only rank on price after the lot-specific COA, business identity and labelling checks have filtered out the unregulated tail.",
    },
  ],
  sources: [
    {
      label:
        "Capolupo et al., Int J Mol Sci 2024 — hCG profile in highly purified HMG (PMID 39273352)",
      url: "https://pubmed.ncbi.nlm.nih.gov/39273352/",
    },
    {
      label:
        "van de Weijer et al., Reprod Biomed Online 2003 — menotropin compositional analysis (PMID 14680547)",
      url: "https://pubmed.ncbi.nlm.nih.gov/14680547/",
    },
    {
      label:
        "Bohrer & Kemmann, Fertil Steril 1987 — spontaneous abortion risk in menotropin-treated women",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
    },
    {
      label: "HMG Research Guide — no CAS, no formula, no MW (ViralPeps)",
      url: "/research/hmg-research-guide",
    },
  ],
  tableMode: "trust",
  tableHeading: "HMG Supplier UK — Ranked by Verification and TrustScore",
  rowLimit: 12,
};
