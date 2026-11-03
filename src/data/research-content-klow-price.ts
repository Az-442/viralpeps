import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 11 (KLOW) — see class-c-article-queue.md
export const klowPriceContent: Record<string, ResearchPageContent> = {
  "klow-uk-price-guide": {
    slug: "klow-uk-price-guide",
    compoundSlug: "klow",
    pullQuote:
      "At 80 mg, UK KLOW runs from £52.00 to £143.20 a vial — £0.65 to £1.79 per milligram. A 2.75× spread for a preparation whose four components are identical on every label. The price is not telling you about the peptide. It is telling you about the supplier.",
    quickInfo: [
      { label: "Compound", value: "KLOW (BPC-157, GHK-Cu, TB-500, KPV)" },
      { label: "Market", value: "UK, 65 catalogue sources tracked" },
      { label: "Common strength", value: "80 mg co-lyophilised vial" },
      { label: "Sticker range (80 mg)", value: "£52.00 to £143.20" },
      { label: "Cheapest per mg", value: "£0.65/mg (VialVerse, £52.00)" },
      { label: "Dearest per mg", value: "£1.79/mg (PepNOVA, £143.20)" },
      { label: "Median sticker (80 mg)", value: "Approximately £75.00" },
      { label: "Correct unit", value: "£ per mg of total peptide — never per component" },
    ],
    sections: [
      {
        title: "What Price Per mg Means for a Blend",
        body:
          "For a single peptide, price per milligram is straightforward: divide the vial price by the milligrams in the vial. A 10 mg vial at £40 is £4.00 per mg, and that number is comparable across every supplier selling the same 10 mg material.\n\nA blend breaks one assumption in that calculation. The milligrams on a KLOW label are the sum of four different peptides, and the four are not present in equal amounts. In the standard 80 mg KLOW configuration, GHK-Cu accounts for about 50 mg and BPC-157, TB-500 and KPV about 10 mg each. So £75.00 for an 80 mg vial, divided by 80, gives £0.94 per mg of total peptide — but you are not getting 80 mg of any one substance, and the 80 mg you are paying for is 62.5 percent the cheapest of the four to produce.\n\nThat has a direct consequence. KLOW's headline price per mg is dominated by GHK-Cu, which is inexpensive as a raw material precisely because it is a tripeptide — three amino acids — rather than a 15-residue or 43-residue sequence. A blend priced by total milligrams is therefore priced mostly by its bulkiest, cheapest component. Two suppliers offering the same 80 mg blended total can be offering materially different value if their ratios differ.\n\nThe correct unit for KLOW is **£ per mg of total peptide, with the ratio stated alongside it**. Price per mg alone is not wrong, but it is incomplete, and a comparison that omits the ratio is comparing two different products while calling them the same thing.",
      },
      {
        title: "The UK Market in Numbers",
        body:
          "ViralPeps currently tracks 65 catalogue sources for KLOW from UK and UK-facing suppliers. The overwhelming majority are 80 mg co-lyophilised vials, which makes them directly comparable, and the spread across that group is substantial.\n\nAt the bottom: VialVerse at £52.00, Optimus Labs at £52.50, Raccoon Peptides at £52.90, Nilah Labs at £53.95. At the top of the 80 mg group: PepNOVA at £143.20, PeptideLabUK at £119.99, Peptides Lab UK at £112.00, and £110.00 from both British Peptide Labs and BuyReta.\n\nThe median sits at roughly £75.00 — a figure that several suppliers hit almost exactly, including Bionik Peptides, Midshire Labs, Precision Peptides, Peptide Shop UK and the 80 mg listings from Aegis Peptides at £79.99. There is a visible clustering effect around £75 to £80, which is where suppliers appear to price when they are not attempting to undercut or to position as premium.\n\nConverted to price per milligram at 80 mg, the range is £0.65 to £1.79. That is a 2.75× spread for a product described identically on every listing: four peptides, same ratio, same total mass, same stated purity threshold.\n\nTwo outliers break the 80 mg pattern in the opposite directions. NovaVitality lists a 70 mg product at £75.00 — that works out at £1.07 per mg, worse value per milligram than the median 80 mg vial, and 70 mg is the three-peptide GLOW total, meaning the listing is a different formulation sold under a related name. Peptide Global lists 160 mg at £160.00, which is £1.00 per mg and therefore only slightly above the median despite the much larger absolute price. Buying the larger vial does not reliably buy a better rate.\n\nA small number of listings state no strength at all — Dr P Research at £62.99, Tide Labs at £84.99, Express Peptides at £84.00, among others. Those cannot be converted to a per-milligram figure, which means they cannot be compared on value at all. A listing without a stated strength is not a cheaper option; it is an unmeasurable one. The [KLOW compound page](/compounds/klow) records the strength and format of every product we track, which is why it is the first place to look before comparing a single price.",
      },
      {
        title: "Why the Spread Is What It Is",
        body:
          "A 2.75× spread usually indicates one of four things. In the KLOW market all four are present.\n\n**Raw material sourcing.** The four components are sourced separately before co-lyophilisation, and they vary enormously in cost. GHK-Cu is a tripeptide. BPC-157 is 15 residues. TB-500 derives from a 43-residue protein. A supplier buying GHK-Cu from a bulk Chinese manufacturer and filling it into an 80 mg blend is operating on a very different cost base from one buying small certified lots. Because GHK-Cu dominates the mass, that single sourcing decision moves the total price more than anything else in the vial.\n\n**Testing depth.** A single HPLC purity run on the finished blend is cheap. A panel that tests four components independently — four HPLC runs, four mass-spec identity confirmations, plus a net-content assay — costs several times more per batch. Some suppliers publish the full panel; many publish a single purity percentage. The difference is real cost, and it shows up in the price.\n\n**Presentation and format.** An 80 mg pen format commands a premium: Aegis Peptides lists £109.99 for the pen against £79.99 for the vial, and N&A lists £70.00 for the pen against £60.00 for the vial with both out of stock at the time of checking. Delivery format is a legitimate differentiator, and it is not a difference in the peptide.\n\n**Positioning.** Some suppliers price at £75 because that is the market rate and others price at £143 because a higher number signals a different tier to their audience. Nothing in the product differentiates the two.\n\nWhat is conspicuously absent from that list is any plausible mechanism by which a £143 vial is chemically better than a £52 one. Price signals sourcing and testing depth; it does not signal potency, because potency in a blend preparation is not a measureable property of the product as a whole.",
      },
      {
        title: "How to Read a KLOW Certificate of Analysis",
        body:
          "A COA for a blend needs more than a COA for a single peptide, and most certificates in this market do not provide the extra.\n\n**Purity is necessary but least informative.** A 99 percent figure from HPLC on a four-component mixture tells you the chromatogram was clean. It does not tell you which peaks were which, or in what quantities. A blend with the wrong ratio can produce an excellent purity number.\n\n**Per-component identity is the baseline.** Look for four separate lines confirming that BPC-157, GHK-Cu, TB-500 and KPV are each present, ideally with mass-spec confirmation per component rather than one run on the mixture. This is more than many suppliers publish.\n\n**Net content is the test that matters for proportion.** A quantitative figure for how many milligrams of each component were measured, which you can then add up and check against the label. This is where certificates become revealing.\n\nTake a live example. One supplier's listing specifies GHK-Cu 50 mg, BPC-157 10 mg, TB-500 10 mg and KPV 10 mg for an 80 mg total. The certificate panel on the same page reports measured net content of GHK-Cu 67.05 mg, KPV 13.89 mg, BPC-157 10.37 mg and TB-500 8.63 mg. Add those: 99.94 mg. The label says 80.\n\nThe deviations are individual as well as aggregate. GHK-Cu measures 34 percent above label, KPV 39 percent above, BPC-157 3.7 percent above, and TB-500 13.7 percent below. The page presents both numbers without reconciling them, so a buyer cannot tell whether the label is wrong, whether the certificate measured total mass including counter-ions, or whether something else is going on.\n\nThat is not proof of a bad product — it may well be a perfectly good one. It is proof that a certificate alone is not verification. Reading a COA means doing the subtraction, and a certificate that contradicts its own product page has not been checked by anyone before publication.\n\n**Checklist for a KLOW COA:** the lot number matches the physical vial; four components are each identified; mass-spec identity per component; a net-content figure that sums to the stated total; a named testing laboratory and report reference; and a date that post-dates the batch. If any of those are missing, the certificate is a document, not a verification.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "Given the data above, a fair price for an 80 mg KLOW vial in the UK is in the £55 to £80 band — roughly £0.69 to £1.00 per milligram of total peptide.\n\nThe floor is meaningful. Below about £52 you are outside the observed market entirely, and the most likely explanations are a different composition, a smaller stated strength, or a supplier with no testing at all. The four components cost money to source and co-lyophilise; a price well under the market low is a specification question, not a bargain.\n\nThe ceiling is softer. Prices above £100 exist and are widely listed, but nothing published about those products distinguishes them from the £60 ones except the certificate depth and the supplier's marketing. If a premium listing publishes four-component identity verification plus a reconciled net-content assay, the premium is defensible as testing cost. If it publishes the same single purity percentage as everyone else, the premium is positioning.\n\nThe most useful thing to buy at the median is not a cheap vial but a comparable one. A £75 vial with a full per-component panel and reconciled net content is better value than a £52 vial with a purity percentage and nothing else, even though the price per milligram is worse, because the second product has not told you what it is.\n\nThe [KLOW compound page](/compounds/klow) lists every UK product with its strength, format and price so the arithmetic above can be repeated on current listings rather than on the figures in this article.",
      },
      {
        title: "How to Verify a Supplier",
        body:
          "Five checks, in order of how much they tell you.\n\n**Does the listing state a strength?** An 80 mg figure, or an explicit component breakdown. A KLOW listing without a stated total is not comparable to anything and should be treated as a disqualification until the information appears.\n\n**Does it state the ratio?** GHK-Cu 50 / BPC-157 10 / TB-500 10 / KPV 10 is the common configuration. A listing that states 80 mg but not the composition has not described its product, and a 70 mg or 160 mg listing is a different formulation until proven otherwise.\n\n**Is the certificate lot-matched and reconciled?** The lot number on the certificate should appear on the vial you receive, and the net content should add up to the label. See the arithmetic above for what unreconciled looks like.\n\n**Is the supplier findable outside its own shop?** A company with a registered UK address, a phone number that is answered, and a trading history longer than the current promotion is a different risk profile from a site that appeared with the product. Our [vendor directory](/vendors) records which suppliers we track, how long they have been listed and what their TrustScore reflects.\n\n**Does it sell to researchers or to consumers?** Language matters. A shop describing outcomes in people, offering protocol guidance, or using testimonials from customers is marketing a medicine, and its compliance posture tells you something about how it handles the rest of its operations.\n\nNone of those checks guarantees anything. Together they filter out the largest share of the failures we see recorded against UK peptide suppliers.",
      },
      {
        title: "Buying the Components Separately Instead",
        body:
          "KLOW exists because buying four vials is inconvenient. Whether it is cheaper depends entirely on the quantities.\n\nA typical 80 mg KLOW vial supplies 50 mg GHK-Cu plus 10 mg each of BPC-157, TB-500 and KPV. Bought separately, the GHK-Cu is the large line item and the other three are small vials that are often sold in 5 mg or 10 mg sizes. In the UK market, small vials carry a disproportionate per-milligram cost because packaging, testing and shipping are fixed costs per vial rather than per milligram — so four small vials can easily total more than one blend.\n\nThe blend also guarantees a fixed ratio. Separate vials give you control over the ratio, which matters if the 1:5:1:1 configuration is not what you actually want. That flexibility is worth paying for if you have a specific reason to deviate; it is not worth paying for if you simply want the standard mix in one vial.\n\nWhat separate purchase does guarantee is provenance per component: four certificates, each about one substance, each verifiable on its own terms. A blend certificate is a claim about a mixture and is harder to check. Researchers who care about per-component traceability sometimes pay more for four vials specifically to get that.\n\nThe blend's real advantage is concentration and convenience, not price. Treat any listing that markets a blend as the cheap option with the same care you would apply to a multi-pack discount in any other category.",
      },
    ],
    faq: [
      {
        question: "How much does KLOW cost in the UK?",
        answer:
          "An 80 mg co-lyophilised KLOW vial runs from about £52.00 to £143.20 across the 65 UK sources we track, with a median near £75.00. Converted to price per milligram of total peptide that is £0.65 to £1.79, a 2.75× spread for a product with an identical stated composition.",
      },
      {
        question: "Why is one KLOW vial £52 and another £143?",
        answer:
          "Sourcing, testing depth, delivery format and positioning. The larger share of the mass is GHK-Cu, a tripeptide, so the cost of the GHK-Cu lot drives the total more than anything else. Suppliers publishing four-component identity testing plus net content spend more per batch than those publishing a single purity percentage. Nothing published suggests the £143 vial is chemically superior.",
      },
      {
        question: "Is price per mg the right way to compare KLOW?",
        answer:
          "It is the right starting point but not sufficient on its own. Because the 80 mg total is split roughly 50/10/10/10 across four peptides, price per mg is dominated by the cheapest component by mass. Always state the ratio alongside the per-milligram figure, and treat 70 mg and 160 mg listings as different formulations until the composition proves otherwise.",
      },
      {
        question: "What should a KLOW certificate of analysis include?",
        answer:
          "A lot number that matches the vial, per-component identity for all four peptides with mass-spec confirmation, and a quantitative net-content figure that sums to the stated total. Purity percentage alone does not establish that the blend is correctly proportioned, and several UK certificates omit net content entirely.",
      },
      {
        question: "Is it cheaper to buy the four peptides separately?",
        answer:
          "Usually not, because small vials carry disproportionately high fixed costs per vial — packaging, testing and shipping are per-vial rather than per-milligram. The blend's advantage is convenience and a fixed ratio rather than price. Buying separately gives per-component certificates and control over the ratio, which some researchers value more than the saving.",
      },
    ],
    references: [
      "UK pricing and strength data compiled from ViralPeps' tracked catalogue of 65 KLOW sources (src/data/compounds.json). Prices are sticker prices at the time of checking and change frequently.",
      "Molecular identity for the four components verified against PubChem: CID 9941957 (BPC-157, CAS 137525-51-0), CID 71587328 (prezatide copper, CAS 89030-95-5), CID 45382195 (thymosin beta-4 parent), CID 125672 (Msh 11-13, CAS 67727-97-3).",
      "Net-content reconciliation worked in the COA section uses figures published on a live UK-facing supplier listing at the time of writing; the arithmetic sums to 99.94 mg against a stated 80 mg label.",
    ],
  },
};
