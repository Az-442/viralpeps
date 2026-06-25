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
      <div className="max-4xl mx-auto px-4 py-12">
        <Link href="/vendors" className="text-sm text-blue-600 hover:text-blue-700 mb-6 inline-block">← Back to vendors</Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
              {vendor.verified && <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Verified</span>}
              {!vendor.verified && <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">Verification Pending</span>}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span> {vendor.rating} / 5.0
              </span>
              <span>{vendor.country}</span>
              <span>Since {vendor.founded}</span>
            </div>
          </div>
          <a href={vendor.website} target="_blank" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm">
            Visit Website →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.highlights.map((h) => (
                  <span key={h} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">{h}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Compound Categories</h2>
              <div className="space-y-2">
                {vendor.categories.map((cat) => (
                  <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="block text-blue-600 hover:text-blue-700 text-sm">
                    {cat} →
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping</h3>
              <ul className="space-y-1.5">
                {vendor.shipping.map((s) => (
                  <li key={s} className="text-sm text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
              <ul className="space-y-1.5">
                {vendor.payment.map((p) => (
                  <li key={p} className="text-sm text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Compounds</h3>
                <span className="text-2xl font-bold text-gray-900">{vendor.compoundCount}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Listed compounds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
