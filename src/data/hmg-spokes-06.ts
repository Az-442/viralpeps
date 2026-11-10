/**
 * HMG silo spoke 6 of 6 — best HMG peptide.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "best-hmg-peptide",
  title: "Best HMG Peptide: Ranked by Trust and Identity 2026",
  description:
    "Best HMG peptide — the criteria that actually decide it, why identity outranks price, and how the LH activity being largely hCG changes the entire ranking.",
  h1: "Best HMG Peptide",
  focusKeyword: "best hmg peptide",
  intro: [
    "Asking for the best HMG peptide is slightly wrong in a way that is worth stating up front, because HMG is not a peptide at all. Human menopausal gonadotropin, or menotropin, is a urinary extract containing follicle-stimulating hormone and luteinising hormone activity — glycoproteins, not peptides — standardised by biological activity in international units. The \"best\" version of it is therefore not the purest sequence or the lowest cost per milligram, because there is no sequence and no milligram figure. It is the listing with the strongest identity documentation among suppliers who pass verification, priced honestly per unit.",
    "That reframing is the whole point of this page. A ranking that treats HMG like a peptide — weighting headline purity percentages and cost per mg — is ranking on numbers that do not exist for this product class. The ranking below is built on the criteria that do exist: lot-specific identity, verification state, TrustScore and price per 1,000 IU.",
    "The table below is generated from the live price data in our tracker. It lists every HMG listing from the UK suppliers ViralPeps tracks, with the pack label, headline price, per 1,000 IU rate, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "Everything on this page is research-use-only and nothing here is medical advice. For the full market picture, start at the [**HMG UK price comparison hub →**](/compounds/hmg).",
  ],
  sections: [
    {
      title: "The Criteria That Actually Decide It",
      body:
        "A defensible \"best HMG\" ranking is built from four criteria, in this order of weight, because each one is a prerequisite for the next.\n\nFirst, identity. The best listing is the one whose supplier can prove what the material is: a lot-specific Certificate of Analysis stating FSH and LH activity and the assay used, with a batch number that matches the vial label. This is the criterion that does almost all the work, because a biological with no molecular weight has no other way to prove identity.\n\nSecond, verification. The supplier is a traceable UK business, operates the domain they sell from, and carries research-use-only labelling with no human-use claims. Our TrustScore is the machine-readable version of this — a supplier who installs a badge on their own domain is proving they operate it.\n\nThird, unit honesty. The supplier states the pack in international units — the 75 IU standard — and does not substitute a mass figure. A listing that states a mass for HMG is stating the wrong unit and fails here.\n\nFourth, price per 1,000 IU. Only after identity, verification and unit honesty are satisfied does price enter the ranking, because a cheap listing that fails the first three is not a cheaper version of the same thing.",
      list: [
        "Identity — lot-specific COA stating FSH/LH activity and assay.",
        "Verification — traceable UK business, operating domain, RUO labelling.",
        "Unit honesty — dosed in IU, never a mass figure.",
        "Price per 1,000 IU — ranked only after the first three pass.",
      ],
    },
    {
      title: "Criteria That Look Decisive and Are Not",
      body:
        "Half the signals buyers reach for when ranking HMG are decisive for peptides and meaningless here, and separating the two is most of the battle.\n\nThe first false signal is the purity percentage. For a peptide, a 99% purity claim computed against a known sequence is meaningful. For a urinary extract, a single HPLC percentage does not establish that a gonadotropin is present, because there is no single molecular identity to compute purity against. A listing advertising \"99% pure HMG\" is advertising a peptide concept applied to a biological.\n\nThe second false signal is the molecular weight. HMG has none in the peptide sense; a supplier quoting a precise figure in daltons is advertising a property the product does not have, and a vendor CAS number such as 61489-71-2 is unverified and pairs with a nonsense formula. These are not ranking criteria — they are disqualifiers.\n\nThe third false signal is cost per milligram, which is arithmetic on a denominator that does not exist. The honest rate is price per stated unit, and that is what the leaderboard uses.\n\nThe fourth false signal is the brand name. A listing invoking a licensed brand such as Menopur is borrowing an identity it is not entitled to use for a research reagent, and a brand premium on a reagent listing is not evidence of quality — it is usually the opposite.",
    },
    {
      title: "Why Identity Is the Deciding Factor for HMG",
      body:
        "Identity is the deciding factor for HMG because it is the only criterion the product can actually satisfy, and the reason is structural. A defined peptide can be verified by matching its molecular weight to its sequence; a defined chemical can be verified by CAS and formula. HMG can be verified by neither, because it is a mixture of gonadotropins with variable glycosylation, standardised by bioassay.\n\nEverything that makes a comparison possible therefore lives in the documentation. The unit figure is a statement about a specific characterised lot, not a property you can re-derive. The FSH and LH activity is established by immunoassay against reference standards, not by weighing. And the composition — which a 2024 analysis showed has its LH activity largely carried by hCG rather than luteinising hormone, and earlier work measured as a substantial fraction of non-gonadotropin urinary protein — is only knowable from the certificate, not from the label.\n\nThis is why the ranking order is identity first. A listing with a lot-specific COA that states the assay is verifiably what it says it is; a listing without one is a label. There is no price at which an unverifiable label outranks a verifiable preparation, because the two are not in the same category. The [HMG supplier guide](/compound-guides/hmg-supplier-uk) walks through the certificate line by line.",
    },
    {
      title: "The LH-Is-hCG Finding and What It Changes",
      body:
        "One recent finding quietly changes how a buyer should think about HMG, and it is worth naming because almost no listing mentions it. A 2024 composition analysis of highly purified HMG showed that the luteinising hormone activity in urinary menotropin is largely carried by human chorionic gonadotropin, not by luteinising hormone itself.\n\nWhat this changes is not the legitimacy of the product — it is the honesty of the description. A listing that describes HMG as a clean \"FSH + LH\" mixture is rounding off a real compositional fact: the LH activity is mostly hCG, and the two hormones differ in receptor binding kinetics and half-life. For anyone designing a gonadotropin assay, that distinction is material, because hCG occupies the LH receptor longer than LH does.\n\nIt also sharpens the identity question. A supplier who can tell you how their certificate distinguishes FSH activity from the LH signal — and ideally how much of that LH signal is hCG — is a supplier who has characterised their material. A supplier who cannot is selling the abbreviation, not the preparation. In a ranking this becomes a discriminator: the best listing is the one whose documentation acknowledges the composition rather than the one whose marketing rounds it away.\n\nThe deeper background — why a urinary extract has no CAS, no formula and no molecular weight, and what that means for every claim a listing can legally make — is in the [**HMG research guide**](/research/hmg-research-guide).",
    },
    {
      title: "Ranking It — The Leaderboard and the Final Call",
      body:
        "The leaderboard below applies the criteria in order, and the output is honest because it refuses to rank what cannot be ranked. Rows without a stated unit figure, out of stock, or unverified appear in the full table but sit outside the ranked leaderboard, because an unknown cannot be ranked against a known.\n\nThe final call is then a short procedure. Confirm the top listing's Certificate of Analysis is lot-specific and states the FSH and LH assay. Confirm the supplier is a traceable UK business with a contact route that replies. Confirm the pack is stated in units, not mass. If all three hold, the top of the leaderboard is genuinely the best HMG listing on the UK market we track, and the price per 1,000 IU it shows is the honest rate to compare against any alternative.\n\nIf the top listing fails any of those, move to the next row rather than reaching for a cheaper number elsewhere — in a market this small the spread is narrow, and the difference between the best and the rest is documentation, not price. Start at the [**HMG UK price comparison hub →**](/compounds/hmg) for the full picture.",
    },
  ],
  faq: [
    {
      question: "Is HMG actually a peptide?",
      answer:
        "No. HMG is a urinary extract containing FSH and LH activity — glycoproteins, not peptides — standardised by biological activity in international units. It has no sequence, no molecular weight, no CAS number and no chemical formula in the peptide sense, which is why the ranking criteria for it are identity and verification rather than purity and cost per milligram.",
    },
    {
      question: "What makes one HMG listing better than another?",
      answer:
        "Identity documentation first: a lot-specific Certificate of Analysis stating FSH and LH activity and the assay used, with a batch number matching the vial. Then verification state, unit honesty and, only last, price per 1,000 IU. A cheaper listing that fails the first three is not a better listing — it is a different category.",
    },
    {
      question: "Why is the LH activity in HMG mostly hCG?",
      answer:
        "A 2024 composition analysis of highly purified urinary HMG found that its luteinising hormone activity is largely carried by hCG rather than LH. The two hormones bind the same receptor but differ in kinetics and half-life, which matters to anyone designing a gonadotropin assay.",
    },
    {
      question: "Should I trust a 99% purity claim on an HMG listing?",
      answer:
        "Treat it with suspicion. A single HPLC purity percentage is a peptide concept and does not establish that a gonadotropin extract is present. The meaningful evidence for HMG is activity-based identity — FSH and LH by immunoassay — tied to a specific batch, not a headline percentage.",
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
        "Corsan & Kemmann, Fertil Steril 1991 — menotropins in ovulatory infertility (review)",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
    },
    {
      label: "HMG Research Guide — no CAS, no formula, no MW (ViralPeps)",
      url: "/research/hmg-research-guide",
    },
  ],
  tableMode: "trust",
  tableHeading: "Best HMG Peptide — Ranked by Trust and Identity",
  rowLimit: 12,
};
