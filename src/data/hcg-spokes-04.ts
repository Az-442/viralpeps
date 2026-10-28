/**
 * hCG silo spoke 4 of 6 — buy hCG online UK.
 * Prices are NEVER hardcoded — rendered live from hcg-silo.ts.
 */
import type { Spoke } from "./hcg-spokes-types";

export const spoke: Spoke = {
  slug: "buy-hcg-online-uk",
  title: "Buy hCG Online UK: Payment, Delivery and Checks",
  description:
    "Buy hCG online UK — what the law actually says, how payment and delivery work for UK research suppliers, and the five checks to run before you place an order.",
  h1: "Buy hCG Online UK",
  focusKeyword: "buy hcg online uk",
  intro: [
    "If you are about to buy hCG online UK suppliers are not all selling the same thing, and the legal position is the single most useful piece of information you can hold before placing an order. For human use, hCG is a prescription-only medicine in the United Kingdom. It is supplied through pharmacies against a prescription, it is not a general-sale item, and no website can lawfully sell it to you as a medicine because you added it to a basket. Every listing on this page is a research reagent sold for laboratory work, and that is the only category in which an online purchase is straightforward.",
    "That distinction changes what \"buying online\" means in practice. You are not choosing between competing pharmacies; you are choosing between research-reagent suppliers whose listings differ in documentation, stock, payment route and delivery terms. The price differences between them are small — this is a narrow market — so the decision is almost entirely about which supplier can show you a batch-linked certificate and a working contact route before you pay.",
    "The listings below are the live UK research-reagent market as we track it, with pack labels, prices, unit rates where stated, stock status and a direct link to each supplier's own product page. They are generated from our recurring scrape, so they reflect each listing at the last check rather than at the moment you read this. Nothing here is medical advice, and no dosage, administration or human-use guidance is offered anywhere on this page.",
    "For the wider context on how these suppliers compare, the [hCG price comparison page](/compound-guides/hcg-price-comparison-uk) shows the full table, and the [**hCG hub →**](/compounds/hcg) collects every guide. Read on for the ordering mechanics: what the law permits, what payment routes protect you, and what delivery and handling should look like for a protein rather than a peptide.",
  ],
  sections: [
    {
      title: "Before You Order — The Five-Minute Check",
      body:
        "Five checks, run in this order, catch almost every problem listing in this market. None takes more than a minute and all of them can be done before you enter payment details.\n\nFirst, does the listing state a unit figure? hCG is quantified in international units. A listing that names hCG and states only a mass, or states nothing, has not described its own product, and that is the cheapest available signal that the page was written by someone selling a catalogue entry rather than a material.\n\nSecond, is there a Certificate of Analysis, and does it name a batch? A certificate exists to link tested material to shipped material. Without a batch number it proves nothing about the vial you receive. For hCG specifically, the identity section should reference the beta subunit, because that is the region distinguishing hCG from the other glycoprotein hormones that share its alpha chain.\n\nThird, does the site carry research-use-only labelling throughout and nowhere advertise weight loss, body composition, fertility or any other human outcome? hCG has a long history of being marketed for weight loss, and a supplier surfacing those claims is telling you which market they are really in. Our policy is blunt: a listing making human-use claims is not a research supplier, whatever its footer says.\n\nFourth, does the contact route work? Send one question — for example, which batch the current stock is from — before ordering. A reply within a working day is the normal standard. Silence before payment is the strongest available predictor of silence after it.\n\nFifth, is the business identifiable? A registered company name, a UK address, and a domain the supplier demonstrably controls. The TrustScore badge is the machine-readable version of the last point: a supplier who installs it on their own domain is proving they operate that domain, which filters out the throwaway storefronts this market is known for.",
      list: [
        "Unit figure stated in international units, not mass.",
        "Certificate of Analysis naming a specific batch, with beta-subunit identity.",
        "Research-use-only labelling throughout; no weight-loss or human-use claims.",
        "A contact route that replies before you pay — test it with one question.",
        "A traceable business identity and a domain the supplier controls.",
      ],
    },
    {
      title: "How Payment Actually Works for Research Reagents",
      body:
        "Payment is where the difference between a research supplier and a grey-market operation becomes visible, because the two have access to different payment infrastructure.\n\nCard payment is the strongest form of protection available to a UK buyer, because a card issuer can reverse a charge for goods not received or not as described. A supplier who accepts cards is a supplier who has passed an acquiring bank's onboarding checks, which are not trivial for a research-chemical merchant. If a listing accepts cards, that is a meaningful signal in itself.\n\nBank transfer is the opposite. A transfer is irreversible once made, there is no chargeback, and the recipient is hard to chase through the banking system if the goods never arrive. Many legitimate small suppliers use transfer because card acquiring is expensive and sometimes refused for this product category — so transfer alone is not proof of anything bad, but it does mean the burden of verification sits entirely with you before you send money.\n\nCryptocurrency is the clearest signal in the market. A supplier who takes only crypto is a supplier who has decided that no payment intermediary should be able to see their transactions or reverse one. That may be a legitimate preference for an operator who has been deplatformed by processors, but from a buyer's position it means the only remaining protection is the seller's reputation, and reputation in this market is not auditable.\n\nFor UK-specific purchases, VAT treatment is worth noticing. Legitimate UK reagent suppliers usually quote prices inclusive of VAT and provide a VAT number. A supplier with no VAT number, no company number and no UK address is not a UK supplier in any meaningful sense, even if the domain ends in .uk.\n\nOne further point that applies to hCG more than to peptides: be sceptical of any payment page that asks you to describe your intended use or confirm that you are not buying for human use, then never checks. That is theatre. It exists to make a human-use sale look like a research sale, and it protects the seller rather than you.",
    },
    {
      title: "Delivery and Handling for a Protein, Not a Peptide",
      body:
        "Delivery expectations in the UK research market are usually 1–3 working days from a domestic supplier, longer from a supplier shipping in from the EU. The timeline is not where hCG differs from a peptide; the handling is.\n\nhCG is a glycosylated heterodimeric protein. That makes it less robust than a small synthetic peptide in three specific ways. It is more sensitive to temperature excursions, so a vial that spends a day in a warm depot has been degraded in a way a lyophilised peptide would have tolerated. It is more sensitive to reconstitution and handling, so repeated freeze-thaw cycles or vigorous mixing cause aggregation that a peptide would shrug off. And its reconstituted stability window is short, measured in days rather than weeks, so the way it is used after arrival matters more than for any compound on this site.\n\nA listing that never mentions storage is therefore a listing that has not thought about the product. The good ones say the lyophilised material should be held cold and describe the reconstituted window. Ask, if it is not stated — the answer tells you whether cold-chain discipline exists at that supplier or whether vials sit in a domestic unit until an order arrives.\n\nCustoms is the other practical issue. A UK supplier shipping domestically carries no import exposure. A supplier shipping from outside the UK means your order passes through customs, which for a prescription medicine would be a problem and for a research reagent is a documentation question — the parcel needs to be described accurately by the shipper. Grey-market stock sold at prices below the UK research market is usually arriving this way, and the price advantage reflects the fact that no UK entity is standing behind the sale.\n\nFinally, check what arrives against what you ordered. The pack label, batch number and certificate should match the listing. If they do not, stop there and contact the supplier before opening the vial: mismatched documentation is the one defect you can still act on.",
    },
    {
      title: "What UK Law Actually Says, and Why It Matters to a Buyer",
      body:
        "The legal position is the reason this page reads differently from a peptide buying guide, so it is worth stating plainly rather than gesturing at.\n\nhCG is a prescription-only medicine in the UK when supplied for human use. That means it can lawfully be supplied to a patient only against a prescription, by a pharmacy, and the supply is recorded. Selling it online to a consumer as a medicine, without a prescription, is not permitted. This is not a grey area of enforcement; it is the baseline classification of the substance.\n\nA research reagent is a different regulatory category. A laboratory reference material sold for non-clinical laboratory work, labelled as such, is not being sold as a medicine — provided it genuinely is that, which is why the labelling and the absence of human-use claims matter legally as well as ethically. The research-use-only statement is not boilerplate. It is what separates the two categories.\n\nThe practical consequence for you as a buyer is this. If you want hCG as a medicine, the route is a prescription and a pharmacy, and no research supplier can lawfully be that route. If you want hCG as a laboratory reference material, buy from a supplier whose listing is unambiguous about that — RUO labelling, no human-use claims, batch documentation. A listing that straddles the two, offering \"research\" labelling but weight-loss marketing and dosing advice, is in the worst position of all: it has the legal exposure of the medicine without the regulatory protection of the pharmacy.\n\nThis matters to you beyond compliance. A supplier operating in that straddled position has an incentive to disappear if challenged, which is precisely the supplier you do not want holding your payment. Clear RUO positioning is therefore a commercial signal as much as a legal one. For the compound-level background, the [hCG research guide](/research/hcg-research-guide) covers what the published literature actually studies.",
    },
  ],
  faq: [
    {
      question: "Can I legally buy hCG online in the UK?",
      answer:
        "For human use, hCG is a prescription-only medicine, so it can only be supplied by a pharmacy against a prescription. Research reagents labelled for laboratory use are a separate category and are what the listings on this page are. A site selling hCG as a medicine without a prescription step is not operating lawfully.",
    },
    {
      question: "How long does hCG delivery take in the UK?",
      answer:
        "Domestic UK research suppliers typically dispatch within 1–3 working days; suppliers shipping from the EU take longer and involve customs. The more important question for hCG is handling rather than speed, because it is a protein and is more sensitive to temperature excursions in transit than a small peptide.",
    },
    {
      question: "What payment method should I use to buy hCG online?",
      answer:
        "Card payment offers the most protection because a charge can be reversed. Bank transfer is irreversible and leaves verification entirely to you beforehand. Crypto-only suppliers have removed every intermediary that could help you, which means reputational trust is the only safeguard left — a weak one in this market.",
    },
    {
      question: "Why do some hCG listings ask me to confirm research use before checkout?",
      answer:
        "Because the research-use-only framing is what separates a reagent sale from a medicine sale legally. A checkbox alone does not achieve that, but a site with consistent RUO labelling, no human-use claims and batch documentation is genuinely in the reagent category. A site with a checkbox and weight-loss marketing is not.",
    },
  ],
  sources: [
    {
      label: "Chorionic Gonadotropin (Human) — BNF monograph and UK prescription-only classification",
      url: "https://bnf.nice.org.uk/drugs/chorionic-gonadotropin/",
    },
    {
      label: "UniProt P01233 — Choriogonadotropin subunit beta (CGB), human; beta chain confers receptor specificity",
      url: "https://www.uniprot.org/uniprotkb/P01233/entry",
    },
    {
      label: "UniProt P01215 — Glycoprotein hormones alpha chain (CGA), human",
      url: "https://www.uniprot.org/uniprotkb/P01215/entry",
    },
  ],
  tableMode: "price",
  tableHeading: "Buy hCG Online UK — Current Listings and Stock",
  rowLimit: 10,
};
