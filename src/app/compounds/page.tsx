"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  "peptide-blends":     { border: "border-orange-300", bg: "bg-orange-100", from: "from-orange-200", via: "via-orange-50", badge: "bg-orange-200 text-orange-800", icon: "#ea580c" },
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
      {/* Header banner: colour gradient strong colour→white + LetterAvatar */}
      <div className="flex items-center gap-3 p-3 md:p-4 relative"
        style={{
          background: `linear-gradient(to right, ${accent.icon}88, ${accent.icon}44, white)`
        }}>
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
        {alias && (
          <p className="text-xs text-gray-400 italic">aka {alias}</p>
        )}

        {/* Suppliers + cheapest price row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#059669">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {count} {count === 1 ? "supplier" : "suppliers"}
          </span>
          <span className="text-xs font-semibold text-blue-600">FROM £{minP.toFixed(2)}</span>
        </div>

        {/* Dosage pills */}
        {dosages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-1">
            {dosages.map((d: string, i: number) => (
              <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{dosageLabel([d]) || d}</span>
            ))}
            {dosagesMore > 0 && (
              <span className="text-[10px] text-gray-400 font-medium">+{dosagesMore} more</span>
            )}
          </div>
        )}

        {/* Benefit pills — green badge style matching supplier cards */}
        {benefits.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-1">
            {benefits.map((b: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                <CheckIcon className="w-2.5 h-2.5 text-green-600" />
                {b}
              </span>
            ))}
            {hasMoreBenefits && (
              <span className="text-[10px] text-gray-400 font-medium">+{(compound.researchAreas || []).length - 2} more</span>
            )}
          </div>
        )}

        {/* Compare button */}
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center justify-center gap-1 w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-full px-3 py-1.5 transition-colors">
            Compare
            <ArrowRightIcon className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Inline compound link (for Why ViralPeps section) ──
function CompoundLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <span
      onClick={(e) => { e.preventDefault(); router.push(href); }}
      className="font-semibold text-gray-900 underline underline-offset-2 decoration-gray-400 hover:decoration-gray-700 cursor-pointer transition-colors"
    >
      {children}
    </span>
  );
}

