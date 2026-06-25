import { notFound } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

export const dynamic = "force-dynamic";

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) notFound();

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
              <Link href="/compounds" className="text-sm text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-400">
        <Link href="/compounds" className="hover:text-blue-600">Compounds</Link> &gt; <span className="text-gray-600">{compound.name}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 font-bold text-2xl">
          {compound.name}
        </div>

        <div>
          <div className="flex gap-2 mb-3">
            <span className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded uppercase tracking-wider">{compound.category.replace(/-/g, ' ')}</span>
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded">Research Grade</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">{compound.name}</h1>
          {compound.aliases.length > 0 && (
            <p className="text-sm text-gray-400 mb-4">Also known as: {compound.aliases.join(", ")}</p>
          )}

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{compound.description}</p>

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

          {compound.sources.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Available from Vendors</h3>
              {compound.sources.map(s => {
                const vendor = vendors.find(v => v.name === s.vendor);
                return (
                  <div key={s.vendor} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg mb-2">
                    <div className="flex items-center gap-2">
                      {vendor?.verified && <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Verified</span>}
                      <span className="text-sm font-medium text-gray-900">{s.vendor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">{s.price}</span>
                      <a href={s.url} target="_blank" className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">View →</a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {compound.researchAreas.length > 0 && (
            <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm"><strong className="text-gray-900">Research Areas:</strong> <span className="text-gray-600">{compound.researchAreas.join(" · ")}</span></p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#0b1a2e] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">For research purposes only. Not for human consumption. © 2026 ViralPeps.</div>
      </footer>
    </div>
  );
}
