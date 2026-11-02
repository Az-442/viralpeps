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
export const hmgContent: Record<string, ResearchPageContent> = {
  "hmg-research-guide": {
    slug: "hmg-research-guide",
    compoundSlug: "hmg",
    pullQuote:
      "HMG has no CAS number, no formula and no molecular weight — because it is not a molecule. It is a urinary extract whose potency is defined by bioassay, and whose 'LH activity' is mostly hCG.",
    quickInfo: [
      { label: "Compound", value: "Human menopausal gonadotropin (menotropin, hMG)" },
      { label: "Class", value: "Urinary gonadotropin preparation — not a peptide" },
      { label: "CAS", value: "None valid for the preparation" },
      { label: "Molecular weight", value: "Not applicable — two glycosylated heterodimers" },
      { label: "Potency basis", value: "IU of FSH and LH activity (bioassay), not mass" },
      { label: "Dominant LH activity", value: "Placental hCG, not pituitary LH" },
      { label: "Protein impurity load", value: "≈20–30% of total protein (hp-hMG analysis, 2024)" },
      { label: "UK catalogue", value: "2 listings, 1 supplier, from £36.00 per 75 IU" },
    ],
    sections: [
      {
        title: "What HMG Actually Is",
        body:
          "Human menopausal gonadotropin — menotropin, hMG — is a preparation, not a compound. It is extracted from the urine of postmenopausal women, in whom circulating gonadotropin output is high because ovarian negative feedback has fallen away with the end of follicular activity. The extraction captures whatever gonadotropin activity is present in that urine, and the result is sold as a standardised number of international units of follicle-stimulating hormone and luteinising hormone activity.\n\nThat definition sounds like a technicality. It is not. Almost every downstream confusion about HMG — its missing identity data, its unusual purity claims, its regulatory position, and the strange composition of its LH arm — flows from the fact that it is a biological extract standardised by a bioassay rather than a synthesised molecule standardised by mass.\n\nFSH and LH themselves are real, well-characterised proteins. Both are heterodimers built from a common alpha subunit and a hormone-specific beta subunit, and both act at class A G-protein-coupled receptors. If HMG were simply a 1:1 mixture of those two proteins, it would be a well-behaved material. What the analytical literature shows is that it is not quite that mixture, and the difference matters for anyone designing an experiment around it.\n\nA second trap sits upstream of all of this: the abbreviation. In reproductive endocrinology, hMG is human menopausal gonadotropin. In chromatin biology, HMG means the high mobility group proteins — HMGA, HMGB and HMGN — and the HMG-box is a DNA-binding domain found in the SOX and SRY transcription factors. In metabolism, HMG-CoA is the substrate of HMG-CoA reductase. Four unrelated bodies of literature share three letters, and a literature search that does not disambiguate will quietly mix them.",
      },
      {
        title: "Why HMG Has No CAS Number, Formula or Molecular Weight",
        body:
          "A CAS Registry Number identifies a defined chemical substance. HMG is not one. It is a variable biological extract containing two different glycosylated heterodimers, a substantial load of unrelated urinary proteins, and a composition that differs between manufacturers and between purification grades.\n\nThis has a practical consequence for anyone reading vendor pages. When a listing introduces HMG with a full identity block — CAS, molecular formula, molecular weight, sequence — at least one of those fields is wrong, and usually all of them are. The same pattern appears on compound reference pages and in catalogues: a template designed for a synthesised peptide, filled in with plausible-looking values because the field was mandatory.\n\nPubChem has no identifier for menotropin or menotropins. The record that does surface under a human menopausal gonadotropin heading resolves to a small aldehyde, not to a gonadotropin — a registry artefact, and precisely the sort of thing a vendor copies without checking. The honest identity block for HMG has one line: potency in IU, per vial, for each of the two activities.\n\nThis is why the [HMG compound page](/compounds/hmg) on this site specifies the preparation by IU content and leaves the molecular fields empty. For this class of material a missing field is more accurate than a filled one, and the IU figure is the only number that predicts what a vial will do in a receptor assay.\n\nThe same logic applies to purity. HPLC purity percentages are designed for a single synthetic species eluting as one peak. Applied to a urinary extract that is tens of percent non-gonadotropin protein by mass, a \"≥99% HPLC\" claim is not a measure of anything a researcher can use. The analytical question for HMG is what fraction of the protein content is gonadotropin, and no single chromatographic purity figure answers it.",
      },
      {
        title: "Mechanism of Action: Two Receptors, Two Arms",
        body:
          "FSH and LH act at distinct receptors, and both couple predominantly to G-alpha-s, raising intracellular cAMP. The downstream consequences differ by tissue.\n\nIn the ovary, FSH receptor activation on granulosa cells drives follicular growth, aromatase expression and oestradiol production. LH receptor activation on theca cells supplies the androgen substrate that aromatase converts. This two-cell arrangement is why the combination is mechanistically different from either hormone alone: theca androgen output and granulosa aromatisation are coupled steps, and supplying only one arm leaves the other under-stimulated.\n\nIn the testis, FSH receptor activation on Sertoli cells supports spermatogenesis, while LH receptor activation on Leydig cells drives androgen synthesis through the same steroidogenic machinery that hCG engages, including cholesterol transport into mitochondria by the STARD1 pathway.\n\nThat last point is the mechanistic distinction that most often goes unstated. hCG supplies LH receptor activity only. HMG supplies both receptor activities. In hypogonadotropic hypogonadism, where the pituitary secretes neither gonadotropin, replacing LH activity alone restores testosterone but not spermatogenesis; the FSH arm is what permits germ-cell development to proceed. The readouts separate cleanly: testosterone tracks the LH component, testicular volume and sperm parameters track the FSH component.\n\nOne caveat sits on top of the model. Because the LH receptor is engaged by both LH and hCG, and because hCG is the dominant LH-receptor-active species in the preparation (see below), an experiment using HMG is not a clean LH experiment in the way the label suggests. Receptor occupancy is real; the ligand doing most of the occupying is not pituitary LH.",
      },
      {
        title: "The Composition Problem: What Is Really in the Vial",
        body:
          "The most useful single document for anyone treating HMG as a research material is a 2024 glycoproteomic analysis of highly purified human menopausal gonadotropin preparations, published in the International Journal of Molecular Sciences. Its findings are the sort that reorganise how a specification should be read.\n\nFirst, the LH activity is not predominantly LH. Across the samples analysed, the beta subunit of LH was detected only in traces — on the order of one percent — while the beta subunit of hCG was present at levels between roughly eighteen and forty-seven percent. The glycans on the hCG component matched placental hCG rather than pituitary hCG, indicating a non-pituitary source. In plain terms: the second gonadotropin arm of HMG is largely hCG, not LH.\n\nThe researchers also estimated that protein impurities constituted roughly twenty to thirty percent of the total protein content, identified more than two hundred non-gonadotropin proteins — several of them involved in embryonic development or pregnancy — and found the alpha subunit strongly oxidised, at around a fifth of total gonadotropin content.\n\nFor a laboratory, three consequences follow. Any experiment claiming to study LH signalling with HMG is largely studying hCG signalling at a shared receptor. Any purity claim needs to be interrogated on protein-mass terms rather than peak purity. And lot-to-lot variation is structurally expected, not a defect — the starting material is pooled human urine.\n\nA separate study compared commercial hCG and hMG preparations in vitro and found that heterogeneous preparations produce different intracellular signalling while converging on a similar long-term progesterone response. That is the useful framing: at the level of a gross endpoint, preparations behave alike; at the level of the signalling pathway, they do not.",
      },
      {
        title: "Where the Research Literature Actually Sits",
        body:
          "Nearly all of the published human evidence on HMG sits in reproductive medicine, and it falls into two distinct bodies.\n\nThe larger body is controlled ovarian stimulation for IVF and ICSI, where highly purified HMG has been compared against recombinant FSH. The direction of the evidence has been debated for two decades. A 2009 meta-analysis reported better pregnancy rates with highly purified HMG in IVF cycles but not in ICSI cycles. A 2020 randomised, assessor-blinded trial compared the two in high responders. A 2023 health-economic analysis examined the same comparison in a US setting. Cochrane reviews of gonadotropins for ovulation induction exist in both a 2019 and a 2025 edition, the latter in polycystic ovary syndrome. The consistent theme across this literature is heterogeneity in dosing, protocol and endpoint definition, which is what makes head-to-head summaries difficult.\n\nThe smaller and more mechanistically informative body concerns male hypogonadotropic hypogonadism, where combined gonadotropin therapy is used to induce spermatogenesis and puberty. A 2024 systematic review and meta-analysis examined gonadotropins for pubertal induction in males. A 2002 study looked at maintenance of spermatogenesis with hCG alone. A 2020 comparison set follitropin-alpha against HMG in congenital hypogonadotropic hypogonadism, and a 2025 study compared pulsatile GnRH with combined gonadotropin therapy for the same outcome. A case report documented spermatogenesis acquired with HMG in a suspected isolated FSH deficiency.\n\nThere is also a pharmacokinetic layer. A 2016 study characterised FSH pharmacokinetics and pharmacodynamics in healthy women receiving single and multiple doses of highly purified menotrophin versus urofollitropin, and a 2021 paper established bioequivalence between a pre-filled liquid pen and the powder for reconstitution.\n\nNone of this is peptide research. HMG's literature belongs to clinical reproductive endocrinology, and the study designs, endpoints and populations all reflect that.",
      },
      {
        title: "History and Provenance",
        body:
          "Therapeutic gonadotropins were first extracted from animal pituitary glands, then from human urine, and the urinary route became the practical one — pituitary-derived material carried a risk profile that made it unacceptable, and human urine from postmenopausal donors was an abundant, renewable source of both gonadotropins.\n\nThat origin explains the name. \"Menopausal\" is not a description of the patient population; it is a description of the donor population. Postmenopausal urine is used because the loss of ovarian feedback raises gonadotropin output, not because the product is intended for menopausal medicine.\n\nAs purification improved, a distinction emerged between menotropin — the mixed urinary extract — and urofollitropin, which is urinary FSH with the LH component removed. The highly purified grade, hp-hMG, narrowed the composition further while retaining both activities at a near 1:1 ratio. Recombinant FSH then removed the urinary source entirely, and the clinical debate between the two is really a debate about whether the second gonadotropin arm adds anything.\n\nThe research-catalogue afterlife of HMG is a much more recent development, and it is a repackaging rather than a new use. The material is a licensed medicine in the UK and EU, supplied in ampoules and pre-filled pens with a defined biological potency. A lyophilised vial sold to a laboratory as a research compound is the same class of preparation entering a different regulatory channel, which is why the [HMG price comparison](/compounds/hmg) on this site shows so few listings relative to the synthetic peptides in the catalogue.",
      },
      {
        title: "What the Literature Does Not Show",
        body:
          "Three limits deserve to be stated plainly, because pages selling HMG routinely step past them.\n\n**There is no verified head-to-head case for superiority over recombinant FSH.** Summary claims of better live-birth rates with HMG circulate widely and are usually traced back to a Cochrane reference. The Cochrane record on ovulation induction in polycystic ovary syndrome does not establish that. The honest position is that the evidence is heterogeneous and protocol-dependent, and that any specific superiority claim should be checked against the review it names rather than accepted from a summary.\n\n**There is no clean in vitro characterisation of what the preparation does to an isolated receptor system.** The composition analysis shows a mixture whose LH-receptor-active component is mostly hCG, carrying a substantial impurity load. Any in vitro study that treats HMG as a defined FSH+LH stimulus is working with a substantially different input than its Methods section implies.\n\n**There is no published dosing literature for non-clinical use.** The IU figures in the clinical literature belong to licensed protocols with monitoring, not to laboratory work. ViralPeps does not sell HMG, does not issue certificates of analysis for it, and publishes no protocols.\n\nFinally, there is no validated identity test a buyer can ask for in the way they can for a peptide. For a synthetic peptide you can demand a mass spectrum. For HMG the equivalent request is a lot-specific report of FSH and LH activity in IU against a stated standard, and that is a different conversation with a different kind of supplier.",
      },
    ],
    faq: [
      {
        question: "Does HMG have a CAS number?",
        answer:
          "No valid one. HMG is a urinary gonadotropin extract containing two glycosylated heterodimers plus other urinary proteins, not a defined chemical substance, so no single CAS number describes it. PubChem has no identifier for menotropin or menotropins. Registry numbers that appear alongside HMG on vendor pages typically resolve to something else entirely, which is why this site publishes potency in IU and leaves the molecular fields empty.",
      },
      {
        question: "Is the LH in HMG actually LH?",
        answer:
          "Largely not. A 2024 glycoproteomic analysis of highly purified hMG found the LH beta subunit present only in traces, around one percent, while hCG beta was present at roughly eighteen to forty-seven percent and carried placental rather than pituitary glycans. The LH-receptor activity in HMG is therefore supplied predominantly by hCG.",
      },
      {
        question: "How pure is HMG?",
        answer:
          "Less pure than a peptide purity figure implies. The same 2024 analysis estimated protein impurities at around twenty to thirty percent of total protein content and identified more than two hundred non-gonadotropin proteins, with the common alpha subunit substantially oxidised. HPLC peak purity is not a meaningful specification for a urinary extract of this kind.",
      },
      {
        question: "What is the difference between HMG and HCG?",
        answer:
          "HCG engages the LH receptor only. HMG engages both the FSH and LH receptors, because it contains an FSH component alongside its LH-receptor activity. In hypogonadotropic hypogonadism that distinction is functional: HCG alone restores testosterone but not spermatogenesis, while the FSH arm is what allows germ-cell development to proceed.",
      },
      {
        question: "Is hMG the same as HMG proteins or HMG-CoA?",
        answer:
          "No. Three unrelated things share the abbreviation. hMG is human menopausal gonadotropin, a reproductive endocrinology preparation. HMG proteins are the high mobility group chromatin proteins, HMGA, HMGB and HMGN. HMG-CoA is 3-hydroxy-3-methylglutaryl coenzyme A, the substrate of HMG-CoA reductase in lipid metabolism. Literature searches on the bare abbreviation mix all three.",
      },
    ],
    references: [
      "Capolupo A, Petrocchi S, Melchiorre M, et al. Analytical Investigation of the Profile of Human Chorionic Gonadotropin in Highly Purified Human Menopausal Gonadotrophin Preparations. Int J Mol Sci. 2024;25(17):9405. doi:10.3390/ijms25179405. PMID 39273352.",
      "Heterogeneous hCG and hMG commercial preparations result in different intracellular signalling but induce a similar long-term progesterone response in vitro. Mol Hum Reprod. 2017. PMID 29044421.",
      "Pharmacokinetics and Pharmacodynamics of Follicle-Stimulating Hormone in Healthy Women Receiving Single and Multiple Doses of Highly Purified Human Menotrophin and Urofollitrophin. Clin Drug Investig. 2016. PMID 27638053.",
      "First pre-filled pen device with highly purified human menopausal gonadotropin (HP-hMG, Menopur) in liquid is shown to be bioequivalent to powder for reconstitution. Int J Clin Pharmacol Ther. 2021. PMID 34622768.",
      "Highly purified hMG achieves better pregnancy rates in IVF cycles but not ICSI cycles compared with recombinant FSH: a meta-analysis. Gynecol Endocrinol. 2009. PMID 19340668.",
      "Randomized, assessor-blinded trial comparing highly purified human menotropin and recombinant follicle-stimulating hormone in high responders. Fertil Steril. 2020. PMID 32416978.",
      "Weiss NS, Kostova EB, Mol BWJ. Gonadotropins for ovulation induction in women with polycystic ovary syndrome. Cochrane Database Syst Rev. 2025. PMID 40193219.",
      "Gonadotropins for pubertal induction in males with hypogonadotropic hypogonadism: systematic review and meta-analysis. Eur J Endocrinol. 2024. PMID 38128110.",
      "Maintenance of spermatogenesis in hypogonadotropic hypogonadal men with human chorionic gonadotropin alone. Eur J Endocrinol. 2002. PMID 12444893.",
      "Efficacy of follitropin-alpha versus human menopausal gonadotropin for male patients with congenital hypogonadotropic hypogonadism. Turk J Urol. 2020. PMID 31905120.",
      "Zheng Y, Bai HZ, Zhao GC. Comparison of outcomes between pulsatile gonadotropin releasing hormone and combined gonadotropin therapy of spermatogenesis in patients with congenital hypogonadotropic hypogonadism. Reprod Biol Endocrinol. 2025. PMID 40119359.",
    ],
  },
};
