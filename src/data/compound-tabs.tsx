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

// ── Base slug resolution ──
// Given a product variant slug (e.g. "bpc-157-5mg-imperial"), returns the base
// compound slug (e.g. "bpc-157") by stripping known variant suffixes.
const BASE_SLUGS = new Set([
  "5-amino-1mq","ace-031","acth-1-39","adamax","adipotide","ahk-cu","aicar","aod-9604",
  "ara-290","b7-33","bpc-157","bronchogen","cartalax","cerebrolysin","chonliten",
  "cjc-1295","cjc-1295-ipamorelin-blend","cjc-1295-with-dac","cortagen","dermorphin",
  "dihexa","dsip","epitalon","fgl","follistatin","foxo4-dr1","fragment-176-191",
  "gdf-8","ghk-cu","ghrh-analog-amide","ghrp-2","ghrp-6","glow","hexarelin","ipamorelin","kisspeptin","kpv","mots-c","nad","pt-141",
  "retatrutide","selank","semaglutide","semax","sermorelin","ss-31","tb-500","tesamorelin","thymalin","thymosin-alpha-1","tirzepatide","vip",
]);

export function getBaseCompoundSlug(slug: string): string {
  if (!slug) return slug;
  if (BASE_SLUGS.has(slug)) return slug;
  const sorted = [...BASE_SLUGS].sort((a, b) => b.length - a.length);
  for (const base of sorted) {
    if (slug.startsWith(base + "-")) return base;
  }
  return slug;
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

  "tesamorelin": {
    overview: {
      whatIs: "Tesamorelin is a synthetic 44-amino-acid analog of human growth hormone-releasing hormone (GHRH), developed by the Canadian biopharmaceutical company Theratechnologies. Marketed under the brand name Egrifta (subsequently Egrifta SV and Egrifta WR), it received FDA approval in November 2010 for the reduction of excess abdominal fat (visceral adipose tissue) in HIV-infected adults with lipodystrophy — a condition marked by pathological central fat accumulation and metabolic dysregulation. The peptide incorporates a trans-3-hexenoic acid moiety at its N-terminus, a structural modification that confers resistance to dipeptidyl peptidase IV (DPP-IV) enzymatic cleavage, substantially extending its bioavailability compared to native GHRH while preserving its full-length receptor-binding interface. Tesamorelin remains the only GHRH analog with current FDA approval and is distinguished by the most rigorous clinical evidence base of any peptide in the GH secretagogue class, supported by multiple Phase 3 randomised controlled trials and long-term extension safety data.",
      mechanism: "Tesamorelin acts as a selective, high-affinity agonist at the GHRH receptor — a G-protein-coupled receptor (GPCR) expressed on pituitary somatotroph cells. Upon binding, the receptor undergoes a conformational change that activates the stimulatory G-protein (Gs), triggering adenylyl cyclase to convert ATP into cyclic AMP (cAMP). The subsequent rise in intracellular cAMP activates protein kinase A (PKA), which phosphorylates the transcription factor CREB (cAMP response element-binding protein). Phosphorylated CREB binds to cAMP response elements in the GH gene promoter, driving GH gene transcription and the pulsatile release of pre-formed growth hormone from secretory granules. Unlike exogenous recombinant human GH, which suppresses the hypothalamic-pituitary axis via negative feedback, tesamorelin preserves the physiological pulsatility of GH secretion by acting upstream at the hypothalamic-pituitary level. This pulsatile pattern is critical for maintaining the normal metabolic actions of GH while minimising the side effects associated with continuous supraphysiological GH exposure, such as insulin resistance and fluid retention. The trans-3-hexenoic acid N-terminal modification protects against rapid DPP-IV degradation, extending the peptide's plasma residence time from under 10 minutes (native GHRH) to approximately 26 minutes.",
      benefits: [
        "Selective visceral adipose tissue (VAT) reduction — Phase 3 trials demonstrate ~15-18% relative reduction in visceral fat area over 26-52 weeks, with preservation of subcutaneous fat, a clinically unique body composition profile",
        "Lean body mass preservation and increase — tesamorelin consistently increases lean mass while reducing trunk fat, reversing the unfavourable fat-to-lean ratio characteristic of HIV lipodystrophy",
        "Hepatic fat reduction — randomised controlled trials show up to 37% relative reduction in hepatic fat fraction, with 35% of treated patients resolving fatty liver; reduced fibrosis progression versus placebo (10% vs 37%)",
        "Improved lipid profile — significant reductions in total cholesterol, LDL cholesterol, and triglycerides observed in pooled Phase 3 analyses, with improved HDL-C in some studies",
        "IGF-1 restoration to physiological levels — tesamorelin raises IGF-1 from low or low-normal baseline into the mid-normal range, supporting anabolic signalling in bone, muscle, and connective tissue without overshooting into supraphysiological territory",
        "Favourable glycaemic safety — unlike recombinant GH, tesamorelin does not cause clinically meaningful deterioration in glucose homeostasis in non-diabetic populations, with neutral effects on HbA1c and fasting glucose in most trials",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "5,135.9 Da" },
        { label: "Sequence", value: "(T3h)-YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH₂" },
        { label: "Length", value: "44 amino acids (full-length GHRH 1-44)" },
        { label: "Type", value: "GHRH analog | Full-length | DPP-IV-protected" },
        { label: "Half-Life", value: "~26 minutes (SC)" },
        { label: "CAS Number", value: "218949-48-5" },
        { label: "Molecular Formula", value: "C₂₂₁H₃₆₆N₇₂O₆₇S" },
        { label: "Form", value: "Lyophilized powder (as acetate salt)" },
      ],
      diagramTitle: "Tesamorelin",
      diagramSubtitle: "44-mer · 5,135.9 Da · Full-length GHRH(1-44) + N-terminal T3h modification",
      residues: [
        { x: 30, y: 60, label: "Y", color: "#6366f1", name: "Tyr" },
        { x: 55, y: 80, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 78, y: 100, label: "D", color: "#0891b2", name: "Asp" },
        { x: 100, y: 115, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 122, y: 120, label: "I", color: "#d97706", name: "Ile" },
        { x: 144, y: 115, label: "F", color: "#7c3aed", name: "Phe" },
        { x: 166, y: 100, label: "T", color: "#059669", name: "Thr" },
        { x: 188, y: 80, label: "N", color: "#0d9488", name: "Asn" },
        { x: 210, y: 60, label: "S", color: "#6366f1", name: "Ser" },
        { x: 232, y: 55, label: "Y", color: "#d97706", name: "Tyr" },
      ],
      legend: "Y=Tyr  A=Ala  D=Asp  I=Ile  F=Phe  T=Thr  N=Asn  S=Ser  +34 more residues · N-terminus: trans-3-hexenoic acid (T3h)",
    },
    indications: {
      mostEffective: [
        { title: "GH Stimulation", desc: "Tesamorelin is the most rigorously clinically validated GHRH analog for stimulating endogenous pulsatile GH release. Through GHRH receptor agonism on pituitary somatotrophs, it restores physiological GH pulse amplitude and frequency, raising IGF-1 levels into the normal range. Phase 3 data confirm consistent, dose-dependent GH release with each 2 mg SC injection, peaking at 30-60 minutes post-dose and returning to baseline within 2-3 hours without eliminating the natural nocturnal GH surge." },
        { title: "Visceral Fat Reduction", desc: "Tesamorelin is uniquely effective at selectively reducing visceral adipose tissue (VAT) — the metabolically harmful deep abdominal fat associated with insulin resistance, cardiovascular risk, and systemic inflammation. Pooled Phase 3 analysis (n=816) demonstrated a mean VAT reduction of 15-18% over 26-52 weeks with preservation of subcutaneous fat, a body composition profile no other pharmacological agent achieves. The reduction is maintained with continued therapy and is associated with improved body image and waist circumference." },
        { title: "Muscle Preservation", desc: "Tesamorelin increases lean body mass while reducing trunk fat, producing a favourable shift in the fat-to-lean mass ratio. In long-term extension studies (up to 104 weeks), lean mass gains were sustained without tachyphylaxis. The effect is mediated through GH/IGF-1-driven nitrogen retention, protein synthesis upregulation, and anti-catabolic signalling — making tesamorelin of particular interest for sarcopenia and age-related muscle loss research." },
      ],
      effective: [
        { title: "Anti-Aging & Body Composition", desc: "By restoring GH/IGF-1 levels that decline ~14% per decade after age 30, tesamorelin addresses the somatopause — the age-related decline in GH secretion. Open-label and extension studies show sustained improvements in body composition (reduced fat mass, increased lean mass) over 2+ years of continuous therapy. The physiological pulsatile GH profile avoids the supraphysiological IGF-1 spikes associated with exogenous GH, making it a safer candidate for long-term age management protocols." },
        { title: "Bone Density", desc: "GH and IGF-1 are critical regulators of bone remodelling, stimulating osteoblast activity and bone matrix synthesis. Tesamorelin-mediated IGF-1 restoration supports bone mineral density maintenance, particularly relevant for HIV populations where osteopenia and osteoporosis are prevalent. Studies show improvements in bone turnover markers, though dedicated bone density endpoints in non-HIV populations remain an active area of investigation." },
        { title: "Skin Health & Connective Tissue", desc: "GH/IGF-1 signalling promotes dermal collagen synthesis, skin thickness, and wound healing. Tesamorelin's restoration of physiological IGF-1 levels supports extracellular matrix maintenance, with potential applications in connective tissue health, skin elasticity, and recovery from soft tissue injury. The effect is mediated through fibroblast proliferation and increased collagen I and III production." },
      ],
      moderate: [
        { title: "Cognitive Function", desc: "A landmark randomised controlled trial by Baker et al. (JAMA Neurology, 2012) in 152 older adults with mild cognitive impairment demonstrated that daily tesamorelin for 20 weeks improved executive function and working memory compared to placebo. Subsequent imaging studies showed increased cerebral glucose metabolism in treated subjects. The mechanism is thought to involve GH/IGF-1 receptor activation in the hippocampus and prefrontal cortex, promoting synaptic plasticity and neurogenesis." },
        { title: "Lipid Profile", desc: "Phase 3 trials report modest but statistically significant improvements in lipid parameters including total cholesterol (-10 to -15 mg/dL), LDL cholesterol (-8 to -12 mg/dL), and triglycerides (-20 to -30 mg/dL) with tesamorelin therapy. HDL cholesterol changes have been inconsistent across studies. The lipid improvements appear independent of and additive to concomitant statin therapy." },
      ],
    },
    dosing: {
      note: "Tesamorelin is an FDA-approved prescription medication (Egrifta / Egrifta SV / Egrifta WR) with a standardised dosing regimen derived from rigorous Phase 3 clinical trials. The approved dose is 2 mg once daily by subcutaneous injection. Reconstitute each 2 mg vial with 0.6 mL or 1 mL sterile water for injection (depending on formulation) to yield 2 mg/0.6 mL or 2 mg/mL respectively. Swirl gently — do not shake. Administer immediately after reconstitution into the abdomen (rotating injection sites), avoiding the navel. Do not use if solution is cloudy or contains particulate matter. For research protocols, doses of 1-2 mg SC daily have been explored, with 2 mg demonstrating optimal efficacy in pivotal trials.",
      rows: [
        { goal: "FDA-Approved (HIV Lipodystrophy)", dose: "2 mg", freq: "Once daily at bedtime", route: "SubQ" },
        { goal: "VAT Reduction Research", dose: "2 mg", freq: "Once daily", route: "SubQ" },
        { goal: "Body Composition Protocol", dose: "2 mg", freq: "Once daily", route: "SubQ" },
        { goal: "Anti-Aging / Somatopause", dose: "1-2 mg", freq: "Once daily", route: "SubQ" },
        { goal: "NAFLD / Liver Fat Research", dose: "2 mg", freq: "Once daily", route: "SubQ" },
      ],
      tips: [
        "FDA-approved dose: 2 mg once daily SC — do not exceed this dose without clinical justification",
        "Reconstitute with sterile water for injection (SWFI) — 0.6 mL for Egrifta SV, 1 mL for Egrifta WR",
        "Swirl gently to reconstitute — never shake, as foaming can denature the peptide and reduce potency",
        "Administer immediately after reconstitution — do not store reconstituted solution",
        "Inject into the abdomen (rotating quadrants), avoiding the 2-inch area around the navel",
        "Best taken at bedtime to align with the body's natural nocturnal GH pulse window",
        "Rotate injection sites daily to minimise lipohypertrophy and injection site reactions",
        "Use within 24 hours of reconstitution if stored at 2-8°C, or discard after 3 hours at room temperature",
        "Monitor IGF-1 levels periodically — target mid-normal range for age and sex",
      ],
    },
    interactions: {
      note: "Tesamorelin interacts with the GH axis and other secretagogues through well-understood physiological pathways. Its unique full-length GHRH(1-44) structure and FDA-approved status distinguish it from research-grade peptide analogues.",
      cards: [
        { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)", desc: "Synergistic — Both are GHRH receptor agonists. Tesamorelin provides the full-length GHRH(1-44) sequence while CJC-1295 (no DAC) is a truncated GRF(1-29) analogue. When combined, they amplify GHRH receptor activation through parallel signalling. However, stacking two GHRH agonists is redundant in most protocols — single-agent tesamorelin already saturates GHRH receptor activation at clinical doses.", effect: "Synergistic" },
        { slug: "ipamorelin", name: "Ipamorelin", desc: "Synergistic — Tesamorelin (GHRH agonist) and ipamorelin (GHSR-1a agonist) stimulate GH release through two distinct and complementary pituitary pathways. GHRH + GHRP stacking produces a synergistic GH pulse 2-3× greater than either agent alone. This is the most extensively studied dual-pathway GH secretagogue combination, with well-characterised safety and efficacy in research models.", effect: "Synergistic" },
        { slug: "ghrp-2", name: "GHRP-2", desc: "Complementary — GHRP-2 acts at the ghrelin receptor (GHSR-1a) to amplify GH pulse amplitude through a different mechanism than tesamorelin's GHRH receptor pathway. When combined, GHRP-2 potentiates tesamorelin's action, producing a supra-additive GH release that can be useful for research protocols requiring maximal endogenous GH stimulation.", effect: "Complementary" },
        { slug: "ghrp-6", name: "GHRP-6", desc: "Complementary — Like GHRP-2, GHRP-6 acts through GHSR-1a to complement tesamorelin's GHRH pathway. However, GHRP-6 induces significant appetite stimulation and prolactin/cortisol elevation that tesamorelin alone does not, making this combination less clean for most research applications compared to ipamorelin-based stacks.", effect: "Complementary" },
        { slug: "sermorelin", name: "Sermorelin", desc: "Supportive — Sermorelin (GRF 1-29) is a shorter GHRH analogue. Tesamorelin is the full-length (1-44) analogue with superior stability due to the DPP-IV-resistant N-terminal modification. Using both simultaneously is redundant, but sermorelin can be considered as a lower-cost alternative for protocols where tesamorelin's extended stability is not required.", effect: "Supportive" },
        { slug: "mod-grf-1-29", name: "Mod GRF (1-29)", desc: "Complementary — Mod GRF(1-29) is a tetrasubstituted GHRH(1-29) analogue with DPP-IV resistance similar to tesamorelin but a truncated sequence. Both target the GHRH receptor, making combination redundant. However, Mod GRF(1-29) is frequently used as the GHRH component in dual-pathway GHRH+GHRP stacks as a more economical alternative to tesamorelin.", effect: "Complementary" },
      ],
      stackNotes: [
        "Tesamorelin + ipamorelin is the gold-standard dual-pathway stack for maximal endogenous GH stimulation research",
        "Combining two GHRH agonists (tesamorelin + CJC-1295 or + Mod GRF) is redundant and not recommended for research protocols",
        "Always introduce one compound at a time — tesamorelin has a 26-minute half-life, shorter than most GHRP partners",
        "IGF-1 monitoring is essential when stacking tesamorelin with other GH secretagogues to avoid supraphysiological levels",
        "Tesamorelin's FDA-approved status means its dosing, safety, and drug interaction profile are better characterised than any research-grade GHRH analogue",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "Bedtime SC dosing of 2 mg begins. First GH pulse detected 30-60 minutes post-injection. IGF-1 levels begin rising from baseline within 48-72 hours. No significant changes in body composition yet — GH must first stimulate hepatic IGF-1 production before downstream anabolic effects manifest.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-28", title: "IGF-1 Restoration Phase", desc: "IGF-1 levels reach steady state at the mid-normal physiological range. Early metabolic changes include increased fatty acid oxidation in adipose tissue via GH-mediated lipolysis. Nocturnal GH pulsatility amplified by approximately 3-fold. Subjects may report improved sleep quality and increased morning energy.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 28-56", title: "Early Body Composition Response", desc: "Visceral adipose tissue begins measurable reduction — CT-based VAT area decreases by 5-10% in the most responsive subjects. Lean mass starts increasing as GH/IGF-1 stimulates protein synthesis. Waist circumference begins trending downward. Hepatic fat fraction (MRI-PDFF) starts decreasing in subjects with NAFLD.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-182", title: "Maximal Effect Phase (26 Weeks)", desc: "Peak therapeutic effect observed during this period — consistent with Phase 3 trial endpoints. Mean VAT reduction reaches 15-18% from baseline. Trunk fat significantly decreased with subcutaneous fat preserved. Lean mass increased by 1-2 kg. Hepatic fat fraction reduced by up to 37%. Lipid profile improvements (LDL, triglycerides) maximal at week 26.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 182-365", title: "Maintenance & Extension Phase", desc: "VAT reduction maintained with continued daily therapy — no tachyphylaxis observed over 52 weeks. Extension studies (up to 104 weeks) confirm sustained body composition improvements. Anti-tesamorelin antibodies develop in ~49% of patients but do not appear to attenuate efficacy. IGF-1 levels remain stable in the normal range without dose escalation.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 365+", title: "Long-Term Management", desc: "Chronic therapy maintains improved body composition without the adverse metabolic profile of supraphysiological GH. Bone density improvements become measurable with extended use. No new safety signals emerge in 2-year open-label data. Decision to continue therapy balanced against IGF-1 monitoring and malignancy surveillance per FDA label guidelines.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "FDA-Approved & Clinically Validated", text: "Tesamorelin (Egrifta) is FDA-approved — the most rigorous regulatory standard. Its safety profile is established through multiple Phase 3 RCTs (n>800) plus open-label extension data exceeding 2 years. Unlike research-grade peptides, tesamorelin's risks, adverse events, and drug interactions are well-characterised. The FDA label reflects 15+ years of post-marketing surveillance.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Injection Site Reactions", text: "The most common adverse event — reported in 25% of tesamorelin-treated patients (vs 14% placebo) during Phase 3 trials. Reactions include erythema, pruritus, pain, irritation, bruising, and swelling at the injection site. Most are mild to moderate and resolve spontaneously. Proper injection site rotation minimises severity. Lipohypertrophy can develop with repeated injections into the same site.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
        { label: "Pituitary & HPA Axis Warnings", text: "CONTRAINDICATED in patients with: active malignancy (IGF-1 may promote tumour growth); disruption of the hypothalamic-pituitary axis (hypophysectomy, hypopituitarism, pituitary tumour surgery); acute critical illness (post-open heart surgery, abdominal surgery, multiple trauma, acute respiratory failure). Must be discontinued at least 4 weeks before elective surgery with general anaesthesia.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "Malignancy Contraindication", text: "Tesamorelin is CONTRAINDICATED in patients with active malignancy. GH and IGF-1 have mitogenic and anti-apoptotic properties that can theoretically promote neoplastic growth. Patients with a history of cancer or active malignancy should not use tesamorelin. Baseline and periodic malignancy screening is recommended for all patients, including colonoscopy, dermatological exam, and age-appropriate cancer screening.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Glucose & Fluid Retention", text: "Tesamorelin can cause glucose intolerance and new-onset diabetes — monitor HbA1c and fasting glucose at baseline and periodically. GH has anti-insulin effects; tesamorelin raises IGF-1 which can decrease insulin sensitivity. Peripheral oedema (4-6% incidence, mostly mild) and arthralgia (10-12%) are reported and typically resolve with continued therapy or dose adjustment. Carpal tunnel syndrome occurs in <3% of patients.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Hypersensitivity & Antibody Formation", text: "Anti-tesamorelin antibodies develop in approximately 49% of treated patients by week 26, but neutralising antibodies are rare and efficacy is not significantly attenuated. Hypersensitivity reactions including angioedema, urticaria, and anaphylaxis have been reported post-marketing. Discontinue immediately if signs of a serious allergic reaction occur. Do not rechallenge after angioedema or anaphylaxis.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
      ],
    },
    references: [
      "Falutz J, Allas S, Blot K, et al. Metabolic effects of a growth hormone-releasing factor in patients with HIV. N Engl J Med. 2007;357(23):2359-2370. doi:10.1056/NEJMoa072375 (Pivotal Phase 3 — NEJM)",
      "Falutz J, Potvin D, Mamputu JC, et al. Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in HIV-infected patients with abdominal fat accumulation: a randomized placebo-controlled trial with open-label extension. J Clin Endocrinol Metab. 2010;95(9):4291-4304. doi:10.1210/jc.2010-0387 (Pooled Phase 3 analysis — JCEM)",
      "Stanley TL, Feldpausch MN, Oh J, et al. Effect of tesamorelin on visceral fat and liver fat in HIV-infected patients with abdominal fat accumulation: a randomized clinical trial. JAMA. 2014;312(4):380-389. doi:10.1001/jama.2014.8334 (NASH/NAFLD landmark — JAMA)",
      "Baker LD, Barsness SM, Borson S, et al. Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults: results of a controlled trial. JAMA Neurol. 2012;69(8):1013-1020. doi:10.1001/archneurol.2012.888 (Cognitive function — JAMA Neurology)",
      "Lake JE, Currier JS, Wohl DA, et al. Efficacy and safety of tesamorelin in people with HIV on integrase strand transfer inhibitors: a randomised double-blind placebo-controlled trial. AIDS. 2024;38(10):1517-1526. doi:10.1097/QAD.0000000000003931 (INSTI population — AIDS)",
      "Badran AS, Helal MM, et al. Body composition, hepatic fat, metabolic, and safety outcomes of tesamorelin, a GHRH analogue, in HIV-associated lipodystrophy: a meta-analysis of randomized controlled trials. Obes Res Clin Pract. 2026;20(1). doi:10.1016/j.orcp.2026.01.002 (2026 meta-analysis — ORCP)",
      "Fourlanos S, Elston MS, McDiarmid NT, et al. Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy. Drugs Future. 2006;31(1):1-8. (Early development review)",
      "Stanley TL, Grinspoon SK, et al. Effects of growth hormone-releasing hormone on visceral fat, metabolic, and cardiovascular indices. Hepatology. 2015;61(2):514-521. (Liver fat & NAFLD outcomes — Hepatology)",
      "Koutkia P, Canavan B, Breu J, Grinspoon S. Growth hormone-releasing hormone in HIV-associated lipodystrophy. Clin Infect Dis. 2013;56(9):1312-1320. (HIV metabolic complications — CID)",
      "Mamputu JC, Falutz J, et al. Safety of tesamorelin: pooled analysis of Phase 3 clinical trials and open-label extension data. Ther Adv Endocrinol Metab. 2021;12:20420188211030360. (Comprehensive safety analysis)",
    ],
  },
  "selank": {
    overview: {
      whatIs: "Selank is a synthetic heptapeptide nootropic and anxiolytic agent derived from the endogenous immunomodulatory peptide tuftsin (Thr-Lys-Pro-Arg). Developed at the Institute of Molecular Genetics of the Russian Academy of Sciences, Selank was engineered by adding a Pro-Gly-Pro stabilising C-terminal extension to the tuftsin core sequence, resulting in the full heptapeptide Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP). Unlike classical benzodiazepine anxiolytics, Selank achieves its calming and cognitive-enhancing effects without sedation, muscle relaxation, or dependence liability. It is approved as a prescription anxiolytic in Russia and has been the subject of over 68 indexed PubMed studies spanning molecular pharmacology, clinical efficacy, gene expression profiling, and safety assessment.",
      mechanism: "Selank operates through a multi-pathway mechanism that distinguishes it from conventional anxiolytics. It acts as a positive allosteric modulator of GABA-A receptors, enhancing GABAergic neurotransmission without directly binding to the benzodiazepine site — this explains its anxiolytic effects without sedation or tolerance development. Selank upregulates brain-derived neurotrophic factor (BDNF) expression in the hippocampus and prefrontal cortex, supporting neuroplasticity and cognitive function. It modulates serotonin (5-HT) metabolism and stabilises enkephalin levels through inhibition of enkephalin-degrading enzymes. Additionally, Selank modulates immune function by downregulating pro-inflammatory cytokines including IL-6 and TNF-α, as demonstrated by RNA-Seq transcriptomic profiling.",
      benefits: [
        "Anxiolytic without sedation, cognitive impairment, or dependence — GABA-A positive allosteric modulation without benzodiazepine-site binding",
        "Cognitive enhancement through BDNF upregulation in the hippocampus and prefrontal cortex",
        "Neuroprotection against ethanol-induced memory impairment and stress-induced hippocampal damage",
        "Mood stabilisation through serotonin metabolism modulation and enkephalin catabolism inhibition",
        "Immune system modulation via regulation of IL-6, TNF-α, and other cytokine pathways",
        "No withdrawal syndrome, no tolerance development, excellent tolerability in long-term use",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "751.9 Da" },
        { label: "Sequence", value: "Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP)" },
        { label: "Length", value: "7 amino acids (heptapeptide)" },
        { label: "Type", value: "Synthetic regulatory peptide | Tuftsin analogue" },
        { label: "Half-Life", value: "~2–3 hours (intranasal); ~20–30 min (plasma)" },
        { label: "CAS Number", value: "129954-34-3" },
        { label: "Formula", value: "C₃₃H₅₇N₁₁O₉" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Selank",
      diagramSubtitle: "7-mer · 751.9 Da · Tuftsin analogue · TKPRPGP",
      residues: [
        { x: 40, y: 100, label: "T", color: "#0891b2", name: "Thr" },
        { x: 85, y: 100, label: "K", color: "#d97706", name: "Lys" },
        { x: 130, y: 100, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 175, y: 100, label: "R", color: "#6366f1", name: "Arg" },
        { x: 220, y: 100, label: "P", color: "#8b5cf6", name: "Pro" },
        { x: 265, y: 100, label: "G", color: "#059669", name: "Gly" },
        { x: 310, y: 100, label: "P", color: "#8b5cf6", name: "Pro" },
      ],
      legend: "T=Thr  K=Lys  P=Pro  R=Arg  G=Gly",
    },
    indications: {
      mostEffective: [
        { title: "Anxiety Reduction", desc: "Clinically significant anxiolytic effects comparable to low-dose benzodiazepines in clinical trials, but without sedation, cognitive impairment, or dependence. Effective in GAD and stress-induced anxiety through GABA-A receptor positive allosteric modulation." },
        { title: "Cognitive Enhancement", desc: "BDNF upregulation in hippocampal and prefrontal regions supports learning, memory consolidation, and attention. Clinical studies show improved cognitive function scores, particularly in attention and short-term memory." },
        { title: "Neuroprotection", desc: "Protects against ethanol-induced memory impairment via BDNF regulation. Reduces stress-induced hippocampal damage and demonstrates protective effects in models of morphine withdrawal and chronic stress." },
      ],
      effective: [
        { title: "Mood Regulation", desc: "Modulates serotonin metabolism and enkephalin degradation pathways, supporting emotional stability and stress resilience. Clinical data show improvement in emotional reactivity and mood scores in anxiety disorder patients." },
        { title: "Immune Modulation", desc: "As a tuftsin analogue, Selank regulates pro-inflammatory cytokine expression including IL-6 and TNF-α. Demonstrates immunomodulatory effects in stress-induced immune dysfunction models." },
        { title: "Fatigue Reduction", desc: "By normalizing stress-induced neurotransmitter imbalances and reducing inflammatory cytokine load, may contribute to improved energy levels and reduced mental fatigue in chronic stress conditions." },
      ],
      moderate: [
        { title: "Sleep Quality", desc: "While not a hypnotic agent, anxiolytic effects may improve sleep quality indirectly by reducing pre-sleep anxiety. No daytime sedation — a key advantage over benzodiazepine-class anxiolytics." },
        { title: "Stress Adaptation", desc: "RNA-Seq studies show Selank alters hippocampal transcriptome responses to acute restraint stress, modulating pathways involved in stress adaptation and resilience." },
      ],
    },
    dosing: {
      note: "SubQ injection is the primary research route. Intranasal administration is also studied for direct CNS delivery. Standard cycles: 2–4 weeks followed by 1–2 week washout. Selank is well-tolerated across the dosing range with no known dose-limiting toxicity.",
      rows: [
        { goal: "General Anxiolytic", dose: "450–500 mcg", freq: "1x daily", route: "SubQ" },
        { goal: "Cognitive Enhancement", dose: "500–750 mcg", freq: "1x daily", route: "SubQ" },
        { goal: "Moderate Anxiety", dose: "500–750 mcg", freq: "2x daily", route: "SubQ" },
        { goal: "Severe Anxiety / Stress", dose: "750–900 mcg", freq: "2x daily", route: "SubQ" },
        { goal: "Intranasal Protocol", dose: "300–600 mcg", freq: "1–2x daily", route: "Intranasal" },
      ],
      tips: [
        "Start at the lower end of the dosing range (450 mcg) and titrate up based on response",
        "Best administered on an empty stomach (30 min before or 2 hours after meals)",
        "Rotate injection sites to prevent tissue irritation",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store reconstituted peptide at 2–8°C; use within 28 days",
        "Selank is non-sedating at all standard doses",
      ],
    },
    interactions: {
      note: "Selank's multi-target mechanism (GABAergic, serotonergic, enkephalinergic, and cytokine modulation) makes it a versatile stacking partner. It has been studied in combination with other nootropic and anxiolytic compounds.",
      cards: [
        { slug: "semax", name: "Semax", desc: "Synergistic — Semax (ACTH 4-10 analogue) and Selank are the most researched peptide pair for cognitive and mood research. Semax activates BDNF and NGF pathways through Trk receptor signalling, while Selank provides GABAergic anxiolysis and enkephalin stabilisation.", effect: "Synergistic" },
        { slug: "noopept", name: "Noopept", desc: "Supportive — Both target cognitive enhancement through complementary mechanisms — Selank via GABAergic anxiolysis and BDNF, Noopept via glutamate receptor modulation and neuroprotection.", effect: "Supportive" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Supportive — GHK-Cu's copper-dependent tissue repair and anti-inflammatory effects complement Selank's CNS-focused modulation. Both share tuftsin-derived ancestry for complementary immune and tissue health research.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157's GI protective and systemic healing effects may support stress-related tissue health protocols where Selank's anxiolytic and GABAergic effects are the primary focus.", effect: "Supportive" },
        { slug: "melanotan-ii", name: "Melanotan II", desc: "No known direct interaction — Selank and Melanotan II act on entirely different systems (CNS anxyolitic vs melanocortin). Could be used concurrently without concern for negative interaction.", effect: "Complementary" },
      ],
      stackNotes: [
        "Semax and Selank are the most studied peptide combination for cognitive and anxiolytic research",
        "Always introduce one compound at a time in research protocols to isolate effects",
        "Selank may have a benzodiazepine dose-sparing effect when co-administered",
        "No adverse drug interactions reported in clinical studies with standard co-administration",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1–3", title: "Initial Administration", desc: "Begin daily SubQ dosing at 450–500 mcg. First subtle reduction in anxiety and stress reactivity within hours. GABA-A receptor modulation initiated. No sedation or cognitive dulling.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 3–7", title: "Early Response", desc: "Consistent anxiolytic effect established. BDNF expression begins to upregulate in hippocampal regions. Improved emotional stability and reduced situational anxiety.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 7–14", title: "Gene Expression Remodelling", desc: "RNA-Seq confirms altered hippocampal gene expression. GABAergic and neurotrophin pathways show sustained upregulation. Cognitive improvements in attention and memory become noticeable.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14–21", title: "Stabilisation Phase", desc: "Peak anxiolytic effects achieved. Enkephalin catabolism inhibition stabilised. Cytokine modulation reaches steady state. Stress resilience significantly improved.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 21–28", title: "Maintenance & Assessment", desc: "Full effects established. Comprehensive assessment of anxiety scales and cognitive function. Cycle completion approaching — prepare for washout period.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 28–42", title: "Washout Period", desc: "Discontinue dosing. No withdrawal symptoms expected — studies confirm no dependence, no rebound anxiety, no tolerance. Effects gradually return to baseline over 7–14 days.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "Selank is approved as a prescription anxiolytic in Russia but is not approved by the MHRA, FDA, or EMA for human use outside Russia.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Exceptional Tolerability", text: "Very well-tolerated across all studied doses. Only mild, transient drowsiness reported in a small subset. No sedation at therapeutic doses, no cognitive impairment, no muscle relaxation.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
        { label: "No Withdrawal or Tolerance", text: "Unlike benzodiazepines, Selank produces no withdrawal syndrome upon discontinuation. No tolerance develops — the same dose remains effective throughout multi-week cycles, attributed to allosteric GABA-A modulation.", icon: "M5 13l4 4L19 7", color: "emerald" },
        { label: "Contraindications", text: "Caution for hypersensitivity to peptide compounds. Limited data in pregnancy and lactation. Theoretical considerations for autoimmune conditions should be evaluated in protocol design.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at 2–8°C or room temperature, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2–8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Filippenkov IB, Glazova NY, Severtseva EA, et al. Selank Peptide Causes Changes in Gene Expression in the Hippocampus of Rats. Nanobiotechnology Reports. 2024. DOI: 10.1134/S2635167624601335",
      "Konstantinopolsky MA, Cherniakova IV, Kolik LG. Selank Attenuates Aversive Signs of Morphine Withdrawal in Rats. Bull Exp Biol Med. 2022;173(6):730-733. PMID: 36322304",
      "Doyno CR, White CM. Focus on Flunitrazepam, GHB, Phenibut, and Selank. J Clin Pharmacol. 2021;61(Suppl 2):S114-S128. PMID: 34396551",
      "Filatova E, Kasian A, et al. Selank Affects GABAergic Gene Expression in IMR-32 Cells. Front Pharmacol. 2017;8:89. PMID: 28293190",
      "Kolik LG, et al. Selank Protects Against Ethanol-Induced Memory Impairment via BDNF. Bull Exp Biol Med. 2019;167(5):641-644. PMID: 31625062",
      "Vyunova TV, Andreeva L, Myasoedov NF. Peptide-based Anxiolytics: Selank Biological Activity. Protein Pept Lett. 2018;25(10):914-923. PMID: 30255741",
      "Kasian A, et al. Selank Enhances Diazepam Effect in Chronic Mild Stress. Behav Neurol. 2017;2017:5091027. PMID: 28280289",
      "Volkova A, et al. Selank Affects GABAergic Gene Expression. Front Pharmacol. 2016;7:31. DOI: 10.3389/fphar.2016.00031",
      "Medvedev VE, et al. Treatment of anxiety disorders with Selank. Zh Nevrol Psikhiatr. 2015;115(6):33-40. PMID: 26387895",
      "Siewert A, et al. Tuftsin — Properties and Analogs. Curr Med Chem. 2017;24(34):3711-3727. PMID: 28745220",
    ],
  },

  "pt-141": {
    overview: {
      whatIs: "PT-141 (Bremelanotide) is a synthetic cyclic heptapeptide melanocortin receptor agonist developed by Palatin Technologies. It was discovered as a metabolite of Melanotan II during clinical trials for tanning when subjects unexpectedly reported enhanced sexual function. This serendipitous finding led to its development as the first centrally-acting, on-demand treatment for hypoactive sexual desire disorder (HSDD). In June 2019, the FDA approved PT-141 under the brand name Vyleesi for the treatment of acquired, generalized HSDD in premenopausal women, making it the first melanocortin receptor agonist to receive FDA approval for a sexual health indication. Unlike peripherally-acting agents, PT-141 works within the central nervous system to modulate sexual desire and arousal through melanocortin receptor activation.",
      mechanism: "PT-141 is a potent agonist at melanocortin receptors MC1R, MC3R, and MC4R, with highest affinity for MC4R. Its primary mechanism involves activation of MC4R in the paraventricular nucleus of the hypothalamus and other CNS regions that regulate sexual behaviour. MC4R activation triggers downstream signalling through the cAMP/PKA pathway and modulates dopaminergic neurotransmission in the mesolimbic reward pathway, which is critical for sexual desire and motivation. PT-141 also stimulates oxytocinergic signalling in the paraventricular nucleus, enhancing the release of oxytocin — a neuropeptide involved in sexual arousal and bonding. Unlike PDE5 inhibitors (sildenafil, tadalafil) that act through peripheral vasodilation, PT-141's effects are centrally mediated and require sexual stimulation to be effective, working through the brain's natural sexual response circuitry rather than forcing a mechanical response.",
      benefits: [
        "FDA-approved for HSDD — the most clinically validated melanocortin peptide with rigorous Phase 3 trial data supporting safety and efficacy",
        "Rapid on-demand onset — administered 45 minutes before sexual activity, providing flexible as-needed dosing that does not require daily administration",
        "Centrally acting mechanism — works through the brain's natural sexual response circuitry rather than peripheral vasodilation, supporting both desire and arousal",
        "Non-hormonal mechanism — effective regardless of hormonal status, making it suitable for premenopausal women with acquired HSDD",
        "Requires sexual stimulation — augments the natural response to sexual cues rather than forcing an artificial response, preserving the experiential quality of sexual activity",
        "Reduces distress associated with low desire — clinical trials demonstrated statistically significant improvements in the Female Sexual Function Index (FSFI) desire domain and reduced distress on the Female Sexual Distress Scale (FSDS-DAO)",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "~1,025.2 Da" },
        { label: "Sequence", value: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH" },
        { label: "Length", value: "7 amino acids (cyclic heptapeptide)" },
        { label: "Type", value: "Synthetic melanocortin receptor agonist" },
        { label: "Half-Life", value: "~2.5 hours" },
        { label: "CAS Number", value: "189691-06-3" },
        { label: "Molecular Formula", value: "C\u2085\u2080H\u2086\u2088N\u2081\u2084O\u2081\u2080" },
        { label: "PubChem CID", value: "9941379" },
        { label: "Purity", value: "\u226599%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "PT-141 (Bremelanotide)",
      diagramSubtitle: "7-mer · ~1,025 Da · Cyclic Heptapeptide · Sequence: Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH",
      residues: [
        { x: 40, y: 75, label: "Nle", color: "#8b5cf6", name: "Nle" },
        { x: 85, y: 100, label: "D", color: "#0891b2", name: "Asp" },
        { x: 125, y: 115, label: "H", color: "#d97706", name: "His" },
        { x: 160, y: 120, label: "f", color: "#7c3aed", name: "D-Phe" },
        { x: 195, y: 115, label: "R", color: "#059669", name: "Arg" },
        { x: 230, y: 100, label: "W", color: "#0d9488", name: "Trp" },
        { x: 270, y: 75, label: "K", color: "#6366f1", name: "Lys" },
      ],
      legend: "Nle=Norleucine  D=Asp  H=His  f=D-Phe (D-stereoisomer)  R=Arg  W=Trp  K=Lys | cyclised via Asp\u00b9\u2194Lys\u2077 lactam bridge",
    },
    indications: {
      mostEffective: [
        { title: "HSDD in Premenopausal Women", desc: "The primary FDA-approved indication. Two identical Phase 3 RECONNECT trials (NCT02333071, NCT02338960) in 1,247 premenopausal women with acquired, generalized HSDD demonstrated statistically significant improvements in sexual desire (measured by FSFI desire domain) and reductions in distress (measured by FSDS-DAO) compared to placebo. The effect was consistent across subgroups including age, BMI, and hormonal contraceptive use." },
        { title: "Erectile Dysfunction Research", desc: "Phase 2 clinical trials in men with erectile dysfunction showed PT-141 improved erectile function, particularly in patients who did not respond to PDE5 inhibitors. A 2007 study in the Journal of Urology demonstrated that intranasal PT-141 (20 mg) successfully salvaged sildenafil failures. The centrally mediated mechanism provides an alternative pathway for ED not dependent on the nitric oxide/cGMP pathway." },
        { title: "Sexual Arousal & Desire", desc: "Beyond HSDD, PT-141 has documented effects on multiple dimensions of sexual response including arousal, lubrication, and orgasm. Studies using the Female Sexual Encounter Profile (FSEP) showed significant improvements in sexual arousal and satisfaction domains, suggesting broader applications for female sexual dysfunction beyond HSDD." },
      ],
      effective: [
        { title: "Female Sexual Dysfunction (General)", desc: "PT-141 has been investigated for broader female sexual dysfunction indications including female sexual arousal disorder (FSAD) and mixed sexual dysfunction. Its centrally acting mechanism addresses the desire and arousal components simultaneously, potentially benefiting women with overlapping sexual concerns." },
        { title: "Combination Therapy with PDE5 Inhibitors", desc: "Research has explored PT-141 as an adjunct to PDE5 inhibitors for erectile dysfunction. In patients who failed sildenafil monotherapy, the addition of PT-141 provided a different mechanistic pathway through central melanocortin activation, offering a second-line option for treatment-resistant ED." },
      ],
      moderate: [
        { title: "Tanning & Pigmentation (MC1R)", desc: "As an MC1R agonist, PT-141 can stimulate melanogenesis similar to Melanotan II, though this effect is significantly reduced due to its modified C-terminus. Some users report mild tanning with chronic use. Its MC1R activity is substantially lower than Melanotan II, making skin pigmentation a secondary rather than primary effect." },
        { title: "Anti-Inflammatory Effects", desc: "Melanocortin receptors (particularly MC1R and MC3R) are expressed on immune cells and have demonstrated anti-inflammatory properties in preclinical models. PT-141's MC1R agonism may contribute to modulation of inflammatory responses, though this application remains less well-characterised than its sexual function effects." },
      ],
    },
    dosing: {
      note: "PT-141 dosing for HSDD is 1.75 mg administered subcutaneously in the abdomen or thigh at least 45 minutes before anticipated sexual activity. Maximum 1 dose per 24-hour period and maximum 8 doses per month. Administration is as-needed (on-demand), not daily. The drug is supplied as a single-dose prefilled auto-injector containing 1.75 mg/0.3 mL solution.",
      rows: [
        { goal: "HSDD — FDA-Approved Dose", dose: "1.75 mg", freq: "45 min before sexual activity (as needed)", route: "SubQ" },
        { goal: "Maximum Daily", dose: "1.75 mg", freq: "Max 1 dose per 24 hours", route: "SubQ" },
        { goal: "Maximum Monthly", dose: "1.75 mg", freq: "Max 8 doses per month", route: "SubQ" },
        { goal: "Erectile Dysfunction Research", dose: "1.75-20 mg", freq: "Single dose 45 min before activity", route: "SubQ or IN" },
        { goal: "Female Sexual Dysfunction Research", dose: "0.75-1.75 mg", freq: "Single dose 45 min before activity", route: "SubQ" },
        { goal: "Combination Therapy Research", dose: "1.75 mg", freq: "Single dose with PDE5 inhibitor", route: "SubQ" },
      ],
      tips: [
        "Administer at least 45 minutes before sexual activity; onset typically occurs within 30-60 minutes and effects last 6-16 hours",
        "Nausea is the most common side effect and is dose-dependent — starting at the approved 1.75 mg dose minimises GI adverse events",
        "Do not exceed 1 dose in 24 hours or 8 doses per month — more frequent use does not improve efficacy",
        "May be taken with or without food; no special timing considerations required for meals",
        "Rotate injection sites (abdomen, thigh) to minimise injection site reactions",
        "Discard the auto-injector after a single use — do not reuse or share the device",
        "Avoid alcohol consumption before use as it may increase the risk of nausea and hypotension",
        "Monitor blood pressure after first dose — transient elevation of 2-3 mmHg may occur",
      ],
    },
    interactions: {
      note: "PT-141 is unique among melanocortin peptides with no direct peptide-to-peptide interaction data. Its primary drug interactions involve antihypertensives and naltrexone.",
      cards: [
        { slug: "melanotan-ii", name: "Melanotan II", desc: "Complementary — PT-141 is the deaminated metabolite of Melanotan II. Both are melanocortin agonists but PT-141 has reduced MC1R activity (less tanning) and was specifically developed to retain the sexual function effects of MT-II while minimising the pigmentation and nausea side effects.", effect: "Complementary" },
        { slug: "ghrp-6", name: "GHRP-6", desc: "No known direct interaction — PT-141 and GHRP-6 act on entirely different receptor systems (melanocortin vs ghrelin/GHSR-1a). Could be used concurrently in separate research protocols without concern for negative interaction, though their combined effects on appetite and sexual function are not studied.", effect: "Complementary" },
        { slug: "bpc-157", name: "BPC-157", desc: "No known interaction — PT-141 (CNS melanocortin) and BPC-157 (tissue repair/angiogenesis) work through independent pathways. No contraindication for separate research protocols, though no synergy or specific interaction has been documented in the literature.", effect: "Complementary" },
        { slug: "cjc-1295-ipamorelin-blend", name: "CJC-1295 + Ipamorelin", desc: "No known interaction — PT-141 and GH secretagogues act on distinct systems (melanocortin vs GHRH/GHSR-1a). Not typical to stack in research; separate administration for distinct research aims is recommended.", effect: "Complementary" },
        { slug: "tb-500", name: "TB-500", desc: "No known interaction — PT-141 (CNS melanocortin) and TB-500 (actin-binding/tissue repair) operate through completely separate biological systems. Can be used separately without concern for interaction.", effect: "Complementary" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "No known interaction — PT-141 and GHK-Cu target different pathways with no overlapping pharmacology documented. No safety concerns for separate research use.", effect: "Complementary" },
      ],
      stackNotes: [
        "PT-141 is contraindicated with naltrexone — co-administration reduces bremelanotide plasma concentrations and increases adverse events",
        "Use caution when administering with antihypertensives — PT-141 causes a transient increase in blood pressure (mean +2-3 mmHg systolic) that may additive",
        "No specific food interactions documented, though alcohol may worsen nausea and should be limited",
        "PT-141 delays gastric emptying similarly to GLP-1 agonists — this may affect absorption of oral medications",
        "Always introduce additional compounds one at a time in multi-compound protocols to isolate individual effects",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1", title: "First Dose — Acute Response", desc: "First 1.75 mg subcutaneous injection. Onset of action begins within 30-60 minutes. Nausea most likely to occur 1-3 hours post-dose (40% incidence). Transient blood pressure increase of 2-3 mmHg systolic, 1-2 mmHg diastolic peaking at ~2-3 hours. Flushing reported in ~20% of patients. Effects on sexual desire and arousal last 6-16 hours.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 1-7", title: "Initial Week — Tolerance Assessment", desc: "2-3 doses taken as needed over the first week. Gastrointestinal side effects remain most prominent during initial use. Patients learn to time administration 45 min before anticipated activity. Nausea typically diminishes with continued use as tolerance develops. Initial efficacy assessments: improvements in desire domain typically noticeable from first dose.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Week 2-4", title: "Early Establishment Phase", desc: "Continued as-needed dosing establishes the patient's individual response pattern. Nausea tolerance develops in most patients by week 2-3. Consistent improvements in sexual desire and reduced distress documented on validated scales (FSFI, FSDS-DAO). Average monthly use: 2-3 doses per week. Most patients report high satisfaction with on-demand dosing flexibility.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Week 4-8", title: "Therapeutic Optimisation Phase", desc: "Full therapeutic benefit established. Discontinuation due to adverse events most likely during this window (12-14% in clinical trials). Nausea manageable in most patients; antiemetic pre-treatment may be helpful. Blood pressure monitoring recommended — the transient hypertensive effect stabilises with continued use with no evidence of cumulative BP elevation. Injection site reactions minimal with proper rotation.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Week 8-24", title: "Sustained Efficacy Phase (Core Study Period)", desc: "Primary efficacy endpoints assessed at week 24 in RECONNECT trials. Statistically significant improvements in FSFI desire domain (mean increase of 0.34 vs 0.13 with placebo, p<0.001) and FSDS-DAO distress scores (-0.45 vs -0.27, p<0.001). Nausea rates decline to <10% by this phase. Average monthly use remains 2-3 doses. 70% of bremelanotide-treated patients proceeded to the open-label extension phase, indicating sustained patient satisfaction.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Week 24-52", title: "Long-Term Extension & Follow-Up", desc: "52-week open-label extension (OLE) of RECONNECT studies (n=684) demonstrated sustained efficacy and favourable long-term safety profile. No tachyphylaxis observed — efficacy maintained without dose escalation. Cumulative nausea incidence did not increase. Focal hyperpigmentation reported in <1% of patients with extended use. No new safety signals emerged. Most patients continued dosing 2-3 times per month, no more than once per week on average.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "FDA-Approved & Clinically Validated", text: "PT-141 (Vyleesi) received FDA approval in June 2019 for premenopausal women with HSDD. The safety database includes over 3,500 subjects across 43 clinical trials, with the pivotal RECONNECT Phase 3 programme enrolling 1,247 women in two identical 24-week randomised, double-blind, placebo-controlled trials plus a 52-week open-label extension. The FDA review concluded that efficacy and safety were adequately demonstrated for the approved indication.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Nausea — Most Common AE", text: "Nausea is the most frequently reported adverse event, occurring in 40% of bremelanotide-treated patients vs 1.3% with placebo across Phase 3 trials. The majority of events were mild (31%) to moderate (40%) in intensity and transient. Median time to onset was 1.2 hours post-dose. Nausea typically resolves within 2-3 hours and diminishes with continued use. Antiemetic pre-treatment may be considered for patients with persistent nausea. Discontinuation due to nausea occurred in approximately 5-8% of patients.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Flushing & Headache", text: "Facial flushing occurred in 20.3% of treated patients (vs 1.3% placebo). Headache reported in 11.3% (vs 1.9% placebo). Both were typically mild-to-moderate, transient, and self-limiting. Injection site reactions occurred in 5.4% of patients (vs 0% placebo), including erythema, pruritus, and pain at the injection site. No serious injection site reactions were reported.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
        { label: "Blood Pressure Warning", text: "PT-141 causes a transient increase in blood pressure. Mean increases of 2-3 mmHg systolic and 1-2 mmHg diastolic have been observed, peaking approximately 2-3 hours post-dose and returning to baseline within 6-8 hours. Heart rate decreases of 3-5 bpm accompany the BP elevation. PT-141 is CONTRAINDICATED in patients with uncontrolled hypertension or known cardiovascular disease. Blood pressure should be monitored during treatment, particularly after the first dose.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "red" },
        { label: "Contraindications & Precautions", text: "CONTRAINDICATED in: uncontrolled hypertension, known cardiovascular disease, concomitant use of naltrexone (reduces bremelanotide plasma concentrations and increases AEs). Not recommended in pregnancy or breastfeeding — effective contraception required. Caution with antihypertensives due to additive haemodynamic effects. Focal hyperpigmentation reported in <1% with long-term use. Naltrexone interaction is a known pharmacodynamic effect that worsens adverse events and reduces efficacy.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Research Context Safety", text: "For laboratory research use, PT-141 should be handled with standard peptide safety protocols. Lyophilized powder: store at -20°C, protected from light. Reconstitute with bacteriostatic water — swirl gently, never shake. Reconstituted solution stable for 28 days at 2-8°C. Verify ≥99% purity via third-party HPLC. Caution: pregnancy/breastfeeding, active cancer, or uncontrolled hypertension are exclusion criteria for research protocols. Note the 8 dose/month limit — using more frequently does not increase efficacy and may increase adverse event rates.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Kingsberg SA, Clayton AH, Portman DJ, et al. Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials. Obstet Gynecol. 2019;134(5):899-908. doi:10.1097/AOG.0000000000003500 (Pivotal RECONNECT Phase 3 — primary publication)",
      "Simon JA, Kingsberg SA, Portman DJ, et al. Long-Term Safety and Efficacy of Bremelanotide for Hypoactive Sexual Desire Disorder. J Sex Med. 2020;17(10):2003-2012. doi:10.1016/j.jsxm.2020.07.001 (52-week open-label extension)",
      "Clayton AH, Kingsberg SA, Simon JA, et al. Safety Profile of Bremelanotide Across the Clinical Development Program. J Womens Health (Larchmt). 2022;31(2):219-228. doi:10.1089/jwh.2021.0191 (Integrated safety analysis, n>3,500)",
      "FDA Prescribing Information. VYLEESI (bremelanotide injection). NDA 210557. Approved June 2019. Available at: https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf",
      "Kingsberg SA, Clayton AH, Pfaus JG, et al. Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder in Premenopausal Women. Expert Opin Pharmacother. 2020;21(1):1-10. doi:10.1080/14656566.2019.1685972",
      "Miner M, Gilderman L, Lunde M, et al. Bremelanotide (PT-141) for the Treatment of Erectile Dysfunction in Men Inadequately Responsive to Sildenafil: An Integrated Analysis of Two Phase 2 Trials. J Sex Med. 2008;5(3):569-579. doi:10.1111/j.1743-6109.2007.00725.x",
      "Diamond LE, Earle DC, Rosen RC, et al. Double-blind, placebo-controlled evaluation of the safety, pharmacokinetic properties and pharmacodynamic effects of intranasal PT-141, a melanocortin receptor agonist, in healthy males and patients with mild-to-moderate erectile dysfunction. Int J Impot Res. 2004;16(1):51-59. doi:10.1038/sj.ijir.3901139",
      "Rosen RC, Diamond LE, Earle DC, et al. Evaluation of the safety, pharmacokinetics and pharmacodynamic effects of subcutaneously administered PT-141 (a melanocortin receptor agonist) in healthy males and patients with erectile dysfunction. J Sex Med. 2004;1(1):58-69. doi:10.1111/j.1743-6109.2004.10109.x",
      "Pfaus JG, Shadiack A, Van Soest T, et al. Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist. Proc Natl Acad Sci USA. 2004;101(27):10201-10204. doi:10.1073/pnas.0400491101 (Preclinical mechanism paper)",
      "Hadley ME, Dorr RT. Melanocortin peptide therapeutics: historical milestones, clinical studies and commercialization. Peptides. 2006;27(4):921-930. doi:10.1016/j.peptides.2005.12.011 (Melanocortin peptide development history)",
    ],
  },
  "semaglutide": {
    overview: {
      whatIs: "Semaglutide is a 31-amino-acid synthetic analogue of human GLP-1, developed by Novo Nordisk and approved as Ozempic (T2D, 2017), Rybelsus (oral T2D, 2019), and Wegovy (obesity, 2021). It is the most prescribed GLP-1 agonist globally. The SELECT trial demonstrated a 20% reduction in MACE in patients with obesity and CVD — the first obesity med to show CV benefit. Key modifications (Aib8, Arg34, C18 di-acid on Lys26) enable albumin binding for ~7-day half-life and once-weekly dosing.",
      mechanism: "Selective GLP-1 receptor agonist activating the cAMP/PKA cascade in pancreatic β-cells, GI tract, and CNS. Potentiates glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and acts on hypothalamic nuclei to reduce appetite and increase satiety. STEP 1 programme showed 14.9% mean body weight reduction at 2.4 mg weekly. SELECT trial showed 20% MACE reduction across 17,604 patients.",
      benefits: [
        "Most prescribed GLP-1 agonist globally — real-world outcomes across millions of patients",
        "14.9% mean weight loss at 2.4 mg in STEP programme — first obesity med exceeding 15%",
        "20% MACE reduction in SELECT trial (n=17,604) — CV benefit in obesity without diabetes",
        "Once-weekly SC dosing with 7-day half-life; oral formulation (Rybelsus) available",
        "HbA1c reduction of 1.5-1.8% with dual glycaemic and weight benefits",
        "Emerging data for NASH resolution, HFpEF benefit, and CKD renoprotection",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "4,113.6 Da" },
        { label: "Sequence", value: "H-Aib-EGTFTSDVSSYLEGQAAK(Ado-Ado-γGlu-C18)EFIAWLVRGRG-OH" },
        { label: "Length", value: "31 amino acids" },
        { label: "Type", value: "GLP-1 receptor agonist | Long-acting acylated analogue" },
        { label: "Half-Life", value: "~7 days (weekly dosing)" },
        { label: "CAS Number", value: "910463-68-2" },
        { label: "Formula", value: "C₁₈₇H₂₉₁N₄₅O₅₉" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder / Pre-filled pen (clinical)" },
      ],
      diagramTitle: "Semaglutide",
      diagramSubtitle: "31-mer · 4,113.6 Da · Aib8, Arg34, Lys26(C18 di-acid)",
      residues: [
        { x: 35, y: 55, label: "Aib", color: "#8b5cf6", name: "Aib" },
        { x: 65, y: 75, label: "E", color: "#0891b2", name: "Glu" },
        { x: 90, y: 95, label: "G", color: "#6366f1", name: "Gly" },
        { x: 110, y: 110, label: "T", color: "#059669", name: "Thr" },
        { x: 132, y: 115, label: "F", color: "#7c3aed", name: "Phe" },
        { x: 155, y: 110, label: "T", color: "#059669", name: "Thr" },
        { x: 178, y: 95, label: "S", color: "#d97706", name: "Ser" },
        { x: 200, y: 75, label: "D", color: "#0d9488", name: "Asp" },
        { x: 225, y: 55, label: "V", color: "#6366f1", name: "Val" },
      ],
      legend: "Aib=Aminoisobutyric E=Glu G=Gly T=Thr F=Phe S=Ser D=Asp V=Val +22 more + C18 di-acid",
    },
    indications: {
      mostEffective: [
        { title: "Type 2 Diabetes", desc: "HbA1c reductions 1.5-1.8% (SUSTAIN). Superior to sitagliptin, exenatide, insulin glargine, and dulaglutide. Dual glycaemic + weight benefit makes it first-line after metformin." },
        { title: "Obesity / Weight Loss", desc: "Mean 14.9% weight reduction at 2.4 mg (STEP 1). 86% achieved ≥5%, 69% ≥10%, 50% ≥15%. Maintained at 104 weeks (STEP 5). Superior to all other GLP-1 agonists." },
        { title: "CV Risk Reduction", desc: "20% reduction in 3-point MACE (SELECT). First obesity medication to show CV benefit independent of diabetes. Consistent across age, sex, BMI, and CVD subgroups." },
      ],
      effective: [
        { title: "NASH / NAFLD", desc: "ESSENCE trial: 144% relative improvement in MASH resolution vs placebo at 72 weeks. Significant reductions in liver steatosis, inflammation, and fibrosis." },
        { title: "Heart Failure (HFpEF)", desc: "STEP-HFpEF: improved KCCQ score, 6-min walk distance, and inflammation markers in patients with HFpEF and obesity. Consistent benefit across subgroups." },
        { title: "CKD", desc: "FLOW trial: 24% reduction in kidney failure risk and 18% reduction in eGFR decline in T2D and CKD. Slowed progression to ESRD across all eGFR categories." },
      ],
      moderate: [
        { title: "Addiction / Craving", desc: "Observational data suggest reduced alcohol craving, nicotine use, and compulsive eating through central GLP-1R activation in reward pathways. Ongoing RCTs." },
        { title: "PAD", desc: "Stratum trial: improved walking distance and reduced peripheral vascular events. Mechanisms include anti-inflammatory and endothelial function improvement." },
      ],
    },
    dosing: {
      note: "Requires gradual dose titration to minimise GI side effects. SC in abdomen/thigh/upper arm weekly. Oral taken on empty stomach with ≤120mL water, wait 30 min before eating/drinking.",
      rows: [
        { goal: "T2D (Ozempic) Start", dose: "0.25 mg", freq: "1x weekly", route: "SubQ" },
        { goal: "T2D (Ozempic) Maintenance", dose: "0.5–1.0 mg", freq: "1x weekly", route: "SubQ" },
        { goal: "Obesity (Wegovy) Titration", dose: "0.25→2.4 mg", freq: "Escalate monthly", route: "SubQ" },
        { goal: "Obesity (Wegovy) Maintenance", dose: "2.4 mg", freq: "1x weekly", route: "SubQ" },
        { goal: "Oral (Rybelsus) Start", dose: "3 mg", freq: "1x daily", route: "Oral" },
        { goal: "Oral (Rybelsus) Maintenance", dose: "7–14 mg", freq: "1x daily", route: "Oral" },
      ],
      tips: [
        "Always titrate: 0.25→0.5→1.0→1.7→2.4 mg, 4 weeks each step to minimise GI side effects",
        "Inject same day each week; can take with or without meals",
        "Oral: on waking with ≤120mL water, wait 30 min before eating/drinking/smoking",
        "Stay hydrated; manage nausea with smaller meals, avoid fatty foods, ginger",
        "Missed dose: take within 5 days of scheduled date; if >5 days, skip and resume next",
      ],
    },
    interactions: {
      note: "Long half-life (~7 days) must be considered when switching GLP-1 agonists or planning surgery. 5-week washout before general anaesthesia.",
      cards: [
        { slug: "tirzepatide", name: "Tirzepatide", desc: "Contraindicated — both are GLP-1R agonists. Concurrent use provides no additional benefit and increases GI side-effect risk.", effect: "Complementary" },
        { slug: "metformin", name: "Metformin", desc: "Supportive — first-line T2D combination. Metformin reduces hepatic glucose output; semaglutide enhances insulin secretion and slows gastric emptying.", effect: "Supportive" },
        { slug: "insulin", name: "Insulin", desc: "Supportive — add-on to basal insulin. Insulin dose may need 10-20% reduction when initiating. Monitor for hypoglycaemia.", effect: "Supportive" },
        { slug: "cagrilintide", name: "Cagrilintide", desc: "Synergistic — CagriSema combination shows additive weight loss (15.6% at 32 weeks). Dual amylin/GLP-1 targets complementary satiety pathways.", effect: "Synergistic" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Complementary — no known interaction. GHK-Cu's copper-dependent tissue repair is entirely distinct from GLP-1 signalling.", effect: "Complementary" },
      ],
      stackNotes: [
        "Do NOT combine with any other GLP-1 agonist (tirzepatide, dulaglutide, liraglutide, retatrutide)",
        "Oral contraceptives may be less effective due to delayed gastric emptying — use additional barrier methods",
        "Insulin/sulfonylurea doses may need reduction (10-20%) when initiating",
        "Allow 5-week washout before elective surgery due to delayed gastric emptying",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-28", title: "Initiation", desc: "0.25 mg weekly. Nausea common (20-44%) but transient. Fasting glucose starts declining within 2 weeks. Weight loss begins.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Week 4-8", title: "Escalation", desc: "0.5 mg weekly. GI side effects peak then subside. HbA1c reduction ~1.0-1.2%. Weight loss accelerates to 2-4 kg/month.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Week 8-16", title: "Therapeutic", desc: "1.0 mg weekly. Max glycaemic effect: HbA1c reduction 1.5-1.8%. CV biomarkers improving. Significant appetite reduction.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Week 16-24", title: "Peak Weight Loss", desc: "2.4 mg (Wegovy). Max weight loss rate: 2-4 kg/month. Mean 8-10% total loss at week 24. GI tolerance established.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Week 24-52", title: "Sustained", desc: "12-14% total loss. CV markers improved 10-25%. HbA1c stable at target. Maintenance requires diet + exercise.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Week 52+", title: "Long-Term", desc: "Plateau at 14-15%. SELECT shows sustained CV benefit over 3+ years. Rapid regain if discontinued. Annual monitoring: renal, HbA1c, gallbladder.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Boxed: Thyroid C-Cell", text: "FDA black box — dose-dependent C-cell tumours in rodents. Contraindicated with personal/family history of MTC or MEN2.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "GI Effects", text: "Nausea 20-44%, vomiting 5-13%, diarrhoea 9-16%. Worst at initiation. Mitigation: start low, go slow, small meals, avoid fatty foods. Resolves over 4-8 weeks.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "amber" },
        { label: "Pancreatitis & Gallbladder", text: "Pancreatitis ~0.3% — discontinue if suspected. Gallbladder disease increased 0.6-1.5% due to rapid weight loss. Contraindicated with pancreatitis history.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "red" },
        { label: "Hypoglycaemia", text: "Low as monotherapy (<1%). Increases significantly with insulin (10-22%) or sulfonylurea. Dose reduction of insulin/SU may be needed.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Contraindications", text: "MTC/MEN2, severe GI disease, pregnancy (discontinue 2 months before conception), pancreatitis history, diabetic retinopathy complications.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Heart Rate & Storage", text: "Mean HR increase 2-4 bpm. Withhold before GA (delayed gastric emptying). Store pens at 2-8°C. Do not use if discoloured or contains particles.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Marso SP, et al. Semaglutide and Cardiovascular Outcomes in T2D. N Engl J Med. 2016;375(19):1834-1844. (SUSTAIN-6)",
      "Wilding JPH, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity. N Engl J Med. 2021;384(11):989-1002. (STEP 1)",
      "Lincoff AM, et al. Semaglutide and CV Outcomes in Obesity without Diabetes. N Engl J Med. 2023;389(23):2161-2172. (SELECT)",
      "Kosiborod MN, et al. Semaglutide in HFpEF and Obesity. N Engl J Med. 2024;390(1):39-49. (STEP-HFpEF)",
      "Newsome PN, et al. Semaglutide in MASH (ESSENCE). Lancet. 2024;403(10439):1947-1960.",
      "Rossing P, et al. Semaglutide in CKD in T2D (FLOW). N Engl J Med. 2024;391(2):133-143.",
      "Davies M, et al. Oral Semaglutide in T2D (PIONEER 1). Lancet Diabetes Endocrinol. 2017;5(12):978-990.",
      "Mehta R, et al. PK/PD of Semaglutide. Clin Pharmacokinet. 2017;56(12):1525-1534.",
      "Rubino DM, et al. Semaglutide vs Liraglutide in Obesity (STEP 8). JAMA. 2022;327(2):138-150.",
      "Knudsen LB, Lau J. Discovery and Development of Semaglutide. J Med Chem. 2019;62(3):1108-1125.",
    ],
  },

  "5-amino-1mq": {
    overview: {
      whatIs: "5-Amino-1MQ (5-amino-1-methylquinolinium) is a selective small-molecule inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme that plays a critical role in cellular methylation and energy metabolism. Originally described in a landmark 2018 Nature Communications paper (Kraus et al.), 5-amino-1MQ was identified through a high-throughput screen for NNMT inhibitors. By blocking NNMT activity, this compound preserves S-adenosylmethionine (SAM) pools and shifts cellular metabolism toward fat oxidation, mitochondrial function, and energy expenditure. It has attracted significant research interest for its potential in obesity, metabolic syndrome, and age-related metabolic decline.",
      mechanism: "5-Amino-1MQ acts by selectively inhibiting nicotinamide N-methyltransferase (NNMT), an enzyme that consumes S-adenosylmethionine (SAM) to methylate nicotinamide, producing N1-methylnicotinamide (MNAM) and S-adenosylhomocysteine (SAH). NNMT activity is elevated in adipose tissue and liver during obesity, where it depletes SAM reserves and creates a methyl-donor deficit that drives metabolic dysfunction. By inhibiting NNMT, 5-amino-1MQ preserves SAM levels, which maintains proper DNA methylation patterns and supports NAD+ biosynthesis. The SAM-sparing effect shifts cellular metabolism toward increased glycolysis, TCA cycle activity, mitochondrial respiration, and fatty acid oxidation. In adipocytes, NNMT inhibition reduces lipid accumulation and promotes a brown/beige adipose phenotype with increased thermogenic gene expression.",
      benefits: [
        "Selective NNMT inhibition — preserves SAM pools and supports mitochondrial function and fatty acid oxidation",
        "Reduces adipocyte lipid accumulation and promotes metabolically favourable beige/brown adipose gene expression",
        "Animal studies show significant reduction in body fat without muscle loss",
        "Preserves NAD+ precursors through reduced nicotinamide methylation",
        "May improve insulin sensitivity and glucose metabolism through enhanced mitochondrial function",
        "No known effect on appetite — metabolic mechanism is distinct from GLP-1-based approaches",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "~159.2 Da" },
        { label: "Formula", value: "C₁₀H₁₁N₂⁺ (quinolinium cation)" },
        { label: "Type", value: "Small-molecule NNMT inhibitor" },
        { label: "Target", value: "Nicotinamide N-methyltransferase (NNMT)" },
        { label: "CAS Number", value: "39979-10-3" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder (crystalline)" },
        { label: "Solubility", value: "Water-soluble (inert salt form)" },
      ],
      diagramTitle: "5-Amino-1MQ",
      diagramSubtitle: "~159 Da · NNMT inhibitor · Quinolinium compound",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Small-molecule NNMT inhibitor — quinolinium backbone with 5-amino substitution",
    },
    indications: {
      mostEffective: [
        { title: "Fat Loss & Metabolic Rate", desc: "NNMT inhibition shifts adipocyte metabolism toward fatty acid oxidation and energy expenditure. Animal studies demonstrate significant reductions in white adipose tissue mass with preservation of lean mass. The mechanism is distinct from appetite suppression — effects are mediated through cellular metabolic reprogramming rather than reduced caloric intake." },
        { title: "Mitochondrial Function", desc: "By preserving SAM pools and supporting NAD+ biosynthesis, 5-amino-1MQ enhances mitochondrial respiration and oxidative metabolism. This positions it as a potential research tool for mitochondrial dysfunction in obesity and metabolic disease." },
      ],
      effective: [
        { title: "Insulin Sensitivity", desc: "Improved glucose tolerance and insulin sensitivity observed in diet-induced obesity models. The mechanism involves enhanced mitochondrial fatty acid oxidation and reduced lipid accumulation in liver and adipose tissue, alleviating lipotoxicity-driven insulin resistance." },
        { title: "NAD+ Preservation", desc: "NNMT competes with NAMPT for nicotinamide substrate. By inhibiting NNMT, 5-amino-1MQ increases nicotinamide availability for the NAD+ salvage pathway, supporting cellular NAD+ levels critical for sirtuin activity and mitochondrial function." },
      ],
      moderate: [
        { title: "Browning of White Adipose", desc: "Preclinical studies show upregulation of brown/beige adipose markers (UCP1, PGC-1α, PRDM16) in white adipose tissue following NNMT inhibition, suggesting promotion of a metabolically favourable thermogenic phenotype in adipose depots." },
        { title: "Epigenetic Regulation", desc: "SAM preservation may support proper DNA and histone methylation patterns that are disrupted in obesity. This epigenetic mechanism represents a longer-term pathway through which NNMT inhibition may influence metabolic health." },
      ],
    },
    dosing: {
      note: "5-Amino-1MQ is a research compound with no established clinical dosing. Research protocols typically use daily subcutaneous administration. It is not an FDA/MHRA-approved medication.",
      rows: [
        { goal: "Standard Research", dose: "1-5 mg", freq: "1x daily", route: "SubQ" },
        { goal: "Metabolic Research", dose: "5-10 mg", freq: "1x daily", route: "SubQ" },
        { goal: "Stack with GLP-1 Agonists", dose: "1-5 mg", freq: "1x daily", route: "SubQ" },
        { goal: "Rodent Research", dose: "1-10 mg/kg", freq: "1x daily", route: "IP or SC" },
      ],
      tips: [
        "Reconstitute with bacteriostatic water — compound is water-soluble",
        "Daily dosing recommended due to short half-life",
        "Can be combined with GLP-1 agonists for complementary metabolic pathways — NNMT inhibition addresses energy expenditure while GLP-1 agonists target appetite",
        "Store lyophilized at 2-8°C protected from light",
        "Use reconstituted solution within 14 days at 2-8°C",
      ],
    },
    interactions: {
      note: "5-Amino-1MQ targets NNMT, a distinct metabolic pathway from most peptide-based research compounds. It is being investigated as a complementary agent to GLP-1 agonists and other metabolic compounds.",
      cards: [
        { slug: "semaglutide", name: "Semaglutide", desc: "Synergistic — 5-Amino-1MQ enhances energy expenditure through NNMT inhibition while semaglutide reduces caloric intake through GLP-1 agonism. Complementary mechanisms target both sides of the energy balance equation.", effect: "Synergistic" },
        { slug: "tirzepatide", name: "Tirzepatide", desc: "Synergistic — The dual GIP/GLP-1 agonism combined with NNMT inhibition offers comprehensive metabolic targeting. 5-Amino-1MQ's cellular metabolic effects complement incretin-based appetite and glucose regulation.", effect: "Synergistic" },
        { slug: "mots-c", name: "MOTS-c", desc: "Supportive — Both compounds enhance mitochondrial function through different mechanisms. MOTS-c activates AMPK/PGC-1α while 5-Amino-1MQ preserves NAD+ and SAM for mitochondrial metabolism.", effect: "Supportive" },
        { slug: "nad-plus", name: "NAD+ / NMN / NR", desc: "Supportive — NNMT inhibition and NAD+ precursor supplementation may have additive effects on cellular NAD+ levels, as 5-amino-1MQ preserves nicotinamide for the salvage pathway.", effect: "Supportive" },
        { slug: "aod-9604", name: "AOD-9604", desc: "Supportive — AOD-9604 (HGH fragment 177-191) targets fat metabolism through lipolysis while 5-amino-1MQ addresses cellular energy expenditure through NNMT inhibition.", effect: "Supportive" },
      ],
      stackNotes: [
        "5-Amino-1MQ is increasingly studied alongside GLP-1 agonists for combined energy expenditure + appetite suppression research",
        "NNMT inhibition is a cellular mechanism — effects take days to weeks to manifest, unlike acute appetite suppression",
        "SAM preservation is the key metabolic benefit — avoid concurrent use of SAM-depleting compounds",
        "Consider cycle length of 4-8 weeks for metabolic reprogramming studies",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Administration", desc: "Begin daily dosing protocol. NNMT inhibition established within hours of first dose. SAM levels begin to recover as NNMT-mediated consumption is reduced. No immediate physiological changes expected.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Metabolic Shift Phase", desc: "Cellular metabolism begins shifting toward oxidative pathways. Increased fatty acid oxidation detectable in adipocyte models. NAD+ levels start rising as nicotinamide is redirected from NNMT to NAMPT salvage pathway. Early improvements in mitochondrial respiration markers.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Mitochondrial Adaptation", desc: "Mitochondrial biogenesis and oxidative metabolism increase. Brown/beige adipose gene expression (UCP1, PGC-1α) begins upregulation in white adipose depots. Insulin sensitivity improvements become measurable. Gradual reduction in adipocyte lipid content.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Active Remodelling Phase", desc: "Significant metabolic improvements manifest — reduced body fat, enhanced energy expenditure, improved glucose tolerance. Epigenetic changes through SAM-dependent methylation pathways become established. Peak effect typically observed at 4-8 weeks of continuous dosing.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-84", title: "Sustained Effect & Washout", desc: "Standard 8-12 week research cycle approaches completion. Metabolic improvements plateau. After cessation, NNMT activity gradually returns to baseline over 2-4 weeks. SAM-dependent methylation changes may persist longer due to epigenetic modifications.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 84+", title: "Post-Cycle Analysis", desc: "Comprehensive metabolic and epigenetic assessment. Metabolomics analysis of SAM, SAH, NAD+, and acylcarnitine profiles. Body composition, glucose tolerance, and mitochondrial function endpoints evaluated.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "5-Amino-1MQ is a research compound not approved for human consumption by the MHRA, FDA, or any regulatory body. For in-vitro and animal research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Preclinical Safety Profile", text: "Animal studies show a favourable safety profile at research-relevant doses. No significant organ toxicity reported in published NNMT inhibitor studies. However, comprehensive toxicological data (e.g., chronic exposure, reproductive toxicity) are limited.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "SAM Depletion Concern", text: "While NNMT inhibition preserves SAM, excessive dosing could theoretically disrupt methylation balance. Research protocols should use appropriate doses based on published studies. Monitoring methylation pathway metabolites (SAM, SAH, homocysteine) is recommended in extended studies.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Limited Human Data", text: "As a relatively new research compound, human clinical data are limited. Available human data come from early-phase trials and research reports. Long-term safety and optimal dosing in humans are not yet established.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "amber" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at 2-8°C, protected from light and moisture. Reconstituted solution: Stable for up to 14 days at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water — swirl gently, never shake. Verify COA for purity and identity before use.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
      ],
    },
    references: [
      "Kraus D, Yang Q, Kong D, et al. Nicotinamide N-methyltransferase knockdown protects against diet-induced obesity. Nature. 2014;508(7495):258-262. doi:10.1038/nature13198",
      "Neelakantan H, Vance V, Wetzel MD, et al. Selective and membrane-permeable small molecule inhibitors of nicotinamide N-methyltransferase reverse high fat diet-induced obesity in mice. Nat Commun. 2018;9(1):5487. doi:10.1038/s41467-018-07942-9",
      "van Hout GPJ, Bosch L, Ellenbroek GHJ, et al. NNMT inhibition as a novel therapeutic target for obesity and metabolic disease. Trends Pharmacol Sci. 2021;42(7):543-555. doi:10.1016/j.tips.2021.04.002",
      "Kannt A, Rajagopal S, Kadnur SV, et al. A small molecule inhibitor of NNMT ameliorates obesity in mice. Nat Metab. 2022;4(9):1153-1168. doi:10.1038/s42255-022-00634-7",
      "Trammell SA, Schmidt MS, Weidemann BJ, et al. Nicotinamide riboside is uniquely and orally bioavailable in mice and humans. Nat Commun. 2016;7:12948. doi:10.1038/ncomms12948",
      "Eckert MA, Vu Q, Patel P, et al. NNMT inhibition preserves NAD+ levels and improves mitochondrial function in adipocytes. J Biol Chem. 2023;299(8):104951. doi:10.1016/j.jbc.2023.104951",
      "Ulanovskaya OA, Zuhl AM, Cravatt BF. NNMT is a metabolic adaptation that drives resistance to chemotherapy. Nat Chem Biol. 2013;9(5):300-306. doi:10.1038/nchembio.1222",
      "Campbell JE, Peck BD, Bourgeois L, et al. 5-Amino-1MQ: a novel small molecule for metabolic research. Pept Sci. 2025;117(1):e24318.",
    ],
  },

  "ace-031": {
    overview: {
      whatIs: "ACE-031 (ramatercept) is a recombinant fusion protein comprising the extracellular domain of the activin receptor type IIB (ActRIIB) fused to the Fc region of human IgG1. Developed by Acceleron Pharma, it functions as a soluble decoy receptor that binds and neutralises myostatin, activin A, GDF-11, and other TGF-β superfamily ligands that negatively regulate muscle growth. In Phase 2 clinical trials, a single subcutaneous dose of ACE-031 produced 3-5% increases in lean body mass within 29 days in healthy postmenopausal women, and weekly dosing in Duchenne muscular dystrophy (DMD) patients showed dose-dependent lean mass gains. However, development was halted due to safety concerns including bleeding events (nosebleeds, gingival bleeding) and telangiectasias related to ActRIIB pathway inhibition in endothelial cells.",
      mechanism: "ACE-031 acts as a high-affinity soluble trap for multiple TGF-β superfamily ligands that suppress muscle growth, primarily myostatin (GDF-8), activin A, and GDF-11. By binding these ligands with high affinity through its ActRIIB extracellular domain, ACE-031 prevents them from engaging membrane-bound ActRIIB receptors on muscle cells. This blockade lifts the tonic inhibition that myostatin and activin A exert on muscle growth, allowing satellite cell activation, myoblast proliferation and differentiation, and protein synthesis pathways (AKT/mTOR) to proceed unchecked. The resulting muscle hypertrophy is significantly more potent than myostatin-selective antibodies because ACE-031 also blocks activin A — a more potent ActRIIB ligand than myostatin itself. However, this broad ligand neutralisation also affects ActRIIB signalling in non-muscle tissues including endothelial cells (causing telangiectasias and bleeding), bone (increasing bone formation), and adipose tissue (reducing fat mass).",
      benefits: [
        "Potent lean mass gains — Phase 2 trials showed 3-5% lean body mass increase after a single dose in healthy postmenopausal women",
        "Dose-dependent muscle gains in Duchenne muscular dystrophy patients with measurable functional improvements",
        "Additionally blocks activin A — a more potent ActRIIB ligand than myostatin — giving broader anabolic effects than myostatin-specific antibodies",
        "Reduces fat mass alongside muscle gains through ActRIIB blockade in adipose tissue",
        "Increases bone mineral density through modulation of ActRIIB signalling in osteoblasts",
        "Once every 2-4 week subcutaneous dosing due to its long half-life as an Fc-fusion protein (~14 days)",
      ],
    },
    molecular: {
      items: [
        { label: "Type", value: "Recombinant fusion protein (ActRIIB-Fc)" },
        { label: "INN", value: "Ramatercept" },
        { label: "Molecular Weight", value: "~80 kDa (full fusion protein)" },
        { label: "Targets", value: "Myostatin (GDF-8), Activin A, GDF-11, BMP ligands" },
        { label: "Half-Life", value: "~14 days (Fc-mediated)" },
        { label: "Route", value: "Subcutaneous injection" },
        { label: "Developer", value: "Acceleron Pharma (now Merck/BMS)" },
        { label: "Clinical Status", value: "Phase 2 — discontinued (bleeding safety signal)" },
        { label: "Purity", value: "≥98% (research grade)" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "ACE-031 (Ramatercept)",
      diagramSubtitle: "~80 kDa · ActRIIB-Fc fusion protein · Myostatin/activin trap",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "ActRIIB extracellular domain fused to human IgG1 Fc domain",
    },
    indications: {
      mostEffective: [
        { title: "Muscle Mass Increase", desc: "ACE-031 produces rapid and significant lean body mass gains through broad ActRIIB ligand neutralisation. Phase 2 data demonstrated 3-5% lean mass increase within 29 days of a single dose in healthy volunteers — notably faster and more potent than any other myostatin-inhibiting approach studied to date." },
        { title: "Muscle Wasting Disorders", desc: "Developed primarily for Duchenne muscular dystrophy (DMD), ACE-031 showed dose-dependent increases in lean body mass in ambulatory boys with DMD over 4-12 weeks of treatment. Functional measures (6-minute walk test, timed function tests) showed trends toward improvement, though the trial was terminated early due to safety concerns rather than lack of efficacy." },
      ],
      effective: [
        { title: "Cachexia & Sarcopenia", desc: "By blocking both myostatin and activin A — two key drivers of muscle wasting in cachexia and sarcopenia — ACE-031 has strong preclinical rationale for age-related and disease-related muscle loss, though clinical development was not pursued in these indications." },
        { title: "Bone Density", desc: "ActRIIB signalling regulates bone mass. ACE-031 treatment increased bone mineral density in preclinical models through enhanced osteoblast activity and reduced osteoclast differentiation, suggesting potential applications in osteoporosis research." },
      ],
      moderate: [
        { title: "Fat Mass Reduction", desc: "Preclinical studies show ACE-031 reduces adipose tissue mass alongside muscle gains through ActRIIB-mediated effects on adipocyte metabolism and differentiation." },
        { title: "Metabolic Health", desc: "Improved insulin sensitivity and glucose metabolism observed in some preclinical models, potentially mediated through reduced activin signalling in metabolic tissues." },
      ],
    },
    dosing: {
      note: "ACE-031 is an investigational compound that was discontinued in clinical development. All dosing information is from Phase 1/2 clinical trials for research reference only.",
      rows: [
        { goal: "Healthy Volunteers (Phase 1)", dose: "0.02-3 mg/kg", freq: "Single dose", route: "SubQ" },
        { goal: "DMD Dose Level 1", dose: "0.6 mg/kg", freq: "Every 2 weeks × 3 doses", route: "SubQ" },
        { goal: "DMD Dose Level 2", dose: "1 mg/kg", freq: "Every 2 weeks × 3 doses", route: "SubQ" },
        { goal: "DMD Dose Level 3", dose: "3 mg/kg", freq: "Every 4 weeks × 2 doses", route: "SubQ" },
      ],
      tips: [
        "ACE-031 is a large fusion protein (~80 kDa) — reconstitute carefully following supplier protocols",
        "Long half-life (~14 days) means effects persist for weeks after a single dose",
        "Dose-dependent bleeding events (epistaxis, gingival bleeding) were dose-limiting in clinical trials",
        "Monitor for telangiectasias — small dilated blood vessels on skin and mucous membranes",
        "Store lyophilized at 2-8°C; reconstituted solution stable for 24-48 hours at 2-8°C",
        "Not recommended for research protocols where bleeding risk is unacceptable",
      ],
    },
    interactions: {
      note: "ACE-031 interacts with the myostatin/activin signalling pathway. Its broad ligand trapping distinguishes it from more selective myostatin inhibitors.",
      cards: [
        { slug: "follistatin", name: "Follistatin", desc: "Similar mechanism — Both block activin/myostatin signalling but through different means. Follistatin binds ligands directly while ACE-031 acts as a receptor decoy. Follistatin is more selective for activin, while ACE-031 has broader ligand specificity including BMPs.", effect: "Complementary" },
        { slug: "myostatin", name: "Myostatin (GDF-8)", desc: "Direct target — ACE-031 neutralises myostatin by sequestering it in circulation, preventing receptor binding. This is the primary mechanism for muscle mass effects.", effect: "Supportive" },
        { slug: "ghrp-2", name: "GHRP-2", desc: "Supportive — GH secretagogues may complement ACE-031's anabolic effects through the GH/IGF-1 axis, providing growth factor signalling alongside myostatin inhibition for comprehensive muscle growth research.", effect: "Supportive" },
        { slug: "igf-1-lr3", name: "IGF-1 LR3", desc: "Supportive — IGF-1 LR3 activates the P13K/AKT/mTOR pathway downstream, while ACE-031 removes tonic inhibition from myostatin/activin. These parallel anabolic pathways are of significant research interest.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Complementary — BPC-157 promotes tissue repair and angiogenesis through distinct pathways. No direct interaction with the activin/myostatin system.", effect: "Complementary" },
      ],
      stackNotes: [
        "ACE-031's broad ligand specificity (myostatin + activin A + GDF-11 + BMPs) makes it more potent but less targeted than myostatin-selective approaches",
        "The bleeding safety signal is mechanism-based — broader ActRIIB inhibition affects endothelial integrity",
        "Consider that ACE-031's effects persist for weeks due to its ~14-day half-life — plan washout accordingly",
        "Safer alternatives for myostatin inhibition research include follistatin and myostatin propeptide",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Dose & Ligand Trapping", desc: "Single subcutaneous dose administered. ACE-031 enters circulation and begins binding myostatin, activin A, and GDF-11 with high affinity. Circulating free myostatin levels drop to near-zero within 24-48 hours. The ActRIIB-Fc fusion protein distributes to all tissues due to its size (~80 kDa).", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-29", title: "Rapid Muscle Gain Phase", desc: "Phase 2 data shows 3-5% lean body mass increase within 29 days of a single dose. Satellite cell activation, myoblast fusion, and protein synthesis accelerate as myostatin/activin-mediated suppression is lifted. Muscle fibre cross-sectional area increases. Fat mass begins declining in parallel.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 29-56", title: "Sustained Anabolic Effect", desc: "Muscle mass continues increasing at a slower rate. Bone formation markers elevated. Fat mass reductions continue. The long half-life (~14 days) maintains therapeutic ligand trapping without frequent redosing for up to 4-6 weeks after a single dose in the highest dose groups.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56-84", title: "Plateau & Safety Monitoring", desc: "Muscle mass gains plateau as a new steady state is reached — ActRIIB signalling is suppressed but not completely eliminated. Safety monitoring for bleeding events, telangiectasias, and gingival bleeding is critical during this period. Redosing every 2-4 weeks maintains the effect in longer protocols.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 84-168", title: "Extended Use & Washout", desc: "Standard 12-week research cycle under most protocols. After discontinuation, ACE-031 levels decline with ~14-day half-life. Myostatin/activin signalling gradually returns to baseline over 6-8 weeks. Muscle mass loses some but not all of the gained tissue — the long duration of treatment and the biological half-life mean some effects persist for months.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 168+", title: "Post-Cycle Follow-Up", desc: "Comprehensive assessment of muscle mass retention, bone density, and adipose tissue changes. Monitoring for late-developing telangiectasias or bleeding tendencies. Detailed analysis of ActRIIB pathway biomarkers, muscle biopsy histology, and functional outcomes.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Clinical Trial Discontinued", text: "ACE-031 development was halted in Phase 2 trials due to safety concerns including epistaxis (nosebleeds), gingival bleeding, and telangiectasias (small dilated blood vessels). These mechanism-based adverse events are related to ActRIIB inhibition in endothelial cells and vascular integrity.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "Bleeding Events", text: "Dose-dependent bleeding events were the primary safety concern. In Phase 1 healthy volunteer studies, epistaxis occurred at higher doses. In DMD trials, gingival bleeding was reported. The mechanism is thought to involve ActRIIB-mediated regulation of endothelial cell integrity and vascular remodelling.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Telangiectasias", text: "Cutaneous telangiectasias (spider veins) developed in some subjects, likely due to ActRIIB inhibition in dermal endothelial cells affecting normal vascular maintenance. These were typically reversible upon treatment discontinuation.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Broad Activity vs Selectivity", text: "ACE-031's breadth of ligand trapping (myostatin, activin A, GDF-11, BMPs) is both a potency advantage and a safety liability. More selective myostatin inhibitors (e.g., domagrozumab, bimagrumab) may have better safety profiles, though possibly with less efficacy.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "blue" },
        { label: "Research Use Only", text: "ACE-031 is not approved by the MHRA, FDA, or any regulatory body. Its clinical development has been discontinued due to safety concerns. For in-vitro and animal research use only with appropriate risk assessment.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Storage & Handling", text: "Store lyophilized powder at 2-8°C. Reconstitute with sterile water or bacteriostatic water according to supplier instructions. Due to its size (~80 kDa), reconstitution may require gentle swirling for several minutes. Use reconstituted solution within 24-48 hours. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Attie KM, et al. A single ascending-dose study of ACE-031 in healthy volunteers: safety and effects on muscle mass. J Clin Pharmacol. 2011;51(10):1428-1438.",
      "Campbell C, et al. Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy: Results of a randomized, placebo-controlled clinical trial. Muscle Nerve. 2017;55(4):458-464. doi:10.1002/mus.25268",
      "Lach-Trifilieff E, et al. An antibody blocking activin type II receptors induces strong skeletal muscle hypertrophy and protects from atrophy. Mol Cell Biol. 2014;34(4):606-618. doi:10.1128/MCB.01307-13",
      "Suragani RNVS, et al. Transforming growth factor-β superfamily ligand trap ACE-031 corrects anemia and promotes muscle mass in sickle cell disease models. Blood. 2014;123(5):698-706.",
      "Lee SJ, et al. Regulation of muscle mass by myostatin. Annu Rev Cell Dev Biol. 2004;20:61-86. doi:10.1146/annurev.cellbio.20.012103.135836",
      "McPherron AC, Lawler AM, Lee SJ. Regulation of skeletal muscle mass in mice by a new TGF-β superfamily member. Nature. 1997;387(6628):83-90. doi:10.1038/387083a0",
      "Zimmers TA, et al. Induction of cachexia in mice by systemically administered myostatin. Science. 2002;296(5572):1486-1488. doi:10.1126/science.1069525",
      "Koncarevic A, et al. A soluble activin receptor type IIB fails to benefit aged or injured skeletal muscle. J Gerontol A Biol Sci Med Sci. 2012;67(2):106-116.",
      "Bogdanovich S, et al. Functional improvement of dystrophic muscle by myostatin blockade. Nature. 2002;420(6914):418-421. doi:10.1038/nature01154",
      "Sako D, et al. Characterization of the novel myostatin inhibitor ACE-031. J Biol Chem. 2010;285(8):5297-5305.",
    ],
  },

  "acth-1-39": {
    overview: {
      whatIs: "ACTH (Adrenocorticotropic Hormone, corticotropin) 1-39 is the full-length 39-amino-acid peptide hormone produced by the anterior pituitary gland. It is derived from the pro-opiomelanocortin (POMC) precursor and is the principal regulator of the hypothalamic-pituitary-adrenal (HPA) axis. ACTH stimulates the adrenal cortex to produce and secrete glucocorticoids (primarily cortisol), mineralocorticoids, and adrenal androgens. The full 1-39 sequence is the complete, naturally occurring human hormone. A synthetic form (cosyntropin/ACTH 1-24) containing the biologically active N-terminal 24 amino acids is widely used clinically for adrenal insufficiency testing. The full-length ACTH 1-39 is also the active ingredient in Acthar Gel (repository corticotropin injection), an FDA-approved therapeutic for infantile spasms, multiple sclerosis relapses, nephrotic syndrome, and other inflammatory conditions.",
      mechanism: "ACTH binds with high specificity to the melanocortin 2 receptor (MC2R), a G-protein-coupled receptor uniquely expressed on adrenal cortical cells. MC2R requires the accessory protein MRAP (MC2R accessory protein) for functional expression and ACTH binding. Upon activation, MC2R couples to the stimulatory G-protein (Gs), activating adenylyl cyclase and increasing intracellular cAMP. The cAMP/PKA cascade activates the transcription factor CREB, which upregulates steroidogenic enzyme expression — particularly CYP11A1 (side-chain cleavage enzyme), CYP17A1 (17α-hydroxylase), CYP21A2 (21-hydroxylase), and CYP11B1 (11β-hydroxylase). This coordinated enzyme induction drives the conversion of cholesterol into cortisol in the zona fasciculata. ACTH also stimulates aldosterone production in the zona glomerulosa (transiently) and adrenal androgen (DHEA) synthesis in the zona reticularis. Beyond adrenal effects, ACTH can activate other melanocortin receptors (MC1R, MC3R, MC4R, MC5R), mediating extra-adrenal anti-inflammatory, immunomodulatory, and melanogenic effects that contribute to its therapeutic actions in inflammatory and neurological conditions.",
      benefits: [
        "Full-length 39-aa natural ACTH — activates all five melanocortin receptors for broad therapeutic effects beyond adrenal stimulation",
        "Potent cortisol induction through MC2R activation — the primary physiological regulator of glucocorticoid production",
        "Extra-adrenal anti-inflammatory effects via MC1R, MC3R, and MC5R activation on immune cells — distinct from glucocorticoid-only therapies",
        "FDA-approved for infantile spasms (West syndrome), MS relapses, nephrotic syndrome, and rheumatoid arthritis (as Acthar Gel)",
        "Diagnostic gold standard for adrenal insufficiency (cosyntropin/ACTH 1-24 stimulation test)",
        "Modulates immune function through melanocortin receptor activation on T-cells, B-cells, and macrophages",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "4,541 Da (human ACTH 1-39)" },
        { label: "Sequence", value: "SYSMEHFRWGKPVGKKRRPVKVYPNVAENESAEAFPLEF" },
        { label: "Length", value: "39 amino acids" },
        { label: "Type", value: "Pituitary hormone | Melanocortin peptide" },
        { label: "Receptor", value: "MC2R (primary), MC1R, MC3R, MC4R, MC5R" },
        { label: "Half-Life", value: "~15 minutes (natural ACTH)" },
        { label: "CAS Number", value: "9002-60-2" },
        { label: "Formula", value: "C₂₀₇H₃₀₈N₅₆O₅₈S" },
        { label: "Precursor", value: "Pro-opiomelanocortin (POMC)" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "ACTH 1-39 (Corticotropin)",
      diagramSubtitle: "39-mer · 4,541 Da · Pituitary hormone · Sequence: SYSMEHFRWGKPVGKKRRPVKVYPNVAENESAEAFPLEF",
      residues: [
        { x: 30, y: 60, label: "S", color: "#6366f1", name: "Ser" },
        { x: 50, y: 75, label: "Y", color: "#8b5cf6", name: "Tyr" },
        { x: 70, y: 85, label: "S", color: "#0891b2", name: "Ser" },
        { x: 90, y: 95, label: "M", color: "#d97706", name: "Met" },
        { x: 110, y: 100, label: "E", color: "#7c3aed", name: "Glu" },
        { x: 128, y: 100, label: "H", color: "#059669", name: "His" },
        { x: 146, y: 95, label: "F", color: "#0d9488", name: "Phe" },
        { x: 164, y: 85, label: "R", color: "#e11d48", name: "Arg" },
        { x: 182, y: 75, label: "W", color: "#6366f1", name: "Trp" },
        { x: 200, y: 60, label: "G", color: "#8b5cf6", name: "Gly" },
      ],
      legend: "S=Ser  Y=Tyr  M=Met  E=Glu  H=His  F=Phe  R=Arg  W=Trp  G=Gly  K=Lys  +29 more · Full 1-39 sequence shown",
    },
    indications: {
      mostEffective: [
        { title: "Adrenal Stimulation (Cortisol Induction)", desc: "ACTH is the primary physiological regulator of cortisol synthesis and release. Through MC2R activation on adrenal zona fasciculata cells, it upregulates steroidogenic enzymes and drives cortisol secretion. The cosyntropin (ACTH 1-24) stimulation test is the gold standard for diagnosing adrenal insufficiency, measuring cortisol response 30-60 minutes after synthetic ACTH administration." },
        { title: "Infantile Spasms (West Syndrome)", desc: "Acthar Gel (repository corticotropin) is FDA-approved for the treatment of infantile spasms, a severe epileptic encephalopathy of infancy. High-dose ACTH therapy has been the standard of care for decades, with response rates of 50-75% in achieving electroclinical remission. The mechanism involves both corticosteroid-dependent and melanocortin receptor-mediated effects on neuronal excitability and inflammation." },
        { title: "Multiple Sclerosis Relapses", desc: "Acthar Gel is FDA-approved for acute exacerbations of multiple sclerosis in adults. ACTH therapy accelerates recovery from MS relapses through a dual mechanism: corticosteroid-mediated immunosuppression and melanocortin receptor-mediated neuroprotection. It is considered an alternative to high-dose IV methylprednisolone." },
      ],
      effective: [
        { title: "Nephrotic Syndrome", desc: "ACTH (Acthar Gel) is FDA-approved for the treatment of nephrotic syndrome, including minimal change disease and focal segmental glomerulosclerosis. ACTH reduces proteinuria through melanocortin receptor activation on podocytes, independent of corticosteroid-mediated immunosuppression. This unique mechanism distinguishes it from conventional glucocorticoid therapy." },
        { title: "Inflammatory & Autoimmune Conditions", desc: "Extra-adrenal melanocortin receptor activation (MC1R, MC3R, MC5R) provides anti-inflammatory and immunomodulatory effects through suppression of pro-inflammatory cytokines (TNF-α, IL-1β, IL-6) and promotion of anti-inflammatory mediators. This contributes to ACTH's therapeutic effects in rheumatoid arthritis, lupus, and other inflammatory conditions." },
      ],
      moderate: [
        { title: "Diagnostic Adrenal Testing", desc: "The ACTH (cosyntropin) stimulation test is the most widely used dynamic test of adrenal function. A 250 mcg IV or IM dose of cosyntropin is administered, and cortisol is measured at 0, 30, and 60 minutes. A peak cortisol <18-20 mcg/dL suggests adrenal insufficiency." },
        { title: "Hyperpigmentation", desc: "In conditions of chronically elevated ACTH (e.g., Addison's disease, Nelson syndrome), ACTH activates MC1R on melanocytes, stimulating melanogenesis and causing characteristic hyperpigmentation of skin and mucous membranes. This serves as a clinical biomarker of HPA axis dysregulation." },
      ],
    },
    dosing: {
      note: "ACTH is an FDA-approved prescription medication. Clinical dosing varies by indication and formulation (Acthar Gel vs cosyntropin). Research-grade ACTH 1-39 is available for in-vitro and animal studies only.",
      rows: [
        { goal: "Adrenal Stimulation Test", dose: "250 mcg (cosyntropin)", freq: "Single IV/IM dose", route: "IV or IM" },
        { goal: "Infantile Spasms (Acthar Gel)", dose: "150 U/m²/day", freq: "Divided IM doses × 2 weeks then taper", route: "IM" },
        { goal: "MS Relapse (Acthar Gel)", dose: "80-120 U/day", freq: "Daily IM × 1-3 weeks then taper", route: "IM" },
        { goal: "Nephrotic Syndrome", dose: "40-80 U", freq: "1-2× per week IM", route: "IM" },
        { goal: "Research (In Vitro)", dose: "10⁻¹² to 10⁻⁶ M", freq: "Per protocol", route: "In vitro" },
      ],
      tips: [
        "ACTH has a short half-life (~15 min) — repository formulations (Acthar Gel) use a zinc-based slow-release mechanism for prolonged effect",
        "Cosyntropin (ACTH 1-24) is preferred for diagnostic testing due to its standardised potency and lower allergenicity than full-length ACTH 1-39",
        "Acthar Gel is administered intramuscularly or subcutaneously — never intravenously",
        "Taper dosing is essential with prolonged ACTH therapy to avoid HPA axis suppression and adrenal crisis",
        "Monitor blood glucose, blood pressure, and electrolytes during therapy due to mineralocorticoid effects",
      ],
    },
    interactions: {
      note: "ACTH interacts with the HPA axis and melanocortin system. Its broad receptor profile (MC1-5R) creates potential interactions with other melanocortin peptides and HPA-axis-modulating compounds.",
      cards: [
        { slug: "semax", name: "Semax", desc: "Complementary — Both are derived from the POMC/ACTH pathway. Semax (ACTH 4-10 analogue) activates melanocortin receptors with a focus on cognitive enhancement, while ACTH 1-39 provides full adrenal and melanocortin activity.", effect: "Complementary" },
        { slug: "selank", name: "Selank", desc: "Complementary — Selank modulates immune function through tuftsin-derived mechanisms while ACTH provides melanocortin-mediated immunomodulation. Both affect cytokine expression but through different receptors.", effect: "Complementary" },
        { slug: "melanotan-ii", name: "Melanotan II", desc: "Complementary — MT-II is a synthetic MC1R/MC3R/MC4R/MC5R agonist. ACTH 1-39 activates all melanocortin receptors including MC2R (adrenal). MT-II provides melanocortin agonism without adrenal activation.", effect: "Complementary" },
        { slug: "pt-141", name: "PT-141 (Bremelanotide)", desc: "Complementary — PT-141 is an MC4R-preferring agonist for sexual function, derived from the melanocortin pathway. ACTH provides broader melanocortin activation including MC2R-mediated adrenal effects.", effect: "Complementary" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157 modulates the NO system and has cytoprotective effects that may complement ACTH's anti-inflammatory actions in tissue healing and GI protection research.", effect: "Supportive" },
      ],
      stackNotes: [
        "ACTH activates all five melanocortin receptors — combining with more selective melanocortin agonists provides targeted pathway activation",
        "Prolonged ACTH therapy suppresses endogenous HPA axis — consider ACTH-free periods to allow recovery of pituitary-adrenal function",
        "ACTH's mineralocorticoid effects require electrolyte monitoring (sodium, potassium) during extended use",
        "Combining ACTH with exogenous glucocorticoids creates additive HPA suppression — taper carefully",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1", title: "Acute Adrenal Response", desc: "ACTH administration triggers rapid cortisol release within 15-30 minutes. MC2R activation on adrenal zona fasciculata cells upregulates steroidogenic enzyme activity. Peak cortisol levels reached within 60 minutes. Aldosterone secretion transiently increased.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 1-7", title: "Initial Therapeutic Phase", desc: "For Acthar Gel, daily IM injections establish sustained melanocortin receptor activation. HPA axis suppression begins — endogenous ACTH production decreases via negative feedback. Early clinical effects in MS relapses and infantile spasms may be observed within the first week. Melanocortin-mediated anti-inflammatory effects start modulating immune function.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 7-28", title: "Sustained Therapeutic Window", desc: "Continued Acthar Gel therapy maintains therapeutic melanocortin activation. In infantile spasms, EEG normalisation typically occurs within 2 weeks of adequate dosing. In MS relapses, neurological improvement accelerates. Anti-inflammatory effects through MC1R/MC3R activation on immune cells reach steady state. Monitor for hyperglycaemia, hypertension, and electrolyte imbalances.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28+", title: "Tapering Phase", desc: "Therapeutic response reassessed. Dosing tapered gradually to allow HPA axis recovery. Abrupt discontinuation after >2 weeks of therapy risks adrenal crisis due to suppressed endogenous ACTH/cortisol production. Taper duration depends on treatment length and dose — typically 2-4 weeks of gradually decreasing doses.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Post-Taper", title: "HPA Recovery & Follow-Up", desc: "HPA axis function typically recovers over 2-4 weeks after ACTH discontinuation. Periodic ACTH stimulation testing may be performed to confirm adrenal recovery. Clinical monitoring for relapse of underlying condition. Long-term Acthar Gel therapy requires periodic assessment of bone density, glucose tolerance, and infection risk.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Chronic (Long-Term)", title: "Extended Maintenance", desc: "For chronic conditions (nephrotic syndrome, rheumatoid arthritis), lower-dose maintenance regimens may be used. Risks of prolonged melanocortin activation include weight gain, hyperglycaemia, hypertension, osteoporosis, and immunosuppression. Regular monitoring of HbA1c, blood pressure, DEXA scan, and ophthalmological exam recommended.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "FDA-Approved Medication", text: "ACTH (Acthar Gel, H.P. Acthar Gel) is an FDA-approved prescription medication with over 60 years of clinical use. It is approved for infantile spasms, MS relapses, nephrotic syndrome, rheumatoid arthritis, and other indications. Cosyntropin (Cortrosyn) is FDA-approved for diagnostic adrenal testing.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "HPA Axis Suppression", text: "Prolonged ACTH therapy suppresses the endogenous HPA axis through negative feedback. Abrupt discontinuation after >2 weeks of therapy can cause acute adrenal insufficiency (adrenal crisis) with hypotension, hyponatraemia, hyperkalaemia, and potential cardiovascular collapse. Gradual taper is mandatory.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "Corticosteroid-Like Side Effects", text: "ACTH therapy carries glucocorticoid-like side effects including weight gain, hyperglycaemia, new-onset diabetes, hypertension, electrolyte disturbances (hypokalaemia, sodium retention), osteoporosis, growth suppression in children, cataracts, glaucoma, increased infection susceptibility, and psychiatric disturbances (insomnia, mood changes, psychosis).", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "amber" },
        { label: "Contraindications", text: "Contraindicated in patients with systemic fungal infections, untreated infections, sensitivity to porcine proteins (Acthar Gel), recent vaccination (live vaccines), scleroderma, osteoporosis, congestive heart failure, hypertension, active tuberculosis, ocular herpes simplex, and Cushing syndrome.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Research Use Only (Peptide)", text: "For laboratory research use, ACTH 1-39 is available as a lyophilized peptide for in-vitro studies. Store at -20°C, protected from light. Reconstitute with bacteriostatic water or sterile PBS. Use immediately or aliquot and store at -20°C for single use. Avoid repeated freeze-thaw cycles.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Extra-Adrenal Effects", text: "ACTH activates MC1R (pigmentation/anti-inflammatory), MC3R (energy homeostasis/anti-inflammatory), MC4R (appetite/energy), and MC5R (exocrine gland function). These extra-adrenal effects contribute to therapeutic benefits but also to side effect profiles distinct from glucocorticoid-only therapies.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "blue" },
      ],
    },
    references: [
      "Arlt W, et al. Adrenocorticotropic hormone and the diagnosis of adrenal insufficiency. J Clin Endocrinol Metab. 2008;93(10):3698-3705.",
      "Baram TZ, et al. High-dose ACTH for infantile spasms: efficacy and outcome. Pediatrics. 1996;97(3):375-379.",
      "Tsoi P, et al. Melanocortin peptides and their receptors in the treatment of inflammatory diseases. Trends Pharmacol Sci. 2015;36(5):297-306.",
      "Getting SJ, et al. Melanocortin peptides and their receptors: new targets for anti-inflammatory therapy. Trends Pharmacol Sci. 2009;30(1):35-42.",
      "Catania A, et al. The melanocortin system in leukocyte biology. J Leukoc Biol. 2004;76(6):1134-1142.",
      "Li D, et al. ACTH and its receptor MC2R: molecular mechanisms and implications. Front Endocrinol. 2017;8:13. doi:10.3389/fendo.2017.00013",
      "Zadina JE, et al. ACTH: a neuropeptide with multiple actions. Peptides. 2016;82:1-12.",
      "Rapoport M, et al. Cosyntropin stimulation test: current applications in clinical practice. Endocr Pract. 2018;24(6):564-571.",
      "Malouf R, et al. ACTH for infantile spasms: a systematic review. Cochrane Database Syst Rev. 2012;6:CD004800.",
      "Gong R, et al. ACTH activates melanocortin receptors on podocytes and reduces proteinuria in nephrotic syndrome. Nat Rev Nephrol. 2016;12(9):555-568.",
    ],
  },

  "adamax": {
    overview: {
      whatIs: "Adamax is a synthetic, adamantane-modified analog of Semax, belonging to the ACTH(4-10) peptide family. It was designed to improve upon Semax's pharmacokinetic profile by incorporating an adamantyl group — a bulky, lipophilic cage-like structure — that increases metabolic stability, enhances blood-brain barrier penetration, and extends the duration of action compared to the parent peptide. Adamax is a heptapeptide sharing the core Met-Glu-His-Phe-Pro-Gly-Pro sequence of Semax but modified with an adamantane moiety for enhanced CNS bioavailability. It is studied for its potential nootropic, neuroprotective, and cognitive-enhancing properties through modulation of neurotrophin expression and neurotransmitter systems.",
      mechanism: "Adamax works through multiple neurotrophic and neuromodulatory pathways. Like Semax, it activates Trk neurotrophin receptors (particularly TrkB), leading to increased expression of brain-derived neurotrophic factor (BDNF) and nerve growth factor (NGF) in the hippocampus and cerebral cortex. BDNF upregulation supports synaptic plasticity, neurogenesis, and dendritic spine formation. The adamantane modification enhances blood-brain barrier penetration and prolongs the peptide's half-life by protecting against enzymatic degradation. Adamax also modulates the dopaminergic and cholinergic systems, influences the GABA/glutamate balance, and exerts anti-inflammatory effects through melanocortin receptor activation. The combined effect is enhanced cognitive function, neuroprotection against excitotoxicity, and improved stress resilience.",
      benefits: [
        "Enhanced CNS bioavailability — the adamantane moiety improves blood-brain barrier penetration and metabolic stability compared to Semax",
        "BDNF and NGF upregulation in hippocampus and cortex — supports synaptic plasticity, neurogenesis, and dendritic remodelling",
        "Extended duration of action — longer half-life than Semax due to adamantyl protection against peptidase degradation",
        "Neuroprotection against excitotoxicity, oxidative stress, and beta-amyloid toxicity in preclinical models",
        "Cognitive enhancement in domains of learning, memory consolidation, attention, and information processing",
        "Anxiolytic and stress-resilience effects through modulation of GABA/dopamine balance",
      ],
    },
    molecular: {
      items: [
        { label: "Type", value: "Synthetic nootropic peptide | Semax analog" },
        { label: "Core Sequence", value: "Met-Glu-His-Phe-Pro-Gly-Pro (Semax backbone)" },
        { label: "Modification", value: "Adamantane (adamantyl) moiety conjugated at N-terminus" },
        { label: "Length", value: "7 amino acids (heptapeptide)" },
        { label: "Molecular Weight", value: "~950 Da (estimated with adamantane)" },
        { label: "Half-Life", value: "~3-5 hours (estimated, longer than Semax)" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Adamax",
      diagramSubtitle: "~950 Da · Adamantane-modified Semax analog · Nootropic heptapeptide",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Adamantane-modified Semax (ACTH 4-10) analog — heptapeptide backbone with adamantyl group",
    },
    indications: {
      mostEffective: [
        { title: "Cognitive Enhancement", desc: "Adamax enhances multiple domains of cognitive function including learning, memory consolidation, attention, and information processing speed. The mechanism involves BDNF-mediated synaptic plasticity and enhanced dopaminergic transmission in prefrontal and hippocampal circuits." },
        { title: "Neuroprotection", desc: "Protects neurons against excitotoxicity, oxidative stress, and beta-amyloid toxicity through BDNF upregulation and melanocortin receptor activation. Preclinical studies show reduced neuronal death in models of cerebral ischemia and neurodegeneration." },
      ],
      effective: [
        { title: "Stress Resilience & Anxiolysis", desc: "Modulates the GABA/dopamine balance to improve stress coping and reduce anxiety-like behaviours. The adamantane modification may contribute additional effects on glutamatergic signalling similar to amantadine's NMDA receptor modulation." },
        { title: "Recovery from CNS Injury", desc: "BDNF and NGF upregulation supports neural repair and functional recovery after traumatic brain injury, stroke, and spinal cord injury in preclinical models. Promotes axonal sprouting and synaptic reorganisation in injured neural tissue." },
      ],
      moderate: [
        { title: "Age-Related Cognitive Decline", desc: "By upregulating neurotrophin signalling and supporting synaptic plasticity, Adamax may have applications in research on age-related cognitive decline and neurodegenerative conditions, though specific clinical data are limited." },
        { title: "Fatigue & Mental Stamina", desc: "Anecdotal reports suggest improved mental endurance and reduced cognitive fatigue, potentially through enhanced dopaminergic signalling and improved cerebral metabolism." },
      ],
    },
    dosing: {
      note: "Adamax is a research peptide not approved for human consumption. Dosing protocols are derived from Semax literature and researcher reports.",
      rows: [
        { goal: "Standard Nootropic", dose: "400-800 mcg", freq: "1-2x daily", route: "SubQ or IN" },
        { goal: "Cognitive Enhancement", dose: "600-1000 mcg", freq: "1-2x daily", route: "SubQ or IN" },
        { goal: "Neuroprotection Protocol", dose: "800-1200 mcg", freq: "1-2x daily", route: "SubQ or IN" },
        { goal: "Intranasal Administration", dose: "400-600 mcg", freq: "1-2x daily", route: "Intranasal" },
      ],
      tips: [
        "The adamantane modification extends half-life — may require less frequent dosing than Semax",
        "Intranasal administration provides direct CNS delivery via the olfactory pathway",
        "Best taken in the morning to avoid potential interference with sleep",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store lyophilized at 2-8°C; reconstituted solution stable for 14-28 days at 2-8°C",
        "Start at lower end of dosing range and titrate based on response",
      ],
    },
    interactions: {
      note: "Adamax is a Semax analog with enhanced bioavailability. Its interactions are similar to Semax and other melanocortin-derived nootropic peptides.",
      cards: [
        { slug: "semax", name: "Semax", desc: "Complementary — Adamax is a modified analog of Semax with extended half-life and enhanced CNS penetration. Using both is redundant as Adamax was designed to improve upon Semax's pharmacokinetic limitations.", effect: "Complementary" },
        { slug: "selank", name: "Selank", desc: "Synergistic — The Semax/Selank combination is the most studied peptide pairing for cognitive and anxiolytic research. Adamax's enhanced BDNF upregulation complements Selank's GABAergic anxiolysis and enkephalin stabilisation.", effect: "Synergistic" },
        { slug: "noopept", name: "Noopept", desc: "Supportive — Both enhance cognitive function through different pathways. Adamax acts through BDNF/TrkB and neurotrophin signalling while Noopept modulates AMPA glutamate receptors and NGF expression.", effect: "Supportive" },
        { slug: "p21", name: "P21", desc: "Supportive — P21 is a nootropic peptide derived from the GHRH/GHRP family. Its effects on cognitive function through different mechanisms may complement Adamax's CNS activity.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157's neuroprotective and tissue-healing effects may complement Adamax's CNS-focused nootropic effects in recovery and neuroregeneration protocols.", effect: "Supportive" },
      ],
      stackNotes: [
        "Adamax and Selank are a well-regarded combination for comprehensive cognitive and anxiolytic research — Adamax for BDNF/cognitive enhancement and Selank for GABAergic anxiolysis",
        "The adamantane moiety may have additional NMDA receptor modulating effects similar to amantadine",
        "Consider cycling Adamax (4 weeks on, 1-2 weeks off) to prevent tolerance to nootropic effects",
        "Start with Adamax alone before adding additional compounds to isolate individual effects",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-3", title: "Initial Administration", desc: "Begin daily SubQ or intranasal dosing. Adamax crosses the blood-brain barrier and begins TrkB receptor activation. Early BDNF upregulation initiated in the hippocampus and prefrontal cortex. First subtle improvements in focus and mental clarity may be noticed within hours of first dose.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 3-7", title: "Early Cognitive Response", desc: "Consistent BDNF expression established. Enhanced synaptic plasticity begins in hippocampal circuits. Improvements in working memory, learning acquisition, and attention become more noticeable. Neuroprotection against excitotoxic stress initiated through BDNF-mediated signalling pathways.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 7-14", title: "Neurotrophic Remodelling", desc: "BDNF and NGF levels reach elevated steady state. Dendritic spine formation and synaptic maturation in hippocampal and cortical neurons. Cognitive enhancements in memory consolidation and information processing become significant. Stress resilience improved through neurotrophin-mediated neural circuit stabilisation.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14-28", title: "Peak Effect Phase", desc: "Maximum cognitive enhancement observed. Learning capacity, recall, and executive function optimised. The adamantane moiety's potential NMDA receptor modulation may contribute additional cognitive effects. Stable BDNF levels support sustained neuroplasticity and mood regulation.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-42", title: "Sustained Effect & Washout", desc: "Standard 4-week research cycle approaches completion. Effects typically maintained throughout the cycle. After discontinuation, BDNF levels gradually return to baseline over 7-14 days. No known withdrawal symptoms. Two-week washout recommended before next cycle.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { day: "Day 42+", title: "Post-Cycle & Reassessment", desc: "Cognitive function returns to baseline. Cycle outcomes assessed through cognitive testing and subjective reporting. Full washout completed before initiating next cycle to maintain responsiveness.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Research Use Only", text: "Adamax is a research peptide not approved by the MHRA, FDA, EMA, or any regulatory body. It is intended for in-vitro and laboratory research use only. It should not be used for human or veterinary purposes.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Good Tolerability", text: "As a Semax analog, Adamax is expected to have a favourable tolerability profile. Semax has been studied in human clinical trials with a strong safety record. Mild transient headache or jitteriness reported in some cases, typically resolving with continued use.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Contraindications", text: "Caution in research models involving seizure disorders, active CNS infections, or concurrent use of monoamine oxidase inhibitors (MAOIs). Limited safety data in pregnancy, lactation, and developmental models.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "CNS Stimulation", text: "Like Semax, Adamax may produce mild CNS stimulation. Monitor for overstimulation, insomnia, or anxiety at higher doses. Starting with lower doses and titrating up is recommended.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
        { label: "Storage Requirements", text: "Lyophilized powder: Store at 2-8°C, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2-8°C. Do not freeze after reconstitution.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
        { label: "Handling Protocols", text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water only — swirl gently, never shake.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "blue" },
      ],
    },
    references: [
      "Levitskaya NG, et al. Semax and its analogs: neurotrophic and neuroprotective effects. J Neurochem. 2017;142(Suppl 2):127-138.",
      "Yamshchikova NV, et al. Adamantyl-containing peptides as potential nootropic agents. Pharm Chem J. 2019;53(4):321-327.",
      "Gudasheva TA, et al. Design and synthesis of nootropic dipeptides and their analogues. Russ J Bioorg Chem. 2018;44(6):617-626.",
      "Dmitrieva VG, et al. Semax and its analogs modulate gene expression in the brain. Dokl Biochem Biophys. 2018;481(1):203-206.",
      "McDaniel GC, et al. Adamantane derivatives in CNS drug discovery. J Med Chem. 2020;63(24):15137-15159.",
      "Ershova EB, et al. Nootropic activity of adamantane-containing peptides. Bull Exp Biol Med. 2020;169(2):229-233.",
      "Bobkova NV, et al. Neuroprotective and nootropic effects of Semax and its analogues. Neurochem J. 2019;13(2):151-159.",
      "Shabanova ME, et al. Effects of adamantane derivatives on NMDA receptor function. Neuropharmacology. 2021;195:108645.",
      "Pavlov SA, et al. BDNF expression after Semax analog administration in rat brain. Mol Neurobiol. 2022;59(4):2312-2322.",
      "Andreeva LA, et al. Peptide nootropics: from Semax to Adamax. Russ Chem Rev. 2023;92(5):RCR5076.",
    ],
  },

  "adipotide": {
    overview: {
      whatIs: "Adipotide (also known as FTPP — Fat-Targeted Proapoptotic Peptide) is a synthetic peptidomimetic compound designed to induce targeted apoptosis of white adipose tissue by destroying the blood vessels that supply it. It consists of two functional domains: a homing sequence that binds to prohibitin and annexin A2 receptors on the surface of endothelial cells in white adipose tissue vasculature, and a pro-apoptotic (KLAKLAK)₂ peptide that disrupts mitochondrial membranes upon internalisation. Developed at the MD Anderson Cancer Center, Adipotide demonstrated significant fat reduction (up to 30% reduction in body fat) in primate studies, though clinical development was halted due to kidney toxicity concerns.",
      mechanism: "Adipotide operates through a dual-domain mechanism. The targeting domain (homing sequence CKGGRAKDC) binds specifically to prohibitin and annexin A2 receptors that are highly expressed on the surface of endothelial cells lining blood vessels in white adipose tissue. Upon binding, the conjugate is internalised via receptor-mediated endocytosis. Once inside the endothelial cell, the (KLAKLAK)₂ pro-apoptotic domain disrupts the mitochondrial membrane, causing cytochrome c release and caspase-dependent apoptosis. This selective destruction of adipose vasculature cuts off the blood supply to white fat deposits, causing the fat tissue to undergo apoptosis and be gradually reabsorbed by the body. The effect is selective for white adipose tissue because the prohibitin and annexin A2 targets are much more highly expressed on adipose vs other vascular beds.",
      benefits: [
        "Targeted destruction of white adipose tissue vasculature — unique mechanism distinct from all other fat loss compounds",
        "Up to 30% reduction in body fat observed in primate studies with a single treatment course",
        "Selective for white fat over brown fat — preserves metabolically beneficial brown adipose tissue",
        "Improves insulin sensitivity and glucose metabolism alongside fat reduction",
        "May reduce visceral fat preferentially — the most metabolically harmful fat depot",
        "Novel approach to obesity treatment through vascular targeting rather than appetite or metabolism modulation",
      ],
    },
    molecular: {
      items: [
        { label: "Type", value: "Peptidomimetic | Pro-apoptotic conjugate" },
        { label: "Target", value: "Prohibitin / Annexin A2 on adipose vasculature" },
        { label: "Molecular Weight", value: "~2,000 Da (approx)" },
        { label: "Sequence", value: "CKGGRAKDC-(KLAKLAK)₂" },
        { label: "Half-Life", value: "~2-4 hours (estimated)" },
        { label: "CAS Number", value: "N/A (research compound)" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Adipotide (FTPP)",
      diagramSubtitle: "~2,000 Da · Prohibitin-targeted pro-apoptotic conjugate",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Homing sequence (CKGGRAKDC) + pro-apoptotic domain ((KLAKLAK)₂)",
    },
    indications: {
      mostEffective: [
        { title: "White Adipose Tissue Reduction", desc: "Adipotide's unique vascular-targeting mechanism produces rapid and selective reduction of white adipose tissue. Primate studies demonstrated up to 30% reduction in total body fat over 4 weeks. The effect is mediated through destruction of adipose vasculature, causing fat tissue to be reabsorbed." },
        { title: "Visceral Fat Reduction", desc: "Preclinical studies suggest preferential reduction of visceral adipose tissue over subcutaneous fat. Visceral fat is the metabolically harmful depot associated with insulin resistance, inflammation, and cardiovascular risk." },
      ],
      effective: [
        { title: "Insulin Sensitivity", desc: "Alongside fat reduction, Adipotide treatment improved insulin sensitivity and glucose tolerance in animal models. This is likely secondary to the reduction of metabolically harmful visceral adipose tissue." },
        { title: "Metabolic Syndrome Research", desc: "By targeting the root cause of metabolic dysfunction (excess adipose tissue), Adipotide shows potential for researching obesity-related metabolic disorders, though kidney toxicity has limited its development." },
      ],
      moderate: [
        { title: "Cancer Research", desc: "The prohibitin-targeting approach has been investigated for cancer applications, as prohibitin is overexpressed in certain tumour vascular beds. However, this research is preclinical." },
      ],
    },
    dosing: {
      note: "Adipotide is an investigational research compound that was discontinued from clinical development. All dosing information is from preclinical studies.",
      rows: [
        { goal: "Primate Research (High)", dose: "5.5 mg/kg", freq: "Every other day × 4 weeks", route: "SubQ" },
        { goal: "Primate Research (Low)", dose: "1.5 mg/kg", freq: "Every other day × 4 weeks", route: "SubQ" },
        { goal: "Rodent Research", dose: "5-10 mg/kg", freq: "Every other day × 2-4 weeks", route: "IP" },
      ],
      tips: [
        "Adipotide is a potent compound — handle with extreme care due to its pro-apoptotic mechanism",
        "Clinical development was halted due to kidney toxicity — renal function monitoring is essential in any research protocol",
        "Effects on fat are delayed — adipose tissue reabsorption takes days to weeks after vascular destruction",
        "Store lyophilized at -20°C, protected from light and moisture",
        "Reconstitute with sterile water or PBS immediately before use — do not store reconstituted solution",
      ],
    },
    interactions: {
      note: "Adipotide's unique pro-apoptotic mechanism targeting adipose vasculature creates specific interaction considerations.",
      cards: [
        { slug: "aod-9604", name: "AOD-9604", desc: "Complementary — AOD-9604 promotes lipolysis through GH fragment signalling pathways, while Adipotide destroys adipose vasculature. Both target fat but through entirely different mechanisms.", effect: "Complementary" },
        { slug: "5-amino-1mq", name: "5-Amino-1MQ", desc: "Supportive — NNMT inhibition shifts adipocyte metabolism toward fat oxidation, which may complement the fat-reducing effects of Adipotide's vascular destruction approach.", effect: "Supportive" },
        { slug: "tesofensine", name: "Tesofensine", desc: "Supportive — Tesofensine reduces appetite through triple reuptake inhibition, providing complementary weight loss mechanisms alongside Adipotide's direct fat targeting.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "No known interaction — BPC-157's pro-angiogenic effects (promoting blood vessel formation) could theoretically oppose Adipotide's anti-angiogenic mechanism. Careful protocol design recommended if combining.", effect: "Complementary" },
      ],
      stackNotes: [
        "Adipotide's kidney toxicity is the primary safety concern — do not combine with other nephrotoxic compounds",
        "The pro-apoptotic mechanism means effects are not immediately reversible — fat that is destroyed cannot be regained through the normal adipose vasculature",
        "Due to significant safety concerns, Adipotide is primarily of historical research interest",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Vascular Targeting & Apoptosis Initiation", desc: "Adipotide administered every other day. The homing domain binds to prohibitin/annexin A2 on adipose endothelial cells. The pro-apoptotic (KLAKLAK)₂ domain disrupts mitochondrial membranes, initiating caspase-dependent apoptosis. No immediate change in body weight or fat mass.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Vascular Destruction Phase", desc: "Apoptosis of adipose endothelial cells causes collapse of the capillary network supplying white adipose tissue. Fat cells lose blood supply and begin dying. Early reductions in fat mass become measurable. Kidney function monitoring is critical during this period.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 14-28", title: "Active Fat Loss Phase", desc: "Maximum rate of fat loss observed — up to 30% total body fat reduction in primate studies. Dead fat tissue is cleared by macrophages and reabsorbed. Significant improvements in insulin sensitivity and glucose tolerance. Body weight decreases as fat mass is reduced.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-56", title: "Remodelling & Recovery Phase", desc: "Treatment course completed. Fat continues to be cleared over subsequent weeks. The adipose vasculature may partially regenerate if prohibitin expression returns, but most studies show sustained fat reduction. Kidney function should return to baseline if no permanent damage occurred.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 56+", title: "Long-Term Assessment", desc: "Comprehensive metabolic and kidney function assessment. Fat reduction is typically sustained as destroyed adipose vasculature does not regenerate fully. If kidney toxicity occurred, long-term renal function monitoring is necessary.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Clinical Development Halted", text: "Adipotide's clinical development was discontinued due to dose-limiting kidney toxicity. In primate studies, renal tubular damage was observed at higher doses, manifesting as elevated creatinine and BUN. This safety concern has prevented further clinical advancement.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
        { label: "Nephrotoxicity Warning", text: "The most significant safety concern is kidney damage, likely due to prohibitin expression in renal tubular cells. Dose-dependent increases in serum creatinine and blood urea nitrogen were observed. Any research protocol involving Adipotide must include rigorous renal function monitoring.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
        { label: "Research Use Only", text: "Adipotide is an investigational compound not approved by any regulatory body. It is for in-vitro and animal research use only. Clinical development has been discontinued, and it is not available as a therapeutic agent.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
        { label: "Pro-Apoptotic Handling", text: "Due to its pro-apoptotic mechanism, Adipotide must be handled with extreme care. Avoid skin contact, inhalation, or self-injection. Use appropriate PPE including gloves, lab coat, and eye protection. Dispose of waste according to cytotoxic material protocols.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Storage & Stability", text: "Store lyophilized powder at -20°C, protected from light. Reconstitute immediately before use in sterile water or PBS. Do not store reconstituted solution — use immediately and discard unused portion. Avoid repeated freeze-thaw cycles.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
      ],
    },
    references: [
      "Kolonin MG, et al. Reversal of obesity by targeted ablation of adipose tissue. Nat Med. 2004;10(6):625-632. doi:10.1038/nm1048",
      "Barnhart KF, et al. A peptidomimetic targeting white fat causes weight loss and improved insulin resistance in obese monkeys. Sci Transl Med. 2011;3(108):108ra112. doi:10.1126/scitranslmed.3002621",
      "Meyer TE, et al. Prohibitin-targeted peptide reduces adipose tissue in diet-induced obese mice. Int J Obes. 2012;36(6):807-814.",
      "Piao L, et al. Adipotide-induced fat loss is associated with improved metabolic profile in primates. Diabetes. 2012;61(Suppl 1):A417.",
      "Kolonin MG, et al. Targeted destruction of adipose vasculature as a novel approach to obesity treatment. Future Lipidol. 2007;2(2):193-200.",
      "Staquicini FI, et al. Vascular targeting peptides for the treatment of obesity and metabolic disease. Curr Opin Endocrinol Diabetes Obes. 2012;19(5):372-378.",
      "Kolonin MG, et al. Prohibitin-targeting peptide for treatment of obesity. US Patent 8,178,489. 2012.",
      "Arap W, et al. Targeting the prostate for destruction through a vascular address. Proc Natl Acad Sci USA. 2002;99(3):1527-1531.",
    ],
  },

  "ahk-cu": {
    overview: {
      whatIs: "AHK-Cu (Alanine-Histidine-Lysine Copper complex) is a naturally occurring copper-binding tripeptide found in human plasma, closely related to the more well-known GHK-Cu. The difference is that AHK-Cu has an alanine residue at the N-terminus instead of glycine, giving it distinct binding properties. Like GHK-Cu, it forms a stable complex with copper(II) ions and has been studied for wound healing, tissue regeneration, and anti-inflammatory effects. AHK-Cu penetrates basement membranes effectively due to its small tripeptide size and modulates reactive oxygen species (ROS) that would otherwise degrade collagen scaffolds during wound healing.",
      mechanism: "AHK-Cu binds copper(II) with high affinity through coordination with the histidine imidazole nitrogen, the alanine alpha-amino group, and the deprotonated amide nitrogen. The copper complex is internalised into cells where it modulates cuproenzyme activity including superoxide dismutase (SOD1), lysyl oxidase (collagen cross-linking), and cytochrome c oxidase. AHK-Cu upregulates collagen type I and type III mRNA in fibroblasts, stimulates fibroblast proliferation and migration, and promotes angiogenesis through VEGF induction. It also modulates MMP/TIMP balance and reduces oxidative stress through SOD activation.",
      benefits: [
        "Naturally occurring copper tripeptide found in human plasma — excellent biocompatibility",
        "Stimulates collagen type I and III synthesis in dermal fibroblasts for tissue repair",
        "Antioxidant activity through superoxide dismutase activation",
        "Penetrates basement membranes effectively due to small tripeptide size",
        "Modulates ROS levels during wound healing to protect collagen scaffolds",
        "Anti-inflammatory effects through regulation of cytokine expression",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Ala-His-Lys (AHK)" },
        { label: "Type", value: "Copper-binding tripeptide" },
        { label: "Copper Complex", value: "AHK-Cu(II)" },
        { label: "Molecular Weight", value: "~354 Da (peptide); ~415 Da (Cu complex)" },
        { label: "Length", value: "3 amino acids (tripeptide)" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder (blue-tinted)" },
      ],
      diagramTitle: "AHK-Cu",
      diagramSubtitle: "~415 Da · Copper tripeptide · Ala-His-Lys · Wound healing",
      residues: [
        { x: 40, y: 100, label: "A", color: "#6366f1", name: "Ala" },
        { x: 100, y: 100, label: "H", color: "#0891b2", name: "His" },
        { x: 160, y: 100, label: "K", color: "#8b5cf6", name: "Lys" },
      ],
      legend: "A=Ala  H=His  K=Lys  — Cu²⁺ coordinated by His imidazole",
    },
    indications: {
      mostEffective: [
        { title: "Wound Healing & Tissue Repair", desc: "AHK-Cu stimulates fibroblast proliferation, collagen synthesis, and angiogenesis. The copper complex supports wound contraction and re-epithelialisation through modulation of MMP activity and ROS management." },
        { title: "Collagen Synthesis", desc: "Upregulates collagen type I and type III mRNA expression in dermal fibroblasts, promoting extracellular matrix production and tissue remodelling." },
      ],
      effective: [
        { title: "Antioxidant Protection", desc: "Activates SOD1 and other antioxidant enzymes, reducing oxidative stress and protecting against lipid peroxidation in tissues." },
        { title: "Anti-Inflammatory Effects", desc: "Modulates pro-inflammatory cytokine expression and reduces inflammation in tissue repair models through copper-dependent signalling." },
      ],
      moderate: [
        { title: "Skin Health & Anti-Aging", desc: "Supported collagen production and antioxidant effects make AHK-Cu of interest for dermatological research into skin health and age-related changes." },
      ],
    },
    dosing: {
      note: "AHK-Cu is a research compound used primarily in topical and in-vitro studies. Dosing depends on the research model.",
      rows: [
        { goal: "Topical Research", dose: "1-10 µM in formulation", freq: "1-2× daily", route: "Topical" },
        { goal: "Cell Culture", dose: "1-100 nM", freq: "Per protocol", route: "In vitro" },
        { goal: "Systemic Research", dose: "1-5 mg", freq: "1× daily", route: "SubQ" },
      ],
      tips: [
        "Distinct blue colour due to copper complex — normal and indicates proper copper binding",
        "More stable than GHK-Cu in certain formulations due to alanine substitution",
        "Store lyophilized at 2-8°C, protected from light and moisture",
        "Reconstitute with bacteriostatic water; use within 7-14 days at 2-8°C",
      ],
    },
    interactions: {
      note: "AHK-Cu is a copper carrier similar to GHK-Cu with comparable interaction profiles.",
      cards: [
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Complementary — Both are copper tripeptides with similar mechanisms. AHK-Cu has an alanine N-terminus instead of glycine, offering different stability and penetration profiles for research.", effect: "Complementary" },
        { slug: "tb-500", name: "TB-500", desc: "Supportive — TB-500's actin-mediated cell migration complements AHK-Cu's collagen synthesis for comprehensive tissue repair research.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157's angiogenesis promotion pairs well with AHK-Cu's collagen synthesis in wound healing protocols.", effect: "Supportive" },
      ],
      stackNotes: [
        "AHK-Cu and GHK-Cu are not typically stacked together — they serve similar functions with minor structural differences",
        "Copper peptides should be used with awareness of cumulative copper exposure in research models",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Application", desc: "AHK-Cu begins copper delivery into cells. Fibroblast activation initiated, collagen gene expression upregulated. SOD activity increases. Anti-inflammatory signalling begins.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-14", title: "Collagen Synthesis Phase", desc: "Peak collagen production in fibroblasts. Angiogenic signalling upregulated. Early wound contraction in model systems.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14-28", title: "Tissue Remodelling Phase", desc: "Continued collagen deposition and cross-linking. Wound closure accelerated. MMP/TIMP balance shifts toward matrix remodelling.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Naturally Occurring", text: "AHK-Cu is a naturally occurring copper complex found in human plasma. Its natural presence supports a favourable safety profile.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Copper Overload Risk", text: "Excessive copper administration could theoretically lead to copper overload. Research protocols should account for cumulative copper exposure.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
        { label: "Research Use Only", text: "AHK-Cu is a research compound for laboratory use. Verify purity via COA before use.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      ],
    },
    references: [
      "Pickart L, et al. The human tri-peptide GHK and tissue remodelling. J Biomater Sci Polym Ed. 2008;19(8):969-988.",
      "Maquart FX, et al. Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex. FEBS Lett. 1988;238(2):343-346.",
      "Siméon A, et al. Expression of glycosaminoglycans and small proteoglycans in wounds: modulation by copper peptides. J Invest Dermatol. 2000;115(6):962-968.",
      "Borel JP, et al. Copper and skin: the role of copper peptides. Eur J Dermatol. 2004;14(3):139-144.",
    ],
  },

  "aicar": {
    overview: {
      whatIs: "AICAR (5-aminoimidazole-4-carboxamide ribonucleotide, acadesine) is a nucleoside analogue that activates AMP-activated protein kinase (AMPK), the master cellular energy sensor. Discovered as a research tool in the 1990s, AICAR is one of the most extensively studied pharmacological AMPK activators with over 3,500 publications. Inside cells, AICAR is phosphorylated to ZMP, an AMP analogue that binds directly to the AMPK gamma subunit, activating the kinase without altering cellular ATP levels. AICAR has been investigated for metabolic disorders, exercise performance, cardiac protection, and potential longevity effects.",
      mechanism: "AICAR enters cells via nucleoside transporters and is phosphorylated by adenosine kinase to form ZMP (5-aminoimidazole-4-carboxamide ribotide). ZMP mimics AMP by binding to the gamma regulatory subunit of AMPK, causing a conformational change that activates the kinase even when cellular energy levels are normal. Activated AMPK phosphorylates downstream targets including TSC2, Raptor (inhibiting mTORC1), ACC (inhibiting fatty acid synthesis, promoting fat oxidation), and PGC-1α (promoting mitochondrial biogenesis). This shifts cellular metabolism toward catabolic pathways (glucose uptake, fatty acid oxidation, mitochondrial biogenesis) while inhibiting anabolic processes (protein synthesis, lipogenesis).",
      benefits: [
        "Direct AMPK activator via ZMP mimicry — the most established pharmacological tool for AMPK research",
        "Promotes glucose uptake and fatty acid oxidation through AMPK signalling",
        "Enhances mitochondrial biogenesis via PGC-1α activation",
        "Shown to increase endurance in animal models — studied as an exercise mimetic",
        "Cardioprotective effects in ischemia-reperfusion models",
        "WADA prohibited substance due to potential performance-enhancing effects",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "258.2 Da (AICAR base)" },
        { label: "Formula", value: "C₉H₁₄N₄O₅" },
        { label: "Type", value: "Nucleoside analogue | AMPK activator" },
        { label: "CAS Number", value: "2627-69-2" },
        { label: "Mechanism", value: "Converted to ZMP → AMPK activation" },
        { label: "Half-Life", value: "~2-4 hours (plasma)" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "AICAR (Acadesine)",
      diagramSubtitle: "258.2 Da · Nucleoside AMPK activator · Exercise mimetic",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Nucleoside analogue — intracellular conversion to ZMP activates AMPK",
    },
    indications: {
      mostEffective: [
        { title: "Metabolic Research", desc: "AICAR is the standard pharmacological tool for AMPK activation research. It promotes glucose uptake, fatty acid oxidation, and mitochondrial biogenesis across multiple cell types." },
        { title: "Exercise Physiology", desc: "AICAR has been studied as an exercise mimetic, increasing endurance capacity in animal models through enhanced oxidative metabolism and mitochondrial density." },
      ],
      effective: [
        { title: "Cardioprotection", desc: "AMPK activation by AICAR protects against ischemia-reperfusion injury in cardiac models through enhanced glucose metabolism and reduced apoptosis." },
        { title: "Insulin Sensitivity", desc: "Improves insulin sensitivity by promoting GLUT4 translocation and reducing lipid accumulation in muscle and liver." },
      ],
      moderate: [
        { title: "Neuroprotection", desc: "AMPK activation has context-dependent effects on neuronal survival — both protective and detrimental effects reported depending on experimental conditions." },
      ],
    },
    dosing: {
      note: "AICAR is a research compound with extensive preclinical but limited human data. Dosing varies by research model and application.",
      rows: [
        { goal: "In Vitro AMPK Activation", dose: "0.5-2 mM", freq: "Per protocol", route: "Cell culture" },
        { goal: "Rodent Metabolic Research", dose: "50-500 mg/kg", freq: "1-2× daily IP", route: "IP" },
        { goal: "Human Research (Clinical)", dose: "10-50 mg/kg", freq: "IV infusion", route: "IV" },
      ],
      tips: [
        "AICAR is water-soluble — reconstitute in sterile water or PBS",
        "AMPK activation peaks 1-2 hours after administration",
        "WADA prohibited — not for use in competitive athletes",
        "Store lyophilized at -20°C, protected from moisture",
      ],
    },
    interactions: {
      note: "AICAR primarily interacts with AMPK signalling but has some AMPK-independent effects on purine metabolism.",
      cards: [
        { slug: "metformin", name: "Metformin", desc: "Supportive — Both activate AMPK through different mechanisms. Metformin inhibits complex I of the electron transport chain while AICAR generates ZMP as an AMP mimetic.", effect: "Supportive" },
        { slug: "mots-c", name: "MOTS-c", desc: "Supportive — Both activate AMPK and promote mitochondrial biogenesis through complementary upstream pathways.", effect: "Supportive" },
        { slug: "5-amino-1mq", name: "5-Amino-1MQ", desc: "Supportive — NNMT inhibition preserves NAD+, which supports sirtuin-mediated AMPK activation alongside AICAR's direct AMPK targeting.", effect: "Supportive" },
      ],
      stackNotes: [
        "AICAR has AMPK-independent effects on purine metabolism — account for this in experimental design",
        "AMPK activation is context-dependent — effects may differ between cell types and metabolic states",
        "Combining AMPK activators may produce additive effects on glucose metabolism and fat oxidation",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-3", title: "Acute AMPK Activation", desc: "AICAR is rapidly converted to ZMP intracellularly. AMPK activation peaks within 1-2 hours. Immediate effects on glucose uptake and fatty acid oxidation.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { day: "Day 3-14", title: "Metabolic Adaptation", desc: "Sustained AMPK activation promotes PGC-1α expression and mitochondrial biogenesis. Muscle oxidative capacity increases. Metabolic shift toward fat oxidation.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 14-28", title: "Peak Effect", desc: "Maximum mitochondrial density and oxidative enzyme activity achieved. Endurance improvements in animal models. Metabolic parameters optimised.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Extensively Studied", text: "AICAR has been used in over 3,500 published studies. Its pharmacology and toxicology are well-characterised in preclinical models.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "WADA Prohibited", text: "AICAR is prohibited by the World Anti-Doping Agency (WADA) as a metabolic modulator. Not for use in competitive athletes.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "amber" },
        { label: "AMPK-Independent Effects", text: "AICAR has effects beyond AMPK activation, including modulation of purine and pyrimidine synthesis pathways, which should be considered in experimental interpretation.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
        { label: "Research Use Only", text: "AICAR is a research compound not approved as a therapeutic drug. For laboratory research use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      ],
    },
    references: [
      "Corton JM, et al. 5-aminoimidazole-4-carboxamide ribonucleoside. A specific method for activating AMP-activated protein kinase in intact cells? Eur J Biochem. 1995;229(2):558-565.",
      "Narkar VA, et al. AMPK and PPARδ agonists are exercise mimetics. Cell. 2008;134(3):405-415. doi:10.1016/j.cell.2008.06.051",
      "Merrill GF, et al. AICA riboside increases AMP-activated protein kinase, fatty acid oxidation, and glucose uptake in rat muscle. Am J Physiol. 1997;273(6):E1107-E1112.",
      "Burcelin R, et al. Acute intravenous injection of AICAR improves glucose tolerance in mice. Diabetes. 2002;51(6):1828-1835.",
      "Suzuki T, et al. AICAR in cardiac protection. Circ Res. 2008;102(2):178-185.",
      "Pold R, et al. Long-term AICAR administration reduces metabolic disturbances and lowers blood pressure in rodents. J Clin Invest. 2005;115(8):2161-2170.",
      "Kola B, et al. AICAR and AMPK regulation of metabolic pathways. Mol Cell Endocrinol. 2013;366(2):135-148.",
      "Winder WW, et al. AMPK and exercise. Am J Physiol Endocrinol Metab. 2006;290(1):E15-E21.",
    ],
  },

  "aod-9604": {
    overview: {
      whatIs: "AOD-9604 is a synthetic peptide fragment of human growth hormone (hGH), specifically amino acids 176-191 of the C-terminal region. It was developed in the late 1990s with the explicit goal of isolating hGH's lipolytic (fat-reducing) properties while eliminating its effects on insulin sensitivity, glucose metabolism, and overall growth promotion. Unlike full HGH, AOD-9604 does not stimulate IGF-1 production or affect blood sugar levels, making it a targeted research tool for fat metabolism studies. It has been investigated in clinical trials for obesity treatment and is distinct from the closely related Fragment 176-191.",
      mechanism: "AOD-9604 binds to the hGH receptor and activates the lipolytic signalling cascade through JAK2/STAT and MAPK pathways, but uniquely does not activate the insulin-like growth factor or diabetogenic pathways associated with full-length hGH. It stimulates hormone-sensitive lipase (HSL) and increases cAMP levels in adipocytes, promoting the breakdown of stored triglycerides into free fatty acids and glycerol. This lipolytic effect targets both subcutaneous and visceral adipose tissue. Importantly, AOD-9604 does not affect glucose uptake or insulin sensitivity, as it lacks the structural elements of hGH responsible for these metabolic effects.",
      benefits: [
        "Targeted fat reduction through lipolysis — stimulates HSL and adipocyte triglyceride breakdown",
        "Does not affect IGF-1 production — avoids the growth-promoting effects of full-length hGH",
        "Does not affect insulin sensitivity or glucose metabolism — clean metabolic profile",
        "Can target both subcutaneous and visceral adipose tissue depots",
        "Also stimulates cartilage repair and joint health through local growth factor modulation",
        "Extensively studied with Phase 2 clinical trial data in obesity",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Human GH aa 176-191 (C-terminal fragment)" },
        { label: "Molecular Weight", value: "~1,743 Da" },
        { label: "Length", value: "16 amino acids" },
        { label: "Type", value: "HGH fragment | Lipolytic peptide" },
        { label: "CAS Number", value: "221231-10-3" },
        { label: "Half-Life", value: "~30-60 minutes" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "AOD-9604",
      diagramSubtitle: "16-mer · 1,743 Da · HGH(176-191) fragment · Lipolytic peptide",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "C-terminal fragment of human growth hormone (aa 176-191)",
    },
    indications: {
      mostEffective: [
        { title: "Fat Loss & Lipolysis", desc: "AOD-9604 directly stimulates adipocyte lipolysis through hGH receptor activation of the JAK2/STAT pathway. Clinical studies show significant reductions in total body fat and waist circumference without affecting muscle mass." },
        { title: "Visceral Fat Reduction", desc: "Animal studies demonstrate preferential reduction of visceral adipose tissue. The lipolytic effect targets metabolically harmful visceral fat depots." },
      ],
      effective: [
        { title: "Weight Loss Support", desc: "As an adjunct to caloric restriction and exercise, AOD-9604 may accelerate fat loss by enhancing the body's natural lipolytic response." },
        { title: "Cartilage & Joint Health", desc: "AOD-9604 has been shown to stimulate cartilage repair and proteoglycan synthesis in articular cartilage models, suggesting applications in joint health research." },
      ],
      moderate: [
        { title: "Metabolic Syndrome", desc: "By reducing adipose tissue mass, AOD-9604 may improve metabolic parameters including lipid profiles and inflammatory markers." },
      ],
    },
    dosing: {
      note: "AOD-9604 is a research peptide. Clinical trials used daily subcutaneous dosing. It is not an FDA-approved medication.",
      rows: [
        { goal: "Standard Research", dose: "300-500 mcg", freq: "1-2× daily", route: "SubQ" },
        { goal: "Clinical Trial Dose", dose: "2-4 mg", freq: "1× daily", route: "SubQ" },
        { goal: "Cartilage Research", dose: "1-2 mg", freq: "1× daily", route: "SubQ or local" },
        { goal: "Maintenance Protocol", dose: "300 mcg", freq: "1× daily", route: "SubQ" },
      ],
      tips: [
        "Best taken on an empty stomach for optimal absorption",
        "Can be administered in the morning or before exercise",
        "Rotate injection sites to prevent tissue irritation",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store reconstituted at 2-8°C; use within 28 days",
      ],
    },
    interactions: {
      note: "AOD-9604 is a targeted lipolytic agent with a clean interaction profile due to its lack of IGF-1 and glucose effects.",
      cards: [
        { slug: "fragment-176-191", name: "Fragment 176-191", desc: "Complementary — Both are hGH fragments targeting lipolysis. AOD-9604 has a slightly different structure and may have different stability profiles, making them alternatives rather than stack partners.", effect: "Complementary" },
        { slug: "5-amino-1mq", name: "5-Amino-1MQ", desc: "Supportive — NNMT inhibition preserves SAM and NAD+ for mitochondrial fat oxidation, which may complement AOD-9604's direct lipolytic activation.", effect: "Supportive" },
        { slug: "tesofensine", name: "Tesofensine", desc: "Supportive — Tesofensine reduces appetite through central mechanisms while AOD-9604 enhances peripheral fat breakdown, addressing both sides of energy balance.", effect: "Supportive" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "No known interaction — GHK-Cu's collagen synthesis and AOD-9604's lipolytic effects target different physiological systems.", effect: "Complementary" },
      ],
      stackNotes: [
        "AOD-9604's safety advantage over full HGH is the lack of IGF-1 stimulation and glucose effects",
        "Fat loss effects are typically modest — AOD-9604 is best used as part of a comprehensive metabolic protocol",
        "The difference between AOD-9604 and Fragment 176-191 is primarily in peptide engineering rather than mechanism",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Lipolytic Activation", desc: "Begin daily dosing. AOD-9604 activates HSL in adipocytes, increasing cAMP and initiating triglyceride breakdown. No immediate changes in body composition.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-28", title: "Active Lipolysis Phase", desc: "Sustained lipolytic stimulation increases free fatty acid release from adipose tissue. Early reductions in body fat may become measurable. Waist circumference begins decreasing.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28-84", title: "Sustained Fat Reduction", desc: "Continued use produces progressive fat loss. Maximum effects typically observed after 8-12 weeks of consistent dosing. Blood lipids may improve.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Clinical Trial Tested", text: "AOD-9604 has been tested in Phase 2 clinical trials for obesity with a favourable safety profile. No significant adverse effects attributed to treatment.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "No Glucose Effects", text: "Unlike full-length hGH, AOD-9604 does not affect blood glucose or insulin sensitivity — a key safety advantage for metabolic research.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
        { label: "Mild Side Effects", text: "Minor injection site reactions reported. No significant systemic side effects in clinical studies.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
        { label: "Research Use Only", text: "Not approved by FDA or MHRA as a therapeutic. For research purposes only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      ],
    },
    references: [
      "Heffernan MA, et al. AOD-9604, a novel peptide for the treatment of obesity. Diabetes Obes Metab. 2001;3(1):39-46.",
      "Ng FM, et al. The C-terminal fragment of human growth hormone increases fat mobilisation in obese mice. J Endocrinol. 2000;167(2):297-303.",
      "Ng FM, et al. AOD-9604 stimulates lipolysis in human adipocytes. Int J Obes. 2003;27(Suppl 1):S59.",
      "Hettiarachchi M, et al. The effect of AOD-9604 on weight loss in obese subjects. Obes Res. 2004;12(Suppl):A146.",
      "Heffernan MA, et al. AOD-9604: a novel peptide for obesity treatment. In: Peptides for the New Millennium. 2002;617-620.",
      "Horseman ND, et al. Prolactin and growth hormone: lessons from the C-terminal. J Mammary Gland Biol Neoplasia. 2002;7(1):79-88.",
    ],
  },

  "ara-290": {
    overview: {
      whatIs: "ARA-290 (cibinetide) is an 11-amino-acid synthetic peptide derived from the tissue-protective domain of erythropoietin (EPO). It was engineered by Arain Pharmaceuticals to selectively activate the innate repair receptor (IRR) — a heterodimer of the EPO receptor and the β-common receptor (CD131) — without stimulating erythropoiesis (red blood cell production). This selective activation provides the neuroprotective, anti-inflammatory, and tissue-repair benefits of EPO without the thrombotic and hypertensive risks. ARA-290 has completed Phase 2 clinical trials for sarcoidosis-associated small nerve fibre neuropathy and diabetic neuropathy.",
      mechanism: "ARA-290 binds selectively to the innate repair receptor (IRR), which consists of the EPO receptor (EPOR) and the β-common receptor (βcR/CD131). Unlike full-length EPO which binds the homodimeric EPOR to drive erythropoiesis, ARA-290 requires the βcR subunit for activity, conferring tissue-specific targeting. IRR activation triggers anti-apoptotic signalling via PI3K/AKT and MAPK/ERK pathways, reduces oxidative stress, suppresses pro-inflammatory cytokine production (TNF-α, IL-6), and promotes tissue repair through enhanced angiogenesis and neurotrophic factor production. The result is protection of neurons, endothelial cells, and other tissues from injury and inflammation without stimulating red blood cell production.",
      benefits: [
        "Selective tissue-protective signalling without erythropoiesis — avoids EPO's thrombotic risks",
        "Anti-inflammatory — suppresses TNF-α, IL-6, and other pro-inflammatory cytokines",
        "Neuroprotective — protects peripheral and central neurons from injury and degeneration",
        "Anti-apoptotic — activates PI3K/AKT survival pathways in target tissues",
        "Promotes angiogenesis and tissue repair through enhanced growth factor production",
        "Phase 2 clinical data in sarcoidosis and diabetic neuropathy with good safety profile",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "11 amino acids (EPO helix B domain)" },
        { label: "Type", value: "EPO-derived tissue-protective peptide" },
        { label: "INN", value: "Cibinetide" },
        { label: "Molecular Weight", value: "~1,200 Da (estimated)" },
        { label: "Target", value: "EPOR/βcR (innate repair receptor)" },
        { label: "Half-Life", value: "~10-15 minutes" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
        { label: "Developer", value: "Arain Pharmaceuticals" },
      ],
      diagramTitle: "ARA-290 (Cibinetide)",
      diagramSubtitle: "~1,200 Da · EPO helix B peptide · Tissue-protective · 11-mer",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "EPO-derived peptide targeting the innate repair receptor (EPOR/βcR)",
    },
    indications: {
      mostEffective: [
        { title: "Small Nerve Fibre Neuropathy", desc: "Phase 2 clinical trials in sarcoidosis-associated small nerve fibre neuropathy showed significant improvements in neuropathic symptoms and small fibre density on skin biopsy." },
        { title: "Diabetic Neuropathy", desc: "Phase 2 trials in diabetic peripheral neuropathy demonstrated improvements in nerve fibre density and pain scores. The neuroprotective mechanism targets the underlying nerve damage rather than just symptoms." },
      ],
      effective: [
        { title: "Neuroprotection", desc: "Preclinical studies show protection of neurons from ischemic, traumatic, and inflammatory injury through PI3K/AKT survival signalling and reduced oxidative stress." },
        { title: "Anti-Inflammatory Effects", desc: "Suppresses pro-inflammatory cytokine production in macrophages and microglia through modulation of NF-κB signalling." },
      ],
      moderate: [
        { title: "Tissue Repair & Angiogenesis", desc: "Promotes blood vessel formation and tissue repair through enhanced VEGF and growth factor production in injured tissues." },
        { title: "Ischemia-Reperfusion Injury", desc: "Shown to reduce infarct size in cardiac and cerebral ischemia models through activation of tissue-protective pathways." },
      ],
    },
    dosing: {
      note: "ARA-290 is an investigational peptide that has been studied in Phase 2 clinical trials. Not FDA or MHRA approved.",
      rows: [
        { goal: "Neuropathy (Phase 2)", dose: "4 mg", freq: "1× daily SC × 28 days", route: "SubQ" },
        { goal: "Clinical Trial Dose", dose: "2-4 mg", freq: "1× daily SC", route: "SubQ" },
        { goal: "Preclinical Research", dose: "0.1-1 mg/kg", freq: "1× daily", route: "SubQ or IV" },
      ],
      tips: [
        "Short half-life (~10-15 min) — daily dosing required for sustained effect",
        "Reconstitute with sterile water or bacteriostatic water",
        "Store lyophilized at 2-8°C; use reconstituted immediately or within 24 hours",
        "Monitor clinical endpoints related to neuropathic symptoms and tissue recovery",
      ],
    },
    interactions: {
      note: "ARA-290 targets the EPOR/βcR complex, distinct from other peptide mechanisms.",
      cards: [
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157's tissue repair and angiogenesis effects may complement ARA-290's neuroprotective and anti-inflammatory actions in comprehensive tissue recovery protocols.", effect: "Supportive" },
        { slug: "semax", name: "Semax", desc: "Supportive — Semax provides neuroprotection through BDNF/NGF pathways while ARA-290 targets the EPO receptor complex — complementary neuroprotective mechanisms.", effect: "Supportive" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Supportive — GHK-Cu's anti-inflammatory and antioxidant effects complement ARA-290's tissue-protective signalling.", effect: "Supportive" },
      ],
      stackNotes: [
        "ARA-290 specifically activates the IRR without erythropoiesis — avoid combining with full EPO",
        "The short half-life requires daily or twice-daily dosing for sustained tissue protection",
        "Clinical data suggest ARA-290 is well-tolerated with no significant adverse effects reported",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial Tissue Protection", desc: "Daily SC dosing begins. ARA-290 activates the innate repair receptor, initiating anti-apoptotic and anti-inflammatory signalling. Early suppression of TNF-α and IL-6.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-28", title: "Early Clinical Response", desc: "Phase 2 trials show improvements in neuropathic symptoms within 2-4 weeks. Nerve fibre density begins to improve. Anti-inflammatory effects reach steady state.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28+", title: "Sustained Repair", desc: "Maximum neurotrophic and regenerative effects. Continued improvements in nerve fibre density and symptom scores. Angiogenesis and tissue repair complete.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Phase 2 Clinical Data", text: "ARA-290 has been tested in multiple Phase 2 clinical trials with a favourable safety profile. No erythropoietic stimulation or thrombotic events reported.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "No Erythropoiesis", text: "Unlike full EPO, ARA-290 does not stimulate red blood cell production — a key safety advantage that eliminates thrombotic risk.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
        { label: "Good Tolerability", text: "Well-tolerated across clinical studies with no dose-limiting toxicity. Mild injection site reactions reported.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
        { label: "Research Use Only", text: "ARA-290 is an investigational compound not approved by FDA/MHRA. For research purposes only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      ],
    },
    references: [
      "Brines M, et al. Nonerythropoietic, tissue-protective peptides derived from erythropoietin. Nat Med. 2004;10(4):347-354. doi:10.1038/nm1022",
      "Brines M, et al. ARA 290, a nonerythropoietic peptide engineered from erythropoietin. J Am Soc Nephrol. 2008;19:295A.",
      "Dahan A, et al. ARA-290 improves peripheral nerve fibre function in patients with sarcoidosis. Mol Med. 2013;19:352-358. doi:10.2119/molmed.2013.00056",
      "Heij L, et al. Safety and efficacy of ARA-290 in treating neuropathic symptoms in sarcoidosis. Sarcoidosis Vasc Diffuse Lung Dis. 2015;32(4):336-342.",
      "Swanson BJ, et al. ARA-290 in diabetic neuropathy: a Phase 2 study. J Diabetes Res. 2016;2016:8234567.",
      "Collino M, et al. ARA-290 protects against renal ischemia-reperfusion injury. J Am Soc Nephrol. 2011;22:653A.",
      "Robertson CS, et al. ARA-290 in traumatic brain injury models. J Neurotrauma. 2012;29(10):A130.",
    ],
  },

  "b7-33": {
    overview: {
      whatIs: "B7-33 is a synthetic 33-amino-acid biased agonist peptide derived from the relaxin B-chain, designed to selectively activate the relaxin receptor RXFP1 through biased signalling. Unlike native relaxin (H2 relaxin), which activates both cAMP and ERK pathways, B7-33 is engineered to preferentially activate ERK signalling while minimising cAMP activation. This biased signalling profile is significant because cAMP activation by relaxin has been associated with potential carcinogenic effects, while ERK activation mediates the desirable anti-fibrotic and vasoprotective effects. B7-33 has been studied extensively for anti-fibrotic applications in cardiac, renal, and pulmonary fibrosis.",
      mechanism: "B7-33 binds to the relaxin family peptide receptor 1 (RXFP1) but activates downstream signalling with a distinct bias compared to native relaxin. It preferentially activates ERK1/2 MAPK signalling over the cAMP/PKA pathway. The ERK-biased activation leads to upregulation of matrix metalloproteinases (MMPs), downregulation of tissue inhibitors of metalloproteinases (TIMPs), and suppression of TGF-β-induced SMAD2/3 phosphorylation — all key anti-fibrotic mechanisms. The reduced cAMP activation is hypothesised to avoid the potential tumour-promoting effects associated with relaxin's cAMP signalling. B7-33 also promotes vasodilation through endothelial nitric oxide (NO) production, contributing to its vasoprotective profile.",
      benefits: [
        "Selective ERK-biased RXFP1 agonism — anti-fibrotic without pro-cancer cAMP signalling",
        "Potent anti-fibrotic effects in cardiac, renal, pulmonary, and dermal fibrosis models",
        "Suppresses TGF-β-induced fibroblast activation and extracellular matrix deposition",
        "Promotes vasodilation and endothelial function through NO production",
        "Reduces fibrotic encapsulation of implanted biomedical devices in preclinical studies",
        "Extensively studied with peer-reviewed publications from multiple independent laboratories",
      ],
    },
    molecular: {
      items: [
        { label: "Length", value: "33 amino acids" },
        { label: "Type", value: "Synthetic relaxin B-chain analogue | Biased RXFP1 agonist" },
        { label: "Molecular Weight", value: "~3,700 Da (estimated)" },
        { label: "Target", value: "RXFP1 (relaxin family peptide receptor 1)" },
        { label: "Signalling Bias", value: "ERK > cAMP (biased toward ERK)" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "B7-33",
      diagramSubtitle: "33-mer · ~3,700 Da · Biased RXFP1 agonist · Anti-fibrotic",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Relaxin B-chain analogue with biased ERK/cAMP signalling",
    },
    indications: {
      mostEffective: [
        { title: "Cardiac Fibrosis", desc: "B7-33 reduces cardiac fibroblast activation and extracellular matrix deposition in models of heart failure and myocardial infarction. Suppresses TGF-β1-induced collagen production and promotes MMP expression." },
        { title: "Renal Fibrosis", desc: "Preclinical studies show B7-33 attenuates renal fibrosis in models of chronic kidney disease by reducing SMAD2/3 phosphorylation and ECM deposition in the renal interstitium." },
      ],
      effective: [
        { title: "Pulmonary Fibrosis", desc: "Reduces bleomycin-induced lung fibrosis through suppression of fibroblast activation and collagen deposition while preserving alveolar architecture." },
        { title: "Dermal Fibrosis & Wound Healing", desc: "B7-33 reduces scar formation and fibrotic encapsulation in skin wound models. Coatings releasing B7-33 from biomedical devices reduce fibrotic capsule formation." },
      ],
      moderate: [
        { title: "Vasoprotection & Cardiovascular", desc: "Promotes endothelial NO production and improves vascular compliance, with potential applications in hypertension and vascular disease research." },
      ],
    },
    dosing: {
      note: "B7-33 is a research peptide. Dosing varies by research model and indication.",
      rows: [
        { goal: "Rodent Fibrosis Research", dose: "0.5-2 mg/kg", freq: "1× daily SC", route: "SubQ" },
        { goal: "Device Coating Study", dose: "Local release", freq: "Sustained", route: "Local/Implant" },
        { goal: "In Vitro", dose: "1-100 nM", freq: "Per protocol", route: "In vitro" },
      ],
      tips: [
        "Reconstitute with sterile water or PBS, pH-adjusted for stability",
        "Store lyophilized at -20°C; use reconstituted immediately",
        "B7-33 is sensitive to proteolysis — consider sustained delivery systems for chronic studies",
        "Monitor fibrosis markers (collagen content, SMAD2/3 phosphorylation, MMP/TIMP balance)",
      ],
    },
    interactions: {
      note: "B7-33 targets the RXFP1 receptor with biased ERK signalling, distinct from other peptides.",
      cards: [
        { slug: "tb-500", name: "TB-500", desc: "Supportive — TB-500's actin remodelling and tissue repair effects complement B7-33's anti-fibrotic mechanism in comprehensive tissue health research.", effect: "Supportive" },
        { slug: "bpc-157", name: "BPC-157", desc: "Supportive — BPC-157 promotes healing and reduces inflammation, which may complement B7-33's anti-fibrotic effects in tissue repair models.", effect: "Supportive" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Complementary — GHK-Cu promotes collagen synthesis while B7-33 reduces fibrosis. Combined use may help achieve balanced tissue remodelling.", effect: "Complementary" },
      ],
      stackNotes: [
        "B7-33's biased signalling (ERK > cAMP) is its key advantage over native relaxin — avoids potential tumour promotion",
        "Anti-fibrotic effects are mediated through TGF-β/SMAD pathway modulation",
        "Consider route of administration — local delivery may be preferred for targeted anti-fibrotic effects",
      ],
    },
    timeline: {
      phases: [
        { day: "Day 1-7", title: "Initial RXFP1 Activation", desc: "B7-33 binds RXFP1 and activates ERK-biased signalling. Early suppression of TGF-β-induced SMAD2/3 phosphorylation begins. Anti-fibrotic gene expression programme initiated.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 7-28", title: "Anti-Fibrotic Remodelling", desc: "MMP upregulation and TIMP downregulation promote ECM degradation. Fibroblast activation markers (α-SMA, collagen I) significantly reduced. Vasodilation through NO production supports improved tissue perfusion.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { day: "Day 28+", title: "Sustained Fibrosis Reduction", desc: "Maximal anti-fibrotic effect achieved. Tissue architecture improved with reduced collagen deposition. Functional improvements in organ function in fibrosis models.", color: "purple", icon: "M5 13l4 4L19 7" },
      ],
    },
    safety: {
      cards: [
        { label: "Preclinical Safety", text: "B7-33 has been studied in multiple preclinical models with no significant toxicity reported. The biased signalling profile avoids the pro-cancer concerns associated with native relaxin.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
        { label: "Biased Signalling Advantage", text: "B7-33's ERK-biased signalling is designed to retain anti-fibrotic efficacy while minimising potential adverse effects from cAMP activation, including tumour promotion.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", color: "emerald" },
        { label: "Research Use Only", text: "B7-33 is a research peptide not approved for therapeutic use. For laboratory research only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      ],
    },
    references: [
      "Hossain MA, et al. The relaxin B-chain peptide B7-33 as a biased RXFP1 agonist. J Biol Chem. 2016;291(14):7448-7460. doi:10.1074/jbc.M115.708925",
      "Samuel CS, et al. B7-33: a biased RXFP1 agonist for anti-fibrotic therapy. Front Pharmacol. 2017;8:717. doi:10.3389/fphar.2017.00717",
      "Pini A, et al. B7-33 attenuates renal fibrosis in a mouse model of chronic kidney disease. Nephrol Dial Transplant. 2019;34(Suppl 1):S360.",
      "Welch NG, et al. Coatings releasing the relaxin peptide analogue B7-33 reduce fibrotic encapsulation. ACS Biomater Sci Eng. 2020;6(9):5083-5092.",
      "Bathgate RAD, et al. Relaxin family peptides and their receptors. Physiol Rev. 2013;93(1):405-480. doi:10.1152/physrev.00001.2012",
      "Mookerjee I, et al. B7-33 reduces cardiac fibrosis and improves function in a mouse model. J Mol Cell Cardiol. 2021;152:35-46.",
      "Ghosh A, et al. B7-33 for pulmonary fibrosis: a biased RXFP1 approach. Pulm Pharmacol Ther. 2022;74:102120.",
      "Chen L, et al. Dual-functional nanovesicles deliver B7-33 for antifibrotic therapy. J Nanobiotechnology. 2025;23:318. doi:10.1186/s12951-025-03833-w",
    ],
  },

  "bronchogen": {
    overview: {
      whatIs: "Bronchogen is a synthetic tetrapeptide (AEDL: Ala-Glu-Asp-Leu) developed by Russian researchers as part of the Khavinson bioregulator peptide family. It is designed to target lung tissue specifically, acting through direct DNA interaction to normalise gene expression in bronchial epithelial cells. With over 30 years of research, Bronchogen has been studied for its effects on respiratory function, lung tissue regeneration, and protection against pulmonary inflammation. It belongs to the class of peptide bioregulators that are tissue-specific and work by binding to DNA to regulate gene transcription.",
      mechanism: "Bronchogen's mechanism is unique among peptides — it acts primarily through direct DNA interaction rather than receptor binding. The tetrapeptide sequence AEDL binds to specific regions of DNA in lung epithelial cells, stabilising chromatin structure and normalising gene expression patterns. This epigenetic modulation restores proper cellular function in ageing or damaged lung tissue by upregulating genes involved in tissue repair and antioxidant defence while downregulating pro-inflammatory genes. Bronchogen also reduces oxidative stress in pulmonary tissues and supports the regeneration of bronchial epithelium.",
      benefits: [
        "Tissue-specific DNA interaction — targets lung tissue through epigenetic gene regulation",
        "Restores normal gene expression patterns in ageing or damaged bronchial epithelium",
        "Reduces pulmonary inflammation through modulation of cytokine gene expression",
        "Supports regeneration of bronchial epithelial cells and lung tissue architecture",
        "Antioxidant effects in pulmonary tissues — reduces oxidative damage",
        "Over 30 years of research as part of the Khavinson bioregulator programme",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Ala-Glu-Asp-Leu (AEDL)" },
        { label: "Length", value: "4 amino acids (tetrapeptide)" },
        { label: "Type", value: "Synthetic bioregulator | Lung-specific" },
        { label: "Molecular Weight", value: "~447 Da" },
        { label: "Mechanism", value: "DNA interaction / Epigenetic regulation" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Bronchogen",
      diagramSubtitle: "4-mer · ~447 Da · Tetrapeptide · Sequence: AEDL",
      residues: [
        { x: 35, y: 100, label: "A", color: "#6366f1", name: "Ala" },
        { x: 80, y: 100, label: "E", color: "#0891b2", name: "Glu" },
        { x: 125, y: 100, label: "D", color: "#d97706", name: "Asp" },
        { x: 170, y: 100, label: "L", color: "#8b5cf6", name: "Leu" },
      ],
      legend: "A=Ala  E=Glu  D=Asp  L=Leu",
    },
    indications: {
      mostEffective: [
        { title: "Lung Tissue Regeneration", desc: "Bronchogen normalises gene expression in bronchial epithelial cells, promoting regeneration of lung tissue and restoration of normal respiratory function." },
        { title: "Pulmonary Inflammation", desc: "Reduces pro-inflammatory cytokine expression in lung tissue through epigenetic modulation, supporting respiratory health in inflammatory conditions." },
      ],
      effective: [
        { title: "COPD & Chronic Lung Conditions", desc: "Bronchogen has been studied for its potential to improve lung function in chronic obstructive pulmonary disease and other chronic respiratory conditions." },
        { title: "Antioxidant Protection", desc: "Upregulates antioxidant enzyme expression in lung tissue, reducing oxidative damage from environmental toxins and ageing." },
      ],
      moderate: [
        { title: "Age-Related Respiratory Decline", desc: "By restoring youthful gene expression patterns in lung tissue, Bronchogen may have applications in research on age-related respiratory decline." },
      ],
    },
    dosing: {
      note: "Bronchogen is a research peptide from the Khavinson bioregulator programme typically used in short courses.",
      rows: [
        { goal: "Standard Research", dose: "5-10 mg", freq: "1× daily", route: "SubQ or IM" },
        { goal: "Bioregulator Protocol", dose: "5-10 mg", freq: "1× daily × 10-20 days", route: "SubQ or IM" },
      ],
      tips: [
        "Typically used in short courses (10-20 days) rather than continuous dosing",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store lyophilized at 2-8°C; reconstituted solution stable for 7-14 days",
      ],
    },
    interactions: { note: "Bronchogen is a DNA-interacting bioregulator with minimal known peptide interactions.",
      cards: [
        { slug: "chonliten", name: "Chonluten", desc: "Supportive — Both are Khavinson bioregulators. Chonluten targets similar pulmonary pathways and may be used complementarily in respiratory research.", effect: "Supportive" },
        { slug: "thymalin", name: "Thymalin", desc: "Supportive — Thymalin is another Khavinson bioregulator that supports immune function, complementing Bronchogen's lung tissue targeting.", effect: "Supportive" },
      ],
      stackNotes: ["Khavinson bioregulators are typically used in short cycles rather than continuous dosing", "Consider alternating bioregulator cycles for comprehensive tissue targeting"],
    },
    timeline: { phases: [
      { day: "Day 1-10", title: "Initial Course", desc: "Daily dosing initiates DNA binding and gene expression normalisation in lung tissue. Early anti-inflammatory effects begin within the first week.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 10-20", title: "Sustained Effect", desc: "Continued normalisation of gene expression. Pulmonary function improvements become measurable. Antioxidant enzyme levels increased.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 20+", title: "Post-Cycle", desc: "Standard 10-20 day cycle completed. Effects may persist for weeks to months due to epigenetic mechanism.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Well-Tolerated", text: "Bronchogen has a good safety profile in research use. No significant adverse effects have been reported in published studies.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
      { label: "Research Use Only", text: "Bronchogen is a research peptide not approved by regulatory bodies. For laboratory use only.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Khavinson VK, et al. Peptide regulation of gene expression. Bull Exp Biol Med. 2008;145(6):754-756.",
      "Khavinson VK, et al. Tetrapeptide AEDL normalizes gene expression in lung tissue. Adv Gerontol. 2012;25(1):113-118.",
      "Khavinson VK, et al. Peptide bioregulators in gerontology. Bull Exp Biol Med. 2015;159(4):501-505.",
      "Korkushko OV, et al. Peptide bioregulators in the treatment of respiratory diseases. Klin Med. 2010;88(3):42-46.",
    ],
  },

  "cartalax": {
    overview: {
      whatIs: "Cartalax is a synthetic tripeptide (AED: Ala-Glu-Asp) from the Khavinson bioregulator family, specifically developed for cartilage and connective tissue health. It is part of a class of short peptide bioregulators that target specific tissues through epigenetic modulation — binding to DNA to normalise age-related changes in gene expression. Cartalax has been studied for cartilage regeneration, joint health, and connective tissue repair, with research suggesting it promotes chondrocyte function and extracellular matrix synthesis.",
      mechanism: "Cartalax acts through direct interaction with DNA in cartilage cells (chondrocytes), binding to specific gene promoter regions to normalise age-related changes in gene expression. It upregulates genes involved in collagen type II synthesis, proteoglycan production, and chondrocyte proliferation, while downregulating inflammatory mediators and matrix-degrading enzymes (MMPs). This epigenetic regulation restores chondrocyte function, promotes extracellular matrix synthesis, and supports cartilage regeneration.",
      benefits: [
        "Tissue-specific DNA interaction targeting chondrocyte gene expression",
        "Promotes collagen type II and proteoglycan synthesis in cartilage",
        "Downregulates inflammatory mediators and matrix-degrading MMPs",
        "Supports cartilage regeneration and joint function",
        "Epigenetic mechanism of action — effects may persist after cycle completion",
        "Part of the well-established Khavinson bioregulator research programme",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Ala-Glu-Asp (AED)" },
        { label: "Length", value: "3 amino acids (tripeptide)" },
        { label: "Type", value: "Synthetic bioregulator | Cartilage-specific" },
        { label: "Molecular Weight", value: "~332 Da" },
        { label: "Mechanism", value: "DNA interaction / Epigenetic regulation" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Cartalax",
      diagramSubtitle: "3-mer · ~332 Da · Tripeptide · Sequence: AED",
      residues: [
        { x: 35, y: 100, label: "A", color: "#6366f1", name: "Ala" },
        { x: 90, y: 100, label: "E", color: "#0891b2", name: "Glu" },
        { x: 145, y: 100, label: "D", color: "#d97706", name: "Asp" },
      ],
      legend: "A=Ala  E=Glu  D=Asp",
    },
    indications: {
      mostEffective: [
        { title: "Cartilage Regeneration", desc: "Cartalax promotes chondrocyte function and extracellular matrix synthesis. Studies suggest it supports cartilage repair and may slow age-related degeneration." },
        { title: "Joint Health", desc: "By supporting cartilage integrity and reducing inflammatory mediators, Cartalax has been studied for joint health in age-related osteoarthritis models." },
      ],
      effective: [
        { title: "Connective Tissue Repair", desc: "Supports collagen and proteoglycan synthesis in connective tissues, with potential applications in ligament and tendon research." },
      ],
      moderate: [
        { title: "Anti-Aging Applications", desc: "As a bioregulator that normalises age-related gene expression changes, Cartalax has been studied within the geroprotective research framework." },
      ],
    },
    dosing: {
      note: "Cartalax is a research bioregulator used in short courses.",
      rows: [
        { goal: "Standard Research", dose: "5-10 mg", freq: "1× daily", route: "SubQ or IM" },
        { goal: "Bioregulator Protocol", dose: "5-10 mg", freq: "1× daily × 10-20 days", route: "SubQ or IM" },
      ],
      tips: [
        "Short courses of 10-20 days are standard for bioregulator peptides",
        "Reconstitute with bacteriostatic water — swirl gently, never shake",
        "Store lyophilized at 2-8°C",
      ],
    },
    interactions: { note: "Cartalax is a tissue-specific bioregulator.",
      cards: [
        { slug: "chonliten", name: "Chonluten", desc: "Complementary — Cartalax targets cartilage while Chonluten targets respiratory tissue, addressing different connective tissue research areas.", effect: "Complementary" },
        { slug: "ghk-cu", name: "GHK-Cu", desc: "Supportive — GHK-Cu's collagen synthesis effects complement Cartalax's chondrocyte-targeting mechanism.", effect: "Supportive" },
      ],
      stackNotes: ["Bioregulator peptides are typically used in alternating cycles rather than simultaneously"],
    },
    timeline: { phases: [
      { day: "Day 1-10", title: "Initial Course", desc: "Daily dosing initiates DNA binding in chondrocytes. Gene expression normalisation begins. Early modulation of cartilage matrix synthesis.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 10-20", title: "Active Remodelling", desc: "Sustained promotion of collagen II and proteoglycan synthesis. MMP activity reduced. Joint function improvements may become measurable.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 20+", title: "Post-Cycle", desc: "Standard 10-20 day cycle completed. Effects may persist due to epigenetic mechanism of action.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Well-Tolerated", text: "Cartalax has a favourable safety profile in research use as a short bioregulator peptide.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
      { label: "Research Use Only", text: "For laboratory research only. Not approved by regulatory bodies.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Khavinson VK, et al. Tripeptide AED stimulates cartilage regeneration. Bull Exp Biol Med. 2013;155(6):777-780.",
      "Khavinson VK, et al. Peptide regulation of chondrocyte function. Adv Gerontol. 2014;27(2):310-315.",
      "Khavinson VK, et al. Cartalax in the treatment of osteoarthritis. Ter Arkh. 2015;87(5):76-80.",
    ],
  },

  "cerebrolysin": {
    overview: {
      whatIs: "Cerebrolysin is a complex mixture of low-molecular-weight neuropeptides and amino acids derived from porcine brain tissue through enzymatic hydrolysis. It contains brain-derived neurotrophic factor (BDNF), glial cell line-derived neurotrophic factor (GDNF), nerve growth factor (NGF), and ciliary neurotrophic factor (CNTF) among other active fragments. Approved in over 45 countries for stroke, dementia, and traumatic brain injury, Cerebrolysin is one of the most extensively studied neuropeptide preparations in clinical neurology.",
      mechanism: "Cerebrolysin provides multiple neurotrophic factors that cross the partially compromised blood-brain barrier and activate Trk receptors (TrkA, TrkB, TrkC) on neurons. This triggers PI3K/AKT and MAPK/ERK survival signalling, promotes synaptic plasticity through BDNF-mediated CREB phosphorylation, reduces excitotoxicity by modulating glutamate receptor activity, and suppresses neuroinflammation by downregulating pro-inflammatory cytokines. The combined effect is enhanced neuronal survival, synaptogenesis, neurogenesis, and functional recovery after neurological injury.",
      benefits: [
        "Provides BDNF, GDNF, NGF, and CNTF in a single pharmacological preparation",
        "Approved in 45+ countries for stroke, dementia, and TBI — extensive clinical validation",
        "Promotes neuronal survival, synaptic plasticity, and neurogenesis",
        "Reduces excitotoxicity and neuroinflammation",
        "Improves functional recovery after ischemic stroke and traumatic brain injury",
        "Well-characterised safety profile with decades of clinical use",
      ],
    },
    molecular: {
      items: [
        { label: "Type", value: "Complex neuropeptide mixture" },
        { label: "Source", value: "Porcine brain enzymatic hydrolysate" },
        { label: "Active Factors", value: "BDNF, GDNF, NGF, CNTF fragments" },
        { label: "Molecular Weight", value: "<10 kDa (peptide fragments)" },
        { label: "Half-Life", value: "~5 minutes (plasma)" },
        { label: "Purity", value: "Pharmaceutical grade" },
        { label: "Form", value: "Solution for injection" },
      ],
      diagramTitle: "Cerebrolysin",
      diagramSubtitle: "Neuropeptide complex · BDNF, GDNF, NGF, CNTF · 45+ countries approved",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Complex mixture of low-MW neuropeptides from porcine brain",
    },
    indications: {
      mostEffective: [
        { title: "Stroke Recovery", desc: "Multiple clinical trials show Cerebrolysin improves functional recovery after ischemic stroke. Meta-analyses demonstrate improved motor function and reduced disability." },
        { title: "Dementia & Cognitive Decline", desc: "Approved for Alzheimer's disease and vascular dementia in many countries. Improves cognitive function, activities of daily living, and global clinical ratings." },
      ],
      effective: [
        { title: "Traumatic Brain Injury", desc: "Clinical evidence supports improved outcomes after TBI, with reduced cognitive impairment and faster functional recovery." },
        { title: "Neuroprotection", desc: "Provides broad neuroprotection against excitotoxicity, oxidative stress, and apoptosis through neurotrophic factor activity." },
      ],
      moderate: [
        { title: "Cognitive Enhancement", desc: "Studied for general cognitive enhancement in healthy populations, though evidence is strongest in pathological conditions." },
      ],
    },
    dosing: {
      note: "Cerebrolysin is an approved medication in many countries. Standard dosing varies by indication.",
      rows: [
        { goal: "Stroke Recovery", dose: "10-50 mL", freq: "1× daily IV × 10-20 days", route: "IV" },
        { goal: "Alzheimer's Disease", dose: "10-30 mL", freq: "1× daily IV × 4-6 weeks", route: "IV" },
        { goal: "Neurological Research", dose: "5-10 mL", freq: "1× daily IM or IV", route: "IM/IV" },
      ],
      tips: [
        "Slow IV infusion recommended — rapid administration may cause headache or flushing",
        "Cycles of 10-20 days followed by washout are standard",
        "Not FDA-approved — available by prescription in 45+ countries outside the US",
      ],
    },
    interactions: {
      note: "Cerebrolysin has been studied alongside many neurotropic compounds.",
      cards: [
        { slug: "semax", name: "Semax", desc: "Supportive — Both provide neurotrophic support through different pathways. Cerebrolysin provides BDNF/GDNF/NGF complex, Semax activates TrkB signalling.", effect: "Supportive" },
        { slug: "selank", name: "Selank", desc: "Supportive — Selank's anxiolytic and GABAergic effects complement Cerebrolysin's neurotrophic actions in comprehensive neuroprotection research.", effect: "Supportive" },
        { slug: "dihexa", name: "Dihexa", desc: "Supportive — Dihexa's HGF/Met synaptogenesis mechanism is distinct from Cerebrolysin's neurotrophin pathways, offering complementary cognitive research tools.", effect: "Supportive" },
      ],
      stackNotes: [
        "Cerebrolysin cycles are typically 10-20 days, 2-4× per year",
        "Combining multiple neurotrophic agents may have additive effects in neuroprotection models",
      ],
    },
    timeline: { phases: [
      { day: "Day 1-5", title: "Initiation", desc: "Daily IV infusion begins. Neurotrophic factors reach CNS via partially intact BBB. Early neuroprotective signalling initiated.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { day: "Day 5-20", title: "Active Neuroprotection", desc: "Sustained neurotrophin signalling supports synaptic plasticity, neurogenesis, and functional recovery. Maximum effect typically at end of cycle.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 20+", title: "Post-Cycle", desc: "Neurotrophic effects persist for weeks after the cycle. Many patients undergo 2-4 cycles per year.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Extensively Studied", text: "Cerebrolysin has been studied in hundreds of clinical trials with a well-characterised safety profile. Approved in 45+ countries.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
      { label: "Mild Side Effects", text: "Headache, dizziness, flushing at injection site are the most common side effects. Rare cases of seizures in susceptible individuals.", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue" },
      { label: "Not FDA Approved", text: "Not approved by the FDA for use in the US. Available in 45+ countries including EU, China, Russia, and Middle East.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Alvarez XA, et al. Cerebrolysin in Alzheimer's disease. Eur J Neurol. 2011;18(Suppl 1):5-10.",
      "Bornstein NM, et al. Cerebrolysin in acute ischemic stroke. Stroke. 2005;36(10):2182-2186.",
      "Chen N, et al. Cerebrolysin for vascular dementia. Cochrane Database Syst Rev. 2013;1:CD008900.",
      "Muresanu DF, et al. Cerebrolysin in traumatic brain injury. J Neurotrauma. 2012;29(8):1559-1566.",
      "Rockenstein E, et al. Cerebrolysin in Alzheimer's: preclinical evidence. J Neural Transm. 2006;113(1):99-113.",
    ],
  },

  "chonliten": {
    overview: {
      whatIs: "Chonluten (T-34) is a synthetic tripeptide (Gln-Glu-Asp) from the Khavinson bioregulator family, designed to target pulmonary tissue. It regulates genes related to inflammation, antioxidant activity, and cell proliferation in lung tissue. Chonluten inhibits TNF production in monocytes and has been studied as a potential geroprotective agent for supporting lung function. It belongs to the same class of short peptide bioregulators as Bronchogen but with a different amino acid sequence.",
      mechanism: "Chonluten acts through direct DNA interaction in lung epithelial cells, binding to specific gene promoter regions to normalise age-related changes in gene expression. It upregulates genes encoding antioxidant enzymes and downregulates pro-inflammatory genes including TNF-α. This epigenetic modulation restores normal cellular function in ageing or damaged lung tissue, reducing inflammation and oxidative stress while supporting cellular regeneration.",
      benefits: [
        "Tissue-specific DNA interaction targeting pulmonary gene expression",
        "Inhibits TNF-α production in monocytes — key anti-inflammatory mechanism",
        "Upregulates antioxidant enzyme expression in lung tissue",
        "Supports pulmonary function and respiratory health through gene regulation",
        "Part of the well-established Khavinson bioregulator research programme",
        "Geroprotective potential — studied for age-related respiratory decline",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Gln-Glu-Asp (QED)" },
        { label: "Length", value: "3 amino acids (tripeptide)" },
        { label: "Type", value: "Synthetic bioregulator | Pulmonary" },
        { label: "Molecular Weight", value: "~389 Da" },
        { label: "Mechanism", value: "DNA interaction / Epigenetic regulation" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Chonluten",
      diagramSubtitle: "3-mer · ~389 Da · Tripeptide · Sequence: QED",
      residues: [
        { x: 35, y: 100, label: "Q", color: "#6366f1", name: "Gln" },
        { x: 90, y: 100, label: "E", color: "#0891b2", name: "Glu" },
        { x: 145, y: 100, label: "D", color: "#d97706", name: "Asp" },
      ],
      legend: "Q=Gln  E=Glu  D=Asp",
    },
    indications: {
      mostEffective: [
        { title: "Pulmonary Health", desc: "Chonluten regulates gene expression in lung tissue, supporting respiratory function through anti-inflammatory and antioxidant mechanisms." },
        { title: "COPD & Chronic Lung Disease", desc: "Research suggests Chonluten may improve lung function markers in chronic respiratory conditions through TNF inhibition and gene regulation." },
      ],
      effective: [
        { title: "Anti-Inflammatory Effects", desc: "Inhibits TNF-α production in monocytes and reduces pro-inflammatory cytokine expression in pulmonary tissues." },
        { title: "Antioxidant Protection", desc: "Upregulates antioxidant enzymes in lung tissue, protecting against oxidative damage." },
      ],
      moderate: [
        { title: "Geroprotective Research", desc: "As a Khavinson bioregulator, Chonluten has been studied for its potential to slow age-related respiratory decline." },
      ],
    },
    dosing: {
      note: "Chonluten is a research bioregulator used in short courses of 10-20 days.",
      rows: [
        { goal: "Standard Research", dose: "5-10 mg", freq: "1× daily", route: "SubQ or IM" },
      ],
      tips: [
        "Short courses typical — 10-20 days followed by 3-6 month break",
        "Reconstitute with bacteriostatic water, store at 2-8°C",
      ],
    },
    interactions: {
      note: "Chonluten is a DNA-interacting bioregulator with specific pulmonary targeting.",
      cards: [
        { slug: "bronchogen", name: "Bronchogen", desc: "Complementary — Both target lung tissue through different bioregulator sequences. May be used in alternating cycles.", effect: "Complementary" },
        { slug: "thymalin", name: "Thymalin", desc: "Supportive — Thymalin's immune-supporting effects complement Chonluten's pulmonary targeting.", effect: "Supportive" },
      ],
      stackNotes: ["Bioregulator peptides are typically cycled rather than used continuously"],
    },
    timeline: { phases: [
      { day: "Day 1-10", title: "Initial Course", desc: "DNA binding initiates gene expression changes in lung tissue. TNF-α inhibition begins. Early anti-inflammatory effects.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 10-20", title: "Sustained Modulation", desc: "Continued gene regulation supports pulmonary function. Antioxidant enzyme levels increase. Inflammatory markers reduced.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ]},
    safety: { cards: [
      { label: "Well-Tolerated", text: "Good safety profile in research studies as a short-course bioregulator.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      { label: "Research Use Only", text: "Research peptide not approved by regulatory bodies.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Khavinson VK, et al. Tripeptide regulation of pulmonary gene expression. Bull Exp Biol Med. 2010;149(4):475-478.",
      "Khavinson VK, et al. Chonluten: a bioregulator for respiratory health. Adv Gerontol. 2012;25(4):692-696.",
      "Kuznik BI, et al. Peptide bioregulators in pulmonology. Pulmonologiya. 2015;25(2):203-208.",
    ],
  },

  "cjc-1295-with-dac": {
    overview: {
      whatIs: "CJC-1295 with DAC (Drug Affinity Complex) is the long-acting version of the CJC-1295 GHRH analogue. It incorporates a maleimidopropionic acid (DAC) moiety that covalently binds to cysteine-34 of circulating albumin, extending its plasma half-life from approximately 30 minutes (without DAC) to approximately 6-8 days. This modification allows for once or twice weekly dosing while maintaining sustained GH release. CJC-1295 with DAC is a 29-amino-acid modified GHRH(1-29) analogue with four amino acid substitutions for enhanced stability and potency.",
      mechanism: "CJC-1295 with DAC binds to GHRH receptors on pituitary somatotrophs, activating the cAMP/PKA cascade to stimulate GH gene transcription and pulsatile GH release. The DAC moiety covalently bonds to albumin via Michael addition to cysteine-34, creating a circulating reservoir that slowly releases active peptide. This albumin binding extends the half-life from ~30 minutes to 6-8 days, maintaining sustained GH pulse enhancement. The gradual release profile preserves the natural pulsatility of GH secretion.",
      benefits: [
        "Long-acting GHRH agonism with 6-8 day half-life — once or twice weekly dosing",
        "Sustained GH pulse enhancement through albumin-bound reservoir",
        "Preserves natural GH pulsatility — more physiological than continuous GH exposure",
        "Supports lean mass development, recovery, and metabolic rate",
        "Preferred for chronic GH axis research due to reduced injection frequency",
        "Well-studied in combination with GHRP compounds for synergistic GH release",
      ],
    },
    molecular: {
      items: [
        { label: "Molecular Weight", value: "~3,651 Da (with DAC)" },
        { label: "Sequence", value: "YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH₂ (with DAC)" },
        { label: "Length", value: "29 amino acids" },
        { label: "Type", value: "GHRH analogue | DAC-modified | Long-acting" },
        { label: "Half-Life", value: "6-8 days (albumin-bound)" },
        { label: "Modification", value: "DAC (Drug Affinity Complex) — maleimidopropionic acid" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "CJC-1295 with DAC",
      diagramSubtitle: "29-mer · ~3,651 Da · Albumin-binding DAC · Half-life 6-8 days",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "GHRH(1-29) analogue with DAC moiety for albumin binding",
    },
    indications: {
      mostEffective: [
        { title: "Sustained GH Release", desc: "Long-acting GH stimulation with 6-8 day half-life. A single injection maintains elevated GH pulsatility for up to 11 days." },
        { title: "Muscle Growth & Recovery", desc: "Sustained GH/IGF-1 elevation supports lean mass development and enhanced recovery between weekly doses." },
      ],
      effective: [
        { title: "Anti-Aging", desc: "Restores GH pulsatility patterns with minimal dosing frequency — ideal for chronic GH restoration studies." },
        { title: "Fat Loss", desc: "GH-mediated lipolysis through sustained elevation of growth hormone and metabolic rate." },
      ],
      moderate: [
        { title: "Bone Density", desc: "Sustained IGF-1 elevation supports osteoblast activity in long-term research protocols." },
      ],
    },
    dosing: {
      note: "CJC-1295 with DAC has a 6-8 day half-life — dosing is once or twice weekly.",
      rows: [
        { goal: "Standard Research", dose: "1-2 mg", freq: "1× per week", route: "SubQ" },
        { goal: "Body Composition", dose: "2 mg", freq: "Every 5-7 days", route: "SubQ" },
        { goal: "Anti-Aging Protocol", dose: "1 mg", freq: "1× per week", route: "SubQ" },
      ],
      tips: [
        "Dose once or twice weekly — more frequent dosing does not increase efficacy",
        "Long half-life means effects persist for weeks after last dose",
        "Reconstitute with bacteriostatic water, store at 2-8°C",
        "Best taken on an empty stomach for maximum GH pulse",
      ],
    },
    interactions: {
      note: "CJC-1295 with DAC has been extensively studied in combination with GHRP compounds for synergistic GH pulse amplification.",
      cards: [
        { slug: "ghrp-2", name: "GHRP-2", desc: "Synergistic — Potent GH pulse amplification through dual GHRH and ghrelin receptor pathways.", effect: "Synergistic" },
        { slug: "tesamorelin", name: "Tesamorelin", desc: "Complementary — Both are GHRH analogues. CJC-1295 with DAC has extended half-life vs Tesamorelin's shorter action.", effect: "Complementary" },
      ],
      stackNotes: [
        "CJC-1295 with DAC + Ipamorelin is the most popular GH secretagogue stack",
        "The DAC modification means CJC-1295 persists much longer than its GHRP partner — dose timing is important",
      ],
    },
    timeline: { phases: [
      { day: "Day 1-7", title: "Initial Dose", desc: "Single injection. DAC binds albumin. Sustained GH release begins. No further dosing needed this week.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 7-28", title: "Sustained Release", desc: "Continuous GH release from albumin reservoir. IGF-1 rises. Metabolic changes begin. Weekly redosing maintains effect.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 28-84", title: "Peak Remodelling", desc: "Maximum GH/IGF-1 elevation. Body composition improvements, recovery enhancement, and metabolic effects observed.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Research Use Only", text: "CJC-1295 with DAC is a research peptide not approved for human consumption.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
      { label: "Hormonal Considerations", text: "Significantly alters GH/IGF-1 axis. Effects persist for weeks after last dose due to 6-8 day half-life.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
      { label: "Storage", text: "Store lyophilized at 2-8°C. Reconstituted solution stable up to 28 days at 2-8°C.", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "blue" },
    ]},
    references: [
      "Ionescu M, et al. CJC-1295, a long-acting GHRH analogue. J Endocrinol. 2006;190(2):297-305.",
      "Teichman SL, et al. Pharmacokinetics and pharmacodynamics of CJC-1295. Clin Pharmacol Ther. 2006;79(2):P66.",
      "Khorram O, et al. CJC-1295 treatment in growth hormone deficiency. Endocrine. 2008;33(2):151-157.",
    ],
  },

  "cortagen": {
    overview: {
      whatIs: "Cortagen is a synthetic tetrapeptide (AEDP: Ala-Glu-Asp-Pro) from the Khavinson bioregulator family, specifically designed for neural tissue. It has been studied for nerve fibre regeneration, modulation of neural gene expression, and restoration of cognitive function in age-related neurological decline. Cortagen influences over 100 genes related to neural function, chromatin remodelling, and myelination.",
      mechanism: "Cortagen binds to specific DNA promoter regions in neural cells, modulating the expression of over 100 genes involved in neural function, chromatin remodelling, and myelination. It upregulates genes encoding neurotrophic factors, myelin proteins, and synaptic proteins while downregulating pro-inflammatory and pro-apoptotic genes. This epigenetic regulation promotes nerve fibre regeneration, supports myelination, and protects neurons from age-related degeneration.",
      benefits: [
        "Modulates over 100 genes involved in neural function and chromatin remodelling",
        "Accelerates nerve fibre regeneration and supports functional recovery",
        "Promotes myelination and synaptic protein expression",
        "May improve cognitive function in age-related neurological decline",
        "Part of the Khavinson bioregulator programme for neural tissue targeting",
        "Epigenetic mechanism — effects may persist beyond the treatment cycle",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Ala-Glu-Asp-Pro (AEDP)" },
        { label: "Length", value: "4 amino acids (tetrapeptide)" },
        { label: "Type", value: "Synthetic bioregulator | Neural-specific" },
        { label: "Molecular Weight", value: "~444 Da" },
        { label: "Mechanism", value: "DNA interaction / Epigenetic regulation" },
        { label: "Purity", value: "≥98%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Cortagen",
      diagramSubtitle: "4-mer · ~444 Da · Neural bioregulator · Sequence: AEDP",
      residues: [
        { x: 35, y: 100, label: "A", color: "#6366f1", name: "Ala" },
        { x: 80, y: 100, label: "E", color: "#0891b2", name: "Glu" },
        { x: 125, y: 100, label: "D", color: "#d97706", name: "Asp" },
        { x: 170, y: 100, label: "P", color: "#8b5cf6", name: "Pro" },
      ],
      legend: "A=Ala  E=Glu  D=Asp  P=Pro",
    },
    indications: {
      mostEffective: [
        { title: "Nerve Regeneration", desc: "Cortagen accelerates nerve fibre regeneration and supports functional recovery after nerve injury through modulation of neural gene expression." },
        { title: "Cognitive Function", desc: "May improve cognitive function in age-related decline by normalising gene expression patterns in neural tissue." },
      ],
      effective: [
        { title: "Neuroprotection", desc: "Modulates over 100 genes involved in neural protection, chromatin remodelling, and myelination." },
      ],
      moderate: [
        { title: "Cardiac Gene Regulation", desc: "Interestingly, Cortagen has also been shown to modulate cardiac gene expression, suggesting broader tissue effects." },
      ],
    },
    dosing: { note: "Research bioregulator used in short courses.",
      rows: [
        { goal: "Standard Research", dose: "5-10 mg", freq: "1× daily", route: "SubQ or IM" },
        { goal: "Bioregulator Protocol", dose: "5-10 mg", freq: "1× daily × 10-20 days", route: "SubQ or IM" },
      ],
      tips: ["Short 10-20 day cycles are standard", "May be combined with Pinealon in neural research protocols"],
    },
    interactions: {
      note: "Cortagen is a neural bioregulator with broad gene expression effects.",
      cards: [
        { slug: "pinealon", name: "Pinealon", desc: "Supportive — Both target neural tissue. Pinealon focuses on pineal/neuroendocrine regulation while Cortagen addresses broader neural gene expression.", effect: "Supportive" },
        { slug: "cerebrolysin", name: "Cerebrolysin", desc: "Supportive — Cortagen's epigenetic modulation complements Cerebrolysin's neurotrophin-based neuroprotection.", effect: "Supportive" },
      ],
      stackNotes: ["Khavinson bioregulators are typically used in alternating cycles rather than simultaneously"],
    },
    timeline: { phases: [
      { day: "Day 1-10", title: "Initial Course", desc: "Daily dosing initiates DNA binding and gene expression changes in neural tissue.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 10-20", title: "Active Remodelling", desc: "Sustained gene regulation supports neural repair and cognitive improvements.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ]},
    safety: { cards: [
      { label: "Well-Tolerated", text: "Good safety profile in research use as a short-course bioregulator.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      { label: "Research Use Only", text: "For laboratory research only. Not approved by regulatory bodies.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: ["Khavinson VK, et al. Peptide AEDP effects on nerve regeneration. Bull Exp Biol Med. 2011;151(6):721-724.", "Khavinson VK, et al. Cortagen modulates neural gene expression. Adv Gerontol. 2013;26(2):298-303.", "Khavinson VK, et al. Tetrapeptide regulation of chromatin remodelling. Neurochem J. 2015;9(3):193-198."],
  },

  "dermorphin": {
    overview: {
      whatIs: "Dermorphin is a naturally occurring heptapeptide opioid agonist originally isolated from the skin of South American Phyllomedusa frogs. It is notable for containing a D-amino acid residue (D-Ala) in position 2, a rare modification in natural peptides that confers exceptional metabolic stability and high affinity for mu-opioid receptors. Dermorphin is approximately 30-40 times more potent than morphine as an analgesic but with a distinct pharmacological profile.",
      mechanism: "Dermorphin acts as a highly selective and potent agonist at mu-opioid receptors (MOR), with Ki values in the nanomolar range. The presence of D-Ala at position 2 confers resistance to proteolytic degradation, significantly extending its duration of action compared to endogenous opioid peptides. Upon MOR binding, dermorphin activates Gi/o proteins, inhibiting adenylyl cyclase, reducing cAMP levels, and modulating ion channel activity (closing voltage-gated calcium channels, opening inwardly rectifying potassium channels). This results in potent analgesia through suppression of nociceptive transmission at spinal and supraspinal levels, along with typical opioid effects including respiratory depression, constipation, and euphoria at higher doses.",
      benefits: [
        "30-40× more potent than morphine — exceptional analgesic potency in animal models",
        "D-amino acid (D-Ala) confers resistance to proteolytic degradation",
        "Highly selective mu-opioid receptor agonist — valuable pharmacological research tool",
        "Distinct structure-activity relationships for studying opioid receptor pharmacology",
        "Model compound for studying D-amino acid containing peptides",
        "Extensively characterised with decades of published research",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Tyr-D-Ala-Phe-Gly-Tyr-Pro-Ser-NH₂" },
        { label: "Length", value: "7 amino acids (heptapeptide)" },
        { label: "Type", value: "Natural opioid peptide | Mu-opioid agonist" },
        { label: "Molecular Weight", value: "~801 Da" },
        { label: "Half-Life", value: "~30-60 minutes (D-amino acid protected)" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Dermorphin",
      diagramSubtitle: "7-mer · ~801 Da · Mu-opioid agonist · D-Ala at position 2",
      residues: [
        { x: 35, y: 100, label: "Y", color: "#6366f1", name: "Tyr" },
        { x: 75, y: 100, label: "a", color: "#EF4444", name: "D-Ala" },
        { x: 115, y: 100, label: "F", color: "#0891b2", name: "Phe" },
        { x: 155, y: 100, label: "G", color: "#8b5cf6", name: "Gly" },
        { x: 195, y: 100, label: "Y", color: "#6366f1", name: "Tyr" },
        { x: 235, y: 100, label: "P", color: "#d97706", name: "Pro" },
        { x: 275, y: 100, label: "S", color: "#059669", name: "Ser" },
      ],
      legend: "Y=Tyr  a=D-Ala (D-configuration)  F=Phe  G=Gly  P=Pro  S=Ser  — NH₂ C-terminal amide",
    },
    indications: {
      mostEffective: [
        { title: "Opioid Receptor Research", desc: "Dermorphin is a primary research tool for studying mu-opioid receptor pharmacology, structure-activity relationships, and opioid signalling pathways." },
        { title: "Analgesic Research", desc: "30-40× more potent than morphine in animal models. Used to study mechanisms of opioid analgesia and tolerance." },
      ],
      effective: [
        { title: "Opioid Tolerance Studies", desc: "Dermorphin's distinct pharmacology makes it valuable for studying opioid tolerance, dependence, and receptor desensitisation." },
      ],
      moderate: [
        { title: "D-Amino Acid Peptide Research", desc: "The D-Ala residue makes dermorphin a model compound for studying D-amino acid containing peptides." },
      ],
    },
    dosing: {
      note: "Dermorphin is a potent opioid research tool. NOT for human use. Extreme caution required.",
      rows: [
        { goal: "Rodent Analgesic Research", dose: "0.1-1 mg/kg", freq: "Single dose", route: "SC or IP" },
        { goal: "In Vitro Receptor Studies", dose: "1-100 nM", freq: "Per protocol", route: "In vitro" },
      ],
      tips: [
        "Extreme caution — dermorphin is a potent mu-opioid agonist",
        "Controlled substance in many jurisdictions",
        "Store lyophilized at -20°C, protected from light",
        "Handle with appropriate safety protocols for opioid compounds",
      ],
    },
    interactions: {
      note: "Dermorphin is a potent mu-opioid agonist peptide used as a pharmacological research tool.",
      cards: [
        { slug: "naloxone", name: "Naloxone", desc: "Antagonist — Naloxone is a competitive mu-opioid antagonist that reverses dermorphin's effects.", effect: "Complementary" },
      ],
      stackNotes: [
        "Dermorphin is primarily a research tool for opioid pharmacology, not a therapeutic agent",
        "Its potency (30-40× morphine) requires careful dose calculation and handling",
      ],
    },
    timeline: { phases: [
      { day: "Day 1", title: "Acute Administration", desc: "Rapid onset of mu-opioid agonism. Potent analgesic effects within minutes of administration. Duration of action depends on dose and route.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { day: "Hours 1-8", title: "Pharmacodynamic Window", desc: "Peak opioid effects observed. Respiratory depression and reduced GI motility are common research endpoints. Effects gradually subside as peptide is metabolised.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ]},
    safety: { cards: [
      { label: "Potent Opioid — EXTREME CAUTION", text: "Dermorphin is 30-40× more potent than morphine. Risk of respiratory depression, dependence, and death if misused. Strict laboratory controls required.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
      { label: "Research Use Only", text: "For laboratory research only. Not for human use. Controlled substance in many jurisdictions.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "red" },
    ]},
    references: [
      "Montecucchi PC, et al. Isolation and structure of dermorphin, a novel opioid peptide from frog skin. Int J Pept Protein Res. 1981;17(3):275-283.",
      "Broccardo M, et al. Pharmacological data on dermorphin. Br J Pharmacol. 1981;73(3):625-631.",
      "Mignogna G, et al. Dermorphin: structure-activity relationships. Peptides. 1992;13(4):783-787.",
      "Negri L, et al. Dermorphin and deltorphins: amphibian opioid peptides. Gen Pharmacol. 1998;31(4):549-555.",
    ],
  },

  "dihexa": {
    overview: {
      whatIs: "Dihexa is a synthetic peptide derived from angiotensin IV, developed at Washington State University by Drs. Joseph Harding and John Wright. It is one of the most potent cognition-enhancing compounds ever discovered, showing efficacy at femtomolar concentrations in vitro. Dihexa works by potentiating hepatocyte growth factor (HGF) activity at its receptor c-Met, promoting synaptogenesis and neuronal survival. It has been studied for Alzheimer's disease, traumatic brain injury, and age-related cognitive decline.",
      mechanism: "Dihexa binds to the angiotensin IV receptor (AT4) and potentiates hepatocyte growth factor (HGF) binding to the c-Met receptor. This HGF/c-Met signalling cascade activates PI3K/AKT and MAPK/ERK pathways, promoting dendritic spine formation, synaptic plasticity, and neuronal survival. Dihexa is unique among cognitive enhancers in that it actively promotes the growth of new synapses (synaptogenesis) rather than merely modulating neurotransmitter levels.",
      benefits: [
        "One of the most potent cognition-enhancing compounds — active at femtomolar concentrations",
        "Promotes synaptogenesis through HGF/c-Met signalling — grows new synapses rather than modulating neurotransmitters",
        "Orally bioavailable — one of the few nootropic peptides effective via oral administration",
        "Reverses cognitive deficits in Alzheimer's disease animal models",
        "Improves outcomes after traumatic brain injury in preclinical studies",
        "Protects neurons against beta-amyloid toxicity through HGF/c-Met survival signalling",
      ],
    },
    molecular: {
      items: [
        { label: "Type", value: "Synthetic angiotensin IV analogue | Nootropic" },
        { label: "Mechanism", value: "HGF/c-Met potentiation | Synaptogenesis" },
        { label: "Molecular Weight", value: "~881 Da" },
        { label: "Half-Life", value: "~12 hours (estimated)" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "Dihexa",
      diagramSubtitle: "~881 Da · HGF/c-Met potentiator · Synaptogenesis",
      residues: [
        { x: 20, y: 50, label: "N", color: "#3B82F6", name: "N-terminal" },
        { x: 80, y: 50, label: "C", color: "#EF4444", name: "C-terminal" },
      ],
      legend: "Angiotensin IV-derived peptide — HGF/c-Met signalling potentiator",
    },
    indications: {
      mostEffective: [
        { title: "Cognitive Enhancement", desc: "Dihexa promotes synaptogenesis and dendritic spine formation, enhancing learning, memory, and cognitive function. Active at femtomolar concentrations." },
        { title: "Alzheimer's Disease Research", desc: "Preclinical studies show Dihexa reverses cognitive deficits in animal models of Alzheimer's disease through restoration of synaptic density." },
      ],
      effective: [
        { title: "Traumatic Brain Injury", desc: "Improves cognitive outcomes after TBI by promoting synaptic repair and reducing neuronal loss." },
        { title: "Neuroprotection", desc: "Protects neurons against beta-amyloid toxicity and other neurodegenerative insults through HGF/c-Met survival signalling." },
      ],
      moderate: [
        { title: "Age-Related Cognitive Decline", desc: "May counter age-related synaptic loss through promotion of dendritic spine formation in the hippocampus and cortex." },
      ],
    },
    dosing: {
      note: "Dihexa is a research peptide. Dosing is typically oral or subQ.",
      rows: [
        { goal: "Oral Research", dose: "10-30 mg", freq: "1× daily", route: "Oral" },
        { goal: "SubQ Research", dose: "5-15 mg", freq: "1× daily", route: "SubQ" },
        { goal: "Preclinical (Rodent)", dose: "0.5-5 mg/kg", freq: "1× daily", route: "IP" },
      ],
      tips: [
        "Orally bioavailable — one of the few nootropic peptides effective orally",
        "Works by synaptogenesis — effects may take days to weeks to become apparent",
        "Store lyophilized at 2-8°C; reconstituted at 2-8°C",
      ],
    },
    interactions: {
      note: "Dihexa interacts with the angiotensin system and HGF/c-Met pathway, distinct from other nootropic peptides.",
      cards: [
        { slug: "cerebrolysin", name: "Cerebrolysin", desc: "Supportive — Cerebrolysin provides BDNF/GDNF/NGF neurotrophins while Dihexa promotes HGF/c-Met synaptogenesis. Complementary neurotrophic mechanisms.", effect: "Supportive" },
        { slug: "semax", name: "Semax", desc: "Supportive — Both enhance cognitive function through different mechanisms — Semax via BDNF/TrkB and Dihexa via HGF/c-Met.", effect: "Supportive" },
        { slug: "p21", name: "P21", desc: "Supportive — Both have nootropic effects through distinct signalling pathways.", effect: "Supportive" },
      ],
      stackNotes: [
        "Dihexa is one of the few orally bioavailable nootropic peptides",
        "Synaptogenesis mechanism means effects are cumulative over days to weeks",
      ],
    },
    timeline: { phases: [
      { day: "Day 1-7", title: "Initiation", desc: "HGF/c-Met potentiation begins. Early synaptogenesis initiated. No immediate cognitive effects.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 7-28", title: "Synaptogenesis Phase", desc: "New synapse formation accelerates. Cognitive improvements become measurable. Dendritic spine density increases in hippocampus and cortex.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 28+", title: "Sustained Enhancement", desc: "Maximum synaptic density achieved. Cognitive benefits plateau and are maintained with continued dosing.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Preclinical Safety", text: "Good safety profile in preclinical studies. No significant toxicity reported at research-relevant doses.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "emerald" },
      { label: "Research Use Only", text: "Dihexa is a research compound not approved by regulatory bodies.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Wright JW, et al. Dihexa improves cognitive function in Alzheimer's disease models. Neurosci Lett. 2013;553:131-135.",
      "Harding JW, et al. Dihexa: a potent cognitive enhancer. J Pharmacol Exp Ther. 2014;351(3):475-483.",
      "McCoy AT, et al. Dihexa promotes synaptogenesis. J Pharmacol Exp Ther. 2015;355(2):278-285.",
      "Wright JW, et al. The brain renin-angiotensin system and Alzheimer's disease. Prog Neurobiol. 2015;127-128:49-75.",
    ],
  },

  "dsip": {
    overview: {
      whatIs: "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring nonapeptide first isolated from rabbit brain in 1977 by Schoenenberger and Monnier. Despite its name, DSIP has broader effects beyond sleep regulation, including neuroendocrine modulation, stress response regulation, and neuroprotection. It has been studied for sleep disorders, stress adaptation, and as a potential treatment for insomnia and opioid withdrawal.",
      mechanism: "DSIP modulates sleep architecture by promoting delta-wave (slow-wave) sleep through effects on the hypothalamic-pituitary axis and endogenous opioid systems. It normalises HPA axis activity, reducing stress-induced cortisol elevation, and modulates growth hormone, ACTH, and melatonin secretion. DSIP also has neuroprotective effects through regulation of glutamate activity and oxidative stress responses. Its mechanism is not fully characterised as its specific receptor has not been definitively identified.",
      benefits: [
        "Promotes delta-wave (slow-wave) sleep — improves sleep quality and depth",
        "Normalises HPA axis activity — reduces stress-induced cortisol elevation",
        "Modulates neuroendocrine function — affects GH, ACTH, and melatonin secretion",
        "Demonstrated clinical effects in insomnia and stress-related sleep disorders",
        "Neuroprotective properties — protects against stress-induced neural damage",
        "May reduce symptoms of opioid withdrawal through modulation of endogenous opioid systems",
      ],
    },
    molecular: {
      items: [
        { label: "Sequence", value: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu" },
        { label: "Length", value: "9 amino acids (nonapeptide)" },
        { label: "Type", value: "Natural neuropeptide" },
        { label: "Molecular Weight", value: "~849 Da" },
        { label: "CAS Number", value: "69474-90-1" },
        { label: "Purity", value: "≥99%" },
        { label: "Form", value: "Lyophilized powder" },
      ],
      diagramTitle: "DSIP",
      diagramSubtitle: "9-mer · ~849 Da · WAGGDASGE · Sleep-regulating neuropeptide",
      residues: [
        { x: 30, y: 100, label: "W", color: "#6366f1", name: "Trp" },
        { x: 65, y: 100, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 95, y: 100, label: "G", color: "#0891b2", name: "Gly" },
        { x: 125, y: 100, label: "G", color: "#0891b2", name: "Gly" },
        { x: 155, y: 100, label: "D", color: "#d97706", name: "Asp" },
        { x: 185, y: 100, label: "A", color: "#8b5cf6", name: "Ala" },
        { x: 215, y: 100, label: "S", color: "#059669", name: "Ser" },
        { x: 245, y: 100, label: "G", color: "#0891b2", name: "Gly" },
        { x: 275, y: 100, label: "E", color: "#7c3aed", name: "Glu" },
      ],
      legend: "W=Trp  A=Ala  G=Gly  D=Asp  S=Ser  E=Glu",
    },
    indications: {
      mostEffective: [
        { title: "Sleep Research", desc: "DSIP promotes delta-wave (slow-wave) sleep, improving sleep quality and duration. Clinical studies show improved sleep onset and delta-wave sleep in insomnia patients." },
        { title: "Stress Response Modulation", desc: "DSIP normalises HPA axis activity, reducing stress-induced cortisol elevation and supporting adaptation to chronic stress." },
      ],
      effective: [
        { title: "Neuroendocrine Regulation", desc: "Modulates growth hormone, ACTH, and cortisol secretion through effects on the hypothalamic-pituitary axis." },
        { title: "Opioid Withdrawal", desc: "DSIP has been studied for reducing symptoms of opioid withdrawal through modulation of endogenous opioid systems." },
      ],
      moderate: [
        { title: "Neuroprotection", desc: "May protect against stress-induced neural damage through regulation of cortisol and glutamate activity." },
      ],
    },
    dosing: {
      note: "DSIP is a research peptide with limited clinical approval. Dosing varies by application.",
      rows: [
        { goal: "Sleep Research", dose: "25-100 mcg", freq: "1× daily before bed", route: "SubQ or IV" },
        { goal: "Stress Research", dose: "50-150 mcg", freq: "1× daily", route: "SubQ" },
        { goal: "Standard Research", dose: "50-100 mcg", freq: "1× daily", route: "SubQ" },
      ],
      tips: [
        "Best taken before bedtime for sleep-focused protocols",
        "DSIP is rapidly degraded — use fresh reconstituted solution",
        "Store lyophilized at -20°C; reconstituted at 2-8°C for up to 24 hours",
        "Intranasal administration may provide better CNS penetration",
      ],
    },
    interactions: {
      note: "DSIP has unique sleep and neuroendocrine effects, distinct from other peptides on this platform.",
      cards: [
        { slug: "semax", name: "Semax", desc: "Complementary — Semax enhances cognitive function during wakefulness while DSIP promotes restorative sleep. Used together in circadian rhythm research.", effect: "Complementary" },
        { slug: "selank", name: "Selank", desc: "Supportive — Both modulate stress and anxiety responses through different neuropeptide systems.", effect: "Supportive" },
        { slug: "melatonin", name: "Melatonin", desc: "Supportive — DSIP and melatonin target different aspects of sleep regulation and may have complementary effects.", effect: "Supportive" },
      ],
      stackNotes: [
        "DSIP's natural receptor has not been definitively identified — research relies on functional endpoints",
        "Short half-life requires timed administration for sleep studies",
      ],
    },
    timeline: { phases: [
      { day: "Day 1-3", title: "Initial Administration", desc: "DSIP administered before bedtime. Immediate effects on sleep architecture may be observed, particularly increased delta-wave activity.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 3-14", title: "Sustained Sleep Improvement", desc: "Consistent improvement in sleep quality and duration. Stress hormone (cortisol) levels normalised.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
      { day: "Day 14+", title: "Carryover Effect", desc: "Some studies suggest DSIP has a carryover effect — improved sleep persists after discontinuation.", color: "purple", icon: "M5 13l4 4L19 7" },
    ]},
    safety: { cards: [
      { label: "Well-Tolerated", text: "DSIP has a good safety profile in clinical research. Few reported side effects at research-relevant doses.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
      { label: "Rapid Degradation", text: "DSIP is rapidly degraded in plasma — short half-life requires careful timing of administration.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue" },
      { label: "Research Use Only", text: "DSIP is a research peptide not approved for therapeutic use.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", color: "amber" },
    ]},
    references: [
      "Schoenenberger GA, et al. Characterization of a delta-sleep-inducing peptide. Proc Natl Acad Sci USA. 1977;74(9):3862-3866.",
      "Schneider-Helmert D, et al. DSIP in insomnia: clinical effects. Eur Neurol. 1988;28(4):215-219.",
      "Graf MV, et al. DSIP: a sleep-modulating peptide. Peptides. 1985;6(Suppl 3):153-158.",
      "Sudakov KV, et al. DSIP and stress. Neurosci Behav Physiol. 1993;23(4):307-311.",
      "Scherschlicht R, et al. DSIP effects on sleep in animals. Experientia. 1984;40(2):149-152.",
    ],
  },

  "epitalon": {
    overview: { whatIs: "Epitalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from pineal gland peptide epithalamin, developed by Prof. Vladimir Khavinson. It activates telomerase to extend telomere length and regulates pineal function.", mechanism: "Upregulates telomerase activity by inducing hTERT expression and influences pineal function through melatonin synthesis regulation and circadian gene expression modulation.", benefits: ["Telomerase activation extending telomere length","Pineal gland rejuvenation restoring melatonin","Circadian rhythm normalization","Enhanced immune T-cell function"] },
    molecular: { items: [{label:"Sequence",value:"AEDG"},{label:"MW",value:"~450 Da"},{label:"Formula",value:"C17H26N4O10"},{label:"Type",value:"Synthetic tetrapeptide"}], diagramTitle: "Epitalon", diagramSubtitle: "~450 Da · Tetrapeptide · Telomerase activator", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "AEDG tetrapeptide" },
    indications: { mostEffective: [{title:"Telomere Maintenance",desc:"Activates telomerase to extend telomere length"},{title:"Melatonin Decline",desc:"Restores pineal function and melatonin production"},{title:"Immune Senescence",desc:"Enhances T-cell proliferation and thymic function"}], effective: [{title:"Circadian Rhythm",desc:"Normalises disrupted sleep-wake cycles"},{title:"Oxidative Stress",desc:"Upregulates SOD and glutathione peroxidase"}], moderate: [{title:"Reproductive Aging",desc:"Early evidence of improved function in aging models"}] },
    dosing: { note: "Based on animal studies and Russian clinical protocols.", rows: [{goal:"Standard",dose:"5-10 mg/day",freq:"10-20 days",route:"SC"},{goal:"Extended",dose:"5 mg/day",freq:"5/2 for 4 weeks",route:"SC"},{goal:"Maintenance",dose:"2.5-5 mg/day",freq:"2x/year",route:"SC"}], tips: ["Reconstitute with bacteriostatic water","Morning administration","Spring and autumn course cycles"] },
    interactions: { note: "Limited known interactions.", cards: [{slug:"thymalin",name:"Thymalin",desc:"Synergistic Khavinson bioregulators",effect:"Synergistic"},{slug:"ghk-cu",name:"GHK-Cu",desc:"Different aging pathways",effect:"Complementary"}], stackNotes: ["Cycle with other bioregulators","3-6 months between courses"] },
    timeline: { phases: [{day:"Day 1-10",title:"Initiation",desc:"Telomerase activation begins",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Day 10-20",title:"Peak Activity",desc:"Max telomerase activity",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Month 3-6",title:"Telomere Extension",desc:"Measurable lengthening",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Good safety profile in studies",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not FDA/EMA approved",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Khavinson VK, et al. Bull Exp Biol Med. 2003;136(4):372-374.","Anisimov VN, et al. Biogerontology. 2001;2(3):195-203.","Korkushko OV, et al. Adv Gerontol. 2007;20(2):78-85."],
  },

  "fgl": {
    overview: { whatIs: "FGL is a synthetic NCAM-derived peptide that promotes synaptogenesis and neural plasticity for neurodegenerative research.", mechanism: "Binds NCAM receptors to activate FGFR signalling (MAPK/ERK), promoting neurite outgrowth and synapse formation.", benefits: ["Promotes synaptogenesis","Enhances neural plasticity","Supports neurite outgrowth"] },
    molecular: { items: [{label:"MW",value:"~1.2 kDa"},{label:"Type",value:"NCAM mimetic"},{label:"Target",value:"FGFR/NCAM"}], diagramTitle: "Fgl", diagramSubtitle: "~1.2 kDa · NCAM-derived", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "NCAM motif" },
    indications: { mostEffective: [{title:"Synaptic Loss",desc:"Promotes new synapse formation"},{title:"Cognitive Decline",desc:"Enhances learning in models"}], effective: [{title:"Neurotrauma",desc:"Recovery after brain injury"}], moderate: [{title:"Age-Related Decline",desc:"Preliminary evidence"}] },
    dosing: { note: "Research protocols vary.", rows: [{goal:"Standard",dose:"0.5-2 mg/day",freq:"10-20 days",route:"SC"},{goal:"Extended",dose:"1 mg/day",freq:"5/2 4 weeks",route:"SC"}], tips: ["Short half-life","Store at -20°C lyophilized"] },
    interactions: { note: "Limited interaction data.", cards: [{slug:"dihexa",name:"Dihexa",desc:"Both target synaptogenesis",effect:"Complementary"}], stackNotes: ["Stack with nootropics","Cycle 1-2 months"] },
    timeline: { phases: [{day:"Day 1-7",title:"Initiation",desc:"NCAM pathway activation",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Day 7-21",title:"Plasticity",desc:"Synapse formation markers increase",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Good profile in research",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved for clinical use",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Cambon K, et al. J Neurosci. 2004;24(5):1137-1145.","Klementiev B, et al. Neuroscience. 2007;148(1):255-268."],
  },

  "follistatin": {
    overview: { whatIs: "Follistatin is a naturally occurring glycoprotein that potently inhibits myostatin (GDF-8), the negative regulator of muscle growth.", mechanism: "Binds directly to myostatin and activin A with high affinity, preventing ActRIIB receptor binding and blocking negative muscle growth regulation.", benefits: ["Potent myostatin inhibition","Promotes muscle fibre hypertrophy","Enhances satellite cell activation"] },
    molecular: { items: [{label:"MW",value:"~35 kDa"},{label:"Type",value:"Glycoprotein"},{label:"Target",value:"Myostatin/Activin A"}], diagramTitle: "Follistatin", diagramSubtitle: "~35 kDa · Myostatin inhibitor", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "Full glycoprotein" },
    indications: { mostEffective: [{title:"Muscle Wasting",desc:"Promotes growth in cachexia research"},{title:"Myostatin Inhibition",desc:"Blocks negative regulation"}], effective: [{title:"Metabolic Health",desc:"May improve glucose metabolism"},{title:"Injury Recovery",desc:"Potential for rehabilitation"}], moderate: [{title:"Sarcopenia",desc:"Age-related muscle loss research"}] },
    dosing: { note: "Research protocols vary by indication.", rows: [{goal:"Standard",dose:"100-300 mcg",freq:"1-2x/week 4-8 wks",route:"SC/IM"},{goal:"High Dose",dose:"500 mcg",freq:"Weekly 4 weeks",route:"IM"}], tips: ["Reconstitute gently","Short half-life","Combine with exercise"] },
    interactions: { note: "Interacts with TGF-beta superfamily members.", cards: [{slug:"ace-031",name:"ACE-031",desc:"Both target myostatin",effect:"Synergistic"},{slug:"ghrp-2",name:"GHRP-2",desc:"GH axis supports muscle",effect:"Supportive"}], stackNotes: ["Stack with GHRP/GHRH for anabolic protocols","4-8 week cycles with breaks"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Myostatin inhibition begins",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Growth",desc:"Satellite cell activation",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 6-12",title:"Sustained",desc:"Muscle fibre hypertrophy",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Limited Data",text:"Long-term safety not established",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"},{label:"Research Only",text:"Not FDA approved",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Lee SJ, et al. Curr Opin Pharmacol. 2004;4(4):356-362.","Amthor H, et al. Dev Biol. 2004;270(1):19-30.","Wagner KR, et al. Ann Neurol. 2008;63(2):219-231."],
  },

  "foxo4-dr1": {
    overview: { whatIs: "FOXO4-DR1 is a synthetic peptide that targets the FOXO4 transcription factor interaction with p53, developed as a senolytic agent to selectively eliminate senescent cells.", mechanism: "Disrupts the FOXO4-p53 interaction in senescent cells, releasing p53 to activate apoptosis pathways, selectively clearing senescent cells while sparing healthy cells.", benefits: ["Senolytic — selectively eliminates senescent cells","Reduces age-related inflammation","Targets p53-FOXO4 interaction"] },
    molecular: { items: [{label:"MW",value:"~1.5 kDa"},{label:"Type",value:"Senolytic peptide"},{label:"Target",value:"FOXO4-p53 interaction"}], diagramTitle: "Foxo4 Dr1", diagramSubtitle: "~1.5 kDa · Senolytic", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "Senolytic peptide" },
    indications: { mostEffective: [{title:"Cellular Senescence",desc:"Selective elimination of senescent cells"},{title:"Age-Related Inflammation",desc:"Reduces SASP inflammatory markers"}], effective: [{title:"Tissue Regeneration",desc:"Potential to restore aged tissue function"}], moderate: [{title:"Chemo Recovery",desc:"Post-chemo senescence research"}] },
    dosing: { note: "Research use only.", rows: [{goal:"Standard",dose:"5-10 mg/day",freq:"5-7 days",route:"SC"},{goal:"Course",dose:"10 mg/day",freq:"5 on/2 off",route:"SC"}], tips: ["Short course needed","Cycle every 3-6 months"] },
    interactions: { note: "Limited interaction data.", cards: [{slug:"epitalon",name:"Epitalon",desc:"Different aging pathways",effect:"Complementary"},{slug:"nad-plus",name:"NAD+",desc:"Sirtuin supports senescence clearance",effect:"Supportive"}], stackNotes: ["Use intermittently not continuously","Combine with NAD+ precursors"] },
    timeline: { phases: [{day:"Day 1-7",title:"Senolysis",desc:"FOXO4-p53 disruption begins",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Day 7-14",title:"Clearance",desc:"Senescent cell apoptosis markers",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Novel Agent",text:"Human safety data limited",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"},{label:"Research Only",text:"Preclinical stage",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Baar MP, et al. Cell. 2017;169(1):132-147.","de Keizer PL. Curr Opin Pharmacol. 2017;34:74-80."],
  },

  "fragment-176-191": {
    overview: { whatIs: "HGH Fragment 176-191 is a synthetic peptide corresponding to amino acids 176-191 of human growth hormone. It targets fat-burning pathways without affecting blood sugar or IGF-1.", mechanism: "Binds to GH receptors in adipose tissue to stimulate lipolysis through the cAMP/PKA signalling cascade, targeting fat metabolism without the insulin-desensitising effects of full HGH.", benefits: ["Targeted fat loss through lipolysis","No effect on blood sugar or IGF-1","Preserves insulin sensitivity"] },
    molecular: { items: [{label:"MW",value:"~1.7 kDa"},{label:"Type",value:"HGH fragment"},{label:"Sequence",value:"Tyr-Leu-Arg...176-191"},{label:"Target",value:"Adipose GH receptors"}], diagramTitle: "Fragment 176-191", diagramSubtitle: "~1.7 kDa · HGH fragment", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "HGH c-terminal fragment" },
    indications: { mostEffective: [{title:"Fat Loss",desc:"Stimulates lipolysis in adipose tissue"},{title:"Obesity Research",desc:"Targeted fat reduction studies"}], effective: [{title:"Insulin Sensitivity",desc:"Does not impair insulin signalling"}], moderate: [{title:"Body Composition",desc:"Improves fat-to-muscle ratio"}] },
    dosing: { note: "Take on empty stomach.", rows: [{goal:"Standard",dose:"200-500 mcg/day",freq:"1-2x daily 8-12 wks",route:"SC"},{goal:"High Dose",dose:"500-1000 mcg/day",freq:"2x daily",route:"SC"}], tips: ["Administer on empty stomach","Morning and pre-bed","Long cycles 8-12 weeks"] },
    interactions: { note: "Limited interaction data.", cards: [{slug:"aod-9604",name:"AOD-9604",desc:"Both lipolytic HGH fragments",effect:"Complementary"},{slug:"ghrp-2",name:"GHRP-2",desc:"GH axis support",effect:"Supportive"}], stackNotes: ["Stack with AOD-9604 for enhanced lipolysis","8-12 week cycles"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Lipolysis pathway activation",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active Fat Loss",desc:"Accelerated lipolysis",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"Body composition shifts",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Limited side effect profile",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not approved",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Heffernan M, et al. J Endocrinol. 2001;169(2):267-277.","Ng FM, et al. J Mol Endocrinol. 1990;4(3):217-223."],
  },

  "gdf-8": {
    overview: { whatIs: "GDF-8 (Myostatin) is an endogenous TGF-beta superfamily member that negatively regulates muscle growth. It is a target for muscle wasting research.", mechanism: "Binds to ActRIIB receptors to activate SMAD signalling, which suppresses satellite cell proliferation and protein synthesis, limiting muscle growth.", benefits: ["Negative regulator of muscle mass","Target for sarcopenia research","Key pathway in muscle development"] },
    molecular: { items: [{label:"MW",value:"~26 kDa dimer"},{label:"Type",value:"TGF-beta superfamily"},{label:"Alt Name",value:"Myostatin"},{label:"Target",value:"ActRIIB receptor"}], diagramTitle: "Gdf 8", diagramSubtitle: "~26 kDa · Myostatin", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "TGF-beta member" },
    indications: { mostEffective: [{title:"Muscle Wasting",desc:"Primary target for myostatin inhibition"},{title:"Sarcopenia",desc:"Age-related muscle loss studies"}], effective: [{title:"Metabolic Disease",desc:"Muscle mass influences metabolism"}], moderate: [] },
    dosing: { note: "Research tool - not administered therapeutically.", rows: [{goal:"Blocking Research",dose:"Various",freq:"Per protocol",route:"SC/IV"}], tips: ["Myostatin inhibitors used therapeutically","Not myostatin itself"] },
    interactions: { note: "Part of TGF-beta signalling network.", cards: [{slug:"follistatin",name:"Follistatin",desc:"Endogenous myostatin inhibitor",effect:"Synergistic"},{slug:"ace-031",name:"ACE-031",desc:"ActRIIB decoy receptor",effect:"Synergistic"}], stackNotes: ["Blocking agents are therapeutically relevant","Never use myostatin itself"] },
    timeline: { phases: [{day:"Study Dependent",title:"Varies",desc:"Per protocol",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Research Tool",text:"Used for pathway study only",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["McPherron AC, et al. Nature. 1997;387(6628):83-90.","Lee SJ. Annu Rev Cell Dev Biol. 2004;20:61-86."],
  },

  "ghrh-analog-amide": {
    overview: { whatIs: "GHRH (1-44) Analog Amide is a synthetic C-terminal amidated analog of growth hormone-releasing hormone, designed to stimulate pituitary GH release with enhanced stability.", mechanism: "Binds to GHRH receptors on pituitary somatotrophs, activating cAMP/PKA signalling to stimulate GH synthesis and pulsatile release.", benefits: ["Stimulates endogenous GH release","Improved stability over native GHRH","Supports IGF-1 production"] },
    molecular: { items: [{label:"MW",value:"~5 kDa"},{label:"Type",value:"GHRH analog (1-44)"},{label:"Modification",value:"C-terminal amidation"}], diagramTitle: "Ghrh Analog Amide", diagramSubtitle: "~5 kDa · GHRH analog", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "GHRH analog" },
    indications: { mostEffective: [{title:"GH Deficiency",desc:"Restores natural GH pulse amplitude"},{title:"Anti-Aging",desc:"Supports GH/IGF-1 axis"}], effective: [{title:"Body Composition",desc:"Improves muscle-to-fat ratio"}], moderate: [{title:"Recovery",desc:"Enhanced healing protocols"}] },
    dosing: { note: "Pre-bed administration for nocturnal GH pulse.", rows: [{goal:"Standard",dose:"1-2 mg/day",freq:"1-2x/day 8-12 wks",route:"SC"},{goal:"Extended",dose:"1 mg/day",freq:"5/2 12 weeks",route:"SC"}], tips: ["Administer on empty stomach","Pre-bed for nocturnal GH pulse","Cycle 12 weeks on/4 off"] },
    interactions: { note: "Limited interaction data.", cards: [{slug:"sermorelin",name:"Sermorelin",desc:"Similar GHRH analog",effect:"Complementary"},{slug:"ghrp-2",name:"GHRP-2",desc:"GHRP synergy with GHRH",effect:"Synergistic"}], stackNotes: ["Stack with GHRP for amplified GH pulses","12 week cycles recommended"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse amplitude increasing",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Peak GH stimulation",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"IGF-1 levels elevated",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Mild side effects",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Research Only",text:"Not FDA approved",icon:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",color:"amber"}] },
    references: ["Gaylinn BD, et al. Endocr Rev. 1997;18(1):18-46.","Thorner MO, et al. J Clin Endocrinol Metab. 1982;55(6):1191-1193."],
  },

  "glow": {
    overview: { whatIs: "Glow is a synergistic peptide blend combining GHK-Cu, BPC-157, and TB-500 for comprehensive skin and tissue repair.", mechanism: "GHK-Cu signals collagen synthesis, BPC-157 promotes angiogenesis and tissue repair, and TB-500 modulates cell migration — multi-pathway tissue regeneration.", benefits: ["Synergistic triple-action tissue repair","Potent collagen synthesis promotion","Accelerated wound healing","Reduced inflammation and scarring"] },
    molecular: { items: [{label:"Type",value:"Triple peptide blend"},{label:"Components",value:"GHK-Cu + BPC-157 + TB-500"}], diagramTitle: "Glow", diagramSubtitle: "Triple blend · Tissue repair", residues: [{x:20,y:50,label:"GHK",color:"#3B82F6",name:"GHK-Cu"},{x:50,y:50,label:"BPC",color:"#10B981",name:"BPC-157"},{x:80,y:50,label:"TB",color:"#F59E0B",name:"TB-500"}], legend: "Three peptides synergistic" },
    indications: { mostEffective: [{title:"Skin Rejuvenation",desc:"Comprehensive dermal repair"},{title:"Wound Healing",desc:"Triple-pathway accelerated repair"},{title:"Scar Reduction",desc:"Reduces fibrotic scarring"}], effective: [{title:"Anti-Aging",desc:"Improves skin elasticity"},{title:"Inflammation",desc:"Broad anti-inflammatory effects"}], moderate: [] },
    dosing: { note: "Depends on GHK-Cu concentration.", rows: [{goal:"Standard",dose:"2.5-5 mg total",freq:"Once daily",route:"SC"},{goal:"Topical",dose:"Apply as directed",freq:"2x daily",route:"Topical"}], tips: ["Mix gently","Use within 7 days","Can be topical or injected"] },
    interactions: { note: "Components designed to work synergistically.", cards: [{slug:"ghk-cu",name:"GHK-Cu",desc:"Core collagen component",effect:"Synergistic"},{slug:"bpc-157",name:"BPC-157",desc:"Angiogenesis factor",effect:"Synergistic"},{slug:"tb-500",name:"TB-500",desc:"Cell migration factor",effect:"Synergistic"}], stackNotes: ["All three designed for concurrent use","Can cycle with other beauty protocols"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Collagen signalling activated",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Repair",desc:"Visible tissue improvement",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 6-12",title:"Remodelling",desc:"Collagen remodelling",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Good profile with standard dosing",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Reactions",text:"Possible injection site reactions",icon:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Pickart L, et al. J Biomater Sci. 2012;23(8):1019-1031.","Sevastre-Berghian AC, et al. Antioxidants. 2022;11(2):234."],
  },

  "ss-31": {
    overview: { whatIs: "SS-31 (Elamipretide) is a mitochondrial-targeted tetrapeptide that stabilizes cardiolipin, protecting mitochondrial cristae structure and enhancing ATP production. Developed by Stealth BioTherapeutics, it is the most clinically advanced mitochondrial therapeutic peptide with over 20 completed clinical trials across multiple indications.", mechanism: "SS-31 selectively binds to cardiolipin on the inner mitochondrial membrane, preventing cytochrome c peroxidase activity and preserving cristae architecture. This stabilizes electron transport chain supercomplexes, reducing reactive oxygen species (ROS) production while maintaining efficient ATP synthesis — a fundamentally different approach from general antioxidants.", benefits: ["Mitochondrial cristae stabilisation — cardiolipin binding preserves energy production","Reduced oxidative stress without suppressing beneficial ROS signalling","Improved cellular energetics — enhanced ATP synthesis efficiency","Cardioprotective effects in ischaemia-reperfusion models","Neuroprotective across multiple neurodegenerative models","Well-characterised safety from 20+ clinical trials"] },
    molecular: { items: [{label:"Molecular Weight",value:"639.8 Da"},{label:"Sequence",value:"D-Arg-Dmt-Lys-Phe-NH₂"},{label:"Length",value:"4 amino acids"},{label:"Type",value:"Mitochondrial-targeted peptide"},{label:"Half-Life",value:"~2 hours (IV); ~4-6 hours (SC)"},{label:"CAS Number",value:"1337016-51-6"}], diagramTitle: "SS-31", diagramSubtitle: "4-mer · 639.8 Da · D-Arg-Dmt-Lys-Phe-NH₂", residues: [{x:30,y:50,label:"D-Arg",color:"#8b5cf6",name:"D-Arginine"},{x:70,y:50,label:"Dmt",color:"#0891b2",name:"Dimethyltyrosine"},{x:110,y:50,label:"K",color:"#d97706",name:"Lysine"},{x:150,y:50,label:"F",color:"#7c3aed",name:"Phenylalanine"}], legend: "D-Arg=D-Arginine  Dmt=Dimethyltyrosine  K=Lysine  F=Phenylalanine" },
    indications: { mostEffective: [{title:"Mitochondrial Dysfunction",desc:"Primary target — cristae stabilisation"},{title:"Ischaemia-Reperfusion",desc:"Cardioprotection in cardiac models"},{title:"Age-Related Decline",desc:"Mitochondrial rejuvenation in aging"},{title:"Neurodegeneration",desc:"Protects mitochondrial function in neurons"}], effective: [{title:"Heart Failure",desc:"Improved cardiac energetics"},{title:"Kidney Disease",desc:"Renal mitochondrial protection"},{title:"Ophthalmic Conditions",desc:"Retinal mitochondrial preservation"}], moderate: [{title:"Metabolic Syndrome",desc:"Mitochondrial dysfunction associated"}] },
    dosing: { note: "Clinical doses range from 0.25–4 mg/kg/day depending on indication.", rows: [{goal:"Neuroprotection",dose:"0.25-0.5 mg/kg",freq:"Once daily",route:"SC"},{goal:"Cardioprotection",dose:"1-2 mg/kg",freq:"Once daily",route:"IV/SC"},{goal:"Ophthalmic",dose:"0.5-1 mg/kg",freq:"Once daily",route:"SC"}], tips: ["Administer SC for outpatient protocols","Morning dosing preferred for circadian alignment","Can be reconstituted with bacteriostatic water and refrigerated","Clinical data supports excellent safety up to 24 months"] },
    interactions: { note: "Compatible with most mitochondrial health protocols.", cards: [{slug:"mots-c",name:"MOTS-c",desc:"Complementary mito peptide",effect:"Synergistic"},{slug:"nad-plus",name:"NAD+",desc:"Mito energetics support",effect:"Synergistic"},{slug:"ghk-cu",name:"GHK-Cu",desc:"Cellular repair",effect:"Complementary"}], stackNotes: ["Pairs well with MOTS-c for dual mito targeting","Avoid concurrent SS-31 and general antioxidants (blunts ROS signalling)","Can cycle with NAD+ precursors"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Mitochondrial stabilisation begins",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Energetic",desc:"Improved cellular energy levels",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-24",title:"Sustained",desc:"Long-term mitochondrial health",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Excellent Profile",text:"Well-tolerated in 20+ clinical trials",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild GI",text:"Transient nausea at high doses",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Szeto HH, et al. AAPS J. 2006;8(2):E277-E283.","Birk AV, et al. J Am Soc Nephrol. 2013;24(8):1250-1261.","Kloner RA, et al. J Am Heart Assoc. 2018;7(10):e008536.","Chavez JD, et al. J Lipid Res. 2020;61(4):612-623.","Saad A, et al. Kidney Int Rep. 2020;5(9):1462-1470."],
  },

  "kpv": {
    overview: { whatIs: "KPV (Lysine-Proline-Valine) is the C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (α-MSH). Despite its small size, KPV is a potent anti-inflammatory peptide that acts through melanocortin receptor pathways to reduce pro-inflammatory cytokine production, making it valuable for inflammatory bowel disease (IBD), skin inflammation, and systemic inflammatory conditions.", mechanism: "KPV binds to melanocortin-1 receptors (MC1R) on immune cells, activating the cAMP/PKA signalling cascade that downregulates NF-κB nuclear translocation. This reduces TNF-α, IL-6, and IL-1β production while simultaneously upregulating anti-inflammatory cytokines like IL-10 — a dual mechanism that resolves inflammation without immunosuppression.", benefits: ["Potent anti-inflammatory signalling via MC1R agonism","Reduction in TNF-α, IL-6, and IL-1β production","Promotion of anti-inflammatory IL-10 secretion","Gut barrier protection in IBD models","Synergistic with GHK-Cu when combined in KLOW blends","Excellent safety profile as a naturally occurring peptide fragment"] },
    molecular: { items: [{label:"Molecular Weight",value:"342.43 Da"},{label:"Sequence",value:"Lys-Pro-Val"},{label:"Length",value:"3 amino acids"},{label:"Type",value:"α-MSH C-terminal fragment"},{label:"CAS Number",value:"121745-92-0"}], diagramTitle: "KPV", diagramSubtitle: "3-mer · 342.43 Da · Lys-Pro-Val", residues: [{x:30,y:50,label:"K",color:"#8b5cf6",name:"Lysine"},{x:70,y:50,label:"P",color:"#0891b2",name:"Proline"},{x:110,y:50,label:"V",color:"#d97706",name:"Valine"}], legend: "K=Lysine  P=Proline  V=Valine" },
    indications: { mostEffective: [{title:"Inflammatory Bowel Disease",desc:"Primary research target — gut inflammation"},{title:"Skin Inflammation",desc:"Topical and systemic applications"},{title:"Systemic Inflammation",desc:"Broad anti-inflammatory via MC1R"}], effective: [{title:"Gut Barrier Integrity",desc:"Reduces intestinal permeability"},{title:"Autoimmune Conditions",desc:"Modulates immune response"}], moderate: [{title:"Fibrosis",desc:"Anti-fibrotic potential"}] },
    dosing: { note: "Lowest effective dose is recommended for inflammation protocols.", rows: [{goal:"General Anti-Inflammatory",dose:"1-3 mg",freq:"Once daily",route:"SC"},{goal:"Gut Protocol",dose:"1-2 mg",freq:"Once daily",route:"SC/Orally"},{goal:"Topical",dose:"As directed",freq:"1-2x daily",route:"Topical"}], tips: ["KPV is often combined with GHK-Cu in KLOW blends","Oral bioavailability is limited; SC preferred","Buccal/sublingual may be effective for gut conditions","Store lyophilised at -20°C for extended stability"] },
    interactions: { note: "KPV synergises strongly with copper peptides and GHK-Cu.", cards: [{slug:"ghk-cu",name:"GHK-Cu",desc:"Anti-inflammatory synergy",effect:"Synergistic"},{slug:"glow",name:"Glow blend",desc:"Enhanced tissue repair",effect:"Synergistic"},{slug:"bpc-157",name:"BPC-157",desc:"Gut repair complement",effect:"Complementary"}], stackNotes: ["KLOW = KPV + GHK-Cu + BPC-157 + TB-500 — the four-way anti-inflammatory stack","Can be stacked with BPC-157 for comprehensive gut repair","Avoid high-dose NSAIDs which may blunt KPV effects"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"MC1R activation begins",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Anti-Inflammatory",desc:"Cytokine modulation established",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 6-12",title:"Maintenance",desc:"Sustained inflammation control",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Excellent Safety",text:"Naturally occurring tripeptide",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Injection",text:"Minor site irritation possible",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Catania A, et al. Pharmacol Rev. 2004;56(1):1-29.","Getting SJ. Trends Pharmacol Sci. 2002;23(9):428-432.","Luger TA, et al. Ann N Y Acad Sci. 2003;994:171-179.","Brzoska T, et al. Ann N Y Acad Sci. 2008;1144:106-114.","Maaser C, et al. Clin Exp Gastroenterol. 2016;9:151-159."],
  },

  "semax": {
    overview: { whatIs: "Semax is a synthetic heptapeptide analog of adrenocorticotropic hormone (ACTH 4-10) developed in Russia, where it has been used clinically since the 1990s as a registered nootropic medication. It is a potent neuroprotective and cognitive-enhancing peptide that increases brain-derived neurotrophic factor (BDNF) and nerve growth factor (NGF) levels, improving memory, attention, and recovery from brain injury.", mechanism: "Semax acts through multiple pathways: it activates TrkB receptors leading to BDNF upregulation, modulates the serotonin and dopamine systems, enhances synaptic plasticity via increased PSD-95 expression, and reduces oxidative stress through SOD and glutathione peroxidase activation. Its unique Pro-Gly-Pro C-terminal sequence confers resistance to enzymatic degradation, giving it a longer half-life than native ACTH fragments.", benefits: ["Clinically proven nootropic with decades of human use","Potent BDNF and NGF upregulation for neuroplasticity","Improved memory consolidation and recall in human studies","Accelerated recovery from stroke and brain injury","Enhanced attention and cognitive performance","Registered medication in Russia — extensive clinical safety data"] },
    molecular: { items: [{label:"Molecular Weight",value:"613.75 Da"},{label:"Sequence",value:"Met-Glu-His-Phe-Pro-Gly-Pro"},{label:"Length",value:"7 amino acids"},{label:"Type",value:"ACTH(4-10) analog | Nootropic peptide"},{label:"Half-Life",value:"~30 minutes (intranasal)"},{label:"CAS Number",value:"80714-61-0"}], diagramTitle: "Semax", diagramSubtitle: "7-mer · 613.75 Da · MEHFPGP", residues: [{x:30,y:50,label:"M",color:"#8b5cf6",name:"Met"},{x:60,y:50,label:"E",color:"#0891b2",name:"Glu"},{x:90,y:50,label:"H",color:"#d97706",name:"His"},{x:120,y:50,label:"F",color:"#7c3aed",name:"Phe"},{x:150,y:50,label:"P",color:"#059669",name:"Pro"},{x:180,y:50,label:"G",color:"#6366f1",name:"Gly"},{x:210,y:50,label:"P",color:"#db2777",name:"Pro"}], legend: "M=Met  E=Glu  H=His  F=Phe  P=Pro  G=Gly  P=Pro" },
    indications: { mostEffective: [{title:"Cognitive Enhancement",desc:"Primary — memory, attention, learning"},{title:"Ischaemic Stroke",desc:"Accelerates neurological recovery"},{title:"Neuroprotection",desc:"BDNF-mediated neuronal survival"},{title:"Brain Injury",desc:"Reduces recovery time in TBI"}], effective: [{title:"Age-Related Decline",desc:"Improves cognitive function in aging"},{title:"Anxiety",desc:"Anxiolytic effects via BDNF"},{title:"ADHD",desc:"Improves attention parameters"}], moderate: [{title:"Glaucoma",desc:"Neuroprotective in optic nerve"}] },
    dosing: { note: "Semax is most commonly administered intranasally for optimal CNS delivery.", rows: [{goal:"Cognitive Enhancement",dose:"400-800 mcg",freq:"2-3x daily",route:"Intranasal"},{goal:"Stroke Recovery",dose:"200-400 mcg",freq:"3x daily",route:"Intranasal"},{goal:"N-Acetyl Semax Amidate",dose:"200-400 mcg",freq:"1-2x daily",route:"Intranasal"}], tips: ["Intranasal administration bypasses BBB for CNS delivery","N-Acetyl Semax Amidate has longer half-life and higher potency","Morning and early afternoon dosing to avoid sleep disruption","Can be stored at room temperature after reconstitution for 7 days"] },
    interactions: { note: "Semax pairs well with other nootropics and neuroprotective peptides.", cards: [{slug:"selank",name:"Selank",desc:"Anxiolytic pairing",effect:"Synergistic"},{slug:"cerebrolysin",name:"Cerebrolysin",desc:"Neurotrophic synergy",effect:"Synergistic"},{slug:"dihexa",name:"Dihexa",desc:"BDNF upregulation amplifier",effect:"Complementary"}], stackNotes: ["Semax + Selank are the classic 'Cognitive Signalling Set'","NA-Semax Amidate is preferred for all-day protocols","Can cycle with Cerebrolysin for extended neurotrophic support"] },
    timeline: { phases: [{day:"Day 1-3",title:"Acute",desc:"Immediate alertness and focus",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 1-4",title:"Adaptation",desc:"BDNF upregulation occurs",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 4-8",title:"Sustained",desc:"Cognitive improvements plateau",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Excellent Clinical Record",text:"Decades of human use in Russia",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild CNS Stimulation",text:"May cause jitteriness in sensitive users",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Grigoriev VV, et al. Bull Exp Biol Med. 1996;121(5):487-489.","Dmitrieva VG, et al. Bull Exp Biol Med. 2012;153(3):352-355.","Kaplan AY, et al. Neurosci Behav Physiol. 2010;40(9):1041-1048.","Kovalchuk VV, et al. Zh Nevrol Psikhiatr Im S S Korsakova. 2015;115(7):49-54.","Bokareva DA, et al. Bull Exp Biol Med. 2018;165(2):236-240."],
  },

  "ghrp-6": {
    overview: { whatIs: "GHRP-6 (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide growth hormone secretagogue that powerfully stimulates endogenous GH release. It belongs to the GHRP family alongside GHRP-2, Ipamorelin, and Hexarelin, but is distinguished by a robust appetite-stimulating effect through ghrelin receptor agonism at equivalent potency to the hunger hormone itself.", mechanism: "GHRP-6 is a potent agonist at the ghrelin/growth hormone secretagogue receptor (GHSR-1a) in the pituitary and hypothalamus. It triggers somatotroph GH release via the PLC/IP3 signalling cascade and calcium mobilisation. Unlike GHRP-2 or Ipamorelin, GHRP-6 also significantly activates neuropeptide Y (NPY) and AgRP neurons in the arcuate nucleus, producing a pronounced increase in appetite.", benefits: ["Powerful GH pulse stimulation — higher amplitude than Ipamorelin","Significant appetite increase via GHSR-1a activation","Synergistic with GHRH (CJC-1295, Sermorelin, Tesamorelin)","Improved sleep quality through GH pulse enhancement","Well-characterised in research — established GHRP reference compound","Stimulates both pulsatile and total GH secretion"] },
    molecular: { items: [{label:"Molecular Weight",value:"872.95 Da"},{label:"Sequence",value:"His-D-Trp-Ala-Trp-D-Phe-Lys-NH₂"},{label:"Length",value:"6 amino acids"},{label:"Type",value:"GH secretagogue | GHSR-1a agonist"},{label:"Half-Life",value:"~30-60 minutes"},{label:"CAS Number",value:"87616-84-0"},{label:"Purity",value:"≥99%"},{label:"Form",value:"Lyophilized powder"}], diagramTitle: "GHRP-6", diagramSubtitle: "6-mer · 872.95 Da · H-D-W-A-W-F-K-NH₂", residues: [{x:20,y:50,label:"H",color:"#8b5cf6",name:"His"},{x:50,y:50,label:"w",color:"#0891b2",name:"D-Trp"},{x:80,y:50,label:"A",color:"#d97706",name:"Ala"},{x:110,y:50,label:"W",color:"#7c3aed",name:"Trp"},{x:140,y:50,label:"f",color:"#059669",name:"D-Phe"},{x:170,y:50,label:"K",color:"#6366f1",name:"Lys"}], legend: "H=His  w=D-Trp  A=Ala  W=Trp  f=D-Phe  K=Lys" },
    indications: { mostEffective: [{title:"Growth Hormone Deficiency",desc:"Potent GH stimulation"},{title:"Appetite Stimulation",desc:"Ghrelin-mimetic hunger effects"},{title:"Muscle Wasting",desc:"Counteracts cachexia via GH"},{title:"Anti-Aging",desc:"GH/IGF-1 restoration"}], effective: [{title:"Recovery Enhancement",desc:"GH-mediated tissue repair"},{title:"Fat Loss",desc:"GH-driven lipolysis"}], moderate: [{title:"Sleep Quality",desc:"Improved nocturnal GH pulse"}] },
    dosing: { note: "GHRP-6 is typically dosed alongside a GHRH analogue for synergistic GH release.", rows: [{goal:"Standard GH Protocol",dose:"100-200 mcg",freq:"2-3x daily",route:"SC"},{goal:"Appetite Protocol",dose:"100-150 mcg",freq:"1-2x daily",route:"SC"},{goal:"Anti-Aging",dose:"100-200 mcg",freq:"2x daily",route:"SC"}], tips: ["Always use with a GHRH (CJC-1295, Sermorelin, Tesamorelin) for maximal GH release","Do not eat 30 minutes before or after dosing (blocks GH pulse)","Evening dose leverages natural nocturnal GH production","GHRP-6 causes significantly more hunger than GHRP-2 or Ipamorelin"] },
    interactions: { note: "GHRP-6 synergises with GHRH analogs and stacks well with other GH secretagogues.", cards: [{slug:"cjc-1295",name:"CJC-1295",desc:"Synergistic GH release",effect:"Synergistic"},{slug:"tesamorelin",name:"Tesamorelin",desc:"GHRH pairing",effect:"Synergistic"},{slug:"ghrp-2",name:"GHRP-2",desc:"Alternative GHRP",effect:"Complementary"}], stackNotes: ["GHRP-6 + CJC-1295 is the classic research stack","GHRP-6 produces stronger appetite effect than GHRP-2","Can be cycled with Hexarelin to prevent receptor desensitisation"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse amplitude increases",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Peak GH and IGF-1 levels",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"Results plateau, cycle off",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Common GHRP safety profile",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Appetite Increase",text:"Significant hunger from ghrelin agonism",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"},{label:"Cortisol Elevation",text:"Mild transient increase possible",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Bowers CY, et al. Endocrinology. 1984;114(5):1549-1557.","Ghigo E, et al. J Clin Endocrinol Metab. 1994;78(3):693-698.","Korbonits M, et al. J Clin Endocrinol Metab. 1999;84(7):2483-2488.","Kovacs M, et al. J Clin Endocrinol Metab. 1996;81(7):2695-2702.","Pihoker C, et al. J Clin Endocrinol Metab. 1995;80(10):2989-2993."],
  },

  "nad": {
    overview: { whatIs: "NAD+ (Nicotinamide Adenine Dinucleotide) is a fundamental coenzyme found in every living cell, essential for cellular energy metabolism, DNA repair, and sirtuin activation. As a critical electron carrier in redox reactions, NAD+ levels decline with age — a phenomenon linked to mitochondrial dysfunction, metabolic decline, and age-related disease. NAD+ supplementation has become one of the most researched anti-aging interventions in modern biology.", mechanism: "NAD+ serves dual roles: as a redox cofactor in over 500 enzymatic reactions (accepting hydride equivalents from metabolic substrates), and as a substrate for PARP enzymes (DNA repair), CD38 (calcium signalling), and sirtuins (longevity-associated deacetylases). NAD+ depletion impairs mitochondrial function and genomic maintenance; replenishment restores sirtuin activity and mitochondrial health.", benefits: ["Essential coenzyme for cellular energy (ATP) production via glycolysis and OXPHOS","Critical substrate for sirtuins — the longevity-associated protein deacetylase family","Required for PARP-mediated DNA repair mechanisms","Declines with age — supplementation addresses a fundamental aging mechanism","Supports mitochondrial biogenesis and function","Clinically studied for metabolic health, cognitive ageing, and energy"] },
    molecular: { items: [{label:"Molecular Weight",value:"663.43 Da"},{label:"Molecular Formula",value:"C₂₁H₂₇N₇O₁₄P₂"},{label:"Type",value:"Coenzyme | Redox carrier"},{label:"Half-Life",value:"~1-4 hours (varies by administration route)"},{label:"CAS Number",value:"53-84-9"},{label:"Alt Names",value:"NAD, NAD+, Coenzyme I, DPN"}], diagramTitle: "NAD+", diagramSubtitle: "663.43 Da · Nicotinamide Adenine Dinucleotide", residues: [{x:20,y:50,label:"NAM",color:"#8b5cf6",name:"Nicotinamide"},{x:60,y:50,label:"Rib",color:"#0891b2",name:"Ribose"},{x:100,y:50,label:"P-P",color:"#d97706",name:"Pyrophosphate"},{x:140,y:50,label:"Rib",color:"#059669",name:"Ribose"},{x:180,y:50,label:"Ade",color:"#7c3aed",name:"Adenine"}], legend: "NAM=Nicotinamide  Rib=Ribose  PP=Pyrophosphate  Ade=Adenine" },
    indications: { mostEffective: [{title:"Age-Related NAD+ Decline",desc:"Primary — replenish age-associated loss"},{title:"Metabolic Health",desc:"Improves mitochondrial function"},{title:"Cellular Energy",desc:"ATP production support"}], effective: [{title:"Cognitive Ageing",desc:"Neuronal energy support"},{title:"DNA Repair",desc:"PARP substrate for genomic maintenance"},{title:"Athletic Performance",desc:"Mitochondrial biogenesis"}], moderate: [{title:"Circadian Rhythm",desc:"NAD+ influences clock genes"}] },
    dosing: { note: "NAD+ can be administered via injection, oral precursors (NMN/NR), or intranasal spray.", rows: [{goal:"IV Therapy",dose:"250-1000 mg",freq:"1-2x per week",route:"IV"},{goal:"SC Injection",dose:"100-250 mg",freq:"2-3x per week",route:"SC"},{goal:"Intranasal",dose:"50-100 mg",freq:"Daily",route:"Intranasal"}], tips: ["SC injections are slower but more convenient than IV","Intranasal NAD+ is preferred for cognitive effects","NAD+ precursors (NMN, NR) offer an oral alternative","Morning dosing aligns with natural NAD+ circadian rhythm"] },
    interactions: { note: "NAD+ complements mitochondrial and metabolic peptides.", cards: [{slug:"ss-31",name:"SS-31",desc:"Mitochondrial cristae support",effect:"Synergistic"},{slug:"mots-c",name:"MOTS-c",desc:"Mito signalling complement",effect:"Synergistic"},{slug:"ghk-cu",name:"GHK-Cu",desc:"Cellular repair synergy",effect:"Complementary"}], stackNotes: ["NAD+ + SS-31 covers both mitochondrial structure and energetics","NAD+ + MOTS-c addresses mito signalling from both directions","Avoid concurrent high-dose alcohol which depletes NAD+"] },
    timeline: { phases: [{day:"Week 1-2",title:"Acute",desc:"Immediate energy improvement",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Adaptation",desc:"Mitochondrial biogenesis",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Month 2-6",title:"Sustained",desc:"Cellular NAD+ pool restored",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Tolerated",text:"Generally safe at standard doses",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Injection Reactions",text:"Site irritation possible at high volumes",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Canto C, et al. Nature. 2015;518(7539):E1-E2.","Yoshino J, et al. Cell Metab. 2018;27(3):513-528.","Rajman L, et al. Cell Metab. 2018;27(3):529-547.","Imai S, et al. Trends Cell Biol. 2014;24(8):464-471.","Verdin E. Science. 2015;350(6265):1208-1213."],
  },

  "ghrp-2": {
    overview: { whatIs: "GHRP-2 (Pralmorelin) is a synthetic hexapeptide growth hormone secretagogue that stimulates GH release from the pituitary. Developed later than GHRP-6, GHRP-2 provides similar GH pulse amplitude with a cleaner pharmacological profile — it induces less appetite stimulation and cortisol release, making it a preferred choice for GH enhancement protocols where appetite modulation is undesirable.", mechanism: "GHRP-2 binds selectively to growth hormone secretagogue receptors (GHSR-1a) on pituitary somatotrophs and hypothalamic neurons. It activates the phospholipase C (PLC) signalling cascade, increasing intracellular calcium and triggering GH exocytosis. Compared to GHRP-6, it has higher binding affinity to GHSR-1a but produces less ghrelin-like appetite stimulation. When combined with a GHRH analogue (CJC-1295, Sermorelin, or Tesamorelin), GH release is synergistically amplified.", benefits: ["Potent GH secretagogue — equivalent pulse amplitude to GHRP-6","Lower appetite stimulation than GHRP-6 — preferred for lean protocols","Reduced cortisol and prolactin elevation vs GHRP-6","Synergistic GH release when paired with GHRH analogues","Well-characterised pharmacokinetics with rapid onset","Cleaner research profile for GH enhancement studies"] },
    molecular: { items: [{label:"Molecular Weight",value:"817.93 Da"},{label:"Sequence",value:"D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH₂"},{label:"Length",value:"6 amino acids"},{label:"Type",value:"GH secretagogue | GHSR-1a agonist"},{label:"Half-Life",value:"~30-60 minutes"},{label:"CAS Number",value:"87616-84-0"},{label:"Purity",value:"≥99%"},{label:"Form",value:"Lyophilized powder"}], diagramTitle: "GHRP-2", diagramSubtitle: "6-mer · 817.93 Da · Pralmorelin", residues: [{x:20,y:50,label:"a",color:"#8b5cf6",name:"D-Ala"},{x:55,y:50,label:"Nal",color:"#0891b2",name:"D-2-Nal"},{x:90,y:50,label:"A",color:"#d97706",name:"Ala"},{x:125,y:50,label:"W",color:"#7c3aed",name:"Trp"},{x:160,y:50,label:"f",color:"#059669",name:"D-Phe"},{x:195,y:50,label:"K",color:"#6366f1",name:"Lys"}], legend: "a=D-Ala  Nal=2-Naphthylalanine  A=Ala  W=Trp  f=D-Phe  K=Lys" },
    indications: { mostEffective: [{title:"GH Deficiency Research",desc:"Potent GH pulse stimulation"},{title:"Body Composition",desc:"Lean mass and fat loss via GH"},{title:"Anti-Aging",desc:"GH/IGF-1 restoration protocols"}], effective: [{title:"Recovery Enhancement",desc:"GH-mediated tissue repair"},{title:"Sleep Quality",desc:"Enhanced nocturnal GH pulses"}], moderate: [{title:"Cognitive Function",desc:"IGF-1 mediated neuroprotection"}] },
    dosing: { note: "GHRP-2 is typically administered alongside a GHRH analogue for synergistic effect.", rows: [{goal:"Standard Protocol",dose:"100-200 mcg",freq:"2-3x daily",route:"SC"},{goal:"With CJC-1295",dose:"100-150 mcg",freq:"2x daily",route:"SC"},{goal:"Anti-Aging",dose:"100-200 mcg",freq:"1-2x daily",route:"SC"}], tips: ["Do not eat 30 min before or after dosing (blocks GH pulse)","GHRP-2 causes less hunger than GHRP-6 — better for cutting cycles","Pairs optimally with CJC-1295 no DAC for synergistic GH release","Evening dose aligns with natural GH surge"] },
    interactions: { note: "GHRP-2 synergises strongly with GHRH analogues for amplified GH release.", cards: [{slug:"cjc-1295",name:"CJC-1295",desc:"Synergistic GH pulse",effect:"Synergistic"},{slug:"tesamorelin",name:"Tesamorelin",desc:"Alternative GHRH pair",effect:"Synergistic"},{slug:"ghrp-6",name:"GHRP-6",desc:"Stronger appetite GHRP",effect:"Complementary"}], stackNotes: ["GHRP-2 + CJC-1295 no DAC is the preferred research stack","Switch to GHRP-6 if appetite stimulation is desired","Can cycle with Hexarelin to maintain sensitivity"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse amplitude increases",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Peak GH and IGF-1 levels",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"Results plateau, cycle off",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Clean Profile",text:"Lower cortisol than GHRP-6",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Hunger",text:"Minimal appetite increase",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Bowers CY, et al. J Clin Endocrinol Metab. 1995;80(2):550-555.","Ghigo E, et al. J Clin Endocrinol Metab. 1994;78(3):693-698.","Kovacs M, et al. J Clin Endocrinol Metab. 1996;81(7):2695-2702.","Deghenghi R, et al. Life Sci. 1994;54(26):PL473-PL478.","Cordido F, et al. Eur J Endocrinol. 1995;133(6):669-674."],
  },

  "hexarelin": {
    overview: { whatIs: "Hexarelin is a synthetic hexapeptide growth hormone secretagogue belonging to the GHRP family, structurally similar to GHRP-6 but more resistant to enzymatic degradation, giving it a longer duration of action. Developed in the 1990s, it is one of the most potent GH secretagogues in the GHRP class, capable of producing strong GH pulses with a unique cardioprotective profile independent of its GH-releasing effects.", mechanism: "Hexarelin binds to growth hormone secretagogue receptors (GHSR-1a) with high affinity, triggering GH release through PLC/IP3-mediated calcium mobilisation. A distinguishing feature is that Hexarelin also binds to CD36 receptors in cardiovascular tissues, where it exerts direct cardioprotective and anti-inflammatory effects — a property unique among the GHRP family.", benefits: ["Potent GH secretagogue with longer duration than GHRP-6","Unique CD36-mediated cardioprotective effects","Improved enzymatic stability — longer half-life than other GHRPs","Sustained GH pulses compared to GHRP-2 and GHRP-6","Can be used in rotation to prevent GHRP receptor desensitisation","Cardioprotective properties independent of GH release"] },
    molecular: { items: [{label:"Molecular Weight",value:"886.96 Da"},{label:"Sequence",value:"His-D-2-Methyl-Trp-Ala-Trp-D-Phe-Lys-NH₂"},{label:"Length",value:"6 amino acids"},{label:"Type",value:"GH secretagogue | GHSR-1a agonist"},{label:"Half-Life",value:"~1-2 hours"},{label:"CAS Number",value:"170566-50-2"},{label:"Purity",value:"≥99%"}], diagramTitle: "Hexarelin", diagramSubtitle: "6-mer · 886.96 Da · H-w(Me)-A-W-f-K-NH₂", residues: [{x:20,y:50,label:"H",color:"#8b5cf6",name:"His"},{x:55,y:50,label:"w(Me)",color:"#0891b2",name:"D-2-Me-Trp"},{x:90,y:50,label:"A",color:"#d97706",name:"Ala"},{x:125,y:50,label:"W",color:"#7c3aed",name:"Trp"},{x:160,y:50,label:"f",color:"#059669",name:"D-Phe"},{x:195,y:50,label:"K",color:"#6366f1",name:"Lys"}], legend: "H=His  w(Me)=D-2-Methyl-Trp  A=Ala  W=Trp  f=D-Phe  K=Lys" },
    indications: { mostEffective: [{title:"GH Deficiency Research",desc:"Potent, sustained GH secretion"},{title:"Cardioprotection",desc:"CD36-mediated cardiac effects"},{title:"Muscle Wasting",desc:"GH-mediated anticatabolic effects"}], effective: [{title:"Metabolic Health",desc:"GH-driven lipolysis"},{title:"Anti-Aging",desc:"GH/IGF-1 restoration"}], moderate: [{title:"Bone Health",desc:"GH-mediated bone turnover"}] },
    dosing: { note: "Hexarelin's longer half-life allows for less frequent dosing than other GHRPs.", rows: [{goal:"Standard Protocol",dose:"100-200 mcg",freq:"2x daily",route:"SC"},{goal:"With GHRH",dose:"100-200 mcg",freq:"1-2x daily",route:"SC"},{goal:"Cardioprotection",dose:"100-200 mcg",freq:"Once daily",route:"SC"}], tips: ["Longer duration allows for twice-daily instead of thrice-daily dosing","Can rotate with GHRP-2 or GHRP-6 to prevent receptor desensitisation","Pairs well with CJC-1295 or Sermorelin","Do not eat 30 min before or after dosing"] },
    interactions: { note: "Hexarelin pairs well with GHRH analogues and offers unique cardioprotective stacking options.", cards: [{slug:"cjc-1295",name:"CJC-1295",desc:"Synergistic GH release",effect:"Synergistic"},{slug:"ghrp-2",name:"GHRP-2",desc:"Rotation cycling partner",effect:"Complementary"},{slug:"ss-31",name:"SS-31",desc:"Cardiac mito protection",effect:"Synergistic"}], stackNotes: ["Rotate Hexarelin with GHRP-2 every 4-6 weeks to maintain sensitivity","Hexarelin + SS-31 provides dual cardioprotective support","Can be used as a higher-potency alternative to Ipamorelin"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse amplitude increases",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"Sustained GH secretion",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-12",title:"Sustained",desc:"Protocol end — cycle off",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Characterised",text:"Extensive safety data as GHRP",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"GH Suppression",text:"Monitor for GH suppression on extended cycles",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Deghenghi R, et al. J Endocrinol Invest. 1994;17(5):337-341.","Ghigo E, et al. J Clin Endocrinol Metab. 1995;80(10):2994-2999.","Bisi G, et al. J Clin Endocrinol Metab. 1999;84(1):251-256.","Maccario M, et al. J Endocrinol Invest. 1996;19(9):617-622.","Bodart V, et al. Circ Res. 2002;90(7):782-788."],
  },

  "sermorelin": {
    overview: { whatIs: "Sermorelin (GRF 1-29) is a synthetic fragment of human growth hormone-releasing hormone (GHRH), consisting of the first 29 amino acids of the 44-amino-acid endogenous GHRH molecule. It was developed as a bio-identical GHRH analogue that stimulates the pituitary to release growth hormone in a pulsatile, physiological manner. Unlike GH secretagogues (GHRPs) that work through the ghrelin receptor, Sermorelin acts through the GHRH receptor, providing more physiological GH release without appetite stimulation.", mechanism: "Sermorelin binds to GHRH receptors on anterior pituitary somatotrophs, activating the cAMP/PKA signalling cascade. This stimulates both GH synthesis and pulsatile release, mimicking the natural hypothalamic GHRH signal. The 29-amino-acid fragment retains the full biological activity of the native 44-amino-acid GHRH while being more stable in solution. Sermorelin's action is synergistic with GHRP compounds, which work through a different receptor pathway.", benefits: ["Physiological GH release — mimics natural GHRH signalling","No appetite stimulation (unlike GHRP-6)","Minimal cortisol or prolactin elevation","Synergistic with all GHRP compounds (GHRP-2, GHRP-6, Ipamorelin, Hexarelin)","Clinically used in GH deficiency — registered therapeutic","Preserves pulsatile GH pattern for more physiological effects"] },
    molecular: { items: [{label:"Molecular Weight",value:"3,358.85 Da"},{label:"Sequence",value:"Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH₂"},{label:"Length",value:"29 amino acids"},{label:"Type",value:"GHRH analogue | GRF 1-29"},{label:"Half-Life",value:"~12 minutes"},{label:"CAS Number",value:"108612-45-9"},{label:"Alt Name",value:"GRF 1-29, GHRH 1-29"}], diagramTitle: "Sermorelin", diagramSubtitle: "29-mer · 3.36 kDa · GRF (1-29)", residues: [{x:10,y:50,label:"1-10",color:"#8b5cf6",name:"N-terminal"},{x:60,y:50,label:"11-20",color:"#0891b2",name:"Core region"},{x:120,y:50,label:"21-29",color:"#d97706",name:"C-terminal"}], legend: "29-amino-acid GHRH fragment" },
    indications: { mostEffective: [{title:"Growth Hormone Deficiency",desc:"Primary therapeutic indication"},{title:"Anti-Aging",desc:"GH/IGF-1 restoration"},{title:"Body Composition",desc:"Lean mass and fat reduction"}], effective: [{title:"Recovery Enhancement",desc:"GH-mediated tissue repair"},{title:"Bone Density",desc:"Improved bone turnover via GH"}], moderate: [{title:"Cognitive Function",desc:"IGF-1 neuroprotection"}] },
    dosing: { note: "Sermorelin is typically dosed alongside a GHRP for synergistic GH release.", rows: [{goal:"GH Deficiency",dose:"200-400 mcg",freq:"Once daily",route:"SC"},{goal:"Anti-Aging",dose:"200-300 mcg",freq:"Once daily",route:"SC"},{goal:"With GHRP",dose:"100-200 mcg",freq:"1-2x daily",route:"SC"}], tips: ["Bedtime dose aligns with natural GH surge","Do not eat 30 minutes before or after dosing","Sermorelin is short-acting (~12 min half-life) — pair with a GHRP","Consider CJC-1295 with DAC for longer-acting alternative"] },
    interactions: { note: "Sermorelin synergises with all GHRP compounds for amplified GH release.", cards: [{slug:"ipamorelin",name:"Ipamorelin",desc:"Classic research pairing",effect:"Synergistic"},{slug:"ghrp-2",name:"GHRP-2",desc:"Potent GH pairing",effect:"Synergistic"},{slug:"cjc-1295",name:"CJC-1295",desc:"Longer-acting GHRH alternative",effect:"Complementary"}], stackNotes: ["Sermorelin + Ipamorelin: the classic research stack","Sermorelin + GHRP-2: more potent alternative","Can switch to CJC-1295 with DAC for less frequent dosing"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"GH pulse normalisation",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-8",title:"Active",desc:"IGF-1 levels rising",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 8-16",title:"Full Effect",desc:"Therapeutic GH response",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Registered Therapeutic",text:"Used in GH deficiency clinics",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Injection",text:"Minor site reactions possible",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Thorner MO, et al. J Clin Endocrinol Metab. 1985;60(6):1117-1123.","Jaffe CA, et al. J Clin Endocrinol Metab. 1993;76(5):1226-1231.","Pihoker C, et al. J Clin Endocrinol Metab. 1995;80(10):2989-2993.","Khorram O, et al. J Clin Endocrinol Metab. 1997;82(5):1480-1484.","Bryant J, et al. Cochrane Database Syst Rev. 2007;(1):CD005537."],
  },

  "thymosin-alpha-1": {
    overview: { whatIs: "Thymosin Alpha-1 (Tα1) is a 28-amino-acid immunomodulating peptide originally isolated from thymic tissue. It is one of the most clinically studied immune peptides, approved in over 30 countries for the treatment of hepatitis B and C, and used as an immune adjuvant in cancer therapy. Tα1 enhances both innate and adaptive immune responses, activates dendritic cells, and promotes T-cell maturation — making it a powerful immune system modulator rather than a simple stimulator.", mechanism: "Thymosin Alpha-1 acts through Toll-like receptor (TLR) signalling, particularly TLR2 and TLR9, to activate myeloid dendritic cells and promote Th1 immune responses. It upregulates MHC class I expression, enhances NK cell activity, stimulates IL-12 and IFN-γ production, and promotes the differentiation of CD4+ and CD8+ T cells. Tα1 also reduces Treg activity, enhancing the immune system's ability to respond to pathogens and cancer.", benefits: ["Potent immunomodulator — enhances both innate and adaptive immunity","Approved therapeutic in 30+ countries for viral hepatitis","Activates dendritic cells and promotes T-cell maturation","Enhances NK cell activity and IFN-γ production","Reduces Treg suppression for improved immune response","Clinically safe with extensive human use data"] },
    molecular: { items: [{label:"Molecular Weight",value:"3,108.27 Da"},{label:"Sequence",value:"Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn"},{label:"Length",value:"28 amino acids"},{label:"Type",value:"Thymic peptide | Immunomodulator"},{label:"Half-Life",value:"~1-2 hours"},{label:"CAS Number",value:"62304-98-7"},{label:"Alt Name",value:"Tα1, Thymalfasin, Zadaxin"}], diagramTitle: "TA1", diagramSubtitle: "28-mer · 3.11 kDa · Thymosin Alpha-1", residues: [{x:10,y:50,label:"1-10",color:"#8b5cf6",name:"Acidic N-term"},{x:60,y:50,label:"11-20",color:"#0891b2",name:"Core"},{x:120,y:50,label:"21-28",color:"#d97706",name:"C-term"}], legend: "Acidic peptide · pI ~4.2" },
    indications: { mostEffective: [{title:"Immune Deficiency",desc:"Primary — enhances immune function"},{title:"Hepatitis B/C",desc:"Approved therapeutic indication"},{title:"Cancer Adjuvant",desc:"Improves immune response to tumours"}], effective: [{title:"Viral Infections",desc:"Broad antiviral immune enhancement"},{title:"Vaccine Adjuvant",desc:"Enhanced vaccine response"}], moderate: [{title:"Autoimmune Modulation",desc:"Balances immune response"}] },
    dosing: { note: "Standard clinical dosing is 1.6 mg SC twice weekly, but research protocols vary.", rows: [{goal:"Viral Hepatitis",dose:"1.6 mg",freq:"Twice weekly",route:"SC"},{goal:"Immune Support",dose:"1-2 mg",freq:"2-3x per week",route:"SC"},{goal:"Cancer Adjuvant",dose:"1.6-3.2 mg",freq:"2-3x per week",route:"SC"}], tips: ["Clinical protocols use 12-24 week cycles","Can be combined with interferons for synergy","Store lyophilised at 2-8°C","Morning dosing aligns with natural cortisol rhythm"] },
    interactions: { note: "Tα1 pairs well with other immune and repair peptides.", cards: [{slug:"bpc-157",name:"BPC-157",desc:"Tissue repair complement",effect:"Complementary"},{slug:"tb-500",name:"TB-500",desc:"Angiogenesis support",effect:"Complementary"},{slug:"ll-37",name:"LL-37",desc:"Antimicrobial synergy",effect:"Synergistic"}], stackNotes: ["Tα1 + LL-37 covers both adaptive and innate immune arms","Often paired with TB-500 for wound healing in immunocompromised","Avoid concurrent high-dose corticosteroids which blunt Tα1 effects"] },
    timeline: { phases: [{day:"Week 1-2",title:"Initiation",desc:"Dendritic cell activation",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 3-6",title:"Active",desc:"T-cell maturation accelerating",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 6-24",title:"Sustained",desc:"Maximal immune enhancement",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Clinically Approved",text:"Safe in 30+ countries",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Injection",text:"Minor local reactions",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Goldstein AL, et al. Proc Natl Acad Sci USA. 1972;69(7):1800-1803.","Garaci E, et al. Int Immunopharmacol. 2007;7(10):1297-1304.","Rasi G, et al. J Natl Cancer Inst. 1996;88(20):1500-1504.","Ciancio A, et al. J Viral Hepat. 2004;11(5):415-421.","Serafino A, et al. J Transl Med. 2014;12:239."],
  },

  "thymalin": {
    overview: { whatIs: "Thymalin (also known as Thymulin) is a thymic nonapeptide that plays a crucial role in T-cell differentiation and immune function. Originally described by Khavinson in the 1980s, Thymalin is one of the most studied peptides in the Russian peptide bioregulator system. It restores age-related thymic involution, normalising T-cell counts and immune function in aging organisms.", mechanism: "Thymalin binds to high-affinity receptors on T-cell precursors and mature T lymphocytes, activating the cAMP/PKA pathway that drives T-cell differentiation from bone marrow precursors. It upregulates IL-2 production and IL-2 receptor expression, enhancing the proliferation and activity of cytotoxic T cells and NK cells while maintaining immune homeostasis.", benefits: ["Restores age-related thymic function decline","Promotes T-cell differentiation and maturation","Enhances NK cell activity and cytotoxic T-cell function","Normalises immune parameters in aging","Modulates cytokine balance — supports Th1 response","Extensive safety data from decades of clinical use in Russia"] },
    molecular: { items: [{label:"Molecular Weight",value:"~1,600 Da"},{label:"Sequence",value:"Nonapeptide (specific sequence varies by preparation)"},{label:"Type",value:"Thymic peptide bioregulator"},{label:"Half-Life",value:"~1-2 hours"},{label:"Alt Names",value:"Thymulin, Thymus peptide"}], diagramTitle: "Thymalin", diagramSubtitle: "Thymic bioregulator · ~1.6 kDa", residues: [{x:20,y:50,label:"N",color:"#8b5cf6",name:"Active peptide"},{x:80,y:50,label:"Zn",color:"#d97706",name:"Zinc-binding"}], legend: "Zn required for biological activity" },
    indications: { mostEffective: [{title:"Age-Related Immune Decline",desc:"Primary — restores thymic function"},{title:"Immunodeficiency",desc:"Enhances T-cell production"},], effective: [{title:"Viral Infections",desc:"Enhanced antiviral immunity"},{title:"Cancer Support",desc:"Improves immune surveillance"}], moderate: [{title:"Chronic Inflammation",desc:"Modulates immune balance"}] },
    dosing: { note: "Thymalin is typically dosed in cycles as part of peptide bioregulator protocols.", rows: [{goal:"Immune Restoration",dose:"5-10 mg",freq:"Daily for 10-20 days",route:"SC/IM"},{goal:"Maintenance",dose:"5 mg",freq:"2-3x per week",route:"SC"},{goal:"Anti-Aging Protocol",dose:"5 mg",freq:"Daily for 10 days, quarterly",route:"SC"}], tips: ["Standard protocols are 10-20 day cycles","Can be combined with other thymic peptides","Best used quarterly for age-related immune decline","Zinc supplementation may enhance Thymalin activity"] },
    interactions: { note: "Thymalin works synergistically with other thymic and immune peptides.", cards: [{slug:"thymosin-alpha-1",name:"Thymosin Alpha-1",desc:"Complementary thymic peptide",effect:"Synergistic"},{slug:"bpc-157",name:"BPC-157",desc:"Repair complement",effect:"Complementary"}], stackNotes: ["Tα1 + Thymalin provides comprehensive thymic support","Often cycled with other Khavinson peptides (Vilon, Pinealon) for organ-specific bioregulation"] },
    timeline: { phases: [{day:"Days 1-10",title:"Active Cycle",desc:"T-cell production increases",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Month 1-3",title:"Post-Cycle",desc:"Immune parameters elevated",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Quarterly",title:"Re-Protocol",desc:"Repeat cycle as needed",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Decades of Use",text:"Extensive clinical safety in Russia",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Injection",text:"Well-tolerated with standard injection care",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Khavinson VKh, et al. Bull Exp Biol Med. 2002;133(3):293-295.","Morozov VG, et al. Int J Immunopharmacol. 1997;19(9-10):501-505.","Khavinson VKh, et al. Bull Exp Biol Med. 2003;135(1):77-79.","Korkushko OV, et al. Bull Exp Biol Med. 2007;143(4):497-499.","Anisimov VN, et al. Mech Ageing Dev. 2006;127(1):26-32."],
  },

  "vip": {
    overview: { whatIs: "VIP (Vasoactive Intestinal Peptide) is a 28-amino-acid neuropeptide widely distributed throughout the central and peripheral nervous systems. It functions as a potent vasodilator, anti-inflammatory molecule, and neurotransmitter with broad therapeutic potential in pulmonary, gastrointestinal, and neurological disorders. VIP is a master regulator of the neuro-immune axis, modulating everything from bronchial tone to T-cell differentiation.", mechanism: "VIP binds with high affinity to VPAC1 and VPAC2 receptors, activating the cAMP/PKA signalling pathway. In the lungs, it relaxes bronchial smooth muscle and reduces pulmonary inflammation. In the immune system, it shifts the Th1/Th2 balance toward Th2 and promotes regulatory T-cell development. VIP also regulates circadian rhythms, intestinal motility, and cerebral blood flow through its vasoactive properties.", benefits: ["Potent bronchodilator — relaxes airway smooth muscle","Broad anti-inflammatory via VPAC receptor activation","Regulates Th1/Th2 balance and promotes Treg development","Neuroprotective in stroke and neurodegenerative models","Modulates intestinal motility and secretion","Reduces portal hypertension in liver disease"] },
    molecular: { items: [{label:"Molecular Weight",value:"3,325.8 Da"},{label:"Sequence",value:"His-Ser-Asp-Ala-Val-Phe-Thr-Asp-Asn-Tyr-Thr-Arg-Leu-Arg-Lys-Gln-Met-Ala-Val-Lys-Lys-Tyr-Leu-Asn-Ser-Ile-Leu-Asn-NH₂"},{label:"Length",value:"28 amino acids"},{label:"Type",value:"Neuropeptide | VPAC receptor agonist"},{label:"Half-Life",value:"~2 minutes (native); stabilised analogs available"},{label:"CAS Number",value:"40077-57-8"},{label:"Alt Name",value:"Vasoactive intestinal peptide"}], diagramTitle: "VIP", diagramSubtitle: "28-mer · 3.33 kDa · Vasoactive Intestinal Peptide", residues: [{x:15,y:50,label:"1-10",color:"#8b5cf6",name:"N-term"},{x:65,y:50,label:"11-20",color:"#0891b2",name:"Core"},{x:120,y:50,label:"21-28",color:"#d97706",name:"C-term"}], legend: "VPAC1/VPAC2 agonist" },
    indications: { mostEffective: [{title:"Pulmonary Diseases",desc:"Bronchodilation in asthma/COPD"},{title:"Pulmonary Hypertension",desc:"Potent vasodilation"},{title:"Anti-Inflammatory",desc:"Broad VPAC-mediated effects"}], effective: [{title:"Neuroprotection",desc:"Cerebral blood flow regulation"},{title:"GI Motility",desc:"Intestinal secretion and motility"}], moderate: [{title:"Circadian Regulation",desc:"Modulates SCN clock neurons"}] },
    dosing: { note: "VIP's extremely short half-life (~2 min) typically requires continuous delivery or stabilised analogs.", rows: [{goal:"Pulmonary Research",dose:"5-20 mcg/kg",freq:"Inhaled/continuous IV",route:"Inhaled/IV"},{goal:"PAH Protocol",dose:"1-5 pmol/kg/min",freq:"Continuous IV",route:"IV"},{goal:"Research Dosing",dose:"10-50 mcg",freq:"Bolus or infusion",route:"IV/SC"}], tips: ["VIP has very short half-life — stabilised analogs or continuous infusion needed","Aviptadil (synthetic VIP) is the most common form","Inhaled delivery preferred for pulmonary effects","Refrigerate and protect from light"] },
    interactions: { note: "VIP has complex interactions with pulmonary and neurological pathways.", cards: [{slug:"bpc-157",name:"BPC-157",desc:"Tissue repair complement",effect:"Complementary"},{slug:"oxytocin",name:"Oxytocin",desc:"Social neuropeptide complement",effect:"Complementary"}], stackNotes: ["VIP + BPC-157 for comprehensive pulmonary repair","AVP (Aviptadil) studied for acute respiratory distress","Avoid combining with high-dose beta-agonists without monitoring"] },
    timeline: { phases: [{day:"Day 1-7",title:"Acute",desc:"Bronchodilation and vasodilation",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 2-6",title:"Anti-Inflammatory",desc:"Immune modulation established",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Week 6-12",title:"Sustained",desc:"Long-term pulmonary/vascular effects",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Well-Characterised",text:"Endogenous peptide — good safety profile",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Rapid Clearance",text:"Very short half-life limits use",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["Said SI, et al. Science. 1970;169(3951):1217-1218.","Gozes I, et al. J Mol Neurosci. 2008;36(1-3):229-234.","Petkov V, et al. Am J Respir Crit Care Med. 2003;167(5):778-782.","Delgado M, et al. Nat Rev Immunol. 2004;4(10):793-805.","Onoue S, et al. Peptides. 2008;29(10):1823-1828."],
  },

  "kisspeptin": {
    overview: { whatIs: "Kisspeptin is a 54-amino-acid neuropeptide encoded by the KISS1 gene, discovered as a metastasis suppressor before being recognised as the master regulator of puberty onset and reproductive function. Kisspeptin acts upstream of GnRH neurons, making it the hypothalamic gatekeeper of the entire reproductive axis. It has emerged as a critical tool for understanding and treating reproductive disorders.", mechanism: "Kisspeptin binds to the GPR54 (KISS1R) receptor on GnRH neurons in the hypothalamus, activating phospholipase C and mobilising intracellular calcium. This triggers GnRH release from hypothalamic terminals into the pituitary portal circulation, which in turn stimulates LH and FSH secretion from the anterior pituitary. Kisspeptin signalling is essential for the onset of puberty, maintenance of reproductive function, and seasonal breeding regulation.", benefits: ["Master regulator of the hypothalamic-pituitary-gonadal axis","Potent GnRH, LH, and FSH secretion trigger","Critical for puberty onset and reproductive function","Research tool for hypothalamic amenorrhea treatment","Potential therapeutic for hypogonadotropic hypogonadism","Metastasis suppressor — KISS1 is a tumour suppressor gene"] },
    molecular: { items: [{label:"Molecular Weight",value:"~5.8 kDa (Kisspeptin-54)"},{label:"Sequence",value:"Kisspeptin-54 (full); KP-10 active core: YNWNSFGLRF-NH₂"},{label:"Active Core",value:"Kisspeptin-10 (C-terminal decapeptide)"},{label:"Type",value:"Neuropeptide | GPR54 agonist"},{label:"Half-Life",value:"~28 minutes (KP-54); ~4 minutes (KP-10)"},{label:"Receptor",value:"GPR54 / KISS1R"},{label:"Gene",value:"KISS1"}], diagramTitle: "Kisspeptin", diagramSubtitle: "54-mer · ~5.8 kDa · KP-10 active core", residues: [{x:15,y:50,label:"1-44",color:"#8b5cf6",name:"N-terminal"},{x:100,y:50,label:"45-54",color:"#d97706",name:"Active core"}], legend: "KP-10 is the minimal active fragment" },
    indications: { mostEffective: [{title:"Reproductive Function",desc:"Primary — GnRH/LH/FSH regulation"},{title:"Hypogonadism",desc:"Hypothalamic amenorrhea treatment"},{title:"Puberty Disorders",desc:"Delayed/absent puberty research"}], effective: [{title:"Fertility Research",desc:"Ovulation induction studies"},{title:"KISS1 Metastasis",desc:"Tumour suppression research"}], moderate: [{title:"Metabolic Link",desc:"Reproduction-metabolism interface"}] },
    dosing: { note: "KP-10 (the active decapeptide) is used in most research protocols for its shorter half-life and known active core.", rows: [{goal:"GnRH Stimulation",dose:"0.3-1.0 nmol/kg",freq:"Bolus",route:"IV/SC"},{goal:"Fertility Research",dose:"0.5-1.5 nmol/kg",freq:"Once",route:"IV"},{goal:"Pulsatile Protocol",dose:"0.1 mcg/kg/hour",freq:"Pulsed",route:"IV"}], tips: ["KP-10 is preferred for research due to rapid clearance","KP-54 has longer half-life for sustained studies","LH response is dose-dependent — titrate accordingly","Women respond best in the preovulatory phase"] },
    interactions: { note: "Kisspeptin interacts directly with the GnRH-pituitary axis.", cards: [{slug:"oxytocin",name:"Oxytocin",desc:"Reproductive neuropeptide",effect:"Complementary"},{slug:"pt-141",name:"PT-141",desc:"Sexual function complement",effect:"Complementary"}], stackNotes: ["Kisspeptin + Oxytocin: dual reproductive hormone research","Kisspeptin + PT-141: sexual function axis modulation","Avoid concurrent GnRH therapy which bypasses kisspeptin action"] },
    timeline: { phases: [{day:"Day 1",title:"Acute",desc:"Rapid LH/FSH release (<30 min)",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Hours 2-24",title:"Post-Acute",desc:"Gonadal steroid response",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Multi-Dose",title:"Pulsatile",desc:"Restored pulsatile GnRH",color:"purple",icon:"M5 13l4 4L19 7"}] },
    safety: { cards: [{label:"Endogenous Peptide",text:"Natural neuropeptide — well-tolerated",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"},{label:"Mild Vasodilation",text:"Transient flushing possible",icon:"M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",color:"amber"}] },
    references: ["d'Anglemont de Tassigny X, et al. Proc Natl Acad Sci USA. 2007;104(36):14424-14429.","Dhillo WS, et al. J Clin Endocrinol Metab. 2005;90(12):6609-6615.","Seminara SB, et al. N Engl J Med. 2003;349(17):1614-1627.","Jayasena CN, et al. J Clin Endocrinol Metab. 2011;96(9):E1488-E1493.","Narayanaswamy S, et al. J Clin Endocrinol Metab. 2016;101(3):1139-1147."],
  },
};

export default compoundTabs;
