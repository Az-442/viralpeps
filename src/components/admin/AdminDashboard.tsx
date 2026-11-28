"use client";

import { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AffiliateRequest } from "@/lib/affiliate-requests";
import AdminSidebar from "./AdminSidebar";
import DateRangeFilter, { presetRange, type DateRange } from "../shared/DateRangeFilter";

export interface VendorPerf {
  slug: string;
  name: string;
  trust: number;
  clicksAll: number;
  clicks90: number;
  clicks30: number;
  clicks7: number;
  salesAll: number;
  sales90: number;
  sales30: number;
  sales7: number;
  commissionAll: number;
  commission90: number;
  commission30: number;
  commission7: number;
  revenueAll: number;
  revenue90: number;
  revenue30: number;
  revenue7: number;
  /** Raw per-event series so the client can compute ANY custom date window. */
  clickTs?: number[];
  saleEvents?: { t: number; commission: number; value: number }[];
}

export interface SellerAccount {
  slug: string;
  name: string;
  email: string;
  active: boolean;
  trust: number;
  clicks: number;
  sales: number;
  commission: number;
  commissionRate: number;
  affiliateJoinedAt: string | null;
  apiKey: string | null;
  badgeToken: string | null;
  createdAt: string | null;
  entityType: string | null;
  entityTypeVerified: string | null;
  paymentMethod: string | null;
  paymentMethodVerified: string | null;
  reviewStatus: string | null;
}

export interface OwnerOrder {
  id: number;
  orderId: string;
  value: number;
  commission: number;
  status: string;
  customerType: string | null;
  createdAt: string | null;
}

export interface ProfileReview {
  slug: string;
  name: string;
  entityType: string | null;
  paymentMethod: string | null;
  entityTypeVerified: string | null;
  paymentMethodVerified: string | null;
  status: string | null;
  updatedAt: string | null;
}

export interface ClaimRequest {
  id: number;
  slug: string;
  name: string;
  email: string;
  domainMatch: boolean;
  status: string;
  createdAt: string | null;
}

