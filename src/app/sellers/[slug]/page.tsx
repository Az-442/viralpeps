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

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = (await cookies()).get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);

  if (!seller) {
    redirect(`/sellers/login?next=${encodeURIComponent(`/sellers/${slug}`)}`);
  }
  if (seller.slug !== slug) {
    // Logged in as a different seller — don't let them read someone else's page.
    redirect(`/sellers/${seller.slug}`);
  }

  // Vendor record (TrustScore + listing data) keyed by slug.
  const vendor = (vendorsData as any[]).find((v) => v.slug === slug);
  if (!vendor) notFound();
  const trust = getTrustScore(vendor.name);

  // Clicks — all-time totals + 30-day window.
  const clicks = await sql`
    SELECT click_type, compound_slug, ref_page, visitor_id, created_at
    FROM clicks WHERE vendor_slug = ${slug}
    ORDER BY created_at DESC LIMIT 500
  `;
  const clickRows = clicks.rows as Array<{
    click_type: string;
    compound_slug: string | null;
    ref_page: string | null;
    visitor_id: string | null;
    created_at: string;
  }>;

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

  // Products — this seller's listings across the comparison site.
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

  // Click count per product (for the products table).
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
      stats={{
        clicks30: t.clicks_30,
        visitors30: t.visitors_30,
        clicksAll: t.clicks_all,
        visitorsAll: t.visitors_all,
        activeProducts: products.filter((p) => p.inStock).length,
        totalProducts: products.length,
      }}
      clicks={clickRows}
      sales={sales.rows as unknown as SaleRow[]}
      products={products}
      productClicks={productClicks}
    />
  );
}
