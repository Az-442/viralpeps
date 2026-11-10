/**
 * HMG silo spoke 2 of 6 — cheapest HMG UK.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "cheapest-hmg-uk",
  title: "Cheapest HMG UK: Lowest Price Per 1,000 IU 2026",
  description:
    "Cheapest HMG UK — the lowest verified price per 1,000 IU from live UK supplier data, why headline price misleads and what a genuinely low price often hides.",
  h1: "Cheapest HMG UK",
  focusKeyword: "cheapest hmg uk",
  intro: [
    "If you are searching for the cheapest HMG UK, the honest answer is that headline price is the weakest possible way to compare these listings, because HMG is not sold in milligrams and there is no single number that captures what you are buying. HMG — human menopausal gonadotropin, or menotropin — is a urinary extract standardised by bioassay, dosed in international units, and sold in the UK almost exclusively as 75 IU vials. The cheapest listing is the one with the lowest price per stated unit among suppliers who actually pass verification, not the one with the smallest number on the page.",
    "That framing matters because the spread in this market is narrow and the stakes are lopsided. A handful of UK suppliers list HMG, the headline prices sit in a tight band, and the difference between the cheapest and the most expensive is small in absolute terms — which means the temptation to save a few pounds is exactly where the unregulated tail of the market does its work. A listing that undercuts everyone else is usually undercutting on documentation, not on margin.",
    "The table below is generated from the live price data in our tracker and ranked by the figure that actually survives scrutiny: price per 1,000 IU, computed from the unit figure each vendor states. It shows the pack label as the vendor states it, the headline price, the per-unit rate, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "Everything on this page is research-use-only and nothing here is medical advice. HMG is a prescription-only medicine in the UK for human use, and the vials below are research reagents. If you want the full picture before choosing, start at the [**HMG UK price comparison hub →**](/compounds/hmg).",
  ],
  sections: [
    {
      title: "Why Cost Per 1,000 IU Beats Headline Price",
      body:
        "On a peptide price page the natural instinct is to divide the headline price by the milligram content and rank on the result. That arithmetic is sound for a defined chemical of known mass. It is not sound for HMG, because HMG has no milligram content in the sense that matters — it is a mixture of gonadotropins standardised by biological activity, and its unit figure is established by bioassay rather than by weighing.\n\nThe only rate that survives comparison across suppliers is price per stated unit. A 75 IU vial at £36 and a 75 IU vial at £60 are directly comparable once reduced to cost per 1,000 IU, because the unit is the vendor's own stated unit of the same material. That is exactly what our per-unit column does, and it is why the leaderboard below ranks on per 1,000 IU rather than on headline price.\n\nThere is a second reason the per-unit figure matters, and it is specific to how these vials are sold. The standard HMG vial is 75 IU — a small, single-use quantity for a laboratory protocol. A pen product bundles the same material into a delivery device and charges for the device as well as the contents. Ranking on headline price would treat a 75 IU vial and a 75 IU pen as comparable when they are not: the pen's price reflects assembly, not more gonadotropin. The per-unit column flags pens separately so the comparison stays honest.",
    },
    {
      title: "What a Low HMG Price Usually Means",
      body:
        "A genuinely low price in this category usually means one of three things, and only one of them is good news.\n\nThe first possibility is a real price difference on the same article: a supplier with lower overhead, or a sale, or a bulk multi-vial listing that amortises the vial, stopper and testing cost across more units. This is the legitimate source of a low price, and it is the only one you want.\n\nThe second possibility is a kit priced to look cheap per vial while the fine print makes the comparison false. A multi-vial pack advertised at an attractive headline is only cheaper if the per-unit rate actually beats a single vial, which is not automatic — the rate is what the rate is, and the table computes it for you rather than letting the headline do the talking.\n\nThe third possibility is the one that matters most: a listing that undercuts the market because it is selling an under-documented product. Because HMG is standardised by bioassay, the documentation — a lot-specific Certificate of Analysis stating the FSH and LH activity and the assay used — is where the cost actually sits. A supplier who has not paid for that characterisation can price below everyone who has. The price looks like a bargain; what is actually happening is that the verification step is being charged back to you as risk.\n\nIn practice this is why the leaderboard is not a pure price sort. A listing that cannot state its unit figure, or has no lot-specific certificate, sits outside the ranked rows regardless of how low its number is. An unknown cannot be ranked against a known.",
      list: [
        "Legitimate discount — same article, lower overhead or a genuine sale; the only low price you want.",
        "Kit optics — a multi-vial headline that only looks cheap until the per-unit rate is computed.",
        "Undocumented undercut — no lot-specific COA or no stated unit; cheaper because the verification was skipped.",
      ],
    },
    {
      title: "The Pack Sizes You Will Actually See in the UK",
      body:
        "The HMG market in the UK is unusually uniform, which is both a relief and a trap. The relief is that almost every listing is a 75 IU vial, so the like-for-like comparison the rest of this site has to work for is largely handed to you. The trap is that the uniformity hides two genuinely different articles behind the same unit figure.\n\nThe first article is the lyophilised vial: a powder that requires reconstitution before use, shipped in a stoppered vial, priced for the material and the characterisation that comes with it. This is the default, and it is what most of the listings in our table are.\n\nThe second article is the pre-filled pen: the same material presented in a ready-to-use device. The pen costs more for the same unit content, and the premium is not a mark-up in the pejorative sense — it is the cost of a device that removes the reconstitution step. Whether that premium is worth it depends entirely on the protocol, not on the vendor. Our table keeps the two separate so you are comparing a vial to a vial and a pen to a pen.\n\nThere is a third form that turns up occasionally and should be treated with care: the unqualified mass listing. A vial described only as \"5mg\" or \"1mg\" while labelled HMG is stating a mass for a product that is not standardised by mass, which means either the vendor does not understand the article or the label is being reused from a peptide product line. Either way it cannot be compared on a per-unit basis with anything, and it belongs outside the leaderboard.",
      table: {
        header: ["Pack label", "What it is", "Compare on per-unit rate?"],
        rows: [
          ["75iu / 75 IU", "Standard lyophilised HMG vial", "Yes"],
          ["75iu pen", "Same material in a pre-filled delivery device", "Yes, but note the device premium"],
          ["150 IU", "Double-strength vial, rarer in research listings", "Yes"],
          ["5mg / 1mg", "Mass label for a bioassay-standardised product", "No — wrong unit"],
          ["75iu x N", "Multi-vial kit", "Yes — total units against total price"],
        ],
      },
    },
    {
      title: "Why Two Vials of Equal Mass Are Not Equal Potency",
      body:
        "This is the point that separates a defensible \"cheapest HMG UK\" answer from a naive one. In a market where the standard vial is 75 IU, most buyers assume that one 75 IU vial is the same as another 75 IU vial and that the only question is price. The assumption is wrong in a way that is specific to biological standardisation.\n\nMenotropin is not a synthesised sequence with a fixed mass. It is an extract, and its FSH and LH activity is established per lot by comparing the material against an international reference standard in a bioassay. Two lots that weigh the same can carry different unit activities, because the assay measures biological effect, not quantity of matter. The consequence is that the unit figure on the label is a statement about a specific characterised lot — and a supplier who cannot tie their label to a lot-specific certificate is selling a unit figure they have not actually established.\n\nThis is why a lot-specific Certificate of Analysis is the single most important document on an HMG listing, ahead of the price. It is also why the compositional question matters: a 2024 analysis showed the LH activity in urinary HMG is largely hCG rather than luteinising hormone, and earlier work showed a substantial fraction of the material is non-gonadotropin urinary protein. None of this makes the product illegitimate — it makes it a biological, and biologicals are compared on activity, not on mass.\n\nThe practical rule follows directly: rank on price per stated unit, but only among listings whose unit figure is backed by a lot-specific certificate. A cheap vial with no certificate is not a cheaper version of the same thing; it is a different thing with the risk priced back in.",
    },
    {
      title: "How to Lock In the Lowest Honest Price",
      body:
        "Once you accept that the unit figure is the only real comparison and that documentation is where the cost sits, finding the genuinely cheapest HMG UK becomes a short, repeatable procedure rather than a hunt for the smallest number.\n\nFirst, rank the listings on price per 1,000 IU using the leaderboard below. Second, discard any listing that cannot state a unit figure or that advertises a mass instead. Third, discard any listing without a lot-specific Certificate of Analysis stating the FSH and LH activity and the assay used. Fourth, discard any listing that markets itself for human use, bodybuilding or fertility self-treatment — those are not research reagents and they are not comparable. Fifth, confirm the supplier is a verifiable UK business with a contact route that replies before you pay.\n\nWhatever survives those five steps is your shortlist, and within it the cheapest is genuinely the cheapest. In a market this small the shortlist is usually one or two suppliers, and the spread between them is small — which is itself the point. The [HMG supplier guide](/compound-guides/hmg-supplier-uk) details each check, and the [**HMG price comparison hub →**](/compounds/hmg) shows the full market rather than the ranked slice.",
    },
  ],
  faq: [
    {
      question: "What is the cheapest HMG in the UK?",
      answer:
        "The cheapest defensible answer is the listing with the lowest price per 1,000 IU among suppliers who state a unit figure and publish a lot-specific Certificate of Analysis. The leaderboard on this page ranks live data on that basis. A cheaper headline price with no unit figure or no certificate is not a cheaper version of the same thing — it is an under-documented product with the risk priced back in.",
    },
    {
      question: "Is a 75 IU pen or a 75 IU vial better value?",
      answer:
        "On price per unit the vial is cheaper, because the pen's price includes a delivery device and assembly. Whether the pen is worth the premium depends on the protocol — it removes the reconstitution step. They are different articles and should not be compared head-to-head on price alone.",
    },
    {
      question: "Why can't I compare HMG prices per milligram?",
      answer:
        "Because HMG is a urinary extract standardised by biological activity, not by mass, and it has no molecular weight in the peptide sense. Its unit figure is set per lot by bioassay against a reference standard, so a per-milligram rate is an artefact of an assumed conversion and cannot be compared across suppliers.",
    },
    {
      question: "Does a low price mean lower purity?",
      answer:
        "Not automatically — a low price can reflect lower overhead or a genuine sale. But because documentation is where the real cost sits in this category, a price well below the market usually reflects skipped characterisation rather than lower purity. Check the lot-specific certificate before treating a low price as a bargain.",
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
      label: "HMG UK Price Per IU — ViralPeps research guide on unit pricing",
      url: "/research/hmg-uk-price-guide",
    },
  ],
  tableMode: "perMg",
  tableHeading: "Cheapest HMG UK — Ranked by Price Per 1,000 IU",
  rowLimit: 12,
};