// ── Page ──
export default function CompoundsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState<"a-z" | "suppliers" | "price">("a-z");
  const router = useRouter();

  // All compounds (exclude compare-only entries)
  const allCompounds = useMemo(() => compounds.filter((c) => !(c as any)?.compareSlug), []);

  // Tab → filter slugs
  const activeSlugs = useMemo(() => {
    const tab = categoryTabs.find((t) => t.label === activeTab);
    return tab ? tab.slugs : null;
  }, [activeTab]);

  // Filtered list
  const filtered = useMemo(() => {
    let list = allCompounds;
    if (activeSlugs !== null) {
      list = list.filter((c) => activeSlugs.includes(c.category));
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.aliases || []).some((a: string) => a.toLowerCase().includes(q)) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allCompounds, activeSlugs, search]);

  // Sorted
  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "a-z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "suppliers":
        list.sort((a, b) => b.sources.length - a.sources.length);
        break;
      case "price": {
        list.sort((a, b) => calcMinPrice(a.sources) - calcMinPrice(b.sources));
        break;
      }
    }
    return list;
  }, [filtered, sort]);

  // Count per tab
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tab of categoryTabs) {
      if (tab.slugs === null) {
        counts[tab.label] = allCompounds.length;
      } else {
        counts[tab.label] = allCompounds.filter((c) => tab.slugs!.includes(c.category)).length;
      }
    }
    return counts;
  }, [allCompounds]);

  const tabsRowRef = useMemo(() => {
    // used for horizontal scroll of tabs
    return { current: null as HTMLDivElement | null };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      {/* HERO - matching reference site style */}
      <section className="relative bg-gradient-to-br from-[#0b1a2e] via-[#162d50] to-[#0f1f38] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-emerald-900/40 border border-emerald-700/30 px-2.5 py-1 rounded-full uppercase tracking-widest mb-4">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            PRICE COMPARISON
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 max-w-3xl">
            Every UK peptide price, sorted cheapest first.
          </h1>

          {/* Description */}
          <p className="text-blue-200 text-sm md:text-lg max-w-2xl leading-relaxed mb-6">
            Track <strong className="text-white">{PEPTIDE_COUNT} research peptides</strong> across{" "}
            <strong className="text-white">{SUPPLIER_COUNT} UK suppliers</strong>.
            Find the best deal in seconds.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search peptides (e.g. BPC-157, Retatrutide)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-blue-300/60 outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
            />
          </div>

          {/* Small stats row */}
          <div className="flex flex-wrap items-center gap-5 mt-5 text-xs text-blue-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <strong className="text-white">{PEPTIDE_COUNT}</strong> peptides
            </span>
            <span className="w-px h-3 bg-blue-800/50" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
              <strong className="text-white">{TOTAL_PRODUCTS.toLocaleString()}</strong> products tracked
            </span>
            <span className="w-px h-3 bg-blue-800/50" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Updated daily
            </span>
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* Sort bar (search bar is now in hero) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort:</span>
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
          <span className="text-xs text-gray-400">{sorted.length} results</span>
        </div>{/* END sort bar */}

          {/* Tabs row */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-thin" ref={(el) => { tabsRowRef.current = el; }}>
            {categoryTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(tab.label); setSearch(""); }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeTab === tab.label
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-[10px] ${activeTab === tab.label ? "text-blue-200" : "text-gray-400"}`}>
                  {tabCounts[tab.label] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mt-3 mb-1">
            <p className="text-xs text-gray-500">
              {search || activeTab !== "All"
                ? `Showing ${filtered.length} of ${allCompounds.length} compounds`
                : `${allCompounds.length} compounds`}
            </p>
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
      </section>

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
              Whether you&apos;re researching{" "}
              <CompoundLink href="/compounds/bpc-157">BPC-157</CompoundLink>,{" "}
              <CompoundLink href="/compounds/tb-500">TB-500</CompoundLink>,{" "}
              <CompoundLink href="/compounds/semaglutide">Semaglutide</CompoundLink>,{" "}
              <strong>Tirzepatide</strong>,{" "}
              <CompoundLink href="/compounds/retatrutide">Retatrutide</CompoundLink>,{" "}
              <strong>CJC-1295</strong>, <strong>MOTS-c</strong>, or <strong>IGF-1 LR3</strong> —
              we surface every available price from every supplier, all in one place.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Finding the cheapest peptide prices in the UK shouldn&apos;t mean visiting a dozen supplier
              websites. ViralPeps lets you compare <strong>prices, dosages, and shipping options</strong>{" "}
              for every peptide side-by-side — from{" "}
              <CompoundLink href="/compounds/ghk-cu">GHK-Cu</CompoundLink> and <strong>BPC-157 (Oral)</strong>{" "}
              to <CompoundLink href="/compounds/semax">Semax</CompoundLink>,{" "}
              <CompoundLink href="/compounds/selank">Selank</CompoundLink>,{" "}
              <strong>Epitalon</strong>, and{" "}
              <strong>Thymosin Alpha-1</strong>. Our data is checked daily so you&apos;re always
              seeing accurate, up-to-date pricing. Just search, compare, and save.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Every supplier on ViralPeps is a verified UK-based peptide vendor with independently
              tested products. We&apos;re completely independent — there are no sponsored rankings,
              no biased placements, and no hidden fees. Whether you need{" "}
              <CompoundLink href="/compounds/aod-9604">AOD-9604</CompoundLink>,{" "}
              <CompoundLink href="/compounds/nad-plus">NAD+</CompoundLink>,{" "}
              <strong>SS-31</strong>, <strong>PT-141</strong>,{" "}
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
