import { notFound } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) return {};
  const minPrice = Math.min(
    ...compound.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
  );
  return {
    title: `${compound.name} — Research Peptide Info & UK Vendor Prices | ViralPeps UK`,
    description: `Compare prices for ${compound.name} from ${compound.sources.length} verified UK suppliers. From £${minPrice.toFixed(2)}. Research information, CAS ${compound.cas}, purity ${compound.purity}, and half-life ${compound.halfLife}.`,
    openGraph: {
      title: `${compound.name} — Compare UK Prices | ViralPeps`,
      description: `Compare ${compound.name} prices from ${compound.sources.length} UK suppliers. From £${minPrice.toFixed(2)}.`,
    },
  };
}

function PeptideVialIcon({ className = "w-20 h-20" }: { className?: string }) {
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

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) notFound();

  const minPrice = Math.min(
    ...compound.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
  );

  // Sort vendors: verified featured first, then by price
  const sortedSources = [...compound.sources].sort((a, b) => {
    const va = vendors.find((v) => v.name === a.vendor);
    const vb = vendors.find((v) => v.name === b.vendor);
    const aVerified = va?.verified ? 0 : 1;
    const bVerified = vb?.verified ? 0 : 1;
    if (aVerified !== bVerified) return aVerified - bVerified;
    const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
    const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
    return pa - pb;
  });

  // Featured supplier = first verified, lowest price
  const featured = sortedSources[0];
  const featuredVendor = vendors.find((v) => v.name === featured?.vendor);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${compound.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: compound.description,
        },
      },
      {
        "@type": "Question",
        name: `What is the CAS number for ${compound.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The CAS number for ${compound.name} is ${compound.cas}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the half-life of ${compound.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The half-life of ${compound.name} is approximately ${compound.halfLife}.`,
        },
      },
      {
        "@type": "Question",
        name: `Where can I buy ${compound.name} in the UK?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${compound.name} is available from ${compound.sources.length} UK suppliers listed on ViralPeps. Prices start from £${minPrice.toFixed(2)}.`,
        },
      },
    ],
  };

  const categoryLabel = compound.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-black">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/compounds" className="hover:text-blue-600">Peptides</Link>
        <span className="mx-1">/</span>
        <span className="text-black">{compound.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* LEFT: Image + Specs */}
          <div className="md:col-span-2">
            <div className="bg-white border border-black rounded-xl p-6">
              <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                <img src={`/images/compounds/${slug}.svg`} alt={compound.name} className="w-32 h-32 object-contain" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">{categoryLabel}</span>
                  <span className="text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded">Research Grade</span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">{compound.name}</h1>
                {compound.aliases.length > 0 && (
                  <p className="text-xs text-black">Also known as: {compound.aliases.join(", ")}</p>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "CAS", value: compound.cas },
                    { label: "Molar Mass", value: compound.molarMass },
                    { label: "Purity", value: compound.purity },
                    { label: "Half-Life", value: compound.halfLife },
                    { label: "Form", value: compound.form },
                    { label: "Sequence", value: compound.sequence?.slice(0, 20) + (compound.sequence?.length > 20 ? "..." : "") },
                  ].map((m) => (
                    <div key={m.label} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-[10px] text-black uppercase tracking-wider">{m.label}</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{m.value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Description + Vendors */}
          <div className="md:col-span-3 space-y-5">
            {/* DESCRIPTION */}
            <div className="bg-white border border-black rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About {compound.name}</h2>
              <p className="text-sm text-black leading-relaxed">{compound.description}</p>

              {compound.mechanism && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 mt-4 mb-2">Mechanism of Action</h3>
                  <p className="text-sm text-black leading-relaxed">{compound.mechanism}</p>
                </>
              )}

              {compound.researchAreas.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Research Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {compound.researchAreas.map((a) => (
                      <span key={a} className="text-xs text-blue-600 bg-white px-2 py-0.5 rounded-full font-medium">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {compound.commonDosages.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-black uppercase tracking-wider mb-1">Common Dosages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {compound.commonDosages.map((d) => (
                      <span key={d} className="text-xs bg-gray-100 text-black px-2 py-0.5 rounded font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FEATURED SUPPLIER */}
            {featured && featuredVendor && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#d97706">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Featured Supplier</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                      <img src={`/images/vendors/${featuredVendor.slug}.png`} alt={featuredVendor.name} className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{featuredVendor.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        {featuredVendor.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            Site Verified
                          </span>
                        )}
                        <span className="text-xs text-amber-500">★ {featuredVendor.rating}</span>
                        <span className="text-xs text-black">{featuredVendor.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{featured.price}</div>
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 px-4 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
                    >
                      View Deal
                    </a>
                  </div>
                </div>
                {featuredVendor.highlights && featuredVendor.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {featuredVendor.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full border border-amber-100">{h}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ALL VENDOR COMPARISON TABLE */}
            <div className="bg-white border border-black rounded-xl overflow-hidden">
              <div className="p-5 border-b border-black">
                <h2 className="text-lg font-bold text-gray-900">
                  Compare Prices from {compound.sources.length} Suppliers
                </h2>
                <p className="text-sm text-black mt-1">
                  Lowest price: <strong className="text-green-600">&pound;{minPrice.toFixed(2)}</strong>
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {sortedSources.map((s, i) => {
                  const vendor = vendors.find((v) => v.name === s.vendor);
                  const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
                  const savings = price > minPrice
                    ? `+£${(price - minPrice).toFixed(2)}`
                    : "Best price";

                  return (
                    <div key={s.vendor} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${i === 0 ? "bg-amber-50/30" : ""}`}>
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                          <img src={`/images/vendors/${vendor?.slug || s.vendor.toLowerCase().replace(/\s+/g, '-')}.png`} alt={vendor?.name || s.vendor} className="w-7 h-7 object-contain" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm">{vendor?.name || s.vendor}</h3>
                            {vendor?.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                Verified
                              </span>
                            )}
                          </div>
                          {vendor && (
                            <div className="flex items-center gap-2 text-[10px] text-black mt-0.5">
                              <span className="text-amber-500">★ {vendor.rating}</span>
                              <span>{vendor.country}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">{s.price}</div>
                          {savings === "Best price" ? (
                            <span className="text-[10px] text-green-600 font-semibold">{savings}</span>
                          ) : (
                            <span className="text-[10px] text-black">{savings}</span>
                          )}
                        </div>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white border border-black rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: `What is ${compound.name}?`, a: compound.description },
                  {
                    q: `What is the CAS number for ${compound.name}?`,
                    a: `The CAS registry number for ${compound.name} is ${compound.cas}.`,
                  },
                  {
                    q: `What is the half-life of ${compound.name}?`,
                    a: `${compound.name} has an approximate half-life of ${compound.halfLife}.`,
                  },
                  {
                    q: `Where can I buy ${compound.name} in the UK?`,
                    a: `${compound.name} is available from ${compound.sources.length} UK suppliers on ViralPeps, with prices starting from £${minPrice.toFixed(2)}. Compare all suppliers above.`,
                  },
                ].map((faq, i) => (
                  <div key={i} className="border-b border-black pb-3 last:border-0 last:pb-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{faq.q}</h3>
                    <p className="text-sm text-black leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
