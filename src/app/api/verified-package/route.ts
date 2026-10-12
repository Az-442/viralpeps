import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// POST /api/verified-package — receives a signed Verified Package agreement.
//
// Two things happen on submit (no database, no SMTP setup beyond the existing
// Resend key that /api/vendors/register already uses):
//
//  1. STORE — the signed record is committed to this site's own GitHub repo as
//     `agreements/index.json` (append-only log). The signing party's signature
//     image is stored inline as a PNG data URL in the same record. This is the
//     permanent, owner-readable copy — no third-party platform involved.
//  2. NOTIFY — an email is sent to the site owner via Resend with the full
//     agreement details, so it lands in the inbox the moment they sign.
//
// Files live in the repo, so they travel with the project if it is ever sold.

const REPO = "Az-442/viralpeps";
const LIST_PATH = "agreements/index.json";
const TOKEN = process.env.GITHUB_TOKEN || "";
const MIN_INTERVAL_MS = 2000;

let lastPushAt = 0;

type Agreement = {
  signedAt: string;
  termsVersion: string;
  company: string;
  companiesHouse: string;
  website: string;
  payment: string;
  signatory: string;
  position: string;
  email: string;
  startDate: string;
  nextDueDate: string;
  monthlyAmount: number;
  trialAccepted?: boolean;
  pdfPath?: string;
  signaturePng?: string;
  agree: boolean;
  ip?: string;
};

function addMonth(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  d.setUTCMonth(d.getUTCMonth() + 1);
  // handle month-length overflow (e.g. 31 Jan -> 28/29 Feb)
  if (d.getUTCDate() < day) d.setUTCDate(0);
  return d.toISOString();
}

async function getCurrentFile(): Promise<{ content: string; sha?: string } | { ok: false; error: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) return { content: "[]" };
  if (!res.ok) return { ok: false, error: `agreement list read failed (${res.status})` };
  const data = await res.json();
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  return { content, sha: data.sha };
}

function parseList(content: string): Agreement[] {
  try {
    const arr = JSON.parse(content);
    if (Array.isArray(arr)) return arr as Agreement[];
  } catch {
    /* fall through */
  }
  return [];
}

function esc(s: string): string {
  return String(s || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

async function putRepoFile(path: string, contentBase64: string, message: string, sha?: string): Promise<boolean> {
  const putBody: Record<string, unknown> = { message, content: contentBase64 };
  if (sha) putBody.sha = sha;
  const t = Date.now();
  if (t - lastPushAt < MIN_INTERVAL_MS) return true; // rate-guarded
  lastPushAt = t;
  const put = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(putBody),
  });
  return put.ok || put.status === 409;
}

