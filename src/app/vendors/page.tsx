"use client";

import { useState } from "react";
import Link from "next/link";
import vendors from "@/data/vendors.json";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

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

// Compound count per vendor
const vendorProductCounts: Record<string, number> = {};
for (const c of compounds) {
  for (const s of c.sources) {
    vendorProductCounts[s.vendor] = (vendorProductCounts[s.vendor] || 0) + 1;
  }
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

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "verified" | "free-shipping" | "lab-tested">("all");
  const [sort, setSort] = useState<"a-z" | "rating" | "products">("a-z");

  const filtered = vendors.filter((v) => {
    const name = v.name.toLowerCase();
    const query = search.toLowerCase();
    if (query && !name.includes(query)) return false;
    if (filter === "verified" && !v.verified) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "a-z") return a.name.localeCompare(b.name);
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "products") return (vendorProductCounts[b.name] || 0) - (vendorProductCounts[a.name] || 0);
    return 0;
  });

  const verifiedCount = vendors.filter((v) => v.verified).length;
  const freeShippingCount = vendors.filter((v) => v.shipping?.some((s) => s.toLowerCase().includes("free"))).length;
  const labTestedCount = vendors.filter((v) => v.highlights?.some((h) => h.toLowerCase().includes("tested"))).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Every UK peptide supplier, in one place.
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Compare {vendors.length} verified UK peptide suppliers. Prices, products, and shipping — all in one directory.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* SEARCH + FILTERS */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder={`Search ${vendors.length} UK suppliers...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
              >
                <option value="a-z">A to Z</option>
                <option value="rating">Top rated</option>
                <option value="products">Most products</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { key: "all", label: "All suppliers", count: vendors.length },
              { key: "verified", label: "Site verified", count: verifiedCount },
              { key: "free-shipping", label: "Free shipping", count: freeShippingCount },
              { key: "lab-tested", label: "Lab tested", count: labTestedCount },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === f.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f.label} <span className="opacity-70">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SUPPLIER DIRECTORY GRID */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#6366f1">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Supplier Directory</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">All {vendors.length} UK suppliers</h2>
          <p className="text-sm text-gray-500 mb-6">Every UK supplier in our comparison index — sorted and filtered your way.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sorted.map((v) => {
              const count = vendorProductCounts[v.name] || 0;
              const minPrice = vendorMinPrices[v.name] || 0;
              const hasFreeShipping = v.shipping?.some((s) => s.toLowerCase().includes("free"));
              const hasLabTested = v.highlights?.some((h) => h.toLowerCase().includes("tested"));
              return (
                <Link
                  key={v.id}
                  href={`/vendors/${v.slug}`}
                  className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PeptideVialIcon className="w-7 h-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{v.name}</h3>
                      {v.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                          Site Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                      <span className="text-amber-500">★ {v.rating}</span>
                      <span>{v.country}</span>
                      <span className="font-medium text-gray-700">From £{minPrice.toFixed(2)}</span>
                      <span>{count} products</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {hasFreeShipping && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded-full">FREE DELIVERY</span>
                      )}
                      {hasLabTested && (
                        <span className="text-[10px] bg-gray-800 text-white px-1.5 py-0.5 rounded-full">LAB TESTED</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{v.description}</p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <span className="text-xs font-medium text-blue-600 group-hover:underline">View &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
