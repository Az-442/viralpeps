import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 18 (Humanin) — see class-c-article-queue.md
export const humaninPriceContent: Record<string, ResearchPageContent> = {
  "humanin-uk-price-guide": {
    slug: "humanin-uk-price-guide",
    compoundSlug: "humanin",
    pullQuote:
      "The UK humanin market is two listings, and one of them is out of stock. The sticker spread — £49.00 to £80.00 for the same 10 mg vial — is a thin market doing what thin markets do, not a quality ladder. The number that actually separates one certificate from another is 2687.2 versus 2801.3.",
    quickInfo: [
      { label: "Compound", value: "Humanin, free base 2687.2 g/mol" },
      { label: "Market", value: "UK, 2 tracked listings, 1 in stock" },
      { label: "Sticker range (10 mg)", value: "£49.00 to £80.00" },
      { label: "Per mg range", value: "£4.90 to £8.00" },
      { label: "In-stock listing", value: "GenoPept — £49.00 per 10 mg (£4.90/mg)" },
      { label: "Out-of-stock listing", value: "Bionik Peptides — £80.00 per 10 mg (£8.00/mg)" },
      { label: "Spread multiplier", value: "1.63× between the two listings" },
      { label: "External UK reference", value: "Vials ≈£46–£55 per 10 mg; pens up to £132" },
      { label: "The COA number to check", value: "2687.2 (free base) vs 2801.3 (TFA salt)" },
      { label: "What to compare", value: "£ per mg, corrected for salt form" },
    ],
    sections: [
      {
        title: "What Price Per mg Means for a 24-Amino-Acid Peptide",
        body:
          "The per-milligram figure is the only comparison that works across vial sizes, and for humanin it lands in a specific band for a specific reason. Humanin is a 24-residue peptide — not a three-residue tripeptide like glutathione, and not a 39-residue one like BPC-157. Length is the single biggest driver of synthesis cost, so a fair humanin price sits above the commodity peptides and below the long ones.\n\nStart with the arithmetic on the listings ViralPeps tracks. Two UK sources, both a nominal **10 mg** vial: **GenoPept at £49.00** (in stock) and **Bionik Peptides at £80.00** (out of stock). That divides to **£4.90 per mg** and **£8.00 per mg** respectively — a **1.63×** spread on two listings of the same stated material. The [humanin compound page](/compounds/humanin) holds the live figures, and the honest description of this market is that it is thin: two entries, one of them unavailable.\n\n**The unit that matters is £ per mg, not £ per vial**, but with only two listings the per-vial and per-mg rankings are identical here. The wider UK picture is consistent with the band rather than contradicting it. An external UK supplier reviewed for this article lists a 10 mg vial at roughly **£46–£55**, a nasal spray at **£54–£104**, and a pre-mixed pen at **£49–£132**. The pen and spray premiums are format, not material — a pre-filled presentation charges for convenience, not for more humanin — and they are where the price ceiling on this compound actually lives.\n\n**Where the per-mg figure breaks down** is the same place it always does on this catalogue: the label says 10 mg of vial contents, not 10 mg of peptide. The correction needs the salt form and any residual water, and on humanin the salt is the whole story, for a reason the next sections explain.",
      },
      {
        title: "The UK Market in Numbers — Two Listings, One in Stock",
        body:
          "The entire tracked UK catalogue for humanin at the time of writing is two entries. That is the finding, and it should be read for what it is.\n\n| Supplier | Fill | Price | Per mg | Stock |\n|---|---|---|---|---|\n| GenoPept | 10 mg | £49.00 | £4.90 | In stock |\n| Bionik Peptides | 10 mg | £80.00 | £8.00 | Out of stock |\n\n**Two observations follow.** First, the out-of-stock listing is the expensive one. In a deeper market an £80 entry would be the \"premium tier\" and its price would mean something about documentation; here it is a listing that is not currently sellable, and its £8.00 per mg is best treated as a data point rather than a live option. The realistic, buyable price for humanin in the UK right now is **£4.90 per mg** from the single in-stock listing, and the external reference prices (£46–£55 a vial) bracket that figure closely.\n\nSecond, the market is so thin that **price is doing almost none of the quality signalling it is supposed to**. On a compound with twenty listings, a 4× spread separates the documented from the undocumented. With two listings, the spread is 1.63× and half of it is invisible because one listing is unavailable. The burden of discrimination falls entirely on the certificate, not the price tag.\n\nThat is not a complaint about the compound; it is a property of niche research peptides. Humanin has a real literature but a small commercial market, and a small market produces a short, lumpy price list rather than a smooth curve.",
      },
      {
        title: "The 2687.2 vs 2801.3 Problem — Two Correct Masses on One COA",
        body:
          "This is the section that matters most for humanin specifically, because it is where two certificates for the same product visibly disagree and neither is wrong.\n\n**The free base is 2687.2 g/mol** — formula C119H204N34O32S2, CAS 330936-69-1, PubChem CID 16131438. That is the neutral reference value and the one the [compound record](/compounds/humanin) uses.\n\n**The trifluoroacetate (TFA) salt is roughly 2801.3 g/mol** — formula C121H205F3N34O34S2. The extra F3 is the TFA counter-ion. Commercial peptides are routinely supplied as their TFA salt because TFA is what the synthesis and purification workflow leaves behind, and humanin is no exception.\n\n**Why this is a trap rather than a trivia point.** A UK supplier reviewed for this article lists 2801.3 g/mol and the salt formula with no statement that it is a salt. A reader who learned 2687.2 from a registry and then sees 2801.3 on a certificate concludes one of them is wrong. Neither is. A correctly-written certificate states which form it reports, and the absence of that statement is the single most reliable early warning that the certificate was not written by someone who handled the material.\n\n**The practical check** is to look for the counter-ion and, ideally, the peptide content as a separate line. If a certificate reports a mass near 2687, it is describing the free base. If near 2801, it is describing the TFA salt. Both are acceptable; the sin is the silence in between. Our [guide to reading a COA](/research/how-to-read-a-coa) covers the general method, and this compound-specific point is the one humanin buyers need on top of it.",
      },
      {
        title: "How to Read a Humanin COA — The Single Cysteine Changes the Checklist",
        body:
          "A standard peptide certificate checks purity, identity and mass. For humanin, four fields carry more weight than they do on most compounds, and one of them is unusual.\n\n**1. The mass, with the form stated.** Free base 2687.2 or TFA salt 2801.3, explicitly. This is the first field to check and the one most often missing, for the reason above.\n\n**2. The sequence, not just the name.** Humanin is MAPRGFSCLLLLTSEIDLPVKRRA — 24 residues. A certificate that reports identity by mass alone is doing less than it looks, because the mass cannot distinguish humanin from a scrambled 24-residue peptide of the same composition. Sequence confirmation (HPLC retention plus a mass check, or MS/MS) is the stronger standard.\n\n**3. The single cysteine, and the oxidation state.** Position 8 is the only cysteine. With one cysteine there is no internal disulfide to check, but there *is* a dimerisation and oxidation risk: two humanin molecules can pair through that cysteine, and an oxidised stock is not the same material as a freshly lyophilised one. A certificate that reports reduced content or a date-stamped purity figure is doing the work this molecule needs; a bare \"≥98%\" is not.\n\n**4. Lot number matching the vial, with a test date.** Non-negotiable everywhere on this market, and on a single-cysteine peptide the date carries extra weight because the material can oxidise in storage.\n\n**The fields that matter less here.** Purity percentage is a weak differentiator at this length — 98% is reachable and is not what separates a good humanin certificate from a bad one. What separates them is whether the certificate states the form, confirms the sequence, and is lot-matched. Those three are cheap to request and expensive to fake convincingly.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "Three statements, in order of weight.\n\n**A fair price for a 10 mg humanin vial is £45 to £55 — £4.50 to £5.50 per mg.** That band contains the single in-stock listing (£49.00), and the external UK reference prices (£46–£55) sit inside it. Paying there is normal and needs no justification.\n\n**Below £4 per mg is where you should ask what is not being tested.** On a niche peptide a price that undercuts the market by a meaningful margin has to come from somewhere — synthesis scale, an untested batch, or a listing that never ships. The question to ask is not \"is this too cheap\" but \"show me the lot-matched certificate for this vial.\"\n\n**Above £6 per mg needs documentation to be visible before you pay it.** A pre-mixed pen at £132, a nasal spray at £104 — those are format premiums, and they are defensible only if the convenience is actually what you are buying. For the raw lyophilised powder, anything materially above the £4.50–£5.50 band should be backed by an independent laboratory name, a sequence confirmation, and a stated form. If none of that is visible, the premium is paying for a website, not a product.\n\n**What this guide deliberately does not do** is name a supplier to buy from. Prices move, stock changes, and with two listings there is no robust \"best\" to compute — only a band and a checklist. Supplier-by-supplier context lives on the [vendors directory](/vendors), the general certificate method is in the [COA guide](/research/how-to-read-a-coa), and the underlying science — why the literature is real but preclinical — is in the [humanin research guide](/research/humanin-research-guide).",
      },
      {
        title: "How to Verify a Supplier on a Thin Market",
        body:
          "When the market is two listings, the usual comparison shopping is impossible, so verification replaces comparison as the buyer's main tool. Five checks, in order.\n\n**1. The listing states the form and the salt.** Humanin free base versus TFA salt; if the page gives a mass, it should say which one. A listing that gives neither a mass nor a form has not specified the product.\n\n**2. The certificate is lot-matched and dated.** A certificate tied to the vial in your hand is worth more than a \"typical\" or catalogue-level COA, and on an oxidation-sensitive peptide the date matters.\n\n**3. The supplier distinguishes humanin from HNG.** The native 24-residue sequence and the S14G analogue are different products with different potencies. A supplier who sells \"humanin\" without clarifying which it is has not thought about the product.\n\n**4. The supplier is actually reachable and UK-facing.** On a niche compound, a real address, a working contact route and a returns position are the practical proxies for whether a listing will ship. The [vendors directory](/vendors) tracks exactly this.\n\n**5. Cross-check the price against the band, not against a single competitor.** £4.50–£5.50 per mg is the current UK reference; treat anything far outside it as needing the documentation to justify itself, in either direction.\n\nNone of these checks is specific to humanin, but all of them bite harder here than on a deep-market peptide, because there is no crowd of sellers to absorb the mistakes. On a two-listing market, the certificate *is* the product, and the price is the least informative thing on the page.",
      },
    ],
    faq: [
      {
        question: "Why does the same 10 mg humanin vial cost £49.00 and £80.00 in the UK?",
        answer:
          "Because the market is thin, not because one is better. ViralPeps tracks two UK listings — GenoPept at £49.00 (in stock) and Bionik Peptides at £80.00 (out of stock) — a 1.63× spread. The expensive listing is not currently sellable, so its price is a data point rather than a live option. The realistic buyable UK price is £4.90 per mg, and external reference prices (£46–£55 a vial) bracket that figure.",
      },
      {
        question: "Is humanin's molecular weight 2687 or 2801?",
        answer:
          "Both, for different forms. The free base is 2687.2 g/mol (formula C119H204N34O32S2, CAS 330936-69-1). The trifluoroacetate (TFA) salt — how commercial humanin is commonly supplied — is roughly 2801.3 g/mol (C121H205F3N34O34S2). A certificate that does not state which form it reports is ambiguous, which is why two correct certificates can disagree.",
      },
      {
        question: "Is humanin priced per mg or per vial?",
        answer:
          "Per milligram is the only comparison that works across sizes, but with only two tracked UK listings, both at 10 mg, the per-mg and per-vial rankings are identical. The numbers are £4.90 per mg (GenoPept) and £8.00 per mg (Bionik). Format variants — pre-mixed pens and nasal sprays — charge a convenience premium that is not more material.",
      },
      {
        question: "What should I check on a humanin certificate of analysis?",
        answer:
          "Four things above all. First, the mass with the form stated — free base 2687.2 or TFA salt 2801.3. Second, sequence confirmation (MAPRGFSCLLLLTSEIDLPVKRRA, 24 residues), not just a name and a mass. Third, the single cysteine at position 8 and the oxidation state, since humanin can dimerise and oxidise in storage. Fourth, a lot number matching the vial and a test date.",
      },
      {
        question: "Why is humanin more expensive per mg than glutathione?",
        answer:
          "Because it is a longer, harder peptide to make. Glutathione is a three-residue tripeptide produced industrially by fermentation; humanin is a 24-residue peptide made by solid-phase synthesis, and synthesis length is the single biggest driver of peptide cost. The fair UK band of £4.50–£5.50 per mg reflects that length, sitting above commodity tripeptides and below the very long research peptides.",
      },
    ],
    references: [
      "PubChem CID 16131438 (humanin, free base): C119H204N34O32S2, 2687.2 g/mol, CAS 330936-69-1. Retrieved 10 November 2026.",
      "UK price survey: ViralPeps compound record for humanin tracks 2 listings — GenoPept £49.00/10 mg (in stock) and Bionik Peptides £80.00/10 mg (out of stock). Retrieved 10 November 2026.",
      "External UK reference: PharmaLabGlobal UK humanin listings reviewed 10 November 2026 — vial £46.37–£55.35, nasal spray £54.37–£103.74, pre-mixed pen £48.95–£132.17.",
      "Ying G, et al. Humanin uses the G protein-coupled formylpeptide receptor-like-1 as a functional receptor. J Immunol. 2004. PMID 15153530 (receptor identity; context only).",
      "Facts and figures verified against PubChem, PubMed and the site compound record on 10 November 2026. Prices are as listed on the date of capture and change frequently.",
    ],
  },
};
