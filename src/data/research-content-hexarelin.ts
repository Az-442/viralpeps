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

// appended by Class C queue day 7 (Hexarelin) — see class-c-article-queue.md
export const hexarelinContent: Record<string, ResearchPageContent> = {
  "hexarelin-research-guide": {
    slug: "hexarelin-research-guide",
    compoundSlug: "hexarelin",
    pullQuote:
      "Hexarelin has two pharmacology stories. The GH-releasing one was measured in humans in 1994 and has held up. The cardiac one is a rat story built on a receptor that constricts coronary arteries, and it is the one the market sells.",
    quickInfo: [
      { label: "Compound", value: "Hexarelin (INN: examorelin)" },
      { label: "Class", value: "Synthetic hexapeptide, growth hormone secretagogue (GHRP family)" },
      { label: "Sequence", value: "His-D-2-Me-Trp-Ala-Trp-D-Phe-Lys-NH2" },
      { label: "Molecular Formula", value: "C47H58N12O6 (PubChem CID 6918297)" },
      { label: "Molecular Weight", value: "887.0 g/mol" },
      { label: "CAS", value: "140703-51-1 (resolves to CID 6918297)" },
      { label: "Receptors", value: "GHS-R1a (ghrelin receptor); CD36 (cardiac, rodent models)" },
      { label: "Half-life", value: "75.9 ± 9.3 min IV in rat (PMID 10611139). No verified human figure" },
    ],
    sections: [
      {
        title: "A Six-Residue Peptide With Two Unrelated Jobs",
        body:
          "Hexarelin is a synthetic hexapeptide — six amino acids — developed as a growth hormone secretagogue in the 1990s. Its interest to pharmacology is that it does two things that have nothing to do with each other, and the literature on it divides cleanly along that line.\n\nThe first job is endocrine. Hexarelin binds GHS-R1a, the ghrelin receptor, on pituitary somatotrophs and in the hypothalamus, and triggers growth hormone release. That effect was measured in people in 1994 and has been replicated many times since. It is well characterised, it is the reason the compound exists, and it is not the reason most people read about it.\n\nThe second job is cardiac. In rodent and isolated-heart models, hexarelin binds the scavenger receptor CD36 and produces cardiovascular effects that persist when the ghrelin receptor is blocked or absent. This line of work is real, is published in serious journals, and has never been tested in a controlled human cardiology trial. It is also, almost invariably, the story a UK vendor tells.\n\nThe gap between those two stories — one human-tested and modest, one rodent-tested and dramatic — is the subject of this guide. The [Hexarelin compound page](/compounds/hexarelin) carries the live UK stock and pricing; what follows is the evidence behind the label.",
      },
      {
        title: "Molecular Identity and the Name on the Certificate",
        body:
          "Hexarelin is a research name. The international non-proprietary name is **examorelin**, and both appear on UK listings for the same molecule, which is worth knowing before comparing two prices.\n\nAgainst PubChem (CID 6918297), the identity is settled: **CAS 140703-51-1**, formula **C47H58N12O6**, average molecular weight **887.0 g/mol**. PubChem resolves the CAS to that same CID, so the registry number and the mass are consistent with each other — which is not a trivial check, since it is exactly the check that fails for other compounds in this market.\n\nThe sequence is **His-D-2-Me-Trp-Ala-Trp-D-Phe-Lys**, with a C-terminal amide. The residue that defines it is the second position: a D-2-methyl-tryptophan. That single methyl group is the structural change from GHRP-6, and it was introduced for chemical stability rather than for potency. Hexarelin is, in that sense, a stabilised descendant of the older GHRP peptides rather than a new design.\n\nA note on our own data, since it is better to publish it than to leave it: the ViralPeps compound record for hexarelin has carried a molar mass of 844.0 g/mol, which does not match PubChem's 887.0. The sequence string on that record is correct. Commercial peptide certificates for hexarelin will report an observed mass near 887; a certificate reporting 844 is either stating a different quantity (such as the free base against a salt) or is wrong, and the supplier should be asked which. Anyone reconciling a certificate against a listing should use 887.0 as the reference figure.\n\nSolubility, stated plainly by one UK supplier and absent from most: the compound is sold as a lyophilised powder stored at −20 °C, and it is poorly soluble in water at neutral pH — it is typically prepared from DMSO stock for in-vitro work rather than dissolved directly into aqueous buffer.",
      },
      {
        title: "The GH Arm: What 1994 Established, and What Age Does to It",
        body:
          "The foundational human work is Ghigo and colleagues in the Journal of Clinical Endocrinology and Metabolism in March 1994 (PMID 8126144): *Growth hormone-releasing activity of hexarelin, a new synthetic hexapeptide, after intravenous, subcutaneous, intranasal, and oral administration in man.* The title is the finding. Hexarelin released GH by all four routes, including oral — unusual for a peptide, and the reason it attracted attention as a practical secretagogue rather than a laboratory curiosity.\n\nThe intranasal route was followed up the same year in Clinical Endocrinology (PMID 7955465). The mechanism, described in the systematic literature since, is GHS-R1a agonism driving phospholipase C and intracellular calcium in somatotrophs, with a reduction of somatostatin tone — that is, the pulse is released and the brake on it is eased at the same time.\n\nWhat the later human work established is more interesting than the original result, because it is about limits. In elderly subjects, the GH response to hexarelin is blunted, and it can be restored by co-administration of arginine and GHRH — published in JCEM in November 1994 (PMID 7962341). That is a finding about the pituitary's reserve rather than about the peptide: the response depends on the state of the axis being stimulated.\n\nA second limit is sex and hormonal status. In post-menopausal women, hexarelin's GH-releasing activity is reduced, and oestrogen replacement does not restore it (European Journal of Endocrinology, 1997; PMID 9186268). Again the finding is about the system, not the drug.\n\nThe desensitisation question is where the summaries split, and both halves are real. A 2003 in-vitro study in Journal of Endocrinological Investigation (PMID 14669829) reports rapid desensitisation of the ghrelin receptor to hexarelin at the receptor level. In humans, by contrast, short-term hexarelin use did not blunt subsequent GH responsiveness — in patients with anorexia nervosa, hexarelin did not desensitise the later GH response to GHRH (Clinical Endocrinology, 1997; PMID 9231048). The defensible statement is that desensitisation depends on route, frequency and duration, and that the in-vitro and short-term human results are not in conflict — they are measuring different windows.\n\nOne class-level caveat that no UK page addresses properly: GHRP-family secretagogues are not GH-selective. They act on the ghrelin receptor, which is not a GH receptor, and concurrent changes in other pituitary outputs are described across the class. That is a reason to treat 'GH secretagogue' as a description of the dominant effect rather than the only one.",
      },
      {
        title: "The Cardiac Arm: CD36, and Why Cardioprotection Is the Wrong Headline",
        body:
          "The paper that started this line is Bodart and colleagues in Circulation Research, May 2002 (PMID 11988484): *CD36 mediates the cardiovascular action of growth hormone-releasing peptides in the heart.* The design is the part that matters. Hexarelin's cardiovascular effects were shown to persist in conditions where GHS-R1a signalling was not available, and CD36 — a class B scavenger receptor expressed on cardiomyocytes, macrophages and endothelium — was identified as the binding partner.\n\nThe reason this is scientifically interesting is that it separates two mechanisms cleanly. If a cardiac effect survives ghrelin-receptor blockade, it is not a growth hormone effect. The ghrelin knockout model in Endocrinology (2013; PMID 23861368), which examined hexarelin treatment after myocardial infarction in male ghrelin knockout mice, is the cleanest example of the design.\n\nThe literature that followed is substantial and almost entirely rodent or ex-vivo. Hexarelin protected rat cardiomyocytes from in-vivo ischaemia-reperfusion injury through interleukin-1 signalling (International Heart Journal, 2017; PMID 28321024). A single oral dose protected chronic cardiac function after myocardial infarction in a 2014 Peptides study (PMID 24747279). GH-releasing peptides improved cardiac dysfunction and cachexia and suppressed stress-related hormones and cardiomyocyte apoptosis in cardiomyopathic rats (American Journal of Physiology, 2005; PMID 15951341). Reviews of the cardiovascular action appeared in Basic Research in Cardiology (2003; PMID 14556085) and Journal of Geriatric Cardiology (2014; PMID 25278975).\n\nHere is the thing that gets dropped. **The CD36 binding Bodart described produced coronary vasoconstriction.** CD36 is not a cardioprotective receptor; it is a fatty-acid translocase that also binds oxidized LDL and plays a role in atherosclerosis. The cardiac effects attributed to it run in both directions depending on context, and a page that summarises this literature as cardioprotection has taken the papers with favourable findings and left the mechanism behind.\n\nTwo further cautions belong here because they come from the better pages rather than the worse ones. Much of the cardiac remodelling work uses spontaneously hypertensive rats, a strain that is itself CD36-deficient — which complicates any clean attribution of an effect to CD36 signalling. And the cardiac literature clusters around a small number of collaborating groups, so the volume of papers overstates the amount of independent replication. There is no controlled human trial of hexarelin as a cardioprotective agent. The human data are endocrine.",
      },
      {
        title: "Pharmacokinetics: One Verified Figure, and Where It Comes From",
        body:
          "Hexarelin's kinetics in humans are not well documented in the accessible literature, and the circulating half-life figures quoted on vendor pages are not sourced to a human study. What is verifiable is a rat study, and it is a good one.\n\nRoumi and colleagues, in Drug Metabolism and Disposition in January 2000 (PMID 10611139), dosed male Sprague-Dawley rats with a 5 µg/kg intravenous bolus and subcutaneous doses of 5, 10 and 50 µg/kg. After intravenous administration the half-life was **75.9 ± 9.3 minutes**, with clearance of 7.6 ± 0.7 mL/min/kg and a steady-state volume of distribution of 744 ± 81 mL/kg. Subcutaneous bioavailability was **64%**, and the AUC scaled with dose across the range tested, which the authors read as evidence of no accumulation on repeated dosing. Clearance and volume of distribution normalised for bioavailability were dose-independent. The highest tissue radioactivity was in kidney, liver and duodenum, and biliary excretion was 60% of the dose as against 22% urinary and 10% faecal.\n\nTwo things follow. First, the 75-minute figure is a rat half-life and must be labelled as one; anyone comparing it to a longer-acting GHRH analogue such as a CJC-1295 is comparing a rodent number to a human one. Second, the absence of accumulation at subcutaneous doses up to 50 µg/kg is a real pharmacokinetic observation and it is the strongest available counterweight to the claim that hexarelin necessarily desensitises the axis — though the doses tested were small and the duration was short.\n\nIf a UK supplier states a human half-life for hexarelin without a citation, treat it as unsourced. A number in a listing is not a datum.",
      },
      {
        title: "Handling, Purity, and the Analytical Realities",
        body:
          "A six-residue peptide with a C-terminal amide is straightforward analytically. The difficulty is not identity; it is the difference between a purity figure and a quantity.\n\n**Mass and identity.** At 887.0 g/mol, hexarelin sits comfortably within the resolving power of routine LC-MS. The vulnerable residues are the tryptophans — two of the six, including the 2-methyl-substituted one — because indole oxidation is the commonest degradation route for any Trp-containing peptide. An oxidised species is a distinct mass, so an observed mass alone does not prove a clean batch; the chromatogram has to show a single peak.\n\n**Net peptide content.** Lyophilised peptide is peptide plus counter-ion plus residual water. A vial labelled 5 mg typically contains something like 70 to 90 per cent peptide by mass, with the rest acetate or trifluoroacetate and moisture. Two 5 mg vials can therefore differ by roughly a fifth in actual material. Every per-milligram price comparison in this market — including the one on our own site — divides by the label mass and ignores this. It is the single largest error source in comparing a £19.75 five-milligram vial with a £45.99 one.\n\n**Purity is not content, and the two get compared across suppliers as if they were the same measurement.** A vendor quoting 99% HPLC purity and a vendor quoting 90% net peptide content are describing different things, and a page that lines those numbers up side by side is producing a false equivalence.\n\n**Lot traceability.** The certificate has to resolve to the vial. In a market where a 2 mg vial retails for under £10, the marginal cost of a plausible generic certificate is close to zero, which makes the lot number the only part of the document with real information in it.\n\nThe [UK per-milligram price comparison for Hexarelin](/research/hexarelin-uk-price-guide) does the pack-size arithmetic and sets out what the documentation looks like at each price point.",
      },
      {
        title: "What the Literature Does and Does Not Show",
        body:
          "The well-supported statements are these. Hexarelin is a synthetic hexapeptide, INN examorelin, CAS 140703-51-1, C47H58N12O6, 887.0 g/mol, whose defining structural feature is a D-2-methyl-tryptophan at position 2. It releases growth hormone dose-dependently in humans by intravenous, subcutaneous, intranasal and oral routes. The response is blunted with age and with post-menopausal status, and can be restored in the elderly by arginine and GHRH. In rodents, subcutaneous bioavailability is high and there is no accumulation at the doses tested. In rodent and ex-vivo hearts, it binds CD36 and produces cardiovascular effects that do not depend on the ghrelin receptor.\n\nWhat does not exist: any controlled human trial of hexarelin in cardiac disease; any verified human half-life; any marketing authorisation as a medicine from the EMA or FDA in any jurisdiction reviewed; any study establishing that CD36 engagement in humans produces a net benefit rather than the vasoconstriction Bodart reported; and any head-to-head trial against a more selective secretagogue such as ipamorelin, which does not appear in the CD36 literature at all.\n\nThe evidence ceiling differs between the two arms, and that is the useful summary. The endocrine story is human-tested, modest and limited by the state of the axis. The cardiac story is rodent, mechanistically real, and presented in the market as though it were a benefit when the founding paper describes a receptor whose activation constricts coronary vessels. A laboratory using hexarelin as a tool to dissect GHS-R1a from CD36 signalling is using it exactly as the literature supports. Anything beyond that is extrapolation, and it is worth pricing accordingly.",
      },
    ],
    faq: [
      {
        question: "Is hexarelin the same as examorelin?",
        answer:
          "Yes. Examorelin is the international non-proprietary name for hexarelin, and both appear on UK listings for the same molecule. PubChem records the compound as CID 6918297 under the title Examorelin, with CAS 140703-51-1, formula C47H58N12O6 and a molecular weight of 887.0 g/mol. A listing using either name describes the same peptide.",
      },
      {
        question: "What is hexarelin's half-life?",
        answer:
          "The only figure that can be verified from the literature is in rats: 75.9 ± 9.3 minutes after an intravenous bolus, with 64% subcutaneous bioavailability and no accumulation at subcutaneous doses up to 50 µg/kg (Roumi et al., Drug Metabolism and Disposition, 2000; PMID 10611139). No human half-life was found in the published record reviewed for this guide, so any human figure quoted on a supplier page should be treated as unsourced.",
      },
      {
        question: "What does CD36 have to do with hexarelin?",
        answer:
          "CD36 is a scavenger receptor on cardiomyocytes, macrophages and vascular endothelium. Bodart and colleagues (Circulation Research, 2002; PMID 11988484) showed that certain cardiovascular effects of hexarelin persist when GHS-R1a signalling is unavailable, and identified CD36 as the binding partner. It matters that the same paper describes coronary vasoconstriction as the CD36-mediated response — CD36 is not a cardioprotective receptor, and the later rodent literature on ischaemia-reperfusion protection does not establish a net benefit.",
      },
      {
        question: "Was hexarelin ever tested in humans for heart effects?",
        answer:
          "No. The human literature on hexarelin is endocrine — GH release by four routes, the age-related blunting of that response, and its restoration by arginine and GHRH. The cardiac work is in rat and mouse models and in isolated perfused hearts. There is no controlled human trial of hexarelin as a cardioprotective agent in the record reviewed.",
      },
      {
        question: "Does hexarelin cause desensitisation?",
        answer:
          "Both answers in the literature are correct for their own setting. In vitro, the ghrelin receptor desensitises rapidly to hexarelin (Journal of Endocrinological Investigation, 2003; PMID 14669829). In short-term human use, hexarelin did not blunt the subsequent GH response to GHRH (Clinical Endocrinology, 1997; PMID 9231048). Desensitisation therefore depends on route, frequency and duration rather than being a fixed property of the peptide, and the rat pharmacokinetics — no accumulation at subcutaneous doses up to 50 µg/kg — are consistent with that reading.",
      },
    ],
    references: [
      "Ghigo E, Arvat E, Gianotti L, et al. Growth hormone-releasing activity of hexarelin, a new synthetic hexapeptide, after intravenous, subcutaneous, intranasal, and oral administration in man. J Clin Endocrinol Metab. 1994;78(3). PMID 8126144",
      "Arvat E, Gianotti L, Broglio F, et al. Arginine and growth hormone-releasing hormone restore the blunted growth hormone-releasing activity of hexarelin in elderly subjects. J Clin Endocrinol Metab. 1994. PMID 7962341",
      "Absence of desensitization by hexarelin to subsequent GH releasing hormone-mediated GH secretion in patients with anorexia nervosa. Clin Endocrinol (Oxf). 1997. PMID 9231048",
      "Oestrogen replacement does not restore the reduced GH-releasing activity of Hexarelin in post-menopausal women. Eur J Endocrinol. 1997. PMID 9186268",
      "Rapid desensitisation of the GH secretagogue (ghrelin) receptor to hexarelin in vitro. J Endocrinol Invest. 2003. PMID 14669829",
      "Bodart V, Febbraio M, Demers A, et al. CD36 mediates the cardiovascular action of growth hormone-releasing peptides in the heart. Circ Res. 2002;90(8). PMID 11988484",
      "Hexarelin treatment in male ghrelin knockout mice after myocardial infarction. Endocrinology. 2013. PMID 23861368",
      "The Growth Hormone Secretagogue Hexarelin Protects Rat Cardiomyocytes From in vivo Ischemia/Reperfusion Injury Through Interleukin-1 Signaling. Int Heart J. 2017. PMID 28321024",
      "One dose of oral hexarelin protects chronic cardiac function after myocardial infarction. Peptides. 2014. PMID 24747279",
      "GH-releasing peptides improve cardiac dysfunction and cachexia and suppress stress-related hormones and cardiomyocyte apoptosis in rats. Am J Physiol Heart Circ Physiol. 2005. PMID 15951341",
      "Roumi M, Marleau S, du Souich P, et al. Kinetics and disposition of hexarelin, a peptidic growth hormone secretagogue, in rats. Drug Metab Dispos. 2000;28(1):44-50. PMID 10611139",
      "PubChem Compound CID 6918297 (Examorelin) — C47H58N12O6, 887.0 g/mol, CAS 140703-51-1. https://pubchem.ncbi.nlm.nih.gov/compound/6918297",
    ],
  },
};
