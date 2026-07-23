import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ViralPeps. Questions about the directory, supplier listings, or something else? Contact us here.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/contact" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-[76rem] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ViralPeps
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Questions, feedback, or want to list your business? We&apos;d love
            to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[76rem] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Get in touch
            </h2>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                Email
              </h3>
              <a
                href="mailto:info@viralpeps.co.uk"
                className="text-blue-600 hover:underline text-sm"
              >
                info@viralpeps.co.uk
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                List your business
              </h3>
              <p className="text-sm text-gray-700">
                Are you a UK peptide supplier?{" "}
                <Link
                  href="/vendors/register"
                  className="text-blue-600 hover:underline"
                >
                  Register your business here
                </Link>{" "}
                to get listed in our directory.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                Before you contact us
              </h3>
              <p className="text-sm text-gray-700">
                Check our{" "}
                <Link href="/faq" className="text-blue-600 hover:underline">
                  FAQ page
                </Link>{" "}
                — your question may already be answered there.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick links
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/compounds"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Browse all compounds →
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View all suppliers →
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Frequently asked questions →
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors/register"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  List your business →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
