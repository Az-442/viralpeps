"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

// --- Data helpers ---

const totalCompounds = compounds.length;
const totalVendors = vendors.length;

// Vendor compound counts
const vendorCompoundCounts: Record<string, number> = {};
for (const c of compounds) {
  for (const s of c.sources) {
    vendorCompoundCounts[s.vendor] = (vendorCompoundCounts[s.vendor] || 0) + 1;
  }
}

// Top vendors (most compounds)
const topVendors = [...vendors]
  .sort((a, b) => (vendorCompoundCounts[b.name] || 0) - (vendorCompoundCounts[a.name] || 0))
  .slice(0, 4);

// Trending compounds (most sources = most popular)
const trending = [...compounds]
  .sort((a, b) => b.sources.length - a.sources.length)
  .slice(0, 12);

// Top deals: compounds with biggest price spread
const topDeals = [...compounds]
  .map((c) => {
    const prices = c.sources
      .map((s) => {
        const num = parseFloat(s.price.replace(/[£$€,]/g, ""));
        return isNaN(num) ? null : num;
      })
      .filter((p): p is number => p !== null);
    if (prices.length < 2) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const savingsPct = Math.round(((max - min) / max) * 100);
    const featuredVendor = c.sources.find((s) =>
      vendors.some((v) => v.name === s.vendor && v.verified)
    );
    return {
      ...c,
      minPrice: min,
      maxPrice: max,
      savingsPct,
      savingsAmount: (max - min).toFixed(2),
      cheapestVendor: c.sources.find(
        (s) => parseFloat(s.price.replace(/[£$€,]/g, "")) === min
      ),
    };
  })
  .filter((d): d is NonNullable<typeof d> => d !== null)
  .sort((a, b) => b.savingsPct - a.savingsPct)
  .slice(0, 10);

// Trending this month: most-clicked vendors
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

// Categories (grouped by theme like PepSupermarket)
const categoryGroups = [
  {
    badge: "WEIGHT LOSS & METABOLISM",
    title: "Compare weight loss & metabolism peptides",
    desc: "GLP-1 agonists and metabolic peptides researchers are comparing most.",
    slugs: ["glp-1-agonists", "aod-fragments"],
  },
  {
    badge: "REPAIR & RECOVERY",
    title: "Compare repair & recovery peptides",
    desc: "BPC-157, TB-500, and thymosin peptides for tissue repair research.",
    slugs: ["thymosin-bpc", "tb-500"],
  },
  {
    badge: "COGNITIVE & NOOTROPICS",
    title: "Compare cognitive peptides",
    desc: "Research peptides being studied for cognitive function and neuroprotection.",
    slugs: ["cognitive"],
  },
];

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

