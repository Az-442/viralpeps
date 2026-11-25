import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class D queue DAY 11 (2026-11-25, survodutide, Lane B) — see class-d-article-queue.md
export const survodutideVsMazdutideContent: Record<string, ResearchPageContent> = {
  "survodutide-vs-mazdutide": {
    slug: "survodutide-vs-mazdutide",
    compoundSlug: "survodutide",
    compoundSlug2: "mazdutide",
    pullQuote:
      "Survodutide lost 13.0% of body weight over 76 weeks in SYNCHRONIZE-1. Mazdutide lost 14.01% over 48 weeks in GLORY-1. The two percentages describe different populations, different durations and — critically — different ways of handling people who stopped treatment. They are not two measurements of the same thing, and no trial has ever put the two compounds against each other.",
    quickInfo: [
      { label: "Class", value: "Both GLP-1 / glucagon receptor dual agonists" },
      { label: "Survodutide", value: "BI 456906 · Boehringer Ingelheim / Zealand Pharma" },
      { label: "Mazdutide", value: "LY3305677 · IBI362 · Eli Lilly / Innovent" },
      { label: "Survodutide identity", value: "C192H289N47O61 · 4,232 Da · CID 171378821" },
      { label: "Mazdutide identity", value: "C207H317N45O65 · 4,476 Da · CID 167312357" },
      { label: "Head-to-head trial", value: "None exists" },
      { label: "Pivotal obesity trials", value: "SYNCHRONIZE-1 (76 weeks) vs GLORY-1 (48 weeks)" },
      { label: "Regulatory status", value: "Survodutide: investigational everywhere · Mazdutide: NMPA only" },
      { label: "UK listings tracked", value: "6 survodutide · 9 mazdutide" },
    ],
    sections: [
      {
        title: "The Comparison Nobody Has Run",
        body:
          "Start with the thing that makes this page necessary and also limits it: there is no randomised trial in which a participant received survodutide or mazdutide by chance. Every comparison between these two molecules is a comparison of separate placebo-controlled studies run by separate sponsors in largely separate countries. That does not make the comparison worthless. It makes it a comparison of trial designs as much as a comparison of compounds.\n\nThe two agents do share a receptor pair. Both engage the glucagon-like peptide-1 receptor and the glucagon receptor, and both are acylated to bind albumin and support a weekly interval. That shared pharmacology is why they are grouped, and it is also why so much commercial writing about them collapses into a single sentence about \"glucagon's metabolic benefits\". The interesting comparison is not the receptor pair. It is how differently each programme was built, and what a reader is therefore allowed to conclude.\n\nThe [survodutide compound page](/compounds/survodutide) and the [mazdutide compound page](/compounds/mazdutide) carry the listings and per-strength detail; this article stays on the evidence itself, and on the places where the evidence is thinner than the marketing suggests. Readers who want the mechanism treated on its own terms can start with the [survodutide research summary](/research/survodutide-research-summary).",
      },
      {
        title: "Two Origins: An Engineered Ratio Against an Inherited One",
        body:
          "Survodutide is derived from glucagon itself. The PubChem record for CID 171378821 embeds the sequence in its registered name and shows two features worth noticing: the second residue is 1-aminocyclobutanecarboxylic acid — a non-natural amino acid, abbreviated AIB — and a C18 di-acid is attached through a glutamate linker on a lysine side chain. The AIB substitution blocks the DPP-4 cleavage site that would otherwise cut the molecule apart; the di-acid creates the albumin binding that stretches the interval to weekly. The molecule is glucagon with its stability engineered in and its glucagon potency deliberately dialled against its incretin potency.\n\nMazdutide starts somewhere else entirely. It is a modified oxyntomodulin — the 37-residue proglucagon fragment that engages both receptors in nature but survives in plasma for minutes. The recorded identity, CID 167312357, gives a formula of C207H317N45O65 and an average mass of 4,476 Da. Its sequence is not published, and this site has already explained at length why a neat residue string for a lipidated, non-standard-residue peptide should be treated with suspicion rather than gratitude.\n\nThat difference in origin has a practical consequence for anyone comparing them at the bench or reading their dossiers. Survodutide's receptor balance was a design target — the sequence was optimised toward a chosen potency ratio. Mazdutide's balance was inherited from a natural template and then stabilised. One is a designed molecule; the other is a preserved one. Neither is better by virtue of that fact, but a structure–activity programme that treats them as interchangeable is testing one hypothesis twice.",
        table: {
          header: ["Feature", "Survodutide", "Mazdutide"],
          rows: [
            ["Origin", "Glucagon-derived, AIB2 substitution", "Stabilised oxyntomodulin analogue"],
            ["PubChem CID", "171378821", "167312357"],
            ["Formula", "C192H289N47O61", "C207H317N45O65"],
            ["Average mass", "4,232 Da", "4,476 Da"],
            ["CAS synonym", "2805997-46-8", "2259884-03-0"],
            ["Sequence published", "Yes (embedded in registry name)", "No"],
            ["Receptor balance", "Engineered / selected", "Inherited from natural template"],
          ],
        },
      },
      {
        title: "Where the Appetite Effect Actually Happens",
        body:
          "Every comparison page reviewed for this article explains the appetite effect the same way: GLP-1 slows gastric emptying and signals satiety; glucagon adds energy expenditure; the two balance out on glycaemia. That account is not wrong, but it is a description of the hypothesis, not of the evidence, and no page in the top three cites the most mechanistically interesting survodutide paper of 2026.\n\nThat paper, published in *Molecular Metabolism* in March 2026, reports that survodutide acts through the circumventricular organs of the brain and activates neuronal regions associated with appetite regulation. The circumventricular organs are the small set of brain structures that sit outside the blood–brain barrier, which is precisely why a large lipidated peptide can reach them at all. The result moves part of the appetite story out of the gut and into the brain, and it gives a testable reason why an acylated dual agonist might suppress intake more than its plasma half-life would suggest.\n\nWhy this matters for a comparison: the same question — does the molecule reach central appetite circuitry — has not been asked in published form for mazdutide. The absence of an equivalent paper is not evidence that mazdutide does not reach the same structures. It means the two compounds do not have the same depth of mechanistic characterisation, and a reader who assumes symmetry because the receptor pair is shared is assuming more than the literature supports. The honest summary is that survodutide's mechanism has been probed in a 2026 imaging-and-neuroanatomy context and mazdutide's has not.",
      },
      {
        title: "The Trial Programmes, Side by Side",
        body:
          "The pivotal obesity trials differ on almost every design variable, and the numbers only make sense if those variables are kept attached.\n\n**SYNCHRONIZE-1** (published in the *New England Journal of Medicine*, August 2026) enrolled adults with obesity and no diabetes across multiple countries and ran for **76 weeks**. Under the treatment-regimen estimand, body weight fell a mean 12.2% at 3.6 mg and 13.0% at 6.0 mg, against 5.4% on placebo. This is the closest analogue to survodutide's own phase 2 obesity trial, which used a different design entirely: a 46-week dose-finding study with arms at 0.6, 2.4, 3.6 and 4.8 mg.\n\n**SYNCHRONIZE-2** (also *NEJM*, October 2026) enrolled adults with obesity and type 2 diabetes, ran the same 76 weeks, and reported 8.2% at 3.6 mg and 9.8% at 6.0 mg against 3.9% on placebo. The smaller percentages are not a weaker drug — they are what glucose-lowering co-medication and a diabetic population do to weight outcomes, and reading SYNCHRONIZE-2 against SYNCHRONIZE-1 as a dose-response would be a category error.\n\n**GLORY-1** (*NEJM*, June 2025) enrolled 610 Chinese adults with a BMI of at least 28, or 24 to 28 with a weight-related condition, mean baseline BMI 31.1, and ran **48 weeks** at 4 mg and 6 mg. At the week-32 coprimary endpoint weight changed −10.09% and −12.55% against a 0.45% gain on placebo; at week 48, −11.00% and −14.01% against a 0.30% gain. The estimand is **treatment-policy**.\n\nThe estimand difference is the part almost every comparison skips. A treatment-regimen estimand attributes an outcome according to the treatment a participant was assigned and continues to count them in a defined way regardless of interruption; a treatment-policy estimand is designed to reflect the effect of offering the treatment, including the consequences of stopping it. The two answer different questions. Putting SYNCHRONIZE-1's 13.0% next to GLORY-1's 14.01% as though the gap means something is comparing a 76-week treatment-regimen figure in a multinational population to a 48-week treatment-policy figure in a Chinese population. The difference between the numbers is smaller than the difference between the designs.\n\nOne further trial deserves naming because it is routinely misused. **DREAMS-3** compares mazdutide 6 mg against semaglutide 1 mg — but the publication that exists is a design and rationale paper. It contains no efficacy result. Any page presenting DREAMS-3 as proof that mazdutide outperforms semaglutide has read a protocol as a finding.",
        table: {
          header: ["", "SYNCHRONIZE-1", "SYNCHRONIZE-2", "GLORY-1"],
          rows: [
            ["Population", "Obesity, no diabetes", "Obesity + type 2 diabetes", "Chinese adults, BMI ≥28"],
            ["Duration", "76 weeks", "76 weeks", "48 weeks (primary at 32)"],
            ["Arms", "3.6 / 6.0 mg vs placebo", "3.6 / 6.0 mg vs placebo", "4 / 6 mg vs placebo"],
            ["Weight change", "−12.2% / −13.0% vs −5.4%", "−8.2% / −9.8% vs −3.9%", "−11.00% / −14.01% vs +0.30%"],
            ["Estimand", "Treatment-regimen", "Treatment-regimen", "Treatment-policy"],
          ],
        },
      },
      {
        title: "The Liver Question, Stated Honestly",
        body:
          "Survodutide's liver programme is the strongest differentiator in its record, and it is the reason the compound is discussed in hepatology as well as obesity. The phase 2 MASH trial reported that up to 62% of survodutide participants achieved MASH improvement without worsening fibrosis over 48 weeks, against 14% on placebo — a biopsy-based histologic endpoint, not a surrogate. A 2026 mediation analysis in *Hepatology* went further and separated the weight-reduction-dependent effects on liver endpoints from the weight-independent ones, which is the question that actually determines whether a dual agonist is doing something a GLP-1-only drug cannot.\n\n**SYNCHRONIZE-MASLD** (*Nature Medicine*, August 2026) then enrolled adults with obesity and at-risk metabolic dysfunction-associated steatotic liver disease over 48 weeks, with co-primary outcomes on MRI-measured liver fat and body weight. That is a different and earlier endpoint than the biopsy-based MASH trial, and the two are routinely conflated. An MRI liver-fat endpoint is not MASH resolution. A reader who has seen a headline about \"62% MASH improvement\" and then reads about SYNCHRONIZE-MASLD should be clear that these are two studies answering two different questions.\n\nMazdutide also has a liver line, but it is less advanced and it does not appear on any of the comparison pages reviewed. The asymmetry is real: survodutide's glucagon arm was designed with hepatic substrate handling in mind, and its clinical programme carries a biopsy endpoint to show for it. Mazdutide's published liver-facing evidence sits several steps behind. Anyone arguing mazdutide is the equal of survodutide on liver endpoints is arguing from mechanism, not from a trial.",
      },
      {
        title: "Regulatory Status and Tolerability Do Not Line Up",
        body:
          "The apparent paradox of this pair is that the compound with the deeper liver programme is the one that has not been approved anywhere, and the compound with two national approvals is the one with the narrower liver record.\n\nSurvodutide remains investigational in every jurisdiction. With the SYNCHRONIZE programme reported through 2026 — obesity, obesity with diabetes, MASLD, and the cardiovascular outcomes trial reported in *The Lancet* in November 2026 — the regulatory file is now substantial, but substantial is not approved.\n\nMazdutide holds two Chinese approvals: weight management in June 2025, and glycaemic control in adults with type 2 diabetes in September 2025. Neither is an FDA or EMA authorisation. The distinction matters for a laboratory buyer for a plain reason: the fact that a branded pharmaceutical product is approved in one country does not make the lyophilised research vials sold in the UK the same article, and it never has.\n\nTolerability is where the trials diverge most sharply and where the comparison is most often mangled. In SYNCHRONIZE-1, gastrointestinal adverse events occurred in 81% to 90% of survodutide recipients against 48% on placebo. In GLORY-1, discontinuation for adverse events was 1.5% at 4 mg and 0.5% at 6 mg against 1.0% on placebo — low, and not dose-ordered. Those two statements are not in conflict and they are not directly comparable either: one is an event rate, the other a discontinuation rate, in different populations over different durations. The correct reading is that both compounds are gastrointestinal in their tolerability profile, that survodutide's titration is slower by design because of it, and that no published data supports a ranking of the two on tolerability.",
      },
      {
        title: "What the Evidence Favours, and On What",
        body:
          "There is no winner here, and any page that produces one has invented it. What the evidence does support is narrower and more useful.\n\n**On obesity, without diabetes, at 6 mg:** the two are close enough that the difference is design, not drug. Survodutide's 13.0% at 76 weeks and mazdutide's 14.01% at 48 weeks sit inside each other's uncertainty when different populations and estimands are accounted for. Neither can be preferred on weight loss alone.\n\n**On liver endpoints:** the evidence favours survodutide, unambiguously, in a biopsy-based MASH population, and no equivalent mazdutide trial exists to compare against.\n\n**On human validation in a specific population:** the evidence favours mazdutide for Chinese adults, where five phase 3 trials and two approvals sit behind it, and survodutide for a multinational obesity population over a longer follow-up.\n\n**On mechanistic characterisation:** survodutide, on the strength of the 2026 circumventricular-organ work. Mazdutide's characterisation is dominated by clinical papers.\n\nThe limitation that overrides all four is the absence of a head-to-head trial. Four separate placebo-controlled studies, one active-comparator design paper with no result, and two different estimands cannot substitute for randomisation between the compounds. That is the ceiling on this comparison and it is not going to move this year.",
      },
      {
        title: "What to Verify Before Buying Either as a Reagent",
        body:
          "ViralPeps does not sell peptides and does not issue certificates of analysis. It compares listings. That said, two identity facts are worth holding onto because the UK catalogue gets them wrong.\n\nSurvodutide's CAS is **2805997-46-8** and its average mass is 4,232 Da. A listing that carries a different CAS has not checked the record. This site's own mazdutide entry has historically repeated a CAS — 2382627-17-8 — that returns no PubChem record at all, which is exactly the failure mode a buyer should be scanning for on any catalogue page.\n\nA lot certificate for either compound should show an HPLC chromatogram with a purity figure traceable to it, a mass-spectrometry result consistent with the expected mass, and a lot number identical to the one on the vial. For both molecules the impurities worth watching are late-eluting acylation side products and des-acyl material — the right sequence without the fatty acid chain that governs how long it persists. The [guide to reading a certificate of analysis](/research/how-to-read-a-coa) sets out the rest of the fields.\n\nHandling differs from ordinary peptides in one respect that catches people out. Both are amphipathic with a hydrophobic tail and at low aqueous concentration behave close to a detergent, sticking to glass and polypropylene. A stock preparation validated for one compound is not automatically valid for the other. The [peptide reconstitution guide](/research/peptide-reconstitution-guide) covers technique; the [survodutide price comparison](/compounds/survodutide) lists current UK strengths and prices, and the [retatrutide vs survodutide comparison](/research/retatrutide-vs-survodutide) is the relevant next read if the question is what a third receptor arm adds.",
      },
    ],
    faq: [
      {
        question: "Has survodutide been compared directly with mazdutide in a trial?",
        answer:
          "No. There is no randomised head-to-head trial. Every comparison is between separate placebo-controlled studies run by different sponsors in different populations, which is why weight-loss percentages from SYNCHRONIZE-1 and GLORY-1 cannot simply be subtracted from each other.",
      },
      {
        question: "Why did survodutide lose less weight than mazdutide in the pivotal trials?",
        answer:
          "It did not, on a like-for-like basis. SYNCHRONIZE-1 reported 13.0% at 6.0 mg over 76 weeks under a treatment-regimen estimand in a multinational obesity population without diabetes. GLORY-1 reported 14.01% at 6 mg over 48 weeks under a treatment-policy estimand in Chinese adults. Different duration, population and estimand means the gap is a design difference, not a drug difference.",
      },
      {
        question: "Which compound has better liver evidence?",
        answer:
          "Survodutide. Its phase 2 MASH trial reported up to 62% achieving MASH improvement without worsening fibrosis against 14% on placebo, a biopsy-based endpoint. Mazdutide's liver programme is less advanced and no equivalent biopsy-endpoint result has been published. SYNCHRONIZE-MASLD used an MRI liver-fat endpoint, which is a different and earlier measure.",
      },
      {
        question: "Are the molecular weights of these compounds different?",
        answer:
          "Yes. PubChem record CID 171378821 gives survodutide a formula of C192H289N47O61 and an average mass of 4,232 Da. CID 167312357 gives mazdutide C207H317N45O65 and 4,476 Da. Mazdutide's sequence is not published; survodutide's is embedded in its registry name.",
      },
      {
        question: "Is either compound approved for human use?",
        answer:
          "Survodutide is investigational everywhere. Mazdutide holds two Chinese NMPA approvals, for weight management in June 2025 and glycaemic control in September 2025, and has no FDA or EMA authorisation. Research vials sold in the UK are laboratory reagents in either case, not medicines.",
      },
    ],
    references: [
      "Survodutide identity verified against PubChem compound record CID 171378821 (formula C192H289N47O61, average mass 4,232 Da, CAS synonym 2805997-46-8), retrieved 25 November 2026.",
      "Mazdutide identity verified against PubChem compound record CID 167312357 (formula C207H317N45O65, average mass 4,476 Da, CAS synonym 2259884-03-0), retrieved 25 November 2026.",
      "le Roux CW, et al. Survodutide once weekly for the treatment of adults with obesity (SYNCHRONIZE-1). N Engl J Med. 2026; published online 7 June 2026. PMID 42253238.",
      "Survodutide once weekly in adults with obesity and type 2 diabetes (SYNCHRONIZE-2). N Engl J Med. 2026 Oct 1. PMID 42820639.",
      "Survodutide in adults with obesity and metabolic dysfunction-associated steatotic liver disease: SYNCHRONIZE-MASLD, a randomised, double-blind trial. Nat Med. 2026 Aug. PMID 42252333.",
      "Cardiovascular outcomes with survodutide in adults with obesity at increased cardiovascular risk (SYNCHRONIZE-CVOT). Lancet. 2026 Nov 9. PMID 43003106.",
      "Survodutide acts through circumventricular organs in the brain and activates neuronal regions associated with appetite regulation. Mol Metab. 2026 Mar. PMID 41638399.",
      "Weight reduction-dependent and -independent effects of survodutide on liver endpoints: mediation analysis of a phase 2 trial in MASH. Hepatology. 2026 Aug 3. PMID 42545725.",
      "le Roux CW, et al. Glucagon and GLP-1 receptor dual agonist survodutide for obesity: a randomised, double-blind, placebo-controlled, dose-finding phase 2 trial. Lancet Diabetes Endocrinol. 2024 Mar. PMID 38330987.",
      "Ji L, et al. Once-weekly mazdutide in Chinese adults with obesity or overweight (GLORY-1). N Engl J Med. 2025 Jun 12. PMID 40421736.",
      "Mazdutide versus dulaglutide in Chinese adults with type 2 diabetes (DREAMS-2). Nature. 2026 Apr. PMID 41407860.",
      "A phase 1b randomised controlled trial of a glucagon-like peptide-1 and glucagon receptor dual agonist IBI362 (LY3305677) in Chinese patients. Nat Commun. 2022 Jun 24. PMID 35750681.",
    ],
  },
};
