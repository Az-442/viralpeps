"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { PEPTIDE_COUNT, SUPPLIER_COUNT, TOTAL_PRODUCTS } from "@/data/stats";

// ── Category → human label map ──
const badgeLabels: Record<string, string> = {
  "glp-1-agonists": "GLP-1 Agonists",
  "growth-factors": "Growth Factors",
  "melanotans": "Melanotans",
  "ghrp": "GHRP",
  "aod-fragments": "AOD / Fragments",
  "thymosin-bpc": "Thymosin / BPC",
  "tb-500": "TB-500",
  "cognitive": "Cognitive",
  "peptide-fragments": "Peptide Fragments",
  "research-compounds": "Research Compounds",
  "peptide-blends": "Peptide Blends",
  "lab-supplies": "Lab Supplies",
  "supplies": "Supplies",
  "cosmetic-peptides": "Cosmetic Peptides",
  "growth-hormone-secretagogues": "GH Secretagogues",
  "research-solutions": "Research Solutions",
  "nasal-sprays": "Nasal Sprays",
  "other": "Other",
};

// ── Helpers per compound ──
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
function dosageSummary(sources: { options?: { size: string; price: string }[] }[]): string {
  const sizes = new Set<string>();
  let hasVarious = false;
  for (const s of sources) {
    if (s.options && s.options.length > 0) {
      for (const o of s.options) {
        sizes.add(o.size.trim());
      }
    } else {
      hasVarious = true;
    }
  }
  if (sizes.size > 2) return "Various doses";
  if (sizes.size === 1) return [...sizes][0];
  if (sizes.size === 2) return [...sizes].join(" & ");
  return hasVarious ? "Various doses" : "Various doses";
}
function categoryLabel(cat: string): string {
  return badgeLabels[cat] || cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// ── SVG Icons ──
function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}
function PeopleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function LightningIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
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

