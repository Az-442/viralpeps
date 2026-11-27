import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class D queue DAY 13 (2026-11-27, ghk-cu, Lane B) — see class-d-article-queue.md
export const ghkCuVsRetinolContent: Record<string, ResearchPageContent> = {
  "ghk-cu-vs-retinol": {
    slug: "ghk-cu-vs-retinol",
    compoundSlug: "ghk-cu",
    pullQuote:
      "Every comparison of these two ranks them on collagen. That is the one axis on which the evidence cannot be compared: retinol has randomised vehicle-controlled facial wrinkle trials and GHK-Cu does not. The honest version of this comparison is about which evidence you are willing to accept, not which molecule is stronger.",
    quickInfo: [
      { label: "Class", value: "GHK-Cu: copper-binding tripeptide · Retinol: vitamin A alcohol (diterpenoid)" },
      { label: "GHK-Cu identity", value: "C14H23CuN6O4+ · 402.92 g/mol · PubChem CID 71587328" },
      { label: "Retinol identity", value: "C20H30O · 286.5 g/mol · PubChem CID 445354" },
      { label: "Conversion required", value: "GHK-Cu: none · Retinol: two oxidation steps to retinoic acid" },
      { label: "Receptor route", value: "GHK-Cu: extracellular / copper-dependent enzyme · Retinol: RAR-RXR nuclear" },
      { label: "Head-to-head RCT", value: "None located on MEDLINE" },
      { label: "Facial wrinkle RCTs", value: "Retinol: multiple vehicle-controlled · GHK-Cu: none comparable" },
      { label: "Status of material", value: "Both cosmetic ingredients; research-grade vials are laboratory reagents only" },
    ],
    sections: [
      {
        title: "The Comparison Nobody Should Be Making on Collagen",
        body:
          "Search this comparison and every page will hand you the same scoreboard: copper peptide builds collagen of four types, retinol builds two, therefore copper wins on breadth. It is a tidy argument and it is measuring the wrong thing, because collagen output is the one endpoint where the two compounds have genuinely different qualities of evidence — and the comparison only works if you pretend they do not.\n\nRetinol has randomised, vehicle-controlled facial wrinkle trials. GHK-Cu has mechanistic work, animal wound models, in-vitro fibroblast studies and a small number of cosmetic trials. Those are not the same kind of evidence, and no amount of gene-expression data closes the gap. The category knows this and works around it by never stating the trial count for GHK-Cu and never stating the endpoint for retinol. Both omissions are doing the same job.\n\nThis article does the comparison on the four things that are actually comparable — the molecular identities, the receptor routes, the trial designs, and the populations — and says at each step which compound the evidence favours, on which endpoint, in which population. There is no winner at the end, because a comparison across two different evidence hierarchies does not produce one.\n\nThe listings for both materials sit on the [GHK-Cu compound page](/compounds/ghk-cu); this page stays on the evidence.",
      },
      {
        title: "GHK-Cu vs Retinol on Molecular Identity: One Is a Complex, One Is a Provitamin",
        body:
          "The two are not the same kind of molecule, and the difference matters more than it sounds. GHK-Cu is a tripeptide — glycine, histidine, lysine — with a copper(II) ion coordinated through the histidine imidazole ring. The peptide and the metal are one functional unit. Strip the copper and you have GHK, a different compound with different activity.\n\nThe PubChem record for the copper complex is CID 71587328, formula C14H23CuN6O4+, molecular weight 402.92 g/mol, reachable by its CAS synonym 89030-95-5. The free tripeptide is a separate record entirely: CID 73587, C14H24N6O4, 340.38 g/mol, CAS 49557-75-7. That distinction is where the most common identity error in this category comes from — pages quoting \"GHK-Cu, 340 Da\" are quoting the peptide without its metal. The copper complex is 62.5 g/mol heavier than the peptide alone, which is roughly the atomic mass of copper, as it should be.\n\nRetinol is a diterpenoid alcohol, CID 445354, C20H30O, 286.5 g/mol. It is not active as retinol. It becomes active only after two sequential oxidations — retinol to retinaldehyde, retinaldehyde to all-trans-retinoic acid (CID 444795, C20H28O2, 300.4 g/mol) — which is why over-the-counter retinol is consistently weaker than prescription tretinoin, the acid itself.\n\nThat conversion step is not a footnote. It means retinol's dose-response is partly a question of how efficiently a given skin converts it, which varies between individuals and between formulations. GHK-Cu has no equivalent activation bottleneck — its constraint is stability and delivery of the intact copper complex, which is why formulation pH and the presence of acids both matter for it in a way retinol does not experience.",
        table: {
          header: ["Property", "GHK-Cu", "Retinol"],
          rows: [
            ["PubChem CID", "71587328", "445354"],
            ["Formula", "C14H23CuN6O4+", "C20H30O"],
            ["Molecular weight", "402.92 g/mol", "286.5 g/mol"],
            ["CAS synonym", "89030-95-5", "68-26-8"],
            ["Active form", "Intact copper complex", "all-trans-retinoic acid (two oxidations)"],
            ["Free base / precursor", "GHK, CID 73587, 340.38 g/mol", "Retinaldehyde, then retinoic acid"],
          ],
        },
      },
      {
        title: "Two Receptor Routes That Cannot Be Ranked",
        body:
          "GHK-Cu works from outside the cell. It binds copper and delivers it to copper-dependent enzymes — most relevantly lysyl oxidase, which cross-links collagen and elastin into functional fibres — and it modulates a broad transcriptional programme indirectly. The gene-expression data most often cited comes from Pickart and Margolina's 2018 review in the International Journal of Molecular Sciences (PMID 29986520), which reports that GHK altered the expression of a substantial fraction of the genes assayed.\n\nThat review is frequently summarised in this category as \"affects 4,000 genes\" or, worse, \"31% of the human genome\". The correct reading is narrower: 31.2% of the genes in the assay, in cell culture. It is a real and interesting signal. It is not a clinical outcome, and it is not an efficacy result.\n\nRetinol's route is direct and nuclear. After conversion to retinoic acid, it binds retinoic acid receptors which heterodimerise with retinoid X receptors and act on response elements in target gene promoters. That is a transcription factor pathway with a defined target set — collagen genes among them, matrix metalloproteinases among them — and it is why the retinol response is both sharper and more irritating. Forcing transcription in every cell regardless of that cell's readiness is the mechanism and the side effect at once.\n\nOn the mechanism question the evidence favours neither. GHK-Cu's programme is broader; retinol's is more specific and better characterised at the receptor level. Those are different virtues and they do not convert into each other.",
      },
      {
        title: "GHK-Cu vs Retinol on Trial Design: The Head-to-Head That Does Not Hold",
        body:
          "Every competitor page in this category cites the same head-to-head: Abdulghani et al., 1998, topical preparations applied for one month to human thigh skin, punch biopsy, procollagen measured, with the reported result that 7 of 10 copper-peptide subjects responded against 4 of 10 tretinoin subjects.\n\nA PubMed author search for Abdulghani combined with copper returns no matching record, and a search combining the author with copper peptide and procollagen returns nothing either. The study appears not to be indexed in MEDLINE. This site cannot therefore confirm its title, journal, volume or year, and it is referenced here as a claim the category makes rather than as a verified citation.\n\nEven granting it, the design has four objections that none of the three competitor pages states together:\n\nThe endpoint is **binary**, not magnitude. \"Procollagen response yes or no\" in ten subjects cannot detect a difference in how much collagen was made, only in how many people crossed a threshold.\n\nThe duration is **one month**. A retinoid collagen response is conventionally measured at three to six months. A one-month window samples inside the latency of one arm and outside the plateau of the other. It is not a neutral comparison window.\n\nThe sample is **ten per arm**. Any difference of three responders in ten is well inside what chance produces at that size.\n\nThe site is **thigh skin**, not face. Facial photoageing is the endpoint people actually mean when they ask this question, and thigh skin is not a proxy for it.\n\nThere is also a comparable human study that gets far less circulation. Miller and colleagues, in Archives of Facial Plastic Surgery in 2006 (PMID 16847171), examined a topical copper tripeptide complex on CO2 laser-resurfaced skin — a real wound-healing context, which is where the copper-peptide case is strongest. That study is cited less often than the 1998 responder count because its result is less quotable, not because it is weaker.",
      },
      {
        title: "Where the Evidence Favours Retinol, and by How Much",
        body:
          "On facial wrinkling, the evidence favours retinol and it is not close. Kafi and colleagues, in Archives of Dermatology in 2007 (PMID 17515510), treated naturally aged skin with topical retinol against vehicle and reported histological improvement in the retinol arm alongside clinical assessment — a randomised, vehicle-controlled design on the endpoint the question is actually about.\n\nThe broader OTC-retinol picture was reviewed systematically by Spierings in the Journal of Clinical Aesthetic Dermatology in 2021 (PMID 34980969), covering over-the-counter vitamin A cosmetic products for facial skin ageing. The review is worth reading for its caution as much as its conclusions: the OTC evidence base is real but smaller and more variable than the prescription tretinoin literature it is routinely conflated with.\n\nThat conflation is the second most common error in this category. Trials of tretinoin are not trials of retinol. A page that quotes a tretinoin wrinkle result and then recommends an over-the-counter retinol product has described two different interventions, and the potency gap between them is roughly an order of magnitude because of the conversion steps described above.\n\nSo: on facial wrinkle endpoints, in photoaged adult populations, over twelve weeks or more, randomised and vehicle-controlled — retinol wins on volume and quality of evidence. That is the honest statement and it should be stated before any mechanism discussion, because mechanism is what makes the comparison feel settled when it is not.",
      },
      {
        title: "Where the Evidence Favours GHK-Cu",
        body:
          "GHK-Cu's evidence advantage is in tissue repair, not in cosmetic wrinkling. Maquart and colleagues, in the Journal of Clinical Investigation in 1993 (PMID 8227353), demonstrated in-vivo stimulation of connective tissue accumulation by the tripeptide-copper complex in rat experimental wounds — a controlled animal study with a clear mechanism and a measurable matrix outcome.\n\nThe human surgical context adds to this. The Miller 2006 study on laser-resurfaced skin is the clearest human application of a copper tripeptide where the wound-healing rationale is the relevant one. A resurfaced face is an open wound; collagen synthesis and re-epithelialisation are the endpoints that matter, and that is precisely the biology the copper complex is best supported for.\n\nMore recent work has moved toward formulation science. Jiang and colleagues, in the Journal of Cosmetic Dermatology in 2023 (PMID 37062921), reported synergy between GHK-Cu and hyaluronic acid on collagen IV upregulation in fibroblast and ex-vivo skin tests. Collagen IV is basement membrane collagen rather than dermal filler collagen — a different target from the one the retinol trials measure, and worth noting because it shows how easily \"collagen\" covers two unrelated endpoints.\n\nOn repair endpoints, in wound and surgical models, GHK-Cu has the better-supported case. On facial wrinkle endpoints in photoaged adults, it does not have comparable randomised evidence. Both statements are true at once and the category prefers not to make the second one.",
      },
      {
        title: "Why the Two Are Not Really Interchangeable",
        body:
          "The most common consumer framing — \"copper peptide or retinol?\" — assumes a substitution. The evidence does not support substitution; it supports a division of labour, and it is worth being precise about why.\n\nGHK-Cu's constraints are chemical. The copper complex is sensitive to low pH and to strong reducing agents, so it does not coexist happily in the same layer as high-concentration ascorbic acid or direct acids. It also degrades with light and with copper-mediated oxidation if formulated poorly. Retinol's constraints are biological: it is photolabile, it increases photosensitivity during use, and it produces a defined adaptation period of erythema and desquamation in a large share of users before tolerance develops.\n\nThis means the combination question is not \"which is stronger\" but \"can this person tolerate the one with the better evidence\". For a user who cannot get through retinisation, copper peptide is the realistic option and the honest description of its evidence is that it is gentler and less proven on the endpoint they care about. For a user who tolerates retinol, the copper peptide is an adjunct, not a replacement.\n\nNone of the three competitor pages reviewed for this article quantifies that evidence gap. Two frame the pair as complementary without saying which is doing the proven work; one calls retinol the proven anti-ager but presents the GHK-Cu case without a single trial count. The gap is the finding. On facial wrinkle endpoints retinol has randomised controlled evidence and GHK-Cu does not, and a comparison that will not say so is not a comparison.\n\nFor the broader context on how these materials are supplied and what to check before using either, the [supplier verification guide](/research/choosing-a-uk-supplier) and the [COA reading guide](/research/how-to-read-a-coa) apply to both compounds equally. Readers interested in how GHK-Cu compares against a different repair peptide should see the [GHK-Cu vs BPC-157 comparison](/research/ghkcu-vs-bpc157).",
        table: {
          header: ["Question", "Evidence favours", "Endpoint", "Population"],
          rows: [
            ["Which reduces facial wrinkles?", "Retinol", "Wrinkle score vs vehicle, 12+ weeks", "Photoaged adults"],
            ["Which has better repair evidence?", "GHK-Cu", "Wound matrix accumulation", "Rat wounds; laser-resurfaced skin"],
            ["Which has broader gene modulation?", "GHK-Cu (in vitro)", "Transcriptional assay", "Cell culture, not clinical"],
            ["Which has a defined receptor target?", "Retinol", "RAR-RXR mediated transcription", "Mechanistic; consistent across studies"],
            ["Which is better tolerated?", "GHK-Cu", "Irritation and adaptation period", "Cosmetic trial populations"],
            ["Which has a verified head-to-head RCT?", "Neither", "—", "None located on MEDLINE"],
          ],
        },
      },
    ],
    faq: [
      {
        question: "Is GHK-Cu or retinol better for skin?",
        answer:
          "On facial wrinkle endpoints in photoaged adults, retinol has randomised vehicle-controlled trial evidence and GHK-Cu does not have comparable randomised facial evidence. GHK-Cu has the better-supported case on tissue repair endpoints. Which matters depends on what you are asking about, and the category usually does not separate the two.",
      },
      {
        question: "What is the molecular weight of GHK-Cu?",
        answer:
          "402.92 g/mol for the copper complex, PubChem CID 71587328, formula C14H23CuN6O4+. The figure of 340 g/mol that circulates widely is the molecular weight of the free GHK tripeptide without its copper — a different record, CID 73587. Quoting 340 as GHK-Cu is the most common identity error in this category.",
      },
      {
        question: "Was the Abdulghani 1998 GHK-Cu vs tretinoin study verified?",
        answer:
          "No. A PubMed author search for Abdulghani combined with copper, and with copper peptide and procollagen, returns no matching record. It appears not to be indexed in MEDLINE, so this site cannot confirm its title, journal or year. It is cited here as a claim the category makes, with its design limitations stated, not as a verified citation.",
      },
      {
        question: "Can GHK-Cu and retinol be used together?",
        answer:
          "They are chemically compatible in sequence but not in the same layer at the same time. GHK-Cu's copper complex is disrupted by low pH and by strong acids or high-concentration vitamin C; retinol is photolabile and increases photosensitivity. No controlled study of same-layer application exists — the widely quoted irritation figures for simultaneous use come from sources that could not be verified.",
      },
      {
        question: "Why do retinol trial results differ so much between studies?",
        answer:
          "Because retinol is a prodrug requiring two oxidations to retinoic acid, and conversion efficiency varies by formulation and by individual. Trials of the acid itself — tretinoin — are not trials of retinol, and comparing an OTC retinol result to a tretinoin result understates the gap. The 2021 systematic review of OTC vitamin A products (PMID 34980969) sets out how variable that base actually is.",
      },
      {
        question: "Does the \"4,000 genes\" claim about GHK-Cu mean it is proven?",
        answer:
          "No. The figure traces to Pickart and Margolina's 2018 review (PMID 29986520), which reports altered expression in roughly 31% of the genes in the assay — in cell culture. Gene-expression changes in cultured cells are a mechanistic signal, not a clinical outcome, and they are not evidence of facial wrinkle improvement in humans.",
      },
    ],
    references: [
      "GHK-Cu identity verified against PubChem compound record CID 71587328 (formula C14H23CuN6O4+, average mass 402.92 g/mol, CAS synonym 89030-95-5), retrieved 27 November 2026. Free tripeptide GHK verified against CID 73587 (C14H24N6O4, 340.38 g/mol, CAS 49557-75-7).",
      "Retinol identity verified against PubChem compound record CID 445354 (C20H30O, average mass 286.5 g/mol); all-trans-retinoic acid CID 444795 (C20H28O2, 300.4 g/mol), retrieved 27 November 2026.",
      "Maquart FX, et al. In vivo stimulation of connective tissue accumulation by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+ in rat experimental wounds. J Clin Invest. 1993 Nov. PMID 8227353.",
      "Pickart L, Margolina A. Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data. Int J Mol Sci. 2018 Jul 7. PMID 29986520.",
      "Kafi R, et al. Improvement of naturally aged skin with vitamin A (retinol). Arch Dermatol. 2007 May. PMID 17515510.",
      "Miller TR, et al. Effects of topical copper tripeptide complex on CO2 laser-resurfaced skin. Arch Facial Plast Surg. 2006 Jul-Aug. PMID 16847171.",
      "Jiang F, et al. Synergy of GHK-Cu and hyaluronic acid on collagen IV upregulation via fibroblast and ex-vivo skin tests. J Cosmet Dermatol. 2023 Sep. PMID 37062921.",
      "Spierings NMK. Evidence for the Efficacy of Over-the-counter Vitamin A Cosmetic Products in the Improvement of Facial Skin Aging: A Systematic Review. J Clin Aesthet Dermatol. 2021 Sep. PMID 34980969.",
      "Abdulghani et al. (1998) head-to-head procollagen study: cited by competitor pages in this category. PubMed author searches for Abdulghani combined with copper, and with copper peptide and procollagen, returned no matching MEDLINE record on 27 November 2026. Referenced as an unverified category claim, not as a confirmed citation.",
    ],
  },
};
