import Link from "next/link";
import vendors from "@/data/vendors.json";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Directory</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors.map((v) => (
            <Link
              key={v.id}
              href={`/vendors/${v.slug}`}
              className="p-5 border border-gray-100 rounded-xl hover:border-blue-100 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{v.name}</h2>
                {v.verified ? (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
                ) : (
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Pending</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{v.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span> {v.rating}
                </span>
                <span>{v.country}</span>
                <span>{v.compoundCount} compounds</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
