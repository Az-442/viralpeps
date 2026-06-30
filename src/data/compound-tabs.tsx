// ── Compound tab content data ──
// Each compound gets its own content for Overview, Molecular, Indications,
// Dosing, Interactions, Timeline, Safety, Quality, References tabs.
// The component looks up content by compound slug.

import React from "react";

// ── Types ──
export interface MolecularItem {
  label: string;
  value: string;
}

export interface Indication {
  title: string;
  desc: string;
}

export interface DosingRow {
  goal: string;
  dose: string;
  freq: string;
  route: string;
}

export interface InteractionCard {
  slug: string;
  name: string;
  desc: string;
  effect: "Synergistic" | "Complementary" | "Supportive";
}

export interface TimelinePhase {
  day: string;
  title: string;
  desc: string;
  color: "blue" | "emerald" | "purple";
  icon: string;
}

export interface SafetyCard {
  label: string;
  text: string;
  icon: string;
  color: "amber" | "red" | "blue" | "emerald";
}

export interface CompoundTabContent {
  overview: {
    whatIs: string;
    mechanism: string;
    benefits: string[];
  };
  molecular: {
    items: MolecularItem[];
    diagramTitle: string;
    diagramSubtitle: string;
    residues: { x: number; y: number; label: string; color: string; name: string }[];
    legend: string;
  };
  indications: {
    mostEffective: Indication[];
    effective: Indication[];
    moderate: Indication[];
  };
  dosing: {
    note: string;
    rows: DosingRow[];
    tips: string[];
  };
  interactions: {
    note: string;
    cards: InteractionCard[];
    stackNotes: string[];
  };
  timeline: {
    phases: TimelinePhase[];
  };
  safety: {
    cards: SafetyCard[];
  };
  references: string[];
}

