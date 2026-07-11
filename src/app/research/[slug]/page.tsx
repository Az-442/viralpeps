import { notFound } from "next/navigation";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { guides } from "@/data/research";
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
    title: `${guide.title} | ViralPeps Research Library`,
    description: guide.desc,
    openGraph: {
      title: `${guide.title} | ViralPeps`,
      description: guide.desc,
    },
  };
}

function SectionRenderer({ section }: { section: any }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {section.title}
      </h2>
      {section.body.split("\n\n").map((p: string, i: number) => (
        <p key={i} className="text-gray-700 leading-relaxed mb-4 text-[15px]">
          {p}
        </p>
      ))}
      {section.subsections && (
        <div className="space-y-5 mt-6">
          {section.subsections.map((sub: any, i: number) => (
            <div key={i} className="pl-5 border-l-2 border-teal-200">
              <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
                {sub.title}
              </h3>
              {sub.body.split("\n\n").map((p: string, j: number) => (
                <p key={j} className="text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
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

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/research" />

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
            {guide.compound && (
              <Link
                href={`/compounds/${guide.compound.toLowerCase().replace(/\s+/g, "-")}`}
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

        {/* Sections */}
        <div className="max-w-none">
          {content.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}
        </div>

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
