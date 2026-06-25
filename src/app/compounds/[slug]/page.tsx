import { notFound } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

export const dynamic = "force-dynamic";

const badgeColors: Record<string, string> = {
  "glp-1-agonists": "bg-green-50 text-green-700", "growth-factors": "bg-purple-50 text-purple-700",
  "melanotans": "bg-orange-50 text-orange-700", "ghrp": "bg-pink-50 text-pink-700",
  "aod-fragments": "bg-teal-50 text-teal-700", "thymosin-bpc": "bg-amber-50 text-amber-700",
  "tb-500": "bg-red-50 text-red-700", "cognitive": "bg-blue-50 text-blue-700",
  "peptide-fragments": "bg-cyan-50 text-cyan-700", "other": "bg-gray-50 text-gray-700",
};

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) notFound();

  const bClass = badgeColors[compound.category] || "bg-gray-50 text-gray-600";

  // Build FAQPage schema
  const faqSchema = compound.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": compound.faq.map((f: {question: string; answer: string}) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-white">
      {/* FAQPage Schema */}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="7" fill="url(#navLg)" /><path d="M7 17.5v-7l6 3.5-6 3.5z" fill="white" fillOpacity="0.3" /><path d="M8.5 16v-4l4.5 2-4.5 2z" fill="white" /><defs><linearGradient id="navLg" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
              </svg>
              <span className="font-bold text-lg text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/compounds" className="text-sm text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tools</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-gray-400">
        <Link href="/compounds" className="hover:text-blue-600">Compounds</Link> &gt; <span className="text-gray-700 font-medium">{compound.name}</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* IMAGE */}
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl flex items-center justify-center text-gray-300 font-bold text-3xl border border-gray-100">
            {compound.name}
          </div>

          {/* INFO */}
          <div>
            <div className="flex gap-2 mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded ${bClass} uppercase tracking-wider`}>{compound.category.replace(/-/g, ' ')}</span>
              <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded">Research Grade</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-1">{compound.name}</h1>
            {compound.aliases.length > 0 && (
              <p className="text-sm text-gray-400 mb-4">Also known as: {compound.aliases.join(", ")}</p>
            )}

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{compound.description}</p>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: "CAS", value: compound.cas },
                { label: "Molar Mass", value: compound.molarMass },
                { label: "Purity", value: compound.purity },
                { label: "Half-Life", value: compound.halfLife },
                { label: "Form", value: compound.form },
              ].map(m => (
                <div key={m.label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">{m.label}</p>
                  <p className="text-sm font-medium text-gray-900">{m.value}</p>
                </div>
              ))}
            </div>

            {/* VENDOR SOURCES */}
            {compound.sources.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3">
                  Available from Vendors ({compound.sources.length})
                </h3>
                {compound.sources.map(s => {
                  const vendor = vendors.find(v => v.name === s.vendor);
                  return (
                    <div key={s.vendor} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg mb-2 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        {vendor?.verified && <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Verified</span>}
                        <span className="text-sm font-medium text-gray-900">{s.vendor}</span>
                        {vendor && <span className="text-[10px] text-gray-400">{vendor.country}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-gray-900">{s.price}</span>
                        <a href={s.url} target="_blank" className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">View →</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* RESEARCH AREAS */}
            {compound.researchAreas.length > 0 && (
              <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm"><strong className="text-gray-900">Research Areas:</strong> <span className="text-gray-600">{compound.researchAreas.join(" · ")}</span></p>
              </div>
            )}
          </div>
        </div>

        {/* LONG-FORM DESCRIPTION */}
        {compound.longDescription && (
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-gray prose-sm max-w-none">
              {compound.longDescription.split("\n\n").map((paragraph: string, i: number) => {
                // Check if it's a heading (starts with bold markdown)
                if (paragraph.startsWith("**") && paragraph.includes("**")) {
                  const parts = paragraph.split("**");
                  return (
                    <div key={i} className="mb-4">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">{parts[1]}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{parts.slice(2).join("").trim()}</p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed mb-4">{paragraph}</p>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ SECTION */}
        {compound.faq && compound.faq.length > 0 && (
          <div className="max-w-3xl mx-auto mt-10 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {compound.faq.map((item: {question: string; answer: string}, i: number) => (
                <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    {item.question}
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="url(#fLg)" /><path d="M7 15V9l5 3-5 3z" fill="white" fillOpacity="0.4" /><path d="M8 14V10l4 2-4 2z" fill="white" /><defs><linearGradient id="fLg" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs></svg>
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
