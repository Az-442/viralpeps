"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  name: string;
  slug: string;
  type: "compound" | "vendor";
  category?: string;
  aliases?: string[];
  rating?: number;
  verified?: boolean;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ compounds: SearchResult[]; vendors: SearchResult[] }>({ compounds: [], vendors: [] });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults({ compounds: [], vendors: [] }); return; }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const total = results.compounds.length + results.vendors.length;

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search peptides, compounds, vendors..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {open && total > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
          {results.compounds.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">Compounds</div>
              {results.compounds.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compounds/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                    {c.aliases && c.aliases.length > 0 && (
                      <span className="text-xs text-gray-400 ml-2">{c.aliases[0]}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 capitalize">{c.category?.replace(/-/g, " ")}</span>
                </Link>
              ))}
            </div>
          )}
          {results.vendors.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-50">Vendors</div>
              {results.vendors.map((v) => (
                <Link
                  key={v.slug}
                  href={`/vendors/${v.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{v.name}</span>
                    {v.verified && <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Verified</span>}
                  </div>
                  <span className="text-xs text-yellow-500">★ {v.rating}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
