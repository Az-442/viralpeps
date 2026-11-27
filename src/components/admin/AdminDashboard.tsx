"use client";

import { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  affiliateApproved,
  profileReviews,
  claims,
  dataRange,
}: {
  vendors: VendorPerf[];
  sellers: SellerAccount[];
  affiliateRequests: AffiliateRequest[];
  affiliateApproved: Record<string, string | null>;
  profileReviews: ProfileReview[];
  claims: ClaimRequest[];
  dataRange?: string;
}) {
  const [tab, setTab] = useState<"network" | "sellers" | "requests" | "reviews" | "claims">("network");
  const [win, setWin] = useState<WinKey>("All");
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
            ["claims", "Claim requests", "🏷️"],
            ["reviews", "Profile review", "🛡️"],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              onClick={() => setTab(id as "network" | "sellers" | "requests" | "reviews" | "claims")}
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
              {id === "reviews" && profileReviews.filter((r) => r.status === "pending").length > 0 && (
                <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", fontSize: ".7rem", fontWeight: 700, padding: "1px 8px", borderRadius: 999 }}>
                  {profileReviews.filter((r) => r.status === "pending").length}
                </span>
              )}
              {id === "claims" && claims.filter((c) => c.status === "pending").length > 0 && (
                <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", fontSize: ".7rem", fontWeight: 700, padding: "1px 8px", borderRadius: 999 }}>
                  {claims.filter((c) => c.status === "pending").length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: ".8rem 1.1rem", borderTop: "1px solid #f3f4f6", fontSize: ".72rem", color: "#374151" }}>
          <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Back to site ↗</a>
          <button
            onClick={async () => {
              await fetch("/api/owner/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            style={{
              marginTop: ".55rem", width: "100%", textAlign: "left", background: "transparent",
              border: "none", padding: 0, color: "#b91c1c", cursor: "pointer", fontSize: ".72rem",
            }}
          >
            Sign out
          </button>
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
                    <th style={{ padding: ".55rem .9rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateRequests.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: "1.5rem", color: "#374151" }}>No join requests yet.</td></tr>
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
                      <td style={{ padding: ".5rem .9rem" }}>
                        {approved[r.slug] || affiliateApproved[r.slug] ? (
                          <span style={{ fontSize: ".72rem", padding: "2px 10px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontWeight: 600 }}>✓ Approved</span>
                        ) : (
                          <button
                            onClick={() => approveAffiliate(r.slug)}
                            style={{ fontSize: ".75rem", padding: "4px 12px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", cursor: "pointer", fontWeight: 600 }}
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
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Profile review</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>
              Score-affecting claims (entity type + payment method) awaiting your approval. Approve to apply them to the TrustScore.
            </p>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                    <th style={{ padding: ".55rem 1.1rem" }}>Supplier</th>
                    <th style={{ padding: ".55rem .9rem" }}>Claimed entity</th>
                    <th style={{ padding: ".55rem .9rem" }}>Claimed payment</th>
                    <th style={{ padding: ".55rem .9rem" }}>Status</th>
                    <th style={{ padding: ".55rem .9rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {profileReviews.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: "1.5rem", color: "#374151" }}>No profile claims yet.</td></tr>
                  ) : profileReviews.map((r) => {
                    const decided = reviewDecided[r.slug] || r.status;
                    return (
                      <tr key={r.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: ".5rem 1.1rem" }}>
                          <span style={{ fontWeight: 600 }}>{r.name || r.slug}</span>
                          <div style={{ color: "#374151", fontSize: ".72rem" }}>{r.slug}</div>
                        </td>
                        <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{r.entityType || "—"}</td>
                        <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{r.paymentMethod || "—"}</td>
                        <td style={{ padding: ".5rem .9rem" }}>
                          {decided === "pending" ? (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#fef3c7", color: "#b45309", fontWeight: 600 }}>Pending</span>
                          ) : decided === "approved" ? (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontWeight: 600 }}>✓ Approved</span>
                          ) : (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#fef2f2", color: "#b91c1c", fontWeight: 600 }}>Rejected</span>
                          )}
                        </td>
                        <td style={{ padding: ".5rem .9rem" }}>
                          {decided === "pending" ? (
                            <div style={{ display: "flex", gap: ".4rem" }}>
                              <button
                                onClick={() => reviewAction(r.slug, "approve")}
                                style={{ fontSize: ".75rem", padding: "4px 12px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => reviewAction(r.slug, "reject")}
                                style={{ fontSize: ".75rem", padding: "4px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#111827", cursor: "pointer", fontWeight: 600 }}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{ color: "#374151", fontSize: ".75rem" }}>—</span>
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
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Claim requests</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>
              Suppliers claiming ownership of an existing listing. Approving creates their seller account.
            </p>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                    <th style={{ padding: ".55rem 1.1rem" }}>Listing</th>
                    <th style={{ padding: ".55rem .9rem" }}>Email</th>
                    <th style={{ padding: ".55rem .9rem" }}>Domain</th>
                    <th style={{ padding: ".55rem .9rem" }}>Requested</th>
                    <th style={{ padding: ".55rem .9rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: "1.5rem", color: "#374151" }}>No claim requests yet.</td></tr>
                  ) : claims.map((c) => {
                    const decided = claimDecided[c.id] || c.status;
                    return (
                      <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: ".5rem 1.1rem" }}>
                          <span style={{ fontWeight: 600 }}>{c.name || c.slug}</span>
                          <div style={{ color: "#374151", fontSize: ".72rem" }}>{c.slug}</div>
                        </td>
                        <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{c.email}</td>
                        <td style={{ padding: ".5rem .9rem" }}>
                          {c.domainMatch ? (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontWeight: 600 }}>✓ match</span>
                          ) : (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#fef3c7", color: "#b45309", fontWeight: 600 }}>verify</span>
                          )}
                        </td>
                        <td style={{ padding: ".5rem .9rem", color: "#111827" }}>
                          {c.createdAt ? new Date(c.createdAt).toLocaleString("en-GB") : "—"}
                        </td>
                        <td style={{ padding: ".5rem .9rem" }}>
                          {decided === "pending" ? (
                            <div style={{ display: "flex", gap: ".4rem" }}>
                              <button
                                onClick={() => claimAction(c.id, "approve")}
                                style={{ fontSize: ".75rem", padding: "4px 12px", borderRadius: 8, border: "none", background: "#1d4ed8", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => claimAction(c.id, "reject")}
                                style={{ fontSize: ".75rem", padding: "4px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#111827", cursor: "pointer", fontWeight: 600 }}
                              >
                                Reject
                              </button>
                            </div>
                          ) : decided === "approved" ? (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontWeight: 600 }}>✓ Approved</span>
                          ) : (
                            <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#fef2f2", color: "#b91c1c", fontWeight: 600 }}>Rejected</span>
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
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Registered sellers</h1>
            <p style={{ color: "#111827", margin: ".2rem 0 1.2rem", fontSize: ".85rem" }}>{sellers.length} seller account(s).</p>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                    <th style={{ padding: ".55rem 1.1rem" }}>Supplier</th>
                    <th style={{ padding: ".55rem .9rem" }}>TrustScore</th>
                    <th style={{ padding: ".55rem .9rem" }}>Status</th>
                    <th style={{ padding: ".55rem .9rem" }}>Affiliate</th>
                    <th style={{ padding: ".55rem .9rem" }}>Clicks</th>
                    <th style={{ padding: ".55rem .9rem" }}>Sales</th>
                    <th style={{ padding: ".55rem .9rem" }}>Commission</th>
                    <th style={{ padding: ".55rem .9rem" }}>Email</th>
                    <th style={{ padding: ".55rem .9rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: "1.5rem", color: "#374151" }}>No sellers registered yet.</td></tr>
                  ) : sellers.map((s) => (
                    <Fragment key={s.slug}>
                    <tr style={{ borderBottom: "1px solid #f3f4f6", background: s.active ? undefined : "#fffbeb" }}>
                      <td style={{ padding: ".5rem 1.1rem" }}>
                        <a href={`/vendors/${s.slug}`} style={{ fontWeight: 600 }}>{s.name || s.slug}</a>
                        <div style={{ color: "#374151", fontSize: ".72rem" }}>{s.slug}</div>
                      </td>
                      <td style={{ padding: ".5rem .9rem" }}><span style={{ fontWeight: 700, color: band(s.trust) }}>{s.trust}</span></td>
                      <td style={{ padding: ".5rem .9rem" }}>
                        <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: s.active ? "#ecfdf5" : "#fef2f2", color: s.active ? "#047857" : "#b91c1c", fontWeight: 600 }}>
                          {s.active ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td style={{ padding: ".5rem .9rem" }}>
                        {s.affiliateJoinedAt ? (
                          <span style={{ fontSize: ".72rem", padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontWeight: 600 }}>✓ Joined</span>
                        ) : (
                          <span style={{ fontSize: ".72rem", color: "#374151" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: ".5rem .9rem" }}>{s.clicks}</td>
                      <td style={{ padding: ".5rem .9rem" }}>{s.sales}</td>
                      <td style={{ padding: ".5rem .9rem" }}>{fmtMoney(s.commission)}</td>
                      <td style={{ padding: ".5rem .9rem", color: "#111827" }}>{s.email ?? "—"}</td>
                      <td style={{ padding: ".5rem .9rem" }}>
                        <button
                          onClick={() => setSellerOpen(sellerOpen === s.slug ? null : s.slug)}
                          style={{ fontSize: ".72rem", padding: "4px 10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", color: "#111827", cursor: "pointer", fontWeight: 600 }}
                        >
                          {sellerOpen === s.slug ? "Close" : "Manage"}
                        </button>
                      </td>
                    </tr>
                    {sellerOpen === s.slug && (
                      <tr>
                        <td colSpan={9} style={{ padding: ".9rem 1.1rem 1.2rem", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                          <SellerManagePanel seller={s} onDone={() => router.refresh()} />
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

function SellerManagePanel({ seller, onDone }: { seller: SellerAccount; onDone: () => void }) {
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

      {msg && <div style={{ fontSize: ".75rem", color: "#047857", fontWeight: 600, wordBreak: "break-all" }}>{msg}</div>}
      {err && <div style={{ fontSize: ".75rem", color: "#b91c1c", fontWeight: 600 }}>{err}</div>}
    </div>
  );
}
