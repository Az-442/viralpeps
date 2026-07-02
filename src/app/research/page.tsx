"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { guides, compoundList } from "@/data/research";

const compounds = compoundList;

const categories = [
  "All",
  "Guide",
  "Articles",
  "Research Summaries",
  "Compound Profiles",
];

export default function ResearchPage() {
  const [search, setSearch] = useState("");
  const [selectedCompound, setSelectedCompound] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchSearch =
        !search ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.desc.toLowerCase().includes(search.toLowerCase());
      const matchCompound =
        !selectedCompound || g.compound === selectedCompound;
      const matchCategory =
        selectedCategory === "All" || g.category === selectedCategory;
      return matchSearch && matchCompound && matchCategory;
    });
  }, [search, selectedCompound, selectedCategory]);

  const categoryCount = (cat: string) =>
    cat === "All" ? guides.length : guides.filter((g) => g.category === cat).length;

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/research" />

      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-xs font-medium">
              {guides.length} articles and counting
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Research{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              & Guides
            </span>
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-3 font-medium">
            Peptide science, without the fluff.
          </p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Study summaries, practical guides and articles for peptide research.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              Reference-backed
            </span>
            <span className="flex items-center gap-1.5 text-blue-300">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Updated regularly
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Educational only
            </span>
          </div>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            All content is for educational and research reference purposes only.
            It does not constitute medical advice, diagnosis, or treatment
            recommendations. All peptides are for in-vitro research use only.
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Left sidebar — Search + Category filter */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <div className="sticky top-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Search
                </h4>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Categories
                </h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}{" "}
                      <span className="text-gray-400 text-xs">
                        ({categoryCount(cat)})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing{" "}
                  <span className="text-gray-700 font-medium">
                    {filtered.length}
                  </span>{" "}
                  of {guides.length} articles
                </p>
              </div>
            </div>
          </aside>

          {/* Center — Cards */}
          <main className="flex-1 min-w-0">
            <div className="grid md:grid-cols-2 gap-5">
              {filtered.length > 0 ? (
                filtered.map((g) => (
                  <Link
                    key={g.title}
                    href={`/research/${g.slug}`}
                    className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-white bg-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {g.category}
                        </span>
                        {g.compound && (
                          <span className="text-[10px] text-gray-400">
                            {g.compound}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug">
                        {g.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {g.desc}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-sm">
                    No articles match your search.
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* Right sidebar — Compound filter */}
          <aside className="w-60 shrink-0 hidden lg:block">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1">
                  Jump to Peptide
                </h4>
                <p className="text-[11px] text-indigo-600/70 mb-3">
                  Select a compound to find related research
                </p>
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search compounds..."
                    value={selectedCompound}
                    onChange={(e) => setSelectedCompound(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin">
                  <button
                    onClick={() => setSelectedCompound("")}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                      !selectedCompound
                        ? "bg-indigo-100 text-indigo-800 font-medium"
                        : "text-indigo-700 hover:bg-indigo-100/50"
                    }`}
                  >
                    All compounds
                  </button>
                  {compounds.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCompound(c)}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                        selectedCompound === c
                          ? "bg-indigo-100 text-indigo-800 font-medium"
                          : "text-indigo-700 hover:bg-indigo-100/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            More articles being added regularly.
          </p>
          <Link
            href="/compounds"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse All Compounds &rarr;
          </Link>
          <Link
            href="/tools"
            className="inline-block ml-3 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Tools & Calculators
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
