export interface ResearchPageContent {
  slug: string;
  compoundSlug?: string;
  pullQuote?: string;
  quickInfo?: { label: string; value: string }[];
  sections: ResearchSection[];
  references?: string[];
}

export interface ResearchSection {
  title: string;
  body: string;
  table?: { header: string[]; rows: string[][] };
  subsections?: { title: string; body: string }[];
}

const content: Record<string, ResearchPageContent> = {
  "bpc157-research-summary": {
    slug: "bpc157-research-summary",
    compoundSlug: "bpc-157",
    pullQuote:
      "BPC-157 isn't a 'one-trick' compound. It's the master locksmith — it walks into the control room of repair, inflammation, and blood flow, and starts flipping switches with surgical precision.",
    quickInfo: [
      { label: "Peptide Name", value: "BPC-157 (Body Protection Compound-157)" },
      { label: "Classification", value: "Recovery / Tissue Support Peptide (Gastric Pentadecapeptide)" },
      { label: "Sequence", value: "15 amino acids (fragment of human gastric juice protein)" },
      { label: "CAS Number", value: "137525-51-0" },
      { label: "Molecular Formula", value: "C62H98N16O22" },
      { label: "Molecular Weight", value: "1419.6 g/mol" },
      { label: "Evidence Strength", value: "Strong preclinical; limited human clinical data" },
      { label: "Primary Research Areas", value: "Tissue repair, wound healing, GI integrity, neuroprotection" },
    ],
    sections: [
      {
        title: "What Is BPC-157?",
        body: "BPC-157 (Body Protection Compound 157) is a 15-amino-acid peptide derived from a protective protein naturally found in human gastric juice. It's not some synthetic alien molecule — it's a native signaling compound your body already knows how to use.\n\nMost compounds act like a key that fits one lock: one pathway, one target, one narrow effect. BPC-157 is different. It influences multiple biological systems involved in repair — angiogenesis, collagen signalling, nitric oxide pathways, nervous system stability, and inflammation control — without shutting anything down.\n\n[**Compare BPC-157 prices from UK suppliers →**](/compounds/bpc-157)",
      },
      {
        title: "The Five Core Things BPC-157 Does",
        body: "BPC-157 is powerful because it doesn't just treat one symptom. It hits five distinct biological levers that together shift the body from breakdown into organised repair.",
        subsections: [
          {
            title: "1. Drives Angiogenesis — The Right Way",
            body: "When tissue gets injured, it becomes hypoxic (low oxygen). That activates HIF-1α, which in turn activates VEGF — the body's road-building crew for new circulation. BPC-157 supercharges this HIF-1α → VEGF axis.\n\nThe critical distinction: BPC-157 produces organised, functional vascular infrastructure — not the chaotic, tumour-like vessel growth seen in pathology. More oxygen, more nutrients, better delivery, faster waste removal. It builds real roads, not demolition derbies.",
          },
          {
            title: "2. Turns Fibroblasts Into a Rebuilding Machine",
            body: "Once blood supply improves, structural rebuilding follows. BPC-157 amplifies TGF-β1 signalling, which activates fibroblasts and ramps up production of Type I collagen, Type III collagen, fibronectin, and elastin — the structural proteins required for organised tissue repair.\n\nThe result is regeneration with reinforcement: stronger, better-organised collagen architecture rather than disorganised scar tissue. Studies suggest BPC-157 helps tissue heal with tensile strength that approaches the uninjured original.",
          },
          {
            title: "3. Restores Blood Flow Through Nitric Oxide Signalling",
            body: "BPC-157 enhances eNOS (endothelial nitric oxide synthase) activity, increasing nitric oxide production. NO relaxes vascular smooth muscle via the cGMP pathway, improving local blood flow and perfusion to injured tissues.\n\nThis is the mechanism that flips the body from breakdown into rebuild. Better circulation means better fuel delivery and better waste clearance — the essential conditions for repair to actually happen.",
          },
          {
            title: "4. Works in the Brain — Not Just Joints and Tendons",
            body: "BPC-157 crosses the blood-brain barrier and increases growth hormone receptor sensitivity in the central nervous system. Preclinical evidence indicates it supports neurite outgrowth, synaptogenesis, and protection against excitotoxic injury.\n\nThis isn't a stimulant. It's neurological rehab — helping neural tissue stabilise, recover, and rebuild after injury.",
          },
          {
            title: "5. Controls Inflammation Without Sabotaging Healing",
            body: "BPC-197 doesn't suppress the immune system — it negotiates with it. It reduces pro-inflammatory cytokines like TNF-α and IL-6 while simultaneously increasing anti-inflammatory IL-10.\n\nThe goal isn't suppression. It's resolution — moving tissue from chaotic destruction into organised reconstruction. This is fundamentally different from NSAIDs, which block inflammation signals but also block the signalling needed for repair.",
          },
        ],
      },
      {
        title: "BPC-157 vs TB-500 at a Glance",
        body: "BPC-157 and TB-500 are often discussed together as a healing stack, but they work through different primary pathways.",
        table: {
          header: ["Property", "BPC-157", "TB-500"],
          rows: [
            ["Primary mechanism", "VEGFR2 activation, NO pathway", "Actin binding, cell migration"],
            ["Best evidence area", "GI integrity, connective tissue", "Cardiac repair, anti-inflammatory"],
            ["Half-life", "~4 hours (in vivo research)", "~2-6 hours (varies by model)"],
            ["Stability", "Highly acid-stable (oral capable)", "Moderate, degraded in GI tract"],
            ["Common dose range", "250-500 mcg/day", "2.5-5 mg/week"],
          ],
        },
      },
      {
        title: "Where BPC-157 Shows Up in Research",
        body: "The preclinical literature on BPC-157 spans multiple tissue types and injury models. Here's where the signal is strongest.",
        subsections: [
          {
            title: "Gut Barrier and Ulcers",
            body: "BPC-157 was originally studied for its gastroprotective properties. Research demonstrates it supports tight-junction integrity, mucosal defence, and healing of intestinal ulcers — combining cytoprotection, vascular repair, and collagen rebuilding in the gut lining.",
          },
          {
            title: "Tendons, Ligaments, and Connective Tissue",
            body: "These tissues heal slowly because of poor blood supply and disorganised collagen deposition. BPC-157 improves blood flow and remodels collagen into stronger, organised fibrils. The outcome is restored tensile strength — not just closure of injury, but functionally meaningful repair.",
          },
          {
            title: "Bone Repair",
            body: "Preclinical studies suggest BPC-157 supports osteoblast activity and vascular recruitment in bone defects, encouraging faster mineralised remodelling with improved biomechanical properties.",
          },
          {
            title: "Liver Protection",
            body: "In hepatotoxicity models, BPC-157 reduces oxidative stress, supports glutathione dynamics, and discourages fibrotic signalling while promoting regenerative repair in hepatocytes.",
          },
          {
            title: "Neurological Recovery",
            body: "Emerging research investigates BPC-157 for traumatic brain injury, spinal cord injury, and peripheral nerve repair. Its combination of angiogenic, anti-inflammatory, and direct neurotrophic effects positions it as a compound of serious interest in neuroregeneration.",
          },
        ],
      },
      {
        title: "Dosing and Research Use",
        body: "All information below refers to laboratory research protocols only. BPC-157 is not approved for human use by the MHRA, FDA, or EMA.\n\nResearch protocols typically reference doses in the range of 200–800 mcg per day for small-animal models, scaled according to body weight. A common cycle length in the literature is 4–6 weeks.\n\nBPC-157 is most often administered via subcutaneous injection in research settings. Oral formulations exist but are less studied — though the peptide is notably stable in gastric juice, consistent with its origin.\n\n[**Check current BPC-157 prices from UK suppliers →**](/compounds/bpc-157)",
      },
      {
        title: "Molecular Profile",
        body: "Key molecular properties of BPC-157 for researchers.",
        table: {
          header: ["Property", "Value"],
          rows: [
            ["CAS Number", "137525-51-0"],
            ["Molecular Formula", "C62H98N16O22"],
            ["Molecular Weight", "1419.6 g/mol"],
            ["Sequence Length", "15 amino acids"],
            ["PubChem CID", "108101"],
            ["LogP", "-9"],
            ["TPSA", "573 Å²"],
            ["H-Bond Donors", "16"],
            ["H-Bond Acceptors", "24"],
          ],
        },
      },
      {
        title: "Safety Profile",
        body: "BPC-157 has demonstrated a wide safety margin in animal studies, with no observed toxicity at doses significantly above the effective range. Reported side effects in research contexts are minimal and primarily relate to injection-site reactions.\n\nBPC-157 is strictly for in-vitro and animal laboratory research. It must not be administered to humans. Researchers should follow institutional biosafety and ethics guidelines.",
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
    compoundSlug: "tirzepatide",
    pullQuote:
      "Tirzepatide isn't 'just another GLP-1.' It's the first dual agonist to crack the code on GIP and GLP-1 synergy — and the clinical data speaks for itself.",
    quickInfo: [
      { label: "Peptide Name", value: "Tirzepatide (LY3298176)" },
      { label: "Classification", value: "Dual GIP/GLP-1 Receptor Agonist" },
      { label: "Brand Names", value: "Mounjaro (T2D), Zepbound (Obesity)" },
      { label: "Developer", value: "Eli Lilly" },
      { label: "FDA Approval", value: "May 2022 (T2D), November 2023 (Obesity)" },
      { label: "Mechanism", value: "Balanced dual agonism of GIP and GLP-1 receptors" },
      { label: "Half-Life", value: "~5 days (supports once-weekly dosing)" },
      { label: "Primary Research Areas", value: "T2D, obesity, MASH/NASH, HFpEF, CV outcomes" },
    ],
    sections: [
      {
        title: "What Is Tirzepatide?",
        body: "Tirzepatide (LY3298176) is a 39-amino-acid synthetic peptide developed by Eli Lilly. It's a first-in-class dual agonist — it activates both the glucose-dependent insulinotropic polypeptide (GIP) receptor and the glucagon-like peptide-1 (GLP-1) receptor.\n\nApproved under the brand name Mounjaro for type 2 diabetes (May 2022) and Zepbound for chronic weight management (November 2023), tirzepatide has generated the most extensive clinical dataset of any incretin-based therapy to date.\n\nIt's the subject of ongoing research into MASH, heart failure with preserved ejection fraction, sleep apnoea, and cardiovascular outcomes — making it one of the most studied peptides in modern metabolic research.\n\n[**Compare Tirzepatide prices from UK suppliers →**](/compounds/tirzepatide)",
      },
      {
        title: "Why Dual Agonism Changes the Game",
        body: "Tirzepatide's defining feature is balanced dual agonism of GIP and GLP-1 receptors — and that's what separates it from every single-pathway GLP-1 agonist on the market.",
        subsections: [
          {
            title: "GLP-1 Receptor Agonism — The Foundation",
            body: "GLP-1 receptor activation slows gastric emptying, suppresses postprandial glucagon secretion, and enhances glucose-dependent insulin release. It reduces appetite, improves glycaemic control, and promotes weight loss. Tirzepatide's GLP-1 component is comparable in potency to selective GLP-1 agonists like semaglutide.",
          },
          {
            title: "GIP Receptor Agonism — The Game Changer",
            body: "GIP receptor agonism enhances glucose-dependent insulin secretion from pancreatic beta-cells — amplifying the insulinotropic effect beyond what GLP-1 alone can achieve. GIP also promotes adipose tissue glucose uptake, modulates bone turnover, and may counteract some of the gastrointestinal side effects commonly associated with GLP-1 activation.\n\nThis is the distinguishing feature. The addition of GIP agonism is widely believed to be responsible for tirzepatide's superior efficacy in both HbA1c reduction and weight loss compared with GLP-1-only agents.",
          },
          {
            title: "Incretin Synergy — More Than Additive",
            body: "The combination of GIP and GLP-1 agonism creates a synergistic effect that extends beyond simple additive mechanisms. GIP appears to enhance the beta-cell response to GLP-1 signalling while also improving insulin sensitivity in peripheral tissues. This dual mechanism is the basis for tirzepatide's position as the most effective incretin-based therapy in clinical trials to date.",
          },
        ],
      },
      {
        title: "Tirzepatide vs Semaglutide: Key Differences",
        body: "Tirzepatide and semaglutide are often compared in metabolic research. Here's how they stack up head-to-head.",
        table: {
          header: ["Property", "Tirzepatide", "Semaglutide"],
          rows: [
            ["Receptor targets", "GIP + GLP-1 (dual)", "GLP-1 only"],
            ["HbA1c reduction (SURPASS-2)", "−2.30% (15 mg)", "−1.86% (1 mg)"],
            ["Weight loss (SURPASS-2)", "−11.2 kg (15 mg)", "−5.7 kg (1 mg)"],
            ["Dosing frequency", "Once weekly", "Once weekly"],
            ["Half-life", "~5 days", "~7 days"],
            ["Max approved dose", "15 mg/week", "2.4 mg/week (weight)"],
          ],
        },
      },
      {
        title: "What the Clinical Data Actually Shows",
        body: "Tirzepatide has been evaluated in one of the most extensive phase 3 clinical programmes ever conducted for a metabolic therapy. The numbers are worth paying attention to.",
        subsections: [
          {
            title: "SURPASS (Type 2 Diabetes)",
            body: "The SURPASS programme (SURPASS-1 through -5) demonstrated HbA1c reductions of 1.9–2.4% across all doses — the largest ever reported for a glucose-lowering agent. In SURPASS-2, tirzepatide 10 mg and 15 mg were superior to semaglutide 1 mg for both HbA1c reduction and weight loss. In SURPASS-4, tirzepatide was superior to insulin glargine in patients with established cardiovascular disease.",
          },
          {
            title: "SURMOUNT (Obesity)",
            body: "SURMOUNT-1 (NEJM 2022) enrolled 2,539 adults with obesity but without diabetes. Mean weight loss at 72 weeks: 15.0% (5 mg), 19.5% (10 mg), and 20.9% (15 mg) versus 3.1% with placebo. At the 15 mg dose, 36.2% of participants lost 25% or more of baseline body weight.",
          },
          {
            title: "SYNERGY-NASH (MASH/NASH)",
            body: "The SYNERGY-NASH phase 2 trial (NEJM 2024) demonstrated that tirzepatide achieved MASH resolution without worsening fibrosis in 43.6% (5 mg), 55.5% (10 mg), and 62.4% (15 mg) of patients versus 9.8% with placebo at 52 weeks — a treatment effect 5–6 times greater than placebo.",
          },
          {
            title: "SUMMIT (Heart Failure / HFpEF)",
            body: "The SUMMIT trial (NEJM 2024) showed tirzepatide reduced cardiovascular death or worsening heart failure events (HR 0.62) and improved quality-of-life scores. Hospitalisation for heart failure was reduced by 44%.",
          },
        ],
      },
      {
        title: "Dosing and Research Use",
        body: "All information below is for laboratory research reference only. Tirzepatide is a prescription-only medicine and must not be used outside approved indications without regulatory authorisation.\n\nIn clinical trials, tirzepatide was initiated at 2.5 mg once weekly with dose escalation at 4-week intervals. The approved maintenance doses are 5 mg, 10 mg, and 15 mg once weekly by subcutaneous injection.\n\nFor research purposes, tirzepatide is supplied as a lyophilised powder. Store at −20°C (lyophilised) or 2–8°C (reconstituted). Always verify batch purity via the accompanying Certificate of Analysis.\n\n[**View current Tirzepatide supplier prices →**](/compounds/tirzepatide)",
      },
      {
        title: "Safety and Tolerability",
        body: "Tirzepatide has a well-characterised safety profile based on extensive clinical trial data. The most common adverse events are gastrointestinal: nausea (18–33%), diarrhoea (15–22%), vomiting (6–13%), and constipation (7–10%). These are dose-dependent and typically occur during the escalation phase.\n\nSerious adverse events are uncommon but include pancreatitis, gallbladder disease, and severe gastrointestinal events. Tirzepatide carries a boxed warning regarding thyroid C-cell tumours based on animal studies, though relevance to humans is not established.\n\nTirzepatide is strictly for research purposes and must not be administered to humans outside approved indications.",
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
