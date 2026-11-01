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

// appended by Class C queue day 9 (SNAP-8) — see class-c-article-queue.md
export const snap8PriceContent: Record<string, ResearchPageContent> = {
  "snap-8-uk-price-guide": {
    slug: "snap-8-uk-price-guide",
    compoundSlug: "snap-8",
    pullQuote:
      "The UK SNAP-8 market has settled on one pack size, so the usual pack-size arithmetic does nothing here. A 2.1× spread across 10 mg vials is a vendor spread — and the thing driving it is not the peptide.",
    quickInfo: [
      { label: "Compound", value: "SNAP-8 (Acetyl Octapeptide-3)" },
      { label: "Market", value: "UK, 28 catalogue listings, 18 priced at a stated 10 mg" },
      { label: "10 mg range", value: "£14.25 to £29.99" },
      { label: "Per mg range", value: "£1.43 to £3.00" },
      { label: "Median", value: "£2.00 per mg (£20.00 per 10 mg vial)" },
      { label: "Spread", value: "2.1× across like-for-like vials" },
      { label: "Rival index", value: "£14.00 to £225.00, average £29.56 (33 suppliers, 10 mg basis)" },
    ],
    sections: [
      {
        title: "What Price Per mg Actually Measures",
        body:
          "Price per milligram is the vial price divided by the stated mass. It exists to strip out pack size so that two listings can be compared on the one thing that is continuous across both: how much material you get for the money.\n\nFor most peptides in the UK catalogue that arithmetic does real work, because the same compound is sold in 2, 5, 10 and sometimes 20 mg vials and the per-milligram cost falls steeply with size. A 10 mg vial is not just a bigger version of a 2 mg vial; it is usually a materially cheaper per-milligram buy, and that is the single most useful lever a buyer has.\n\nSNAP-8 is the exception. The UK market has standardised on a single **10 mg lyophilised vial**, and almost every listing uses it. Of 28 SNAP-8 rows in the ViralPeps catalogue, 18 carry a stated 10 mg pack; the rest are either unpriced, unstated, out of stock, or a cosmetic serum that is not a vial at all.\n\nThat changes the job of a price guide completely. There is no pack-size optimisation to do here. What is left is a pure vendor spread — and understanding why a vendor spread exists, and which parts of it are buying you something, is the actual work.",
      },
      {
        title: "The UK Market in Numbers",
        body:
          "Across the 18 like-for-like 10 mg vials, the sticker range is **£14.25 to £29.99** and the per-milligram range is **£1.43 to £3.00**. The median 10 mg price is **£20.00**, or £2.00 per milligram.\n\nThe distribution is heavier at the bottom than the top. Nine of the eighteen listings sit at or below £20.00. The market is not a normal bell curve with a long tail; it is a cluster around £18–£23 with a handful of listings meaningfully above and a small group below.\n\nNormalising every row to a stated 10 mg vial, the full spread at the time of writing:\n\n| Vendor | Price (10 mg) | £ per mg |\n| --- | --- | --- |\n| Everything Peptides | £14.25 | £1.43 |\n| NovaVitality | £14.50 | £1.45 |\n| VialVerse | £16.00 | £1.60 |\n| OL Research | £17.10 | £1.71 |\n| BuyReta | £18.00 | £1.80 |\n| Revexa | £18.00 | £1.80 |\n| PeptidesNextDay | £18.00 | £1.80 |\n| Kensington Labs UK | £19.95 | £2.00 |\n| Zentra Peptides UK | £19.95 | £2.00 |\n| Midshire Labs | £20.00 | £2.00 |\n| Bluewell Peptides | £21.95 | £2.20 |\n| ApexPure | £21.99 | £2.20 |\n| Anglo Peptides | £22.00 | £2.20 |\n| Bionik Peptides | £22.00 | £2.20 |\n| Bio Peptides UK | £23.00 | £2.30 |\n| Peptides Lab UK | £27.00 | £2.70 |\n| BioPlex Peptides | £29.99 | £3.00 |\n\nSeveral catalogue rows could not be placed on that scale because the listing does not state a pack size: Research Peptides at £10.95, Dr P Research at £19.95, Tide Labs at £20.90, Pure Peptides UK at £21.95, UK Peptides at £49.99 and HiPeptides at £49.99. **Research Peptides at £10.95 is the lowest sticker price in the catalogue** and would be the cheapest per milligram if it is a 10 mg vial — at £1.10/mg, below every normalised row. That qualification is the point: the listing does not say, and a price guide should not assume.\n\nOne row is not comparable at all and should be excluded from any average: Chroma Peptides lists a **serum** at £34.99. A topical cosmetic formulation at an undisclosed concentration is a different product from a lyophilised vial, and putting it in a per-milligram table with a vial implies a mass that the listing does not contain in usable form.",
      },
      {
        title: "Why the Spread Is Only 2.1× — and What That Says",
        body:
          "Compare this with a secretagogue peptide, where the same compound spans £3.95 to £20.00 per milligram — a 5.1× spread — driven almost entirely by pack size. SNAP-8's 2.1× is short, and the reason is that two of the three forces that normally widen a peptide spread are absent.\n\n**Pack size is absent.** Every meaningful listing sells 10 mg. When one vendor sells 2 mg at £11 and another sells 10 mg at £40, the per-milligram difference between them is a commercial decision about product tiers, not a difference in material. That lever does not exist here, because there are no tiers to be in.\n\n**Synthesis cost is low.** SNAP-8 is eight residues. That is short — well short of the 30-to-44-residue chains that dominate the high end of peptide pricing. Solid-phase synthesis cost scales with chain length and with the difficulty of the specific sequence, and an octapeptide is near the cheap end of the range. The same publication that tabulates its molecular weight notes cosmetic formulations of acetyl octapeptide-3 used in a trial at **0.05% concentration** — a very small amount of material per unit of product. Cheap input, low dose requirement.\n\n**What is left is the vendor's own pricing policy** — where they position themselves in a £18–£23 cluster, whether they discount, what their shipping and minimum order look like, and how much of the price is the testing they commission. That is why the spread is narrow and why the spread is not a quality signal.\n\nThere is one live counter-example that proves the point. A competing UK price index reports a SNAP-8 market normalised to 10 mg, ranging from £14.00 to **£225.00**, with an average of £29.56 across 33 suppliers. That average sits well above the same index's own 30-day average of £22.99, and the reason is a single outlier at £225 — roughly fifteen times the median. One listing is lifting the mean of thirty-three. An average is the wrong statistic for this market; the low end and the median are the useful numbers.",
      },
      {
        title: "Reading a SNAP-8 Certificate of Analysis",
        body:
          "Certificates in this category are frequently generic, and SNAP-8 has a specific set of tells because it is a cosmetic ingredient being sold as a research compound.\n\n**The certificate should resolve the C-terminus.** The C-terminal amide is 1075.2 g/mol; the free acid is 1073.2 g/mol. A mass spec result near either figure is plausible, but the two are different molecules at the tail end, and a certificate that reports a mass without stating which form is specified has not fully identified the material. Ask which one the lot is. In a market where one published review quotes 1073.2 and PubChem's registry entry is 1075.2, this is a question that separates suppliers who know the chemistry from those who copied a table.\n\n**The sequence should be printed and should read correctly.** Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp, C-terminally amidated. An octapeptide certificate that lists six residues is describing Argireline (acetyl hexapeptide-3), not SNAP-8 — and the two are frequently confused in listings because they share the SNARE target and Argireline is the better-known predecessor.\n\n**Purity needs a method.** \"≥98%\" with no column, gradient or detection wavelength is a claim, not a measurement. For a peptide, HPLC at 214 nm with a stated column and gradient is standard. For a material this hydrophilic, expect a clean single peak — this is not a difficult analytical problem, which makes an absent method harder to excuse.\n\n**The certificate must match the lot on the vial.** Not a sample certificate, not a link to a certificates page. The lot number on the certificate should be the lot number on the vial shipped.\n\n**Watch for the mass-spec ceiling.** A certificate that reports only an average molecular weight and no observed mass has not confirmed the identity of anything. For a peptide this short, intact mass by ESI or MALDI is cheap, and its absence is informative.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "For a 10 mg SNAP-8 vial, **£14 to £20** is a fair price in the current UK market. That band contains six of the eighteen normalised listings and sits at or below the median. At £1.43 to £2.00 per milligram, you are buying a well-specified octapeptide at a price consistent with its synthesis cost.\n\nThe £22–£23 group is not unreasonable — it is where much of the market sits — but nothing in the material justifies the premium over £18. Above £27 (£2.70/mg) you are in territory where the price is a positioning decision rather than a reflection of cost, and a buyer should expect a lot-matched certificate and clear handling documentation to accompany it. If those are absent, the premium is not buying evidence.\n\nThe £49.99 listings sit at roughly 3.5× the median for the same molecule and the same pack size, and there is no published basis for that. It is not a different grade; it is a different price.\n\nTwo caveats on how to use those numbers. First, they are for the **10 mg lyophilised vial**. A cosmetic serum is a different product and cannot be priced against them. Second, they say nothing about any specific vendor's reliability — ViralPeps is a comparison site, does not sell SNAP-8, does not issue certificates of analysis and does not vouch for any listing. Its job is to put the arithmetic in one place so the spread is visible before anyone chooses.",
      },
      {
        title: "The Format Question That Overrides Price",
        body:
          "There is a prior question that a price guide can easily bury, and it should not be buried: **what is this vial for?**\n\nEvery human study of acetyl octapeptide-3 is topical or microneedle-based. Two controlled trials, both patches containing the peptide alongside three to five other actives, one of them against a within-subject placebo. There is no parenteral human data, no human pharmacokinetics and no dosing literature for any route other than skin application.\n\nThe UK market nevertheless sells SNAP-8 as a 10 mg lyophilised vial in the same format as peptides with entirely different evidence bases. That format was inherited from the surrounding catalogue rather than from the science.\n\nThe pricing consequence is concrete. A 10 mg vial at £20 contains 10 milligrams of a cosmetic active that has been studied at **0.05% in a formulation** — the equivalent of 0.5 mg per gram of product. Ten milligrams is therefore enough material for a very large amount of topical formulation, and almost certainly more than any individual researcher needs for a single experiment. The cheapest per-milligram vendor is not automatically the right buy if the pack is ten times the scale of the work.\n\nThis is the one place where SNAP-8 pricing genuinely differs from the rest of the catalogue. For most compounds, buying bigger is the optimisation. Here, buying right-sized matters more than buying cheap, and the market's uniform 10 mg vial does not offer a smaller option.",
      },
      {
        title: "How to Verify a Supplier Before You Buy",
        body:
          "Five checks, ordered by how quickly they sort a real operation from a shopfront.\n\n**Ask which INCI name they stock.** SNAP-8, Acetyl Octapeptide-3, Acetyl Octapeptide-1 and Acetyl Octapeptide-8 are all PubChem CID 76283482. A supplier who knows that will answer without hesitating; one who does not may be listing a different product under a familiar trade name, or simply reselling a catalogue entry they have never inspected.\n\n**Ask for the lot-matched certificate before ordering.** In a category where the material is cheap and certification is often templated, the response to that request — a specific document versus a link to a page — is the most informative signal available.\n\n**Check whether the listing gives a sequence, CAS or molecular weight at all.** Several UK SNAP-8 product pages describe the peptide as \"structurally related to SNAP-25\" and never state its identity. That is not a description of a compound; it is a description of a category. A listing with no identity block has not told you what is in the vial.\n\n**Read the listing for route language.** Cosmetic peptides are frequently described in skincare terms — serum, topical, microneedle, application — even when sold as a research vial. That language is usually the most honest information on the page, because it comes from the ingredient's actual dossier. Weigh it.\n\n**Check the vendor, not just the compound.** The [ViralPeps supplier directory](/vendors) carries verification status, delivery experience and TrustScore for every vendor in the catalogue, which filters faster than working through certificates one at a time. It also makes it easy to see when the same vendor is cheap on SNAP-8 and expensive on something else — a pattern worth knowing before placing a larger order. The live per-vendor comparison for this compound sits on the [SNAP-8 compound page](/compounds/snap-8).",
      },
    ],
    faq: [
      {
        question: "What is a fair UK price for a 10 mg SNAP-8 vial?",
        answer:
          "£14 to £20 is fair, which is £1.43 to £2.00 per milligram. That band holds six of the eighteen like-for-like 10 mg listings in the ViralPeps catalogue and sits at or below the £20.00 median. The £22 to £23 group is where much of the market sits and is not unreasonable; above £27 the premium is a positioning decision rather than a reflection of material cost.",
      },
      {
        question: "Why is the SNAP-8 price spread smaller than other peptides?",
        answer:
          "Because the UK market has standardised on a single 10 mg vial, so there are no pack-size tiers to create a spread, and the peptide is only eight residues long, which keeps synthesis cost low. The 2.1× range from £1.43 to £3.00 per milligram is almost entirely vendor pricing policy rather than a difference in material or pack size.",
      },
      {
        question: "Why do rival price indices show such different SNAP-8 averages?",
        answer:
          "Outliers. One UK index normalises to 10 mg across 33 suppliers and reports £14.00 to £225.00 with an average of £29.56 — a mean dragged up by a single listing roughly fifteen times the median, and above that index's own 30-day average of £22.99. In a market this tightly clustered, the mean is the least useful statistic. Use the low end and the median.",
      },
      {
        question: "Is a SNAP-8 serum comparable to a 10 mg vial on price?",
        answer:
          "No. A cosmetic serum is a formulated topical product at an undisclosed concentration; a 10 mg vial is lyophilised material. Per-milligram comparison between them is meaningless and the serum should be excluded from any price average. One UK listing at £34.99 is a serum, not a vial, and price indices that place it in a per-milligram table are mixing two products.",
      },
      {
        question: "What should a SNAP-8 certificate of analysis contain?",
        answer:
          "An observed mass consistent with either 1075.2 g/mol (C-terminal amide) or 1073.2 g/mol (free acid), with the form stated explicitly; the full eight-residue sequence Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp with C-terminal amidation — six residues means it is Argireline, not SNAP-8; HPLC purity with column, gradient and wavelength stated; and a lot number matching the vial shipped.",
      },
    ],
    references: [
      "ViralPeps catalogue data — 28 SNAP-8 source rows across UK vendors, 1 November 2026 snapshot. Per-mg figures calculated from stated 10 mg pack mass; rows without a stated pack size excluded from the normalised range and listed separately.",
      "Competing UK SNAP-8 price index — 33 suppliers, 10 mg normalised basis, £14.00 to £225.00, average £29.56, 30-day average £22.99. Retrieved 1 November 2026.",
      "PubChem Compound CID 76283482 (Acetyl octapeptide-3) — C41H70N16O16S, 1075.2 g/mol, CAS 868844-74-0. https://pubchem.ncbi.nlm.nih.gov/compound/76283482",
      "Peptides: Emerging Candidates for the Prevention and Treatment of Skin Senescence: A Review. PMC11762834 — tabulates Acetyl Octapeptide-3 at 1073.2 g/mol and a trial formulation concentration of 0.05%.",
      "Avcil M et al. J Cosmet Dermatol. 2020 Feb;19(2):328-337. PMID 31134751 — 12-week monocentric microneedle patch trial.",
      "Shin JY et al. Ann Dermatol. 2024 Aug;36(4):215-224. PMID 39082657 — 24-subject split-face placebo-controlled microneedle patch trial.",
    ],
  },
};
