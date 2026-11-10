/**
 * HMG silo spoke 4 of 6 — buy HMG online UK.
 * Prices are NEVER hardcoded — the page renders them live from hmg-silo.ts.
 * Internal links use inline markdown: [text](/path)
 */
import type { Spoke } from "./hmg-spokes-types";

export const spoke: Spoke = {
  slug: "buy-hmg-online-uk",
  title: "Buy HMG Online UK: Payment, Delivery and Checks",
  description:
    "Buy HMG online UK — how payment, delivery and cold-chain handling actually work for research reagents, plus the five-minute verification check before you order.",
  h1: "Buy HMG Online UK",
  focusKeyword: "buy hmg online uk",
  intro: [
    "If you are looking to buy HMG online UK, the practical questions are not where the listings are — they are how payment, delivery and verification actually work for a biological, and how to avoid the sellers who are not selling what their listing implies. HMG, or menotropin, is a urinary gonadotropin extract supplied as a research reagent in the UK, and it is a prescription-only medicine when supplied for human use. The vials on this page are the former, sold for laboratory use, and everything that follows assumes that framing.",
    "The ordering mechanics are the same as any research reagent — a product page, a basket, a payment, a tracked parcel — but the differences are where the risk concentrates. A biological is more fragile in transit than a small peptide, the verification burden sits entirely on documentation rather than on a molecular weight you can sanity-check, and the abbreviation \"HMG\" collides with unrelated terms that can misdirect a search. Each of those differences changes one step of the buying process, and the rest of this page walks through them in order.",
    "The table below is generated from the live price data in our tracker. It lists every HMG listing from the UK suppliers ViralPeps tracks, with the pack label, headline price, per 1,000 IU rate, stock status, verification state and a direct link to the supplier's own product page. It reflects each supplier's listing at the most recent scrape rather than at the moment you read this.",
    "Everything on this page is research-use-only and nothing here is medical advice. If you want the full market before choosing, start at the [**HMG UK price comparison hub →**](/compounds/hmg).",
  ],
  sections: [
    {
      title: "Before You Order — The Five-Minute Check",
      body:
        "The single highest-value thing you can do before buying HMG online in the UK is a five-minute check that filters out most of the risk in this market, and it is the same five checks in the same order every time.\n\nFirst, confirm the supplier states a unit figure. HMG is dosed in international units and the standard vial is 75 IU; a listing that states only a mass is stating the wrong unit for a bioassay-standardised product. Second, confirm the Certificate of Analysis is lot-specific and states the FSH and LH activity and the assay used — a generic certificate reused across every listing is the most common red flag in this category. Third, confirm the labelling is research-use-only, with no human-use, bodybuilding or fertility self-treatment claims. Fourth, confirm the supplier is a verifiable UK business with a contact route that replies before you pay. Fifth, check the batch number on the certificate matches the label on the vial when it arrives.\n\nThose five checks take minutes and eliminate the unregulated tail of the market. The verification column on our table is the machine-readable version of the fourth check — a supplier who installs a TrustScore badge on their own domain is proving they operate that domain. The full checklist lives in the [HMG supplier guide](/compound-guides/hmg-supplier-uk).",
      list: [
        "Unit figure stated — 75 IU standard, not a mass.",
        "Lot-specific COA — FSH and LH activity plus the assay used.",
        "Research-use-only labelling — no human-use claims.",
        "Verifiable UK business — contact route that replies.",
        "Batch match — certificate batch equals vial label.",
      ],
    },
    {
      title: "How Payment Actually Works for Research Reagents",
      body:
        "Payment for a research reagent in the UK looks superficially like any e-commerce checkout, but there is a structural reason the channel matters more than it does for a consumer product, and it is the same reason the unregulated tail of this market prefers certain channels.\n\nReputable research suppliers take payment through ordinary routes — card processors, bank transfer, and the standard online payment providers — and they issue an invoice that names a real business entity and a VAT number where one applies. The invoice is not paperwork for its own sake: it is the document that ties the transaction to a legal person who can be pursued if the goods are misdescribed. A supplier who asks for payment through a channel that offers no recourse — gift cards, crypto-only, a personal account — is choosing that channel deliberately, because it is the channel from which a complaint cannot recover money.\n\nThe practical rule is simple: if the payment route would make it hard to dispute the transaction, treat that as a property of the seller, not of the payment provider. The price comparison on this page links only to suppliers' own product pages, and the verification column exists precisely so that a cheap listing reached through an unverifiable payment route does not slip through on price alone.",
    },
    {
      title: "Delivery and Handling for a Protein, Not a Peptide",
      body:
        "The most under-appreciated step in buying HMG online in the UK is delivery, because a lyophilised gonadotropin is a protein and a protein is less forgiving in transit than a small synthetic peptide. The differences are concrete.\n\nLyophilised HMG ships as a dry powder in a stoppered vial, which is the stable form, but it should still be described by the supplier with storage and handling conditions: shipped at ambient or with cold packs, stored refrigerated or frozen, and a stated window for the reconstituted material. A supplier who publishes those conditions has thought about the molecule; a supplier who does not is either selling a label or has never been asked.\n\nThe reconstitution window is the point most buyers miss. Once reconstituted, a gonadotropin degrades over days rather than months, so a vial bought for a long protocol is only a bargain if the protocol consumes it inside that window. This is the same stability question that makes a larger vial not automatically better value — it is only better value if you use it.\n\nFinally, delivery should be tracked and the parcel signed-for where the value justifies it. A biological is not a product you want left on a doorstep in summer, and a supplier who ships everything untracked is a supplier who has not thought about the goods they sell. The practical checks here are the same as elsewhere: ask about storage before paying, and match the batch number when the vial arrives.",
    },
    {
      title: "What a Legal UK Listing Looks Like",
      body:
        "There is a specific shape to a legitimate UK HMG listing, and knowing it lets you spot the listings that are borrowing the medicine's legitimacy without carrying its constraints.\n\nA legitimate research listing describes the product as menotropin or HMG, states the unit figure and pack size, carries research-use-only language throughout, and is silent on human dosing, injection protocols or therapeutic outcomes. It links a lot-specific Certificate of Analysis, names the supplier's business entity, and does not use licensed brand names such as Menopur or Merional. It is a reagent, and it reads like one.\n\nA listing that instead markets the product for bodybuilding, for fertility self-treatment or as a substitute for a prescription is describing the medicine, not the reagent — and it is doing so without the prescription step that the medicine requires. That is the shape of the unregulated tail, and it is the shape our verification column exists to separate out.\n\nOne more subtlety: the licensed medicine and the research reagent genuinely are different product categories in UK law, and the boundary is the intended use stated on the listing. A supplier who blurs that boundary — research-use labelling in the fine print, therapeutic language in the headline — is selling across the line and should be treated as outside the comparison. The [**HMG UK price comparison hub →**](/compounds/hmg) keeps the two categories apart for exactly this reason.",
    },
    {
      title: "Avoiding the Abbreviation Trap When You Search",
      body:
        "The last thing to know before you buy HMG online UK is that the search itself is hostile, because \"HMG\" collides with three unrelated meanings and a raw search surfaces all of them. HMG is also Her Majesty's Government in UK administrative writing, HMG-CoA reductase in lipid biochemistry, and High Mobility Group proteins in molecular biology — and in gaming it is a heavy machine gun. A search for \"HMG online\" returns a medical provider's appointment portal before it returns any gonadotropin.\n\nThe fix is to search the disambiguated form: \"HMG 75iu\", \"menotropin\", or \"HMG peptide\". The unit-qualified form is the cleanest, because no government department, statin pathway or machine gun is sold in 75 IU vials. It is also the form the autocomplete results cluster around, which tells you that other buyers have already converged on it.\n\nThis matters for the buying decision in one concrete way: a listing that only ever appears in your results when you search the ambiguous term, and never when you search \"HMG 75iu\", is a listing that is not being found by the people who know what they are buying. The suppliers worth buying from are the ones that surface on the disambiguated query — and they are the ones in the table below.",
    },
  ],
  faq: [
    {
      question: "Is it legal to buy HMG online in the UK?",
      answer:
        "As a research reagent sold for laboratory use, yes — that is a lawful product category. As a medicine for human use, menotropin is prescription-only and cannot lawfully be sold without a prescription step. The distinction is the intended use stated on the listing, and this page covers only research reagents.",
    },
    {
      question: "How should HMG be shipped?",
      answer:
        "Lyophilised HMG ships as a dry powder and should come with stated storage conditions and a reconstitution window from the supplier. Once reconstituted it degrades over days rather than months. Delivery should be tracked, and the batch number on the vial should match the lot-specific Certificate of Analysis.",
    },
    {
      question: "Why does HMG come in 75 IU vials?",
      answer:
        "Because the clinical standard for menotropin is a 75 IU unit, and the research listings inherit that pack size. HMG is standardised by bioassay rather than by mass, so the unit figure — not a milligram figure — is how the product is quantified.",
    },
    {
      question: "What should I check on the Certificate of Analysis before buying?",
      answer:
        "That it is lot-specific, that it states the FSH and LH activity and the assay used, and that the batch number matches the label on the vial you receive. A generic certificate reused across listings is the most common red flag for this product class.",
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
      label: "HMG UK Price Per IU — ViralPeps research guide on unit pricing",
      url: "/research/hmg-uk-price-guide",
    },
  ],
  tableMode: "price",
  tableHeading: "Buy HMG Online UK — Live Supplier Prices",
  rowLimit: 12,
};
