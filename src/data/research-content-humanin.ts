import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class C queue day 18 (Humanin) — see class-c-article-queue.md
export const humaninContent: Record<string, ResearchPageContent> = {
  "humanin-research-guide": {
    slug: "humanin-research-guide",
    compoundSlug: "humanin",
    pullQuote:
      "Humanin is one of the few peptides in this catalogue that your body already makes — a 24-amino-acid signal encoded in mitochondrial DNA, discovered in 2001 from the neurons that survived Alzheimer's disease. The identity is verifiable in minutes. The evidence ceiling is just as easy to state: there is not a single published human trial of it, and the pages that write about it disagree on its length, its mass, and even the name of its receptor.",
    quickInfo: [
      { label: "Compound", value: "Humanin (HN), free base" },
      { label: "Class", value: "Mitochondrial-derived peptide (MDP)" },
      { label: "Residues", value: "24 amino acids (not 21 — see below)" },
      { label: "Sequence", value: "MAPRGFSCLLLLTSEIDLPVKRRA" },
      { label: "CAS", value: "330936-69-1 (PubChem CID 16131438)" },
      { label: "Molecular formula", value: "C119H204N34O32S2 (free base)" },
      { label: "Molecular weight", value: "2687.2 g/mol (free base; TFA salt ≈2801.3)" },
      { label: "Encoded in", value: "16S rRNA region of mitochondrial DNA (MTRNR2)" },
      { label: "Analogue", value: "S14G-humanin (HNG) — ~1,000× potency in cell assays" },
      { label: "Human trials", value: "None published" },
      { label: "Status", value: "Research use only; no licensed therapeutic use" },
    ],
    sections: [
      {
        title: "A Peptide Discovered from the Neurons That Survived",
        body:
          "Humanin is the founding member of a small class of molecules called mitochondrial-derived peptides, and it began life as a happy accident. In **2001** a group at Keio University in Tokyo was screening for genes that could protect neurons from the toxic signals of Alzheimer's disease, and the factor that kept coming up was not encoded in the nuclear genome at all. It was encoded in the **16S ribosomal RNA region of mitochondrial DNA** — the small circular genome that mitochondria carry separately from the chromosomes in the nucleus. The team reported the finding in *PNAS* (PMID 11371646) and called the peptide humanin, after the human origin of the surviving neurons that yielded it.\n\nTwo consequences follow from that origin, and both matter more than most pages about the compound acknowledge. First, humanin was discovered for **neuroprotection** — its first described activity was blocking the cell-death signals triggered by amyloid-beta, mutant presenilin and a toxic APP variant. Second, it is **endogenous**. Unlike a synthetic research peptide that has no counterpart in the body, humanin circulates in human blood at picomolar concentrations, declines with age, and is produced by your own cells. That changes what a sensible research question about it looks like: not \"what does this foreign molecule do,\" but \"what happens when an endogenous signal is raised above the level the body already maintains.\"\n\nNone of the pages reviewed for this article — [the humanin compound record](/compounds/humanin) excepted, which lists the current UK suppliers — states that distinction cleanly. It is the single most important framing point in the whole subject.",
      },
      {
        title: "Molecular Identity — Verified Against PubChem",
        body:
          "Every figure below was checked against the PubChem record for **CID 16131438** on 10 November 2026, resolving both the compound name and CAS **330936-69-1** to that record. The identity is not in dispute; what is in dispute is how many residues the molecule has, and that is where several of the top-ranking pages go wrong.\n\n**Humanin is a 24-amino-acid peptide.** The sequence is **MAPRGFSCLLLLTSEIDLPVKRRA** — methionine, alanine, proline, then arginine-glycine-phenylalanine-serine, a run of four leucines, then the rest. Count the residues and you get 24. The free-base molecular weight is **2687.2 g/mol** and the formula is **C119H204N34O32S2**. One widely-shared page describes humanin as a \"21-amino-acid peptide\" with a mass of roughly 2,485 Da. Both numbers are wrong, and the error is worth naming because it is the kind of mistake that propagates: a reader who believes the 21-residue figure will misread a certificate and a reader who believes the 2,485 Da figure will think a correct 2,687 Da mass is wrong.\n\n**The mass has a second, legitimate reading, and it is a trap rather than an error.** Commercial humanin is usually supplied as the trifluoroacetate (TFA) salt, and the TFA counter-ion pushes the observed mass up to roughly **2801.3 g/mol**. A UK supplier reviewed for this article lists 2801.3 and the salt formula **C121H205F3N34O34S2** without saying it is a salt. Both 2687.2 and 2801.3 are \"correct\" — they describe the free base and its TFA salt respectively — and a certificate that does not state which form it reports is the single most common reason two humanin COAs disagree. The [compound page](/compounds/humanin) keeps the free-base figure for the same reason a registry does: it is the neutral reference.\n\n**The structural point that actually matters** is the single cysteine at position 8. A peptide with one cysteine cannot form an internal disulfide bond; it can, however, pair with a second humanin molecule to form a dimer. One page reviewed for this article asserts that humanin contains a disulfide bond \"important for its three-dimensional structure.\" That is not how this molecule behaves — in solution humanin is largely flexible, and the cysteine is a handle for dimerisation and oxidation, which is a storage consideration, not a structural brace.",
      },
      {
        title: "Mechanism — Three Targets, and a Receptor That Keeps Getting Renamed",
        body:
          "Humanin does not have one mechanism; it has at least three, and they operate in different compartments. The strongest-supported are the two direct protein interactions.\n\n**1. IGFBP-3 binding.** Insulin-like growth factor binding protein-3 has a pro-apoptotic role when it enters the cell under stress, and amyloid-beta is one of the signals that pushes it there. Humanin binds IGFBP-3 and blocks that death-promoting activity (this is the mechanism most often cited for its original Alzheimer's findings).\n\n**2. Bax inhibition.** Bax is the protein that initiates the mitochondrial route to apoptosis by forming pores in the outer mitochondrial membrane and releasing cytochrome c. Humanin binds Bax and prevents that translocation — the classic anti-apoptotic action, reported by Guo and Reed in *Nature* in 2003.\n\n**3. A cell-surface receptor that activates STAT3.** Humanin also binds a cytokine-receptor complex made of CNTFR, WSX-1 and gp130, driving JAK/STAT signalling. And it has a G-protein-coupled receptor of its own: **formyl peptide receptor-like-1, FPRL1**, now renamed FPR2/ALX, identified by Ying and colleagues in *Journal of Immunology* in 2004 (PMID 15153530). This is where competitor pages repeatedly stumble — at least one describes the receptor as \"FPRL2,\" which is a *different* GPCR and not the one humanin uses. The difference is not pedantry: FPRL1 and FPRL2 are distinct genes, and a researcher trying to replicate a binding assay with the wrong receptor would be working against the literature from the start.\n\n**The takeaway** is that humanin is a genuinely multi-target peptide — an extracellular receptor, an intracellular binding partner, and a mitochondrial effector — which is both its appeal and the reason its biology is hard to pin down to a single clean readout.",
      },
      {
        title: "The Analogue Problem — Why HNG Is Usually What Gets Studied",
        body:
          "A recurring detail in the literature is that native humanin is a weak tool for experiments, and most of the mechanistic work is done with an analogue rather than the natural sequence.\n\n**S14G-humanin, usually written HNG**, is the natural sequence with one change: the serine at position 14 is swapped for a glycine. That single substitution raises potency by roughly **1,000-fold** in cell-based neuroprotection assays — a figure that appears in essentially every guide on the subject, including the ones reviewed here. HNG is the standard research tool because it works at concentrations the native peptide cannot practically reach.\n\n**HN17** is a shorter C-terminal fragment that retains some activity and is used in a handful of studies. And the broader field has since added other mitochondrial peptides — MOTS-c (2015), the SHLP family, and more — of which humanin was the first.\n\nTwo consequences are worth separating. First, when a supplier sells \"humanin\" the label almost always means the native 24-residue sequence, not HNG, and the two are not interchangeable in what they cost or what they do. Second, because so much of the literature is built on HNG, a reader has to check which molecule a given finding actually concerns. A paper about HNG is not evidence about the native peptide at the same dose, and the ~1,000-fold potency gap is precisely the reason the distinction matters. The [humanin compound record](/compounds/humanin) distinguishes these forms in its listings rather than collapsing them.",
      },
      {
        title: "What the Literature Shows — Neuroprotection and Metabolism",
        body:
          "The verified literature is real but it is almost entirely preclinical, and it clusters around two claims.\n\n**Neuroprotection is the founding claim and the best-supported one.** The discovery paper (PMID 11371646) showed rescue of neuronal death induced by a spectrum of Alzheimer's-associated signals. Twenty years later, Zárate and colleagues reported in *Frontiers in Aging Neuroscience* (2019, PMID 31214013) that humanin is produced and secreted by **astrocytes**, and that this astrocytic humanin prevents synapse loss in hippocampal neurons — knockdown of astrocytic humanin increased synapse loss, and restoring the peptide partially rescued synapse integrity. That is a meaningful result because it places humanin inside a normal, endogenous protective process rather than only as an exogenous add-on.\n\n**The metabolic arm is younger and less settled.** Lee and colleagues showed in *Aging Cell* (2014, PMID 25040290) that IGF-I directly regulates humanin, tying it into the growth-hormone/IGF-1 axis that is itself implicated in lifespan. Rodent and invertebrate work associates humanin with improved glucose handling, beta-cell protection, and reduced hepatic lipid accumulation — but these are model-system findings, and the mechanism descriptions in competitor pages routinely overstate them as established human effects.\n\n**The aging correlation is the most quoted and the most easily misread result.** Yen and colleagues reported in *Aging* (2020, PMID 32575074) that centenarians and their offspring maintain higher plasma humanin than age-matched controls. That is an association in a highly selected survivor population. Higher humanin in centenarians does not demonstrate that humanin caused the longevity — and it is notable that the one page that says this plainly is the exception rather than the rule.",
      },
      {
        title: "Where the Evidence Is Genuinely Thin",
        body:
          "The honest summary of the ceiling is short, and it should be stated without hedging because almost no competitor page does.\n\n**There are no published human clinical trials of humanin or its analogues.** As of this writing the entire functional evidence base is cell culture, *C. elegans* and *Drosophila*, and rodent models. One UK supplier page reviewed for this article uses the phrase \"during clinical investigations,\" which implies a human evidence base that does not exist. There is none.\n\n**Measurement is a genuine obstacle.** Circulating humanin sits in the picomolar range, and measuring it requires sensitive immunoassays; early reported levels are hard to compare across studies. The same caveat applies to the half-life figure of roughly 30 minutes that circulates on these pages — it is a reported value, not a clinical pharmacokinetic measurement.\n\n**The endogenous question is unanswered.** Because humanin is already present in blood, the leap from \"an endogenous peptide whose levels correlate with outcomes\" to \"raising those levels externally produces the same outcomes\" is exactly the step no trial has yet tested. This is the same logic that governs the precursor-versus-compound debate in the glutathione literature, and it applies here with equal force.\n\n**None of this makes humanin a bad research subject.** A 24-residue peptide with a verified identity, a genuine receptor, and a real discovery story is a legitimate target. It makes it an *early-stage* one — and the pages that present it otherwise are doing the reader a disservice.",
      },
      {
        title: "What This Literature Does and Does Not Support",
        body:
          "Separating the supported from the unsupported is the whole job of a research guide, so here is the ledger.\n\n**Supported.** Humanin is a 24-amino-acid mitochondrial-derived peptide with CAS 330936-69-1, formula C119H204N34O32S2 and a free-base mass of 2687.2 g/mol. It was discovered in 2001 (PMID 11371646). It binds IGFBP-3 and Bax and signals through FPRL1/FPR2 (PMID 15153530). Astrocytic humanin prevents hippocampal synapse loss (PMID 31214013). Its levels associate with exceptional longevity in a survivor population (PMID 32575074).\n\n**Not supported.** That humanin extends human lifespan. That it treats or prevents Alzheimer's disease in people. That it improves glucose control in humans. That raising circulating humanin externally reproduces any of the preclinical findings. There is no human trial behind any of those statements, and no amount of confident vendor prose changes that.\n\n**What is live and interesting.** The FPRL1-versus-FPRL2 correction, which no competitor page gets right. The free-base-versus-TFA-salt mass distinction, which is the practical reason two COAs disagree. And the endogenous framing — the fact that this is a signal the body already produces — which is the correct way to think about what supplementing it even means. Readers interested in what the material actually costs in the UK and how to read a certificate for a single-cysteine peptide should read the companion price guide, and the [humanin compound page](/compounds/humanin) carries the current UK listings.",
      },
    ],
    faq: [
      {
        question: "Is humanin 21 or 24 amino acids?",
        answer:
          "Twenty-four. The native sequence is MAPRGFSCLLLLTSEIDLPVKRRA, which is 24 residues, with a free-base mass of 2687.2 g/mol (PubChem CID 16131438, CAS 330936-69-1). Some pages describe humanin as a 21-amino-acid peptide with a mass near 2,485 Da; that is an error that appears to have been copied between sources.",
      },
      {
        question: "What is the difference between humanin and HNG?",
        answer:
          "HNG (S14G-humanin) is the native humanin sequence with a single substitution — serine at position 14 replaced by glycine — that raises potency roughly 1,000-fold in cell-based assays. Most mechanistic research uses HNG rather than the native peptide, so a paper about HNG is not evidence about native humanin at the same dose. Suppliers almost always sell the native 24-residue sequence.",
      },
      {
        question: "Which receptor does humanin act through?",
        answer:
          "Formyl peptide receptor-like-1 (FPRL1), now renamed FPR2/ALX, identified by Ying et al. in 2004 (PMID 15153530). Humanin also signals through a cytokine-receptor complex of CNTFR, WSX-1 and gp130, and binds IGFBP-3 and Bax intracellularly. It does not act through FPRL2, which is a different GPCR that some pages mistakenly name.",
      },
      {
        question: "Why do two humanin certificates list different molecular weights?",
        answer:
          "Because one reports the free base and the other the salt. The free base is 2687.2 g/mol (formula C119H204N34O32S2); the trifluoroacetate (TFA) salt, which is how commercial humanin is commonly supplied, is roughly 2801.3 g/mol (C121H205F3N34O34S2). A certificate that does not state the form is ambiguous, which is why the two values disagree.",
      },
      {
        question: "Are there human clinical trials of humanin?",
        answer:
          "No. As of this writing there are no published human clinical trials of humanin or its analogues. The entire functional evidence base is cell culture, invertebrate and rodent models. Any page that implies human data exists is overstating the literature.",
      },
      {
        question: "Does ViralPeps sell humanin?",
        answer:
          "No. ViralPeps is a comparison and research-information site. It does not sell peptides, does not issue certificates of analysis, and does not verify supplier documentation. The compound page lists what UK suppliers advertise so prices and specifications can be compared; the material itself is sold by those suppliers for laboratory research use only.",
      },
    ],
    references: [
      "PubChem CID 16131438 (humanin): C119H204N34O32S2, 2687.2 g/mol, CAS 330936-69-1. Retrieved 10 November 2026.",
      "Hashimoto Y, Niikura T, Tajima H, et al. A rescue factor abolishing neuronal cell death by a wide spectrum of familial Alzheimer's disease genes and Abeta. Proc Natl Acad Sci U S A. 2001 May 22. PMID 11371646.",
      "Ying G, Iribarren P, Zhou Y, et al. Humanin, a newly identified neuroprotective factor, uses the G protein-coupled formylpeptide receptor-like-1 as a functional receptor. J Immunol. 2004 Jun 1. PMID 15153530.",
      "Guo B, Zhai D, Cabezas E, et al. Humanin peptide suppresses apoptosis by interfering with Bax activation. Nature. 2003 May 22;423(6938):456-61.",
      "Lee C, Wan J, Miyazaki B, et al. IGF-I regulates the age-dependent signaling peptide humanin. Aging Cell. 2014 Oct. PMID 25040290.",
      "Zárate SC, Traetta ME, Codagnone MG, et al. Humanin, a Mitochondrial-Derived Peptide Released by Astrocytes, Prevents Synapse Loss in Hippocampal Neurons. Front Aging Neurosci. 2019. PMID 31214013.",
      "Yen K, Mehta HH, Kim SJ, et al. The mitochondrial derived peptide humanin is a regulator of lifespan and healthspan. Aging (Albany NY). 2020 Jun 23;12(12):11185-11199. PMID 32575074.",
      "All identity figures re-verified against PubChem PUG-REST and all citations against NCBI E-utilities on 10 November 2026.",
    ],
  },
};
