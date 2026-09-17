import { notFound } from "next/navigation";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BreadcrumbList from "@/components/BreadcrumbList";
import RetaPriceTable from "@/components/RetaPriceTable";
import {
  getRetaRows,
  getRetaStats,
  sortByPrice,
  sortByPricePerMg,
  sortByTrust,
  RETA_SPOKES,
} from "@/data/retatrutide-silo";
import { spokes, getSpoke, type Spoke } from "@/data/retatrutide-spokes";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return spokes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spoke = getSpoke(slug);
  if (!spoke) return {};
  return {
    title: spoke.title,
    description: spoke.description,
    alternates: {
      canonical: `https://www.viralpeps.co.uk/compound-guides/${slug}`,
    },
    openGraph: {
      title: spoke.title,
      description: spoke.description,
      type: "article",
    },
  };
}

/** Convert inline markdown links [text](url) to <a> tags; bare text otherwise. */
function renderBody(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/);
  return parts.map((part, i) => {
    const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
        >
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function BodyText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="text-slate-600 leading-relaxed text-[15px] mb-4 last:mb-0">
          {renderBody(p)}
        </p>
      ))}
    </>
  );
}

/** Rows + badge key for a given spoke's table mode. */
function tableData(spoke: Spoke) {
  const all = getRetaRows();
  let sorted = sortByPrice(all);
  let bestKey: string | null = sorted[0]?.key ?? null;
  if (spoke.tableMode === "perMg") {
    sorted = sortByPricePerMg(all);
    bestKey = sorted[0]?.key ?? null;
  } else if (spoke.tableMode === "trust") {
    sorted = sortByTrust(all);
    bestKey = null;
  }
  const rows = spoke.rowLimit > 0 ? sorted.slice(0, spoke.rowLimit) : sorted;
  return { rows, bestKey };
}

export default async function CompoundGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spoke = getSpoke(slug);
  if (!spoke) notFound();

  const stats = getRetaStats();
  const { rows, bestKey } = tableData(spoke);
  const siblings = RETA_SPOKES.filter((s) => s.slug !== slug);

  // FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spoke.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.viralpeps.co.uk/compound-guides/${slug}#article`,
        headline: spoke.h1,
        description: spoke.description,
        author: { "@type": "Organization", name: "ViralPeps" },
        publisher: { "@type": "Organization", name: "ViralPeps" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.viralpeps.co.uk/compound-guides/${slug}`,
        },
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.viralpeps.co.uk/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Retatrutide",
            item: "https://www.viralpeps.co.uk/compounds/retatrutide",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: spoke.h1,
            item: `https://www.viralpeps.co.uk/compound-guides/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <BreadcrumbList
        items={[
          { label: "Home", href: "/" },
          { label: "Retatrutide", href: "/compounds/retatrutide" },
          { label: spoke.h1 },
        ]}
      />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#162d50] to-[#0f1f38] text-white">
        <div className="max-w-[76rem] mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href="/compounds/retatrutide"
              className="text-[10px] font-bold text-blue-200 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              ← Retatrutide Hub
            </Link>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest">
              Buying Guide
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{spoke.h1}</h1>
          <p className="text-blue-200 text-sm md:text-base max-w-3xl leading-relaxed">
            Independent comparison across {stats.suppliers} verified UK suppliers · {stats.products} tracked
            listings · prices refreshed weekly
          </p>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            For educational and research reference only. Not medical advice. Retatrutide is not for human
            consumption — all peptides referenced are for in-vitro research use only.
          </p>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="max-w-[76rem] mx-auto px-4 py-10">
        {/* Intro */}
        <div className="max-w-3xl mb-10">
          {spoke.intro.map((p, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-[15px] mb-4 last:mb-0">
              {renderBody(p)}
            </p>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Suppliers", value: String(stats.suppliers) },
            { label: "Lowest price", value: `£${stats.minPrice.toFixed(2)}` },
            {
              label: "Best per mg",
              value: stats.bestPerMg !== null ? `£${stats.bestPerMg.toFixed(2)}` : "—",
            },
            { label: "Pack sizes", value: String(stats.packs) },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {s.label}
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── LIVE PRICE TABLE (shared component) ── */}
        <div id="price-table" className="mb-12">
          <RetaPriceTable
            rows={rows}
            heading={spoke.tableHeading}
            bestKey={bestKey}
            supplierCount={stats.suppliers}
            showTrust={spoke.tableMode === "trust"}
          />
        </div>

        {/* ── SECTIONS ── */}
        <div className="max-w-3xl">
          {spoke.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
              <BodyText text={section.body} />
              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-[15px] text-slate-600 leading-relaxed">
                      <span className="text-emerald-500 font-bold flex-none mt-0.5">✓</span>
                      <span>{renderBody(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="overflow-x-auto mt-5">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        {section.table.header.map((h, i) => (
                          <th
                            key={i}
                            className="text-left px-4 py-2.5 font-semibold text-slate-700 text-[13px]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-slate-100">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-2.5 text-slate-600 ${ci === 0 ? "font-medium text-slate-800 whitespace-nowrap" : ""}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="my-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-6 py-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Compare all {stats.suppliers} retatrutide suppliers
          </h2>
          <p className="text-blue-100 text-sm mb-5">
            Live pricing, pack sizes and per-mg cost on the Retatrutide hub page.
          </p>
          <Link
            href="/compounds/retatrutide"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Retatrutide price comparison →
          </Link>
        </div>

        {/* ── RELATED GUIDES ── */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Related Retatrutide Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/compound-guides/${s.slug}`}
                className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="text-[11px] font-extrabold text-slate-300 mb-1.5">{s.num}</div>
                <div className="text-[14px] font-bold text-slate-900 leading-snug mb-1">{s.title}</div>
                <div className="text-[12.5px] text-slate-500 leading-snug">{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            {spoke.h1} — Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {spoke.faq.map((f) => (
              <details
                key={f.question}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden open:shadow-sm transition-shadow"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-slate-900 pr-4">{f.question}</span>
                  <svg
                    className="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── SOURCES ── */}
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Sources</h2>
          <ul className="space-y-2">
            {spoke.sources.map((s) => (
              <li key={s.url} className="text-[13.5px] text-slate-500 leading-relaxed">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-slate-400 mt-5 leading-relaxed">
            Prices are collected from supplier listing pages and refreshed weekly. ViralPeps does not sell
            peptides. All compounds referenced are for in-vitro research use only and are not for human
            consumption.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
