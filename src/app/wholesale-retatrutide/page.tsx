import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Retatrutide UK: Bulk Trade Supply",
  description:
    "Wholesale retatrutide from approved UK trade suppliers. Compare bulk retatrutide pricing, minimum orders and batch COA availability before you enquire.",
  alternates: { canonical: "https://viralpeps.co.uk/wholesale-retatrutide" },
};

const faqs = [
  {
    q: "Who can buy wholesale retatrutide in the UK?",
    a: "Trade buyers only: research laboratories, analytical testing facilities, university research groups and businesses sourcing on behalf of a research organisation. Supply is for laboratory research use only and every buyer must be aged 21 or over. Retail buyers wanting a single pen should use the standard compound page instead.",
  },
  {
    q: "Is there a minimum order for bulk retatrutide?",
    a: "It depends on the supplier. Some approved trade suppliers quote from a single multi-pen pack, while others set a floor of 10 pens or more. Minimum order quantity is one of the details you should confirm before comparing prices, because a low headline rate with a high MOQ is often worse value than a mid-range rate with no floor.",
  },
  {
    q: "How much does wholesale retatrutide cost?",
    a: "Trade pricing is quoted per enquiry rather than published, because the rate depends on volume, pack format and how regularly you order. No supplier on this page publishes a live trade price list. Submit an enquiry with your expected monthly volume and you will receive a rate directly.",
  },
  {
    q: "Does bulk retatrutide come with a batch certificate of analysis?",
    a: "It should, and you should insist on it. Every batch should be documented with a third-party certificate of analysis naming the specific lot number, the purity result and the testing laboratory. If a supplier offers a certificate from a different batch, treat that as a red flag rather than a reassurance.",
  },
  {
    q: "What is the difference between wholesale retatrutide and the retail listing?",
    a: "The compound and the pack format are the same. What changes is the commercial arrangement: trade orders are invoiced rather than bought through a website checkout, pricing is quoted per enquiry, and volumes are agreed in advance rather than bought one pack at a time.",
  },
  {
    q: "Can I set up scheduled or recurring bulk retatrutide supply?",
    a: "Approved trade suppliers can usually schedule recurring supply once the monthly volume and dispatch dates are agreed. Ask for a fixed rate for the agreed term, so your cost per pack does not move between batches. Scheduled terms are also the point at which most suppliers will hold stock for you.",
  },
  {
    q: "Do suppliers hold UK stock or drop-ship from overseas?",
    a: "This is the single most useful question to ask. Held UK stock means dispatch the same working day, tracked domestic delivery and a batch you can trace to a UK certificate. Drop-shipping means longer lead times, customs exposure and a batch you cannot inspect before it arrives. Ask directly, and ask for a dispatch turnaround in writing.",
  },
  {
    q: "How do I verify a wholesale retatrutide supplier before ordering?",
    a: "Check four things: a named UK trading entity with an address, a third-party certificate of analysis per batch, a stated dispatch turnaround, and a written research-use-only policy. A supplier that is vague on any of those four is a supplier to avoid, regardless of the price quoted.",
  },
];

