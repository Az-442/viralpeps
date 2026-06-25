import Link from "next/link";
import vendors from "@/data/vendors.json";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/vendors" className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-4">Vendors</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tools</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Vendor Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors.map(v => (
            <Link key={v.id} href={`/vendors/${v.slug}`} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">{v.name}</h2>
                {v.verified ? (
                  <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Verified</span>
                ) : (
                  <span className="text-[10px] bg-yellow-50 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">Pending</span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{v.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="text-amber-500">★ {v.rating}</span>
                <span>{v.country}</span>
                <span>{v.compoundCount} compounds</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-[#0b1a2e] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">© 2026 ViralPeps.</div>
      </footer>
    </div>
  );
}
