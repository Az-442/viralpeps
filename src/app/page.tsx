"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

const badgeColors: Record<string, string> = {
  "glp-1-agonists": "bg-green-50 text-green-700",
  "growth-factors": "bg-purple-50 text-purple-700",
  "melanotans": "bg-orange-50 text-orange-700",
  "ghrp": "bg-pink-50 text-pink-700",
  "aod-fragments": "bg-teal-50 text-teal-700",
  "thymosin-bpc": "bg-amber-50 text-amber-700",
  "tb-500": "bg-red-50 text-red-700",
  "cognitive": "bg-blue-50 text-blue-700",
  "peptide-fragments": "bg-cyan-50 text-cyan-700",
  "other": "bg-gray-50 text-gray-700",
};

const badgeLabels: Record<string, string> = {
  "glp-1-agonists": "GLP-1", "growth-factors": "Growth", "melanotans": "Melano",
  "ghrp": "GHRP", "aod-fragments": "AOD", "thymosin-bpc": "Repair",
  "tb-500": "Regen", "cognitive": "Cognitive", "peptide-fragments": "Repair", "other": "Other",
};

const categoryDisplay: Record<string, { name: string; icon: string }> = {
  "glp-1-agonists": { name: "GLP-1 Agonists", icon: "💉" },
  "growth-factors": { name: "Growth Factors", icon: "🧬" },
  "melanotans": { name: "Melanotans", icon: "☀️" },
  "ghrp": { name: "GHRPs", icon: "📈" },
  "aod-fragments": { name: "AOD/Fragments", icon: "🔥" },
  "thymosin-bpc": { name: "BPC/TB-500", icon: "🛡️" },
  "tb-500": { name: "BPC/TB-500", icon: "🛡️" },
  "cognitive": { name: "Cognitive", icon: "🧠" },
  "peptide-fragments": { name: "Repair & Recovery", icon: "🔬" },
  "other": { name: "Other", icon: "⚗️" },
};

// Category counts
const categoryCounts: Record<string, number> = {};
const categorySlugs = new Set<string>();
for (const c of compounds) {
  const catKey = c.category;
  categoryCounts[catKey] = (categoryCounts[catKey] || 0) + 1;
  categorySlugs.add(catKey);
}

const categoryTiles = Array.from(categorySlugs)
  .filter((key) => key !== "tb-500")
  .map((key) => {
    let count = categoryCounts[key];
    if (key === "thymosin-bpc" && categoryCounts["tb-500"]) {
      count += categoryCounts["tb-500"];
    }
    const display = categoryDisplay[key] || {
      name: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: "💊",
    };
    return { name: display.name, icon: display.icon, count: `${count} compound${count !== 1 ? "s" : ""}`, slug: key };
  })
  .sort((a, b) => {
    const countDiff = parseInt(b.count) - parseInt(a.count);
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });

const featuredCompounds = compounds.slice(0, 8);
const popularTags = compounds.slice(0, 5).map((c) => c.name);
const topVendors = vendors.slice(0, 4);

