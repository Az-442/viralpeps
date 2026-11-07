import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 15 (Pramipexole) — see class-c-article-queue.md
export const pramipexolePriceContent: Record<string, ResearchPageContent> = {
  "pramipexole-uk-price-guide": {
    slug: "pramipexole-uk-price-guide",
    compoundSlug: "pramipexole",
    pullQuote:
      "There is no UK research-chemical market for pramipexole, because it is a prescription medicine. That single fact invalidates most of what you will read about its price — and it means the honest guide is about the prescription market, base-versus-salt arithmetic, and how to tell whether a listing is even the right molecule.",
    quickInfo: [
      { label: "Compound", value: "Pramipexole (dopamine D2/D3 agonist, not a peptide)" },
      { label: "UK status", value: "Prescription-only medicine — no lawful research-chemical retail route" },
      { label: "UK vendors stocking it (ViralPeps index)", value: "0 of 126" },
      { label: "Lowest verified tablet price", value: "£0.19 per 0.088 mg tablet (£2.16 per mg of base)" },
      { label: "Highest verified tablet price", value: "£0.55 per 0.088 mg tablet (£6.25 per mg of base)" },
      { label: "Pack example", value: "30 × 0.18 mg tablets for £22.50 (£4.17 per mg of base)" },
      { label: "Base-to-salt factor", value: "1.43× (0.088 mg base = 0.125 mg dihydrochloride monohydrate)" },
      { label: "What to compare", value: "Price per mg of BASE, never price per tablet" },
    ],
    sections: [
      {
        title: "What Price Per mg Means for This Compound",
        body:
          "Most price guides on the internet assume a commodity: identical vials of identical peptide, sold at wildly different prices, so the job is to find the cheap one. Pramipexole works differently, and pretending otherwise would produce a guide that does not apply to the UK.\n\nPramipexole is a **prescription-only medicine**. It cannot lawfully be sold as a research chemical in the UK, and our own index of 126 UK suppliers contains **zero** stocking it — not because we have failed to find them, but because the category does not exist here. Compare that with a compound like GHRP-6, where 32 priced UK listings is a normal market. There is no equivalent table to build for pramipexole, and any page that presents one is either describing the US supplement-adjacent market or inventing listings.\n\nSo what does \"price per milligram\" mean here? It means two things, both useful. First, it is the only way to compare across the four tablet strengths — 0.088 mg, 0.18 mg, 0.35 mg and 0.7 mg — because a pack of 0.7 mg tablets and a pack of 0.088 mg tablets have wildly different prices for reasons that have nothing to do with the drug. Second, it lets you see what a milligram of this molecule actually costs at retail, which is the number that makes the grey-market price of almost any research chemical look absurd by comparison.\n\nThe compound page for [pramipexole](/compounds/pramipexole) carries the specification data — CAS, mass, half-life — alongside the listing tracker. For the pharmacology, including why the D3 selectivity figure everyone quotes is wrong, read the [pramipexole research guide](/research/pramipexole-research-guide).",
      },
      {
        title: "Base Versus Salt — the Arithmetic That Changes Every Price",
        body:
          "This is the single most useful section in this guide, because almost nobody publishes it.\n\nPramipexole is dispensed as the **dihydrochloride monohydrate**, but UK labelling states the dose as **free base**. The two are related by molecular weight: the base is 211.33 g/mol and the monohydrate salt is 302.3 g/mol, both verified against PubChem (CID 119570 and CID 166589). The ratio is **1.430**.\n\nThat means every tablet on a UK pharmacy shelf contains about 43% more mass of pramipexole salt than its label suggests:\n\n- A **0.088 mg** tablet contains **0.125 mg** of pramipexole dihydrochloride monohydrate.\n- A **0.18 mg** tablet contains **0.25 mg** of salt.\n- A **0.35 mg** tablet contains **0.5 mg** of salt.\n- A **0.7 mg** tablet contains **1 mg** of salt.\n\n**Why this matters for price.** Suppose you find a US listing quoting \"pramipexole 0.25 mg\" at $0.40 a tablet and a UK listing quoting \"0.18 mg\" at £0.30. Those look the same. They are not: the US figure is very likely **salt weight** and the UK figure is **base**. Converted to a common basis, the two may differ by 40% in real drug content — more than the apparent price difference. Any comparison that does not state which basis it is using is worthless.\n\n**The rule to apply.** Compute everything as **price per milligram of base**. Divide the tablet price by the base strength on the label. Do not divide by the salt weight, and do not compare a pack price across different strengths without normalising first. On a 0.88 microgram tablet the rounding alone is enough to move a price per mg figure by several percent.",
      },
      {
        title: "The Verified UK Price Points",
        body:
          "These are the figures we were able to confirm directly from UK pharmacy listings in November 2026. There is no grey-market comparison table to put beside them, because there is no lawful grey market.\n\n| Source | Strength | Price | Per mg of base |\n|---|---|---|---|\n| Life Pharmacy | 0.088 mg tablet | £0.19 | £2.16 |\n| Chemist.net | 88 mcg tablet | £0.55 | £6.25 |\n| Dock Pharmacy | 0.18 mg × 30 pack | £22.50 | £4.17 |\n\nRead the middle and right columns, not the left. The tablet prices look wildly different — 19p versus 55p — but the strengths and pack sizes differ too, and only the per-milligram figure is comparable.\n\n**What the spread reflects.** The gap between £2.16 and £6.25 per milligram is roughly 2.9×, on the same molecule, at the same nominal strength. It is not a quality difference. It reflects four things: whether you are paying a private-prescription dispensing fee, the per-item dispensing charge some online pharmacies add, the minimum order value (several of these sites will not post a single cheap item without a delivery charge that can double the effective cost), and the difference between an NHS-reimbursed generic and a private retail sale. On an NHS prescription, the patient charge is a flat fee per item regardless of drug, so the per-milligram economics are not visible to the patient at all.\n\n**The pack-size effect.** The Dock Pharmacy pack works out at £4.17 per mg of base — between the two single-tablet prices but not the cheapest. Larger strengths generally give a lower price per milligram, for the same reason a 10 mg peptide vial beats two 5 mg vials: the packaging, dispensing and handling costs are per box, not per milligram. When comparing, always buy in the strength that makes the arithmetic work rather than the one with the lowest sticker price.",
      },
      {
        title: "Why There Is No Research-Chemical Price Table",
        body:
          "It is worth stating plainly, because it is the question most readers actually have: **why can I not just buy this the way I buy peptides?**\n\nBecause it is a licensed medicine. Pramipexole has UK marketing authorisations, is included on the NHS formulary, and falls under the Human Medicines Regulations. Selling it without a prescription is a criminal offence, not a regulatory grey area. That has three consequences:\n\n**No legitimate vendor will stock it.** Our vendor index is scraped and maintained across 126 UK suppliers. None lists pramipexole. If one begins to, that is a signal to check its licensing status rather than a buying opportunity.\n\n**\"Research use\" does not create an exemption.** The RUO convention that grew up around peptides does not transfer to a licensed small-molecule medicine. A vendor labelling pramipexole tablets \"for research use only\" does not thereby make the sale lawful, and does not take the regulatory risk off the buyer.\n\n**Material offered anyway is unverifiable.** Where pramipexole does appear for sale — on US affiliate round-ups and overseas pharmacies — the product is typically tablets of unspecified provenance with no batch certificate and no supplier chain. A prescription product has an identifiable marketing authorisation holder and a Pharmacovigilance record. A bottle from an unnamed overseas seller has neither. That is not a price difference; it is a different class of object.\n\nThe [vendors directory](/vendors) is the place to check who is actually selling what in the UK, and the fastest way to see that no legitimate seller carries this compound.",
      },
      {
        title: "How to Read a Pramipexole COA — and Why Most Are Not COAs",
        body:
          "A research-chemical certificate of analysis is a document about a **lot**: identity confirmed by mass spectrometry, purity by HPLC, often residual solvents and endotoxin. A pharmaceutical batch release document is a different thing: it accompanies an authorised product and attests that the batch meets the specification in the marketing authorisation, under GMP.\n\nWhen you buy pramipexole on prescription, the second applies, and you do not need to see it — the regulatory system holds it. When you buy it from any other source, the first applies in theory and usually fails in practice. What to look for if one is offered:\n\n- **Measured intact mass matching the salt form supplied.** For the dihydrochloride monohydrate the number should be around 302, not 211. A certificate quoting 211.33 for a vial of salt has reported the free base mass and told you nothing about what is in the vial.\n- **A lot number that matches the product in your hand**, not a generic sample document reproduced across a catalogue.\n- **A named laboratory and a date**, not \"third-party tested\" as an unqualified phrase.\n- **Chiral identity.** Pramipexole is the (S) enantiomer, and the (R) enantiomer is a different compound with a different history. An achiral HPLC method reporting 99% purity cannot distinguish them. Only a chiral method can, and almost no vendor certificate states the method is chiral.\n\nThat last point is specific to this molecule and is the strongest argument for the prescription route. The purity number everyone looks at is the number least able to detect the error that matters most here.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "Given the prescription-only status, the honest answer is that a fair price is **the NHS prescription charge or the cheapest verified retail generic**, and everything else is either a private dispensing premium or a red flag.\n\nThe per-milligram range we could verify — £2.16 to £6.25 — should be read as the outer bounds of legitimate retail, not as a market with a cheap end and an expensive end worth arbitraging. The midpoint of about £4 per milligram of base is a normal private retail figure. If you see a per-milligram price materially **below** £2, the product is not a UK authorised medicine and the question becomes provenance, not value. If you see one materially **above** £6.25, you are paying a dispensing premium that a different pharmacy would not charge — an easy fix.\n\nFor context, and to make the scale concrete: at £4 per milligram of base, one gram of pramipexole base would cost about £4,000 at retail. A 5 mg vial of a research peptide at £15 is £3,000 per gram. The two numbers are of the same order — which is worth knowing, because the instinct is to assume the prescription drug must be far more expensive. It is not. It is simply sold in 0.088 mg units rather than 5 mg ones.\n\n**What this guide cannot tell you** is which private pharmacy is cheapest on any given day, because those prices move and several of the sites above require a valid prescription before the order is even accepted. The structural answer — compare per milligram of base, expect £2–£6, and refuse anything outside that band without a provenance explanation — is stable.",
      },
      {
        title: "How to Verify Before You Buy",
        body:
          "Five checks, in the order that eliminates the most bad options fastest.\n\n**1. Is the seller a registered pharmacy?** Check the General Pharmaceutical Council register for the pharmacy name and the superintendent pharmacist. An online storefront selling a prescription medicine without a GPhC registration is not a pharmacy.\n\n**2. Does it require a valid prescription?** A legitimate UK seller of pramipexole cannot dispatch without one. A site that will sell it to you on a checkbox is either not selling a medicine or not following the law.\n\n**3. Is the strength stated as base or salt?** If the listing does not say, ask. If the answer is \"it doesn't matter,\" the seller does not understand the product. This is the check that separates a real pharmacy from a reseller.\n\n**4. Is the marketing authorisation holder identifiable?** UK generics are made by named manufacturers — Teva, Actavis, Aspire, Krka and others. That name should be on the box. A product with no MA holder is not a UK medicine.\n\n**5. Can you compute a per-milligram figure from the listing?** If the listing gives only a pack price and no clear strength, you cannot compare it to anything, and neither can anyone else. Skip it.\n\nNotice what is not on this list: purity percentages, certificate photography, and reviews. Those are the checks that work for research peptides and are close to meaningless for a licensed medicine, where the regulatory system has already done the work. Applying peptide-shopping habits to a prescription drug is how people end up buying unverifiable tablets from an overseas seller to save £10.\n\nFor the underlying science — including a genuine 2025 UK trial in treatment-resistant depression that no commercial page mentions — see the companion [pramipexole research guide](/research/pramipexole-research-guide).",
      },
    ],
    faq: [
      {
        question: "Why can't I find pramipexole on any UK peptide supplier?",
        answer:
          "Because it is a prescription-only medicine and cannot lawfully be sold as a research chemical in the UK. Our index of 126 UK vendors contains zero stocking it. The absence is the correct state of affairs, not a gap in the market.",
      },
      {
        question: "What is a fair price per milligram of pramipexole in the UK?",
        answer:
          "Between about £2.16 and £6.25 per milligram of base, based on verified UK pharmacy listings in November 2026 (0.088 mg tablets at £0.19 to £0.55, and a 30 × 0.18 mg pack at £22.50 = £4.17 per mg). Anything materially below £2 suggests the product is not a UK authorised medicine.",
      },
      {
        question: "Does a 0.088 mg tablet really contain only 0.088 mg?",
        answer:
          "It contains 0.088 mg of pramipexole base, which is 0.125 mg of pramipexole dihydrochloride monohydrate. The conversion factor is 1.43 (302.3 ÷ 211.33 g/mol, PubChem CIDs 166589 and 119570). UK labels dose in base; some overseas sources use salt weight, so always check which basis a price is quoted on.",
      },
      {
        question: "Is a research-grade certificate of analysis worth anything for pramipexole?",
        answer:
          "Less than for a peptide, and usually for a different reason. A COA cannot distinguish the (S) enantiomer — the drug — from the (R) enantiomer, which is a different compound, unless it used a chiral method. Almost none state that they did. For a licensed medicine, the batch is released under GMP against the marketing authorisation, which is the stronger assurance.",
      },
      {
        question: "How does pramipexole cost compare with a research peptide per gram?",
        answer:
          "They are closer than you would expect. At about £4 per milligram of base, a gram of pramipexole base is roughly £4,000 at retail. A 5 mg peptide vial at £15 works out at £3,000 per gram. The prescription drug is not dramatically more expensive — it is simply sold in far smaller units.",
      },
    ],
    references: [
      "PubChem CID 119570 (pramipexole free base): C10H17N3S, 211.33 g/mol. Retrieved November 2026.",
      "PubChem CID 166589 (pramipexole dihydrochloride monohydrate): C10H21Cl2N3OS, 302.3 g/mol. Retrieved November 2026.",
      "Life Pharmacy UK, Pramipexole 0.088 mg tablets, £0.19 per tablet (prescription required). Retrieved 7 November 2026.",
      "Chemist.net, Pramipexole 88 mcg tablet, £0.55 (private prescription). Retrieved 7 November 2026.",
      "Dock Pharmacy, Pramipexole 0.18 mg tablets × 30, £22.50. Retrieved 7 November 2026.",
      "ViralPeps vendor index: 126 UK suppliers, none listing pramipexole. Checked 7 November 2026.",
      "Wei D, et al. Chiral LC-MS/MS assay to determine that dexpramipexole is not converted to pramipexole in vivo. J Chromatogr B. 2014. PMID 25289790 (basis for the chiral-identity point).",
    ],
  },
};
