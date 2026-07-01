import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Peptide Research Library & Guides | ViralPeps UK",
  description:
    "Research guides, compound information, and educational resources about research peptides. Dosage calculators, reconstitution guides, and more.",
};

const guides = [
  {
    title: "Peptide Reconstitution Guide",
    desc: "How to properly reconstitute research peptides with bacteriostatic water, including calculations and best practices.",
    icon: "💧",
  },
  {
    title: "Understanding Peptide Purity",
    desc: "What HPLC purity tests mean, why 98%+ matters, and how to read COAs from UK suppliers.",
    icon: "🔬",
  },
  {
    title: "Peptide Storage & Handling",
    desc: "Proper storage temperatures, lyophilized vs reconstituted, and how to avoid degradation.",
    icon: "❄️",
  },
  {
    title: "GLP-1 Research Overview",
    desc: "An introduction to GLP-1 receptor agonists including Tirzepatide and Semaglutide for research purposes.",
    icon: "📋",
  },
  {
    title: "BPC-157 Research Summary",
    desc: "Overview of BPC-157, its research applications, dosing protocols, and current literature.",
    icon: "🧪",
  },
  {
    title: "Choosing a UK Supplier",
    desc: "What to look for when selecting a research peptide supplier in the UK: testing, shipping, and reputation.",
    icon: "🏷️",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/research" />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Research{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Library
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Guides and educational resources for peptide research.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <div
              key={g.title}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-3">{g.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-2">
                {g.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            More guides being added regularly.
          </p>
          <Link
            href="/compounds"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Compounds &rarr;
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
