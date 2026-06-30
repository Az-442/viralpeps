"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { PEPTIDE_COUNT, SUPPLIER_COUNT, TOTAL_PRODUCTS } from "@/data/stats";
import { HOMEPAGE_CATEGORY_GROUPS, CATEGORY_LABELS } from "@/data/categories";

// ── Helpers ──
function calcMinPrice(sources: { price: string }[]): number {
  return Math.min(...sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity));
}
function calcMaxPrice(sources: { price: string }[]): number {
  const prices = sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, ""))).filter((p) => !isNaN(p));
  return prices.length ? Math.max(...prices) : 0;
}
function calcSavePercent(minP: number, maxP: number): number {
  if (!maxP || maxP <= minP) return 0;
  return Math.round(((maxP - minP) / maxP) * 100);
}
function dosageLabel(dosages: string[]): string {
  if (!dosages || dosages.length === 0) return "";
  const first = dosages[0];
  const match = first.match(/([\d.,]+)\s*(mg|mcg|g|ml)/i);
  if (match) return match[1] + match[2].toLowerCase();
  return "";
}
function getSourceImage(c: any): string | null {
  const sources = c.sources || [];
  const withImage = sources.find((s: any) => (s as any).image);
  return (withImage as any)?.image || null;
}

// ── Category → accent colour map (brighter, brand-aligned) ──
const categoryAccents: Record<string, { border: string; bg: string; from: string; via: string; badge: string; icon: string }> = {
  "glp-1-agonists":     { border: "border-purple-300", bg: "bg-purple-100", from: "from-purple-200", via: "via-purple-50", badge: "bg-purple-200 text-purple-800", icon: "#9333ea" },
  "thymosin-bpc":       { border: "border-emerald-300", bg: "bg-emerald-100", from: "from-emerald-200", via: "via-emerald-50", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "tb-500":             { border: "border-emerald-300", bg: "bg-emerald-100", from: "from-emerald-200", via: "via-emerald-50", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "peptide-fragments":  { border: "border-emerald-300", bg: "bg-emerald-100", from: "from-emerald-200", via: "via-emerald-50", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "growth-hormone":     { border: "border-blue-300", bg: "bg-blue-100", from: "from-blue-200", via: "via-blue-50", badge: "bg-blue-200 text-blue-800", icon: "#2563eb" },
  "anti-aging":         { border: "border-indigo-300", bg: "bg-indigo-100", from: "from-indigo-200", via: "via-indigo-50", badge: "bg-indigo-200 text-indigo-800", icon: "#6366f1" },
  "immunity-peptides":  { border: "border-cyan-300", bg: "bg-cyan-100", from: "from-cyan-200", via: "via-cyan-50", badge: "bg-cyan-200 text-cyan-800", icon: "#06b6d4" },
  "tanning-libido":     { border: "border-rose-300", bg: "bg-rose-100", from: "from-rose-200", via: "via-rose-50", badge: "bg-rose-200 text-rose-800", icon: "#e11d48" },
  "peptide-blends":     { border: "border-amber-300", bg: "bg-amber-100", from: "from-amber-200", via: "via-amber-50", badge: "bg-amber-200 text-amber-800", icon: "#d97706" },
  cognitive:            { border: "border-violet-300", bg: "bg-violet-100", from: "from-violet-200", via: "via-violet-50", badge: "bg-violet-200 text-violet-800", icon: "#8b5cf6" },
  "aod-fragments":      { border: "border-pink-300", bg: "bg-pink-100", from: "from-pink-200", via: "via-pink-50", badge: "bg-pink-200 text-pink-800", icon: "#ec4899" },
  "research-compounds": { border: "border-gray-300", bg: "bg-gray-100", from: "from-gray-200", via: "via-gray-50", badge: "bg-gray-200 text-gray-800", icon: "#6b7280" },
  "research-solutions": { border: "border-lime-300", bg: "bg-lime-100", from: "from-lime-200", via: "via-lime-50", badge: "bg-lime-200 text-lime-800", icon: "#65a30d" },
  "nasal-sprays":       { border: "border-teal-300", bg: "bg-teal-100", from: "from-teal-200", via: "via-teal-50", badge: "bg-teal-200 text-teal-800", icon: "#0d9488" },
  "lab-supplies":       { border: "border-yellow-300", bg: "bg-yellow-100", from: "from-yellow-200", via: "via-yellow-50", badge: "bg-yellow-200 text-yellow-800", icon: "#ca8a04" },
  supplies:             { border: "border-stone-300", bg: "bg-stone-100", from: "from-stone-200", via: "via-stone-50", badge: "bg-stone-200 text-stone-800", icon: "#78716c" },
  other:                { border: "border-gray-300", bg: "bg-gray-100", from: "from-gray-200", via: "via-gray-50", badge: "bg-gray-200 text-gray-800", icon: "#6b7280" },
  "auto-imported":      { border: "border-gray-300", bg: "bg-gray-100", from: "from-gray-200", via: "via-gray-50", badge: "bg-gray-200 text-gray-800", icon: "#6b7280" },
};

function getAccent(cat: string) {
  return categoryAccents[cat] || { border: "border-gray-300", bg: "bg-gray-100", from: "from-gray-200", via: "via-gray-50", badge: "bg-gray-200 text-gray-800", icon: "#6b7280" };
}

// ── Category tab definition ──
interface TabDef {
  label: string;
  slugs: string[] | null; // null = "All"
}

const categoryTabs: TabDef[] = [
  { label: "All", slugs: null },
  ...HOMEPAGE_CATEGORY_GROUPS.map((g) => ({ label: g.badge, slugs: g.slugs })),
];

// ── Letter avatar ──
function LetterAvatar({ name, className = "" }: { name: string; className?: string }) {
  const letter = name.trim().charAt(0).toUpperCase();
  const colors = [
    "bg-orange-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600",
    "bg-rose-600", "bg-indigo-600", "bg-amber-600", "bg-teal-600",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-md ${colors[idx]} ${className}`}>
      {letter}
    </div>
  );
}

// ── SVG Icons ──
function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Single compound card (reference-site style) ──
function CompoundCard({ compound }: { compound: any }) {
  const minP = calcMinPrice(compound.sources);
  const maxP = calcMaxPrice(compound.sources);
  const savePct = calcSavePercent(minP, maxP);
  const slug = compound.slug;
  const count = compound.sources.length;
  const dosages = (compound.commonDosages || []).slice(0, 3);
  const dosagesMore = (compound.commonDosages || []).length - 3;
  const cat = compound.category;
  const accent = getAccent(cat);
  const benefits = (compound.researchAreas || []).slice(0, 2);
  const hasMoreBenefits = (compound.researchAreas || []).length > 2;
  const alias = compound.aliases?.[0] || "";
  const categoryLabel = CATEGORY_LABELS[cat] || cat.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <Link
      href={`/compounds/${slug}`}
      className={`bg-white border ${accent.border} rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col`}
    >
      {/* Header banner: colour gradient left→right + LetterAvatar */}
      <div className={`flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r ${accent.from} ${accent.via} to-white relative`}>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm" style={{ backgroundColor: accent.icon }}>
          {compound.name.trim().charAt(0).toUpperCase()}
        </div>
        {savePct > 0 && (
          <div className="ml-auto inline-flex items-center gap-1 bg-white border border-emerald-200 rounded-full px-2.5 py-1 shadow-sm">
            <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-[10px] font-bold text-emerald-700">SAVE {savePct}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col gap-1.5 flex-1">
        {/* Name + category pill */}
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
            {compound.name}
          </h3>
          <span className={`text-[9px] font-semibold ${accent.badge} px-2 py-0.5 rounded-full uppercase tracking-wider`}>
            {categoryLabel}
          </span>
        </div>

        {/* Alias/description */}
        {alias && (
          <p className="text-[12px] text-gray-500 leading-snug">{alias}</p>
        )}

        {/* Dosage pills */}
        {dosages.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dosages.map((d: string) => (
              <span key={d} className={`text-[10px] ${accent.badge} px-1.5 py-0.5 rounded font-medium`}>{d}</span>
            ))}
            {dosagesMore > 0 && (
              <span className={`text-[10px] ${accent.badge} px-1.5 py-0.5 rounded font-medium`}>+{dosagesMore}</span>
            )}
          </div>
        )}

        {/* Benefits with green checkmark */}
        {benefits.length > 0 && (
          <div className="flex flex-wrap items-center gap-y-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {benefits.map((b: string) => (
                <span key={b} className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
            {hasMoreBenefits && (
              <span className="ml-1 text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">+{compound.researchAreas.length - 2} more</span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* FROM price + supplier stats row */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100 mt-1">
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">FROM</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-xl font-extrabold text-emerald-600 leading-none">£{minP.toFixed(2)}</span>
              {maxP > minP && (
                <span className="text-[11px] text-gray-400 line-through">£{maxP.toFixed(2)} max</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span className="font-semibold">{count}</span>
              <span className="text-gray-400">supplier{count !== 1 ? "s" : ""}</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">Various doses</p>
          </div>
        </div>
      </div>

      {/* Full-width CTA button */}
      <div className="px-3 md:px-4 pb-3 md:pb-4">
        <div className="w-full py-2.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
          Compare prices <ArrowRightIcon />
        </div>
      </div>
    </Link>
  );
}

// ── Main page ──
export default function CompoundsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"a-z" | "suppliers" | "price">("a-z");
  const [activeTab, setActiveTab] = useState<string>("All");

  // All compounds (exclude compare-only entries)
  const allCompounds = useMemo(() => compounds.filter((c) => !(c as any)?.compareSlug), []);

  // Filtered by search + category tab
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = allCompounds;

    // Category tab filter
    const tab = categoryTabs.find((t) => t.label === activeTab);
    if (tab && tab.slugs) {
      list = list.filter((c) => tab.slugs!.includes(c.category));
    }

    // Search filter
    if (q) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.aliases || []).some((a: string) => a.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeTab, allCompounds]);

  // Sorted
  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "a-z") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "suppliers") {
      list.sort((a, b) => b.sources.length - a.sources.length);
    } else if (sort === "price") {
      list.sort((a, b) => {
        const aMin = Math.min(...a.sources.map((s: any) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity));
        const bMin = Math.min(...b.sources.map((s: any) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity));
        return aMin - bMin;
      });
    }
    return list;
  }, [filtered, sort]);

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] pb-10">
        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-14 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            COMPARE PEPTIDE PRICES
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Every UK peptide price,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">sorted cheapest first.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
            Track <strong className="text-white">{PEPTIDE_COUNT} research peptides</strong> across{" "}
            <strong className="text-white">{SUPPLIER_COUNT} UK suppliers</strong>.{" "}
            Save up to <strong className="text-white">98%</strong> by picking the right supplier.
          </p>
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search peptides (e.g. BPC-157, Mots-C)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-5 pr-14 py-3.5 bg-white rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckIcon className="w-4 h-4" />
              <span className="text-white font-bold">{PEPTIDE_COUNT}</span>
              <span className="text-gray-300">peptides</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckIcon className="w-4 h-4" />
              <span className="text-white font-bold">{TOTAL_PRODUCTS.toLocaleString()}+</span>
              <span className="text-gray-300">products tracked</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckIcon className="w-4 h-4" />
              <span className="text-white">Updated daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-start gap-2 text-xs text-amber-800">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p>All peptides are for in-vitro research use only. We&apos;re a price comparison service. Prices checked daily.</p>
        </div>
      </div>

      {/* ── LISTING ── */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-16">
        {/* Category tabs */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex gap-2 min-w-max">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                  }`}
                >
                  {tab.label === "All" ? "All Peptides" : tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Heading row: dynamic count + sort */}
        <div className="flex items-center justify-between mt-4 mb-1">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {search
                ? `${filtered.length} results`
                : activeTab === "All"
                  ? `All ${allCompounds.length} research peptides`
                  : `${filtered.length} ${activeTab.toLowerCase()} peptides`
              }
            </h2>
            <p className="text-sm text-gray-500">
              {search
                ? `Showing ${filtered.length} of ${allCompounds.length} compounds`
                : activeTab === "All"
                  ? `Pick any peptide to see a live side-by-side price comparison.`
                  : `Browse all ${CATEGORY_LABELS[categoryTabs.find(t => t.label === activeTab)?.slugs?.[0] || ""] || activeTab.toLowerCase()} peptides.`
              }
            </p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="a-z">A to Z</option>
            <option value="suppliers">Most suppliers</option>
            <option value="price">Cheapest first</option>
          </select>
        </div>

        {/* Cards grid — 3 columns */}
        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="14" y="6" width="20" height="36" rx="4" fill="currentColor" opacity="0.3" />
                <rect x="16" y="10" width="16" height="28" rx="3" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-1">No peptides found</h3>
            <p className="text-sm text-gray-400">Try a different search or category.</p>
            <button onClick={() => { setSearch(""); setActiveTab("All"); }} className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-4">
            {sorted.map((c) => (
              <CompoundCard key={c.id} compound={c} />
            ))}
          </div>
        )}
      </div>

      {/* ── WHY VIRALPEPS ── */}
      <section className="bg-blue-50 border-t border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-5">
              <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              WHY VIRALPEPS
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              ViralPeps is the UK&apos;s most comprehensive peptide price comparison platform, tracking{" "}
              <strong className="text-gray-900">{PEPTIDE_COUNT} research peptides</strong> across{" "}
              <strong className="text-gray-900">{SUPPLIER_COUNT} verified UK suppliers</strong>.
              Whether you&apos;re researching <strong>BPC-157</strong>, <strong>TB-500</strong>,{" "}
              <strong>Semaglutide</strong>, <strong>Tirzepatide</strong>, <strong>Retatrutide</strong>,{" "}
              <strong>CJC-1295</strong>, <strong>MOTS-c</strong>, or <strong>IGF-1 LR3</strong> —
              we surface every available price from every supplier, all in one place.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Finding the cheapest peptide prices in the UK shouldn&apos;t mean visiting a dozen supplier
              websites. ViralPeps lets you compare <strong>prices, dosages, and shipping options</strong>{" "}
              for every peptide side-by-side — from <strong>GHK-Cu</strong> and <strong>BPC-157 (Oral)</strong>{" "}
              to <strong>Semax</strong>, <strong>Selank</strong>, <strong>Epitalon</strong>, and{" "}
              <strong>Thymosin Alpha-1</strong>. Our data is checked daily so you&apos;re always
              seeing accurate, up-to-date pricing. Just search, compare, and save.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Every supplier on ViralPeps is a verified UK-based peptide vendor with independently
              tested products. We&apos;re completely independent — there are no sponsored rankings,
              no biased placements, and no hidden fees. Whether you need <strong>AOD-9604</strong>,{" "}
              <strong>NAD+</strong>, <strong>SS-31</strong>, <strong>PT-141</strong>,{" "}
              <strong>Mazdutide</strong>, or <strong>5-Amino-1MQ</strong>, our mission is simple:
              help you make informed decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
