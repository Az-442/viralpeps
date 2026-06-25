import Link from "next/link";
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
  "glp-1-agonists": "GLP-1",
  "growth-factors": "Growth",
  "melanotans": "Melano",
  "ghrp": "GHRP",
  "aod-fragments": "AOD",
  "thymosin-bpc": "Repair",
  "tb-500": "Regen",
  "cognitive": "Cognitive",
  "peptide-fragments": "Repair",
  "other": "Other",
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

// Group compounds by their raw category key
const categoryCounts: Record<string, number> = {};
const categorySlugs = new Set<string>();
for (const c of compounds) {
  const catKey = c.category;
  categoryCounts[catKey] = (categoryCounts[catKey] || 0) + 1;
  categorySlugs.add(catKey);
}

// Derive display categories from actual data, merging tb-500 into BPC/TB-500 display
const categoryTiles = Array.from(categorySlugs)
  .filter((key) => key !== "tb-500") // tb-500 merges with thymosin-bpc display
  .map((key) => {
    let displayKey = key;
    let count = categoryCounts[key];
    // If BPC/TB-500 display key, merge tb-500 count into it
    if (key === "thymosin-bpc" && categoryCounts["tb-500"]) {
      count += categoryCounts["tb-500"];
    }
    const display = categoryDisplay[key] || {
      name: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: "💊",
    };
    return {
      name: display.name,
      icon: display.icon,
      count: `${count} compound${count !== 1 ? "s" : ""}`,
      slug: key,
    };
  })
  .sort((a, b) => {
    // Sort by count descending, then alphabetically
    const countDiff = parseInt(b.count) - parseInt(a.count);
    if (countDiff !== 0) return countDiff;
    return a.name.localeCompare(b.name);
  });

const featuredCompounds = compounds.slice(0, 8);
const popularTags = compounds.slice(0, 5).map((c) => c.name);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tools</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
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
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
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
      <section className="pb-12 max-w-7xl mx-auto px-4">
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
                  <p className="text-xs text-gray-500 mt-1">{c.description}</p>
                </div>
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
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-sm outline-none" />
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">VP</span>
              </div>
              <span className="font-bold text-white">ViralPeps</span>
            </div>
            <p className="text-xs leading-relaxed">The most comprehensive research peptide directory. For laboratory research use only.</p>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
            <Link href="/compounds" className="block text-xs mb-2 hover:text-white">All Compounds</Link>
            <Link href="/category/glp-1-agonists" className="block text-xs mb-2 hover:text-white">GLP-1 Agonists</Link>
            <Link href="/vendors" className="block text-xs mb-2 hover:text-white">Vendors</Link>
            <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white">List Your Business</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
            <Link href="/research" className="block text-xs mb-2 hover:text-white">Research Library</Link>
            <Link href="/about" className="block text-xs mb-2 hover:text-white">About Us</Link>
            <Link href="/contact" className="block text-xs mb-2 hover:text-white">Contact</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy" className="block text-xs mb-2 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-xs mb-2 hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white">Disclaimer</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-xs text-center">
          For research purposes only. Not for human consumption. © 2026 ViralPeps.
        </div>
      </footer>
    </div>
  );
}
