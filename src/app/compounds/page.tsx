import Link from "next/link";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Browse All Research Peptides — Compare UK Prices | ViralPeps UK",
  description: `Browse ${compounds.length} research peptides including Tirzepatide, Semaglutide, BPC-157, and more. Compare prices from verified UK suppliers.`,
};

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

const badgeLabels: Record<string, string> = {
  "glp-1-agonists": "GLP-1", "growth-factors": "Growth", "melanotans": "Melano",
  "ghrp": "GHRP", "aod-fragments": "AOD", "thymosin-bpc": "Repair",
  "tb-500": "Regen", "cognitive": "Cognitive", "peptide-fragments": "Repair", "other": "Other",
};

export default function CompoundsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">All Research Peptides</h1>
        <p className="text-sm text-black mb-6">{compounds.length} peptides — compare prices from UK suppliers.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compounds.map((c) => {
            const bLabel = badgeLabels[c.category] || c.category;
            const minPrice = Math.min(
              ...c.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
            );
            return (
              <Link
                key={c.id}
                href={`/compounds/${c.slug}`}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="h-28 bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <img src={`/images/compounds/${c.slug}.svg`} alt={c.name} className="w-14 h-14 object-contain" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">{bLabel}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mt-2">{c.name}</h3>
                  {c.aliases.length > 0 && <p className="text-xs text-black">{c.aliases[0]}</p>}
                  <div className="flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#6366f1">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-xs text-indigo-600 font-medium">{c.sources.length} suppliers</span>
                  </div>
                  <p className="text-xs text-black mt-1 line-clamp-2">{c.description.slice(0, 80)}{c.description.length > 80 ? "..." : ""}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-black">From</span>
                    <span className="text-xs font-bold text-gray-900">&pound;{minPrice.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
