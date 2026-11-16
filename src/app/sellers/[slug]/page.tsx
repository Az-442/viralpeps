import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";

export const dynamic = "force-dynamic";
const COOKIE = "vp_seller_session";

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = (await cookies()).get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);

  const out: string[] = [];
  out.push("slug=" + slug);
  out.push("token=" + (token ? "present" : "none"));
  out.push("seller=" + (seller ? `${seller.slug} active=${seller.active}` : "NULL"));

  const run = async (label: string, q: any) => {
    try {
      const r = await q;
      out.push(`OK ${label} -> ${r.rowCount ?? (Array.isArray(r) ? r.length : "?")} rows`);
    } catch (e: any) {
      out.push(`FAIL ${label} -> ${e?.message ?? String(e)}`);
    }
  };

  await run("clicks", sql`SELECT click_type, compound_slug, ref_page, visitor_id, created_at FROM clicks WHERE vendor_slug = ${slug} ORDER BY created_at DESC LIMIT 500`);
  await run("totals", sql`SELECT count(*)::int AS clicks_all, count(DISTINCT visitor_id)::int AS visitors_all, count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS clicks_30, count(DISTINCT visitor_id) FILTER (WHERE created_at > now() - interval '30 days')::int AS visitors_30 FROM clicks WHERE vendor_slug = ${slug}`);
  await run("sales", sql`SELECT order_id, order_value, currency, customer_type, commission_amount, created_at FROM sales WHERE vendor_slug = ${slug} ORDER BY created_at DESC LIMIT 100`);
  await run("perProduct", sql`SELECT compound_slug, count(*)::int AS n FROM clicks WHERE vendor_slug = ${slug} AND compound_slug IS NOT NULL GROUP BY compound_slug`);

  return (
    <pre style={{ fontFamily: "monospace", padding: 20, whiteSpace: "pre-wrap" }}>
      {out.join("\n")}
    </pre>
  );
}