function fmtMoney(n: number): string {
  return n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

function band(s: number): string {
  if (s >= 86) return "#059669";
  if (s >= 65) return "#10b981";
  if (s >= 45) return "#d97706";
  if (s >= 30) return "#ea580c";
  return "#e11d48";
}

export default function AdminDashboard({
  vendors,
  sellers,
  ordersBySeller,
  affiliateRequests,
  affiliateApproved,
  profileReviews,
  claims,
  dataRange,
  ownerName,
}: {
  vendors: VendorPerf[];
  sellers: SellerAccount[];
  ordersBySeller: Record<string, OwnerOrder[]>;
  affiliateRequests: AffiliateRequest[];
  affiliateApproved: Record<string, string | null>;
  profileReviews: ProfileReview[];
  claims: ClaimRequest[];
  dataRange?: string;
  ownerName?: string;
}) {
  const [tab, setTab] = useState<"network" | "sellers" | "requests" | "reviews" | "claims">("network");
  const [range, setRange] = useState<DateRange>(presetRange("30"));
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<"clicks" | "sales" | "commission" | "revenue">("clicks");
  const [asc, setAsc] = useState(false);
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const [reviewDecided, setReviewDecided] = useState<Record<string, string>>({});

  async function approveAffiliate(slug: string) {
    try {
      const r = await fetch("/api/sellers/approve-affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (r.ok) setApproved((p) => ({ ...p, [slug]: true }));
    } catch {
      /* no-op */
    }
  }

  async function reviewAction(slug: string, action: "approve" | "reject") {
    try {
      const r = await fetch("/api/sellers/profile-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
      });
      if (r.ok) setReviewDecided((p) => ({ ...p, [slug]: action }));
    } catch {
      /* no-op */
    }
  }

  const [claimDecided, setClaimDecided] = useState<Record<number, string>>({});
  const [sellerOpen, setSellerOpen] = useState<string | null>(null);
  const router = useRouter();

  async function claimAction(id: number, action: "approve" | "reject") {
    try {
      const r = await fetch("/api/claim-listing/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (r.ok) setClaimDecided((p) => ({ ...p, [id]: action }));
    } catch {
      /* no-op */
    }
  }

  const rows = useMemo(() => {
    const r = vendors.map((v) => {
      // Presets use the server-side aggregates; a custom window is computed
      // from the raw per-event series shipped alongside them.
      let clicks: number;
      let sales: number;
      let commission: number;
      let revenue: number;
      if (range.key === "custom") {
        const inWin = (t: number) => t >= range.from && t <= range.to;
        clicks = (v.clickTs ?? []).filter(inWin).length;
        const ev = (v.saleEvents ?? []).filter((e) => inWin(e.t));
        sales = ev.length;
        commission = ev.reduce((a, e) => a + e.commission, 0);
        revenue = ev.reduce((a, e) => a + e.value, 0);
      } else {
        const k = range.key === "all" ? "All" : range.key;
        clicks = k === "7" ? v.clicks7 : k === "30" ? v.clicks30 : k === "90" ? v.clicks90 : v.clicksAll;
        sales = k === "7" ? v.sales7 : k === "30" ? v.sales30 : k === "90" ? v.sales90 : v.salesAll;
        commission = k === "7" ? v.commission7 : k === "30" ? v.commission30 : k === "90" ? v.commission90 : v.commissionAll;
        revenue = k === "7" ? v.revenue7 : k === "30" ? v.revenue30 : k === "90" ? v.revenue90 : v.revenueAll;
      }
      return { ...v, clicks, sales, commission, revenue };
    });
    let out = r;
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      out = out.filter((v) => v.name.toLowerCase().includes(t) || v.slug.toLowerCase().includes(t));
    }
    out = out.sort((a, b) => {
      const d = (b[sortKey] as number) - (a[sortKey] as number);
      return asc ? -d : d;
    });
    return out;
  }, [vendors, range, q, sortKey, asc]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, v) => {
        acc.clicks += v.clicks;
        acc.sales += v.sales;
        acc.commission += v.commission;
        acc.revenue += v.revenue;
        return acc;
      },
      { clicks: 0, sales: 0, commission: 0, revenue: 0 }
    );
  }, [rows]);

  function th(label: string, key: "clicks" | "sales" | "commission" | "revenue") {
    const active = sortKey === key;
    return (
      <th
        onClick={() => {
          if (active) setAsc(!asc);
          else {
            setSortKey(key);
            setAsc(false);
          }
        }}
        style={{ padding: ".55rem .9rem", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none", color: active ? "#1d4ed8" : "#111827" }}
      >
        {label} {active ? (asc ? "↑" : "↓") : ""}
      </th>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Sidebar (supplier theme) ── */}
      <AdminSidebar
        active={tab}
        onSelect={(id: "network" | "sellers" | "requests" | "reviews" | "claims") => setTab(id)}
        ownerName={ownerName ?? "Owner"}
        badges={{
          requests: affiliateRequests.length,
          reviews: profileReviews.filter((r) => r.status === "pending").length,
          claims: claims.filter((c) => c.status === "pending").length,
        }}
      />

      {/* ── Main ── */}
      <div className="ml-64 p-6">
        {/* Hero — mirrors the supplier portal hero */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] text-white p-6 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] tracking-widest text-blue-300 uppercase">
                Owner dashboard
              </div>
              <h1 className="text-2xl font-bold mt-1">Affiliate network</h1>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5">
                  {sellers.length} registered sellers
                </span>
                <span className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5">
                  {affiliateRequests.length} join request{affiliateRequests.length === 1 ? "" : "s"}
                </span>
                <span className="bg-white/10 border border-white/15 rounded-full px-2.5 py-0.5">
                  Click data: {dataRange || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {tab === "network" ? (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {[
                ["Clicks", totals.clicks.toLocaleString()],
                ["Sales", totals.sales.toLocaleString()],
                ["Commission", fmtMoney(totals.commission)],
                ["Referred revenue", fmtMoney(totals.revenue)],
              ].map(([l, v]) => (
                <div key={l} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-700">{l}</div>
                  <div className="text-2xl font-bold mt-1">{v}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4 items-center flex-wrap">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search supplier…"
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <DateRangeFilter value={range} onChange={setRange} variant="light" />
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div style={{ maxHeight: "calc(100vh - 360px)" }} className="overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-left sticky top-0 bg-white">
                      <th className="py-2 px-4 font-semibold">Supplier</th>
                      <th className="py-2 px-3 font-semibold">TrustScore</th>
                      <th className="py-2 px-3 font-semibold cursor-pointer select-none" onClick={() => { if (sortKey === "clicks") setAsc(!asc); else { setSortKey("clicks"); setAsc(false); } }}>Clicks</th>
                      <th className="py-2 px-3 font-semibold cursor-pointer select-none" onClick={() => { if (sortKey === "sales") setAsc(!asc); else { setSortKey("sales"); setAsc(false); } }}>Sales</th>
                      <th className="py-2 px-3 font-semibold cursor-pointer select-none" onClick={() => { if (sortKey === "commission") setAsc(!asc); else { setSortKey("commission"); setAsc(false); } }}>Commission</th>
                      <th className="py-2 px-3 font-semibold cursor-pointer select-none" onClick={() => { if (sortKey === "revenue") setAsc(!asc); else { setSortKey("revenue"); setAsc(false); } }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr><td colSpan={6} className="p-6 text-gray-700">No suppliers match.</td></tr>
                    ) : rows.map((v) => (
                      <tr key={v.slug} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <span className="font-semibold">{v.name}</span>
                          <div className="text-gray-600 text-xs">{v.slug}</div>
                        </td>
                        <td className="py-2 px-3"><span className="font-bold" style={{ color: band(v.trust) }}>{v.trust}</span></td>
                        <td className="py-2 px-3">{v.clicks}</td>
                        <td className="py-2 px-3">{v.sales}</td>
                        <td className="py-2 px-3">{fmtMoney(v.commission)}</td>
                        <td className="py-2 px-3">{fmtMoney(v.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : tab === "requests" ? (
          <>
            <h1 className="text-xl font-bold mb-1">Affiliate join requests</h1>
            <p className="text-sm text-gray-700 mb-4">
              {affiliateRequests.length} request(s) from suppliers wanting to join the affiliate program.
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-2 px-4 font-semibold">Supplier</th>
                    <th className="py-2 px-3 font-semibold">Email</th>
                    <th className="py-2 px-3 font-semibold">Commission</th>
                    <th className="py-2 px-3 font-semibold">Requested</th>
                    <th className="py-2 px-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateRequests.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-gray-700">No join requests yet.</td></tr>
                  ) : affiliateRequests.map((r) => (
                    <tr key={r.slug} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-4">
                        <a href={`/vendors/${r.slug}`} className="font-semibold hover:underline">{r.name || r.slug}</a>
                        <div className="text-gray-600 text-xs">{r.slug}</div>
                      </td>
                      <td className="py-2 px-3 text-gray-800">{r.email || "—"}</td>
                      <td className="py-2 px-3">{r.commissionRate ?? 20}%</td>
                      <td className="py-2 px-3 text-gray-800">
                        {r.requestedAt ? new Date(r.requestedAt).toLocaleString("en-GB") : "—"}
                      </td>
                      <td className="py-2 px-3">
                        {approved[r.slug] || affiliateApproved[r.slug] ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">✓ Approved</span>
                        ) : (
                          <button
                            onClick={() => approveAffiliate(r.slug)}
                            className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : tab === "reviews" ? (
          <>
            <h1 className="text-xl font-bold mb-1">Profile review</h1>
            <p className="text-sm text-gray-700 mb-4">
              Score-affecting claims (entity type + payment method) awaiting your approval. Approve to apply them to the TrustScore.
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-2 px-4 font-semibold">Supplier</th>
                    <th className="py-2 px-3 font-semibold">Claimed entity</th>
                    <th className="py-2 px-3 font-semibold">Claimed payment</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                    <th className="py-2 px-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {profileReviews.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-gray-700">No profile claims yet.</td></tr>
                  ) : profileReviews.map((r) => {
                    const decided = reviewDecided[r.slug] || r.status;
                    return (
                      <tr key={r.slug} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <span className="font-semibold">{r.name || r.slug}</span>
                          <div className="text-gray-600 text-xs">{r.slug}</div>
                        </td>
                        <td className="py-2 px-3 text-gray-800">{r.entityType || "—"}</td>
                        <td className="py-2 px-3 text-gray-800">{r.paymentMethod || "—"}</td>
                        <td className="py-2 px-3">
                          {decided === "pending" ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">Pending</span>
                          ) : decided === "approved" ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">✓ Approved</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">Rejected</span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {decided === "pending" ? (
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => reviewAction(r.slug, "approve")}
                                className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                              >
                                Approve

                              </button>
                              <button
                                onClick={() => reviewAction(r.slug, "reject")}
                                className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-600 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : tab === "claims" ? (
          <>
            <h1 className="text-xl font-bold mb-1">Claim requests</h1>
            <p className="text-sm text-gray-700 mb-4">
              Suppliers claiming ownership of an existing listing. Approving creates their seller account.
            </p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-2 px-4 font-semibold">Listing</th>
                    <th className="py-2 px-3 font-semibold">Email</th>
                    <th className="py-2 px-3 font-semibold">Domain</th>
                    <th className="py-2 px-3 font-semibold">Requested</th>
                    <th className="py-2 px-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-gray-700">No claim requests yet.</td></tr>
                  ) : claims.map((c) => {
                    const decided = claimDecided[c.id] || c.status;
                    return (
                      <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <span className="font-semibold">{c.name || c.slug}</span>
                          <div className="text-gray-600 text-xs">{c.slug}</div>
                        </td>
                        <td className="py-2 px-3 text-gray-800">{c.email}</td>
                        <td className="py-2 px-3">
                          {c.domainMatch ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">✓ match</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">verify</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-gray-800">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString("en-GB") : "—"}
                        </td>
                        <td className="py-2 px-3">
                          {decided === "pending" ? (
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => claimAction(c.id, "approve")}
                                className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => claimAction(c.id, "reject")}
                                className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          ) : decided === "approved" ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">✓ Approved</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">Rejected</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-1">Registered sellers</h1>
            <p className="text-sm text-gray-700 mb-4">{sellers.length} seller account(s).</p>
            <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="py-2 px-4 font-semibold">Supplier</th>
                    <th className="py-2 px-3 font-semibold">TrustScore</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                    <th className="py-2 px-3 font-semibold">Affiliate</th>
                    <th className="py-2 px-3 font-semibold">Clicks</th>
                    <th className="py-2 px-3 font-semibold">Sales</th>
                    <th className="py-2 px-3 font-semibold">Commission</th>
                    <th className="py-2 px-3 font-semibold">Email</th>
                    <th className="py-2 px-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.length === 0 ? (
                    <tr><td colSpan={9} className="p-6 text-gray-700">No sellers registered yet.</td></tr>
                  ) : sellers.map((s) => (
                    <Fragment key={s.slug}>
                    <tr className={`border-b border-gray-100 hover:bg-gray-50 ${s.active ? "" : "bg-amber-50"}`}>
                      <td className="py-2 px-4">
                        <a href={`/vendors/${s.slug}`} className="font-semibold hover:underline">{s.name || s.slug}</a>
                        <div className="text-gray-600 text-xs">{s.slug}</div>
                      </td>
                      <td className="py-2 px-3"><span className="font-bold" style={{ color: band(s.trust) }}>{s.trust}</span></td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${
                          s.active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}>
                          {s.active ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        {s.affiliateJoinedAt ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">✓ Joined</span>
                        ) : (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">{s.clicks}</td>
                      <td className="py-2 px-3">{s.sales}</td>
                      <td className="py-2 px-3">{fmtMoney(s.commission)}</td>
                      <td className="py-2 px-3 text-gray-800">{s.email ?? "—"}</td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => setSellerOpen(sellerOpen === s.slug ? null : s.slug)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-semibold"
                        >
                          {sellerOpen === s.slug ? "Close" : "Manage"}
                        </button>
                      </td>
                    </tr>
                    {sellerOpen === s.slug && (
                      <tr>
                        <td colSpan={9} className="px-4 pt-3 pb-4 bg-gray-50 border-b border-gray-200">
                          <SellerManagePanel
                            seller={s}
                            orders={ordersBySeller[s.slug] ?? []}
                            onDone={() => router.refresh()}
                          />
                        </td>
                      </tr>
                    )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Seller management panel ─────────────────────────────────────────────────
// Full owner control over a registered seller: suspend/activate, edit profile +
// commission, reset password, rotate API key / badge token, force-verify entity
// + payment, revoke affiliate, delete account. Every action hits /api/admin/sellers.

function SellerManagePanel({
  seller,
  orders,
  onDone,
}: {
  seller: SellerAccount;
  orders: OwnerOrder[];
  onDone: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState(seller.name);
  const [email, setEmail] = useState(seller.email);
  const [rate, setRate] = useState(String(seller.commissionRate ?? 20));
  const [password, setPassword] = useState("");

  async function call(action: string, extra: Record<string, unknown> = {}) {
    setBusy(action);
    setMsg(null);
    setErr(null);
    try {
      const r = await fetch("/api/admin/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: seller.slug, action, ...extra }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErr(data.error || `failed (${r.status})`);
      } else {
        if (data.api_key || data.badge_token) {
          setMsg(
            [
              data.api_key ? `New API key: ${data.api_key}` : "",
              data.badge_token ? `New badge token: ${data.badge_token}` : "",
            ].filter(Boolean).join(" · ")
          );
        } else {
          setMsg("Done");
        }
        onDone();
      }
    } catch {
      setErr("network error");
    } finally {
      setBusy(null);
    }
  }

  const btn = (label: string, action: string, opts?: { danger?: boolean; extra?: Record<string, unknown>; confirm?: string }) => (
    <button
      key={action + label}
      disabled={busy !== null}
      onClick={() => {
        if (opts?.confirm && !window.confirm(opts.confirm)) return;
        call(action, opts?.extra);
      }}
      style={{
        fontSize: ".74rem",
        padding: "5px 11px",
        borderRadius: 8,
        cursor: busy ? "default" : "pointer",
        fontWeight: 600,
        opacity: busy && busy !== action ? 0.5 : 1,
        border: opts?.danger ? "1px solid #fecaca" : "1px solid #d1d5db",
        background: opts?.danger ? "#fef2f2" : "#fff",
        color: opts?.danger ? "#b91c1c" : "#111827",
      }}
    >
      {busy === action ? "…" : label}
    </button>
  );

  const rowStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".7rem" };
  const labelStyle: React.CSSProperties = { fontSize: ".7rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: ".25rem" };
  const inputStyle: React.CSSProperties = { fontSize: ".8rem", padding: "5px 8px", border: "1px solid #d1d5db", borderRadius: 8, color: "#111827", background: "#fff" };

  return (
    <div style={{ display: "grid", gap: ".8rem", maxWidth: 980 }}>
      <div style={rowStyle}>
        <div style={{ flex: "1 1 200px" }}>
          <div style={labelStyle}>Name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
        </div>
        <div style={{ flex: "1 1 220px" }}>
          <div style={labelStyle}>Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, width: "100%" }} />
        </div>
        <div style={{ flex: "0 0 130px" }}>
          <div style={labelStyle}>Commission %</div>
          <input value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" style={{ ...inputStyle, width: "100%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            disabled={busy !== null}
            onClick={() => call("edit", { fields: { name, email, commission_rate: Number(rate) } })}
            style={{ fontSize: ".74rem", padding: "6px 12px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            {busy === "edit" ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>

      <div>
        <div style={labelStyle}>Account</div>
        <div style={rowStyle}>
          {seller.active
            ? btn("Suspend access", "suspend", { danger: true, confirm: "Suspend this seller? They will be logged out immediately." })
            : btn("Reactivate", "activate")}
          {btn("Rotate API key + badge", "rotate", { extra: { what: "both" }, confirm: "Rotate both credentials? The seller's current ones stop working." })}
          {btn("Rotate API key only", "rotate", { extra: { what: "api_key" } })}
          {btn("Rotate badge only", "rotate", { extra: { what: "badge_token" } })}
          {seller.affiliateJoinedAt
            ? btn("Revoke affiliate", "revoke-affiliate", { danger: true, confirm: "Revoke affiliate status for this seller?" })
            : null}
          {btn("Delete account", "delete", { danger: true, confirm: "Permanently delete this seller and their profile? This cannot be undone." })}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Password</div>
        <div style={rowStyle}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (min 8 chars)"
            style={{ ...inputStyle, flex: "0 0 240px" }}
          />
          <button
            disabled={busy !== null || password.length < 8}
            onClick={() => { call("reset-password", { password }); setPassword(""); }}
            style={{ fontSize: ".74rem", padding: "6px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#111827", fontWeight: 600, cursor: password.length < 8 ? "default" : "pointer", opacity: password.length < 8 ? 0.5 : 1 }}
          >
            {busy === "reset-password" ? "…" : "Reset password"}
          </button>
        </div>
      </div>

      <div>
        <div style={labelStyle}>Score-affecting verified flags (manual override)</div>
        <div style={rowStyle}>
          <span style={{ fontSize: ".75rem", color: "#111827", alignSelf: "center" }}>
            Entity: <strong>{seller.entityTypeVerified || "—"}</strong> · Payment: <strong>{seller.paymentMethodVerified || "—"}</strong>
          </span>
        </div>
        <div style={rowStyle}>
          {btn("Set Ltd", "set-verified", { extra: { entityType: "ltd" } })}
          {btn("Set Sole trader", "set-verified", { extra: { entityType: "sole_trader" } })}
          {btn("Set Card", "set-verified", { extra: { paymentMethod: "card" } })}
          {btn("Set Bank", "set-verified", { extra: { paymentMethod: "bank" } })}
          {btn("Set Crypto", "set-verified", { extra: { paymentMethod: "crypto" } })}
        </div>
      </div>

      <div style={{ fontSize: ".75rem", color: "#111827" }}>
        <div>API key: <code style={{ fontSize: ".72rem" }}>{seller.apiKey || "—"}</code></div>
        <div>Badge token: <code style={{ fontSize: ".72rem" }}>{seller.badgeToken || "—"}</code></div>
        <div>Registered: {seller.createdAt ? new Date(seller.createdAt).toLocaleString("en-GB") : "—"}</div>
      </div>

      {/* ── Order ledger: every order this supplier has reported ─────────── */}
      <div>
        <div style={labelStyle}>Orders ({orders.length})</div>
        <OwnerOrderTable orders={orders} />
      </div>

      {msg && <div style={{ fontSize: ".75rem", color: "#047857", fontWeight: 600, wordBreak: "break-all" }}>{msg}</div>}
      {err && <div style={{ fontSize: ".75rem", color: "#b91c1c", fontWeight: 600 }}>{err}</div>}
    </div>
  );
}

/**
 * Full order ledger with status-aware totals.
 *
 * Refunded and cancelled orders stay visible so the owner can audit them, but
 * their value is shown struck through and their commission as a negative, and
 * they are excluded from the totals — a reversed sale must not inflate what the
 * owner believes the network earned.
 */
function OwnerOrderTable({ orders }: { orders: OwnerOrder[] }) {
  const reversed = orders.filter((o) => o.status === "refunded" || o.status === "cancelled");
  const live = orders.filter((o) => o.status !== "refunded" && o.status !== "cancelled");

  const liveValue = live.reduce((a, o) => a + o.value, 0);
  const liveCommission = live.reduce((a, o) => a + o.commission, 0);
  const reversedValue = reversed.reduce((a, o) => a + o.value, 0);
  const reversedCommission = reversed.reduce((a, o) => a + Math.abs(o.commission), 0);

  if (orders.length === 0) {
    return (
      <div style={{ fontSize: ".78rem", color: "#6b7280", padding: ".6rem 0" }}>
        No orders reported yet. They appear here as soon as this supplier&rsquo;s store
        sends a conversion, including unpaid orders.
      </div>
    );
  }

  const pill = (status: string) => {
    const map: Record<string, { bg: string; fg: string; bd: string }> = {
      completed: { bg: "#ecfdf5", fg: "#047857", bd: "#a7f3d0" },
      pending: { bg: "#fffbeb", fg: "#b45309", bd: "#fde68a" },
      failed: { bg: "#fef2f2", fg: "#b91c1c", bd: "#fecaca" },
      refunded: { bg: "#fef2f2", fg: "#b91c1c", bd: "#fecaca" },
      cancelled: { bg: "#f3f4f6", fg: "#4b5563", bd: "#e5e7eb" },
    };
    const c = map[status] ?? map.cancelled;
    return (
      <span
        style={{
          display: "inline-block",
          fontSize: ".68rem",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 999,
          background: c.bg,
          color: c.fg,
          border: `1px solid ${c.bd}`,
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.4rem", marginBottom: ".6rem" }}>
        <Stat label="Live orders" value={String(live.length)} />
        <Stat label="Order value" value={fmtMoney(liveValue)} />
        <Stat label="Commission" value={fmtMoney(liveCommission)} />
        {reversed.length > 0 && (
          <>
            <Stat label="Reversed orders" value={String(reversed.length)} tone="danger" />
            <Stat label="Reversed value" value={fmtMoney(reversedValue)} tone="danger" />
            <Stat label="Reversed commission" value={fmtMoney(reversedCommission)} tone="danger" />
          </>
        )}
      </div>

      <div style={{ maxHeight: 340, overflow: "auto", border: "1px solid #e5e7eb", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
          <thead>
            <tr style={{ background: "#f9fafb", textAlign: "left", position: "sticky", top: 0 }}>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700 }}>Order</th>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700 }}>Date</th>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700 }}>Customer</th>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700, textAlign: "right" }}>Value</th>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700, textAlign: "right" }}>Commission</th>
              <th style={{ padding: ".45rem .7rem", fontWeight: 700, textAlign: "right" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const isReversed = o.status === "refunded" || o.status === "cancelled";
              const isOpen = o.status === "pending" || o.status === "failed";
              return (
                <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: ".45rem .7rem", fontFamily: "ui-monospace, monospace" }}>{o.orderId}</td>
                  <td style={{ padding: ".45rem .7rem", color: "#4b5563" }}>
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" }) : "—"}
                  </td>
                  <td style={{ padding: ".45rem .7rem", color: "#4b5563" }}>
                    {o.customerType === "existing" ? "Repeat" : "New"}
                  </td>
                  <td
                    style={{
                      padding: ".45rem .7rem",
                      textAlign: "right",
                      color: isReversed ? "#b91c1c" : "#111827",
                      textDecoration: isReversed ? "line-through" : "none",
                    }}
                  >
                    {fmtMoney(o.value)}
                  </td>
                  <td
                    style={{
                      padding: ".45rem .7rem",
                      textAlign: "right",
                      fontWeight: 600,
                      color: isReversed ? "#b91c1c" : isOpen ? "#9ca3af" : "#111827",
                    }}
                  >
                    {isOpen ? "—" : `${isReversed ? "−" : ""}${fmtMoney(Math.abs(o.commission))}`}
                  </td>
                  <td style={{ padding: ".45rem .7rem", textAlign: "right" }}>{pill(o.status)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "danger" }) {
  return (
    <div>
      <div style={{ fontSize: ".66rem", textTransform: "uppercase", letterSpacing: ".05em", color: tone === "danger" ? "#b91c1c" : "#6b7280", fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ fontSize: "1.05rem", fontWeight: 700, color: tone === "danger" ? "#b91c1c" : "#111827" }}>{value}</div>
    </div>
  );
}
