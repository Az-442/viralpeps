import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Frequently Asked Questions — ViralPeps UK",
  description: "Answers to common questions about Peptide Supermarket, buying peptides in the UK, peptide legality, pricing, and more.",
};

const faqs = [
  {
    question: "What is ViralPeps?",
    answer:
      "ViralPeps is a UK-based price comparison platform for research peptides. We track live prices from verified UK suppliers so researchers can compare deals side by side. We do not sell peptides — we simply compare prices.",
  },
  {
    question: "Where can I buy peptides in the UK?",
    answer:
      "You can buy research peptides from any of the verified UK suppliers listed on ViralPeps. We currently track prices from 10+ trusted UK vendors including UK Peptides, Pure Peptides UK, Sterling Peptides, Express Peptides, and more. Browse our <a href='/vendors'>supplier directory</a> to compare them.",
  },
  {
    question: "What are the cheapest peptides in the UK?",
    answer:
      "Prices vary by supplier and compound. Generally, GHK-Cu, BPC-157, TB-500, and NAD+ tend to have competitive pricing across multiple UK vendors. Use our <a href='/compounds'>comparison tool</a> to find the current best prices on any peptide.",
  },
  {
    question: "Are peptides legal in the UK?",
    answer:
      "Research peptides are legal to buy and sell in the UK for in-vitro research purposes. They are not approved for human consumption. All products sold by our listed suppliers are clearly labelled for laboratory research use only. We recommend checking relevant regulations before ordering.",
  },
  {
    question: "How often are prices updated?",
    answer:
      "Prices are checked daily. We monitor each supplier's website for changes and update our listings accordingly so you always see accurate, up-to-date pricing.",
  },
  {
    question: "Does ViralPeps sell peptides?",
    answer:
      "No. ViralPeps is a price comparison platform only. We do not manufacture, sell, or distribute any peptides. We simply help researchers find the best deals from trusted third-party suppliers.",
  },
  {
    question: "How do you choose which suppliers to list?",
    answer:
      "We list UK-based suppliers that offer independently tested products and have a track record of reliable service. We are completely independent — there are no sponsored rankings or biased placements.",
  },
  {
    question: "What are pure peptides?",
    answer:
      "Pure peptides refer to research-grade compounds that are ≥98% pure, verified by third-party HPLC testing. Most suppliers on ViralPeps provide certificates of analysis (COAs) with their products. Look for the 'lab tested' badge when comparing suppliers.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 border border-emerald-500/40 rounded-full px-3 py-0.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            FAQ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about ViralPeps, peptide pricing, and UK suppliers.
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                <span className="text-sm font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 pb-4 border-t border-gray-100">
                <p
                  className="text-sm text-gray-600 leading-relaxed mt-3"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </details>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