async function getFileSha(path: string): Promise<string | undefined> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.sha as string | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const company = String(body.company || "").trim();
    const website = String(body.website || "").trim();
    const signatory = String(body.signatory || "").trim();
    const position = String(body.position || "").trim();
    const email = String(body.email || "").trim();
    const companiesHouse = String(body.companiesHouse || "").trim();
    const payment = String(body.payment || "").trim();
    const signaturePng = String(body.signature || "");
    const agree = body.agree === true;
    const trialAccepted = body.trialAccepted === true;
    const pdfBase64 = String(body.pdfBase64 || "").replace(/^data:application\/pdf;base64,/, "");

    // validation
    if (!company || !website || !signatory || !position || !email || !payment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!agree) {
      return NextResponse.json({ error: "Declaration not accepted" }, { status: 400 });
    }
    if (!signaturePng.startsWith("data:image/png;base64,")) {
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    const now = new Date();
    const signedAt = String(body.signedAt || now.toISOString());
    const monthlyAmount = payment.toLowerCase().includes("direct") ? 50 : 60;
    const safeName = company.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const stamp = signedAt.replace(/[:.]/g, "-");
    const pdfPath = `agreements/pdfs/${stamp}-${safeName}.pdf`;

    const record: Agreement = {
      signedAt,
      termsVersion: String(body.termsVersion || "2.0"),
      company,
      companiesHouse,
      website,
      payment,
      signatory,
      position,
      email,
      startDate: signedAt,
      nextDueDate: addMonth(signedAt),
      monthlyAmount,
      trialAccepted,
      pdfPath,
      signaturePng,
      agree,
      ip: (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined,
    };

    // ---- 1. STORE (commit to repo) ----
    let storedOk = false;
    let storeError = "";
    if (!TOKEN) {
      storeError = "GITHUB_TOKEN not set";
    } else {
      try {
        // 1a. write the signed PDF as its own file
        if (pdfBase64) {
          const pdfOk = await putRepoFile(pdfPath, pdfBase64, `Verified Package PDF: ${company} [bot]`);
          if (!pdfOk) {
            storeError = "pdf push failed";
            delete record.pdfPath;
          }
        }

        // 1b. append the record to the JSON log
        const file = await getCurrentFile();
        if (!("content" in file)) {
          storeError = file.error;
        } else {
          const list = parseList(file.content);
          list.push(record);
          const newContent = `${JSON.stringify(list, null, 2)}\n`;
          storedOk = await putRepoFile(
            LIST_PATH,
            Buffer.from(newContent).toString("base64"),
            `Verified Package signed: ${company} [bot]`,
            file.sha
          );
          if (!storedOk) storeError = "agreement list push failed";
        }
      } catch (e) {
        storeError = (e as Error).message;
      }
    }

    // ---- 2. NOTIFY (email via Resend) ----
    let emailed = false;
    let emailError = "";
    const apiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.NOTIFY_EMAIL || "info@viralpeps.co.uk";
    if (!apiKey) {
      emailError = "RESEND_API_KEY not set";
    } else {
      const due = new Date(record.nextDueDate).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
          <div style="font-size:20px;font-weight:bold;color:#0b1a2e;margin-bottom:8px;">
            Verified Package signed — ${esc(company)}
          </div>
          <p style="color:#475569;font-size:14px;margin-bottom:20px;">
            A supplier has signed the ViralPeps Verified Package agreement.
            Payment: <strong>${esc(payment)}</strong> — £${monthlyAmount}/month.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#64748b;width:180px;"><strong>Company</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(company)}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Companies House no.</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(companiesHouse) || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Website</strong></td><td style="padding:8px 0;color:#0f172a;"><a href="${esc(website)}" style="color:#2563eb;">${esc(website)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Signatory</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(signatory)} (${esc(position)})</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Email</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Start date</strong></td><td style="padding:8px 0;color:#0f172a;">${new Date(signedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Next payment due</strong></td><td style="padding:8px 0;color:#0f172a;font-weight:bold;">${due}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;"><strong>Terms version</strong></td><td style="padding:8px 0;color:#0f172a;">${esc(record.termsVersion)}</td></tr>
          </table>
          ${
            signaturePng.startsWith("data:image/png;base64,")
              ? `<div style="margin-top:20px;">
                   <div style="font-size:13px;color:#64748b;margin-bottom:6px;"><strong>Signature</strong></div>
                   <img src="${signaturePng}" alt="Signature" style="border:1px solid #e2e8f0;border-radius:8px;background:#fff;max-width:320px;" />
                 </div>`
              : ""
          }
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;">
            Stored in the site repo at agreements/index.json. Sent automatically from ViralPeps.
          </p>
        </div>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM || "ViralPeps <onboarding@viralpeps.co.uk>",
          to: [ownerEmail],
          subject: `Verified Package signed: ${company} (£${monthlyAmount}/mo)`,
          html,
          reply_to: email,
        }),
      });
      emailed = res.ok;
      if (!res.ok) emailError = `email failed (${res.status})`;
    }

    if (!storedOk && !emailed) {
      return NextResponse.json(
        { error: "Could not record agreement", storeError, emailError },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, stored: storedOk, emailed });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
