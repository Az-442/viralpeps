import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 13 (Gonadorelin) — see class-c-article-queue.md
export const gonadorelinPriceContent: Record<string, ResearchPageContent> = {
  "gonadorelin-uk-price-guide": {
    slug: "gonadorelin-uk-price-guide",
    compoundSlug: "gonadorelin",
    pullQuote:
      "Gonadorelin is one of the cheapest peptides in the UK catalogue and one of the least well specified. The price spread is under £10 a vial — which means the certificate, not the sticker, is the thing that determines whether a listing is good value.",
    quickInfo: [
      { label: "Compound", value: "Gonadorelin (GnRH)" },
      { label: "UK listings tracked", value: "6 supplier entries, 2 mg and 5 mg vials" },
      { label: "Sticker range", value: "£9.75 to £42.99" },
      { label: "Per-mg range", value: "£4.88 to £8.60 per mg" },
      { label: "Cheapest per mg", value: "£4.88 (2 mg vial)" },
      { label: "Most expensive per mg", value: "£8.60 (5 mg vial)" },
      { label: "Spread", value: "About 76% between cheapest and dearest per mg" },
      { label: "Correct unit", value: "£ per mg of peptide, normalised for vial size" },
    ],
    sections: [
      {
        title: "What Price Per mg Actually Measures",
        body:
          "Price per milligram is a division: the sticker price of a vial, divided by the number of milligrams printed on the label. That is all it is. It is a useful division, because it is the only way to compare a 2 mg vial against a 5 mg vial without being misled by the headline number, but it measures one thing and one thing only. It does not measure how much peptide is actually in the vial, how pure it is, or whether it was made to a standard anyone can check.\\n\\nFor gonadorelin the division produces a range of roughly **£4.88 to £8.60 per mg** across the listings this site tracks. The headline prices range from £9.75 to £42.99, which looks like a four-fold spread and is not. Most of that gap is vial size. A 2 mg vial at £9.75 and a 5 mg vial at £34.90 are both unremarkable when converted; a 2 mg vial at £14.00 and a 5 mg vial at £42.99 are both expensive on the same measure.\\n\\nThe number a buyer should carry in their head is **around £5 to £9 per mg**, and anything inside that band is normal for the UK market. The useful analytical work is not on the price sheet. It is in the specification [on the compound page](/compounds/gonadorelin), where the difference between listings lives.\\n\\nOne structural point on gonadorelin specifically: it is a **decapeptide of about 1,182 Da**, which makes it one of the smallest molecules in a typical peptide catalogue. Small peptides are cheap to synthesise per gram, and gonadorelin is genuinely inexpensive material. A listing asking a high per-mg price is not passing on the cost of a difficult synthesis. It is charging for something else, or it is simply not competitive.",
        table: {
          header: ["Vial size", "Typical UK sticker", "Typical £ per mg"],
          rows: [
            ["2 mg", "£9.75 – £14.00", "£4.88 – £7.00"],
            ["5 mg", "£34.90 – £42.99", "£6.98 – £8.60"],
          ],
        },
      },
      {
        title: "Why the Spread Between Suppliers Exists",
        body:
          "In a market where the raw material costs pennies per milligram, a four-fold sticker spread needs an explanation. Four things drive it.\\n\\n**Vial size, first and largest.** This accounts for most of the apparent spread and is not really a spread at all. Larger vials carry a lower per-mg cost almost everywhere, because filling and packaging are fixed costs. A 5 mg vial should be cheaper per milligram than a 2 mg vial from the same supplier, and it usually is.\\n\\n**Verification costs that cannot be faked cheaply.** A supplier who sends every lot for independent HPLC and mass spectrometry pays for it, and passes some of that on. That is the premium a buyer should actively want to pay. The catch is that a certificate of analysis is only worth the lab named on it. A self-issued certificate printed by the supplier costs nothing and establishes nothing.\\n\\n**Packaging and delivery.** Next-day UK delivery, cold-chain options and free-delivery thresholds move the effective price by several pounds per order. On a compound this cheap, delivery can be a larger share of the total than the material itself, and a cheaper vial from a supplier who charges postage may cost more at checkout than a dearer one who does not.\\n\\n**Margin harvesting on low-volume lines.** Gonadorelin is not a high-demand compound. Suppliers who stock it as a niche line sometimes price it to cover the cost of slow stock rotation, which produces listings well above the market without any corresponding difference in quality. The £42.99 listing for a 5 mg vial is the clearest example of this in the current data.\\n\\nWhat does *not* explain a spread on gonadorelin is synthesis difficulty. This molecule has been made commercially for decades and its cost of goods is not a meaningful variable.",
      },
      {
        title: "How to Read a Gonadorelin COA",
        body:
          "A certificate of analysis for gonadorelin should be short, specific and dated. Four things should be present, and two things should make you suspicious.\\n\\n**Present, always.** An **intact mass** measured by mass spectrometry, with the method named and the expected mass stated. For the free peptide this should sit at **1,182.3 Da**; for the acetate salt it will be higher, and the certificate should say which form it is reporting. A certificate that gives only a theoretical formula weight is not reporting a measurement.\\n\\nAn **HPLC purity figure** as a percentage of total peak area, with the detection wavelength stated. Purity above 98% is a normal batch-release specification. A figure of 99.9% with no chromatogram attached is a marketing number.\\n\\nA **lot number and test date** that match the vial in front of you. A certificate without a lot number is a template.\\n\\nThe **name of the testing laboratory**, and ideally an accreditation. This is the single most load-bearing line on the document.\\n\\n**Be suspicious of a sequence string.** Tempting as it is to look for one, a ten-residue sequence is trivially easy to copy from a public record, and its presence proves nothing. It is a legitimate specification field — but it is a *structure* assertion, not a *measurement*, and a certificate that contains only structural assertions and no measured values is decorative.\\n\\n**Be suspicious of a CAS number used as evidence.** Gonadorelin's registry number is 33515-09-2, and it appears correctly on some certificates and incorrectly on others, but in either case it identifies what the material is supposed to be rather than what was actually tested. Correct identity claims and measured identity are different claims, and only one of them catches a mix-up.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "A fair price for gonadorelin in the UK is a price inside the normal band that comes with a lot-specific certificate from a named independent laboratory, and with delivery accounted for.\\n\\nConcretely: **£5 to £9 per mg**, on a vial that arrives with a certificate showing a measured intact mass and an HPLC purity figure, from a supplier whose verification status is recorded somewhere other than their own homepage. Everything inside that band is defensible. Everything above it needs a reason on the certificate, because the synthesis does not justify it.\\n\\nTwo pricing traps specific to this compound are worth naming.\\n\\n**The 2 mg trap.** Small vials have the best per-mg price on paper and the worst economics in practice, because a 2 mg vial is 200 times the mass of a 10 microgram unit and most experimental work will exhaust a single vial quickly. Each new vial is a new lot, and a new lot is a new certificate and a new source of variance. If the work is going to consume more than one vial, buying the larger size is usually cheaper per milligram *and* reduces lot-to-lot variation.\\n\\n**The free-delivery threshold trap.** Several suppliers price delivery into a free-shipping threshold that a single cheek vial does not meet. A £9.75 vial plus £6 postage is a worse deal than a £19 vial with free delivery, and the per-mg division on the listing page will not show it. The [ViralPeps supplier directory](/vendors) records delivery arrangements per vendor so the comparison can be made on a delivered basis rather than a sticker basis.\\n\\nOne thing that should never affect the decision: the presence of a discount code. A code is a price, not a quality signal, and a listing that needs a code to be competitive on a compound this cheap was not competitive to begin with.",
      },
      {
        title: "How to Verify a Supplier",
        body:
          "Five checks, ordered by how quickly they separate a real supplier from a shopfront.\\n\\n**Ask for the lot certificate before you buy, not after.** A supplier with a genuine testing programme can send the certificate for the lot they are shipping. A supplier who cannot produce one on request, or who sends a generic certificate with no lot number, is telling you what their quality system is. This is the highest-value single question in the whole list, and it takes one email.\\n\\n**Check the lab name.** Independent third-party testing means a laboratory that is not the supplier. If the laboratory named on the certificate cannot be found, or is a trading name registered to the supplier, the certificate is self-certification with a letterhead.\\n\\n**Look for the salt form.** Gonadorelin is normally supplied as the acetate. A listing or certificate that quotes 1,182.3 g/mol without saying whether it is the free base or the acetate has not thought carefully about what it is selling, and the same carelessness usually runs through the rest of the documentation.\\n\\n**Check whether they sell gonadorelin as a medicine or as a research chemical, and whether they are clear about which.** The same substance is a licensed medicine in some forms and an unlicensed research reagent in others. A supplier who states plainly that their product is not a licensed medicine is being accurate. One who implies equivalence to a pharmaceutical product is not.\\n\\n**Check the vendor record, not just the listing.** The [ViralPeps supplier directory](/vendors) carries verification status, delivery history and a TrustScore for every vendor in the catalogue, which is a record assembled across suppliers rather than a claim made by one. On a compound this cheap, where the price tells you almost nothing, that record is where most of the decision actually lives.",
      },
      {
        title: "Where the UK Market Sits",
        body:
          "Gonadorelin is a small, mature, low-volume corner of the UK research peptide market, and its pricing reflects that rather than signalling anything about demand.\\n\\n**It is cheap because the molecule is simple.** At roughly 1,182 Da with no unusual modifications beyond the pyroglutamate cap and the C-terminal amide, gonadorelin is conventional solid-phase synthesis work. There is no proprietary process, no difficult purification, no scarce starting material. The cost of goods is low and the wholesale price reflects it.\\n\\n**It is thinly stocked because the customer base is narrow.** Buyers interested in reproductive-axis work are a small subset of the research peptide audience, which is dominated by metabolic and growth-hormone compounds. A supplier who carries gonadorelin is doing so to round out a catalogue rather than to drive volume, and that shows up as erratic stock status: several of the listings this site tracks have been out of stock on recent checks.\\n\\n**Comparison coverage is thin.** A handful of suppliers list the compound at any one time, and the number offering more than one vial size is smaller still. That means the per-mg comparison has fewer data points than for a mainline compound, and a single supplier going out of stock can move the visible cheapest price by a wide margin in a single day.\\n\\n**The practical conclusion.** On a compound with this much price stability, the price difference between the cheapest and the most sensible listing is small in absolute terms — a few pounds on a vial that will be used once. The decision worth spending time on is the specification question: does the supplier measure what is in the vial, and can they prove it. That is where the money effectively is, and it is why the [gonadorelin compound page](/compounds/gonadorelin) shows specification fields alongside prices rather than a price table alone.",
      },
    ],
    faq: [
      {
        question: "What is a fair UK price for gonadorelin?",
        answer:
          "Around £5 to £9 per milligram of peptide, which puts a 2 mg vial at roughly £10 to £14 and a 5 mg vial at roughly £35 to £43. Within that band the price difference between suppliers is a few pounds, so the specification and the certificate matter more than the sticker. Anything above the band needs a documented reason, because the molecule is cheap to synthesise.",
      },
      {
        question: "Why is a 2 mg vial sometimes cheaper per mg than a 5 mg vial?",
        answer:
          "It should not be, and when it is, the small vial is usually being sold at cost as a trial size. The general rule is that larger vials carry a lower per-mg price because filling and packaging are fixed costs. If a supplier's 5 mg vial is materially more expensive per milligram than their 2 mg, that supplier is pricing the larger size with a margin the market does not support.",
      },
      {
        question: "Should a gonadorelin COA show 1,182.3 g/mol?",
        answer:
          "Only if it is reporting the free peptide. Gonadorelin is normally supplied as the acetate salt, which adds roughly 60 Da per acetate molecule to the mass. Either figure can be correct, but the certificate should say which form it is measuring. A certificate quoting the free-base mass for an acetate product has not distinguished the two.",
      },
      {
        question: "Is the cheapest gonadorelin listing the best value?",
        answer:
          "Usually not, because the spread on this compound is small in absolute money terms and the certificate is where the real difference lies. A £9.75 vial with no lot-specific certificate is worth less than a £14 vial that arrives with a measured intact mass and an HPLC chromatogram from a named laboratory. Account for delivery before comparing stickers as well.",
      },
      {
        question: "Why do so few UK suppliers stock gonadorelin?",
        answer:
          "Because demand is narrow. Gonadorelin serves reproductive-axis research, which is a small segment of a market dominated by metabolic and growth-hormone compounds. Suppliers often carry it to complete a catalogue rather than to drive volume, which is why stock status is more erratic than price on this compound and why a listing can disappear without the price having moved first.",
      },
    ],
    references: [
      "PubChem CID 638793 (gonadorelin): molecular formula C55H75N17O13, average mass 1182.3 g/mol, synonym CAS 33515-09-2. Retrieved November 2026.",
      "Belchetz PE, Plant TM, Nakai Y, Keogh EJ, Knobli E. Hypophysial responses to continuous and intermittent delivery of hypothalamic gonadotropin-releasing hormone. Science. 1978;202(4368):631-633. PMID 100883.",
    ],
  },
};
