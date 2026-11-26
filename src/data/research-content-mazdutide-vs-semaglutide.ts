import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class D queue DAY 12 (2026-11-26, mazdutide, Lane B) — see class-d-article-queue.md
export const mazdutideVsSemaglutideContent: Record<string, ResearchPageContent> = {
  "mazdutide-vs-semaglutide": {
    slug: "mazdutide-vs-semaglutide",
    compoundSlug: "mazdutide",
    compoundSlug2: "semaglutide",
    pullQuote:
      "The trial that would settle mazdutide against semaglutide is called DREAMS-3. It randomised 349 people, it compares 6 mg mazdutide with 1 mg semaglutide, and the only publication that exists is a rationale-and-design paper with baseline data. It contains no efficacy result. Every page that presents DREAMS-3 as evidence of a winner has read a protocol as a finding.",
    quickInfo: [
      { label: "Class", value: "Mazdutide: GLP-1 / glucagon dual agonist · Semaglutide: GLP-1 monoagonist" },
      { label: "Mazdutide identity", value: "C207H317N45O65 · 4,476 Da · CID 167312357" },
      { label: "Semaglutide identity", value: "C187H291N45O59 · 4,114 Da free peptide · CID 56843331" },
      { label: "Head-to-head trial", value: "DREAMS-3 — design paper only, no results published" },
      { label: "Dose in DREAMS-3", value: "Mazdutide 6 mg vs semaglutide 1 mg (not the 2.4 mg obesity dose)" },
      { label: "Pivotal obesity trials", value: "GLORY-1 (48 weeks, China) vs STEP 1 (68 weeks, multinational)" },
      { label: "Entry BMI", value: "GLORY-1 31.1 · STEP 1 ~37.9" },
      { label: "Regulatory status", value: "Semaglutide: UK licensed · Mazdutide: NMPA only" },
    ],
    sections: [
      {
        title: "There Is a Head-to-Head Trial, and There Is No Result",
        body:
          "This comparison is unusual among the incretin pairings because a direct randomised trial exists on paper. DREAMS-3 randomised 349 participants to mazdutide 6 mg or semaglutide 1 mg over 32 weeks. That is a genuine head-to-head, run by people who designed it to answer exactly the question a comparison article is meant to address.\n\nThe complication is that the only publication available for DREAMS-3 is its rationale, design and baseline paper (Contemporary Clinical Trials, 2026; PMID 41260459). It reports the protocol, the randomisation and the characteristics of the people enrolled. It does not report efficacy. There is, as of November 2026, no published DREAMS-3 result to read.\n\nThat single fact governs everything below. Any page that puts a mazdutide-versus-semaglutide number in front of you is either quoting STEP 1 alongside GLORY-1 — two separate placebo-controlled trials — or it is presenting the DREAMS-3 design as though the design were the outcome. This article does the first of those things explicitly, labels it as cross-trial, and refuses the second.\n\nFor the compound listings, see the [mazdutide compound page](/compounds/mazdutide); for semaglutide's own evidence base on this site, the [semaglutide vs tirzepatide comparison](/research/semaglutide-vs-tirzepatide) covers the pairing that has far more data behind it.",
      },
      {
        title: "A Dual Agonist Against a Monoagonist: What the Extra Receptor Buys",
        body:
          "Semaglutide is a GLP-1 receptor agonist and nothing else. Its entire pharmacology runs through one receptor: slowed gastric emptying, reduced appetite signalling, glucose-dependent insulin release. That single-target design is why it is the reference compound against which everything in this class gets measured — the mechanism is clean and the clinical programme is enormous.\n\nMazdutide adds glucagon receptor agonism to the same GLP-1 signal. The PubChem record for CID 167312357 gives C207H317N45O65 and an average mass of 4,476 Da. Semaglutide, CID 56843331, is C187H291N45O59 at 4,114 Da — and that figure is the free peptide, not the salt form sold in licensed products, which is a distinction that matters if anyone tries to use mass as an identity argument. The two molecules are close enough in mass that a mass-band check cannot separate them; the sequence and the lipid chain are what actually identify either one.\n\nThe glucagon arm is the entire thesis. Glucagon raises energy expenditure and promotes hepatic lipid handling, so co-agonism is hypothesised to add weight loss beyond what appetite suppression alone produces, with GLP-1 acting to blunt the hyperglycaemic cost. It is a good hypothesis. What it is not is a demonstrated advantage over semaglutide in any human trial, because the trial designed to test it has not reported. The mechanism comparison therefore favours mazdutide on theoretical grounds only — which is a weaker form of \"favours\" than the word usually implies.",
        table: {
          header: ["Feature", "Mazdutide", "Semaglutide"],
          rows: [
            ["Receptor activity", "GLP-1 + glucagon", "GLP-1 only"],
            ["Molecular origin", "Stabilised oxyntomodulin analogue", "GLP-1 backbone analogue, acylated"],
            ["PubChem CID", "167312357", "56843331"],
            ["Formula", "C207H317N45O65", "C187H291N45O59"],
            ["Average mass", "4,476 Da", "4,114 Da (free peptide)"],
            ["Weekly dosing", "Yes", "Yes (2.4 mg obesity dose)"],
            ["UK licence", "None", "Yes, multiple formulations"],
            ["Body-composition substudy", "None published", "Yes (STEP 1 DXA substudy)"],
          ],
        },
      },
      {
        title: "STEP 1 Sets the Benchmark the Comparison Is Measured Against",
        body:
          "STEP 1 (Wilding et al., *New England Journal of Medicine*, 2021; PMID 33567185) randomised 1,961 adults with a BMI of at least 30, or 27 with a comorbidity, and no diabetes, to semaglutide 2.4 mg weekly or placebo for **68 weeks**. Weight fell 14.9% against 2.4% on placebo.\n\nThree design details matter more than the headline. The population was multinational and entered at a mean BMI around 37.9, meaning participants were substantially heavier at baseline than in GLORY-1. The duration was 68 weeks. And the trial has an extension worth knowing about: one year after withdrawal, participants had regained roughly two-thirds of the weight they lost (Wilding et al., *Diabetes, Obesity and Metabolism*, 2022; PMID 35441470).\n\nThe extension is the part of the semaglutide evidence base that mazdutide has no counterpart for. Whatever advantage or disadvantage the glucagon arm confers during treatment, nobody has published what happens to mazdutide-treated participants after stopping. For a reader thinking about durability rather than peak effect, that is the single largest hole in the mazdutide evidence and it is invisible on every comparison page reviewed for this article.",
      },
      {
        title: "GLORY-1 and GLORY-2: The Mazdutide Side of the Ledger",
        body:
          "GLORY-1 (Ji et al., *NEJM*, 2025; PMID 40421736) randomised 610 Chinese adults with a BMI of at least 28, or 24 to 28 with a weight-related condition, to mazdutide 4 mg, 6 mg or placebo for **48 weeks**, coprimary at week 32. Mean entry BMI was 31.1. Week 32 produced −10.09% and −12.55% against +0.45%; week 48 produced −11.00% and −14.01% against +0.30%. The estimand is treatment-policy.\n\nGLORY-2 (Ji et al., *JAMA*, 2026; PMID 42251595) pushed to a higher dose over a longer period: 461 Chinese adults with a BMI of at least 30, mean 34.3, 16.1% with type 2 diabetes, 60 weeks at 9 mg. Weight fell 16.65% against 1.50%. Gastrointestinal burden was substantial and quantified in a way GLORY-1's summary is not — vomiting 53.1%, nausea 46.9%, diarrhoea 39.4%.\n\nPlace those against STEP 1 and the problem is arithmetic rather than editorial. GLORY-1's 14.01% at 48 weeks in a population entering at BMI 31.1 and STEP 1's 14.9% at 68 weeks in a population entering at approximately 37.9 are, on their face, similar numbers — but they were produced under conditions that push in opposite directions on duration and on entry weight. A heavier starting population loses a larger *percentage* on the same absolute kilograms. A longer trial gives more time to lose. STEP 1 had both advantages and ended one percentage point ahead. That is not a finding of equivalence, and it is not a finding of inferiority either. It is two experiments whose differences happen to cancel visually.",
        table: {
          header: ["", "STEP 1", "GLORY-1", "GLORY-2"],
          rows: [
            ["Population", "Multinational, no diabetes", "Chinese adults, obesity/overweight", "Chinese adults, obesity"],
            ["Entry mean BMI", "~37.9", "31.1", "34.3"],
            ["Duration", "68 weeks", "48 weeks (coprimary wk 32)", "60 weeks"],
            ["Doses", "2.4 mg", "4 / 6 mg", "9 mg"],
            ["Weight change vs placebo", "−14.9% vs −2.4%", "−11.00 / −14.01% vs +0.30%", "−16.65% vs −1.50%"],
            ["Estimand", "Treatment-policy", "Treatment-policy", "Not stated here"],
            ["Withdrawal data", "Yes (STEP 1 extension)", "None published", "None published"],
          ],
        },
      },
      {
        title: "Why DREAMS-3 Will Not Settle It Even When It Reports",
        body:
          "The obvious answer to the cross-trial problem is to wait for DREAMS-3. When its efficacy results publish, the comparison will finally have randomised evidence. But two features of the design mean the result will answer a narrower question than it appears to.\n\nThe first is the comparator dose. DREAMS-3 uses semaglutide **1 mg**, which is the dose used for glycaemic control in type 2 diabetes. The dose studied for obesity is 2.4 mg, and used in STEP 1. A trial of mazdutide 6 mg against semaglutide 1 mg tests mazdutide against a sub-maximal semaglutide arm, and a mazdutide win in that design would not establish superiority at equal or maximal doses. A loss would be more informative, but that asymmetry in what a result can and cannot mean is worth stating before the numbers arrive rather than after.\n\nThe second is duration and population. DREAMS-3 runs 32 weeks in the DREAMS programme, which is a type 2 diabetes-focused series — DREAMS-1 was mazdutide against placebo, DREAMS-2 against dulaglutide. A 32-week diabetes trial does not measure the same thing as a 68-week obesity trial, and the semaglutide obesity evidence is overwhelmingly the latter. Whether DREAMS-3 will be read correctly when it reports depends entirely on whether the people reporting it attach the dose and the duration to the number.\n\nThis is the same discipline that applies to the [survodutide vs mazdutide comparison](/research/survodutide-vs-mazdutide), where two glucagon dual agonists are routinely ranked against each other on figures from trials with different estimands. The pattern across the whole class is that the headline percentage is quoted and the design that produced it is dropped.",
      },
      {
        title: "Where the Evidence Genuinely Favours One of Them",
        body:
          "Stripping out what cannot be concluded leaves a short list of things that can.\n\n**On duration of evidence, semaglutide.** STEP 1 runs 68 weeks with a withdrawal extension; GLORY-1 runs 48 weeks and GLORY-2 runs 60 weeks with no withdrawal data. Semaglutide has three years of obesity data across its programme and mazdutide has none of comparable length.\n\n**On licence and access, semaglutide, decisively.** Semaglutide is licensed in the UK as a medicine in multiple formulations. Mazdutide holds NMPA approval in China for weight management and glycaemic control and nothing in the UK, EU or US. This is the widest gap in the comparison and it is not a pharmacological one.\n\n**On glycaemic endpoints in a Chinese T2D population, mazdutide has real data.** DREAMS-1 and DREAMS-2 provide published randomised results in a population distinct from semaglutide's pivotal diabetes trials. That is a genuine strength, not a substitute for the obesity comparison, and it is consistently undersold by comparison pages that only quote weight percentages.\n\n**On total weight loss at 60 weeks, the evidence favours mazdutide but weakly.** GLORY-2's 16.65% at 9 mg over 60 weeks in a population entering at BMI 34.3 is the strongest mazdutide obesity number published. It has no semaglutide arm, and STEP 1's population was heavier, so it cannot be set against 14.9% directly. Calling it a mazdutide advantage would be exactly the error this article exists to avoid.\n\n**On body composition, nobody wins.** Both compounds have DXA data of some kind, but they are not comparable designs and neither programme has published a head-to-head composition endpoint.\n\nNothing here is dosing guidance. These are research compounds with no human use authorisation in the UK; products discussed on this site are laboratory reagents sold for research only and are not medicines. The [peptide reconstitution guide](/research/peptide-reconstitution-guide) covers handling for laboratory work.",
      },
    ],
    faq: [
      {
        question: "Has mazdutide been compared with semaglutide in a clinical trial?",
        answer:
          "Yes, in DREAMS-3, which randomised 349 participants to mazdutide 6 mg or semaglutide 1 mg for 32 weeks. But only the rationale, design and baseline paper has been published (PMID 41260459). No efficacy result exists as of November 2026, so no randomised comparison can currently be quoted.",
      },
      {
        question: "Why does the semaglutide dose in DREAMS-3 matter?",
        answer:
          "DREAMS-3 uses semaglutide 1 mg, the dose studied for glycaemic control in type 2 diabetes. The dose studied for obesity, and used in STEP 1, is 2.4 mg. A mazdutide win against 1 mg semaglutide would not establish superiority at the obesity dose.",
      },
      {
        question: "Can GLORY-1's 14.01% be compared with STEP 1's 14.9%?",
        answer:
          "Not as a like-for-like figure. STEP 1 ran 68 weeks in a multinational population entering at a mean BMI around 37.9; GLORY-1 ran 48 weeks in Chinese adults entering at BMI 31.1. Duration and starting weight both push the percentage in different directions, and the two effect sizes are similar only in appearance.",
      },
      {
        question: "What happens to weight after stopping mazdutide?",
        answer:
          "Nothing has been published. The semaglutide side has the STEP 1 extension, in which participants regained roughly two-thirds of their lost weight within a year of withdrawing. There is no equivalent withdrawal study for mazdutide, which is the largest gap in its evidence base.",
      },
      {
        question: "Is mazdutide available in the UK as a medicine?",
        answer:
          "No. It holds NMPA approval in China for weight management and glycaemic control and has no UK, EU or US authorisation. Semaglutide is a UK-licensed medicine under the Ozempic, Wegovy and Rybelsus brands. Research vials sold in the UK are laboratory reagents in either case.",
      },
    ],
    references: [
      "Mazdutide identity verified against PubChem compound record CID 167312357 (formula C207H317N45O65, average mass 4,476 Da, CAS synonym 2259884-03-0), retrieved 26 November 2026.",
      "Semaglutide identity verified against PubChem compound record CID 56843331 (formula C187H291N45O59, average mass 4,114 Da for the free peptide), retrieved 26 November 2026.",
      "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021 Mar 18. PMID 33567185.",
      "Wilding JPH, et al. Weight regain and cardiometabolic effects after withdrawal of semaglutide: the STEP 1 trial extension. Diabetes Obes Metab. 2022 Aug. PMID 35441470.",
      "Ji L, et al. Once-Weekly Mazdutide in Chinese Adults with Obesity or Overweight (GLORY-1). N Engl J Med. 2025 Jun 12. PMID 40421736.",
      "Treatment With 9-mg Mazdutide for Weight Reduction in Chinese Adults With Obesity: The GLORY-2 Randomized Clinical Trial. JAMA. 2026 Aug 4. PMID 42251595.",
      "Mazdutide versus Semaglutide for the treatment of type 2 diabetes and obesity: rationale, design and baseline data of the DREAMS-3 phase 3 trial. Contemp Clin Trials. 2026 Jan. PMID 41260459. Design paper only — no efficacy results.",
      "Mazdutide versus dulaglutide in Chinese adults with type 2 diabetes (DREAMS-2). Nature. 2026 Apr. PMID 41407860.",
    ],
  },
};
