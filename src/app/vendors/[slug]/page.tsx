import { notFound } from "next/navigation";
import Link from "next/link";
import vendors from "@/data/vendors.json";
import compounds from "@/data/compounds.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) return {};
  const vendorSlug = vendor.slug;
  return {
    title: `${vendor.name} — UK Peptide Supplier Review & Products | ViralPeps`,
    description: `${vendor.name} is a ${vendor.country}-based peptide supplier rated ★ ${vendor.rating}. ${vendor.description?.slice(0, 100)}`,
  };
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v5l4 8H5l4-8V3z" /><line x1="9" y1="3" x2="15" y2="3" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) notFound();

  // Compounds this vendor sells
  // If vendor has individual catalog entries (identified by having compareSlug),
  // only show those entries OR single-vendor compounds unique to this vendor.
  // Otherwise show all compounds where this vendor is a source.
  const vendorSourceCompounds = compounds.filter((c) =>
    c.sources.some((s) => s.vendor === vendor.name)
  );
  const hasCatalogEntries = vendorSourceCompounds.some((c) =>
    (c as any)?.compareSlug
  );
  const vendorCompounds = hasCatalogEntries
    ? vendorSourceCompounds.filter((c) =>
        (c as any)?.compareSlug ||
        c.sources.every((s) => s.vendor === vendor.name)
      )
    : vendorSourceCompounds;

  const minPrice = Math.min(
    ...vendorCompounds.flatMap((c) =>
      c.sources
        .filter((s) => s.vendor === vendor.name)
        .map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || Infinity)
    )
  );

  // Build a lookup: master comparison slug -> that compound (for compareSlug links)
  const compoundBySlug: Record<string, any> = {};
  compounds.forEach((c) => { compoundBySlug[c.slug] = c; });
  const hasFreeShipping = vendor.shipping?.some((s) => s.toLowerCase().includes("free"));
  const hasLabTested = vendor.highlights?.some((h) => h.toLowerCase().includes("tested"));
  const hasNextDay = vendor.highlights?.some((h) => h.toLowerCase().includes("dispatch") || h.toLowerCase().includes("shipping"));
  const hasUkBased = vendor.country === "UK" || vendor.highlights?.some((h) => h.toLowerCase().includes("uk-based"));
  const hasDiscreet = vendor.highlights?.some((h) => h.toLowerCase().includes("discreet"));

  // Build feature tags with icons
  const featureTags: { label: string; icon: React.ReactNode; color: string }[] = [];
  if (hasNextDay) featureTags.push({ label: "Next Day Delivery", icon: <TruckIcon />, color: "border-blue-300 text-blue-200" });
  if (hasUkBased) featureTags.push({ label: "UK Based", icon: <CheckCircleIcon />, color: "border-emerald-500/50 text-emerald-300" });
  if (hasLabTested) featureTags.push({ label: "Lab Tested", icon: <FlaskIcon />, color: "border-purple-400/50 text-purple-300" });
  if (hasDiscreet) featureTags.push({ label: "Discreet", icon: <BoxIcon />, color: "border-amber-400/50 text-amber-300" });
  if (hasFreeShipping) featureTags.push({ label: "FREE UK Delivery", icon: <TagIcon />, color: "border-emerald-500/50 text-emerald-300" });

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderNav />

      {/* HERO SECTION - Dark gradient like PeptideSupermarket style */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        {/* BREADCRUMB on dark */}
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/vendors" className="hover:text-blue-400 transition-colors">Suppliers</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-300">{vendor.name}</span>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-8">
          {/* SUPPLIER CARD - dark hero card */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Supplier Logo - white rounded square */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white shadow-lg">
                <img src={`/images/vendors/${vendor.slug}.png`} alt={vendor.name} className="w-16 h-16 md:w-[72px] md:h-[72px] object-contain" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Supplier type tag */}
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  UK PEPTIDE SUPPLIER
                </div>

                {/* Supplier name + verified check */}
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{vendor.name}</h1>
                  {vendor.verified && (
                    <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="22" fill="#f59e0b" />
                      <path d="M14 24l7 7 13-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-300 mb-3">
                  <span className="flex items-center gap-1">
                    <StarIcon />
                    <span className="text-amber-400 font-medium">{vendor.rating}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BoxIcon />
                    <span>{vendorCompounds.length} products</span>
                  </span>
                  {vendor.founded && <span>Since {vendor.founded}</span>}
                  <span className="text-emerald-400 font-semibold text-base">From £{minPrice.toFixed(2)}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4 max-w-2xl">{vendor.description}</p>

                {/* Feature tags with icons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featureTags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium bg-white/5 backdrop-blur-sm border rounded-full px-3 py-1.5 ${tag.color}`}
                    >
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                  {/* Always show some default tags if none matched */}
                  {featureTags.length === 0 && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium border-blue-300 text-blue-200 bg-white/5 backdrop-blur-sm border rounded-full px-3 py-1.5">
                        <TruckIcon /> UK Dispatch
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium border-emerald-500/50 text-emerald-300 bg-white/5 backdrop-blur-sm border rounded-full px-3 py-1.5">
                        <CheckCircleIcon /> UK Based
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium border-amber-400/50 text-amber-300 bg-white/5 backdrop-blur-sm border rounded-full px-3 py-1.5">
                        <ShieldIcon /> Verified
                      </span>
                    </>
                  )}
                </div>

                {/* CTA Button - ViralPeps blue */}
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
                >
                  <LightningIcon />
                  Visit {vendor.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* INFO STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/60">
              {[
                { label: "Shipping", value: vendor.shipping?.join(", ") || "N/A" },
                { label: "Payment", value: vendor.payment?.join(", ") || "N/A" },
                { label: "Categories", value: vendor.categories?.slice(0, 3).join(", ") + (vendor.categories && vendor.categories.length > 3 ? ` +${vendor.categories.length - 3} more` : "") || "N/A" },
                { label: "Last Tested", value: vendor.lastTested || "N/A" },
              ].map((info) => (
                <div key={info.label} className="bg-white/5 rounded-xl p-3 border border-slate-700/30">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5 font-semibold">{info.label}</p>
                  <p className="text-xs font-medium text-slate-200">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Prices note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Prices last updated: daily
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS LIST SECTION — Card layout */}
      <div className="max-w-6xl mx-auto px-4 pb-12 -mt-2">
        <div className="space-y-3 md:space-y-4">
          {vendorCompounds.map((c) => {
            const source = c.sources.find((s) => s.vendor === vendor.name);
            const price = source ? parseFloat(source.price.replace(/[£$€,]/g, "")) : 0;
            const options = (source as any)?.options as { size: string; price: string }[] | undefined;
            const variantCount = options?.length || 0;

            return (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  {/* Top row: Image + Info */}
                  <div className="flex flex-row items-center gap-2.5 p-3 pb-1 md:p-4 md:pb-1.5">
                    <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-slate-50 border border-slate-100">
                      <ProductImage vendorSlug={vendor.slug} compoundSlug={c.slug} compoundName={c.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <h3 className="font-semibold text-slate-900 text-base md:text-lg">{c.name}</h3>
                        {variantCount > 0 && (
                          <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                            {variantCount} {variantCount === 1 ? "size" : "sizes"}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                        <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">{c.category.replace(/-/g, " ")}</span>
                        {source?.inStock !== false && (
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            In Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Variant pills */}
                  {options && options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 px-3 md:px-4 pb-1">
                      {options.map((opt) => (
                        <span key={opt.size} className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                          {opt.size} — {opt.price}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom row: Price + Actions */}
                  <div className="flex flex-row items-center justify-between px-3 pb-3 md:px-4 md:pb-4 pt-2 border-t border-slate-100">
                    <div className="text-lg md:text-2xl font-bold text-emerald-600">{source?.price}</div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/compounds/${(c as any)?.compareSlug || c.slug}`}
                        className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2 whitespace-nowrap"
                      >
                        Compare {((c as any)?.compareSlug ? compoundBySlug[(c as any).compareSlug]?.sources?.length || c.sources.length : c.sources.length)} suppliers →
                      </Link>
                      <a
                        href={source?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                      >
                        View Deal →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