// Compound count per vendor
const vendorCompoundCounts: Record<string, number> = {};
for (const c of compounds) {
  for (const s of c.sources) {
    vendorCompoundCounts[s.vendor] = (vendorCompoundCounts[s.vendor] || 0) + 1;
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
        <path d="M9 20V12l7 4-7 4z" fill="white" fillOpacity="0.3" />
        <path d="M10.5 18.5V13.5l5 2.5-5 2.5z" fill="white" />
        <circle cx="22" cy="11" r="3.5" fill="white" fillOpacity="0.3" />
        <circle cx="22" cy="11" r="2" fill="white" />
        <circle cx="19" cy="21" r="2.5" fill="white" fillOpacity="0.25" />
        <path d="M22 19l3 5h-6l3-5z" fill="white" fillOpacity="0.3" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#2563eb" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-bold text-xl text-gray-900">ViralPeps</span>
    </Link>
  );

  const navLinks = [
    { href: "/compounds", label: "Compounds" },
    { href: "/vendors", label: "Vendors" },
    { href: "/tools", label: "Tools" },
    { href: "/research", label: "Research" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-blue-600 font-medium">{l.label}</Link>
              ))}
            </div>
            {/* HAMBURGER */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium">{l.label}</Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find, Compare & Source<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Research Peptides</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            The most comprehensive peptide directory. Browse compounds, compare verified vendors, and make informed purchasing decisions.
          </p>
          <div className="max-w-xl mx-auto"><SearchBar /></div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-xs text-gray-500">Popular:</span>
            {popularTags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 cursor-pointer transition">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { num: `${compounds.length}+`, label: "Research Compounds" },
            { num: `${vendors.length}+`, label: "Verified Vendors" },
            { num: "10K+", label: "Monthly Researchers" }
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-blue-600">{s.num}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🧪", title: "Independent COAs", desc: "Third-party tested batches" },
            { icon: "📊", title: "Price Comparison", desc: "Compare vendor pricing" },
            { icon: "⭐", title: "Verified Vendors", desc: "Only trusted suppliers" },
            { icon: "📚", title: "Research Library", desc: "Compound guides & info" },
          ].map(t => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">{t.icon}</div>
              <div><p className="text-sm font-semibold text-gray-900">{t.title}</p><p className="text-xs text-gray-500">{t.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
          <Link href="/compounds" className="text-sm text-blue-600 font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categoryTiles.map(c => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="p-5 bg-white border border-gray-100 rounded-xl text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{c.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED COMPOUNDS */}
      <section className="pb-6 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Compounds</h2>
          <Link href="/compounds" className="text-sm text-blue-600 font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCompounds.map(c => {
            const bClass = badgeColors[c.category] || "bg-gray-50 text-gray-600";
            const bLabel = badgeLabels[c.category] || c.category;
            return (
              <Link key={c.id} href={`/compounds/${c.slug}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-28 bg-gray-50 flex items-center justify-center text-gray-300 font-semibold text-sm group-hover:bg-blue-50 transition-colors">{c.name}</div>
                <div className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${bClass} uppercase tracking-wider`}>{bLabel}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mt-2">{c.name}</h3>
                  <p className="text-xs text-gray-400">{c.aliases[0] || ""}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.description.slice(0, 80)}{c.description.length > 80 ? "..." : ""}</p>
                  <p className="text-xs text-blue-600 font-medium mt-2">From {c.sources.length} seller{c.sources.length !== 1 ? "s" : ""}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="py-10 max-w-7xl mx-auto px-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Vendors</h2>
          <Link href="/vendors" className="text-sm text-blue-600 font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topVendors.map(v => {
            const count = vendorCompoundCounts[v.name] || 0;
            return (
              <Link key={v.id} href={`/vendors/${v.slug}`} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center text-lg mb-3">🏪</div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{v.name}</h3>
                  {v.verified && <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-1.5 py-0.5 rounded-full">✓</span>}
                </div>
                <p className="text-xs text-gray-400">{v.country} · ★ {v.rating}</p>
                <p className="text-xs font-medium text-blue-600 mt-2">{count} compound{count !== 1 ? "s" : ""} listed</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-blue-100 text-sm mb-6">New compounds, vendor updates, and research guides.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-900 outline-none placeholder-gray-400" />
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="url(#fLogo)" />
                <path d="M7 15V9l5 3-5 3z" fill="white" fillOpacity="0.4" />
                <path d="M8 14V10l4 2-4 2z" fill="white" />
                <defs>
                  <linearGradient id="fLogo" x1="0" y1="0" x2="24" y2="24">
                    <stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-bold text-white">ViralPeps</span>
            </div>
            <p className="text-xs leading-relaxed">For laboratory research use only. © 2026 ViralPeps.</p>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
            <Link href="/compounds" className="block text-xs mb-2 hover:text-white">All Compounds</Link>
            <Link href="/vendors" className="block text-xs mb-2 hover:text-white">Vendors</Link>
            <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white">List Your Business</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
            <Link href="/tools" className="block text-xs mb-2 hover:text-white">Peptide Tools</Link>
            <Link href="/research" className="block text-xs mb-2 hover:text-white">Research Library</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy" className="block text-xs mb-2 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-xs mb-2 hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
