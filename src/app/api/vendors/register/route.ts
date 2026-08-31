import { NextRequest, NextResponse } from "next/server";

// POST /api/vendors/register — emails the site owner a new vendor-registration submission.
// Uses Resend (transactional email). Requires RESEND_API_KEY in env (set on Vercel).
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const businessName = body.businessName || "";
    const website = body.website || "";
    const email = body.email || "";
    const country = body.country || "";
    const moq = body.moq || "";
    const coas = body.coas || "";
    const description = body.description || "";
    const categories = Array.isArray(body.categories) ? body.categories.join(", ") : (body.categories || "");

    if (!businessName || !website || !email || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
        <div style="font-size:20px;font-weight:bold;color:#0b1a2e;margin-bottom:8px;">
          New Vendor Registration — List Your Business
        </div>
        <p style="color:#475569;font-size:14px;margin-bottom:20px;">A wholesale/vendor application was submitted on ViralPeps. Details below.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#64748b;width:180px;vertical-align:top;"><strong>Business name</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(businessName)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Website</strong></td><td style="padding:8px 0;color:#0f172a;"><a href="${esc(website)}" style="color:#2563eb;">${esc(website)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Contact email</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Country</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(country)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Categories</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(categories)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Min order</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(moq)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Lab COAs</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(coas)}</td></tr>
          ${description ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top;"><strong>Overview</strong></td><td style="padding:8px 0;color:#0f172a;white-space:pre-wrap;">${esc(description)}</td></tr>` : ""}
        </table>
        <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Sent automatically from ViralPeps (viralpeps.co.uk) — vendor registration form.</p>
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
        subject: `New vendor registration: ${businessName}`,
        html,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Email failed: " + res.status },
        { status: 502 }
      );
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
