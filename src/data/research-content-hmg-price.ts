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

// appended by Class C queue day 10 (HMG) — see class-c-article-queue.md
export const hmgPriceContent: Record<string, ResearchPageContent> = {
  "hmg-uk-price-guide": {
    slug: "hmg-uk-price-guide",
    compoundSlug: "hmg",
    pullQuote:
      "Price per IU is the only comparison that works for HMG, because IU is the only number the material actually has. The UK catalogue is two listings from one supplier — £36.00 and £60.00 — so the useful work is reading the specification, not the price.",
    quickInfo: [
      { label: "Compound", value: "HMG (Human Menopausal Gonadotropin)" },
      { label: "Market", value: "UK, 2 catalogue listings, 1 supplier" },
      { label: "Sticker range", value: "£36.00 to £60.00" },
      { label: "Cheapest", value: "£36.00 per 75 IU (lyophilised vial)" },
      { label: "Average", value: "£48.00 across the two listings" },
      { label: "Pen premium", value: "£24.00 (67%) over the powder vial" },
      { label: "Delivery", value: "Free on both listings" },
      { label: "Correct unit", value: "£ per IU of FSH and LH activity — never £ per mg" },
    ],
    sections: [
      {
        title: "Why HMG Is Priced Per IU and Not Per mg",
        body:
          "Every other page in this price-guide series divides a vial price by the number of milligrams in the vial. That calculation is impossible for HMG, and not because the data is missing.\n\nHMG is a urinary extract standardised by bioassay. A 75 IU vial contains 75 international units of follicle-stimulating hormone activity and a defined quantity of luteinising hormone activity, measured against an established biological standard. It does not contain a stated mass of any single substance, because there is no single substance to state. Two vials from different manufacturers can express the same IU figure while containing materially different amounts of protein.\n\nThat makes **price per IU** the only per-unit comparison with meaning. Two consequences follow. First, any listing that quotes an HMG price per milligram, or gives a molecular weight to divide by, has not understood the material. Second, because bioassay standardisation is product-specific, IU figures are not strictly interchangeable between manufacturers — which means a per-IU comparison across brands is a comparison of labelled potency, not of measured potency.\n\nThe [HMG compound page](/compounds/hmg) lists each UK product by its IU specification for exactly this reason. The unit is the product.\n\nThere is a second layer that makes HMG unusual. The composition analysis published in 2024 found that the LH-receptor-active component of highly purified HMG is predominantly hCG rather than pituitary LH, and that protein impurities account for roughly twenty to thirty percent of total protein content. So even at a fixed IU label, what else is in the vial is a variable a buyer should be aware of — and it is not priced anywhere.",
      },
      {
        title: "The UK Market in Numbers",
        body:
          "The UK HMG catalogue is thin. At the time of writing ViralPeps tracks two products from a single supplier, both standardised at 75 IU.\n\nThat is the entire market as measured. There is no long tail, no pack-size ladder and no meaningful spread to analyse. Anyone expecting a dozen vendors and a per-IU curve is working from the HCG market, which is a different compound with a much deeper catalogue and a much lower entry price.\n\nThe two listings are the same nominal preparation in two delivery formats: a lyophilised powder vial at £36.00 and a pre-filled pen at £60.00. Both are listed as in stock, both carry free delivery, and both come from a supplier with a TrustScore of 60.\n\nThe absence of competition is itself the finding. HMG is a licensed medicine in the UK, not a research chemical in the ordinary sense, and the number of suppliers willing to list a 75 IU gonadotropin preparation to a laboratory audience is small. That scarcity shows up as price stability rather than as a spread, which is the opposite of how a peptide market behaves.",
      },
      {
        title: "Powder Versus Pen: What the £24 Buys",
        body:
          "The single comparison this market actually offers is format. £36.00 for a lyophilised vial against £60.00 for a pre-filled pen is a 67% premium for a different presentation of the same labelled potency.\n\nThe pen is not a marketing gimmick. A pre-filled liquid pen removes reconstitution as a step, and a 2021 study established bioequivalence between a pre-filled liquid HP-hMG pen and powder for reconstitution. So the premium is not buying a different pharmacological product — it is buying handling convenience and, in a clinical setting, dose accuracy and traceability.\n\nFor a laboratory, the arithmetic on that premium depends on how much of the work is reconstitution and how much is recovery. A lyophilised powder must be reconstituted with a defined diluent volume, and every reconstitution is an opportunity to lose material to the vial wall or to split the dose imprecisely. A pen removes that variable at the cost of storing a liquid formulation.\n\nWhat the premium does not buy is more material. Both listings are 75 IU. If a study needs repeated small aliquots of a liquid preparation, the pen is defensible at £60.00. If it needs a single reconstituted working stock, £36.00 is the correct buy and the extra £24.00 buys nothing. Given only two listings, this is the whole of the pricing decision — and it is a format decision, not a value decision.",
        table: {
          header: ["Format", "Price", "IU", "Premium", "What it changes"],
          rows: [
            ["Lyophilised vial", "£36.00", "75 IU", "—", "Requires reconstitution; lowest cost per IU"],
            ["Pre-filled pen", "£60.00", "75 IU", "+£24.00 (67%)", "No reconstitution step; bioequivalent to powder"],
          ],
        },
      },
      {
        title: "Summing a Market of Two",
        body:
          "This is where a price guide has to be honest about its own statistics. With two data points, mean, median and low end are almost the same number, and none of them describes a market.\n\nAverage is £48.00. Cheapest is £36.00. The difference between those two figures is a single listing, not a trend. Quoting a \"market average\" for HMG would be quoting the midpoint between one supplier's powder and the same supplier's pen.\n\nThe more useful framing is a per-IU floor. At £36.00 for 75 IU, the floor is **£0.48 per IU**. At £60.00 it is **£0.80 per IU**. Those two numbers are the only per-IU figures the UK catalogue supports, and they describe a single supplier's two presentations rather than a competitive range.\n\nAnyone building a budget should treat £0.48 per IU as the entry point and assume the price is set by supply scarcity rather than by competition. In a category with one supplier, the cheaper listing is not \"the market low\" — it is the only price there is, and it can move without a competitor response.",
      },
      {
        title: "Reading an HMG Specification (the COA Equivalent)",
        body:
          "A peptide certificate of analysis has a predictable shape: identity by mass, purity by HPLC, water content, appearance. None of those fields does useful work for HMG, and a document that offers only those fields has avoided the actual questions.\n\nWhat a specification for this material should state:\n\n**FSH activity in IU per vial and LH activity in IU per vial, each against a named standard.** This is the only identity the material has. Note the standard used, because bioassay standardisation is product-specific.\n\n**Protein content per vial.** Without it, an IU figure is a potency statement floating free of mass, and the impurity fraction cannot be assessed.\n\n**A purity definition that is protein-based, not peak-based.** The composition analysis found protein impurities at roughly twenty to thirty percent of total protein content and more than two hundred non-gonadotropin proteins. An HPLC percentage applied to a urinary extract measures something other than what a buyer thinks it measures.\n\n**Lot number, source and expiry.** The starting material is pooled human urine; lot-to-lot variation is structurally expected, and a specification that presents the material as uniform is misdescribing it.\n\n**For a pen, the bioequivalence basis.** The powder-to-pen equivalence is published, and citing it is the difference between a documented presentation change and an unsupported one.\n\nThe general checks in the peptide category — mass spectrum, sequence, water content — simply do not apply. A supplier who supplies them for HMG is answering questions that were never asked.",
      },
      {
        title: "What a Fair Price Looks Like",
        body:
          "Given a two-listing market, a \"fair price\" is close to a statement about the current price. **£36.00 for a 75 IU lyophilised vial — £0.48 per IU — is the reference point in the UK**, and £60.00 for the pen is defensible only where the no-reconstitution advantage is worth £24.00 to the specific piece of work.\n\nTwo things would change that assessment, and a buyer should watch for both.\n\n**A second supplier.** One entrant changes the market more than any price movement from the existing supplier. If HMG appears from a second UK vendor at a per-IU figure, the spread will start to mean something and a genuine comparison becomes possible.\n\n**A specification change.** A listing that adds a stated protein content and a named standard is offering a materially better-specified product at the same sticker price, which is a real price reduction in effective terms. A listing that drops its IU detail to a bare price is doing the opposite.\n\nThe category also carries a legal distinction that pricing pages tend to skip. HMG is a licensed medicine in the UK and EU. A research-catalogue listing of a licensed medicine occupies a different regulatory position from a synthetic peptide, and a buyer should be satisfied that the supply route is appropriate before any price comparison matters.\n\nFinally, the standing caveat for every page in this series. ViralPeps is a comparison site: it does not sell HMG, does not issue certificates of analysis, and does not vouch for any listing. The numbers here exist so that the thinness of the market is visible before anyone assumes a \"market rate\" exists.",
      },
      {
        title: "How to Verify a Supplier Before You Buy",
        body:
          "Four checks, ordered by how quickly they separate a real supplier from a shopfront.\n\n**Ask what standard the IU figures are measured against.** This is the HMG equivalent of asking a peptide supplier for a mass spectrum. A supplier who understands the material will name a standard or explain the bioassay basis. One who cannot has probably copied an IU figure from a product label.\n\n**Ask for protein content per vial.** If a supplier cannot state the protein mass behind the potency, they cannot assess the impurity fraction either, and the specification is a label rather than an analysis.\n\n**Check whether the listing claims a CAS number or a molecular weight for HMG.** It cannot have either. A listing that provides them has filled a template field rather than described the product, and the same template will be wrong in other places too.\n\n**Check the vendor, not only the compound.** The [ViralPeps supplier directory](/vendors) carries verification status, delivery experience and TrustScore for every vendor in the catalogue. In a market of one supplier that check matters more than usual, because there is no competitor to compare against and no alternative listing to fall back on. The live per-vendor breakdown for this compound sits on the [HMG price comparison page](/compounds/hmg).",
      },
    ],
    faq: [
      {
        question: "What is a fair UK price for HMG?",
        answer:
          "£36.00 for a 75 IU lyophilised vial, or about £0.48 per IU, is the current UK reference point. The only other listing is the same supplier's pre-filled pen at £60.00, or £0.80 per IU. With two listings from one supplier there is no competitive range to speak of, so the fair-price question is really a format question.",
      },
      {
        question: "Why is HMG priced per IU instead of per mg?",
        answer:
          "Because HMG has no meaningful mass specification. It is a urinary extract standardised by bioassay, so potency is expressed as international units of FSH and LH activity rather than as milligrams of a defined substance. Any per-milligram figure for HMG is measuring the wrong quantity.",
      },
      {
        question: "Is the HMG pen worth the extra £24?",
        answer:
          "Only if the no-reconstitution advantage matters to your work. A 2021 study showed the pre-filled liquid pen is bioequivalent to powder for reconstitution, so the premium is buying handling convenience, not a different product. Both listings are 75 IU, so the pen does not buy more material.",
      },
      {
        question: "What should an HMG certificate of analysis contain?",
        answer:
          "FSH and LH activity in IU per vial against a named standard, protein content per vial, a protein-based purity definition rather than an HPLC peak percentage, and a lot number. Identity by mass spectrum and peptide sequence are the wrong tests for this material and their presence is a sign the supplier has reused a peptide template.",
      },
      {
        question: "Why are there so few UK HMG listings?",
        answer:
          "HMG is a licensed medicine in the UK and EU rather than an ordinary research chemical, and few suppliers will list a 75 IU gonadotropin preparation to a laboratory audience. The scarcity shows up as price stability rather than as a spread, which is the opposite of how a competitive peptide market behaves.",
      },
    ],
    references: [
      "Capolupo A, Petrocchi S, Melchiorre M, et al. Analytical Investigation of the Profile of Human Chorionic Gonadotropin in Highly Purified Human Menopausal Gonadotrophin Preparations. Int J Mol Sci. 2024;25(17):9405. doi:10.3390/ijms25179405. PMID 39273352.",
      "First pre-filled pen device with highly purified human menopausal gonadotropin (HP-hMG, Menopur) in liquid is shown to be bioequivalent to powder for reconstitution. Int J Clin Pharmacol Ther. 2021. PMID 34622768.",
      "Heterogeneous hCG and hMG commercial preparations result in different intracellular signalling but induce a similar long-term progesterone response in vitro. Mol Hum Reprod. 2017. PMID 29044421.",
      "Pharmacokinetics and Pharmacodynamics of Follicle-Stimulating Hormone in Healthy Women Receiving Single and Multiple Doses of Highly Purified Human Menotrophin and Urofollitrophin. Clin Drug Investig. 2016. PMID 27638053.",
    ],
  },
};
