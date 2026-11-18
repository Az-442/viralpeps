import { sql } from "@vercel/postgres";
import vendorsData from "@/data/vendors.json";
import ClaimForm from "@/components/seller/ClaimForm";

export const dynamic = "force-dynamic";

type Vendor = { slug: string; name: string };

export default async function ClaimPage() {
  // Listings that don't yet have an owner account (claimable).
  const owners = await sql`SELECT slug FROM sellers`;
  const owned = new Set<string>(owners.rows.map((r) => r.slug));

  const claimable = (vendorsData as Vendor[])
    .filter((v) => v.slug && v.name && !owned.has(v.slug))
    .map((v) => ({ slug: v.slug, name: v.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return <ClaimForm vendors={claimable} />;
}
