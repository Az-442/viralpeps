import { ResearchPageContent } from "../src/data/research-content";

const retatrutideContent: ResearchPageContent = {
  slug: "retatrutide-research-summary",
  compoundSlug: "retatrutide",
  pullQuote:
    "Retatrutide doesn't just walk through one door — it kicks open three. GLP-1, GIP, and Glucagon in a single molecule, and the metabolic data is rewriting the playbook.",
  quickInfo: [
    { label: "Peptide Name", value: "Retatrutide (LY3437943)" },
    { label: "CAS Number", value: "2381089-83-2" },
    { label: "Molecular Weight", value: "~4,256 g/mol" },
    { label: "Targets", value: "GLP-1 / GIP / Glucagon Receptors" },
    { label: "Classification", value: "Triple Incretin Receptor Agonist" },
    { label: "Developer", value: "Eli Lilly" },
    { label: "Status", value: "Investigational — Phase 3 (NCT07900026, NCT08061699)" },
    { label: "Half-Life", value: "~6 days (supports once-weekly dosing)" },
    { label: "Primary Research Areas", value: "Obesity, MASLD/MASH, T2D, cardiovascular health" },
  ],
  sections: [
    {
      title: "What Is Retatrutide?",
      body: "Retatrutide (LY3437943) is a first-in-class triple receptor agonist developed by Eli Lilly that simultaneously activates GLP-1, GIP, and glucagon receptors. It's the first incretin-based therapy to target all three signalling pathways in a single engineered peptide — and the clinical data suggests it may reset expectations for what metabolic pharmacology can achieve.\\n\\nWhere dual agonists like tirzepatide unlocked the synergies between GIP and GLP-1, retatrutide adds glucagon receptor agonism into the mix. This third lever targets energy expenditure directly — not just appetite and insulin secretion, but thermogenesis, lipid oxidation, and hepatic fat mobilisation.\\n\\nRetatrutide is currently in Phase 3 clinical development for obesity and metabolic dysfunction-associated steatohepatitis (MASH). Its Phase 2 data produced weight loss figures that exceeded every other incretin therapy ever tested — including tirzepatide, semaglutide, and all earlier dual and single agonists.\\n\\n[**Compare Retatrutide prices from UK suppliers →**](/compounds/retatrutide)",
    },
    {
      title: "How Triple Agonism Works",
      body: "Retatrutide's advantage isn't just that it hits more receptors — it's that each receptor targets a distinct biological lever. Together they produce a coordinated metabolic response that no single-pathway or dual-pathway agonist can replicate.\\n\\nHere's what each receptor brings to the table.",
      subsections: [
        {
          title: "GLP-1 Receptor Agonism — Appetite and Gastric Emptying",
          body: "GLP-1 receptor activation is the familiar workhorse of the incretin class. It slows gastric emptying, suppresses postprandial glucagon secretion, and enhances glucose-dependent insulin release from pancreatic beta-cells. In the brain, GLP-1 receptor signalling in the hypothalamus and brainstem reduces appetite and increases satiety — leading to lower caloric intake.\\n\\nRetatrutide's GLP-1 component is comparable in potency to selective GLP-1 agonists. It provides the foundation of glycaemic control and appetite suppression that the other two receptors build upon.",
        },
        {
          title: "GIP Receptor Agonism — Insulin Amplification and Fat Metabolism",
          body: "GIP (glucose-dependent insulinotropic polypeptide) receptor agonism amplifies the glucose-dependent insulin response beyond what GLP-1 alone can achieve. It enhances glucose uptake in adipose tissue, modulates bone turnover, and may counteract some of the gastrointestinal discomfort associated with GLP-1 activation.\\n\\nCritically, GIP also influences lipid metabolism. GIP receptor activation promotes fat storage in subcutaneous adipose tissue rather than visceral or ectopic depots — a distinction that matters for metabolic health. This 'lipid partitioning' effect is one reason why GIP agonism appears to improve the metabolic profile beyond what glucose control alone would predict.",
        },
        {
          title: "Glucagon Receptor Agonism — Energy Expenditure and Liver Fat",
          body: "This is the third lever that separates retatrutide from every dual agonist on the market. Glucagon receptor activation directly increases energy expenditure through thermogenesis — essentially raising the metabolic set point. It promotes lipolysis in adipose tissue, increases fatty acid oxidation, and mobilises hepatic triglycerides for clearance.\\n\\nIn preclinical models, glucagon agonism drives a significant reduction in liver fat content — and the clinical data from retatrutide's Phase 2 programme confirms this translates to humans. The glucagon component is also associated with increased resting energy expenditure (REE), meaning patients burn more calories at rest than they would with GLP-1 or GIP agonism alone.\\n\\nThis triple approach means retatrutide attacks metabolic disease from three angles simultaneously: reduced intake (GLP-1), improved insulin sensitivity and lipid partitioning (GIP), and increased energy output and liver fat clearance (glucagon).",
        },
      ],
    },
    {
      title: "Clinical Evidence — Phase 2 Results",
      body: "Retatrutide's Phase 2 trial (NCT04881760, published in The Lancet, 2024) produced data that turned heads across the metabolic research community. Here's what the numbers actually show.",
      subsections: [
        {
          title: "Weight Loss — Beyond the Benchmark",
          body: "At 48 weeks, the 12 mg retatrutide dose produced a mean weight loss of 24.2% from baseline — the highest mean weight loss ever reported in a clinical trial for any anti-obesity medication. To put that in perspective: 24.2% is roughly equivalent to 60–70 lbs for a person starting at 285 lbs. At the 8 mg dose, mean weight loss was 22.0%. Even the 4 mg dose produced 18.7% weight loss at 48 weeks.\\n\\nA full 100% of participants receiving 12 mg achieved ≥5% weight loss. 79% achieved ≥15% weight loss. These figures exceed every comparator in the incretin class by a meaningful margin.",
        },
        {
          title: "Comparison Across Incretin Therapies",
          body: "The table below presents mean weight loss and liver fat reduction data across the major incretin-based therapies. Note that trial populations and durations differ — the data is directional, not a head-to-head meta-analysis.",
        },
      ],
      table: {
        header: ["Drug", "Mechanism", "Mean Weight Loss", "Liver Fat Reduction"],
        rows: [
          ["Liraglutide (Saxenda)", "GLP-1 RA", "~8.0% at 56 weeks", "Not consistently reported"],
          ["Semaglutide (Wegovy)", "GLP-1 RA", "~14.9% at 68 weeks", "~31–42% in exploratory analyses"],
          ["Tirzepatide (Zepbound)", "Dual GIP/GLP-1 RA", "~20.9% at 72 weeks", "~42–59% (SYNERGY-NASH)"],
          ["Retatrutide", "Triple GIP/GLP-1/Glucagon RA", "~24.2% at 48 weeks", "~82.4% (Phase 2)"],
        ],
      },
    },
    {
      title: "Liver Fat & MASLD Research",
      body: "One of the most striking findings from retatrutide's Phase 2 programme is the effect on liver fat content. In patients with metabolic dysfunction-associated steatotic liver disease (MASLD), retatrutide produced an 82.4% relative reduction in liver fat at the 12 mg dose, as measured by MRI-PDFF — the gold-standard non-invasive imaging technique.\\n\\nAn extraordinary 93% of patients receiving 12 mg met the ≥30% liver fat reduction threshold that correlates with histologic improvement in MASH. Even at the 8 mg dose, 79.8% hit the ≥30% threshold. These findings were published in Nature Medicine in 2024 by Sanyal et al. and represent the most dramatic liver fat reductions ever reported for a pharmacologic intervention in MASLD.\\n\\nThe mechanism is tied directly to the glucagon receptor agonist component. Glucagon signalling promotes hepatic lipid oxidation, inhibits de novo lipogenesis, and increases clearance of intrahepatic triglycerides. When combined with GIP's favourable lipid-partitioning effects and GLP-1's weight loss contribution, the liver benefits become multiplicative rather than additive.\\n\\nCurrent Phase 3 trials are expected to confirm whether these MRI-PDFF improvements translate to histologic MASH resolution and fibrosis regression — the regulatory endpoints required for MASH approval.\\n\\n[**Research Retatrutide pricing from UK lab suppliers →**](/compounds/retatrutide)",
    },
    {
      title: "Dosing & Administration",
      body: "All information below refers to clinical trial protocols and is provided for research reference only. Retatrutide is not approved by the MHRA, FDA, or EMA for any indication and must not be used outside authorised clinical trials.\\n\\nIn Phase 2 and ongoing Phase 3 trials, retatrutide is administered as a once-weekly subcutaneous injection. The half-life of approximately 6 days supports weekly dosing with stable plasma concentrations between injections.\\n\\nThe Phase 2 protocol used the following titration schedule:\\n\\n**Weeks 1–4:** 2 mg once weekly\\n**Weeks 5–8:** 4 mg once weekly\\n**Weeks 9–12:** 6 mg once weekly (for higher-dose cohorts)\\n**Weeks 13+:** Target dose of 8 mg or 12 mg once weekly\\n\\nThis graduated titration approach is designed to minimise gastrointestinal side effects during the initial exposure period — the same strategy used across the incretin class. Dose escalation is guided by tolerability, not efficacy, with the goal of reaching the assigned target dose.\\n\\nFor research purposes, retatrutide is supplied as a lyophilised powder requiring reconstitution before use. Store lyophilised material at −20°C and reconstituted solution at 2–8°C. Always verify peptide purity and batch details via the Certificate of Analysis supplied with each order.",
    },
    {
      title: "Safety & Tolerability",
      body: "Retatrutide's safety profile in Phase 2 trials is consistent with the incretin class as a whole, with gastrointestinal effects being the most commonly reported adverse events. Nausea, diarrhoea, vomiting, and constipation occurred at rates comparable to tirzepatide and semaglutide during their respective trial programmes.\\n\\nThe key observation from the Phase 2 data is that the addition of glucagon receptor agonism did not introduce unexpected safety signals beyond those already associated with GLP-1 and GIP activation. No cases of severe hypoglycaemia were reported. Glucagon's theoretical risk of increased heart rate was observed — mean heart rate increases of 3–6 bpm were noted, consistent with the known chronotropic effects of glucagon receptor activation. Heart rate stabilised over time and did not lead to treatment discontinuation in the majority of patients.\\n\\nGastrointestinal adverse events were dose-dependent and concentrated in the escalation phase, with tolerability improving markedly once patients reached their target dose. The 12 mg cohort had higher rates of nausea (approximately 40–50%) and vomiting (approximately 20–25%) during the first 8 weeks, declining substantially thereafter.\\n\\nRetatrutide is strictly for laboratory and clinical research use. It must not be self-administered or used outside regulated clinical trial settings.",
    },
  ],
  faq: [
    {
      question: "What makes retatrutide different from tirzepatide and semaglutide?",
      answer: "Retatrutide is the first triple receptor agonist targeting GLP-1, GIP, and glucagon receptors — three pathways instead of two (tirzepatide) or one (semaglutide). The glucagon component directly increases energy expenditure and mobilises liver fat. This additional mechanism is the most likely explanation for retatrutide's superior weight loss (24.2% vs ~20.9% for tirzepatide) and dramatic liver fat reduction (82.4%) in Phase 2 trials.",
    },
    {
      question: "What is retatrutide's CAS number and molecular weight?",
      answer: "The CAS registry number for retatrutide is 2381089-83-2. The molecular weight is approximately 4,256 g/mol. It is a multi-amino-acid peptide engineered for balanced triple receptor activation — distinct from the shorter sequences of single or dual agonists.",
    },
    {
      question: "Is retatrutide approved for human use?",
      answer: "No. Retatrutide is not approved by the MHRA, FDA, or EMA for any indication. It is currently in Phase 3 clinical trials (NCT07900026 for obesity, NCT08061699 for MASH). All data referenced comes from published clinical trial results. It must not be self-administered or used outside regulated clinical research settings.",
    },
    {
      question: "What was the liver fat reduction seen in the Phase 2 MASLD cohort?",
      answer: "The Phase 2 trial reported an 82.4% relative reduction in liver fat at the 12 mg dose as measured by MRI-PDFF (Sanyal et al., Nature Medicine, 2024). 93% of patients at 12 mg achieved the ≥30% liver fat reduction threshold associated with histologic improvement in MASH — the highest proportion ever reported for an incretin-based investigational therapy.",
    },
    {
      question: "What is the dosing schedule used in retatrutide clinical trials?",
      answer: "Retatrutide is administered once weekly via subcutaneous injection, leveraging its ~6-day half-life for stable plasma levels. Clinical trials use a graduated titration schedule: 2 mg (weeks 1–4), 4 mg (weeks 5–8), 6 mg (weeks 9–12 for higher cohorts), then a target maintenance dose of 8 mg or 12 mg once weekly starting at week 13.",
    },
  ],
  references: [
    "Sanyal AJ, et al. Triple-hormone-receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomised phase 2 trial. Nat Med. 2024;30(12):3617-3627. PMID: 39402252",
    "Jastreboff AM, et al. Triple-hormone-receptor agonist retatrutide for obesity — a phase 2 trial. Lancet. 2024;404(10452):724-737. PMID: 39074465",
    "Rosenstock J, et al. Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo-controlled phase 2 trial. Lancet. 2024;404(10452):738-748. PMID: 39074466",
    "Coskun T, et al. LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist, for the treatment of obesity and type 2 diabetes: preclinical and clinical evidence. Mol Metab. 2022;66:101608. PMID: 36228938",
    "Gadde KM, et al. Triple GIP/GLP-1/glucagon receptor agonists as emerging therapies for obesity and metabolic disease. Nat Rev Endocrinol. 2024;20(8):460-475. PMID: 38730050",
    "Tillner J, et al. A new generation of incretin-based therapies: triple agonists and their potential in MASH and metabolic disease. JHEP Rep. 2025;7(2):101241. PMID: 39886733",
  ],
};

export default retatrutideContent;
