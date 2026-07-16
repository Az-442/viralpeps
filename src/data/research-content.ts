export interface ResearchPageContent {
  slug: string;
  compoundSlug?: string;
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
    faq: [
      {
        question: "What is BPC-157 used for in research?",
        answer: "BPC-157 is studied primarily in preclinical models for tissue repair, wound healing, gastrointestinal integrity, and musculoskeletal recovery. Its multi-pathway effects on angiogenesis, collagen remodelling, and inflammation modulation make it one of the most widely discussed peptides in regenerative research."
      },
      {
        question: "What are the main mechanisms of BPC-157?",
        answer: "BPC-157 works through five coordinated pathways: angiogenesis via HIF-1α/VEGF, fibroblast activation and collagen remodelling, nitric oxide signalling for improved blood flow, CNS penetration for neuroprotection, and inflammation modulation that shifts the environment from destruction toward organised repair."
      },
      {
        question: "Is BPC-157 approved for human use?",
        answer: "No. BPC-157 is not approved by the MHRA, FDA, or EMA for human use. It is strictly for in-vitro and animal laboratory research. All dosing information refers to research protocols only."
      },
      {
        question: "How is BPC-157 typically administered in research?",
        answer: "Subcutaneous injection is the most common route in research settings. BPC-157 is acid-stable (consistent with its gastric juice origin), so oral bioavailability is possible, though less studied. Research protocols typically reference 200-800 mcg per day over 4-6 week cycles."
      },
      {
        question: "Does BPC-157 interact with other compounds?",
        answer: "BPC-157 is often studied alongside TB-500 as a healing stack due to their complementary mechanisms — BPC-157 drives angiogenesis and collagen organisation while TB-500 promotes cell migration. Limited data exists on other specific interactions, and researchers should exercise standard caution when combining any research compounds."
      },
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
    faq: [
      {
        question: "What is tirzepatide and how does it work?",
        answer: "Tirzepatide is a 39-amino-acid synthetic peptide that acts as a dual agonist at both GIP and GLP-1 receptors. This dual mechanism enhances insulin secretion, slows gastric emptying, suppresses appetite, and improves insulin sensitivity — producing greater effects than GLP-1-only agonists like semaglutide."
      },
      {
        question: "What are the main differences between tirzepatide and semaglutide?",
        answer: "Tirzepatide activates both GIP and GLP-1 receptors, whereas semaglutide targets GLP-1 only. In head-to-head trials, tirzepatide produced greater HbA1c reductions (up to −2.30% vs −1.86%) and more weight loss (up to −11.2 kg vs −5.7 kg) at their respective maximum doses."
      },
      {
        question: "What clinical data supports tirzepatide research?",
        answer: "Tirzepatide has been evaluated across the SURPASS (type 2 diabetes), SURMOUNT (obesity), SYNERGY-NASH (MASH/NASH), and SUMMIT (HFpEF) clinical programmes. Results include the largest HbA1c reductions ever reported for a glucose-lowering agent, up to 20.9% body weight reduction, and a 44% reduction in heart failure hospitalisations."
      },
      {
        question: "What are the common side effects in clinical trials?",
        answer: "The most common adverse events are gastrointestinal: nausea (18-33%), diarrhoea (15-22%), vomiting (6-13%), and constipation (7-10%). These are dose-dependent and typically occur during dose escalation. Serious events are uncommon but include pancreatitis and gallbladder disease."
      },
      {
        question: "Is tirzepatide approved or is it strictly for research?",
        answer: "Tirzepatide is FDA-approved as Mounjaro for type 2 diabetes (May 2022) and Zepbound for chronic weight management (November 2023). For research purposes, it is supplied as a lyophilised powder for laboratory study. It carries a boxed warning regarding thyroid C-cell tumours based on animal studies."
      },
    ],
  },
  "ghkcu-research-summary": {
    slug: "ghkcu-research-summary",
    compoundSlug: "ghk-cu",
    pullQuote:
      "GHK-Cu doesn't just dress the wound — it rewrites the genetic blueprint for repair, telling over 4,000 genes to get back to work.",
    quickInfo: [
      { label: "Peptide Name", value: "GHK-Cu (Glycyl-L-Histidyl-L-Lysine Copper Complex)" },
      { label: "Classification", value: "Copper-Binding Tripeptide (Matrikin / Signaling Peptide)" },
      { label: "CAS Number", value: "89030-95-5 (GHK-Cu); 49557-75-7 (GHK)" },
      { label: "Molecular Formula", value: "C14H24N6O4·Cu" },
      { label: "Molecular Weight", value: "340.38 g/mol (GHK); ~401.9 g/mol (GHK-Cu complex)" },
      { label: "Evidence Strength", value: "Strong preclinical; moderate human clinical data (skin, wound healing)" },
      { label: "Primary Research Areas", value: "Skin repair, wound healing, hair growth, collagen synthesis, anti-aging, neuroprotection" },
    ],
    sections: [
      {
        title: "What Is GHK-Cu?",
        body: "GHK-Cu is a naturally occurring copper-binding tripeptide — three amino acids (glycyl-L-histidyl-L-lysine) that grab a copper ion with the precision of a molecular claw. It was first isolated from human blood plasma in 1973 by Dr. Loren Pickart, who noticed that the plasma of younger individuals had a far greater capacity to support tissue repair than that of older individuals.\n\nThat difference turned out to be largely down to GHK-Cu levels. At age 20, your plasma carries roughly 200 ng/mL of GHK-Cu. By age 60, that number drops to around 80 ng/mL. The body literally runs out of its own repair signal as it ages — and replenishing it in research models produces results that are hard to ignore.\n\nGHK-Cu is not a synthetic drug. It's an endogenous signalling peptide your body already uses to coordinate wound healing, stem cell recruitment, and gene expression. Research GHK-Cu simply restores those levels to a more youthful state.\n\n[**Compare GHK-Cu prices from UK suppliers →**](/compounds/ghk-cu)",
      },
      {
        title: "The Five Core Things GHK-Cu Does",
        body: "GHK-Cu is often dismissed as a 'skin peptide.' That's like calling the Apollo Guidance Computer a calculator. GHK-Cu modulates gene expression across the entire genome, coordinates copper-dependent enzymes, recruits stem cells, and governs the structural integrity of connective tissue. Here are the five mechanisms that define its research profile.",
        subsections: [
          {
            title: "1. Copper Delivery Without Toxicity",
            body: "Copper is essential for life — lysyl oxidase, superoxide dismutase, cytochrome c oxidase, and dozens of other enzymes depend on it. But free copper ions are toxic: they generate hydroxyl radicals via Fenton chemistry, damage DNA, and trigger oxidative stress.\n\nGHK-Cu solves this by binding copper in a redox-stable complex. It delivers copper directly to copper-dependent enzymes without releasing free Cu²⁺ into the cellular environment. The histidine residue coordinates the copper ion in a tight square-planar geometry, preventing the redox cycling that makes free copper dangerous. This allows the copper to reach lysyl oxidase — essential for collagen crosslinking — and Cu/Zn-SOD — essential for antioxidant defence — without collateral damage.",
          },
          {
            title: "2. Gene Expression Control — 32.1% of the Human Genome",
            body: "This is the number that stops researchers cold. In a landmark study using microarray analysis of human fibroblast gene expression, GHK-Cu was found to upregulate or downregulate an estimated 32.1% of all human genes — roughly 4,000 to 5,000 genes depending on the reference genome build (Pickart et al., 2012, PMID: 22879172).\n\nTo put that in perspective: most pharmaceutical drugs affect one or two gene products. GHK-Cu influences a third of the entire genome — shifting expression patterns toward tissue remodelling, antioxidant defence, cell proliferation, and extracellular matrix synthesis. This isn't a targeted bullet. It's a system-wide signal that says repair.",
          },
          {
            title: "3. Collagen & Elastin Production — Fibroblast Activation",
            body: "GHK-Cu is a direct activator of dermal fibroblasts. It upregulates collagen Type I, collagen Type III, and elastin production through TGF-β signalling pathways while simultaneously suppressing metalloproteinases (MMPs) that break down the extracellular matrix.\n\nThe result is a net shift toward matrix deposition rather than degradation. In human skin explant models, GHK-Cu treatment increased collagen production by 50–70% and elastin by 60–100% compared with untreated controls. The collagen produced was also better organised — thicker fibrils with more crosslinking, which translates to stronger, more resilient tissue architecture.",
          },
          {
            title: "4. Stem Cell Activation — Dormant Stem Cell Recruitment",
            body: "GHK-Cu acts as a chemoattractant for stem cells. In wound healing models, GHK-Cu recruits CD34+ and CD117+ stem cells to the site of injury — pulling dormant progenitor cells out of their niche and into the repair zone.\n\nThis is fundamentally different from most growth factors, which typically act on already-active cells. GHK-Cu wakes up the stem cell pool. In burn wound models, GHK-Cu-treated sites showed significantly higher stem cell infiltration and accelerated re-epithelialisation compared with untreated controls.\n\n[**Explore GHK-Cu pricing and supplier options →**](/compounds/ghk-cu)",
          },
          {
            title: "5. Inflammation & Antioxidant Control — NFkB Suppression",
            body: "GHK-Cu suppresses NFkB nuclear translocation — the master switch for the inflammatory cascade. By reducing TNF-α, IL-1β, and IL-6 expression, GHK-Cu shifts the inflammatory environment from destructive chronic activation toward controlled, acute-phase resolution.\n\nAt the same time, GHK-Cu upregulates antioxidant enzymes including glutathione peroxidase, catalase, and Cu/Zn-SOD. The combined effect is a cell that is both less inflamed and better protected against oxidative damage — two conditions that are absolutely essential for organised tissue repair to proceed without interference.",
          },
        ],
      },
      {
        title: "GHK-Cu vs Minoxidil for Hair Research",
        body: "GHK-Cu has attracted significant attention in hair follicle research, particularly as a topical alternative or adjunct to minoxidil. While minoxidil acts primarily as a vasodilator via potassium channel opening (sulfotransferase-dependent activation to minoxidil sulfate), GHK-Cu targets the follicle microenvironment through entirely different mechanisms — gene expression modulation, stem cell recruitment, and angiogenesis. The comparison table below outlines the key research distinctions.",
        table: {
          header: ["Parameter", "GHK-Cu", "Minoxidil"],
          rows: [
            ["Mechanism of Action", "Copper-dependent gene expression modulation, stem cell recruitment, ECM remodelling", "Vasodilation via ATP-sensitive potassium channel opening (sulfotransferase-dependent)"],
            ["Gene Expression Modulation", "Up/downregulates ~32.1% of human genes — global transcriptomic shift toward repair", "Limited to ~5–10 known gene targets; primarily vasodilatory and anti-androgenic pathways"],
            ["Proliferation Rates (dermal papilla cells)", "40–60% increase in dermal papilla cell proliferation at optimal copper concentration", "20–40% increase in dermal papilla cell proliferation; requires enzymatic activation"],
            ["Clinical Context", "Emerging research; preclinical + limited human pilot data; used as a research topical", "FDA-approved (1988, 1996); extensive clinical data; first-line treatment in hair loss protocols"],
          ],
        },
      },
      {
        title: "GHK-Cu in Skin Research",
        body: "Skin is where GHK-Cu has the deepest research footprint — and the data is genuinely compelling across multiple endpoints.",
        subsections: [
          {
            title: "Collagen Synthesis and Matrix Remodelling",
            body: "GHK-Cu consistently increases collagen Type I and Type III synthesis in human dermal fibroblasts while simultaneously reducing MMP-1, MMP-2, and MMP-9 expression. The net effect is a dramatic shift from matrix degradation to matrix deposition. In ex vivo human skin models, topical GHK-Cu increased full-thickness collagen density by 50–70% over 12 weeks. The newly deposited collagen also showed improved fibril organisation — thicker, more crosslinked bundles that more closely resemble youthful skin architecture.",
          },
          {
            title: "Wound Healing — More Than Doubled Rates",
            body: "Animal wound healing models routinely show GHK-Cu accelerating closure rates by 100–200% compared with untreated controls. In one rat full-thickness excisional wound model, GHK-Cu-treated wounds reached 95% closure by day 14 versus day 24 in controls — a 40% reduction in healing time.\n\nThe mechanism is multi-factorial: increased angiogenesis via VEGF upregulation, enhanced keratinocyte migration, stem cell recruitment to the wound bed, and controlled inflammation. GHK-Cu doesn't just close the wound faster; it closes it with better tissue architecture and less scar formation.",
          },
          {
            title: "UV Protection and Photoaging",
            body: "Repeated UV exposure depletes GHK-Cu levels in the skin, contributing to photoaging — the degradation of collagen and elastin characteristic of sun-damaged skin. In research models, topical GHK-Cu application before or after UV exposure reduces MMP upregulation, limits collagen degradation, and preserves elastic fibre network integrity.\n\nGHK-Cu also upregulates p53 and other DNA repair pathways in UV-damaged keratinocytes, suggesting it may support genomic stability in addition to structural protection. While not a sunscreen, GHK-Cu appears to function as a molecular buffer against UV-induced matrix degradation.",
          },
        ],
      },
      {
        title: "Dosing & Reconstitution",
        body: "All information below refers to laboratory research use only. GHK-Cu is not approved for human use by the MHRA, FDA, or EMA.\n\nGHK-Cu is typically supplied as a lyophilised (freeze-dried) powder in 50 mg vials. Reconstitution protocol for research:\n\n**Standard Reconstitution:** Add 3 mL of bacteriostatic water (0.9% benzyl alcohol) to a 50 mg vial. This yields a concentration of approximately 16.67 mg/mL. For more precise dosing, 2 mL yields 25 mg/mL.\n\n**Storage:** Lyophilised powder should be stored at 2–8°C (refrigerated) and protected from light. Once reconstituted, GHK-Cu is stable for 7–14 days at 2–8°C. Do not freeze reconstituted GHK-Cu — ice crystal formation can degrade the peptide.\n\n**Typical Research Dose Range:** 1–2 mg per day in small-animal models, adjusted for body weight. In topical research applications, concentrations of 0.5–2% are commonly studied. Always verify the Certificate of Analysis for purity and endotoxin levels before use.\n\n[**Check current GHK-Cu prices from UK suppliers →**](/compounds/ghk-cu)",
      },
      {
        title: "Safety Profile",
        body: "GHK-Cu has demonstrated a remarkably wide safety margin across multiple animal and human studies. As an endogenous compound naturally present in human plasma, GHK-Cu is well-tolerated at research doses significantly above physiological levels.\n\n**Key safety data points:**\n\n- No observed toxicity in animal studies at doses up to 10× the effective range\n- Human topical studies (0.5–2% creams) show no significant adverse effects beyond mild, transient irritation in some individuals\n- No known drug-drug interactions at research doses\n- Common side effects are limited to injection-site reactions (mild erythema, transient pruritus)\n\n**Age-related decline:** GHK-Cu levels in human plasma decrease from approximately 200 ng/mL at age 20 to approximately 80 ng/mL at age 60. This natural decline has been correlated with reduced wound healing capacity, decreased skin elasticity, and impaired collagen turnover in aging populations — which is the biological rationale for GHK-Cu supplementation in research models.\n\nGHK-Cu is strictly for laboratory research use. Not for human consumption.",
      },
    ],
    faq: [
      {
        question: "What is GHK-Cu and how does it work?",
        answer: "GHK-Cu (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide first isolated from human plasma in 1973. It binds copper ions in a stable complex and delivers them to copper-dependent enzymes without toxicity. GHK-Cu modulates an estimated 32.1% of human genes, activating pathways for collagen synthesis, wound healing, stem cell recruitment, antioxidant defence, and inflammation control. It's one of the most broadly acting signalling peptides in the research literature.",
      },
      {
        question: "What is the typical research dosage for GHK-Cu?",
        answer: "In small-animal models, the typical research dose range is 1–2 mg per day, adjusted for body weight. A standard 50 mg vial reconstituted with 3 mL of bacteriostatic water yields approximately 16.67 mg/mL. For topical research, concentrations of 0.5–2% are commonly studied. Always refer to your specific protocol and institutional ethics guidelines. Lyophilised GHK-Cu should be stored at 2–8°C.",
      },
      {
        question: "Is GHK-Cu more effective topically or by injection in research?",
        answer: "Both routes have been studied with good results. Topical GHK-Cu penetrates the epidermis and reaches the dermis in significant concentrations, making it suitable for skin, hair, and wound healing research. Subcutaneous injection delivers systemic exposure and is preferred when studying stem cell recruitment, gene expression modulation, or effects beyond the application site. The choice depends entirely on the research question. Both routes are well-tolerated in research models.",
      },
      {
        question: "Can GHK-Cu be stacked with other research peptides?",
        answer: "GHK-Cu is frequently used alongside BPC-157 in tissue repair protocols — BPC-157 drives angiogenesis and collagen organisation while GHK-Cu modulates gene expression and recruits stem cells. It has also been combined with TB-500 (thymosin beta-4) for wound healing studies, as TB-500 promotes cell migration while GHK-Cu handles matrix remodelling. Researchers should always exercise caution when combining compounds and consider potential synergistic effects on copper-dependent pathways.",
      },
      {
        question: "What are the known side effects of GHK-Cu in research settings?",
        answer: "GHK-Cu is exceptionally well-tolerated. In animal studies, no toxicity has been observed at doses up to 10× the effective range. Reported side effects are primarily limited to mild injection-site reactions (transient redness, itching, or slight swelling). In topical applications, occasional minor irritation has been noted at higher concentrations. As an endogenous human peptide, GHK-Cu has a fundamentally different safety profile from synthetic drugs — your body already knows how to process it.",
      },
    ],
    references: [
      "Pickart L. The human tripeptide GHK-Cu in prevention of skin photoaging and wound healing. J Biomater Sci Polym Ed. 2008;19(8):969-80. PMID: 18644225.",
      "Pickart L, Vasquez-Soltero JM, Margolina A. GHK-Cu may prevent oxidative stress in skin by regulating copper and modifying gene expression. Int J Mol Sci. 2012;13(11):15271-84. PMID: 23203115.",
      "Pickart L, Vasquez-Soltero JM, Margolina A. The human tripeptide GHK-Cu in prevention of skin photoaging and wound healing: a review. Healthy Aging and Clinical Care in the Elderly. 2012;4:13-20.",
      "Maquart FX, Bellon G, Chaqour B, et al. In vivo stimulation of connective tissue accumulation by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+ in rat experimental wounds. J Clin Invest. 1993;92(5):2368-76. PMID: 8227353.",
      "Pollard JD, Quan R, Kang T, Koch RJ. Effects of copper tripeptide on the growth and expression of growth factors by normal and irradiated fibroblasts. Arch Facial Plast Surg. 2005;7(1):27-31. PMID: 15655169.",
      "Gruber JV, Holtz R, Wang J. The effect of GHK-Cu on proliferation and collagen production in human dermal fibroblasts. J Drugs Dermatol. 2018;17(9):947-953. PMID: 30225732.",
      "Wegrowski Y, Maquart FX, Borel JP. Stimulation of sulfated glycosaminoglycan synthesis by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+. Life Sci. 1992;51(13):1049-56. PMID: 1513217.",
      "Pickart L, Margolina A. Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data. Int J Mol Sci. 2018;19(7):1987. PMID: 29986466.",
    ],
  },
  "retatrutide-research-summary": {
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
},
  "semax-research-summary": {
  slug: "semax-research-summary",
  compoundSlug: "semax",
  pullQuote:
    "Semax is not a blunt hammer for the brain. It is a signal amplifier -- it tells your BDNF receptors to listen harder, and your TrkB pathways to turn up the volume on repair, plasticity, and survival. No sedation. No dependence. Just cleaner signalling.",
  quickInfo: [
    { label: "Peptide Name", value: "Semax (ACTH(4-10) Analog)" },
    { label: "Sequence", value: "Met-Glu-His-Phe-Pro-Gly-Pro" },
    { label: "CAS Number", value: "80714-61-0" },
    { label: "Molecular Weight", value: "813.93 g/mol" },
    { label: "Classification", value: "Synthetic Heptapeptide Nootropic / Neuroprotective" },
    { label: "Half-Life", value: "~1.3 hours" },
    { label: "Onset", value: "15-30 minutes (intranasal)" },
    { label: "Primary Research Areas", value: "Nootropic, neuroprotection, stroke rehabilitation, gene expression modulation" },
  ],
  sections: [
    {
      title: "What Is Semax?",
      body: "Semax is a synthetic heptapeptide -- a seven-amino-acid fragment analogue of adrenocorticotropic hormone (ACTH(4-10)) with the sequence Met-Glu-His-Phe-Pro-Gly-Pro. It was developed in the 1980s by Russian researchers at the Institute of Molecular Genetics and the Moscow State University, and has been approved for clinical use in Russia since 2001 under the brand name Semax (CemaKc 0.1%).\n\nBut do not confuse this with ACTH. Semax was deliberately engineered to strip away the hormonal baggage. The key mod? It lacks the steroidogenic sequence of full ACTH -- meaning it does not trigger cortisol release. What is left is a compound that reaches the brain within minutes, upregulates BDNF, modulates dopamine and serotonin, and protects neurons -- all without the endocrine drama that comes with its parent molecule.\n\nSemax is classified as a nootropic and neuroprotective agent. It is prescribed in Russia and several CIS countries for cognitive impairment, stroke recovery, optic nerve damage, and ischemic brain injury. Outside those regions, it remains a compound of intense research interest -- and for good reason.\n\n[**Compare Semax prices from UK suppliers ->**](/compounds/semax)",
    },
    {
      title: "How Semax Works",
      body: "Semax does not work like a typical stimulant or smart drug. It does not force activity -- it tunes the system. Below are the four primary mechanisms that give Semax its broad neurobiological reach.",
      subsections: [
        {
          title: "BDNF / TrkB Upregulation -- The Core Mechanism",
          body: "The single most important thing Semax does is upregulate brain-derived neurotrophic factor (BDNF) and its high-affinity receptor TrkB. Studies show that intranasal Semax increases BDNF mRNA expression in the hippocampus and frontal cortex within 20 minutes of administration.\n\nBDNF is the master gardener of the brain: it waters the dendrites, fertilises synapses, and prunes the connections that do not serve you. By amplifying BDNF signalling through TrkB, Semax creates conditions for improved synaptic plasticity, neurogenesis, and neuronal survival. This is not a subtle background hum -- these are real, measurable changes in gene expression that persist for hours after a single dose.",
        },
        {
          title: "Dopamine & Serotonin Modulation",
          body: "Semax modulates monoaminergic systems -- specifically dopamine and serotonin -- without acting as a direct agonist or reuptake inhibitor. Research in rodent models shows that Semax increases dopamine turnover in the striatum and enhances serotonergic activity in the frontal cortex.\n\nThe result is a subtle but noticeable shift in drive, mood stability, and cognitive flexibility. Not the crash-and-burn of amphetamine-like agents, but a sustained improvement in neural signal-to-noise ratio that supports focused attention and behavioural adaptation.",
        },
        {
          title: "No Cortisol Stimulation -- The ACTH Difference",
          body: "This is the critical differentiator. Full ACTH triggers the adrenal cortex to release cortisol -- the body's primary stress hormone. Chronic cortisol elevation is anathema to cognitive function: it impairs hippocampal neurogenesis, suppresses BDNF, and accelerates neural ageing.\n\nSemax, as an ACTH(4-10) fragment, lacks the 11-24 amino acid sequence required to activate the adrenal cortex. Multiple studies confirm that Semax administration does not elevate blood cortisol levels. You get the neurotrophic and behavioural effects of the ACTH fragment without the endocrine stress response. This is exactly why Semax can be used for weeks at a time without adrenal fatigue or HPA axis disruption.",
        },
        {
          title: "Gene Expression Changes -- 24 Genes in the CNS",
          body: "Semax is not a one-gene compound. A comprehensive microarray study identified 24 genes whose expression is significantly altered in the rat CNS following Semax administration. These include genes involved in neurotrophic signalling (Bdnf, TrkB), neurotransmitter synthesis (Th, Ddc), synaptic plasticity (Arc, Egr1), neuroprotection (Hsp70, Bcl2), and energy metabolism.\n\nThis multi-gene signature is what separates Semax from narrow-spectrum nootropics. It does not just tweak one knob -- it reprograms the brain's transcriptional landscape toward a coordinated state of enhanced plasticity, resilience, and metabolic readiness.",
        },
      ],
    },
    {
      title: "Cognitive & Nootropic Research",
      body: "The cognitive effects of Semax have been studied across multiple models -- from basic learning paradigms in rodents to neuroimaging studies in humans.",
      subsections: [
        {
          title: "Learning and Memory Models",
          body: "In rodent models of learning and memory (Morris water maze, passive avoidance, radial arm maze), Semax consistently accelerates memory consolidation and improves retention. A 2014 study found that Semax-treated rats showed significantly improved spatial learning performance compared to controls, with the effect persisting beyond the period of active administration.\n\nThe effect appears to be most pronounced under conditions of cognitive demand or pathology. In models of cerebral ischemia, Semax restored learning capacity to near-baseline levels -- a result that speaks to its neuroprotective rather than purely performance-enhancing character.",
        },
        {
          title: "Default Mode Network Modulation",
          body: "Human neuroimaging studies have demonstrated that Semax modulates activity in the default mode network (DMN) -- the set of brain regions active during passive rest and introspection. Specifically, Semax increases functional connectivity between DMN nodes while simultaneously improving performance on attention-demanding tasks.\n\nThis is paradoxical on the surface -- how can a compound quiet the mind's background chatter while sharpening focus? The answer lies in what neuroscientists call network efficiency: Semax does not suppress the DMN; it reorganises it so that when you need to focus, the transition from rest mode to active mode is faster and cleaner.",
        },
        {
          title: "EEG and Neurophysiological Data",
          body: "Human EEG studies show that Semax increases alpha rhythm power and reduces slow-wave (theta and delta) activity -- a pattern associated with improved cortical activation and cognitive readiness. These changes correlate with subjective improvements in mental clarity, task switching, and resistance to mental fatigue in healthy volunteers.",
        },
      ],
    },
    {
      title: "Neuroprotection After Ischemia",
      body: "Semax's neuroprotective profile is arguably its most clinically validated property. Russian stroke rehabilitation protocols have incorporated Semax for over two decades, supported by a body of preclinical and clinical research that is difficult to ignore.",
      subsections: [
        {
          title: "Stroke Rehab -- The Russian Clinical Track Record",
          body: "In Russia, Semax (0.1% nasal drops) is a registered medication for the treatment of cognitive impairment following stroke and traumatic brain injury. Clinical studies involving hundreds of patients report improved neurological recovery, reduced cognitive deficit, and better functional outcomes in stroke patients receiving Semax compared with standard therapy alone.\n\nOne key study found that Semax administered within the first 72 hours of ischemic stroke significantly improved scores on the Scandinavian Stroke Scale and Mini-Mental State Examination -- effects sustained at 30-day follow-up. These are not marginal p-value wins; they are clinically meaningful improvements in speech, motor function, and cognition.",
        },
        {
          title: "VEGF Upregulation and Angiogenesis",
          body: "Beyond its direct neurotrophic effects, Semax upregulates vascular endothelial growth factor (VEGF) in the peri-infarct zone. VEGF stimulates angiogenesis -- the formation of new blood vessels -- which improves oxygen and nutrient delivery to recovering tissue.\n\nIn models of focal cerebral ischemia, Semax treatment increased capillary density in the penumbra (the salvageable tissue surrounding the infarct core) and reduced infarct volume by up to 40%. The compound does not just keep neurons alive -- it builds the vascular infrastructure they need to function.",
        },
        {
          title: "Antioxidant and Anti-Apoptotic Effects",
          body: "Semax reduces oxidative stress markers (malondialdehyde, protein carbonyls) and upregulates endogenous antioxidant enzymes (superoxide dismutase, glutathione peroxidase). At the same time, it shifts the balance of pro- and anti-apoptotic proteins -- increasing Bcl-2 (survival) while decreasing Bax and active caspase-3 (death).\n\nThe result is a multilayered defence: less free-radical damage, fewer cells triggering their own death programmes, and a biochemical environment that favours recovery over degeneration.",
        },
      ],
    },
    {
      title: "Dosing & Administration",
      body: "All information below refers to laboratory research and registered clinical protocols. Semax is a prescription medication in Russia and should be handled accordingly in research settings.\n\nIn registered human clinical use, Semax is administered intranasally -- typically at doses of 200-600 mcg per day divided into 2-3 applications. The intranasal route allows Semax to bypass the blood-brain barrier and reach the CNS within 15-30 minutes. The half-life is approximately 1.3 hours, meaning steady therapeutic levels require multiple daily doses.\n\nResearch use: Semax is typically supplied as a lyophilised powder in 30 mg vials for reconstitution. Reconstitution is done with sterile saline or bacteriostatic water to a desired concentration (e.g., 10 mg/mL). For intranasal administration, researchers typically divide the daily dose into 2-3 aliquots. Standard research protocols in rodent models use intranasal or intraperitoneal administration at doses scaled to body weight.\n\nStorage: Lyophilised Semax should be stored at -20 C. Reconstituted solutions are stable for 7-14 days at 2-8 C. Avoid repeated freeze-thaw cycles. Always verify purity and batch data via the Certificate of Analysis.\n\n[**Check current Semax prices from UK suppliers ->**](/compounds/semax)",
    },
    {
      title: "Safety Profile",
      body: "Semax has a favourable safety profile that has been established through decades of clinical use in Russia, dating back to the early 1990s in research settings and 2001 as a registered medication.\n\nKey safety observations from clinical literature:\n\n- No sedation: Unlike many nootropics that come with drowsiness or cognitive blunting, Semax is consistently reported to be non-sedating.\n- No dependence: Clinical use over extended periods has not demonstrated withdrawal syndromes or psychological dependence.\n- No hormonal disruption: As discussed, Semax does not stimulate cortisol release or suppress the HPA axis.\n- No hepatotoxicity: Liver enzyme levels remain within normal ranges in both animal and human studies.\n- Minimal side effects: Occasional mild nasal irritation at the site of intranasal administration, transient mild headache, or slight changes in blood pressure in sensitive individuals.\n\nSemax has demonstrated a wide therapeutic index in animal studies, with no observed toxicity at doses significantly above the effective range. As with any research compound, it should be handled with appropriate laboratory precautions and studied under institutional ethics and biosafety oversight.\n\n[**Browse Semax supplier listings on ViralPeps ->**](/compounds/semax)",
    },
  ],
  faq: [
    {
      question: "What is Semax and how is it different from ACTH?",
      answer: "Semax is a synthetic heptapeptide analogue of ACTH(4-10) -- the fragment of adrenocorticotropic hormone responsible for learning and memory, but stripped of the amino acid sequence that triggers cortisol release. Unlike full ACTH, Semax does not stimulate the adrenal cortex, so it provides neurotrophic and nootropic effects without hormonal stress responses or HPA axis disruption.",
    },
    {
      question: "How does Semax improve cognition and memory?",
      answer: "Semax's primary cognitive mechanism is BDNF/TrkB upregulation -- it increases brain-derived neurotrophic factor expression within 20 minutes, enhancing synaptic plasticity, neurogenesis, and neuronal survival. It also modulates dopamine and serotonin turnover, alters expression of 24+ genes involved in plasticity and metabolism, and improves default mode network connectivity efficiency -- allowing faster switching between focused and resting brain states.",
    },
    {
      question: "What clinical evidence supports Semax for stroke recovery?",
      answer: "Semax has been studied in Russian clinical settings for over two decades. Studies involving hundreds of stroke patients show that intranasal Semax (0.1%, 200-600 mcg/day) administered within the first 72 hours of ischemic stroke significantly improves scores on the Scandinavian Stroke Scale and Mini-Mental State Examination at 30-day follow-up. Preclinical data supports VEGF upregulation, angiogenesis in the peri-infarct zone, reduced infarct volume (up to 40% in animal models), antioxidant defence, and anti-apoptotic effects.",
    },
    {
      question: "How is Semax typically administered in research?",
      answer: "In registered clinical protocols, Semax is administered intranasally at 200-600 mcg per day divided into 2-3 doses. The intranasal route reaches the CNS within 15-30 minutes. For research use, Semax is supplied as lyophilised powder (commonly 30 mg per vial) and reconstituted with sterile saline or bacteriostatic water. The half-life is approximately 1.3 hours, so multiple daily doses are used. Store lyophilised at -20 C; reconstituted solutions are stable 7-14 days at 2-8 C.",
    },
    {
      question: "Is Semax safe and does it cause dependence?",
      answer: "Semax has a favourable safety profile established through decades of clinical use in Russia since the 1990s. It is non-sedating, does not produce withdrawal symptoms or psychological dependence, does not stimulate cortisol release, and has not shown hepatotoxicity. The most commonly reported side effect is mild nasal irritation from intranasal administration. Animal studies demonstrate a wide therapeutic index with no observed toxicity at significantly supratherapeutic doses.",
    },
  ],
  references: [
    "Filippenkov IB, et al. Semax, an analog of ACTH(4-10), regulates expression of immune response genes in rat brain. Dokl Biochem Biophys. 2015;464:322-325. PMID: 26518547.",
    "Dmitrieva VG, et al. Semax and Pro-Gly-Pro fragment of ACTH(4-10) upregulate BDNF and TrkB gene expression in rat brain. Dokl Biol Sci. 2015;463:196-199. PMID: 26329290.",
    "Gusev EI, et al. Efficacy of Semax in the acute period of hemispheric ischemic stroke. Zh Nevrol Psikhiatr Im S S Korsakova. 2005;105(4):21-26. PMID: 15895889.",
    "Myasoedov NF, et al. Neuroprotective and nootropic effects of Semax and its analogues. J Mol Neurosci. 2006;28(3):229-235. PMID: 16651008.",
    "Volkova EV, et al. Semax increases BDNF expression in the hippocampus and frontal cortex of rats. Bull Exp Biol Med. 2018;166(1):62-65. PMID: 30456520.",
    "Bondarenko NA, et al. Semax has antioxidant and anti-apoptotic effects in experimental cerebral ischemia. Bull Exp Biol Med. 2017;163(4):458-461. PMID: 28853076.",
    "Shadrina MI, et al. Semax affects expression of genes involved in neuroplasticity and neuroprotection in rat brain. Mol Biol (Mosk). 2010;44(5):846-854. PMID: 21061613.",
  ],
},
  "selank-research-summary": {
  slug: "selank-research-summary",
  compoundSlug: "selank",
  pullQuote:
    "Selank doesn't knock you out with a chemical hammer. It walks through the GABAergic garden, adjusts the watering, and leaves the rest of the brain to go about its business — calm, clear, and unmedicated.",
  quickInfo: [
    { label: "Peptide Name", value: "Selank (TP-7 / Selanc)" },
    { label: "Sequence", value: "Thr-Lys-Pro-Arg-Pro-Gly-Pro" },
    { label: "CAS Number", value: "129954-34-3" },
    { label: "Molecular Weight", value: "751.87 g/mol" },
    { label: "Classification", value: "Synthetic Heptapeptide Tuftsin Analog Anxiolytic Neuropeptide" },
    { label: "Half-Life", value: "Short (minutes)" },
    { label: "Regulatory Status", value: "Russian approval since 2009" },
    { label: "Primary Research Areas", value: "Anxiety disorders, cognitive enhancement, immunomodulation, neuroprotection" },
  ],
  sections: [
    {
      title: "What Is Selank?",
      body: "Selank (TP-7, Selanc) is a synthetic heptapeptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro. It is an analogue of tuftsin — a naturally occurring immunomodulatory tetrapeptide (Thr-Lys-Pro-Arg) first discovered in the 1970s as a fragment of the Fc domain of immunoglobulin G. The Russian researchers at the Institute of Molecular Genetics and the Zakusov Institute of Pharmacology took that native sequence and extended it with a Pro-Gly-Pro C-terminal tail — a modification that dramatically alters its pharmacokinetic and pharmacodynamic profile.\n\nThis is the crucial distinction. Tuftsin is an immune peptide with limited CNS penetration. Selank was deliberately engineered to retain tuftsin's immunomodulatory backbone while adding the neuroactive properties conferred by the Pro-Gly-Pro extension — a motif shared with the structurally related nootropic Semax. The result is a compound that lives at the intersection of neuropeptide and immune signalling, capable of reducing anxiety, supporting cognition, and modulating cytokine expression without the sedative baggage of conventional anxiolytics.\n\nSelank has been approved for clinical use in Russia since 2009, where it is prescribed under the brand name Selank (Селанк) for the treatment of anxiety disorders and generalized anxiety disorder (GAD). It is classified as a prescription anxiolytic with nootropic adjunct properties — a far cry from the benzodiazepine-centred anxiety treatment paradigm that dominates Western medicine.\n\n[**Compare Selank prices from UK suppliers →**](/compounds/selank)",
    },
    {
      title: "How Selank Works",
      body: "Selank's mechanism of action is multi-target and system-level — it is not a one-receptor compound. It modulates GABAergic signalling, influences monoaminergic tone, regulates neurotrophic factor expression, and interacts with the immune system through its tuftsin heritage. Below are the four primary pathways that define its pharmacological profile.",
      subsections: [
        {
          title: "GABAergic Modulation — Allosteric, Not Agonistic",
          body: "This is the single most important mechanism difference between Selank and conventional benzodiazepines. Benzodiazepines are positive allosteric modulators of GABA-A receptors — they bind at the interface of the α and γ subunits, potentiating GABA's effect. But they do so non-discriminately, amplifying GABA signalling across all neural circuits simultaneously. That is why benzodiazepines produce sedation, ataxia, anterograde amnesia, and dependence potential.\n\nSelank takes a fundamentally different approach. Research demonstrates that Selank modulates GABAergic transmission through an allosteric mechanism that does not involve direct receptor agonism or benzodiazepine-site binding. In electrophysiological studies, Selank increased the amplitude of GABA-evoked currents in hippocampal neurons without altering baseline chloride conductance — meaning it tunes the response rather than flipping the switch. The effect is subtle, circuit-selective, and self-limiting.\n\nA 2010 study (PMID: 20531176) examined Selank's interaction with the GABA-A receptor complex and found that it modulates the conformation of the receptor in a way that differs from both GABA itself and benzodiazepines. Selank does not compete with GABA at the orthosteric site nor with benzodiazepines at the benzodiazepine site. Instead, it appears to stabilise a specific conformational state of the receptor that favours controlled inhibitory tone without the broad-spectrum suppression characteristic of sedative-hypnotics.",
        },
        {
          title: "Serotonin & Dopamine Influence",
          body: "Selank modulates monoamine neurotransmitter systems — specifically serotonin (5-HT) and dopamine — in brain regions relevant to anxiety and cognition.\n\nIn rodent models, Selank administration increases serotonin turnover in the frontal cortex and hippocampus, two regions central to mood regulation and anxiety processing. It also modulates dopamine metabolism in the striatum — the brain's motor and reward hub. The effect is not comparable to SSRIs (which block reuptake over weeks to produce a clinical response) or to psychostimulants (which force dopamine release). Selank's influence is subtler — it appears to tune the synthesis and degradation rates of these monoamines so that the system is more resilient to stress-induced perturbation.\n\nThe practical consequence is an anxiolytic effect that preserves (and may even improve) cognitive function — a pattern that sets Selank apart from classical anxiolytics that blunt cognitive performance in direct proportion to their anxiety-reducing effect.",
        },
        {
          title: "BDNF Signalling",
          body: "Selank upregulates brain-derived neurotrophic factor (BDNF) expression in the hippocampus and frontal cortex — a mechanism shared with structurally related peptides like Semax. BDNF is the master regulator of synaptic plasticity, neurogenesis, and neuronal survival. By increasing BDNF mRNA and protein levels, Selank creates the molecular conditions for improved learning, memory consolidation, and resilience to stress.\n\nThis BDNF upregulation is not an immediate ion-channel effect — it begins within hours of administration and persists for a sustained period. This means Selank's nootropic and anxiolytic effects are not just a matter of acute neurotransmitter modulation; they involve genuine changes in gene expression and synaptic architecture that support long-term neural health.",
        },
        {
          title: "Neuroimmune Interface — IL-6 Modulation",
          body: "Selank's tuftsin heritage gives it a unique place among anxiolytics: it directly modulates the immune system. Tuftsin is a well-characterised immunomodulatory peptide that activates macrophages, enhances phagocytosis, and regulates cytokine production. Selank retains this immunomodulatory capacity while adding CNS activity.\n\nResearch shows that Selank downregulates IL-6 gene expression — a pro-inflammatory cytokine implicated in anxiety, depression, and neuroinflammation. Elevated IL-6 is a well-documented biomarker of chronic stress and mood disorders. By reducing IL-6 levels, Selank addresses the neuroinflammatory component of anxiety — something benzodiazepines do not touch.\n\nThis dual neuro-immune mechanism positions Selank as a compound that treats anxiety not as a purely neurological event, but as a system-level phenomenon involving the brain, the immune system, and the endocrine axis. It is an anxiety treatment that also talks to your macrophages.",
        },
      ],
    },
    {
      title: "Anxiolytic Research Without Sedation",
      body: "The most striking feature of Selank's research profile — and the claim that most consistently captures the attention of researchers — is its ability to reduce anxiety without producing sedation, cognitive impairment, or dependence. This is not marketing copy. It is a consistent finding across multiple preclinical and clinical studies conducted over two decades.\n\nLet us examine the evidence.\n\n**Clinical Anxiety Study (PMID: 20015478):** A double-blind, placebo-controlled clinical trial evaluated Selank in patients with generalized anxiety disorder (GAD). Selank was administered intranasally at doses of 500–1000 mcg per day over a 14-day period. The results: statistically significant reduction in anxiety scores on the Hamilton Anxiety Rating Scale (HAM-A) and the Spielberger State-Trait Anxiety Inventory (STAI) compared with placebo. Critically, the anxiolytic effect reached significance by day 7 and persisted through the study endpoint. No sedation, no cognitive blunting, no ataxia.\n\n**Allosteric GABA-A Modulation (PMID: 20531176):** As discussed in the mechanisms section, Selank's allosteric modulation of GABA-A receptors produces a fundamentally different profile from direct agonists or benzodiazepine-site modulators. The study confirmed that Selank does not bind to the benzodiazepine site and does not produce the characteristic EEG changes associated with sedative-hypnotics (increased beta activity, decreased alpha activity). Instead, EEG recordings showed an increase in alpha rhythm power — a pattern associated with relaxed alertness rather than sedation.\n\n**Dependence and Withdrawal:** A comparative study of Selank and diazepam found that, unlike diazepam, Selank did not produce dependence or withdrawal signs after abrupt discontinuation in animal models. Rats treated with Selank for 21 days showed no behavioural signs of withdrawal when the compound was stopped — in direct contrast to diazepam-treated animals, which exhibited characteristic withdrawal symptoms including increased anxiety, tremors, and seizure susceptibility.\n\nThe implications are significant. Selank demonstrates what an ideal anxiolytic should look like in research: anxiety reduction that is separable from sedation and cognitive impairment, with a dependence profile that does not require dose tapering on discontinuation.",
    },
    {
      title: "Nootropic & Cognitive Support",
      body: "Selank is not classified as a primary nootropic in the way Semax or noopept are — but it demonstrates consistent cognitive-supporting effects, primarily mediated through anxiolysis and BDNF upregulation.\n\n**Indirect Cognitive Enhancement Through Anxiety Reduction:** This is the most parsimonious explanation for Selank's nootropic effect. Anxiety consumes cognitive bandwidth. A person (or animal) under chronic anxiety has impaired working memory, reduced attentional control, and compromised executive function. By reducing anxiety, Selank effectively frees up neural resources for higher-order cognitive processing. The effect is not that Selank directly sharpens memory — it removes the fog that anxiety places over cognition.\n\n**Connectomics Study (PMID: 28089837):** A functional MRI study of Selank's effects on brain connectivity patterns — a connectomics analysis — demonstrated that Selank increases the efficiency of information transfer between brain networks. Specifically, Selank enhanced functional connectivity in the frontoparietal network (associated with attention and executive control) and improved the integration of the default mode network with task-positive networks. The result was faster and more efficient neural processing — the brain spent less energy moving information between regions.\n\n**BDNF-Mediated Plasticity:** The BDNF upregulation discussed above provides a molecular basis for improved cognitive resilience. BDNF supports long-term potentiation (LTP) — the cellular mechanism of memory formation — and promotes dendritic spine growth. In rodent models of stress-induced cognitive impairment, Selank restored LTP to near-baseline levels and prevented the stress-induced reduction in hippocampal spine density.\n\n**Practical Translation:** Researchers report that Selank does not produce the 'wired' or overstimulated feeling associated with classical nootropics like racetams or stimulants. Instead, it produces a state of calm clarity — reduced background anxiety without the mental flattening that comes with GABAergic full agonists. The brain is quieter, but not slower.",
    },
    {
      title: "Immunomodulatory Effects",
      body: "Selank's tuftsin lineage means it carries immunomodulatory activity that no conventional anxiolytic can claim. This is not a side effect — it is a core feature of the compound's design.\n\n**Tuftsin Heritage:** Tuftsin (Thr-Lys-Pro-Arg) is a naturally occurring tetrapeptide that activates macrophages, stimulates phagocytosis, and enhances antigen presentation. It is part of the innate immune system's signalling toolkit. Selank incorporates the full tuftsin sequence at its N-terminus — Thr-Lys-Pro-Arg — and extends it with Pro-Gly-Pro. This means Selank retains the molecular recognition elements that allow it to interact with tuftsin receptors on immune cells.\n\n**Macrophage Activation:** Preclinical studies demonstrate that Selank stimulates macrophage activity in a dose-dependent manner. Macrophages are the first responders of the immune system — they engulf pathogens, present antigens, and coordinate the inflammatory response. Selank's activation of these cells is not indiscriminate; it appears to prime macrophages for a controlled response rather than triggering a full-blown inflammatory cascade.\n\n**IL-6 Gene Expression (PMID: 24625623):** A 2014 study examined Selank's effect on cytokine gene expression in the brain and found that it significantly downregulates IL-6 mRNA levels. IL-6 is a double-edged cytokine — it is essential for acute immune responses but chronically elevated levels are associated with anxiety, depression, chronic inflammation, and neurodegenerative diseases. By reducing IL-6 expression, Selank addresses the neuroinflammatory component of anxiety disorders — potentially explaining why its anxiolytic effects are sustained rather than subject to the tolerance seen with pure GABAergic agents.\n\n**Clinical Implications:** The immunomodulatory effects of Selank suggest it may be particularly relevant in stress-related conditions where the immune system is dysregulated — chronic stress states characterised by elevated pro-inflammatory cytokines and impaired immune surveillance. This positions Selank as a compound that treats the whole stress response, not just the subjective feeling of anxiety.",
    },
    {
      title: "Dosing & Administration",
      body: "All information below refers to laboratory research use and registered clinical protocols. Selank is a prescription medication in Russia and should be handled accordingly in research settings.\n\n**Clinical Administration:** In registered human clinical use, Selank is administered intranasally at doses of 500–1000 mcg (0.5–1.0 mg) per day, divided into 2–3 administrations. The intranasal route is essential — it allows Selank to bypass the blood-brain barrier via the olfactory and trigeminal nerve pathways, reaching the CNS within minutes. The half-life of Selank in plasma is short (minutes), but its effects persist for hours due to the cascade of downstream signalling events it initiates (BDNF upregulation, gene expression changes, cytokine modulation).\n\n**Research Use:** Selank is typically supplied as a lyophilised (freeze-dried) powder in 5 mg vials for reconstitution. Reconstitution protocol:\n\n- Add 2 mL of sterile saline or bacteriostatic water (0.9% benzyl alcohol) to a 5 mg vial.\n- This yields a concentration of 2.5 mg/mL (2500 mcg/mL).\n- For a 500 mcg dose, withdraw 0.2 mL (200 µL) of the reconstituted solution.\n- For a 1000 mcg dose, withdraw 0.4 mL (400 µL).\n\n**Storage:** Lyophilised Selank should be stored at −20°C (freezer). Once reconstituted, it is stable for 7–14 days at 2–8°C (refrigerator). Protect from light. Avoid repeated freeze-thaw cycles. Always verify purity and batch data via the Certificate of Analysis.\n\n**Intranasal Administration Protocol (Research):**\n1. Use a metered nasal spray bottle or a precision nasal atomiser.\n2. Tilt the head slightly forward, not backward (this maximises deposition on the olfactory epithelium).\n3. Administer half the dose in each nostril.\n4. Remain in the tilted position for 30–60 seconds after administration.\n5. Do not sniff forcefully — gentle inhalation only.\n\n[**Check current Selank prices from UK suppliers →**](/compounds/selank)",
    },
    {
      title: "Safety Profile",
      body: "Selank has a well-established safety profile supported by over a decade of clinical use in Russia and extensive preclinical testing.\n\n**Key safety observations from clinical and preclinical literature:**\n\n- **No sedation:** Selank's GABAergic modulation is allosteric and circuit-selective — it does not produce the drowsiness, ataxia, or cognitive blunting characteristic of benzodiazepines and other full GABA-A agonists.\n- **No dependence:** Long-term studies in animal models (up to 21 days of continuous administration) found no withdrawal signs upon abrupt discontinuation — a critical distinction from benzodiazepines, which produce dependence within weeks.\n- **No tolerance:** Unlike benzodiazepines and SSRIs (which often require dose escalation to maintain effect), Selank's anxiolytic effect appears to be sustained over time without dose adjustment.\n- **No hormonal disruption:** Selank does not affect cortisol levels, growth hormone, or thyroid function based on available clinical data.\n- **No hepatotoxicity:** Liver enzyme levels remain within normal ranges in both animal and human studies.\n- **Well-tolerated in clinical trials:** The most commonly reported side effects are mild and transient: lightheadedness in some individuals during the first 2–3 days, mild nasal irritation at the site of intranasal administration, and occasionally a transient change in blood pressure in sensitive individuals.\n\n**Contraindications:** Selank is contraindicated in pregnancy, breastfeeding, and in individuals with known hypersensitivity to any component of the formulation. It should not be used concurrently with benzodiazepines or other CNS depressants without careful evaluation, as the interaction profile has not been fully characterised.\n\nSelank has demonstrated a wide therapeutic index in animal studies, with no observed toxicity at doses significantly above the effective range. As with any research compound, it should be handled with appropriate laboratory precautions and studied under institutional ethics and biosafety oversight.\n\n[**Browse Selank supplier listings on ViralPeps →**](/compounds/selank)",
    },
  ],
  faq: [
    {
      question: "What is Selank and how does it work?",
      answer: "Selank is a synthetic heptapeptide analogue of the immunomodulatory peptide tuftsin, with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro. It was developed by Russian researchers and approved for clinical use in Russia since 2009 for anxiety disorders. Selank works through multiple mechanisms: allosteric modulation of GABA-A receptors (without benzodiazepine-site binding), modulation of serotonin and dopamine turnover, upregulation of BDNF, and regulation of IL-6 gene expression. This multi-target profile produces anxiety reduction without sedation, cognitive impairment, or dependence.",
    },
    {
      question: "How does Selank differ from benzodiazepines?",
      answer: "The key difference is in how Selank interacts with the GABA system. Benzodiazepines are positive allosteric modulators that bind to a specific site on GABA-A receptors and potentiate GABA's effect non-discriminately — producing sedation, ataxia, memory impairment, and strong dependence liability. Selank modulates GABAergic transmission through an allosteric mechanism that does not involve direct receptor agonism or benzodiazepine-site binding. The result is anxiety reduction that is separable from sedation — a pattern confirmed in clinical studies (PMID: 20015478) and electrophysiological research (PMID: 20531176). Selank also does not produce dependence or withdrawal upon discontinuation, in direct contrast to benzodiazepines.",
    },
    {
      question: "What is the typical dosage for Selank in research?",
      answer: "In registered clinical protocols, Selank is administered intranasally at 500–1000 mcg (0.5–1.0 mg) per day divided into 2–3 doses. Selank is typically supplied as a lyophilised powder in 5 mg vials. Reconstitution: add 2 mL of sterile saline or bacteriostatic water to yield 2.5 mg/mL. The intranasal route reaches the CNS within minutes via the olfactory nerve pathway. The plasma half-life is short (minutes), but downstream effects (BDNF upregulation, gene expression changes) persist for hours. Store lyophilised at −20°C; reconstituted solutions are stable 7–14 days at 2–8°C.",
    },
    {
      question: "Does Selank cause sedation or cognitive impairment?",
      answer: "No — this is Selank's defining advantage over conventional anxiolytics. Clinical and preclinical studies consistently demonstrate that Selank reduces anxiety without producing sedation, drowsiness, cognitive blunting, or ataxia. In EEG studies, Selank increases alpha rhythm power (associated with relaxed alertness) rather than beta activity (associated with sedation). A connectomics study (PMID: 28089837) showed that Selank increases the efficiency of neural information transfer — the opposite of cognitive impairment. Multiple clinical trials confirm that patients on Selank maintain normal cognitive function and reaction times throughout the treatment period.",
    },
    {
      question: "Can Selank be stacked with other research peptides?",
      answer: "Selank is structurally related to Semax (they share the Pro-Gly-Pro C-terminal motif and are both ACTH/tuftsin-family peptides), and the two are frequently studied together in research protocols for combined anxiolytic and nootropic effects — Selank provides anxiety reduction and immune modulation while Semax provides BDNF-driven cognitive enhancement. Selank has also been studied alongside BPC-157 in models of stress-induced gastrointestinal and neurological injury, given their complementary mechanisms. Researchers should exercise caution when combining Selank with other GABAergic compounds (including benzodiazepines, alcohol, or barbiturates) as the interaction profile has not been fully characterised.",
    },
  ],
  references: [
    "Kozlovskaya MM, et al. Clinical efficacy of Selank in the treatment of generalized anxiety disorder. Zh Nevrol Psikhiatr Im S S Korsakova. 2008;108(12):27-32. PMID: 20015478.",
    "V'yunova TV, et al. Selank modulates GABA(A) receptor complex in rat brain. Bull Exp Biol Med. 2010;149(4):439-441. PMID: 20531176.",
    "Levitskaya NG, et al. Nootropic and neuroprotective effects of Selank in animal models of cognitive impairment. Eksp Klin Farmakol. 2007;70(2):10-15. PMID: 17436044.",
    "Volgin AD, et al. Connectomic effects of Selank: functional MRI study of brain network efficiency in rats. Neural Plast. 2016;2016:8062350. PMID: 28089837.",
    "Uchakina ON, et al. Immunomodulatory effects of Selank: regulation of IL-6 and cytokine gene expression. Bull Exp Biol Med. 2014;157(1):68-71. PMID: 24625623.",
    "Sazonova NA, et al. Selank affects gene expression of neurotrophic factors in the rat CNS. Dokl Biochem Biophys. 2012;447:288-291. PMID: 23335884.",
    "Andreeva LA, et al. Structure-activity relationship of Selank and its analogues: the role of the Pro-Gly-Pro sequence. Russ J Bioorg Chem. 2013;39(3):239-246.",
    "Kovalev GI, et al. Selank modulates monoamine neurotransmitter systems in the brain of rats. Eksp Klin Farmakol. 2009;72(4):8-12. PMID: 19813323.",
  ],
},
"ghkcu-vs-bpc157": {
  slug: "ghkcu-vs-bpc157",
  compoundSlug: "",
  pullQuote:
    "GHK-Cu rewrites the genetic blueprint for repair across a third of your genome. BPC-157 walks into the injury site and rebuilds the roads, the scaffolding, and the plumbing. Together, they're the closest thing to a system-wide regeneration signal we've seen in peptide research.",
  quickInfo: [
    { label: "Classification", value: "GHK-Cu: Endogenous copper-binding tripeptide (matrikin) — BPC-157: Synthetic gastric pentadecapeptide (tissue protector)" },
    { label: "Molecular Weight", value: "GHK-Cu: ~403.9 g/mol (3 amino acids + Cu) — BPC-157: 1,419.6 g/mol (15 amino acids)" },
    { label: "Primary Mechanism", value: "GHK-Cu: Copper delivery → gene expression modulation (32.1% of human genes), collagen synthesis, stem cell recruitment — BPC-157: VEGF/HIF-1α-driven angiogenesis, NO signalling, fibroblast activation, collagen organisation" },
    { label: "Evidence Strength", value: "GHK-Cu: Strong preclinical + moderate human clinical (skin, wound healing) — BPC-157: Strong preclinical; limited human clinical data" },
    { label: "Tissue Focus", value: "GHK-Cu: Skin, hair follicles, wound healing, systemic anti-aging — BPC-157: Tendons, ligaments, GI tract, neural tissue, bone" },
    { label: "Angiogenesis", value: "GHK-Cu: Upregulates VEGF indirectly via gene modulation — BPC-157: Directly activates HIF-1α → VEGF axis for organised functional vascular networks" },
    { label: "Inflammation Control", value: "GHK-Cu: Suppresses NFkB nuclear translocation, reduces TNF-α/IL-1β/IL-6 — BPC-157: Reduces TNF-α and IL-6 while increasing anti-inflammatory IL-10" },
    { label: "Research Score (Injury & Tissue)", value: "GHK-Cu: 7.0/10 — BPC-157: 7.5/10" },
  ],
  sections: [
    {
      title: "The Two Giants of Regenerative Peptide Research",
      body: "If you spend any time in peptide research circles, two compounds keep coming up: GHK-Cu and BPC-157. They're the compounds everyone wants to compare, and for good reason — both sit at the top of the regenerative research pile, but they get there through fundamentally different routes.\n\nGHK-Cu is your body's own repair signal — an endogenous copper-binding tripeptide that declines with age and, when restored, influences over 4,000 genes involved in collagen synthesis, antioxidant defence, stem cell recruitment, and tissue remodelling. It's the system-wide orchestrator.\n\nBPC-157 is the focused tissue protector — a synthetic 15-amino-acid fragment of a gastric juice protein that drives angiogenesis, organises collagen deposition, modulates nitric oxide signalling, and stabilises the gut barrier. It's the precision repair crew.\n\nThis comparison breaks down exactly where they overlap, where they diverge, and how researchers are using them together to accelerate and improve tissue repair outcomes.\n\n[**Compare GHK-Cu prices from UK suppliers →**](/compounds/ghk-cu)\n[**Compare BPC-157 prices from UK suppliers →**](/compounds/bpc-157)",
    },
    {
      title: "GHK-Cu vs BPC-157: The Comparison Table",
      body: "Before we dive deep, here's a side-by-side look at how GHK-Cu and BPC-157 stack up across the categories that matter most in regenerative research.",
      table: {
        header: ["Category", "GHK-Cu", "BPC-157"],
        rows: [
          ["Origin", "Endogenous — naturally found in human plasma; declines from ~200 ng/mL (age 20) to ~80 ng/mL (age 60)", "Synthetic — derived from a protective protein in human gastric juice; not naturally circulating in tissues"],
          ["Amino Acids", "3 (Gly-His-Lys) + Cu²⁺ ion", "15 (Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val)"],
          ["Molecular Weight", "~403.9 g/mol (small copper complex)", "1,419.6 g/mol (medium peptide)"],
          ["Core Mechanism", "Copper delivery to Cu-dependent enzymes (lysyl oxidase, SOD) + genome-wide gene expression modulation", "VEGF/HIF-1α-driven angiogenesis + FGF/EGF modulation + NO signalling + collagen organisation"],
          ["Gene Regulation", "Affects ~32.1% of human genes — the broadest transcriptional effect of any known peptide", "Focused on repair gene networks (VEGF, TGF-β, eNOS, collagen) — targeted, not genome-wide"],
          ["Angiogenesis", "Indirect — upregulates angiogenic genes via broad transcriptomic shift", "Direct — supercharges HIF-1α → VEGF axis for organised, functional vasculature"],
          ["Collagen Effect", "Increases Type I and Type III collagen synthesis by 50–70%; suppresses MMPs that degrade matrix", "Activates fibroblasts via TGF-β1; produces organised collagen architecture with restored tensile strength"],
          ["Stem Cell Recruitment", "Direct chemoattractant — recruits CD34+ and CD117+ stem cells to injury sites", "Not a primary mechanism — acts through existing resident cell activation"],
          ["Inflammation", "Suppresses NFkB → reduces TNF-α, IL-1β, IL-6 while upregulating antioxidant enzymes (SOD, GPx, catalase)", "Balances pro-inflammatory (TNF-α, IL-6) and anti-inflammatory (IL-10) cytokines; promotes resolution over suppression"],
          ["Skin & Hair Research", "Strongest research footprint — topical and systemic data for collagen, wound healing, photoageing, hair follicle cycling", "Limited direct skin research; primary focus is tendon, ligament, GI, and neural tissue"],
          ["Gut & GI Research", "Minimal direct GI research — effects are systemic rather than gut-targeted", "Strongest preclinical data in gut barrier integrity, ulcer healing, and mucosal repair"],
          ["Tendon/Ligament Repair", "Moderate — supports through systemic collagen and gene modulation", "Strong — direct angiogenic and fibroblast activation at the injury site; restores tensile strength"],
          ["Neural / CNS Effects", "Moderate — BDNF upregulation, neuroprotection via gene modulation and copper homeostasis", "Moderate — crosses BBB, increases GH receptor sensitivity, supports neurite outgrowth and synaptogenesis"],
          ["Blood-Brain Barrier Penetration", "Limited data — likely low direct CNS penetration; effects may be systemic/secondary", "Yes — crosses BBB directly; documented neurotrophic and neuroprotective effects"],
          ["Stability", "Stable when complexed with copper; reconstituted solution lasts 7–14 days at 2–8°C", "Stable in gastric juice (acid-resistant); reconstituted solution stable for 7–14 days at 2–8°C"],
          ["Research Score (Injury & Tissue)", "7.0/10", "7.5/10"],
          ["Research Score (Recovery)", "6.0/10", "7.5/10"],
        ],
      },
    },
    {
      title: "How GHK-Cu Works: The Genome-Wide Orchestrator",
      body: "GHK-Cu is often mistaken for a 'skin peptide' because that's where the human data is strongest. In reality, it's one of the broadest-acting signalling molecules in the peptide research literature — and the numbers back that up.",
      subsections: [
        {
          title: "1. Copper Delivery Without Collateral Damage",
          body: "Copper is essential for life. Lysyl oxidase needs it to crosslink collagen and elastin. Superoxide dismutase (Cu/Zn-SOD) needs it to neutralise superoxide radicals. Cytochrome c oxidase needs it for mitochondrial respiration. But free copper ions are toxic — they generate hydroxyl radicals via Fenton chemistry and damage DNA, proteins, and lipids.\n\nGHK-Cu solves this dilemma by binding copper in a redox-stable square-planar geometry. The histidine residue coordinates the copper ion tightly, preventing the redox cycling that makes free copper dangerous. The complex delivers copper directly to cuproenzymes without releasing free Cu²⁺ into the cellular environment. This precision delivery system is the foundation on which all of GHK-Cu's other effects are built.",
        },
        {
          title: "2. Gene Expression Control — 32.1% of the Human Genome",
          body: "This is the number that separates GHK-Cu from every other peptide in this comparison. In a landmark microarray study of human fibroblast gene expression, GHK-Cu was found to upregulate or downregulate an estimated 32.1% of all human genes — roughly 4,000 to 5,000 genes depending on the reference genome build (Pickart et al., 2012, PMID: 22879172).\n\nTo put that in perspective: most pharmaceutical drugs affect one or two gene products. BPC-157 influences a focused set of repair-related gene networks. GHK-Cu shifts the expression of a third of the entire genome toward tissue remodelling, antioxidant defence, cell proliferation, and extracellular matrix synthesis. It doesn't target a single pathway — it reprograms the operating system.",
        },
        {
          title: "3. Collagen Synthesis and Matrix Remodelling",
          body: "GHK-Cu directly activates dermal fibroblasts, upregulating collagen Type I, collagen Type III, and elastin production through TGF-β signalling pathways. Simultaneously, it suppresses matrix metalloproteinases (MMP-1, MMP-2, MMP-9) that break down the extracellular matrix.\n\nThe net effect is a dramatic shift from matrix degradation to matrix deposition. In human skin explant models, GHK-Cu treatment increased collagen production by 50–70% and elastin by 60–100%. The newly deposited collagen also showed improved fibril organisation — thicker, more crosslinked bundles that approach the architecture of youthful tissue.",
        },
        {
          title: "4. Stem Cell Recruitment — Waking Up the Repair Pool",
          body: "GHK-Cu acts as a chemoattractant for stem cells — a mechanism that BPC-157 does not share. In wound healing models, GHK-Cu recruits CD34+ and CD117+ stem cells to the site of injury, pulling dormant progenitor cells out of their niche and into the repair zone.\n\nThis is fundamentally different from most growth factors, which typically act on already-active cells. GHK-Cu wakes up the dormant stem cell pool. In burn wound models, sites treated with GHK-Cu showed significantly higher stem cell infiltration and accelerated re-epithelialisation compared with untreated controls.",
        },
        {
          title: "5. Antioxidant and Anti-Inflammatory Control",
          body: "GHK-Cu suppresses NFkB nuclear translocation — the master switch for the inflammatory cascade. By reducing TNF-α, IL-1β, and IL-6 expression, it shifts the inflammatory environment from destructive chronic activation toward controlled, acute-phase resolution.\n\nAt the same time, it upregulates antioxidant enzymes including glutathione peroxidase, catalase, and Cu/Zn-SOD. The combined effect is a cell that is both less inflamed and better protected against oxidative damage — two conditions essential for organised tissue repair to proceed without interference.",
        },
      ],
    },
    {
      title: "How BPC-157 Works: The Precision Repair Engineer",
      body: "Where GHK-Cu casts a wide net over the genome, BPC-157 operates with targeted precision on the tissue repair machinery. It doesn't rewrite the operating system — it fixes the broken pipes, reinforces the structural beams, and restores blood flow to the construction site.",
      subsections: [
        {
          title: "1. Drives Organised Angiogenesis via HIF-1α → VEGF",
          body: "When tissue gets injured, it becomes hypoxic (low oxygen). That activates HIF-1α, which in turn activates VEGF — the body's road-building crew for new circulation. BPC-157 supercharges this HIF-1α → VEGF axis.\n\nThe critical distinction: BPC-157 produces organised, functional vascular infrastructure — not the chaotic, tumour-like vessel growth seen in pathological angiogenesis. More oxygen, more nutrients, better delivery, faster waste removal. It builds real roads, not demolition derbies. This is the mechanism that most clearly separates BPC-157 from GHK-Cu, which influences angiogenesis indirectly through broad gene modulation rather than direct pathway activation.",
        },
        {
          title: "2. Turns Fibroblasts Into a Rebuilding Machine",
          body: "Once blood supply improves, structural rebuilding follows. BPC-157 amplifies TGF-β1 signalling, which activates fibroblasts and ramps up production of Type I collagen, Type III collagen, fibronectin, and elastin — the structural proteins required for organised tissue repair.\n\nThe result is regeneration with reinforcement: stronger, better-organised collagen architecture rather than disorganised scar tissue. Studies suggest BPC-157 helps tissue heal with tensile strength that approaches the uninjured original — a degree of functional restoration that goes beyond what simple wound closure measurements capture.",
        },
        {
          title: "3. Restores Blood Flow Through Nitric Oxide Signalling",
          body: "BPC-157 enhances eNOS (endothelial nitric oxide synthase) activity, increasing nitric oxide production. NO relaxes vascular smooth muscle via the cGMP pathway, improving local blood flow and perfusion to injured tissues.\n\nThis is the mechanism that flips the body from breakdown into rebuild. Better circulation means better fuel delivery and better waste clearance — the essential conditions for repair to actually happen. GHK-Cu doesn't have a direct NO-signalling mechanism, which makes this a distinct advantage for BPC-157 in hypoxic or poorly perfused tissue environments.",
        },
        {
          title: "4. Controls Inflammation Without Sabotaging Healing",
          body: "BPC-157 doesn't suppress the immune system — it negotiates with it. It reduces pro-inflammatory cytokines like TNF-α and IL-6 while simultaneously increasing anti-inflammatory IL-10. The goal isn't suppression. It's resolution — moving tissue from chaotic destruction into organised reconstruction.\n\nThis is fundamentally different from NSAIDs, which block inflammation signals but also block the signalling needed for repair. It's also distinct from GHK-Cu's approach, which suppresses inflammation primarily through NFkB inhibition — both are effective, but they operate through different nodes of the inflammatory cascade.",
        },
        {
          title: "5. Neural and Gastrointestinal Protection",
          body: "BPC-157 crosses the blood-brain barrier and increases growth hormone receptor sensitivity in the central nervous system. Preclinical evidence indicates it supports neurite outgrowth, synaptogenesis, and protection against excitotoxic injury. This CNS penetration gives BPC-157 a research profile in neural recovery that GHK-Cu — with limited BBB data — doesn't currently match.\n\nOn the GI front, BPC-157 was originally discovered for its gastroprotective properties. Research demonstrates it supports tight-junction integrity, mucosal defence, and healing of intestinal ulcers — combining cytoprotection, vascular repair, and collagen rebuilding in the gut lining. GHK-Cu has minimal direct GI research, making this another area where the compounds diverge in their research applications.",
        },
      ],
    },
    {
      title: "Where They Overlap: The Shared Mechanisms",
      body: "Despite their different origins and primary mechanisms, GHK-Cu and BPC-157 converge on several important biological endpoints. Understanding these overlaps helps explain why researchers are increasingly interested in using them together.",
      subsections: [
        {
          title: "Both Support Angiogenesis",
          body: "GHK-Cu upregulates VEGF and other angiogenic genes through its broad transcriptomic effects. BPC-157 directly activates the HIF-1α → VEGF signalling cascade. Both compounds increase vascular density at repair sites — GHK-Cu through gene network modulation, BPC-157 through direct pathway activation. The net effect is improved oxygenation and nutrient delivery to healing tissue, though BPC-157's effect is more rapid and direct.",
        },
        {
          title: "Both Drive Collagen Production and Organisation",
          body: "Both compounds shift the balance of collagen metabolism from degradation toward synthesis. GHK-Cu upregulates collagen genes while suppressing MMPs through genome-wide regulation. BPC-157 activates fibroblasts via TGF-β1 and produces organised collagen architecture. Both lead to improved matrix quality — but GHK-Cu's effect is broader (Type I, Type III, and elastin), while BPC-157's effect is more focused on tensile strength restoration.",
        },
        {
          title: "Both Modulate Inflammation Rather Than Suppressing It",
          body: "Neither compound is an anti-inflammatory drug in the traditional sense. GHK-Cu suppresses NFkB nuclear translocation and reduces TNF-α, IL-1β, and IL-6. BPC-157 reduces TNF-α and IL-6 while increasing IL-10. Both aim for inflammatory resolution — moving tissue from chaotic destruction into organised reconstruction — rather than blanket immune suppression. This shared philosophy of controlled resolution is a key reason they work well together.",
        },
      ],
    },
    {
      title: "Where They Diverge: The Critical Differences",
      body: "The differences between GHK-Cu and BPC-157 are as important as the similarities — and they determine which compound is appropriate for which research application.",
      subsections: [
        {
          title: "Breadth vs Precision of Action",
          body: "GHK-Cu influences an estimated 32.1% of human genes — affecting everything from antioxidant enzymes to stem cell homing receptors to matrix remodelling proteins. It's a system-wide signal that the body interprets as 'repair everything.'\n\nBPC-157, by contrast, targets a focused set of repair pathways: VEGF-driven angiogenesis, TGF-β fibroblast activation, eNOS-mediated vasodilation, and cytokine balance. It's the master locksmith, not the system rebooter. If GHK-Cu is a new operating system, BPC-157 is a skilled engineer who walks in, identifies the broken systems, and fixes them one by one.",
        },
        {
          title: "Tissue-Specific Research Footprints",
          body: "GHK-Cu's strongest research footprint is in skin and hair — topical and systemic applications for wound healing, photoageing, collagen restoration, and hair follicle cycling. Its human clinical data is strongest in these areas, driven by decades of cosmetic and dermatological research.\n\nBPC-157's strongest preclinical data is in tendons, ligaments, the gastrointestinal tract, and neural tissue — areas where blood supply is limited and organised collagen architecture is critical for functional recovery. It has almost no direct human clinical data for systemic use, but its preclinical breadth across multiple tissue types is unmatched by almost any other peptide.",
        },
        {
          title: "Endogenous vs Exogenous Status",
          body: "GHK-Cu is naturally present in human plasma at approximately 200 ng/mL at age 20, declining to approximately 80 ng/mL by age 60. It's an endogenous signalling molecule that your body already knows how to use, process, and regulate. Supplementing it in research restores levels to a more youthful state — it's replenishing a signal that's naturally depleted.\n\nBPC-157 is synthetic — a fragment of a gastric juice protein, but not a peptide that circulates systemically in the body. It's an exogenous compound that the body recognises as a repair signal but does not naturally produce in the amounts used in research. This isn't a problem for safety (BPC-157 has a wide therapeutic margin), but it's a fundamental difference in how the body processes and regulates each compound.",
        },
      ],
    },
    {
      title: "Stacking GHK-Cu and BPC-157: The Research Synergy",
      body: "If you've been reading carefully, you've probably already spotted the synergy: GHK-Cu sets the genomic stage for repair, while BPC-157 executes the focused tissue restoration. Researchers studying tissue repair are increasingly combining these two compounds precisely because their mechanisms are complementary rather than redundant.\n\n**The theoretical basis for stacking:**\n\n1. **GHK-Cu first** — Its genome-wide gene modulation shifts the cellular environment toward repair mode, upregulating collagen genes, antioxidant enzymes, and stem cell recruitment signals. This takes 24–48 hours to fully manifest as the transcriptomic changes propagate through protein synthesis.\n\n2. **BPC-157 alongside** — BPC-157's direct angiogenic and fibroblast-activating effects provide the immediate mechanical repair response. While GHK-Cu reprograms the system, BPC-157 builds the new blood vessels, organises the collagen matrix, and improves perfusion to the injury site.\n\n3. **Combined inflammation control** — GHK-Cu suppresses NFkB-driven inflammation. BPC-157 balances pro- and anti-inflammatory cytokines. Together they provide redundant and complementary inflammatory resolution pathways, potentially reducing the risk of both uncontrolled inflammation and over-suppression.\n\n**Common research stack protocols:** GHK-Cu at 1–2 mg/day combined with BPC-157 at 200–800 mcg/day, administered in separate injection sites to avoid local competition. Some protocols alternate days rather than co-administering. Always verify compatibility, purity, and endotoxin levels via the Certificate of Analysis before combining any research compounds.\n\n[**Compare GHK-Cu prices from UK suppliers →**](/compounds/ghk-cu)\n[**Compare BPC-157 prices from UK suppliers →**](/compounds/bpc-157)",
    },
    {
      title: "Research Applications: Which Compound for Which Goal?",
      body: "Choosing between GHK-Cu and BPC-157 depends on your specific research question. Here's a practical guide to which compound aligns with which research area.",
      subsections: [
        {
          title: "Skin, Wound Healing, and Anti-Aging Research → GHK-Cu",
          body: "GHK-Cu is the clear choice for research involving dermal repair, collagen restoration, photoageing, and hair follicle cycling. Its human clinical data in topical applications is unmatched by BPC-157. If your research question involves the skin, extracellular matrix remodelling, or age-related decline in tissue quality, GHK-Cu should be your primary compound. The genome-wide gene modulation effects are particularly relevant for understanding how aging tissues lose their regenerative capacity and how it might be restored.",
        },
        {
          title: "Tendon, Ligament, GI, or Neural Repair → BPC-157",
          body: "BPC-157 is the stronger choice for research involving tissues with limited blood supply (tendons, ligaments), the gastrointestinal barrier, or neural recovery. Its direct angiogenic pathway activation and focused fibroblast recruitment are better suited to these applications than GHK-Cu's broader but less targeted approach. If your research involves functional recovery of tensile strength, gut barrier integrity, or neuroprotection after injury, BPC-157 is likely the more appropriate compound.",
        },
        {
          title: "Systemic Tissue Repair and Multi-Tissue Studies → Combined",
          body: "For research questions that involve whole-organism recovery from injury, stress, or age-related decline, the combination of GHK-Cu and BPC-157 may be more informative than either compound alone. GHK-Cu provides the system-wide transcriptomic shift toward repair, while BPC-157 delivers focused angiogenic and fibroblast activation at specific injury sites. Researchers studying multimodal regeneration or the interaction between systemic signalling and local repair mechanisms will find the combined approach particularly useful.",
        },
        {
          title: "Gene Expression and Epigenetic Research → GHK-Cu",
          body: "No other peptide comes close to GHK-Cu's effect on the transcriptome. If your research question involves gene regulation, epigenetic modulation, or the molecular mechanisms of tissue repair at the genomic level, GHK-Cu is the compound of choice. Its effect on 32.1% of human genes makes it a uniquely powerful tool for studying how aging, injury, and environmental stress alter gene expression patterns — and how those changes might be reversed or modulated.",
        },
      ],
    },
    {
      title: "Safety and Tolerability Comparison",
      body: "Both GHK-Cu and BPC-157 have demonstrated wide safety margins in their respective research contexts, but there are important differences in their safety profiles that researchers should consider.",
      subsections: [
        {
          title: "GHK-Cu Safety Profile",
          body: "GHK-Cu is exceptionally well-tolerated across multiple animal and human studies. As an endogenous compound naturally present in human plasma, it's a molecule the body already knows how to process. Key safety data: no observed toxicity in animal studies at doses up to 10× the effective range; human topical studies (0.5–2% creams) show no significant adverse effects beyond mild, transient irritation; no known drug-drug interactions at research doses; injection-site reactions are limited to mild erythema and transient pruritus. The age-related decline in endogenous GHK-Cu levels (from ~200 ng/mL at age 20 to ~80 ng/mL at age 60) provides the biological rationale for supplementation — you're restoring, not super-physiologically dosing.",
        },
        {
          title: "BPC-157 Safety Profile",
          body: "BPC-157 has demonstrated a wide safety margin in preclinical studies, with no observed toxicity at doses significantly above the effective range. The compound is remarkably stable in gastric juice, consistent with its origin in the stomach lining. Reported side effects in research contexts are minimal and primarily relate to injection-site reactions. The most important caveat: BPC-157 is a synthetic peptide with no endogenous circulating equivalent, so its long-term safety profile at systemic doses is less well-characterised than GHK-Cu's. Researchers should exercise standard caution with dosing, purity verification, and ethical oversight. BPC-157 is strictly for laboratory research use and must not be administered to humans outside regulated clinical settings.",
        },
      ],
    },
  ],
  faq: [
    {
      question: "What are the main differences between GHK-Cu and BPC-157?",
      answer: "GHK-Cu is an endogenous copper-binding tripeptide that modulates an estimated 32.1% of human genes — making it a system-wide orchestrator of tissue repair, collagen synthesis, antioxidant defence, and stem cell recruitment. BPC-157 is a synthetic 15-amino-acid gastric pentadecapeptide with focused effects on angiogenesis (HIF-1α/VEGF pathway), fibroblast activation, nitric oxide signalling, and cytokine balance. GHK-Cu casts the widest net in the genome; BPC-157 delivers precision repair at the injury site. GHK-Cu's strongest research is in skin and wound healing; BPC-157's strongest preclinical data is in tendon, ligament, GI, and neural repair.",
    },
    {
      question: "Can GHK-Cu and BPC-157 be used together in research?",
      answer: "Yes — and the rationale is strong. GHK-Cu sets the genomic stage for repair by upregulating thousands of genes involved in collagen synthesis, antioxidant defence, and stem cell recruitment, creating a tissue-wide environment primed for regeneration. BPC-157 then executes focused repair at specific injury sites through direct angiogenesis, fibroblast activation, and collagen organisation. Their mechanisms are complementary (not redundant), and they target different nodes of the inflammatory cascade — GHK-Cu through NFkB suppression, BPC-157 through cytokine balance. A typical research stack protocol might use GHK-Cu at 1–2 mg/day and BPC-157 at 200–800 mcg/day, administered in separate injection sites or on alternating days. Researchers should always verify purity and compatibility via the Certificate of Analysis before combining compounds.",
    },
    {
      question: "Which peptide is better for tendon and ligament repair research?",
      answer: "BPC-157 is generally considered the stronger choice for tendon and ligament repair research. Its direct activation of the HIF-1α/VEGF angiogenic pathway addresses the fundamental problem with these tissues — poor blood supply — while its TGF-β1-mediated fibroblast activation promotes organised collagen architecture that restores tensile strength. Preclinical studies show BPC-157 helps tissue heal with tensile strength approaching the uninjured original. GHK-Cu contributes through its systemic effects on collagen gene expression and matrix remodelling, making it a useful adjunct, but BPC-157's focused mechanisms are better aligned with the specific challenges of tendon and ligament repair.",
    },
    {
      question: "Which compound has stronger human clinical data?",
      answer: "GHK-Cu has stronger human clinical data, primarily in topical skin applications. Decades of cosmetic and dermatological research have evaluated GHK-Cu in human subjects for wound healing, photoageing, collagen restoration, and hair growth. BPC-157, by contrast, has very limited human clinical data for systemic use — the vast majority of its evidence base comes from preclinical animal models across multiple tissue types (tendon, ligament, GI tract, neural tissue, bone, liver). For a researcher prioritising translational potential, GHK-Cu offers a clearer bridge to human applications, while BPC-157 offers broader preclinical tissue coverage with less human validation.",
    },
    {
      question: "How do their molecular properties compare for research handling?",
      answer: "GHK-Cu has a molecular weight of approximately 403.9 g/mol (the copper complex of a 3-amino-acid peptide) — significantly smaller than BPC-157 at 1,419.6 g/mol (a 15-amino-acid peptide). GHK-Cu's small size and copper-stabilised structure make it highly soluble and stable when properly complexed. BPC-157 is similarly stable in solution, with the notable advantage of being acid-stable (resistant to gastric juice degradation). Both are supplied as lyophilised powders requiring reconstitution. GHK-Cu typically comes in 50 mg vials; common reconstitution is 3 mL bacteriostatic water yielding ~16.67 mg/mL. BPC-157 is commonly supplied in 5 mg or 10 mg vials. Both should be stored at 2–8°C once reconstituted and are stable for 7–14 days. Neither should be frozen after reconstitution as ice crystal formation can degrade the peptide structure.",
    },
  ],
  references: [
    "Pickart L, Vasquez-Soltero JM, Margolina A. GHK-Cu may prevent oxidative stress in skin by regulating copper and modifying gene expression. Int J Mol Sci. 2012;13(11):15271-84. PMID: 23203115.",
    "Pickart L, Margolina A. Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data. Int J Mol Sci. 2018;19(7):1987. PMID: 29986466.",
    "Seiwerth S, et al. BPC 157 and angiogenesis. Front Pharmacol. 2021;12:722613.",
    "Sikiric P, et al. BPC 157: a pentadecapeptide with multiple therapeutic effects. Curr Pharm Des. 2014;20(7):1078-85.",
    "Maquart FX, Bellon G, Chaqour B, et al. In vivo stimulation of connective tissue accumulation by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+ in rat experimental wounds. J Clin Invest. 1993;92(5):2368-76. PMID: 8227353.",
    "Staresinic M, et al. Stable gastric pentadecapeptide BPC 157 and wound healing. J Physiol Pharmacol. 2018;69(4).",
    "Pickart L. The human tripeptide GHK-Cu in prevention of skin photoaging and wound healing. J Biomater Sci Polym Ed. 2008;19(8):969-80. PMID: 18644225.",
    "Cesarec V, et al. BPC 157 and the central nervous system. Neurosci Lett. 2020;735:135158.",
  ],
},
"retatrutide-vs-tirzepatide": {
  slug: "retatrutide-vs-tirzepatide",
  compoundSlug: "",
  pullQuote:
    "If tirzepatide is the dual-engine jet that redefined metabolic flight, retatrutide is the prototype with three afterburners — and the data suggests we haven't seen the ceiling yet.",
  quickInfo: [
    { label: "Article Type", value: "Head-to-Head Comparison" },
    { label: "Compounds", value: "Retatrutide vs Tirzepatide" },
    { label: "Developer", value: "Eli Lilly (both compounds)" },
    { label: "Mechanism", value: "Triple GIP/GLP-1/Glucagon (retatrutide) vs Dual GIP/GLP-1 (tirzepatide)" },
    { label: "Max Weight Loss", value: "24.2% at 48 wks (retatrutide) vs 20.9% at 72 wks (tirzepatide)" },
    { label: "Liver Fat Reduction", value: "82.4% (retatrutide) vs 42–59% (tirzepatide)" },
    { label: "Regulatory Status", value: "Phase 3 investigational (retatrutide) vs FDA-approved (tirzepatide)" },
    { label: "Primary Research Areas", value: "Obesity, T2D, MASLD/MASH, energy expenditure" },
  ],
  sections: [
    {
      title: "Retatrutide vs Tirzepatide: The Two Titans of Incretin Science Compared",
      body: "Both retatrutide (LY3437943) and tirzepatide (LY3298176) are Eli Lilly-engineered incretin peptides that share a common structural logic — a peptide backbone modified with a fatty acid chain for albumin binding to enable once-weekly dosing. Both activate GIP and GLP-1 receptors. Both have produced weight loss figures that would have seemed impossible a decade ago.\n\nBut they are not the same molecule. The difference is the glucagon receptor. Retatrutide is a first-in-class triple agonist that activates GLP-1, GIP, and glucagon receptors. Tirzepatide stops at two. That third receptor — glucagon — unlocks a fundamentally different metabolic lever: energy expenditure, thermogenesis, and hepatic fat mobilisation.\n\nThis article is a side-by-side comparison of both compounds across mechanism, clinical weight loss data, liver fat reduction, regulatory standing, and practical research considerations. Whether you are evaluating which compound to study or simply trying to understand where the incretin field is heading, the comparison below lays out the evidence.\n\n[**Explore Retatrutide supplier prices →**](/compounds/retatrutide) [**Explore Tirzepatide supplier prices →**](/compounds/tirzepatide)",
    },
    {
      title: "Mechanism of Action: Two Receptors vs Three",
      body: "The most fundamental difference between these two compounds is the number of receptor pathways they activate. Understanding that difference explains everything else — weight loss magnitudes, liver fat clearance, energy expenditure, and trial outcomes.",
      table: {
        header: ["Parameter", "Retatrutide", "Tirzepatide"],
        rows: [
          ["Mechanism", "Triple GIP/GLP-1/Glucagon receptor agonist", "Dual GIP/GLP-1 receptor agonist"],
          ["GLP-1 Activity", "Full agonist — appetite suppression, gastric slowing, glucose-dependent insulin secretion", "Full agonist — same GLP-1 pathway, comparable potency"],
          ["GIP Activity", "Full agonist — insulin amplification, lipid partitioning, adipose glucose uptake", "Full agonist — balanced GIP agonism is tirzepatide's defining advantage over GLP-1-only agents"],
          ["Glucagon Activity", "Full agonist — thermogenesis, lipolysis, hepatic fat oxidation, increased resting energy expenditure", "None — tirzepatide does not activate the glucagon receptor"],
          ["Primary Energy Balance Lever", "Reduced intake (GLP-1) + increased output (glucagon)", "Reduced intake (GLP-1) + improved partitioning (GIP)"],
          ["Half-Life", "~6 days — once-weekly dosing", "~5 days — once-weekly dosing"],
          ["Albumin Binding", "Fatty acid modification for albumin binding", "Fatty acid modification (C20 diacid) for albumin binding"],
        ],
      },
    },
    {
      title: "Weight Loss Data: Retatrutide vs Tirzepatide Head-to-Head",
      body: "Both compounds have produced exceptional weight loss in their respective clinical trial programmes, but the magnitudes differ — and the trial durations differ too, which matters when comparing numbers directly. Let us lay out the data as it stands.",
      table: {
        header: ["Parameter", "Retatrutide", "Tirzepatide"],
        rows: [
          ["Trial Programme", "Phase 2 (NCT04881760) — Lancet, 2024", "SURMOUNT-1 (Phase 3) — NEJM, 2022"],
          ["Dose Range Studied", "1–12 mg once weekly", "5–15 mg once weekly"],
          ["Maximum Mean Weight Loss", "24.2% at 48 weeks (12 mg dose)", "20.9% at 72 weeks (15 mg dose)"],
          ["Weight Loss at 8 mg Dose", "22.0% at 48 weeks", "19.5% at 72 weeks (10 mg dose)"],
          ["Weight Loss at 4 mg Dose", "18.7% at 48 weeks", "15.0% at 72 weeks (5 mg dose)"],
          ["≥5% Weight Loss Achievers (max dose)", "100% of participants", "~92% of participants"],
          ["≥15% Weight Loss Achievers (max dose)", "79% of participants", "~63% of participants"],
          ["≥25% Weight Loss Achievers (max dose)", "Not reported at 48 weeks", "36.2% at 72 weeks"],
          ["Trial Duration", "48 weeks (primary endpoint)", "72 weeks (primary endpoint)"],
          ["Trial Population", "Obesity (BMI ≥30 or ≥27 with comorbidity)", "Obesity (BMI ≥30 or ≥27 with ≥1 weight-related comorbidity)"],
        ],
      },
    },
    {
      title: "Liver Fat Reduction: The Glucagon Difference in Full Effect",
      body: "If there is one data point that most clearly illustrates what the glucagon receptor brings to the table, it is liver fat reduction. **Retatrutide produced an 82.4% relative reduction in liver fat at the 12 mg dose** as measured by MRI-PDFF, the gold-standard non-invasive imaging biomarker (Sanyal et al., Nature Medicine, 2024). An extraordinary **93% of patients receiving 12 mg achieved the ≥30% liver fat reduction threshold** that correlates with histologic improvement in MASH. Even at the 8 mg dose, 79.8% hit this threshold.\n\nTirzepatide's liver fat data is impressive in its own right. In the SYNERGY-NASH Phase 2 trial (Loomba et al., NEJM, 2024), tirzepatide achieved **MASH resolution without worsening fibrosis in 43.6–62.4% of patients** across the 5–15 mg doses — a treatment effect 5–6 times greater than placebo (9.8%). The liver fat reduction in tirzepatide-treated patients using MRI-PDFF was approximately 42–59%, and the highest resolution rate (62.4% at 15 mg) was a landmark result for any pharmacologic intervention in NASH.\n\nHowever, the numbers are not directly comparable because the trials used different entry criteria and endpoints. Retatrutide's study specifically enrolled patients with MASLD (liver fat ≥10% by MRI-PDFF) and measured liver fat change as the primary endpoint. Tirzepatide's SYNERGY-NASH trial enrolled patients with biopsy-confirmed MASH (F1–F3 fibrosis), a more advanced disease population, and measured histologic resolution as the primary endpoint. What can be said is this: **retatrutide's 82.4% liver fat reduction is the highest ever reported for an incretin-based therapy**, and the glucagon component is the most likely reason.",
    },
    {
      title: "Clinical Trial Comparison: Retatrutide vs Tirzepatide",
      body: "The table below summarises the key clinical trial evidence supporting each compound across metabolic disease states.",
      table: {
        header: ["Parameter", "Retatrutide", "Tirzepatide"],
        rows: [
          ["Phase 3 Status", "Active — obesity (TRIUMPH-1, NCT07900026) and MASH (NCT08061699)", "Completed — SURMOUNT-1 to -5, SURPASS-1 to -5, SYNERGY-NASH, SUMMIT"],
          ["Type 2 Diabetes Data", "Phase 2: significant HbA1c and weight reductions (Lancet, 2024)", "SURPASS programme: HbA1c reductions of 1.9–2.4%, largest ever for a glucose-lowering agent"],
          ["Obesity Data", "Phase 2 (NCT04881760): 24.2% mean weight loss — highest ever for an anti-obesity agent", "SURMOUNT-1: 20.9% at 72 weeks; 36.2% lost ≥25% body weight"],
          ["MASH/NASH Data", "Phase 2 MASLD cohort: 82.4% liver fat reduction, 93% achieved ≥30% threshold (Nat Med, 2024)", "SYNERGY-NASH: 62.4% MASH resolution at 15 mg; 5–6× placebo"],
          ["Cardiovascular Data", "Under investigation — CVOT in Phase 3", "SUMMIT (HFpEF): HR 0.62 for CV death/worsening HF; 44% reduction in HF hospitalisation"],
          ["Approval Status", "Not approved — Phase 3 investigational only", "FDA-approved: Mounjaro (T2D, May 2022), Zepbound (obesity, Nov 2023)"],
          ["Post-Marketing Safety", "None — no post-marketing data available", "Extensive real-world evidence across millions of prescriptions"],
        ],
      },
    },
    {
      title: "Why Glucagon Agonism Matters for Energy Expenditure",
      body: "This is the biological feature that conceptually separates retatrutide from every other incretin therapy on the market. Glucagon receptor activation directly increases resting energy expenditure — the number of calories your body burns at rest. In Phase 1 studies of retatrutide, researchers observed a 3–6 beats-per-minute increase in heart rate consistent with the known chronotropic effects of glucagon, alongside evidence of increased lipid oxidation.\n\n**In practical terms, tirzepatide reduces calorie intake (through GLP-1-mediated appetite suppression) and improves how those calories are partitioned (through GIP-mediated lipid metabolism). Retatrutide does those two things plus raises the metabolic set point so that more calories are burned even without exercise.** This three-pronged approach — reduced intake, better partitioning, increased output — is the most complete metabolic intervention ever assembled in a single molecule.\n\nThe trade-off is tolerability. The glucagon component may contribute to the higher rates of nausea and vomiting observed in the retatrutide Phase 2 trial compared with historical tirzepatide data, particularly during the dose-escalation phase. Heart rate elevation, while generally well-tolerated and stabilising over time, remains a theoretical cardiovascular consideration that Phase 3 cardiovascular outcome trials will need to address definitively.",
    },
    {
      title: "Regulatory Status and Approval Timeline",
      body: "This is the single most practical difference between the two compounds for anyone considering research or clinical use.\n\n**Tirzepatide** is fully approved by the MHRA, FDA, and EMA. Approved as Mounjaro for type 2 diabetes (May 2022) and as Zepbound for chronic weight management (November 2023). It has the most extensive clinical dataset of any incretin therapy, with post-marketing safety surveillance across millions of real-world prescriptions. For researchers, tirzepatide is available as a research chemical from regulated suppliers, but the approval status means it is also widely accessible through clinical channels.\n\n**Retatrutide** remains investigational. It is not approved by any regulatory agency. Phase 3 trials are ongoing — notably TRIUMPH-1 (NCT07900026) for obesity and a Phase 3 MASH programme (NCT08061699). Published evidence is limited to Phase 1 and Phase 2 data, though the quality and impact of those Phase 2 results have been exceptional. For researchers, retatrutide is available as a research chemical, but the evidence base is narrower and no post-marketing safety data exists.\n\n[**Compare Retatrutide pricing from UK suppliers →**](/compounds/retatrutide) [**Compare Tirzepatide pricing from UK suppliers →**](/compounds/tirzepatide)",
    },
    {
      title: "Which Compound Should You Choose for Research?",
      body: "The answer depends entirely on your research question, not on which compound is 'better.' Here is a practical framework.\n\n**Choose retatrutide if your research focuses on:**\n- Energy expenditure and thermogenesis — glucagon agonism is unique to retatrutide\n- Hepatic fat clearance and MASLD/MASH — the 82.4% liver fat reduction is unmatched\n- Maximum achievable weight loss — retatrutide's Phase 2 results exceed every comparator\n- Exploring the triple agonist mechanism as a therapeutic strategy\n- Cutting-edge incretin pharmacology — retatrutide represents the newest generation\n\n**Choose tirzepatide if your research focuses on:**\n- Established, well-characterised pharmacology — thousands of published studies\n- Comparative effectiveness against other GLP-1-based therapies\n- Cardiovascular outcomes — SUMMIT data shows clear HFpEF benefit\n- Long-term safety profiling — extensive post-marketing data available\n- Head-to-head studies requiring an FDA-approved reference compound\n- Research that needs a broader evidence base for ethics committee review\n\nBoth compounds are products of Eli Lilly's incretin engineering programme and share the same structural foundation — a peptide backbone with fatty acid modification for once-weekly administration. The decision between them comes down to whether glucagon receptor agonism is relevant to your specific research question.",
    },
    {
      title: "Safety and Tolerability Comparison",
      body: "Both compounds share the class-effect safety profile common to incretin-based therapies, with gastrointestinal adverse events being the most frequently reported. The key differences and similarities are summarised below.",
      table: {
        header: ["Parameter", "Retatrutide", "Tirzepatide"],
        rows: [
          ["Nausea (highest dose cohort)", "~40–50% during escalation", "18–33% in clinical trials"],
          ["Vomiting (highest dose cohort)", "~20–25% during escalation", "6–13% in clinical trials"],
          ["Diarrhoea", "Reported at rates comparable to tirzepatide", "15–22% in clinical trials"],
          ["Constipation", "Reported in Phase 2 cohort", "7–10% in clinical trials"],
          ["Heart Rate Increase", "3–6 bpm (glucagon-mediated chronotropic effect)", "Minimal (2–4 bpm, consistent with GLP-1 class)"],
          ["Pancreatitis Risk", "Theoretical — no signal in Phase 2 due to limited sample size", "Rare but established — included in prescribing information"],
          ["Thyroid C-Cell Tumour Risk (boxed warning)", "Theoretical — based on rodent data for GLP-1 class", "Boxed warning — applies to all GLP-1 agonists"],
          ["Post-Marketing Safety Data", "None — investigational only", "Extensive real-world data across millions of patients"],
          ["Severe Hypoglycaemia", "Not reported in Phase 2", "Very low when used without insulin/secretagogues"],
        ],
      },
    },
    {
      title: "Dosing and Administration",
      body: "Both compounds are administered once weekly via subcutaneous injection. Both use graduated dose escalation to minimise gastrointestinal side effects. The dosing schedules differ in magnitude.\n\n**Retatrutide (Phase 2 protocol):** Start at 2 mg once weekly (weeks 1–4), escalate to 4 mg (weeks 5–8), then 6 mg (weeks 9–12 for higher-dose cohorts), reaching a target of 8 mg or 12 mg once weekly from week 13 onwards. Target doses of 8–12 mg are being carried into Phase 3.\n\n**Tirzepatide (approved protocol):** Start at 2.5 mg once weekly (weeks 1–4), escalate to 5 mg (weeks 5–8), then 7.5 mg (weeks 9–12), 10 mg (weeks 13–16), 12.5 mg (weeks 17–20), reaching maximum dose of 15 mg once weekly from week 21 onwards. Approved maintenance doses: 5 mg, 10 mg, and 15 mg once weekly.\n\nThe retatrutide dosing schedule reaches its target dose faster (week 13 vs week 21), which may explain the higher rates of gastrointestinal side effects during the escalation phase. Future clinical protocols may adopt slower titration schedules to improve tolerability.\n\nFor research purposes, both compounds are supplied as lyophilised powders requiring reconstitution. Store lyophilised material at −20°C and reconstituted solutions at 2–8°C. Always verify purity and batch details via the Certificate of Analysis.",
    },
  ],
  faq: [
    {
      question: "What is the main difference between retatrutide and tirzepatide?",
      answer: "Retatrutide is a triple GIP/GLP-1/glucagon receptor agonist, whereas tirzepatide is a dual GIP/GLP-1 receptor agonist. The glucagon component in retatrutide directly increases energy expenditure through thermogenesis, promotes lipolysis, and mobilises hepatic fat — mechanisms that tirzepatide does not activate. This third receptor is the most likely explanation for retatrutide's higher mean weight loss (24.2% vs 20.9%) and greater liver fat reduction (82.4% vs 42–59%) in clinical trials.",
    },
    {
      question: "Which produces greater weight loss — retatrutide or tirzepatide?",
      answer: "In clinical trials, retatrutide produced higher mean weight loss: 24.2% at 48 weeks (12 mg dose) versus tirzepatide's 20.9% at 72 weeks (15 mg dose). However, direct comparison requires caution — retatrutide's data comes from a Phase 2 trial with a shorter duration, whereas tirzepatide's comes from the fully powered Phase 3 SURMOUNT-1 trial. 100% of participants on retatrutide 12 mg achieved ≥5% weight loss, and 79% achieved ≥15%. The question of whether retatrutide maintains this advantage over longer treatment periods will be answered by ongoing Phase 3 trials.",
    },
    {
      question: "Is retatrutide approved? Can I use it instead of tirzepatide?",
      answer: "No. Retatrutide is not approved by the MHRA, FDA, or EMA for any indication. It is currently in Phase 3 clinical trials. Tirzepatide is fully FDA-approved as Mounjaro (type 2 diabetes, May 2022) and Zepbound (chronic weight management, November 2023), and is also approved by the MHRA and EMA. Both compounds are available as research chemicals for laboratory study, but only tirzepatide is available through clinical channels as a prescription medicine. Retatrutide must not be self-administered or used outside regulated clinical trial settings.",
    },
    {
      question: "How do the liver fat reduction results compare between the two?",
      answer: "Retatrutide produced an 82.4% relative reduction in liver fat at 12 mg as measured by MRI-PDFF (Sanyal et al., Nature Medicine, 2024) — the highest ever reported for an incretin-based therapy. 93% of patients achieved the ≥30% liver fat reduction threshold. Tirzepatide in the SYNERGY-NASH trial achieved MASH resolution without worsening fibrosis in up to 62.4% of patients (15 mg dose) — a landmark result — with MRI-PDFF showing 42–59% liver fat reduction. While retatrutide's MRI-PDFF numbers are dramatically higher, the trials used different patient populations and endpoints, so the numbers are not directly comparable.",
    },
    {
      question: "Which is better for research use — retatrutide or tirzepatide?",
      answer: "The choice depends on your research question. Choose retatrutide if your work focuses on energy expenditure, hepatic fat clearance, or maximum weight loss — the glucagon component is unique to retatrutide. Choose tirzepatide if you need an extensive evidence base, long-term safety data, or an FDA-approved reference compound for comparative studies. Tirzepatide has the broader dataset (SURPASS, SURMOUNT, SYNERGY-NASH, SUMMIT) and post-marketing real-world evidence, while retatrutide represents the cutting edge of triple-agonist pharmacology with a narrower but highly impactful evidence base.",
    },
  ],
  references: [
    "Jastreboff AM, et al. Triple-hormone-receptor agonist retatrutide for obesity — a phase 2 trial. Lancet. 2024;404(10452):724-737. PMID: 39074465.",
    "Sanyal AJ, et al. Triple-hormone-receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomised phase 2 trial. Nat Med. 2024;30(12):3617-3627. PMID: 39402252.",
    "Jastreboff AM, et al. Tirzepatide once weekly for the treatment of obesity. N Engl J Med. 2022;387(3):205-216. PMID: 35658024.",
    "Frías JP, et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes. N Engl J Med. 2021;385(6):503-515. PMID: 34170647.",
    "Loomba R, et al. Tirzepatide for metabolic dysfunction-associated steatohepatitis. N Engl J Med. 2024;391(4):312-324. PMID: 38856224.",
    "Coskun T, et al. LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist, for the treatment of obesity and type 2 diabetes: preclinical and clinical evidence. Mol Metab. 2022;66:101608. PMID: 36228938.",
    "Rosenstock J, et al. Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo-controlled phase 2 trial. Lancet. 2024;404(10452):738-748. PMID: 39074466.",
    "Packer M, et al. Tirzepatide and heart failure with preserved ejection fraction. N Engl J Med. 2024. PMID: 39476341.",
  ],
},
"semax-vs-selank": {
  slug: "semax-vs-selank",
  compoundSlug: "",
  pullQuote:
    "Semax and Selank are like two sides of the same Russian heptapeptide coin — one sharpens the blade of attention, the other steadies the hand that holds it. Together, they rewrite the rules of what a neuropeptide can do.",
  quickInfo: [
    { label: "Compound Class", value: "Both are synthetic regulatory heptapeptides developed by Russian researchers" },
    { label: "Core Mechanism", value: "Semax: BDNF/TrkB upregulation, dopamine & serotonin modulation. Selank: GABAergic allosteric modulation, BDNF upregulation, IL-6 regulation." },
    { label: "Primary Effect", value: "Semax: cognitive enhancement and neuroprotection. Selank: anxiolysis without sedation." },
    { label: "Onset Profile", value: "Semax: sharpens attention and information processing first (15–30 min). Selank: reduces anxiety first, then sharpens focus." },
    { label: "Half-Life", value: "Both short (minutes in plasma), stabilised by Pro-Gly-Pro motif. Neurotropic effects outlast circulation." },
    { label: "Regulatory Status", value: "Semax: approved in Russia (2001) for stroke, cognitive impairment, optic nerve disease. Selank: approved in Russia (2009) for anxiety disorders." },
    { label: "Route", value: "Both administered intranasally for rapid CNS penetration via olfactory/trigeminal pathways" },
    { label: "Stacking Potential", value: "Frequently studied together — Selank provides calm, Semax provides sharpness. Also stackable with BPC-157 for neuro-gastro repair protocols." },
  ],
  sections: [
    {
      title: "Semax vs Selank: The Two Pillars of Russian Neuropeptide Research",
      body: "If you are researching nootropic and anxiolytic peptides, you will inevitably arrive at the same fork in the road: Semax or Selank? They come from the same Russian laboratories, share the same Pro-Gly-Pro C-terminal stabilising motif, and are both delivered intranasally to reach the brain within minutes. But they are not interchangeable.\n\nSemax is an analogue of ACTH(4-10) — a fragment of the adrenocorticotropic hormone that has been surgically stripped of its steroidogenic activity. It does not stimulate cortisol release. What it does instead is upregulate brain-derived neurotrophic factor (BDNF) and its TrkB receptor with impressive speed and potency, triggering a cascade of gene expression changes that support synaptic plasticity, neurogenesis, and neuronal survival.\n\nSelank, on the other hand, is a modified analogue of tuftsin — an immunomodulatory tetrapeptide (Thr-Lys-Pro-Arg) first discovered in the Fc domain of immunoglobulin G. Its primary mechanism is allosteric modulation of GABA-A receptors, producing an anxiolytic effect that is fundamentally distinct from benzodiazepines. It also upregulates BDNF, modulates serotonin and dopamine turnover, and regulates IL-6 gene expression through its tuftsin heritage.\n\nThe result? Semax is primarily a cognitive amplifier and neuroprotectant. Selank is primarily an anxiolytic that also supports cognition. They are complementary, not competitive — and understanding their differences is essential for any researcher working with these compounds.\n\n[**Compare Semax prices from UK suppliers →**](/compounds/semax)\n[**Compare Selank prices from UK suppliers →**](/compounds/selank)",
    },
    {
      title: "Mechanisms of Action: BDNF Power vs GABAergic Finesse",
      body: "The most important distinction between Semax and Selank lies in their primary mechanisms. While both compounds upregulate BDNF, the way they achieve their dominant effects could not be more different.",
      subsections: [
        {
          title: "Semax: The BDNF Engine",
          body: "Semax's defining mechanism is robust BDNF/TrkB pathway activation. Research shows that intranasal Semax increases BDNF mRNA expression in the hippocampus and frontal cortex within 20 minutes of administration. This is not a subtle tweak — it is a genuine transcriptional upregulation that persists for hours after a single dose.\n\nBDNF is the master regulator of synaptic plasticity. By binding to its high-affinity receptor TrkB, it triggers downstream signalling through the MAPK/ERK, PI3K/Akt, and PLCγ pathways — all of which support dendritic spine growth, long-term potentiation (LTP), and neuronal survival.\n\nBeyond BDNF, Semax alters the expression of at least 24 genes in the CNS, including genes involved in neurotransmitter synthesis (tyrosine hydroxylase, DOPA decarboxylase), synaptic plasticity (Arc, Egr1), neuroprotection (Hsp70, Bcl2), and energy metabolism. It also modulates dopamine turnover in the striatum and enhances serotonergic activity in the frontal cortex — providing a broad-spectrum cognitive enhancement profile without stimulating cortisol release.\n\nThis is the critical differentiator from full ACTH: Semax lacks the 11–24 amino acid sequence required to activate the adrenal cortex, so it provides the neurotrophic benefits of the ACTH fragment without the endocrine stress response. Multiple studies confirm that Semax administration does not elevate blood cortisol levels (PMID: 21957821).",
        },
        {
          title: "Selank: The GABAergic Anxiolytic, Redesigned",
          body: "Selank's primary mechanism is allosteric modulation of GABA-A receptors — but not in the way benzodiazepines work. This distinction is crucial.\n\nBenzodiazepines bind at the interface of the α and γ subunits of GABA-A receptors, potentiating GABA's effect non-discriminately across all neural circuits. This is why they produce sedation, ataxia, anterograde amnesia, and dependence. Selank, by contrast, modulates GABAergic transmission through a mechanism that does not involve direct receptor agonism or benzodiazepine-site binding.\n\nA 2010 study (PMID: 20531176) examined Selank's interaction with the GABA-A receptor complex and found that Selank modulates the conformation of the receptor in a way that differs from both GABA itself and benzodiazepines. It does not compete with GABA at the orthosteric site nor with benzodiazepines at the benzodiazepine site. Instead, it appears to stabilise a specific conformational state that favours controlled inhibitory tone without broad-spectrum suppression.\n\nThe practical result is anxiety reduction that is fully separable from sedation. In EEG studies, Selank increases alpha rhythm power (associated with relaxed alertness) rather than beta activity (associated with sedation). This is the electrophysiological signature of a compound that calms without clouding.\n\nSelank also upregulates BDNF (though less potently than Semax), modulates serotonin and dopamine metabolism, and — uniquely among anxiolytics — downregulates IL-6 gene expression (PMID: 24625623), addressing the neuroinflammatory component of anxiety that conventional agents do not touch.",
        },
      ],
    },
    {
      title: "Semax vs Selank: Head-to-Head Comparison",
      body: "The table below compares Semax and Selank across the features that matter most for researchers evaluating these compounds for experimental protocols.",
      table: {
        header: ["Feature", "Semax", "Selank"],
        rows: [
          ["Primary Classification", "Nootropic / Neuroprotective", "Anxiolytic / Nootropic adjunct"],
          ["Origin", "ACTH(4-10) fragment analogue", "Tuftsin analogue"],
          ["Sequence", "Met-Glu-His-Phe-Pro-Gly-Pro", "Thr-Lys-Pro-Arg-Pro-Gly-Pro"],
          ["Core Mechanism", "BDNF/TrkB upregulation, 24-gene CNS expression modulation, dopamine & serotonin modulation", "Allosteric GABA-A modulation (non-benzodiazepine site), BDNF upregulation, IL-6 downregulation, serotonin & dopamine influence"],
          ["BDNF Upregulation", "Strong (primary mechanism, within 20 mins)", "Moderate (secondary mechanism)"],
          ["Cortisol Impact", "None — no steroidogenic activity", "None"],
          ["Onset Profile", "Cognitive sharpening first (15–30 min), sustained BDNF-driven effects for hours", "Anxiety reduction first, then improved focus through anxiolysis"],
          ["Cognitive & Nootropic Rating", "7.0/10 — direct cognitive enhancement", "6.5/10 — indirect, via anxiety reduction + BDNF"],
          ["Neuroprotection Rating", "6.5/10 — stroke recovery, VEGF angiogenesis, antioxidant, anti-apoptotic", "5.5/10 — BDNF-mediated neuronal support"],
          ["Key Clinical Evidence", "Stroke rehabilitation (200+ patients), cognitive impairment, optic nerve disease", "Generalised anxiety disorder (GAD) clinical trials, connectomics studies"],
          ["Regulatory Status", "Approved in Russia since 2001", "Approved in Russia since 2009"],
          ["Half-Life", "~1.3 hours (plasma)", "Minutes (plasma), stabilised by Pro-Gly-Pro"],
          ["Dosage (Human Clinical)", "200–600 mcg/day intranasal", "500–1000 mcg/day intranasal"],
          ["Sedation", "None", "None — defining feature vs benzodiazepines"],
          ["Dependence Potential", "None reported", "None — no withdrawal in animal models"],
          ["Stacking Compatibility", "Frequently paired with Selank for combined nootropic + anxiolytic effect", "Frequently paired with Semax; also studied with BPC-157"],
        ],
      },
    },
    {
      title: "Onset Profile: Two Different Paths to Clarity",
      body: "One of the most practical differences between Semax and Selank is how they feel when you take them. Researchers who have worked with both compounds consistently describe distinct onset patterns.\n\n**Semax: Sharpness First.** Within 15–30 minutes of intranasal administration, Semax produces a noticeable increase in mental clarity, attention, and information processing speed. It is not a jittery stimulant effect — it is more like turning up the contrast on your visual field and the resolution on your thoughts. Users report improved verbal fluency, faster task switching, and resistance to mental fatigue. The BDNF-driven effects (synaptic plasticity, neurogenesis) build over hours and days of repeated administration.\n\n**Selank: Calm First, Then Clarity.** Selank's onset is characterised by a gentle reduction in anxiety — a quieting of the background mental noise that many people do not realise they are carrying until it lifts. Within 30–60 minutes, users report a state of relaxed alertness: the ability to think clearly without the tension that usually accompanies high-pressure cognitive tasks. The cognitive improvement following Selank is largely secondary to its anxiolytic effect — when anxiety no longer consumes neural bandwidth, the brain has more resources available for focused work.\n\n**The Core Distinction:** Semax pulls you forward into sharper cognition. Selank removes the brakes that anxiety places on cognition. This is why the two compounds are so frequently studied together in research protocols — they address different bottlenecks in the cognitive performance equation.",
    },
    {
      title: "Clinical Evidence: Stroke Rehab vs Anxiety Treatment",
      body: "The clinical evidence bases for Semax and Selank reflect their distinct therapeutic orientations. Both have been studied in human clinical trials in Russia and CIS countries, but the endpoints and patient populations differ significantly.",
      subsections: [
        {
          title: "Semax: The Stroke and Neuroprotection Evidence",
          body: "Semax has been registered for clinical use in Russia since 2001, primarily for cognitive impairment following stroke and traumatic brain injury, as well as optic nerve disease.\n\n**Stroke Rehabilitation:** Clinical studies involving hundreds of patients have evaluated Semax (0.1% nasal drops, 200–600 mcg/day) in the acute and subacute phases of ischemic stroke. A key finding is that Semax administered within the first 72 hours of stroke significantly improves scores on the Scandinavian Stroke Scale and Mini-Mental State Examination at 30-day follow-up. These improvements span speech, motor function, and cognition — not marginal effects but clinically meaningful functional gains.\n\n**Preclinical Stroke Data:** In models of focal cerebral ischemia, Semax treatment reduced infarct volume by up to 40% and increased capillary density in the peri-infarct zone through VEGF upregulation. This angiogenic effect, combined with direct neurotrophic support (BDNF), antioxidant defence, and anti-apoptotic signalling (increased Bcl-2, decreased Bax and active caspase-3), produces a multilayered neuroprotective profile.\n\n**Optic Nerve Disease:** Semax is also used clinically for optic nerve atrophy and glaucoma, where its combination of neuroprotection and improved vascular support has shown benefits in visual function outcomes.\n\n**Cognition in Healthy Subjects:** Human EEG studies demonstrate that Semax increases alpha rhythm power and reduces slow-wave activity, correlating with subjective improvements in mental clarity and resistance to fatigue. Functional MRI studies show that Semax modulates default mode network connectivity, improving the efficiency of transitions between resting and active brain states.",
        },
        {
          title: "Selank: The Non-Sedating Anxiolytic Evidence",
          body: "Selank has been approved for clinical use in Russia since 2009 for the treatment of generalized anxiety disorder (GAD) and other anxiety spectrum conditions.\n\n**GAD Clinical Trial (PMID: 20015478):** A double-blind, placebo-controlled clinical trial evaluated Selank in patients with GAD. Selank was administered intranasally at 500–1000 mcg/day over 14 days. Results showed statistically significant reductions in Hamilton Anxiety Rating Scale (HAM-A) and Spielberger State-Trait Anxiety Inventory (STAI) scores compared with placebo. The anxiolytic effect reached significance by day 7 and persisted through the study endpoint. No sedation, cognitive blunting, or ataxia was observed.\n\n**Non-Sedation Confirmed Electrophysiologically (PMID: 20531176):** EEG recordings during Selank administration showed increased alpha rhythm power — the hallmark of relaxed alertness — without the increased beta activity characteristic of sedative-hypnotics. This provides objective neurophysiological evidence that Selank's anxiolytic effect is genuinely separable from sedation.\n\n**Connectomics Study (PMID: 28089837):** A functional MRI study of Selank's effects on brain connectivity demonstrated that Selank increases the efficiency of information transfer between brain networks, specifically enhancing functional connectivity in the frontoparietal network (attention and executive control) and improving default mode network integration with task-positive networks.\n\n**No Dependence:** In direct contrast to benzodiazepines, animal models show no withdrawal signs after abrupt discontinuation of Selank following 21 days of continuous administration. This is consistent with its allosteric, non-agonist mechanism at GABA-A receptors.",
        },
      ],
    },
    {
      title: "Regulatory Status: Russian Clinical Use vs Global Research",
      body: "Both Semax and Selank are registered prescription medications in Russia, but their regulatory status outside the CIS varies considerably.\n\n**Semax (Registered 2001):** Semax 0.1% nasal drops are approved in Russia for cognitive impairment of vascular, traumatic, and degenerative origin; stroke rehabilitation; and optic nerve atrophy. It is also approved or used clinically in several CIS countries including Ukraine and Kazakhstan. Outside the former Soviet Union, Semax is not approved by the MHRA (UK), FDA (USA), or EMA (EU) and is available only for laboratory research purposes.\n\n**Selank (Registered 2009):** Selank nasal drops (Селанк) are approved in Russia for the treatment of generalized anxiety disorder and anxiety spectrum conditions. It is classified as a prescription anxiolytic in Russia. Like Semax, it has no marketing authorisation in the UK, USA, or EU and is supplied for research use only outside the CIS.\n\n**Implications for Researchers:** For researchers in the UK, EU, and North America, both compounds are classified as research chemicals. They are typically supplied as lyophilised powders for reconstitution and intranasal administration in laboratory settings. Always verify the regulatory status in your jurisdiction before importing or handling these compounds. ViralPeps listings are limited to verified research suppliers operating within applicable legal frameworks.\n\n[**Browse Semax suppliers on ViralPeps →**](/compounds/semax)\n[**Browse Selank suppliers on ViralPeps →**](/compounds/selank)",
    },
    {
      title: "Stacking Potential: Better Together",
      body: "Given their complementary mechanisms — Semax drives cognition and neuroprotection, Selank provides anxiolysis and immunomodulation — these two compounds are frequently studied together in research protocols.\n\n**Semax + Selank: The Cognitive-Anxiolytic Stack.** This is the most common pairing. Selank reduces the anxiety and mental tension that can interfere with cognitive performance, while Semax provides a direct BDNF-mediated boost to attention, learning, and memory. The result is a state of calm focus that neither compound produces alone. Researchers typically stagger the doses to account for the different onset profiles: Selank first for anxiety reduction, followed by Semax 15–30 minutes later for the cognitive uplift.\n\n**Selank + BPC-157: The Neuro-Gastro Stack.** Selank's tuftsin heritage gives it immunomodulatory activity, while BPC-157 is the foremost research peptide for gastrointestinal repair and tissue healing. In models of stress-induced gastrointestinal and neurological injury, these two compounds have been studied together for their combined effects on the gut-brain axis — Selank reducing neuroinflammation and anxiety signalling, BPC-157 repairing intestinal barrier integrity and promoting angiogenesis.\n\n**Semax + Noopept or P21:** For researchers focused purely on cognitive enhancement, Semax is sometimes paired with other nootropics like Noopept (a cycloprolylglycine derivative) or P21 (a shorter BDNF-inducing peptide). These combinations aim to amplify the BDNF/TrkB pathway activation through complementary mechanisms.\n\n**Important Safety Consideration:** While these stacking protocols appear in the research literature, the interaction profiles of combined peptide regimens have not been systematically studied in human clinical trials. Researchers should exercise appropriate caution, start with single compounds, and follow institutional biosafety protocols for any combination research.",
    },
    {
      title: "Side-by-Side Summary: Which Compound for Which Research Goal?",
      body: "The choice between Semax and Selank — and whether to use them together — depends on your specific research objectives.\n\n| Research Focus | Primary Choice | Rationale |\n|---|---|---|\n| Cognitive enhancement (attention, learning, memory) | Semax | Direct BDNF/TrkB activation, 24-gene expression changes, dopamine and serotonin modulation, proven EEG and fMRI effects on network efficiency |\n| Anxiety reduction without sedation | Selank | Allosteric GABA-A modulation (non-benzodiazepine site), no sedation or ataxia, clinical trial data in GAD, no dependence liability |\n| Stroke recovery and neuroprotection | Semax | Registered for stroke rehab, VEGF angiogenesis, reduced infarct volume, antioxidant and anti-apoptotic effects, human clinical data |\n| Neuroinflammatory or stress-related conditions | Selank | IL-6 downregulation, tuftsin-mediated immunomodulation, BDNF upregulation, dual neuro-immune mechanism |\n| Combined cognitive + anxiolytic effect | Semax + Selank | Complementary mechanisms: Selank reduces anxiety, Semax sharpens cognition. The classic Russian nootropic stack |\n| Optic nerve or visual pathway research | Semax | Registered for optic nerve atrophy in Russia, vascular and neurotrophic support for retinal and optic nerve tissue |\n\nBoth compounds have exceptional safety profiles relative to their pharmacological classes — no sedation, no dependence, no hormonal disruption, no hepatotoxicity in clinical use. The choice ultimately comes down to whether your research prioritises direct cognitive enhancement (Semax), anxiety modulation (Selank), or the synergy of both.\n\n[**Check Semax prices on ViralPeps →**](/compounds/semax)\n[**Check Selank prices on ViralPeps →**](/compounds/selank)",
    },
    {
      title: "Dosing & Administration Comparison",
      body: "Both compounds are administered intranasally in registered clinical protocols. Below are the standard parameters for each.",
      table: {
        header: ["Parameter", "Semax", "Selank"],
        rows: [
          ["Clinical Dose (Human)", "200–600 mcg/day (divided into 2–3 doses)", "500–1000 mcg/day (divided into 2–3 doses)"],
          ["Onset", "15–30 minutes", "30–60 minutes"],
          ["Duration of Effect", "4–6 hours (acute); BDNF effects persist beyond", "4–8 hours (acute); gene expression changes persist"],
          ["Route", "Intranasal (olfactory epithelium)", "Intranasal (olfactory epithelium)"],
          ["Reconstitution", "Sterile saline or bacteriostatic water", "Sterile saline or bacteriostatic water"],
          ["Storage (Lyophilised)", "−20°C", "−20°C"],
          ["Storage (Reconstituted)", "7–14 days at 2–8°C", "7–14 days at 2–8°C"],
          ["Typical Vial Size", "30 mg lyophilised powder", "5 mg lyophilised powder"],
        ],
      },
    },
  ],
  faq: [
    {
      question: "What is the main difference between Semax and Selank?",
      answer: "Semax is primarily a nootropic and neuroprotective agent that works through robust BDNF/TrkB upregulation — it enhances attention, learning, and memory directly. Selank is primarily an anxiolytic that works through allosteric modulation of GABA-A receptors (distinct from benzodiazepines) — it reduces anxiety without sedation, with secondary cognitive benefits mediated by BDNF upregulation and stress reduction. Semax sharpens cognition first; Selank calms first, then clarifies.",
    },
    {
      question: "Can Semax and Selank be taken together?",
      answer: "Yes — they are frequently studied together in research protocols precisely because their mechanisms are complementary. Selank reduces anxiety and mental tension, freeing cognitive bandwidth, while Semax provides direct BDNF-mediated enhancement of attention, learning, and memory. Researchers typically stagger dosing: Selank first for its calming effect, followed by Semax 15–30 minutes later for the cognitive uplift. Always follow institutional biosafety protocols for combination research.",
    },
    {
      question: "Does Semax or Selank cause sedation?",
      answer: "Neither compound causes sedation. This is a defining feature of both. Semax is consistently reported as non-sedating and is associated with improved cortical activation (increased alpha rhythm power on EEG). Selank was specifically designed as a non-sedating anxiolytic — its allosteric modulation of GABA-A receptors produces anxiety reduction without the drowsiness, ataxia, or cognitive blunting characteristic of benzodiazepines. Clinical trials confirm that patients maintain normal cognitive function and reaction times on Selank (PMID: 20015478).",
    },
    {
      question: "Which compound is better for cognitive enhancement — Semax or Selank?",
      answer: "For direct cognitive enhancement (attention, learning, memory, information processing speed), Semax is the stronger choice — it scores approximately 7.0/10 in nootropic effect vs 6.5/10 for Selank. Semax's primary mechanism is BDNF/TrkB upregulation, and it alters the expression of 24+ genes involved in synaptic plasticity and neuroprotection. However, if anxiety is the primary factor impairing cognition, Selank may produce greater functional improvement by removing the inhibitory effect of stress on neural processing. Many researchers use both — Selank for the anxiolytic baseline, Semax for the cognitive uplift.",
    },
    {
      question: "Are Semax and Selank legal to buy in the UK?",
      answer: "Semax and Selank are not licensed medicines in the UK and are not approved by the MHRA. They are available from UK research suppliers as chemical compounds for laboratory research purposes only. Researchers should verify the regulatory status in their jurisdiction before importing or handling these compounds and ensure they are purchased from reputable suppliers who provide Certificates of Analysis. ViralPeps lists verified vendors operating within applicable legal frameworks. Neither compound is a controlled substance under the Misuse of Drugs Act in the UK.",
    },
  ],
  references: [
    "Kozlovskaya MM, et al. Clinical efficacy of Selank in the treatment of generalized anxiety disorder. Zh Nevrol Psikhiatr Im S S Korsakova. 2008;108(12):27-32. PMID: 20015478.",
    "V'yunova TV, et al. Selank modulates GABA(A) receptor complex in rat brain. Bull Exp Biol Med. 2010;149(4):439-441. PMID: 20531176.",
    "Levitskaya NG, et al. Nootropic and neuroprotective effects of Selank in animal models of cognitive impairment. Eksp Klin Farmakol. 2007;70(2):10-15. PMID: 17436044.",
    "Volgin AD, et al. Connectomic effects of Selank: functional MRI study of brain network efficiency in rats. Neural Plast. 2016;2016:8062350. PMID: 28089837.",
    "Uchakina ON, et al. Immunomodulatory effects of Selank: regulation of IL-6 and cytokine gene expression. Bull Exp Biol Med. 2014;157(1):68-71. PMID: 24625623.",
    "Sazonova NA, et al. Selank affects gene expression of neurotrophic factors in the rat CNS. Dokl Biochem Biophys. 2012;447:288-291. PMID: 23335884.",
    "Leonova TA, et al. Semax effects on BDNF and TrkB gene expression in the rat brain. Mol Biol (Mosk). 2009;43(6):1042-1049. PMID: 20088379.",
    "Dmitrieva VG, et al. Semax gene expression profile in the rat brain: microarray analysis of 24 differentially expressed genes. Dokl Biochem Biophys. 2010;434:242-245. PMID: 20963564.",
    "Gusev EI, et al. Semax in the treatment of ischemic stroke: a clinical and neuroimaging study. Zh Nevrol Psikhiatr Im S S Korsakova. 2005;105(9):23-29. PMID: 16245425.",
    "Ershova MA, et al. Semax does not stimulate cortisol release: confirmation of its non-steroidogenic profile. Bull Exp Biol Med. 2012;152(6):697-699. PMID: 21957821.",
  ],
},
"peptide-reconstitution-guide": {
  slug: "peptide-reconstitution-guide",
  compoundSlug: "",
  pullQuote:
    "Your peptide arrives as a white powder in a sealed vial. You cannot inject powder. Reconstitution is the step that turns it into something usable — and doing it wrong wastes the peptide before you ever get started.",
  quickInfo: [
    { label: "What Is Reconstitution?", value: "Dissolving lyophilised (freeze-dried) peptide powder into a liquid solution for research use" },
    { label: "Recommended Solvent", value: "Bacteriostatic water (0.9% benzyl alcohol) — multi-dose, inhibits microbial growth" },
    { label: "Storage (Lyophilised)", value: "2–8°C (refrigerated), protected from light. Shelf life: 12–24 months" },
    { label: "Storage (Reconstituted)", value: "2–8°C (refrigerated). Use within 28 days. Do not freeze" },
    { label: "Never Do", value: "Shake the vial, inject water directly onto powder, use tap water, or reuse syringes" },
    { label: "Common Solvents", value: "BAC water (standard), sterile water (single-use only), acetic acid (stubborn peptides)" },
    { label: "Dosing Formula", value: "Units = (Desired dose in mcg ÷ Total peptide in mcg) × BAC water in mL × 100" },
    { label: "Pitfall Warning", value: "GHK-Cu and AOD-9604 are notoriously difficult to dissolve — use acetic acid water for these" },
  ],
  sections: [
    {
      title: "What Is Peptide Reconstitution?",
      body: "Peptides are shipped as lyophilised (freeze-dried) powders because they are chemically unstable in solution for long periods. Without the freeze-drying step, the peptide would degrade during transport and storage — losing potency before it ever reaches the lab.\n\nReconstitution is the process of reintroducing a measured amount of solvent to turn that stable powder back into a precise liquid solution. It is not complicated, but it requires attention to detail. A miscalculation in the volume of solvent or the dose drawn means the entire protocol is off by an unknown margin.\n\nThis guide covers everything you need: the supplies, the step-by-step method, the dosing mathematics, storage protocols, and the common mistakes that waste peptides.\n\n[**Browse peptide suppliers for reconstitution supplies →**](/compounds/bpc-157)",
    },
    {
      title: "What You Need Before You Start",
      body: "Gather all materials before opening anything. Working with sterile materials means you should not be reaching for supplies mid-procedure.",
      subsections: [
        {
          title: "Essential Supplies",
          body: "- **Peptide vial** — sealed, lyophilised powder (check the label for mg content)\n- **Bacteriostatic water (BAC water)** — a 30 mL vial is standard; contains 0.9% benzyl alcohol as an antimicrobial preservative\n- **Insulin syringes** — 1 mL, 100-unit syringes with attached 29G–31G needles. These are the standard for drawing and measuring doses\n- **Reconstitution syringe** — a separate larger syringe (3 mL or 5 mL) with an 18G–22G needle for drawing the BAC water. Do not use your insulin syringe for this; the needle is too fine and the barrel too small\n- **Alcohol swabs** — at least 3. One for each vial stopper and one spare\n- **Clean flat surface** — a sterile lab bench is ideal; a clean kitchen counter works if wiped down with 70% isopropanol first",
        },
        {
          title: "Optional But Recommended",
          body: "- **Sharps container** — for safe disposal of needles and syringes\n- **Lab notebook** — record batch numbers, volumes, and dates for every vial you reconstitute\n- **Vial storage box** — protects reconstituted vials from light and temperature fluctuations in the refrigerator",
        },
      ],
    },
    {
      title: "BAC Water vs Other Solvents",
      body: "Not all solvents are interchangeable. Choosing the wrong one is the fastest way to ruin a peptide or introduce contamination.",
      table: {
        header: ["Solvent", "Use When", "Shelf Life After Opening"],
        rows: [
          ["Bacteriostatic water (BAC)", "Multi-dose vials, most standard protocols", "28 days refrigerated"],
          ["Sterile water", "Single-use only, immediate injection", "Single use only — no preservative"],
          ["Sodium chloride 0.9% (saline)", "Peptides sensitive to benzyl alcohol", "Single use once punctured"],
          ["Acetic acid water (0.6%)", "Stubborn peptides: GHK-Cu, AOD-9604, Copper peptides", "Single use or aliquot"],
        ],
      },
    },
    {
      title: "Step-by-Step Reconstitution Protocol",
      body: "Follow these steps in order. Do not skip the alcohol swab drying step — residual alcohol can degrade some peptides.",
      subsections: [
        {
          title: "Step 1: Wash and Prep",
          body: "Wash your hands with soap and warm water for at least 20 seconds. Dry with a clean paper towel. Wipe down your work surface with 70% isopropanol and allow it to air dry. Lay out all supplies within easy reach.",
        },
        {
          title: "Step 2: Swab Both Vial Stoppers",
          body: "Use a fresh alcohol swab on the rubber stopper of the peptide vial. Use a second fresh swab on the BAC water vial stopper. Allow both to air dry for 10–15 seconds. Wet alcohol can drip into the solution and degrade the peptide.",
        },
        {
          title: "Step 3: Draw the BAC Water",
          body: "Use your reconstitution syringe (3 mL or 5 mL with 18G–22G needle). Draw the calculated volume of BAC water. A common starting point is 1–3 mL per vial, depending on the target concentration. For a 5 mg vial, 2 mL is a typical starting volume.\n\nInsert the needle through the BAC water vial stopper at a slight angle, invert the vial, and draw the required volume. Remove the needle and cap it safely.",
        },
        {
          title: "Step 4: Inject Slowly Along the Vial Wall",
          body: "Insert the needle into the peptide vial stopper at a steep angle so the needle tip points toward the glass wall — not directly at the powder cake. Depress the plunger slowly, allowing the BAC water to run down the inside of the glass.\n\n**Do not squirt directly onto the powder.** The force of direct stream impact can disrupt the peptide's tertiary structure and reduce its bioactivity. Let gravity do the work.",
        },
        {
          title: "Step 5: Swirl Gently — Never Shake",
          body: "Remove the needle. Roll the vial gently between your palms or swirl it in a slow circular motion. Do not shake, flick, or vortex the vial. Shaking introduces air bubbles and creates shear forces that can break peptide bonds.\n\nMost peptides will dissolve within 30–90 seconds. If the solution appears cloudy or particles remain visible, set it aside for 2–3 minutes and swirl again. Some peptides (particularly GHK-Cu and AOD-9604) may require gentle warming or an acidic solvent to dissolve fully.",
        },
        {
          title: "Step 6: Inspect and Store",
          body: "The reconstituted solution should be clear and colourless (or very slightly tinted for copper-containing peptides like GHK-Cu, which has a characteristic pale blue colour). Discard the vial if particles remain, the solution is cloudy, or you see any discolouration beyond the expected copper blue.\n\nLabel the vial with the compound name, concentration (mg/mL), and date of reconstitution. Store immediately at 2–8°C (refrigerator). Do not freeze.",
        },
      ],
    },
    {
      title: "Dosing Math — The Formula",
      body: "This is where most mistakes happen. The maths is simple once you understand the relationship between three variables: the peptide mass in the vial, the volume of BAC water added, and the target dose.",
      subsections: [
        {
          title: "The Formula",
          body: "**Units on syringe = (Target dose in mcg ÷ Total peptide in vial in mcg) × BAC water added in mL × 100**\n\nThe × 100 converts millilitres to the 100-unit scale on a standard insulin syringe. Here is a worked example:",
        },
        {
          title: "Worked Example 1: 5 mg Vial, 250 mcg Dose",
          body: "Your vial contains 5 mg of peptide. Convert to mcg: 5 mg = 5,000 mcg. You add 2 mL of BAC water.\n\n- Concentration: 5,000 mcg ÷ 2 mL = 2,500 mcg per mL\n- Target dose: 250 mcg\n- Volume needed: 250 ÷ 2,500 = 0.1 mL\n- Syringe units: 0.1 × 100 = 10 units\n\nResult: draw to the 10-unit mark on a 100-unit insulin syringe.",
        },
        {
          title: "Worked Example 2: 10 mg Vial, 500 mcg Dose",
          body: "Your vial contains 10 mg (10,000 mcg). You add 2 mL of BAC water.\n\n- Concentration: 10,000 ÷ 2 = 5,000 mcg per mL\n- Target dose: 500 mcg\n- Volume needed: 500 ÷ 5,000 = 0.1 mL\n- Syringe units: 0.1 × 100 = 10 units\n\nYour dose is once again 10 units on the syringe — because the higher vial concentration offsets the larger target dose. Practice this maths. It matters.",
        },
      ],
      table: {
        header: ["Vial Size", "BAC Water", "Concentration", "250 mcg Dose", "500 mcg Dose", "1,000 mcg Dose"],
        rows: [
          ["5 mg", "2 mL", "2,500 mcg/mL", "10 units", "20 units", "40 units"],
          ["5 mg", "1 mL", "5,000 mcg/mL", "5 units", "10 units", "20 units"],
          ["10 mg", "2 mL", "5,000 mcg/mL", "5 units", "10 units", "20 units"],
          ["10 mg", "1 mL", "10,000 mcg/mL", "2.5 units", "5 units", "10 units"],
          ["50 mg", "3 mL", "~16,670 mcg/mL", "1.5 units", "3 units", "6 units"],
        ],
      },
    },
    {
      title: "Storage Guidelines",
      body: "Peptides are fragile molecules. How you store them determines how long they remain usable.",
      table: {
        header: ["Form", "Temperature", "Shelf Life", "Special Notes"],
        rows: [
          ["Lyophilised powder (unopened)", "2–8°C (refrigerated)", "12–24 months", "Protect from light. Do not freeze"],
          ["Lyophilised powder (unopened)", "-20°C (frozen)", "24–36 months", "Allow to reach room temp before opening to avoid condensation"],
          ["Reconstituted solution", "2–8°C (refrigerated)", "Up to 28 days", "BAC water preservative active. Do not freeze"],
          ["Reconstituted solution (aliquoted)", "-20°C (frozen)", "Up to 3 months", "Single-use aliquots only. Never repeatedly thaw/refreeze"],
        ],
      },
    },
    {
      title: "Common Mistakes to Avoid",
      body: "These are the errors that waste the most peptide and produce the most unreliable research data.",
      subsections: [
        {
          title: "1. Injecting Water Directly Onto the Powder",
          body: "This is the most common mistake. Direct stream impact can denature the peptide. Always aim the needle at the glass wall and let the water run down slowly.",
        },
        {
          title: "2. Shaking the Vial",
          body: "Shaking creates shear forces and introduces air bubbles. Peptide bonds are fragile — mechanical agitation can fragment the molecule. Swirl gently or roll between palms.",
        },
        {
          title: "3. Using Sterile Water for Multi-Dose Protocols",
          body: "Sterile water has no preservative. After the first puncture, bacterial growth can begin within hours. Use BAC water (0.9% benzyl alcohol) for any vial you plan to use more than once.",
        },
        {
          title: "4. Maths Errors on the Syringe",
          body: "Check your maths twice. A 10 mg vial reconstituted with 2 mL gives 5,000 mcg/mL. Drawing 20 units gives 1,000 mcg. Drawing 2 units gives 100 mcg. Use the formula every time until it becomes automatic.",
        },
        {
          title: "5. Freezing Reconstituted Solution",
          body: "Freezing a reconstituted peptide that you plan to draw from repeatedly destroys it. Ice crystals puncture the peptide structure. Only freeze in single-dose aliquots.",
        },
        {
          title: "6. Using the Same Syringe for Reconstitution and Dosing",
          body: "Drawing BAC water with an insulin syringe (29G–31G) takes forever and blunts the fine needle. Use a separate larger syringe for reconstitution and insulin syringes for dosing.",
        },
        {
          title: "7. Forgetting to Label Vials",
          body: "When you have three reconstituted vials in the refrigerator that all look identical, guessing which is which is not an option. Label every vial with compound name, concentration, and date immediately after reconstitution.",
        },
      ],
    },
    {
      title: "Troubleshooting: Stubborn Peptides",
      body: "Some peptides resist dissolution in plain BAC water. Here is how to handle the usual suspects.",
      subsections: [
        {
          title: "GHK-Cu and Copper Peptides",
          body: "GHK-Cu is notorious for slow dissolution. Use acetic acid water (0.6% acetic acid in sterile water) instead of standard BAC water. The slightly acidic pH helps the copper complex dissociate and dissolve. Alternatively, warm the vial gently by rolling it between your palms for 2–3 minutes before swirling.\n\nOnce dissolved, GHK-Cu has a characteristic pale blue colour — this is normal and expected. Do not discard it.",
        },
        {
          title: "AOD-9604",
          body: "AOD-9604 shares GHK-Cu's reputation for stubborn reconstitution. The same acetic acid water approach works. Some researchers report better results by adding a very small volume of BAC water first (0.5 mL), swirling gently, then adding the remaining volume after 2–3 minutes.",
        },
        {
          title: "Melanotan II and PT-141",
          body: "These dissolve readily in standard BAC water. No special handling required. However, they are photosensitive — protect the vial from light during and after reconstitution.",
        },
      ],
    },
    {
      title: "Safety Considerations",
      body: "Reconstitution is a sterile procedure. While you do not need a cleanroom, you do need clean hands, clean surfaces, and sterile supplies.\n\n**Key safety points:**\n- Never reuse needles or syringes. Discard after a single use into a sharps container.\n- Never use tap water, distilled water, or any non-sterile liquid for reconstitution. Contamination introduces bacterial endotoxins that can skew research results.\n- Always inspect the reconstituted solution before use. Cloudiness, particles, or unexpected colour changes mean the peptide has degraded or become contaminated.\n- Store all peptides out of reach of children and pets.\n- Follow your institution's biosafety and waste disposal guidelines.\n\nAll information in this guide is for laboratory research reference only. Peptides are not approved for human consumption. Always verify batch purity via the Certificate of Analysis provided by your supplier.\n\n[**Use the ViralPeps Dosage Calculator for your reconstitution maths →**](/tools/dosage-calculator)",
    },
  ],
  faq: [
    {
      question: "What is bacteriostatic water and why is it recommended?",
      answer: "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol as an antimicrobial preservative. It is the standard solvent for peptide reconstitution because the benzyl alcohol inhibits bacterial growth after the vial is punctured, allowing the reconstituted solution to be used for up to 28 days when refrigerated. Sterile water lacks this preservative and must be used immediately — any leftover becomes a breeding ground for bacteria within hours.",
    },
    {
      question: "How much BAC water should I add to my peptide vial?",
      answer: "A common starting range is 1–3 mL per vial. For a 5 mg vial, 2 mL is standard (giving 2,500 mcg/mL). For a 50 mg vial (common for GHK-Cu), 3 mL is typical (giving ~16,670 mcg/mL). The exact volume depends on the dose you need and the concentration that is practical for your syringe. Smaller volumes give higher concentrations — meaning fewer units on the syringe per dose but more precision required. Larger volumes make dosing easier but require more storage volume.",
    },
    {
      question: "Why should I not shake the vial after adding BAC water?",
      answer: "Shaking creates shear forces and introduces air bubbles that can damage the peptide's three-dimensional structure. Peptides are long chains of amino acids folded into specific shapes — their biological activity depends on maintaining that fold. Mechanical agitation can fragment the chain or cause unfolding (denaturation). Always swirl gently or roll the vial between your palms until the powder dissolves. This usually takes 30–90 seconds.",
    },
    {
      question: "How long does reconstituted peptide last in the refrigerator?",
      answer: "With bacteriostatic water, a reconstituted peptide solution is stable for up to 28 days when stored at 2–8°C (standard refrigeration). After 28 days, the benzyl alcohol preservative loses effectiveness and bacterial contamination risk increases. Lyophilised (unreconstituted) powder stored at 2–8°C is typically stable for 12–24 months. Some peptides stored at -20°C as lyophilised powder can last 24–36 months, but never freeze reconstituted solution unless it is divided into single-dose aliquots.",
    },
    {
      question: "What if my peptide doesn't dissolve completely?",
      answer: "Some peptides are notoriously difficult to dissolve. GHK-Cu and AOD-9604 are the most common culprits. Try acetic acid water (0.6% acetic acid in sterile water) instead of BAC water. Gentle warmth from rolling the vial between your palms can also help. If the peptide still does not dissolve after these steps, the powder may have degraded during storage or the batch may be compromised. Check the Certificate of Analysis for storage recommendations specific to that compound. Never inject a solution with visible undissolved particles.",
    },
  ],
  references: [
    "PeptideDeck. How to Reconstitute Peptides: Step-by-Step Guide with Dosing Math (2026). peptidedeck.com/peptides/how-to-reconstitute-peptides",
    "The Peptide Guides. How to Reconstitute Peptides: Step-by-Step Guide. thepeptideguides.com/guides/reconstitution-guide",
    "PepGuide. Reconstitution Calculator. pepguide.io/tools/calculator",
    "All About Peptides. How to Reconstitute Peptides: Step-by-Step Guide. allaboutpeptides.com/how-to-reconstitute-peptides/",
    "PeptideWiki. How to Reconstitute Peptides: Step-by-Step. peptidewiki.co/guides/how-to-reconstitute-peptides",
    "GLP-1 Forum. Bacteriostatic Water vs Sterile Water: Storage and Stability. Practical guidance on multi-dose vial handling and benzyl alcohol preservation.",
  ],
},
  "tb500-research-summary": {
    slug: "tb500-research-summary",
    compoundSlug: "tb-500",
    pullQuote:
      "TB-500 is the foreman of the repair crew \u2014 it doesn't build the scaffolding itself, but it tells every cell exactly where to march, when to arrive, and what to build when they get there.",
    quickInfo: [
      { label: "Peptide Name", value: "TB-500 (Thymosin Beta-4 Fragment)" },
      { label: "Parent Protein", value: "Thymosin Beta-4 (T\u03b24) \u2014 43 amino acids" },
      { label: "Classification", value: "Recovery / Tissue Support Peptide" },
      { label: "Active Sequence", value: "LKKTETQ (amino acids 17\u201323 of T\u03b24)" },
      { label: "CAS Number", value: "885340-08-9 (also 77591-33-4)" },
      { label: "Molecular Weight", value: "4963.4 g/mol" },
      { label: "Half-Life", value: "~2.5 hours" },
      { label: "Typical Research Dose", value: "2\u20135 mg, 2x per week" },
      { label: "Route", value: "Subcutaneous injection" },
      { label: "Evidence Strength", value: "Extensive preclinical; first human clinical data emerging (2025)" },
      { label: "Primary Research Areas", value: "Tissue repair, wound healing, cardiac recovery, tendon/ligament, neuroprotection" },
    ],
    sections: [
      {
        title: "What Is TB-500?",
        body: "TB-500 is a synthetic peptide fragment corresponding to the active region (amino acids 17\u201323, the LKKTETQ sequence) of thymosin beta-4, a naturally occurring 43-amino-acid protein first isolated from the thymus gland in 1981.\n\n[**Compare TB-500 prices from UK suppliers \u2192**](/compounds/tb-500)",
      },
      {
        title: "The Five Core Mechanisms of TB-500",
        body: "TB-500 doesn't have one trick. It has five coordinated biological levers that together orchestrate repair from the molecular level up.",
        subsections: [
          { title: "1. Actin Sequestration", body: "The LKKTETQ motif binds directly to G-actin and regulates actin polymerisation, controlling the cytoskeletal machinery cells use to migrate toward injury sites. (Safer et al., 1997)." },
          { title: "2. Angiogenesis", body: "Promotes new blood vessel formation by stimulating endothelial cell migration and tube formation via VEGF upregulation." },
          { title: "3. Anti-Inflammatory Signalling", body: "Downregulates TNF-\u03b1, IL-1\u03b2, and NF-\u03baB signalling without silencing the immune response entirely." },
          { title: "4. Matrix Remodelling", body: "Modulates MMPs and TIMPs for organised extracellular matrix turnover and reduced scarring." },
          { title: "5. Cardiac Progenitor Activation", body: "Activates epicardium-derived progenitor cells capable of differentiating into cardiomyocytes." },
        ],
      },
      {
        title: "Where TB-500 Shows Up in Research",
        body: "The preclinical literature spans wound healing, cardiac repair, musculoskeletal recovery, corneal regeneration, and neuroprotection.",
        subsections: [
          { title: "Wound Healing", body: "Philp et al. (2004) demonstrated 42% faster wound closure in rat excisional wound models." },
          { title: "Cardiac Repair", body: "Activates epicardial progenitor cells; 2025 human study provided first controlled clinical evidence." },
          { title: "Tendon and Ligament", body: "One of the most studied injectable peptides in sports medicine for improved collagen alignment and tensile strength." },
          { title: "Corneal Healing", body: "Accelerates epithelial repair and reduces inflammation-induced haze." },
          { title: "Neuroprotection", body: "Reduces neuronal apoptosis and lesion volume in TBI and stroke models." },
        ],
      },
      {
        title: "Dosing and Research Protocols",
        body: "Typical research protocols: 2\u20135 mg twice per week via SC injection. Cycle lengths: 4\u20138 weeks. Reconstitution: 5 mg + 3 mL BAC water = 1.67 mg/mL.\n\n[**Find the best TB-500 prices \u2192**](/compounds/tb-500)",
      },
      {
        title: "Molecular Profile",
        body: "Key molecular properties of TB-500.",
        table: { header: ["Property", "Value"], rows: [
          ["CAS Number", "885340-08-9 (also 77591-33-4)"],
          ["Molecular Weight", "4963.4 g/mol"],
          ["Active Sequence", "LKKTETQ (aa 17\u201323 of Thymosin Beta-4)"],
          ["Half-Life", "~2.5 hours"],
          ["Classification", "Recovery / Tissue Support Peptide"],
        ]},
      },
      {
        title: "Safety Profile",
        body: "Favourable safety profile in extensive animal studies. Overwhelmingly preclinical evidence base. 2025 human cardiac study provides first controlled human data. Strictly for in-vitro and animal research.",
      },
    ],
    faq: [
      { question: "What is TB-500 used for in research?", answer: "Wound healing, cardiac repair, tendon/ligament recovery, corneal repair, and neuroprotection." },
      { question: "Difference between TB-500 and thymosin beta-4?", answer: "TB-500 is the synthetic active fragment (aa 17\u201323, LKKTETQ) of the full 43-aa thymosin beta-4 protein." },
      { question: "How does TB-500 compare to BPC-157?", answer: "Different mechanisms: TB-500 governs cell migration via actin; BPC-157 drives angiogenesis via VEGF. Often studied in combination." },
      { question: "What animal models?", answer: "Rodent wound healing, MI, tendon repair, corneal injury, TBI, and stroke models." },
      { question: "Is TB-500 approved for human use?", answer: "No. Not approved by MHRA, FDA, or EMA. Research use only." },
    ],
    references: [
      "Philp D, et al. Wound Repair Regen. 2004;12(6):645-654. PMID: 15555058.",
      "Safer D, et al. J Biol Chem. 1991;266(7):4029-4032. PMID: 1999397.",
      "Malinda KM, et al. FASEB J. 1997;11(6):474-481. PMID: 9194529.",
      "Smart N, et al. Nature. 2007;445(7124):177-182. PMID: 17108969.",
      "Hinkel R, et al. Circulation. 2008;117(17):2232-2240. PMID: 18427130.",
    ],
  },
  "aod9604-research-summary": {
    slug: "aod9604-research-summary",
    compoundSlug: "aod-9604",
    pullQuote:
      "AOD-9604 isn't a metabolic sledgehammer \u2014 it's a precision scalpel that carves fat off the body while leaving every other hormonal pathway untouched.",
    quickInfo: [
      { label: "Peptide Name", value: "AOD-9604 (HGH Fragment 177-191)" },
      { label: "Classification", value: "Lipolytic / Metabolic Research Peptide" },
      { label: "CAS Number", value: "137632-02-1" },
      { label: "Molecular Weight", value: "~1817 Da" },
      { label: "Regulatory Status", value: "FDA GRAS (2014); Phase 2b obesity trials completed" },
      { label: "Primary Research Areas", value: "Obesity, fat metabolism, osteoarthritis, bone repair" },
    ],
    sections: [
      {
        title: "What Is AOD-9604?",
        body: "AOD-9604 is a 16-amino-acid modified fragment of human growth hormone (aa 177-191 with N-terminal Tyr). Developed by Prof. Frank Ng at Monash University. It isolates the lipolytic region of hGH while removing growth-promoting and diabetogenic effects.\n\n[**Explore AOD-9604 supplier pricing \u2192**](/compounds/aod-9604)",
      },
      {
        title: "The Five Mechanisms",
        body: "AOD-9604 works through lipolysis activation (ADRB3 pathway), lipogenesis inhibition (FAS/ACC downregulation), zero IGF-1 activation, chondroprotection, and anti-inflammatory modulation.",
        subsections: [
          { title: "1. Lipolysis Activation", body: "Activates ADRB3 pathway and hormone-sensitive lipase, breaking down triglycerides into free fatty acids." },
          { title: "2. Lipogenesis Inhibition", body: "Downregulates fatty acid synthase and acetyl-CoA carboxylase, preventing fat storage." },
          { title: "3. Zero IGF-1 Activation", body: "No stimulation of IGF-1, no effect on glucose homeostasis or insulin sensitivity." },
          { title: "4. Chondroprotection", body: "Stimulates proteoglycan synthesis in chondrocytes while inhibiting MMP activity." },
          { title: "5. Anti-Inflammatory Modulation", body: "Reduces inflammation markers in joint and cartilage research models." },
        ],
      },
      {
        title: "Research Applications",
        body: "Strongest evidence in obesity/metabolic research and cartilage biology.",
        subsections: [
          { title: "Obesity and Fat Metabolism", body: "Phase 2b trials completed. Consistent fat mass reduction in animal models without systemic side effects." },
          { title: "Osteoarthritis", body: "Stimulates proteoglycan synthesis, inhibits MMP-mediated cartilage breakdown." },
          { title: "Bone Repair", body: "Preliminary evidence of bone-anabolic effects." },
          { title: "Pre-Diabetes", body: "Indirect metabolic health support through adipose tissue reduction." },
        ],
      },
      {
        title: "How It Differs from Full-Length HGH",
        body: "No IGF-1 pathway activation. No diabetogenic effect. No growth or anabolic effects. Purely a lipolytic and metabolic modulator.",
      },
      {
        title: "Molecular Profile",
        body: "Key molecular properties.",
        table: { header: ["Property", "Value"], rows: [
          ["CAS Number", "137632-02-1"],
          ["Molecular Weight", "~1817 Da"],
          ["Sequence Length", "16 amino acids"],
          ["Origin", "Modified fragment of human growth hormone"],
          ["FDA Status", "GRAS (2014)"],
          ["IGF-1 Stimulation", "None"],
          ["Effect on Glucose", "None"],
        ]},
      },
      {
        title: "Dosing and Research Use",
        body: "5 mg + 3 mL BAC water = 1.67 mg/mL. 300 mcg = 18 units. 500 mcg = 30 units. AOD-9604 can be difficult to dissolve; 0.6% acetic acid water alternative.\n\n[**Check AOD-9604 prices \u2192**](/compounds/aod-9604)",
      },
    ],
    faq: [
      { question: "What is AOD-9604 used for?", answer: "Lipolytic (fat-burning) effects in obesity and metabolic research. Also chondroprotective properties." },
      { question: "Is it the same as growth hormone?", answer: "No. It's a fragment of hGH (aa 177-191) without IGF-1, glucose, or anabolic effects." },
      { question: "Does it affect blood sugar?", answer: "No. No impact on glucose homeostasis or insulin sensitivity." },
      { question: "Has it been in clinical trials?", answer: "Yes. Phase 2b obesity trials completed. FDA GRAS status (2014)." },
      { question: "How is it administered?", answer: "Subcutaneous injection, typically 300\u2013500 mcg daily in research settings." },
    ],
    references: [
      "Ng FM, et al. Life Sci. 2000;66(15):1419-30. PMID: 11210732.",
      "Heffernan MA, et al. Int J Obes. 2001;25(Suppl 2):S34. PMID: 11549391.",
      "ClinicalTrials.gov NCT00515138.",
      "FDA GRAS Notification GRN No. 000521.",
      "Cao F, et al. Osteoarthritis Cartilage. 2003;11(11):825-31. PMID: 14609535.",
    ],
  },
  "cjc1295-research-summary": {
    slug: "cjc1295-research-summary",
    compoundSlug: "cjc-1295",
    pullQuote:
      "CJC-1295 doesn't force the pituitary open \u2014 it turns the volume dial up on an orchestra that was already playing the right song.",
    quickInfo: [
      { label: "Peptide Name", value: "CJC-1295 (Modified GRF 1-29 with DAC)" },
      { label: "Classification", value: "GHRH Analog" },
      { label: "CAS Number", value: "863288-34-0" },
      { label: "Molecular Weight", value: "3367.9 g/mol" },
      { label: "Half-Life (with DAC)", value: "5\u20138 days" },
      { label: "Half-Life (No DAC)", value: "~30 minutes" },
      { label: "Primary Research Areas", value: "GH axis, body composition, fat loss, recovery, healthy aging" },
    ],
    sections: [
      {
        title: "What Is CJC-1295?",
        body: "CJC-1295 is a synthetic 29-amino-acid analog of GHRH with two engineering upgrades: DPP-IV resistance and Drug Affinity Complex (DAC) for albumin binding, extending half-life from minutes to days.\n\n[**Browse CJC-1295 options \u2192**](/compounds/cjc-1295)",
      },
      {
        title: "DAC vs No DAC",
        body: "CJC-1295 with DAC: half-life 5\u20138 days, sustained GH/IGF-1 elevation. CJC-1295 No DAC (Mod GRF 1-29): half-life ~30 min, transient pulse. Same GHRH receptor activation.",
        subsections: [
          { title: "With DAC", body: "Covalently binds albumin. Half-life 5\u20138 days. Dosing once every 7\u20138 days." },
          { title: "No DAC (Mod GRF 1-29)", body: "No albumin binding. Half-life ~30 min. Dosing 2\u20133x daily." },
        ],
      },
      {
        title: "Mechanism of Action",
        body: "GHRH receptor binding \u2192 cAMP/PKA/CREB signalling \u2192 GH transcription and release \u2192 hepatic IGF-1 production. Somatostatin sensitivity and pulsatile secretion preserved.",
        subsections: [
          { title: "GHRH Receptor Binding", body: "GPCR activation triggers cAMP/PKA/CREB cascade, increasing GH transcription." },
          { title: "Preserved Pulsatility", body: "Amplifies pulse amplitude without eliminating inter-pulse trough (Iovino et al.)." },
          { title: "GH to IGF-1 Cascade", body: "Teichman et al. (2006): 1.5- to 3-fold IGF-1 increase persisting up to 6 days." },
        ],
      },
      {
        title: "Landmark Study: Teichman et al. (2006)",
        body: "First human trial of CJC-1295 with DAC. Single SC dose produced 2- to 10-fold GH increase and 1.5- to 3-fold IGF-1 increase for up to 6 days. Pulsatile secretion preserved. Established 5\u20138 day half-life for DAC variant.",
      },
      {
        title: "Research Applications",
        body: "GH/IGF-1 elevation supports muscle growth, metabolic function, recovery, and healthy aging research.",
        subsections: [
          { title: "Muscle Growth", body: "Indirect support through GH/IGF-1 mediated protein synthesis and nitrogen retention." },
          { title: "Fat Loss", body: "GH is lipolytic; sustained elevation mobilises fatty acids." },
          { title: "Longevity", body: "Counteracts somatopause (GH declines ~14%/decade after 30)." },
          { title: "Recovery and Sleep", body: "Amplifies nocturnal GH pulses during slow-wave sleep." },
        ],
      },
      {
        title: "Molecular Profile",
        table: { header: ["Property", "Value"], rows: [
          ["CAS Number", "863288-34-0"],
          ["Molecular Weight", "3367.9 g/mol"],
          ["Half-Life (with DAC)", "5\u20138 days"],
          ["Half-Life (No DAC)", "~30 minutes"],
          ["Signalling Pathway", "cAMP / PKA / CREB"],
        ]},
        body: "Key molecular properties of CJC-1295.",
      },
      {
        title: "Dosing and Safety",
        body: "With DAC: 30\u2013100 mcg/kg SC every 7\u20138 days. No DAC: 100\u2013200 mcg 2\u20133x daily. Favourable tolerability in human trials. Strictly for research use.\n\n[**Check CJC-1295 pricing \u2192**](/compounds/cjc-1295)",
      },
    ],
    faq: [
      { question: "Difference between DAC and No DAC?", answer: "DAC binds albumin (5\u20138 day half-life). No DAC (Mod GRF 1-29) has ~30 min half-life." },
      { question: "Does CJC-1295 increase testosterone?", answer: "No. Acts exclusively on GH axis via GHRH receptor." },
      { question: "Does it override GH pulsatility?", answer: "No. Pulsatile secretion is preserved (Teichman 2006, Iovino et al.)." },
      { question: "How long does CJC-1295 with DAC stay active?", answer: "Half-life 5\u20138 days, effects up to 6 days after single dose." },
      { question: "Is it approved for human use?", answer: "No. MHRA, FDA, or EMA approval. Research use only." },
    ],
    references: [
      "Teichman SL, et al. J Clin Endocrinol Metab. 2006;91(3):799-805. PMID: 16352680.",
      "Iovino M, et al. J Endocrinol Invest. 1995;18(8):585-591.",
      "Veldhuis JD, et al. Endocr Rev. 2008;29(7):823-864. PMID: 18940984.",
      "Schoenfeld BJ, et al. J Endocr Soc. 2017;1(10):1286-1302.",
      "Jaffe CA, et al. J Clin Endocrinol Metab. 1993;77(5):1298-1309. PMID: 8077326.",
    ],
  },
  "ipamorelin-research-summary": {
    slug: "ipamorelin-research-summary",
    compoundSlug: "ipamorelin",
    pullQuote:
      "Ipamorelin is the first GH secretagogue that learned the art of precision \u2014 it opens the GH floodgates without touching cortisol, ACTH, or prolactin.",
    quickInfo: [
      { label: "Peptide Name", value: "Ipamorelin" },
      { label: "Classification", value: "GH Secretagogue (GHS-R1a Agonist)" },
      { label: "CAS Number", value: "170851-70-4" },
      { label: "Molecular Weight", value: "711.9 g/mol" },
      { label: "Half-Life", value: "~2 hours (subcutaneous)" },
      { label: "Selectivity", value: "No cortisol, ACTH, prolactin, or aldosterone elevation" },
    ],
    sections: [
      {
        title: "What Is Ipamorelin?",
        body: "Ipamorelin is a synthetic pentapeptide selective GH secretagogue via GHS-R1a (ghrelin receptor). First described by Raun et al. (1998) as the first selective GH secretagogue.\n\n[**Compare Ipamorelin prices \u2192**](/compounds/ipamorelin)",
      },
      {
        title: "Why Selectivity Matters",
        body: "GHRP-2/GHRP-6 elevate cortisol by 40\u201380% and prolactin by 100\u2013300%. Ipamorelin produces equivalent GH without these effects.",
        subsections: [
          { title: "No Cortisol", body: "The most confounding variable in endocrine research \u2014 ipamorelin avoids it entirely." },
          { title: "No ACTH/Prolactin", body: "Receptor-level selectivity keeps corticotropic and lactotropic pathways at baseline." },
          { title: "Minimal Appetite", body: "Far milder appetite effects than GHRP-6." },
          { title: "No Aldosterone", body: "No significant effect at GH-stimulating doses." },
        ],
      },
      {
        title: "GHS-R1a vs GHRH",
        body: "Ipamorelin (GHS-R1a) is mechanistically distinct from GHRH analogs (CJC-1295, Sermorelin). They increase GH frequency vs amplitude respectively. Mechanistically complementary.\n\n[**Explore options \u2192**](/compounds/ipamorelin)",
        subsections: [
          { title: "vs CJC-1295", body: "CJC: GHRH receptor, 6\u20138 day half-life, GH amplitude. Ipamorelin: GHS-R1a, 2h half-life, GH frequency." },
          { title: "vs Sermorelin", body: "Sermorelin: 29-aa GHRH fragment, retains ACTH coupling. Ipamorelin: 5-aa, cleaner profile." },
        ],
      },
      {
        title: "Research Applications",
        body: "Most evidence is preclinical. GH/IGF-1 axis stimulation, body composition, bone health (Johansen 1999, Andersen 2001, Svensson 2000), recovery and sleep.",
      },
      {
        title: "Molecular Profile",
        body: "Key properties.",
        table: { header: ["Property", "Value"], rows: [
          ["CAS Number", "170851-70-4"],
          ["Molecular Weight", "711.9 g/mol"],
          ["Sequence", "Aib-His-D-2-Nal-D-Phe-Lys-NH2"],
          ["Receptor", "GHS-R1a (ghrelin receptor)"],
          ["Half-Life (SC)", "~2 hours"],
          ["Route", "Subcutaneous injection"],
        ]},
      },
      {
        title: "Safety and Regulatory",
        body: "Never approved for any clinical indication. Strictly investigational for research use only.\n\n[**Check Ipamorelin prices \u2192**](/compounds/ipamorelin)",
      },
    ],
    faq: [
      { question: "What makes ipamorelin different from GHRP-2/6?", answer: "Selectivity: no cortisol, ACTH, prolactin, or aldosterone elevation (Raun et al., 1998)." },
      { question: "How does it work?", answer: "GHS-R1a agonist on pituitary somatotrophs, calcium/IP3 signalling." },
      { question: "What is the dose range?", answer: "100\u2013300 mcg/day in small-animal models, SC." },
      { question: "Can it be combined?", answer: "Yes, with GHRH analogs (CJC-1295, Sermorelin) for synergistic GH release." },
      { question: "Is it approved?", answer: "No. MHRA, FDA, or EMA approval. Research use only." },
    ],
    references: [
      "Raun K, et al. Eur J Endocrinol. 1998;139(5):552-561. PMID: 9849821.",
      "Ahnfelt-Ronne I, et al. J Biol Chem. 2001;276(11):8045-8051. PMID: 11110797.",
      "Johansen PB, et al. Growth Horm IGF Res. 1999;9(5):301-308. PMID: 10584317.",
      "Andersen NB, et al. J Endocrinol. 2001;170(2):441-448. PMID: 11479141.",
      "Svensson J, et al. J Endocrinol. 2000;166(3):K11-K16. PMID: 10974664.",
    ],
  },
  "pt141-profile": {
    slug: 'pt141-profile',
    compoundSlug: 'pt-141',
    pullQuote: 'PT-141 ditches the plumbing metaphor entirely — it doesn\u2019t widen blood vessels like the little blue pill. Instead, it rewires the signal from the command centre: the brain. This is a central nervous system play, and that changes everything.',
    quickInfo: [
      { label: 'CAS Number', value: '189691-06-3' },
      { label: 'Molecular Weight', value: '1025.2 Da (C\u2085\u2080H\u2086\u2088N\u2081\u2084O\u2081\u2080)' },
      { label: 'Classification', value: 'Synthetic cyclic heptapeptide; melanocortin receptor agonist (MC3R / MC4R)' },
      { label: 'Evidence Strength', value: 'FDA-approved (Vyleesi\u00AE, 2019); Phase III RECONNECT trials; long-term safety n=684' },
      { label: 'Dose', value: '1.75 mg subcutaneous, up to 2\u00D7/week, max 8 doses/month' },
      { label: 'Half-Life', value: '~2.7 h' },
    ],
    sections: [
      {
        title: 'Mechanism of Action \u2014 The Brain First, Blood Vessels Second',
        body: 'Every established sexual health compound before PT-141 worked peripherally \u2014 dilating blood vessels, increasing blood flow to genital tissue. PDE5 inhibitors like sildenafil and tadalafil act on the vascular smooth muscle downstream. PT-141 flips the script entirely.\n\nPT-141 (bremelanotide) is a synthetic cyclic heptapeptide that acts as an agonist at melanocortin receptors, primarily MC4R and to a lesser extent MC3R, both expressed in the hypothalamic and limbic circuits that govern sexual arousal and reward. Unlike PDE5 inhibitors, its mechanism is wholly nitric oxide (NO)-independent: it does not rely on the NO\u2013cGMP signalling cascade at all.\n\nBy binding MC4R in the paraventricular nucleus of the hypothalamus, PT-141 triggers a cascade of dopaminergic and oxytocinergic signalling that amplifies the central perception of sexual desire and arousal. The result is not mechanical engorgement \u2014 it is a subjective, brain-driven increase in sexual motivation that can then manifest physically. This central mechanism explains why PT-141 remains effective in populations where peripheral vasodilators fail, including men with severe endothelial dysfunction or those on nitrate therapy where PDE5 inhibitors are contraindicated.',
        subsections: [
          {
            title: 'Central vs. Peripheral Distinction',
            body: 'The melanocortin system sits upstream of the peripheral vascular response. Animal models and human fMRI data show that MC4R agonism activates the medial preoptic area, the bed nucleus of the stria terminalis, and the ventral tegmental area \u2014 regions intimately tied to motivational salience and reward processing. This is a fundamentally different pharmacology from any PDE5 inhibitor on the market (PMID: 15118546).',
          },
        ],
      },
      {
        title: 'Clinical Evidence \u2014 From HSDD to Beyond',
        body: 'PT-141 carries the strongest evidence base of any research peptide in the sexual health space. It received FDA approval on 21 June 2019 (NDA 210557) as Vyleesi\u00AE for the treatment of hypoactive sexual desire disorder (HSDD) in premenopausal women, making it only the second drug ever approved for this indication and the first non-hormonal, on-demand injectable.\n\nPhase III data came from the RECONNECT programme \u2014 two pivotal randomised, double-blind, placebo-controlled trials (Kingberg et al., 2019). Over 1,200 premenopausal women with HSDD received 1.75 mg subcutaneous bremelanotide or placebo on-demand (as needed, up to 8 doses per month). The treatment arm showed statistically significant improvements on the Female Sexual Function Index (FSFI) desire domain and on the Female Sexual Distress Scale (FSDS-D), indicating both increased desire and reduced distress \u2014 the regulatory dual endpoint required for HSDD approval (PMID: 31122750).',
        subsections: [
          {
            title: 'Long-Term Safety Data',
            body: 'Clayton et al. (2022) published the largest long-term safety dataset for any melanocortin agonist: 684 women treated with on-demand bremelanotide over 12 months. The most common adverse events were nausea (~40% at initiation, dropping sharply with continued use), flushing, headache, and mild, transient blood pressure increases. No signal for cardiovascular events, no abuse liability, and no withdrawal syndrome upon discontinuation (PMID: 35431547).',
          },
          {
            title: 'Efficacy in Male Erectile Dysfunction',
            body: 'Diamond et al. (2004) demonstrated that intranasal PT-141 produced dose-dependent erectile responses in men with erectile dysfunction, including a subgroup who were non-responders to sildenafil. This was a proof-of-concept that central melanocortin agonism could salvage sexual function where peripheral vasodilators had failed \u2014 a finding that continues to drive research into MC4R-targeted therapies for mixed aetiologies of ED (PMID: 15118546).',
          },
        ],
      },
      {
        title: 'Dosing, Pharmacokinetics, and Practical Research Considerations',
        body: 'PT-141 is a polar, water-soluble cyclic heptapeptide with a molecular weight of 1025.2 Da, which limits oral bioavailability to near zero. Parenteral administration is required. The standard research and clinical protocol uses subcutaneous injection at a dose of 1.75 mg, typically delivered via an auto-injector pen into the abdomen or thigh.\n\nKey pharmacokinetic parameters from published data:\n\u2022 Time to peak plasma concentration (T\u2081\u2080\u2099\u209A): ~1 hour\n\u2022 Terminal half-life (t\u00BD): ~2.7 hours\n\u2022 Onset of subjective effect: 30\u201360 minutes post-injection\n\u2022 Duration of effect: 4\u20138 hours depending on individual response\n\nFrequency is limited to one dose per sexual event and no more than 8 doses per month. The 2.7-hour half-life means the compound clears rapidly, which contributes to its favourable on-demand profile.',
        table: {
          header: ['Parameter', 'Value'],
          rows: [
            ['CAS Number', '189691-06-3'],
            ['Molecular Formula', 'C\u2085\u2080H\u2086\u2088N\u2081\u2084O\u2081\u2080'],
            ['Molecular Weight', '1025.2 Da'],
            ['Half-Life', '~2.7 h'],
            ['T\u1d43\u209A\u2098\u1d43\u1d48', '~1 h'],
            ['Bioavailability', 'Subcutaneous only (near 0% oral)'],
            ['Dose', '1.75 mg SC, on-demand'],
            ['Max Frequency', '8 doses / month (2x / week)'],
            ['FDA Approval', '21 June 2019 (Vyleesi\u00AE)'],
          ],
        },
      },
      {
        title: 'Safety Profile and Contraindications',
        body: 'PT-141 has a well-characterised safety profile supported by clinical trials and post-market surveillance. The most common treatment-emergent adverse event is nausea, which occurs in approximately 40% of first-time users but typically subsides with subsequent dosing. Other frequent effects include facial flushing, headache, injection-site reactions, and transient elevations in blood pressure (typically 5\u201310 mmHg systolic).\n\nContraindications include uncontrolled hypertension (systolic > 150 mmHg or diastolic > 90 mmHg) and known cardiovascular disease, given the pressor effect. PT-141 should not be used concurrently with alcohol in excess, as this potentiates the nausea and hypotensive effects. There are no documented drug\u2013drug interactions with PDE5 inhibitors, and no signal for tachyphylaxis or dependence in the 12-month Clayton safety cohort.\n\nThe overall risk\u2013benefit profile is favourable for an on-demand agent: severe adverse events are rare, there is no abuse potential, and treatment discontinuation does not require tapering (PMID: 35431547).',
      },
    ],
    faq: [
      { question: 'How does PT-141 differ from sildenafil (Viagra\u00AE) or tadalafil (Cialis\u00AE)?', answer: 'Fundamentally. PDE5 inhibitors work peripherally by blocking the breakdown of cGMP, allowing blood vessels in the corpus cavernosum to dilate \u2014 they enable an erection but do not create desire. PT-141 works centrally on melanocortin receptors in the hypothalamus, targeting the brain\u2019s arousal and reward circuitry. It increases sexual desire and motivation, not just vascular response. Many researchers use both together for a combined central + peripheral effect.' },
      { question: 'Is PT-141 FDA-approved, and for what indication?', answer: 'Yes. PT-141 (as bremelanotide, brand name Vyleesi\u00AE) received FDA approval on 21 June 2019 (NDA 210557) for the treatment of hypoactive sexual desire disorder (HSDD) in premenopausal women. It is the first non-hormonal, on-demand injectable approved for this indication. Approval was based on the Phase III RECONNECT trials (Kingberg et al., 2019, PMID: 31122750).' },
      { question: 'What is the typical dosing protocol for PT-141 in research?', answer: 'The standard protocol is 1.75 mg administered via subcutaneous injection approximately 30\u201345 minutes before the desired onset of effect. Maximum frequency is one dose per day and no more than 8 doses per month. The half-life is ~2.7 hours, so effects typically last 4\u20138 hours. Lower doses (0.75\u20131.0 mg) are sometimes explored in sensitive subjects to minimise nausea.' },
      { question: 'Does PT-141 work for men with erectile dysfunction?', answer: 'Clinical data says yes. Diamond et al. (2004, PMID: 15118546) showed that intranasal PT-141 produced dose-dependent erectile responses in men with ED, including in a subgroup who failed to respond to sildenafil. However, FDA approval is currently limited to HSDD in premenopausal women. Male ED remains an active area of MC4R research.' },
      { question: 'What are the most common side effects, and how are they managed?', answer: 'Nausea is the most common AE (~40% at first dose), typically diminishing with subsequent use. Flushing, headache, injection-site reactions, and mild transient blood pressure elevation are also reported. Strategies include starting with a lower dose, dosing on an empty stomach, and avoiding concurrent alcohol. The nausea is centrally mediated (MC4R activation in the area postrema) and generally self-limiting.' },
    ],
    references: [
      'Kingberg SA, Clayton AH, Portman DJ, et al. Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Phase 3 Trials (RECONNECT). Obstet Gynecol. 2019;134(5):899\u2013908. PMID: 31122750',
      'Clayton AH, Althof SE, Kingsberg SA, et al. Long-Term Safety of Bremelanotide: Results From a 12-Month, Open-Label Trial in Premenopausal Women With Hypoactive Sexual Desire Disorder. J Sex Med. 2022;19(5):773\u2013783. PMID: 35431547',
      'Diamond LE, Earle DC, Rosen RC, et al. Double-blind, placebo-controlled evaluation of the safety, pharmacokinetic properties and pharmacodynamic effects of intranasal PT-141, a melanocortin receptor agonist, in healthy males and patients with mild-to-moderate erectile dysfunction. Int J Impot Res. 2004;16(1):51\u201359. PMID: 15118546',
      'Pfaus JG, Shadiack A, Van Soest T, et al. Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist. Proc Natl Acad Sci USA. 2004;101(27):10201\u201310204. PMID: 15220478',
      'Vyleesi (bremelanotide) injection prescribing information. AMAG Pharmaceuticals; FDA NDA 210557. June 2019.',
    ],
  },
  "ghkcu-deep-dive": {
    slug: 'ghkcu-deep-dive',
    compoundSlug: 'ghk-cu',
    pullQuote: 'GHK-Cu modulates the expression of over 4,000 genes \u2014 roughly 6% of the human genome \u2014 making it one of the most pleiotropic signalling peptides ever identified.',
    quickInfo: [
      { label: 'Molecular Formula', value: 'C14H24N6O4Cu' },
      { label: 'Molecular Weight', value: '403.93 Da (with copper)' },
      { label: 'CAS Number', value: '49557-75-7' },
      { label: 'Discovery', value: 'Dr. Loren Pickart, 1973' },
      { label: 'Class', value: 'Copper-binding tripeptide (glycyl-L-histidyl-L-lysine)' },
      { label: 'Common Dose Range', value: '1\u20135 mg daily (subcutaneous or topical)' },
    ],
    sections: [
      {
        title: 'Discovery and Genomic Reach',
        body: 'GHK-Cu (glycyl-L-histidyl-L-lysine-copper) was first isolated from human plasma albumin by Dr. Loren Pickart in 1973 during investigations into the factors that maintain tissue youth and vitality. The peptide consists of a glycine residue, a histidine residue, and a lysine residue in sequence, with the copper ion chelated by the histidine imidazole ring and terminal amino group \u2014 a coordination geometry critical to its biological activity.\n\nWhat distinguishes GHK-Cu from nearly every other signalling peptide is the sheer breadth of its genomic influence. Microarray and RNA-sequencing studies have demonstrated that GHK-Cu upregulates 2,328 genes and downregulates 1,721 genes, modulating approximately 6% of the human protein-coding genome. The upregulated cohort is dominated by transcripts for collagen types I and III, elastin, vascular endothelial growth factor (VEGF), fibroblast growth factor (FGF), nerve growth factor (NGF), antioxidant enzymes (superoxide dismutase, catalase), DNA repair machinery, and a range of anti-inflammatory mediators. The downregulated set includes pro-inflammatory cytokines such as interleukin-6 (IL-6), interleukin-1\u03b2 (IL-1\u03b2), matrix metalloproteinases (MMPs), and several well-characterised oncogenes.\n\nThis dual-directional transcriptional remodelling \u2014 simultaneously amplifying regenerative programmes while suppressing inflammatory and malignant pathways \u2014 underpins GHK-Cu\'s unusually broad therapeutic profile and explains its relevance across wound healing, dermatology, oncology, and neurology.',
        table: {
          header: ['Gene Group', 'Direction', 'Examples'],
          rows: [
            ['Structural ECM', 'Upregulated', 'COL1A1, COL3A1, Elastin, Fibrillin'],
            ['Growth Factors', 'Upregulated', 'VEGF, FGF, NGF, BDNF, KGF'],
            ['Antioxidant Defence', 'Upregulated', 'SOD1, SOD2, Catalase, GPX1'],
            ['DNA Repair', 'Upregulated', 'ERCC1, XPC, OGG1, BRCA1'],
            ['Anti-inflammatory', 'Upregulated', 'IL-10, TGF-\u03b21 (context-dependent), TIMP-1'],
            ['Pro-inflammatory', 'Downregulated', 'IL-6, IL-1\u03b2, TNF-\u03b1'],
            ['Matrix Remodelling', 'Downregulated', 'MMP-1, MMP-2, MMP-9, ADAMTS'],
            ['Oncogenic', 'Downregulated', 'MYC, KRAS, SRC, CCND1'],
          ],
        },
      },
      {
        title: 'Wound Healing, Tissue Regeneration, and Dermal Rejuvenation',
        body: 'The most extensively documented application of GHK-Cu is in wound healing and skin rejuvenation. The peptide accelerates dermal repair through at least three distinct mechanisms: (1) stimulation of fibroblast proliferation and collagen deposition, (2) promotion of angiogenesis via VEGF upregulation, and (3) recruitment and migration of stem cells to the wound bed.\n\nCollagen synthesis is a hallmark of GHK-Cu activity. In vitro, the peptide increases procollagen and collagen I/III production in human dermal fibroblasts by 3- to 7-fold depending on dose and culture conditions. This effect is accompanied by a concurrent reduction in MMP activity, tilting the balance from matrix degradation toward net matrix accumulation \u2014 a property that distinguishes GHK-Cu from retinoids, which can initially degrade collagen through MMP induction.\n\nSeveral head-to-head comparisons have found GHK-Cu topical formulations to outperform retinol and vitamin C in outcome measures such as skin firmness, fine-line reduction, and photodamage reversal while producing fewer irritant side effects. The peptide also enhances glycosaminoglycan (GAG) and proteoglycan synthesis, contributing to improved skin hydration and elasticity.',
        subsections: [
          {
            title: 'Hair Growth and Follicular Regeneration',
            body: 'GHK-Cu has attracted considerable interest in hair biology for its ability to promote anagen-phase extension and follicular stem cell migration. In ex vivo human hair follicle organ cultures, GHK-Cu prolongs the active growth (anagen) phase and delays the transition to catagen (regression). Mechanistically, the peptide upregulates FGF and VEGF within the dermal papilla, enhancing the vascular supply to the follicle, while simultaneously suppressing dihydrotestosterone (DHT)-driven miniaturisation signals.',
          },
          {
            title: 'Anti-Inflammatory Signalling Without COX Inhibition',
            body: 'Unlike conventional non-steroidal anti-inflammatory drugs (NSAIDs), GHK-Cu suppresses inflammation at the transcriptional level rather than through cyclooxygenase (COX) enzyme inhibition. The peptide downregulates IL-6, TNF-\u03b1, and TGF-\u03b21 expression by interfering with NF-\u03baB nuclear translocation and AP-1 signalling. This gene-level anti-inflammatory mechanism avoids the gastrointestinal, renal, and cardiovascular side-effect profiles associated with chronic NSAID use.',
          },
        ],
      },
      {
        title: 'Anti-Cancer and Neuroprotective Potential',
        body: 'The gene-expression signature of GHK-Cu reveals an intriguing anti-cancer profile that has been validated across multiple cancer cell lines. The peptide downregulates key oncogenes (MYC, KRAS, SRC, CCND1) and upregulates tumour suppressors (TP53, CDKN1A/p21, PTEN) and DNA repair genes (ERCC1, XPC, BRCA1). In prostate, breast, and pancreatic cancer cell lines, GHK-Cu has been shown to reduce proliferation, induce apoptosis, and inhibit migration and invasion.\n\nIn the nervous system, GHK-Cu upregulates NGF and brain-derived neurotrophic factor (BDNF) \u2014 two neurotrophins critical for neuronal survival, synaptic plasticity, and neurogenesis. The peptide also boosts superoxide dismutase (SOD) activity, protecting neurons from oxidative stress implicated in Alzheimer\'s and Parkinson\'s disease. In rodent models of traumatic brain injury and cerebral ischaemia, GHK-Cu reduced lesion volume, improved functional recovery, and decreased microglial activation.',
      },
      {
        title: 'Pharmacokinetics, Dosing, and Practical Considerations',
        body: 'GHK-Cu is a small, highly water-soluble peptide (403.93 Da) that is stable in solution when properly formulated. The copper centre is essential for biological activity \u2014 the un-complexed tripeptide (GHK) lacks the genomic effects described above.\n\nFor systemic research, the most common dosing regimen is 1\u20135 mg daily administered via subcutaneous injection. The peptide is rapidly absorbed with a short plasma half-life (approximately 20\u201330 minutes in rodents), yet the transcriptional effects persist for 12\u201324 hours post-dose. Topical formulations typically use concentrations ranging from 0.1% to 2% (w/w), often incorporated into liposomal or copper-peptide complexes to enhance dermal penetration.\n\nGHK-Cu is generally well-tolerated. The most commonly reported adverse effects are mild and localised: transient erythema, pruritus, or a subtle copper taste shortly after subcutaneous injection. The peptide is contraindicated in patients with Wilson\'s disease and should be used with caution in oestrogen-sensitive conditions.',
      },
    ],
    faq: [
      { question: 'How does GHK-Cu differ from other copper peptides like AHK-Cu?', answer: 'GHK-Cu (glycyl-L-histidyl-L-lysine-copper) is the only copper peptide that has been mapped to broad transcriptional regulation \u2014 modulating over 4,000 genes. AHK-Cu is a synthetic analogue with some overlapping wound-healing activity but lacks the genomic reach of GHK-Cu.' },
      { question: 'What is the mechanism behind GHK-Cu\'s anti-ageing effects on skin?', answer: 'GHK-Cu reverses skin ageing through three coordinated mechanisms: (1) upregulates collagen types I and III, elastin, and GAG synthesis, restoring dermal matrix density; (2) suppresses MMP-1, MMP-2, and MMP-9, reducing collagen breakdown; and (3) promotes angiogenesis via VEGF upregulation, improving microcirculation to the dermis.' },
      { question: 'Can GHK-Cu promote hair growth?', answer: 'Preclinical evidence indicates GHK-Cu extends the anagen (growth) phase of the hair cycle and stimulates follicular stem cell migration, in part through FGF and VEGF upregulation in the dermal papilla. No head-to-head clinical trials exist against minoxidil, but the distinct mechanisms suggest potential synergy.' },
      { question: 'Is GHK-Cu safe for long-term use?', answer: 'Available evidence suggests GHK-Cu has a favourable safety profile for long-term administration. The peptide is endogenous to human plasma (present at ~200 ng/mL in young adults). The most common side effects are mild injection-site reactions and, occasionally, a transient copper taste. Long-term animal studies have not identified organ toxicity or carcinogenicity.' },
      { question: 'Does GHK-Cu cross the blood-brain barrier?', answer: 'Yes. The copper centre of GHK-Cu facilitates transport across the blood-brain barrier, likely through copper-transporting ATPases expressed in brain capillary endothelial cells. Once in the CNS, GHK-Cu upregulates NGF and BDNF, enhances SOD activity, and suppresses microglial activation.' },
    ],
    references: [
      'Pickart L. The human tri-peptide GHK and tissue remodeling. J Biomater Sci Polym Ed. 2008;19(8):969-88.',
      'Pickart L, Vasquez-Soltero JM, Margolina A. GHK and DNA: Resetting the Human Genome to Health. Biomed Res Int. 2014;2014:763219.',
      'Pickart L, Vasquez-Soltero JM, Margolina A. GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration. Biomed Res Int. 2015;2015:648108.',
      'Gruber JV, et al. Quantification of the effect of GHK-Cu on collagen in human dermal fibroblast cultures. Int J Cosmet Sci. 2005;27(5):255-61.',
      'Wegrowski Y, et al. Stimulation of sulfated glycosaminoglycan synthesis by the tripeptide-copper complex GHK-Cu2+. Life Sci. 1992;51(16):1249-58.',
      'Dowling D, et al. The tripeptide-copper complex GHK-Cu enhances wound healing by upregulating angiogenesis and collagen deposition. Wound Repair Regen. 2011;19(5):545-54.',
    ],
  },
  "retatrutide-deep-dive": {
    slug: 'retatrutide-deep-dive',
    compoundSlug: 'retatrutide',
    pullQuote: 'Retatrutide represents a paradigm shift in metabolic medicine \u2014 the first triple-receptor agonist to achieve mean weight loss exceeding 24% in phase 2, approaching the efficacy of bariatric surgery through simultaneous engagement of GIP, GLP-1, and glucagon pathways.',
    quickInfo: [
      { label: 'Molecule', value: 'Retatrutide (LY3437943)' },
      { label: 'Class', value: 'Triple agonist (GIP / GLP-1 / glucagon)' },
      { label: 'Developer', value: 'Eli Lilly and Company' },
      { label: 'Amino Acids', value: '39' },
      { label: 'Half-Life', value: '~6 days' },
      { label: 'Dosing', value: 'Once-weekly subcutaneous' },
      { label: 'Phase 2 Weight Loss', value: '24.2% at 48 weeks (12 mg)' },
      { label: 'Phase 2 HbA1c Reduction', value: 'Up to 2.16% at 36 weeks' },
      { label: 'Status', value: 'Phase 3 trials ongoing' },
    ],
    sections: [
      {
        title: 'Mechanism of Action: Triple-Receptor Synergy',
        body: 'Retatrutide (LY3437943) is a synthetic 39-amino-acid peptide engineered by Eli Lilly as a balanced triple agonist of the glucose-dependent insulinotropic polypeptide (GIP) receptor, glucagon-like peptide-1 (GLP-1) receptor, and the glucagon receptor. Unlike dual agonists such as tirzepatide, which activates only GIP and GLP-1, retatrutide incorporates glucagon receptor agonism to unlock an additional axis of metabolic regulation.\n\nEach receptor contributes a distinct physiological effect that collectively produces weight loss and glycemic improvement beyond what any single pathway can achieve. GLP-1 receptor activation promotes glucose-dependent insulin secretion, delays gastric emptying, and enhances satiety through central appetite-regulating circuits. GIP receptor activation augments insulin secretion and modulates lipid metabolism. The glucagon receptor component is the key differentiator \u2014 stimulating hepatic fatty acid oxidation, increasing resting energy expenditure by 5\u201310%, and promoting thermogenesis.',
        subsections: [
          {
            title: 'GLP-1 Pathway: Satiety and Glycemic Control',
            body: 'Retatrutide\'s GLP-1 agonism mirrors that of semaglutide: it enhances glucose-stimulated insulin secretion from pancreatic beta cells, suppresses glucagon release when glucose is elevated, and slows gastric emptying to reduce postprandial glucose excursions. Centrally, GLP-1 receptor activation in the arcuate nucleus and brainstem reduces appetite and food intake.',
          },
          {
            title: 'GIP Pathway: Metabolic Flexibility',
            body: 'GIP receptor activation potentiates glucose-dependent insulin secretion and improves adipocyte function by promoting lipid buffering \u2014 the uptake and storage of dietary fat in subcutaneous adipose tissue rather than ectopic deposition in the liver, muscle, or pancreas. This reduces the lipotoxicity that drives insulin resistance.',
          },
          {
            title: 'Glucagon Pathway: Energy Expenditure and Fat Oxidation',
            body: 'Glucagon receptor agonism is retatrutide\'s signature innovation. Activation of glucagon receptors in the liver stimulates glycogenolysis, fatty acid oxidation, and ketogenesis. The net effect is a 5\u201310% increase in resting metabolic rate, meaning patients expend more energy at rest. This thermogenic component is absent from GLP-1 monotherapies and dual agonists.',
          },
        ],
      },
      {
        title: 'Clinical Trial Data: Phase 2 Breakthroughs',
        body: 'The landmark phase 2 obesity trial, led by Jastreboff and colleagues and published in the New England Journal of Medicine in 2023, enrolled adults with obesity or overweight with at least one weight-related comorbidity. Participants received escalating doses of retatrutide \u2014 1 mg, 4 mg, 8 mg, or 12 mg \u2014 or placebo via once-weekly subcutaneous injection for 48 weeks.\n\nResults from the 12 mg cohort were unprecedented: mean body weight reduction of 24.2% at 48 weeks. A substantial proportion of participants lost more than 30% of their baseline body weight, a threshold previously achievable only with bariatric surgery. In the phase 2 diabetes trial, HbA1c reductions reached 2.16% at 36 weeks with concurrent mean weight loss of 16.9%.',
        table: {
          header: ['Endpoint', 'Retatrutide 12 mg', 'Retatrutide 8 mg', 'Placebo'],
          rows: [
            ['Mean weight loss at 48 weeks', '24.2%', '22.5%', '2.1%'],
            ['Proportion losing >30% body weight', '~30%', '~20%', '0%'],
            ['HbA1c reduction at 36 weeks (T2D)', '2.16%', '1.93%', '0.2%'],
            ['Liver fat reduction (MASLD)', '80\u201390%', '70\u201385%', '10%'],
            ['Resting metabolic rate increase', '5\u201310%', '5\u20138%', '0%'],
            ['Systolic BP reduction', '~12 mmHg', '~10 mmHg', '~2 mmHg'],
          ],
        },
      },
      {
        title: 'Metabolic Effects Beyond Weight Loss',
        body: 'Retatrutide\'s triple-agonist profile produces therapeutic effects that extend well beyond weight reduction and glycemic control. Of particular interest is its impact on liver fat content in patients with MASLD. Phase 2 data demonstrated liver fat reductions of 80\u201390% as measured by MRI-PDFF, representing near-complete hepatic steatosis resolution. This is attributed to the combination of GIP-mediated lipid partitioning and glucagon-stimulated hepatic fatty acid oxidation.\n\nCardiometabolic markers have also shown consistent improvement. Systolic blood pressure declined by ~12 mmHg on the 12 mg dose, while triglycerides and LDL cholesterol both decreased significantly. Phase 3 trials are underway to evaluate these effects in dedicated cardiovascular outcomes trials.',
      },
      {
        title: 'Safety, Tolerability, and Ongoing Development',
        body: 'The safety profile of retatrutide is broadly consistent with the incretin class, with gastrointestinal adverse events \u2014 nausea, vomiting, diarrhoea, and constipation \u2014 being the most commonly reported. These events were dose-dependent and predominantly mild-to-moderate in severity. The phase 2 trials employed gradual dose titration schedules to mitigate gastrointestinal intolerance.\n\nA notable safety consideration is the theoretical risk of hyperglycaemia from glucagon receptor activation. However, concurrent GIP and GLP-1 activity provides sufficient counter-regulatory insulin secretion, and no unexpected signals were observed. Eli Lilly has initiated a comprehensive phase 3 development programme (TRIUMPH trials) encompassing obesity, type 2 diabetes, and MASH.',
      },
    ],
    faq: [
      { question: 'How does retatrutide differ from semaglutide and tirzepatide?', answer: 'Semaglutide is a GLP-1 receptor agonist only. Tirzepatide is a dual GIP/GLP-1 agonist. Retatrutide is a triple GIP/GLP-1/glucagon agonist. The addition of glucagon receptor agonism increases resting energy expenditure by 5\u201310%, producing greater mean weight loss \u2014 24.2% versus ~15\u201321% for tirzepatide.' },
      { question: 'What is the dosing schedule for retatrutide?', answer: 'Once-weekly subcutaneous injection. Half-life is ~6 days achieved through fatty acid acylation promoting albumin binding. Dose escalation follows a gradual multi-step titration schedule to improve gastrointestinal tolerability.' },
      { question: 'Can retatrutide reverse fatty liver disease?', answer: 'Phase 2 data show 80\u201390% reductions in liver fat content in patients with MASLD, among the largest reductions observed with any pharmacological agent. Dedicated phase 3 trials in MASH with fibrosis are ongoing.' },
      { question: 'Is the glucagon component safe in people with diabetes?', answer: 'Yes. GLP-1 and GIP components provide potent counter-regulatory insulin secretion. Phase 2 data showed no excess of hyperglycaemic events, even in the type 2 diabetes cohort.' },
      { question: 'When might retatrutide be approved?', answer: 'If phase 3 data remain consistent, regulatory filings could occur as early as 2026\u20132027. The primary risks are gastrointestinal tolerability at scale and long-term cardiovascular safety.' },
    ],
    references: [
      'Jastreboff AM, et al. Triple-hormone-receptor agonist retatrutide for obesity \u2014 a phase 2 trial. N Engl J Med. 2023;389(6):514-526.',
      'Rosenstock J, et al. Retatrutide for type 2 diabetes: a randomised phase 2 trial. Lancet. 2023;402(10410):1249-1261.',
      'Coskun T, et al. LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist. Diabetes. 2022;71(Suppl 1):255-OR.',
      'Nahra R, et al. Effects of retatrutide on liver fat content and metabolic parameters in MASLD. J Hepatol. 2024;80(Suppl 1):S12-S13.',
      'Kosiborod MN, et al. Cardiovascular effects of retatrutide in obesity. Eur Heart J. 2024;45(15):1350-1362.',
    ],
  },
  "semax-deep-dive": {
    slug: 'semax-deep-dive',
    compoundSlug: 'semax',
    pullQuote: 'A single intranasal dose of Semax reprograms 24 genes within 20 minutes \u2014 upregulating BDNF and NGF, modulating the default mode network, and activating neuroprotective cascades that persist for hours after the peptide has cleared the bloodstream.',
    quickInfo: [
      { label: 'Classification', value: 'Synthetic heptapeptide (ACTH fragment 4-10 analog)' },
      { label: 'Route', value: 'Intranasal' },
      { label: 'Dose Range', value: '300 \u2013 600 mcg per dose, 1\u20132\u00D7 daily' },
      { label: 'Cycle Length', value: '2\u20134 weeks' },
      { label: 'Tmax', value: '20 minutes' },
      { label: 'Half-Life', value: '1.3 hours' },
      { label: 'Duration of Action', value: '~6.3 hours' },
      { label: 'First Clinical Use', value: 'Russia, 1990s' },
    ],
    sections: [
      {
        title: 'Introduction and Historical Context',
        body: 'Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) developed from the ACTH fragment 4\u201310. Originally investigated for its ability to influence learning and memory independent of steroidogenic activity, Semax was brought to clinical use in Russia during the 1990s as a prescription nootropic and neuroprotective agent. Its regulatory approval for acute cerebral hypoxia, ischemic stroke, and traumatic brain injury marked a significant milestone in peptide-based neurotherapeutics.\n\nOver three decades of clinical application have established Semax as one of the most extensively characterized nootropic peptides. Its safety profile, built on continuous post-marketing surveillance since the 1990s, stands in contrast to many unregulated research peptides. Unlike classical stimulants that modulate neurotransmitter levels directly, Semax works through gene-expression programs that support neuroplasticity, vascular health, and cellular resilience.',
        subsections: [
          {
            title: 'From ACTH Fragment to Therapeutic Peptide',
            body: 'The discovery that ACTH fragments could influence behavior without stimulating cortisol release opened a new avenue in neuropeptide research. By truncating the full ACTH molecule to residues 4\u201310, researchers retained the cognitive-modulating properties while eliminating endocrine activity. Semax is the optimized synthetic version with modifications enhancing stability, receptor affinity, and BBB penetration when administered intranasally.',
          },
        ],
      },
      {
        title: 'Mechanism of Action',
        body: 'Semax exerts its effects through a multi-layered mechanism spanning receptor signaling, gene expression, and network-level brain modulation.',
        subsections: [
          {
            title: 'Melanocortin Receptor Binding and BDNF/NGF Upregulation',
            body: 'Semax binds to melanocortin receptors MC3 and MC4 in the CNS. This triggers a signaling cascade that rapidly upregulates BDNF and NGF \u2014 two proteins central to neuronal survival, synaptic plasticity, and neurogenesis. BDNF levels rise in the hippocampus and frontal cortex within just 20 minutes of a single intranasal dose, and this elevation persists for hours.',
          },
          {
            title: 'Rapid Gene Expression Remodeling',
            body: 'Within 20 minutes of administration, Semax alters the expression of 24 distinct genes governing vascular function, neuronal survival, immune modulation, and mitochondrial stability. This rapid transcriptional effect helps explain why the peptide produces measurable clinical effects in acute settings such as stroke and TBI.',
          },
          {
            title: 'Default Mode Network Modulation',
            body: 'Semax modulates the default mode network (DMN), a large-scale brain network implicated in self-referential thought and memory consolidation. It also influences serotonin and dopamine systems indirectly through the BDNF cascade, contributing to its mood-elevating effects without tolerance or withdrawal.',
          },
          {
            title: 'Angiogenesis in Ischemia',
            body: 'In ischemic tissue, Semax supports angiogenesis, smooth muscle cell migration, and erythropoiesis through the melanocortin receptor pathway, making it uniquely suited for conditions requiring both neuronal survival and vascular recovery.',
          },
        ],
      },
      {
        title: 'Pharmacokinetics and Dosing',
        body: 'Semax is administered intranasally, providing direct CNS access via olfactory and trigeminal nerve pathways, bypassing the blood-brain barrier and avoiding first-pass hepatic metabolism.',
        subsections: [
          {
            title: 'Absorption and Distribution',
            body: 'Peak plasma concentration (Tmax) is ~20 minutes after intranasal administration. Elimination half-life is ~1.3 hours, yet biological activity extends to ~6.3 hours \u2014 consistent with a self-propagating signaling cascade rather than continuous receptor occupancy.',
          },
          {
            title: 'Standard Dosing Protocols',
            body: 'Typical dosing: 300\u2013600 mcg per administration, 1\u20132x daily. Standard cycle: 2\u20134 weeks, followed by an off-period. Intranasal is the only clinically validated route.',
          },
          {
            title: 'Stabilized Analogues',
            body: 'NA-Semax and NA-Semax Amidate incorporate N-terminal acetylation and C-terminal amidation, extending half-life by 2\u20135x compared to standard Semax. These allow less frequent dosing and more sustained neurotrophin elevation.',
          },
        ],
      },
      {
        title: 'Clinical Applications and Safety',
        body: 'Semax has been the subject of extensive clinical research in Russia, where it remains a prescription medication with decades of real-world use.',
        subsections: [
          {
            title: 'Neuroprotection in Ischemia and TBI',
            body: 'Semax modulates genes involved in immune response, vascular integrity, and neuronal survival simultaneously \u2014 a coordinated multi-target neuroprotective strategy. In animal models of focal cerebral ischemia, Semax significantly reduces infarct volume and improves neurological deficit scores.',
          },
          {
            title: 'Cognitive Enhancement',
            body: 'In rodent models, Semax consistently improves performance on learning and memory tasks (Morris water maze, passive avoidance). Improvements are tied directly to BDNF upregulation in the hippocampus and frontal cortex.',
          },
          {
            title: 'Safety Profile',
            body: 'Used clinically in Russia for over 30 years with a well-established safety record. Side effects are rare and generally mild: occasional nasal irritation, transient headache, or slight BP changes. No tolerance, dependence, or withdrawal syndrome documented.',
          },
        ],
      },
    ],
    faq: [
      { question: 'How quickly does Semax work?', answer: 'Peak plasma concentration within 20 minutes. Gene expression changes begin in the same window. BDNF upregulation detectable within 20\u201330 minutes. Subjective cognitive effects within the first hour, sustained ~6 hours.' },
      { question: 'Does Semax affect cortisol?', answer: 'No. Semax is derived from ACTH 4\u201310 fragment which has no steroidogenic activity. It does not stimulate cortisol release or activate the HPA axis.' },
      { question: 'What is the difference between Semax, NA-Semax, and NA-Semax Amidate?', answer: 'Standard Semax half-life ~1.3h. NA-Semax and NA-Semax Amidate extend half-life by 2\u20135x through chemical modifications resisting enzymatic degradation.' },
      { question: 'Can Semax be used long-term?', answer: 'Standard protocol is 2\u20134 weeks on, equal off-period. Over 30 years of clinical use shows intermittent use is well tolerated with no tolerance, dependence, or withdrawal.' },
      { question: 'Does Semax cross the blood-brain barrier?', answer: 'Reaches CNS primarily through intranasal route via olfactory and trigeminal nerves, bypassing the BBB entirely.' },
    ],
    references: [
      'Dmitrieva VG, et al. Semax affects expression of genes involved in vascular function, neuronal survival, and mitochondrial stability. Mol Biol. 2010;44(4):594-603.',
      'Dolotov OV, et al. Semax and its analog stabilize BDNF mRNA levels in the rat brain. Peptides. 2006;27(11):2813-2819.',
      'Levitskaya NG, et al. Effects of semax on monoamine metabolism. Neurosci Behav Physiol. 2002;32(6):607-611.',
      'Medvedev VE, et al. Clinical efficacy of semax in acute cerebral ischemia. Zh Nevrol Psikhiatr. 2000;100(5):27-31.',
      'Ashmarin IP, et al. Semax as a prototype of new neuroprotective drugs. Vestn Ross Akad Med Nauk. 2005;(6):44-49.',
      'Myasoedov NF, et al. N-acetyl Semax and NA-Semax Amidate: doubled half-life. Dokl Biochem Biophys. 2014;458(1):176-178.',
    ],
  },
};

export default content;
