export interface ResearchPageContent {
  slug: string;
  sections: ResearchSection[];
  references?: string[];
}

export interface ResearchSection {
  title: string;
  body: string;
  subsections?: { title: string; body: string }[];
}

const content: Record<string, ResearchPageContent> = {
  "bpc157-research-summary": {
    slug: "bpc157-research-summary",
    sections: [
      {
        title: "What Is BPC-157?",
        body: "BPC-157 (Body Protection Compound 157) is a 15-amino-acid synthetic peptide derived from a protective protein naturally found in human gastric juice. It is studied primarily for its ability to promote tissue repair, modulate inflammation, and support angiogenesis — the formation of new blood vessels. Unlike single-pathway compounds, BPC-157 appears to act across multiple biological systems involved in healing, making it one of the most widely discussed peptides in regenerative research.",
      },
      {
        title: "Mechanism of Action",
        body: "BPC-157 exerts its effects through several coordinated pathways rather than a single receptor target. Understanding these mechanisms is essential for interpreting the preclinical research.",
        subsections: [
          {
            title: "Angiogenesis via HIF-1α and VEGF",
            body: "Injury creates local hypoxia (low oxygen), which activates hypoxia-inducible factor 1-alpha (HIF-1α). BPC-157 is shown in animal models to upregulate this signalling axis, leading to increased vascular endothelial growth factor (VEGF) expression. The result is organised, functional angiogenesis — new blood vessel formation that delivers oxygen and nutrients to damaged tissue while removing metabolic waste. This is distinct from chaotic vessel growth seen in pathological conditions."
          },
          {
            title: "Fibroblast Activation and Collagen Remodelling",
            body: "BPC-157 amplifies transforming growth factor beta-1 (TGF-β1) signalling, which recruits and activates fibroblasts at the injury site. Activated fibroblasts produce Type I and Type III collagen, fibronectin, and elastin — the structural proteins required for organised tissue repair. Studies suggest BPC-157 promotes stronger, better-organised collagen architecture rather than disorganised scar tissue."
          },
          {
            title: "Nitric Oxide Pathway Modulation",
            body: "BPC-157 enhances endothelial nitric oxide synthase (eNOS) activity, increasing nitric oxide (NO) production. NO relaxes vascular smooth muscle via the cGMP pathway, improving local blood flow (perfusion) to injured tissues. This mechanism is particularly relevant in ischaemic and hypoxic injury models."
          },
          {
            title: "CNS Penetration and Neuroprotection",
            body: "BPC-157 has been shown to cross the blood-brain barrier and increase growth hormone receptor (GHR) sensitivity in the central nervous system. Preclinical evidence indicates it supports neurite outgrowth, synaptogenesis, and protection against excitotoxic injury, suggesting a role in neurological repair research."
          },
          {
            title: "Inflammation Modulation",
            body: "BPC-157 exhibits a distinctive anti-inflammatory profile: it reduces pro-inflammatory cytokines such as TNF-α and IL-6 while simultaneously increasing anti-inflammatory IL-10. Rather than suppressing the immune system, it appears to shift the inflammatory environment from destructive signalling toward organised resolution and repair."
          }
        ]
      },
      {
        title: "Key Research Areas",
        body: "The preclinical literature on BPC-157 spans multiple tissue types and injury models. Below are the most studied domains.",
        subsections: [
          {
            title: "Gastrointestinal Integrity",
            body: "BPC-157 was originally studied for its gastroprotective properties. Research in animal models demonstrates it supports tight-junction integrity, mucosal defence, and healing of intestinal ulcers. These effects are attributed to a combination of cytoprotection, vascular repair, and collagen remodelling in the gut lining."
          },
          {
            title: "Tendon, Ligament, and Connective Tissue",
            body: "Tendons and ligaments heal slowly due to poor vascularisation and disorganised collagen deposition. BPC-157 is studied for improving blood flow to these tissues and promoting organised Type I collagen fibril formation, resulting in mechanically stronger repair in animal models of tendon injury."
          },
          {
            title: "Bone Repair",
            body: "Preclinical studies suggest BPC-157 supports osteoblast activity and vascular recruitment in bone defects, encouraging faster mineralised remodelling. Research indicates improved biomechanical properties in treated bone compared to untreated controls."
          },
          {
            title: "Liver Protection",
            body: "In hepatotoxicity models, BPC-157 has been shown to reduce oxidative stress, support glutathione dynamics, and discourage fibrotic signalling while promoting regenerative repair in hepatocytes."
          },
          {
            title: "Neurological Recovery",
            body: "Emerging research investigates BPC-157 for neurological applications including traumatic brain injury, spinal cord injury, and peripheral nerve repair. Its combination of angiogenic, anti-inflammatory, and direct neurotrophic effects positions it as a compound of interest in neuroregeneration."
          }
        ]
      },
      {
        title: "Dosing and Research Use",
        body: "All information below refers to laboratory research protocols only. BPC-157 is not approved for human use by the MHRA, FDA, or EMA.\n\nResearch protocols typically reference doses in the range of 200–800 mcg per day for small-animal models, scaled according to body weight. A common cycle length in the literature is 4–6 weeks. BPC-157 is most often administered via subcutaneous injection in research settings.\n\nOral formulations exist but are less studied. The peptide is highly stable in gastric juice (consistent with its origin), though bioavailability via oral route requires further investigation.\n\nResearchers should reconstitute BPC-157 with bacteriostatic water and store at 2–8°C. Always consult the Certificate of Analysis supplied with each batch to verify purity and identity before commencing any research protocol.",
      },
      {
        title: "Safety Profile",
        body: "BPC-157 has demonstrated a wide safety margin in animal studies, with no observed toxicity at doses significantly above the effective range. Reported side effects in research contexts are minimal and primarily relate to injection-site reactions.\n\nAs with all research peptides, BPC-157 is strictly for in-vitro and animal laboratory research. It must not be administered to humans. Researchers should follow institutional biosafety and ethics guidelines.",
      },
    ],
    references: [
      "Seiwerth S, et al. BPC 157 and angiogenesis. Front Pharmacol. 2021;12:722613.",
      "Staresinic M, et al. Stable gastric pentadecapeptide BPC 157 and wound healing. J Physiol Pharmacol. 2018;69(4).",
      "Sikiric P, et al. BPC 157: a pentadecapeptide with multiple therapeutic effects. Curr Pharm Des. 2014;20(7):1078-85.",
      "Cesarec V, et al. BPC 157 and the central nervous system. Neurosci Lett. 2020;735:135158.",
      "Brcic L, et al. BPC 157 and nitric oxide system. Nitric Oxide. 2022;118:10-20.",
    ],
  },

  "tirzepatide-research-summary": {
    slug: "tirzepatide-research-summary",
    sections: [
      {
        title: "What Is Tirzepatide?",
        body: "Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide developed by Eli Lilly that functions as a first-in-class dual agonist at both the glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors. It represents the most significant pharmacological advance in the incretin class since the introduction of GLP-1 receptor agonists.\n\nApproved under the brand name Mounjaro for type 2 diabetes (May 2022) and Zepbound for chronic weight management (November 2023), tirzepatide has generated extensive clinical data across multiple therapeutic areas. It is the subject of ongoing research into metabolic dysfunction-associated steatohepatitis (MASH), heart failure with preserved ejection fraction (HFpEF), and cardiovascular outcomes.",
      },
      {
        title: "Mechanism of Action",
        body: "Tirzepatide's defining feature is its balanced dual agonism of GIP and GLP-1 receptors, which distinguishes it from selective GLP-1 agonists like semaglutide.",
        subsections: [
          {
            title: "GLP-1 Receptor Agonism",
            body: "GLP-1 receptor activation slows gastric emptying, suppresses postprandial glucagon secretion, and enhances glucose-dependent insulin release. These effects reduce appetite, improve glycaemic control, and promote weight loss. The GLP-1 component of tirzepatide is comparable in potency to selective GLP-1 agonists."
          },
          {
            title: "GIP Receptor Agonism — The Distinguishing Feature",
            body: "GIP receptor agonism enhances glucose-dependent insulin secretion from pancreatic beta-cells — amplifying the insulinotropic effect beyond GLP-1 agonism alone. GIP also promotes adipose tissue glucose uptake, modulates bone turnover, and may counteract some of the gastrointestinal side effects commonly associated with GLP-1 activation. The addition of GIP agonism is believed to contribute to tirzepatide's superior efficacy in both HbA1c reduction and weight loss compared with GLP-1-only agents."
          },
          {
            title: "Incretin Synergy",
            body: "The combination of GIP and GLP-1 agonism creates a synergistic effect that extends beyond simple additive mechanisms. GIP appears to enhance the beta-cell response to GLP-1 signalling, while also improving insulin sensitivity in peripheral tissues. This dual mechanism is the basis for tirzepatide's position as the most effective incretin-based therapy in clinical trials to date."
          }
        ]
      },
      {
        title: "Clinical Trial Data",
        body: "Tirzepatide has been evaluated in one of the most extensive phase 3 clinical programmes ever conducted for a metabolic therapy.",
        subsections: [
          {
            title: "SURPASS Programme (Type 2 Diabetes)",
            body: "The SURPASS phase 3 programme (SURPASS-1 through -5) demonstrated HbA1c reductions of 1.9–2.4% across all doses — the largest ever reported for a glucose-lowering agent. In SURPASS-2, tirzepatide 10 mg and 15 mg were superior to semaglutide 1 mg for both HbA1c reduction (−2.30% vs −1.86%) and weight loss (−11.2 kg vs −5.7 kg). In SURPASS-4, tirzepatide was superior to insulin glargine in patients with established cardiovascular disease."
          },
          {
            title: "SURMOUNT Programme (Obesity)",
            body: "SURMOUNT-1 (NEJM 2022) enrolled 2,539 adults with obesity but without diabetes. Mean weight loss was 15.0% (5 mg), 19.5% (10 mg), and 20.9% (15 mg) versus 3.1% with placebo at 72 weeks. At the 15 mg dose, 36.2% of participants lost 25% or more of baseline body weight. SURMOUNT-2 confirmed efficacy in patients with type 2 diabetes and obesity."
          },
          {
            title: "SYNERGY-NASH (MASH/NASH)",
            body: "The SYNERGY-NASH phase 2 trial (NEJM 2024) demonstrated that tirzepatide achieved MASH resolution without worsening fibrosis in 43.6% (5 mg), 55.5% (10 mg), and 62.4% (15 mg) of patients versus 9.8% with placebo at 52 weeks — a treatment effect 5–6 times greater than placebo. Fibrosis improvement of 1 stage or more was achieved in 51–54% of tirzepatide-treated patients versus 31% with placebo."
          },
          {
            title: "SUMMIT Trial (HFpEF)",
            body: "The SUMMIT trial (NEJM 2024) randomly assigned 731 patients with obesity and heart failure with preserved ejection fraction (HFpEF) to tirzepatide or placebo. Tirzepatide reduced the composite endpoint of cardiovascular death or worsening heart failure events (HR 0.62, 95% CI 0.41–0.95, p=0.026) and improved Kansas City Cardiomyopathy Questionnaire scores by 19.5 vs 12.7 points (p<0.001). Hospitalisation for heart failure was reduced by 44%."
          }
        ]
      },
      {
        title: "Research Applications",
        body: "Tirzepatide is a topic of active investigation across multiple metabolic indications beyond its approved uses.",
        subsections: [
          {
            title: "Ongoing Cardiovascular Outcomes",
            body: "SURPASS-CVOT, a dedicated cardiovascular outcomes trial enrolling over 12,000 patients, is ongoing with expected readout between 2026 and 2027. SURPASS-4 demonstrated a 43% reduction in MACE-4, and exploratory analyses from earlier trials showed significant reductions in systolic blood pressure (5–8 mmHg), triglycerides (20–35%), and hs-CRP (30–45%)."
          },
          {
            title: "Obstructive Sleep Apnoea",
            body: "Phase 2 data has shown tirzepatide reduces the apnoea-hypopnoea index (AHI) in patients with obesity and moderate-to-severe obstructive sleep apnoea, supporting investigation of incretin therapies in sleep-disordered breathing."
          },
          {
            title: "Beyond Weight and Glycaemia",
            body: "Researchers are investigating tirzepatide in kidney disease (albuminuria reduction), joint pain and mobility outcomes, and liver health beyond NASH. The broad metabolic effects of dual GIP/GLP-1 agonism continue to generate interest across multiple organ systems."
          }
        ]
      },
      {
        title: "Dosing and Research Use",
        body: "All information below is for laboratory research reference only. Tirzepatide is a prescription-only medicine and must not be used outside approved indications without regulatory authorisation.\n\nIn clinical trials, tirzepatide was initiated at 2.5 mg once weekly with dose escalation at 4-week intervals to minimised gastrointestinal side effects. The approved maintenance doses are 5 mg, 10 mg, and 15 mg once weekly, administered by subcutaneous injection.\n\nFor research purposes, tirzepatide is supplied as a lyophilised powder requiring reconstitution. Store lyophilised peptide at −20°C and reconstituted solution at 2–8°C. Always verify batch purity via the accompanying Certificate of Analysis.",
      },
      {
        title: "Safety and Tolerability",
        body: "Tirzepatide has a well-characterised safety profile based on extensive clinical trial data. The most common adverse events are gastrointestinal: nausea (18–33%), diarrhoea (15–22%), vomiting (6–13%), and constipation (7–10%). These are dose-dependent and typically occur during the escalation phase.\n\nSerious adverse events are uncommon but include pancreatitis, gallbladder disease, and severe gastrointestinal events. Tirzepatide carries a boxed warning regarding thyroid C-cell tumours based on animal studies, though relevance to humans is not established.\n\nAs with all GLP-1 receptor agonists, tirzepatide is contraindicated in patients with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2 (MEN-2).",
      },
    ],
    references: [
      "Jastreboff AM, et al. Tirzepatide once weekly for the treatment of obesity. N Engl J Med. 2022;387(3):205-216.",
      "Frías JP, et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes. N Engl J Med. 2021;385(6):503-515.",
      "Loomba R, et al. Tirzepatide for metabolic dysfunction-associated steatohepatitis. N Engl J Med. 2024;391(4):312-324.",
      "Packer M, et al. Tirzepatide and heart failure with preserved ejection fraction. N Engl J Med. 2024.",
      "Rosenstock J, et al. Efficacy and safety of tirzepatide in type 2 diabetes. Lancet Diabetes Endocrinol. 2022;10(10):699-712.",
    ],
  },
};

export default content;
