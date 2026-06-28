"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

// Pre-computed stats
const masterCompounds = compounds.filter((c) => !(c as any)?.compareSlug);
const allSuppliers = new Set<string>();
let totalProducts = 0;
for (const c of compounds) {
  for (const s of c.sources) {
    allSuppliers.add(s.vendor);
    totalProducts++;
  }
}
const PEPTIDE_COUNT = masterCompounds.length;
const SUPPLIER_COUNT = allSuppliers.size;
const TOTAL_PRODUCTS = totalProducts;

const badgeLabels: Record<string, string> = {
  "glp-1-agonists": "GLP-1", "growth-factors": "Growth", "melanotans": "Melano",
  "ghrp": "GHRP", "aod-fragments": "AOD", "thymosin-bpc": "Repair",
  "tb-500": "Regen", "cognitive": "Cognitive", "peptide-fragments": "Repair", "other": "Other",
};

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function PeptideVialIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="6" width="20" height="36" rx="4" fill="#e2e8f0" />
      <rect x="16" y="10" width="16" height="28" rx="3" fill="#f8fafc" />
      <rect x="14" y="4" width="20" height="6" rx="3" fill="#cbd5e1" />
      <rect x="20" y="2" width="8" height="12" rx="2" fill="#94a3b8" />
      <line x1="20" y1="22" x2="28" y2="22" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="20" y1="26" x2="26" y2="26" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="20" y1="30" x2="24" y2="30" stroke="#3b82f6" strokeWidth="1.5" />
    </svg>
  );
}

function MagnifyingGlassIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function CompoundsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"a-z" | "suppliers" | "price">("a-z");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return compounds;
    return compounds.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.aliases || []).some((a) => a.toLowerCase().includes(q)) ||
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
        const aMin = Math.min(...a.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity));
        const bMin = Math.min(...b.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity));
        return aMin - bMin;
      });
    }
    return list;
  }, [filtered, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      {/* EXPANDED HERO BANNER — Peptide Supermarket style */ }
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 pb-10">
        <div className="max-w-5xl mx-auto px-4 pt-10 md:pt-14 pb-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            COMPARE PEPTIDE PRICES
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Every UK peptide price,{" "}
            <span className="text-cyan-400">sorted cheapest first.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
            Track <strong className="text-white">{PEPTIDE_COUNT} research peptides</strong> across{" "}
            <strong className="text-white">{SUPPLIER_COUNT} UK suppliers</strong>.{" "}
            Save up to <strong className="text-white">98%</strong> by picking the right supplier.
          </p>

          {/* SEARCH BAR — inside the banner, large pill shape */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search peptides (e.g. BPC-157, Mots-C)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-5 pr-14 py-3.5 bg-white rounded-full text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <MagnifyingGlassIcon />
              </div>
            </div>
          </div>

          {/* STATS ROW */}
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

      {/* DISCLAIMER NOTE — warm yellow bar */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-start gap-2 text-xs text-amber-800">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p>
            All peptides are for in-vitro research use only. We&apos;re a price comparison service and may earn a commission.{" "}
            <Link href="/disclaimer" className="underline hover:text-amber-900 font-medium">Read our full disclosure.</Link>
          </p>
        </div>
      </div>

      {/* COMPOUNDS GRID */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* Directory heading */}
        <div className="flex items-center gap-2 mb-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6366f1">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
          </svg>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Compound Directory</span>
        </div>
        <div className="flex items-center justify-between gap-4 mb-1">
          <h2 className="text-xl font-bold text-gray-900">All {PEPTIDE_COUNT} research peptides</h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="px-2.5 py-1 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 bg-white text-gray-700"
            >
              <option value="a-z">A-Z</option>
              <option value="suppliers">📦 Popular</option>
              <option value="price">💰 Price</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {search
            ? `${filtered.length} compounds match "${search}"`
            : `Compare prices from ${SUPPLIER_COUNT} trusted UK suppliers.`
          }
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <PeptideVialIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sorted.map((c) => {
              const bLabel = badgeLabels[c.category] || c.category;
              const minPrice = Math.min(
                ...c.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
              );
              return (
                <Link
                  key={c.id}
                  href={`/compounds/${c.slug}`}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="h-28 bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <img src={`/images/compounds/${c.slug}.svg`} alt={c.name} className="w-14 h-14 object-contain" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">{bLabel}</span>
                    <h3 className="font-semibold text-gray-900 text-sm mt-2">{c.name}</h3>
                    {c.aliases.length > 0 && <p className="text-xs text-gray-500">{c.aliases[0]}</p>}
                    <div className="flex items-center gap-1 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#6366f1">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-xs text-indigo-600 font-medium">{c.sources.length} suppliers</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description.slice(0, 80)}{c.description.length > 80 ? "..." : ""}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">From</span>
                      <span className="text-xs font-bold text-gray-900">&pound;{minPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
