import Link from "next/link";
import compounds from "@/data/compounds.json";

const badgeColors: Record<string, string> = {
  "glp-1-agonists": "bg-green-50 text-green-700",
  "growth-factors": "bg-purple-50 text-purple-700",
  "melanotans": "bg-orange-50 text-orange-700",
  "ghrp": "bg-pink-50 text-pink-700",
  "aod-fragments": "bg-teal-50 text-teal-700",
  "thymosin-bpc": "bg-amber-50 text-amber-700",
  "tb-500": "bg-red-50 text-red-700",
};

const badgeLabels: Record<string, string> = {
  "glp-1-agonists": "GLP-1",
  "growth-factors": "Growth",
  "melanotans": "Melano",
  "ghrp": "GHRP",
  "aod-fragments": "AOD",
  "thymosin-bpc": "Repair",
  "tb-500": "Regen",
};

export default function CompoundsPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/compounds" className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-4">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Compounds</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compounds.map((c) => {
            const bClass = badgeColors[c.category] || "bg-gray-50 text-gray-600";
            const bLabel = badgeLabels[c.category] || c.category;
            return (
              <Link
                key={c.id}
                href={`/compounds/${c.slug}`}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="h-28 bg-gray-50 flex items-center justify-center text-gray-300 font-semibold text-sm group-hover:bg-blue-50 transition-colors">
                  {c.name}
                </div>
                <div className="p-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${bClass} uppercase tracking-wider`}>{bLabel}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mt-2">{c.name}</h3>
                  {c.aliases.length > 0 && <p className="text-xs text-gray-400">{c.aliases[0]}</p>}
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="bg-[#0b1a2e] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">For research purposes only. © 2026 ViralPeps.</div>
      </footer>
    </div>
  );
}
