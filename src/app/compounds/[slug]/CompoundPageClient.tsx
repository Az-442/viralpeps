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
            {/* What is Ipamorelin? */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">What is {compoundName}?</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {compoundName} is a selective pentapeptide growth hormone secretagogue that stimulates natural GH production from the pituitary gland. It was developed as a more targeted alternative to other GHRPs, with minimal cortisol and prolactin disruption. Known for its excellent safety profile and consistent GH pulses, Ipamorelin produces reliable growth hormone release without significant side effects.
              </p>
            </div>

            {/* Mechanism of Action */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Mechanism of Action</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-base text-gray-700 leading-relaxed">
                  Ipamorelin binds selectively to ghrelin receptors (GHSR-1a) in the pituitary gland, stimulating natural GH release with high specificity. Unlike GHRP-6, it has negligible effects on appetite and minimal impact on cortisol and prolactin levels, making it a more targeted GH secretagogue for research protocols.
                </p>
              </div>
            </div>

            {/* Key Research Benefits */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Key Research Benefits</h3>
              <ul className="space-y-2">
                {[
                  "Optimal GH stimulation with superior bioavailability and consistent pulse amplitude",
                  "Body composition improvements — promotes lean mass development and fat reduction",
                  "Enhanced recovery and anti-aging effects through GH/IGF-1 axis activation",
                  "Minimal side effects compared to other GHRPs — no significant cortisol or prolactin elevation",
                  "Improved sleep quality through nocturnal GH pulse enhancement",
                  "Well-tolerated with an excellent safety profile in research models",
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
                { label: "Molecular Weight", value: "711.85 Da" },
                { label: "Sequence", value: "Aib-His-D-2-Nal-D-Phe-Lys-NH₂" },
                { label: "Length", value: "5 amino acids" },
                { label: "Type", value: "Growth hormone secretagogue | Selective GHRP" },
                { label: "Half-Life", value: "~2 hours" },
                { label: "CAS Number", value: compound.cas || "100535-87-4" },
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
              <svg viewBox="0 0 280 240" className="w-full max-w-[300px] h-auto">
                <defs>
                  <linearGradient id="molGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
                  </linearGradient>
                  <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodOpacity="0.15" />
                  </filter>
                </defs>
                <rect width="280" height="240" fill="url(#molGrad)" rx="16" />

                {/* Title */}
                <text x="140" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a5f" opacity="0.75">
                  {compoundName}
                </text>
                <text x="140" y="34" textAnchor="middle" fontSize="8" fill="#64748b" opacity="0.6">
                  5-mer · 711.85 Da · Sequence: Aib-His-Nal-Phe-Lys-NH₂
                </text>

                {/* ── Peptide backbone ── */}
                {/* Linear backbone: 5 residues in a single row */}

                {/* Residue positions [x, y] */}
                {(() => {
                  const nodes = [
                    { x: 40, y: 100 },  // 0: Aib
                    { x: 85, y: 100 },  // 1: His
                    { x: 130, y: 100 }, // 2: Nal
                    { x: 175, y: 100 }, // 3: Phe
                    { x: 220, y: 100 }, // 4: Lys
                  ];
                  return nodes;
                })().map((n, i) => <circle key={`dot-${i}`} cx={n.x} cy={n.y} r="3" fill="#3b82f6" opacity="0.4" />)}

                {/* Backbone thick linear path */}
                <line x1="40" y1="100" x2="85" y2="100" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                <line x1="85" y1="100" x2="130" y2="100" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                <line x1="130" y1="100" x2="175" y2="100" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                <line x1="175" y1="100" x2="220" y2="100" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />

                {/* Peptide bonds (small dashes between nodes) */}
                <line x1="40" y1="100" x2="85" y2="100" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                <line x1="85" y1="100" x2="130" y2="100" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                <line x1="130" y1="100" x2="175" y2="100" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                <line x1="175" y1="100" x2="220" y2="100" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />

                {/* ── N-terminus label ── */}
                <g transform="translate(24, 87)">
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#eef2ff" stroke="#6366f1" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#4338ca">N-term</text>
                </g>

                {/* ── C-terminus label ── */}
                <g transform="translate(224, 105)">
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#fef2f2" stroke="#ef4444" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#dc2626">C-term</text>
                </g>

                {/* ── Amino acid residue circles ── */}
                {[
                  { x: 40, y: 100, label: "Aib", color: "#8b5cf6", name: "Aib" },
                  { x: 85, y: 100, label: "H", color: "#0891b2", name: "His" },
                  { x: 130, y: 100, label: "Nal", color: "#d97706", name: "Nal" },
                  { x: 175, y: 100, label: "F", color: "#7c3aed", name: "Phe" },
                  { x: 220, y: 100, label: "K", color: "#6366f1", name: "Lys" },
                ].map((node, i) => (
                  <g key={`aa-${i}`} filter="url(#shadow1)">
                    <circle cx={node.x} cy={node.y} r="14" fill="white" stroke={node.color} strokeWidth="1.8" />
                    <text x={node.x} y={node.y + 3.5} textAnchor="middle" fontSize="7" fontWeight="bold" fill={node.color}>
                      {node.label}
                    </text>
                  </g>
                ))}

                {/* ── Peptide bond connectors between residues ── */}
                {[
                  [40, 100, 85, 100],
                  [85, 100, 130, 100],
                  [130, 100, 175, 100],
                  [175, 100, 220, 100],
                ].map((seg, i) => (
                  <line key={`bond-${i}`} x1={seg[0]} y1={seg[1]} x2={seg[2]} y2={seg[3]}
                    stroke="#1e40af" strokeWidth="0.8" opacity="0.25" />
                ))}

                {/* ── Direction arrow on backbone ── */}
                <g fill="#2563eb" opacity="0.35">
                  <polygon points="50,93 55,97 50,101" />
                  <polygon points="95,93 100,97 95,101" />
                  <polygon points="140,93 145,97 140,101" />
                  <polygon points="185,93 190,97 185,101" />
                </g>

                {/* ── Side chains (R-groups) ── */}
                {/* Histidine (H) side chain */}
                <g opacity="0.7">
                  <line x1="85" y1="100" x2="75" y2="70" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="65" y="62" fontSize="5" fill="#0891b2" fontStyle="italic">R</text>
                  <text x="72" y="56" fontSize="4.5" fill="#0e7490">imidazole</text>
                </g>
                {/* Nal (2-naphthylalanine) side chain */}
                <g opacity="0.7">
                  <line x1="130" y1="100" x2="140" y2="72" stroke="#d97706" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="132" y="64" fontSize="5" fill="#d97706" fontStyle="italic">R</text>
                  <text x="130" y="56" fontSize="4.5" fill="#b45309">naphthyl</text>
                </g>
                {/* Phenylalanine (F) side chain */}
                <g opacity="0.7">
                  <line x1="175" y1="100" x2="185" y2="72" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="178" y="64" fontSize="5" fill="#7c3aed" fontStyle="italic">R</text>
                  <text x="175" y="56" fontSize="4.5" fill="#6d28d9">benzyl</text>
                </g>
                {/* Lysine (K) side chain */}
                <g opacity="0.7">
                  <line x1="220" y1="100" x2="235" y2="72" stroke="#6366f1" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="235" y="64" fontSize="5" fill="#6366f1" fontStyle="italic">R</text>
                  <text x="230" y="56" fontSize="4.5" fill="#4338ca">-(CH₂)₄NH₃⁺</text>
                </g>
                {/* Aib side chain */}
                <g opacity="0.6">
                  <line x1="40" y1="100" x2="30" y2="74" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2,1" />
                  <text x="18" y="66" fontSize="5" fill="#8b5cf6" fontStyle="italic">Aib</text>
                  <text x="10" y="58" fontSize="4.5" fill="#7c3aed">-C(CH₃)₂-</text>
                </g>

                {/* ── Legend ── */}
                <g transform="translate(8, 195)">
                  <rect x="0" y="0" width="264" height="36" rx="6" fill="white" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="0.5" />
                  <text x="8" y="11" fontSize="6" fill="#475569" fontWeight="500">Aib=α-aminoisobutyric  H=His  Nal=Naphthylalanine  F=Phe  K=Lys</text>
                  <text x="8" y="22" fontSize="6" fill="#475569" fontWeight="500">
                    N-term (N-terminus)  C-term (C-terminus)  — Backbone  ··· Peptide bond  &gt; direction
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
                  { title: "GH Stimulation", desc: "Consistent GH pulse stimulation with reliable amplitude and minimal trough between pulses. Ipamorelin provides targeted, high-specificity GH release through selective GHSR-1a binding." },
                  { title: "Muscle Growth", desc: "Promotes lean muscle mass development through GH/IGF-1 axis activation with superior bioavailability and minimal side effects." },
                  { title: "Recovery Enhancement", desc: "Accelerates post-exercise recovery and tissue repair through anabolic signalling via the GH/IGF-1 cascade." },
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
                  { title: "Fat Loss", desc: "Aids in fat reduction through improved metabolic rate and GH-mediated lipolysis. Ipamorelin supports favourable body composition changes via the GH/IGF-1 metabolic axis." },
                  { title: "Anti-Aging", desc: "Supports healthy aging through GH pulse restoration and improved body composition. Ipamorelin helps restore youthful GH pulsatility patterns." },
                  { title: "Sleep Quality", desc: "Improves sleep architecture and depth through GH release during nocturnal pulses. Enhanced slow-wave sleep associated with GH pulse timing." },
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
                  { title: "Bone Health", desc: "Supports bone mineral density through GH/IGF-1 mediated osteoblast activity. May contribute to improved skeletal health in long-term research protocols." },
                  { title: "Appetite Stimulation", desc: "Mild ghrelin receptor activation may enhance appetite. Significantly less pronounced than GHRP-6, making Ipamorelin preferred when hunger effects are unwanted." },
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
                <span className="text-blue-600">Injectable</span> — Subcutaneous Administration
              </h4>
              <p className="text-sm text-gray-500 mb-3">Best taken on an empty stomach (30 min before or 2 hours after meals). Do not eat for 30 minutes post-injection to avoid blunting GH pulse. Rotate injection sites. Morning and pre-bed dosing mimics natural GH pulses.</p>
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
                      { goal: "General Health & Longevity", dose: "200 mcg", freq: "1x daily before bed", route: "SubQ" },
                      { goal: "Body Composition", dose: "250-300 mcg", freq: "2x daily (morning + pre-workout)", route: "SubQ" },
                      { goal: "Athletic Performance", dose: "200-250 mcg", freq: "2-3x daily", route: "SubQ" },
                      { goal: "Sleep & Recovery", dose: "200 mcg", freq: "1x daily 30min before bed", route: "SubQ" },
                      { goal: "Anti-Aging Protocol", dose: "200-250 mcg", freq: "1-2x daily", route: "SubQ" },
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
                  "Best taken on an empty stomach for maximum GH pulse amplitude",
                  "Do not eat for 30 minutes post-injection to avoid blunting the GH pulse",
                  "Rotate injection sites to prevent tissue irritation",
                  "Morning and pre-bed dosing mimics the body's natural GH pulse pattern",
                  "Reconstitute with bacteriostatic water — swirl gently, never shake",
                  "Store reconstituted peptide at 2-8°C; use within 28 days",
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
                { slug: "cjc-1295-no-dac", name: "CJC-1295 (No DAC)", desc: "Synergistic — The most studied GHRH/GHRP stack. CJC-1295 stimulates GHRH receptors while Ipamorelin acts on ghrelin receptors, producing a synergistic GH pulse significantly greater than either alone.", effect: "Synergistic" },
                { slug: "tesamorelin", name: "Tesamorelin", desc: "Synergistic — Tesamorelin (GHRH analog) combined with Ipamorelin amplifies GH release through complementary pituitary stimulation pathways.", effect: "Synergistic" },
                { slug: "ghrp-2", name: "GHRP-2", desc: "Alternative — Both are GHRPs but Ipamorelin is preferred when minimal cortisol/prolactin elevation is desired for research protocols.", effect: "Complementary" },
                { slug: "ghrp-6", name: "GHRP-6", desc: "Alternative — GHRP-6 causes significant appetite stimulation; Ipamorelin is preferred when hunger effects are unwanted in the research model.", effect: "Complementary" },
                { slug: "sermorelin", name: "Sermorelin", desc: "Supportive — Sermorelin (GRF 1-29) paired with Ipamorelin creates a dual-pathway GH stimulation protocol for enhanced GH release.", effect: "Supportive" },
                { slug: "mod-grf-1-29", name: "Mod GRF (1-29)", desc: "Supportive — Modified GRF(1-29) provides GHRH agonism that complements Ipamorelin's ghrelin receptor targeting for comprehensive GH axis research.", effect: "Supportive" },
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
                  "CJC-1295 (No DAC) and Ipamorelin are the most studied GHRH/GHRP combination for GH secretion research",
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
                  { day: "Day 1-7", title: "Initial Administration", desc: "Begin daily dosing protocol. First GH pulses detected post-injection. No significant physiological changes yet.", color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 7-14", title: "Early Response Phase", desc: "Consistent GH pulse pattern established. Sleep quality may improve. Early metabolic changes begin as GH/IGF-1 signalling initiates.", color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { day: "Day 14-28", title: "Physiological Adaptation", desc: "Increased IGF-1 production begins. Early improvements in recovery time and body composition may be observed through GH-mediated anabolic effects.", color: "emerald", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 28-56", title: "Active Remodelling Phase", desc: "Continued GH/IGF-1 elevation supports lean mass preservation and fat metabolism. Most noticeable changes in body composition and recovery.", color: "emerald", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { day: "Day 56-84", title: "Peak Effect Phase", desc: "Maximum physiological response achieved. Consistent improvements in muscle quality, fat loss, and sleep architecture observed.", color: "purple", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                  { day: "Day 84-168", title: "Study Conclusion", desc: "Standard 3-6 month research cycle. Comprehensive assessment of GH/IGF-1 biomarkers, body composition changes, and functional outcomes.", color: "purple", icon: "M5 13l4 4L19 7" },
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
                  text: "Ipamorelin is not approved for human consumption by the MHRA, FDA, or any regulatory body. For in-vitro and animal research use only.",
                  icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
                  color: "amber",
                },
                {
                  label: "Hormonal Considerations",
                  text: "As a GH secretagogue, Ipamorelin alters the HGH/IGF-1 axis. Monitor GH and IGF-1 levels in long-term studies. Prolonged use may affect natural GH pulsatility.",
                  icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
                  color: "red",
                },
                {
                  label: "Contraindications",
                  text: "Extra caution advised for research involving subjects with active cancer, pituitary disorders, or diabetes, due to GH/IGF-1 axis involvement.",
                  icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "amber",
                },
                {
                  label: "Storage Requirements",
                  text: "Lyophilized powder: Store at room temperature, protected from light and moisture. Reconstituted solution: Stable for up to 28 days at 2-8°C. Do not freeze after reconstitution.",
                  icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                  color: "blue",
                },
                {
                  label: "Handling Protocols",
                  text: "Standard laboratory safety protocols must be followed. Use appropriate PPE including gloves during handling. Reconstitute with bacteriostatic water only — swirl gently, never shake.",
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
