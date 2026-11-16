"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VendorDownPage() {
  const sp = useSearchParams();
  const vendor = sp.get("vendor") || "This supplier";
  const compound = sp.get("compound");
  const alt = sp.get("alt");
  const altPath = sp.get("altPath");

  useEffect(() => {
    if (!altPath) return;
    const t = setTimeout(() => {
      window.location.href = altPath;
    }, 5000);
    return () => clearTimeout(t);
  }, [altPath]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full px-3 py-1 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
          Supplier offline
        </div>

        <h1 className="text-xl font-bold text-gray-900">
          {vendor}&apos;s website is currently down
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          We checked before sending you there and their site isn&apos;t responding
          right now{compound ? ` for ${compound}` : ""}.
        </p>

        {alt && altPath ? (
          <>
            <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl p-4">
              <div className="text-xs tracking-widest text-gray-400 uppercase">
                Best alternative
              </div>
              <div className="text-lg font-semibold text-gray-900 mt-1">{alt}</div>
              <a
                href={altPath}
                className="mt-3 inline-flex items-center justify-center w-full bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700"
              >
                Visit {alt} →
              </a>
              <p className="text-xs text-gray-400 mt-3">
                Redirecting automatically in a few seconds…
              </p>
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-gray-500">
            There are no live alternatives right now. Please check back shortly.
          </p>
        )}

        <a
          href="/"
          className="inline-block mt-6 text-xs text-gray-400 hover:text-gray-600"
        >
          ← Back to ViralPeps
        </a>
      </div>
    </main>
  );
}
