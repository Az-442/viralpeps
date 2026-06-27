import { notFound } from "next/navigation";
import Link from "next/link";
import vendors from "@/data/vendors.json";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) return {};
  return {
    title: `${vendor.name} — UK Peptide Supplier Review & Products | ViralPeps`,
    description: `${vendor.name} is a ${vendor.country}-based peptide supplier rated ★ ${vendor.rating}. ${vendor.description?.slice(0, 100)}`,
  };
}

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

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) notFound();

  // Compounds this vendor sells
  const vendorCompounds = compounds.filter((c) =>
    c.sources.some((s) => s.vendor === vendor.name)
  );

  const minPrice = Math.min(
    ...vendorCompounds.flatMap((c) =>
      c.sources
        .filter((s) => s.vendor === vendor.name)
        .map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity)
    )
  );

  const hasFreeShipping = vendor.shipping?.some((s) => s.toLowerCase().includes("free"));
  const hasLabTested = vendor.highlights?.some((h) => h.toLowerCase().includes("tested"));

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-black">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/vendors" className="hover:text-blue-600">Suppliers</Link>
        <span className="mx-1">/</span>
        <span className="text-black">{vendor.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* SUPPLIER HEADER */}
        <div className="bg-white border border-black rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border border-black">
              <img src={`/images/vendors/${vendor.slug}.png`} alt={vendor.name} className="w-16 h-16 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                {vendor.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    Site Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-black mb-3">
                <span className="text-amber-500 font-medium">★ {vendor.rating}</span>
                <span>{vendor.country}</span>
                {vendor.founded && <span>Since {vendor.founded}</span>}
                <span className="text-black">{vendorCompounds.length} products</span>
                {minPrice && <span className="font-medium text-black">From £{minPrice.toFixed(2)}</span>}
              </div>
              <p className="text-sm text-black leading-relaxed mb-3">{vendor.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {vendor.highlights?.map((h) => (
                  <span key={h} className="text-[10px] bg-gray-100 text-black px-2 py-0.5 rounded-full font-medium">{h}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {hasFreeShipping && (
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">FREE UK DELIVERY</span>
                )}
                {hasLabTested && (
                  <span className="text-[10px] bg-gray-800 text-white px-2 py-0.5 rounded-full">LAB TESTED</span>
                )}
              </div>
            </div>
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5"
            >
              Visit Website
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-black">
            {[
              { label: "Shipping", value: vendor.shipping?.join(", ") || "N/A" },
              { label: "Payment", value: vendor.payment?.join(", ") || "N/A" },
              { label: "Categories", value: vendor.categories?.join(", ") || "N/A" },
              { label: "Last Tested", value: vendor.lastTested || "N/A" },
            ].map((info) => (
              <div key={info.label} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-black uppercase tracking-wider mb-0.5">{info.label}</p>
                <p className="text-xs font-medium text-gray-900">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS LIST */}
        <div className="bg-white border border-black rounded-xl overflow-hidden">
          <div className="p-5 border-b border-black">
            <h2 className="text-lg font-bold text-gray-900">
              {vendor.name} Products ({vendorCompounds.length})
            </h2>
            <p className="text-sm text-black mt-1">
              All compounds available from this supplier. Prices from £{minPrice.toFixed(2)}.
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {vendorCompounds.map((c) => {
              const source = c.sources.find((s) => s.vendor === vendor.name);
              const price = source ? parseFloat(source.price.replace(/[£$€,]/g, "")) : 0;
              return (
                <Link
                  key={c.id}
                  href={`/compounds/${c.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                      <img
                        src={`/images/products/${vendor.slug}/${c.slug}.webp`}
                        alt={c.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = `/images/products/${vendor.slug}/${c.slug}.png`;
                          target.onerror = () => {
                            target.onerror = null;
                            target.src = `/images/compounds/${c.slug}.svg`;
                            target.className = "w-7 h-7 object-contain";
                          };
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-black">
                        <span className="bg-gray-100 text-black px-1.5 py-0.5 rounded font-medium">{c.category.replace(/-/g, " ")}</span>
                        {c.aliases[0] && <span>{c.aliases[0]}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {source && <span className="text-sm font-bold text-gray-900">{source.price}</span>}
                    <span className="text-xs text-blue-600 font-medium">View &rarr;</span>
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
