"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const deals = [
  { compound: "Ipamorelin 300mcg", supplier: "Research Peptides", save: "£193", pct: "-97%", slug: "ipamorelin" },
  { compound: "GHK-Cu 5mg", supplier: "Raccoon Peptides", save: "£336", pct: "-96%", slug: "ghk-cu" },
  { compound: "Semax 600mcg", supplier: "XL Peptides", save: "£192", pct: "-96%", slug: "semax" },
];

export default function BestOffersBanner() {
  const [visible, setVisible] = useState(true);
  const [deal] = useState(() => deals[Math.floor(Math.random() * deals.length)]);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs text-center py-1.5 px-4">
      <span className="inline-flex items-center gap-1.5">
        <span>🔥</span>
        <span>
          Save <strong>{deal.save}</strong> on{" "}
          <Link
            href={`/compounds/${deal.slug}`}
            className="font-semibold underline underline-offset-2 hover:text-emerald-100"
          >
            {deal.compound}
          </Link>{" "}
          at {deal.supplier} ({deal.pct}) —
        </span>
        <Link
          href="/"
          className="font-semibold underline underline-offset-2 hover:text-emerald-100"
        >
          View all deals
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="ml-1 text-white/60 hover:text-white transition"
          aria-label="Close"
        >
          ✕
        </button>
      </span>
    </div>
  );
}
