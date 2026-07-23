import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "ViralPeps privacy policy — how we handle your data, cookies, and third-party services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-[76rem] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-300 text-sm">Last updated: 1 July 2026</p>
        </div>
      </section>
      <section className="max-w-[76rem] mx-auto px-4 py-12 space-y-8 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Who We Are</h2>
          <p>
            ViralPeps (viralpeps.co.uk) is a UK-based research peptide price comparison directory. 
            We do not manufacture, sell, or supply any peptides. Our service is limited to 
            comparing publicly available prices from third-party suppliers.
          </p>
          <p className="mt-2">
            If you have any questions about this policy, contact us at{" "}
            <a href="mailto:info@viralpeps.co.uk" className="text-blue-600 hover:underline">info@viralpeps.co.uk</a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Collect</h2>
          <p>We collect only the minimum data necessary to operate the site:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Usage data</strong> — pages visited, searches performed, links clicked (anonymised via Vercel Analytics)</li>
            <li><strong>Cookie data</strong> — strictly functional cookies for site operation (no tracking or advertising cookies)</li>
            <li><strong>Contact information</strong> — name and email address if you voluntarily contact us or sign up for alerts/newsletters</li>
            <li><strong>Server logs</strong> — standard web server logs (IP address, browser user agent, timestamp) collected by our hosting provider (Vercel Inc.)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Legal Basis for Processing</h2>
          <p>Under UK GDPR, we process your data on the following bases:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Legitimate interests</strong> — usage analytics to improve the site and understand how researchers use our comparison tools</li>
            <li><strong>Consent</strong> — email signups, newsletter subscriptions, and optional features you choose to enable</li>
            <li><strong>Contractual necessity</strong> — if you enter into a supplier agreement or paid service with us</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate and improve the ViralPeps comparison platform</li>
            <li>To respond to enquiries and support requests</li>
            <li>To send price alerts, research updates, or newsletters (only with consent)</li>
            <li>To detect and prevent abuse of the site</li>
            <li><strong>We do not sell your personal data to third parties</strong></li>
            <li><strong>We do not share your data with the suppliers listed on our site</strong></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Third-Party Services</h2>
          <p>ViralPeps uses the following third-party services:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Vercel Inc.</strong> — hosting provider. Collects standard server logs (IP, user agent, request timing). Their privacy policy: vercel.com/legal/privacy.</li>
            <li><strong>Vercel Analytics</strong> — anonymised, privacy-focused analytics. No cookies set. No personal data collected.</li>
            <li><strong>MailerLite / Beehiiv (future)</strong> — email newsletter delivery. Only for users who explicitly opt in.</li>
          </ul>
          <p className="mt-2">
            We do not use Google Analytics, Facebook Pixel, or any advertising trackers. 
            ViralPeps does not serve ads and does not share data with advertisers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Cookies</h2>
          <p>
            ViralPeps uses minimal functional cookies. These are essential for the site to function 
            (e.g. remembering your dosage filter selection during a session).
          </p>
          <p className="mt-2">
            We do not use tracking cookies, advertising cookies, or third-party cookies for marketing purposes.
            Vercel Analytics does not use cookies.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. Data Retention</h2>
          <p>
            Usage analytics are retained in anonymised form indefinitely (no personal identifiers). 
            Contact information and email subscriptions are retained until you unsubscribe or request deletion. 
            Server logs are retained by Vercel for up to 30 days.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. Your Rights (UK GDPR)</h2>
          <p>Under UK data protection law, you have the following rights:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Right of access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Right to rectification</strong> — correct inaccurate data</li>
            <li><strong>Right to erasure</strong> — request deletion of your data</li>
            <li><strong>Right to restrict processing</strong> — limit how we use your data</li>
            <li><strong>Right to data portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Right to object</strong> — object to processing based on legitimate interests</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email{" "}
            <a href="mailto:info@viralpeps.co.uk" className="text-blue-600 hover:underline">info@viralpeps.co.uk</a>. 
            We will respond within 30 days. You also have the right to lodge a complaint with the 
            Information Commissioner&apos;s Office (ICO).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">9. Affiliate Links (Future)</h2>
          <p>
            ViralPeps may include affiliate links to third-party suppliers. If you click an affiliate 
            link and make a purchase, we may earn a small commission at no extra cost to you. 
            Affiliate links are clearly disclosed. We do not share your personal data with 
            affiliate partners — the transaction is between you and the supplier.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">10. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be notified on the site. 
            Continued use of ViralPeps after changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">11. Contact</h2>
          <p>
            For privacy-related enquiries, data subject requests, or questions about this policy:
          </p>
          <p className="mt-1">
            Email: <a href="mailto:info@viralpeps.co.uk" className="text-blue-600 hover:underline">info@viralpeps.co.uk</a>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