// ── Letter avatar ──
function LetterAvatar({ name, className = "" }: { name: string; className?: string }) {
  const letter = name.trim().charAt(0).toUpperCase();
  const colors = [
    "bg-orange-500", "bg-blue-500", "bg-emerald-500", "bg-purple-500",
    "bg-rose-500", "bg-cyan-500", "bg-amber-500", "bg-teal-500",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${colors[idx]} ${className}`}>
      {letter}
    </div>
  );
}

// ── Single compound card ──
function CompoundCard({ compound }: { compound: any }) {
  const minP = calcMinPrice(compound.sources);
  const maxP = calcMaxPrice(compound.sources);
  const savePct = calcSavePercent(minP, maxP);
  const dosages = dosageSummary(compound.sources);
  const benefits = (compound.researchAreas || []).slice(0, 3);
  const hasMore = (compound.researchAreas || []).length > 3;
  const supplierCount = compound.sources.length;
  const category = categoryLabel(compound.category);
  const slug = compound.slug;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* TOP SECTION */}
      <div className="p-4 md:p-5 pb-3">
        {/* Badge + Save badge row */}
        <div className="flex items-center gap-2 mb-2">
          <LetterAvatar name={compound.name} />
          {savePct > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
              <LightningIcon />
              Save {savePct}%
            </span>
          )}
        </div>

        {/* Name + Category */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-lg md:text-xl font-bold text-slate-900">{compound.name}</h3>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
            {category}
          </span>
        </div>

        {/* Alias / subtitle */}
        {compound.aliases && compound.aliases.length > 0 && (
          <p className="text-sm text-slate-500 mb-2">{compound.aliases[0]}</p>
        )}

        {/* Benefits as checkmark pills */}
        {benefits.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {benefits.map((b: string) => (
              <span key={b} className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                <CheckIcon className="w-3 h-3 text-emerald-500" />
                {b}
              </span>
            ))}
            {hasMore && (
              <span className="text-xs text-blue-600 font-medium hover:underline cursor-default">+{compound.researchAreas.length - 3} more</span>
            )}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-end justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block leading-tight">From</span>
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 leading-none">£{minP.toFixed(2)}</span>
            {maxP > minP && (
              <span className="ml-2 text-sm text-slate-400 line-through align-baseline">£{maxP.toFixed(2)} max</span>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <PeopleIcon />
              <span className="font-semibold">{supplierCount}</span>
              <span className="text-slate-400">supplier{supplierCount !== 1 ? "s" : ""}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{dosages}</p>
          </div>
        </div>
      </div>

      {/* CTA BUTTON */}
      <Link
        href={`/compounds/${slug}`}
        className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
      >
        Compare prices
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

// ── Main page ──
export default function CompoundsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"a-z" | "suppliers" | "price">("a-z");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const all = compounds.filter((c) => !(c as any)?.compareSlug);
    if (!q) return all;
    return all.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.aliases || []).some((a: string) => a.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [search]);

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
    <div className="min-h-screen bg-slate-50">
      <HeaderNav />

      {/* ── HERO BANNER ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 pb-10">
        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-14 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            COMPARE PEPTIDE PRICES
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Every UK peptide price,{" "}
            <span className="text-cyan-400">sorted cheapest first.</span>
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
                className="w-full pl-5 pr-14 py-3.5 bg-white rounded-full text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-500 shadow-lg"
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

      {/* ── DISCLAIMER BAR ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-start gap-2 text-xs text-amber-800">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p>
            All peptides are for in-vitro research use only. We&apos;re a price comparison service. Prices checked daily.
          </p>
        </div>
      </div>

      {/* ── LISTING ── */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        {/* Directory heading + sort */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#6366f1">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
              </svg>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Browse Peptides</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">
              All {PEPTIDE_COUNT} research peptides
            </h2>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="a-z">A to Z</option>
            <option value="suppliers">Most suppliers</option>
            <option value="price">Cheapest first</option>
          </select>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {search
            ? `${filtered.length} compounds match "${search}"`
            : `Pick any peptide to see a live side-by-side price comparison.`
          }
        </p>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg viewBox="0 0 48 48" fill="none">
                <rect x="14" y="6" width="20" height="36" rx="4" fill="currentColor" opacity="0.3" />
                <rect x="16" y="10" width="16" height="28" rx="3" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-1">No peptides found</h3>
            <p className="text-sm text-gray-400">Try searching for a different peptide name.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {sorted.map((c) => (
              <CompoundCard key={c.id} compound={c} />
            ))}
          </div>
        )}
      </div>

      {/* ── WHY VIRALPEPS — SEO trust section ── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-5">
              <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              WHY VIRALPEPS
            </div>

            {/* Paragraph 1 — Hook + product names */}
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
              ViralPeps is the UK&apos;s most comprehensive peptide price comparison platform, tracking{" "}
              <strong className="text-slate-900">{PEPTIDE_COUNT} research peptides</strong> across{" "}
              <strong className="text-slate-900">{SUPPLIER_COUNT} verified UK suppliers</strong>.
              Whether you&apos;re researching <strong>BPC-157</strong>, <strong>TB-500</strong>,{" "}
              <strong>Semaglutide</strong>, <strong>Tirzepatide</strong>, <strong>Retatrutide</strong>,{" "}
              <strong>CJC-1295</strong>, <strong>MOTS-c</strong>, or <strong>IGF-1 LR3</strong> —
              we surface every available price from every supplier, all in one place.
            </p>

            {/* Paragraph 2 — Benefit / what you can do */}
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
              Finding the cheapest peptide prices in the UK shouldn&apos;t mean visiting a dozen supplier
              websites. ViralPeps lets you compare <strong>prices, dosages, and shipping options</strong>{" "}
              for every peptide side-by-side — from <strong>GHK-Cu</strong> and <strong>BPC-157 (Oral)</strong>{" "}
              to <strong>Semax</strong>, <strong>Selank</strong>, <strong>Epitalon</strong>, and{" "}
              <strong>Thymosin Alpha-1</strong>. Our data is checked daily so you&apos;re always
              seeing accurate, up-to-date pricing. Just search, compare, and save.
            </p>

            {/* Paragraph 3 — Trust / authority */}
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
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
