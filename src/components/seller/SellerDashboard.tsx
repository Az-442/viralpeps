"use client";

import { useState, useMemo } from "react";
import SellerProfile from "./SellerProfile";

export interface ClickRow {
  click_type: string;
  compound_slug: string | null;
  ref_page: string | null;
  visitor_id: string | null;
  created_at: string;
}

export interface ProductRow {
  compoundSlug: string;
  compoundName: string;
  price: string;
  inStock: boolean;
  url: string;
}

export interface SaleRow {
  order_id: string;
  order_value: number | string;
  currency: string | null;
  customer_type: string | null;
  commission_amount: number | string | null;
  created_at: string;
}

const RANGES = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "All time", days: 0 },
] as const;

function fmtMoney(n: number | string | null): string {
  const v = Number(n ?? 0);
  return v.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

function timeAgo(iso: string): string {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  const w = Math.floor(days / 7);
  return w < 5 ? `${w}w ago` : new Date(iso).toLocaleDateString("en-GB");
}

export default function SellerDashboard(props: {
  slug: string;
  name: string;
  trustScore: number;
  trustTicks: string[];
  commissionRate: number;
  apiKey: string;
  email: string;
  stats: {
    clicks30: number;
    visitors30: number;
    clicksAll: number;
    visitorsAll: number;
    activeProducts: number;
    totalProducts: number;
  };
  clicks: ClickRow[];
  sales: SaleRow[];
  products: ProductRow[];
  productClicks: Record<string, number>;
}) {
  const [rangeDays, setRangeDays] = useState(30);
  const [productFilter, setProductFilter] = useState<string>("all");
  const [tab, setTab] = useState<"overview" | "products" | "profile">("overview");

  const cutoff = useMemo(() => {
    if (rangeDays === 0) return 0;
    return Date.now() - rangeDays * 24 * 3600 * 1000;
  }, [rangeDays]);

  const clicksInRange = useMemo(
    () => props.clicks.filter((c) => new Date(c.created_at).getTime() >= cutoff),
    [props.clicks, cutoff]
  );

  const filteredClicks = useMemo(
    () =>
      productFilter === "all"
        ? clicksInRange
        : clicksInRange.filter((c) => c.compound_slug === productFilter),
    [clicksInRange, productFilter]
  );

  const visitorsInRange = useMemo(
    () => new Set(filteredClicks.map((c) => c.visitor_id).filter(Boolean)).size,
    [filteredClicks]
  );

  const affiliateClicks = filteredClicks.filter((c) => c.click_type === "vendor-site").length;

  // Bar chart: clicks per day over the range (max 30 bars).
  const bars = useMemo(() => {
    const days = rangeDays === 0 ? 30 : rangeDays;
    const map = new Map<string, number>();
    for (const c of clicksInRange) {
      const k = c.created_at.slice(0, 10);
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    const keys = [...map.keys()].sort();
    const last = keys.slice(-days).map((k) => ({ k, n: map.get(k) ?? 0 }));
    return last;
  }, [clicksInRange, rangeDays]);
  const maxBar = Math.max(1, ...bars.map((b) => b.n));

  const productList = useMemo(() => {
    const slugs = [...new Set(props.products.map((p) => p.compoundSlug))];
    return slugs.map((s) => ({
      slug: s,
      name: props.products.find((p) => p.compoundSlug === s)?.compoundName ?? s,
      count: props.productClicks[s] ?? 0,
    }));
  }, [props.products, props.productClicks]);

  // TrustScore band colour.
  const band =
    props.trustScore >= 86
      ? "text-emerald-600"
      : props.trustScore >= 65
      ? "text-emerald-500"
      : props.trustScore >= 45
      ? "text-amber-500"
      : props.trustScore >= 30
      ? "text-orange-500"
      : "text-rose-500";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-xl">✦</span>
            <div>
              <div className="font-semibold text-sm leading-tight">Supplier Portal</div>
              <div className="text-[10px] tracking-widest text-gray-400">VIRALPEPS</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 text-sm">
          {[
            ["overview", "Dashboard", "🏠"],
            ["products", "Products", "📦"],
            ["profile", "Profile & TrustScore", "🛡️"],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${
                tab === id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
          <a href={`/vendors/${props.slug}`} className="block text-blue-600 hover:underline">
            View public listing ↗
          </a>
          <form action="/api/sellers/logout" method="POST">
            <button className="text-gray-400 hover:text-gray-600">Sign out</button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ml-60 p-6">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] text-white p-6 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-widest text-blue-300 uppercase">Your supplier portal</div>
              <h1 className="text-2xl font-bold mt-1">{props.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5">
                  {props.stats.totalProducts} listings live
                </span>
                <span className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${props.trustScore >= 45 ? "bg-emerald-400" : "bg-amber-400"}`} />
                  Confidence {props.trustScore}
                </span>
                <a href={`/vendors/${props.slug}`} className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 hover:bg-white/20">
                  View public listing ↗
                </a>
              </div>
            </div>
            <div className="text-xs">
              <select
                value={rangeDays}
                onChange={(e) => setRangeDays(Number(e.target.value))}
                className="bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-white [&>option]:text-gray-900"
              >
                {RANGES.map((r) => (
                  <option key={r.days} value={r.days}>
                    📅 {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {tab === "overview" && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {[
                ["Clicks", filteredClicks.length, `${props.stats.clicksAll} all time`],
                ["Unique visitors", visitorsInRange, "distinct people"],
                ["Affiliate clicks", affiliateClicks, "tracked outbound"],
                ["Active products", props.stats.activeProducts, `${props.stats.totalProducts} total`],
              ].map(([label, val, sub]) => (
                <div key={label as string} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-2xl font-bold mt-1">{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* Click activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Click activity</h2>
                <span className="text-xs text-gray-400">per day · {RANGES.find((r) => r.days === rangeDays)?.label.toLowerCase()}</span>
              </div>
              {bars.length === 0 ? (
                <p className="text-sm text-gray-400 py-6">No clicks in this period.</p>
              ) : (
                <div className="flex items-end gap-1 h-32">
                  {bars.map((b) => (
                    <div key={b.k} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-blue-600 rounded-t"
                        style={{ height: `${Math.max(4, (b.n / maxBar) * 100)}%` }}
                        title={`${b.k}: ${b.n}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TrustScore */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-5">
                <div className="relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={props.trustScore >= 45 ? "#10b981" : "#f59e0b"}
                      strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${props.trustScore * 2.64} 264`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${band}`}>{props.trustScore}</span>
                    <span className="text-[9px] text-gray-400">OUT OF 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs tracking-widest text-gray-400 uppercase mb-1">Your confidence score</div>
                  <div className="text-sm text-gray-600">
                    {props.trustTicks.length ? props.trustTicks.join(" · ") : "No signals verified yet"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">This is what buyers see next to your listing.</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold">What makes up your score</h2>
                  <a href="/trust-score" className="text-xs text-blue-600 hover:underline">How it works →</a>
                </div>
                <ul className="text-sm space-y-1.5">
                  {[
                    ["Lab-Tested (COA)", "+25"],
                    ["Contact", "+15"],
                    ["Reviews", "+10"],
                    ["Compliant (RUO)", "+10"],
                    ["Shipping", "+10"],
                    ["Domain (badge)", "+15"],
                    ["Entity audit", "+15"],
                  ].map(([label, pts]) => {
                    const has = props.trustTicks.some((t) => label.toLowerCase().startsWith(t.toLowerCase()) || t.toLowerCase().startsWith(label.toLowerCase()));
                    return (
                      <li key={label} className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className={has ? "text-emerald-500" : "text-gray-300"}>{has ? "✓" : "–"}</span>
                          {label}
                        </span>
                        <span className="text-gray-400 text-xs">{pts}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                  <div className="font-medium text-blue-800">Looking to increase your score?</div>
                  <div className="text-blue-600 text-xs mt-0.5">
                    Add a COA, collect verified reviews and install your badge. Each check adds points instantly.
                  </div>
                  <a href={`/sellers/${props.slug}?tab=profile`} className="text-blue-700 text-xs font-medium hover:underline">Edit your profile →</a>
                </div>
              </div>
            </div>

            {/* Recent clicks */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Recent clicks</h2>
                  <div className="text-xs text-gray-400">the last people we sent your way</div>
                </div>
                <span className="text-xs text-emerald-600 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live feed
                </span>
              </div>
              {filteredClicks.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400">No clicks in this period.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                      <th className="px-5 py-2 font-medium">Product</th>
                      <th className="px-5 py-2 font-medium">Type</th>
                      <th className="px-5 py-2 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClicks.slice(0, 15).map((c, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="px-5 py-2">{c.compound_slug || "—"}</td>
                        <td className="px-5 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${c.click_type === "vendor-site" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                            {c.click_type === "vendor-site" ? "Affiliate" : "Product"}
                          </span>
                        </td>
                        <td className="px-5 py-2 text-gray-500">{timeAgo(c.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === "products" && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Your products</h2>
                <div className="text-xs text-gray-400">as listed on the comparison pages</div>
              </div>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5"
              >
                <option value="all">All products</option>
                {productList.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-2 font-medium">Product</th>
                  <th className="px-5 py-2 font-medium">Price</th>
                  <th className="px-5 py-2 font-medium">Stock</th>
                  <th className="px-5 py-2 font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {props.products.filter((p) => productFilter === "all" || p.compoundSlug === productFilter).map((p, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-5 py-2">
                      <a href={`/compounds/${p.compoundSlug}`} className="hover:underline">{p.compoundName}</a>
                    </td>
                    <td className="px-5 py-2">{p.price || "—"}</td>
                    <td className="px-5 py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.inStock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-5 py-2">{props.productClicks[p.compoundSlug] ?? 0}</td>
                  </tr>
                ))}
                {props.products.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-6 text-gray-400">No products listed.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "profile" && (
          <SellerProfile
            slug={props.slug}
            email={props.email}
            commissionRate={props.commissionRate}
            apiKey={props.apiKey}
            trustScore={props.trustScore}
            trustTicks={props.trustTicks}
          />
        )}
      </div>
    </div>
  );
}
