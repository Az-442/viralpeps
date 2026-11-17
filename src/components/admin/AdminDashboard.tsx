"use client";

import { useMemo, useState } from "react";
import type { AffiliateRequest } from "@/lib/affiliate-requests";

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
}

const WINDOWS = [
  { key: "7", label: "Last 7 days" },
  { key: "30", label: "Last 30 days" },
  { key: "90", label: "Last 90 days" },
  { key: "All", label: "All time" },
] as const;

type WinKey = (typeof WINDOWS)[number]["key"];

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
  affiliateRequests,
  dataRange,
}: {
  vendors: VendorPerf[];
  sellers: SellerAccount[];
  affiliateRequests: AffiliateRequest[];
  dataRange?: string;
}) {
  const [tab, setTab] = useState<"network" | "sellers" | "requests">("network");
  const [win, setWin] = useState<WinKey>("All");
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<"clicks" | "sales" | "commission" | "revenue">("clicks");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
    const r = vendors.map((v) => {
      const clicks = win === "7" ? v.clicks7 : win === "30" ? v.clicks30 : win === "90" ? v.clicks90 : v.clicksAll;
      const sales = win === "7" ? v.sales7 : win === "30" ? v.sales30 : win === "90" ? v.sales90 : v.salesAll;
      const commission = win === "7" ? v.commission7 : win === "30" ? v.commission30 : win === "90" ? v.commission90 : v.commissionAll;
      const revenue = win === "7" ? v.revenue7 : win === "30" ? v.revenue30 : win === "90" ? v.revenue90 : v.revenueAll;
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
  }, [vendors, win, q, sortKey, asc]);

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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#f9fafb" }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #e5e7eb", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1rem 1.1rem", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ fontWeight: 700, fontSize: ".95rem" }}>Affiliate Network</div>
          <div style={{ fontSize: ".65rem", letterSpacing: ".2em", color: "#374151" }}>VIRALPEPS</div>
        </div>
        <nav style={{ flex: 1, padding: ".5rem .7rem" }}>
          {[
            ["network", "Network performance", "📊"],
            ["sellers", "Registered sellers", "👥"],
            ["requests", "Join requests", "🔔"],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setTab(id as "network" | "sellers" | "requests")}
              style={{
                width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: ".5rem",
                padding: ".55rem .7rem", borderRadius: 8, border: "none", background: tab === id ? "#eff6ff" : "transparent",
                color: tab === id ? "#1d4ed8" : "#111827", fontSize: ".85rem", cursor: "pointer", fontWeight: tab === id ? 600 : 400,
              }}
            >
              <span>{icon}</span> {label}
              {id === "requests" && affiliateRequests.length > 0 && (
                <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", fontSize: ".7rem", fontWeight: 700, padding: "1px 8px", borderRadius: 999 }}>
                  {affiliateRequests.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: ".8rem 1.1rem", borderTop: "1px solid #f3f4f6", fontSize: ".72rem", color: "#374151" }}>
          <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Back to site ↗</a>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ marginLeft: 220, flex: 1, padding: "1.6rem 1.8rem" }}>
        {tab === "network" ? (
          <>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Network performance</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>
              Every supplier&apos;s referral clicks, sales and commission.{" "}
              <span style={{ color: "#374151" }}>Click data: {dataRange || "—"}</span>
            </p>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: ".9rem", marginBottom: "1.2rem" }}>
              {[
                ["Clicks", totals.clicks.toLocaleString()],
                ["Sales", totals.sales.toLocaleString()],
                ["Commission", fmtMoney(totals.commission)],
                ["Referred revenue", fmtMoney(totals.revenue)],
              ].map(([l, v]) => (
                <div key={l} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: ".9rem" }}>
                  <div style={{ fontSize: ".75rem", color: "#111827" }}>{l}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: ".7rem", marginBottom: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search supplier…"
                style={{ padding: ".5rem .8rem", border: "1px solid #d1d5db", borderRadius: 8, fontSize: ".85rem", width: 240 }}
              />
              {WINDOWS.map((w) => (
                <button
                  key={w.key}
                  onClick={() => setWin(w.key)}
                  style={{
                    padding: ".45rem .8rem", borderRadius: 999, border: "1px solid #d1d5db", cursor: "pointer",
                    background: win === w.key ? "#1d4ed8" : "#fff", color: win === w.key ? "#fff" : "#111827",
                    fontSize: ".8rem",
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left", position: "sticky", top: 0, background: "#fff" }}>
                      <th style={{ padding: ".55rem 1.1rem" }}>Supplier</th>
                      <th style={{ padding: ".55rem .9rem" }}>TrustScore</th>
                      {th("Clicks", "clicks")}
                      {th("Sales", "sales")}
                      {th("Commission", "commission")}
                      {th("Revenue", "revenue")}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: "1.5rem", color: "#374151" }}>No suppliers match.</td></tr>
                    ) : rows.map((v) => (
                      <tr key={v.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: ".5rem 1.1rem" }}>
                          <span style={{ fontWeight: 600 }}>{v.name}</span>
                          <div style={{ color: "#374151", fontSize: ".72rem" }}>{v.slug}</div>
                        </td>
                        <td style={{ padding: ".5rem .9rem" }}><span style={{ fontWeight: 700, color: band(v.trust) }}>{v.trust}</span></td>
                        <td style={{ padding: ".5rem .9rem" }}>{v.clicks}</td>
                        <td style={{ padding: ".5rem .9rem" }}>{v.sales}</td>
                        <td style={{ padding: ".5rem .9rem" }}>{fmtMoney(v.commission)}</td>
                        <td style={{ padding: ".5rem .9rem" }}>{fmtMoney(v.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : tab === "requests" ? (
          <>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Affiliate join requests</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>
              {affiliateRequests.length} request(s) from suppliers wanting to join the affiliate program.
            </p>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                    <th style={{ padding: ".55rem 1.1rem" }}>Supplier</th>
                    <th style={{ padding: ".55rem .9rem" }}>Email</th>
                    <th style={{ padding: ".55rem .9rem" }}>Commission</th>
                    <th style={{ padding: ".55rem .9rem" }}>Requested</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateRequests.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: "1.5rem", color: "#374151" }}>No join requests yet.</td></tr>
                  ) : affiliateRequests.map((r) => (
                    <tr key={r.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: ".5rem 1.1rem" }}>
                        <a href={`/vendors/${r.slug}`} style={{ fontWeight: 600 }}>{r.name || r.slug}</a>
                        <div style={{ color: "#374151", fontSize: ".72rem" }}>{r.slug}</div>
                      </td>
                      <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{r.email || "—"}</td>
                      <td style={{ padding: ".5rem .9rem" }}>{r.commissionRate ?? 20}%</td>
                      <td style={{ padding: ".5rem .9rem", color: "#111827" }}>
                        {r.requestedAt ? new Date(r.requestedAt).toLocaleString("en-GB") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Registered sellers</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>{sellers.length} seller account(s).</p>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                    <th style={{ padding: ".55rem 1.1rem" }}>Supplier</th>
                    <th style={{ padding: ".55rem .9rem" }}>TrustScore</th>
                    <th style={{ padding: ".55rem .9rem" }}>Status</th>
                    <th style={{ padding: ".55rem .9rem" }}>Clicks</th>
                    <th style={{ padding: ".55rem .9rem" }}>Sales</th>
                    <th style={{ padding: ".55rem .9rem" }}>Commission</th>
                    <th style={{ padding: ".55rem .9rem" }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "1.5rem", color: "#374151" }}>No sellers registered yet.</td></tr>
                  ) : sellers.map((s) => (
                    <tr key={s.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: ".5rem 1.1rem" }}>
                        <a href={`/vendors/${s.slug}`} style={{ fontWeight: 600 }}>{s.name || s.slug}</a>
                        <div style={{ color: "#374151", fontSize: ".72rem" }}>{s.slug}</div>
                      </td>
                      <td style={{ padding: ".5rem .9rem" }}><span style={{ fontWeight: 700, color: band(s.trust) }}>{s.trust}</span></td>
                      <td style={{ padding: ".5rem .9rem" }}>
                        <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: s.active ? "#ecfdf5" : "#fef3c7", color: s.active ? "#047857" : "#b45309" }}>
                          {s.active ? "Active" : "Pending"}
                        </span>
                      </td>
                      <td style={{ padding: ".5rem .9rem" }}>{s.clicks}</td>
                      <td style={{ padding: ".5rem .9rem" }}>{s.sales}</td>
                      <td style={{ padding: ".5rem .9rem" }}>{fmtMoney(s.commission)}</td>
                      <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{s.email ?? "—"}</td>
                    </tr>
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
