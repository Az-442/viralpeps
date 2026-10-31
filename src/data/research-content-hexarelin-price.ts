export interface ResearchPageContent {
  slug: string;
  compoundSlug?: string;
  compoundSlug2?: string;
  pullQuote?: string;
  quickInfo?: { label: string; value: string }[];
  sections: ResearchSection[];
  faq?: { question: string; answer: string }[];
  references?: string[];
}

export interface ResearchSection {
  title: string;
  body: string;
  table?: { header: string[]; rows: string[][] };
  subsections?: { title: string; body: string }[];
}

// appended by Class C queue day 7 (Hexarelin) — see class-c-article-queue.md
export const hexarelinPriceContent: Record<string, ResearchPageContent> = {
  "hexarelin-uk-price-guide": {
    slug: "hexarelin-uk-price-guide",
    compoundSlug: "hexarelin",
    pullQuote:
      "UK hexarelin runs from £3.95 to £20.00 per milligram — a 5.1-fold spread. The biggest single driver is not the vendor: it is whether you bought a 2 mg vial or a 5 mg vial.",
    quickInfo: [
      { label: "Compound", value: "Hexarelin (INN examorelin), CAS 140703-51-1" },
      { label: "Packs sold", value: "2 mg, 3 mg, 5 mg and 10 mg vials" },
      { label: "Price per mg", value: "£3.95 to £20.00" },
      { label: "Best per-mg value", value: "£3.95/mg — 5 mg vial at £19.75" },
      { label: "2 mg band", value: "£9.95 to £40.00 (£4.98 to £20.00/mg)" },
      { label: "5 mg band", value: "£19.75 to £45.99 (£3.95 to £9.20/mg)" },
      { label: "Same-vendor pack effect", value: "One vendor: 2 mg £11.00 vs 10 mg £40.00 — 3.6× per-mg difference" },
      { label: "Reference mass", value: "887.0 g/mol (PubChem CID 6918297) — not 844" },
    ],
    sections: [
      {
        title: "The Number That Matters Is £ Per mg, Not £ Per Vial",
        body:
          "Hexarelin is sold in vials of 2, 3, 5 and 10 milligrams. A 2 mg vial at £11.00 and a 5 mg vial at £19.75 look like two prices in the same band. They are £5.50 and £3.95 per milligram — a 39% difference for the same peptide.\n\nThe UK market for this compound is unusually pack-fragmented, which makes the per-milligram view more valuable here than for almost any other peptide on this site. There are four pack sizes in play at once, spread across sixteen catalogue rows, and the vendor with the cheapest 2 mg vial is not the vendor with the cheapest per milligram. Anyone comparing sticker prices is comparing boxes.\n\nTwo things to hold in mind through the numbers. First, this is a six-residue peptide — a short, straightforward synthesis. The material cost is low relative to a longer GLP-1 analogue, and a 5.1-fold price spread on a short peptide is a statement about the market rather than the chemistry. Second, the mass on the certificate should be **887.0 g/mol** against CAS 140703-51-1 (PubChem CID 6918297). A certificate reporting 844 is either quoting a different quantity or is wrong, and it is worth asking which before paying a premium next to it.",
      },
      {
        title: "The Full UK Price Table, by Vendor and Pack",
        body:
          "Sixteen catalogue rows for hexarelin, of which fourteen carry a listed price. Two are excluded from the per-milligram arithmetic and flagged: one is out of stock, one has no published price.",
        table: {
          header: ["Vendor", "Pack", "Price", "£ per mg"],
          rows: [
            ["Chroma Peptides", "5 mg", "£19.75", "3.95"],
            ["PeptidesNextDay", "10 mg", "£40.00", "4.00"],
            ["Research Peptides", "2 mg", "£9.95", "4.98"],
            ["Octagon Peptides", "5 mg", "£25.00", "5.00"],
            ["Tide Labs", "5 mg", "£26.90", "5.38"],
            ["Dr P Research", "5 mg", "£26.99", "5.40"],
            ["PeptidesNextDay", "2 mg", "£11.00", "5.50"],
            ["Kensington Labs UK", "5 mg", "£27.95", "5.59"],
            ["Pure Peptides UK", "2 mg", "£12.00", "6.00"],
            ["Bionik Peptides", "2 mg", "£13.00", "6.50"],
            ["VialVerse", "3 mg", "£25.00", "8.33"],
            ["BioPlex Peptides", "5 mg", "£45.99 (out of stock)", "9.20"],
            ["Express Peptides", "2 mg acetate", "£24.99", "12.50"],
            ["Midshire Labs", "2 mg", "£40.00", "20.00"],
          ],
        },
        subsections: [
          {
            title: "The same pack, priced five times apart",
            body:
              "At 2 mg — the pack most of the market sells — the band runs from £4.98 per milligram (Research Peptides, £9.95) to £20.00 (Midshire Labs, £40.00). That is a five- or six-fold difference for the same quantity of the same hexapeptide, on the same day, in the same country. The 5 mg band is tighter: £3.95 to £9.20 per milligram. Most of the spread in this market lives in the smallest pack, where packaging, certificate and delivery are a larger share of the sticker.",
          },
          {
            title: "The cheapest sticker is not the cheapest milligram",
            body:
              "Chroma Peptides at £19.75 for 5 mg is the lowest per-milligram price in the market at £3.95 — and it is not the lowest sticker. Research Peptides at £9.95 is the lowest sticker but the third-lowest per milligram at £4.98, because 2 mg is a small pack. Midshire Labs at £40.00 for a 2 mg vial is £20.00 per milligram, five times Chroma's figure for the same peptide. Express Peptides' 2 mg acetate vial at £24.99 is £12.50 per milligram; the acetate designation describes the salt form and does not by itself justify twice the per-milligram price of a 5 mg vial.",
          },
          {
            title: "The vendor whose own prices disagree most",
            body:
              "PeptidesNextDay sells 2 mg at £11.00 and 10 mg at £40.00. That is £5.50 and £4.00 per milligram on the same shop, same product family, same day — a 27% difference. It is not an error; it is a volume discount, and it shows how much of the market's spread is pack economics rather than vendor economics. The flip side is that buying the 10 mg vial costs £29.00 more in cash but buys five times the material at 27% less per milligram.",
          },
        ],
      },
      {
        title: "Pack Size Is the Biggest Lever in This Market",
        body:
          "Group the table by pack and the structure appears immediately.\n\n**2 mg vials: £9.95 to £40.00, i.e. £4.98 to £20.00 per milligram — a 4.0× spread.**\n\n**5 mg vials: £19.75 to £45.99, i.e. £3.95 to £9.20 per milligram — a 2.3× spread.**\n\nThe ratio of the two numbers is the point. On a per-milligram basis the cheapest 2 mg listing and the cheapest 5 mg listing are within 22% of each other — but the *dearest* end of the 2 mg band is more than twice as expensive per milligram as the dearest 5 mg. The 2 mg market is where sellers price on feel rather than on arithmetic.\n\nNote also that the 5 mg figure at the top of that band, £45.99, is an out-of-stock listing. Excluding it, the 5 mg band is £19.75 to £27.95, or £3.95 to £5.59 per milligram — a 1.4× spread. The 5 mg market is genuinely competitive. The 2 mg market is not.\n\nThe practical consequence follows directly: **if you are choosing a pack size rather than a specific product, the 5 mg vial is the efficient unit in this market.** At £25.00 it is £5.00 per milligram, which beats five of the seven priced 2 mg listings, including ones whose stickers look lower.",
        table: {
          header: ["Pack", "Price band", "Per-mg band", "Spread"],
          rows: [
            ["2 mg", "£9.95 – £40.00", "£4.98 – £20.00", "4.0×"],
            ["3 mg", "£25.00 (one seller)", "£8.33", "—"],
            ["5 mg", "£19.75 – £45.99", "£3.95 – £9.20", "2.3×"],
            ["10 mg", "£40.00 (one seller)", "£4.00", "—"],
          ],
        },
      },
      {
        title: "Where a Second Index Disagrees, and Why",
        body:
          "A separate, competing UK price index reports hexarelin normalised to a 2 mg basis across seventeen suppliers, from **£10.00 to £49.00 with an average of £18.38**. Their floor is within five pence of our cheapest 2 mg listing (£9.95), which is a good sign that both crawls are seeing the same market.\n\nTheir higher bands are harder to reconcile. The same index quotes 5 mg \"from £10.80\" and 10 mg \"from £24.99\". Neither figure appears anywhere in the ViralPeps catalogue, where the cheapest 5 mg is £19.75 and the only 10 mg is £40.00. That does not make either source wrong; it means the two indexes crawl different shop lists, and one of them is seeing vendors the other has not indexed. A 5 mg vial at £10.80 would be £2.16 per milligram — half the cheapest price in this table — and a buyer who wants it should verify the listing directly rather than trust either index.\n\nThe lesson from the disagreement is the usual one. An index, including ours, is a list of prices captured on a date. It is a starting point for comparison, not an authoritative market price. The vendors change, the stock changes, and the two English-language indexes covering this category already differ by a factor of two at the low end of the 5 mg band.",
      },
      {
        title: "Reading a Hexarelin Certificate of Analysis",
        body:
          "For a six-residue peptide the certificate should be simple, and the ways it goes wrong are specific.\n\n**Observed mass against 887.0 g/mol.** The compound is C47H58N12O6. An observed mass near 887 is correct; near 844 is not, and a supplier quoting 844 should be asked what quantity they mean. This is a fast, decisive check, because it is the number a competent lab cannot get wrong and a copy-paste listing can.\n\n**A chromatogram showing one peak.** Hexarelin contains two tryptophans, including the D-2-methyl-substituted residue at position 2 that defines the molecule. Indole oxidation is the commonest degradation route for tryptophan-containing peptides, and the oxidised product is a distinct species — visible on a mass spectrum and on a decent chromatogram. A certificate reporting a purity percentage with no chromatogram has removed the evidence that would confirm the main peak is the only one.\n\n**Purity and net peptide content, both stated and both labelled.** A 5 mg vial is peptide plus counter-ion plus residual water, typically 70 to 90 per cent peptide by mass. A supplier quoting 99% HPLC purity and a supplier quoting 90% net peptide content are describing different things, and a comparison page that lists them side by side is creating a false equivalence. Ask which number you are being given.\n\n**A lot number that matches the vial.** In a market where a 2 mg vial retails below £10, the marginal cost of producing a generic certificate is close to zero. The lot match is the only part of the document with information in it.\n\n**Storage and handling.** One UK supplier states hexarelin as a lyophilised powder stored at −20 °C and notes that it is poorly soluble in neutral water, prepared from DMSO stock for in-vitro work. A listing that offers no solubility or storage statement has told you it does not handle the compound.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "On a per-milligram basis, **£4.00 to £6.00 is the fair band** for hexarelin in the current UK market. That range contains the two cheapest 5 mg listings, the cheapest 2 mg listing, the cheapest 10 mg listing, and the cluster of five-milligram vials between £25 and £28 — which is to say, most of the sensible market.\n\nAbove £8.00 per milligram you are paying a premium that the material does not command: £45.99 for 5 mg, £24.99 for 2 mg of the acetate, £40.00 for a 2 mg vial. Some of those listings may be attached to better documentation; none of them states documentation that would justify twice the market rate, and the price itself carries no information about quality.\n\nBelow £4.00 per milligram — the £19.75 five-milligram listing — there is no reason to assume a problem. A six-residue peptide is genuinely cheap to synthesise, and the bottom of a market like this is where a well-run small operation can compete on price without cutting corners. It is also where documentation is worth checking hardest, because price competition has already removed every other point of differentiation.\n\nNone of this is a claim about any specific vendor's quality. ViralPeps compares prices and lists suppliers; it does not sell hexarelin, does not issue certificates of analysis, and does not vouch for material it has not analysed. What it can do is put the pack-size arithmetic in one place, because that is the decision that moves the number most.",
      },
      {
        title: "How to Verify a Hexarelin Supplier",
        body:
          "Four checks, in the order that eliminates the most options fastest.\n\n**Ask for the mass on the certificate.** The answer should be 887.0 g/mol against C47H58N12O6. A vendor who returns 844, or returns no number, has told you something. This takes one message and rules out more sellers than any other single question in this category.\n\n**Ask for the lot-matched certificate before ordering.** The document for the lot that will ship, not a link to a page of certificates. The response — a specific document versus a template — is more informative than the document's contents, because a template proves only that the supplier once tested something.\n\n**Check the pack arithmetic yourself.** Divide the price by the mass in the vial. If a 2 mg listing is quoted as the best value in a market where 5 mg vials dominate on price per milligram, the arithmetic was not done. The [UK hexarelin comparison page](/compounds/hexarelin) shows the live vendor list with pack sizes so the division is visible without a spreadsheet.\n\n**Look at the supplier, not only the compound.** The [ViralPeps supplier directory](/vendors) carries verification status, delivery experience and TrustScore for every vendor in the catalogue, which filters faster than working through certificates one at a time. It also makes it easy to see a vendor's pricing across several compounds at once — useful, because a shop that is cheap on hexarelin and expensive on everything else is telling you about its stock position rather than its efficiency.\n\nOne last point that belongs in a price guide rather than a research one. Hexarelin is not approved as a medicine anywhere reviewed, and it is a WADA-prohibited substance in the growth hormone secretagogue class. The price you pay should buy material with a traceable lot and a specification a laboratory can verify. If it does not, the saving is not a saving.",
      },
    ],
    faq: [
      {
        question: "What is a fair UK price per mg for hexarelin?",
        answer:
          "Between £4.00 and £6.00 per milligram covers most of the sensible UK market: the cheapest 5 mg vial at £19.75 (£3.95/mg), the cheapest 2 mg vial at £9.95 (£4.98/mg), a 10 mg vial at £40.00 (£4.00/mg) and the cluster of 5 mg vials between £25 and £28 (£5.00 to £5.59/mg). Listings above £8.00 per milligram — such as £40.00 for 2 mg — charge roughly twice the market rate without stating documentation that justifies it.",
      },
      {
        question: "Why is a 5 mg vial cheaper per mg than a 2 mg vial?",
        answer:
          "Because at 2 mg the fixed costs of selling — packaging, certification, shipping — are a large share of the sticker price, so sellers price those vials very differently from one another. The 2 mg band spans £4.98 to £20.00 per milligram (4.0×), while the 5 mg band spans £3.95 to £9.20 (2.3×). One vendor, PeptidesNextDay, sells 2 mg at £11.00 (£5.50/mg) and 10 mg at £40.00 (£4.00/mg) on the same shop.",
      },
      {
        question: "Do UK price indexes agree on hexarelin?",
        answer:
          "Not at the low end of the larger pack sizes. One competing UK index reports a 2 mg average of £18.38 with a floor of £10.00, which is close to our cheapest 2 mg listing of £9.95. But the same index quotes 5 mg from £10.80 and 10 mg from £24.99, while our catalogue bottoms at £19.75 and £40.00 for those packs. The indexes crawl different shop lists, so either figure should be verified against the vendor before ordering.",
      },
      {
        question: "What mass should a hexarelin certificate report?",
        answer:
          "887.0 g/mol, against formula C47H58N12O6 and CAS 140703-51-1 (PubChem CID 6918297). A certificate reporting 844 is quoting a different quantity or is incorrect, and the supplier should be asked which. The certificate should also carry a chromatogram rather than a bare purity percentage, because hexarelin contains two tryptophans that oxidise readily, and an oxidised species is a separate peak rather than a small impurity.",
      },
      {
        question: "Does paying more get better hexarelin?",
        answer:
          "Not on the evidence available. The same six-residue peptide sells from £3.95 to £20.00 per milligram in the UK, and no listing in that range publishes documentation that scales with price. What a higher price can legitimately buy is a lot-matched certificate with an observed mass and a chromatogram, and that is worth asking for directly rather than assuming it travels with a premium. ViralPeps does not sell peptides or issue certificates of analysis and makes no claim about any individual vendor's material.",
      },
    ],
    references: [
      "ViralPeps catalogue data — 16 hexarelin source rows across UK vendors, 31 October 2026 snapshot. Per-mg figures calculated from stated pack mass; out-of-stock and unpriced rows flagged and excluded from band arithmetic.",
      "Competing UK Hexarelin price index — 17 suppliers, 2 mg normalised basis, £10.00 to £49.00, average £18.38. Retrieved 31 October 2026.",
      "Pure Peptides UK hexarelin listing — £12.00 per 2 mg. Retrieved 31 October 2026.",
      "PubChem Compound CID 6918297 (Examorelin) — C47H58N12O6, 887.0 g/mol, CAS 140703-51-1. https://pubchem.ncbi.nlm.nih.gov/compound/6918297",
    ],
  },
};
