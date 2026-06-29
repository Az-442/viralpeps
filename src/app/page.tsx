"use client";

import Link from "next/link";
import { useRef } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";
import { PEPTIDE_COUNT as peptideCount, SUPPLIER_COUNT as vendorCount } from "@/data/stats";
import { HOMEPAGE_CATEGORY_GROUPS } from "@/data/categories";
import { getVendorStats } from "@/data/vendor-stats";

// --- Data helpers ---
const totalCompounds = peptideCount;
const totalVendors = vendorCount;

// Top 4 vendors by product count (computed dynamically)
const allVendorStats = Object.fromEntries(
  vendors.map((v) => [v.name, getVendorStats(v.name)])
);
const vendorCompoundCounts: Record<string, number> = Object.fromEntries(
  Object.entries(allVendorStats).map(([name, s]) => [name, s.compoundCount])
);

const topVendors = [...vendors]
 .sort((a, b) => (vendorCompoundCounts[b.name] || 0) - (vendorCompoundCounts[a.name] || 0))
 .slice(0, 4);

// Min and max prices per vendor (computed dynamically)
const vendorPrices: Record<string, { min: number; max: number }> = {};
for (const c of compounds) {
 for (const s of c.sources) {
 const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
 if (!isNaN(price)) {
 if (!vendorPrices[s.vendor]) vendorPrices[s.vendor] = { min: Infinity, max: 0 };
 if (price < vendorPrices[s.vendor].min) vendorPrices[s.vendor].min = price;
 if (price > vendorPrices[s.vendor].max) vendorPrices[s.vendor].max = price;
 }
 }
}

const trending = [...compounds]
 .sort((a, b) => b.sources.length - a.sources.length)
 .slice(0, 12);

// Most compared = compounds with most suppliers
const mostCompared = [...compounds]
 .filter((c) => !(c as any)?.compareSlug)
 .sort((a, b) => b.sources.length - a.sources.length)
 .slice(0, 12);

const topDeals = [...compounds]
 .map((c) => {
 const prices = c.sources
 .map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")))
 .filter((p): p is number => !isNaN(p));
 if (prices.length < 2) return null;
 const min = Math.min(...prices);
 const max = Math.max(...prices);
 const cheapest = c.sources.find((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) === min);
 const otherImage = (c.sources.find((s) => s !== cheapest && (s as any).image) as any)?.image;
 return {
 ...c,
 minPrice: min,
 maxPrice: max,
 savingsPct: Math.round(((max - min) / max) * 100),
 savingsAmount: (max - min).toFixed(2),
 cheapestVendor: cheapest,
 fallbackImage: otherImage,
 };
 })
 .filter((d): d is NonNullable<typeof d> => d !== null)
 .sort((a, b) => b.savingsPct - a.savingsPct)
 .slice(0, 8);

const trendingVendorItems = [...compounds]
 .flatMap((c) =>
 c.sources.map((s) => ({
 compound: c,
 vendor: s,
 vendorData: vendors.find((v) => v.name === s.vendor),
 }))
 )
 .filter((item) => item.vendorData?.verified)
 .slice(0, 10)
 .map((item, i) => ({ ...item, rank: i + 1 }));

// Extract a clean dosage label from commonDosages
function dosageLabel(dosages: string[]): string {
 if (!dosages || dosages.length === 0) return "";
 const first = dosages[0];
 // Extract number + unit (e.g. "2.5 mg/week" -> "2.5mg", "200-400 mcg/day" -> "200mcg")
 const match = first.match(/([\d.,]+)\s*(mg|mcg|g|ml)/i);
 if (match) return match[1] + match[2].toLowerCase();
 return "";
}

// Get a supplier image for a compound (prefer cheapest source, fallback to any source, then generic)
function getSourceImage(c: any): string | null {
  const sources = c.sources || [];
  // Find any source with an image
  const withImage = sources.find((s: any) => (s as any).image);
  return (withImage as any)?.image || null;
}

// Category groups loaded from central definitions
const categoryGroups = HOMEPAGE_CATEGORY_GROUPS;

