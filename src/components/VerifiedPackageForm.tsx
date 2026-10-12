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
      termsVersion: "1.0",
    };

    setSending(true);
    setStatus({ kind: "info", msg: "Submitting…" });

    // 1. Store the signed record in the site repo (no database).
    let stored = false;
    try {
      const res = await fetch("/api/verified-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      stored = res.ok && data.stored === true;
    } catch {
      stored = false;
    }

    // 2. Email the owner via FormSubmit — the same mechanism the VP wholesale
    //    and vendor-registration forms already use. No API key required.
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
      fd.append("Terms version", payload.termsVersion);
      fd.append("Signed at", new Date().toISOString());
      fd.append("Type", "Verified Package agreement");
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      // attach the signature image
      const blob = await (await fetch(payload.signature)).blob();
      fd.append("attachment", blob, `signature-${payload.company.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`);

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

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">1. What you are buying</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          A <strong>£50/month subscription for verification work</strong> — not a purchase of points, a rating, or a
          band. <strong>Verified Entity (+15):</strong> we verify your legal identity (registered Ltd or sole trader) and
          that you accept card or bank payment. <strong>Domain Verified (+15):</strong> free — you install the
          TrustScore badge linking back to ViralPeps, and we confirm you own the domain. We recertify every 12 months.
          Scores are <strong>never for sale</strong>.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">2. What you must provide</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Your registered company name and Companies House number (or sole-trader evidence); confirmation of your
          payment provider; and proof you own the website carrying the badge. We may request further evidence.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">3. Payment</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          £50/month by Direct Debit (default), or £60/month by bank transfer (the higher rate covers manual
          collection). Billed monthly in advance until cancelled, with <strong>30 days&rsquo; written notice</strong> to
          cancel. If payment is <strong>7 days late</strong>, your entity verification is suspended (your score reverts
          to the automatic score, maximum 85) and a <strong>£10 late fee</strong> applies. Verification is restored
          immediately on payment.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">4. No sale of scores</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The fee buys <strong>verification, not a score</strong>. We award +15 only if the facts verify; a failed check
          is not refundable. We may re-check, downgrade, or remove points if evidence proves false, and cancel the
          subscription. We do not promise a specific band or number.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">5. Badge display</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The badge must be shown unmodified and link back to viralpeps.co.uk. We may withdraw badge rights for
          misleading use.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">6. Scope &amp; liability</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The audit covers entity and payment facts only — not product quality, safety, or compliance. It is not an
          endorsement. Research-use-only disclaimers still apply. We are not liable for business losses arising from
          your score, band, or badge.
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">7. Your data</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          We store your evidence only to conduct and renew the audit, share it only to verify it or where legally
          required, and delete it on request after cancellation (subject to legal retention).
        </p>

        <h3 className="text-[13px] font-bold text-[#0f1b3d] mt-4 mb-1">8. Changes &amp; law</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          We may update these terms with 30 days&rsquo; notice. Governed by the laws of England &amp; Wales.
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
