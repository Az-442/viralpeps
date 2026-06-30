"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";

// ── Types ──
interface Source {
  vendor: string;
  price: string;
  url: string;
  inStock?: boolean;
  image?: boolean;
  dosage?: string;
}

interface Vendor {
  name: string;
  slug: string;
  verified: boolean;
  rating: number;
  country: string;
  highlights?: string[];
  logo?: string;
}

interface FaqEntry {
  q: string;
  a: string;
}

// ── Star rating component ──
function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  const stars = [];
  for (let i = 1; i <= total; i++) {
    stars.push(
      <svg key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  return <span className="inline-flex items-center gap-0.5">{stars}</span>;
}

// ── Tab definitions ──
const INFO_TABS = [
  { id: "prices", label: "£ Prices" },
  { id: "overview", label: "Overview" },
  { id: "molecular", label: "Molecular" },
  { id: "indications", label: "Indications" },
  { id: "dosing", label: "Dosing" },
  { id: "safety", label: "Safety" },
  { id: "references", label: "References" },
] as const;

type TabId = (typeof INFO_TABS)[number]["id"];

// ── Price per mg helper ──
function calcPricePerMg(price: string): number | null {
  // We don't have per-source dosage data yet, so this returns null
  // Will be populated when source dosage data is added
  return null;
}

// ── Main client component ──
export default function CompoundPageClient({
  compound,
  vendors,
  sortedSources,
  minPrice,
  avgPrice,
  accent,
  allDosages,
  faqEntries,
}: {
  compound: any;
  vendors: Vendor[];
  sortedSources: Source[];
  minPrice: number;
  avgPrice: number;
  accent: { border: string; bg: string; badge: string; icon: string };
  allDosages: string[];
  faqEntries: FaqEntry[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("prices");
  const [selectedDosage, setSelectedDosage] = useState("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("price-low");
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());

  // Toggle vendor selection for comparison
  const toggleVendor = (name: string) => {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Filter & sort sources
  const displayedSources = useMemo(() => {
    let list = [...sortedSources];

    // Filter by dosage (when we have dosage data per source)
    if (selectedDosage !== "all") {
      // Skip filtering if no source has dosage data yet
      const hasDosageData = list.some((s: any) => s.dosage);
      if (hasDosageData) {
        list = list.filter((s: any) => s.dosage === selectedDosage);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
          const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
          return pa - pb;
        });
        break;
      case "price-high":
        list.sort((a, b) => {
          const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
          const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
          return pb - pa;
        });
        break;
      case "rating": {
        list.sort((a, b) => {
          const va = vendors.find((v) => v.name === a.vendor);
          const vb = vendors.find((v) => v.name === b.vendor);
          return (vb?.rating || 0) - (va?.rating || 0);
        });
        break;
      }
    }
    return list;
  }, [sortedSources, selectedDosage, sortBy, vendors]);

  // Stats
  const supplierCount = compound.sources.length;
  const dosageCount = allDosages.length;
  const productCount = compound.sources.length;

  // Tab content map
  const tabContent = useMemo(() => {
    const compoundName = compound.name;
    return {
      prices: null, // The table is shown below tabs, this is the default
      overview: (
        <div className="prose prose-sm max-w-none text-gray-600">
          <p className="leading-relaxed">{compound.longDescription || compound.description}</p>
        </div>
      ),
      molecular: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {[
              { label: "CAS Number", value: compound.cas },
              { label: "Molar Mass", value: compound.molarMass },
              { label: "Sequence", value: compound.sequence },
              { label: "Purity", value: compound.purity },
              { label: "Form", value: compound.form },
              { label: "Half-Life", value: compound.halfLife },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{m.label}</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{m.value || "—"}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center p-8">
            <svg className="w-40 h-40 text-blue-200" viewBox="0 0 48 48" fill="none">
              <rect x="14" y="6" width="20" height="36" rx="4" fill="currentColor" opacity="0.3" />
              <rect x="16" y="10" width="16" height="28" rx="3" fill="currentColor" opacity="0.5" />
              <rect x="14" y="4" width="20" height="6" rx="3" fill="currentColor" opacity="0.4" />
              <text x="24" y="30" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">BPC-157</text>
            </svg>
          </div>
        </div>
      ),
      indications: (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {compound.name} is researched for the following applications based on published preclinical studies:
          </p>
          {compound.researchAreas && compound.researchAreas.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {compound.researchAreas.map((area: string) => (
                <div key={area} className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      dosing: (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Typical research protocols for {compound.name} based on published studies:
          </p>
          {compound.commonDosages && compound.commonDosages.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Common Dosages</p>
              <div className="flex flex-wrap gap-2">
                {compound.commonDosages.map((d: string) => (
                  <span key={d} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">{d}</span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> Dosages shown are for research purposes only. Always follow your approved research protocol.
            </p>
          </div>
        </div>
      ),
      safety: (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {compound.name} is intended for laboratory research purposes only. Key safety considerations:
          </p>
          <div className="space-y-3">
            {[
              { label: "Research Use Only", text: "Not approved for human consumption by the MHRA, FDA, or any regulatory body." },
              { label: "Purity", text: `All listed suppliers provide ≥${compound.purity || "99%"} purity, verified by third-party HPLC analysis.` },
              { label: "Storage", text: "Lyophilized powder should be stored at -20°C, protected from light and moisture. Reconstituted solution stable for 7-14 days at 2-8°C." },
              { label: "Handling", text: "Standard laboratory safety protocols should be followed. Use appropriate PPE during handling and reconstitution." },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600 mt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      references: (
        <div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Key published research on {compound.name}:
          </p>
          <div className="space-y-3">
            {[
              "Sikiric P, et al. The gastric cytoprotective effect of BPC-157. Dig Dis Sci. 1994.",
              "Chang CH, et al. BPC-157 enhances tendon healing through angiogenesis. J Orthop Res. 2011.",
              "Seiwerth S, et al. BPC-157 and tissue healing. Front Pharmacol. 2021.",
              "Kang EA, et al. BPC-157 in inflammatory bowel disease models. Gut Liver. 2018.",
            ].map((ref, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-xs text-gray-400 font-mono mt-0.5">[{i + 1}]</span>
                <p className="text-sm text-gray-600 leading-relaxed">{ref}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            References shown for informational purposes. Always verify against the latest published literature.
          </p>
        </div>
      ),
    };
  }, [compound]);

  return (
    <>
      {/* ===== FILTERS ROW ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Dosage filter */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Dosage</label>
            <select
              value={selectedDosage}
              onChange={(e) => setSelectedDosage(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="all">All Sizes</option>
              {allDosages.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 outline-none focus:border-blue-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Supplier Rating</option>
            </select>
          </div>

          <span className="text-xs text-gray-400 ml-auto">{displayedSources.length} results</span>
        </div>
      </div>

      {/* ===== DYNAMIC STATS BAR ===== */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{supplierCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Suppliers</p>
          </div>
          <div className="w-px h-10 bg-blue-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{dosageCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Dosages</p>
          </div>
          <div className="w-px h-10 bg-blue-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{productCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Products</p>
          </div>
        </div>
      </div>

      {/* ===== INFO TABS ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        {/* Tab navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50" role="tablist">
          {INFO_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5" role="tabpanel">
          {activeTab === "prices" ? (
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Compare {productCount} prices for {compound.name}. Cheapest: <strong className="text-green-600">&pound;{minPrice.toFixed(2)}</strong>. Average: <strong>&pound;{avgPrice.toFixed(2)}</strong>.
              </p>
              {selectedVendors.size > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-700 mb-2">
                    Comparing {selectedVendors.size} supplier{selectedVendors.size > 1 ? "s" : ""} — select rows and scroll to compare side-by-side
                  </p>
                </div>
              )}
            </div>
          ) : (
            tabContent[activeTab]
          )}
        </div>
      </div>

      {/* ===== PRICE COMPARISON TABLE ===== */}
      <div id="pricing-table" className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold w-10">
                  <span className="sr-only">Compare</span>
                </th>
                <th className="text-left px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Supplier</th>
                <th className="text-right px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Price</th>
                <th className="text-right px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Price / mg</th>
                <th className="text-center px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Stock</th>
                <th className="text-center px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Delivery</th>
                <th className="text-center px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Quality</th>
                <th className="text-center px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Coupon</th>
                <th className="text-center px-4 py-3 text-[10px] text-gray-500 uppercase tracking-wider font-semibold w-20">Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedSources.map((s, i) => {
                const vendor = vendors.find((v) => v.name === s.vendor);
                const price = parseFloat(s.price.replace(/[£$€,]/g, ""));
                const isSelected = selectedVendors.has(s.vendor);
                const isBestPrice = price === minPrice;

                return (
                  <tr
                    key={s.vendor + i}
                    className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${isBestPrice ? "bg-emerald-50/30" : ""} ${isSelected ? "bg-blue-50" : ""}`}
                    onClick={() => toggleVendor(s.vendor)}
                  >
                    {/* Compare checkbox */}
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleVendor(s.vendor)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>

                    {/* Supplier */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200">
                          <ProductImage vendorSlug={vendor?.slug || s.vendor.toLowerCase().replace(/\s+/g, '-')} compoundSlug={compound.slug} compoundName={compound.name} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link href={`/vendors/${vendor?.slug || ""}`} className="font-semibold text-gray-900 text-xs hover:text-blue-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                              {vendor?.name || s.vendor}
                            </Link>
                            {isBestPrice && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">BEST</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <StarRating rating={vendor?.rating || 0} />
                            <span className="text-[10px] text-gray-400">{vendor?.rating || "—"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-gray-900 text-sm">{s.price}</span>
                    </td>

                    {/* Price per mg */}
                    <td className="px-4 py-3 text-right">
                      {(() => {
                        const ppm = calcPricePerMg(s.price);
                        return ppm !== null ? (
                          <span className="text-xs text-gray-500">&pound;{ppm.toFixed(2)}/mg</span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        );
                      })()}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3 text-center">
                      {s.inStock !== false ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">In Stock</span>
                      ) : (
                        <span className="text-[10px] text-gray-400">—</span>
                      )}
                    </td>

                    {/* Delivery */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-[10px] font-semibold text-green-600">Free</span>
                    </td>

                    {/* Quality */}
                    <td className="px-4 py-3 text-center">
                      {vendor?.verified ? (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                          Lab Tested
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400">—</span>
                      )}
                    </td>

                    {/* Coupon */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-[10px] text-gray-400">—</span>
                    </td>

                    {/* Visit */}
                    <td className="px-4 py-3 text-center">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors"
                      >
                        Visit
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {displayedSources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No suppliers found matching your filters.</p>
          </div>
        )}
      </div>

      {/* ===== FAQ ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqEntries.map((faq, i) => (
            <details key={i} className="group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <summary className="text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-2 pr-6">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
