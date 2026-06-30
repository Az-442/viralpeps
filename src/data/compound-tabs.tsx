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
};

export default compoundTabs;
