import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { PEPTIDE_COUNT, SUPPLIER_COUNT } from "@/data/stats";

export const metadata = {
  title: "About ViralPeps — UK Research Peptide Directory",
  description:
    "ViralPeps is a UK-based research peptide price comparison platform. We track prices from verified UK suppliers to help researchers find the best deals.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/about" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ViralPeps
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            The UK&apos;s independent research peptide price comparison directory.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            What is ViralPeps?
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            ViralPeps is a UK-based price comparison platform for research
            peptides. We track live prices from verified UK suppliers so
            researchers can compare and find the best deals — all in one place.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Why we built it
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            Finding the best price on research peptides used to mean checking
            multiple supplier websites, comparing formats and dosages manually,
            and hoping you didn&apos;t miss a better deal. We built ViralPeps to
            solve that — one search, instant comparison.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
            <li>
              <strong>Browse</strong> — Search our directory of <strong>{PEPTIDE_COUNT}</strong>{" "}
              research compounds across <strong>{SUPPLIER_COUNT}</strong> verified UK suppliers
            </li>
            <li>
              <strong>Compare</strong> — See prices from every verified UK
              supplier side by side
            </li>
            <li>
              <strong>Save</strong> — Find the cheapest option and visit the
              supplier directly
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            What we don&apos;t do
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            ViralPeps is a comparison platform only. We do not manufacture,
            sell, or distribute any peptides. Prices are checked daily and all
            supplier listings are independently verified.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Have a question?
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Check our{" "}
            <Link href="/faq" className="text-blue-600 hover:underline font-medium">
              FAQ page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
