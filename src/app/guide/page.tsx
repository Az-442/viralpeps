import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Peptide Research Guide",
  description:
    "A beginner's guide to research peptides — what they are, how to read COAs, reconstitution, pricing, and how to use ViralPeps to compare UK suppliers.",
};

const sections = [
  {
    num: 1,
    title: "What Are Research Peptides?",
    desc: "Peptides are short chains of amino acids — the building blocks of proteins. In a research setting, they are studied for their roles in tissue repair, metabolism, cellular signalling, and more.",
  },
  {
    num: 2,
    title: "The Research Peptide Market",
    desc: "Quality varies between suppliers. Third-party testing, transparency, and track record are the signals that separate credible suppliers from risky ones.",
  },
  {
    num: 3,
    title: "Reading a Certificate of Analysis",
    desc: "A COA is a lab report describing a batch's purity and identity. Look for named third-party labs, HPLC results, recent dates, and batch numbers.",
  },
  {
    num: 4,
    title: "Reconstitution & Lab Handling",
    desc: "Most peptides arrive lyophilised. Reconstitute with bacteriostatic water. Use our calculator to get the concentration right for your research.",
  },
  {
    num: 5,
    title: "Understanding Peptide Pricing",
    desc: "The only honest way to compare is price per milligram, not vial price. We calculate this for every listing automatically.",
  },
  {
    num: 6,
    title: "Using ViralPeps",
    desc: "Search any compound to see all UK suppliers ranked by price per mg. Compare supplier profiles, check COA policies, and find the best deal.",
  },
  {
    num: 7,
    title: "Glossary of Terms",
    desc: "Key terms explained: lyophilised, reconstitution, HPLC, COA, price per mg, batch, and more.",
  },
  {
    num: 8,
    title: "Research Use Only",
    desc: "All compounds listed on ViralPeps are for in-vitro laboratory research only. Nothing here is medical advice.",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/guide" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="max-w-[76rem] mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-300 text-xs font-medium">
              Beginner&apos;s Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            The Research Peptide{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Guide
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Everything you need to understand research peptides, use this site
            effectively, and make informed sourcing decisions. No prior
            knowledge required.
          </p>
        </div>
      </section>

      {/* What you'll learn */}
      <div className="max-w-[76rem] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sections.map((s) => (
            <a
              key={s.num}
              href={`#section-${s.num}`}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">
                {s.num}
              </span>
              <h3 className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.num} id={`section-${s.num}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded-full px-2.5 py-1">
                  {s.num}
                </span>
                <h2 className="text-xl font-bold text-gray-900">
                  {s.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {s.desc}
              </p>
              <p className="text-gray-400 text-xs mt-2 italic">
                Full content coming soon.
              </p>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to compare prices?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            Search any compound and see every UK supplier ranked by price per
            milligram.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/compounds"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Compounds &rarr;
            </Link>
            <Link
              href="/research"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Research Library
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
