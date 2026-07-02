import { NextRequest, NextResponse } from "next/server";
import vendorsData from "@/data/vendors.json";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ vendorSlug: string }> }
) {
  const { vendorSlug } = await params;

  const vendor = (vendorsData as any[]).find((v) => v.slug === vendorSlug);
  if (!vendor?.website) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  return NextResponse.redirect(vendor.website, 302);
}
