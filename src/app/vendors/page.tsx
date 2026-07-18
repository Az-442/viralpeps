"use client";

import { useState } from "react";
import Link from "next/link";
import vendors from "@/data/vendors.json";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import VendorLogo from "@/components/VendorLogo";
import { PEPTIDE_COUNT } from "@/data/stats";
import { ALL_VENDOR_STATS, ALL_VISIBLE_COUNTS } from "@/data/vendor-stats";

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

// Pre-compute for sorting
const vendorProductCounts: Record<string, number> = {};
for (const v of vendors) {
  vendorProductCounts[v.name] = ALL_VISIBLE_COUNTS[v.name] || 0;
}

// Min price per vendor
const vendorMinPrices: Record<string, number> = {};
for (const c of compounds) {
  for (const s of c.sources) {
    const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
    if (!isNaN(price)) {
      vendorMinPrices[s.vendor] = Math.min(vendorMinPrices[s.vendor] || Infinity, price);
    }
  }
}

// Count of unique research compounds (main entries without compareSlug)
const peptideCount = PEPTIDE_COUNT;

// Pre-computed stats
const verifiedCount = vendors.filter((v) => v.verified).length;
const freeShippingCount = vendors.filter((v) => v.shipping?.some((s) => s.toLowerCase().includes("free"))).length;
const labTestedCount = vendors.filter((v) => v.labTested).length;
const avgRating = (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1);

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "verified" | "free-shipping" | "lab-tested">("all");
  const [sort, setSort] = useState<"a-z" | "rating" | "products">("a-z");

  const filtered = vendors.filter((v) => {
    const name = v.name.toLowerCase();
    const query = search.toLowerCase();
    if (query && !name.includes(query)) return false;
    if (filter === "verified" && !v.verified) return false;
    if (filter === "free-shipping" && !v.shipping?.some((s) => s.toLowerCase().includes("free"))) return false;
    if (filter === "lab-tested" && !v.labTested) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "a-z") return a.name.localeCompare(b.name);
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "products") return (vendorProductCounts[b.name] || 0) - (vendorProductCounts[a.name] || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      {/* EXPANDED HERO BANNER — Peptide Supermarket Reference */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] pb-10">
        <div className="max-w-[76rem] mx-auto px-4 pt-10 md:pt-14 pb-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            UK PEPTIDE SUPPLIERS
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Every UK peptide supplier, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">in one place.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
            Compare <strong className="text-white">{vendors.length} UK suppliers</strong> stocking <strong className="text-white">{peptideCount}+ research peptides</strong>. Independent, unbiased, updated daily.
          </p>

          {/* SEARCH BAR — inside the banner, large pill shape */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon />
              </div>
              <input
                type="text"
                placeholder={`Search ${vendors.length} UK suppliers...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 bg-white rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 shadow-lg"
              />
            </div>
          </div>

          {/* STATS ROW */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckIcon className="w-4 h-4" />
              <span className="text-white font-bold">{freeShippingCount}</span>
              <span className="text-gray-300">with free shipping</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckIcon className="w-4 h-4" />
              <span className="text-white font-bold">{labTestedCount}</span>
              <span className="text-gray-300">lab tested</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <StarIcon className="w-4 h-4" />
              <span className="text-white font-bold">{avgRating}</span>
              <span className="text-gray-300">average rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            All content is for educational and research reference purposes only.
            It does not constitute medical advice, diagnosis, or treatment
            recommendations. All peptides are for in-vitro research use only.
          </p>
        </div>
      </div>

      <div className="max-w-[76rem] mx-auto px-4 pt-6 relative z-10">
        {/* SUPPLIER DIRECTORY GRID */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#6366f1">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Supplier Directory</span>
          </div>
          <div className="flex items-center justify-between gap-4 mb-1">
            <h2 className="text-xl font-bold text-gray-900">All {vendors.length} UK suppliers</h2>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Sort dropdown */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-2.5 py-1 border border-gray-300 rounded-lg text-xs outline-none focus:border-blue-500 bg-white text-gray-700"
              >
                <option value="a-z">A-Z</option>
                <option value="rating">★ Top</option>
                <option value="products">📦 Most</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">Every UK supplier in our comparison index — sorted and filtered your way.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sorted.map((v) => {
              const count = vendorProductCounts[v.name] || 0;
              const minPrice = vendorMinPrices[v.name] || 0;
              const hasFreeShipping = v.shipping?.some((s) => s.toLowerCase().includes("free"));
              const hasLabTested = v.labTested;
              // Auto-detect vendor logo — try .svg first, fallback .png, fallback initials
              const bigLogo = ["dr-peptides", "express-peptides", "the-peptide-company", "raw-peptides"].includes(v.slug);
              return (
                <Link
                  key={v.id}
                  href={`/vendors/${v.slug}`}
                  className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className={`${bigLogo ? "w-20 h-20" : "w-16 h-16"} rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200`}>
                      <VendorLogo slug={v.slug} name={v.name} size={bigLogo ? "lg" : "sm"} />
                    </div>

                    {/* Middle content */}
                    <div className="min-w-0 flex-1">
                      {/* Company name - larger font */}
                      <h3 className="font-semibold text-gray-900 text-base">{v.name}</h3>

                      {/* Rating + country */}
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-amber-500 text-sm">★ {v.rating}</span>
                        <span className="text-xs text-gray-500">{v.country}</span>
                      </div>

                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {v.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            Site Verified
                          </span>
                        )}
                        {hasFreeShipping && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-6 9H6v-7h8v7zm3.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>
                            FREE DELIVERY
                          </span>
                        )}
                        {hasLabTested && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>
                            LAB TESTED
                          </span>
                        )}
                      </div>

                      {/* Product count */}
                      <p className="text-xs text-gray-500 mt-1.5">{count} products</p>

                      {/* Description */}
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{v.description}</p>
                    </div>

                    {/* Right side: Price + View */}
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5">
                      <span className="text-xl font-bold text-emerald-600 leading-tight">£{minPrice.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">From</span>
                      <span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No suppliers match your search.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
