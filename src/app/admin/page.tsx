import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTrustScore } from "@/lib/trust-score";
import vendorsData from "@/data/vendors.json";
import { getAffiliateRequests, type AffiliateRequest } from "@/lib/affiliate-requests";
import AdminDashboard, { type VendorPerf, type SellerAccount } from "@/components/admin/AdminDashboard";
import { getOwnerFromRequest } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

type Vendor = { slug: string; name: string };

export default async function AdminPage() {
  // ── OWNER GATE ──────────────────────────────────────────────────────────
  // Nothing below runs unless a valid owner session exists. Without this the
  // page exposes every seller's api_key and badge_token to anyone who loads
  // /admin, and allows account deletion. Redirect, never render.
  const cookieStore = await cookies();
  const owner = await getOwnerFromRequest({ cookies: { get: (n: string) => cookieStore.get(n) } });
  if (!owner) {
    // Distinguish "no owner exists yet" (first-run) from "not signed in".
    redirect("/admin/login");
  }
  // ────────────────────────────────────────────────────────────────────────

  // Data window (first/last click) so the owner knows the covered period.
  const range = await sql`
    SELECT min(created_at) AS min_ts, max(created_at) AS max_ts FROM clicks
  `;
  const rng = range.rows[0];
  const dataRange = rng?.min_ts
    ? `${new Date(rng.min_ts).toLocaleDateString("en-GB")} — ${new Date(rng.max_ts).toLocaleDateString("en-GB")}`
    : "—";

  // Per-vendor click aggregates across four date windows.
  // is_bot rows are excluded — they are identified non-human traffic
  // (honeypot hits + retro-scored sequential crawlers) and must never
  // inflate a supplier's reported click count.
  const clicks = await sql`
    SELECT
      vendor_slug,
      count(*)::int AS clicks_all,
      count(*) FILTER (WHERE created_at > now() - interval '90 days')::int AS clicks_90,
      count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS clicks_30,
      count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS clicks_7
    FROM clicks WHERE is_bot = false GROUP BY vendor_slug
  `;
  const clickMap: Record<string, any> = {};
  for (const r of clicks.rows) clickMap[r.vendor_slug] = r;

  // Per-vendor sales / commission / revenue across four date windows.
  const sales = await sql`
    SELECT
      vendor_slug,
      count(*)::int AS sales_all,
      count(*) FILTER (WHERE created_at > now() - interval '90 days')::int AS sales_90,
      count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS sales_30,
      count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS sales_7,
      COALESCE(sum(commission_amount), 0)::float AS commission_all,
      COALESCE(sum(commission_amount) FILTER (WHERE created_at > now() - interval '90 days'), 0)::float AS commission_90,
      COALESCE(sum(commission_amount) FILTER (WHERE created_at > now() - interval '30 days'), 0)::float AS commission_30,
      COALESCE(sum(commission_amount) FILTER (WHERE created_at > now() - interval '7 days'), 0)::float AS commission_7,
      COALESCE(sum(order_value), 0)::float AS revenue_all,
      COALESCE(sum(order_value) FILTER (WHERE created_at > now() - interval '90 days'), 0)::float AS revenue_90,
      COALESCE(sum(order_value) FILTER (WHERE created_at > now() - interval '30 days'), 0)::float AS revenue_30,
      COALESCE(sum(order_value) FILTER (WHERE created_at > now() - interval '7 days'), 0)::float AS revenue_7
    FROM sales GROUP BY vendor_slug
  `;
  const salesMap: Record<string, any> = {};
  for (const r of sales.rows) salesMap[r.vendor_slug] = r;

  const vendors: VendorPerf[] = (vendorsData as Vendor[]).map((v) => {
    const c = clickMap[v.slug] ?? {};
    const s = salesMap[v.slug] ?? {};
    return {
      slug: v.slug,
      name: v.name,
      trust: getTrustScore(v.name).score,
      clicksAll: c.clicks_all ?? 0,
      clicks90: c.clicks_90 ?? 0,
      clicks30: c.clicks_30 ?? 0,
      clicks7: c.clicks_7 ?? 0,
      salesAll: s.sales_all ?? 0,
      sales90: s.sales_90 ?? 0,
      sales30: s.sales_30 ?? 0,
      sales7: s.sales_7 ?? 0,
      commissionAll: s.commission_all ?? 0,
      commission90: s.commission_90 ?? 0,
      commission30: s.commission_30 ?? 0,
      commission7: s.commission_7 ?? 0,
      revenueAll: s.revenue_all ?? 0,
      revenue90: s.revenue_90 ?? 0,
      revenue30: s.revenue_30 ?? 0,
      revenue7: s.revenue_7 ?? 0,
    };
  });

  const sellersResult = await sql`
    SELECT s.*, p.coa_verified, p.reviews_verified, p.entity_type, p.entity_type_verified,
           p.payment_method, p.payment_method_verified, p.review_status, p.updated_at AS profile_updated
    FROM sellers s
    LEFT JOIN seller_profiles p ON p.seller_slug = s.slug
    ORDER BY s.active DESC, s.created_at DESC
  `;
  const sellers: SellerAccount[] = sellersResult.rows.map((s) => {
    const vendor = (vendorsData as Vendor[]).find((v) => v.slug === s.slug);
    const c = clickMap[s.slug] ?? {};
    const sl = salesMap[s.slug] ?? {};
    return {
      slug: s.slug,
      name: s.name || s.slug,
      email: s.email,
      active: s.active,
      trust: vendor ? getTrustScore(vendor.name).score : 0,
      clicks: c.clicks_all ?? 0,
      sales: sl.sales_all ?? 0,
      commission: sl.commission_all ?? 0,
      commissionRate: s.commission_rate ?? 20,
      affiliateJoinedAt: s.affiliate_joined_at ?? null,
      apiKey: s.api_key ?? null,
      badgeToken: s.badge_token ?? null,
      createdAt: s.created_at ? new Date(s.created_at as any).toISOString() : null,
      entityType: (s.entity_type as string) ?? null,
      entityTypeVerified: (s.entity_type_verified as string) ?? null,
      paymentMethod: (s.payment_method as string) ?? null,
      paymentMethodVerified: (s.payment_method_verified as string) ?? null,
      reviewStatus: (s.review_status as string) ?? null,
    };
  });

  const affiliateRequests: AffiliateRequest[] = await getAffiliateRequests();

  // slug → affiliate_joined_at, so the Join requests tab can show approved state.
  const affiliateApproved: Record<string, string | null> = {};
  for (const s of sellersResult.rows) {
    affiliateApproved[s.slug] = s.affiliate_joined_at ?? null;
  }

  // Pending profile reviews (score-affecting entity/payment claims awaiting approval).
  const reviewResult = await sql`
    SELECT
      p.seller_slug AS slug,
      s.name,
      p.entity_type,
      p.payment_method,
      p.entity_type_verified,
      p.payment_method_verified,
      p.review_status,
      p.updated_at
    FROM seller_profiles p
    JOIN sellers s ON s.slug = p.seller_slug
    WHERE p.review_status IS NOT NULL AND p.review_status <> 'none'
    ORDER BY
      CASE p.review_status WHEN 'pending' THEN 0 ELSE 1 END,
      p.updated_at DESC
  `;
  const profileReviews = (reviewResult.rows as Record<string, unknown>[]).map((x) => ({
    slug: String(x.slug ?? ""),
    name: String(x.name ?? ""),
    entityType: (x.entity_type as string) ?? null,
    paymentMethod: (x.payment_method as string) ?? null,
    entityTypeVerified: (x.entity_type_verified as string) ?? null,
    paymentMethodVerified: (x.payment_method_verified as string) ?? null,
    status: (x.review_status as string) ?? null,
    updatedAt: x.updated_at ? new Date(x.updated_at as any).toISOString() : null,
  }));

  // Listing claim requests (suppliers claiming ownership of an existing listing).
  const claimsResult = await sql`
    SELECT id, slug, name, email, email_domain_match, status, created_at
    FROM listing_claims
    ORDER BY
      CASE status WHEN 'pending' THEN 0 ELSE 1 END,
      created_at DESC
  `;
  const claims = (claimsResult.rows as Record<string, unknown>[]).map((x) => ({
    id: Number(x.id),
    slug: String(x.slug ?? ""),
    name: String(x.name ?? ""),
    email: String(x.email ?? ""),
    domainMatch: x.email_domain_match === true,
    status: String(x.status ?? "pending"),
    createdAt: x.created_at ? new Date(x.created_at as any).toISOString() : null,
  }));

  return <AdminDashboard vendors={vendors} sellers={sellers} affiliateRequests={affiliateRequests} affiliateApproved={affiliateApproved} profileReviews={profileReviews} claims={claims} dataRange={dataRange} />;
}
