import type { ResearchPageContent } from "./research-content-hmg-price";

// appended by Class D queue DAY 10 (2026-11-24, tirzepatide, Lane B) — see class-d-article-queue.md
export const tirzepatideVsMazdutideContent: Record<string, ResearchPageContent> = {
  "tirzepatide-vs-mazdutide": {
    slug: "tirzepatide-vs-mazdutide",
    compoundSlug: "tirzepatide",
    compoundSlug2: "mazdutide",
    pullQuote:
      "SURMOUNT-1 lost 20.9% of body weight at 15 mg over 72 weeks using a treatment-regimen estimand in a population entering at a mean BMI around 38. GLORY-1 lost 14.01% at 6 mg over 48 weeks using a treatment-policy estimand in a population entering at a mean BMI of 31.1. The headline percentage is not the comparison. The trial design is.",
    quickInfo: [
      { label: "Class", value: "Tirzepatide: GIP / GLP-1 dual agonist · Mazdutide: GLP-1 / glucagon dual agonist" },
      { label: "Tirzepatide identity", value: "C225H348N48O68 · 4,813 Da · CID 163285897" },
      { label: "Mazdutide identity", value: "C207H317N45O65 · 4,476 Da · CID 167312357" },
      { label: "Second receptor", value: "GIP (incretin) vs glucagon (counter-regulatory)" },
      { label: "Head-to-head trial", value: "None exists" },
      { label: "Pivotal obesity trials", value: "SURMOUNT-1 (72 weeks) vs GLORY-1 (48 weeks)" },
      { label: "Estimands", value: "SURMOUNT-1: treatment-regimen · GLORY-1: treatment-policy" },
      { label: "Regulatory status", value: "Tirzepatide: UK licensed medicine · Mazdutide: NMPA only" },
    ],
    sections: [
      {
        title: "The Most Obvious Comparison Is Also the Wrong One",
        body:
          "You can put the two numbers side by side in one line, and most pages do. Tirzepatide at its highest dose lost 20.9% of body weight in SURMOUNT-1. Mazdutide at 6 mg lost 14.01% in GLORY-1. Tirzepatide looks stronger by roughly seven percentage points, and that reading is available on a dozen pages without any of them having to make an argument — merely by placing the two figures next to each other under a heading that says comparison.\n\nThe problem is that those two figures come from trials that disagree on almost every design variable that decides what a weight-loss percentage means: duration, entry weight, region, dose ceiling, and treatment estimand. When two trials differ on all five, the gap between their numbers is not a gap between the drugs. It is a gap between two experiments.\n\nThis article compares them on the things that are actually comparable — the receptor pairs, the populations, the endpoints and the designs — and states plainly at each step which compound the evidence favours, on which endpoint, in which population, and why that answer does not generalise. The [tirzepatide compound page](/compounds/tirzepatide) and the [mazdutide compound page](/compounds/mazdutide) carry the listings; this page stays on the evidence. Readers wanting the tirzepatide programme on its own terms should start with the [tirzepatide research summary](/research/tirzepatide-research-summary).",
      },
      {
        title: "Two Different Second Receptors, and Why the Difference Is Not a Ranking",
        body:
          "Tirzepatide is a GIP and GLP-1 receptor dual agonist. Its engineered second target is GIP — glucose-dependent insulinotropic polypeptide, itself an incretin hormone that acts on the same general problem as GLP-1. The receptor pair is, in plain terms, two versions of the same appetite-and-insulin signal. The PubChem record for CID 163285897 gives a formula of C225H348N48O68 and an average mass of 4,813 Da; the same formula and mass are returned for the four other PubChem entries that share the name, which is the reason the identity is reliable and a name alone is not.\n\nMazdutide's second receptor is glucagon, and glucagon is not an incretin. It is the counter-regulatory hormone that opposes insulin, raises hepatic glucose output and raises heart rate. Engaging it deliberately is the whole premise of the glucagon co-agonist class: the theory is that the extra receptor adds energy expenditure, and that pairing it with GLP-1 blunts the glucose cost. Mazdutide, CID 167312357, C207H317N45O65, average mass 4,476 Da, is a stabilised oxyntomodulin analogue — the closest thing in nature to a molecule that engages both receptors.\n\nHere is where the comparison pages stop, and it is the wrong place to stop. All three of the top-ranking comparisons reviewed for this article describe glucagon as adding \"energy expenditure\", which is the hypothesis. What no human head-to-head has shown is that this produces a better *body composition* outcome than adding GIP. A total-weight percentage cannot distinguish between losing fat and losing lean mass, and the one trial that did perform body composition analysis — SURMOUNT-1's DXA substudy — analysed tirzepatide only. There is no equivalent published substudy for mazdutide. So on the mechanism question, the evidence favours neither compound; it simply does not exist in comparable form.",
        table: {
          header: ["Feature", "Tirzepatide", "Mazdutide"],
          rows: [
            ["Receptor pair", "GIP + GLP-1", "GLP-1 + glucagon"],
            ["Molecular origin", "Engineered GIP-based dual agonist", "Stabilised oxyntomodulin analogue"],
            ["PubChem CID", "163285897", "167312357"],
            ["Formula", "C225H348N48O68", "C207H317N45O65"],
            ["Average mass", "4,813 Da", "4,476 Da"],
            ["Sequence published", "No", "No"],
            ["Body-composition substudy", "Yes (SURMOUNT-1 DXA)", "None published"],
            ["UK regulatory status", "Licensed medicine (Mounjaro)", "No UK authorisation"],
          ],
        },
      },
      {
        title: "SURMOUNT-1: What 20.9% Actually Describes",
        body:
          "SURMOUNT-1 (Jastreboff et al., *New England Journal of Medicine*, 2022; PMID 35658024) randomised 2,539 adults with obesity or overweight and no diabetes to 5, 10 or 15 mg tirzepatide or placebo for **72 weeks**. Body weight fell 15.0%, 19.5% and 20.9% against 3.1% on placebo, and 30%, 50% and 57% of participants lost at least 20% of baseline weight against 3% on placebo.\n\nTwo features of that design decide how the number should be read. First, the estimand is **treatment-regimen**: the analysis attributes outcomes according to the treatment a participant was assigned and handles interrupted treatment in a specified, treatment-related way. Second, the enrolment threshold was a BMI of at least 30, or 27 with a comorbidity, and the trial ran across multiple countries with a population that entered substantially heavier than any mazdutide trial.\n\nThe 176-week extension (Jastreboff et al., *NEJM*, 2025; PMID 39536238) followed 1,038 participants with prediabetes for three years plus a 17-week off-treatment period. Weight change at 176 weeks was 12.3%, 18.7% and 19.7% against 1.3% on placebo, and progression to type 2 diabetes was roughly 93% lower on pooled tirzepatide. That is the single strongest durability result in either programme, and it is the one no mazdutide page has an answer to — not because mazdutide failed, but because no equivalent trial has been run.",
      },
      {
        title: "GLORY-1: What 14.01% Actually Describes",
        body:
          "GLORY-1 (Ji et al., *NEJM*, 2025; PMID 40421736) randomised 610 Chinese adults with a BMI of at least 28, or 24 to 28 with a weight-related condition, to mazdutide 4 mg, 6 mg or placebo for **48 weeks**, with coprimary endpoints at week 32. Mean baseline BMI was 31.1. At week 32 weight changed −10.09% and −12.55% against +0.45% on placebo; at week 48, −11.00% and −14.01% against +0.30%. The estimand is **treatment-policy**, which is designed to reflect the effect of offering a treatment including the consequences of stopping it.\n\nThe estimand difference is the part every comparison page omits, and it is not a technicality. A treatment-policy estimate and a treatment-regimen estimate answer different questions about the same drug; you cannot rank one against the other without deciding which question you want answered. Between SURMOUNT-1's treatment-regimen 20.9% and GLORY-1's treatment-policy 14.01% there are at least three confounded differences — estimand, duration (72 vs 48 weeks) and entry BMI — before the compounds themselves are considered.\n\nThe later phase 3 result sharpens this. GLORY-2 (Ji et al., *JAMA*, 2026; PMID 42251595) tested 9 mg over **60 weeks** in 461 Chinese adults with a BMI of at least 30, mean 34.3, 16.1% of whom had type 2 diabetes, and reported −16.65% against −1.50%. It is a bigger number from a sicker, heavier population over a longer duration — which is exactly the pattern you would predict if the trial design, not the molecule, were doing most of the work.",
        table: {
          header: ["", "SURMOUNT-1", "SURMOUNT-CN", "GLORY-1", "GLORY-2"],
          rows: [
            ["Population", "Multinational, no diabetes", "Chinese adults, obesity", "Chinese adults, obesity", "Chinese adults, obesity"],
            ["Entry mean BMI", "~38 (approx.)", "Not stated here", "31.1", "34.3"],
            ["Duration", "72 weeks (176-wk extension)", "52 weeks", "48 weeks (coprimary wk 32)", "60 weeks"],
            ["Dose arms", "5 / 10 / 15 mg", "10 / 15 mg", "4 / 6 mg", "9 mg"],
            ["Weight change", "−15.0 / −19.5 / −20.9%", "−13.6 / −17.5%", "−11.00 / −14.01% (wk48)", "−16.65%"],
            ["Estimand", "Treatment-regimen", "Not stated here", "Treatment-policy", "Not stated here"],
          ],
        },
      },
      {
        title: "The Closest Matched Comparison That Exists",
        body:
          "If you want to compare these two compounds with the least possible trial-design noise, the correct pairing is not SURMOUNT-1 against GLORY-1. It is **SURMOUNT-CN** against **GLORY-1** — the only two trials in either programme run in the same country, in the same population type, with broadly similar durations. SURMOUNT-CN (JAMA, 2024) enrolled 210 Chinese adults with obesity for 52 weeks and reported −13.6% at 10 mg and −17.5% at 15 mg against −2.3% on placebo. GLORY-1 ran 48 weeks and reported −14.01% at its highest dose.\n\nPut those together and the picture changes materially. At comparable durations in comparable populations, the highest-dose mazdutide result and the mid-dose tirzepatide result are in the same range, and tirzepatide's advantage reappears only at 15 mg. This is the comparison almost nobody publishes, because it requires knowing that SURMOUNT-CN exists and that it is the nearest thing to a control for the population variable.\n\nIt still is not a head-to-head. Different sponsors, different enrolment criteria, no randomisation between compounds, and no shared protocol. But it is closer than any pairing the three competitor pages reviewed here made, and it argues that the seven-point gap in the headline numbers is largely an artefact of which trials are being held up.\n\nOn this endpoint, in this population, the evidence favours tirzepatide modestly at the top dose and not at all at mid dose. That is a narrower claim than \"tirzepatide is stronger\", and it is the one the data supports.",
      },
      {
        title: "Where the Two Programmes Genuinely Diverge",
        body:
          "Three differences survive the design-adjustment argument, and a reader should know them.\n\n**Duration and durability.** Tirzepatide has three years of extension data and a diabetes-prevention result that has no counterpart in mazdutide. That is a fact about the maturity of the programme, not about the molecule, but it matters to anyone asking what happens after two years. Mazdutide's longest published randomised result is 60 weeks.\n\n**Geography of the evidence.** Tirzepatide's pivotal data are multinational and include a dedicated Chinese trial. Mazdutide's pivotal data are entirely Chinese, with the sole non-Chinese human evidence coming from a Lilly-authored high-dose phase 1 (n=32) and a 179-participant US phase 2. For UK readers this is a live generalisability question rather than a footnote, and no comparison page states it as one.\n\n**Regulatory position.** Tirzepatide is a licensed medicine in the UK under the Mounjaro brand. Mazdutide holds NMPA approval in China for weight management and glycaemic control and has no FDA or EMA authorisation. Neither fact says anything about the contents of a lyophilised research vial sold in the UK — that vial is a laboratory reagent in both cases. The licence attaches to a manufactured pharmaceutical product with its own excipients, fill and delivery device, and it does not travel with the molecule name.\n\nOn safety, the two programmes look similar in shape: gastrointestinal events dominate and are worst during escalation. GLORY-2 reported vomiting in 53.1%, nausea in 46.9% and diarrhoea in 39.4% of participants. SURMOUNT-1 reported gastrointestinal events that were generally mild to moderate. The mazdutide glucagon arm adds a specific reason to watch pulse and heart rate that has no direct counterpart in the GIP arm, and nothing in the published head-to-head-free literature resolves it.",
      },
      {
        title: "What a Reader Should Take From the Comparison",
        body:
          "The honest summary is endpoint-by-endpoint rather than compound-by-compound.\n\nOn absolute weight loss at the highest tested dose over the longest trial, the evidence favours tirzepatide. On weight loss at comparable durations in matched Chinese populations, the evidence is close to a tie. On durability beyond 60 weeks, only tirzepatide has data. On body composition, neither has comparable data and the single DXA substudy covers tirzepatide alone. On the glucagon-versus-GIP mechanistic question, no human trial answers it, and the energy-expenditure rationale remains a rationale.\n\nWhat this comparison cannot do is produce a winner. The two pivotal trials differ in estimand, duration, population and dose ceiling simultaneously; correcting for one at a time is possible, correcting for all four requires a randomised head-to-head that has never been run and is not currently in either sponsor's published programme.\n\nFor readers moving from trial data to sourcing, the [guide to reading a certificate of analysis](/research/how-to-read-a-coa) explains what a lot document can and cannot tell you about a vial, and the [retatrutide vs tirzepatide comparison](/research/retatrutide-vs-tirzepatide) applies the same estimand discipline to the triple agonist question. Products discussed on this site are research reagents sold for laboratory use only. They are not medicines, are not authorised for human use in the UK, and nothing here is medical advice.",
      },
    ],
    faq: [
      {
        question: "Is there a head-to-head trial of tirzepatide and mazdutide?",
        answer:
          "No. No randomised trial has assigned participants to one compound or the other in a single protocol. Every comparison between them is cross-trial, which means the gap between their published percentages reflects differences in duration, population, dose and estimand as well as any difference between the molecules.",
      },
      {
        question: "Why is the estimand difference important for this comparison?",
        answer:
          "SURMOUNT-1 uses a treatment-regimen estimand and GLORY-1 uses a treatment-policy estimand. They answer different questions about the same drug and cannot be ranked against each other without deciding which question matters. Quoting 20.9% beside 14.01% as though both measured the same thing is the core error in most published comparisons.",
      },
      {
        question: "Which is closer to a fair comparison, SURMOUNT-1 or SURMOUNT-CN?",
        answer:
          "SURMOUNT-CN. It ran in Chinese adults over 52 weeks, which is the closest available match to GLORY-1's 48 weeks in Chinese adults. At comparable durations the mid-dose tirzepatide result and the top-dose mazdutide result fall in a similar range, and tirzepatide's clear advantage appears only at 15 mg.",
      },
      {
        question: "Does tirzepatide have body-composition data that mazdutide lacks?",
        answer:
          "Yes. SURMOUNT-1 included a DXA substudy reporting the proportions of fat and lean mass lost. No equivalent published substudy exists for mazdutide, so claims that glucagon co-agonism preserves lean mass better have no human trial evidence behind them.",
      },
      {
        question: "Is mazdutide approved anywhere?",
        answer:
          "It holds two NMPA approvals in China, for weight management in June 2025 and glycaemic control in September 2025. It has no FDA or EMA authorisation and no UK licence. Tirzepatide is a UK-licensed medicine under the Mounjaro brand. Neither status applies to research vials sold for laboratory use.",
      },
    ],
    references: [
      "Tirzepatide identity verified against PubChem records CID 163285897, 166567236, 168009818, 166639051 and 172915556 (formula C225H348N48O68, average mass 4,813 Da), retrieved 26 November 2026.",
      "Mazdutide identity verified against PubChem compound record CID 167312357 (formula C207H317N45O65, average mass 4,476 Da, CAS synonym 2259884-03-0), retrieved 26 November 2026.",
      "Jastreboff AM, et al. Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1). N Engl J Med. 2022 Jul 21. PMID 35658024.",
      "Tirzepatide for Obesity Treatment and Diabetes Prevention (SURMOUNT-1 three-year extension). N Engl J Med. 2025 Mar 6. PMID 39536238.",
      "Ji L, et al. Once-Weekly Mazdutide in Chinese Adults with Obesity or Overweight (GLORY-1). N Engl J Med. 2025 Jun 12. PMID 40421736.",
      "Treatment With 9-mg Mazdutide for Weight Reduction in Chinese Adults With Obesity: The GLORY-2 Randomized Clinical Trial. JAMA. 2026 Aug 4. PMID 42251595.",
      "Tirzepatide for Weight Reduction in Chinese Adults With Obesity (SURMOUNT-CN). JAMA. 2024. Cited from published trial tabulation; PMID not verified in this pass.",
    ],
  },
};
