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
export const snap8Content: Record<string, ResearchPageContent> = {
  "snap-8-research-guide": {
    slug: "snap-8-research-guide",
    compoundSlug: "snap-8",
    pullQuote:
      "SNAP-8 works by stopping the SNARE complex from being built, not by taking it apart. That single sentence separates the real mechanism from every vendor page in the UK market, and almost none of them say it.",
    quickInfo: [
      { label: "Compound", value: "SNAP-8 (INCI: Acetyl Octapeptide-3)" },
      { label: "Class", value: "Synthetic N-acetylated octapeptide; SNARE-modulating cosmetic peptide" },
      { label: "Sequence", value: "Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2" },
      { label: "Molecular Formula", value: "C41H70N16O16S (PubChem CID 76283482)" },
      { label: "Molecular Weight", value: "1075.2 g/mol (C-terminal amide)" },
      { label: "CAS", value: "868844-74-0 (resolves to CID 76283482)" },
      { label: "Mechanism", value: "N-terminal SNAP-25 mimic; inhibits SNAP25–syntaxin binary complex formation" },
      { label: "Human route studied", value: "Topical and microneedle only. No parenteral human data" },
    ],
    sections: [
      {
        title: "A Cosmetic Peptide Wearing a Research Compound's Name",
        body:
          "SNAP-8 is an eight-amino-acid synthetic peptide sold in the UK as a lyophilised vial alongside growth hormone secretagogues, GLP-1 analogues and mitochondrial peptides. It is not any of those things. It is a cosmetic active ingredient with an INCI listing, a mechanism that was characterised in a neuroscience laboratory, and a human evidence base that consists entirely of topical and microneedle studies.\n\nThat mismatch is the single most useful thing to understand before reading any UK listing for it. The compound is genuine, the mechanism is published in a serious journal, and the clinical work exists — but the clinical work used it in a patch applied to the skin, formulated with four or five other actives. No study has ever given SNAP-8 alone to a human by any route.\n\nThis guide covers what the peptide is, what the founding paper actually showed, what the two human trials actually measured, and where the evidence stops. The [SNAP-8 compound page](/compounds/snap-8) carries live UK stock and pricing; what follows is the science that should sit behind the label.",
      },
      {
        title: "The Name Is a Trade Name, and There Are Three of Them",
        body:
          "The first obstacle to comparing SNAP-8 listings is nomenclature. \"SNAP-8\" is a trade name. The INCI name — the one that appears on cosmetic ingredient labels — is **Acetyl Octapeptide-3**. PubChem's synonym list for this compound also carries **Acetyl Octapeptide-1** and **Acetyl Octapeptide-8**, plus Acetyl Glutamyl Heptapeptide-3 and Acetyl Glutamyl Octapeptide-3.\n\nAll of those names resolve to a single PubChem CID: **76283482**. One molecule, six names, and a market in which a buyer can compare two listings that are the same substance under different labels.\n\nThe \"-3\" and \"-1\" and \"-8\" suffixes are INCI registry sequence numbers, not chain lengths. That matters because the natural assumption on seeing Octapeptide-1 and Octapeptide-8 side by side is that they are positional isomers or different peptides. They are not.\n\nWhat the molecule actually is: an eight-residue peptide, **Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp**, with an acetyl group capping the N-terminus and an amide at the C-terminus. The N-terminal acetylation is not cosmetic — it blocks aminopeptidase attack, which is the same reason it is used across the cosmetic peptide category. The sequence is patterned on the N-terminal region of SNAP-25, the 25 kDa synaptosomal-associated protein, which is where the trade name comes from.",
      },
      {
        title: "Molecular Identity: What a Certificate Should Show",
        body:
          "Against PubChem, the identity is settled. **CAS 868844-74-0** resolves to **CID 76283482**, formula **C41H70N16O16S**, average molecular weight **1075.2 g/mol**.\n\nOne detail on that mass is worth carrying into any certificate you read. A published review of cosmetic peptides tabulates the Acetyl Octapeptide-3 sequence with a molecular weight of **1073.2**. The two figures are 2 Da apart, and the difference is real: 1075.2 is the C-terminal **amide**, 1073.2 is the C-terminal **free acid**. Both are legitimate ways to synthesise the peptide, and they are different molecules at the C-terminus. A certificate reporting 1073 has a free-acid C-terminus; one reporting 1075 has the amide. Neither is \"wrong\", but a supplier should be able to say which one they hold, and a listing that quotes an MW without resolving this has not fully specified what it sells.\n\nOur own catalogue record for SNAP-8 carries CAS 868844-74-0 and a molar mass of 1075.2 g/mol, both of which match PubChem. The sequence field on that record is currently blank — a data gap rather than an error, and worth filling.\n\nSolubility follows from the sequence: four acidic and basic side chains (two Glu, two Arg) make the peptide freely water-soluble, unlike the greasy aromatic secretagogues that dominate the rest of the peptide catalogue. It is handled as a lyophilised powder and reconstituted in aqueous buffer, and it tolerates that far better than most of its shelf-neighbours.",
      },
      {
        title: "Mechanism: Blocking Assembly, Not Breaking It Apart",
        body:
          "The founding paper is Blanes-Mira and colleagues in the *Journal of Neurochemistry*, January 2004 (PMID 14675156): *Small peptides patterned after the N-terminus domain of SNAP25 inhibit SNARE complex assembly and regulated exocytosis.*\n\nThree findings from that paper are load-bearing, and the third is the one nobody quotes.\n\n**First, the target region was mapped.** The segment of SNAP-25 spanning residues 22Ala-44Ile was shown to be essential for formation of the SNARE complex. Peptides patterned on that domain inhibited complex assembly, and the degree of inhibition correlated with the peptides' propensity to adopt an alpha-helical secondary structure — a structure-activity finding, not a generic charge effect.\n\n**Second, the mechanism was localised.** The peptides did not act on the assembled ternary SNARE complex. They disrupted the **binary complex formed between SNAP-25 and syntaxin** — the first step of assembly. That is a specific molecular claim, tested, and it is the reason the peptide class is described as SNARE-modulating rather than SNARE-disrupting.\n\n**Third, and this is the part that gets dropped: the peptides worked only when added before aggregate assembly had begun.** The paper states it plainly. Present the peptide after the complex is formed and the inhibition does not follow. SNAP-8 is a pre-assembly inhibitor. That has a direct consequence for how any topical product is described: the peptide has to be present in the tissue before vesicle fusion is initiated, which is a much narrower window than \"relaxes existing lines\" implies.\n\nThe same group had already published the screening work behind the class — an alpha-helix-constrained combinatorial library used to identify SNARE complex modulators, in the *Biochemical Journal* in 2003 (PMID 12852787). The approach was deliberate: constrain the peptide into the helix that binds, and you get inhibition without needing to compete at high concentration.\n\nThere is also a computational paper frequently cited alongside these, Wongrattanakamon and colleagues in *Molecular and Cellular Biochemistry*, 2018 (PMID 29019108), which uses molecular dynamics to propose that botox-like peptides act at the synaptotagmin 1 C2A-C2B interface, rigidifying the protein and blocking its closed-to-open transition. It is a plausible model and it is interesting. It is also **entirely in silico** — simulation, not experiment — and a page that presents it as demonstrated mechanism has over-read it. The experimental mechanism of record remains the SNAP-25/syntaxin binary complex disruption.\n\nFinally, the 2004 paper reports that the peptides inhibited Ca2+-dependent exocytosis from detergent-permeabilised excitable cells and protected intact hippocampal neurons against hypoglycaemia-induced, glutamate-mediated excitotoxicity with potency that rivalled botulinum neurotoxins. That is a neuroscience result, in neurons, in vitro and ex vivo. It is not a skin result, and the leap from it to a cosmetic claim is the market's, not the paper's.",
      },
      {
        title: "The Human Trials: Two Studies, Both Formulations, Neither the Peptide Alone",
        body:
          "Two human clinical studies involving acetyl octapeptide-3 were located and verified on PubMed. Both are worth reading properly, because both are routinely misquoted in this market.\n\nThe first is Avcil and colleagues, *Journal of Cosmetic Dermatology*, February 2020 (PMID 31134751): *Efficacy of bioactive peptides loaded on hyaluronic acid microneedle patches: A monocentric clinical study.* Twelve weeks, healthy subjects with aged skin, patches applied to the outer corner of both eyes and to the volar forearm. The patch contained an arginine/lysine polypeptide, **acetyl octapeptide-3**, palmitoyl tripeptide-5, adenosine and seaweed extracts in a hyaluronic acid microneedle array.\n\nThe reported results are the ones every listing quotes: fine lines and wrinkles down **25.8%**, skin hydration up **15.4%**, dermal density up **14.2%**, dermal thickness up **12.9%**, and no primary or cumulative skin reactions in any subject. Those are good numbers for a cosmetic study.\n\nThey are also **the numbers for a five-ingredient microneedle patch.** The authors say so themselves: the composition \"works in a multi-targeted manner and all ingredients might possibly be acted synergistically.\" There is no arm in that study receiving acetyl octapeptide-3 alone. Attributing 25.8% to SNAP-8 is not supported by the paper, and the paper is the only place the figure is real.\n\nThe second is Shin and colleagues, *Annals of Dermatology*, August 2024 (PMID 39082657): *Clinical Safety and Efficacy Evaluation of a Dissolving Microneedle Patch Having Dual Anti-Wrinkle Effects.* Twenty-four healthy subjects, split-face design — active patch on one eye, hyaluronic-acid-only placebo patch on the other — for 28 days. The active patch contained hyaluronic acid, **acetyl octapeptide-3**, L-ascorbic acid 2-glucoside and sodium cyclic lysophosphatidic acid.\n\nThis design is stronger than the 2020 study because it has a within-subject placebo, and the result is positive: improved eye wrinkles against placebo, reduced trans-epidermal water loss, better elasticity and lifting, no adverse effects. It is also, again, a four-ingredient patch in which the delivery system physically punctures the stratum corneum.\n\nThe honest summary of the human evidence is therefore narrower than the market suggests and stronger than a pure null result. SNAP-8 has been included in two formulations that measurably improved skin appearance against controls. It has never been tested alone. And in both studies, the microneedle array itself is part of the intervention — a delivery advantage no serum or reconstituted vial reproduces.",
      },
      {
        title: "The Route Problem: Everything Was Topical",
        body:
          "This is the point where the UK market and the literature diverge completely, and it is not a small divergence.\n\nEvery human study of acetyl octapeptide-3 is **topical**. One used a microneedle patch, the other a microneedle patch against a placebo patch. The peptide is an INCI-listed cosmetic ingredient, which is the category it was developed and tested in.\n\nThe UK market sells it as a **10 mg lyophilised vial**, in the same format and with the same presentation as peptides that are studied parenterally. There is no human pharmacokinetic study of SNAP-8 by any parenteral route, no dosing literature, and no safety data outside cosmetic application. The reconstituted-vial format is inherited from the rest of the catalogue, not from the evidence.\n\nThe practical consequence: a buyer reading two listings — one for a 10 mg vial, one for a cosmetic serum — is looking at the same molecule presented for use cases with wildly different evidence bases behind them. The serum has two clinical trials in a related delivery format. The vial has an in-vitro mechanism and nothing else.\n\nThat is not a claim that the material is unsafe or inert. It is a statement about where the evidence stops, which for a comparison site is the only useful thing to state.\n\nHalf-life is a good illustration of the same gap. **No human pharmacokinetic figure for SNAP-8 is verifiable in the accessible literature**, and this guide therefore states none. Cosmetic peptides are designed to act locally at the application site; a circulating half-life is not the relevant parameter and has not been measured.",
      },
      {
        title: "What the Literature Shows, and What It Does Not",
        body:
          "Pulling the whole evidence base into one place, the position is this.\n\n**Established.** The molecular identity is unambiguous and registry-consistent: CAS 868844-74-0, CID 76283482, C41H70N16O16S, 1075.2 g/mol as the amide. The mechanism is published experimentally: N-terminal SNAP-25-mimetic peptides inhibit SNARE assembly by disrupting the SNAP25–syntaxin binary complex, with activity tracking alpha-helical propensity, and only when present before assembly begins (PMID 14675156). The peptide tolerates topical formulation and has been carried through two controlled human studies without adverse events.\n\n**Supported but indirect.** Both human trials show benefit for **formulations containing** acetyl octapeptide-3, including one against a within-subject placebo. That supports the ingredient's inclusion in a product. It does not isolate its contribution, and neither trial was designed to.\n\n**Not established.** There is no trial of SNAP-8 as a single active. There is no parenteral human data of any kind. There is no human pharmacokinetics. There is no dose-response study identifying what concentration in a formulation is required for the effect — the published review tabulates the trial formulation at 0.05%, which is a single data point, not a dose-response curve.\n\n**Overstated in the market.** The claim that SNAP-8 \"relaxes\" or \"dissolves\" existing wrinkles implies disassembly of a formed complex, which the founding paper explicitly did not find. The 25.8% wrinkle figure is a five-ingredient patch result. And the synaptotagmin model (PMID 29019108) is simulation, not measurement.\n\nFor anyone building a research protocol around this compound, the honest framing is that SNAP-8 is a well-specified, well-mannered cosmetic peptide with a clean in-vitro mechanism and formulation-level clinical support, being sold in a delivery format its evidence base does not cover.",
      },
      {
        title: "Provenance and the Cosmetic Peptide Category",
        body:
          "SNAP-8 belongs to a family of cosmetic peptides that emerged in the 2000s aimed at the same target as botulinum toxin without the toxin: reducing the neurotransmitter release that drives repeated facial muscle contraction, and thereby the lines that follow it.\n\nThe category's logic is straightforward. Botulinum neurotoxins are metalloproteases that cleave specific SNARE proteins — SNAP-25 for serotype A, among others — and abolish vesicle fusion at the neuromuscular junction. A peptide cannot do that; it has no catalytic activity. What a peptide can do is occupy the protein-protein interface that assembly requires, and that is precisely the mechanism PMID 14675156 describes. The result is partial, reversible inhibition of a physical binding step rather than enzymatic cleavage of the target.\n\nThat difference is why the category's marketing language outruns its data. \"Botox-like\" describes the target, not the potency. A peptide that slows SNARE assembly when present before it starts is a different pharmacological object from a protease that destroys the substrate, and the two do not belong in the same sentence without that qualification.\n\nThe category has since moved on. A 2024 paper from Medytox in the *Journal of Cosmetic Dermatology* (PMID 37698157) describes a cell-penetrating-peptide-conjugated SNARE motif derived from VAMP2 — a different molecule, a different INCI name (Acetyl sh-Oligopeptide-26/27), and a design intended to address the delivery problem that limits all of these peptides in a topical formulation. It is not SNAP-8 and should not be cited as evidence for it, but it is a useful marker of where the field's unsolved problem sits: getting a hydrophilic octapeptide to the intracellular compartment where SNARE assembly actually happens.\n\nThat, more than the wrinkle percentages, is the real open question in this category — and it is the reason a microneedle patch outperforms a serum, and why neither is equivalent to an injected vial.",
      },
    ],
    faq: [
      {
        question: "Is SNAP-8 the same as Acetyl Octapeptide-3?",
        answer:
          "Yes. SNAP-8 is a trade name; Acetyl Octapeptide-3 is the INCI name. PubChem (CID 76283482) also lists Acetyl Octapeptide-1, Acetyl Octapeptide-8 and Acetyl Glutamyl Heptapeptide-3 as synonyms for the same compound, so those three INCI names all refer to one molecule. The suffixes are registry sequence numbers, not chain lengths.",
      },
      {
        question: "What is the molecular weight of SNAP-8?",
        answer:
          "1075.2 g/mol for the C-terminal amide form (C41H70N16O16S, PubChem CID 76283482, CAS 868844-74-0). The C-terminal free acid form is 1073.2 g/mol, and some reviews quote that figure. The 2 Da difference is the amide, and a certificate of analysis should specify which form it is reporting.",
      },
      {
        question: "Does SNAP-8 break down an existing SNARE complex?",
        answer:
          "No. The founding study (PMID 14675156, Journal of Neurochemistry 2004) found that N-terminal SNAP-25 peptides disrupt the SNAP25–syntaxin binary complex during assembly, and that they abolished complex formation only when added before assembly had begun. It is a pre-assembly inhibitor, not a disassembler, which is why descriptions of it 'relaxing' existing wrinkles misstate the mechanism.",
      },
      {
        question: "Has SNAP-8 been tested in humans on its own?",
        answer:
          "No. Two human studies exist (PMID 31134751, 2020; PMID 39082657, 2024) and both tested microneedle patches containing acetyl octapeptide-3 alongside three to five other actives, one of them against a placebo patch. Both showed benefit for the formulation. Neither isolated the peptide's contribution, and there is no trial of SNAP-8 as a single active by any route.",
      },
      {
        question: "Is there any human data for injectable SNAP-8?",
        answer:
          "None that could be verified. Every human study of acetyl octapeptide-3 is topical or microneedle. There is no published human pharmacokinetics, no parenteral dosing literature and no safety data outside cosmetic application, despite UK vendors selling it as a 10 mg lyophilised vial. No half-life figure is stated in this guide because none is verifiable.",
      },
    ],
    references: [
      "PubChem Compound CID 76283482 (Acetyl octapeptide-3) — C41H70N16O16S, 1075.2 g/mol, CAS 868844-74-0, synonyms include Acetyl Octapeptide-1/-3/-8. https://pubchem.ncbi.nlm.nih.gov/compound/76283482",
      "Blanes-Mira C et al. Small peptides patterned after the N-terminus domain of SNAP25 inhibit SNARE complex assembly and regulated exocytosis. J Neurochem. 2004 Jan;88(1):124-35. PMID 14675156.",
      "Identification of SNARE complex modulators that inhibit exocytosis from an alpha-helix-constrained combinatorial library. Biochem J. 2003 Oct 1. PMID 12852787.",
      "Wongrattanakamon P et al. Molecular modeling elucidates the cellular mechanism of synaptotagmin-SNARE inhibition. Mol Cell Biochem. 2018 May;442(1-2):97-109. PMID 29019108.",
      "Avcil M et al. Efficacy of bioactive peptides loaded on hyaluronic acid microneedle patches: A monocentric clinical study. J Cosmet Dermatol. 2020 Feb;19(2):328-337. PMID 31134751.",
      "Shin JY et al. Clinical Safety and Efficacy Evaluation of a Dissolving Microneedle Patch Having Dual Anti-Wrinkle Effects. Ann Dermatol. 2024 Aug;36(4):215-224. PMID 39082657.",
      "Lee HJ et al. Potential role of the CPP-conjugated SNARE motif of VAMP2-patterned peptide in cosmeceutical skin product development. J Cosmet Dermatol. 2024 Feb;23(2):666-675. PMID 37698157.",
      "Peptides: Emerging Candidates for the Prevention and Treatment of Skin Senescence: A Review. PMC11762834 — tabulates Acetyl Octapeptide-3 at 1073.2 g/mol (free acid) and a trial formulation concentration of 0.05%.",
    ],
  },
};
