import { notFound } from "next/navigation";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { guides, ResearchArticle } from "@/data/research";
import researchContent from "@/data/research-content";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title}`,
    description: guide.desc,
    alternates: {
      canonical: `https://www.viralpeps.co.uk/research/${slug}`,
    },
    openGraph: {
      title: `${guide.title}`,
      description: guide.desc,
    },
  };
}

/** Convert inline markdown links [text](url) to <a> tags */
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

function renderBodyText(text: string) {
  return text.split("\n\n").map((p: string, i: number) => (
    <p key={i} className="text-gray-700 leading-relaxed mb-4 text-[15px]">
      {renderBody(p)}
    </p>
  ));
}

function SectionRenderer({ section }: { section: any }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {section.title}
      </h2>
      {renderBodyText(section.body)}

      {/* Table */}
      {section.table && (
        <div className="overflow-x-auto mb-6 mt-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {section.table.header.map((h: string, i: number) => (
                  <th
                    key={i}
                    className="text-left px-4 py-2.5 font-semibold text-gray-700 text-[13px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row: string[], ri: number) => (
                <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50/50">
                  {row.map((cell: string, ci: number) => (
                    <td
                      key={ci}
                      className={`px-4 py-2.5 text-gray-600 ${ci === 0 ? "font-medium text-gray-800 whitespace-nowrap" : ""}`}
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

      {section.subsections && (
        <div className="space-y-5 mt-6">
          {section.subsections.map((sub: any, i: number) => (
            <div key={i} className="pl-5 border-l-2 border-teal-200">
              <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
                {sub.title}
              </h3>
              {sub.body.split("\n\n").map((p: string, j: number) => (
                <p key={j} className="text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0">
                  {renderBody(p)}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** Randomly pick N articles, excluding the current one */
function getRelatedArticles(currentSlug: string, _compoundSlug?: string, count = 2): ResearchArticle[] {
  let pool = _compoundSlug
    ? guides.filter((g) => g.slug !== currentSlug)
    : guides.filter((g) => g.slug !== currentSlug);
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const content = researchContent[slug];

  if (!guide || !content) {
    notFound();
  }

  const related = getRelatedArticles(slug, content.compoundSlug);

  // Build article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.viralpeps.co.uk/research/${slug}#article`,
        headline: guide.title,
        description: guide.desc,
        image: guide.image ? `https://www.viralpeps.co.uk/images/guides/${guide.image}.png` : undefined,
        author: { "@type": "Organization", name: "ViralPeps" },
        publisher: { "@type": "Organization", name: "ViralPeps" },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.viralpeps.co.uk/research/${slug}` },
        inLanguage: "en-GB",
      },
      ...(content.faq && content.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://www.viralpeps.co.uk/research/${slug}#faq`,
              mainEntity: content.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/research" />

      {/* Article + FAQPage + BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...articleSchema["@graph"] || [],
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.viralpeps.co.uk/" },
                { "@type": "ListItem", position: 2, name: "Research", item: "https://www.viralpeps.co.uk/research" },
                { "@type": "ListItem", position: 3, name: guide.title, item: `https://www.viralpeps.co.uk/research/${slug}` },
              ],
            },
          ],
        }) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/research"
            className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block"
          >
            &larr; Back to Research Library
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-white bg-teal-600 px-3 py-1 rounded-full uppercase tracking-wider">
              {guide.category}
            </span>
            {guide.compound && content.compoundSlug && (
              <Link
                href={`/compounds/${content.compoundSlug}`}
                className="text-xs text-teal-300 hover:text-teal-200"
              >
                {guide.compound}
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {guide.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            {guide.desc}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {guide.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <img
              src={`/images/guides/${guide.image}.png`}
              alt={guide.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Pull Quote */}
        {content.pullQuote && (
          <aside className="mb-10 py-6 px-6 bg-teal-50 rounded-xl border-l-4 border-teal-500">
            <p className="text-teal-900 text-lg leading-relaxed italic font-medium">
              &ldquo;{content.pullQuote}&rdquo;
            </p>
          </aside>
        )}

        {/* Quick Info Table (compound profile) */}
        {content.quickInfo && content.quickInfo.length > 0 && (
          <div className="mb-10 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {content.quickInfo.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2.5 font-semibold text-gray-700 whitespace-nowrap w-44 text-[13px]">
                      {item.label}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 text-[13px]">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sections */}
        <div className="max-w-none">
          {content.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}
        </div>

        {/* === FAQ SECTION (accordion like PeptideGuide) === */}
        {content.faq && content.faq.length > 0 && (
          <section className="mt-12 mb-8" id="faq">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {content.faq.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                    {item.question}
                    <svg
                      className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* === BIG COMPARE PRICES BANNER (like PS) === */}
        {content.compoundSlug && (
          <div className="mt-12 mb-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Compare {guide.compound || "Peptide"} Prices
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Live prices from every UK supplier — side by side so you find the best deal.
            </p>
            <Link
              href={`/compounds/${content.compoundSlug}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              View All Prices &rarr;
            </Link>
          </div>
        )}

        {/* === RELATED ARTICLES === */}
        {related.length > 0 && (
          <div className="mt-12 pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Related Articles</h2>
                <p className="text-gray-500 text-sm mt-1">More from the ViralPeps research library</p>
              </div>
              <Link
                href="/research"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
              >
                View all guides &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((article: ResearchArticle) => (
                <Link
                  key={article.slug}
                  href={`/research/${article.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="aspect-[16/7] overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-100">
                    {article.image ? (
                      <img
                        src={`/images/guides/${article.image}.png`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        ViralPeps Research
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {article.minutes || 5} min read
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {article.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {content.references && content.references.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              References
            </h2>
            <ol className="space-y-2">
              {content.references.map((ref, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-500 leading-relaxed"
                >
                  {ref}
                </li>
              ))}
            </ol>
            <p className="text-xs text-gray-400 mt-6 italic">
              All content is for educational and research reference purposes
              only. It does not constitute medical advice, diagnosis, or
              treatment recommendations. All peptides are for in-vitro
              research use only.
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
