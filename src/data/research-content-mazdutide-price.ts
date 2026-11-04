import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 12 (Mazdutide) — see class-c-article-queue.md
export const mazdutidePriceContent: Record<string, ResearchPageContent> = {
  "mazdutide-uk-price-guide": {
    slug: "mazdutide-uk-price-guide",
    compoundSlug: "mazdutide",
    pullQuote:
      "Eight UK listings, every one of them a 10 mg vial, and the price per milligram runs from £2.80 to £11.10 — a 3.96× spread on a product whose label is identical. At that ratio the price is not telling you about the peptide. It is telling you which supplier you are dealing with.",
    quickInfo: [
      { label: "Compound", value: "Mazdutide (LY3305677 / IBI362)" },
      { label: "Market", value: "UK, 8 suppliers, 8 listings" },
      { label: "Common strength", value: "10 mg lyophilised vial" },
      { label: "Sticker range", value: "£27.99 to £110.99" },
      { label: "Cheapest per mg", value: "£2.80/mg (PeptX, £27.99)" },
      { label: "Dearest per mg", value: "£11.10/mg (BioPlex, £110.99 — out of stock)" },
      { label: "Average sticker", value: "£66.10 across the eight listings" },
      { label: "Median sticker", value: "Approximately £58.95" },
    ],
    sections: [
      {
        title: "What Price Per mg Means Here",
        body:
          "Price per milligram is the vial price divided by the milligrams of peptide in the vial. For a single unblended peptide it is the only sensible unit, because two vials of the same stated strength contain the same nominal quantity of the same substance, and dividing by weight removes the size difference that otherwise makes a 5 mg vial and a 10 mg vial impossible to compare.\n\nMazdutide is unusually clean in this respect. Every one of the eight UK listings currently tracked is a 10 mg lyophilised vial. There is no blend ratio to unwind, no IU conversion and no ambiguity about what the milligram refers to. A 10 mg vial is 10 mg. That means the comparison is as close to like-for-like as this category ever gets, and the only variable left is the price.\n\nThat is what makes the spread worth examining. When the specification is genuinely identical across listings and the price still varies by a factor of four, the difference has to be explained by something other than the product. It is explained by supplier positioning, testing depth, sourcing route and, in at least one case, by a listing that may not be offering what its price implies.\n\nOne caution before the numbers: price per milligram assumes the vial contains the stated quantity at a useful purity. It does not verify either. A listing that cannot produce a certificate of analysis for the batch is not a cheaper source of mazdutide; it is a source of an unverified powder at a low price. The arithmetic below is a starting filter, not an answer.",
      },
      {
        title: "The UK Market in Numbers",
        body:
          "ViralPeps currently tracks eight UK suppliers listing mazdutide, all of them 10 mg vials. The spread runs from £27.99 at the bottom to £110.99 at the top, against an average of £66.10 and a median of roughly £58.95.\n\n| Supplier | Price | Per mg | Stock | Lab tested |\n|---|---|---|---|---|\n| PeptX | £27.99 | £2.80 | In stock | No flag |\n| Raccoon Peptides | £49.95 | £5.00 | In stock | Yes |\n| VialVerse | £52.00 | £5.20 | In stock | Yes |\n| Chilton Labs | £55.89 | £5.59 | In stock | Yes |\n| Peptides UK 4U | £62.00 | £6.20 | In stock | Yes |\n| HiPeptides | £79.99 | — | In stock | Yes |\n| UK Peptides | £89.99 | — | In stock | Yes |\n| BioPlex Peptides | £110.99 | £11.10 | Out of stock | Yes |\n\nTwo rows resist a per-milligram figure on the current listing data. HiPeptides and UK Peptides both list mazdutide without a parseable strength on the comparison row, and UK Peptides prices by strength elsewhere in its catalogue at £89.99 for 5 mg and £109.99 for 10 mg. A listing without a stated strength cannot be converted and therefore cannot be ranked on value — it is not cheap, it is unmeasurable.\n\nThe out-of-stock row is the highest price on the page. BioPlex at £110.99 is £11.10 per milligram, and it is not available. An unavailable listing should not anchor anyone's expectation of what mazdutide costs; it should be excluded from the comparison entirely, or at most treated as an upper bound on what the market will bear.\n\nThat leaves a real in-stock band of £27.99 to £89.99, which is still a 3.2× spread. And the distribution has a visible shape: four suppliers cluster between roughly £50 and £62, which is where the market appears to settle when a supplier is neither trying to undercut nor positioning as premium. The [mazdutide compound page](/compounds/mazdutide) records the strength, format and stock status of every listing we track, and it updates when suppliers change prices, which the table above cannot.",
      },
      {
        title: "Why the Spread Is What It Is",
        body:
          "Four things account for almost all of it, and none of them is the cost of the peptide itself.\n\n**Sourcing route and batch size.** Mazdutide is a large, heavily modified peptide — 4,476 Da with a fatty-acid side chain — and that makes it materially harder to synthesise than a short sequence. A supplier buying a large batch from a Chinese contract manufacturer amortises cost differently from one buying small quantities through a reseller. The four-fold spread is roughly the spread between direct-from-manufacturer purchasing and two-step distribution.\n\n**Whether testing is done at all, and at what depth.** A reverse-phase HPLC purity run costs money; mass-spectrometry identity confirmation costs more; endotoxin testing on a lyophilised peptide intended for laboratory work costs more again. A supplier charging £49.95 may be testing identity and nothing else, or pooling a manufacturer's certificate for a batch it never saw. A supplier charging £79.99 may be running an independent assay on the lot in the vial. Those are not the same product, and the £30 difference is roughly what the second option costs to provide.\n\n**Mazdutide's mass band makes identity testing non-optional.** At 4,476 Da the compound sits within a few hundred daltons of semaglutide, survodutide and tirzepatide. A mass number detached from a named compound and a named batch does not tell you which of those four molecules is in the vial. Mislabelling inside that band is a realistic failure mode rather than a theoretical one, and it is precisely what mass-spec identity confirmation on a lot-specific certificate exists to rule out. A supplier who cannot show you that has not verified the most likely error in this product category.\n\n**Positioning and the price of visibility.** The cheapest listing in this UK market has no laboratory-test flag against it, while several suppliers priced £20 to £30 higher do. That pattern recurs across this site and should be read literally: the low price and the absent test are usually the same decision reported twice.",
      },
      {
        title: "How to Read a Mazdutide Certificate of Analysis",
        body:
          "A certificate is only useful if it is specific to the vial you receive. Six things to check, in order.\n\n**1. Lot number matching the vial.** The certificate must carry the same lot or batch identifier printed on the vial you were sent. A generic certificate for \"mazdutide 10 mg\" with no lot number is a marketing document. This is the single most common failure and it invalidates everything below it.\n\n**2. The name, consistently.** Because the compound carries three names, a certificate should identify it in a way that matches what you ordered. A certificate naming IBI362 for a vial sold as mazdutide is not fatal — they are the same molecule — but it tells you the supplier is passing through someone else's document rather than issuing its own.\n\n**3. HPLC purity with the method stated.** A percentage without the method, column and detection wavelength is not a measurement you can assess. Look for reverse-phase HPLC with the gradient and wavelength given, and a chromatogram rather than just a number.\n\n**4. Mass-spectrometry identity.** This is the field that matters most for mazdutide specifically. The observed mass should be reconciled against the expected intact mass of approximately 4,476 Da, on the basis stated. Check whether the certificate explains how the mass was assigned. Given the proximity of semaglutide, survodutide and tirzepatide in mass, an observed-mass figure with no assignment basis is weak evidence.\n\n**5. Net content versus label claim.** A 10 mg label should be supported by a quantitative assay, not merely an identity confirmation. A vial can contain the right molecule at the wrong quantity, and identity testing cannot detect that.\n\n**6. Endotoxin and sterility, reported separately.** These are distinct quality attributes from chemical purity and should be reported independently where tested. A high HPLC purity says nothing about either.\n\nA certificate that covers items 1, 3 and 4 is a genuine analytical document. One that covers only a purity percentage and a picture of a vial is not.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "Working from the eight listings, the market's own clustering is the most useful guide. Four suppliers sit between £49.95 and £62.00 for a 10 mg vial, which converts to roughly £5.00 to £6.20 per milligram. That band is where a supplier can plausibly be buying at reasonable scale, testing at least identity and purity, and still making a margin. It is a defensible fair price.\n\nBelow that band, the arithmetic gets harder to justify honestly. A £27.99 vial is £2.80 per milligram — less than half the cluster and roughly a quarter of the top of the range. Mazdutide is not a cheap molecule to make. A price at that level is achievable in principle through very large-scale direct purchasing, but it is equally consistent with a smaller fill, an unverified batch or a certificate belonging to a different lot. It is not a reason to avoid the supplier; it is a reason to demand the lot-specific documentation before treating the price as real. If a supplier can produce items 1, 3 and 4 from the checklist above, £27.99 is a genuinely good price. If it cannot, the £27.99 was never the price of mazdutide.\n\nAbove roughly £80, the extra money is buying something other than the peptide. At £89.99 to £110.99 the premium over the cluster is 45% to 79%, and there is no published analytical reason a 10 mg mazdutide vial should cost that. It may buy faster domestic dispatch, better packaging, a named UK laboratory on the certificate or simply a brand position. Those have value. They are not per-milligram value, and a comparison that does not separate them is comparing service levels while pretending to compare molecules.\n\nOne structural point that applies regardless of price. Whatever the vial costs, it is not the Chinese-approved pharmaceutical. That product is a formulated medicine assessed by a regulator, and it is not legally available in the UK. A research reagent at any price is a laboratory material with a different manufacturing and release record, and no clinical result transfers to it.",
      },
      {
        title: "How to Verify a Supplier Before You Buy",
        body:
          "Five checks, in the order that eliminates candidates fastest.\n\n**Check the certificate against the lot, not the website.** Ask for the certificate for a specific lot number before ordering, then confirm the number on the vial matches when it arrives. A supplier who cannot supply a lot number before purchase does not have lot-specific testing to show.\n\n**Check the mass-spec identity field specifically.** For mazdutide this is the highest-value single check, because of the mass-band problem described above. A supplier who reports only HPLC purity for a 4,476 Da peptide in a crowded mass band has not addressed the most likely error.\n\n**Check whether the strength is stated at all.** A listing that will not state milligrams cannot be compared and cannot be checked on delivery. Treat an unstated strength as a red flag rather than a rounding detail.\n\n**Check the TrustScore and what it is built on.** A high score reflects a combination of verification signals, not a guarantee. A score of zero does not mean a bad supplier — it often means a new one that has not been assessed yet. Use it to decide how much documentation to demand, not as a substitute for demanding it.\n\nThe [vendors directory](/vendors) lists every UK supplier we track with its verification status, and the [mazdutide compound page](/compounds/mazdutide) shows which of them currently stock it and at what price. Checking both before ordering is faster than any individual supplier's own claims.\n\n**Finally, check the arithmetic in both directions.** A price far below the cluster and a price far above it are both signals, for different reasons. The middle of the market is not automatically safe, but a supplier that has to explain nothing about why it is cheap or expensive is usually a supplier that has not thought about either.",
      },
    ],
    faq: [
      {
        question: "How much does mazdutide cost in the UK?",
        answer:
          "For a 10 mg vial, tracked UK listings run from £27.99 to £110.99, an average of £66.10 and a median of about £58.95. Excluding the one out-of-stock listing, the in-stock range is £27.99 to £89.99, or roughly £2.80 to £9.00 per milligram.",
      },
      {
        question: "Why is mazdutide priced higher than a typical research peptide?",
        answer:
          "It is a large modified peptide at 4,476 Da with a fatty-acid side chain, which makes synthesis harder and more expensive than a short sequence. That sets a floor. The spread above that floor is driven by sourcing route, testing depth and supplier positioning rather than by the molecule.",
      },
      {
        question: "Is a £27.99 vial of mazdutide too cheap to be genuine?",
        answer:
          "Not automatically, but it is cheap enough that the documentation has to do the work. Ask for the lot-specific certificate with HPLC purity, mass-spec identity and net content before treating it as a real price. If those exist for the batch, the price is genuine; if they do not, the price is not for verified mazdutide.",
      },
      {
        question: "What should a mazdutide certificate of analysis include?",
        answer:
          "A lot number matching the vial, reverse-phase HPLC purity with the method stated, mass-spectrometry identity reconciled against an expected intact mass of approximately 4,476 Da, quantitative net content against the label claim, and endotoxin and sterility reported separately where tested.",
      },
      {
        question: "Why does mass-spec identity matter more for mazdutide than for other peptides?",
        answer:
          "Because at 4,476 Da it sits within a few hundred daltons of semaglutide, survodutide and tirzepatide. A mass figure with no named compound and no named batch cannot distinguish between them, so mislabelling within that band is a realistic risk that only lot-specific mass confirmation rules out.",
      },
      {
        question: "Does ViralPeps sell mazdutide or issue certificates?",
        answer:
          "No. ViralPeps is a comparison site. It does not sell peptides and does not issue certificates of analysis. It links out to UK supplier listings for in-vitro research use only.",
      },
    ],
    references: [
      "ViralPeps UK price data for mazdutide, 8 tracked supplier listings, retrieved 4 November 2026 from viralpeps.co.uk/compounds/mazdutide.",
      "Molecular identity verified against PubChem compound record CID 167312357 (formula C207H317N45O65, average mass 4,476 Da, CAS synonym 2259884-03-0), retrieved November 2026.",
      "Shirley M. Mazdutide: First Approval. Drugs. 2025;85(12):1621-1627. PMID 41028652.",
    ],
  },
};
