"use client";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function WholesalePage() {
  const [bizName, setBizName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [coas, setCoas] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Business name", bizName);
      formData.append("Website", website);
      formData.append("Contact email", email);
      formData.append("Country", country);
      formData.append("Minimum order", minOrder);
      formData.append("COAs", coas);
      formData.append("Wholesale overview", description);
      formData.append("Type", "Wholesale application");
      const res = await fetch("https://formsubmit.co/ajax/info@viralpeps.co.uk", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || data.success === "false") {
        throw new Error(data.message || "Submission failed");
      }
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Could not submit. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <HeaderNav current="/wholesale" />
        <div className="flex-1 max-w-2xl mx-auto px-4 py-20 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Wholesale application submitted
          </h1>
          <p className="text-gray-600">
            Thanks for applying to list your wholesale business. Our team will review your submission and reply within 2&ndash;3 business days if approved.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Back to Home</Link>
            <Link href="/suppliers" className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">View Suppliers</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderNav current="/wholesale" />

      {/* HERO — light homepage banner theme */}
      <section className="bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-amber-300 bg-amber-50">
              <svg className="w-3 h-3 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Invite-Only · B2B Wholesale</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Bulk peptide supply,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">strictly invite-only</span>
            </h1>
            <p className="text-gray-600 text-base mb-7 max-w-xl leading-relaxed">
              A vetted wholesale marketplace where approved sellers list bulk peptide stock and approved labs &amp; research facilities buy it. Not open to the public.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#apply" className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white rounded-lg text-sm font-bold hover:opacity-95 transition">Apply to list your wholesale business</a>
              <a href="#wholesale" className="px-5 py-3 bg-white border border-black rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">Browse wholesale suppliers</a>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Vetted for:</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Bulk pricing</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">COA-backed</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Account-approved</span>
            </div>
          </div>

          {/* Right: navy panel */}
          <div className="rounded-2xl p-7 text-white bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-0.5">Wholesale access</h3>
                <p className="text-sm text-slate-400">Approval required</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">Invite</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Sellers only</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">COA</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Lab required</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">B2B</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Trade volumes</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">100%</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Vetted</div></div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>No listings fees</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>Manual review</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-5">
        <div className="max-w-[76rem] mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg><span className="text-sm text-black">Independently vetted</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span className="text-sm text-black">COA on file</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /><circle cx="12" cy="12" r="5" /></svg><span className="text-sm text-black">Bulk trade only</span></div>
        </div>
      </section>

      {/* WHOLESALE SUPPLIERS */}
      <section id="wholesale" className="py-10 max-w-[76rem] mx-auto px-4">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#08c0e8"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Invite-Only Wholesale Directory</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Approved wholesale suppliers</h2>
          <p className="text-sm text-gray-500 mt-1">Sellers invited and approved by the ViralPeps team. Bulk listing, COA-backed, quality-screened.</p>
        </div>

        <div className="bg-white border border-black rounded-xl p-4 mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          <div>
            <p className="text-sm font-semibold text-gray-900">This is a B2B wholesale marketplace, not a public store.</p>
            <p className="text-sm text-gray-600 mt-0.5">To view wholesale stock buyers need an approved account; sellers are listed by invite only. Access is gated.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <a href="#apply" onClick={(e) => { e.preventDefault(); document.getElementById("bizName")?.focus(); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200 font-extrabold text-xl text-blue-600">LD</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base">Labsource Distribution</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="text-amber-500 text-sm">★ 4.8</span><span className="text-xs text-gray-500">UK</span></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>Wholesale Verified</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>COA</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">128 bulk SKUs</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Vetted UK wholesale distributor · GMP facility</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5"><span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">View &rarr;</span></div>
            </div>
          </a>

          <a href="#apply" onClick={(e) => { e.preventDefault(); document.getElementById("bizName")?.focus(); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200 font-extrabold text-xl text-purple-600">PW</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base">Peptide Wholesale Co</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="text-amber-500 text-sm">★ 4.6</span><span className="text-xs text-gray-500">UK</span></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>Wholesale Verified</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">94 bulk SKUs</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Bulk lyophilised peptides · research-grade</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5"><span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">View &rarr;</span></div>
            </div>
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">Wholesale suppliers shown for illustration. Directory is invite-only and populated on approval.</p>
      </section>

      {/* APPLY FORM */}
      <section id="apply" className="py-10 max-w-[76rem] mx-auto px-4">
        <div className="bg-white border border-black rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6"><path d="M7 10l5 5 5-5H7z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Seller Application</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Apply to list your wholesale business</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-2xl">
            This section is invite-only. Submit an application and our team will review your wholesale business. Approved sellers can list bulk stock that only vetted wholesale buyers can see.
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Business Name <span className="text-red-500">*</span></label>
              <input id="bizName" type="text" required value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="e.g. Labsource Distribution" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Website URL <span className="text-red-500">*</span></label>
              <input type="text" required value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yoursite.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Contact Email <span className="text-red-500">*</span></label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="wholesale@yoursite.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Country <span className="text-red-500">*</span></label>
              <select required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white">
                <option value="" disabled>Select country</option>
                <option>USA</option><option>UK</option><option>Canada</option><option>Australia</option><option>Netherlands</option><option>Germany</option><option>China</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Minimum order size (units / gram) <span className="text-red-500">*</span></label>
              <input type="text" required value={minOrder} onChange={(e) => setMinOrder(e.target.value)} placeholder="e.g. 100 vials min" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Do you provide third-party lab COAs? <span className="text-red-500">*</span></label>
              <select required value={coas} onChange={(e) => setCoas(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white">
                <option value="" disabled>Select</option>
                <option>Yes — full COA for every batch</option>
                <option>Lab report available on request</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Wholesale product overview</label>
              <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us about your bulk catalogue — peptides stocked, volumes, shipping, MOQ, quality standards." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-y"></textarea>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <div>
                  <p className="font-semibold text-amber-800">By Invite Only</p>
                  <p className="text-amber-700 mt-1">Listing in the wholesale section is invitation-based. All applications are manually reviewed by the ViralPeps team for compliance and quality before approval.</p>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 w-full md:w-auto px-8 py-3 text-white rounded-lg text-sm font-bold hover:opacity-95 transition disabled:opacity-60">
              {loading ? "Submitting..." : "Submit wholesale application"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
