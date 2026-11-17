import { NextRequest, NextResponse } from "next/server";
import { findSellerBySession } from "@/lib/seller-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "vp_seller_session";

// POST /api/sellers/join-affiliate — seller requests to join the affiliate program.
// Emails the site owner via Resend (same mechanism as the vendor-registration form),
// with the email clearly marked as an AFFILIATE request.
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE)?.value ?? null;
    const seller = await findSellerBySession(token);
    if (!seller) {
      return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
    }

    const name = seller.name || seller.slug;
    const email = seller.email || "";
    const commissionRate = seller.commission_rate ?? 20;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server config error: RESEND_API_KEY not set" },
        { status: 500 }
      );
    }

    const toEmail = process.env.NOTIFY_EMAIL || "info@viralpeps.co.uk";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
        <div style="background:#fef3c7;border:1px solid #f59e0b;color:#92400e;font-size:13px;font-weight:bold;padding:10px 14px;border-radius:8px;margin-bottom:16px;">
          AFFILIATE PROGRAM — JOIN REQUEST
        </div>
        <div style="font-size:20px;font-weight:bold;color:#0b1a2e;margin-bottom:8px;">
          A supplier wants to join the affiliate program
        </div>
        <p style="color:#475569;font-size:14px;margin-bottom:20px;">Request submitted from the supplier portal. Details below.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#64748b;width:180px;vertical-align:top;"><strong>Supplier</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Slug</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(seller.slug)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Contact email</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Commission rate</strong></td><td style="padding:8px 0;color:#0f172a;">${commissionRate}%</td></tr>
        </table>
        <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Sent automatically from ViralPeps (viralpeps.co.uk) — supplier affiliate-program join request.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "ViralPeps <onboarding@viralpeps.co.uk>",
        to: [toEmail],
        subject: `Affiliate program join request: ${name}`,
        html,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Email failed: " + res.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function esc(s: string): string {
  return String(s || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}
