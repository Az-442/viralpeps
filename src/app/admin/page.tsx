import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

// Owner dashboard — totals + per-vendor breakdown.
// NOTE: no auth yet (unlinked URL). Add an admin key before exposing publicly.

type VendorRow = {
  vendor_slug: string;
  vendor_name: string | null;
  clicks: number;
  sales: number;
  commission: number;
  revenue: number;
};

function fmtMoney(n: number | string | null): string {
  const v = Number(n ?? 0);
  return v.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

export default async function AdminPage() {
  const totals = await sql`
    SELECT
      (SELECT count(*) FROM clicks)::int AS clicks,
      (SELECT count(*) FROM sales)::int AS sales,
      (SELECT COALESCE(sum(commission_amount), 0)::float FROM sales) AS commission,
      (SELECT COALESCE(sum(order_value), 0)::float FROM sales) AS revenue
  `;

  const perVendor = await sql`
    SELECT
      c.vendor_slug,
      c.vendor_name,
      c.clicks::int AS clicks,
      COALESCE(s.sales, 0)::int AS sales,
      COALESCE(s.commission, 0)::float AS commission,
      COALESCE(s.revenue, 0)::float AS revenue
    FROM (
      SELECT vendor_slug, max(vendor_name) AS vendor_name, count(*) AS clicks
      FROM clicks GROUP BY vendor_slug
    ) c
    LEFT JOIN (
      SELECT vendor_slug, count(*) AS sales, sum(commission_amount) AS commission, sum(order_value) AS revenue
      FROM sales GROUP BY vendor_slug
    ) s ON s.vendor_slug = c.vendor_slug
    ORDER BY c.clicks DESC
  `;

  const t = totals.rows[0];
  const vendors = perVendor.rows as VendorRow[];

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 700 }}>ViralPeps — Affiliate Dashboard</h1>
      <p style={{ color: "#555" }}>Clicks, sales and commission across all suppliers.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
        {[
          ["Clicks", t.clicks],
          ["Sales", t.sales],
          ["Commission", fmtMoney(t.commission)],
          ["Referred revenue", fmtMoney(t.revenue)],
        ].map(([label, val]) => (
          <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem" }}>
            <div style={{ fontSize: ".8rem", color: "#6b7280" }}>{label}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{val}</div>
          </div>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".9rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
            <th style={{ padding: ".5rem" }}>Supplier</th>
            <th style={{ padding: ".5rem" }}>Clicks</th>
            <th style={{ padding: ".5rem" }}>Sales</th>
            <th style={{ padding: ".5rem" }}>Commission</th>
            <th style={{ padding: ".5rem" }}>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr><td colSpan={5} style={{ padding: "1rem", color: "#9ca3af" }}>No clicks yet.</td></tr>
          ) : (
            vendors.map((v) => (
              <tr key={v.vendor_slug} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: ".5rem" }}>
                  <div style={{ fontWeight: 600 }}>{v.vendor_name || v.vendor_slug}</div>
                  <div style={{ color: "#9ca3af", fontSize: ".75rem" }}>{v.vendor_slug}</div>
                </td>
                <td style={{ padding: ".5rem" }}>{v.clicks}</td>
                <td style={{ padding: ".5rem" }}>{v.sales}</td>
                <td style={{ padding: ".5rem" }}>{fmtMoney(v.commission)}</td>
                <td style={{ padding: ".5rem" }}>{fmtMoney(v.revenue)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
