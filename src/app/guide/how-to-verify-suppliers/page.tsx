import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How to Verify a Peptide Supplier UK | ViralPeps",
  description:
    "A practical checklist for verifying UK research-peptide suppliers: check the COA and third-party lab, confirm the product page really loads (not a soft 404), check business registration, payment and shipping, and avoid red flags.",
};

const checklist = [
  {
    n: "1",
    title: "The product page actually loads",
    desc: "Click the supplier's product link for the exact compound and dose you want. It should land on a real product page — not bounce you back to the homepage or a generic shop page. If the link reopens the homepage or a catalogue, the listing is unreliable.",
    tag: "STEP 1",
  },
  {
    n: "2",
    title: "Check the Certificate of Analysis (COA)",
    desc: "A credible supplier publishes a COA showing the batch's identity and purity. Look for the batch number that matches the vial you're buying, a named third-party lab, an HPLC purity result (ideally 99%+), and a recent date. A missing, vague, or obviously recycled COA is a red flag.",
    tag: "STEP 2",
  },
  {
    n: "3",
    title: "Confirm a third-party lab ran the test",
    desc: "The most convincing COAs come from independent testing labs, not the supplier testing itself. If a supplier won't name the lab or the doc looks homemade, treat the purity claim with scepticism.",
    tag: "STEP 3",
  },
  {
    n: "4",
    title: "Check business legitimacy",
    desc: "Look for a real registered company (Companies House number), a working contact email/phone, and clear terms, privacy and shipping policies. Transparent suppliers make their identity easy to verify.",
    tag: "STEP 4",
  },
  {
    n: "5",
    title: "Review payment and shipping policy",
    desc: "Check which payment methods they accept and whether UK dispatch is stated (next-day is common in this niche). Unusually low prices with no clear shipping or returns policy warrant extra caution.",
    tag: "STEP 5",
  },
  {
    n: "6",
    title: "Read independent feedback",
    desc: "Look for genuine reviews on independent forums and communities, not just testimonials on the supplier's own site. Consistent, specific feedback from buyers is far more credible than star ratings you can't trace.",
    tag: "STEP 6",
  },
];

const redFlags = [
  "A product link that silently reopens the homepage or shop instead of a specific product page",
  "No COA, or a COA without a batch number, named lab, or date",
  "Purity claims with no third-party test to back them",
  "No clear business registration or verifiable contact details",
  "Vague or missing shipping and returns policy",
  "Only glowing testimonials on the supplier's own site, with little independent trace",
];

export default function HowToVerifySuppliers() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/guide" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="max-w-[76rem] mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-300 text-xs font-medium">Supplier Verification Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            How to Verify a{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Peptide Supplier
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A practical, step-by-step checklist to help you source research peptides from credible
            UK suppliers — and spot the ones to avoid. Use it alongside the{" "}
            <Link href="/vendors" className="text-blue-300 underline hover:text-blue-200">
              supplier directory
            </Link>{" "}
            on ViralPeps.
          </p>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            All content is for educational and research reference purposes only. It does not
            constitute medical advice, diagnosis, or treatment recommendations. All peptides are
            for in-vitro research use only.
          </p>
        </div>
      </div>

      {/* Intro copy */}
      <section className="bg-blue-50 border-t border-blue-200">
        <div className="max-w-[76rem] mx-auto px-4 py-12 md:py-16">
          <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-5">
              SUPPLIER VERIFICATION CHECKLIST
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The research-peptide market varies in quality
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Quality differs widely between UK suppliers. Third-party testing, transparency and
              track record are the signals that separate credible suppliers from risky ones. This
              guide gives you a simple, repeatable checklist to run on any supplier before you buy —
              so you can{" "}
              <Link href="/compounds" className="font-semibold text-blue-600 hover:text-blue-700">
                compare prices
              </Link>{" "}
              with confidence.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              ViralPeps tracks every supplier in its directory, but you should still run your own
              checks — especially before a first order. The six steps below cover the checks that
              matter most, followed by a list of common red flags.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <div className="max-w-[76rem] mx-auto px-4 py-12">
        <div className="space-y-6">
          {checklist.map((item) => (
            <div
              key={item.n}
              className="flex gap-5 bg-white border border-black rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                  {item.n}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Red flags */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-3 py-1">
              RED FLAGS
            </span>
            <h2 className="text-xl font-bold text-gray-900">Signs a supplier isn't worth the risk</h2>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-7">
            <ul className="space-y-3">
              {redFlags.map((flag) => (
                <li key={flag} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                  </svg>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to compare suppliers?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            Browse every UK research-peptide supplier in one directory, or jump straight to price
            comparison on the compound you need.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/vendors"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Suppliers &rarr;
            </Link>
            <Link
              href="/compounds"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Compare Prices
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
