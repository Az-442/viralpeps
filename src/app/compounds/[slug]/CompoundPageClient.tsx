"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import compoundTabs from "@/data/compound-tabs";

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

  // ── Tab content map ──
  const tabContent = useMemo(() => {
    const compoundName = compound.name;
    const slug: string = compound.slug || "";
    const data = compoundTabs[slug];

    // Fallback: if no tab data exists for this compound, show placeholder for info tabs
    if (!data) {
      const placeholder: Record<string, React.ReactNode> = {};
      for (const tab of INFO_TABS) {
        if (tab.id === "prices") {
          placeholder.prices = null;
        } else {
          placeholder[tab.id] = (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Content Coming Soon</h3>
              <p className="text-base text-gray-500 max-w-md mx-auto">
                Detailed {tab.label} information for {compoundName} is being compiled. Check back soon.
              </p>
            </div>
          );
        }
      }
      return placeholder as Record<string, React.ReactNode>;
    }

    return {
      prices: null,
      overview: (
        <div id="profile-overview" className="scroll-mt-24">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">What is {compoundName}?</h3>
              <p className="text-base text-gray-600 leading-relaxed">{data.overview.whatIs}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Mechanism of Action</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="text-base text-gray-700 leading-relaxed">{data.overview.mechanism}</p>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">Key Research Benefits</h3>
              <ul className="space-y-2">
                {data.overview.benefits.map((benefit, i) => (
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
              {data.molecular.items.map((m) => (
                <div key={m.label} className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                  <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold">{m.label}</p>
                  <p className="text-base font-bold text-gray-900 font-mono">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
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
                <text x="140" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a5f" opacity="0.75">{data.molecular.diagramTitle}</text>
                <text x="140" y="34" textAnchor="middle" fontSize="8" fill="#64748b" opacity="0.6">{data.molecular.diagramSubtitle}</text>
                {/* Backbone nodes */}
                {data.molecular.residues.map((n, i) => (
                  <circle key={`dot-${i}`} cx={n.x} cy={n.y} r="2.5" fill="#3b82f6" opacity="0.3" />
                ))}
                {/* Backbone path */}
                {data.molecular.residues.length > 1 && data.molecular.residues.slice(0, -1).map((n, i) => {
                  const next = data.molecular.residues[i + 1];
                  return <line key={`bond-${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" opacity="0.5" />;
                })}
                {/* Peptide bonds (dashes) */}
                {data.molecular.residues.length > 1 && data.molecular.residues.slice(0, -1).map((n, i) => {
                  const next = data.molecular.residues[i + 1];
                  return <line key={`hbond-${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#1d4ed8" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.25" />;
                })}
                {/* N-term label */}
                <g transform="translate(24, 47)">
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#eef2ff" stroke="#6366f1" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#4338ca">N-term</text>
                </g>
                {/* C-term label */}
                <g transform={`translate(${data.molecular.residues.length > 0 ? data.molecular.residues[data.molecular.residues.length - 1].x + 4 : 224}, ${data.molecular.residues.length > 0 ? data.molecular.residues[data.molecular.residues.length - 1].y + 10 : 105})`}>
                  <rect x="-2" y="-8" width="22" height="16" rx="3" fill="#fef2f2" stroke="#ef4444" strokeWidth="0.8" />
                  <text x="9" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#dc2626">C-term</text>
                </g>
                {/* Residue circles */}
                {data.molecular.residues.map((node, i) => (
                  <g key={`aa-${i}`} filter="url(#shadow1)">
                    <circle cx={node.x} cy={node.y} r="10" fill="white" stroke={node.color} strokeWidth="1.5" />
                    <text x={node.x} y={node.y + 3} textAnchor="middle" fontSize="6" fontWeight="bold" fill={node.color}>{node.label}</text>
                  </g>
                ))}
                {/* Direction arrows */}
                {data.molecular.residues.length > 1 && data.molecular.residues.slice(0, -1).map((n, i) => {
                  const next = data.molecular.residues[i + 1];
                  const mx = (n.x + next.x) / 2;
                  const my = (n.y + next.y) / 2;
                  return <polygon key={`arrow-${i}`} points={`${mx - 3},${my - 4} ${mx + 3},${my} ${mx - 3},${my + 4}`} fill="#2563eb" opacity="0.3" />;
                })}
                {/* Legend */}
                <g transform="translate(8, 195)">
                  <rect x="0" y="0" width="264" height="36" rx="6" fill="white" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="0.5" />
                  <text x="8" y="14" fontSize="6" fill="#475569" fontWeight="500">{data.molecular.legend}</text>
                  <text x="8" y="26" fontSize="6" fill="#475569" fontWeight="500">N-term (N-terminus)  C-term (C-terminus)  — Backbone  ··· Peptide bond  &gt; direction</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ),
      indications: (
        <div id="profile-indications" className="scroll-mt-24">
          <div className="space-y-6">
            <p className="text-base text-gray-600 leading-relaxed">{compoundName} is researched for the following applications based on published preclinical studies. Indications are grouped by research evidence level.</p>
            {/* Most Effective */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <EffectivenessBadge level="most-effective" />
                <span>Most Effective Research Applications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.indications.mostEffective.map((item) => (
                  <div key={item.title} className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
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
                {data.indications.effective.map((item) => (
                  <div key={item.title} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
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
                {data.indications.moderate.map((item) => (
                  <div key={item.title} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
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
            <p className="text-base text-gray-600 leading-relaxed">Typical research protocols for {compoundName} based on published studies. These are research protocols only — always follow your approved study protocol.</p>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-2">
                <span className="text-blue-600">Injectable</span> — Subcutaneous Administration
              </h4>
              <p className="text-sm text-gray-500 mb-3">{data.dosing.note}</p>
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
                    {data.dosing.rows.map((row) => (
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
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Protocol Tips</h4>
              <ul className="space-y-1.5">
                {data.dosing.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-700"><strong>Note:</strong> Dosages shown are for research purposes only. Always follow your approved research protocol and institutional guidelines.</p>
            </div>
            <div>
              <Link href="/tools/reconstitution-calculator" className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
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
            <p className="text-base text-gray-600 leading-relaxed">{data.interactions.note} Below are compounds that may complement {compoundName} in preclinical research settings.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.interactions.cards.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compounds/${item.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 border border-blue-200">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                        <span className={`text-[12px] font-bold px-1.5 py-0.5 rounded-full ${item.effect === "Synergistic" ? "bg-emerald-100 text-emerald-800" : item.effect === "Complementary" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>{item.effect}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                </Link>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="text-base font-bold text-gray-900 mb-2">Research Stacking Notes</h4>
              <ul className="space-y-1.5">
                {data.interactions.stackNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
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
            <p className="text-base text-gray-600 leading-relaxed">Research timelines for {compoundName} studies based on published protocols. Actual timelines vary by model, dosage, and administration route.</p>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 hidden md:block" />
              <div className="space-y-0 md:space-y-4">
                {data.timeline.phases.map((phase, i) => {
                  const colorMap: Record<string, string> = { blue: "border-blue-500 bg-blue-50", emerald: "border-emerald-500 bg-emerald-50", purple: "border-purple-500 bg-purple-50" };
                  const dotMap: Record<string, string> = { blue: "bg-blue-500 ring-blue-200", emerald: "bg-emerald-500 ring-emerald-200", purple: "bg-purple-500 ring-purple-200" };
                  const badgeMap: Record<string, string> = { blue: "bg-blue-100 text-blue-800", emerald: "bg-emerald-100 text-emerald-800", purple: "bg-purple-100 text-purple-800" };
                  return (
                    <div key={phase.day} className={`relative pl-0 md:pl-16 pb-0 md:pb-2 ${i < 5 ? "md:mb-0" : ""}`}>
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
              <p className="text-sm text-amber-700"><strong>Note:</strong> Timelines shown are based on published research protocols. Actual results vary by research model, dosage, and administration method.</p>
            </div>
          </div>
        </div>
      ),
      safety: (
        <div id="profile-safety" className="scroll-mt-24">
          <div className="space-y-5">
            <p className="text-base text-gray-600 leading-relaxed">{compoundName} is intended for laboratory research purposes only. The following safety information is based on published preclinical studies and standard laboratory protocols.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.safety.cards.map((item) => {
                const colorStyles: Record<string, string> = { amber: "bg-amber-50 border-amber-200 text-amber-700", red: "bg-red-50 border-red-200 text-red-700", blue: "bg-blue-50 border-blue-200 text-blue-700", emerald: "bg-emerald-50 border-emerald-200 text-emerald-700" };
                const iconStyles: Record<string, string> = { amber: "text-amber-500", red: "text-red-500", blue: "text-blue-500", emerald: "text-emerald-500" };
                return (
                  <div key={item.label} className={`${colorStyles[item.color]} border rounded-xl p-5`}>
                    <div className="flex items-start gap-3">
                      <svg className={`w-6 h-6 ${iconStyles[item.color]} mt-0.5 flex-shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
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
            <p className="text-base text-gray-600 leading-relaxed">When sourcing {compoundName} for research, quality should be the primary consideration. Here is what to look for when evaluating suppliers.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Third-Party Testing", desc: "Reputable suppliers provide independent HPLC/MS analysis certificates. Look for ≥99% purity and clear documentation of testing methodology.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
                { title: "Certificate of Analysis", desc: "A valid CoA should include the batch number, test date, purity percentage, chromatography results, and the testing laboratory's credentials.", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "blue" },
                { title: "Manufacturing Standards", desc: "Look for suppliers who manufacture in GMP-compliant facilities. Some UK suppliers source from EU or US facilities with pharmaceutical-grade production.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", color: "purple" },
                { title: "Product Presentation", desc: "Quality peptides arrive as a sterile lyophilized powder in a sealed vial, protected from light. The vial should be clearly labelled with the peptide name, dosage, batch number, and expiry date.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "indigo" },
                { title: "Lab Tested Verification", desc: "Many UK suppliers now include lab test verification on their product pages. ViralPeps marks these as 'Lab Tested' in our comparison table.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "emerald" },
                { title: "Supplier Reputation", desc: "Check supplier ratings and reviews from other researchers. Established UK suppliers with transparent business practices and clear contact information are generally more reliable.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "blue" },
              ].map((item) => {
                const borderMap: Record<string, string> = { emerald: "border-emerald-200 bg-emerald-50/30", blue: "border-blue-200 bg-blue-50/30", purple: "border-purple-200 bg-purple-50/30", indigo: "border-indigo-200 bg-indigo-50/30" };
                const iconMap: Record<string, string> = { emerald: "text-emerald-600 bg-emerald-100", blue: "text-blue-600 bg-blue-100", purple: "text-purple-600 bg-purple-100", indigo: "text-indigo-600 bg-indigo-100" };
                return (
                  <div key={item.title} className={`border ${borderMap[item.color]} rounded-xl p-5`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${iconMap[item.color]} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
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
                <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">How ViralPeps Helps</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">ViralPeps is a price comparison service only — we do not verify supplier credentials, product quality, or purity. We display 'Lab Tested' badges based on supplier claims. Always request and verify the Certificate of Analysis directly from your chosen supplier before purchasing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      references: (
        <div id="profile-references" className="scroll-mt-24">
          <div className="space-y-4">
            <p className="text-base text-gray-600 leading-relaxed">Key published research on {compoundName} cited from peer-reviewed journals:</p>
            <div className="space-y-3">
              {data.references.map((ref, i) => (
                <div key={i} className="flex items-start gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-sm text-gray-400 font-mono mt-0.5 min-w-[24px]">[{i + 1}]</span>
                  <p className="text-base text-gray-600 leading-relaxed">{ref}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">References shown for informational purposes. Always verify against the latest published literature. Research findings are based on preclinical studies and may not translate to clinical applications.</p>
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