export default function WholesaleRetatrutidePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderNav current="/wholesale" />

      {/* HERO */}
      <section className="bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 border border-amber-300 bg-amber-50">
              <svg className="w-3 h-3 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Trade &amp; Bulk · Research Use Only</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Wholesale retatrutide,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">sourced from vetted UK trade suppliers</span>
            </h1>
            <p className="text-gray-600 text-base mb-7 max-w-xl leading-relaxed">
              A comparison page for bulk retatrutide buyers. Every supplier listed here is screened for held UK stock, batch-level certificates of analysis and a stated dispatch turnaround &mdash; before you enquire.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#suppliers" className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white rounded-lg text-sm font-bold hover:opacity-95 transition">Compare trade suppliers</a>
              <a href="#buyer-checklist" className="px-5 py-3 bg-white border border-black rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">Read the buyer checklist</a>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Screened for:</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Held UK stock</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Batch COA</span>
              <span className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600">Stated dispatch</span>
            </div>
          </div>

          <div className="rounded-2xl p-7 text-white bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-0.5">Trade buying rules</h2>
                <p className="text-sm text-slate-400">What applies to every order</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">21+</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Buyer age</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">RUO</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Research only</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">B2B</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Trade only</div></div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3"><div className="text-xl font-extrabold">COA</div><div className="text-[11px] text-slate-400 uppercase tracking-wider pt-0.5">Per batch</div></div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>No published price list</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>Quoted per enquiry</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-[76rem] mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg><span className="text-sm text-black">Screened before listing</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span className="text-sm text-black">Held UK stock</span></div>
          <div className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11H5a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2zM19 3h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg><span className="text-sm text-black">Batch COA required</span></div>
        </div>
      </section>

      {/* INTRO / WHAT THIS PAGE IS */}
      <section className="py-10 max-w-[76rem] mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What wholesale retatrutide actually means</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Retatrutide is a triple agonist research compound &mdash; GLP-1, GIP and glucagon receptors &mdash; and it has become one of the most requested compounds for bulk purchase in the UK research market. That demand has produced a lot of suppliers who will sell you a wholesale-sounding price without holding any stock, without a certificate for the batch they ship, and without a UK entity to hold accountable.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Wholesale retatrutide is not a different compound from the retail listing. It is the same material at a different commercial arrangement: quoted per enquiry, invoiced rather than checked out, and priced against the volume and regularity you actually commit to. What separates a genuine trade supplier from a reseller is not the price, it is whether the stock is physically held and the batch is documented.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            This page exists to make that distinction checkable before you spend anything. Below are the trade suppliers we have screened, followed by the five questions that separate a real wholesale retatrutide supplier from a drop-shipper.
          </p>
        </div>
      </section>

      {/* SUPPLIERS */}
      <section id="suppliers" className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#08c0e8"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Screened Trade Suppliers</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Who supplies bulk retatrutide in the UK</h2>
          <p className="text-sm text-gray-500 mt-1">Suppliers screened for held UK stock, batch documentation and a stated dispatch turnaround. Pricing is quoted per enquiry by each supplier directly.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <a href="https://unitedpeptides.co.uk/wholesale/" target="_blank" rel="noopener" className="bg-white border-2 border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200 font-extrabold text-xl text-blue-600">UP</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base">United Peptides</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">TrustScore 75</span><span className="text-xs text-gray-500">UK</span></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>Wholesale Verified</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full"><svg width="8" height="8" viewBox="0 0 24 24" fill="#16a34a"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>COA</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Bulk peptides &amp; peptide pens</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">UK research supplier · Trade pricing on request</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5"><span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">View &rarr;</span></div>
            </div>
          </a>

          <a href="/wholesale" className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-200 font-extrabold text-xl text-purple-600">VP</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-base">Full wholesale directory</h3>
                <div className="flex items-center gap-2 mt-0.5"><span className="text-xs text-gray-500">ViralPeps</span></div>
                <p className="text-xs text-gray-500 mt-1.5">Every approved bulk supplier, not just retatrutide</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">Screened trade sellers across all compounds</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0 pt-0.5"><span className="text-xs font-semibold text-blue-600 group-hover:underline mt-2 whitespace-nowrap">View &rarr;</span></div>
            </div>
          </a>
        </div>

        <div className="mt-6 bg-white border border-black rounded-xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          <div>
            <p className="text-sm font-semibold text-gray-900">Trade pricing is not published by any supplier on this page.</p>
            <p className="text-sm text-gray-600 mt-0.5">Rates depend on volume, pack format and order regularity, so each supplier quotes per enquiry. ViralPeps does not take a commission on any trade order.</p>
          </div>
        </div>
      </section>

      {/* BUYER CHECKLIST */}
      <section id="buyer-checklist" className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Buyer Checklist</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Five questions that separate a real supplier from a reseller</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Ask all five before you place a first bulk retatrutide order. A supplier with good answers to all five is worth a premium. A supplier who is evasive on any one of them is not worth a discount.
          </p>

          <div className="space-y-4">
            <div className="bg-white border border-black rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-1.5">1. Is the stock physically held in the UK?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Held stock means same-working-day dispatch, domestic tracking and a batch you can trace. Drop-shipping means customs exposure, unpredictable lead times and no ability to verify the batch before it reaches you.</p>
            </div>
            <div className="bg-white border border-black rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-1.5">2. Is there a certificate of analysis for this specific lot?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Not &ldquo;a certificate&rdquo; &mdash; a certificate naming the lot number being shipped, with a purity figure and a named third-party laboratory. A certificate from a different batch tells you nothing about what is in the box.</p>
            </div>
            <div className="bg-white border border-black rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-1.5">3. What is the actual dispatch turnaround, in writing?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Vague promises of &ldquo;fast dispatch&rdquo; are worthless. Ask for a cut-off time and a working-day figure in writing. If they cannot commit to one, they are sourcing after you order.</p>
            </div>
            <div className="bg-white border border-black rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-1.5">4. What is the minimum order quantity, and does the rate change with volume?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">A low headline rate attached to a high MOQ is usually worse value than a mid-range rate with a sensible floor. Get the MOQ and the volume break points in the same message as the price.</p>
            </div>
            <div className="bg-white border border-black rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-1.5">5. Is there a named UK entity and a written research-use-only policy?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">A trading name and a contact form is not an entity. You want a company name, an address, and a stated policy that material is supplied strictly for laboratory research use only. Those three things are what you rely on if something goes wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING EXPLAINED */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How bulk retatrutide pricing works</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            No genuine wholesale retatrutide supplier publishes a live trade price list, and there is a reason for that. Trade pricing is a function of volume, pack format, order regularity and the current cost of the batch being quoted. A published number would be wrong within a month.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2.5"><svg className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg><span className="text-base text-gray-700"><strong>Volume drives the rate.</strong> The more you commit to, the lower the per-pack cost &mdash; but the break points are set per supplier.</span></li>
            <li className="flex items-start gap-2.5"><svg className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg><span className="text-base text-gray-700"><strong>Regularity drives it further.</strong> A scheduled monthly order is worth more to a supplier than a one-off, and the rate should reflect that.</span></li>
            <li className="flex items-start gap-2.5"><svg className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg><span className="text-base text-gray-700"><strong>Batch cost moves.</strong> Raw material pricing changes, and a supplier quoting a firm rate for six months is either overcharging now or will break the agreement later.</span></li>
          </ul>
          <p className="text-base text-gray-700 leading-relaxed">
            The practical approach is to ask for a fixed rate for a defined term &mdash; for example three months at an agreed monthly volume &mdash; rather than a headline price with no term attached. That gives you a predictable cost without asking a supplier to guarantee something they cannot control.
          </p>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/compounds/retatrutide" className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">Retatrutide price guide &amp; suppliers &rarr;</h3>
              <p className="text-xs text-gray-500 mt-1.5">Retail pricing per pack, verified supplier listings and purity data for retatrutide.</p>
            </Link>
            <Link href="/wholesale" className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">All wholesale peptide suppliers &rarr;</h3>
              <p className="text-xs text-gray-500 mt-1.5">The full screened directory of UK bulk peptide suppliers across every compound.</p>
            </Link>
            <Link href="/wholesale-tirzepatide" className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">Wholesale tirzepatide &rarr;</h3>
              <p className="text-xs text-gray-500 mt-1.5">Bulk tirzepatide supply, minimum orders and trade pricing for the GIP/GLP-1 compound.</p>
            </Link>
            <Link href="/vendors" className="bg-white border border-black rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">Verified supplier profiles &rarr;</h3>
              <p className="text-xs text-gray-500 mt-1.5">TrustScore, COA status and delivery data for every supplier we track in the UK.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 max-w-[76rem] mx-auto px-4 border-t border-gray-100">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-2.5 py-0.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6"><path d="M7 10l5 5 5-5H7z" /></svg>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Wholesale Retatrutide</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bulk retatrutide &mdash; common questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white border border-black rounded-xl overflow-hidden group">
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none">
                  <span className="text-xs font-bold text-blue-600 flex-shrink-0 w-5">{i + 1}</span>
                  <span className="font-semibold text-gray-900 text-sm flex-1">{f.q}</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <div className="px-5 pb-5 pl-13 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 max-w-[76rem] mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Research use only.</strong> All compounds referenced on this page are supplied strictly for laboratory research use only. They are not medicines, not supplements, and not for human or veterinary consumption. Wholesale supply is restricted to trade buyers aged 21 or over. ViralPeps is a comparison and directory service; we do not manufacture, stock or sell these compounds and we take no commission on trade orders.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
