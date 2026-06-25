import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "GLP-1 Agonists", count: 24, slug: "glp-1-agonists", desc: "Weight management & metabolic health" },
  { name: "Growth Factors", count: 18, slug: "growth-factors", desc: "Recovery, repair & regeneration" },
  { name: "MELANOTANs", count: 8, slug: "melanotans", desc: "Tanning & skin pigmentation" },
  { name: "Sermorelin & GHRPs", count: 15, slug: "ghrp", desc: "Growth hormone stimulation" },
  { name: "AOD & Fragments", count: 6, slug: "aod-fragments", desc: "Targeted fat loss compounds" },
  { name: "Thymosin & BPC", count: 12, slug: "thymosin-bpc", desc: "Immune support & tissue repair" },
  { name: "Pt-141 (Bremelanotide)", count: 4, slug: "pt-141", desc: "Sexual health & desire" },
  { name: "TB-500", count: 3, slug: "tb-500", desc: "Wound healing & inflammation" },
];

const vendors = [
  { name: "Peptide Sciences", rating: 4.8, verified: true },
  { name: "Limitless Life Nootropics", rating: 4.6, verified: true },
  { name: "Xpeptides", rating: 4.5, verified: false },
  { name: "Core Peptides", rating: 4.7, verified: true },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find, Compare & Source<br />
            <span className="text-blue-600">Research Peptides</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The most comprehensive peptide directory. Browse compounds, compare verified vendors, 
            and make informed purchasing decisions — all in one place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search peptides, compounds, vendors..."
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-xs text-gray-400">Popular:</span>
              <button className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600">Tirzepatide</button>
              <button className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600">Semaglutide</button>
              <button className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600">BPC-157</button>
              <button className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600">TB-500</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">90+</div>
              <div className="text-sm text-gray-500">Compounds</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-500">Verified Vendors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-500">Monthly Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
          <Link href="/compounds" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group p-5 border border-gray-100 rounded-xl hover:border-blue-100 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{cat.desc}</p>
              <span className="text-xs text-blue-600 font-medium">{cat.count} compounds</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top-Rated Vendors</h2>
            <Link href="/vendors" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vendors.map((v) => (
              <div key={v.name} className="bg-white p-5 border border-gray-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{v.name}</h3>
                  {v.verified && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Verified</span>}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium text-gray-700">{v.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Updated</h2>
          <p className="text-blue-100 mb-6 text-sm">
            Get the latest compound research, vendor updates, and exclusive content delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">VP</span>
                </div>
                <span className="font-bold text-white">ViralPeps</span>
              </div>
              <p className="text-xs">Research peptide directory & community.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Compounds</h4>
              <div className="space-y-2 text-xs">
                <Link href="/category/glp-1" className="block hover:text-white">GLP-1 Agonists</Link>
                <Link href="/category/growth-factors" className="block hover:text-white">Growth Factors</Link>
                <Link href="/category/melanotans" className="block hover:text-white">Melanotans</Link>
                <Link href="/category/ghrp" className="block hover:text-white">GHRPs</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
              <div className="space-y-2 text-xs">
                <Link href="/research" className="block hover:text-white">Research Library</Link>
                <Link href="/vendors" className="block hover:text-white">Vendor Directory</Link>
                <Link href="/about" className="block hover:text-white">About Us</Link>
                <Link href="/contact" className="block hover:text-white">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
              <div className="space-y-2 text-xs">
                <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="block hover:text-white">Terms of Service</Link>
                <Link href="/disclaimer" className="block hover:text-white">Disclaimer</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center">
            <p>© 2026 ViralPeps. For research purposes only. Not for human consumption.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
