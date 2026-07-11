import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";
import CompoundPageClient from "./CompoundPageClient";
import { guides, ResearchArticle } from "@/data/research";

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
    title: `${compound.name} Price Comparison — Compare UK Suppliers | ViralPeps`,
    description: `Compare ${compound.name} prices from ${compound.sources.length} verified UK suppliers. From £${minPrice.toFixed(2)}. Research info, CAS ${compound.cas}, purity ${compound.purity}, and half-life ${compound.halfLife}.`,
    openGraph: {
      title: `${compound.name} — Compare UK Prices | ViralPeps`,
      description: `Compare ${compound.name} prices from ${compound.sources.length} UK suppliers. From £${minPrice.toFixed(2)}.`,
    },
  };
}

// Category data for accent colours (matching compounds page)
const categoryAccents: Record<string, { border: string; bg: string; badge: string; icon: string }> = {
  "glp-1-agonists":     { border: "border-purple-300", bg: "bg-purple-100", badge: "bg-purple-200 text-purple-800", icon: "#9333ea" },
  "thymosin-bpc":       { border: "border-emerald-300", bg: "bg-emerald-100", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "tb-500":             { border: "border-emerald-300", bg: "bg-emerald-100", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "peptide-fragments":  { border: "border-emerald-300", bg: "bg-emerald-100", badge: "bg-emerald-200 text-emerald-800", icon: "#059669" },
  "growth-hormone":     { border: "border-blue-300", bg: "bg-blue-100", badge: "bg-blue-200 text-blue-800", icon: "#2563eb" },
  "anti-aging":         { border: "border-indigo-300", bg: "bg-indigo-100", badge: "bg-indigo-200 text-indigo-800", icon: "#6366f1" },
  "immunity-peptides":  { border: "border-cyan-300", bg: "bg-cyan-100", badge: "bg-cyan-200 text-cyan-800", icon: "#06b6d4" },
  "tanning-libido":     { border: "border-rose-300", bg: "bg-rose-100", badge: "bg-rose-200 text-rose-800", icon: "#e11d48" },
  "peptide-blends":     { border: "border-orange-300", bg: "bg-orange-100", badge: "bg-orange-200 text-orange-800", icon: "#ea580c" },
  cognitive:            { border: "border-violet-300", bg: "bg-violet-100", badge: "bg-violet-200 text-violet-800", icon: "#8b5cf6" },
  "aod-fragments":      { border: "border-pink-300", bg: "bg-pink-100", badge: "bg-pink-200 text-pink-800", icon: "#ec4899" },
};

function getAccent(cat: string) {
  return categoryAccents[cat] || { border: "border-blue-300", bg: "bg-blue-100", badge: "bg-blue-200 text-blue-800", icon: "#2563eb" };
}

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

export default async function CompoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) notFound();
  
  // Handle redirects for merged/duplicate compounds
  if ((compound as any).redirect) {
    redirect(`/compounds/${(compound as any).redirect}`);
  }

  const minPrice = Math.min(
    ...compound.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
  );
  const maxPrice = Math.max(
    ...compound.sources.map((s) => parseFloat(s.price.replace(/[£$€,]/g, "")) || 0)
  );
  const avgPrice = compound.sources.reduce((sum, s) => {
    return sum + (parseFloat(s.price.replace(/[£$€,]/g, "")) || 0);
  }, 0) / compound.sources.length;

  // Sort vendors: featured first (by flagged vendor), then verified, then by price
  const sortedSources = [...compound.sources].sort((a, b) => {
    const va = vendors.find((v) => v.name === a.vendor);
    const vb = vendors.find((v) => v.name === b.vendor);
    const aFeatured = va && (va as any).featured ? 0 : 1;
    const bFeatured = vb && (vb as any).featured ? 0 : 1;
    if (aFeatured !== bFeatured) return aFeatured - bFeatured;
    const aVerified = va?.verified ? 0 : 1;
    const bVerified = vb?.verified ? 0 : 1;
    if (aVerified !== bVerified) return aVerified - bVerified;
    const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
    const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
    return pa - pb;
  });

  // Featured supplier = source from a paid featured vendor, or random if none paid
  const featuredVendor = vendors.find((v) => (v as any).featured === true);
  const featured = featuredVendor
    ? sortedSources.find((s) => s.vendor === featuredVendor.name) || sortedSources[0]
    : sortedSources.length > 0
      ? (() => {
          const random = Math.floor(Math.random() * sortedSources.length);
          return sortedSources[random];
        })()
      : undefined;
  // Find the vendor data (paid or random)
  const featuredVendorData = featuredVendor || (featured ? vendors.find(v => v.name === featured.vendor) : undefined);
  const accent = getAccent(compound.category || "");
  const categoryLabel = (compound.category || "").replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

  // Count unique suppliers (not total product entries) — before FAQ uses it
  const uniqueSuppliers = new Set(compound.sources.map((s) => s.vendor)).size;
  const totalProducts = compound.sources.length;

  // Build FAQ schema
  const faqEntries = [
    { q: `What is ${compound.name}?`, a: compound.description || '' },
    { q: `What is the CAS number for ${compound.name}?`, a: `The CAS registry number for ${compound.name} is ${compound.cas || ''}.` },
    { q: `What is the half-life of ${compound.name}?`, a: `${compound.name} has an approximate half-life of ${compound.halfLife || ''}.` },
    { q: `Where can I buy ${compound.name} in the UK?`, a: `${compound.name} is available from ${uniqueSuppliers} UK suppliers on ViralPeps, with prices starting from £${minPrice.toFixed(2)}. Compare all suppliers above.` },
  ];
  if (compound.faq && Array.isArray(compound.faq)) {
    compound.faq.forEach((f: { question: string; answer: string }) => {
      if (f?.question && f?.answer) {
        faqEntries.push({ q: f.question, a: f.answer });
      }
    });
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Collect unique vial sizes from sources
  const allDosages = [...new Set(
    compound.sources.map((s: any) => (s as any).dosage || "").filter(Boolean)
  )].sort((a, b) => {
    const ma = parseInt(a.replace(/[^0-9]/g, ""));
    const mb = parseInt(b.replace(/[^0-9]/g, ""));
    return ma - mb;
  });

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-1.5 text-gray-300">›</span>
          <Link href="/compounds" className="hover:text-blue-600 transition-colors">Peptides</Link>
          <span className="mx-1.5 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">{compound.name}</span>
        </div>
      </div>

      {/* ===== HERO BANNER ===== */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#162d50] to-[#0f1f38] text-white">
        <div className="max-w-[76rem] mx-auto px-4 py-10 md:py-16 lg:py-20">
          {/* Desktop: flex row with left content + right stats pill box */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            {/* Left: Badges, title, subtitle, benefit pills */}
            <div className="flex-1 min-w-0">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  LIVE PRICE COMPARISON
                </span>
                <span className={`text-[10px] font-bold ${accent.badge.replace('text-', 'text-').replace('bg-', 'bg-')} px-2 py-1 rounded-full uppercase tracking-wider`}>
                  {categoryLabel}
                </span>
              </div>

              {/* Title + subtitle */}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                {compound.name} Price Comparison
              </h1>
              <p className="text-blue-200 text-sm md:text-base max-w-2xl leading-relaxed mb-5">
                Compare live {compound.name} prices from every UK supplier — side-by-side in seconds so you never overpay.
              </p>

              {/* Benefit pills */}
              {compound.researchAreas && compound.researchAreas.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {compound.researchAreas.slice(0, 6).map((area: string) => (
                    <span key={area} className="inline-flex items-center gap-1.5 text-xs text-blue-100 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                      <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: compact square pill box on the right */}
            <div className="hidden md:block md:flex-shrink-0 md:self-center">
              <div className="bg-blue-900/20 border border-blue-400/20 rounded-2xl p-5 w-56">
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <div className="text-center">
                    <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Suppliers</p>
                    <p className="text-2xl font-bold text-white mt-0.5">{uniqueSuppliers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">From</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-0.5">&pound;{minPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Average</p>
                    <p className="text-2xl font-bold text-white mt-0.5">&pound;{avgPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Products</p>
                    <p className="text-2xl font-bold text-white mt-0.5">{totalProducts}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-400/15 text-center">
                  <a href="#pricing-table" className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm">
                    See all prices
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ===== MOBILE: 3-box symmetric row matching reference site ===== */}
          <div className="flex md:hidden items-stretch gap-2 mt-4">
            <div className="flex-1 bg-white/10 border border-white/15 rounded-xl p-3 text-center">
              <p className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Suppliers</p>
              <p className="text-xl font-bold text-white mt-0.5">{uniqueSuppliers}</p>
            </div>
            <div className="flex-1 bg-white/10 border border-white/15 rounded-xl p-3 text-center">
              <p className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">From</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">&pound;{minPrice.toFixed(2)}</p>
            </div>
            <a href="#pricing-table-mobile" className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl p-3 text-center flex flex-col items-center justify-center transition-colors">
              <p className="text-[10px] text-white/80 uppercase tracking-wider font-semibold">Prices</p>
              <svg className="w-5 h-5 text-white mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            All content is for educational and research reference purposes only.
            It does not constitute medical advice, diagnosis, or treatment
            recommendations. All peptides are for in-vitro research use only.
          </p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-[76rem] mx-auto px-4 pt-6 pb-2">
        {/* FEATURED SUPPLIER */}
        {featured && featuredVendorData && (
          <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50/60 rounded-xl p-8 mb-8 overflow-hidden shadow-[0_0_35px_rgba(217,119,6,0.3)] border-2 border-transparent bg-clip-padding">
            {/* Animated glow border */}
            <div className="absolute inset-0 rounded-xl" style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706, #f59e0b, #fbbf24, #f59e0b)',
              backgroundSize: '400% 400%',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'gradientShift 3s ease infinite'
            }} />
            {/* Thicker corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-[3px] border-l-[3px] border-amber-400 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-[3px] border-r-[3px] border-amber-400 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[3px] border-l-[3px] border-amber-400 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[3px] border-r-[3px] border-amber-400 rounded-br-lg" />
            <style>{`@keyframes gradientShift { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }`}</style>
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#d97706">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Featured Supplier</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200">
                  <ProductImage vendorSlug={featuredVendorData.slug} compoundSlug={slug} compoundName={compound?.name || featuredVendorData.name} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{featuredVendorData.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={featuredVendorData.rating} />
                    <span className="text-sm text-gray-500">{featuredVendorData.rating}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{featuredVendorData.country}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {featuredVendorData.verified && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    Lab Tested
                  </span>
                )}
                {featured.inStock !== false && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    In Stock
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{featured.price}</div>
                <p className="text-xs text-gray-400">FREE delivery</p>
                <a
                        href={`/go/${featuredVendorData?.slug || featured.vendor.toLowerCase().replace(/\s+/g, '-')}/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-lg transition-colors shadow-md"
                >
                  View Deal
                </a>
              </div>
            </div>
            {featuredVendorData.highlights && featuredVendorData.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {featuredVendorData.highlights.slice(0, 3).map((h: string) => (
                  <span key={h} className="text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-full">{h}</span>
                ))}
              </div>
            )}
          </div>
        )}

      </div>{/* END max-w-[76rem] */}

      {/* ===== DYNAMIC STATS BAR (full-width) ===== */}
      <div className="w-full bg-gradient-to-r from-[#0b1a2e] via-[#162d50] to-[#0f1f38] shadow-lg mb-6">
        <div className="max-w-[76rem] mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{uniqueSuppliers}</p>
              <p className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Suppliers</p>
            </div>
            <div className="w-px h-10 bg-blue-800/50" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{allDosages.length}</p>
              <p className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Dosages</p>
            </div>
            <div className="w-px h-10 bg-blue-800/50" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
              <p className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CLIENT CONTENT ===== */}
      <div className="max-w-[76rem] mx-auto px-4 py-6 pb-20">
        <CompoundPageClient
          compound={JSON.parse(JSON.stringify(compound))}
          vendors={JSON.parse(JSON.stringify(vendors))}
          sortedSources={JSON.parse(JSON.stringify(sortedSources))}
          minPrice={minPrice}
          avgPrice={avgPrice}
          accent={accent}
          allDosages={allDosages}
          faqEntries={faqEntries}
          uniqueSuppliers={uniqueSuppliers}
          totalProducts={totalProducts}
        />
      </div>

      {/* ===== RESEARCH LIBRARY — compound-specific only ===== */}
      {(() => {
        const compoundArticles = guides.filter(g =>
          (g as any).compound?.toLowerCase() === compound.name.toLowerCase()
        );
        if (compoundArticles.length === 0) return null;
        return (
          <div className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-[76rem] mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Research Library</h2>
                  <p className="text-gray-500 text-sm mt-1">{compound.name} research &amp; guides</p>
                </div>
                <Link href="/research" className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors">
                  View all {compoundArticles.length} &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {compoundArticles.map((article: ResearchArticle) => (
                  <Link
                    key={article.slug}
                    href={`/research/${article.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    {/* Photo-ready — replace gradient with <img> when photorealistic images are available */}
                    <div className="aspect-[16/7] overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-100">
                      <img
                        src={article.image ? `/images/guides/${article.image}.png` : ''}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{article.category}</span>
                        <span className="text-[10px] text-gray-400">{article.minutes || 5} min read</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">{article.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{article.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
    </div>
  );
}
