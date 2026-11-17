import { NextRequest, NextResponse } from "next/server";
import { findSellerBySession } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";
const REPO = "Az-442/viralpeps";
const LIST_PATH = "affiliate-requests/log.json";

// POST /api/sellers/join-affiliate — supplier requests to join the affiliate program.
// Appends the request to the repo's affiliate-requests/log.json (durable). A Hermes
// cron watches that file and notifies Azar on Telegram. No email dependency.
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE)?.value ?? null;
    const seller = await findSellerBySession(token);
    if (!seller) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    const ghToken = process.env.GITHUB_TOKEN;
    if (!ghToken) {
      return NextResponse.json({ ok: false, error: "GITHUB_TOKEN not set" }, { status: 500 });
    }

    const gh = (path: string, init?: RequestInit) =>
      fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: "application/vnd.github+json",
          ...(init?.headers || {}),
        },
      });

    // Read current log (or empty list).
    let list: Array<Record<string, unknown>> = [];
    let sha: string | undefined;
    const read = await gh(LIST_PATH);
    if (read.status === 404) {
      list = [];
    } else if (read.ok) {
      const data = await read.json();
      try {
        const parsed = JSON.parse(Buffer.from(data.content || "", "base64").toString("utf8"));
        if (Array.isArray(parsed)) list = parsed;
      } catch {
        list = [];
      }
      sha = data.sha;
    } else {
      return NextResponse.json({ ok: false, error: "read failed " + read.status }, { status: 500 });
    }

    // Upsert — one entry per supplier.
    const entry = {
      slug: seller.slug,
      name: seller.name || seller.slug,
      email: seller.email || "",
      commissionRate: seller.commission_rate ?? 20,
      requestedAt: new Date().toISOString(),
    };
    const idx = list.findIndex((r) => r.slug === seller.slug);
    if (idx >= 0) list[idx] = entry;
    else list.push(entry);

    const putBody: Record<string, unknown> = {
      message: "affiliate join request",
      content: Buffer.from(JSON.stringify(list, null, 2)).toString("base64"),
    };
    if (sha) putBody.sha = sha;

    const put = await gh(LIST_PATH, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putBody),
    });

    if (!put.ok && put.status !== 409) {
      return NextResponse.json({ ok: false, error: "write failed " + put.status }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
