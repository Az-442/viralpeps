/**
 * hCG silo spoke 2 of 6 — cheapest hCG UK.
 * Prices are NEVER hardcoded — rendered live from hcg-silo.ts.
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "cheapest-hcg-uk",
  title: "Cheapest hCG UK: Lowest Price Per 1,000 IU 2026",
  description:
    "Cheapest hCG UK — the lowest verified price per 1,000 IU from UK research suppliers, sorted live, plus the four traps that make a cheap hCG listing misleading.",
  h1: "Cheapest hCG UK",
  focusKeyword: "cheapest hcg uk",
  intro: [
    "The cheapest hCG UK listing and the best-value hCG listing are rarely the same page, and in this market the gap is wider than for almost any other compound because hCG has no milligram figure to normalise against. A peptide can be reduced to a cost per milligram and compared cleanly across pack sizes. hCG cannot, so a naive price sort compares a 1,000 IU vial against a 10,000 IU kit and calls the smaller number cheaper — which it is, and which tells you nothing.",
    "This page ranks by cost per 1,000 IU instead, computed from the unit figure each supplier states on their own listing. Every result comes from the live price data in our tracker rather than a hand-written table, and rows whose listing states no unit at all are excluded from the ranked leaderboard rather than assigned a guessed quantity. They still appear in the full table on the [hCG price comparison page](/compound-guides/hcg-price-comparison-uk), because they are real listings — they simply cannot enter a ranking where an unknown would be compared against a known.",
    "There is a second reason to be careful with the word \"cheapest\" here, and it is not arithmetic. hCG is a prescription-only medicine in the UK when sold for human use, so the lowest-priced listings in the search results are frequently not research reagents at all but a mixture of unverified sellers, weight-loss marketing operations and grey-market stock from outside the UK. A price that undercuts the research market by half is usually a statement about what category of product is being sold, not about how efficiently it is being sold.",
    "The practical method is to take the two or three lowest cost-per-unit listings that pass verification, then read their documentation before ordering. Cheap material with a batch-linked Certificate of Analysis is cheap. Cheap material without one is a discount on the only thing you were buying. Use the [hCG UK supplier guide](/compound-guides/hcg-supplier-uk) for the verification checks, and treat the numbers below as the starting point rather than the decision.",
  ],
  sections: [
    {
      title: "Why Cost Per 1,000 IU Beats Headline Price",
      body:
        "A headline price tells you what the basket will charge you. It tells you nothing about what arrives, and hCG pack sizes differ by a factor of ten between the smallest and largest vials on the UK market. Sorting by headline price therefore sorts by pack size, which is the exact opposite of what a buyer wants.\n\nThe arithmetic is straightforward once both numbers are real. If a 5,000 IU vial costs £30 and a 10,000 IU vial costs £45, the larger vial is cheaper per unit at £4.50 per 1,000 IU against £6.00, despite the bigger price tag. That is the entire function of the per-unit column, and it is why our table derives it from the vendor's own stated pack label rather than from a summary field that a scrape might have filled in wrongly.\n\nThere is one honest complication, and it is specific to this compound. Because hCG is quantified by biological activity rather than mass, you cannot convert between IU and milligrams with a fixed constant — the specific activity of a preparation varies with how it was made and how it was standardised. So a per-unit comparison is valid only between listings that both state units. A listing stating \"5mg\" while calling the contents hCG is not stating a comparable quantity at all, and we do not convert it.\n\nThe rows that frustrate the comparison most are the ones with no unit figure whatsoever. In the UK hCG market that is a meaningful share of listings, and they are not all careless: some are pens where the quantity is expressed per device, and some simply never state a figure. Either way they cannot enter a cost-per-unit ranking honestly, so they are shown explicitly rather than silently assigned a plausible number. A table that guesses is worse than a table that is short.",
      table: {
        header: ["Pack format", "Typical position in the market", "Comparable per unit?"],
        rows: [
          ["10,000 IU lyophilised vial", "Usually the lowest cost per 1,000 IU", "Yes"],
          ["5,000 IU lyophilised vial", "The default article; mid-range per unit", "Yes"],
          ["1,000 IU / 2,000 IU vial", "Higher cost per unit; same vial overhead for less material", "Yes"],
          ["Multi-vial kit", "Lowest cost per unit where listed; larger commitment", "Yes (total IU)"],
          ["Pre-filled pen", "Fixed concentration; priced with device assembly", "Yes, but a different article"],
          ["No unit stated", "Cannot be ranked; shown in the full table only", "No"],
        ],
      },
    },
    {
      title: "What a Low hCG Price Usually Means",
      body:
        "There are four legitimate reasons a hCG listing can sit at the bottom of the market, one structural reason, and one illegitimate one. Distinguishing them is most of the buying decision.\n\nThe legitimate reasons are the same as in any reagent market. A larger pack spreads the fixed cost of one testing run across more material. A multi-vial kit concentrates that effect. A promotional price on a newly listed product is real but temporary and will not survive the next scrape. And a supplier with lower overheads — a single site, no paid support staff — can undercut without cutting the material. None of these implies a bad product, and a per-unit ranking is exactly the tool for spotting them.\n\nThe structural reason is specific to hCG and worth understanding: the distinction between urinary-derived and recombinant material. Urinary-derived hCG is extracted from a biological feedstock and has been the standard for decades; recombinant hCG is produced in cell culture. They have different cost structures, and a supplier selling one at a price characteristic of the other is either mislabelling or buying from an unusual route. Ask which it is.\n\nThe illegitimate reason is material with no batch-linked testing, or material tested once and sold indefinitely on the strength of a single certificate. Commissioning an identity confirmation and a purity run costs a fixed amount per batch regardless of batch size, so a supplier selling a handful of vials a month at the market floor cannot absorb that on every batch. When a price undercuts the research market widely, the question is not \"how is it so cheap\" but \"what was skipped\" — and for a glycoprotein the answer is usually the identity test, which is the one test that shows the vial contains hCG rather than a related glycoprotein.\n\nThe separate illegitimate reason in this market is category confusion: a listing priced well below the research market because it is not a research reagent. Weight-loss-marketing operations and grey-market imports frequently appear in the same results and at prices the reagent market cannot match, because they are selling a different product under the same name.",
    },
    {
      title: "The Pack Sizes You Will Actually See in the UK",
      body:
        "hCG pack sizes cluster around two figures with a thin tail around them, and knowing the pattern makes a price table readable at a glance.\n\nThe 5,000 IU vial is the most common single figure on the UK market and functions as the default article. It is the size most suppliers stock, the size most likely to carry a certificate, and the size against which everything else should be judged. The 10,000 IU vial is the value end: same glass, same stopper, same label, same testing run, twice the material, so it almost always wins on cost per unit.\n\nBelow those, 1,000 IU and 2,000 IU vials appear occasionally and cost more per unit, which is expected rather than a red flag — a small vial carries the same overhead as a large one for a fraction of the material. These sizes exist for work that needs a small quantity, and paying a premium per unit for that is a rational choice.\n\nPens sit outside the comparison by nature. A pre-filled hCG pen is a device with a fixed concentration, priced partly for the assembly and partly for the material, and delivered ready to use rather than as a powder requiring reconstitution. If your work needs a defined quantity of lyophilised powder, compare vials with vials and kits with kits, and leave the pens out of the ranking rather than forcing them into a per-unit figure that flatters them.\n\nFinally, note that the label is the vendor's own text. Some write \"5000IU\", some \"5000 iu\", some \"10,000 IU\", some put the unit in the product title and the pack field says something else. Our table normalises the arithmetic but preserves the vendor's wording in the label column, because when two rows disagree it is the label you need to read.",
    },
    {
      title: "Cheapest Is Not the Same as Safest to Buy From",
      body:
        "Once you have the per-unit ranking, the next question is whether the cheapest row is a supplier you would order from, and that is a separate test with a separate answer.\n\nThe checks that matter, in order. A Certificate of Analysis from a named laboratory that references the specific batch on the vial, and that confirms identity against the beta subunit rather than reporting a bare purity percentage. A contact route that replies before you have paid. Research-use-only language throughout, with no weight-loss or human-use claims anywhere. A UK business identity you can trace, which is what the TrustScore badge verifies: a supplier who installs it on their own domain is proving they operate that domain.\n\nFor hCG there is one further check that a peptide buyer does not need to make, and it is the storage question. A glycoprotein is less robust than a small synthetic peptide. Lyophilised material should arrive cold or have been shipped under conditions the supplier can describe, and reconstituted material has a short usable window. A supplier who warehouses at ambient temperature is a supplier whose certificate may have been accurate on the day of testing and less informative by the time you open the vial.\n\nThis is where the cheapest listing usually loses. A per-unit saving of a few percent, set against a supplier who cannot produce a batch-linked certificate or describe their cold chain, is not a saving; it is a discount on the assurance. Our recommendation is consistent across every compound on this site and matters more here than anywhere: take the cheapest listing among suppliers who pass verification, not the cheapest listing overall.",
    },
  ],
  faq: [
    {
      question: "What is the cheapest hCG per 1,000 IU in the UK?",
      answer:
        "The leaderboard on this page is computed from live supplier prices each time it renders, so the cheapest figure changes as listings are updated. The pattern is stable: 10,000 IU vials and multi-vial kits beat smaller vials on cost per unit, because the per-vial overhead is amortised across more material.",
    },
    {
      question: "Why is hCG sold so much cheaper by some UK suppliers?",
      answer:
        "Legitimate reasons are larger packs, kits, temporary promotions and leaner vendor overheads. The illegitimate reasons are skipped per-batch testing, which has a fixed cost regardless of batch size, and category confusion — some of the cheapest results are not research reagents at all but human-use marketing or grey-market stock.",
    },
    {
      question: "Should I buy a 5,000 IU or a 10,000 IU hCG vial?",
      answer:
        "On pure arithmetic the 10,000 IU vial wins on cost per unit nearly every time, because the vial, stopper, label and testing overhead is the same for both. But hCG is a protein with a finite stability window, so a larger vial is only better value if your work consumes it inside that window.",
    },
    {
      question: "Does a low price per IU mean the hCG is low purity?",
      answer:
        "Not necessarily, and the two are not the same measurement. Purity is established by the batch certificate; price per unit reflects pack size and overheads as much as material quality. A cheap listing with a batch-linked identity certificate is cheap material; a cheap listing without one is a discount on documentation.",
    },
  ],
  sources: [
    {
      label:
        "UniProt P01233 — Choriogonadotropin subunit beta, human; the subunit that confers LH/CG receptor specificity",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label:
        "Chorionic Gonadotropin (Human) — BNF monograph; prescription-only status in the UK",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
    {
      label:
        "WHO International Standard for chorionic gonadotropin — unit definition and standardisation basis for IU labelling",
      url: "https://www.nibsc.org/products/brm_product_catalogue/cynomolgus.aspx",
    },
  ],
  tableMode: "perMg",
  tableHeading: "Cheapest hCG UK — Live Ranking by Cost Per 1,000 IU",
  rowLimit: 12,
};
