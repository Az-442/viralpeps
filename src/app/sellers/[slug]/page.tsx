import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Seller dashboard — per-supplier stats. Keyed by vendor slug (no auth yet —
// the slug itself identifies the supplier; add a login before public use).

function fmtMoney(n: number | string | null): string {
  const v = Number(n ?? 0);
  return v.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
}

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const meta = await sql`
    SELECT
      (SELECT max(vendor_name) FROM clicks WHERE vendor_slug = ${slug}) AS vendor_name,
      (SELECT count(*) FROM clicks WHERE vendor_slug = ${slug})::int AS clicks,
      (SELECT count(*) FROM sales WHERE vendor_slug = ${slug})::int AS sales,
      (SELECT COALESCE(sum(commission_amount), 0)::float FROM sales WHERE vendor_slug = ${slug}) AS commission,
      (SELECT COALESCE(sum(order_value), 0)::float FROM sales WHERE vendor_slug = ${slug}) AS revenue
  `;
  const m = meta.rows[0];
  if (Number(m.clicks) === 0 && Number(m.sales) === 0) {
    notFound();
  }
  const name = m.vendor_name || slug;

  const recentClicks = await sql`
    SELECT compound_slug, ref_page, created_at
    FROM clicks WHERE vendor_slug = ${slug}
    ORDER BY created_at DESC LIMIT 20
  `;

  const recentSales = await sql`
    SELECT order_id, order_value, commission_amount, customer_type, created_at
    FROM sales WHERE vendor_slug = ${slug}
    ORDER BY created_at DESC LIMIT 20
  `;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{name}</h1>
      <p style={{ color: "#555" }}>Your referral performance.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
        {[
          ["Clicks", m.clicks],
          ["Sales", m.sales],
          ["Commission", fmtMoney(m.commission)],
          ["Referred revenue", fmtMoney(m.revenue)],
        ].map(([label, val]) => (
          <div key={label} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem" }}>
            <div style={{ fontSize: ".8rem", color: "#6b7280" }}>{label}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{val}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "1.5rem 0 .5rem" }}>Recent clicks</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
            <th style={{ padding: ".4rem" }}>Compound</th>
            <th style={{ padding: ".4rem" }}>Page</th>
            <th style={{ padding: ".4rem" }}>When</th>
          </tr>
        </thead>
        <tbody>
          {recentClicks.rows.length === 0 ? (
            <tr><td colSpan={3} style={{ padding: "1rem", color: "#9ca3af" }}>No clicks yet.</td></tr>
          ) : recentClicks.rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: ".4rem" }}>{r.compound_slug || "—"}</td>
              <td style={{ padding: ".4rem", color: "#6b7280" }}>{r.ref_page || "—"}</td>
              <td style={{ padding: ".4rem" }}>{new Date(r.created_at).toLocaleString("en-GB")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "1.5rem 0 .5rem" }}>Recent sales</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
            <th style={{ padding: ".4rem" }}>Order</th>
            <th style={{ padding: ".4rem" }}>Value</th>
            <th style={{ padding: ".4rem" }}>Commission</th>
            <th style={{ padding: ".4rem" }}>Customer</th>
            <th style={{ padding: ".4rem" }}>When</th>
          </tr>
        </thead>
        <tbody>
          {recentSales.rows.length === 0 ? (
            <tr><td colSpan={5} style={{ padding: "1rem", color: "#9ca3af" }}>No sales yet.</td></tr>
          ) : recentSales.rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: ".4rem" }}>{r.order_id}</td>
              <td style={{ padding: ".4rem" }}>{fmtMoney(r.order_value)}</td>
              <td style={{ padding: ".4rem" }}>{fmtMoney(r.commission_amount)}</td>
              <td style={{ padding: ".4rem" }}>{r.customer_type || "—"}</td>
              <td style={{ padding: ".4rem" }}>{new Date(r.created_at).toLocaleString("en-GB")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
