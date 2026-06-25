import { notFound } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

export function generateStaticParams() {
  return compounds.map((c) => ({ slug: c.slug }));
}

export default function CompoundPage({ params }: { params: { slug: string } }) {
  const compound = compounds.find((c) => c.slug === params.slug);
  if (!compound) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/compounds" className="text-sm text-blue-600 hover:text-blue-700 mb-6 inline-block">← Back to compounds</Link>
        
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{compound.name}</h1>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mt-2">Research Grade</span>
          </div>
          {compound.aliases.length > 0 && (
            <p className="text-sm text-gray-500">Also known as: {compound.aliases.join(", ")}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{compound.description}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Mechanism of Action</h2>
              <p className="text-gray-700 leading-relaxed">{compound.mechanism}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Research Areas</h2>
              <div className="flex flex-wrap gap-2">
                {compound.researchAreas.map((area) => (
                  <span key={area} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-100">{area}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Available Vendors</h2>
              <div className="space-y-3">
                {compound.sources.map((s) => {
                  const vendor = vendors.find((v) => v.name === s.vendor);
                  return (
                    <div key={s.vendor} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link href={`/vendors/${vendor?.slug || "#"}`} className="font-medium text-gray-900 hover:text-blue-600">{s.vendor}</Link>
                          {vendor?.verified && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Verified</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{s.price} • {s.inStock ? "In Stock" : "Out of Stock"}</p>
                      </div>
                      <a href={s.url} target="_blank" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">View →</a>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Technical Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">CAS Number</span>
                  <p className="text-gray-900 font-mono text-xs mt-0.5">{compound.cas}</p>
                </div>
                <div>
                  <span className="text-gray-500">Molar Mass</span>
                  <p className="text-gray-900">{compound.molarMass}</p>
                </div>
                <div>
                  <span className="text-gray-500">Purity</span>
                  <p className="text-gray-900">{compound.purity}</p>
                </div>
                <div>
                  <span className="text-gray-500">Form</span>
                  <p className="text-gray-900">{compound.form}</p>
                </div>
                <div>
                  <span className="text-gray-500">Half-Life</span>
                  <p className="text-gray-900">{compound.halfLife}</p>
                </div>
              </div>
            </div>

            <div className="p-5 border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Common Dosages</h3>
              <ul className="space-y-1.5">
                {compound.commonDosages.map((d) => (
                  <li key={d} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
