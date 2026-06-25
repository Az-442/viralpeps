import Link from "next/link";
import compounds from "@/data/compounds.json";

const articles = [
  {
    slug: "what-is-tirzepatide-complete-guide",
    title: "What is Tirzepatide? A Complete Guide to the Dual GIP/GLP-1 Agonist",
    excerpt: "Everything you need to know about Tirzepatide — mechanism of action, clinical trial results, dosage protocols, and how it compares to Semaglutide.",
    category: "Compound Guides",
    author: "Research Team",
    date: "22 Jul 2026",
    readTime: "8 min read",
    compound: "Tirzepatide",
  },
  {
    slug: "bpc-157-guide-healing-peptide",
    title: "BPC-157: The Science Behind the Healing Peptide Everyone's Talking About",
    excerpt: "A deep dive into BPC-157's regenerative properties, mechanisms, and real research applications for tissue repair, gut health, and joint recovery.",
    category: "Compound Guides",
    author: "Research Team",
    date: "18 Jul 2026",
    readTime: "10 min read",
    compound: "BPC-157",
  },
  {
    slug: "semaglutide-vs-tirzepatide",
    title: "Semaglutide vs Tirzepatide: Which GLP-1 Agonist Comes Out on Top?",
    excerpt: "We compare the two leading GLP-1 receptor agonists head-to-head — efficacy, half-life, receptor targets, and real-world outcomes.",
    category: "Comparisons",
    author: "Research Team",
    date: "14 Jul 2026",
    readTime: "7 min read",
    compound: "Semaglutide",
  },
  {
    slug: "peptide-reconstitution-guide",
    title: "How to Reconstitute Peptides: A Step-by-Step Guide for Researchers",
    excerpt: "A practical guide to peptide reconstitution — BAC water volumes, insulin syringe units, storage best practices, and common mistakes to avoid.",
    category: "Guides",
    author: "Research Team",
    date: "10 Jul 2026",
    readTime: "6 min read",
    compound: null,
  },
  {
    slug: "melanotan-2-guide",
    title: "Melanotan II: Mechanism, Dosage Protocols & Research Applications",
    excerpt: "An in-depth look at Melanotan II, the melanocortin agonist studied for skin pigmentation and its effects on melanocortin receptors throughout the body.",
    category: "Compound Guides",
    author: "Research Team",
    date: "6 Jul 2026",
    readTime: "9 min read",
    compound: "Melanotan II",
  },
  {
    slug: "igf-1-lr3-vs-igf-1",
    title: "IGF-1 LR3 vs Native IGF-1: What's the Difference and Why It Matters",
    excerpt: "Understanding the key differences between Long R3 IGF-1 and native IGF-1 — binding affinity, half-life, and research applications.",
    category: "Comparisons",
    author: "Research Team",
    date: "2 Jul 2026",
    readTime: "6 min read",
    compound: "IGF-1 LR3",
  },
  {
    slug: "ghk-cu-copper-peptide-benefits",
    title: "GHK-Cu: The Copper Peptide With Wide-Ranging Research Applications",
    excerpt: "Explore the science behind GHK-Cu — wound healing, skin regeneration, hair growth, anti-inflammatory effects, and its role in tissue repair research.",
    category: "Compound Guides",
    author: "Research Team",
    date: "28 Jun 2026",
    readTime: "7 min read",
    compound: "GHK-Cu",
  },
  {
    slug: "peptide-storage-guide",
    title: "Peptide Storage Guide: How to Store Your Research Compounds Properly",
    excerpt: "Best practices for peptide storage — temperature requirements, lyophilised vs reconstituted, light sensitivity, and how to avoid degradation.",
    category: "Guides",
    author: "Research Team",
    date: "24 Jun 2026",
    readTime: "5 min read",
    compound: null,
  },
];

const categories = ["All", "Compound Guides", "Comparisons", "Guides"];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tools</Link>
              <Link href="/research" className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Research <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            In-depth guides, comparisons, and resources on research peptides. Updated regularly.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                cat === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLE GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/research/${article.slug}`}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-300 text-sm font-semibold group-hover:bg-blue-50 transition-colors">
                {article.title.split(":")[0]}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase tracking-wider">
                    {article.category}
                  </span>
                  {article.compound && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-50 text-gray-500 uppercase tracking-wider">
                      {article.compound}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MORE ARTICLES COMING */}
        <div className="text-center mt-10 py-8 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">More articles coming soon</p>
          <p className="text-xs text-gray-400 mt-1">New guides, comparisons, and compound deep dives added regularly.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">VP</span>
              </div>
              <span className="font-bold text-white">ViralPeps</span>
            </div>
            <p className="text-xs leading-relaxed">For laboratory research use only. © 2026 ViralPeps.</p>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
            <Link href="/compounds" className="block text-xs mb-2 hover:text-white">All Compounds</Link>
            <Link href="/vendors" className="block text-xs mb-2 hover:text-white">Vendors</Link>
            <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white">List Your Business</Link>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
            <Link href="/tools" className="block text-xs mb-2 hover:text-white">Peptide Tools</Link>
            <Link href="/research" className="block text-xs mb-2 hover:text-white">Research Library</Link>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy" className="block text-xs mb-2 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-xs mb-2 hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
