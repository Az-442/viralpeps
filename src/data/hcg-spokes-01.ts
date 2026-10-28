/**
 * hCG silo spoke 1 of 6 — where to buy hCG UK.
 * Split across three files for maintainability; see ./hcg-spokes-spoke1.ts.
 * Prices are NEVER hardcoded — the page renders them live from hcg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "where-to-buy-hcg-uk",
  title: "Where to Buy hCG UK: Verified Suppliers 2026",
  description:
    "Where to buy hCG UK — compare live IU prices from every UK research supplier we track, then check the COA, subunit identity, batch and stock before ordering.",
  h1: "Where to Buy hCG UK",
  focusKeyword: "where to buy hcg uk",
  intro: [
    "If you are searching for where to buy hCG UK, the first thing worth knowing is that almost every listing you will find is selling something other than the pharmaceutical, and the legal position is less ambiguous than the storefronts imply. hCG — human chorionic gonadotropin — is a prescription-only medicine in the United Kingdom when sold for human use. It is a licensed product, it is supplied through pharmacies against a prescription, and it is not a general-sale item. The vials on this page are research reagents sold for laboratory use, and that is a different product category from the medicine with the same name.",
    "That distinction shapes the market rather than decorating it. Because the licensed article cannot be sold openly, the UK listings that turn up for this search are a mixture of three things: genuine research-reagent suppliers selling lyophilised hCG with a Certificate of Analysis, fertility clinics and online pharmacies selling the licensed product against a private prescription, and a long tail of sellers whose listings borrow the medicine's clinical language while carrying none of its documentation. Only the first group belongs on a price comparison, and the third group is why this page shows verification state next to every row.",
    "The table below is generated from the live price data in our tracker, not transcribed by hand. It lists every hCG and hCG-human-chorionic-gonadotropin listing from the UK suppliers ViralPeps tracks, with the pack label as the vendor states it, the headline price, the rate per 1,000 IU wherever the pack states a unit figure, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "One structural warning before you scroll, because it affects how you should read every number below. hCG is a glycoprotein hormone, not a peptide, and it is dosed in international units rather than milligrams. There is no milligram figure to divide a price by. Any column headed \"price per mg\" for hCG is arithmetic performed on a number that does not exist, and a supplier who advertises a precise molecular weight in daltons as a purity claim is advertising something the molecule does not have. Everything on this page is research-use-only and nothing here is medical advice. If you want the full price picture before choosing a supplier, start at the [**hCG UK price comparison hub →**](/compounds/hcg).",
  ],
  sections: [
    {
      title: "Where to Buy hCG UK — The Three Different Markets Behind One Search",
      body:
        "The phrase \"where to buy hCG UK\" resolves to three genuinely separate markets, and the single most common buying mistake is to compare prices across them. They are not comparable, because they are not the same article.\n\nThe first market is the licensed medicine. hCG is authorised in the UK as a prescription-only medicine for specific indications, dispensed by pharmacies against a private or NHS prescription. Its price is set by pharmaceutical manufacturers and distributors, it is dispensed in a pharmacy, and it is subject to the same supply-chain rules as any other POM. A consumer cannot join this market by adding a vial to a basket. If a site offers a licensed-brand hCG vial with no consultation and no prescription step, that site is not in this market either, whatever it claims.\n\nThe second market is research reagents. This is the market our tables cover. Suppliers sell lyophilised hCG described as a laboratory reference material, typically in 1,000 IU to 10,000 IU vials, with research-use-only labelling and — at the good end — a batch-linked Certificate of Analysis. The article is real, the documentation is real, and the intended use is stated as laboratory work rather than human administration.\n\nThe third market is the unregulated tail: sellers marketing hCG explicitly for weight loss, for bodybuilding, or as a substitute for a prescription, often with no UK business identity, no batch documentation and payment taken through channels that offer no recourse. This is the group that makes the search results confusing, and it is the group our verification column exists to separate out.\n\nFor research purposes the practical consequence is simple: compare reagents with reagents, and treat any listing that markets itself as the medicine as outside the comparison entirely.",
      list: [
        "Licensed medicine — POM, pharmacy-dispensed, prescription required, not purchasable from a research supplier and not in our tables.",
        "Research reagent — lyophilised hCG sold as laboratory reference material with RUO labelling; this is what our price tables cover.",
        "Unregulated tail — human-use and weight-loss marketing, no batch documentation, no verifiable UK business identity; excluded wherever we can identify it.",
      ],
    },
    {
      title: "What a UK hCG Listing Should State, and Usually Does Not",
      body:
        "A listing for a glycoprotein is a different document from a listing for a small peptide, and the differences are the checks worth running. For a synthesised peptide you can sanity-check the stated molecular weight against the sequence. For hCG you cannot, because the active substance is a heterodimer with variable glycosylation, so the burden shifts entirely onto the documentation.\n\nStart with the unit. hCG is quantified in international units by biological activity, not by mass. A listing that states only a mass — \"5mg vial\" — while calling the contents hCG is telling you it has not characterised what it is selling, because the two units are not interchangeable and the conversion depends on the specific activity of the batch. Our table records the unit figure the vendor states and shows an explicit gap where none is given, rather than inventing one.\n\nNext, the Certificate of Analysis. For hCG the meaningful certificate reports identity by a method capable of confirming the intact heterodimer — typically immunoassay or mass spectrometry alongside an HPLC purity trace — and references a specific batch number that matches the label on the vial you receive. A certificate that reports a single purity percentage with no identity confirmation is a certificate for a peptide, reused for a protein.\n\nThen the identity itself. hCG consists of an alpha subunit of roughly 92 residues that is shared with luteinising hormone, follicle-stimulating hormone and thyroid-stimulating hormone, and a beta subunit of roughly 145 residues that confers specificity at the LH/CG receptor. It is the beta subunit that distinguishes hCG from the other glycoprotein hormones, and it is also what most pregnancy test kits actually detect. A supplier who cannot tell you which subunit their antibody or assay targets has not thought about the molecule.\n\nFinally, storage and presentation. Lyophilised hCG is a protein and is less forgiving than a small peptide: it needs cold-chain discipline, and the reconstituted product has a short usable window. A listing that never mentions storage conditions is a listing written by someone selling a catalogue entry rather than a material.",
      table: {
        header: ["What the listing states", "What it should state", "Why it matters for hCG"],
        rows: [
          ["Pack size", "International units (1,000 / 5,000 / 10,000 IU)", "hCG is dosed in IU by biological activity; a mass figure cannot substitute"],
          ["Purity", "Purity plus identity confirmation for the intact heterodimer", "A single HPLC percentage does not show that a glycoprotein is present"],
          ["Batch", "A batch number that matches the vial label and the COA", "A generic COA cannot show the tested material is the shipped material"],
          ["Subunit", "Alpha/beta stated where an assay is described", "The beta subunit is what distinguishes hCG from LH, FSH and TSH"],
          ["Storage", "Lyophilised storage conditions and reconstituted handling window", "hCG is a protein and degrades faster than a small synthetic peptide"],
        ],
      },
    },
    {
      title: "The IU Trap — Why Every Per-Milligram Comparison for hCG Is Broken",
      body:
        "Every other compound on this site is compared on cost per milligram, because every other compound is a defined chemical mass. hCG is not, and the consequence is that a large share of the price comparisons published for it are computing a ratio against a denominator that does not exist.\n\nThe specific activity of a hCG preparation — how many international units there are per milligram — varies with the preparation and the assay used to standardise it. A high-purity urinary-derived preparation and a recombinant preparation can carry different IU-per-mg figures, and the figure is established per batch against an international standard rather than derived from a formula. So \"price per mg of hCG\" is not a constant that can be compared across suppliers. It is an artefact of whichever conversion the author assumed.\n\nWhat can be compared is the price per stated unit. A 5,000 IU vial at £X and a 10,000 IU vial at £Y are directly comparable once reduced to cost per 1,000 IU, because the unit is the vendor's own stated unit of the same material. That is exactly what our per-unit column does. Where a vendor states no unit at all, the row still appears in the full table — it is a real listing — but it sits outside the ranked leaderboard, because an unknown cannot be ranked against a known.\n\nThe second half of the trap is the pen. A pre-filled hCG pen is a device as well as a material: the price reflects assembly, the fixed concentration the device is built around, and the fact that a pen is delivered ready to use rather than as a powder requiring reconstitution. Comparing a pen's price per unit directly against a lyophilised vial's is possible but misleading, because you are not buying the same article. Our table flags pens separately so the comparison stays honest.",
    },
    {
      title: "Checking a UK Supplier Before You Order",
      body:
        "Once you have a shortlist, the verification work is the same regardless of compound, with two hCG-specific additions. The generic checks first: a Certificate of Analysis from a named laboratory referencing a specific batch; a contact route that replies before you have paid; research-use-only language throughout, with no weight-loss or human-use claims; and a business identity you can trace to a registered company. Our TrustScore badge is the machine-readable version of the last of these — a supplier who installs it on their own domain is proving they operate that domain, which is the single cheapest way to filter out throwaway storefronts.\n\nThe hCG-specific additions both concern identity. Ask which subunit the identity test targets. A supplier selling genuine hCG should be able to say that identity was confirmed against the beta subunit, because that is the region that distinguishes hCG from the other glycoprotein hormones sharing the alpha subunit — and it is also the region commercial pregnancy assays detect. A supplier who cannot answer has not seen their own certificate.\n\nThe second is the storage question. Lyophilised hCG should arrive cold or have been shipped under conditions the supplier can describe, and the reconstituted material degrades over days rather than months. A supplier who warehouses vials at ambient temperature in a domestic unit is a supplier whose material may have been fine on the day it was tested and less fine on the day it reaches you. This is not a purity claim you can verify from outside, but the answer you get tells you whether the question was ever considered.\n\nFinally, treat the price as the last variable rather than the first. In a market with a handful of listings the spread is narrow, and the difference between the cheapest and the safest is usually small in absolute terms. Buy the cheapest listing among suppliers who pass verification, not the cheapest listing overall. The [hCG supplier guide](/compound-guides/hcg-supplier-uk) walks through each of these checks in the order we run them.",
    },
    {
      title: "Naming and Variants You Will Meet in UK Listings",
      body:
        "hCG travels under a surprising number of labels, and knowing them prevents both false duplicates and false bargains. The common forms are hCG, HCG, hCG (human chorionic gonadotropin), chorionic gonadotropin, hCG 5000iu and hCG 10000iu where the unit is part of the product name, and Choriomon or Pregnyl where a licensed brand name is being invoked. The first group are all the same molecule described at different levels of formality. The last group are licensed medicines, and a research listing using a licensed brand name is borrowing an identity it is not entitled to use.\n\nA second distinction worth knowing is urinary-derived versus recombinant hCG. Urinary hCG is extracted from the urine of pregnant women and has been the standard for decades; recombinant hCG is produced in cell culture and is used in specific clinical settings. Both are hCG, they are not identical preparations, and a supplier who states which one they sell is a supplier who knows their supply chain.\n\nThen there is the beta subunit question from the other direction. \"Beta hCG\" is a term from diagnostic testing, where assays measure the free beta subunit to distinguish hCG from the other glycoprotein hormones. A listing that sells \"beta hCG\" as a product is usually selling a fragment or mislabelling a whole-molecule preparation; it is not the same article as intact hCG, and it should not be compared with one on price per unit.\n\nThe practical rule for the table below: every row is a real listing from a supplier we track, but the pack labels are the vendors' own. Where a vendor states 10,000 IU, that is what the row shows. Where a vendor states a mass, a URL or nothing at all, the row shows the label with our sanitisation applied and no invented figure. Read the label column before the price column — in this market it is the label that tells you whether you are comparing like with like.",
      table: {
        header: ["Label you will see", "What it actually means", "Comparable on price per unit?"],
        rows: [
          ["hCG / HCG / chorionic gonadotropin", "The same molecule, formally or informally named", "Yes"],
          ["hCG 5000iu / 10000iu", "The same molecule with the unit figure in the product name", "Yes"],
          ["Pregnyl / Choriomon", "Licensed pharmaceutical brands, not research reagents", "No — different product category"],
          ["Recombinant hCG", "Cell-culture derived rather than urinary extracted", "Yes, but note the different preparation"],
          ["Beta hCG", "Subunit fragment or mislabelled whole molecule", "No"],
        ],
      },
    },
  ],
  faq: [
    {
      question: "Can you buy hCG over the counter in the UK?",
      answer:
        "No. For human use hCG is a prescription-only medicine in the UK and is dispensed by pharmacies against a prescription. The listings on this page are research reagents sold for laboratory use, which is a separate product category from the licensed medicine. Anything marketed as the medicine without a prescription step is not what it claims to be.",
    },
    {
      question: "Why does this page show a price per 1,000 IU instead of per mg?",
      answer:
        "Because hCG is quantified in international units by biological activity, not by mass, and its specific activity varies with the preparation. A per-milligram figure for hCG is an artefact of an assumed conversion rather than a property of the material, so it cannot be compared across suppliers. Price per stated unit is the only comparison that survives.",
    },
    {
      question: "How do I spot a UK hCG listing that is really a research reagent?",
      answer:
        "It states the unit figure, publishes a Certificate of Analysis referencing a specific batch, describes storage conditions, and carries research-use-only labelling throughout with no weight-loss or human-use claims. It also avoids licensed brand names such as Pregnyl or Choriomon, which it has no right to use for a research reagent.",
    },
    {
      question: "Is a 10,000 IU vial better value than a 5,000 IU vial?",
      answer:
        "Usually yes on cost per unit, because the same vial, stopper, label and testing overhead is amortised across twice the material. But hCG is a protein with a finite stability window, so a larger vial is only better value if the work you are doing consumes it inside that window. Compare per 1,000 IU in the leaderboard, then check the stability question against your own protocol.",
    },
  ],
  sources: [
    {
      label:
        "UniProt P01233 — Choriogonadotropin subunit beta (CGB), human; 165 aa precursor, 145 aa mature beta chain",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label:
        "UniProt P01215 — Glycoprotein hormones alpha chain (CGA), human; shared by hCG, LH, FSH and TSH",
      url: "https://www.uniprot.org/uniprotkb/P01215/entry",
    },
    {
      label:
        "Chorionic Gonadotropin (Human) — statutory instrument and BNF status as a prescription-only medicine in the UK",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
    {
      label:
        "hCG reference standard and unit definition — WHO International Standard for chorionic gonadotropin",
      url: "https://www.nibsc.org/products/brm_product_catalogue/cynomolgus.aspx",
    },
  ],
  tableMode: "price",
  tableHeading: "hCG UK Research Suppliers — Live Prices",
  rowLimit: 12,
};