function ScrollSection({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group" id={id}>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        aria-label="Scroll left"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
        aria-label="Scroll right"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      {/* === HERO === */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 bg-blue-900/40 border border-blue-500/20 rounded-full px-3 py-1 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">LIVE UK PRICE COMPARISON</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Search, compare, save.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Find your next peptide deal today.
            </span>
          </h1>
          <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Compare live prices on <strong className="text-white">{totalCompounds}+ peptides</strong> from{" "}
            <strong className="text-white">{totalVendors} trusted UK suppliers</strong>{" "}
            &mdash; updated daily, completely independent, always free.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Popular:</span>
            {compounds.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                href={`/compounds/${c.slug}`}
                className="text-xs px-3 py-1.5 bg-white/8 rounded-full text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === TRUST STRIP — like PepSupermarket inline style === */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-8">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              label: "Independent & unbiased",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              label: "Prices updated daily",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              ),
              label: "No hidden fees",
            },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              {t.icon}
              <span className="text-sm text-gray-700">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === TRENDING RIGHT NOW === */}
      <section className="py-8 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ea580c">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending Right Now</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Most-searched peptides</h2>
        </div>
        <ScrollSection>
          {trending.map((c) => {
            const minPrice = Math.min(
              ...c.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
            );
            return (
              <Link
                key={c.id}
                href={`/compounds/${c.slug}`}
                className="flex-shrink-0 w-52 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all snap-start"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                from &pound;{minPrice.toFixed(2)} &bull; {c.sources.length} VENDORS
                </div>
              </Link>
            );
          })}
        </ScrollSection>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="py-10 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Compare peptide prices across every trusted UK supplier &mdash; in seconds.
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-5">
          ViralPeps lets you search, compare, and find the best deals on research peptides from verified UK suppliers.
          Independent, unbiased, and updated daily. No registration required.
        </p>
        <div className="flex flex-wrap gap-2">
          {compounds.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              href={`/compounds/${c.slug}`}
              className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors font-medium"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/compounds"
            className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Browse all {totalCompounds}+ peptides &rarr;
          </Link>
        </div>
      </section>

      {/* === TOP DEALS TODAY === */}
      <section className="py-8 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Top Deals Today</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Best savings on peptides</h2>
          <p className="text-gray-500 text-sm">The biggest savings when you compare supplier prices.</p>
        </div>
        <ScrollSection>
          {topDeals.map((deal, i) => (
            <Link
              key={deal.id + "-deal"}
              href={`/compounds/${deal.slug}`}
              className="flex-shrink-0 w-60 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all snap-start"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  -{deal.savingsPct}%
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{deal.name}</h3>
              <div className="text-xs text-gray-400 line-through mb-1">
                &pound;{deal.maxPrice.toFixed(2)}
              </div>
              <div className="text-lg font-bold text-green-600">
                &pound;{deal.minPrice.toFixed(2)}
              </div>
              <div className="text-[10px] text-green-700 font-semibold mt-1">
                SAVE &pound;{deal.savingsAmount}
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                {deal.cheapestVendor?.vendor || "Various suppliers"}
              </div>
            </Link>
          ))}
        </ScrollSection>
      </section>

      {/* === TRENDING THIS MONTH === */}
      <section className="py-8 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#a855f7">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending This Month</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Researchers are clicking on these</h2>
          <p className="text-gray-500 text-sm">The most-viewed compound + supplier combinations.</p>
        </div>
        <ScrollSection>
          {trendingVendorItems.slice(0, 10).map((item) => (
            <Link
              key={`trending-${item.compound.id}-${item.vendor.vendor}`}
              href={`/compounds/${item.compound.slug}`}
              className="flex-shrink-0 w-56 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all snap-start"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-gray-300 w-4 flex-shrink-0">{item.rank}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.compound.name}</h3>
                  <p className="text-xs text-gray-500">{item.vendor.vendor}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-semibold text-gray-900">{item.vendor.price}</span>
                    {item.vendorData?.verified && (
                      <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-1.5 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  {item.vendorData && (
                    <div className="text-[10px] text-amber-500 mt-0.5">★ {item.vendorData.rating}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </ScrollSection>
      </section>

      {/* === CATEGORY SECTIONS (like PepSupermarket Weight Loss) === */}
      {categoryGroups.map((group) => {
        const groupCompounds = compounds.filter((c) => group.slugs.includes(c.category));
        if (groupCompounds.length === 0) return null;
        return (
          <section key={group.badge} className="py-8 max-w-7xl mx-auto px-4 border-t border-gray-100">
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{group.badge}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
              <p className="text-gray-500 text-sm">{group.desc}</p>
            </div>
            <ScrollSection>
              {groupCompounds.map((c) => {
                const minPrice = Math.min(
                  ...c.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
                );
                const dosages = c.commonDosages.slice(0, 4);
                return (
                  <Link
                    key={c.id}
                    href={`/compounds/${c.slug}`}
                    className="flex-shrink-0 w-56 bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all snap-start group"
                  >
                    <div className="h-28 bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <PeptideVialIcon className="w-14 h-14" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
                      <div className="mt-1 flex items-baseline gap-0.5">
                        <span className="text-lg font-bold text-gray-900">{c.sources.length}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">SUPPLIERS</span>
                      </div>
                      {dosages.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {dosages.map((d) => (
                            <span key={d} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">FROM</span>
                        <div className="text-sm font-bold text-gray-900">&pound;{minPrice.toFixed(2)}</div>
                      </div>
                      <div className="mt-1.5 text-xs text-blue-600 font-medium flex items-center gap-1 group-hover:underline">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Compare
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ScrollSection>
          </section>
        );
      })}

      {/* === TOP SUPPLIERS === */}
      <section className="py-10 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Top Suppliers</h2>
          <Link href="/vendors" className="text-sm text-blue-600 font-medium hover:underline">Compare all &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topVendors.map((v) => {
            const count = vendorCompoundCounts[v.name] || 0;
            return (
              <Link
                key={v.id}
                href={`/vendors/${v.slug}`}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PeptideVialIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{v.name}</h3>
                    {v.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        Site Verified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{v.country} &middot; {count} products</p>
                <p className="text-xs text-blue-600 font-medium mt-1">View supplier &rarr;</p>
              </Link>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">Prices last checked: daily</p>
      </section>

      {/* === NEWSLETTER === */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-14 mt-8">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Get Peptide Price-drop Alerts</h2>
          <p className="text-blue-100 text-sm mb-6">
            Be the first to know about new compounds, price drops, and supplier updates.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-900 outline-none placeholder-gray-400"
            />
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </form>
          <p className="text-blue-200 text-[10px] mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
