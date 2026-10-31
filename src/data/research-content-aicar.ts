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
export const aicarContent: Record<string, ResearchPageContent> = {
  "aicar-research-guide": {
    slug: "aicar-research-guide",
    compoundSlug: "aicar",
    pullQuote:
      "AICAR is sold in the UK as a peptide and it is not one. It is a nucleoside, it has two registry numbers for two different molecules, and the only large human trial of it was stopped for futility after 3,080 patients.",
    quickInfo: [
      { label: "Compound", value: "AICAR (AICA riboside; acadesine)" },
      { label: "Other names", value: "5-Aminoimidazole-4-carboxamide ribonucleoside; acadesine; AICA riboside" },
      { label: "Class", value: "Purine nucleoside — not a peptide, no sequence exists" },
      { label: "Molecular Formula", value: "C9H14N4O5 (acadesine, PubChem CID 17513)" },
      { label: "Molecular Weight", value: "258.23 g/mol (acadesine)" },
      { label: "CAS", value: "2627-69-2 (nucleoside); 3031-94-5 is the 5′-phosphate, a different molecule" },
      { label: "Mechanism", value: "Phosphorylated to ZMP, an AMP mimetic; activates AMPK indirectly and has AMPK-independent effects" },
      { label: "Human evidence", value: "One large RCT (RED-CABG, JAMA 2012), stopped for futility, no efficacy signal" },
    ],
    sections: [
      {
        title: "AICAR Is Not a Peptide, and That Is the First Thing to Fix",
        body:
          "AICAR (5-aminoimidazole-4-carboxamide ribonucleotide) is a purine nucleoside. It has no amino-acid backbone, no sequence, and no peptide bond. It is an intermediate in de novo purine biosynthesis, the step on the road to inosine monophosphate, and it sits in UK catalogues beside BPC-157 and ipamorelin because that is where the customers are, not because the chemistry belongs there.\n\nThis matters practically, not pedantically. Three things follow from it. There is no sequence field on a certificate of analysis, so the identity proof has to come from mass spectrometry and a reference standard rather than from an amino-acid analysis. Solubility behaves like a nucleoside rather than a lyophilised peptide, which changes how a laboratory handles it. And the compound's stated molecular weight depends entirely on which of two molecules you are talking about, which is where most of the market's specifications go wrong.\n\nThe two-molecule problem is the useful thing to understand before reading any listing. **Acadesine** is the nucleoside: PubChem CID 17513, formula C9H14N4O5, molecular weight 258.23, registry number 2627-69-2. **AICA ribonucleotide** — the 5′-monophosphate, also called ZMP — is CID 65110, formula C9H15N4O8P, molecular weight 338.21, registry number 3031-94-5. PubChem resolves 2627-69-2 to the first and 3031-94-5 to the second, so both numbers are correct and they describe different things. A listing that pairs CAS 2627-69-2 with a molecular weight of 338.21 has taken the registry number from one record and the mass from another.\n\nWhat the UK market actually sells, in every catalogue read for this guide, is the nucleoside. The [AICAR comparison page](/compounds/aicar) lists the current UK stock and pricing; this guide is about what the material is, what the literature shows, and where the summaries that follow it go wrong.",
      },
      {
        title: "The Mechanism: ZMP, AMPK, and a Large 'Independent Effects' Problem",
        body:
          "The standard one-line description — \"AICAR activates AMPK\" — is true and incomplete in a way that changes how you read every study done with it.\n\nThe actual sequence is enzymatic. AICAR enters the cell and is phosphorylated by adenosine kinase to ZMP, the monophosphate form. ZMP is an analogue of AMP, and AMP is the signal that the cell's energy charge has fallen. AMPK responds to a rising AMP:ATP ratio, so ZMP produces AMPK activation indirectly, by mimicking the upstream signal rather than by binding the kinase the way a direct allosteric activator such as A-769662 does. That distinction is not academic: it means the strength of AMPK activation depends on how much adenosine kinase activity a given tissue has, which is one reason the same nominal dose produces very different readouts in different models.\n\nThe larger problem is the one the systematic review literature has been pointing at for years. Višnjić and colleagues published a systematic review in Cells in 2021 (PMID 34064363) specifically on the **AMPK-independent** effects of AICAr, and their argument is that the field spent a decade attributing to AMPK what was sometimes happening through purine metabolism, adenosine receptor signalling, or antiproliferative actions of ZMP accumulation. AICAr is a metabolic intermediate first and a pharmacological tool second. Loading a cell with it perturbs the pathway it is supposed to report on.\n\nThat matters directly for anyone reading AICAR claims. A study that shows an AICAR effect and stops there has shown that a compound with at least three mechanisms produces an effect. It has not shown that AMPK did it. The way to show that is the way the better papers do it — genetic or pharmacological AMPK blockade in parallel, which is exactly the comparison the review says the older literature mostly skipped.\n\nOne further mechanistic detail belongs here because it recurs in the marketing. AICAR's downstream effects are described as mimicking endurance training in muscle. Some of what AICAR does in skeletal muscle does look like an exercise adaptation at the level of gene expression. Calling the compound an exercise mimetic is a description of a transcriptional signature reported in one mouse study, not a pharmacological class.",
      },
      {
        title: "The Mouse Study Everyone Quotes, and What It Actually Was",
        body:
          "The \"exercise in a pill\" framing traces to a single paper. Narkar and colleagues, working with the Evans laboratory, published *AMPK and PPARdelta agonists are exercise mimetics* in Cell in 2008 (PMID 18674809). It is real, it is well cited, and it did what the headline says: sedentary mice given a pharmacological AMPK activator were reported to show an endurance increase comparable in direction to training, and a PPARdelta agonist plus exercise produced a larger synergistic effect.\n\nThree qualifications are worth carrying into any discussion of it.\n\nThe model was the mouse, and the dose was high — the figure that circulates for the AICAR arm is 500 mg/kg per day. A mouse at that dose is not a scaled version of a human at a vial-sized quantity; dosed by mass, it is an order of magnitude beyond anything a 50 mg vial represents in any plausible laboratory design. Almost no page that cites the study mentions the dose, which is the part that determines whether the result transfers.\n\nThe endpoint was performance, measured in a running test, not a disease outcome. And the paper's own title is about a class of pharmacological tools, not about AICAR specifically as a therapeutic.\n\nFollow-up work has kept the line alive without settling it. A 2016 paper in Physiological Reports (PMID 26997622) tested combined AMPK and PPARdelta activation in trained mice and reported potentiation of training effects — again a mouse result, again a pharmacological combination. There is a genuine, replicable body of work showing that manipulating these two pathways shifts muscle phenotype in rodents. There is no equivalent body of work in humans at any dose.",
      },
      {
        title: "The Human Record: One Large Trial, Stopped for Futility",
        body:
          "This is the most important section in this guide, and it is the one missing from nearly every commercial page about AICAR.\n\nUnder its clinical name, acadesine, the compound went through a full clinical development programme in cardiac surgery, on a specific hypothesis: that an adenosine-regulating agent given around the time of coronary artery bypass grafting would reduce ischaemia-reperfusion injury. Earlier, smaller trials and a meta-analysis supported the idea strongly enough to justify a large study.\n\nThe result was the RED-CABG trial, published in JAMA in July 2012 (PMID 22782417). It was randomised, double-blind, placebo-controlled, parallel-group, run at 300 sites in seven countries, in 3,080 intermediate-to-high-risk patients having non-emergency on-pump CABG. The intervention was an infusion of acadesine at 0.1 mg/kg per minute for seven hours, started before anaesthesia, plus the drug added to the cardioplegia solution.\n\nThe primary outcome was a composite of all-cause mortality, non-fatal stroke, or the need for mechanical support for severe left ventricular dysfunction through day 28. It occurred in 75 of 1,493 patients on placebo (5.0%) and 76 of 1,493 on acadesine (5.1%). Odds ratio 1.01, 95% confidence interval 0.73 to 1.41. Key secondary endpoints did not differ either. The trial had a pre-specified futility analysis, that analysis indicated a very low likelihood of a significant benefit, and the study was stopped after 3,080 of a planned 7,500 patients had been randomised.\n\nRead that carefully, because the usual framing inverts it. This is not a compound that failed to be tested. It is a compound that was tested properly, at scale, in a population where the preclinical rationale was strongest, by an industry sponsor with every incentive to find an effect — and the effect was not there. The mechanism may still be real. The clinical hypothesis built on it was not supported.\n\nOne older strand of evidence should be named because it is often cited as though it were the final word: a 1992 study in Circulation reported sustained protection by acadesine against ischaemia-reperfusion injury in a transplanted rat heart. That is a rat heart. It is a legitimate preclinical result and it is the sort of result RED-CABG was designed to test in people.",
      },
      {
        title: "Where the Rest of the Literature Goes",
        body:
          "Beyond the cardiac programme, AICAR accumulated a broad preclinical literature across metabolic and oncology models. It is worth knowing what it consists of, because it is the raw material for most of what is claimed about the compound today.\n\n**Alcohol-induced fatty liver.** Tomita and colleagues published in Alcoholism: Clinical and Experimental Research in 2005 (PMID 16385230) showing that AICAR had protective effects on alcohol-induced fatty liver in rats. Rat model, one laboratory, one injury paradigm.\n\n**Oncology combinations.** Liang and colleagues, in Molecular Oncology in 2018 (PMID 30107094), reported preclinical evidence that combining rapamycin and AICAR improved effectiveness against kidney cancer models. This is a combination-therapy paper in cell and animal systems. The interesting part scientifically is that it treats AICAR as a metabolic modulator inside a combination rather than as a standalone agent, which is the only framing the evidence supports.\n\n**Cancer metabolism generally.** Chaube and Bhat's 2016 commentary in Cell Death and Disease (PMID 26775698) on AMPK as a regulator of metabolic and energy homeostasis in cancer cells is the sort of review that gets cited as though it were evidence about AICAR. It is a review of AMPK biology; AICAR appears in it as one tool among several.\n\n**Ageing and AMPK decline.** Salminen and colleagues, in Ageing Research Reviews in 2016 (PMID 27060201), reviewed age-related changes in AMPK activation. The finding that AMPK signalling declines with age is robust and is the basis of a large amount of longevity marketing. It does not follow from that review that administering an AMPK activator reverses anything, and the review does not claim it does.\n\n**Anti-doping analytics.** A 2024 paper in RSC Advances (PMID 38873554) developed an LC-MS/MS method for quantifying AICAR in urine and states plainly in its introduction that AICAR was reported as the first pharmacological AMPK activator, has been shown to enhance endurance, and is prohibited by the World Anti-Doping Agency. That is the most useful single line in the sports-regulation literature for anyone trying to place this compound: it is on a prohibited list because it was investigated as a performance agent, not because it was shown to work as one in people.",
      },
      {
        title: "Handling, Solubility, and What a Certificate Should Show",
        body:
          "The analytical problem with AICAR is different from a peptide's, and the certificate template is not interchangeable.\n\n**There is no sequence.** A peptide certificate proves identity by matching an amino-acid composition and a mass. A nucleoside is proved by mass and by retention time against a reference standard, usually with UV absorbance at a fixed wavelength. A certificate that offers an amino-acid analysis for AICAR is a template with the wrong fields filled in, and that is a stronger signal than any purity number on the page.\n\n**Solubility is the practical trap.** AICAR is sparingly soluble in water at neutral pH — suppliers of reference-grade material typically list DMSO for stock solutions, and dissolution in aqueous buffer often needs warming or a pH adjustment. This is not the same handling problem as a lyophilised peptide, which dissolves readily in bacteriostatic water. A laboratory that treats an AICAR vial like a peptide vial will spend the first hour of the experiment discovering this. Any UK listing that describes AICAR as a lyophilised peptide powder without qualification is describing a handling regime it has not tested.\n\n**Mass must be stated against the right formula.** 258.23 g/mol is the number for the nucleoside. If a certificate reports an observed mass near 338, the material is the phosphate, not the nucleoside — a different compound with a different charge state and different cell permeability.\n\n**Purity is not identity.** A 99% pure sample of the wrong molecule is 99% pure. For a small molecule with a commercial reference standard available, the cheapest possible identity check is a retention-time comparison against that standard, and no UK listing read for this guide states that it does one.\n\nThe [UK per-milligram price comparison for AICAR](/research/aicar-uk-price-guide) sets out what the market charges and what the documentation at each price point actually contains.",
      },
      {
        title: "What the Literature Does and Does Not Show",
        body:
          "The well-supported statements are these. AICAR is a purine nucleoside intermediate in de novo purine biosynthesis with a settled identity: CAS 2627-69-2, C9H14N4O5, 258.23 g/mol, PubChem CID 17513. It is phosphorylated intracellularly to ZMP, which mimics AMP and activates AMPK indirectly. It has documented AMPK-independent effects that complicate causal attribution. It produces metabolic and endurance-related effects in rodents at high doses. And it was tested in a large, well-conducted, placebo-controlled human trial in cardiac surgery which found no benefit and was stopped early.\n\nWhat does not exist: any approved medicinal use in any jurisdiction reviewed; any human dose-response study for the metabolic or performance endpoints the compound is sold on; any replication of the 2008 mouse endurance result in humans; any receptor or target profile that separates the AMPK-dependent from the independent effects in vivo; and any head-to-head comparison against a direct AMPK activator that would establish that ZMP-mediated activation is the operative mechanism.\n\nThe evidence ceiling here is unusually clear for a research compound, because the human question was asked and answered. Everything sold as AICAR today is sold on the rodent literature, in a market where the most rigorous study of the molecule came back negative.\n\nThat is not a reason to consider the compound uninteresting. It is a reason to be precise about what it is for. As a laboratory tool for perturbing AMPK signalling and purine metabolism, AICAR is one of the most widely used reagents in the field. As a therapeutic hypothesis it was tested at scale and the result was null. The two statements are compatible, and a supplier page that presents only the first is selling a compound it has not read the literature on.",
      },
    ],
    faq: [
      {
        question: "Is AICAR a peptide?",
        answer:
          "No. AICAR is a purine nucleoside — 5-aminoimidazole-4-carboxamide ribonucleoside — with no amino-acid backbone and no sequence. It is sold in peptide catalogues because that is where the customer base is, but a certificate of analysis for AICAR should not contain a sequence field, and an amino-acid analysis on an AICAR certificate is a sign that a peptide template was used without being adapted.",
      },
      {
        question: "Why do AICAR listings show two different molecular weights?",
        answer:
          "Because two related molecules are sold under the name. Acadesine, the nucleoside, is PubChem CID 17513, formula C9H14N4O5, 258.23 g/mol, CAS 2627-69-2. AICA ribonucleotide, the 5′-phosphate also called ZMP, is CID 65110, formula C9H15N4O8P, 338.21 g/mol, CAS 3031-94-5. PubChem resolves each CAS to its own record. A listing that pairs 2627-69-2 with 338.21 has mixed the two, and the UK market stocks the nucleoside.",
      },
      {
        question: "What did the largest human trial of AICAR find?",
        answer:
          "RED-CABG, published in JAMA in 2012 (PMID 22782417), tested acadesine in 3,080 patients undergoing on-pump coronary artery bypass grafting at 300 sites. The primary composite of death, non-fatal stroke or severe left ventricular dysfunction occurred in 5.0% of placebo patients and 5.1% of treated patients (OR 1.01, 95% CI 0.73–1.41). The trial was stopped after a pre-specified futility analysis showed a very low likelihood of a significant benefit, having randomised 3,080 of a planned 7,500 patients.",
      },
      {
        question: "How does AICAR activate AMPK if it does not bind the kinase?",
        answer:
          "Intracellularly, adenosine kinase phosphorylates AICAR to ZMP, a monophosphate that mimics AMP. AMPK responds to a rising AMP:ATP ratio, so ZMP activates the kinase indirectly by imitating the upstream energy signal rather than binding it directly the way a compound such as A-769662 does. Because the conversion step depends on tissue adenosine kinase activity, the strength of activation varies by model, and a 2021 systematic review (PMID 34064363) documents substantial AMPK-independent effects.",
      },
      {
        question: "Is AICAR prohibited in sport?",
        answer:
          "Yes. The World Anti-Doping Agency prohibits AICAR, and it appears in the analytical literature as a target compound — a 2024 RSC Advances paper (PMID 38873554) describes an LC-MS/MS urine method built partly for that reason. The prohibition follows from AICAR's investigation as an endurance-enhancing agent in animal models, not from demonstrated human efficacy. ViralPeps does not sell peptides or reference materials and publishes this only as regulatory context.",
      },
    ],
    references: [
      "Narkar VA, Downes M, Yu RT, et al. AMPK and PPARdelta agonists are exercise mimetics. Cell. 2008;134(3):405-415. PMID 18674809",
      "Newman MF, Ferguson TB, White JA, et al. Effect of adenosine-regulating agent acadesine on morbidity and mortality associated with coronary artery bypass grafting: the RED-CABG randomized controlled trial. JAMA. 2012;308(2):157-164. PMID 22782417",
      "Višnjić D, Lalić H, Dembitz V, Tomić B, Smoljo T. AICAr, a Widely Used AMPK Activator with Important AMPK-Independent Effects: A Systematic Review. Cells. 2021;10(5):1095. PMID 34064363",
      "Tomita K, Tamiya G, Ando S, et al. AICAR, an AMPK activator, has protective effects on alcohol-induced fatty liver in rats. Alcohol Clin Exp Res. 2005;29(12 Suppl):240S-245S. PMID 16385230",
      "Liang S, Medina EA, Li B, Habib SL. Preclinical evidence of the enhanced effectiveness of combined rapamycin and AICAR in reducing kidney cancer. Mol Oncol. 2018;12(11):1917-1934. PMID 30107094",
      "Salminen A, Kaarniranta K, Kauppinen A. Age-related changes in AMPK activation. Ageing Res Rev. 2016;28:15-26. PMID 27060201",
      "Chaube B, Bhat MK. AMPK, a key regulator of metabolic/energy homeostasis and mitochondrial biogenesis in cancer cells. Cell Death Dis. 2016;7(1):e2044. PMID 26775698",
      "Fan J, Wang Y, Zhuo Y, et al. Quantification of AICAR and study of metabolic markers after administration. RSC Adv. 2024;14(27):19001-19013. PMID 38873554",
      "PubChem Compound CID 17513 (Acadesine) — C9H14N4O5, 258.23 g/mol, CAS 2627-69-2. https://pubchem.ncbi.nlm.nih.gov/compound/17513",
      "PubChem Compound CID 65110 (AICA ribonucleotide / ZMP) — C9H15N4O8P, 338.21 g/mol, CAS 3031-94-5. https://pubchem.ncbi.nlm.nih.gov/compound/65110",
    ],
  },
};
