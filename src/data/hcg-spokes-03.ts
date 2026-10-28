/**
 * hCG silo spoke 3 of 6 — hCG price comparison UK.
 * Prices are NEVER hardcoded — rendered live from hcg-silo.ts.
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "hcg-price-comparison-uk",
  title: "hCG Price Comparison UK: Every Supplier, Live 2026",
  description:
    "hCG price comparison UK — every UK research supplier we track, side by side in one IU price table with pack labels, stock status, verification and TrustScore.",
  h1: "hCG Price Comparison UK",
  focusKeyword: "hcg price comparison uk",
  intro: [
    "A hCG price comparison UK table is only useful if the column headings are honest, and for this compound most published comparisons are not. hCG is quantified in international units by biological activity, so the familiar \"price per mg\" column that works for every peptide on this site cannot exist. Where you see one, the author has assumed a specific activity figure and divided by it — producing a number that looks precise and is not comparable across suppliers.",
    "This page does the opposite. It shows the pack label exactly as each supplier states it, the headline price, and a cost per 1,000 IU wherever the vendor has given a unit figure. Rows without a unit figure are still listed, marked as such, and excluded from the rate column rather than filled in with a guess. The table is generated from the live price data in our tracker, so it reflects each supplier's listing at the most recent scrape rather than at the moment you read it.",
    "The listings fall into two clearly different groups and the table keeps them visible rather than averaging them. One group is research reagents — lyophilised hCG labelled for laboratory use, with a Certificate of Analysis at the good end. The other is everything that shares the search results without being that: licensed medicines, weight-loss marketing, grey-market imports. A comparison that mixes the two produces a price spread that is entirely an artefact of category, not of efficiency.",
    "Nothing on this page is medical advice and every listing shown is a research-use-only reagent. hCG is a prescription-only medicine in the UK for human use, and the licensed product is not what is being compared here. For the wider picture on sourcing, the [**hCG hub →**](/compounds/hcg) collects the supplier, price and identity guides in one place.",
  ],
  sections: [
    {
      title: "How to Read This hCG Price Comparison",
      body:
        "Read the label column before the price column, every time. In a peptide market the label is a convenience; in the hCG market it is the thing that determines whether two rows are comparable at all.\n\nThe columns work like this. Vendor and pack label are as the supplier states them. Price is the headline figure on their listing. The rate column is price divided by the stated unit figure, expressed per 1,000 IU so that a 5,000 IU vial and a 10,000 IU vial land on the same scale. Stock status reflects what the listing said at the last scrape — a row marked out of stock is a real product that you cannot currently buy, and we keep it visible because its price still anchors the market.\n\nVerification state is the column most people skip and the one that matters most. A verified row means the supplier's domain carries our TrustScore badge, which is proof that they operate that domain rather than proof of product quality. TrustScore is a composite of observable signals — a live site, a reachable contact route, published COA material, research-use-only labelling, shipping terms — and it is a filter, not a certificate. A high score means the supplier is a real business with the paperwork visible. It does not mean the material has been independently assayed by us, because it has not.\n\nThe \"—\" that appears in the rate column for some rows is deliberate. Those listings state no unit figure, or state something that is not a quantity, such as a product image URL pasted into a pack field. Showing \"—\" is more useful than showing a fabricated number, and it is a hint about how carefully the listing was written.",
    },
    {
      title: "What Explains the Spread in hCG Prices",
      body:
        "Once you exclude category confusion, the remaining price spread on UK hCG has four drivers, and three of them are not about the material.\n\nThe first is pack size, and it dominates. A 10,000 IU vial contains twice the material of a 5,000 IU vial but carries the same glass, stopper, crimp, label and testing overhead, so its cost per unit is structurally lower. This is the largest single explanation for the spread and the easiest to correct for.\n\nThe second is multi-vial kits, which concentrate the pack-size effect. A kit is where the lowest per-unit figures in our data appear, and that is arithmetically correct rather than a marketing trick — one testing run amortised across ten times the material. The trade-off is commitment, and for a protein with a finite stability window that trade-off is more real than it is for a peptide.\n\nThe third is preparation route. Urinary-derived and recombinant hCG have different manufacturing cost structures and different supply chains. A supplier selling recombinant material at a urinary-derived price is a supplier whose listing deserves a question rather than a purchase.\n\nThe fourth is documentation, and this is where the gap between the cheapest and the most expensive widens beyond what pack size can explain. Batch-linked identity testing for a glycoprotein is more expensive than a single HPLC purity run for a peptide, because confirming the intact heterodimer requires more than one method. A supplier commissioning that on every batch is carrying a fixed cost that a supplier selling on an old generic certificate is not. The price difference you see is partly a difference in what was measured.\n\nWhat does not explain the spread, despite being offered as an explanation, is \"higher purity\". Purity figures on hCG listings are frequently quoted from a certificate that reports no identity confirmation, and a purity percentage for a sample that has not been shown to contain hCG is not a purity figure at all.",
      table: {
        header: ["Driver", "Direction of effect", "Is it a red flag?"],
        rows: [
          ["Pack size (5,000 → 10,000 IU)", "Lower cost per unit for larger vials", "No — expected"],
          ["Multi-vial kit", "Lowest cost per unit; larger commitment", "No, but check stability window"],
          ["Urinary vs recombinant preparation", "Materially different cost structures", "Only if the listing is inconsistent"],
          ["Per-batch identity testing", "Raises the floor on price", "No — absence of it is the flag"],
          ["No stated unit figure", "Unrankable", "Yes — signals a careless listing"],
        ],
      },
    },
    {
      title: "The Identity Problem Inside a Price Table",
      body:
        "A price table assumes every row describes the same article. For hCG that assumption needs testing, because the molecule is a heterodimer whose two subunits are shared with other hormones and whose identity is therefore easier to get wrong than a synthesised peptide's.\n\nhCG is composed of an alpha subunit of roughly 92 residues, identical to the alpha subunit of luteinising hormone, follicle-stimulating hormone and thyroid-stimulating hormone, and a beta subunit of roughly 145 residues that is unique to hCG and confers specificity at the LH/CG receptor. A preparation that contains the alpha subunit without the correct beta chain is not hCG, but it would pass a purity test and could pass a casual identity check against an alpha-directed antibody.\n\nThis is why the meaningful certificate for hCG states which subunit the identity test targets, and why beta-directed detection is the standard: it is also what commercial pregnancy assays measure, for exactly the same reason. When you compare two listings, the one whose certificate names the beta subunit is comparing itself honestly; the one that reports a bare percentage may or may not be selling hCG at all.\n\nThere is a related labelling trap. \"Beta hCG\" appears in listings as if it were a product upgrade. In diagnostics it is a term for an assay that measures the free beta subunit. As a product label it usually means a fragment or a mislabelled whole-molecule preparation, and it is not interchangeable with intact hCG in a comparison. If a row's label says beta hCG, do not compare its rate against a whole-molecule row.\n\nOur table cannot resolve this for you — we do not assay supplier material — but it can keep the rows honest about what they claim, which is why the pack label is shown verbatim.",
    },
    {
      title: "Comparing hCG Against the Rest of the Market",
      body:
        "It is worth knowing where hCG sits relative to the compounds people usually search alongside it, because the price expectation buyers carry from peptides does not transfer.\n\nAgainst a GLP-1 such as [tirzepatide](/compound-guides/tirzepatide-price-comparison-uk), the difference is scale: GLP-1 vials are priced in the tens of pounds per 5mg to 30mg and compared per milligram, and the UK market for them is large enough that per-unit costs have compressed. hCG is a much smaller reagent market, sold in units rather than mass, and the price spread between the cheapest and the most expensive verified listing is proportionally narrower than a peptide buyer expects. That narrowness is why documentation matters more here than price: there is little money to be saved by shopping at the floor.\n\nAgainst other glycoprotein or biological reagents — [HMG](/compound-guides), follicle-stimulating hormone preparations — hCG is usually the cheaper item per vial and the more widely stocked, because the same material has a large diagnostic and clinical market behind it. That wider market is also why the search results are so polluted: hCG is a name the public recognises, so it attracts sellers who would never attempt to rank for a research peptide.\n\nThe practical conclusion for a price comparison is counter-intuitive. In a market this small, with this little spread and this much category confusion, the table is best used to confirm you are not being overcharged rather than to find a bargain. Pick a verified supplier at or near the market rate, read their certificate, and stop. The [cheapest hCG page](/compound-guides/cheapest-hcg-uk) covers the ranking arithmetic if you want it, and the [supplier guide](/compound-guides/hcg-supplier-uk) covers the checks.",
    },
  ],
  faq: [
    {
      question: "Why are there no price-per-mg figures on this hCG comparison?",
      answer:
        "Because hCG is quantified in international units by biological activity and its specific activity varies with the preparation, so there is no fixed mass conversion. A per-milligram figure would be an artefact of an assumed conversion rather than a property of the material, and it could not be compared across suppliers.",
    },
    {
      question: "Why do some rows show a dash instead of a rate per 1,000 IU?",
      answer:
        "Those listings state no unit figure, or state something that is not a quantity. We show them in the table because they are real listings, but we do not invent a unit figure for them, so they cannot carry a rate. The dash is a signal about the listing rather than an error.",
    },
    {
      question: "Does a higher TrustScore mean the hCG is better quality?",
      answer:
        "No. TrustScore measures observable signals about the supplier — a live site, a reachable contact route, published COA material, research-use-only labelling, shipping terms. It says the supplier is a real business with visible paperwork. It is not an assay of the material and we do not independently test supplier vials.",
    },
    {
      question: "Why is the hCG price spread narrower than for peptides?",
      answer:
        "Because the UK hCG research market is small and the number of verified listings is limited, so there is less room for per-unit costs to diverge. The narrowness is an argument for choosing on documentation rather than on price, since little money is saved by shopping the floor.",
    },
  ],
  sources: [
    {
      label: "UniProt P01233 — Choriogonadotropin subunit beta (CGB), human",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label: "UniProt P01215 — Glycoprotein hormones alpha chain (CGA), shared by hCG, LH, FSH and TSH",
      url: "https://www.uniprot.org/uniprotkb/P01215/entry",
    },
    {
      label: "Chorionic Gonadotropin (Human) — BNF monograph, UK prescription-only status",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
  ],
  tableMode: "full",
  tableHeading: "hCG Price Comparison UK — Every Listing We Track",
  rowLimit: 0,
};
