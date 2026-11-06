import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 14 (GHRP-6) — see class-c-article-queue.md
export const ghrp6PriceContent: Record<string, ResearchPageContent> = {
  "ghrp-6-uk-price-guide": {
    slug: "ghrp-6-uk-price-guide",
    compoundSlug: "ghrp-6",
    pullQuote:
      "Five milligrams of GHRP-6 costs £7.95 from one UK supplier and £49.99 from another. The vials are the same size, the molecule is the same molecule, and the difference is not in the peptide — it is in what each seller is charging you for.",
    quickInfo: [
      { label: "Compound", value: "GHRP-6 acetate, lyophilised" },
      { label: "Market", value: "UK, 32 priced listings across 29 suppliers" },
      { label: "5 mg range", value: "£7.95 to £49.99 — £1.59 to £10.00 per mg" },
      { label: "10 mg range", value: "£12.00 to £55.00 — £1.20 to £5.50 per mg" },
      { label: "Fair band, 5 mg", value: "£1.59 to £2.20 per mg (first nine listings by price)" },
      { label: "Fair band, 10 mg", value: "£1.20 to £1.90 per mg" },
      { label: "Median, 5 mg", value: "£3.20 per mg" },
      { label: "Median, 10 mg", value: "£1.90 per mg" },
    ],
    sections: [
      {
        title: "What Price Per mg Actually Measures",
        body:
          "A GHRP-6 listing gives you two numbers: a sticker price and a fill. Price per milligram is the first divided by the second, and it is the only figure that lets you compare a 5 mg vial with a 10 mg vial, or a cheap small vial with an expensive larger one. Sticker prices on this compound range by more than six times at the same fill, so comparing stickers tells you nothing except which number is bigger.\n\nOn the current UK market there are **32 priced listings across 29 suppliers** of GHRP-6. Twenty-three of them are 5 mg fills, fourteen are 10 mg, and one is a 15 mg. The per-milligram arithmetic produces a very different picture at each fill:\n\n**5 mg** runs from £7.95 (£1.59/mg) to £49.99 (£10.00/mg). **10 mg** runs from £12.00 (£1.20/mg) to £55.00 (£5.50/mg) — but the top of that range is a pen presentation rather than a powder vial, which distorts it. Among powder vials the 10 mg ceiling is £40.00, or £4.00/mg.\n\nThat single observation explains most of what follows: **the 5 mg spread is 6.3× and the 10 mg spread is 3.3× on powder vials alone.** Buying small is where the market is most expensive and least rational.\n\nTwo housekeeping points before the numbers are used. Three listings in the catalogue carry a price with no fill stated in the product URL — Express Peptides, Tide Labs and LeoLab — and those have been assigned the fill stated on their product pages; a price without a fill cannot be compared with anything and is the first thing to resolve before reading further. Two further listings belong to suppliers listed twice under slightly different names (Research Peptides and Research Peptides UK, the same site), and one duplicate pair appears at Dr P Research; those have been counted once each in the supplier totals.\n\nThe [GHRP-6 compound page](/compounds/ghrp-6) holds the live version of this table, since prices move and this article does not.",
        table: {
          header: ["Fill", "Listings", "Cheapest", "Most expensive", "Median per mg"],
          rows: [
            ["5 mg", "23", "£7.95 (£1.59/mg)", "£49.99 (£10.00/mg)", "£3.20"],
            ["10 mg", "14", "£12.00 (£1.20/mg)", "£40.00 (£4.00/mg) powder · £55.00 pen", "£1.90"],
            ["15 mg", "1", "£45.00 (£3.00/mg)", "—", "£3.00"],
          ],
        },
      },
      {
        title: "Why the Spread Is What It Is",
        body:
          "There are five honest reasons for a price spread on a research peptide and one dishonest one. All six are visible on this compound.\n\n**Fill size.** The largest legitimate factor. Filling, labelling, boxing and shipping a vial cost roughly the same whether it holds 5 mg or 10 mg, so the per-milligram price should fall as the vial grows — and on average it does, from a £3.20 median at 5 mg to £1.90 at 10 mg. A supplier whose 10 mg price per milligram is *higher* than their 5 mg is pricing against the curve and has no cost justification for it.\n\n**Testing.** A lot-specific certificate of analysis with measured intact mass and an HPLC chromatogram from a named laboratory costs real money per lot. A generic certificate posted once and never refreshed costs nothing. That difference is worth paying for, and it accounts for part of the gap at the top of the range.\n\n**Presentation.** Express Peptides' £36.00 for 5 mg and £55.00 for 10 mg are both pen presentations — a cartridge and device rather than a bare vial. £7.20 and £5.50 per milligram for a device is a different product, not a more expensive peptide, and it should be compared with other pens rather than with powders.\n\n**Curation premium.** Some suppliers list a modest range and charge consistently more for the narrowing of choice. Nobody has to buy it.\n\n**Positioning.** The top of the market here is not explained by cost. UK Peptides charges £49.99 for a 5 mg vial — 6.3× the cheapest — with no pen, no unusual presentation and no described testing regime that the £7.95 vial lacks. That is a price point, not a cost position.\n\n**The dishonest one is the marketing claim.** GHRP-6 gets sold as the potent member of its family, sometimes with a specific potency comparison against GHRP-2 or ipamorelin. Those comparisons are not supported by the studies they are attributed to — see the companion [GHRP-6 research guide](/research/ghrp-6-research-guide) for the citations that get misused this way. A premium justified by an unsourced fold-difference is the price of a sentence, not of a milligram.",
      },
      {
        title: "The Fair Band, and Where the Outliers Are",
        body:
          "A fair price is not the cheapest price. It is the price at which the material is being sold as a commodity rather than as a story. On this market that band is visible in the data.\n\n**5 mg: £1.59 to £2.20 per mg.** Nine of the twenty-three listings sit in it, spread across eight suppliers: Research Peptides UK at £7.95, PeptidesNextDay at £8.00, Everything Peptides at £8.95, OP Labs and Chilton Labs at £9.50 and £9.95, Peptides Online UK at £9.95, PeptidesX at £9.99, Arma Peptides at £10.00 and HelixCore at £10.99. When nine independent sellers converge inside a 60-pence-per-milligram band, that is what the material costs them.\n\n**10 mg: £1.20 to £1.90 per mg.** Seven listings: Raccoon Peptides at £12.00, Optimus Labs at £12.50, XL Peptides at £12.99, VialVerse at £14.00, Midshire Labs and PeptidesNextDay at £15.00, Tested Peptides at £16.99. Note that the 10 mg band is *lower* per milligram than the 5 mg band, which is the expected direction.\n\n**The step change above the band.** Between £2.20 and £4.60 per milligram the 5 mg market goes from £10.99 to £22.99 with no change in what is being sold. Eight listings sit there: Pioneer Peptides (£15.00), Express Peptides and Pure Peptides UK premium (£16.00), Kensington Labs (£17.90), Dr P Research (£19.99), ApexPure (£21.99), Chroma Peptides (£22.03) and Peptides Lab UK (£22.99). Some of those are buying real testing with the difference. Some are not. From a listing alone you cannot tell which, so the certificate is the tiebreaker.\n\n**The tail.** LeoLab at £30.00, Express Peptides' pen at £36.00, HiPeptides at £39.99 and UK Peptides at £49.99 — £6.00 to £10.00 per milligram for the same hexapeptide that eight other suppliers sell at a fifth of that. Nothing in the listing explains the multiple.\n\n**A £7.20 anomaly worth naming.** Express Peptides sells the same 5 mg pen at £36.00 (£7.20/mg) while their bare 5 mg vial is £16.00 (£3.20/mg). The device more than doubles the per-milligram cost. If a pen is not required for the work, the powder is the same peptide at less than half the rate.",
      },
      {
        title: "How to Read a GHRP-6 Certificate of Analysis",
        body:
          "A certificate of analysis is the only document that connects the vial in your hand to a measurement. Most of the ones in circulation do not do that. Here is what a usable one contains, in the order it matters.\n\n**A lot number that matches the vial.** This is the first test and the one that fails most often. A certificate that does not carry the lot number printed on your vial is a document about some other batch. Suppliers who run a batch lookup — enter the lot, get the certificate — are demonstrating that the certificate is a live process rather than a static PDF.\n\n**Measured mass, with the method.** For GHRP-6 this is not optional. Expected mass for the free peptide is 873.0 g/mol and for the acetate salt it is roughly 60 Da higher per acetate. A certificate should state which form it is reporting and the measured intact mass from mass spectrometry. A certificate with no mass figure cannot distinguish GHRP-6 from GHRP-2 — a peptide 55 daltons lighter that a chromatogram would report at identical purity.\n\n**HPLC purity as a percentage of total peak area, with the wavelength.** Typically 98% or higher, measured at a stated UV wavelength. Two things this does not tell you: whether the material is the right peptide, and whether it is biologically active. Purity is a batch-release measure.\n\n**Test date and laboratory name.** A certificate dated two years ago describes a manufacturing era, not the vial on your desk. A named laboratory is checkable; \"in-house\" is not, and on a UK market of several hundred research-peptide sellers the share that publish a certificate naming themselves as the client at an independent lab is small — a single-digit percentage on the audits that have been published.\n\n**What good practice looks like from the buyer's side.** Ask for the lot number's certificate before ordering, open it, and check three things: the lot matches, the mass is stated with the salt form identified, and the laboratory is one you could look up. If any of the three is missing, the certificate is decoration.",
      },
      {
        title: "What a Fair Price Looks Like, in Practice",
        body:
          "Given the data, the decision is straightforward. Start with the per-milligram figure, then apply three filters in order.\n\n**Filter one: is the price inside the band?** For 5 mg, £1.59 to £2.20 per milligram. For 10 mg, £1.20 to £1.90. Outside the band, the burden of explanation is on the seller, and most listings do not attempt one. Above £4.00 per milligram at 10 mg you are paying for something other than peptide.\n\n**Filter two: is there a fill whose per-milligram price is worse than the smaller fill?** If a supplier's 10 mg is more expensive per milligram than their 5 mg, their pricing is not tracking cost and there is no reason to expect the certificate to be better.\n\n**Filter three: does the certificate satisfy the three checks above?** This is where the band price and the premium price should be separated. If a £22.99 vial and a £9.95 vial both produce a lot-matched certificate with a stated mass and a named laboratory, the extra £13 buys nothing. If only one of them does, it buys the only thing on the list that matters.\n\n**What the saving is worth.** Moving from the median 5 mg price (£3.20/mg, about £16 a vial) to the band price (£1.80/mg, about £9 a vial) saves roughly £7 on every vial. Across a study that uses ten vials, that is £70 — which is more than the difference between a supplier with a certificate lookup and one without.\n\n**The trap the band does not solve.** A listing at band price with no fill stated is not cheap; it is unquantified. Three listings in this catalogue were in exactly that position. The same goes for a listing whose product page has a per-unit option selector the catalogue was not able to read — the displayed price may be for the smallest size. When a price looks too good even for the band, check the fill before believing it.",
      },
      {
        title: "How to Verify a Supplier Before You Buy",
        body:
          "GHRP-6 is cheap to synthesise and easy to mislabel, and the market is crowded — 29 suppliers for one hexapeptide is not a sign of scarcity. Verification is the part of buying that the price cannot do for you.\n\n**Ask for the mass, not just the percentage.** This is the single most useful question for this family, because of the 55-dalton gap to GHRP-2. A supplier who understands their product will have the expected mass to hand without looking it up.\n\n**Check whether the certificate is lot-matched**, as set out above. A generic document is a marketing asset.\n\n**Ask what fill the price refers to.** On this compound the question is live: several listings quote a price with no mass in the URL, and the answer changes the per-milligram figure by a factor of two.\n\n**Treat \"lab tested\" as unverified.** The phrase appears on most listings in the catalogue, which means it distinguishes almost nothing on its own. It becomes evidence only when it points at a specific, lot-numbered document from a named laboratory.\n\n**Check the financing of the recommendation.** Some of the most detailed writing about this compound sits alongside affiliate links to services that do not stock it. The pharmacology can be accurate and the commercial framing still can't be trusted.\n\n**Check the anti-doping position.** GHRP-6 is on the WADA Prohibited List and barred at all times. A supplier marketing in ways that ignore this is a supplier whose listings may not survive a regulatory look, and continuity of supply matters mid-study.\n\nThe [UK supplier directory](/vendors) carries verification and delivery data for every vendor in this catalogue, including TrustScore and payment-method coverage, which is the fastest way to separate a listing from a business.",
      },
      {
        title: "The Marketing Premium You Are Paying For",
        body:
          "There is a pattern in how this compound is written about that maps directly onto how it is priced, and it is worth naming plainly.\n\nGHRP-6 is sold as the original — the secretagogue that started the field, the strongest releaser, the one with the most human data. Each of those statements has a real basis and none of them is a reason to pay £10 per milligram. The human data is about hormone release in controlled settings; it does not extend to any outcome. The potency claim is the weakest of the three, because the comparisons it rests on are in vitro and frequently misattributed.\n\nThe material reality is duller. GHRP-6 is a hexapeptide that has been synthesised commercially for over two decades, whose per-milligram cost to a supplier is low enough that nine independent UK sellers converge within 60 pence of each other. A sticker of £49.99 for 5 mg is not reflecting the cost of a scarce molecule. It is reflecting the fact that enough buyers assume price correlates with quality that a high price can function as a claim.\n\nThe same arithmetic applies at the other end. The £7.95 vial and the £49.99 vial contain the same molecule at the same formula and the same mass. The difference between them is a certificate you have not read and a marketing page you have.\n\nSo: normalise to the milligram, buy inside the band, and spend the difference on a supplier whose lot numbers resolve to a real document.",
      },
    ],
    faq: [
      {
        question: "What is a fair price for GHRP-6 in the UK?",
        answer:
          "Around £1.59 to £2.20 per milligram for a 5 mg vial, which is roughly £8 to £11, and £1.20 to £1.90 per milligram for a 10 mg vial, which is roughly £12 to £19. Nine independent suppliers converge on the 5 mg band, which is why it is a reasonable benchmark rather than the floor.",
      },
      {
        question: "Why is a 5 mg vial sometimes more expensive per mg than a 10 mg vial?",
        answer:
          "It should be. Filling and shipping costs are largely fixed, so the larger fill normally carries the lower per-milligram price. On the current UK market the 10 mg median is £1.90 per mg against £3.20 at 5 mg. When the relationship reverses within a single supplier, their pricing is not tracking cost.",
      },
      {
        question: "Should a GHRP-6 certificate of analysis say 873.0 g/mol?",
        answer:
          "Only if it is reporting the free peptide. UK vials normally contain GHRP-6 acetate, and the acetate adds roughly 60 Da per acetate molecule to the free-base mass. Either figure can be correct, but a certificate that does not state which form it measured has not resolved the question.",
      },
      {
        question: "Is the cheapest GHRP-6 the worst value?",
        answer:
          "Not necessarily. On this compound the cheapest listings are inside the band where nine suppliers independently converge, which is what a commodity price looks like. The more common problem is at the top of the range, where a £49.99 vial is six times the cheapest with no described testing regime to justify it.",
      },
      {
        question: "Why do some UK suppliers charge £10 per mg for GHRP-6?",
        answer:
          "Positioning rather than cost. The peptide is cheap to synthesise and widely available, and the UK market's fair band sits near £1.60 to £2.20 per milligram at 5 mg. A £10 rate is a price point, and a buyer should expect a specific, checkable reason for it — usually in the form of a named-laboratory certificate — before treating it as a quality signal.",
      },
    ],
    references: [
      "ViralPeps catalogue data — 32 priced GHRP-6 listings across 29 suppliers, November 2026 snapshot. Three listings with no fill in the product URL were resolved against their product pages; two suppliers listed twice under variant vendor names were deduplicated. Pen presentations reported separately from powder vials.",
      "PubChem CID 9919153 (growth hormone releasing hexapeptide / GHRP-6): molecular formula C46H56N12O6, average mass 873.0 g/mol. Retrieved November 2026.",
      "PubChem CID 6918245 (pralmorelin / GHRP-2): average mass 818.0 g/mol — the 55-dalton separation from GHRP-6 used in the mass-versus-purity argument. Retrieved November 2026.",
    ],
  },
};
