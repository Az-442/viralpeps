/**
 * hCG silo spoke 6 of 6 — best hCG peptide.
 * Prices are NEVER hardcoded — rendered live from hcg-silo.ts.
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "best-hcg-peptide",
  title: "Best hCG Peptide: Ranked by Trust and Identity 2026",
  description:
    "Best hCG peptide — ranked by independent TrustScore, batch documentation and price per 1,000 IU, with the criteria that decide it and those that only seem to.",
  h1: "Best hCG Peptide",
  focusKeyword: "best hcg peptide",
  intro: [
    "The best hCG peptide is not the one with the lowest price, the highest quoted purity, or the most polished storefront — and in this market, those three signals are frequently misleading in the same direction. hCG is a glycoprotein hormone rather than a peptide in the strict sense, it is quantified in international units rather than milligrams, and it is a prescription-only medicine in the UK when sold for human use. Each of those facts changes what \"best\" should mean.",
    "The ranking below is by verification and TrustScore first, then price per 1,000 IU where the pack states a unit figure. It is generated from the live supplier data in our tracker, so it reflects the market at the last scrape. Every listing is a research-use-only reagent sold for laboratory work; no dosage or administration guidance appears on this page and nothing here is medical advice.",
    "The reasoning behind the ordering is set out below: which criteria actually distinguish a good hCG supplier from an ordinary one, which criteria look decisive but are not, and how the compound's biology — a heterodimer with an alpha chain shared with three other hormones — makes identity documentation the single most important thing you can check.",
    "If your question is narrower, the [hCG supplier guide](/compound-guides/hcg-supplier-uk) covers the verification procedure in detail and the [**hCG hub →**](/compounds/hcg) collects every guide, price table and article.",
  ],
  sections: [
    {
      title: "The Criteria That Actually Decide It",
      body:
        "Four criteria separate a good hCG listing from an ordinary one, and they are weighted in this order.\n\nBatch-linked identity documentation comes first, and for hCG it has a specific meaning. The certificate must reference a batch number matching the vial, and it must confirm identity in a way that distinguishes hCG from the glycoprotein hormones sharing its alpha chain — that is, against the beta subunit. A certificate reporting only a purity percentage is not an identity document for this compound, and a supplier relying on one is relying on a signal that cannot bear the weight.\n\nConsistent research-use-only positioning comes second, and it is both a legal and a commercial criterion. hCG is a prescription-only medicine for human use in the UK. A supplier whose listing carries RUO labelling while their marketing elsewhere promises weight loss or fertility outcomes is operating in the margin between categories, which is exactly where operators disappear from when challenged. Clear category discipline correlates with a supplier who will still exist next year.\n\nHandling discipline comes third. hCG is a protein and is less forgiving of temperature excursions, mechanical stress and freeze-thaw than a synthetic peptide. A supplier who can describe their storage and shipping conditions, and who publishes handling guidance for reconstituted material, has a quality function. One who cannot has not considered the question.\n\nCommercial transparency comes fourth. That covers stated pack units, stated stock status, a UK business identity, a VAT or company number, and a contact route that replies. None of these says anything about material quality, but together they say whether there is a real business behind the listing — which is the precondition for every other assurance.\n\nPrice is deliberately not in the top four. In a market as narrow as this one, the spread between verified listings is small enough that buying on price alone saves a few percent and risks the only assurance you were buying.",
      list: [
        "1. Batch-linked COA with beta-subunit identity, batch matching the vial.",
        "2. Consistent RUO positioning with no human-use or weight-loss claims.",
        "3. Documented storage, cold chain and reconstituted handling guidance.",
        "4. Transparent units, stock, UK identity, VAT/company number, working contact.",
        "5. Price per 1,000 IU — a tiebreaker among suppliers that pass 1–4, not a criterion on its own.",
      ],
    },
    {
      title: "Criteria That Look Decisive and Are Not",
      body:
        "Several signals dominate buyer attention in this market while carrying very little information. Knowing which they are is as useful as knowing the good ones.\n\nA quoted purity percentage is the most over-read number on any listing. \"99% pure\" tells you the sample is largely one species by HPLC. It does not tell you the species is hCG, it does not tell you the batch, and it does not tell you how the material has been stored since analysis. For a heterodimeric glycoprotein, a purity figure without identity confirmation is the least informative combination available — precise and unanchored.\n\nA stated molecular weight is worse. hCG has no single molecular weight in the way a peptide does, because the active substance is glycosylated and the glycoform composition varies with the preparation. A listing quoting a neat figure in daltons as a quality claim is quoting something the molecule does not have. This is the clearest available tell that a page was written from a template rather than from knowledge of the compound.\n\nWebsite polish is close behind. A clean storefront with professional photography costs less to produce than a batch-linked certificate, and the market contains well-designed sites with no documentation at all alongside plain ones with scrupulous paperwork. Judge the certificate, not the design.\n\nBrand recognition is unreliable in a different way. The well-known hCG names are licensed pharmaceutical brands, and their recognition is borrowed by research listings that have no right to invoke them. A listing using a licensed brand name is a listing whose claims you should discount by default.\n\nFinally, review counts. Reviews in this market are cheap and are frequently solicited at the point of dispatch rather than after the material has been used. Treat them as evidence that orders are being fulfilled, which is worth something, and not as evidence about material quality, which they cannot provide.",
      table: {
        header: ["Signal", "Information it carries", "How much weight it deserves"],
        rows: [
          ["Batch-linked COA with beta-subunit identity", "Links tested material to shipped material and confirms the right molecule", "High"],
          ["Consistent RUO positioning", "Supplier is in the reagent category and intends to remain", "High"],
          ["Storage and handling guidance", "Supplier has considered that hCG is a protein", "High"],
          ["Stated purity percentage alone", "Sample is largely one species; species unconfirmed", "Low"],
          ["Stated molecular weight in daltons", "Almost none — hCG has no single MW", "Very low to negative"],
          ["Website polish", "Marketing budget", "Low"],
          ["Review count", "Orders are being fulfilled", "Low for material quality"],
        ],
      },
    },
    {
      title: "Why Identity Is the Deciding Factor for hCG",
      body:
        "For most peptides identity is almost a formality: the sequence is short, mass spectrometry resolves it, and a certificate reporting the expected mass is a certificate that establishes the compound. hCG is the exception among the compounds we cover, and the reason is its structure.\n\nhCG is a heterodimer of an alpha and a beta subunit. The alpha subunit of roughly 92 residues is identical to the alpha subunit of luteinising hormone, follicle-stimulating hormone and thyroid-stimulating hormone. The beta subunit of roughly 145 residues is unique to hCG and is what confers specificity at the LH/CG receptor. So a preparation could be immunoreactive against an alpha-directed antibody, pass a purity test cleanly, and still not be hCG — and because the general glycoprotein hormone family is what a sloppy assay sees, the error would not be obvious from the usual numbers.\n\nThis is also why diagnostic assays measure the free beta subunit when they need to be specific, and why commercial pregnancy tests target beta rather than the intact molecule. The biology that makes a pregnancy test specific is the same biology that makes a beta-directed identity test meaningful for a research reagent.\n\nA corollary worth stating: \"beta hCG\" as a product label does not mean a superior grade of hCG. In diagnostics it describes an assay measuring the free beta subunit; as a listing label it usually indicates a fragment or a mislabelled whole-molecule preparation. Neither is interchangeable with intact hCG, and neither belongs in the same comparison.\n\nThe practical upshot for ranking: a supplier who can discuss which subunit their identity test targets is a supplier who understands the article they sell. That conversation is short and it is decisive, and it costs nothing to have before you order. More detail on the molecular background is in the [hCG research guide](/research/hcg-research-guide).",
    },
    {
      title: "Ranking the Market — and Where Price Belongs",
      body:
        "The table below ranks the UK listings we track by verification state, then TrustScore, with price per 1,000 IU shown where the pack states units. That ordering reflects the argument on this page: among suppliers who pass the documentation checks, the price differences are small; among suppliers who do not, the price is irrelevant.\n\nA word on how to use it. Take the top two or three rows that state a unit figure, open each supplier's product page, and look for the two documents that matter — the batch-linked certificate and the handling guidance. The row that has both is your answer, and the ranking has done its job. If neither has a certificate, drop to the next tier rather than settling, because in a market this narrow the difference in price between a documented and an undocumented listing is typically a few percent.\n\nBe realistic about what a ranking can and cannot tell you. We do not assay supplier material. Our scores measure observable signals about the supplier — a live site, published certificate material, RUO labelling, a contact route, shipping terms, domain control. They are a filter for finding real businesses, not a substitute for reading a certificate. For the compound-level price picture across every listing, including the ones without stated units, use the [hCG price comparison](/compound-guides/hcg-price-comparison-uk).\n\nAnd keep the category boundary in view. hCG for human use is a prescription-only medicine in the UK and is dispensed by pharmacies against a prescription; every listing ranked here is a research reagent sold for laboratory work. Nothing on this page is medical advice, and no supplier on it can lawfully be a route to the medicine.",
    },
  ],
  faq: [
    {
      question: "What makes the best hCG peptide supplier?",
      answer:
        "A batch-linked Certificate of Analysis that confirms identity against the beta subunit, consistent research-use-only positioning with no human-use claims, documented storage and handling, and a traceable UK business with a working contact route. Price per 1,000 IU is a tiebreaker among suppliers who pass those checks.",
    },
    {
      question: "Is the highest-purity hCG automatically the best?",
      answer:
        "No. A purity percentage shows that the sample is largely one species by HPLC, not that the species is hCG. For a heterodimeric glycoprotein that shares its alpha chain with LH, FSH and TSH, identity confirmation against the beta subunit matters more than the purity figure.",
    },
    {
      question: "Should I choose a supplier because they quote a molecular weight for hCG?",
      answer:
        "No — and a quoted molecular weight in daltons is a mild warning sign. hCG is glycosylated and its mass varies with glycoform composition, so there is no single correct figure. A listing presenting one as a quality claim is using a template it does not understand.",
    },
    {
      question: "How do I compare a 5,000 IU vial with a 10,000 IU vial?",
      answer:
        "Reduce both to price per 1,000 IU, which is what the table on this page does. The larger vial usually wins because the vial, stopper, label and testing overhead is the same for both, but hCG is a protein with a finite stability window, so a larger vial is only better value if your work consumes it inside that window.",
    },
  ],
  sources: [
    {
      label: "UniProt P01233 — Choriogonadotropin subunit beta (CGB), human; specificity-conferring chain",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label: "UniProt P01215 — Glycoprotein hormones alpha chain (CGA), shared by hCG, LH, FSH and TSH",
      url: "https://www.uniprot.org/uniprotkb/P01215/entry",
    },
    {
      label: "Chorionic Gonadotropin (Human) — BNF monograph; UK prescription-only status",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
    {
      label: "WHO International Standard for chorionic gonadotropin — basis for IU quantification",
      url: "https://www.nibsc.org/products/brm_product_catalogue/cynomolgus.aspx",
    },
  ],
  tableMode: "trust",
  tableHeading: "Best hCG Peptide — Verification First, Then Cost Per 1,000 IU",
  rowLimit: 0,
};
