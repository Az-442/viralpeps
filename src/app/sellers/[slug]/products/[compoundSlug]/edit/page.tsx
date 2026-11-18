import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import { findSellerBySession } from "@/lib/seller-auth";
import vendorsData from "@/data/vendors.json";
import compoundsData from "@/data/compounds.json";
import EditProduct from "@/components/seller/EditProduct";

export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; compoundSlug: string }>;
  searchParams: Promise<{ dosage?: string }>;
}) {
  const { slug, compoundSlug } = await params;
  const { dosage } = await searchParams;

  const token = (await cookies()).get(COOKIE)?.value ?? null;
  const seller = await findSellerBySession(token);
  if (!seller) {
    redirect(`/sellers/login?next=${encodeURIComponent(`/sellers/${slug}/products/${compoundSlug}/edit`)}`);
  }
  if (seller.slug !== slug) {
    redirect(`/sellers/${seller.slug}`);
  }

  const vendor = (vendorsData as any[]).find((v) => v.slug === slug);
  if (!vendor) notFound();

  const compound = (compoundsData as any[]).find((c) => c.slug === compoundSlug);
  if (!compound) notFound();

  const wantedDosage = (dosage ?? "").trim();
  const source = (compound.sources || []).find(
    (s: any) => s.vendor === vendor.name && String(s.dosage ?? "").trim() === wantedDosage
  );
  if (!source) notFound();

  const auto = (vendor._autoChecks as { coa?: boolean } | undefined) ?? {};

  const coaRows = await sql`
    SELECT lab_tested, provider, coa_url FROM coas
    WHERE vendor_slug = ${slug} AND compound_slug = ${compoundSlug} AND dosage = ${wantedDosage}
  `;
  const saved = coaRows.rows[0];
  const savedLabTested = (saved?.lab_tested as boolean) === true;
  const savedProvider = (saved?.provider as string) ?? "";
  const savedCoaUrl = (saved?.coa_url as string) ?? "";
  const initialLabTested = saved ? savedLabTested : auto.coa === true;

  return (
    <EditProduct
      slug={slug}
      name={vendor.name}
      compoundSlug={compoundSlug}
      compoundName={compound.name}
      dosage={wantedDosage}
      url={source.url ?? ""}
      price={source.price ?? ""}
      inStock={source.inStock !== false}
      coa={initialLabTested}
      coaUrl={savedCoaUrl}
      provider={savedProvider}
    />
  );
}
