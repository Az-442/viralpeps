import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import TrustScoreIcon from "@/components/TrustScoreIcon";

export const metadata = {
  title: "TrustScore — How ViralPeps Rates Every UK Supplier",
  description: "TrustScore is ViralPeps' method-backed rating (0-100) of how transparent and verifiable every UK peptide supplier is. Never for sale — paid packs or fees cannot change a score.",
};

const bands = [
  { range: "90 – 100", label: "Excellent Trust", color: "bg-emerald-500 text-white", desc: "Fully verified business, published third-party COAs, strong genuine reviews and clear research-use-only labelling." },
  { range: "75 – 89", label: "High Trust", color: "bg-green-100 text-green-800", desc: "Verifiable company and contact, most trust signals confirmed, little cause for concern." },
  { range: "60 – 74", label: "Moderate Trust", color: "bg-amber-100 text-amber-800", desc: "Some signals confirmed but gaps remain — check the breakdown before you buy." },
  { range: "40 – 59", label: "Limited Trust", color: "bg-red-100 text-red-800", desc: "Fewer verifiable signals. Higher risk — proceed with caution." },
  { range: "0 – 39", label: "Low Trust", color: "bg-red-100 text-red-800", desc: "Little verifiable evidence or concerning red flags. Tread very carefully." },
];

const signals = [
  { pts: "+25", title: "Business verified", desc: "The named trading entity behind the brand is manually confirmed (we verify it by email). A faceless store can never reach the top bands." },
  { pts: "+25", title: "COAs & lab testing", desc: "Published Certificates of Analysis with batch numbers from a named third-party lab (e.g. Janoshik HPLC). The single most decisive signal a supplier controls." },
  { pts: "+10", title: "Contact verified", desc: "A real, working way to reach a person — a replying email, phone number, or functional contact form." },
  { pts: "+20", title: "Domain verified", desc: "Supplier installs the free TrustScore badge on their site (linking back to ViralPeps). We confirm they own and operate the website." },
  { pts: "+5", title: "Research-use compliance", desc: "Clear \u201cfor in-vitro research only\u201d labelling and no marketing of research chemicals for human or medical use." },
  { pts: "+10", title: "Genuine reviews", desc: "Volume and quality of authentic Google and Trustpilot reviews. Fake review sites are penalised — we only use trusted websites." },
  { pts: "+5", title: "Shipping & support", desc: "Reliable dispatch, realistic delivery times, and responsive customer support." },
];

const verified = ["Business", "Contact", "Domain", "COAs", "Compliant", "Lab-Tested"];

const caps = [
  { condition: "No verifiable business identity behind the store" },
  { condition: "Marketing research chemicals for human or medical use" },
  { condition: "No verifiable domain ownership" },
];

export default function TrustScorePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16">
        <div className="max-w-[76rem] mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mb-5">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">Independent rating</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="inline-flex items-center align-middle mr-2">
              <TrustScoreIcon className="w-[1.35em] h-[1.35em]" />
            </span>
            TrustScore<span className="text-slate-500 font-normal">/100</span>
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            A method-backed rating system of how transparent and verifiable every UK supplier is.
            Our method is <strong className="text-white">not for sale</strong>, not sold to the highest bidder &ndash;
            listing is free, partnerships do not change our independent score.
          </p>
        </div>
      </section>

      <section className="max-w-[76rem] mx-auto px-4 py-12">
        {/* Bands */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What a score means</h2>
          <p className="text-gray-500 text-sm mb-6">Read the band, not just the number — the exact value only matters near a band boundary.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {bands.map((b) => (
              <div key={b.range} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.color}`}>{b.label}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{b.range}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signals */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What we check</h2>
          <p className="text-gray-500 text-sm mb-6">Each supplier score is built from the same seven signals, totalling 100 points.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {signals.map((s) => (
              <div key={s.title} className="flex gap-5 border border-gray-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 w-16 shrink-0">{s.pts}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            TrustScore measures transparency and verifiability. It is <strong>not</strong> a measure of
            product safety, purity, or legality — always do your own due diligence.
          </p>
        </div>

        {/* Verified ticks */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verified ticks</h2>
          <p className="text-gray-500 text-sm mb-6">
            Every passing check shows as a proof badge on the supplier's profile — the evidence behind the number.
          </p>
          <div className="flex flex-wrap gap-3">
            {verified.map((v) => (
              <span key={v} className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-full px-3 py-1.5">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Caps */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What caps a score</h2>
          <p className="text-gray-500 text-sm mb-6">Some failures are serious enough that no amount of positive signals can produce a high score.</p>
          <div className="space-y-3">
            {caps.map((c) => (
              <div key={c.condition} className="flex items-center gap-3 border border-red-300 bg-red-100 rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-red-900">{c.condition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For suppliers */}
        <div className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Are you a UK supplier?</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
            Listed free. Claim your profile to add your business, COAs, contact details and reviews —
            then watch your TrustScore rise with every verified signal.
          </p>
          <a
            href="/vendors/register"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Claim your profile →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
