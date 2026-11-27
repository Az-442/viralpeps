import { NextResponse } from "next/server";
import { countOwners } from "@/lib/owner-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/owner/status — public, deliberately minimal.
// Tells the login page whether first-run setup is needed. Leaks nothing else.
export async function GET() {
  const owners = await countOwners();
  return NextResponse.json({ needsSetup: owners === 0 });
}
