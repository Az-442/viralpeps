#!/usr/bin/env python3
"""Write the p21-vs-semax fragment (Day-20 article 1) into /tmp as a TS record block.

Article type: (vs) comparison -> section: comparisons.
compoundSlug: p21, compoundSlug2: semax.
"""

FRAG = r"""  'p21-vs-semax': {
    slug: 'p21-vs-semax',
    compoundSlug: 'p21',
    compoundSlug2: 'semax',
    pullQuote: 'P21 and Semax are the two most-stocked cognitive research peptides in the UK catalogue, and they could not be more different in how thin their evidence is. Semax has forty years of human use behind it in Russia and a scattered Western literature; P21 has twenty rodent studies from a single laboratory and met its first independent replication in 2024 — which failed to reproduce the in vivo result. If you are comparing them, you are comparing one compound with a clinical history and one with a single-lab hypothesis.',
    quickInfo: [
      { label: 'Compound A', value: 'P21 (a.k.a. P021) — CNTF-derived neurotrophic peptide' },
      { label: 'Compound B', value: 'Semax — synthetic ACTH(4-10) analogue (heptapeptide)' },
      { label: 'P21 Structure', value: 'CNTF-derived short peptide (aa 148-151 region + adamantylated glycine); MW ~578 Da reported for the tetrapeptide mimetic' },
      { label: 'Semax Sequence', value: 'Met-Glu-His-Phe-Pro-Gly-Pro (ACTH 4-10 with C-terminal Pro-Gly-Pro)' },
      { label: 'P21 Mechanism', value: 'BDNF upregulation; proposed GSK3-beta inhibition; LIF-signalling disinhibition' },
      { label: 'Semax Mechanism', value: 'BDNF and NGF upregulation; melanocortin/ACTH-family signalling; PGP metabolite' },
      { label: 'P21 Evidence', value: '~20 preclinical studies, effectively one research group (CUNY); 0 human studies; 2024 independent replication negative in vivo' },
      { label: 'Semax Evidence', value: 'Human clinical use in Russia (stroke, cognitive); multiple independent groups; limited Western RCTs' },
      { label: 'UK Supply (Oct 2026)', value: 'P21: 2 vendors from GBP 32.00 · Semax: 75 vendors from GBP 7.50' },
      { label: 'Pharmacokinetics', value: 'Both short half-life; both used intranasally or subcutaneously in research' },
    ],
    sections: [
      {
        title: 'Two Kinds of "Nootropic Peptide"',
        body: 'P21 and Semax get grouped together on vendor sites as cognitive research peptides, and the grouping hides the single most important difference between them: one is a clinically used pharmaceutical and the other is a laboratory hypothesis.\\n\\n**Semax** is a synthetic heptapeptide — ACTH(4-10) with a C-terminal Pro-Gly-Pro tail — developed at the Institute of Molecular Genetics in Moscow and registered for clinical use in Russia and several neighbouring countries. It has been given to stroke patients, studied in optic nerve disease, and used for decades, which means it carries an actual human safety record even where the efficacy evidence is uneven.\\n\\n**P21** — often written **P021** in the literature — is a short CNTF-derived peptide that emerged from a single American research programme at the City University of New York (CUNY). It has never been given to a human in a controlled study. Its entire case rests on rodent work, almost all of it from the one laboratory that developed it.\\n\\nThat asymmetry is the article. Everything else — mechanism, dose, price — flows from it.\\n\\n[**Compare P21 prices from UK suppliers ->**](/compounds/p21) · [**Compare Semax prices ->**](/compounds/semax)',
      },
      {
        title: 'What Each Compound Actually Is',
        body: 'Getting the molecules right matters more here than on a well-characterised compound, because the P21 literature is genuinely confusing about its own subject.',
        subsections: [
          {
            title: 'Semax — a defined, sequence-known heptapeptide',
            body: 'Semax is unambiguous. The sequence is **Met-Glu-His-Phe-Pro-Gly-Pro**: the first four residues are ACTH(4-10), the biologically active fragment of adrenocorticotropic hormone, extended by a Pro-Gly-Pro tripeptide that improves stability and CNS penetration. It degrades in part to a shorter peptide, **PGP**, which has its own reported neuropeptide activity.\\n\\nThe compound has a CAS number (80714-61-0), a defined mass, and a 2010s-era Russian generic pharmaceutical footprint. Whatever one thinks of the evidence base, there is no question about *which molecule* is being studied.',
          },
          {
            title: 'P21 — one label, several molecules in the literature',
            body: 'The P21 label is applied loosely across the literature and the vendor market, and this is the single biggest practical hazard in researching it.\\n\\nThe compound that produced the well-known rodent neurogenesis data is described in the primary papers as **P021**, a small CNTF-derived peptide mimetic built from the biologically active region of human CNTF (roughly residues 148-151) with an adamantylated glycine appended for stability and lipophilicity. The Mottolese 2024 paper in *Journal of Neurodevelopmental Disorders* states its structure explicitly as **Ac-DGGLAG-NH2, MW 578.3** and calls it a tetra-peptide.\\n\\nMeanwhile some vendor pages describe "P21" as an 11-amino-acid peptide, others as a 21-residue fragment, and the compound description carried on this site and elsewhere calls it a "selective CDK5 inhibitor" — language that actually belongs to a *different* molecule, the Cdk5-derived peptide reported by Pao et al. in *PNAS* 2023.\\n\\nThe practical consequence: **a listing that says "P21" has not told you which molecule it is selling.** Ask for the sequence. If the vendor cannot state it, you do not have a specification — and on a compound whose entire evidence base is one laboratory, a specification is all you have.',
          },
        ],
      },
      {
        title: 'Mechanism — What the Two Compounds Are Supposed to Do',
        body: 'Both compounds are studied for cognitive endpoints. The proposed routes are similar in outcome (more BDNF, more hippocampal plasticity) but different in upstream biology.',
        table: {
          header: ['', 'P21 (P021)', 'Semax'],
          rows: [
            ['Upstream biology', 'CNTF-family neurotrophic signalling', 'ACTH(4-10) melanocortin signalling'],
            ['Core proposed action', 'BDNF upregulation; hippocampal neurogenesis; GSK3-beta inhibition (reported)', 'BDNF and NGF upregulation; neuroprotection'],
            ['Reported downstream', 'Increased BrdU+ dentate gyrus cells; improved Morris water maze', 'Reduced infarct volume; improved cognitive scores in stroke cohorts'],
            ['Blood-brain barrier', 'Truncated for CNS penetration; intranasal research use', 'Pro-Gly-Pro tail aids stability and CNS access'],
            ['Active metabolite', 'Not characterised in the public literature', 'PGP tripeptide, separately studied'],
            ['Primary evidence type', 'Rodent, single laboratory', 'Russian clinical series plus rodent work'],
          ],
        },
        subsections: [
          {
            title: 'P21 — the BDNF/neurogenesis hypothesis',
            body: 'The P021 case is built on a clean story. CNTF itself is powerfully neurotrophic but unusable systemically: it drives anorexia and cachexia, which ended its clinical development. The CUNY approach was to truncate CNTF down to a short mimetic that retains the neurogenic signal while escaping the metabolic side effects. In their rodent models the peptide increased hippocampal neurogenesis (BrdU labelling in the dentate gyrus), raised BDNF, and improved spatial memory in the Morris water maze.\\n\\nThe 2024 independent study is where the story becomes interesting. A Bologna-led group tested P021 in a CDKL5-deficiency-disorder model — a severe paediatric epileptic encephalopathy — and found that the peptide **rescued cellular defects in vitro but produced no meaningful benefit in vivo**. Hippocampal neurogenesis, BDNF levels and spine maturation were unchanged in the treated mice. The authors reported effects only on catalepsy and a trend toward reduced anxiety, and speculated that dopaminergic signalling rather than hippocampal neurogenesis was doing the work.\\n\\nThat is a single study in a single disease model, not a refutation of everything. But it is the first time the P021 hypothesis has been tested outside the originating laboratory, and it did not hold in vivo.',
          },
          {
            title: 'Semax — the neurotrophin-upregulation story',
            body: 'Semax raises BDNF and NGF messenger RNA and protein in rat hippocampus and frontal cortex, with the PGP fragment contributing to the effect. It has been reported to reduce ischaemic damage and, in Russian clinical series, to improve outcomes at different stages after ischaemic stroke. A 2021 study found it attenuated behavioural and neurochemical changes in a rat model of early-life fluvoxamine exposure, and a 2025 British Journal of Pharmacology paper proposed a mu-opioid-receptor mechanism in spinal cord injury.\\n\\nThe honesty caveat is the same one that applies to most Russian-developed peptides: much of the human evidence is published in Russian-language journals that are not indexed prominently, the trials are often small and unblinded by Western standards, and independent Western replication is thin. The evidence is *broader* than P21\\u2019s — more groups, more models, some human data — but it is not strong by the standards applied to a modern drug.',
          },
        ],
      },
      {
        title: 'What the Evidence Compares To',
        body: 'Ranking the two compounds on evidence strength is not close, but neither is impressive.\\n\\n**Semax** has human exposure and a genuine publication record across independent groups. It fails modern evidence standards because the trials are small and often not blinded, the human data are concentrated in Russian journals, and the endpoints vary. But "weak and broad" is a different risk profile from "narrow and unreplicated."\\n\\n**P21** has a coherent mechanism and a clean rodent story from one laboratory, and one independent 2024 study that found the in vivo effects did not reproduce in a different model. Its entire human evidence base is zero.\\n\\nIf you are choosing between them for research use, the practical difference is this: there is at least a question about whether Semax works in humans, answered ambivalently by forty years of Russian data. For P21 there is no human question yet — only the question of whether the rodent effect is real outside one lab, which the first independent attempt answered negatively.\\n\\nFor a deeper dive on either compound, see the [**P21 deep dive ->**](/research/p21-deep-dive) and the [**Semax research summary ->**](/research/semax-research-summary). P21 is frequently compared with [**Semax**](/compounds/semax) and [**Selank**](/compounds/selank) in the cognitive-peptide research market; the Semax-Selank pairing is examined separately in [**Selank vs Semax ->**](/research/selank-vs-semax-adhd).',
      },
      {
        title: 'UK Supply and Price — A 14x Difference',
        body: 'The supply picture is as lopsided as the evidence, and it runs in the opposite direction to what you might expect: the better-evidenced compound is cheaper and far more widely stocked.',
        table: {
          header: ['Metric', 'P21', 'Semax'],
          rows: [
            ['UK vendors tracked', '2', '75'],
            ['Priced listings', '2', '91'],
            ['Lowest price', 'GBP 32.00', 'GBP 7.50'],
            ['Highest price', 'GBP 55.00', 'GBP 199.99'],
            ['Typical dose tier', 'Research vial (100-500 mcg dosing references)', '5 mg and 10 mg vials'],
            ['Price spread', 'Roughly 1.7x', 'Roughly 27x'],
          ],
        },
        subsections: [
          {
            title: 'Why Semax is cheap and P21 is expensive',
            body: 'A seven-residue peptide is cheap to synthesise at scale, and Semax is supplied by dozens of UK vendors in a crowded market — 75 vendors competing on the same heptapeptide drives the floor down to GBP 7.50. P21 sits at the other extreme: two UK vendors, near-zero competition, and a price that reflects scarcity and positioning rather than cost. A price of GBP 32-55 for a short CNTF-derived peptide is not a manufacturing-cost statement. It is a statement about how few people stock it.',
          },
          {
            title: 'The verification question changes per compound',
            body: 'For Semax, the risk is homogenisation — with 75 vendors selling the same sequence, the certificate is what separates a verified batch from a relabelled one, and buyers should check that the CoA states the full sequence and is batch-matched. For P21, the risk is more fundamental: because the label is used loosely, a CoA that confirms *a* peptide may not confirm the *right* peptide. Even more than usual, demand the sequence, not just a purity percentage. The verification method is set out in the [**how to read a CoA guide ->**](/research/how-to-read-a-coa).',
          },
        ],
      },
      {
        title: 'Which One, and For What',
        body: 'This is a comparison article, not a recommendation, but the two compounds genuinely suit different research questions.\\n\\n**If your interest is human-relevant cognitive or neuroprotective endpoints with a real safety record**, Semax is the only one of the two with any human data to study — and its price and availability make it practical. Its weakness is evidence quality, not availability.\\n\\n**If your interest is the neurogenesis hypothesis itself** — whether a truncated CNTF mimetic can raise BDNF and drive hippocampal neurogenesis — P21 is the more interesting molecule, but you are researching a hypothesis that has survived exactly one laboratory and failed its first external test. That is a legitimate reason to study it, provided you are honest that it is a hypothesis.\\n\\nWhat you cannot do is treat them as interchangeable "nootropic peptides." They differ by a factor of roughly fourteen in price, by a factor of thirty-seven in vendor availability, and by the entire gap between a clinically-used drug and a single-lab rodent finding.\\n\\nFor the broader picture of this compound class, see the [**types of research peptides pillar ->**](/research/types-of-research-peptides) and the [**cognitive peptide suppliers guide ->**](/research/cognitive-peptide-suppliers-uk).',
      },
    ],
    faq: [
      { question: 'Is P21 the same as Semax?', answer: 'No. Semax is a synthetic ACTH(4-10) heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) with clinical use in Russia. P21 (P021) is a separate CNTF-derived neurotrophic peptide from a single American research group. They are different molecules with different mechanisms and very different evidence bases.' },
      { question: 'Which has better evidence, P21 or Semax?', answer: 'Semax, clearly. It has human clinical use in Russia, multiple independent research groups, and a published safety record. P21 has around twenty preclinical studies, effectively all from one laboratory, no human data, and a 2024 independent replication that found no in vivo benefit in a different disease model.' },
      { question: 'Why is P21 so much more expensive than Semax?', answer: 'Availability, not molecule cost. Semax is stocked by 75 UK vendors competing on the same heptapeptide, which drives the floor to GBP 7.50. P21 is stocked by two UK vendors, so the GBP 32-55 range reflects scarcity and positioning rather than synthesis cost.' },
      { question: 'What is the P21 sequence and why does it matter?', answer: 'The primary literature (Mottolese et al. 2024) gives the CNTF-derived mimetic P021 as Ac-DGGLAG-NH2, MW 578.3 — a tetra-peptide. Vendor pages describe "P21" variously as 11 or 21 amino acids, so the label is not a reliable specification. Always ask the vendor for the sequence. [**How to read a CoA ->**](/research/how-to-read-a-coa)' },
      { question: 'How is Semax taken in research?', answer: 'Semax is most commonly used intranasally (it was developed for intranasal delivery) or subcutaneously in rodent studies. Its Pro-Gly-Pro tail improves stability and CNS penetration. The clinical Russian protocols are predominantly intranasal.' },
      { question: 'Do these compounds work in humans?', answer: 'Semax has human clinical data from Russia suggesting benefit in ischaemic stroke and cognitive endpoints, though the trials are small by Western standards. P21 has never been tested in a controlled human study; its case rests on rodent work from one laboratory.' },
    ],
    references: [
      'Blanchard J, et al. Beneficial effect of a CNTF tetrapeptide on adult hippocampal neurogenesis, neuronal plasticity, and spatial memory in mice. J Alzheimers Dis. 2010;21(4):1185-1195. PMID: 20952820.',
      'Chohan MO, et al. Enhancement of dentate gyrus neurogenesis, dendritic and synaptic plasticity and memory by a neurotrophic peptide. Neurobiol Aging. 2011;32(8):1420-1434. PMID: 19767127.',
      'Bolognin S, et al. Rescue of cognitive-aging by administration of a neurogenic and/or neurotrophic compound. Neurobiol Aging. 2014;35(9):2134-2146. PMID: 24702821.',
      'Kazim SF, et al. Disease modifying effect of chronic oral treatment with a neurotrophic peptidergic compound in a triple transgenic mouse model of Alzheimer\\u2019s disease. Neurobiol Dis. 2014;71:110-130. PMID: 25046994.',
      'Kazim SF, et al. Early neurotrophic pharmacotherapy rescues developmental delay and Alzheimer\\u2019s-like memory deficits in the Ts65Dn mouse model of Down syndrome. Sci Rep. 2017;7:45561. PMID: 28368015.',
      'Baazaoui N, et al. Prevention of Amyloid-beta and Tau Pathologies, Associated Neurodegeneration, and Cognitive Deficit by Early Treatment with a Neurotrophic Compound. J Alzheimers Dis. 2017;58(1):215-230. PMID: 28387677.',
      'Mottolese N, et al. Effects of a ciliary neurotrophic factor (CNTF) small-molecule peptide mimetic in an in vitro and in vivo model of CDKL5 deficiency disorder. J Neurodev Disord. 2024;16(1):65. PMID: 39592934.',
      'Pao PC, et al. A Cdk5-derived peptide inhibits Cdk5/p25 activity and improves neurodegenerative phenotypes. Proc Natl Acad Sci U S A. 2023;120(16):e2217864120. PMID: 37043533.',
      'Cruz JC, et al. Aberrant Cdk5 activation by p25 triggers pathological events leading to neurodegeneration and neurofibrillary tangles. Neuron. 2003;40(3):471-483. PMID: 14642273.',
      'Gusev EI, et al. The efficacy of semax in the treatment of patients at different stages of ischemic stroke. Zh Nevrol Psikhiatr Im S S Korsakova. 2018;118(3. Vyp. 2):61-68. PMID: 29798983.',
      'Glazova NY, et al. Semax, synthetic ACTH(4-10) analogue, attenuates behavioural and neurochemical alterations following early-life fluvoxamine exposure in white rats. Neuropeptides. 2021;86:102114. PMID: 33418449.',
      'Inozemtseva LS, et al. Antidepressant-like and antistress effects of the ACTH(4-10) synthetic analogs Semax and Melanotan II on male rats in a model of chronic unpredictable stress. Eur J Pharmacol. 2024;984:177068. PMID: 39442746.',
      'Shadrina M, et al. Comparison of the temporary dynamics of NGF and BDNF gene expression in rat hippocampus, frontal cortex, and retina under Semax action. J Mol Neurosci. 2010;41(1):30-35. PMID: 19662538.',
      'Sciacca MFM, et al. Semax, a Synthetic Regulatory Peptide, Affects Copper-Induced Abeta Aggregation and Amyloid Formation in Artificial Membrane Models. ACS Chem Neurosci. 2022;13(4):486-496. PMID: 35080861.',
      'Liu R, et al. Semax peptide targets the mu opioid receptor gene Oprm1 to promote deubiquitination and functional recovery after spinal cord injury in female mice. Br J Pharmacol. 2025;182(22):5489-5516. PMID: 40692165.',
      'Tsai SJ. Semax, an analogue of adrenocorticotropin (4-10), is a potential agent for the treatment of attention-deficit hyperactivity disorder and Rett syndrome. Med Hypotheses. 2007;68(5):1144-1146. PMID: 16996699.',
      'ViralPeps catalogue data \\u2014 P21 (2 vendors, from GBP 32.00) and Semax (75 vendors, from GBP 7.50), October 2026 snapshot.',
    ],
  }"""

with open('/tmp/kw_day20_p21_vs_semax.ts', 'w', encoding='utf-8') as f:
    f.write(FRAG)
print('wrote fragment:', len(FRAG), 'chars')
# report backslash-run sanity
raw = open('/tmp/kw_day20_p21_vs_semax.ts', 'rb').read()
print('len bytes:', len(raw))
print('doubled \\\\n count:', raw.count(b'\\\\n'))
print('triple \\\\\\n count:', raw.count(b'\\\\\\n'))
import re
print('runs before n >2:', len(re.findall(rb'\\{3,}n', raw)))
print('runs before apostrophe >1:', len(re.findall(rb'\\{2,}\'', raw)))
