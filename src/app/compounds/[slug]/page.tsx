import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";
import BreadcrumbList from "@/components/BreadcrumbList";
import CompoundPageClient from "./CompoundPageClient";
import { guides, ResearchArticle } from "@/data/research";
import { getBreadcrumbs } from "@/data/breadcrumbs";
import { JsonLd, compoundProduct } from "@/components/JsonLd";
import RetaSiloTiles from "@/components/RetaSiloTiles";
import SiloTiles from "@/components/SiloTiles";
import { getRetaStats } from "@/data/retatrutide-silo";
import { getTrizStats } from "@/data/tirzepatide-silo";
import { getTrustScore } from "@/lib/trust-score";
import { SILOS } from "@/data/silos";
import RelatedCompounds from "@/components/RelatedCompounds";
import { classForSlug, getRelated } from "@/data/compound-classes";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (compounds as Array<{ slug: string; redirect?: string }>)
    .filter((c) => !c.redirect)
    .map((c) => ({ slug: c.slug }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const compound = compounds.find((c) => c.slug === slug);
  if (!compound) return {};
  const validPrices = compound.sources
    .map((s) => parseFloat(String(s.price).replace(/[£$€,\s]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  const minPrice = validPrices.length ? Math.min(...validPrices) : 0;

  // Keyword-rich SEO title per compound (fallback to generic)
  const seoTitles: Record<string, string> = {
    semaglutide: "Semaglutide UK: Compare Prices & Buy Semaglutide Peptide (Ozempic Analogue)",
    tirzepatide: "Tirzepatide Price UK 2026: Cost Per mg, Kit & Supplier | ViralPeps",
    "bpc-157": "BPC-157 Price UK: Compare Cost Per mg & Suppliers",
    retatrutide: "Retatrutide UK: Compare Prices & Buy Retatrutide Peptide (GLP-1/GIP/Glucagon Triple Agonist)",
    "tb-500": "TB-500 Price UK: Compare Cost Per mg & Verified Suppliers",
    "melanotan-ii": "Melanotan II Price UK: Compare Cost Per mg & Suppliers",
    "cjc-1295": "CJC-1295 UK: Compare Prices & Buy CJC-1295 Peptide (GHRH Analogue with DAC)",
    ipamorelin: "Ipamorelin UK: Compare Prices & Buy Ipamorelin Peptide (GH Secretagogue)",
    "ghk-cu": "GHK-Cu UK: Compare Prices & Buy GHK-Cu Peptide (Copper Tripeptide for Skin & Repair)",
    glutathione: "Glutathione UK: Compare Prices & Buy Glutathione Peptide (Master Antioxidant)",
    "pt-141": "PT-141 (Bremelanotide) UK: Compare Prices & Buy PT-141 Peptide (Libido Research)",
    semax: "Semax UK: Compare Prices & Buy Semax Peptide (Nootropic for Cognitive Research)",
    selank: "Selank Price UK: Compare Cost Per mg & Verified Suppliers",
    "mots-c": "MOTS-c UK: Compare Prices & Buy MOTS-c Peptide (Mitochondrial Peptide)",
    gonadorelin: "Gonadorelin UK: Compare Prices & Buy Gonadorelin Peptide (GnRH Analogue)",
    sermorelin: "Sermorelin UK: Compare Prices & Buy Sermorelin Peptide (GRF 1-29 GH Secretagogue)",
    tesamorelin: "Tesamorelin UK: Compare Prices & Buy Tesamorelin Peptide (GHRH Analogue for Belly Fat & GH)",
    "5-amino-1mq": "5-Amino-1MQ UK: Compare Prices & Buy 5-Amino-1MQ (NNMT Inhibitor)",
    cagrilintide: "Cagrilintide UK: Compare Prices & Buy Cagrilintide Peptide (Amylin Analogue)",
    epitalon: "Epitalon Price UK: Compare Cost Per mg & Suppliers",
    "thymosin-alpha-1": "Thymosin Alpha-1 UK: Compare Prices & Buy Thymosin Alpha-1 Peptide (Immune Support)",
    "ghrp-2": "GHRP-2 Price UK: Compare Cost Per mg & Verified Suppliers",
    oxytocin: "Oxytocin UK: Compare Prices & Buy Oxytocin Peptide (Love & Social Bonding Hormone)",
    "aod-9604": "AOD-9604 UK: Compare Prices & Buy AOD-9604 Peptide (HGH Fragment Fat Loss)",
    kpv: "KPV UK: Compare Prices & Buy KPV Peptide (Anti-Inflammatory Tripeptide)",
    dsip: "DSIP UK: Compare Prices & Buy DSIP Peptide (Delta Sleep-Inducing Peptide)",
    "fragment-176-191": "HGH Fragment 176-191 UK: Compare Prices & Buy Fragment 176-191 Peptide (Fat Loss)",
    "ghrp-6": "GHRP-6 UK: Compare Prices & Buy GHRP-6 Peptide (GH Secretagogue & Appetite)",
    hexarelin: "Hexarelin UK: Compare Prices & Buy Hexarelin Peptide (Potent GH Secretagogue)",
    "igf-1-lr3": "IGF-1 LR3 Price UK: Compare Cost Per mg & Suppliers",
    "igf-1-des": "IGF-1 DES UK: Compare Prices & Buy IGF-1 DES Peptide (Short-Acting IGF)",
    mgf: "MGF UK: Compare Prices & Buy MGF Peptide (Mechano Growth Factor for Muscle Repair)",
    "peg-mgf": "PEG-MGF UK: Compare Prices & Buy PEG-MGF Peptide (Long-Acting Mechano Growth Factor)",
    "snap-8": "SNAP-8 UK: Compare Prices & Buy SNAP-8 Peptide (Argireline Alternative for Wrinkles)",
    "matrixyl-3000": "Matrixyl 3000 UK: Compare Prices & Buy Matrixyl 3000 Peptide (Collagen Stimulator)",
    "pal-ghk": "GHK-Cu / PAL-GHK UK: Compare Prices & Buy Pal-GHK Peptide (Copper Peptide for Skin)",
    "nad-plus": "NAD+ UK: Compare Prices & Buy NAD+ Peptide | Nicotinamide Adenine Dinucleotide",
    "ss-31": "SS-31 UK: Compare Prices & Buy SS-31 Peptide (Mitochondrial Peptide Elamipretide)",
    thymalin: "Thymalin UK: Compare Prices & Buy Thymalin Peptide (Thymus Immune Bioregulator)",
    vip: "VIP UK: Compare Prices & Buy VIP Peptide (Vasoactive Intestinal Peptide)",
    pinealon: "Pinealon UK: Compare Prices & Buy Pinealon Peptide (Synthetic Tripeptide)",
    dihexa: "Dihexa UK: Compare Prices & Buy Dihexa Peptide (Synaptogenesis & Cognition)",
    cerebrolysin: "Cerebrolysin UK: Compare Prices & Buy Cerebrolysin Peptide (Neurotrophic Peptide Complex)",
    survodutide: "Survodutide UK: Compare Prices & Buy Survodutide Peptide (GLP-1/Glucagon Dual Agonist)",
    mazdutide: "Mazdutide UK: Compare Prices & Buy Mazdutide Peptide (GLP-1/Glucagon Dual Agonist)",
    hcg: "HCG Price UK: Compare Cost Per IU, Kit & Supplier",
    "ahk-cu": "AHK-Cu UK: Compare Prices & Buy AHK-Cu Peptide (Copper Peptide for Skin & Repair)",
    "kisspeptin-10": "Kisspeptin-10 UK: Compare Prices & Buy Kisspeptin-10 Peptide (Reproductive Hormone)",
    "follistatin-344": "Follistatin-344 UK: Compare Prices & Buy Follistatin 344 Peptide (Myostatin Inhibitor)",
    "modified-grf-1-29-2mg": "Modified GRF (1-29) UK: Compare Prices & Buy Modified GRF Peptide | GHRH Analogue",
    "cjc-1295-no-dac": "CJC-1295 No DAC UK: Compare Prices & Buy CJC-1295 (No DAC) Peptide (GHRH Analogue)",
    "cjc-1295-ipamorelin-blend": "CJC-1295 + Ipamorelin Blend UK: Compare Prices & Buy CJC/Ipamorelin Peptide Stack",
    "selank-semax-blend": "Selank + Semax Blend UK: Compare Prices & Buy Selank-Semax Peptide Stack",
    "melanotan-i": "Melanotan I UK: Compare Prices & Buy Melanotan 1 Peptide (Tanning Research)",
  };
  const title = seoTitles[slug] || `${compound.name} | UK Prices`;

  // Per-compound meta description overrides (155-160 chars target)
  const seoDescriptions: Record<string, string> = {
    tirzepatide:
      "Compare Tirzepatide prices across 91 verified UK suppliers. Cost per mg, kit sizes, purity and stock levels checked daily. From £14.75, ≥98% purity.",
    "bpc-157":
      "Compare BPC-157 prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source right now.",
    "tb-500":
      "Compare TB-500 prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source right now.",
    "melanotan-ii":
      "Compare Melanotan II prices per mg across all verified UK suppliers. Live stock, purity levels and cost per mg checked daily. Cheapest UK source, fully ranked.",
    epitalon:
      "Compare Epitalon prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source now.",
    "igf-1-lr3":
      "Compare IGF-1 LR3 prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source now.",
    hcg:
      "Compare HCG prices across every verified UK supplier. Live stock, purity levels and cost per IU checked daily. Find the cheapest verified UK source right now.",
    selank:
      "Compare Selank prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source right now.",
    "ghrp-2":
      "Compare GHRP-2 prices per mg across every verified UK supplier. Live stock, purity levels and cost per mg checked daily. Find the cheapest UK source right now.",
  };
  const description =
    seoDescriptions[slug] ||
    (compound.sources.length > 0
      ? `Compare ${compound.name} prices from ${compound.sources.length} verified UK suppliers, from £${minPrice.toFixed(2)}. Purity ${compound.purity}. Checked pricing, updated daily.`
      : `${compound.name}: research peptide specs, purity and CAS info, plus which UK suppliers currently stock it - compared on ViralPeps.`);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.viralpeps.co.uk/compounds/${slug}`,
    },
    openGraph: {
      title,
      description,
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

  const validPrices = compound.sources
    .map((s) => parseFloat(String(s.price).replace(/[£$€,\s]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  const minPrice = validPrices.length ? Math.min(...validPrices) : 0;
  const maxPrice = validPrices.length ? Math.max(...validPrices) : 0;
  const avgPrice = validPrices.length
    ? validPrices.reduce((sum, n) => sum + n, 0) / validPrices.length
    : 0;

  // Human-readable H1 per compound (falls back to a natural template)
  const h1Titles: Record<string, string> = {
    tirzepatide: "Tirzepatide Price UK: Compare Cost Per mg, Kit & Supplier",
    retatrutide: "Retatrutide Price UK: Compare Cost Per mg & Supplier",
    "bpc-157": "BPC-157 Price UK: Compare Cost Per mg, Kit & Supplier",
    hcg: "HCG Price UK: Compare Cost Per IU, Kit & Supplier",
    "igf-1-lr3": "IGF-1 LR3 Price UK: Compare Cost Per mg & Supplier",
    "cjc-1295-ipamorelin":
      "CJC-1295 + Ipamorelin Price UK: Compare Cost Per mg & Supplier",
  };

  // Sort vendors: featured first (by flagged vendor), then verified, then by price
  const isFeaturedOn = (v: any, s: string) =>
    v && (v.featuredCompounds
      ? Array.isArray(v.featuredCompounds) && v.featuredCompounds.includes(s)
      : v.featured === true);

  const sortedSources = [...compound.sources].sort((a, b) => {
    const va = vendors.find((v) => v.name === a.vendor);
    const vb = vendors.find((v) => v.name === b.vendor);
    const aFeatured = isFeaturedOn(va, slug) ? 0 : 1;
    const bFeatured = isFeaturedOn(vb, slug) ? 0 : 1;
    if (aFeatured !== bFeatured) return aFeatured - bFeatured;
    const aVerified = va?.verified ? 0 : 1;
    const bVerified = vb?.verified ? 0 : 1;
    if (aVerified !== bVerified) return aVerified - bVerified;
    const pa = parseFloat(a.price.replace(/[£$€,]/g, ""));
    const pb = parseFloat(b.price.replace(/[£$€,]/g, ""));
    return pa - pb;
  });

  // Featured supplier = source from a paid featured vendor (optionally scoped to
  // specific compounds via `featuredCompounds`), or random if none.
  const featuredVendor = vendors.find((v) => isFeaturedOn(v, slug));
  const featured = featuredVendor
    ? sortedSources.find((s) => s.vendor === featuredVendor.name) || sortedSources[0]
    : sortedSources.length > 0
      ? (() => {
          const random = Math.floor(Math.random() * sortedSources.length);
          return sortedSources[random];
        })()
      : undefined;
  // Optional per-source override so the featured card can lead with a specific
  // dose (e.g. Retatrutide 40mg) while the price table keeps its own ordering.
  // If the vendor has no listing at the override dose, fall back to the real
  // pack name so we never label a 20mg listing as 40mg.
  const featuredDisplay = (() => {
    if (!featured) return featured;
    const fv: any = featuredVendor;
    const override = fv?.featuredDosage;
    const realDose =
      (featured as any).dosage ||
      (featured as any).note ||
      (Array.isArray((featured as any).options) ? (featured as any).options[0]?.size : null);
    if (!override) {
      return realDose ? { ...(featured as any), dosage: realDose } : featured;
    }
    const opts = (featured as any).options;
    const match = Array.isArray(opts)
      ? opts.find((o: any) => o.size === override)
      : null;
    if (match) {
      return { ...(featured as any), price: match.price, dosage: match.size };
    }
    return realDose ? { ...(featured as any), dosage: realDose } : featured;
  })();
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

  // Internal linking: class + 3-4 sibling compounds from the same class
  const compoundClass = classForSlug(slug);
  const relatedCompounds = getRelated(slug, compounds as any[]);

  // Retatrutide silo tile stats — only computed on the retatrutide hub page.
  const retaStats = slug === "retatrutide" ? getRetaStats() : null;
  const trizStats = slug === "tirzepatide" ? getTrizStats() : null;
  const activeSilo = SILOS.find((s) => s.compoundSlug === slug) ?? null;

  // Build Product + AggregateOffer schema (only if ≥1 real, valid vendor price)
  const productSchema = compoundProduct(compound as any);

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {productSchema && <JsonLd data={productSchema} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* BreadcrumbList schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.viralpeps.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Peptides", item: "https://www.viralpeps.co.uk/compounds" },
          { "@type": "ListItem", position: 3, name: compound.name, item: `https://www.viralpeps.co.uk/compounds/${slug}` },
        ],
      })}} />

      {/* BREADCRUMB — data-driven via config map */}
      <BreadcrumbList items={getBreadcrumbs("compounds", compound.name)} />

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
                {h1Titles[slug] || `${compound.name} Price UK: Compare Prices & Suppliers`}
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
        {/* FEATURED SUPPLIER — variant E (full-bleed blue block) */}
        {featured && featuredVendorData && (() => {
          const fsPrice = String(featuredDisplay?.price ?? featured.price);
          const fsNumeric = parseFloat(fsPrice.replace(/[£$€,]/g, "")) || 0;
          const fsDose = (featuredDisplay as any)?.dosage || "";
          const mgMatch = fsDose.match(/([\d.]+)\s*mg/i);
          const fsPerMg = mgMatch && fsNumeric > 0
            ? `£${(fsNumeric / parseFloat(mgMatch[1])).toFixed(2)} / mg`
            : null;
          const fsWas = fsNumeric > 0 ? `£${(fsNumeric * 1.18).toFixed(2)}` : null;
          const fsScore = (() => {
            const name = featuredVendorData?.name || featured.vendor;
            const s = getTrustScore(name).score;
            return s > 0 ? s : null;
          })();
          const fsRoute = `/go/${featuredVendorData?.slug || featured.vendor.toLowerCase().replace(/\s+/g, '-')}/${slug}`;
          return (
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_260px] gap-7 md:gap-9 items-center bg-[linear-gradient(120deg,#0d2145_0%,#173a6b_55%,#1d4ed8_130%)] rounded-[18px] px-7 py-9 md:px-11 md:py-11 mb-8 overflow-hidden shadow-[0_22px_54px_-20px_rgba(13,33,69,0.8)]">
              {/* decorative glows */}
              <div className="absolute -right-[60px] -top-[60px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),transparent_68%)] pointer-events-none" />
              <div className="absolute right-[120px] -bottom-[90px] w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.14),transparent_70%)] pointer-events-none" />

              <span className="absolute top-0 left-0 z-[3] bg-white text-[#0d2145] text-[10.5px] font-black tracking-[0.14em] uppercase px-[19px] py-[8px] rounded-br-[13px]">
                Sponsored
              </span>

              <div className="relative z-[2]">
                <div className="text-[11px] font-extrabold tracking-[0.13em] uppercase text-blue-300 mb-[9px]">
                  Sponsored placement · {uniqueSuppliers} suppliers compared
                </div>
                <h3 className="text-[32px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] mb-1.5">
                  {featuredVendorData.name}
                </h3>
                <p className="text-[15px] font-semibold text-blue-200 mb-4">
                  {compound?.name || featured.vendor}{fsDose ? ` ${fsDose}` : ""}
                  {featuredVendorData.verified ? " · batch COA available" : ""}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featuredVendorData.verified && (
                    <span className="text-[12px] font-bold px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                      Lab Tested
                    </span>
                  )}
                  {featured.inStock !== false && (
                    <span className="text-[12px] font-bold px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                      In Stock
                    </span>
                  )}
                  <span className="text-[12px] font-bold px-3 py-1.5 rounded-md bg-white/[0.11] border border-white/20 text-blue-100">
                    Free UK Delivery
                  </span>
                  {featuredVendorData.rating ? (
                    <span className="text-[12px] font-bold px-3 py-1.5 rounded-md bg-white/[0.11] border border-white/20 text-blue-100">
                      {featuredVendorData.rating.toFixed(1)} ★
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-end justify-between gap-5 border-t border-white/[0.14] pt-5">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-[42px] font-black text-white tracking-[-0.035em] leading-none">
                      <sup className="text-[20px] font-extrabold align-super mr-px">{fsPrice.replace(/[\d.,]/g, "")}</sup>
                      {fsPrice.replace(/[£$€]/g, "").split(".")[0]}
                      <sup className="text-[20px] font-extrabold align-super">.{fsPrice.split(".")[1] || "00"}</sup>
                    </span>
                    {fsWas && <span className="text-[15px] text-blue-300 line-through opacity-75">{fsWas}</span>}
                    {fsPerMg && (
                      <span className="text-[12px] font-bold text-blue-200 bg-white/10 px-3 py-1 rounded">
                        {fsPerMg}
                      </span>
                    )}
                  </div>
                  <a
                    href={fsRoute}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(180deg,#22c55e 0%,#16a34a 100%)",
                      boxShadow:
                        "0 10px 26px -8px rgba(22,163,74,0.7), 0 1px 0 rgba(255,255,255,0.28) inset",
                    }}
                    className="flex items-center justify-center gap-2 min-w-[196px] h-[52px] px-8 rounded-xl text-white text-base font-black tracking-[0.01em] hover:brightness-110 active:brightness-95 transition self-end"
                  >
                    View Deal
                    <span aria-hidden="true" className="text-[17px] leading-none">→</span>
                  </a>
                </div>
              </div>

              <div className="relative z-[2] flex flex-col items-center gap-3">
                <div className="w-[188px] h-[214px] rounded-2xl bg-white flex items-center justify-center shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] overflow-hidden p-3">
                  <ProductImage
                    vendorSlug={featuredVendorData.slug}
                    compoundSlug={slug}
                    compoundName={compound?.name || featuredVendorData.name}
                  />
                </div>
                {fsScore !== null && (
                  <div className="flex items-center gap-2 bg-white/[0.13] border border-white/[0.24] rounded-full px-4 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#34d399">
                      <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z" />
                    </svg>
                    <b className="text-[15px] text-white font-black">{fsScore}</b>
                    <i className="not-italic text-[10px] text-blue-300 font-bold">/100</i>
                  </div>
                )}
              </div>

              <div className="relative z-[2] md:col-span-2 text-[11px] text-blue-300/80 text-center mt-1">
                Paid placement — clearly marked. Rankings and TrustScore unaffected.
              </div>
            </div>
          );
        })()}

      </div>{/* END max-w-[76rem] */}

      {/* ===== RELATED PEPTIDES — class siblings (internal links) ===== */}
      <RelatedCompounds
        currentName={compound.name}
        group={compoundClass}
        related={relatedCompounds}
      />

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

      {/* ===== BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "retatrutide" && retaStats && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <RetaSiloTiles stats={retaStats} />
          </div>
        </div>
      )}

      {/* ===== TIRZEPATIDE BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "tirzepatide" && trizStats && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== SEMAGLUTIDE BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "semaglutide" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== SEMAX BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "semax" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== SELANK BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "selank" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== IPAMORELIN BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "ipamorelin" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== MOTS-C BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "mots-c" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== BPC-157 BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "bpc-157" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== GHK-CU BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "ghk-cu" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== TB-500 BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "tb-500" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== SS-31 BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "ss-31" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== IGF-1 LR3 BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "igf-1-lr3" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== TESAMORELIN BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "tesamorelin" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== NAD+ BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "nad-plus" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== BACTERIOSTATIC WATER BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "bacteriostatic-water" && activeSilo && (
        <div className="bg-indigo-100 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== SERMORELIN BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "sermorelin" && activeSilo && (
        <div className="bg-blue-50 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== AOD-9604 BUYING GUIDES — silo tiles (hub only) ===== */}
      {slug === "aod-9604" && activeSilo && (
        <div className="bg-indigo-100 border-t border-gray-100 py-12">
          <div className="max-w-[76rem] mx-auto px-4">
            <SiloTiles silo={activeSilo} />
          </div>
        </div>
      )}

      {/* ===== RESEARCH LIBRARY — compound-specific only ===== */}
      {(() => {
        const compoundNameLower = compound.name.toLowerCase();
        const compoundSlugLower = (compound.slug || "").toLowerCase();
        const compoundArticles = guides.filter(g => {
          const gName = (g as any).compound?.toLowerCase();
          if (gName && gName === compoundNameLower) return true;
          if (g.tags && g.tags.some(t => t.toLowerCase() === compoundSlugLower || t.toLowerCase() === compoundNameLower)) return true;
          return false;
        });
        if (compoundArticles.length === 0) return null;
        const displayArticles = compoundArticles;
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayArticles.map((article: ResearchArticle) => (
                  <Link
                    key={article.slug}
                    href={`/research/${article.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    {/* Photo-ready — replace gradient with <img> when photorealistic images are available */}
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-100">
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