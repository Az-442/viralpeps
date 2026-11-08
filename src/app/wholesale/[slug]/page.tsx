import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { wholesaleCompounds } from "@/lib/wholesale-compounds";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return wholesaleCompounds.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = wholesaleCompounds.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `https://viralpeps.co.uk/wholesale-${c.slug}` },
  };
}

export default async function WholesaleCompoundPage({ params }: Props) {
  const { slug } = await params;
  const c = wholesaleCompounds.find((x) => x.slug === slug);
  if (!c) notFound();

  const pageUrl = `https://www.viralpeps.co.uk/wholesale-${c.slug}`;

  const wholesaleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.viralpeps.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Wholesale", item: "https://www.viralpeps.co.uk/wholesale" },
          { "@type": "ListItem", position: 3, name: `Wholesale ${c.name}`, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Wholesale ${c.name} supply UK`,
        serviceType: `Bulk ${c.name} trade supply`,
        description: c.description,
        url: pageUrl,
        provider: {
          "@type": "Organization",
          name: "ViralPeps",
          url: "https://www.viralpeps.co.uk/",
        },
        areaServed: { "@type": "Country", name: "United Kingdom" },
        audience: {
          "@type": "BusinessAudience",
          name: "UK trade and bulk research buyers",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GBP",
            valueAddedTaxIncluded: false,
            description: "Trade pricing quoted per enquiry. Depends on volume, pack format and order regularity.",
          },
          seller: {
            "@type": "Organization",
            name: "ViralPeps",
            url: "https://www.viralpeps.co.uk/",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wholesaleSchema) }}
      />
      <HeaderNav current="/wholesale" />

      {/* HERO */}
      <section className="bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-amber-300 bg-amber-50">
              <svg className="w-3 h-3 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Trade &amp; Bulk · Research Use Only</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {c.heroLead}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{c.heroAccent}</span>
            </h1>
            <p className="text-gray-600 text-base mb-7 max-w-xl leading-relaxed">{c.heroIntro}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#suppliers" className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white rounded-lg text-sm font-bold hover:opacity-95 transition">Compare trade suppliers</a>
              <Link href="/wholesale" className="px-5 py-3 bg-white border border-black rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">All wholesale suppliers</Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Screened for:</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Held UK stock</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Batch COA</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Stated dispatch</span>
            </div>
          </div>

          <div className="rounded-2xl p-7 text-white bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-0.5">{c.panelTitle}</h2>
                <p className="text-sm text-slate-400">{c.panelSub}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {c.panelStats.map((s) => (
                <div key={s.small} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="text-xl font-extrabold">{s.big}</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">{s.small}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              {c.panelChecks.map((chk) => (
                <span key={chk} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{chk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-[76rem] mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg><span className="text-sm text-black">Screened before listing</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span className="text-sm text-black">Held UK stock</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11H5a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2zM19 3h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg><span className="text-sm text-black">Batch COA required</span></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-10 max-w-[76rem] mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.intro.h2}</h2>
          {c.intro.paras.map((p, i) => (
            <p key={i} className={`text-base text-gray-700 leading-relaxed ${i < c.intro.paras.length - 1 ? "mb-4" : ""}`}>{p}</p>
          ))}
        </div>
      </section>

      {/* SUPPLIERS */}
      <section id="suppliers" className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#08c0e8"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Screened Trade Suppliers</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{c.suppliersH2}</h2>
          <p className="text-sm text-gray-500 mt-1">{c.suppliersBlurb}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <a href="https://unitedpeptides.co.uk/wholesale/" target="_blank" rel="noopener" className="bg-white border-2 border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200 font-extrabold text-xl text-blue-600">UP</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base">United Peptides</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">TrustScore 75</span><span className="text-xs text-gray-500">UK</span></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>Wholesale Verified</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>COA</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Bulk peptides &amp; peptide pens</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">UK research supplier · Trade pricing on request</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5"><span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">View &rarr;</span></div>
            </div>
          </a>
        </div>

        <div className="mt-6 bg-white border border-black rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          <div>
            <p className="text-sm font-semibold text-gray-900">Trade pricing is not published by any supplier on this page.</p>
            <p className="text-sm text-gray-600 mt-0.5">Rates depend on volume, pack format and order regularity, so each supplier quotes per enquiry. ViralPeps does not take a commission on any trade order.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.pricingH2}</h2>
          {c.pricingParas.map((p, i) => (
            <p key={i} className="text-base text-gray-700 leading-relaxed mb-4">{p}</p>
          ))}
          <ul className="space-y-3 mb-4">
            {c.pricingBullets.map((b) => (
              <li key={b.strong} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                <span className="text-base text-gray-700"><strong>{b.strong}</strong> {b.rest}</span>
              </li>
            ))}
          </ul>
          <p className="text-base text-gray-700 leading-relaxed">{c.pricingClose}</p>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.related.map((r) => (
              <Link key={r.href} href={r.href} className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">{r.h3}</h3>
                <p className="text-xs text-gray-500 mt-1.5">{r.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6"><path d="M7 10l5 5 5-5H7z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Wholesale {c.name}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bulk {c.tradeName} &mdash; common questions</h2>
          <div className="space-y-3">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-white border border-black rounded-xl overflow-hidden group">
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none">
                  <span className="text-xs font-bold text-blue-600 flex-shrink-0 w-5">{i + 1}</span>
                  <span className="font-semibold text-gray-900 text-sm flex-1">{f.q}</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 max-w-[76rem] mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Research use only.</strong> All compounds referenced on this page are supplied strictly for laboratory research use only. They are not medicines, not supplements, and not for human or veterinary consumption. Wholesale supply is restricted to trade buyers aged 21 or over. ViralPeps is a comparison and directory service; we do not manufacture, stock or sell these compounds and we take no commission on trade orders.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
