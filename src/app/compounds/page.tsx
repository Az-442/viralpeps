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

// ── Category → accent colour map ──
const categoryAccents: Record<string, { border: string; bg: string; text: string; badge: string; icon: string }> = {
  "glp-1-agonists":     { border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", icon: "#059669" },
  "thymosin-bpc":       { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", icon: "#2563eb" },
  "tb-500":             { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", icon: "#2563eb" },
  "peptide-fragments":  { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", icon: "#2563eb" },
  "growth-hormone":     { border: "border-indigo-200", bg: "bg-indigo-50", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700", icon: "#6366f1" },
  "anti-aging":         { border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-700", badge: "bg-purple-100 text-purple-700", icon: "#9333ea" },
  "immunity-peptides":  { border: "border-cyan-200", bg: "bg-cyan-50", text: "text-cyan-700", badge: "bg-cyan-100 text-cyan-700", icon: "#06b6d4" },
  "tanning-libido":     { border: "border-rose-200", bg: "bg-rose-50", text: "text-rose-700", badge: "bg-rose-100 text-rose-700", icon: "#e11d48" },
  "peptide-blends":     { border: "border-slate-200", bg: "bg-slate-50", text: "text-slate-700", badge: "bg-slate-100 text-slate-700", icon: "#64748b" },
  cognitive:            { border: "border-violet-200", bg: "bg-violet-50", text: "text-violet-700", badge: "bg-violet-100 text-violet-700", icon: "#8b5cf6" },
  "aod-fragments":      { border: "border-pink-200", bg: "bg-pink-50", text: "text-pink-700", badge: "bg-pink-100 text-pink-700", icon: "#ec4899" },
  "research-compounds": { border: "border-gray-200", bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-700", icon: "#6b7280" },
  "research-solutions": { border: "border-lime-200", bg: "bg-lime-50", text: "text-lime-700", badge: "bg-lime-100 text-lime-700", icon: "#65a30d" },
  "nasal-sprays":       { border: "border-teal-200", bg: "bg-teal-50", text: "text-teal-700", badge: "bg-teal-100 text-teal-700", icon: "#0d9488" },
  "lab-supplies":       { border: "border-yellow-200", bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700", icon: "#ca8a04" },
  supplies:             { border: "border-stone-200", bg: "bg-stone-50", text: "text-stone-700", badge: "bg-stone-100 text-stone-700", icon: "#78716c" },
  other:                { border: "border-gray-200", bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-700", icon: "#6b7280" },
  "auto-imported":      { border: "border-gray-200", bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-700", icon: "#6b7280" },
};

function getAccent(cat: string) {
  return categoryAccents[cat] || { border: "border-gray-200", bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-700", icon: "#6b7280" };
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

// ── Single compound card (reference-site style, 3-col grid) ──
function CompoundCard({ compound }: { compound: any }) {
  const minP = calcMinPrice(compound.sources);
  const maxP = calcMaxPrice(compound.sources);
  const savePct = calcSavePercent(minP, maxP);
  const slug = compound.slug;
  const sourceImg = getSourceImage(compound);
  const count = compound.sources.length;
  const dosages = (compound.commonDosages || []).slice(0, 4);
  const dosagesMore = (compound.commonDosages || []).length - 4;
  const cat = compound.category;
  const accent = getAccent(cat);

  return (
    <Link
      href={`/compounds/${slug}`}
      className={`bg-white border ${accent.border} rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col`}
    >
      {/* Image area */}
      <div className={`h-36 ${accent.bg} flex items-center justify-center relative overflow-hidden`}>
        {sourceImg ? (
          <img src={sourceImg} alt={compound.name} className="w-28 h-28 object-contain" />
        ) : (
          <svg className="w-16 h-16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="6" width="20" height="36" rx="4" fill={accent.icon} opacity="0.3" />
            <rect x="16" y="10" width="16" height="28" rx="3" fill={accent.icon} opacity="0.15" />
            <rect x="14" y="4" width="20" height="6" rx="3" fill={accent.icon} opacity="0.4" />
            <rect x="20" y="2" width="8" height="12" rx="2" fill={accent.icon} opacity="0.5" />
            <line x1="20" y1="22" x2="28" y2="22" stroke={accent.icon} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="26" x2="26" y2="26" stroke={accent.icon} strokeWidth="1.5" opacity="0.6" />
            <line x1="20" y1="30" x2="24" y2="30" stroke={accent.icon} strokeWidth="1.5" opacity="0.6" />
          </svg>
        )}
        {/* Save badge */}
        {savePct > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            -{savePct}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
          {compound.name}
        </h3>

        {/* Supplier count */}
        <div className="flex items-baseline gap-0.5 mt-1">
          <span className="text-lg font-bold text-emerald-600">{count}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">SUPPLIERS</span>
        </div>

        {/* Dosage pills */}
        {dosages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dosages.map((d: string) => (
              <span key={d} className={`text-[10px] ${accent.badge} px-1.5 py-0.5 rounded font-medium`}>{d}</span>
            ))}
            {dosagesMore > 0 && (
              <span className={`text-[10px] ${accent.badge} px-1.5 py-0.5 rounded font-medium`}>+{dosagesMore}</span>
            )}
          </div>
        )}

        {/* Category badge */}
        <span className={`text-[10px] ${accent.badge} px-1.5 py-0.5 rounded font-medium mt-2 self-start`}>
          {CATEGORY_LABELS[cat] || cat}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">FROM</span>
            <div className="text-lg md:text-xl font-extrabold text-emerald-600">£{minP.toFixed(2)}</div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${accent.bg} ${accent.text} hover:opacity-80 transition-opacity flex items-center gap-1`}>
            Compare <ArrowRightIcon />
          </div>
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
