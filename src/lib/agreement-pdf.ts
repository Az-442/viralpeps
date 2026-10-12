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
  trialAccepted?: boolean;
};

const TERMS: [string, string][] = [
  [
    "1. The Service",
    "The Verified Package is a monthly verification and audit service supplied at a fee of £50 per calendar month (the Fee). The Fee constitutes consideration for the verification services described herein. It does not constitute a purchase of, or entitlement to, any TrustScore, rating, band, or numerical value. Verified Entity (+15): ViralPeps shall verify the Subscriber's legal business identity (a company registered at Companies House or a sole trader) and shall confirm that the Subscriber accepts real-money payment by card or bank transfer. Domain Verification (+15): provided at no additional charge; the Subscriber shall install the TrustScore badge on its website, linked to viralpeps.co.uk, and ViralPeps shall confirm the Subscriber's ownership and operation of the relevant domain. Recertification: ViralPeps shall re-verify the Subscriber's entity and payment particulars at intervals of twelve (12) months. TrustScores are not offered for sale; the Fee is payable in respect of the audit performed, and any points are awarded solely upon verification of the underlying facts.",
  ],
  [
    "2. Subscriber Obligations",
    "The Subscriber shall provide: its registered company name and Companies House number, or such evidence of sole-trader status as ViralPeps may reasonably require; confirmation of its payment provider (card processor or bank); and evidence of ownership and operation of the website upon which the badge is displayed. ViralPeps may request such further evidence as it reasonably considers necessary to complete or renew the audit, and the Subscriber shall provide such evidence within a reasonable time.",
  ],
  [
    "3. Fees and Payment",
    "£50 per month by Direct Debit (standard rate), the first thirty (30) days of which are free of charge; or £60 per month by bank transfer (the higher rate reflects the additional administrative cost of manual collection). During the free-of-charge period, the verification shall proceed and the TrustScore shall be awarded in full. Following the free-of-charge period, the Fee shall be collected monthly in advance and shall continue until termination in accordance with these Terms. The Subscriber shall receive a GoCardless Direct Debit link from ViralPeps in order to establish the Direct Debit mandate. Termination requires thirty (30) days' written notice. Where any sum remains outstanding for more than seven (7) days from its due date, whether payable by Direct Debit or bank transfer, the Subscriber's TrustScore shall be suspended, subject to a maximum of 85, and an administrative late-payment fee of £10 shall become payable; the score shall be restored upon receipt of payment. Where payment is not made, the Subscriber's TrustScore shall revert to the automatically calculated score, subject to a maximum of 85.",
  ],
  [
    "4. No Sale of Scores",
    "The Fee is payable for verification services, not for any score. The +15 shall be awarded only upon successful verification; a failed verification shall not give rise to any refund. ViralPeps reserves the right to re-verify, downgrade, or withdraw any points at any time where evidence is found to be false, misleading, or incomplete, and to terminate the subscription accordingly. ViralPeps gives no warranty, representation, or guarantee as to any particular band or numerical outcome. The audit measures; it does not grade.",
  ],
  [
    "5. Badge Display and Use",
    "The Subscriber shall display the badge unmodified and linked to viralpeps.co.uk. ViralPeps may withdraw the Subscriber's right to display the badge where the Subscriber misrepresents its TrustScore or uses the badge in a misleading manner.",
  ],
  [
    "6. Scope of Verification and Liability",
    "The audit extends to entity and payment particulars only. It does not extend to, and constitutes no representation concerning, product quality, safety, efficacy, or legal compliance. The Verified Package is not an endorsement of the Subscriber's products or services; research-use-only disclaimers continue to apply. To the fullest extent permitted by law, ViralPeps shall not be liable for any business losses, loss of profit, or consequential loss arising from the Subscriber's TrustScore, band, or display of the badge.",
  ],
  [
    "7. Data Protection",
    "ViralPeps shall store the Subscriber's evidence solely for the purpose of conducting and renewing the audit. Such evidence shall be disclosed only as necessary to verify it, or where required by law. ViralPeps shall delete such evidence upon request following termination of the subscription, subject to any statutory retention obligations.",
  ],
  [
    "8. Variation and Governing Law",
    "ViralPeps may vary these Terms upon thirty (30) days' written notice; continued subscription following such notice shall constitute acceptance of the varied Terms. This agreement shall be governed by and construed in accordance with the laws of England & Wales.",
  ],
];

export async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

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

  doc.setFontSize(8);
  doc.setTextColor(grey[0], grey[1], grey[2]);
  doc.text(
    `30-day free trial accepted: ${d.trialAccepted ? "Yes" : "No"}`,
    130,
    y + 11
  );
  doc.text("GoCardless Direct Debit link to follow.", 130, y + 16);

  void brand;

  return doc.output("blob");
}
