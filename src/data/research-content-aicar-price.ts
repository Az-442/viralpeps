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

// appended by Class C queue day 7 (AICAR) — see class-c-article-queue.md
export const aicarPriceContent: Record<string, ResearchPageContent> = {
  "aicar-uk-price-guide": {
    slug: "aicar-uk-price-guide",
    compoundSlug: "aicar",
    pullQuote:
      "Per milligram, UK AICAR runs from 29p to 80p — a 2.8× spread. Almost all of it is pack size, not quality, and the 100 mg vials are quietly the best value in the market.",
    quickInfo: [
      { label: "Compound", value: "AICAR (acadesine, the nucleoside)" },
      { label: "Typical UK pack", value: "50 mg; 100 mg sold by a smaller subset" },
      { label: "50 mg price band", value: "£16.95 to £39.99 (Oct 2026 snapshot)" },
      { label: "Price per mg", value: "£0.29 to £0.80" },
      { label: "Cheapest 50 mg", value: "£16.95 — £0.34/mg" },
      { label: "Best per-mg value", value: "100 mg pack at £29.00 — £0.29/mg" },
      { label: "Market average (50 mg)", value: "£61.26 across one competing UK index — inflated by a single £258.75 outlier" },
      { label: "What to check", value: "CAS 2627-69-2 stated with mass 258.23; no sequence field; not described as a lyophilised peptide" },
    ],
    sections: [
      {
        title: "What 'Price Per mg' Actually Compares",
        body:
          "AICAR is sold by mass, in vials of 50 mg and 100 mg. The only comparison that means anything is the price divided by the mass in the vial, because the compound has no potency unit, no IU, and no usable half-life figure that would justify pricing it by anything else.\n\nThe arithmetic is simple and the market does not do it. A 50 mg vial at £34.00 and a 100 mg vial at £58.00 look like two different products at two different prices. They are the same powder at £0.68 and £0.58 per milligram. Across the current UK catalogue the same pattern repeats: **every 100 mg listing except one is cheaper per milligram than every 50 mg listing except the two cheapest.**\n\nThis guide uses the ViralPeps catalogue as its primary source — the eleven priced AICAR source rows behind the [AICAR comparison page](/compounds/aicar) — and checks them against a second UK price index and against supplier pages read directly. Where the sources disagree, that is stated rather than averaged away.\n\nOne framing point before the numbers. AICAR is a small molecule with a well-established, cheap synthesis. It is not a 39-residue peptide that requires a difficult coupling sequence. There is no structural reason for a 15-fold price range in this category, which means the range is telling you about the seller rather than the material.\n\n## Two different molecules are sold under this name, and only one is in these prices\n\nEvery price below is for the nucleoside: **acadesine, CAS 2627-69-2, formula C9H14N4O5, molecular weight 258.23, PubChem CID 17513**. The 5′-phosphate form, AICA ribonucleotide or ZMP, is CAS 3031-94-5 and 338.21 g/mol — a different molecule with different cell permeability. If a listing quotes 338.21 as the molar mass while selling you 2627-69-2, it is not describing the material in the vial, and the comparison stops being meaningful before price even enters it.",
      },
      {
        title: "The 50 mg Band: £16.95 to £39.99",
        body:
          "In the October 2026 snapshot, nine UK listings sell AICAR in 50 mg vials with a stated price. Those nine span £16.95 to £39.99 — a 2.4× range at the sticker, and because the pack size is constant, exactly the same 2.4× per milligram.",
        table: {
          header: ["Vendor", "Pack", "Price", "£ per mg"],
          rows: [
            ["Everything Peptides", "50 mg", "£16.95", "0.34"],
            ["Research Peptides", "50 mg", "£19.95", "0.40"],
            ["Dr P Research", "50 mg", "£24.99", "0.50"],
            ["Pioneer Peptides", "50 mg", "£27.00", "0.54"],
            ["VialVerse", "50 mg", "£34.00", "0.68"],
            ["BioPlex Peptides", "50 mg", "£34.99", "0.70"],
            ["Bluewell Peptides", "50 mg", "£39.95", "0.80"],
            ["Peptides Lab UK", "50 mg", "£39.99", "0.80"],
          ],
        },
        subsections: [
          {
            title: "What the five cheapest listings have in common",
            body:
              "Nothing except price. Research Peptides' AICAR page is 120 words long and states that the compound is an analogue of adenosine monophosphate; it gives no CAS, no mass, no form and no analysis. Everything Peptides is cheap and public-facing but its listing carries no analytical claim beyond the price. The four cheapest sellers in this market are not doing anything different from the four dearest — they are just charging less for a material that costs little to make.",
          },
          {
            title: "How much of this is real",
            body:
              "A 2.4× range on a commodity small molecule is unremarkable, and unlike a peptide market there is no obvious quality story to attach to it. The honest read is that the £16.95 listing and the £39.99 listing are almost certainly the same API from the same handful of Chinese suppliers, repackaged. The premium in this category buys a shopfront, a shipping promise and in one or two cases an actual specification table — it does not buy a different molecule.",
          },
        ],
      },
      {
        title: "The 100 mg Band, Where the Arithmetic Changes",
        body:
          "Four UK catalogue rows sell 100 mg. Three are priced and one is out of stock.",
        table: {
          header: ["Vendor", "Pack", "Price", "£ per mg", "Stock"],
          rows: [
            ["MyPep Biotech", "100 mg", "£29.00", "0.29", "In stock"],
            ["Pioneer Peptides", "100 mg", "£50.00", "0.50", "In stock"],
            ["Bionik Peptides", "100 mg", "£50.00", "0.50", "Out of stock"],
            ["VialVerse", "100 mg", "£58.00", "0.58", "In stock"],
          ],
        },
        subsections: [
          {
            title: "The pack-size effect is larger than the vendor effect",
            body:
              "Pioneer Peptides sells 50 mg at £27.00 and 100 mg at £50.00. Same vendor, same product page, one listing — £0.54 per milligram against £0.50. That 7% is a pack discount, and it is what you would expect. The interesting comparison is MyPep at £29.00 for 100 mg, which is £0.29 per milligram and cheaper per milligram than the cheapest 50 mg vial in the entire market.\n\nPut differently: the decision that moves the price most is not which vendor you pick. It is whether you buy a 50 mg or a 100 mg vial. Choosing the cheapest 50 mg seller saves 54% against the dearest 50 mg seller. Choosing a 100 mg vial instead of a 50 mg vial saves you up to 42% on the same vendor's own line, and at the bottom of the 100 mg band it beats everything in the 50 mg band outright.",
          },
          {
            title: "The limits of that argument",
            body:
              "Bulk purchasing only pays if you need the material. AICAR is sold in quantities far in excess of what most in-vitro work consumes — a 50 mg vial makes a 50 mL stock at 1 mg/mL, which is a large amount of working solution. Buying 100 mg to save on a per-milligram basis when the assay only needs a fraction of it is not a saving; it is waste with a discount attached.",
          },
        ],
      },
      {
        title: "Why a Second Index Disagrees With the First",
        body:
          "A competing UK price index reports AICAR at a 50 mg basis across eleven suppliers, ranging **£18.62 to £258.75 with an average of £61.26**. Read those numbers next to the table above and the average looks absurd: it is 55% higher than the *most expensive* listing in the ViralPeps catalogue that isn't the outlier, and double the top of the honest band.\n\nThe reason is arithmetic. An average is pulled upward by its extremes, and that index contains a single £258.75 listing — **£5.18 per milligram, fifteen times the cheapest 100 mg price and thirteen times the median of the 50 mg band.** Nothing on that page describes analysis that would justify the multiple. One listing at thirteen times the market median lifts the average by roughly a third on its own.\n\nThe useful number in that index is the low end, and it agrees with ours to within a pound: their cheapest is £18.62, ours is £16.95. Two independent crawls landing within 10% of each other on the floor of the market is a reasonable sign that the floor is real.\n\nThe same index also quotes a 100 mg band \"from £49.00\", which is higher than three of the four 100 mg prices in our catalogue and does not include the £29.00 listing. Price indices disagree because they crawl different vendors on different days and normalise differently. Treat any single index figure — including ours — as a snapshot of a list, not as the market price.",
      },
      {
        title: "Reading an AICAR Certificate of Analysis",
        body:
          "The certificate for a nucleoside is not the certificate for a peptide, and the difference is a fast way to tell whether a supplier understands the material.\n\n**There should be no sequence field.** If a certificate for AICAR has an amino-acid composition table, it was produced from a template built for peptides. That tells you more about the supplier's process than any purity figure on the page.\n\n**The mass must be stated against the right formula.** 258.23 g/mol is the nucleoside. An observed mass near 338 means the material is the phosphate form. A certificate that reports a single \"MW\" figure with no observed mass does not resolve which of the two you have.\n\n**Identity should be confirmed against a reference standard.** For a small molecule with a commercially available reference standard, retention time and UV spectrum comparison is standard practice and is cheap to perform. A certificate offering only an HPLC purity percentage has not confirmed identity at all — a 99% pure sample of the wrong molecule is 99% pure.\n\n**Purity needs a method and a wavelength.** \"≥98%\" with no column, no gradient and no detection wavelength is not a measurement; it is a claim.\n\n**Solubility and appearance.** AICAR is a white to off-white solid that dissolves poorly in neutral water and is typically handled from DMSO stock. A listing that presents it as a lyophilised peptide and implies it goes into bacteriostatic water has not described the material accurately. Ask any vendor that presents it that way what their dissolution protocol is; the answer is the test.\n\n**Lot matching.** The certificate must resolve to the lot number on the vial in front of you. In this market that is the single most useful question, because the certification reality is often thinner than the listing implies — one UK supplier publishes that its AICAR is lot-numbered but **\"not yet independently tested\"**, which is more candour than the category average.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "For a 50 mg vial of the nucleoside, **£17 to £25** is a fair price in the current UK market. That covers the four cheapest listings and sits below the median. Above £35 you are paying a premium that the material does not command, and unless the listing comes with a lot-matched certificate against the acadesine reference standard and an explicit statement of the form, nothing in the price is buying you evidence.\n\nFor 100 mg, **£29 to £40** is fair. The 100 mg band is thin — only four UK sellers at the time of writing — and the £29.00 listing is the obvious value point in the whole market at £0.29 per milligram. At £58.00 the same reasoning applies as at the top of the 50 mg band: the material is the same and the premium is not evidence.\n\nTwo notes on how to use those numbers. First, they are for **the nucleoside**, CAS 2627-69-2. If a vendor is selling the phosphate form, or is vague about which it stocks, the price is not comparable and the identity question comes first. Second, nothing here is a statement about the quality of any specific vendor. ViralPeps is a comparison site; it does not sell AICAR, does not issue certificates of analysis, and does not vouch for any listing. What it does is put the per-milligram arithmetic in one place so that the pack-size effect is visible before you choose.",
      },
      {
        title: "How to Verify a Supplier Before You Buy",
        body:
          "Five checks, in order of how fast they separate a real operation from a shopfront.\n\n**Ask which CAS they are selling.** A supplier that stocks AICAR should be able to say 2627-69-2 without looking it up, and should not pair it with 338.21. The answer, or the absence of one, sorts the market quickly.\n\n**Ask for the lot-matched certificate before ordering.** Not a generic PDF, not a link to a page of certificates. The certificate for the lot that will be shipped. In a category where the material is cheap and the certification is often thin, the response to that request — a specific document versus a template — is the most informative signal available.\n\n**Read the listing for form and handling.** \"Lyophilised powder\" for a nucleoside is a copy-paste error. A listing that describes DMSO stock preparation or states the storage temperature is a listing written by someone who has handled the material.\n\n**Check the price against the pack size.** A 50 mg vial at £250 is not a premium product; it is a pricing error or a listing aimed at buyers who are not doing the division.\n\n**Check the vendor, not just the compound.** The [ViralPeps supplier directory](/vendors) carries verification status, delivery experience and TrustScore for every vendor in this catalogue, which filters faster than working through certificates one at a time. It also makes it easy to see when the same vendor is cheap on one compound and expensive on another — a pattern worth knowing about before you place a larger order.",
      },
    ],
    faq: [
      {
        question: "What is a fair UK price per mg for AICAR?",
        answer:
          "Between £0.34 and £0.50 per milligram is fair for a 50 mg vial in the current market, which corresponds to roughly £17 to £25. The cheapest 50 mg listing is £16.95 (£0.34/mg) and the dearest is £39.99 (£0.80/mg). On 100 mg vials, £0.29 to £0.40 per milligram is fair, which is £29 to £40; the cheapest 100 mg listing at £29.00 is the lowest per-milligram price in the UK market.",
      },
      {
        question: "Why is a 100 mg vial cheaper per mg than a 50 mg vial?",
        answer:
          "Because AICAR has a low synthesis cost and pack size is the dominant variable in this market. Pioneer Peptides sells 50 mg at £27.00 (£0.54/mg) and 100 mg at £50.00 (£0.50/mg) on the same listing. MyPep Biotech's 100 mg at £29.00 works out to £0.29/mg, which is below the cheapest 50 mg vial in the market. The pack-size effect is larger than the difference between most vendors.",
      },
      {
        question: "Why do UK price indices disagree so much on AICAR?",
        answer:
          "Averages are sensitive to outliers and the AICAR market has one. A competing UK index reports a 50 mg average of £61.26, which is inflated by a single £258.75 listing — £5.18/mg, more than thirteen times the median. Our own catalogue floors at £16.95 against their £18.62, a 10% difference that reflects crawl timing rather than a real disagreement about where the market sits. Use the low end of any index, not its average.",
      },
      {
        question: "What should an AICAR certificate of analysis contain?",
        answer:
          "An observed mass consistent with 258.23 g/mol (C9H14N4O5) and not 338.21, which would indicate the phosphate form; an identity confirmation against an acadesine reference standard by retention time and UV spectrum; HPLC purity with the method and wavelength stated; a lot number that matches the vial shipped; and an appearance description. There should be no sequence field — AICAR has no amino-acid backbone — and a certificate carrying one was made from a peptide template.",
      },
      {
        question: "Does a higher price get me better AICAR?",
        answer:
          "Not in this category. The active material is a commodity small molecule with a cheap synthesis and a well-defined identity, and the UK spread is 2.8-fold from lowest to highest per-milligram price. There is no published evidence that the dearer listings carry material of a different grade. What a higher price can legitimately buy is a lot-matched certificate and a documented handling protocol, and those are worth asking for directly rather than assuming they come with the price.",
      },
    ],
    references: [
      "ViralPeps catalogue data — 11 priced AICAR source rows across UK vendors, 31 October 2026 snapshot. Per-mg figures calculated from stated pack mass; out-of-stock rows retained and flagged.",
      "Competing UK AICAR price index — 11 suppliers, 50 mg normalised basis, £18.62 to £258.75, average £61.26. Retrieved 31 October 2026.",
      "VialVerse specification block — CAS 2627-69-2, C9H14N4O5, 258.23 g/mol, free compound, 50 mg and 100 mg, −20 °C storage. Retrieved 31 October 2026.",
      "Zenic Labs AICAR listing — £21.00 per 50 mg, lot-numbered, stated as not yet independently tested. Retrieved 31 October 2026.",
      "PubChem Compound CID 17513 (Acadesine) — C9H14N4O5, 258.23 g/mol, CAS 2627-69-2. https://pubchem.ncbi.nlm.nih.gov/compound/17513",
      "PubChem Compound CID 65110 (AICA ribonucleotide) — C9H15N4O8P, 338.21 g/mol, CAS 3031-94-5. https://pubchem.ncbi.nlm.nih.gov/compound/65110",
    ],
  },
};
