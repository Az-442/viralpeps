import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — ViralPeps UK",
  description: "ViralPeps privacy policy — how we handle your data, cookies, and third-party services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-300 text-sm">Last updated: 1 July 2026</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Information We Collect</h2>
          <p>When you visit ViralPeps, we may collect:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Usage data (pages visited, searches, clicks) via anonymous analytics</li>
            <li>Cookie data for site functionality</li>
            <li>Contact information you voluntarily provide via email</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To improve the website and user experience</li>
            <li>To respond to enquiries</li>
            <li>We do not sell your personal data to third parties</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Third-Party Services</h2>
          <p>We use Vercel for hosting, which may collect standard server logs. We do not use advertising trackers or share data with advertisers.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Cookies</h2>
          <p>ViralPeps uses minimal functional cookies. No tracking or advertising cookies are used.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Contact</h2>
          <p>For privacy enquiries, email info@viralpeps.co.uk.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
