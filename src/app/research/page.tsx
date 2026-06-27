import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Peptide Research Library & Guides | ViralPeps UK",
  description: "Research guides, compound information, and educational resources about research peptides.",
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Research <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Guides and educational resources for peptide research.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-white border border-black rounded-xl p-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="6" width="20" height="36" rx="4" fill="#e2e8f0" />
            <rect x="16" y="10" width="16" height="28" rx="3" fill="#f8fafc" />
            <rect x="14" y="4" width="20" height="6" rx="3" fill="#cbd5e1" />
            <rect x="20" y="2" width="8" height="12" rx="2" fill="#94a3b8" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-sm text-black max-w-md mx-auto mb-6">
            We&apos;re building a comprehensive research library with detailed guides on peptide research protocols, safety, and best practices.
          </p>
          <Link href="/compounds" className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            Browse Compounds &rarr;
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
