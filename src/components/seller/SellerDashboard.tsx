"use client";

import { useState, useMemo, type ReactNode } from "react";
import SellerProfile from "./SellerProfile";
import AffiliateNetwork from "./AffiliateNetwork";
import TrustScoreIcon from "../TrustScoreIcon";
import SellerSidebar from "./SellerSidebar";
import DateRangeFilter, { DEFAULT_RANGE, type DateRange } from "../shared/DateRangeFilter";

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
  dosage: string;
  price: string;
  inStock: boolean;
  url: string;
  image?: string;
  coa: boolean;
  coaUrl: string;
  checkedAt: string;
}

export interface SaleRow {
  order_id: string;
  order_value: number | string;
  currency: string | null;
  customer_type: string | null;
  commission_amount: number | string | null;
  created_at: string;
  id?: number;
  status?: string | null;
  ignored_reason?: string | null;
}

export interface RankingRow {
  compoundSlug: string;
  compoundName: string;
  dosage: string;
  price: number | null;
  priceDisplay: string;
  position: number;
  total: number;
  cheapest: number | null;
  vsMarket: number | null;
  outOfStock: boolean;
  atRisk: boolean;
}

function productKey(p: ProductRow): string {
  return `${p.compoundSlug}__${p.dosage}`;
}

function perMg(p: ProductRow): string | null {
  const n = parseFloat(p.price.replace(/[£$€,]/g, ""));
  const m = (p.dosage || "").match(/([\d.]+)\s*mg/i);
  if (isNaN(n) || !m) return null;
  const mg = parseFloat(m[1]);
  if (mg <= 0) return null;
  return `£${(n / mg).toFixed(2)} / mg`;
}

function checkedAgo(iso: string): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (isNaN(t)) return "—";
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

type Tab =
  | "dashboard"
  | "analytics"
  | "ranking"
  | "products"
  | "badge"
  | "affiliate"
  | "profile"
  | "invoices"
  | "documents"
  | "terms";

// ── Icon set (Lucide-style line icons, no emoji) ────────────────────────
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-[18px] h-[18px] shrink-0",
  "aria-hidden": true,
};

function Ic({ children }: { children: ReactNode }) {
  return <svg {...iconProps}>{children}</svg>;
}

const DashboardIcon = () => (
  <Ic>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Ic>
);

const AnalyticsIcon = () => (
  <Ic>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Ic>
);

const SearchIcon = () => (
  <Ic>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Ic>
);

const PackageIcon = () => (
  <Ic>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Ic>
);

const BadgeIcon = () => (
  <Ic>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Ic>
);

const FileTextIcon = () => (
  <Ic>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Ic>
);

const NetworkIcon = () => (
  <Ic>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </Ic>
);

const ShieldIcon = () => (
  <Ic>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Ic>
);

const ReceiptIcon = () => (
  <Ic>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 17.5v-11" />
  </Ic>
);

const ScaleIcon = () => (
  <Ic>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </Ic>
);

const LifeBuoyIcon = () => (
  <Ic>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="m9.17 14.83-4.24 4.24" />
    <circle cx="12" cy="12" r="4" />
  </Ic>
);

const ArrowLeftIcon = () => (
  <Ic>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </Ic>
);

const SparklesIcon = () => (
  <Ic>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Ic>
);

function BrandHexagon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-blue-600 shrink-0"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M12 7.5v9" />
      <path d="m8.5 10 7 4" />
      <path d="m15.5 10-7 4" />
    </svg>
  );
}

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
      { id: "analytics", label: "Analytics", Icon: AnalyticsIcon },
      { id: "ranking", label: "Search Ranking", Icon: SearchIcon },
    ],
  },
  {
    label: "Your listing",
    items: [
      { id: "products", label: "Products", Icon: PackageIcon },
      { id: "badge", label: "Website Badge", Icon: BadgeIcon },
    ],
  },
  {
    label: "Growth",
    items: [{ id: "affiliate", label: "Affiliate Network", Icon: NetworkIcon }],
  },
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile & TrustScore", Icon: ShieldIcon },
      { id: "invoices", label: "Invoices", Icon: ReceiptIcon },
      { id: "documents", label: "Documents", Icon: FileTextIcon },
      { id: "terms", label: "Terms & Conditions", Icon: ScaleIcon },
    ],
  },
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

function Placeholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
        <FileTextIcon />
      </div>
      <h2 className="font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">{desc}</p>
    </div>
  );
}

export default function SellerDashboard(props: {
  slug: string;
  name: string;
  trustScore: number;
  trustTicks: string[];
  commissionRate: number;
  apiKey: string;
  badgeToken: string;
  email: string;
  affiliateJoinedAt: string | null;
  affiliateConnection?: {
    connected: boolean;
    token_hint: string | null;
    connected_at: string | null;
    store_url: string | null;
  } | null;
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
  ranking: RankingRow[];
}) {
  const [range, setRange] = useState<DateRange>(DEFAULT_RANGE);
  const rangeDays = range.key === "all" ? 0 : range.key === "custom" ? 0 : Number(range.key);
  const [productFilter, setProductFilter] = useState<string>("all");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [copied, setCopied] = useState(false);
  const [joinState, setJoinState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [hoverBar, setHoverBar] = useState<{ x: number; y: number; label: string; n: number } | null>(null);
  const [hoverHeat, setHoverHeat] = useState<{ x: number; y: number; label: string; n: number } | null>(null);
  const [rankSearch, setRankSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [coaFilter, setCoaFilter] = useState("all");
  const [visibleFilter, setVisibleFilter] = useState("all");
  const [hiddenProducts, setHiddenProducts] = useState<Set<string>>(new Set());

  const cutoff = useMemo(() => {
    if (range.key === "custom") return range.from;
    if (rangeDays === 0) return 0;
    return Date.now() - rangeDays * 24 * 3600 * 1000;
  }, [rangeDays, range]);

  const cutoffEnd = useMemo(() => {
    if (range.key === "custom") return range.to;
    return 0;
  }, [range]);

  const clicksInRange = useMemo(
    () =>
      props.clicks.filter((c) => {
        const t = new Date(c.created_at).getTime();
        return t >= cutoff && (cutoffEnd === 0 || t <= cutoffEnd);
      }),
    [props.clicks, cutoff, cutoffEnd]
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

  const websiteClicks = filteredClicks.filter((c) => c.click_type === "vendor-site").length;
  const productClicks = filteredClicks.filter((c) => c.click_type === "product").length;

  // Affiliate program summary (all-time, not range-filtered). All outbound
  // clicks — product AND vendor-site — are affiliate referral traffic, but only
  // count once the supplier has been approved into the program.
  const affiliateClicksAll = useMemo(() => {
    if (!props.affiliateJoinedAt) return 0;
    const since = new Date(props.affiliateJoinedAt).getTime();
    return props.clicks.filter(
      (c) =>
        (c.click_type === "vendor-site" || c.click_type === "product") &&
        new Date(c.created_at).getTime() >= since
    ).length;
  }, [props.clicks, props.affiliateJoinedAt]);
  // Only completed orders pay commission. Refunded and cancelled orders are
  // shown in the order list as negatives but must never inflate the headline.
  const totalCommissionAll = props.sales.reduce((acc, s) => {
    const status = String(s.status ?? "completed");
    if (status === "refunded" || status === "cancelled") return acc;
    return acc + Number(s.commission_amount ?? 0);
  }, 0);

  // Reversed commission — money that was earned and then taken back. Shown
  // separately so the owner can see what refunds actually cost.
  const reversedCommission = props.sales.reduce((acc, s) => {
    const status = String(s.status ?? "completed");
    if (status !== "refunded" && status !== "cancelled") return acc;
    return acc + Math.abs(Number(s.commission_amount ?? 0));
  }, 0);

  // Bar chart: continuous daily series over the range (accurate time axis).
  const bars = useMemo(() => {
    const days = rangeDays === 0 ? 30 : rangeDays;
    const map = new Map<string, number>();
    for (const c of clicksInRange) {
      const k = c.created_at.slice(0, 10);
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    const now = Date.now();
    const out: { k: string; n: number; label: string }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      const k = d.toISOString().slice(0, 10);
      out.push({
        k,
        n: map.get(k) ?? 0,
        label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      });
    }
    return out;
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

  // Top products by clicks (for the analytics tab).
  const topProducts = useMemo(
    () => [...productList].sort((a, b) => b.count - a.count).slice(0, 10),
    [productList]
  );

  // Analytics: peptides with click share.
  const peptideBars = useMemo(() => {
    const total = topProducts.reduce((a, p) => a + p.count, 0) || 1;
    return topProducts
      .filter((p) => p.count > 0)
      .map((p) => ({ ...p, pct: Math.round((p.count / total) * 100) }));
  }, [topProducts]);

  // Analytics: clicks heatmap (day-of-week × 3-hour bucket).
  const heatmap = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = [0, 3, 6, 9, 12, 15, 18, 21];
    const grid = Array.from({ length: 7 }, () => Array(8).fill(0) as number[]);
    let max = 0;
    let busiestDay = -1;
    let busiestHour = -1;
    for (const c of clicksInRange) {
      const d = new Date(c.created_at);
      const dow = (d.getDay() + 6) % 7;
      const h = Math.min(7, Math.floor(d.getHours() / 3));
      grid[dow][h]++;
      if (grid[dow][h] > max) {
        max = grid[dow][h];
        busiestDay = dow;
        busiestHour = h;
      }
    }
    return { days, hours, grid, max, busiestDay, busiestHour };
  }, [clicksInRange]);

  // Search ranking summary.
  const rankingSummary = useMemo(() => {
    const n = props.ranking.length;
    if (n === 0) return { avg: 0, top3: 0, top3Pct: 0, numberOne: 0, atRisk: 0 };
    const sum = props.ranking.reduce((a, r) => a + r.position, 0);
    const top3 = props.ranking.filter((r) => r.position <= 3).length;
    const numberOne = props.ranking.filter((r) => r.position === 1).length;
    const atRisk = props.ranking.filter((r) => r.atRisk).length;
    return {
      avg: Math.round((sum / n) * 10) / 10,
      top3,
      top3Pct: Math.round((top3 / n) * 100),
      numberOne,
      atRisk,
    };
  }, [props.ranking]);

  const filteredRanking = useMemo(() => {
    const q = rankSearch.trim().toLowerCase();
    if (!q) return props.ranking;
    return props.ranking.filter(
      (r) =>
        r.compoundName.toLowerCase().includes(q) ||
        r.dosage.toLowerCase().includes(q) ||
        r.compoundSlug.toLowerCase().includes(q)
    );
  }, [props.ranking, rankSearch]);

  const inStockCount = props.products.filter((p) => p.inStock).length;
  const oosCount = props.products.length - inStockCount;
  const noCoaCount = props.products.filter((p) => !p.coa).length;
  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return props.products.filter((p) => {
      const key = productKey(p);
      if (q && !`${p.compoundName} ${p.dosage}`.toLowerCase().includes(q)) return false;
      if (stockFilter === "in" && !p.inStock) return false;
      if (stockFilter === "out" && p.inStock) return false;
      if (coaFilter === "with" && !p.coa) return false;
      if (coaFilter === "without" && p.coa) return false;
      if (visibleFilter === "live" && hiddenProducts.has(key)) return false;
      if (visibleFilter === "hidden" && !hiddenProducts.has(key)) return false;
      return true;
    });
  }, [props.products, productSearch, stockFilter, coaFilter, visibleFilter, hiddenProducts]);

  function toggleHidden(key: string) {
    setHiddenProducts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const embedSnippet = props.badgeToken
    ? `<script src="https://www.viralpeps.co.uk/trust-score.js" data-token="${props.badgeToken}" data-position="bottom-right" defer></script>`
    : `<script src="https://www.viralpeps.co.uk/trust-score.js" data-supplier="${props.slug}" data-position="bottom-right" defer></script>`;

  function copyEmbed() {
    navigator.clipboard?.writeText(embedSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function joinAffiliate() {
    if (joinState === "sending" || joinState === "sent") return;
    setJoinState("sending");
    try {
      const r = await fetch("/api/sellers/join-affiliate", { method: "POST" });
      setJoinState(r.ok ? "sent" : "error");
    } catch {
      setJoinState("error");
    }
  }

  const statCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {[
        ["Total clicks", filteredClicks.length, `${props.stats.clicksAll} all time`],
        ["Unique visitors", visitorsInRange, "distinct people"],
        ["Website clicks", websiteClicks, "visits to your site"],
        ["Product clicks", productClicks, "product page visits"],
      ].map(([label, val, sub]) => (
        <div key={label as string} className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-700">{label}</div>
          <div className="text-2xl font-bold mt-1">{val}</div>
          <div className="text-xs text-gray-600 mt-0.5">{sub}</div>
        </div>
      ))}
    </div>
  );

  const clickActivity = (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Click activity</h2>
        <span className="text-xs text-gray-600">per day · {range.label.toLowerCase()}</span>
      </div>
      {bars.length === 0 ? (
        <p className="text-sm text-gray-600 py-6">No clicks in this period.</p>
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
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Sidebar ── */}
      <SellerSidebar name={props.name} slug={props.slug} active={tab} onSelect={(id) => setTab(id as Tab)} />

      {/* ── Main ── */}
      <div className="ml-64 p-6">
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
                  TrustScore {props.trustScore}
                </span>
                <a href={`/vendors/${props.slug}`} className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5 hover:bg-white/20">
                  View public listing ↗
                </a>
              </div>
            </div>
            <div className="text-xs">
              <DateRangeFilter value={range} onChange={setRange} variant="dark" />
            </div>
          </div>
        </div>

        {tab === "dashboard" && (
          <>
            {statCards}

            {/* Affiliate program */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">Affiliate program</h2>
                <button
                  onClick={joinAffiliate}
                  disabled={joinState === "sending" || joinState === "sent"}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
                    joinState === "sent"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                      : joinState === "error"
                      ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                  }`}
                >
                  {joinState === "sent"
                    ? "Request sent ✓"
                    : joinState === "sending"
                    ? "Sending…"
                    : joinState === "error"
                    ? "Retry"
                    : "Join program"}
                </button>
              </div>
              <p className="text-sm text-gray-700">
                Pay only for the sales we actually send you. No monthly fees, no minimums.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-xs text-gray-700">Affiliate clicks</div>
                  <div className="text-2xl font-bold mt-1">{affiliateClicksAll}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <div className="text-xs text-gray-700">Total commissions</div>
                  <div className="text-2xl font-bold mt-1">{fmtMoney(totalCommissionAll)}</div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {reversedCommission > 0
                      ? `${fmtMoney(reversedCommission)} reversed by refunds`
                      : "across all referred sales"}
                  </div>
                </div>
              </div>
            </div>

            {/* TrustScore */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-5">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="tsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="50" fill="#0b1a2e" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="url(#tsGrad)"
                      strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${props.trustScore * 2.64} 264`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white leading-none">{props.trustScore}</span>
                    <span className="text-[9px] font-semibold tracking-wider text-slate-300 mt-0.5">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs tracking-widest text-gray-600 uppercase mb-1">Your TrustScore</div>
                  <div className="text-sm text-gray-900">
                    {props.trustTicks.length ? props.trustTicks.join(" · ") : "No signals verified yet"}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
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
                    const has = props.trustTicks.some((t) => {
                      const tl = t.toLowerCase();
                      const ll = (label as string).toLowerCase();
                      if (ll === "entity audit") {
                        return tl.includes("registered") || tl.includes("sole trader") || tl.includes("entity");
                      }
                      return ll.startsWith(tl) || tl.startsWith(ll);
                    });
                    return (
                      <li key={label} className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className={has ? "text-emerald-500" : "text-rose-500"}>{has ? "✓" : "✕"}</span>
                          {label}
                        </span>
                        <span className="text-gray-900 text-xs">{pts}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                  <div className="font-medium text-blue-800">Looking to increase your score?</div>
                  <div className="text-blue-600 text-xs mt-0.5">
                    Add a COA, collect verified reviews and install your badge. Each check adds points instantly.
                  </div>
                  <button onClick={() => setTab("profile")} className="text-blue-700 text-xs font-medium hover:underline text-left">Edit your profile →</button>
                </div>
              </div>
            </div>

            {/* Recent clicks */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Recent clicks</h2>
                  <div className="text-xs text-gray-600">the last people we sent your way</div>
                </div>
                <span className="text-xs text-emerald-600 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live feed
                </span>
              </div>
              {filteredClicks.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-600">No clicks in this period.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                      <th className="px-5 py-2 font-medium">Product</th>
                      <th className="px-5 py-2 font-medium">Type</th>
                      <th className="px-5 py-2 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClicks.slice(0, 5).map((c, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="px-5 py-2">{c.compound_slug || "—"}</td>
                        <td className="px-5 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${c.click_type === "vendor-site" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-900"}`}>
                            {c.click_type === "vendor-site" ? "Affiliate" : "Product"}
                          </span>
                        </td>
                        <td className="px-5 py-2 text-gray-700" suppressHydrationWarning>{timeAgo(c.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === "analytics" && (
          <>
            <h1 className="text-xl font-bold mb-1">Analytics</h1>
            <p className="text-sm text-gray-600 mb-5">Every click you have earned, broken down by peptide, timing and device.</p>

            {/* Clicks over time */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold">Clicks over time</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold">{clicksInRange.length} clicks</span>
              </div>
              <div className="text-xs text-gray-600 mb-3">Grouped by day · {range.label.toLowerCase()}</div>
              {bars.length === 0 ? (
                <p className="text-sm text-gray-600 py-6">No clicks in this period.</p>
              ) : (
                <>
                  <div className="flex items-end gap-1 h-36">
                    {bars.map((b) => (
                      <div key={b.k} className="flex-1 h-full flex flex-col justify-end">
                        <div
                          className="w-full rounded-t"
                          style={{
                            height: b.n === 0 ? "3px" : `${Math.max(8, (b.n / maxBar) * 100)}%`,
                            background: b.n === 0 ? "#e5e7eb" : "#1d4ed8",
                          }}
                          onMouseEnter={(e) => setHoverBar({ x: e.clientX, y: e.clientY, label: b.label, n: b.n })}
                          onMouseMove={(e) => setHoverBar({ x: e.clientX, y: e.clientY, label: b.label, n: b.n })}
                          onMouseLeave={() => setHoverBar(null)}
                        />
                      </div>
                    ))}
                  </div>
                  {hoverBar && (
                    <div style={{ position: "fixed", left: hoverBar.x, top: hoverBar.y - 34, transform: "translateX(-50%)", background: "#111827", color: "#fff", padding: "3px 9px", borderRadius: 6, fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 50, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
                      {hoverBar.label} · {hoverBar.n} click{hoverBar.n === 1 ? "" : "s"}
                    </div>
                  )}
                  <div className="flex gap-1 mt-1.5">
                    {bars.map((b, i) => (
                      <div key={b.k} className="flex-1 text-center text-[9px] text-gray-500 truncate">
                        {i % Math.max(1, Math.ceil(bars.length / 8)) === 0 ? b.label : ""}
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-700 inline-block" /> Comparison pages {clicksInRange.length}</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400 inline-block" /> Featured spots 0</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Banners 0</span>
                <span className="flex items-center gap-1.5 text-gray-400">⟳ Previous period 0</span>
              </div>
            </div>

            {/* Peptides and sizes */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h2 className="font-semibold">Peptides and sizes</h2>
              <div className="text-xs text-gray-600 mb-4">Which molecules drive your demand.</div>
              {peptideBars.length === 0 ? (
                <p className="text-sm text-gray-600 py-4">No product clicks yet.</p>
              ) : (
                <div className="space-y-4">
                  {peptideBars.map((p) => (
                    <div key={p.slug}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">› {p.name}</span>
                        <span className="text-gray-900">{p.count} · {p.pct}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* When buyers click */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h2 className="font-semibold">When buyers click</h2>
              <div className="text-xs text-gray-600 mb-3">
                {heatmap.max > 0
                  ? `Busiest: ${heatmap.days[heatmap.busiestDay]} ${heatmap.hours[heatmap.busiestHour]}:00 (${heatmap.max} click${heatmap.max === 1 ? "" : "s"})`
                  : "No clicks in this period."}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="text-[10px] font-normal text-gray-500 text-left w-10"></th>
                      {heatmap.hours.map((h) => (
                        <th key={h} className="text-[10px] font-normal text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmap.days.map((day, di) => (
                      <tr key={day}>
                        <td className="text-[10px] text-gray-600">{day}</td>
                        {heatmap.grid[di].map((n, hi) => (
                          <td
                            key={hi}
                            className="h-6 rounded"
                            style={{ background: n === 0 ? "#f3f4f6" : `rgba(15,34,56,${0.3 + (n / heatmap.max) * 0.7})` }}
                            onMouseEnter={(e) => setHoverHeat({ x: e.clientX, y: e.clientY, label: `${day} ${heatmap.hours[hi]}:00`, n })}
                            onMouseMove={(e) => setHoverHeat({ x: e.clientX, y: e.clientY, label: `${day} ${heatmap.hours[hi]}:00`, n })}
                            onMouseLeave={() => setHoverHeat(null)}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hoverHeat && (
                <div style={{ position: "fixed", left: hoverHeat.x, top: hoverHeat.y - 34, transform: "translateX(-50%)", background: "#111827", color: "#fff", padding: "3px 9px", borderRadius: 6, fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 50, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
                  {hoverHeat.label} · {hoverHeat.n} click{hoverHeat.n === 1 ? "" : "s"}
                </div>
              )}
            </div>

            {/* Devices */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold">Devices</h2>
              <div className="text-xs text-gray-600 mb-3">How buyers reach you.</div>
              <p className="text-sm text-gray-600">Device tracking is not yet captured — coming soon.</p>
            </div>
          </>
        )}

        {tab === "ranking" && (
          <>
            <h1 className="text-xl font-bold mb-1">Search ranking</h1>
            <p className="text-sm text-gray-600 mb-5">
              Where each of your listings sits on the public comparison page for its peptide, and what it would take to move up.
            </p>

            {props.ranking.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                <p className="text-sm text-gray-600">You have no listings on the comparison pages yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Average position</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">#{rankingSummary.avg}</div>
                    <div className="text-xs text-gray-500 mt-1">across {props.ranking.length} ranked listing{props.ranking.length === 1 ? "" : "s"}</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600">In the top 3</div>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">{rankingSummary.top3}</div>
                    <div className="text-xs text-gray-500 mt-1">{rankingSummary.top3Pct}% of your listings</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600">At number one</div>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">{rankingSummary.numberOne}</div>
                    <div className="text-xs text-gray-500 mt-1">best on the page</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-600">At risk</div>
                    <div className="text-2xl font-bold text-amber-600 mt-1">{rankingSummary.atRisk}</div>
                    <div className="text-xs text-gray-500 mt-1">a rival is within 2% of your price</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
                    <h2 className="font-semibold">Your listings</h2>
                    <div className="relative">
                      <input
                        type="text"
                        value={rankSearch}
                        onChange={(e) => setRankSearch(e.target.value)}
                        placeholder="Search by peptide or size…"
                        className="text-xs border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 w-56 focus:outline-none focus:border-blue-400"
                      />
                      <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                          <th className="px-5 py-2.5 font-medium">Listing</th>
                          <th className="px-5 py-2.5 font-medium">Your price</th>
                          <th className="px-5 py-2.5 font-medium">Position</th>
                          <th className="px-5 py-2.5 font-medium">Cheapest here</th>
                          <th className="px-5 py-2.5 font-medium text-right">VS market</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRanking.map((r) => (
                          <tr key={`${r.compoundSlug}-${r.dosage}-${r.priceDisplay}`} className="border-b border-gray-50">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{r.compoundName}</span>
                                {r.dosage && <span className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">{r.dosage}</span>}
                                {r.outOfStock && <span className="text-xs text-red-600 font-medium">Out of stock</span>}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-900">{r.priceDisplay || "—"}</td>
                            <td className="px-5 py-3">
                              <span className="font-semibold text-gray-900">#{r.position}</span>
                              <span className="text-xs text-gray-500"> of {r.total}</span>
                            </td>
                            <td className="px-5 py-3 text-gray-700">{r.cheapest != null ? `£${r.cheapest.toFixed(2)}` : "—"}</td>
                            <td className="px-5 py-3 text-right whitespace-nowrap">
                              {r.vsMarket == null ? (
                                <span className="text-gray-400">—</span>
                              ) : r.vsMarket > 0 ? (
                                <span className="text-amber-600 font-medium">+{r.vsMarket}%</span>
                              ) : r.vsMarket < 0 ? (
                                <span className="text-emerald-600 font-medium">{r.vsMarket}%</span>
                              ) : (
                                <span className="text-gray-500">0%</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {filteredRanking.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-5 py-6 text-sm text-gray-600 text-center">No listings match "{rankSearch}".</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {tab === "products" && (
          <>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h1 className="text-xl font-bold mb-1">Products</h1>
                <p className="text-sm text-gray-700">
                  Everything you have listed with us. Prices are read from your own product pages, so the way to change one is to change it on your site.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></svg>
                  <span>Listings</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-1.5">{props.products.length}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <span>Live on the site</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600 mt-1.5">{inStockCount}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                  <span>Out of stock</span>
                </div>
                <div className="text-2xl font-bold text-rose-600 mt-1.5">{oosCount}</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  <span>Without a lab report</span>
                </div>
                <div className="text-2xl font-bold text-amber-600 mt-1.5">{noCoaCount}</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-wrap gap-3 mb-4">
              <div className="relative flex-1 min-w-[220px]">
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search by peptide name..."
                  className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-400"
                />
              </div>
              <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900">
                <option value="all">Any stock</option>
                <option value="in">In stock</option>
                <option value="out">Out of stock</option>
              </select>
              <select value={coaFilter} onChange={(e) => setCoaFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900">
                <option value="all">Any lab report</option>
                <option value="with">With lab report</option>
                <option value="without">Without lab report</option>
              </select>
              <select value={visibleFilter} onChange={(e) => setVisibleFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900">
                <option value="all">Live and hidden</option>
                <option value="live">Live only</option>
                <option value="hidden">Hidden only</option>
              </select>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium">Price</th>
                      <th className="px-5 py-3 font-medium">Stock</th>
                      <th className="px-5 py-3 font-medium">Lab report</th>
                      <th className="px-5 py-3 font-medium">Price checked</th>
                      <th className="px-5 py-3 font-medium">Visible</th>
                      <th className="px-5 py-3 font-medium text-right">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => {
                      const key = productKey(p);
                      const hidden = hiddenProducts.has(key);
                      const pmg = perMg(p);
                      const editUrl = `/sellers/${props.slug}/products/${p.compoundSlug}/edit?dosage=${encodeURIComponent(p.dosage)}`;
                      return (
                        <tr key={key} className="border-b border-gray-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {p.image ? (
                                <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                              ) : (
                                <div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 text-center leading-tight px-0.5">
                                  {p.inStock ? "" : "OUT OF STOCK"}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{p.compoundName} {p.dosage && <span className="text-gray-600">{p.dosage}</span>}</div>
                                <a href={p.url} target="_blank" rel="noopener" className="text-xs text-blue-600 hover:underline">{hostOf(p.url) || "supplier site"} ↗</a>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-900">
                            {p.price || "—"}
                            {pmg && <span className="text-xs text-gray-600"> ({pmg})</span>}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.inStock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                              • {p.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            {p.coa ? (
                              <a
                                href={p.coaUrl || `${editUrl}#lab-testing`}
                                target={p.coaUrl ? "_blank" : undefined}
                                rel={p.coaUrl ? "noopener" : undefined}
                                className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 hover:underline"
                              >
                                View COA
                              </a>
                            ) : (
                              <a href={`${editUrl}#lab-testing`} className="inline-block text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 hover:underline">
                                + Add a COA
                              </a>
                            )}
                          </td>
                          <td className="px-5 py-3 text-gray-700">{checkedAgo(p.checkedAt)}</td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => toggleHidden(key)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${hidden ? "bg-gray-300" : "bg-gray-900"}`}
                              aria-label={hidden ? "Hidden" : "Visible"}
                            >
                              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${hidden ? "translate-x-1" : "translate-x-4"}`} />
                            </button>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <a href={editUrl} className="text-xs font-medium text-gray-900 hover:underline">
                              Edit <span className="align-middle">✎</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredProducts.length === 0 && (
                      <tr><td colSpan={7} className="px-5 py-8 text-sm text-gray-600 text-center">No products match your filters.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "badge" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-5">
              <TrustScoreIcon className="w-14 h-14 shrink-0" />
              <div>
                <h2 className="font-semibold text-lg">Your TrustScore badge</h2>
                <p className="text-sm text-gray-700 mt-1">
                  Install this on your site and link it back to ViralPeps to earn the{" "}
                  <span className="font-medium text-gray-700">Domain (+15)</span> signal. We verify
                  it once live.
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full px-3 py-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {props.trustScore}/100 · {props.trustTicks.length ? props.trustTicks.join(" · ") : "No signals yet"}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Embed code
              </div>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto leading-relaxed">
                  <code>{embedSnippet}</code>
                </pre>
                <button
                  onClick={copyEmbed}
                  className="absolute top-2 right-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-md px-2.5 py-1"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Paste it in your site&apos;s <code className="bg-gray-100 px-1 rounded">{"<head>"}</code> or
                footer. The badge floats bottom-right and links back to your listing.
              </p>
            </div>
          </div>
        )}

        {tab === "affiliate" && (
          <AffiliateNetwork
            slug={props.slug}
            connection={
              props.affiliateConnection ?? {
                connected: false,
                token_hint: null,
                connected_at: null,
                store_url: null,
              }
            }
            sales={(props.sales ?? []).map((s) => ({
              id: Number(s.id ?? 0),
              order_id: String((s as any).order_id ?? ""),
              order_value: Number(s.order_value ?? 0),
              commission_amount: Number(s.commission_amount ?? 0),
              status: String((s as any).status ?? "completed"),
              customer_type: (s as any).customer_type ?? null,
              created_at: String(s.created_at ?? new Date().toISOString()),
              ignored_reason: (s as any).ignored_reason ?? null,
            }))}
            commissionRate={props.commissionRate}
          />
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

        {tab === "invoices" && (
          <Placeholder
            title="Invoices"
            desc="Your billing history and invoices will appear here."
          />
        )}

        {tab === "documents" && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <FileTextIcon />
            </div>
            <h2 className="font-semibold text-gray-900">Nothing to sign</h2>
            <p className="text-sm text-gray-600 mt-1 max-w-sm mx-auto">
              When we send you an order form or agreement it appears here, ready to read and sign.
            </p>
          </div>
        )}

        {tab === "terms" && (
          <Placeholder
            title="Terms & Conditions"
            desc="Your supplier agreement and platform terms will be available here."
          />
        )}
      </div>
    </div>
  );
}