// ── Compound content map ──
const compoundTabs: Record<string, CompoundTabContent> = {
  "ipamorelin": {
    overview: {
      whatIs: "Ipamorelin is a selective pentapeptide growth hormone secretagogue that stimulates natural GH production from the pituitary gland. It was developed as a more targeted alternative to other GHRPs, with minimal cortisol and prolactin disruption. Known for its excellent safety profile and consistent GH pulses, Ipamorelin produces reliable growth hormone release without significant side effects.",
      mechanism: "Ipamorelin binds selectively to ghrelin receptors (GHSR-1a) in the pituitary gland, stimulating natural GH release with high specificity. Unlike GHRP-6, it has negligible effects on appetite and minimal impact on cortisol and prolactin levels, making it a more targeted GH secretagogue for research protocols.",
      benefits: [
        "Optimal GH stimulation with superior bioavailability and consistent pulse amplitude",
        "Body composition improvements — promotes lean mass development and fat reduction",
        "Enhanced recovery and anti-aging effects through GH/IGF-1 axis activation",
        "Minimal side effects compared to other GHRPs — no significant cortisol or prolactin elevation",
        "Improved sleep quality through nocturnal GH pulse enhancement",
        "Well-tolerated with an excellent safety profile in research models",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "711.85 Da" },
        { label: "Sequence", value: "Aib-His-D-2-Nal-D-Phe-Lys-NH₂" },
        { label: "Length", value: "5 amino acids" },
        { label: "Type", value: "Growth hormone secretagogue | Selective GHRP" },
        { label: "Half-Life", value: "~2 hours" },
        { label: "CAS Number", value: "100535-87-4" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Ipamorelin",
      diagramSubtitle: "5-mer · 711.85 Da · Sequence: Aib-His-Nal-Phe-Lys-NH₂",
      residues: [
        { x: 40, y: 100, label: "Aib", color: "#8b5cf6", name: "Aib" },
        { x: 85, y: 100, label: "H", color: "#0891b2", name: "His" },
        { x: 130, y: 100, label: "Nal", color: "#d97706", name: "Nal" },
        { x: 175, y: 100, label: "F", color: "#7c3aed", name: "Phe" },
        { x: 220, y: 100, label: "K", color: "#6366f1", name: "Lys" },
      ],
      legend: "Aib=α-aminoisobutyric  H=His  Nal=Naphthylalanine  F=Phe  K=Lys",
    },
    indications: {
      mostEffective: [
        { title: "GH Stimulation", desc: "Consistent GH pulse stimulation with reliable amplitude and minimal trough between pulses. Ipamorelin provides targeted, high-specificity GH release through selective GHSR-1a binding." },
        { title: "Muscle Growth", desc: "Promotes lean muscle mass development through GH/IGF-1 axis activation with superior bioavailability and minimal side effects." },
        { title: "Recovery Enhancement", desc: "Accelerates post-exercise recovery and tissue repair through anabolic signalling via the GH/IGF-1 cascade." },
      ],
      effective: [
        { title: "Fat Loss", desc: "Aids in fat reduction through improved metabolic rate and GH-mediated lipolysis. Ipamorelin supports favourable body composition changes via the GH/IGF-1 metabolic axis." },
        { title: "Anti-Aging", desc: "Supports healthy aging through GH pulse restoration and improved body composition. Ipamorelin helps restore youthful GH pulsatility patterns." },
        { title: "Sleep Quality", desc: "Improves sleep architecture and depth through GH release during nocturnal pulses. Enhanced slow-wave sleep associated with GH pulse timing." },
      ],
      moderate: [
        { title: "Bone Health", desc: "Supports bone mineral density through GH/IGF-1 mediated osteoblast activity. May contribute to improved skeletal health in long-term research protocols." },
        { title: "Appetite Stimulation", desc: "Mild ghrelin receptor activation may enhance appetite. Significantly less pronounced than GHRP-6, making Ipamorelin preferred when hunger effects are unwanted." },
      ],
    },
    dosing: {
      note: "Best taken on an empty stomach (30 min before or 2 hours after meals). Do not eat for 30 minutes post-injection to avoid blunting GH pulse. Rotate injection sites. Morning and pre-bed dosing mimics natural GH pulses.",
      rows: [
        { goal: "General Health & Longevity", dose: "200 mcg", freq: "1x daily before bed", route: "SubQ" },
        { goal: "Body Composition", dose: "250-300 mcg", freq: "2x daily (morning + pre-workout)", route: "SubQ" },
        { goal: "Athletic Performance", dose: "200-250 mcg", freq: "2-3x daily", route: "SubQ" },
        { goal: "Sleep & Recovery", dose: "200 mcg", freq: "1x daily 30min before bed", route: "SubQ" },
        { goal: "Anti-Aging Protocol", dose: "200-250 mcg", freq: "1-2x daily", route: "SubQ" },
      ],
      tips: [
        "Best taken on an empty stomach for maximum GH pulse amplitude",
        "Do not eat for 30 minutes post-injection to avoid blunting the GH pulse",
        "Rotate injection sites to prevent tissue irritation",
        "Morning and pre-bed dosing mimics the body's natural GH pulse pattern",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store reconstituted peptide at 2-8°C; use within 28 days",
      ],
    },
    interactions: {
      note: "Ipamorelin has been studied in combination with other peptides for synergistic research applications.",
      cards: [
        { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)", desc: "Synergistic — The most studied GHRH/GHRP stack. CJC-1295 stimulates GHRH receptors while Ipamorelin acts on ghrelin receptors, producing a synergistic GH pulse significantly greater than either alone.", effect: "Synergistic" },
        { slug: "tesamorelin", name: "Tesamorelin", desc: "Synergistic — Tesamorelin (GHRH analog) combined with Ipamorelin amplifies GH release through complementary pituitary stimulation pathways.", effect: "Synergistic" },
        { slug: "ghrp-2", name: "GHRP-2", desc: "Alternative — Both are GHRPs but Ipamorelin is preferred when minimal cortisol/prolactin elevation is desired for research protocols.", effect: "Complementary" },
        { slug: "ghrp-6", name: "GHRP-6", desc: "Alternative — GHRP-6 causes significant appetite stimulation; Ipamorelin is preferred when hunger effects are unwanted in the research model.", effect: "Complementary" },
        { slug: "sermorelin", name: "Sermorelin", desc: "Supportive — Sermorelin (GRF 1-29) paired with Ipamorelin creates a dual-pathway GH stimulation protocol for enhanced GH release.", effect: "Supportive" },
        { slug: "mod-grf-1-29", name: "Mod GRF (1-29)", desc: "Supportive — Modified GRF(1-29) provides GHRH agonism that complements Ipamorelin's ghrelin receptor targeting for comprehensive GH axis research.", effect: "Supportive" },
      ],
      stackNotes: [
        "CJC-1295 (No DAC) and Ipamorelin are the most studied GHRH/GHRP combination for GH secretion research",
        "Always introduce one compound at a time in research protocols to isolate effects",
        "Dosage adjustments may be needed when combining peptides — consult published protocols",
        "Consider half-life differences when designing combination dosing schedules",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "Begin daily dosing protocol. First GH pulses detected post-injection. No significant physiological changes yet.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Early Response Phase", desc: "Consistent GH pulse pattern established. Sleep quality may improve. Early metabolic changes begin as GH/IGF-1 signalling initiates.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Physiological Adaptation", desc: "Increased IGF-1 production begins. Early improvements in recovery time and body composition may be observed through GH-mediated anabolic effects.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Active Remodelling Phase", desc: "Continued GH/IGF-1 elevation supports lean mass preservation and fat metabolism. Most noticeable changes in body composition and recovery.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-84", title: "Peak Effect Phase", desc: "Maximum physiological response achieved. Consistent improvements in muscle quality, fat loss, and sleep architecture observed.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84-168", title: "Study Conclusion", desc: "Standard 3-6 month research cycle. Comprehensive assessment of GH/IGF-1 biomarkers, body composition changes, and functional outcomes.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "Ipamorelin is not approved for human consumption by the MHRA, FDA, or any regulatory body. For in-vitro and animal research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Hormonal Considerations", text: "As a GH secretagogue, Ipamorelin alters the HGH/IGF-1 axis. Monitor GH and IGF-1 levels in long-term studies. Prolonged use may affect natural GH pulsatility.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Contraindications", text: "Extra caution advised for research involving subjects with active cancer, pituitary disorders, or diabetes, due to GH/IGF-1 axis involvement.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at room temperature, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water only — swirl gently, never shake.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
        { label: "Purity Standards", text: "All listed suppliers provide ≥99% purity, verified by third-party HPLC analysis. Always verify COA from your chosen supplier before use.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      ],
    },
    references: [
      "Raun K, et al. Ipamorelin, a novel growth hormone secretagogue. Eur J Endocrinol. 1998;139(5):552-561.",
      "Hansen BS, et al. Pharmacological characterisation of a new growth hormone secretagogue. J Endocrinol. 1999;162(2):281-288.",
      "Laron Z. The GH/IGF-1 axis and aging. Best Pract Res Clin Endocrinol Metab. 2004;18(3):393-406.",
      "Nass R, et al. Age-dependent effects of growth hormone secretagogues. J Clin Endocrinol Metab. 2004;89(6):2802-2808.",
      "Ghigo E, et al. Growth hormone secretagogues: clinical perspectives. Endocrine. 2001;14(1):17-24.",
      "Bowers CY. Growth hormone-releasing peptide physiology and pharmacology. J Pediatr Endocrinol Metab. 2001;14(Suppl 6):1397-1406.",
      "Smith RG, et al. Growth hormone secretagogue receptor family. Endocr Rev. 2005;26(3):346-360.",
      "Kojima M, Kangawa K. Ghrelin: structure and function. Physiol Rev. 2005;85(2):495-522.",
      "Arvat E, et al. Effects of ipamorelin on GH secretion in humans. Clin Endocrinol. 2001;54(1):37-44.",
      "Thorner MO, et al. Clinical potential of growth hormone secretagogues. Endocr Rev. 1997;18(5):631-658.",
    ],
  },

  "cjc-1295": {
    overview: {
      whatIs: "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) modified with Drug Affinity Complex (DAC) technology that extends its circulating half-life to 6-8 days. This tetrasubstituted GHRH(1-29) analogue stimulates pulsatile GH release and elevates IGF-1 levels for prolonged periods after a single injection. By binding covalently to circulating albumin, CJC-1295 creates a sustained-release reservoir that maintains GH pulse enhancement without the need for daily administration — a significant advantage over shorter-acting GHRH analogues.",
      mechanism: "CJC-1295 acts as a potent agonist at the GHRH receptor, a G-protein-coupled receptor on pituitary somatotrophs. Binding activates the cAMP/PKA signalling cascade, which stimulates both GH gene transcription and the pulsatile release of pre-formed GH from secretory granules. The DAC modification involves coupling the peptide to maleimidopropionic acid, which binds covalently to cysteine-34 of circulating albumin. This albumin binding creates a circulating reservoir that slowly releases active peptide, extending the plasma half-life from minutes to approximately 6-8 days. Unlike GHRP compounds that act through the ghrelin receptor, CJC-1295 works through the physiological GHRH pathway, preserving the natural pulsatility of GH secretion.",
      benefits: [
        "Sustained GH elevation for 6-8 days from a single injection — the longest-acting GHRH analogue available for research",
        "Enhanced muscle growth and recovery through prolonged GH/IGF-1 axis activation",
        "Fat loss support through GH-mediated lipolysis and improved metabolic rate",
        "Once or twice weekly dosing protocol — ideal for long-term GH research studies",
        "Preserved natural GH pulsatility through physiological GHRH pathway activation",
        "Progressive bone density improvements through sustained IGF-1 elevation",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "3365.1 Da" },
        { label: "Sequence", value: "YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH₂" },
        { label: "Length", value: "29 amino acids (GRF 1-29 analogue)" },
        { label: "Type", value: "GHRH analogue | DAC-modified | Long-acting" },
        { label: "Half-Life", value: "6-8 days" },
        { label: "CAS Number", value: "863288-34-0" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "CJC-1295",
      diagramSubtitle: "29-mer · 3365.1 Da · GHRH(1-29) + DAC · Sequence: YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH₂",
      residues: [
        { x: 40, y: 60, label: "Y", color: "#6366f1", name: "Tyr" },
        { x: 70, y: 80, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 95, y: 100, label: "D", color: "#0891b2", name: "Asp" },
        { x: 118, y: 115, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 140, y: 120, label: "I", color: "#d97706", name: "Ile" },
        { x: 162, y: 115, label: "F", color: "#7c3aed", name: "Phe" },
        { x: 184, y: 100, label: "T", color: "#059669", name: "Thr" },
        { x: 207, y: 80, label: "N", color: "#0d9488", name: "Asn" },
        { x: 232, y: 60, label: "S", color: "#6366f1", name: "Ser" },
      ],
      legend: "Y=Tyr  A=Ala  D=Asp  I=Ile  F=Phe  T=Thr  N=Asn  S=Ser  + 20 more residues",
    },
    indications: {
      mostEffective: [
        { title: "GH Stimulation", desc: "Sustained pulsatile GH release from a single dose lasting up to 11 days. CJC-1295 provides the most prolonged GHRH-mediated GH stimulation of any available analogue through its DAC albumin-binding technology." },
        { title: "Muscle Growth", desc: "Promotes lean muscle mass development through sustained GH/IGF-1 elevation. The extended activity profile supports continuous anabolic signalling without daily injection peaks and troughs." },
        { title: "Anti-Aging", desc: "Restores youthful GH pulsatility patterns and IGF-1 levels in age-related GH decline research models. The long-acting profile makes CJC-1295 particularly suitable for chronic GH restoration studies." },
      ],
      effective: [
        { title: "Fat Loss", desc: "GH-mediated lipolysis and improved metabolic rate through sustained GH elevation. Extended GH exposure promotes adipose tissue mobilisation and favourable body composition changes." },
        { title: "Recovery Enhancement", desc: "Accelerates tissue repair and post-exercise recovery through continuous GH/IGF-1 signalling. The 6-8 day half-life provides consistent anabolic support between doses." },
        { title: "Bone Density", desc: "Supports bone mineral density through sustained IGF-1 mediated osteoblast activity. Particularly relevant for research into age-related bone loss and osteoporosis." },
      ],
      moderate: [
        { title: "Sleep Quality", desc: "Enhanced nocturnal GH pulses may improve sleep architecture and depth. The long half-life provides consistent GH pulse enhancement around the clock." },
        { title: "Collagen Synthesis", desc: "GH/IGF-1 activation supports collagen production and connective tissue health. May benefit research into skin health, joint integrity, and tissue elasticity." },
      ],
    },
    dosing: {
      note: "CJC-1295 with DAC requires a fundamentally different dosing approach than short-acting GHRH analogues due to its 6-8 day half-life. Dosing frequency is once or twice weekly rather than multiple times daily.",
      rows: [
        { goal: "General GH Optimization", dose: "1-2 mg", freq: "1x per week", route: "SubQ" },
        { goal: "Body Composition", dose: "2 mg", freq: "Every 5-7 days", route: "SubQ" },
        { goal: "Anti-Aging Protocol", dose: "1 mg", freq: "1x per week", route: "SubQ" },
        { goal: "Athletic Recovery", dose: "2 mg", freq: "Every 5-7 days", route: "SubQ" },
        { goal: "Without DAC (Mod GRF)", dose: "100-200 mcg", freq: "2-3x daily", route: "SubQ" },
      ],
      tips: [
        "With DAC: dose once or twice weekly — more frequent dosing does not increase efficacy due to the long half-life",
        "Without DAC (Mod GRF 1-29): dose 2-3x daily as half-life is approximately 30 minutes",
        "Best taken on an empty stomach for maximum GH pulse amplitude",
        "Do not eat for 30 minutes post-injection to avoid blunting the GH pulse",
        "Rotate injection sites to prevent tissue irritation",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store reconstituted peptide at 2-8°C; use within 28 days",
      ],
    },
    interactions: {
      note: "CJC-1295 has been extensively studied in combination with GHRP compounds for synergistic GH pulse amplification.",
      cards: [
        { slug: "ipamorelin", name: "Ipamorelin", desc: "Synergistic — The most studied GHRH/GHRP stack. CJC-1295 stimulates GHRH receptors while Ipamorelin acts on ghrelin receptors, producing a synergistic GH pulse significantly greater than either alone.", effect: "Synergistic" },
        { slug: "ghrp-2", name: "GHRP-2", desc: "Synergistic — CJC-1295 paired with GHRP-2 creates a potent dual-pathway GH stimulation protocol for research requiring maximum GH pulse amplitude.", effect: "Synergistic" },
        { slug: "ghrp-6", name: "GHRP-6", desc: "Synergistic — The combination amplifies GH release through complementary pathways, though GHRP-6 adds significant appetite stimulation to the protocol.", effect: "Synergistic" },
        { slug: "tesamorelin", name: "Tesamorelin", desc: "Alternative — Both are GHRH analogues. Tesamorelin is a full-length GHRH(1-44) analogue while CJC-1295 is a GHRH(1-29) analogue with DAC. Not typically stacked together.", effect: "Complementary" },
        { slug: "sermorelin", name: "Sermorelin", desc: "Alternative — Sermorelin is the shorter-acting GRF(1-29) without DAC modification. CJC-1295 achieves the same GHRH agonism with dramatically reduced dosing frequency.", effect: "Complementary" },
        { slug: "hexarelin", name: "Hexarelin", desc: "Supportive — Hexarelin is a potent GHRP that may be stacked with CJC-1295 for enhanced GH secretion research protocols, though it has a longer duration than other GHRPs.", effect: "Supportive" },
      ],
      stackNotes: [
        "CJC-1295 (No DAC or With DAC) paired with a GHRP (Ipamorelin, GHRP-2, or GHRP-6) is the gold standard GH stack in peptide research",
        "When stacking with DAC-modified CJC-1295, time the GHRP dose to coincide with the CJC-1295 injection for maximum synergy",
        "For CJC-1295 without DAC (Mod GRF 1-29), administer GHRP simultaneously as both have short half-lives",
        "Always introduce one compound at a time in research protocols to isolate effects",
        "Dosage adjustments may be needed when combining peptides — consult published protocols",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1", title: "Initial Dose", desc: "Single injection of CJC-1295 with DAC. GH pulse detected within 15-30 minutes. DAC moiety binds to albumin — active reservoir established.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 1-7", title: "Sustained Release Phase", desc: "Continuous release of active CJC-1295 from albumin reservoir. GH levels remain elevated with preserved pulsatility. No further dosing required this week.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 7-14", title: "Early Response", desc: "IGF-1 levels begin to rise in response to sustained GH stimulation. Early metabolic changes initiated. Second dose may be administered at day 7.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14-28", title: "Physiological Adaptation", desc: "Consistent GH/IGF-1 elevation established. Improvements in recovery and body composition begin. Weekly or bi-weekly dosing continues.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Peak Remodelling Phase", desc: "Maximum physiological response achieved. Sustained GH/IGF-1 elevation supports lean mass, fat loss, and bone density improvements. Long-term protocol effects become apparent.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 56-168", title: "Study Conclusion", desc: "Standard 2-6 month research cycle. Comprehensive assessment of GH/IGF-1 biomarkers, body composition, bone density, and functional outcomes compared to baseline.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "CJC-1295 is not approved for human consumption by the MHRA, FDA, or any regulatory body. For in-vitro and animal research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Hormonal Considerations", text: "As a potent GHRH analogue, CJC-1295 significantly alters the HGH/IGF-1 axis. Monitor GH and IGF-1 levels in long-term studies. The extended half-life means effects persist for days after the last dose.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Contraindications", text: "Extra caution advised for research involving subjects with active cancer, pituitary disorders, or diabetes due to GH/IGF-1 axis involvement. The prolonged activity of DAC-modified CJC-1295 requires careful washout planning.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at room temperature, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water only — swirl gently, never shake.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
        { label: "Purity Standards", text: "All listed suppliers provide ≥99% purity, verified by third-party HPLC analysis. Always verify COA from your chosen supplier before purchase and use.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      ],
    },
    references: [
      "Ionescu M, et al. CJC-1295, a long-acting GHRH analogue. J Endocrinol. 2006;190(2):297-305.",
      "Teichman SL, et al. Pharmacokinetics and pharmacodynamics of CJC-1295. Clin Pharmacol Ther. 2006;79(2):P66.",
      "Khorram O, et al. CJC-1295 treatment in growth hormone deficiency. Endocrine. 2008;33(2):151-157.",
      "Ghigo E, et al. Growth hormone secretagogues: clinical perspectives. Endocrine. 2001;14(1):17-24.",
      "Smith RG, et al. Growth hormone secretagogue receptor family. Endocr Rev. 2005;26(3):346-360.",
      "Bowers CY. Growth hormone-releasing peptide physiology and pharmacology. J Pediatr Endocrinol Metab. 2001;14(Suppl 6):1397-1406.",
      "Laron Z. The GH/IGF-1 axis and aging. Best Pract Res Clin Endocrinol Metab. 2004;18(3):393-406.",
      "Kojima M, Kangawa K. Ghrelin: structure and function. Physiol Rev. 2005;85(2):495-522.",
      "Nass R, et al. Age-dependent effects of growth hormone secretagogues. J Clin Endocrinol Metab. 2004;89(6):2802-2808.",
      "Thorner MO, et al. Clinical potential of growth hormone secretagogues. Endocr Rev. 1997;18(5):631-658.",
    ],
  },

  "bpc-157": {
    overview: {
      whatIs: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide composed of 15 amino acids, originally derived from a protein found in human gastric juice. It is one of the most extensively researched peptides for tissue healing, with over two decades of published studies investigating its effects on wound healing, gastrointestinal repair, tendon and ligament recovery, and organ protection. BPC-157 promotes blood vessel formation (angiogenesis), enhances collagen synthesis, modulates growth factor expression including VEGF, and protects against tissue damage through localized or systemic delivery pathways.",
      mechanism: "BPC-157 exerts its effects through multiple interacting pathways. It promotes angiogenesis by upregulating VEGF and its receptors, enhancing blood flow to damaged tissues. It modulates the nitric oxide (NO) system, which plays a crucial role in vascular protection and tissue defence. BPC-157 also influences growth hormone receptors, aiding tissue regeneration, and demonstrates anti-inflammatory activity by reducing pro-inflammatory cytokines. Its action on the gastrointestinal tract involves protection of the mucosal lining, stimulation of epithelial cell migration, and modulation of gut motility and integrity.",
      benefits: [
        "Accelerates wound and tissue healing",
        "Protects and repairs gastrointestinal tract lining",
        "Reduces inflammation throughout the body",
        "Improves circulation and vascular health",
        "Supports ligament and tendon recovery",
        "Protects against gastric ulcers",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "1,419.53 Da" },
        { label: "Sequence", value: "GKPPPGKPADDAGLV" },
        { label: "Length", value: "15 amino acids" },
        { label: "Type", value: "Pentadecapeptide" },
        { label: "Half-Life", value: "<30 minutes" },
        { label: "CAS Number", value: "137525-51-0" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "BPC-157",
      diagramSubtitle: "15-mer · 1,419.53 Da · Pentadecapeptide · Sequence: GKPPPGKPADDAGLV",
      residues: [
        { x: 30, y: 70, label: "G", color: "#6366f1", name: "Gly" },
        { x: 55, y: 85, label: "K", color: "#0891b2", name: "Lys" },
        { x: 78, y: 100, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 100, y: 110, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 122, y: 115, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 144, y: 110, label: "G", color: "#6366f1", name: "Gly" },
        { x: 166, y: 100, label: "K", color: "#0891b2", name: "Lys" },
        { x: 188, y: 85, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 210, y: 70, label: "A", color: "#d97706", name: "Ala" },
      ],
      legend: "G=Gly  K=Lys  P=Pro  A=Ala  D=Asp  V=Val",
    },
    indications: {
      mostEffective: [
        { title: "Tissue Healing", desc: "Accelerated tendon-to-bone healing with improved biomechanical properties. Most effective with localized injection near the injury site." },
        { title: "Tendon/Joint Repair", desc: "Enhanced healing and reduced recovery time after crush injuries and surgical procedures with direct tissue targeting." },
        { title: "Ulcer Protection", desc: "Protective effects against gastric and duodenal ulcers through cytoprotective mechanisms and enhanced mucosal defence." },
        { title: "Muscle Recovery", desc: "Enhanced skeletal muscle healing after injury with reduced scar tissue formation and improved functional outcomes." },
      ],
      effective: [
        { title: "Angiogenesis", desc: "Promotes blood vessel formation and improves vascularization through localized delivery pathways." },
        { title: "Intestinal Repair", desc: "Accelerates intestinal healing and reduces inflammatory markers in IBD models." },
        { title: "Mucosal Healing", desc: "Enhances mucosal barrier function and accelerates epithelial regeneration throughout the GI tract." },
      ],
      moderate: [
        { title: "Neuroprotection", desc: "Protective effects against neurotoxic agents and ischemic brain injury models in preclinical studies." },
        { title: "Spinal Cord Injury", desc: "Improved functional recovery and reduced tissue damage in spinal cord injury research models." },
        { title: "Peripheral Nerves", desc: "Enhanced peripheral nerve regeneration and functional recovery after nerve injury." },
      ],
    },
    dosing: {
      note: "Subcutaneous injection preferred for targeted tissue repair. Most effective on an empty stomach. Injectable and oral routes both researched with differing dosage protocols.",
      rows: [
        { goal: "Tendon/Joint healing", dose: "250-500 mcg", freq: "1-2x daily", route: "SubQ near injury" },
        { goal: "Serious injury", dose: "500-1000 mcg", freq: "2x daily", route: "SubQ near injury" },
        { goal: "General healing", dose: "250-500 mcg", freq: "1-2x daily", route: "SubQ or IM" },
        { goal: "Maintenance", dose: "250 mcg", freq: "1x daily", route: "SubQ" },
        { goal: "Gastric protection", dose: "500 mcg - 1 mg", freq: "1-2x daily", route: "Oral (empty stomach)" },
        { goal: "General healing (oral)", dose: "1-2 mg", freq: "1-2x daily", route: "Oral (empty stomach)" },
        { goal: "Ulcer prevention", dose: "500 mcg", freq: "2x daily", route: "Oral (empty stomach)" },
        { goal: "Maintenance (oral)", dose: "500 mcg", freq: "1x daily", route: "Oral (empty stomach)" },
      ],
      tips: [
        "Most effective on an empty stomach for maximum absorption",
        "Inject close to the injury site for localized healing",
        "Rotate injection sites to prevent tissue irritation",
        "Reconstitute with bacteriostatic water — never shake the vial",
        "Store reconstituted peptide at 2-8°C; use within 4-6 weeks",
      ],
    },
    interactions: {
      note: "BPC-157 has been studied in combination with other peptides for synergistic research applications.",
      cards: [
        { slug: "tb-500", name: "TB-500 (Thymosin Beta-4)", desc: "Synergistic tissue repair — TB-500 promotes actin binding and cell migration while BPC-157 enhances angiogenesis and collagen synthesis. The most well-studied peptide stack for comprehensive healing research.", effect: "Synergistic" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Copper peptide that supports collagen synthesis and wound healing. When combined with BPC-157, may provide enhanced dermal repair and anti-inflammatory effects in tissue models.", effect: "Complementary" },
        { slug: "semax", name: "Semax", desc: "Nootropic peptide studied for neuroprotection and cognitive enhancement. May complement BPC-157's neuroprotective effects in brain injury and recovery models.", effect: "Complementary" },
        { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)", desc: "GHRH analog that stimulates growth hormone release. Often researched alongside BPC-157 for enhanced tissue regeneration and recovery protocols.", effect: "Supportive" },
        { slug: "ipamorelin", name: "Ipamorelin", desc: "GH secretagogue that pairs well with BPC-157 in recovery protocols — Ipamorelin stimulates GH pulses while BPC-157 supports tissue repair at the injury site.", effect: "Supportive" },
        { slug: "kpv", name: "KPV", desc: "Anti-inflammatory peptide derived from alpha-MSH. May enhance BPC-157's effects on intestinal barrier function and mucosal healing in GI research models.", effect: "Supportive" },
      ],
      stackNotes: [
        "BPC-157 and TB-500 are the most commonly researched peptide combination for comprehensive tissue healing studies",
        "Always introduce one compound at a time in research protocols to isolate effects",
        "Dosage adjustments may be needed when combining peptides — consult published protocols",
        "Consider half-life differences when designing combination dosing schedules",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-3", title: "Initial Administration", desc: "Begin daily dosing protocol. SubQ injection near target tissue or oral administration for GI studies. First signs of reduced inflammation observed within 24-48 hours.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 3-7", title: "Early Response Phase", desc: "Angiogenesis begins — new blood vessel formation detectable at injury sites. Collagen synthesis upregulated. Reduced edema and inflammatory markers in tissue samples.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 7-14", title: "Tissue Repair Phase", desc: "Accelerated wound healing and tissue regeneration observed. Enhanced fibroblast activity and extracellular matrix remodeling. Significant reduction in healing time compared to controls.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14-28", title: "Remodelling Phase", desc: "Continued tissue strengthening and maturation. Tendon and ligament biomechanical properties show improvement. Bone healing studies demonstrate increased callus formation and density.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Long-term Recovery", desc: "Maximal tissue repair achieved. Functional recovery assessed. GI mucosal lining fully restored in intestinal models. Neuroprotective effects continue in CNS studies.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 56-84", title: "Study Conclusion", desc: "End of standard research cycle (8-12 weeks). Comprehensive assessment of tissue repair, functional recovery, and biomarker analysis. Cycle completion before washout period.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "BPC-157 is not approved for human consumption by the MHRA, FDA, EMA, or any other regulatory body. For in-vitro and animal research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "WADA Considerations", text: "BPC-157 may be prohibited under the World Anti-Doping Agency (WADA) code. Competitive athletes should exercise extreme caution.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Contraindications", text: "Extra caution is advised for research involving subjects with active cancer, pregnancy/breastfeeding, or those on blood thinners due to BPC-157's angiogenesis-related mechanisms.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at -20°C, protected from light and moisture. Reconstituted solution: Stable for 4-6 weeks at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE during handling and reconstitution including gloves and eye protection. Work in a sterile environment.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
        { label: "Purity Standards", text: "All listed suppliers provide ≥99% purity, verified by third-party HPLC analysis. Always verify COA from your chosen supplier before use.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      ],
    },
    references: [
      "Sikiric P, Seiwerth S, Mise S, et al. The gastric cytoprotective effect of BPC-157. Dig Dis Sci. 1994;39(12):2600-2608.",
      "Sikiric P, Seiwerth S, Rucman R, et al. Stable gastric pentadecapeptide BPC 157-NO-system relation. Curr Pharm Des. 2014;20(7):1126-1135.",
      "Seiwerth S, Rucman R, Turkovic B, et al. BPC 157 and standard angiogenic growth factors. Gastrointestinal tract healing, lessons from tendon, ligament, muscle and bone healing. Curr Pharm Des. 2018;24(18):1972-1989.",
      "Chang CH, Tsai WC, Hsu YH, et al. BPC-157 enhances tendon healing through angiogenesis. J Orthop Res. 2011;29(9):1390-1396.",
      "Staresinic M, Sebecic B, Patrlj L, et al. Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon. J Orthop Res. 2006;24(11):2155-2165.",
      "Seiwerth S, Brcic L, Vuletic LB, et al. BPC 157 and tissue healing. Front Pharmacol. 2021;12:647448.",
      "Kang EA, Han YM, An JM, et al. BPC-157 in inflammatory bowel disease models. Gut Liver. 2018;12(4):402-411.",
      "Tudoric-Djeno I, Krivic A, Sikiric P, et al. Pentadecapeptide BPC 157 and tissue healing. J Physiol Pharmacol. 2007;58 Suppl 5:719-724.",
      "Novinscak T, Brcic L, Staresinic M, et al. Gastric pentadecapeptide BPC 157 as an effective therapy for muscle crush injury in the rat. Surg Today. 2008;38(8):716-721.",
      "Mikus D, Sikiric P, Seiwerth S, et al. Pentadecapeptide BPC 157 cream improves burn wound healing in mice. Burns. 2012;38(3):404-413.",
      "Sikiric P, Seiwerth S, Rucman R, et al. Brain-gut axis and pentadecapeptide BPC 157: theoretical and practical implications. Curr Neuropharmacol. 2016;14(8):857-865.",
      "Grabarevic Z, Tisljar M, Artukovic B, et al. The influence of BPC 157 on fundus mucosa in rats. J Physiol Paris. 1997;91(3-5):147-152.",
      "Sikiric P, Seiwerth S, Rucman R, et al. Toxicity, safety and analgesic activity in rats of BPC 157. Regul Pept. 1993;48(1-2):139-147.",
      "Bilic V, Bilic G, Sikiric P, et al. BPC 157 in the treatment of the acute pancreatitis in rats. Dig Dis Sci. 2005;50(2):270-277.",
      "Sikiric P, Seiwerth S, Brcic L, et al. Revised Robert's cytoprotection and adaptive cytoprotection and stable gastric pentadecapeptide BPC 157. Secretion, absorption and new bioassays. J Physiol Pharmacol. 2018;69(4).",
    ],
  },
  "cjc-1295-ipamorelin-blend": {
    overview: {
      whatIs: "CJC-1295 + Ipamorelin Blend is a pre-mixed combination of a growth hormone-releasing hormone (GHRH) analogue and a growth hormone secretagogue (GHRP) in a single vial. This blend combines CJC-1295 (without DAC / Mod GRF 1-29), a 29-amino acid GHRH analogue that stimulates endogenous GH release from the pituitary, with Ipamorelin, a selective pentapeptide GHRP that amplifies the GH pulse through ghrelin receptor agonism. Together they produce a synergistic GH pulse significantly greater than either compound alone, making this one of the most researched peptide stacks for growth hormone studies. The blend is pre-mixed in a 1:1 ratio (typically 2 mg each or 5 mg each per vial) for convenience.",
      mechanism: "This blend works through two complementary pathways on the pituitary gland. CJC-1295 binds to GHRH receptors on pituitary somatotrophs, activating the cAMP/PKA signalling cascade that stimulates both GH gene transcription and pulsatile GH release — the physiological pathway. Ipamorelin binds selectively to ghrelin receptors (GHSR-1a), amplifying the GH pulse amplitude through a separate signalling pathway. When combined, the GHRH and GHRP pathways produce a synergistic effect, resulting in a GH pulse that is significantly larger than the sum of either compound alone. Both peptides have a short half-life (CJC-1295 without DAC ~30 minutes, Ipamorelin ~2 hours), making simultaneous administration ideal for coordinated GH pulse enhancement.",
      benefits: [
        "Synergistic GH pulse amplification — significantly greater than CJC-1295 or Ipamorelin alone",
        "Dual-pathway stimulation through both GHRH and ghrelin receptors for comprehensive GH axis research",
        "Pre-mixed in a 1:1 ratio for dosing convenience — eliminates the need for separate reconstitution",
        "Well-studied combination protocol with established research literature",
        "Short half-lives of both components (30 min - 2 hours) enable precise pulse timing",
        "Cost-effective compared to purchasing both peptides separately",
      ],
    },
    molecular: {
      items: [
        { label: "Composition", value: "CJC-1295 (No DAC) + Ipamorelin" },
        { label: "CJC-1295 MW", value: "3365.1 Da" },
        { label: "Ipamorelin MW", value: "711.9 Da" },
        { label: "CJC-1295 Sequence", value: "YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH₂" },
        { label: "Ipamorelin Sequence", value: "Aib-His-D-2-Nal-D-Phe-Lys-NH₂" },
        { label: "Type", value: "GHRH/GHRP blend | Research stack" },
        { label: "Purity", value: "≥98.7%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "CJC-1295 + Ipamorelin Blend",
      diagramSubtitle: "Dual-peptide stack · GHRH analogue + GHRP · 1:1 ratio",
      residues: [
        { x: 30, y: 70, label: "CJC", color: "#0891b2", name: "CJC-1295" },
        { x: 80, y: 95, label: "+", color: "#8b5cf6", name: "Plus" },
        { x: 120, y: 115, label: "Ipa", color: "#d97706", name: "Ipamorelin" },
        { x: 170, y: 105, label: "=", color: "#6366f1", name: "Equals" },
        { x: 215, y: 85, label: "GH", color: "#059669", name: "GH Pulse" },
      ],
      legend: "CJC=CJC-1295 (No DAC)  Ipa=Ipamorelin  GH=Growth Hormone",
    },
    indications: {
      mostEffective: [
        { title: "GH Pulse Amplification", desc: "Maximum GH pulse amplitude through dual-pathway GHRH + ghrelin receptor stimulation. The most effective approach for growth hormone secretion research." },
        { title: "GH Axis Research", desc: "Comprehensive GH axis activation for research into GH secretion mechanisms, feedback regulation, and IGF-1 response protocols." },
        { title: "Muscle Growth", desc: "Enhanced lean muscle development through amplified GH/IGF-1 axis activation via dual GHRH/GHRP pathway stimulation." },
      ],
      effective: [
        { title: "Recovery Enhancement", desc: "Accelerated post-exercise recovery and tissue repair through coordinated GH pulse enhancement from both GHRH and GHRP pathways." },
        { title: "Anti-Aging", desc: "Restores youthful GH pulsatility patterns through comprehensive GH axis stimulation in age-related GH decline research models." },
        { title: "Body Composition", desc: "Supports favourable metabolic changes through amplified GH-mediated lipolysis and improved anabolic signalling." },
      ],
      moderate: [
        { title: "Sleep Quality", desc: "Enhanced nocturnal GH pulses may improve sleep architecture through dual-pathway stimulation of the GH axis." },
        { title: "Bone Health", desc: "Sustained IGF-1 elevation from amplified GH pulses may support bone mineral density in long-term research protocols." },
      ],
    },
    dosing: {
      note: "This is a pre-mixed blend — both peptides are reconstituted together. Since both compounds have short half-lives (CJC-1295 without DAC ~30 min, Ipamorelin ~2 hours), dosing 2-3 times daily is recommended for sustained GH pulse enhancement.",
      rows: [
        { goal: "General GH Optimization", dose: "200 mcg each (400 mcg total)", freq: "2x daily", route: "SubQ" },
        { goal: "Body Composition", dose: "300 mcg each (600 mcg total)", freq: "2-3x daily", route: "SubQ" },
        { goal: "Athletic Performance", dose: "200-300 mcg each", freq: "2-3x daily", route: "SubQ" },
        { goal: "Anti-Aging Protocol", dose: "200 mcg each (400 mcg total)", freq: "1-2x daily", route: "SubQ" },
        { goal: "Recovery Enhancement", dose: "200-250 mcg each", freq: "2x daily", route: "SubQ" },
      ],
      tips: [
        "Best taken on an empty stomach for maximum GH pulse amplitude",
        "Do not eat for 30 minutes post-injection to avoid blunting the GH pulse",
        "Morning and pre-bed dosing mimics the body's natural GH pulse pattern",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store reconstituted blend at 2-8°C; use within 28 days",
        "Rotate injection sites to prevent tissue irritation",
      ],
    },
    interactions: {
      note: "As a pre-mixed GHRH/GHRP blend, CJC-1295 + Ipamorelin is itself a combination stack. It may be further researched alongside other compounds.",
      cards: [
        { slug: "tb-500", name: "TB-500 (Thymosin Beta-4)", desc: "Supportive — TB-500 promotes tissue repair and recovery, complementing the GH-axis activation from the blend for comprehensive recovery research protocols.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157 supports tissue healing and GI repair while the blend amplifies GH signalling for enhanced recovery outcomes.", effect: "Supportive" },
        { slug: "ghrp-2", name: "GHRP-2", desc: "Alternative — GHRP-2 is another GHRP that can be substituted for Ipamorelin. GHRP-2 produces a stronger GH pulse but with greater cortisol and prolactin elevation.", effect: "Complementary" },
        { slug: "ghrp-6", name: "GHRP-6", desc: "Alternative — GHRP-6 produces a potent GH pulse but with significant appetite stimulation. The blend with Ipamorelin is preferred when hunger effects are unwanted.", effect: "Complementary" },
        { slug: "tesamorelin", name: "Tesamorelin", desc: "Alternative — Tesamorelin is a full-length GHRH(1-44) analogue. The blend uses CJC-1295 which is a GHRH(1-29) analogue with similar GHRH agonism.", effect: "Complementary" },
        { slug: "sermorelin", name: "Sermorelin", desc: "Alternative — Sermorelin is the standard GRF(1-29) without modifications. CJC-1295 in the blend is a tetrasubstituted version with improved stability.", effect: "Complementary" },
      ],
      stackNotes: [
        "CJC-1295 (No DAC) + Ipamorelin is the most studied GHRH/GHRP combination in peptide research literature",
        "The pre-mixed blend eliminates the need for separate reconstitution of each peptide",
        "Consider that both peptides in the blend have short half-lives — dose 2-3x daily for sustained effect",
        "For longer coverage, CJC-1295 with DAC could be substituted, but this blend uses the No DAC variant",
        "Always introduce additional compounds one at a time when stacking with this blend",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "Begin twice-daily dosing protocol. First GH pulses detected post-injection — significantly amplified compared to single compound administration. No significant physiological changes yet.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Early Response Phase", desc: "Consistent amplified GH pulse pattern established. IGF-1 levels begin to rise. Sleep quality may improve. Early metabolic changes initiated by GH/IGF-1 signalling.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Physiological Adaptation", desc: "Sustained IGF-1 elevation from dual-pathway GH stimulation. Early improvements in recovery time and body composition observed through amplified anabolic signalling.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Active Remodelling Phase", desc: "Maximum GH/IGF-1 elevation supports lean mass preservation and fat metabolism. Most noticeable changes in body composition and recovery due to dual-pathway synergy.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-84", title: "Peak Effect Phase", desc: "Consistent improvements in muscle quality, fat loss, and recovery reinforcement observed through sustained dual-pathway GH axis activation.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84-168", title: "Study Conclusion", desc: "Standard 3-6 month research cycle. Comprehensive assessment of GH/IGF-1 biomarkers, body composition changes, and functional outcomes of dual-pathway GH stimulation.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "CJC-1295 + Ipamorelin Blend is not approved for human consumption by the MHRA, FDA, or any regulatory body. For in-vitro and animal research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Hormonal Considerations", text: "As a dual-pathway GH secretagogue blend, this combination significantly alters the GH/IGF-1 axis. Monitor GH and IGF-1 levels in long-term studies. Prolonged use may affect natural GH pulsatility.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Contraindications", text: "Extra caution advised for research involving subjects with active cancer, pituitary disorders, or diabetes, due to amplified GH/IGF-1 axis involvement.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at room temperature, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water only — swirl gently, never shake.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
        { label: "Purity Standards", text: "All listed suppliers provide ≥98.7% purity, verified by third-party HPLC analysis. Always verify COA from your chosen supplier before use.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      ],
    },
    references: [
      "Teichman SL, et al. Pharmacokinetics and pharmacodynamics of CJC-1295. Clin Pharmacol Ther. 2006;79(2):P66.",
      "Raun K, et al. Ipamorelin, a novel growth hormone secretagogue. Eur J Endocrinol. 1998;139(5):552-561.",
      "Hansen BS, et al. Pharmacological characterisation of a new growth hormone secretagogue. J Endocrinol. 1999;162(2):281-288.",
      "Ghigo E, et al. Growth hormone secretagogues: clinical perspectives. Endocrine. 2001;14(1):17-24.",
      "Smith RG, et al. Growth hormone secretagogue receptor family. Endocr Rev. 2005;26(3):346-360.",
      "Bowers CY. Growth hormone-releasing peptide physiology and pharmacology. J Pediatr Endocrinol Metab. 2001;14(Suppl 6):1397-1406.",
      "Laron Z. The GH/IGF-1 axis and aging. Best Pract Res Clin Endocrinol Metab. 2004;18(3):393-406.",
      "Kojima M, Kangawa K. Ghrelin: structure and function. Physiol Rev. 2005;85(2):495-522.",
      "Nass R, et al. Age-dependent effects of growth hormone secretagogues. J Clin Endocrinol Metab. 2004;89(6):2802-2808.",
      "Thorner MO, et al. Clinical potential of growth hormone secretagogues. Endocr Rev. 1997;18(5):631-658.",
    ],
  },

  "retatrutide": {
    overview: {
      whatIs: "Retatrutide (LY3437943) is a synthetic 39-amino-acid triple agonist peptide developed by Eli Lilly that simultaneously activates the GLP-1 (glucagon-like peptide-1), GIP (glucose-dependent insulinotropic polypeptide), and glucagon receptors. It is the first triple agonist to reach late-stage clinical research, building on the dual-agonist platform established by Tirzepatide. Phase 2 data published in NEJM (Jastreboff et al., 2023) showed dose-dependent body-weight reductions of up to 24.2% at 48 weeks at the 12 mg weekly dose — the largest weight reduction reported in a pharmaceutical trial at that time. The molecule is engineered with a fatty-acid side chain enabling albumin binding, giving it an extended half-life suitable for once-weekly subcutaneous administration in research protocols.",
      mechanism: "Retatrutide's triple-agonist mechanism works through three distinct receptor pathways: (1) GLP-1 receptor agonism slows gastric emptying, increases glucose-dependent insulin secretion, suppresses postprandial glucagon release, and acts centrally in the hypothalamus to reduce food intake; (2) GIP receptor agonism increases insulin secretion in a glucose-dependent manner, modulates adipose-tissue glucose buffering, and has emerging evidence for central effects on satiety; (3) Glucagon receptor agonism — the distinguishing feature — increases energy expenditure through hepatic glucose output regulation and brown-adipose-tissue thermogenesis. The glucagon arm is the critical addition that differentiates Retatrutide from dual agonists like Tirzepatide. The three receptor activities are not simply additive; they produce coordinated metabolic effects through complementary signalling pathways including cAMP/PKA and ERK/MAPK cascades, resulting in greater weight reduction and metabolic improvement than either pathway alone.",
      benefits: [
        "Significant body weight reduction — up to 24.2% at 48 weeks in Phase 2 trials",
        "Superior weight loss compared to selective GLP-1 agonists and dual GLP-1/GIP agonists",
        "Improved glycaemic control through triple-receptor coordination",
        "Reduction in hepatic steatosis independent of weight loss (glucagon-mediated)",
        "Improvements in lipid panels, blood pressure, and inflammatory markers",
        "Potential cardiovascular and renal protective effects (under investigation)",
        "Once-weekly dosing schedule reduces administration burden",
      ],
    },
    molecular: {
      items: [
        { label: "CAS Number", value: "2608121-45-5" },
        { label: "Molecular Formula", value: "C₂₁₃H₃₃₁N₄₃O₆₅ (approximate)" },
        { label: "Molecular Weight", value: "~4,731.46 Da (lipidated peptide)" },
        { label: "Sequence Length", value: "39 amino acids" },
        { label: "Half-Life", value: "~6 days" },
        { label: "Receptor Targets", value: "GLP-1R, GIPR, GCGR (triple agonist)" },
        { label: "Purity Standard", value: "≥98% (HPLC)" },
        { label: "Form", value: "Lyophilized powder" },
        { label: "Developed By", value: "Eli Lilly & Company" },
        { label: "Research Code", value: "LY3437943 / R3TA" },
      ],
      diagramTitle: "Retatrutide",
      diagramSubtitle: "39-mer · ~4,731 Da · Triple Agonist · GLP-1R, GIPR, GCGR",
      residues: [
        { x: 30, y: 70, label: "H", color: "#6366f1", name: "His" },
        { x: 50, y: 55, label: "X", color: "#0891b2", name: "Aib" },
        { x: 70, y: 45, label: "G", color: "#8b5cf6", name: "Gly" },
        { x: 90, y: 35, label: "E", color: "#16a34a", name: "Glu" },
        { x: 110, y: 28, label: "G", color: "#6366f1", name: "Gly" },
        { x: 130, y: 30, label: "T", color: "#dc2626", name: "Thr" },
        { x: 150, y: 38, label: "F", color: "#9333ea", name: "Phe" },
        { x: 170, y: 50, label: "T", color: "#dc2626", name: "Thr" },
        { x: 185, y: 65, label: "S", color: "#0d9488", name: "Ser" },
        { x: 195, y: 80, label: "D", color: "#e11d48", name: "Asp" },
        { x: 200, y: 100, label: "Y", color: "#ca8a04", name: "Tyr" },
        { x: 195, y: 120, label: "S", color: "#0d9488", name: "Ser" },
        { x: 185, y: 135, label: "I", color: "#0891b2", name: "Ile" },
        { x: 170, y: 150, label: "Y", color: "#ca8a04", name: "Tyr" },
        { x: 150, y: 160, label: "L", color: "#0891b2", name: "Leu" },
        { x: 130, y: 165, label: "D", color: "#e11d48", name: "Asp" },
        { x: 110, y: 165, label: "K", color: "#0891b2", name: "Lys" },
        { x: 90, y: 160, label: "K", color: "#0891b2", name: "Lys" },
        { x: 70, y: 150, label: "A", color: "#6366f1", name: "Ala" },
      ],
      legend: "H=Aminohexanoic acid, X=Aminoisobutyric acid",
    },
    indications: {
      mostEffective: [
        { title: "Obesity & Weight Management", desc: "Primary research indication. Phase 2 trials demonstrated 24.2% mean body weight reduction at 12 mg/week for 48 weeks, exceeding all currently approved anti-obesity agents. The triple-agonist mechanism addresses both caloric intake reduction (GLP-1/GIP) and energy expenditure increase (glucagon)." },
        { title: "Type 2 Diabetes", desc: "Phase 2 trials in type 2 diabetes showed significant improvements in HbA1c and fasting glucose. The coordinated triple-receptor engagement provides multi-pathway glycaemic control through enhanced insulin secretion, glucagon suppression, and improved insulin sensitivity." },
      ],
      effective: [
        { title: "Metabolic Dysfunction-Associated Steatohepatitis (MASH)", desc: "The glucagon receptor arm is hypothesised to drive hepatic steatosis reduction independently of weight loss. Preliminary data on liver fat reduction has been promising, with dedicated NASH endpoints in ongoing trials." },
        { title: "Cardiometabolic Health", desc: "Improvements in lipid profiles (reduced triglycerides, LDL-C), blood pressure reduction, and decreases in inflammatory markers (hs-CRP) have been observed in clinical cohorts. Exploratory endpoints include albuminuria and eGFR for renal protection assessment." },
      ],
      moderate: [
        { title: "Cardiovascular Risk Reduction", desc: "Ongoing Phase 3 TRIUMPH programme includes cardiovascular outcome measures. The combination of weight reduction, improved glycaemic control, and blood pressure improvements suggests potential CV risk reduction benefits." },
      ],
    },
    dosing: {
      note: "Doses refer to ongoing Phase 2/3 clinical trial protocols. Dose escalation is recommended: start at 2 mg weekly for 4 weeks, then increase in 2-4 mg increments every 4 weeks to target dose.",
      rows: [
        { goal: "Weight Loss — Initial", dose: "2 mg", freq: "Once weekly (subcutaneous)", route: "SC" },
        { goal: "Weight Loss — Titration", dose: "4 mg", freq: "Once weekly (SC) — 4-week escalation", route: "SC" },
        { goal: "Weight Loss — Maintenance", dose: "8 mg", freq: "Once weekly (subcutaneous)", route: "SC" },
        { goal: "Weight Loss — Maximum", dose: "12 mg", freq: "Once weekly (subcutaneous)", route: "SC" },
        { goal: "Metabolic Research — Low", dose: "1 mg", freq: "Once weekly (subcutaneous)", route: "SC" },
        { goal: "Metabolic Research — Standard", dose: "4-8 mg", freq: "Once weekly (subcutaneous)", route: "SC" },
      ],
      tips: [
        "Doses refer to the ongoing Phase 2/3 clinical trial protocols. Individual research protocols may vary.",
        "Dose escalation is recommended: start at 2 mg weekly for 4 weeks, then increase in 2-4 mg increments every 4 weeks to target dose.",
        "Retatrutide is an investigational compound — not FDA or MHRA approved. For in-vitro and laboratory research only.",
        "All dosing is subcutaneous administration, typically in the abdomen, thigh, or upper arm.",
        "Missed doses should be administered within 3 days of the scheduled date.",
      ],
    },
    interactions: {
      note: "Retatrutide is a triple agonist — its built-in mechanism reduces the need for complex multi-compound stacks. The glucagon arm distinguishes Retatrutide from Tirzepatide/Semaglutide stacks.",
      cards: [
        { slug: "tirzepatide", name: "Tirzepatide", desc: "Comparator mechanism — Tirzepatide is a dual GIP/GLP-1 agonist with a well-established clinical profile. Retatrutide adds glucagon agonism for additional energy expenditure. Not intended for concurrent use.", effect: "Complementary" },
        { slug: "semaglutide", name: "Semaglutide", desc: "Comparator mechanism — Semaglutide is a selective GLP-1 agonist. Retatrutide demonstrates superior weight reduction through broader receptor coverage. Not intended for concurrent use.", effect: "Complementary" },
        { slug: "cagrilintide", name: "Cagrilintide", desc: "Synergistic potential — Cagrilintide (amylin analogue) acts through a distinct satiety pathway. Preclinical research suggests potential for additive weight reduction when combined with GLP-1-based therapies.", effect: "Synergistic" },
        { slug: "mazdutide", name: "Mazdutide", desc: "Comparable mechanism — Mazdutide is an OXM-based dual GLP-1/glucagon agonist currently in development. Retatrutide adds GIP agonism for broader metabolic coverage.", effect: "Complementary" },
        { slug: "aod9604", name: "AOD-9604", desc: "Supportive — AOD-9604 is a fragment of HGH (177-191) that targets fat metabolism through a non-receptor pathway. Could be used as an adjunct for targeted adipose tissue research.", effect: "Supportive" },
        { slug: "mots-c", name: "MOTS-c", desc: "Supportive — MOTS-c is a mitochondrial peptide that improves glucose metabolism and insulin sensitivity through a mechanism distinct from incretin receptor agonism.", effect: "Supportive" },
      ],
      stackNotes: [
        "Retatrutide is a triple agonist — its built-in mechanism reduces the need for complex multi-compound stacks",
        "The glucagon arm distinguishes Retatrutide from Tirzepatide/Semaglutide stacks that might otherwise be considered for metabolic research",
        "Combining Retatrutide with amylin analogues (Cagrilintide/Pramlintide) is an active area of preclinical research",
        "Always introduce additional compounds one at a time when stacking to isolate individual effects",
        "Monitor glucose levels closely when stacking Retatrutide with other metabolic compounds",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "First weekly dose administered at starting dose (typically 2 mg). GLP-1/GIP receptor activation begins, leading to reduced food intake and early satiety signalling. Glucagon receptor activation initiates energy expenditure upregulation.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-28", title: "Dose Titration Phase", desc: "Dose escalated in 2-4 mg increments every 4 weeks per protocol. Progressive reduction in caloric intake as GLP-1/GIP signalling saturates. Early weight loss begins (2-4% from baseline). Gastrointestinal side effects most likely during dose increases.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 28-56", title: "Early Metabolic Response", desc: "Weight loss accelerates to 8-12% from baseline. Glucagon-mediated energy expenditure increase becomes measurable. HbA1c improvements begin in diabetic models. Adipose tissue remodelling initiates through multiple signalling pathways.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-112", title: "Sustained Weight Loss Phase", desc: "Continuing dose-dependent weight reduction reaching 15-20% from baseline. Significant metabolic improvements across all measured parameters: glycaemic control, lipid profiles, blood pressure. Hepatic steatosis reduction becomes apparent on imaging.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 112-168", title: "Peak Effect Phase", desc: "Maximum weight reduction achieved at 48 weeks — up to 24.2% in Phase 2 trials (12 mg dose). Full metabolic benefits manifest: improved HOMA-IR, reduced triglycerides, decreased inflammatory markers. Energy expenditure increase plateaus. Comprehensive assessment of body composition changes.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 168+", title: "Maintenance & Long-Term Assessment", desc: "Phase 3 extension studies continue tracking weight maintenance, cardiovascular outcomes, and safety. The TRIUMPH programme (expected 2026-2028) will establish long-term efficacy and safety profile for regulatory submission.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "Retatrutide is an investigational compound not approved by the MHRA, FDA, EMA, or any regulatory body for human consumption. For in-vitro and laboratory research use only. Phase 3 trials are ongoing.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Gastrointestinal Effects", text: "Phase 2 trials reported dose-dependent GI side effects including nausea (40-50%), diarrhoea (25-30%), vomiting (15-20%), and constipation (10-15%). These were most common during dose titration and typically resolved with continued dosing.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Cardiovascular Monitoring", text: "Heart rate increases of 3-8 bpm have been observed at higher doses. Blood pressure reductions are generally beneficial but require monitoring in hypotensive research models. No significant QT prolongation has been observed.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "red" },
        { label: "Contraindications", text: "Caution is indicated in research involving subjects with a personal or family history of medullary thyroid carcinoma, Multiple Endocrine Neoplasia syndrome type 2, severe gastroparesis, or pancreatitis. Discontinue if pancreatitis is suspected.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Glucose Monitoring", text: "Despite glucagon receptor agonism, the net effect of triple agonism is improved glycaemic control. However, in diabetic research models, blood glucose should be monitored closely during dose titration, particularly at initiation.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
        { label: "Purity & Storage", text: "Verify ≥98% purity via independent HPLC analysis (COA from supplier). Store lyophilized powder at 2-8°C, protected from light. After reconstitution with bacteriostatic water, use within 7-14 days at 2-8°C. Do not freeze.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Jastreboff AM, Kaplan LM, Frías JP, et al. Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial. N Engl J Med. 2023;389(6):514-526. doi:10.1056/NEJMoa2301972",
      "Rosenstock J, Frias J, Jastreboff AM, et al. Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial. Lancet. 2023;402(10414):1525-1538. doi:10.1016/S0140-6736(23)01163-7",
      "Coskun T, Urva S, Roell WC, et al. LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss: From discovery to clinical proof of concept. Cell Metab. 2022;35(4):745-758. doi:10.1016/j.cmet.2022.05.004",
      "Eli Lilly & Company. TRIUMPH Phase 3 obesity programme — multiple registered trials. ClinicalTrials.gov.",
      "Kar S, et al. GIP in the brain: a new appetite-regulating pathway. Nat Rev Endocrinol. 2023.",
      "Müller TD, Finan B, Bloom SR, et al. Glucagon-like peptide 1 (GLP-1). Mol Metab. 2019;30:72-130.",
      "Nauck MA, Quast DR, Wefers J, Meier JJ. GLP-1 receptor agonists in the treatment of type 2 diabetes — state-of-the-art. Mol Metab. 2021;46:101102.",
      "British Pharmacological Society. Guide to Receptors and Channels (GRAC). 2024 edition.",
      "UK Research & Innovation (UKRI). Peptide therapeutics landscape. 2024.",
    ],
  },

  "tb-500": {
    overview: {
      whatIs: "TB-500 is a synthetic 43-amino acid analog of Thymosin Beta-4 (Tβ4), a naturally occurring peptide found in virtually all human and animal cells. First isolated from thymus tissue in the 1960s, Thymosin Beta-4 is one of the most abundant intracellular peptides in mammalian systems. TB-500 represents the active actin-binding fragment of Tβ4, retaining the key regenerative properties of the full-length peptide while offering improved stability for research applications. It has been the subject of extensive preclinical research for its roles in actin regulation, cell migration, angiogenesis, and tissue repair across multiple tissue types including cardiac muscle, skin, cornea, skeletal muscle, tendons, and peripheral nerves.",
      mechanism: "TB-500 exerts its effects through multiple coordinated pathways: (1) G-actin sequestration — Tβ4 binds to monomeric actin (G-actin), acting as the principal actin-sequestering protein in cells. This regulates the dynamic equilibrium between G-actin and filamentous actin (F-actin), a process critical for cell migration, adhesion, and cytoskeletal remodelling; (2) Angiogenesis — TB-500 upregulates vascular endothelial growth factor (VEGF) and promotes endothelial cell migration, stimulating new blood vessel formation essential for tissue repair; (3) Anti-inflammatory signalling — it suppresses NF-κB activation, reduces pro-inflammatory cytokine production, and promotes M2 macrophage polarisation, shifting the inflammatory environment toward a pro-repair state; (4) Stem cell recruitment — Tβ4 activates satellite cells and promotes their migration to injury sites, enhancing tissue regeneration capacity; (5) Gene expression modulation — it upregulates matrix metalloproteinases (MMPs) and downregulates their inhibitors (TIMPs), facilitating extracellular matrix remodelling during healing.",
      benefits: [
        "Accelerates tissue repair and wound healing across multiple tissue types",
        "Promotes angiogenesis — new blood vessel formation for improved tissue perfusion",
        "Reduces inflammation through NF-κB suppression and M2 macrophage polarisation",
        "Enhances cell migration and motility through actin regulation",
        "Recruits and activates stem cells to injury sites for enhanced regeneration",
        "Supports cardiac repair — improved fractional shortening and reduced infarct size post-MI",
        "Systemic action — acts throughout the body unlike locally-focused peptides",
        "Well-studied with peer-reviewed research across cardiac, muscle, tendon, and nerve tissues",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "~4,921 Da (full Tβ4); ~2,200 Da (synthetic TB-500)" },
        { label: "Sequence Length", value: "43 amino acids (synthetic fragment)" },
        { label: "Sequence", value: "AGKNPLPKKETIEQEKQAGES-NH₂ (active fragment domain)" },
        { label: "Half-Life", value: "2-6 hours (unmodified peptide)" },
        { label: "CAS Number", value: "77591-33-4" },
        { label: "Purity", value: "≥98% (HPLC)" },
        { label: "Form", value: "Lyophilized powder" },
        { label: "Type", value: "Synthetic Thymosin Beta-4 fragment" },
        { label: "Primary Targets", value: "G-actin, VEGF pathway, integrins" },
      ],
      diagramTitle: "TB-500",
      diagramSubtitle: "43-mer · ~4,921 Da · Actin-binding peptide · Tissue repair & regeneration",
      residues: [
        { x: 30, y: 70, label: "A", color: "#6366f1", name: "Ala" },
        { x: 50, y: 55, label: "G", color: "#0891b2", name: "Gly" },
        { x: 70, y: 45, label: "K", color: "#8b5cf6", name: "Lys" },
        { x: 90, y: 35, label: "N", color: "#16a34a", name: "Asn" },
        { x: 110, y: 28, label: "P", color: "#9333ea", name: "Pro" },
        { x: 130, y: 30, label: "L", color: "#0891b2", name: "Leu" },
        { x: 150, y: 38, label: "P", color: "#9333ea", name: "Pro" },
        { x: 170, y: 50, label: "K", color: "#8b5cf6", name: "Lys" },
        { x: 185, y: 65, label: "K", color: "#8b5cf6", name: "Lys" },
        { x: 195, y: 80, label: "E", color: "#dc2626", name: "Glu" },
        { x: 200, y: 100, label: "T", color: "#0d9488", name: "Thr" },
        { x: 195, y: 120, label: "I", color: "#0891b2", name: "Ile" },
        { x: 185, y: 135, label: "E", color: "#dc2626", name: "Glu" },
        { x: 170, y: 150, label: "Q", color: "#ca8a04", name: "Gln" },
        { x: 150, y: 160, label: "E", color: "#dc2626", name: "Glu" },
        { x: 130, y: 165, label: "K", color: "#8b5cf6", name: "Lys" },
        { x: 110, y: 165, label: "Q", color: "#ca8a04", name: "Gln" },
        { x: 90, y: 160, label: "A", color: "#6366f1", name: "Ala" },
        { x: 70, y: 150, label: "G", color: "#0891b2", name: "Gly" },
      ],
      legend: "Active N-terminal actin-binding domain shown",
    },
    indications: {
      mostEffective: [
        { title: "Cardiac Repair", desc: "Rodent models of myocardial infarction show Tβ4 improves fractional shortening, reduces infarct size, and promotes cardiomyocyte survival via Akt activation. One of the most extensively studied applications (Bock-Marquette et al., 2004)." },
        { title: "Skeletal Muscle Regeneration", desc: "TB-500 promotes satellite cell activation and myotube formation in injured muscle. Studies in cardiotoxin-injured tibialis anterior muscle show enhanced regeneration." },
        { title: "Wound Healing", desc: "Topical Tβ4 increases re-epithelialisation rate by 42% in mouse wound models, with enhanced dermal collagen deposition and accelerated closure rates." },
        { title: "Tendon & Ligament Repair", desc: "Equine and rodent studies show TB-500 increases tenocyte proliferation, upregulates matrix gene expression, and improves functional recovery after tendon injury." },
      ],
      effective: [
        { title: "Corneal Repair", desc: "Tβ4 eye drops significantly accelerate corneal epithelial cell migration and reduce inflammatory infiltrates after alkali burn injury in rat models." },
        { title: "Peripheral Nerve Regeneration", desc: "Tβ4 treatment following sciatic nerve crush injury promotes axonal regeneration, improved functional recovery, and reduced lesion volume." },
        { title: "Spinal Cord Injury", desc: "Systemic Tβ4 administration after SCI reduces lesion volume, promotes axonal sprouting, and improves motor function scores in rat models." },
      ],
      moderate: [
        { title: "Anti-Fibrotic Effects", desc: "Preclinical evidence suggests Tβ4 may reduce fibrosis in multiple tissue types through regulation of MMP/TIMP balance and TGF-β signalling." },
        { title: "Gastrointestinal Healing", desc: "Emerging research suggests TB-500 may support GI barrier repair through actin cytoskeleton stabilisation, though less studied than BPC-157 in this application." },
      ],
    },
    dosing: {
      note: "All dosing information is for laboratory research purposes only. Not for human or veterinary use. Protocols vary based on research model and target tissue.",
      rows: [
        { goal: "Loading Phase", dose: "2.5-5 mg", freq: "2× per week", route: "SC" },
        { goal: "Maintenance Phase", dose: "2.5 mg", freq: "1× per week or 1× every 2 weeks", route: "SC" },
        { goal: "Acute/Injury Protocol", dose: "2.5-5 mg", freq: "Daily × 3-5 days then 2× weekly", route: "SC" },
        { goal: "Systemic Repair Research", dose: "5 mg", freq: "2× per week for 4-6 weeks", route: "SC" },
        { goal: "Small Rodent Research", dose: "1-2.5 mg/kg", freq: "2× per week", route: "SC or IP" },
      ],
      tips: [
        "TB-500 has systemic action — injection site does not need to be near the target tissue",
        "Loading phase front-loads to build systemic concentrations; most published studies use an intensive early phase",
        "Maintenance phase reduces frequency once target tissue response is achieved",
        "TB-500 is often paired with BPC-157 in research protocols for synergistic healing — BPC-157 for local, TB-500 for systemic coverage",
        "Reconstitute with bacteriostatic water; swirl gently, never shake",
        "Store lyophilized at 2-8°C; use reconstituted within 7-14 days",
      ],
    },
    interactions: {
      note: "TB-500 is frequently combined with BPC-157 in healing research protocols — they target complementary pathways (systemic vs local) for comprehensive tissue repair.",
      cards: [
        { slug: "bpc-157", name: "BPC-157", desc: "Synergistic — BPC-157 provides localised tissue repair (tendons, ligaments, GI tract) while TB-500 works systemically. Together they offer comprehensive healing coverage in research models.", effect: "Synergistic" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Synergistic — GHK-Cu supports collagen synthesis and wound healing through copper-dependent pathways, complementing TB-500's actin-mediated cell migration and angiogenesis effects.", effect: "Synergistic" },
        { slug: "ss-31", name: "SS-31", desc: "Supportive — SS-31 targets mitochondrial function and oxidative stress, which may support cellular energy metabolism during tissue repair processes.", effect: "Supportive" },
        { slug: "kpv", name: "KPV", desc: "Supportive — KPV is a tripeptide with anti-inflammatory properties that may complement TB-500's NF-κB suppression pathway in inflammation models.", effect: "Supportive" },
        { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", desc: "Complementary — While TB-500 focuses on tissue repair and actin regulation, Thymosin Alpha-1 is primarily studied for immune modulation.", effect: "Complementary" },
      ],
      stackNotes: [
        "TB-500 + BPC-157 is the most studied healing peptide stack in research literature",
        "TB-500 acts systemically — one injection reaches all tissues; no need for site-specific administration",
        "The combination of TB-500 (systemic actin/angiogenesis) and GHK-Cu (collagen/copper) targets complementary healing pathways",
        "Full-length Tβ4 has been through Phase I/II clinical trials for cardiac indications, supporting its safety profile",
        "Always introduce additional compounds one at a time in multi-peptide protocols to isolate individual effects",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "Loading dose administered 2× weekly. TB-500 begins binding G-actin, modulating cytoskeletal dynamics. Early anti-inflammatory signalling initiated through NF-κB pathway suppression.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Cellular Activation Phase", desc: "Consistent TB-500 levels achieved through loading protocol. Angiogenic signalling upregulated — VEGF expression increases. Stem cell recruitment begins at injury sites. Cell migration enhanced through actin dynamics modulation.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Tissue Remodelling Phase", desc: "Peak angiogenic response — new blood vessel formation supports enhanced tissue perfusion. Fibroblast activity and collagen deposition increased. Macrophage polarisation shifts toward M2 (pro-repair) phenotype.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-42", title: "Active Repair Phase", desc: "Functional tissue improvements measurable — increased tensile strength in tendon models, improved contractility in cardiac models. Extracellular matrix remodelling reaches maximum rate. Satellite cell differentiation supporting muscle regeneration.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 42-84", title: "Peak Repair & Maintenance", desc: "Transition to maintenance dosing (1× weekly). Tissue architecture restored in most models — scar reduction, improved functional outcomes. Cardiac studies show sustained improvement in fractional shortening and reduced infarct wall thinning.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84+", title: "Study Conclusion", desc: "Most TB-500 research protocols run 8-12 weeks. Comprehensive assessment of tissue repair biomarkers, functional outcomes, and histological analysis. Tβ4 levels return to baseline within 2-4 weeks after cessation.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "TB-500 is not approved by the MHRA, FDA, or any regulatory body for human consumption. For in-vitro and laboratory research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Preclinical Safety", text: "Tβ4 has been through multiple Phase I/II clinical trials for cardiac indications with a favourable safety profile. No significant adverse events have been attributed to TB-500/Tβ4 in the published research literature.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Angiogenesis Considerations", text: "TB-500's pro-angiogenic effects mean caution is warranted in research involving subjects with active malignancies or proliferative retinopathy, where enhanced blood vessel formation could be detrimental.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "amber" },
        { label: "Contraindications", text: "Extra caution in research models involving active cancer, as Tβ4's cell migration and angiogenesis promotion could theoretically influence tumour growth. Not studied in pregnancy or developmental models.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
        { label: "Theoretical Effects", text: "As an actin-binding protein, Tβ4 could theoretically influence any actin-dependent cellular process. Research models should account for its broad mechanism of action when interpreting results.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "blue" },
        { label: "Quality Standards", text: "Require ≥98% HPLC purity with mass spectrometry verification. Given its 43-amino-acid length, verify COA for peptide content (>80%) and deletion sequences. Endotoxin levels <1 EU/mg for cell-culture applications.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Bock-Marquette I, Saxena A, White MD, et al. Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004;432(7015):466-472. doi:10.1038/nature03000",
      "Malinda KM, Goldstein AL, Kleinman HK. Thymosin β4 stimulates directional migration of human umbilical vein endothelial cells. FASEB J. 1999;13(3):473-482.",
      "Sosne G, Chan CC, Thai K, et al. Thymosin β4 promotes corneal wound healing and modulates inflammatory mediators in vivo. Exp Eye Res. 2001;72(5):605-613.",
      "Ho JH, Chuang CH, Ho CY, et al. Thymosin β4 treatment accelerates wound healing. Wound Repair Regen. 2012;20(3):414-424.",
      "Morris DC, Cui Y, Cheung WL, et al. A dose-response study of thymosin β4 for the treatment of acute spinal cord injury. J Neurosurg Spine. 2010;13(6):739-749.",
      "Barber FA, Aziz-Jacobo J. Thymosin β4 in tendon healing. Am J Sports Med. 2013;41(7):1578-1585.",
      "Dube KN, et al. Thymosin β4 promotes peripheral nerve regeneration. J Peripher Nerv Syst. 2012;17(3):270-281.",
      "Goldstein AL, Hannappel E, Kleinman HK. Thymosin β4: actin-sequestering protein moonlights to repair injured tissues. Trends Mol Med. 2005;11(9):421-429.",
      "Smart N, Risebro CA, Melville AA, et al. Thymosin β4 induces adult epicardial progenitor mobilization and neovascularization. Nature. 2007;445(7124):177-182.",
      "Crockford D, Turjman N, Allan C, et al. Thymosin β4: structure, function, and biological properties supporting current and future clinical applications. Ann N Y Acad Sci. 2010;1194:179-189.",
    ],
  },

  "ghk-cu": {
    overview: {
      whatIs: "GHK-Cu (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide copper complex first isolated from human plasma by Loren Pickart in 1973. It consists of three amino acids — glycine, histidine, and lysine — complexed with a copper(II) ion. The tripeptide has a strong affinity for copper and is found naturally in human plasma at approximately 200 ng/mL at age 20, declining to 80 ng/mL by age 60. GHK-Cu is one of the most extensively studied copper peptides in dermatological and wound-healing research, with documented effects on collagen synthesis, angiogenesis, antioxidant activity, anti-inflammatory signalling, and gene expression modulation. It is widely used in cosmetics as a reparative and anti-aging ingredient under the INCI name Copper Tripeptide-1.",
      mechanism: "GHK-Cu exerts its biological effects through copper-dependent and copper-independent mechanisms. The copper ion is coordinated by the imidazole nitrogen of histidine, the alpha-amino group of glycine, and the deprotonated amide nitrogen of the glycine-histidine peptide bond, silencing copper's redox activity and enabling non-toxic copper delivery into cells. Once inside cells, GHK-Cu modulates the activity of cuproenzymes including superoxide dismutase (antioxidant defence), lysyl oxidase (collagen cross-linking), and cytochrome c oxidase (cellular respiration). It stimulates fibroblast collagen and glycosaminoglycan synthesis, promotes angiogenesis through VEGF upregulation, reduces inflammation by suppressing TNF-α and NF-κB signalling, and modulates the expression of over 4,000 human genes. GHK-Cu also activates matrix metalloproteinases (MMPs) and their inhibitors (TIMPs), regulating the balance between extracellular matrix synthesis and breakdown.",
      benefits: [
        "Stimulates collagen and glycosaminoglycan synthesis in skin fibroblasts",
        "Promotes wound healing and tissue repair through multiple pathways",
        "Anti-inflammatory — suppresses TNF-α, NF-κB, and pro-inflammatory cytokines",
        "Antioxidant — supports superoxide dismutase and other cuproenzyme activities",
        "Promotes angiogenesis and new blood vessel formation",
        "Anti-aging effects — improves skin firmness, reduces wrinkles in controlled studies",
        "Modulates expression of over 4,000 human genes involved in repair and regeneration",
        "Naturally occurring — found in human plasma, saliva, and urine",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Formula", value: "C₁₄H₂₄N₆O₄ (peptide); C₁₄H₂₂CuN₆O₄ (Cu complex)" },
        { label: "Molecular Weight", value: "340.38 g/mol (peptide); ~402 g/mol (Cu complex)" },
        { label: "CAS Number", value: "49557-75-7 (peptide); 89030-95-5 (Cu complex)" },
        { label: "Sequence", value: "Glycyl-L-Histidyl-L-Lysine (GHK)" },
        { label: "Length", value: "3 amino acids (tripeptide)" },
        { label: "Half-Life", value: "~3 hours in plasma" },
        { label: "Purity", value: "≥98% (HPLC)" },
        { label: "Form", value: "Lyophilized powder (blue-tinted due to copper)" },
        { label: "INCI Name", value: "Copper Tripeptide-1" },
        { label: "PubChem CID", value: "342538 (peptide); 378611 (Cu complex)" },
        { label: "Copper Binding Constant", value: "log₁₀ = 16.44 (high affinity)" },
      ],
      diagramTitle: "GHK-Cu",
      diagramSubtitle: "3-mer · ~402 Da · Copper tripeptide · Wound healing & collagen synthesis",
      residues: [
        { x: 30, y: 100, label: "G", color: "#6366f1", name: "Gly" },
        { x: 85, y: 100, label: "H", color: "#0891b2", name: "His" },
        { x: 140, y: 100, label: "K", color: "#8b5cf6", name: "Lys" },
      ],
      legend: "Tripeptide: Gly-His-Lys with Cu²⁺ coordinated by His imidazole, Gly α-amino, and the amide nitrogen",
    },
    indications: {
      mostEffective: [
        { title: "Wound Healing & Tissue Repair", desc: "GHK-Cu stimulates collagen synthesis, angiogenesis, and wound contraction in multiple animal models. Full-thickness wound studies show 64.5% wound size reduction vs 28.2% in controls over 13 days, with reduced TNF-α and MMP levels." },
        { title: "Collagen Synthesis & Skin Health", desc: "At picomolar to nanomolar concentrations, GHK-Cu stimulates collagen synthesis in skin fibroblasts, increases total protein accumulation, and promotes glycosaminoglycan production for improved skin structure and firmness." },
        { title: "Anti-Aging & Dermatological Research", desc: "Controlled facial studies demonstrate anti-aging, firming, and anti-wrinkle activity. GHK-Cu modulates over 4,000 human genes including those involved in extracellular matrix remodelling and antioxidant defence." },
      ],
      effective: [
        { title: "Anti-Inflammatory Research", desc: "GHK-Cu reduces TNF-α levels, suppresses NF-κB signalling, and decreases inflammatory cytokine expression. Studies in colitis and fibrosis models show significant anti-inflammatory effects." },
        { title: "Antioxidant Protection", desc: "GHK-Cu elevates antioxidant enzymes including superoxide dismutase, catalase, and glutathione peroxidase. It reduces oxidative stress markers and protects against lipid peroxidation." },
        { title: "Angiogenesis Promotion", desc: "GHK-Cu stimulates VEGF release and promotes new blood vessel formation, supporting tissue perfusion and nutrient delivery during healing." },
      ],
      moderate: [
        { title: "Bone & Connective Tissue", desc: "BMP-2 upregulation via GHK-Cu suggests potential applications in bone and connective tissue research, though studies are less extensive than wound-healing literature." },
        { title: "Hair Growth Research", desc: "GHK-Cu is used in hair loss prevention cosmetics. Copper-dependent enzyme tyrosinase is involved in melanin production, and copper delivery may support follicular function." },
      ],
    },
    dosing: {
      note: "All dosing information is for laboratory research purposes only. GHK-Cu is distinct from other peptides in that it is a copper complex, not a signalling peptide. Dosing should account for copper content.",
      rows: [
        { goal: "Wound Healing Research (topical)", dose: "1-10 µM (in gel/cream)", freq: "1-2× daily", route: "Topical" },
        { goal: "Systemic Research (SC)", dose: "1-5 mg", freq: "1× daily", route: "SC" },
        { goal: "Cell Culture", dose: "1-100 nM", freq: "Per protocol", route: "In vitro" },
        { goal: "Anti-Aging Research (topical)", dose: "0.1-1% in formulation", freq: "1× daily", route: "Topical" },
        { goal: "Rodent Research", dose: "0.5-2 mg/kg", freq: "1× daily", route: "SC or IP" },
      ],
      tips: [
        "GHK-Cu has a distinct blue colour due to the copper complex — this is normal and indicates proper copper binding",
        "Unlike most peptides, GHK-Cu is a copper complex and its biological activity depends on maintaining copper coordination",
        "Topical formulations are most common in dermatological research due to GHK-Cu's established skin penetration profile",
        "Store lyophilized powder at 2-8°C, protected from light and moisture",
        "Reconstitute with bacteriostatic water; use within 7-14 days at 2-8°C",
        "GHK-Cu levels naturally decline with age — from ~200 ng/mL at 20 to ~80 ng/mL at 60",
      ],
    },
    interactions: {
      note: "GHK-Cu is unique among peptides as a copper complex that delivers copper into cells. Its interactions with other compounds should account for potential copper chelation effects.",
      cards: [
        { slug: "tb-500", name: "TB-500", desc: "Synergistic — GHK-Cu supports collagen synthesis through copper-dependent lysyl oxidase, complementing TB-500's actin-mediated cell migration and angiogenesis for comprehensive tissue repair.", effect: "Synergistic" },
        { slug: "bpc-157", name: "BPC-157", desc: "Synergistic — GHK-Cu enhances collagen deposition and wound contraction while BPC-157 accelerates angiogenesis and tissue healing through distinct NO/VEGF pathways.", effect: "Synergistic" },
        { slug: "glutathione", name: "Glutathione", desc: "Supportive — Glutathione is the body's primary antioxidant and supports the redox environment that GHK-Cu's cuproenzymes operate within.", effect: "Supportive" },
        { slug: "kpv", name: "KPV", desc: "Supportive — KPV has anti-inflammatory properties that complement GHK-Cu's cytokine-modulating effects in inflammation and wound healing research.", effect: "Supportive" },
        { slug: "vitamin-c", name: "Vitamin C", desc: "Supportive — Vitamin C is a required cofactor for collagen synthesis and may support GHK-Cu's effects on fibroblast collagen production.", effect: "Supportive" },
      ],
      stackNotes: [
        "GHK-Cu is naturally found in human plasma — it is not a foreign peptide but a physiological copper carrier",
        "Copper delivery is the primary mechanism — stacking with copper-binding compounds may reduce availability",
        "GHK-Cu + TB-500 + BPC-157 forms a comprehensive healing stack covering collagen, actin, and angiogenesis pathways",
        "GHK-Cu levels decline with age (200 ng/mL at 20 → 80 ng/mL at 60), which may influence research outcomes in age-related studies",
        "The copper complex silences Cu²⁺ redox activity, allowing non-toxic copper delivery into cells — a unique safety feature",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Application", desc: "GHK-Cu begins copper delivery into cells. Fibroblast activation initiated — early collagen gene expression upregulated. Antioxidant enzyme activity (SOD, catalase) increases. Anti-inflammatory signalling begins through TNF-α suppression.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Collagen Synthesis Phase", desc: "Peak collagen production in fibroblast cultures. Glycosaminoglycan synthesis increases. Early wound contraction in topical models. Angiogenic signalling (VEGF) begins upregulation.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Tissue Remodelling Phase", desc: "Continued collagen deposition and cross-linking via lysyl oxidase. Wound closure significantly accelerated (64.5% vs 28.2% in controls in full-thickness wound models). MMP/TIMP balance shifts toward matrix remodelling.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-42", title: "Active Healing Phase", desc: "Granulation tissue formation and angiogenesis reach maximum. New blood vessel networks established. Decorin and other proteoglycans regulate collagen fibril organisation. Antioxidant enzyme levels remain elevated.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 42-84", title: "Maturation & Remodelling", desc: "Tissue tensile strength continues to improve as collagen matures and cross-links. Scar remodelling — transition from collagen III to collagen I. In anti-aging models, skin firmness and wrinkle reduction become measurable.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84+", title: "Maintenance & Assessment", desc: "Extended studies assess sustained tissue improvements, scar quality, and functional outcomes. GHK-Cu levels return to baseline within 1-2 weeks after cessation. Histological analysis evaluates collagen organisation and vascularisation.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Naturally Occurring", text: "GHK-Cu is a naturally occurring copper complex found in human plasma, saliva, and urine. Endogenous levels are ~200 ng/mL at age 20, declining to ~80 ng/mL at age 60. Its natural presence supports a favourable safety profile.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Copper Overload Risk", text: "Excessive copper administration could theoretically lead to copper overload. Research protocols should account for cumulative copper exposure, particularly with prolonged high-dose regimens. Monitor copper levels in extended studies.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "MMP Regulation", text: "GHK-Cu stimulates both MMP synthesis and TIMP expression. This dual regulation is beneficial for controlled remodelling, but excessive MMP activation could lead to unwanted matrix degradation. Use caution in research models with compromised connective tissue.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "amber" },
        { label: "Copper Redox Silencing", text: "A key safety feature of GHK-Cu is that copper(II) redox activity is silenced when complexed with the tripeptide, preventing Fenton chemistry and oxidative damage. This allows non-toxic copper delivery into cells.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "emerald" },
        { label: "Research Use Only", text: "GHK-Cu is widely used in cosmetic products as an anti-aging ingredient under INCI name Copper Tripeptide-1. For laboratory research, ensure products are labelled for research use only and provide appropriate COA documentation.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Quality Standards", text: "Verify ≥98% HPLC purity with mass spectrometry confirmation of the copper complex. The distinctive blue colour confirms proper copper coordination. Endotoxin levels <1 EU/mg for cell-culture applications.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Pickart L, Thaler MM. Tripeptide in human serum which prolongs survival of normal liver cells and stimulates growth in neoplastic liver. Nature. 1973;243(124):85-87.",
      "Maquart FX, Pickart L, Laurent M, et al. Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu²⁺. FEBS Lett. 1988;238(2):343-346.",
      "Wegrowski Y, Maquart FX, Borel JP. Stimulation of sulfated glycosaminoglycan synthesis by the tripeptide-copper complex. Life Sci. 1992;51(13):1049-1056.",
      "Siméon A, Wegrowski Y, Bontemps Y, Maquart FX. Expression of glycosaminoglycans and small proteoglycans in wounds: modulation by GHK-Cu. J Invest Dermatol. 2000;115(6):962-968.",
      "Pickart L. The human tri-peptide GHK and tissue remodelling. J Biomater Sci Polym Ed. 2008;19(8):969-988.",
      "Bian Y, et al. GHK-Cu attenuates lung inflammation and fibrosis by targeting peroxiredoxin 6. Redox Biol. 2024;75:103237.",
      "Greco V, et al. Copper complexes with GHK-hyaluronan conjugates show antioxidant properties and osteogenic effects. Bioconjug Chem. 2025;36(4):662-675.",
      "Mao S, et al. Exploring the beneficial effects of GHK-Cu on experimental colitis. Front Pharmacol. 2025;16:1551843.",
      "Pickart L, Freedman JH, Loker WJ, et al. Growth-modulating plasma tripeptide may function by facilitating copper uptake into cells. Nature. 1980;288(5792):715-717.",
      "Pickart L. The use of GHK-Cu in anti-aging and reparative cosmetics. In: Cosmetic Dermatology. 2010.",
    ],
  },

  "tirzepatide": {
    overview: {
      whatIs: "Tirzepatide (LY3298176) is a first-in-class, 39-amino-acid synthetic peptide developed by Eli Lilly that functions as a dual agonist at both the glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors. Approved under the brand name Mounjaro in May 2022 for type 2 diabetes (T2D) and Zepbound in November 2023 for chronic weight management, tirzepatide represents the most significant therapeutic advance in the incretin class since the introduction of GLP-1 receptor agonists. Its peptide backbone is based on the native GIP sequence with strategic modifications — including a C20 fatty di-acid moiety conjugated to a lysine residue — that enable albumin binding, extend the half-life to approximately 5 days, and permit once-weekly subcutaneous administration. In the SURPASS phase 3 programme, tirzepatide produced unprecedented HbA1c reductions of up to 2.4% at the 15 mg dose, while the SURMOUNT-1 obesity trial demonstrated mean body-weight reductions of up to 22.5% (52 lb / 23.6 kg) at 72 weeks — exceeding results from any previously approved pharmacological intervention outside bariatric surgery.",
      mechanism: "Tirzepatide exerts its metabolic effects through simultaneous activation of two incretin receptor pathways. GIP receptor agonism — the distinguishing feature over selective GLP-1 receptor agonists — enhances glucose-dependent insulin secretion from pancreatic beta-cells, promotes adipose tissue glucose uptake, and modulates bone turnover. GLP-1 receptor agonism slows gastric emptying, suppresses postprandial glucagon secretion, increases glucose-dependent insulin release, and acts centrally on hypothalamic nuclei to reduce appetite and food intake. Unlike native GIP, which exhibits minimal GLP-1 receptor affinity, tirzepatide is engineered with a unique signalling bias — it acts as an \"imbalanced\" dual agonist with roughly equipotent binding at both receptors but biased GLP-1R signalling toward cAMP pathways while favouring β-arrestin recruitment at the GIP receptor. This bias is hypothesised to reduce GIP receptor desensitisation and contribute to tirzepatide's superior clinical efficacy compared to balanced co-agonists. At the molecular level, tirzepatide activates the adenylyl cyclase/cAMP/PKA cascade at both receptors, promoting insulin exocytosis, CREB-mediated gene transcription, and energy-expenditure pathways while simultaneously inhibiting glucagon secretion (via GLP-1R) and augmenting the incretin effect (via GIPR). Preclinical studies have also demonstrated direct effects on adipocyte metabolism, hepatic steatosis reduction, and cardiac function improvement that extend beyond weight-loss-mediated benefits.",
      benefits: [
        "First-in-class dual GIP/GLP-1 receptor agonist — the first therapeutic to co-target both incretin pathways",
        "Unmatched glycaemic control: HbA1c reductions up to 2.4% at 15 mg in the SURPASS programme — the largest reductions ever reported for an anti-diabetic agent",
        "Superior weight loss: up to 22.5% body weight reduction in SURMOUNT-1 at 72 weeks, exceeding all existing pharmacotherapies",
        "Once-weekly subcutaneous dosing with a 5-day half-life for convenient administration",
        "Proven MASH resolution: 62.4% achieved MASH resolution without worsening fibrosis at 52 weeks (SYNERGY-NASH trial)",
        "Cardiovascular benefit: reduced risk of CV death or worsening heart failure in HFpEF patients with obesity (SUMMIT trial)",
        "Improves multiple cardiometabolic risk factors including blood pressure, lipid profiles, and inflammatory markers",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Formula", value: "C₂₂₅H₃₄₈N₄₈O₆₈" },
        { label: "Molecular Weight", value: "4,813.53 Da" },
        { label: "Sequence", value: "YXEGTFTSDY SIXLDKIAQK AFVQWLIAGG PSSGAPPPS (X = Aib)" },
        { label: "Length", value: "39 amino acids" },
        { label: "Type", value: "Dual GIP/GLP-1 receptor agonist | Twincretin" },
        { label: "Half-Life", value: "~5 days" },
        { label: "CAS Number", value: "2023788-19-2" },
        { label: "PubChem CID", value: "156588324" },
        { label: "Purity", value: "≥99% (HPLC)" },
        { label: "Form", value: "Lyophilized powder" },
        { label: "Developed By", value: "Eli Lilly & Company" },
        { label: "Research Code", value: "LY3298176" },
      ],
      diagramTitle: "Tirzepatide",
      diagramSubtitle: "39-mer · 4,813.53 Da · Dual GIP/GLP-1 Agonist · Twincretin · Sequence: YXEGTFTSDY SIXLDKIAQK AFVQWLIAGG PSSGAPPPS",
      residues: [
        { x: 40, y: 60, label: "Y", color: "#6366f1", name: "Tyr" },
        { x: 65, y: 80, label: "X", color: "#dc2626", name: "Aib" },
        { x: 85, y: 100, label: "E", color: "#16a34a", name: "Glu" },
        { x: 105, y: 115, label: "G", color: "#0891b2", name: "Gly" },
        { x: 125, y: 120, label: "T", color: "#0d9488", name: "Thr" },
        { x: 145, y: 115, label: "F", color: "#7c3aed", name: "Phe" },
        { x: 165, y: 100, label: "T", color: "#0d9488", name: "Thr" },
        { x: 185, y: 80, label: "S", color: "#6366f1", name: "Ser" },
        { x: 210, y: 60, label: "D", color: "#e11d48", name: "Asp" },
        { x: 235, y: 40, label: "Y", color: "#ca8a04", name: "Tyr" },
      ],
      legend: "X=Aib (aminoisobutyric acid, uncommon amino acid) — C20 fatty di-acid conjugated to Lys for albumin binding",
    },
    indications: {
      mostEffective: [
        { title: "Type 2 Diabetes Mellitus", desc: "Primary FDA-approved indication (Mounjaro, May 2022). The SURPASS phase 3 programme (SURPASS-1 through -5) demonstrated HbA1c reductions of 1.9–2.4% across doses — the largest ever reported for a glucose-lowering agent. In SURPASS-2, tirzepatide 10 mg and 15 mg were superior to semaglutide 1 mg for both HbA1c reduction (−2.30% vs −1.86%) and weight loss (−11.2 kg vs −5.7 kg). In SURPASS-4, tirzepatide was superior to insulin glargine in patients with high cardiovascular risk, with a 43% reduction in the composite MACE-4 endpoint (HR 0.77, 95% CI 0.62–0.95)." },
        { title: "Obesity & Weight Management", desc: "Approved as Zepbound (November 2023) for adults with BMI ≥30 or ≥27 with ≥1 weight-related comorbidity. SURMOUNT-1 (NEJM 2022) enrolled 2,539 adults with obesity without diabetes: mean weight loss was 15.0% (5 mg), 19.5% (10 mg), and 20.9% (15 mg) vs 3.1% placebo at 72 weeks. At 15 mg, 36.2% lost ≥25% of baseline body weight. SURMOUNT-2 demonstrated efficacy in patients with T2D and obesity, while SURMOUNT-4 showed that tirzepatide maintained weight loss over 88 weeks (25.3% total reduction)." },
        { title: "MASH / NASH (Metabolic Dysfunction-Associated Steatohepatitis)", desc: "The SYNERGY-NASH phase 2 trial (NEJM 2024, Loomba et al.) demonstrated that tirzepatide achieved MASH resolution without worsening fibrosis in 43.6% (5 mg), 55.5% (10 mg), and 62.4% (15 mg) of patients vs 9.8% placebo at 52 weeks — a treatment effect 5–6 times greater than placebo. Fibrosis improvement of ≥1 stage was achieved in 51% (5 mg) and 54% (10 mg and 15 mg) vs 31% placebo. These results position tirzepatide as a leading candidate for MASH pharmacotherapy." },
      ],
      effective: [
        { title: "Heart Failure with Preserved Ejection Fraction (HFpEF)", desc: "The SUMMIT trial (NEJM 2024, Packer et al.) randomly assigned 731 patients with obesity and HFpEF to tirzepatide or placebo. Tirzepatide reduced the composite endpoint of CV death or worsening heart failure events (HR 0.62, 95% CI 0.41–0.95, p=0.026) and improved Kansas City Cardiomyopathy Questionnaire scores by 19.5 vs 12.7 points (p<0.001). The risk of HF hospitalisation was reduced by 44%." },
        { title: "Cardiovascular Risk Reduction", desc: "SURPASS-4 demonstrated a 43% reduction in MACE-4 (HR 0.77) in patients with T2D and established CV disease. SURPASS-CVOT — a dedicated cardiovascular outcomes trial enrolling over 12,000 patients — is ongoing (expected readout 2026–2027). Exploratory analyses from SURPASS-2 and SURPASS-3 showed significant reductions in systolic blood pressure (5–8 mmHg), triglycerides (20–35%), and hs-CRP (30–45%) across all tirzepatide doses." },
        { title: "Renal Protection", desc: "A prespecified kidney analysis from SURPASS-4 (Heerspink et al., Lancet Diabetes Endocrinol 2022) showed tirzepatide slowed eGFR decline (−0.7 vs −3.2 mL/min/1.73m² per year) and reduced UACR by 38% (95% CI 24–50%) vs insulin glargine over 2 years, suggesting renal protective effects independent of glycaemic control." },
      ],
      moderate: [
        { title: "Obstructive Sleep Apnoea (OSA)", desc: "SURMOUNT-OSA (2024) investigated tirzepatide in patients with moderate-to-severe OSA and obesity. Results showed tirzepatide reduced the apnoea-hypopnoea index (AHI) by 28–63% from baseline depending on subgroup, with concomitant improvements in body weight, blood pressure, and patient-reported sleep outcomes." },
        { title: "Prevention of T2D Onset", desc: "Post-hoc analysis of SURMOUNT-1 demonstrated that tirzepatide reduced the predicted 10-year risk of developing T2D by 92–96% in adults with obesity or overweight, across all baseline glycaemic categories. A dedicated diabetes prevention trial is under consideration." },
      ],
    },
    dosing: {
      note: "Tirzepatide is administered as a once-weekly subcutaneous injection. The FDA-approved titration schedule requires gradual dose escalation over 20 weeks to minimise gastrointestinal side effects. All doses are injected on the same day each week, at any time of day, with or without meals. Rotate injection sites (abdomen, thigh, upper arm). Store refrigerated at 2–8°C; can be kept at room temperature (<30°C) for up to 21 days.",
      rows: [
        { goal: "T2D — Starting Dose", dose: "2.5 mg", freq: "Once weekly (weeks 1–4)", route: "SC" },
        { goal: "T2D — Titration Step 1", dose: "5 mg", freq: "Once weekly (weeks 5–8)", route: "SC" },
        { goal: "T2D — Titration Step 2", dose: "7.5 mg", freq: "Once weekly (weeks 9–12)", route: "SC" },
        { goal: "T2D — Titration Step 3", dose: "10 mg", freq: "Once weekly (weeks 13–16)", route: "SC" },
        { goal: "T2D — Titration Step 4", dose: "12.5 mg", freq: "Once weekly (weeks 17–20)", route: "SC" },
        { goal: "T2D — Maximum Dose", dose: "15 mg", freq: "Once weekly (week 21+)", route: "SC" },
        { goal: "Weight Loss — Starting", dose: "2.5 mg", freq: "Once weekly (weeks 1–4)", route: "SC" },
        { goal: "Weight Loss — Maintenance", dose: "5 / 10 / 15 mg", freq: "Once weekly (maintenance)", route: "SC" },
        { goal: "Research Context — Low", dose: "1 mg", freq: "Once weekly", route: "SC" },
        { goal: "Research Context — Standard", dose: "5–15 mg", freq: "Once weekly (titrated)", route: "SC" },
      ],
      tips: [
        "Always follow the 4-week titration schedule — rapid dose escalation significantly increases gastrointestinal side effects and discontinuation rates",
        "Administer on the same day each week (±1 day acceptable); if a dose is missed, administer within 4 days of the scheduled date",
        "If tirzepatide is added to existing insulin therapy, reduce insulin dose by 10–20% to mitigate hypoglycaemia risk and titrate based on glucose monitoring",
        "Tirzepatide delays gastric emptying — this may affect the absorption of oral medications, particularly at treatment initiation",
        "For weight management: the 5 mg, 10 mg, and 15 mg maintenance doses are all available; choose based on tolerability and response",
        "Rotate injection sites (abdomen, thigh, upper arm) to minimise injection-site reactions — do not inject into areas with bruising, tenderness, or scarring",
      ],
    },
    interactions: {
      note: "Tirzepatide is an FDA-approved prescription medication with established drug-interaction data from clinical trials. It should not be combined with other incretin-based therapies. Its gastric-emptying delay effect may affect the absorption rate of concomitantly administered oral medications.",
      cards: [
        { slug: "semaglutide", name: "Semaglutide", desc: "Contraindicated — Combining tirzepatide with other GLP-1 receptor agonists (semaglutide, liraglutide, dulaglutide) is not recommended. Both are incretin receptor agonists and concurrent use provides no additional benefit while significantly increasing the risk of gastrointestinal side effects (nausea, vomiting, diarrhoea) without additive efficacy.", effect: "Complementary" },
        { slug: "retatrutide", name: "Retatrutide", desc: "Mechanistically distinct — Retatrutide is a triple GLP-1/GIP/glucagon agonist still in clinical trials. Combining tirzepatide (dual agonist) with retatrutide is not recommended as they share GIP/GLP-1 receptor pathways with overlapping mechanisms and no established safety data for concurrent use.", effect: "Complementary" },
        { slug: "cagrilintide", name: "Cagrilintide", desc: "Synergistic potential — Cagrilintide is a long-acting amylin analogue in development. Amylin acts through a distinct satiety pathway (area postrema). Phase 2 data on cagrilintide + semaglutide suggest additive weight loss, and cagrilintide + tirzepatide is an active research combination under investigation.", effect: "Synergistic" },
        { slug: "insulin", name: "Insulin", desc: "Caution advised — Tirzepatide can be used with basal/bolus insulin but requires insulin dose reduction (10–20% at initiation) due to additive glucose-lowering effects. Patients should perform frequent blood glucose monitoring during the titration phase. The SURPASS-3 trial showed tirzepatide 15 mg was superior to titrated insulin degludec.", effect: "Supportive" },
        { slug: "metformin", name: "Metformin", desc: "Supportive — Tirzepatide is commonly prescribed alongside metformin as first-line combination therapy. No dose adjustment needed for either drug. SURPASS-2 and SURPASS-4 both used metformin as background therapy with excellent safety outcomes and additive efficacy.", effect: "Supportive" },
        { slug: "sulfonylureas", name: "Sulfonylureas", desc: "Caution advised — Concurrent use with sulfonylureas increases the risk of hypoglycaemia. Consider reducing the sulfonylurea dose when initiating tirzepatide. Monitor blood glucose closely during dose titration. In SURPASS trials, hypoglycaemia rates were higher in tirzepatide + sulfonylurea groups vs tirzepatide + metformin alone.", effect: "Supportive" },
      ],
      stackNotes: [
        "Tirzepatide should NEVER be combined with semaglutide, liraglutide, dulaglutide, or any other GLP-1 receptor agonist — no additional benefit, increased side effect risk",
        "When initiating tirzepatide in patients on insulin, reduce the insulin dose by 10–20% and titrate based on blood glucose monitoring",
        "Oral contraceptives: tirzepatide may reduce oral contraceptive effectiveness due to delayed gastric emptying — advise using a non-oral contraceptive method or adding a barrier method for 4 weeks after each dose escalation",
        "Warfarin/anticoagulants: tirzepatide may alter INR — monitor INR more frequently at initiation and during dose titration",
        "All tirzepatide dosing information is for laboratory research and informational purposes. Clinical use must follow the FDA-approved prescribing information under medical supervision",
      ],
    },
    timeline: {
      phases: [
        { day: "2014–2016", title: "Discovery & Preclinical", desc: "Eli Lilly scientists design tirzepatide (LY3298176) as a dual GIP/GLP-1 receptor co-agonist based on the native GIP sequence. Key modifications include Aib substitutions at positions 2 and 13 for DPP-4 resistance and a C20 fatty di-acid moiety conjugated to Lys20 for albumin binding. Preclinical studies in rodents and primates demonstrate superior HbA1c and weight reductions versus selective GLP-1 agonists.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "2016–2018", title: "Phase 1 & Phase 2 Trials", desc: "Phase 1 trials initiated in 2016 (NCT02652832, NCT03131687) establish safety, tolerability, and once-weekly pharmacokinetics. The pivotal Phase 2b dose-finding trial (NCT03131687) in 318 patients with T2D demonstrates dose-dependent HbA1c reductions up to −2.4% and significant weight loss at 5 mg, 10 mg, and 15 mg — outperforming dulaglutide 1.5 mg. These results, published in The Lancet (2018), launch the largest phase 3 programme in metabolic disease.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "2019–2021", title: "Phase 3 SURPASS Programme", desc: "Five global phase 3 trials (SURPASS-1 through -5) enrol over 7,000 patients with T2D. SURPASS-1 (monotherapy) shows HbA1c reduction up to −2.07% vs placebo (+0.04%). SURPASS-2 demonstrates superiority over semaglutide 1 mg: −2.30% vs −1.86% HbA1c, −11.2 kg vs −5.7 kg weight. SURPASS-3 shows superiority vs insulin degludec. SURPASS-4 demonstrates CV safety in high-risk patients. All results published in top-tier journals (Lancet, NEJM, JAMA).", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "May 2022", title: "FDA Approval — Mounjaro (T2D)", desc: "FDA approves tirzepatide (Mounjaro) for improving glycaemic control in adults with T2D as an adjunct to diet and exercise. EMA follows in September 2022. Launch is one of the most successful in pharmaceutical history, with over $4.8 billion in sales in the first 12 months. SURMOUNT-1 results published simultaneously in NEJM showing 20.9% weight loss.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Nov 2023 — 2024", title: "Zepbound Approval & Indication Expansion", desc: "FDA approves tirzepatide (Zepbound) for chronic weight management (Nov 2023). SYNERGY-NASH (June 2024) demonstrates 62.4% MASH resolution at 15 mg. SUMMIT (Nov 2024) shows reduced CV death and heart failure events in HFpEF. SURMOUNT-OSA reports significant AHI improvement. SURPASS-CVOT (12,000+ patients) continues for dedicated cardiovascular outcomes.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "2025+", title: "Ongoing Research & Future Directions", desc: "SURPASS-CVOT readout expected 2026–2027 to confirm cardiovascular benefit. Additional indications under investigation include type 1 diabetes, adolescent obesity, metabolic syndrome, inflammatory conditions, and neurodegenerative disease. Oral formulations of tirzepatide (orforglipron — non-peptide oral GLP-1 agonist) in parallel development at Eli Lilly. Tirzepatide is projected to reach $50+ billion in peak annual sales.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Prescription Medication", text: "Tirzepatide (Mounjaro / Zepbound) is an FDA-approved prescription medication. For research contexts, it is available as a lyophilised peptide for laboratory use only. All clinical administration must be under medical supervision with the FDA-approved injector device.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Boxed Warning — Thyroid C-Cell Tumours", text: "Tirzepatide carries an FDA boxed warning for thyroid C-cell tumours based on rodent studies. Medullary thyroid carcinoma (MTC) occurred in rats and mice at clinically relevant exposures. It is contraindicated in patients with a personal or family history of MTC or Multiple Endocrine Neoplasia syndrome type 2 (MEN-2). No definitive MTC has been confirmed in humans to date, but monitoring for neck lumps, dysphagia, hoarseness, or dyspnoea is required.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Gastrointestinal Effects — Very Common", text: "GI side effects are dose-dependent and most prominent during dose escalation. SURPASS pooled analysis: nausea 18–33%, diarrhoea 15–23%, vomiting 8–14%, constipation 8–12%, dyspepsia 6–9%, abdominal pain 5–7%. These are typically mild-to-moderate and transient, resolving within 4–8 weeks. Discontinuation rates due to GI adverse events were 6–11% across SURPASS trials. Gradual titration and dietary modifications (smaller meals, avoiding high-fat foods) can mitigate these effects.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Pancreatitis — Serious but Rare", text: "Acute pancreatitis was reported in <0.5% of tirzepatide-treated patients across clinical trials. Patients should be informed of symptoms (persistent severe abdominal pain, possibly radiating to the back, with or without vomiting). Tirzepatide should be discontinued promptly if pancreatitis is suspected — if confirmed, it should not be restarted. Caution in patients with a history of pancreatitis.", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
        { label: "Gallbladder Disease", text: "Cholelithiasis and cholecystitis occurred at higher rates with tirzepatide vs placebo (0.6–1.2% vs 0.3%). Rapid weight loss is a known risk factor for gallstone formation. Across SURMOUNT trials, gallbladder-related events were more frequent at higher doses. Patients with pre-existing gallbladder disease should be monitored. Recommendations include gradual weight loss and adequate dietary fat intake to maintain gallbladder emptying.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "red" },
        { label: "Hypoglycaemia & Additional Precautions", text: "When used as monotherapy or with metformin only, hypoglycaemia risk is low (<1%). Risk increases significantly with insulin or sulfonylureas (10–22%). Additional precautions: acute kidney injury (usually secondary to GI fluid losses), diabetic retinopathy complications (improve glycaemic control gradually), hypersensitivity reactions (angioedema reported), and heart rate increases of 2–4 bpm. Contraindicated in pregnancy — effective contraception is required during treatment.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
      ],
    },
    references: [
      "Frias JP, Davies MJ, Rosenstock J, et al. Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes. N Engl J Med. 2021;385(6):503-515. doi:10.1056/NEJMoa2107519 (SURPASS-2)",
      "Jastreboff AM, Aronne LJ, Ahmad NN, et al. Tirzepatide Once Weekly for the Treatment of Obesity. N Engl J Med. 2022;387(3):205-216. doi:10.1056/NEJMoa2206038 (SURMOUNT-1)",
      "Rosenstock J, Wysham C, Frias JP, et al. Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1): a double-blind, randomised, phase 3 trial. Lancet. 2021;398(10295):143-155. doi:10.1016/S0140-6736(21)01324-4",
      "Dahl D, Onishi Y, Norwood P, et al. Effect of subcutaneous tirzepatide vs placebo added to titrated insulin glargine on glycemic control in patients with type 2 diabetes (SURPASS-5): a randomized clinical trial. JAMA. 2022;327(6):534-545. doi:10.1001/jama.2022.0078",
      "Del Prato S, Kahn SE, Pavo I, et al. Tirzepatide versus insulin glargine in type 2 diabetes and increased cardiovascular risk (SURPASS-4): a randomised, open-label, parallel-group, phase 3 trial. Lancet. 2021;398(10313):1811-1824. doi:10.1016/S0140-6736(21)02188-7",
      "Coskun T, Sloop KW, Loghin C, et al. LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: From discovery to clinical proof of concept. Cell Metab. 2018;28(6):858-870. doi:10.1016/j.cmet.2018.09.007",
      "Loomba R, Hartman ML, Lawitz EJ, et al. Tirzepatide for Metabolic Dysfunction-Associated Steatohepatitis with Liver Fibrosis. N Engl J Med. 2024;391(4):299-310. doi:10.1056/NEJMoa2401943 (SYNERGY-NASH)",
      "Packer M, Zile MR, Kramer CM, et al. Tirzepatide for Heart Failure with Preserved Ejection Fraction and Obesity. N Engl J Med. 2024;391(20):1891-1903. doi:10.1056/NEJMoa2410027 (SUMMIT)",
      "Willard FS, Douros JD, Gabe MB, et al. Tirzepatide is an imbalanced and biased dual GIP and GLP-1 receptor agonist. JCI Insight. 2020;5(17):e140532. doi:10.1172/jci.insight.140532",
      "Heise T, Mari A, DeVries JH, et al. Tirzepatide reduces appetite, energy intake, and fat mass, and preserves lean mass in people with type 2 diabetes: a randomised, placebo-controlled, phase 2 trial. Lancet Diabetes Endocrinol. 2022;10(5):339-350. doi:10.1016/S2213-8587(22)00055-9",
    ],
  },
  "mots-c": {
    overview: {
      whatIs: "MOTS-c (Mitochondrial Open Reading Frame of the Twelve S rRNA Type-c) is a 16-amino-acid mitochondrial-derived peptide (MDP) discovered in 2015 by the Lee and Cohen laboratory at the University of Southern California. Unlike nuclear-encoded peptides, MOTS-c is encoded within the mitochondrial genome — specifically a short open reading frame (sORF) in the mitochondrial 12S rRNA gene — making it a unique retrograde signalling molecule through which mitochondria communicate with the nucleus and the rest of the body. It represents a paradigm shift in understanding how mitochondria regulate cellular function beyond ATP production: MOTS-c is actively exported from mitochondria, traffics to the nucleus, and directly influences gene expression in response to metabolic stress.",
      mechanism: "MOTS-c functions primarily as a metabolic regulator through multiple interconnected pathways. Its primary mechanism involves direct binding to and activation of CK2 (casein kinase II) in the cytoplasm and nucleus at nanomolar affinity (Kd ~50 nM). Through CK2, MOTS-c modulates one-carbon metabolism by shifting the folate cycle toward de novo purine biosynthesis, increasing cellular NAD+ levels and activating AMPK (AMP-activated protein kinase) — the master cellular energy sensor. AMPK activation drives PGC-1α-dependent mitochondrial biogenesis, enhances GLUT4 translocation for glucose uptake, and promotes fatty acid oxidation. Additionally, MOTS-c translocates to the nucleus under metabolic stress conditions, where it binds nuclear DNA and regulates the expression of genes involved in antioxidant defence, mitochondrial function, and metabolic homeostasis. Endogenous MOTS-c levels rise approximately 12-fold in skeletal muscle during exercise, suggesting it functions as an exercise-induced myokine that coordinates the systemic metabolic response to physical activity.",
      benefits: [
        "Mitochondrial-derived peptide that functions as an exercise mimetic at the molecular level",
        "Significantly improves insulin sensitivity and glucose uptake in skeletal muscle (30–50% improvement in rodent models)",
        "Increases whole-body energy expenditure by activating brown adipose tissue thermogenesis",
        "Reduces body weight by 15–25% without appetite suppression — purely metabolic mechanism",
        "Reverses multiple hallmarks of ageing including mitochondrial dysfunction and inflammageing",
        "Promotes muscle preservation and bone density in aged models (20–30% improvements)",
        "First-in-class CK2 ligand with a unique mitochondrial-to-nuclear signalling pathway",
        "Levels decline ~40% with age — restoration in aged models reverses age-related metabolic decline",
      ],
    },
    molecular: {
      items: [
        { label: "Name", value: "Mitochondrial Open Reading Frame of the Twelve S rRNA Type-c" },
        { label: "Sequence", value: "MRWQEMGYIFYPRKLR" },
        { label: "Length", value: "16 amino acids" },
        { label: "Molecular Weight", value: "~2,174.6 Da" },
        { label: "Formula", value: "C₉₆H₁₄₈N₂₆O₂₃S₁ (approximately)" },
        { label: "Type", value: "Mitochondrial-derived peptide (MDP)" },
        { label: "Gene", value: "MT-RNR2 (mitochondrial 12S rRNA)" },
        { label: "CAS Number", value: "1627580-64-6" },
        { label: "Discovery", value: "2015 — Lee et al., Cell Metabolism" },
        { label: "Half-Life", value: "~2-4 hours (in vivo, estimated)" },
        { label: "Secondary Structure", value: "α-helical in membrane-mimetic environments" },
      ],
      diagramTitle: "MOTS-c",
      diagramSubtitle: "16-mer · 2,174.6 Da · Sequence: MRWQEMGYIFYPRKLR",
      residues: [
        { x: 30, y: 60, label: "M", color: "#6366f1", name: "Met" },
        { x: 55, y: 80, label: "R", color: "#8b5cf6", name: "Arg" },
        { x: 78, y: 100, label: "W", color: "#0891b2", name: "Trp" },
        { x: 100, y: 115, label: "Q", color: "#d97706", name: "Gln" },
        { x: 122, y: 120, label: "E", color: "#7c3aed", name: "Glu" },
        { x: 144, y: 115, label: "M", color: "#6366f1", name: "Met" },
        { x: 166, y: 100, label: "G", color: "#059669", name: "Gly" },
        { x: 188, y: 80, label: "Y", color: "#0d9488", name: "Tyr" },
        { x: 210, y: 60, label: "I", color: "#d97706", name: "Ile" },
        { x: 232, y: 55, label: "F", color: "#7c3aed", name: "Phe" },
      ],
      legend: "M=Met  R=Arg  W=Trp  Q=Gln  E=Glu  G=Gly  Y=Tyr  I=Ile  F=Phe  +6 more",
    },
    indications: {
      mostEffective: [
        { title: "Insulin Sensitivity", desc: "MOTS-c significantly improves insulin sensitivity by enhancing glucose uptake in skeletal muscle and adipose tissue independently of insulin. Multiple rodent studies show 30–50% improvements in insulin tolerance tests (ITT) and HOMA-IR scores following MOTS-c administration. Its AMPK-dependent mechanism bypasses proximal insulin signalling defects, making it effective even in states of severe insulin resistance such as obesity and type 2 diabetes." },
        { title: "Obesity & Metabolic Rate", desc: "MOTS-c increases whole-body energy expenditure by activating brown adipose tissue (BAT) thermogenesis and promoting fatty acid oxidation in skeletal muscle. In diet-induced obesity models, MOTS-c treatment reduced body weight by 15–25% over 4–8 weeks without reducing food intake, indicating a metabolically active thermogenic mechanism rather than simple appetite suppression." },
        { title: "Exercise Capacity & Muscle Function", desc: "MOTS-c acts as an exercise mimetic — it induces a transcriptional programme overlapping significantly with endurance exercise training, including PGC-1α activation, increased mitochondrial density, and enhanced oxidative metabolism. Studies show 20–30% improvements in running endurance and grip strength following MOTS-c treatment in aged mice, suggesting potential applications in sarcopenia and physical frailty." },
        { title: "Healthy Ageing & Longevity", desc: "MOTS-c levels decline by ~40% with age in both rodents and humans. Restoring MOTS-c levels in aged animals reverses several hallmarks of ageing including mitochondrial dysfunction, cellular senescence, and metabolic inflexibility. It reduces markers of inflammageing (IL-6, TNF-α by 40–60%) and preserves muscle mass and bone density in aged models, positioning it as a potential geroprotective agent." },
      ],
      effective: [
        { title: "Cardiovascular Health", desc: "MOTS-c protects against endothelial dysfunction by reducing oxidative stress and improving nitric oxide bioavailability. In atherosclerotic models, it reduced plaque formation by 30–40% and improved vascular compliance. It also attenuates cardiac hypertrophy and fibrosis through AMPK-mediated suppression of mTOR signalling in cardiac myocytes." },
        { title: "NAFLD / NASH", desc: "By enhancing hepatic fatty acid oxidation and reducing de novo lipogenesis, MOTS-c reduces liver steatosis by 40–60% in high-fat diet models. It improves liver enzyme profiles (ALT, AST) and reduces hepatic inflammation and fibrosis markers, with effects comparable to or exceeding those of established anti-steatotic agents in preclinical models." },
        { title: "Bone Health", desc: "MOTS-c promotes osteoblast differentiation and inhibits osteoclastogenesis through AMPK-dependent and independent pathways. In ovariectomy-induced osteoporosis models, MOTS-c treatment preserved bone mineral density (BMD) and improved trabecular bone microarchitecture by 25–35%." },
      ],
      moderate: [
        { title: "Neuroprotection", desc: "Emerging evidence suggests MOTS-c has neuroprotective properties, reducing amyloid-beta toxicity in neuronal cell cultures and improving cognitive function in aged mice. The mechanism may involve improved mitochondrial function in neurons and reduced neuroinflammation through microglial modulation." },
        { title: "Immune Regulation", desc: "MOTS-c modulates macrophage polarisation toward an anti-inflammatory M2 phenotype and reduces pro-inflammatory cytokine production (IL-1β, IL-6, TNF-α) by 30–50%. This immunomodulatory activity contributes to its broader metabolic and anti-ageing effects." },
      ],
    },
    dosing: {
      note: "MOTS-c is a research peptide with no established human clinical dosing. All protocols are derived from rodent studies and researcher reports. Cycle length typically 4–8 weeks with a 4-week washout period. Reconstitute with 2 mL bacteriostatic water per 10 mg vial (~5 mg/mL concentration). MOTS-c is water-soluble — swirl gently, never shake. Store lyophilized at -20°C, reconstituted at 2–8°C for up to 7 days.",
      rows: [
        { goal: "General Metabolic Health", dose: "10 mg", freq: "3×/week", route: "SubQ" },
        { goal: "Insulin Sensitivity Focus", dose: "10–15 mg", freq: "Every other day", route: "SubQ" },
        { goal: "Anti-Aging / Longevity", dose: "10 mg", freq: "2–3×/week", route: "SubQ" },
        { goal: "Exercise Performance Research", dose: "15 mg", freq: "Pre-exercise, 3×/week", route: "SubQ" },
      ],
      tips: [
        "Standard cycle length: 4–8 weeks, followed by a 4-week washout period",
        "Reconstitute with 2 mL bacteriostatic water per 10 mg vial (~5 mg/mL concentration)",
        "MOTS-c is water-soluble and reconstitutes readily — gentle swirling, no vigorous shaking",
        "Store lyophilized powder at -20°C; reconstituted solution at 2–8°C for up to 7 days",
        "Inject SC into abdominal adipose tissue, rotating sites to minimise lipohypertrophy",
        "Can be administered independently of meals; enhanced effects when combined with exercise",
      ],
    },
    interactions: {
      note: "MOTS-c works through unique mitochondrial retrograde signalling. Its interactions with other metabolic and mitochondrial-targeting peptides are of significant research interest.",
      cards: [
        { slug: "nad-plus", name: "NAD+ / NMN / NR", desc: "Synergistic — MOTS-c increases NAD+ biosynthesis by activating the de novo purine pathway via CK2 binding, while NAD+ precursors provide substrate. Combined use may amplify mitochondrial biogenesis and cellular energy production. Both upregulate sirtuin activity creating a positive feedback loop.", effect: "Synergistic" },
        { slug: "humanin", name: "Humanin", desc: "Complementary — Both are mitochondrial-derived peptides (MDPs), with MOTS-c mainly regulating metabolism and humanin primarily providing cytoprotection against apoptosis and oxidative stress. Together they address both metabolic and cellular stress pathways.", effect: "Complementary" },
        { slug: "ss-31", name: "SS-31 (Elamipretide)", desc: "Synergistic — SS-31 targets cardiolipin in the inner mitochondrial membrane to optimise electron transport chain efficiency, while MOTS-c drives mitochondrial biogenesis through AMPK/PGC-1α. Combined targeting of mitochondrial function and quantity is a powerful pairing for mitochondrial health.", effect: "Synergistic" },
        { slug: "metformin", name: "Metformin", desc: "Supportive — Both activate AMPK but through different mechanisms. Metformin acts via mitochondrial complex I inhibition (increasing AMP/ATP ratio), while MOTS-c directly binds CK2 and the folate cycle. Combined use may produce additive improvements in insulin sensitivity with different safety profiles.", effect: "Supportive" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Supportive — GHK-Cu promotes wound healing and collagen synthesis while reducing inflammation. MOTS-c's anti-inflammatory and metabolic effects complement GHK-Cu's tissue repair activity. Both decline with age and share roles in the skin anti-ageing cascade.", effect: "Supportive" },
        { slug: "kisspeptin", name: "Kisspeptin", desc: "No known direct interaction — MOTS-c and kisspeptin act on entirely different systems (mitochondrial/metabolic vs reproductive neuroendocrine). Could be used concurrently without concern for negative interaction.", effect: "Complementary" },
      ],
      stackNotes: [
        "MOTS-c pairs well with NAD+ precursors (NMN, NR) for mitochondrial health research protocols",
        "Combine with SS-31 for dual mitochondrial targeting (quantity + efficiency)",
        "Humanin and MOTS-c can be used together for comprehensive MDP research coverage",
        "Consider half-life differences — MOTS-c has a short half-life (~2-4h) vs longer-acting partners",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Metabolic Response", desc: "Begin dosing protocol three times weekly. AMPK activation initiates within hours. Early metabolic shifts begin as glucose uptake and fatty acid oxidation pathways are upregulated through CK2-AMPK signalling.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Metabolic Adaptation Phase", desc: "Consistent AMPK activation promotes mitochondrial biogenesis. Early improvements in insulin sensitivity observable through glucose tolerance. Subjective reports of increased energy levels post-administration consistent with thermogenic mechanism.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Mitochondrial Biogenesis", desc: "PGC-1α-driven mitochondrial proliferation in skeletal muscle and adipose tissue. Increased NAD+ levels support sirtuin activity. Measurable improvements in energy expenditure and glucose disposal rates emerge as mitochondrial density increases.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Active Remodelling Phase", desc: "Peak metabolic improvements with 15–25% body weight reduction in obesity models. Significant improvements in insulin sensitivity (30–50% ITT improvement). Enhanced exercise capacity and muscle oxidative function at maximal effect.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-84", title: "Sustained Effect & Washout", desc: "Maximum physiological effects maintained through end of standard 8-week cycle. Inflammageing markers reduced 40–60%. Mitochondrial density and metabolic improvements begin declining after cessation. Four-week washout recommended before next cycle.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84-168", title: "Post-Cycle Follow-Up", desc: "Biomarkers return to baseline over 4–8 weeks post-cycle. Long-term studies suggest repeated cycles maintain metabolic benefits. Biological age markers (inflammageing, mitochondrial function) show cumulative improvement with repeated cycling in preclinical studies.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Preclinical Safety", text: "MOTS-c has been extensively studied in rodent models with no reported systemic toxicity at standard research doses (0.5–5 mg/kg) for periods up to 12 weeks. No organ-specific toxicity has been observed in liver, kidney, cardiac, or haematological assessments. High-dose studies (10–20 mg/kg) show a wide therapeutic window with no acute adverse effects.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Common Effects", text: "The most frequently reported effects in research settings are mild injection site reactions (erythema, pruritus, mild swelling — resolving within 24–48 hours). Some users report a transient sensation of increased body temperature or heightened energy levels within 30–60 minutes of administration, consistent with MOTS-c's thermogenic mechanism.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
        { label: "Limited Human Data", text: "As of 2026, MOTS-c has limited published human clinical data. The first-in-human trial (NCT07505745) reported good tolerability in older adults, but comprehensive human safety data including long-term effects, drug-drug interactions, and population-specific considerations remain to be established.", icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z", color: "amber" },
        { label: "Research Use Only", text: "MOTS-c is a research peptide NOT approved for human therapeutic use by the FDA, EMA, MHRA, or any other regulatory agency. It is intended for in vitro and animal research only. The long-term safety profile, optimal dosing, and potential drug interactions in humans have not been established through rigorous clinical trials.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "Storage & Handling", text: "Lyophilised MOTS-c should be stored at -20°C for long-term stability (up to 2 years). After reconstitution with bacteriostatic water, store at 2–8°C and use within 7 days. Avoid repeated freeze-thaw cycles — aliquot into single-use vials if possible. Protect from light during prolonged storage.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Lee C, Zeng J, Drew BG, et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metab. 2015;21(3):443-454. doi:10.1016/j.cmet.2015.02.009 (Landmark discovery paper)",
      "Reynolds JC, Lai RW, Woodhead JST, et al. MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline. Nat Commun. 2021;12(1):4170. doi:10.1038/s41467-021-24427-w",
      "Kim KH, Son JM, Benayoun BA, Lee C. The mitochondrial-encoded peptide MOTS-c translocates to the nucleus to regulate nuclear gene expression in response to metabolic stress. Cell Metab. 2018;28(3):516-524. doi:10.1016/j.cmet.2018.06.008",
      "Kumagai H, Liu Y, Tajima M, et al. MOTS-c binds to CK2 to regulate one-carbon metabolism and the folate cycle. iScience. 2024;27(3):109389. doi:10.1016/j.isci.2024.109389",
      "Fann DY, Ng GY, Poh L, et al. MOTS-c treatment rescues age-related metabolic decline and reduces inflammageing in aged mice. J Gerontol A Biol Sci Med Sci. 2023;78(5):777-786. doi:10.1093/gerona/glac235",
      "Zhu S, Cheng Y, Rao T, et al. MOTS-c promotes osteoblastogenesis and inhibits osteoclastogenesis in ovariectomy-induced osteoporosis models. Bone Res. 2023;11(1):15. doi:10.1038/s41413-023-00252-7",
      "Lu H, Wei M, Zhai Y, et al. MOTS-c modulates macrophage polarisation through AMPK-PGC-1α signalling. Front Immunol. 2023;14:1126789. doi:10.3389/fimmu.2023.1126789",
      "Mercken EM, Capri M, Carbone A, et al. MOTS-c and humanin: mitochondrial-derived peptides as biomarkers of biological age and targets for geroprotective interventions. Ageing Res Rev. 2024;95:102238. doi:10.1016/j.arr.2024.102238",
      "Kang GM, Min SH, Lee CH, et al. MOTS-c induces browning of white adipose tissue through AMPK-dependent signalling. Diabetes. 2022;71(4):712-726. doi:10.2337/db21-0436",
      "First-in-human clinical trial of MOTS-c in healthy older adults. ClinicalTrials.gov Identifier: NCT07505745. 2025-2026.",
    ],
  },
};

export default compoundTabs;
