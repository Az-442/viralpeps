"use client";

import { useEffect, useRef, useState } from "react";

export default function VerifiedPackageForm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err" | "info"; msg: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [payment, setPayment] = useState<"dd" | "bt">("dd");
  const [agree, setAgree] = useState(false);
  const [trial, setTrial] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f1b3d";
      if (!dirty.current) drawPlaceholder();
    };

    const drawPlaceholder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "16px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("Sign here", 20, 40);
      ctx.restore();
    };

    const pos = (e: MouseEvent | Touch) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawing.current = true;
      if (!dirty.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      const p = "touches" in e ? e.touches[0] : e;
      ctx.beginPath();
      ctx.moveTo(...pos(p));
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      e.preventDefault();
      const p = "touches" in e ? e.touches[0] : e;
      ctx.lineTo(...pos(p));
      ctx.stroke();
      dirty.current = true;
    };
    const end = () => { drawing.current = false; };

    const md = (e: MouseEvent) => start(e);
    const mm = (e: MouseEvent) => move(e);
    const ts = (e: TouchEvent) => start(e);
    const tm = (e: TouchEvent) => move(e);

    canvas.addEventListener("mousedown", md);
    canvas.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", ts, { passive: false });
    canvas.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend", end);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      canvas.removeEventListener("mousedown", md);
      canvas.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", ts);
      canvas.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", end);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const clearSig = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dirty.current = false;
    ctx.save();
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Sign here", 20, 40);
    ctx.restore();
  };

  const submit = async () => {
    const val = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value.trim() || "";
    const need: Record<string, string> = {
      company: "Company name",
      website: "Website",
      signame: "Signatory name",
      position: "Position",
      email: "Email",
    };
    for (const [k, label] of Object.entries(need)) {
      if (!val(k)) { setStatus({ kind: "err", msg: `${label} is required.` }); return; }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) {
      setStatus({ kind: "err", msg: "Please enter a valid email." }); return;
    }
    if (!dirty.current) { setStatus({ kind: "err", msg: "Please add your signature." }); return; }
    if (!agree) { setStatus({ kind: "err", msg: "Please tick the declaration." }); return; }
    if (payment === "dd" && !trial) {
      setStatus({ kind: "err", msg: "Please accept the 30-day free trial terms." }); return;
    }

    const payload = {
      company: val("company"),
      companiesHouse: val("ch"),
      website: val("website"),
      payment: payment === "dd" ? "Direct Debit £50/month" : "Bank transfer £60/month",
      signatory: val("signame"),
      position: val("position"),
      email: val("email"),
      signature: canvasRef.current!.toDataURL("image/png"),
      agree,
      trialAccepted: trial,
      termsVersion: "2.0",
    };

    setSending(true);
    setStatus({ kind: "info", msg: "Submitting…" });

    // Build the signed PDF once — used for BOTH repo storage and the email.
    const { buildAgreementPdf, blobToBase64 } = await import("@/lib/agreement-pdf");
    const signedAt = new Date().toISOString();
    const pdfBlob = buildAgreementPdf({
      company: payload.company,
      companiesHouse: payload.companiesHouse,
      website: payload.website,
      payment: payload.payment,
      signatory: payload.signatory,
      position: payload.position,
      email: payload.email,
      signaturePng: payload.signature,
      signedAt,
      termsVersion: payload.termsVersion,
      trialAccepted: payload.trialAccepted,
    });
    const pdfBase64 = await blobToBase64(pdfBlob);

    // 1. Store the signed record + the signed PDF in the site repo (no database).
    let stored = false;
    try {
      const res = await fetch("/api/verified-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, pdfBase64, signedAt }),
      });
      const data = await res.json().catch(() => ({}));
      stored = res.ok && data.stored === true;
    } catch {
      stored = false;
    }

    // 2. Email the owner via FormSubmit — the same mechanism the VP wholesale
    //    and vendor-registration forms already use. No API key required.
    //    Attachment = the signed PDF (terms + details + signature).
    let emailed = false;
    try {
      const fd = new FormData();
      fd.append("_subject", `Verified Package signed: ${payload.company} (${payload.payment})`);
      fd.append("Company", payload.company);
      fd.append("Companies House no.", payload.companiesHouse || "—");
      fd.append("Website", payload.website);
      fd.append("Payment method", payload.payment);
      fd.append("Authorised signatory", payload.signatory);
      fd.append("Position", payload.position);
      fd.append("Email", payload.email);
      fd.append("30-day free trial accepted", payload.trialAccepted ? "Yes" : "No");
      fd.append("Terms version", payload.termsVersion);
      fd.append("Signed at", signedAt);
      fd.append("Type", "Verified Package agreement");
      fd.append("_template", "table");
      fd.append("_captcha", "false");

      const safeName = payload.company.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      fd.append("attachment", pdfBlob, `verified-package-${safeName}.pdf`);

      const fRes = await fetch("https://formsubmit.co/ajax/info@viralpeps.co.uk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const fData = await fRes.json().catch(() => ({}));
      emailed = fRes.ok && fData.success !== "false";
    } catch {
      emailed = false;
    }

    if (emailed || stored) {
      setStatus({ kind: "ok", msg: "Thank you — your signed agreement has been received." });
    } else {
      setStatus({ kind: "err", msg: "Could not submit. Please email info@viralpeps.co.uk instead." });
    }
    setSending(false);
  };

  const inputCls =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1266e8] focus:border-[#1266e8]";
  const labelCls = "block text-[13px] font-semibold text-[#0f1b3d] mb-1.5 mt-3.5";

  return (
    <div className="max-w-[820px] mx-auto px-4 py-8 pb-20">
      {/* TERMS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-7 mb-5">
        <h2 className="text-base font-bold text-[#0f1b3d] mb-3">Terms &amp; Conditions</h2>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">1. The Service</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Verified Package is a <strong>monthly verification and audit service</strong> supplied at a fee of £50
          per calendar month (&ldquo;the Fee&rdquo;). The Fee constitutes consideration for the verification services
          described herein. It does not constitute a purchase of, or entitlement to, any TrustScore, rating, band, or
          numerical value. <strong>Verified Entity (+15):</strong> ViralPeps shall verify the Subscriber&rsquo;s legal
          business identity (a company registered at Companies House or a sole trader) and shall confirm that the
          Subscriber accepts real-money payment by card or bank transfer. <strong>Domain Verification (+15):</strong>{" "}
          provided at no additional charge; the Subscriber shall install the TrustScore badge on its website, linked to
          viralpeps.co.uk, and ViralPeps shall confirm the Subscriber&rsquo;s ownership and operation of the relevant
          domain. <strong>Recertification:</strong> ViralPeps shall re-verify the Subscriber&rsquo;s entity and payment
          particulars at intervals of twelve (12) months. TrustScores are <strong>not offered for sale</strong>; the Fee
          is payable in respect of the audit performed, and any points are awarded solely upon verification of the
          underlying facts.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">2. Subscriber Obligations</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Subscriber shall provide: its registered company name and Companies House number, or such evidence of
          sole-trader status as ViralPeps may reasonably require; confirmation of its payment provider (card processor
          or bank); and evidence of ownership and operation of the website upon which the badge is displayed. ViralPeps
          may request such further evidence as it reasonably considers necessary to complete or renew the audit, and the
          Subscriber shall provide such evidence within a reasonable time.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">3. Fees and Payment</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>£50 per month by Direct Debit</strong> (standard rate), the first <strong>thirty (30) days</strong> of
          which are free of charge; <strong>or £60 per month by bank transfer</strong> (the higher rate reflects the
          additional administrative cost of manual collection). During the free-of-charge period, the verification shall
          proceed and the TrustScore shall be awarded in full. Following the free-of-charge period, the Fee shall be
          collected monthly in advance and shall continue until termination in accordance with these Terms.{" "}
          <strong>
            The Subscriber shall receive a GoCardless Direct Debit link from ViralPeps in order to establish the Direct
            Debit mandate.
          </strong>{" "}
          Termination requires <strong>thirty (30) days&rsquo; written notice</strong>. Where any sum remains
          outstanding for more than <strong>seven (7) days</strong> from its due date, whether payable by Direct Debit
          or bank transfer, the Subscriber&rsquo;s TrustScore shall be suspended, subject to a maximum of 85, and an
          administrative <strong>late-payment fee of £10</strong> shall become payable. The score shall be restored upon
          receipt of payment. Where payment is not made, the Subscriber&rsquo;s TrustScore shall revert to the
          automatically calculated score, subject to a maximum of 85.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">4. No Sale of Scores</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Fee is payable for <strong>verification services, not for any score</strong>. The +15 shall be awarded
          only upon successful verification; a failed verification shall not give rise to any refund. ViralPeps reserves
          the right to re-verify, downgrade, or withdraw any points at any time where evidence is found to be false,
          misleading, or incomplete, and to terminate the subscription accordingly. ViralPeps gives no warranty,
          representation, or guarantee as to any particular band or numerical outcome. The audit measures; it does not
          grade.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">5. Badge Display and Use</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Subscriber shall display the badge unmodified and linked to viralpeps.co.uk. ViralPeps may withdraw the
          Subscriber&rsquo;s right to display the badge where the Subscriber misrepresents its TrustScore or uses the
          badge in a misleading manner.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">6. Scope of Verification and Liability</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The audit extends to entity and payment particulars only. It does not extend to, and constitutes no
          representation concerning, product quality, safety, efficacy, or legal compliance. The Verified Package is not
          an endorsement of the Subscriber&rsquo;s products or services; research-use-only disclaimers continue to apply.
          To the fullest extent permitted by law, ViralPeps shall not be liable for any business losses, loss of profit,
          or consequential loss arising from the Subscriber&rsquo;s TrustScore, band, or display of the badge.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">7. Data Protection</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          ViralPeps shall store the Subscriber&rsquo;s evidence solely for the purpose of conducting and renewing the
          audit. Such evidence shall be disclosed only as necessary to verify it, or where required by law. ViralPeps
          shall delete such evidence upon request following termination of the subscription, subject to any statutory
          retention obligations.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">8. Variation and Governing Law</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          ViralPeps may vary these Terms upon <strong>thirty (30) days&rsquo; written notice</strong>; continued
          subscription following such notice shall constitute acceptance of the varied Terms. This agreement shall be
          governed by and construed in accordance with the laws of England &amp; Wales.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-slate-200 rounded-2xl p-7">
        <h2 className="text-base font-bold text-[#0f1b3d] mb-1">
          <span className="text-[#1266e8]">&rsaquo;</span> Sign here — no printing required
        </h2>

        <label className={labelCls} htmlFor="company">Company / trading name *</label>
        <input id="company" className={inputCls} />

        <div className="flex gap-3.5">
          <div className="flex-1">
            <label className={labelCls} htmlFor="ch">Companies House no. (if Ltd)</label>
            <input id="ch" className={inputCls} />
          </div>
          <div className="flex-1">
            <label className={labelCls} htmlFor="website">Website / domain *</label>
            <input id="website" className={inputCls} />
          </div>
        </div>

        <label className={labelCls}>Payment method *</label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center gap-2 border rounded-[10px] px-3.5 py-3 text-sm cursor-pointer ${
              payment === "dd" ? "border-[#1266e8] bg-[#eff5ff]" : "border-slate-200"
            }`}
          >
            <input type="radio" name="pay" checked={payment === "dd"} onChange={() => setPayment("dd")} />
            Direct Debit — £50/mo
          </label>
          <label
            className={`flex-1 flex items-center gap-2 border rounded-[10px] px-3.5 py-3 text-sm cursor-pointer ${
              payment === "bt" ? "border-[#1266e8] bg-[#eff5ff]" : "border-slate-200"
            }`}
          >
            <input type="radio" name="pay" checked={payment === "bt"} onChange={() => setPayment("bt")} />
            Bank transfer — £60/mo
          </label>
        </div>

        {payment === "dd" && (
          <label className="flex gap-2.5 items-start mt-3.5 mb-1.5 text-[13px] text-slate-600">
            <input type="checkbox" checked={trial} onChange={(e) => setTrial(e.target.checked)} className="mt-1" />
            <span>
              I accept the 30-day free trial, after which £50/month will be collected by Direct Debit. I understand I
              will receive a GoCardless Direct Debit link to set this up.
            </span>
          </label>
        )}

        <div className="flex gap-3.5">
          <div className="flex-1">
            <label className={labelCls} htmlFor="signame">Authorised signatory name *</label>
            <input id="signame" className={inputCls} />
          </div>
          <div className="flex-1">
            <label className={labelCls} htmlFor="position">Position *</label>
            <input id="position" className={inputCls} />
          </div>
        </div>

        <label className={labelCls} htmlFor="email">Email *</label>
        <input id="email" type="email" className={inputCls} />

        <div className="flex items-center justify-between mt-3.5 mb-1.5">
          <label className="text-[13px] font-semibold text-[#0f1b3d]">Signature *</label>
          <button type="button" onClick={clearSig} className="text-[13px] text-[#1266e8]">
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-[150px] border border-dashed border-slate-200 rounded-[10px] bg-white block touch-none"
        />

        <label className="flex gap-2.5 items-start my-4 text-[13px] text-slate-600">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
          <span>
            I confirm I am authorised to enter this agreement for my business, the information I have given is
            accurate, and I accept the Terms &amp; Conditions above.
          </span>
        </label>

        <button
          type="button"
          onClick={submit}
          disabled={sending}
          className="w-full bg-[#0f1b3d] hover:bg-[#1266e8] disabled:opacity-60 text-white rounded-[10px] py-4 text-[15px] font-bold"
        >
          {sending ? "Submitting…" : "Sign & submit agreement"}
        </button>

        {status && (
          <div
            className={`mt-3.5 text-center text-sm ${
              status.kind === "ok" ? "text-green-700" : status.kind === "err" ? "text-red-700" : "text-slate-500"
            }`}
          >
            {status.msg}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        ViralPeps · viralpeps.co.uk · This agreement is governed by the laws of England &amp; Wales.
      </p>
    </div>
  );
}
