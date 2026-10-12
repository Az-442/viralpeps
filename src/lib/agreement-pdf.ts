import { jsPDF } from "jspdf";

export type AgreementData = {
  company: string;
  companiesHouse: string;
  website: string;
  payment: string;
  signatory: string;
  position: string;
  email: string;
  signaturePng: string; // data URL
  signedAt: string;
  termsVersion: string;
};

const TERMS: [string, string][] = [
  [
    "1. What you are buying",
    "A £50/month subscription for verification work — not a purchase of points, a rating, or a band. Verified Entity (+15): we verify your legal identity (registered Ltd or sole trader) and that you accept card or bank payment. Domain Verified (+15): free — you install the TrustScore badge linking back to ViralPeps, and we confirm you own the domain. We recertify every 12 months. Scores are never for sale.",
  ],
  [
    "2. What you must provide",
    "Your registered company name and Companies House number (or sole-trader evidence); confirmation of your payment provider; and proof you own the website carrying the badge. We may request further evidence.",
  ],
  [
    "3. Payment",
    "£50/month by Direct Debit (default), or £60/month by bank transfer (the higher rate covers manual collection). Billed monthly in advance until cancelled, with 30 days' written notice to cancel. If payment is 7 days late, your entity verification is suspended (your score reverts to the automatic score, maximum 85) and a £10 late fee applies. Verification is restored immediately on payment.",
  ],
  [
    "4. No sale of scores",
    "The fee buys verification, not a score. We award +15 only if the facts verify; a failed check is not refundable. We may re-check, downgrade, or remove points if evidence proves false, and cancel the subscription. We do not promise a specific band or number.",
  ],
  [
    "5. Badge display",
    "The badge must be shown unmodified and link back to viralpeps.co.uk. We may withdraw badge rights for misleading use.",
  ],
  [
    "6. Scope & liability",
    "The audit covers entity and payment facts only — not product quality, safety, or compliance. It is not an endorsement. Research-use-only disclaimers still apply. We are not liable for business losses arising from your score, band, or badge.",
  ],
  [
    "7. Your data",
    "We store your evidence only to conduct and renew the audit, share it only to verify it or where legally required, and delete it on request after cancellation (subject to legal retention).",
  ],
  [
    "8. Changes & law",
    "We may update these terms with 30 days' notice. Governed by the laws of England & Wales.",
  ],
];

export function buildAgreementPdf(d: AgreementData): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const M = 18; // margin
  const W = 210 - M * 2; // usable width
  let y = M;

  const navy = [15, 27, 61] as const;
  const brand = [18, 102, 232] as const;
  const grey = [100, 116, 139] as const;

  const need = (h: number) => {
    if (y + h > 275) {
      doc.addPage();
      y = M;
    }
  };

  // ---- header ----
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("ViralPeps", M, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Verified Package Agreement", M, 20);
  doc.setFontSize(8);
  doc.text("viralpeps.co.uk", 210 - M, 20, { align: "right" });
  y = 40;

  // ---- title ----
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("TrustScore Verified Package — Agreement", M, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grey[0], grey[1], grey[2]);
  doc.text(`Terms version ${d.termsVersion}`, M, y);
  y += 9;

  // ---- parties / details table ----
  const rows: [string, string][] = [
    ["Company / trading name", d.company],
    ["Companies House no.", d.companiesHouse || "—"],
    ["Website / domain", d.website],
    ["Payment method", d.payment],
    ["Authorised signatory", d.signatory],
    ["Position", d.position],
    ["Email", d.email],
    ["Signed at", new Date(d.signedAt).toLocaleString("en-GB")],
  ];

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  const rowH = 8;
  rows.forEach(([k, v]) => {
    need(rowH);
    doc.setFillColor(248, 250, 252);
    doc.rect(M, y - 5.2, W, rowH, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(M, y - 5.2, W, rowH);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(k, M + 2, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.text(String(v), M + 62, y, { maxWidth: W - 64 });
    y += rowH;
  });
  y += 8;

  // ---- terms ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  need(8);
  doc.text("Terms & Conditions", M, y);
  y += 7;

  TERMS.forEach(([h, body]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    const hLines = doc.splitTextToSize(h, W);
    need(hLines.length * 5 + 3);
    doc.text(hLines, M, y);
    y += hLines.length * 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const bLines = doc.splitTextToSize(body, W);
    need(bLines.length * 4.4 + 4);
    doc.text(bLines, M, y);
    y += bLines.length * 4.4 + 4;
  });

  // ---- signature ----
  y += 6;
  need(45);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(M, y, 210 - M, y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text("Signed by", M, y);
  y += 4;

  // signature image
  try {
    doc.addImage(d.signaturePng, "PNG", M, y, 60, 22);
  } catch {
    /* skip if image invalid */
  }
  doc.setDrawColor(203, 213, 225);
  doc.line(M, y + 24, M + 70, y + 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`${d.signatory} — ${d.position}`, M, y + 29);
  doc.text(`${d.company}`, M, y + 34);
  doc.text(`${d.email}`, M, y + 39);

  // date block right side
  doc.setFont("helvetica", "bold");
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text("Date signed", 130, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(new Date(d.signedAt).toLocaleDateString("en-GB"), 130, y + 5);

  void brand;

  return doc.output("blob");
}
