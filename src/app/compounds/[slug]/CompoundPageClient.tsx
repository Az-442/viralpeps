"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";

// ── Types ──
interface Source {
  vendor: string;
  price: string;
  url: string;
  inStock?: boolean;
  image?: boolean;
  dosage?: string;
}

interface Vendor {
  name: string;
  slug: string;
  verified: boolean;
  rating: number;
  country: string;
  highlights?: string[];
  logo?: string;
}

interface FaqEntry {
  q: string;
  a: string;
}

// ── Star rating component ──
function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  const stars = [];
  for (let i = 1; i <= total; i++) {
    stars.push(
      <svg key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  return <span className="inline-flex items-center gap-0.5">{stars}</span>;
}

// ── Effectiveness badge ──
function EffectivenessBadge({ level }: { level: "most-effective" | "effective" | "moderate" }) {
  const styles = {
    "most-effective": "bg-emerald-100 text-emerald-800 border-emerald-200",
    effective: "bg-blue-100 text-blue-800 border-blue-200",
    moderate: "bg-amber-50 text-amber-800 border-amber-200",
  };
  const labels = {
    "most-effective": "Most Effective",
    effective: "Effective",
    moderate: "Moderate",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${styles[level]}`}>
      {labels[level]}
    </span>
  );
}

// ── Tab definitions ──
const INFO_TABS = [
  { id: "prices", label: "£ Prices" },
  { id: "overview", label: "Overview" },
  { id: "molecular", label: "Molecular" },
  { id: "indications", label: "Indications" },
  { id: "dosing", label: "Dosing" },
  { id: "interactions", label: "Interactions" },
  { id: "timeline", label: "Timeline" },
  { id: "safety", label: "Safety" },
  { id: "quality", label: "Quality" },
  { id: "references", label: "References" },
] as const;

type TabId = (typeof INFO_TABS)[number]["id"];

// ── Price per mg helper ──
function calcPricePerMg(price: string, dosage?: string): number | null {
  if (!dosage) return null;
  const priceNum = parseFloat(price.replace(/[£$€,]/g, ""));
  const mgMatch = dosage.match(/([\d.]+)\s*mg/i);
  if (!mgMatch || isNaN(priceNum)) return null;
  const mg = parseFloat(mgMatch[1]);
  if (mg <= 0) return null;
  return Math.round((priceNum / mg) * 100) / 100;
}

// ── Peptide interaction link helper ──
const INTERACTIONS = [
  { slug: "tb-500", name: "TB-500 (Thymosin Beta-4)" },
  { slug: "ghk-cu", name: "GHK-Cu (Copper Peptide)" },
  { slug: "semax", name: "Semax" },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)" },
  { slug: "ipamorelin", name: "Ipamorelin" },
  { slug: "bpc-157", name: "BPC-157 (stacked with itself)" },
  { slug: "kpv", name: "KPV" },
  { slug: "melanotan-2", name: "Melanotan II" },
];

// ── Main client component ──
export default function CompoundPageClient({
  compound,
  vendors,
  sortedSources,
  minPrice,
  avgPrice,
  accent,
  allDosages,
  faqEntries,
  uniqueSuppliers,
  totalProducts,
}: {
  compound: any;
  vendors: Vendor[];
  sortedSources: Source[];
  minPrice: number;
  avgPrice: number;
  accent: { border: string; bg: string; badge: string; icon: string };
  allDosages: string[];
  faqEntries: FaqEntry[];
  uniqueSuppliers: number;
  totalProducts: number;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("prices");
  const [selectedDosage, setSelectedDosage] = useState("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("price-low");
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());

  // Compare mode — active when 2+ vendors selected
  const isCompareMode = selectedVendors.size >= 2;

  // Toggle vendor selection for comparison
  const toggleVendor = (name: string) => {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const clearSelected = () => setSelectedVendors(new Set());

  // ── URL hash ↔ active tab sync ──
  const HASH_TAB_MAP: Record<string, TabId> = {
    "profile-overview": "overview",
    "profile-molecular": "molecular",
    "profile-indications": "indications",
    "profile-dosing": "dosing",
    "profile-interactions": "interactions",
    "profile-timeline": "timeline",
    "profile-safety": "safety",
    "profile-quality": "quality",
    "profile-references": "references",
  };
  const TAB_HASH_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(HASH_TAB_MAP).map(([hash, tab]) => [tab, hash])
  );

  // On mount, read hash from URL and switch to matching tab
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && HASH_TAB_MAP[hash]) {
      setActiveTab(HASH_TAB_MAP[hash]);
    }
  }, []);

  // When hash changes (user navigates back/forward), sync tab
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && HASH_TAB_MAP[hash]) {
        setActiveTab(HASH_TAB_MAP[hash]);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Tab click — updates URL hash + smooth scroll to tab panel
  const handleTabClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    const hash = TAB_HASH_MAP[tabId];
    if (hash) {
      // Update URL without reload
      window.history.pushState(null, "", `#${hash}`);
    }
    // Smooth scroll to the tab panel container
    const el = document.getElementById("profile-tab-panel");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Filter & sort sources
  const displayedSources = useMemo(() => {
    let list = [...sortedSources];

    // Compare mode — filter to only selected vendors
    if (isCompareMode) {
      list = list.filter((s) => selectedVendors.has(s.vendor));
    }

    // Filter by dosage (when we have dosage data per source)
    if (selectedDosage !== "all") {
      // Skip filtering if no source has dosage data yet
      const hasDosageData = list.some((s: any) => s.dosage);
      if (hasDosageData) {
        list = list.filter((s: any) => s.dosage === selectedDosage);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
          const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
          return pa - pb;
        });
        break;
      case "price-high":
        list.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
          const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
          return pb - pa;
        });
        break;
      case "rating": {
        list.sort((a, b) => {
          const va = vendors.find((v) => v.name === a.vendor);
          const vb = vendors.find((v) => v.name === b.vendor);
          return (vb?.rating || 0) - (va?.rating || 0);
        });
        break;
      }
    }
    return list;
  }, [sortedSources, selectedDosage, sortBy, vendors, isCompareMode, selectedVendors]);

  // Stats (use props instead of recalculating)
  const supplierCount = uniqueSuppliers;
  const dosageCount = allDosages.length;
  const productCount = totalProducts;

  // Tab content map
  const tabContent = useMemo(() => {
    const compoundName = compound.name;
    return {
      prices: null, // The table is shown below tabs, this is the default
      overview: (
        <div id="profile-overview" className="scroll-mt-24">
          <div className="space-y-6">
            {/* What is BPC-157? */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">What is {compoundName}?</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {compoundName} (Body Protection Compound-157) is a synthetic pentadecapeptide comprising 15 amino acids,
                originally derived from a protective protein found in human gastric juice. It has been extensively studied
                in preclinical models for its ability to promote tissue repair, modulate angiogenesis, and accelerate
                healing across multiple tissue types including muscle, tendon, ligament, and gastrointestinal mucosa.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mt-3">
                Unlike many larger peptide sequences, BPC-157 is remarkably stable in the gastric environment, which enables
                both systemic and oral research administration routes. Its small size and stability make it one of the most
                widely investigated peptides in regenerative research.
              </p>
            </div>

            {/* Mechanism of Action */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Mechanism of Action</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-base text-gray-700 leading-relaxed">
                  BPC-157 operates through multiple coordinated pathways that converge on tissue regeneration. It upregulates
                  vascular endothelial growth factor (VEGF) and basic fibroblast growth factor (bFGF), driving robust
                  angiogenesis—the formation of new blood vessels—which is critical for delivering oxygen and nutrients to
                  healing tissues. Simultaneously, it enhances collagen type I and III synthesis, providing the structural
                  scaffold needed for tendon, ligament, and dermal repair. On the molecular level, BPC-157 modulates the
                  nitric oxide (NO) system, exerting both pro-angiogenic and anti-inflammatory effects depending on tissue
                  context, and promotes cell survival pathways through activation of the AKT/ERK signalling cascade.
                </p>
              </div>
            </div>

            {/* Key Research Benefits */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Key Research Benefits</h3>
              <ul className="space-y-2">
                {[
                  "Accelerates wound and soft-tissue healing through enhanced angiogenesis and collagen deposition",
                  "Protects and repairs gastrointestinal tract lining, including gastric ulcers and inflammatory bowel models",
                  "Demonstrates anti-inflammatory activity by modulating cytokine expression and reducing oedema",
                  "Improves biomechanical properties of healing tendons and ligaments",
                  "Promotes functional recovery in muscle crush injury and peripheral nerve damage models",
                  "Exhibits cytoprotective effects across multiple organ systems through NO-system modulation",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      molecular: (
        <div id="profile-molecular" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[
                { label: "Molecular Weight", value: "1,419.53 Da" },
                { label: "Sequence", value: "GKPPPGKPADDAGLV" },
                { label: "Length", value: "15 amino acids" },
                { label: "Type", value: "Pentadecapeptide" },
                { label: "Half-Life", value: "<30 minutes" },
                { label: "CAS Number", value: compound.cas || "137525-51-0" },
                { label: "Purity", value: compound.purity || "≥99%" },
                { label: "Form", value: compound.form || "Lyophilized powder" },
              ].map((m) => (
                <div key={m.label} className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                  <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold">{m.label}</p>
                  <p className="text-base font-bold text-gray-900 font-mono">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
              {/* Molecular structure SVG — peptide chain diagram */}
              <svg viewBox="0 0 280 320" className="w-full max-w-[300px] h-auto">
                <defs>
                  <linearGradient id="molGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
                  </linearGradient>
                  <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodOpacity="0.15" />
                  </filter>
                </defs>
                <rect width="280" height="320" fill="url(#molGrad)" rx="16" />

                {/* Title */}
                <text x="140" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a5f" opacity="0.75">
                  {compoundName}
                </text>
                <text x="140" y="34" textAnchor="middle" fontSize="8" fill="#64748b" opacity="0.6">
                  15-mer · 1,419.53 Da · Sequence: GKPPPGKPADDAGLV
                </text>

                {/* ── Peptide backbone ── */}
                {/* Backbone zig-zag path: 15 residues in 3 rows */}
                {/* Row 1 (y=55):   G → K → P → P → P  */}
                {/* Row 2 (y=130):  G ← K ← P ← A ← D  */}
                {/* Row 3 (y=205):  D → A → G → L → V  */}

                {/* Residue positions [x, y] */}
                {(() => {
                  const nodes = [
                    { x: 30, y: 55 },  // 0: Gly
                    { x: 65, y: 55 },  // 1: Lys
                    { x: 100, y: 55 }, // 2: Pro
                    { x: 135, y: 55 }, // 3: Pro
                    { x: 170, y: 55 }, // 4: Pro
                    { x: 205, y: 130 }, // 5: Gly
                    { x: 170, y: 130 }, // 6: Lys
                    { x: 135, y: 130 }, // 7: Pro
                    { x: 100, y: 130 }, // 8: Ala
                    { x: 65, y: 130 },  // 9: Asp
                    { x: 65, y: 205 },  // 10: Asp
                    { x: 100, y: 205 }, // 11: Ala
                    { x: 135, y: 205 }, // 12: Gly
                    { x: 170, y: 205 }, // 13: Leu
                    { x: 205, y: 205 }, // 14: Val
                  ];
                  return nodes;
                })().map((n, i) => <circle key={`dot-${i}`} cx={n.x} cy={n.y} r="3" fill="#3b82f6" opacity="0.4" />)}

                {/* Backbone thick zig-zag path */}
                <polyline
                  points="30,55 65,55 100,55 135,55 170,55 205,130 170,130 135,130 100,130 65,130 65,205 100,205 135,205 170,205 205,205"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.55"
                />

                {/* Peptide bonds (small dashes between nodes) */}
                <polyline
                  points="30,55 65,55 100,55 135,55 170,55 205,130 170,130 135,130 100,130 65,130 65,205 100,205 135,205 170,205 205,205"
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity="0.3"
                />

                {/* ── N-terminus label ── */}
                <g transform="translate(14, 42)">
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#eef2ff" stroke="#6366f1" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#4338ca">N-term</text>
                </g>

                {/* ── C-terminus label ── */}
                <g transform="translate(210, 210)">
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#fef2f2" stroke="#ef4444" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#dc2626">C-term</text>
                </g>

                {/* ── Amino acid residue circles ── */}
                {[
                  { x: 30, y: 55, label: "G", color: "#3b82f6", name: "Gly" },
                  { x: 65, y: 55, label: "K", color: "#6366f1", name: "Lys" },
                  { x: 100, y: 55, label: "P", color: "#8b5cf6", name: "Pro" },
                  { x: 135, y: 55, label: "P", color: "#8b5cf6", name: "Pro" },
                  { x: 170, y: 55, label: "P", color: "#8b5cf6", name: "Pro" },
                  { x: 205, y: 130, label: "G", color: "#3b82f6", name: "Gly" },
                  { x: 170, y: 130, label: "K", color: "#6366f1", name: "Lys" },
                  { x: 135, y: 130, label: "P", color: "#8b5cf6", name: "Pro" },
                  { x: 100, y: 130, label: "A", color: "#059669", name: "Ala" },
                  { x: 65, y: 130, label: "D", color: "#d97706", name: "Asp" },
                  { x: 65, y: 205, label: "D", color: "#d97706", name: "Asp" },
                  { x: 100, y: 205, label: "A", color: "#059669", name: "Ala" },
                  { x: 135, y: 205, label: "G", color: "#3b82f6", name: "Gly" },
                  { x: 170, y: 205, label: "L", color: "#7c3aed", name: "Leu" },
                  { x: 205, y: 205, label: "V", color: "#7c3aed", name: "Val" },
                ].map((node, i) => (
                  <g key={`aa-${i}`} filter="url(#shadow1)">
                    <circle cx={node.x} cy={node.y} r="11" fill="white" stroke={node.color} strokeWidth="1.8" />
                    <text x={node.x} y={node.y + 3.5} textAnchor="middle" fontSize="8" fontWeight="bold" fill={node.color}>
                      {node.label}
                    </text>
                  </g>
                ))}

                {/* ── Peptide bond connectors between residues ── */}
                {/* Connecting lines between consecutive residues */}
                {[
                  [30, 55, 65, 55],
                  [65, 55, 100, 55],
                  [100, 55, 135, 55],
                  [135, 55, 170, 55],
                  [170, 55, 205, 130],
                  [205, 130, 170, 130],
                  [170, 130, 135, 130],
                  [135, 130, 100, 130],
                  [100, 130, 65, 130],
                  [65, 130, 65, 205],
                  [65, 205, 100, 205],
                  [100, 205, 135, 205],
                  [135, 205, 170, 205],
                  [170, 205, 205, 205],
                ].map((seg, i) => (
                  <line key={`bond-${i}`} x1={seg[0]} y1={seg[1]} x2={seg[2]} y2={seg[3]}
                    stroke="#1e40af" strokeWidth="0.8" opacity="0.25" />
                ))}

                {/* ── Direction arrows on backbone ── */}
                <g fill="#2563eb" opacity="0.35">
                  <polygon points="175,52 181,55 175,58" />
                  <polygon points="205,125 210,130 205,135" />
                  <polygon points="65,134 62,130 68,130" />
                  <polygon points="65,200 62,205 68,205" />
                  <polygon points="175,208 181,205 175,202" />
                </g>

                {/* ── Side chains (R-groups) ── */}
                {/* Lysine (K) side chain: -(CH₂)₄-NH₃⁺ */}
                <g opacity="0.7">
                  <line x1="65" y1="55" x2="55" y2="38" stroke="#6366f1" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="42" y="36" fontSize="5" fill="#6366f1" fontStyle="italic">R</text>
                  <text x="51" y="30" fontSize="4.5" fill="#4338ca">-(CH₂)₄NH₃⁺</text>
                </g>
                {/* Second Lysine (K) */}
                <g opacity="0.7">
                  <line x1="170" y1="130" x2="182" y2="145" stroke="#6366f1" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="182" y="148" fontSize="5" fill="#6366f1" fontStyle="italic">R</text>
                  <text x="185" y="155" fontSize="4.5" fill="#4338ca">-(CH₂)₄NH₃⁺</text>
                </g>
                {/* Aspartic acid (D) side chain: -CH₂-COOH */}
                <g opacity="0.7">
                  <line x1="65" y1="130" x2="50" y2="145" stroke="#d97706" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="42" y="148" fontSize="5" fill="#d97706" fontStyle="italic">R</text>
                  <text x="39" y="155" fontSize="4.5" fill="#b45309">-CH₂COOH</text>
                </g>
                {/* Second Aspartic acid (D) */}
                <g opacity="0.7">
                  <line x1="65" y1="205" x2="48" y2="220" stroke="#d97706" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="42" y="222" fontSize="5" fill="#d97706" fontStyle="italic">R</text>
                  <text x="38" y="230" fontSize="4.5" fill="#b45309">-CH₂COOH</text>
                </g>
                {/* Leucine (L) side chain: -CH₂-CH(CH₃)₂ */}
                <g opacity="0.7">
                  <line x1="170" y1="205" x2="185" y2="218" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="185" y="220" fontSize="5" fill="#7c3aed" fontStyle="italic">R</text>
                  <text x="186" y="228" fontSize="4.5" fill="#6d28d9">CH₂CH(CH₃)₂</text>
                </g>
                {/* Valine (V) side chain: -CH(CH₃)₂ */}
                <g opacity="0.7">
                  <line x1="205" y1="205" x2="222" y2="218" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="222" y="220" fontSize="5" fill="#7c3aed" fontStyle="italic">R</text>
                  <text x="224" y="228" fontSize="4.5" fill="#6d28d9">CH(CH₃)₂</text>
                </g>
                {/* Proline (P) - has distinctive ring, show as small arc */}
                <g opacity="0.6">
                  <path d="M100,42 Q95,38 100,35" fill="none" stroke="#8b5cf6" strokeWidth="1" />
                  <text x="105" y="38" fontSize="4.5" fill="#7c3aed" fontStyle="italic">pyrrolidine</text>
                </g>

                {/* ── Legend ── */}
                <g transform="translate(8, 280)">
                  <rect x="0" y="0" width="264" height="32" rx="6" fill="white" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="0.5" />
                  <text x="8" y="11" fontSize="6" fill="#475569" fontWeight="500">G=Gly  K=Lys  P=Pro  A=Ala  D=Asp  L=Leu  V=Val</text>
                  <text x="8" y="22" fontSize="6" fill="#475569" fontWeight="500">
                    N-term (N-terminus)  C-term (C-terminus)  — Backbone  ··· Peptide bond  &lt; direction
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ),
      indications: (
        <div id="profile-indications" className="scroll-mt-24">
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-relaxed">
              {compound.name} is researched for the following applications based on published preclinical studies. Indications are grouped by research evidence level.
            </p>

            {/* Most Effective */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <EffectivenessBadge level="most-effective" />
                <span>Most Effective Research Applications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Tendon Healing", desc: "Accelerated tendon-to-bone healing with improved biomechanical properties. Most effective with localized injection near the injury site." },
                  { title: "Muscle Recovery", desc: "Enhanced healing and reduced recovery time after crush injuries and surgical procedures with direct tissue targeting." },
                  { title: "Ulcer Protection", desc: "Protective effects against gastric and duodenal ulcers through cytoprotective mechanisms and enhanced mucosal defense." },
                ].map((item) => (
                  <div key={item.title} className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <div>
                        <p className="text-base font-bold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Effective */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <EffectivenessBadge level="effective" />
                <span>Effective Research Applications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Angiogenesis", desc: "Promotes blood vessel formation and improves vascularization through localized delivery pathways." },
                  { title: "Intestinal Repair", desc: "Accelerates intestinal healing and reduces inflammatory markers in IBD models." },
                  { title: "Mucosal Healing", desc: "Enhances mucosal barrier function and accelerates epithelial regeneration throughout the GI tract." },
                ].map((item) => (
                  <div key={item.title} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <div>
                        <p className="text-base font-bold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderate */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <EffectivenessBadge level="moderate" />
                <span>Moderate Research Applications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Neuroprotection", desc: "Protective effects against neurotoxic agents and ischemic brain injury models in preclinical studies." },
                  { title: "Spinal Cord Injury", desc: "Improved functional recovery and reduced tissue damage in spinal cord injury research models." },
                  { title: "Peripheral Nerves", desc: "Enhanced peripheral nerve regeneration and functional recovery after nerve injury." },
                ].map((item) => (
                  <div key={item.title} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <div>
                        <p className="text-base font-bold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      dosing: (
        <div id="profile-dosing" className="scroll-mt-24">
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-relaxed">
              Typical research protocols for {compoundName} based on published studies. These are research protocols only — always follow your approved study protocol.
            </p>

            {/* Injectable */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                <span className="text-blue-600">Injectable</span> — Most Effective for Localized Healing
              </h4>
              <p className="text-sm text-gray-500 mb-3">Subcutaneous injection preferred for targeted tissue repair. Most effective on an empty stomach. Inject close to injury site. Rotate injection sites to prevent irritation.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse">
                  <thead>
                    <tr className="bg-blue-50 border-b border-blue-200">
                      <th className="text-left px-4 py-2.5 text-xs text-blue-800 font-bold">Goal</th>
                      <th className="text-right px-4 py-2.5 text-xs text-blue-800 font-bold">Dose</th>
                      <th className="text-right px-4 py-2.5 text-xs text-blue-800 font-bold">Frequency</th>
                      <th className="text-right px-4 py-2.5 text-xs text-blue-800 font-bold">Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { goal: "Tendon/Joint healing", dose: "250-500 mcg", freq: "1-2x daily", route: "SubQ near injury" },
                      { goal: "Serious injury", dose: "500-1000 mcg", freq: "2x daily", route: "SubQ near injury" },
                      { goal: "General healing", dose: "250-500 mcg", freq: "1-2x daily", route: "SubQ or IM" },
                      { goal: "Maintenance", dose: "250 mcg", freq: "1x daily", route: "SubQ" },
                    ].map((row) => (
                      <tr key={row.goal} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-900">{row.goal}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-700">{row.dose}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600">{row.freq}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600">{row.route}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Oral */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                <span className="text-emerald-600">Oral</span> — For Gastric &amp; Intestinal Conditions
              </h4>
              <p className="text-sm text-gray-500 mb-3">Effective for GI-related goals. Higher doses required due to lower bioavailability. Take 30 minutes before meals.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 border-b border-emerald-200">
                      <th className="text-left px-4 py-2.5 text-xs text-emerald-800 font-bold">Goal</th>
                      <th className="text-right px-4 py-2.5 text-xs text-emerald-800 font-bold">Dose</th>
                      <th className="text-right px-4 py-2.5 text-xs text-emerald-800 font-bold">Frequency</th>
                      <th className="text-right px-4 py-2.5 text-xs text-emerald-800 font-bold">Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { goal: "Gastric protection", dose: "500 mcg - 1 mg", freq: "1-2x daily", route: "Oral (empty stomach)" },
                      { goal: "General healing", dose: "1-2 mg", freq: "1-2x daily", route: "Oral (empty stomach)" },
                      { goal: "Ulcer prevention", dose: "500 mcg", freq: "2x daily", route: "Oral (empty stomach)" },
                      { goal: "Maintenance", dose: "500 mcg", freq: "1x daily", route: "Oral (empty stomach)" },
                    ].map((row) => (
                      <tr key={row.goal} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-900">{row.goal}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-gray-700">{row.dose}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600">{row.freq}</td>
                        <td className="px-4 py-2.5 text-right text-gray-600">{row.route}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Protocol Tips</h4>
              <ul className="space-y-1.5">
                {[
                  "Most effective on an empty stomach for maximum absorption",
                  "Inject close to the injury site for localized healing",
                  "Rotate injection sites to prevent tissue irritation",
                  "Reconstitute with bacteriostatic water — never shake the vial",
                  "Store reconstituted peptide at 2-8°C; use within 4-6 weeks",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-700">
                <strong>Note:</strong> Dosages shown are for research purposes only. Always follow your approved research protocol and institutional guidelines.
              </p>
            </div>

            {/* Reconstitution guide link */}
            <div>
              <Link
                href="/tools/reconstitution-calculator"
                className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                📖 View complete reconstitution guide
              </Link>
            </div>
          </div>
        </div>
      ),
      interactions: (
        <div id="profile-interactions" className="scroll-mt-24">
          <div className="space-y-5">
            <p className="text-base text-gray-600 leading-relaxed">
              {compoundName} has been studied in combination with other peptides for synergistic research applications. Below are compounds that may complement {compoundName} in preclinical research settings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { slug: "tb-500", name: "TB-500 (Thymosin Beta-4)", desc: "Synergistic tissue repair — TB-500 promotes actin binding and cell migration while BPC-157 enhances angiogenesis and collagen synthesis. The most well-studied peptide stack for comprehensive healing research.", effect: "Synergistic" },
                { slug: "ghk-cu", name: "GHK-Cu", desc: "Copper peptide that supports collagen synthesis and wound healing. When combined with BPC-157, may provide enhanced dermal repair and anti-inflammatory effects in tissue models.", effect: "Complementary" },
                { slug: "semax", name: "Semax", desc: "Nootropic peptide studied for neuroprotection and cognitive enhancement. May complement BPC-157's neuroprotective effects in brain injury and recovery models.", effect: "Complementary" },
                { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)", desc: "GHRH analog that stimulates growth hormone release. Often researched alongside BPC-157 for enhanced tissue regeneration and recovery protocols.", effect: "Supportive" },
                { slug: "ipamorelin", name: "Ipamorelin", desc: "GH secretagogue that pairs well with BPC-157 in recovery protocols — Ipamorelin stimulates GH pulses while BPC-157 supports tissue repair at the injury site.", effect: "Supportive" },
                { slug: "kpv", name: "KPV", desc: "Anti-inflammatory peptide derived from alpha-MSH. May enhance BPC-157's effects on intestinal barrier function and mucosal healing in GI research models.", effect: "Complementary" },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug === "bpc-157" ? "#" : `/compounds/${item.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 border border-blue-200">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                        <span className={`text-[12px] font-bold px-1.5 py-0.5 rounded-full ${
                          item.effect === "Synergistic" ? "bg-emerald-100 text-emerald-800" :
                          item.effect === "Complementary" ? "bg-blue-100 text-blue-800" :
                          "bg-purple-100 text-purple-800"
                        }`}>
                          {item.effect}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Research Stacking Notes</h4>
              <ul className="space-y-1.5">
                {[
                  "BPC-157 and TB-500 are the most commonly researched peptide combination for comprehensive tissue healing studies",
                  "Always introduce one compound at a time in research protocols to isolate effects",
                  "Dosage adjustments may be needed when combining peptides — consult published protocols",
                  "Consider half-life differences when designing combination dosing schedules",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
      timeline: (
        <div id="profile-timeline" className="scroll-mt-24">
          <div className="space-y-5">
            <p className="text-base text-gray-600 leading-relaxed">
              Research timelines for {compoundName} studies based on published protocols. Actual timelines vary by model, dosage, and administration route.
            </p>

            {/* Timeline infographic */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 hidden md:block" />

              <div className="space-y-0 md:space-y-4">
                {[
                  { day: "Day 1-3", title: "Initial Administration", desc: "Begin daily dosing protocol. SubQ injection near target tissue or oral administration for GI studies. First signs of reduced inflammation observed within 24-48 hours.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 4-7", title: "Early Response Phase", desc: "Angiogenesis begins — new blood vessel formation detectable at injury sites. Collagen synthesis upregulated. Reduced edema and inflammatory markers in tissue samples.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { day: "Day 7-14", title: "Tissue Repair Phase", desc: "Accelerated wound healing and tissue regeneration observed. Enhanced fibroblast activity and extracellular matrix remodeling. Significant reduction in healing time compared to controls.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 14-28", title: "Remodeling Phase", desc: "Continued tissue strengthening and maturation. Tendon and ligament biomechanical properties show improvement. Bone healing studies demonstrate increased callus formation and density.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 28-56", title: "Long-term Recovery", desc: "Maximal tissue repair achieved. Functional recovery assessed. GI mucosal lining fully restored in intestinal models. Neuroprotective effects continue in CNS studies.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                  { day: "Day 56-84", title: "Study Conclusion", desc: "End of standard research cycle (8-12 weeks). Comprehensive assessment of tissue repair, functional recovery, and biomarker analysis. Cycle completion before washout period.", color: "purple", icon: "M5 13l4 4L19 7" },
                ].map((phase, i) => {
                  const colorMap: Record<string, string> = {
                    blue: "border-blue-500 bg-blue-50",
                    emerald: "border-emerald-500 bg-emerald-50",
                    purple: "border-purple-500 bg-purple-50",
                  };
                  const dotMap: Record<string, string> = {
                    blue: "bg-blue-500 ring-blue-200",
                    emerald: "bg-emerald-500 ring-emerald-200",
                    purple: "bg-purple-500 ring-purple-200",
                  };
                  const badgeMap: Record<string, string> = {
                    blue: "bg-blue-100 text-blue-800",
                    emerald: "bg-emerald-100 text-emerald-800",
                    purple: "bg-purple-100 text-purple-800",
                  };
                  return (
                    <div key={phase.day} className={`relative pl-0 md:pl-16 pb-0 md:pb-2 ${i < 5 ? "md:mb-0" : ""}`}>
                      {/* Timeline dot (desktop) */}
                      <div className={`hidden md:flex absolute left-[18px] top-1 w-4 h-4 rounded-full ${dotMap[phase.color]} ring-4 items-center justify-center`} />

                      <div className={`border-l-4 ${colorMap[phase.color]} rounded-r-xl p-5`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeMap[phase.color]}`}>{phase.day}</span>
                          <h4 className="text-base font-bold text-gray-900">{phase.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{phase.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-700">
                <strong>Note:</strong> Timelines shown are based on published research protocols. Actual results vary by research model, dosage, and administration method.
              </p>
            </div>
          </div>
        </div>
      ),
      safety: (
        <div id="profile-safety" className="scroll-mt-24">
          <div className="space-y-5">
            <p className="text-base text-gray-600 leading-relaxed">
              {compoundName} is intended for laboratory research purposes only. The following safety information is based on published preclinical studies and standard laboratory protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Research Use Only",
                  text: "BPC-157 is not approved for human consumption by the MHRA, FDA, EMA, or any other regulatory body. For in-vitro and animal research use only.",
                  icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
                  color: "amber",
                },
                {
                  label: "WADA Prohibited",
                  text: "BPC-157 may be prohibited under the World Anti-Doping Agency (WADA) code. Competitive athletes should exercise extreme caution.",
                  icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
                  color: "red",
                },
                {
                  label: "Contraindications",
                  text: "Extra caution is advised for research involving subjects with active cancer, pregnancy/breastfeeding, or those on blood thinners due to BPC-157's angiogenesis-related mechanisms.",
                  icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "amber",
                },
                {
                  label: "Storage Requirements",
                  text: "Lyophilized powder: Store at -20°C, protected from light and moisture. Reconstituted solution: Stable for 4-6 weeks at 2-8°C. Do not freeze after reconstitution.",
                  icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                  color: "blue",
                },
                {
                  label: "Handling Protocols",
                  text: "Standard laboratory safety protocols must be followed. Use appropriate PPE during handling and reconstitution including gloves and eye protection. Work in a sterile environment.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  color: "blue",
                },
                {
                  label: "Purity Standards",
                  text: `All listed suppliers provide ≥${compound.purity || "99%"} purity, verified by third-party HPLC analysis. Always verify COA from your chosen supplier before use.`,
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "emerald",
                },
              ].map((item) => {
                const colorStyles: Record<string, string> = {
                  amber: "bg-amber-50 border-amber-200 text-amber-700",
                  red: "bg-red-50 border-red-200 text-red-700",
                  blue: "bg-blue-50 border-blue-200 text-blue-700",
                  emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
                };
                const iconStyles: Record<string, string> = {
                  amber: "text-amber-500",
                  red: "text-red-500",
                  blue: "text-blue-500",
                  emerald: "text-emerald-500",
                };
                return (
                  <div key={item.label} className={`${colorStyles[item.color]} border rounded-xl p-5`}>
                    <div className="flex items-start gap-3">
                      <svg className={`w-6 h-6 ${iconStyles[item.color]} mt-0.5 flex-shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                      <div>
                        <p className="text-base font-bold text-gray-900 mb-1">{item.label}</p>
                        <p className="text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
      quality: (
        <div id="profile-quality" className="scroll-mt-24">
          <div className="space-y-5">
            <p className="text-base text-gray-600 leading-relaxed">
              When sourcing {compoundName} for research, quality should be the primary consideration. Here is what to look for when evaluating suppliers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Third-Party Testing", desc: "Reputable suppliers provide independent HPLC/MS analysis certificates. Look for ≥99% purity and clear documentation of testing methodology.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
                { title: "Certificate of Analysis", desc: "A valid CoA should include the batch number, test date, purity percentage, chromatography results, and the testing laboratory's credentials.", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "blue" },
                { title: "Manufacturing Standards", desc: "Look for suppliers who manufacture in GMP-compliant facilities. Some UK suppliers source from EU or US facilities with pharmaceutical-grade production.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", color: "purple" },
                { title: "Product Presentation", desc: "Quality peptides arrive as a sterile lyophilized powder in a sealed vial, protected from light. The vial should be clearly labelled with the peptide name, dosage, batch number, and expiry date.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "indigo" },
                { title: "Lab Tested Verification", desc: "Many UK suppliers now include lab test verification on their product pages. ViralPeps marks these as 'Lab Tested' in our comparison table.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "emerald" },
                { title: "Supplier Reputation", desc: "Check supplier ratings and reviews from other researchers. Established UK suppliers with transparent business practices and clear contact information are generally more reliable.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "blue" },
              ].map((item) => {
                const borderMap: Record<string, string> = {
                  emerald: "border-emerald-200 bg-emerald-50/30",
                  blue: "border-blue-200 bg-blue-50/30",
                  purple: "border-purple-200 bg-purple-50/30",
                  indigo: "border-indigo-200 bg-indigo-50/30",
                };
                const iconMap: Record<string, string> = {
                  emerald: "text-emerald-600 bg-emerald-100",
                  blue: "text-blue-600 bg-blue-100",
                  purple: "text-purple-600 bg-purple-100",
                  indigo: "text-indigo-600 bg-indigo-100",
                };
                return (
                  <div key={item.title} className={`border ${borderMap[item.color]} rounded-xl p-5`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${iconMap[item.color]} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">How ViralPeps Helps</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    ViralPeps is a price comparison service only — we do not verify supplier credentials, product quality, or purity. We display 'Lab Tested' badges based on supplier claims. Always request and verify the Certificate of Analysis directly from your chosen supplier before purchasing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      references: (
        <div id="profile-references" className="scroll-mt-24">
          <div className="space-y-4">
            <p className="text-base text-gray-600 leading-relaxed">
              Key published research on {compoundName} cited from peer-reviewed journals:
            </p>
            <div className="space-y-3">
              {[
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
              ].map((ref, i) => (
                <div key={i} className="flex items-start gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-sm text-gray-400 font-mono mt-0.5 min-w-[24px]">[{i + 1}]</span>
                  <p className="text-base text-gray-600 leading-relaxed">{ref}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              References shown for informational purposes. Always verify against the latest published literature. Research findings are based on preclinical studies and may not translate to clinical applications.
            </p>
          </div>
        </div>
      ),
    };
  }, [compound]);

  return (
    <>
      {/* ===== FILTERS ROW (15% bigger) ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Dosage filter */}
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-gray-500 uppercase tracking-wider font-semibold">Dosage</label>
            <select
              value={selectedDosage}
              onChange={(e) => setSelectedDosage(e.target.value)}
              className="text-base border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="all">All Sizes</option>
              {allDosages.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-gray-500 uppercase tracking-wider font-semibold">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-base border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Supplier Rating</option>
            </select>
          </div>

          <span className="text-sm text-gray-400 ml-auto">{displayedSources.length} results</span>
        </div>
      </div>

      {/* ===== INFO TABS (15% bigger) ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        {/* Tab navigation - pill style */}
        <div className="p-5 md:p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-2" role="tablist">
            {INFO_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-5 md:p-6" role="tabpanel" id="profile-tab-panel">
          {activeTab === "prices" ? (
            <div>
              <p className="text-base text-gray-500 mb-3">
                Compare {productCount} prices for {compound.name}. Cheapest: <strong className="text-green-600">&pound;{minPrice.toFixed(2)}</strong>. Average: <strong>&pound;{avgPrice.toFixed(2)}</strong>.
              </p>
              {selectedVendors.size > 0 && (
                <div className={`mb-4 p-4 rounded-lg border-2 transition-all ${
                  isCompareMode
                    ? 'bg-indigo-50 border-indigo-300 shadow-md'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-bold text-indigo-700">
                      {isCompareMode ? (
                        <>🔍 {selectedVendors.size} suppliers being compared — table filtered below</>
                      ) : (
                        <>{selectedVendors.size} supplier selected — select another to compare</>
                      )}
                    </p>
                  </div>
                  {isCompareMode && (
                    <div className="flex flex-wrap gap-2">
                      {Array.from(selectedVendors).map((name) => {
                        const v = vendors.find((x) => x.name === name);
                        return (
                          <span key={name} className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-full">
                            {v?.name || name}
                            <button onClick={() => toggleVendor(name)} className="text-indigo-400 hover:text-indigo-600 ml-0.5">&times;</button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            tabContent[activeTab]
          )}
        </div>
      </div>

      {/* ===== PRICE COMPARISON TABLE (Desktop) ===== */}
      <div id="pricing-table" className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold w-12">
                  <span className="sr-only">Compare</span>
                </th>
                <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Supplier</th>
                <th className="text-right px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Price</th>
                <th className="text-right px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Price / mg</th>
                <th className="text-center px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Stock</th>
                <th className="text-center px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Delivery</th>
                <th className="text-center px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Quality</th>
                <th className="text-center px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">Coupon</th>
                <th className="text-center px-5 py-4 text-xs text-gray-500 uppercase tracking-wider font-semibold w-24">Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedSources.map((s, i) => {
                const vendor = vendors.find((v) => v.name === s.vendor);
                const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
                const isSelected = selectedVendors.has(s.vendor);
                const isBestPrice = price === minPrice;

                return (
                  <tr
                    key={s.vendor + i}
                    className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${isBestPrice ? "bg-emerald-50/30" : ""} ${isSelected ? "bg-blue-50" : ""}`}
                    onClick={() => toggleVendor(s.vendor)}
                  >
                    {/* Compare checkbox */}
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleVendor(s.vendor)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Supplier */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200">
                          <ProductImage vendorSlug={vendor?.slug || s.vendor.toLowerCase().replace(/\s+/g, '-')} compoundSlug={compound.slug} compoundName={compound.name} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Link href={`/vendors/${vendor?.slug || ""}`} className="font-semibold text-gray-900 text-base hover:text-blue-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                              {vendor?.name || s.vendor}
                            </Link>
                            {isBestPrice && (
                              <span className="text-[12px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">BEST</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <StarRating rating={vendor?.rating || 0} />
                            <span className="text-sm text-gray-400">{vendor?.rating || "—"}</span>
                          </div>
                          {(s as any).dosage && (
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">{(s as any).dosage}</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-gray-900 text-base">{s.price}</span>
                    </td>

                    {/* Price per mg */}
                    <td className="px-5 py-4 text-right">
                      {(() => {
                        const ppm = calcPricePerMg(s.price, (s as any).dosage);
                        return ppm !== null ? (
                          <span className="text-base text-gray-500">&pound;{ppm.toFixed(2)}/mg</span>
                        ) : (
                          <span className="text-base text-gray-300">—</span>
                        );
                      })()}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4 text-center">
                      {s.inStock !== false ? (
                        <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">In Stock</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    {/* Delivery */}
                    <td className="px-5 py-4 text-center">
                      <span className="text-sm font-semibold text-green-600">Free</span>
                    </td>

                    {/* Quality */}
                    <td className="px-5 py-4 text-center">
                      {vendor?.verified ? (
                        <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                          Lab Tested
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    {/* Coupon */}
                    <td className="px-5 py-4 text-center">
                      {vendor?.highlights?.some(h => h.toLowerCase().includes('coupon') || h.toLowerCase().includes('discount') || h.toLowerCase().includes('code')) ? (
                        <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">Coupon</span>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
                    </td>

                    {/* Visit */}
                    <td className="px-5 py-4 text-center">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                      >
                        Visit
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PRICE COMPARISON CARDS (Mobile) ===== */}
      <div id="pricing-table-mobile" className="md:hidden space-y-3 mb-6">
        {displayedSources.map((s, i) => {
          const vendor = vendors.find((v) => v.name === s.vendor);
          const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
          const isSelected = selectedVendors.has(s.vendor);
          const isBestPrice = price === minPrice;
          const ppm = calcPricePerMg(s.price, (s as any).dosage);

          return (
            <div
              key={s.vendor + i}
              className={`bg-white border rounded-xl overflow-hidden transition-colors ${
                isSelected ? "border-blue-400 bg-blue-50/30" : isBestPrice ? "border-emerald-300" : "border-gray-200"
              }`}
            >
              {/* Row 1: checkbox + logo + name/rating + price */}
              <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                {/* Checkbox */}
                <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleVendor(s.vendor)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* Logo */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200">
                  <ProductImage vendorSlug={vendor?.slug || s.vendor.toLowerCase().replace(/\s+/g, '-')} compoundSlug={compound.slug} compoundName={compound.name} />
                </div>

                {/* Name + Rating */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/vendors/${vendor?.slug || ""}`}
                      className="font-semibold text-gray-900 text-sm truncate hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {vendor?.name || s.vendor}
                    </Link>
                    {isBestPrice && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex-shrink-0">BEST</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-amber-500 text-xs">★ {vendor?.rating || "—"}</span>
                    {(s as any).dosage && (
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{(s as any).dosage}</span>
                    )}
                    {ppm !== null && (
                      <span className="text-[11px] text-gray-400">&pound;{ppm.toFixed(2)}/mg</span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-gray-900 text-base">{s.price}</span>
                </div>
              </div>

              {/* Row 2: badges + Visit button */}
              <div className="flex items-center justify-between px-4 pb-3.5 pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                  {s.inStock !== false && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">In Stock</span>
                  )}
                  <span className="text-[11px] font-semibold text-green-600">Free</span>
                  {vendor?.verified && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                      Lab Tested
                    </span>
                  )}
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm flex-shrink-0"
                >
                  Visit
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state (shared) */}
      {displayedSources.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-base">
            {selectedDosage !== "all" ? (
              <>No suppliers found for this dosage. Try selecting a different size.</>
            ) : (
              <>No suppliers found.</>
            )}
          </div>
        )}
    </>
  );
}
