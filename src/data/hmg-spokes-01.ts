/**
 * HMG silo spoke 1 of 6 — where to buy HMG UK.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "where-to-buy-hmg-uk",
  title: "Where to Buy HMG UK: Verified Suppliers 2026",
  description:
    "Where to buy HMG UK — compare live IU prices from every UK research supplier we track, then check the COA, batch number and FSH/LH identity before ordering.",
  h1: "Where to Buy HMG UK",
  focusKeyword: "where to buy hmg uk",
  intro: [
    "If you are searching for where to buy HMG UK, the first thing worth knowing is that the term HMG does not name a single molecule the way a peptide name does. HMG — human menopausal gonadotropin, also called menotropin — is a purified urinary extract containing follicle-stimulating hormone (FSH) and luteinising hormone (LH) activity, standardised by bioassay rather than by mass. It is a prescription-only medicine in the United Kingdom when supplied for human use, dispensed through fertility clinics and hospital pharmacies against a prescription, and it is not a general-sale item. The vials on this page are research reagents sold for laboratory use, and that is a different product category from the medicine with the same abbreviation.",
    "That distinction shapes the market rather than decorating it. Because the licensed article cannot be sold openly, the UK listings that turn up for this search fall into three groups: genuine research-reagent suppliers selling lyophilised menotropin with a Certificate of Analysis, fertility providers and online pharmacies offering the licensed product against a private prescription, and a long tail of sellers borrowing the medicine's clinical language while carrying none of its documentation. Only the first group belongs on a price comparison, and the third group is why this page shows verification state next to every row.",
    "The table below is generated from the live price data in our tracker, not transcribed by hand. It lists every HMG listing from the UK suppliers ViralPeps tracks, with the pack label as the vendor states it, the headline price, the rate per 1,000 IU wherever the pack states a unit figure, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "One structural warning before you scroll, because it affects how you should read every number below. HMG is a biological mixture, not a defined chemical, and it is dosed in international units rather than milligrams. There is no milligram figure to divide a price by, and there is no molecular weight to quote. Any column headed \"price per mg\" for HMG is arithmetic performed on a number that does not exist, and a supplier who advertises a precise molecular weight in daltons as a purity claim is advertising something the preparation does not have. Everything on this page is research-use-only and nothing here is medical advice. If you want the full price picture before choosing a supplier, start at the [**HMG UK price comparison hub →**](/compounds/hmg).",
  ],
  sections: [
    {
      title: "Where to Buy HMG UK — Three Markets Behind One Abbreviation",
      body:
        "The phrase \"where to buy HMG UK\" resolves to three genuinely separate markets, and the single most common buying mistake is to compare prices across them. They are not comparable, because they are not the same article.\n\nThe first market is the licensed medicine. Menotropin is authorised in the UK as a prescription-only medicine used within assisted reproductive treatment, dispensed by clinics and pharmacies against a prescription. Its price is set by pharmaceutical manufacturers and distributors, it is dispensed in a clinical setting, and it is subject to the same supply-chain rules as any other POM. A consumer cannot join this market by adding a vial to a basket, and any site that offers a licensed-brand menotropin vial with no consultation and no prescription step is not in this market either, whatever it claims.\n\nThe second market is research reagents. This is the market our tables cover. Suppliers sell lyophilised menotropin described as a laboratory reference material, typically in 75 IU vials, with research-use-only labelling and — at the good end — a batch-linked Certificate of Analysis. The article is real, the documentation is real, and the intended use is stated as laboratory work rather than human administration.\n\nThe third market is the unregulated tail: sellers marketing HMG for bodybuilding, fertility self-treatment or hormone replacement outside any clinical framework, often with no UK business identity, no batch documentation and payment taken through channels that offer no recourse. This is the group that makes the search results confusing, and it is the group our verification column exists to separate out.\n\nFor research purposes the practical consequence is simple: compare reagents with reagents, and treat any listing that markets itself as the medicine as outside the comparison entirely.",
      list: [
        "Licensed medicine — POM, clinic-dispensed, prescription required, not purchasable from a research supplier and not in our tables.",
        "Research reagent — lyophilised menotropin sold as laboratory reference material with RUO labelling; this is what our price tables cover.",
        "Unregulated tail — human-use and bodybuilding marketing, no batch documentation, no verifiable UK business identity; excluded wherever we can identify it.",
      ],
    },
    {
      title: "What a UK HMG Listing Should State, and Usually Does Not",
      body:
        "A listing for a biological extract is a different document from a listing for a small peptide, and the differences are the checks worth running. For a synthesised peptide you can sanity-check the stated molecular weight against the sequence. For HMG you cannot, because the active substance is a mixture of glycoproteins with variable glycosylation, so the burden shifts entirely onto the documentation.\n\nStart with the unit. HMG is quantified in international units by biological activity, not by mass. A listing that states only a mass — \"5mg vial\" — while calling the contents HMG is telling you it has not characterised what it is selling, because the two units are not interchangeable. Our table records the unit figure the vendor states and shows an explicit gap where none is given, rather than inventing one.\n\nNext, the Certificate of Analysis. For HMG the meaningful certificate reports identity by a method capable of confirming both gonadotropin activities — typically immunoassay for FSH and LH alongside an HPLC trace — and references a specific batch number that matches the label on the vial you receive. A certificate that reports a single purity percentage with no identity confirmation is a certificate for a peptide, reused for a urinary extract.\n\nThen the identity itself, which is subtler than most sellers admit. Menotropin is not a single protein: it is a preparation whose FSH and LH activity come from a family of related glycoproteins, and a 2024 compositional analysis showed the LH activity in urinary HMG is largely human chorionic gonadotropin (hCG) rather than luteinising hormone itself. A supplier who claims to know the exact molecular composition of their vial is making a claim the product class cannot support.\n\nFinally, storage and presentation. Lyophilised gonadotropins are proteins and are less forgiving than a small peptide: they need proper handling and a described reconstitution window. A listing that says nothing about storage has not thought about the molecule.",
      table: {
        header: ["What the listing states", "What it should state", "Why it matters for HMG"],
        rows: [
          ["Pack size", "International units (75 IU standard)", "HMG is dosed in IU by bioassay; a mass figure cannot substitute"],
          ["Purity", "FSH and LH activity plus identity confirmation", "A single HPLC percentage does not show a gonadotropin extract is present"],
          ["Batch", "A batch number that matches the vial label and the COA", "A generic COA cannot show the tested material is the shipped material"],
          ["Composition", "FSH/LH ratio or an explicit statement of the assay used", "The LH activity is largely hCG, not LH — worth knowing"],
          ["Storage", "Lyophilised storage conditions and reconstitution window", "Gonadotropins are proteins and degrade faster than small peptides"],
        ],
      },
    },
    {
      title: "The IU Trap — Why Per-Milligram Comparisons for HMG Are Broken",
      body:
        "Every other compound on this site is compared on cost per milligram, because every other compound is a defined chemical mass. HMG is not, and the consequence is that a large share of the price comparisons published for it are computing a ratio against a denominator that does not exist.\n\nThe specific activity of a menotropin preparation — how many international units of FSH and LH activity there are per milligram of urinary protein — varies with the batch and the bioassay used to standardise it. The same mass of two different lots can carry different unit activities, and the figure is established per batch against an international standard rather than derived from a formula. So \"price per mg of HMG\" is not a constant that can be compared across suppliers. It is an artefact of whichever conversion the author assumed.\n\nWhat can be compared is the price per stated unit. A 75 IU vial at £X and a 150 IU vial at £Y are directly comparable once reduced to cost per 1,000 IU, because the unit is the vendor's own stated unit of the same material. That is exactly what our per-unit column does. Where a vendor states no unit at all, the row still appears in the full table — it is a real listing — but it sits outside the ranked leaderboard, because an unknown cannot be ranked against a known.\n\nThe second half of the trap is the pen. A pre-filled pen is a device as well as a material: the price reflects assembly, the fixed concentration the device is built around, and the fact that a pen is delivered ready to use rather than as a powder requiring reconstitution. Comparing a pen's price per unit directly against a lyophilised vial's is possible but misleading, because you are not buying the same article. Our table flags pens separately so the comparison stays honest.",
    },
    {
      title: "Checking a UK Supplier Before You Order",
      body:
        "Once you have a shortlist, the verification work is the same regardless of compound, with two HMG-specific additions. The generic checks first: a Certificate of Analysis from a named laboratory referencing a specific batch; a contact route that replies before you have paid; research-use-only language throughout, with no human-use or bodybuilding claims; and a business identity you can trace to a registered company. Our TrustScore badge is the machine-readable version of the last of these — a supplier who installs it on their own domain is proving they operate that domain, which is the single cheapest way to filter out throwaway storefronts.\n\nThe HMG-specific additions both concern identity. Ask how the supplier's certificate confirms FSH and LH activity, and whether it states the assay used. A supplier selling genuine menotropin should be able to say how the two gonadotropin activities were measured, because that is what defines the preparation. A supplier who cannot answer has not seen their own certificate.\n\nThe second is the lot question. Because HMG is standardised by bioassay, two vials of equal mass do not have equal potency unless they are from the same characterised lot. Ask whether the certificate is lot-specific, and whether the batch number on the certificate matches the batch number on the vial. A generic certificate reused across every listing is the single most common red flag in this category.\n\nFinally, treat the price as the last variable rather than the first. In a market with a handful of listings the spread is narrow, and the difference between the cheapest and the safest is usually small in absolute terms. Buy the cheapest listing among suppliers who pass verification, not the cheapest listing overall. The [HMG supplier guide](/compound-guides/hmg-supplier-uk) walks through the full checklist.",
    },
    {
      title: "Naming and Variants You Will Meet in UK Listings",
      body:
        "HMG travels under a small but confusing set of labels, and knowing them prevents both false duplicates and false bargains. The common forms are HMG, hMG, human menopausal gonadotropin, menotropin, menotrophin, and the unit-qualified HMG 75iu or menotropin 75 IU where the unit is part of the product name. The first group are all the same preparation described at different levels of formality. The last group is the same preparation with its standard vial size stated.\n\nA second distinction worth knowing is urinary-derived versus recombinant. Urinary menotropin is extracted from the urine of postmenopausal women and has been the clinical standard for decades; highly purified and recombinant FSH products exist and differ in their glycoform profile, which changes how long the hormone occupies its receptor. Both contain FSH activity, they are not identical preparations, and a supplier who states which class they sell is a supplier who knows their supply chain.\n\nThen there is the abbreviation collision, which is more dangerous here than for almost any other compound. \"HMG\" also stands for Her Majesty's Government in UK administrative writing, for HMG-CoA reductase in lipid biochemistry, for High Mobility Group proteins in molecular biology, and — in gaming — for a heavy machine gun. A price search for \"HMG\" that does not specify gonadotropin will surface all of these. The unit-qualified form \"HMG 75iu\" is the cleanest disambiguator, and it is the form our tables use.\n\nFinally, the FSH/LH question from the other direction. Menotropin is sometimes sold as \"FSH + LH\", and the ratio matters to anyone designing a gonadotropin assay. The practical rule for the table below: every row is a real listing from a supplier we track, but the pack labels are the vendors' own. Read the label column before the price column — in this market it is the label that tells you whether you are comparing like with like.",
      table: {
        header: ["Label you will see", "What it actually means", "Comparable on price per unit?"],
        rows: [
          ["HMG / hMG / menotropin / menotrophin", "The same urinary gonadotropin extract, formally or informally named", "Yes"],
          ["HMG 75iu / menotropin 75 IU", "The same preparation with the standard vial size stated", "Yes"],
          ["Menopur / Merional", "Licensed pharmaceutical brands, not research reagents", "No — different product category"],
          ["Recombinant FSH", "Cell-culture derived single hormone, not the urinary FSH+LH mixture", "No — different article"],
          ["FSH + LH", "The two activities menotropin supplies; check the ratio and assay", "Yes, but confirm the assay"],
        ],
      },
    },
  ],
  faq: [
    {
      question: "Can you buy HMG over the counter in the UK?",
      answer:
        "No. For human use menotropin is a prescription-only medicine in the UK and is dispensed by clinics and pharmacies against a prescription. The listings on this page are research reagents sold for laboratory use, which is a separate product category from the licensed medicine. Anything marketed as the medicine without a prescription step is not what it claims to be.",
    },
    {
      question: "Why does this page show a price per 1,000 IU instead of per mg?",
      answer:
        "Because HMG is a biological mixture standardised by bioassay, not by mass, and its specific activity varies lot-to-lot. A per-milligram figure for HMG is an artefact of an assumed conversion rather than a property of the material, so it cannot be compared across suppliers. Price per stated unit is the only comparison that survives.",
    },
    {
      question: "Is HMG the same thing as hCG?",
      answer:
        "No, but they are closely related. HMG supplies both FSH and LH activity, while hCG supplies LH-receptor activity alone — and a 2024 composition analysis showed the LH activity in urinary HMG is itself largely hCG rather than luteinising hormone. They are dosed in IU, they are both prescription-only medicines, and neither has a CAS number or molecular weight in the peptide sense.",
    },
    {
      question: "How do I spot a UK HMG listing that is really a research reagent?",
      answer:
        "It states the unit figure (75 IU standard), publishes a Certificate of Analysis referencing a specific batch and stating the FSH/LH assay used, describes storage conditions, and carries research-use-only labelling throughout with no human-use or bodybuilding claims. It also avoids licensed brand names such as Menopur or Merional, which it has no right to use for a research reagent.",
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
      label:
        "Human menopausal gonadotropin — BNF status as a prescription-only medicine in the UK",
      url: "https://bnf.nice.org.uk/",
    },
  ],
  tableMode: "price",
  tableHeading: "HMG UK Research Suppliers — Live Prices",
  rowLimit: 12,
};
