import { notFound } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";

export const dynamic = "force-dynamic";

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

const categoryNames: Record<string, string> = {
  "glp-1-agonists": "GLP-1 Agonists", "growth-factors": "Growth Factors",
  "melanotans": "Melanotans", "ghrp": "GHRPs", "aod-fragments": "AOD/Fragments",
  "thymosin-bpc": "BPC/TB-500", "tb-500": "BPC/TB-500", "cognitive": "Cognitive",
  "peptide-fragments": "Repair & Recovery", "other": "Other",
};

const categoryIcons: Record<string, string> = {
  "glp-1-agonists": "💉", "growth-factors": "🧬", "melanotans": "☀️", "ghrp": "📈",
  "aod-fragments": "🔥", "thymosin-bpc": "🛡️", "tb-500": "🛡️", "cognitive": "🧠",
  "peptide-fragments": "🔬", "other": "⚗️",
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filtered = compounds.filter((c) => c.category === slug);
  if (filtered.length === 0) notFound();

  const catName = categoryNames[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const icon = categoryIcons[slug] || "💊";

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
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">{icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{catName}</h1>
          <p className="text-gray-400 text-sm">{filtered.length} compound{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      </section>

      {/* COMPOUND GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((c) => {
            const bClass = badgeColors[c.category] || "bg-gray-50 text-gray-600";
            const bLabel = badgeLabels[c.category] || c.category;
            return (
              <Link key={c.id} href={`/compounds/${c.slug}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-28 bg-gray-50 flex items-center justify-center text-gray-300 font-semibold text-sm group-hover:bg-blue-50 transition-colors">{c.name}</div>
                <div className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${bClass} uppercase tracking-wider`}>{bLabel}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mt-2">{c.name}</h3>
                  <p className="text-xs text-gray-400">{c.aliases[0] || ""}</p>
                  <p className="text-xs text-gray-500 mt-1">From {c.sources.length} seller{c.sources.length !== 1 ? "s" : ""}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">VP</span>
              </div>
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
