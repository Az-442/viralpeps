import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";
import { getTrustScore } from "@/lib/trust-score";
import vendorsData from "@/data/vendors.json";
import compoundsData from "@/data/compounds.json";
import SellerDashboard from "@/components/seller/SellerDashboard";
import type { SaleRow } from "@/components/seller/SellerDashboard";

export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// Postgres returns TIMESTAMPTZ as a Date object, which fails Next.js RSC
// serialization when passed to a client component. Normalise to ISO strings.
function toIso(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = (await cookies()).get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);

  if (!seller) {
    redirect(`/sellers/login?next=${encodeURIComponent(`/sellers/${slug}`)}`);
  }
  if (seller.slug !== slug) {
    redirect(`/sellers/${seller.slug}`);
  }

  const vendor = (vendorsData as any[]).find((v) => v.slug === slug);
  if (!vendor) notFound();
  const trust = getTrustScore(vendor.name);

  const clicks = await sql`
    SELECT click_type, compound_slug, ref_page, visitor_id, created_at
    FROM clicks WHERE vendor_slug = ${slug}
    ORDER BY created_at DESC LIMIT 500
  `;
  const clickRows = (clicks.rows as Array<{
    click_type: string;
    compound_slug: string | null;
    ref_page: string | null;
    visitor_id: string | null;
    created_at: unknown;
  }>).map((c) => ({
    click_type: c.click_type,
    compound_slug: c.compound_slug,
    ref_page: c.ref_page,
    visitor_id: c.visitor_id,
    created_at: toIso(c.created_at),
  }));

  const totals = await sql`
    SELECT
      count(*)::int AS clicks_all,
      count(DISTINCT visitor_id)::int AS visitors_all,
      count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS clicks_30,
      count(DISTINCT visitor_id) FILTER (WHERE created_at > now() - interval '30 days')::int AS visitors_30
    FROM clicks WHERE vendor_slug = ${slug}
  `;
  const t = totals.rows[0];

  const sales = await sql`
    SELECT order_id, order_value, currency, customer_type, commission_amount, created_at
    FROM sales WHERE vendor_slug = ${slug}
    ORDER BY created_at DESC LIMIT 100
  `;
  const saleRows = (sales.rows as Array<Record<string, unknown>>).map((s) => ({
    order_id: String(s.order_id ?? ""),
    order_value: s.order_value ?? 0,
    currency: s.currency ?? null,
    customer_type: s.customer_type ?? null,
    commission_amount: s.commission_amount ?? null,
    created_at: toIso(s.created_at),
  })) as unknown as SaleRow[];

  type Source = { vendor: string; url?: string; price?: string; inStock?: boolean; image?: string };
  type Compound = { name: string; slug: string; sources: Source[] };
  const products: Array<{
    compoundSlug: string;
    compoundName: string;
    price: string;
    inStock: boolean;
    url: string;
  }> = [];
  for (const c of compoundsData as Compound[]) {
    for (const s of c.sources || []) {
      if (s.vendor === vendor.name) {
        products.push({
          compoundSlug: c.slug,
          compoundName: c.name,
          price: s.price ?? "",
          inStock: s.inStock !== false,
          url: s.url ?? "",
        });
      }
    }
  }

  const perProduct = await sql`
    SELECT compound_slug, count(*)::int AS n
    FROM clicks WHERE vendor_slug = ${slug} AND compound_slug IS NOT NULL
    GROUP BY compound_slug
  `;
  const productClicks: Record<string, number> = {};
  for (const r of perProduct.rows) productClicks[r.compound_slug] = r.n;

  return (
    <SellerDashboard
      slug={slug}
      name={vendor.name}
      trustScore={trust.score}
      trustTicks={trust.ticks}
      commissionRate={seller.commission_rate == null ? 20 : Number(seller.commission_rate)}
      apiKey={seller.api_key ?? ""}
      email={seller.email}
      affiliateJoinedAt={seller.affiliate_joined_at ?? null}
      stats={{
        clicks30: t.clicks_30,
        visitors30: t.visitors_30,
        clicksAll: t.clicks_all,
        visitorsAll: t.visitors_all,
        activeProducts: products.filter((p) => p.inStock).length,
        totalProducts: products.length,
      }}
      clicks={clickRows}
      sales={saleRows}
      products={products}
      productClicks={productClicks}
    />
  );
}
