import { notFound } from "next/navigation";
import Link from "next/link";
import vendors from "@/data/vendors.json";

export const dynamic = "force-dynamic";

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) notFound();

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
              <Link href="/vendors" className="text-sm text-blue-600 font-medium">Vendors</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Tools</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-400">
        <Link href="/vendors" className="hover:text-blue-600">Vendors</Link> &gt; <span className="text-gray-600">{vendor.name}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-blue-50 rounded-xl flex items-center justify-center text-blue-400 font-bold text-2xl">{vendor.name}</div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
            {vendor.verified && <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full">✓ Verified</span>}
          </div>
          <div className="flex gap-4 text-sm text-gray-400 mb-4">
            <span className="text-amber-500">★ {vendor.rating}</span><span>{vendor.country}</span><span>Since {vendor.founded}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{vendor.description}</p>
          <div className="grid grid-cols-1 gap-2 mb-5">
            <div className="bg-gray-50 p-3 rounded-lg"><p className="text-[11px] text-gray-400 uppercase tracking-wider">Highlights</p><p className="text-sm font-medium text-gray-900">{vendor.highlights.join(" · ")}</p></div>
            <div className="bg-gray-50 p-3 rounded-lg"><p className="text-[11px] text-gray-400 uppercase tracking-wider">Shipping</p><p className="text-sm font-medium text-gray-900">{vendor.shipping.join(" · ")}</p></div>
            <div className="bg-gray-50 p-3 rounded-lg"><p className="text-[11px] text-gray-400 uppercase tracking-wider">Payment</p><p className="text-sm font-medium text-gray-900">{vendor.payment.join(" · ")}</p></div>
          </div>
          <a href={vendor.website} target="_blank" className="inline-block px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Visit Website →</a>
        </div>
      </div>

      <footer className="bg-[#0b1a2e] text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">© 2026 ViralPeps.</div>
      </footer>
    </div>
  );
}
