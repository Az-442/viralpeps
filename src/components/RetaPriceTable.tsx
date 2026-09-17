import Link from "next/link";
import type { RetaRow } from "@/data/retatrutide-silo";

/**
 * SHARED Retatrutide price table — used by the hub AND every silo spoke.
 * Visual design matches mockups/reta-silo-tiles.html (Mockup 2) exactly.
 * Data is passed in already-sorted + already-sliced; this component never
 * fetches or sorts, so every caller shows the same numbers.
 */

interface Props {
  rows: RetaRow[];
  /** Heading text, e.g. "Retatrutide Price Comparison — UK Suppliers" */
  heading: string;
  /** Right-hand live indicator text. Defaults to weekly refresh wording. */
  liveLabel?: string;
  /** Which row gets the "Best value" badge (by row key). */
  bestKey?: string | null;
  /** Total supplier count for the footnote. */
  supplierCount: number;
  /** Columns to show. "trust" adds a TrustScore column for the ranking spoke. */
  showTrust?: boolean;
  /** Shown when rows is empty. */
  emptyLabel?: string;
}

function Tick() {
  return (
    <span className="text-blue-600 text-[12px] leading-none" aria-label="verified">
      ✓
    </span>
  );
}

export default function RetaPriceTable({
  rows,
  heading,
  liveLabel = "Live prices · refreshed weekly",
  bestKey = null,
  supplierCount,
  showTrust = false,
  emptyLabel = "No listings available right now.",
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-[14px] overflow-hidden">
      <div className="px-[20px] py-[18px] border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-[16px] font-extrabold text-slate-900">{heading}</h3>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-[5px] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
          {liveLabel}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="px-[20px] py-8 text-[13.5px] text-slate-400">{emptyLabel}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                  Supplier
                </th>
                <th className="hidden sm:table-cell text-left text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                  Pack
                </th>
                <th className="text-left text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                  Price
                </th>
                <th className="hidden sm:table-cell text-left text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                  Per mg
                </th>
                {showTrust && (
                  <th className="hidden sm:table-cell text-left text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                    TrustScore
                  </th>
                )}
                <th className="text-right text-[11px] font-bold tracking-[0.05em] uppercase text-slate-500 bg-slate-50 px-[20px] py-[11px] border-b border-slate-200">
                  Compare
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                  <td className="px-[20px] py-[13px]">
                    <span className="font-semibold text-slate-900 inline-flex items-center gap-[7px]">
                      {row.verified && <Tick />}
                      {row.vendor}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-[20px] py-[13px] text-slate-600 whitespace-nowrap">
                    {row.pack}
                  </td>
                  <td className="px-[20px] py-[13px] whitespace-nowrap">
                    <span className="font-extrabold text-emerald-600">{row.priceLabel}</span>
                    {bestKey && row.key === bestKey && (
                      <span className="text-[10px] font-extrabold tracking-[0.05em] uppercase bg-green-100 text-green-800 px-[7px] py-[3px] rounded-full ml-[7px]">
                        Best value
                      </span>
                    )}
                  </td>
                  <td className="hidden sm:table-cell px-[20px] py-[13px] whitespace-nowrap">
                    <span className="text-[11.5px] text-slate-400">{row.perMgLabel}</span>
                  </td>
                  {showTrust && (
                    <td className="hidden sm:table-cell px-[20px] py-[13px] whitespace-nowrap">
                      <span className="font-bold text-slate-900">
                        {row.trustScore !== null ? `${row.trustScore} / 100` : "—"}
                      </span>
                    </td>
                  )}
                  <td className="px-[20px] py-[13px] text-right whitespace-nowrap">
                    <Link
                      href={`/go/${row.vendorSlug}/retatrutide`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[12px] font-bold text-blue-600 border border-blue-200 bg-white px-[13px] py-[6px] rounded-lg hover:bg-blue-50"
                    >
                      Visit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-[11.5px] text-slate-400 px-[20px] py-[14px] border-t border-slate-100 bg-[#fcfdfe]">
        Prices pulled from {supplierCount} verified UK suppliers · refreshed weekly · ✓ = independently
        verified vendor. Not for human consumption.
      </div>
    </div>
  );
}