function PeptideVialIcon({ className = "w-12 h-12" }: { className?: string }) {
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

function ScrollSection({ children }: { children: React.ReactNode }) {
 const scrollRef = useRef<HTMLDivElement>(null);
 const scroll = (dir: "left" | "right") => {
 if (!scrollRef.current) return;
 scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
 };
 return (
 <div className="relative group">
 <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50" aria-label="Scroll left">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
 </button>
 <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
 {children}
 </div>
 <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-black rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50" aria-label="Scroll right">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
 </button>
 </div>
 );
}

// Shared compound card matching Peptide Supermarket style with supplier images, dosage pills, supplier count, FROM price
function CompoundCard({ c, href }: { c: any; href: string }) {
  const minPrice = Math.min(...c.sources.map((s: any) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0));
  const dosages = (c.commonDosages || []).slice(0, 5);
  const dosagesMore = (c.commonDosages || []).length - 5;
  const sourceImg = getSourceImage(c);
  const count = c.sources.length;

  return (
    <Link key={c.id} href={href} className="flex-shrink-0 w-72 bg-white border border-black rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all snap-start group">
      <div className="h-32 bg-blue-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors relative overflow-hidden">
        <img
          src={sourceImg || `/images/compounds/${c.slug}.png`}
          alt={c.name}
          className="w-28 h-28 object-contain"
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.dataset.fallback) {
              t.dataset.fallback = "1";
              t.src = `/images/compounds/${c.slug}.png`;
            } else if (t.dataset.fallback === "1") {
              t.dataset.fallback = "2";
              t.src = `/images/compounds/${c.slug}.svg`;
            }
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
        <div className="mt-1 flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-emerald-600">{count}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">SUPPLIERS</span>
        </div>
        {dosages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dosages.map((d: string) => (
              <span key={d} className="text-[10px] bg-blue-50 text-slate-600 px-1.5 py-0.5 rounded font-medium">{d}</span>
            ))}
            {dosagesMore > 0 && (
              <span className="text-[10px] bg-blue-50 text-slate-600 px-1.5 py-0.5 rounded font-medium">+{dosagesMore}</span>
            )}
          </div>
        )}
        <div className="mt-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">FROM</span>
          <div className="text-lg md:text-xl font-extrabold text-emerald-600">&pound;{minPrice.toFixed(2)}</div>
        </div>
        <div className="mt-2 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg text-center transition-colors">
          {c.cheapestVendor ? "View" : "Compare"} &rarr;
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
 return (
 <div className="min-h-screen bg-white">
 <HeaderNav />

 {/* 1. HERO */}
 <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16">
 <div className="max-w-4xl mx-auto px-4 text-center">
 <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-5">
 <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e"><circle cx="12" cy="12" r="10" /></svg>
 <span className="text-[11px] font-bold text-white uppercase tracking-wider">LIVE UK PRICE COMPARISON</span>
 </div>
 <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
 Search, compare, save.<br />
 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Find your next peptide deal today.</span>
 </h1>
 <p className="text-gray-300 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
 Compare live prices on <strong className="text-white">{totalCompounds}+ peptides</strong> from{" "}
 <strong className="text-white">{totalVendors}+ trusted UK suppliers</strong>{" "}
 &mdash; updated daily, completely independent, always free.
 </p>
 <div className="max-w-xl mx-auto"><SearchBar /></div>
 <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
 <span className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">Popular:</span>
 {compounds.slice(0, 4).map((c) => (
 <Link key={c.id} href={`/compounds/${c.slug}`} className="text-xs px-3 py-1.5 bg-white/8 rounded-full text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">{c.name}</Link>
 ))}
 </div>
 </div>
 </section>

 {/* 2. TRUST STRIP */}
 <section className="bg-white py-5">
 <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-8">
 <div className="flex items-center gap-2">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
 <span className="text-sm text-black">Independent &amp; unbiased</span>
 </div>
 <div className="flex items-center gap-2">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
 <span className="text-sm text-black">Prices updated daily</span>
 </div>
 <div className="flex items-center gap-2">
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /><circle cx="12" cy="12" r="5" /></svg>
 <span className="text-sm text-black">No hidden fees</span>
 </div>
 </div>
 </section>

 {/* 3. TRENDING RIGHT NOW — reference site card format */}
 <section className="py-10 max-w-7xl mx-auto px-4 bg-blue-50">
   <div className="mb-5">
     <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="#ea580c"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
       <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending Right Now</span>
     </div>
     <div className="flex items-center justify-between">
       <h2 className="text-lg font-bold text-gray-900">Trending right now</h2>
       <Link href="/compounds" className="text-sm text-blue-600 font-medium hover:underline">Browse all &rarr;</Link>
     </div>
   </div>
   <ScrollSection>
     {trending.slice(0, 6).map((c) => (
       <CompoundCard key={c.id} c={c} href={`/compounds/${c.slug}`} />
     ))}
   </ScrollSection>
 </section>

 {/* 4. TOP SUPPLIERS */}
 <section className="py-10 max-w-7xl mx-auto px-4 bg-indigo-50">
 <div className="mb-5">
 <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
 <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
 <span className="text-[10px] font-bold text-white uppercase tracking-wider">LIVE COMPARISON</span>
 </div>
 <div className="flex items-center justify-between">
 <h2 className="text-lg font-bold text-gray-900">Top Suppliers</h2>
 <Link href="/vendors" className="text-sm text-blue-600 font-medium hover:underline">Compare all &rarr;</Link>
 </div>
 </div>
 <ScrollSection>
   {topVendors.map((v) => {
     const count = vendorCompoundCounts[v.name] || 0;
     const prices = vendorPrices[v.name];
     return (
       <Link key={v.id} href={`/vendors/${v.slug}`} className="flex-shrink-0 w-64 bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group snap-start">
         <div className="flex items-center gap-3 mb-3">
           <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border border-slate-200">
             <img src={`/images/vendors/${v.slug}.png`} alt={v.name} className="w-9 h-9 object-contain" />
           </div>
           <div className="min-w-0 flex-1">
             <h3 className="font-semibold text-gray-900 text-sm truncate">{v.name}</h3>
             <div className="flex flex-wrap items-center gap-1 mt-1">
               {v.verified && (
                 <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                   <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                   Verified
                 </span>
               )}
               <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded-full">Free UK delivery</span>
             </div>
           </div>
         </div>
         <div className="flex items-center justify-between pt-3 border-t border-slate-100">
           <div>
             <span className="text-[10px] text-slate-400 uppercase font-medium">{v === topVendors[0] ? "BEST PRICE" : v === topVendors[topVendors.length - 1] ? "HIGHEST" : "FROM"}</span>
             <div className="text-xl font-extrabold text-emerald-600">{prices ? `£${prices.min.toFixed(2)}` : ""}</div>
             <div className="text-[10px] text-slate-400">{count} products</div>
           </div>
           <span className="text-sm text-blue-600 font-medium group-hover:underline">View &rarr;</span>
         </div>
       </Link>
     );
   })}
   {/* Browse all button */}
   <Link href="/vendors" className="flex-shrink-0 w-52 bg-indigo-50 border border-black rounded-xl p-5 hover:bg-indigo-100 transition-all snap-start flex items-center justify-center">
     <span className="text-sm font-semibold text-blue-600">Compare all &rarr;</span>
   </Link>
 </ScrollSection>
 <p className="text-xs text-black mt-3">Prices last checked: daily</p>
 </section>

 {/* 5. HOW IT WORKS — Bigger, more prominent */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 text-center bg-white">
 <div className="max-w-4xl mx-auto">
 <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-5">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
 <span className="text-xs font-bold text-white uppercase tracking-wider">THE UK&apos;S DEDICATED PEPTIDE PRICE COMPARISON TOOL</span>
 </div>
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
 Compare peptide prices across every trusted UK supplier &mdash; in seconds.
 </h2>
 <p className="text-base md:text-lg text-black leading-relaxed max-w-3xl mx-auto">
 ViralPeps is the UK&apos;s only dedicated peptide price comparison platform. We track live prices from{" "}
 <strong>{totalVendors} trusted UK peptide suppliers</strong> &mdash; so you can find the best deal on{" "}
 <Link href="/compounds/bpc-157" className="text-blue-600 hover:underline font-medium">BPC-157</Link>,{" "}
 <Link href="/compounds/tb-500" className="text-blue-600 hover:underline font-medium">TB-500</Link>,{" "}
 <Link href="/compounds/retatrutide" className="text-blue-600 hover:underline font-medium">Retatrutide</Link>
 , and hundreds more in seconds. Whether you&apos;re looking to{" "}
 <Link href="/compounds" className="text-blue-600 hover:underline font-medium">compare peptide prices</Link>{" "}
 for research or simply want to find the latest deals across suppliers, we&apos;ve got you covered.
 </p>
 </div>
 <div className="flex items-center justify-center gap-10 mt-10 pt-8 flex-wrap">
 <div className="flex items-center gap-3">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
 <span className="text-base md:text-lg text-black font-semibold">{totalCompounds}+ peptides tracked</span>
 </div>
 <div className="flex items-center gap-3">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
 <span className="text-base md:text-lg text-black font-semibold">{totalVendors}+ UK suppliers</span>
 </div>
 <div className="flex items-center gap-3">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
 <span className="text-base md:text-lg text-black font-semibold">Prices updated daily</span>
 </div>
 </div>
</section>

 {/* 6. TOP DEALS TODAY */}
 <section className="py-10 max-w-7xl mx-auto px-4 bg-blue-50">
   <div className="mb-5">
     <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" /></svg>
       <span className="text-[10px] font-bold text-white uppercase tracking-wider">Top Deals Today</span>
     </div>
     <h2 className="text-lg font-bold text-gray-900">Top deals of the day</h2>
     <p className="text-sm text-black">The biggest savings when you pick the cheapest supplier vs. the most expensive.</p>
   </div>
   <ScrollSection>
     {topDeals.map((deal) => (
       <Link key={deal.id + "-deal"} href={`/compounds/${deal.slug}`} className="flex-shrink-0 w-72 bg-white border border-black rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all snap-start">
         <div className="h-28 bg-blue-50 flex items-center justify-center relative">
           <img
             src={(deal.cheapestVendor as any)?.image || deal.fallbackImage || `/images/compounds/${deal.slug}.png`}
             alt={deal.name}
             className="w-20 h-20 object-contain"
             onError={(e) => {
               const t = e.currentTarget;
               if (!t.dataset.fallback) {
                 t.dataset.fallback = "1";
                 t.src = `/images/compounds/${deal.slug}.png`;
               } else if (t.dataset.fallback === "1") {
                 t.dataset.fallback = "2";
                 t.src = `/images/compounds/${deal.slug}.svg`;
               }
             }}
           />
           <div className="absolute top-2 left-2 bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
             -{deal.savingsPct}%
           </div>
         </div>
         <div className="p-4">
           <h3 className="font-semibold text-gray-900 text-sm">{deal.name}{dosageLabel(deal.commonDosages) ? ` ${dosageLabel(deal.commonDosages)}` : ""}</h3>
           <p className="text-xs text-slate-500 mt-0.5">at {deal.cheapestVendor?.vendor || "Various"}</p>
           <div className="mt-2 flex items-baseline gap-2">
             <span className="text-lg text-slate-400 line-through">&pound;{deal.maxPrice.toFixed(2)}</span>
             <span className="text-xl md:text-2xl font-extrabold text-emerald-600">&pound;{deal.minPrice.toFixed(2)}</span>
           </div>
           <div className="text-xs font-bold text-emerald-600 mt-0.5">SAVE &pound;{deal.savingsAmount}</div>
           <div className="mt-3 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg text-center transition-colors">
             View &rarr;
           </div>
         </div>
       </Link>
     ))}
   </ScrollSection>
 </section>

 {/* 7. TRENDING THIS MONTH — reference site card format */}
 <section className="py-10 max-w-7xl mx-auto px-4 bg-indigo-50">
   <div className="mb-5">
     <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="#a855f7"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
       <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending This Month</span>
     </div>
     <h2 className="text-lg font-bold text-gray-900">Researchers are clicking on these</h2>
     <p className="text-sm text-black">The specific peptide + supplier combos getting the most attention right now.</p>
   </div>
   <ScrollSection>
     {trendingVendorItems.map((item) => (
       <CompoundCard key={`tw-${item.compound.id}-${item.vendor.vendor}`} c={item.compound} href={`/compounds/${item.compound.slug}`} />
     ))}
   </ScrollSection>
 </section>

 {/* 8+. CATEGORY SECTIONS — all use reference site card format */}
 {categoryGroups.map((group) => {
 const groupCompounds = compounds.filter((c) => !(c as any)?.compareSlug && group.slugs.includes(c.category));
 if (groupCompounds.length === 0) return null;
 return (
 <section key={group.badge} className="py-10 max-w-7xl mx-auto px-4 bg-white">
   <div className="mb-5">
     <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6"><path d="M7 10l5 5 5-5H7z" /></svg>
       <span className="text-[10px] font-bold text-white uppercase tracking-wider">{group.badge}</span>
     </div>
     <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
     <p className="text-sm text-black">{group.desc}</p>
   </div>
   <ScrollSection>
     {groupCompounds.map((c) => (
       <CompoundCard key={c.id} c={c} href={`/compounds/${c.slug}`} />
     ))}
   </ScrollSection>
   </section>
   );
   })}

   {/* MOST COMPARED THIS WEEK */}
   <section className="py-10 max-w-7xl mx-auto px-4 bg-blue-50">
   <div className="mb-5">
     <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="#8b5cf6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
       <span className="text-[10px] font-bold text-white uppercase tracking-wider">Most Compared This Week</span>
     </div>
     <div className="flex items-center justify-between">
       <h2 className="text-lg font-bold text-gray-900">Most compared this week</h2>
       <Link href="/compounds" className="text-sm text-blue-600 font-medium hover:underline">Browse all &rarr;</Link>
     </div>
   </div>
   <ScrollSection>
     {mostCompared.map((c) => (
       <CompoundCard key={`mc-${c.id}`} c={c} href={`/compounds/${c.slug}`} />
     ))}
   </ScrollSection>
 </section>

{/* HOW IT WORKS — Step-based, like reference site */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 bg-indigo-50">
  <div className="max-w-4xl mx-auto">
    <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-6">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      <span className="text-xs font-bold text-white uppercase tracking-wider">How It Works</span>
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">How It Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* Step 1: Search */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-5 mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">1</div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Search</h3>
        <p className="text-sm text-gray-500 leading-relaxed">Choose your peptide from our comprehensive database</p>
      </div>

      {/* Step 2: Compare */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-5 mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">2</div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Compare</h3>
        <p className="text-sm text-gray-500 leading-relaxed">See prices from all UK suppliers side by side</p>
      </div>

      {/* Step 3: Save */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-5 mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /><circle cx="12" cy="12" r="5" /></svg>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">3</div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Save</h3>
        <p className="text-sm text-gray-500 leading-relaxed">Click through and grab the best deal available</p>
      </div>
    </div>
  </div>
</section>

{/* WHO WE ARE — Scaled up to match How it Works */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 bg-white text-center">
 <div className="max-w-4xl mx-auto">
 <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-5">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
 <span className="text-xs font-bold text-white uppercase tracking-wider">Who We Are</span>
 </div>
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">The UK&apos;s independent peptide price comparison platform</h2>
 <p className="text-base md:text-lg text-black leading-relaxed max-w-3xl mx-auto">
 ViralPeps is an independent UK peptide price comparison platform. We help researchers find the best deals from trusted suppliers.
 We don&apos;t sell or supply any products &mdash; we simply compare prices so you can make informed decisions.
 We may earn a commission from qualifying purchases, but this never affects our rankings or pricing data.
 </p>
 </div>
</section>

{/* GUIDES — Like reference site */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 bg-blue-50">
  <div className="max-w-4xl mx-auto text-center mb-10">
    <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-4">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      <span className="text-xs font-bold text-white uppercase tracking-wider">Guides</span>
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Peptide Buying Guides</h2>
    <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to know about buying, comparing, and sourcing research peptides in the UK.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <Link href="/research" className="bg-white rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow border border-gray-200">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 text-sm leading-snug">Buy Peptides UK &mdash; Compare Prices &amp; Find the Best Supplier</h3>
        <p className="text-xs text-gray-500 mt-1">How to buy research peptides safely from verified UK vendors.</p>
      </div>
    </Link>

    <Link href="/research" className="bg-white rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow border border-gray-200">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 text-sm leading-snug">Cheap Peptides UK &mdash; Compare &amp; Find the Lowest Prices</h3>
        <p className="text-xs text-gray-500 mt-1">Find the lowest prices without compromising on quality.</p>
      </div>
    </Link>

    <Link href="/research" className="bg-white rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow border border-gray-200">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 text-sm leading-snug">GLOW Peptide UK &mdash; Compare Prices &amp; Find the Best Deals</h3>
        <p className="text-xs text-gray-500 mt-1">Compare GLOW Blend prices for skin rejuvenation research.</p>
      </div>
    </Link>
  </div>
</section>

{/* LATEST RESEARCH */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 bg-indigo-50">
  <div className="mb-8">
    <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      <span className="text-xs font-bold text-white uppercase tracking-wider">Latest Research</span>
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Research</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <Link href="/research" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <img src="/images/compounds/bpc-157.svg" alt="BPC-157 research" className="w-16 h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">How BPC-157 Supports Tissue Repair Research</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">BPC-157 is one of the most studied peptides for tissue repair. Learn about its mechanism, protocols, and what researchers are discovering.</p>
        <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
          <span>5 min read</span>
          <span>•</span>
          <span>Guides</span>
        </div>
      </div>
    </Link>

    <Link href="/research" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-[16/10] bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <img src="/images/compounds/semaglutide.svg" alt="Semaglutide research" className="w-16 h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">Semaglutide vs Tirzepatide — Comparing GLP-1 Research</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">A side-by-side comparison of the two most popular GLP-1 receptor agonists in research, including mechanism, dosing, and study outcomes.</p>
        <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
          <span>8 min read</span>
          <span>•</span>
          <span>Guides</span>
        </div>
      </div>
    </Link>

    <Link href="/research" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-[16/10] bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <img src="/images/compounds/ghk-cu.svg" alt="GHK-Cu research" className="w-16 h-16 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">A Complete Guide to Anti-Aging Research Peptides</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">GHK-Cu, Epitalon, NAD+, and other peptides being studied for cellular health, longevity, and age-related research applications.</p>
        <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
          <span>10 min read</span>
          <span>•</span>
          <span>Guides</span>
        </div>
      </div>
    </Link>
  </div>

  <div className="text-center mt-8">
    <Link href="/research" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
      View all guides &rarr;
    </Link>
  </div>
</section>

{/* FAQ SECTION */}
<section className="py-16 md:py-20 max-w-7xl mx-auto px-4 bg-white">
  <div className="max-w-3xl mx-auto">
    <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-4">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      <span className="text-xs font-bold text-white uppercase tracking-wider">FAQ</span>
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

    <div className="space-y-3">
      <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <span className="text-sm font-semibold text-gray-900 pr-4">What is ViralPeps?</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </summary>
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">ViralPeps is a UK-based price comparison platform for research peptides. We track live prices from verified UK suppliers so researchers can compare deals side by side. We do not sell peptides &mdash; we simply compare prices.</p>
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <span className="text-sm font-semibold text-gray-900 pr-4">Where can I buy peptides in the UK?</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </summary>
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">You can buy research peptides from any of the verified UK suppliers listed on ViralPeps. We currently track prices from 10+ trusted UK vendors including UK Peptides, Pure Peptides UK, Sterling Peptides, and more. Browse our <Link href="/vendors" className="text-blue-600 hover:underline">supplier directory</Link> to compare them.</p>
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <span className="text-sm font-semibold text-gray-900 pr-4">What are the cheapest peptides in the UK?</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </summary>
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">Prices vary by supplier and compound. Generally, GHK-Cu, BPC-157, TB-500, and NAD+ tend to have competitive pricing across multiple UK vendors. Use our <Link href="/compounds" className="text-blue-600 hover:underline">comparison tool</Link> to find the current best prices on any peptide.</p>
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <span className="text-sm font-semibold text-gray-900 pr-4">Are peptides legal in the UK?</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </summary>
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">Research peptides are legal to buy and sell in the UK for in-vitro research purposes. They are not approved for human consumption. All products sold by our listed suppliers are clearly labelled for laboratory research use only.</p>
        </div>
      </details>

      <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
          <span className="text-sm font-semibold text-gray-900 pr-4">What are pure peptides?</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </summary>
        <div className="px-5 pb-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mt-3">Pure peptides refer to research-grade compounds that are ≥98% pure, verified by third-party HPLC testing. Most suppliers on ViralPeps provide certificates of analysis (COAs) with their products. Look for the lab tested badge when comparing suppliers.</p>
        </div>
      </details>
    </div>

    <div className="text-center mt-8">
      <Link href="/faq" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
        View all FAQs &rarr;
      </Link>
    </div>
  </div>
</section>

{/* NEWSLETTER */}
 <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-14">
 <div className="max-w-xl mx-auto px-4 text-center">
 <h2 className="text-2xl font-bold text-white mb-2">Get Peptide Price-drop Alerts</h2>
 <p className="text-blue-100 text-sm mb-6">Be the first to know about new compounds, price drops, and supplier updates.</p>
 <form className="flex gap-2 max-w-sm mx-auto">
 <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-900 outline-none placeholder-gray-400" />
 <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">Subscribe</button>
 </form>
 <p className="text-blue-200 text-[10px] mt-3">No spam. Unsubscribe anytime.</p>
 </div>
 </section>

 <Footer />
 </div>
 );
}
