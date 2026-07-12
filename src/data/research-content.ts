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
};

export default content;
