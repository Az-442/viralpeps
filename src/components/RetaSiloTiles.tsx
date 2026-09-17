import Link from "next/link";
import { RETA_SPOKES } from "@/data/retatrutide-silo";
import type { RetaStats } from "@/data/retatrutide-silo";

/**
 * "Retatrutide Buying Guides" tile block for the hub page.
 * Design matches mockups/reta-silo-tiles.html (Mockup 1) exactly —
 * 3-col grid, numbered, icon + title + desc + price strip.
 */

const ICONS: Record<string, React.ReactNode> = {
  cart: (
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6a1 1 0 0 0 .9 1.4h12.8M16 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  ),
  coin: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  card: (
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22M6 15h4" />
    </>
  ),
  swap: <path d="M20 7h-9M14 17H5M17 3l4 4-4 4M7 21l-4-4 4-4" />,
  star: <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
};

function metricFor(metric: string, stats: RetaStats): { label: string; value: string } {
  switch (metric) {
    case "perMg":
      return {
        label: "best per mg",
        value: stats.bestPerMg !== null ? `£${stats.bestPerMg.toFixed(2)}` : "—",
      };
    case "range":
      return {
        label: "range",
        value: `£${stats.minPrice.toFixed(2)}–£${stats.maxPrice.toFixed(2)}`,
      };
    case "typical":
      return {
        label: "typical",
        value: `£${stats.minPrice.toFixed(2)}–£${stats.avgPrice.toFixed(2)}`,
      };
    case "trust":
      return {
        label: "top score",
        value: stats.topTrustScore !== null ? `${stats.topTrustScore} / 100` : "—",
      };
    default:
      return { label: "from", value: `£${stats.minPrice.toFixed(2)}` };
  }
}

function countFor(metric: string, stats: RetaStats): string {
  switch (metric) {
    case "perMg":
      return `Lowest: £${stats.minPrice.toFixed(2)}`;
    case "range":
      return `${stats.suppliers} suppliers`;
    case "typical":
      return "UK stock";
    case "trust":
      return "Ranked";
    case "perMgCount":
      return `${stats.suppliers} suppliers`;
    default:
      return `${stats.suppliers} suppliers`;
  }
}

export default function RetaSiloTiles({ stats }: { stats: RetaStats }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <div>
          <div className="text-[22px] font-extrabold tracking-[-0.01em] text-slate-900">
            Retatrutide Buying Guides
          </div>
          <div className="text-[14px] text-slate-500 mt-1">
            Independent comparisons across {stats.suppliers} verified UK suppliers
          </div>
        </div>
        <Link
          href="/compounds/retatrutide"
          className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {RETA_SPOKES.map((spoke) => {
          const m = metricFor(spoke.metric, stats);
          const count = countFor(spoke.metric, stats);
          return (
            <Link
              key={spoke.slug}
              href={`/compound-guides/${spoke.slug}`}
              className="group relative flex flex-col bg-white border border-slate-200 rounded-[14px] p-5 hover:border-indigo-200 hover:shadow-[0_6px_20px_-6px_rgba(37,99,235,0.18)] hover:-translate-y-0.5 transition-all"
            >
              {"badge" in spoke && spoke.badge && (
                <span className="absolute top-0 left-5 -translate-y-1/2 text-[10px] font-extrabold tracking-[0.06em] uppercase bg-amber-100 text-amber-800 px-[9px] py-1 rounded-full">
                  {spoke.badge}
                </span>
              )}
              <span className="absolute top-[18px] right-[18px] text-[12px] font-extrabold text-slate-300 tracking-[0.04em]">
                {spoke.num}
              </span>

              <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-blue-50 mb-[14px] flex-none">
                <svg
                  viewBox="0 0 24 24"
                  className="w-[19px] h-[19px]"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[spoke.icon]}
                </svg>
              </div>

              <div className="text-[15px] font-bold leading-[1.35] mb-[7px] tracking-[-0.01em] text-slate-900">
                {spoke.title}
              </div>
              <div className="text-[13px] leading-[1.55] text-slate-500 mb-4">{spoke.desc}</div>

              <div className="mt-auto pt-[14px] border-t border-slate-100 flex items-center justify-between gap-2.5">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-[1px]">
                    {m.label}
                  </span>
                  <span className="text-[15px] font-extrabold text-emerald-600 tracking-[-0.01em]">
                    {m.value}
                  </span>
                </div>
                <div className="text-[12px] font-semibold text-slate-500 bg-slate-100 px-[9px] py-1 rounded-full">
                  {count}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
