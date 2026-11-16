import { sql } from "@vercel/postgres";
import { getTrustScore } from "@/lib/trust-score";
import vendorsData from "@/data/vendors.json";

export const dynamic = "force-dynamic";

// Owner dashboard — full network view: every supplier's referral performance
// (clicks, sales, commission, revenue) plus the registered-seller accounts.
// NOTE: no auth yet (unlinked URL). Add an admin key before public exposure.

type Vendor = { slug: string; name: string };

function fmtMoney(n: number | string | null): string {
  return Number(n ?? 0).toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

function scoreBand(s: number): string {
  if (s >= 86) return "text-emerald-600";
  if (s >= 65) return "text-emerald-500";
  if (s >= 45) return "text-amber-500";
  if (s >= 30) return "text-orange-500";
  return "text-rose-500";
}

export default async function AdminPage() {
  const sellers = await sql`
    SELECT s.*, p.coa_verified, p.reviews_verified, p.updated_at AS profile_updated
    FROM sellers s
    LEFT JOIN seller_profiles p ON p.seller_slug = s.slug
    ORDER BY s.active DESC, s.created_at DESC
  `;

  const totals = await sql`
    SELECT
      (SELECT count(*) FROM clicks)::int AS clicks,
      (SELECT count(*) FROM sales)::int AS sales,
      (SELECT COALESCE(sum(commission_amount), 0)::float FROM sales) AS commission,
      (SELECT COALESCE(sum(order_value), 0)::float FROM sales) AS revenue
  `;
  const t = totals.rows[0];

  const perVendor = await sql`
    SELECT
      c.vendor_slug,
      count(*)::int AS clicks,
      COALESCE(s.sales, 0)::int AS sales,
      COALESCE(s.commission, 0)::float AS commission,
      COALESCE(s.revenue, 0)::float AS revenue
    FROM clicks c
    LEFT JOIN (
      SELECT vendor_slug, count(*) AS sales, sum(commission_amount) AS commission, sum(order_value) AS revenue
      FROM sales GROUP BY vendor_slug
    ) s ON s.vendor_slug = c.vendor_slug
    GROUP BY c.vendor_slug, s.sales, s.commission, s.revenue
  `;
  const perfMap: Record<string, any> = {};
  for (const r of perVendor.rows) perfMap[r.vendor_slug] = r;

  // Full network performance: every vendor in vendors.json, joined with clicks/sales.
  const network = (vendorsData as Vendor[])
    .map((v) => {
      const p = perfMap[v.slug];
      return {
        slug: v.slug,
        name: v.name,
        trust: getTrustScore(v.name).score,
        clicks: p?.clicks ?? 0,
        sales: p?.sales ?? 0,
        commission: p?.commission ?? 0,
        revenue: p?.revenue ?? 0,
      };
    })
    .sort((a, b) => b.clicks - a.clicks || b.revenue - a.revenue || a.name.localeCompare(b.name));

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700 }}>ViralPeps — Affiliate Network</h1>
            <p style={{ color: "#555" }}>Supplier referral performance, TrustScore and registered seller accounts.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
          {[
            ["Clicks", t.clicks],
            ["Sales", t.sales],
            ["Commission", fmtMoney(t.commission)],
            ["Referred revenue", fmtMoney(t.revenue)],
          ].map(([label, val]) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontSize: ".8rem", color: "#6b7280" }}>{label}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Full network performance table */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Network performance — all suppliers</h2>
            <div style={{ fontSize: ".8rem", color: "#9ca3af" }}>{network.length} suppliers, sorted by clicks</div>
          </div>
          <div style={{ maxHeight: 560, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left", position: "sticky", top: 0, background: "#fff" }}>
                  <th style={{ padding: ".6rem 1.25rem" }}>Supplier</th>
                  <th style={{ padding: ".6rem 1rem" }}>TrustScore</th>
                  <th style={{ padding: ".6rem 1rem" }}>Clicks</th>
                  <th style={{ padding: ".6rem 1rem" }}>Sales</th>
                  <th style={{ padding: ".6rem 1rem" }}>Commission</th>
                  <th style={{ padding: ".6rem 1rem" }}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {network.map((v) => (
                  <tr key={v.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: ".6rem 1.25rem" }}>
                      <span style={{ fontWeight: 600 }}>{v.name}</span>
                      <div style={{ color: "#9ca3af", fontSize: ".75rem" }}>{v.slug}</div>
                    </td>
                    <td style={{ padding: ".6rem 1rem" }}>
                      <span className={scoreBand(v.trust)} style={{ fontWeight: 700 }}>{v.trust}</span>
                    </td>
                    <td style={{ padding: ".6rem 1rem" }}>{v.clicks}</td>
                    <td style={{ padding: ".6rem 1rem" }}>{v.sales}</td>
                    <td style={{ padding: ".6rem 1rem" }}>{fmtMoney(v.commission)}</td>
                    <td style={{ padding: ".6rem 1rem" }}>{fmtMoney(v.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registered seller accounts */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Registered sellers</h2>
            <div style={{ fontSize: ".8rem", color: "#9ca3af" }}>{sellers.rowCount ?? 0} account(s)</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                <th style={{ padding: ".6rem 1.25rem" }}>Supplier</th>
                <th style={{ padding: ".6rem 1rem" }}>TrustScore</th>
                <th style={{ padding: ".6rem 1rem" }}>Status</th>
                <th style={{ padding: ".6rem 1rem" }}>Clicks</th>
                <th style={{ padding: ".6rem 1rem" }}>Sales</th>
                <th style={{ padding: ".6rem 1rem" }}>Commission</th>
                <th style={{ padding: ".6rem 1rem" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {sellers.rows.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: "1.5rem", color: "#9ca3af" }}>No sellers registered yet.</td></tr>
              ) : sellers.rows.map((s) => {
                const vendor = (vendorsData as Vendor[]).find((v) => v.slug === s.slug);
                const trust = vendor ? getTrustScore(vendor.name).score : 0;
                const perf = perfMap[s.slug] ?? { clicks: 0, sales: 0, commission: 0, revenue: 0 };
                return (
                  <tr key={s.slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: ".6rem 1.25rem" }}>
                      <a href={`/sellers/${s.slug}`} style={{ fontWeight: 600 }}>{s.name || s.slug}</a>
                      <div style={{ color: "#9ca3af", fontSize: ".75rem" }}>{s.slug}</div>
                    </td>
                    <td style={{ padding: ".6rem 1rem" }}>
                      <span className={scoreBand(trust)} style={{ fontWeight: 700 }}>{trust}</span>
                    </td>
                    <td style={{ padding: ".6rem 1rem" }}>
                      <span style={{ fontSize: ".75rem", padding: "2px 8px", borderRadius: 999, background: s.active ? "#ecfdf5" : "#fef3c7", color: s.active ? "#047857" : "#b45309" }}>
                        {s.active ? "Active" : "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: ".6rem 1rem" }}>{perf.clicks}</td>
                    <td style={{ padding: ".6rem 1rem" }}>{perf.sales}</td>
                    <td style={{ padding: ".6rem 1rem" }}>{fmtMoney(perf.commission)}</td>
                    <td style={{ padding: ".6rem 1rem", color: "#6b7280" }}>{s.email ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
