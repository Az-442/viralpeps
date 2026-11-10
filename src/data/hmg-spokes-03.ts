/**
 * HMG silo spoke 3 of 6 — HMG price comparison UK.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "hmg-price-comparison-uk",
  title: "HMG Price Comparison UK: Every Supplier, Live 2026",
  description:
    "HMG price comparison UK — every live UK listing side by side, ranked by price per 1,000 IU, with the FSH/LH identity problem inside the table clearly explained.",
  h1: "HMG Price Comparison UK",
  focusKeyword: "hmg price comparison uk",
  intro: [
    "This HMG price comparison UK page is built to do one thing a generic price list cannot: rank live listings on the figure that actually survives scrutiny, while making the identity problem inside the table explicit rather than hiding it. HMG — human menopausal gonadotropin, or menotropin — is a urinary gonadotropin extract dosed in international units, and it has no molecular weight, no CAS number and no chemical formula in the peptide sense. Any comparison that treats it like a defined peptide is comparing numbers that do not exist.",
    "The table below is generated from the live price data in our tracker, not transcribed by hand. It lists every HMG listing from the UK suppliers ViralPeps tracks, with the pack label as the vendor states it, the headline price, the rate per 1,000 IU wherever the pack states a unit figure, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "Two things make this comparison different from the peptide tables elsewhere on this site. First, the ranking unit is per 1,000 IU rather than per milligram, because HMG is standardised by bioassay. Second, a row can appear in the full table yet sit outside the ranked leaderboard if it cannot state a unit figure — an unknown cannot be ranked against a known. Everything on this page is research-use-only and nothing here is medical advice.",
    "If you want the shortest path to a decision, the [**HMG UK price comparison hub →**](/compounds/hmg) and the [cheapest HMG UK leaderboard](/compound-guides/cheapest-hmg-uk) split this same data two other ways.",
  ],
  sections: [
    {
      title: "How to Read This HMG Price Comparison",
      body:
        "Every column in the table exists because a specific mistake is common when comparing HMG prices, and the column is the fix for that mistake.\n\nThe pack label column is first for a reason. HMG is sold almost exclusively as 75 IU vials, but the label is the vendor's own — one writes \"75iu\", another \"75 IU\", another folds the unit into a product name, and a minority state a mass instead. Reading the label first is how you catch the mass-labelled listing that cannot be compared on a unit basis with anything.\n\nThe price column is the headline figure, and it is the least informative column on the page. The per 1,000 IU column is the ranked figure, computed from the unit each vendor states. The stock and verification columns are the gate: a row that is out of stock or unverified is shown but flagged, so a cheap listing does not slip through on a number alone.\n\nThe direct link column takes you to the supplier's own product page, which is where the Certificate of Analysis and batch information actually live. The table is a ranking, not a substitute for that document.",
      list: [
        "Pack label — the vendor's own wording; read it before the price.",
        "Price — the headline figure; least informative column on the page.",
        "Per 1,000 IU — the ranked figure, computed from the stated unit.",
        "Stock + verification — the gate that keeps an unverified bargain out of the leaderboard.",
      ],
    },
    {
      title: "What Explains the Spread in HMG Prices",
      body:
        "The first thing a price comparison reveals is that the spread in this market is narrow, and the narrowness is itself informative. Where a GLP-1 agonist spans a wide band because suppliers compete on scale, HMG spans a small band because the market is small and the product is standardised at a single dominant pack size. When the spread is narrow, the cheapest and the most expensive are close in absolute terms — which is exactly the condition under which buyers reach for the smallest number and under which the unregulated tail does its work.\n\nThe second thing it reveals is the pen premium. A pre-filled pen listing costs more than a lyophilised vial of the same unit content, and the difference is the cost of a delivery device and assembly, not of extra gonadotropin. A naive comparison treats that premium as a mark-up and calls the pen \"overpriced\"; a correct comparison treats it as a different article and keeps the two separate.\n\nThe third thing is the documentation cost. Because HMG is standardised by bioassay and the characterisation is lot-specific, a meaningful share of the price is the Certificate of Analysis, not the material. A supplier who prices below the band is usually pricing without that characterisation. The table cannot see the certificate — that is why the verification column points you to the supplier's page rather than pretending the number tells the whole story.",
    },
    {
      title: "The Identity Problem Inside a Price Table",
      body:
        "Every price comparison for HMG inherits a problem that peptide tables do not have: the article being compared is not a single defined molecule, and the abbreviation used to name it collides with three unrelated terms. A table that does not acknowledge this is doing arithmetic on a category error.\n\nThe molecule problem: menotropin is a mixture. Its FSH and LH activity come from a family of related glycoproteins, a 2024 compositional analysis showed the LH activity is largely hCG rather than luteinising hormone, and earlier work measured a substantial fraction of non-gonadotropin urinary protein. There is no molecular weight to quote, no CAS to cite, and no formula to sanity-check a sequence against. The comparison therefore cannot rest on chemical identity; it must rest on the vendor's stated unit figure and the lot-specific certificate behind it.\n\nThe abbreviation problem: \"HMG\" also denotes Her Majesty's Government, HMG-CoA reductase, High Mobility Group proteins and, in gaming, a heavy machine gun. A raw price search for \"HMG\" surfaces all of these. The disambiguator that works is the unit-qualified form — \"HMG 75iu\" — which is why this page and the wider silo use it.\n\nThe consequence for the table is a rule: rank on price per stated unit, but only among listings whose unit figure is backed by a lot-specific Certificate of Analysis stating the FSH and LH assay. Rows that cannot meet that bar appear in the full table as real listings, but outside the ranked leaderboard. An unknown cannot be ranked against a known.",
    },
    {
      title: "Urinary Versus Recombinant — A Split Worth Knowing",
      body:
        "A comparison that stops at price misses a distinction that changes what two listings actually contain. Urinary menotropin, the standard form, is extracted from the urine of postmenopausal women and supplies both FSH and LH activity together with the non-gonadotropin protein that co-purifies with them. Recombinant FSH is produced in cell culture and supplies a single hormone with a different, more uniform glycoform profile.\n\nThe difference is not academic for anyone using the material in an assay. Glycosylation determines how long a gonadotropin occupies its receptor, and urinary versus recombinant preparations can differ in receptor residency for that reason. A listing of recombinant FSH is a different article from a listing of urinary menotropin, and it should not be ranked against one on price per unit as if the two were interchangeable.\n\nA supplier who states which class they sell — urinary or recombinant, and for urinary, the FSH/LH ratio and the assay used — is a supplier who knows their supply chain. A supplier who cannot say is selling a label, not a characterised preparation. The practical rule is the same one running through this page: the label column is read before the price column.",
      table: {
        header: ["Property", "Urinary menotropin", "Recombinant FSH"],
        rows: [
          ["Source", "Extracted from postmenopausal urine", "Produced in cell culture"],
          ["Activity", "FSH + LH (LH largely hCG)", "FSH only"],
          ["Glycoforms", "Heterogeneous", "More uniform"],
          ["Standardisation", "IU by bioassay per lot", "IU by bioassay per lot"],
          ["Comparable?", "No — different articles", "No — different articles"],
        ],
      },
    },
    {
      title: "How to Turn This Comparison Into a Decision",
      body:
        "A price comparison is only useful if it ends in a decision, and the decision procedure for HMG is short because the market is small.\n\nFirst, read the label column and set aside any listing that states a mass instead of a unit, or states nothing at all. Second, rank the remainder on price per 1,000 IU. Third, gate on verification: discard anything out of stock, unverified, or marketed for human use. Fourth, for each survivor, open the supplier's own product page and confirm the Certificate of Analysis is lot-specific and states the FSH and LH assay. Fifth, buy the cheapest of the survivors — at that point the cheapest is genuinely the cheapest.\n\nTwo companion pages make this easier. The [HMG supplier guide](/compound-guides/hmg-supplier-uk) details the verification checks, and the [**HMG research guide**](/research/hmg-research-guide) explains why a urinary extract has no CAS, no formula and no molecular weight — the background that makes a comparison like this necessary in the first place.",
    },
  ],
  faq: [
    {
      question: "Why is HMG compared per 1,000 IU and not per mg?",
      answer:
        "Because HMG is a urinary extract standardised by biological activity rather than by mass, and it has no molecular weight in the peptide sense. Its unit figure is set per lot by bioassay, so a per-milligram rate is an artefact of an assumed conversion and cannot be compared across suppliers.",
    },
    {
      question: "What does the spread in UK HMG prices tell me?",
      answer:
        "That the market is small and standardised around a 75 IU vial, so the band is narrow. A listing far below the band usually reflects skipped characterisation rather than a bargain, and a listing far above it usually reflects a pen device or a brand premium rather than more gonadotropin.",
    },
    {
      question: "Is a 75 IU listing the same across all suppliers?",
      answer:
        "In unit terms yes — 75 IU is 75 IU — but the article behind it can differ: lyophilised vial versus pre-filled pen, and urinary menotropin versus recombinant FSH. Compare the label and the stated FSH/LH assay before treating two 75 IU listings as interchangeable.",
    },
    {
      question: "Why do some rows appear outside the ranked leaderboard?",
      answer:
        "Because they cannot state a unit figure, or they are out of stock or unverified. The full table lists every real listing we track, but only rows with a stated unit and a verifiable identity can be ranked on price per 1,000 IU. An unknown cannot be ranked against a known.",
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
  tableMode: "full",
  tableHeading: "HMG Price Comparison UK — All Live Listings",
  rowLimit: 0,
};
