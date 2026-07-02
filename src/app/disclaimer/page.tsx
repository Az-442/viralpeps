import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Disclaimer — ViralPeps UK",
  description: "ViralPeps disclaimer — important information about our role as a price comparison directory, research use only, and affiliate relationships.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-[90rem] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Disclaimer</h1>
          <p className="text-gray-300 text-sm">Last updated: 1 July 2026</p>
        </div>
      </section>
      <section className="max-w-[90rem] mx-auto px-4 py-12 space-y-8 text-sm text-gray-700 leading-relaxed">

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. No Seller Relationship</h2>
          <p>
            ViralPeps is a price comparison directory only. We do not manufacture, sell, distribute, 
            or supply any peptides, research chemicals, or related products. We do not handle payments, 
            process orders, ship products, or act as an agent for any supplier listed on this site.
          </p>
          <p className="mt-2">
            All transactions are between you and the third-party supplier. ViralPeps has no control 
            over product quality, pricing, availability, or shipping.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Research Use Only</h2>
          <p>
            All compounds listed on ViralPeps are intended for <strong>in-vitro laboratory research 
            purposes only</strong>. They are not approved for human or veterinary consumption, 
            ingestion, injection, or topical application by humans or animals.
          </p>
          <p className="mt-2">
            The information provided on this website, including research summaries, dosing protocols, 
            and compound profiles, is derived from published scientific literature and is provided 
            for <strong>educational and research reference purposes only</strong>. It does not 
            constitute medical advice, diagnosis, or treatment recommendations. Always consult a 
            qualified healthcare professional before making any decisions related to your health.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. No Medical Advice</h2>
          <p>
            Nothing on ViralPeps should be construed as medical advice. We do not diagnose, treat, 
            cure, or prevent any disease or medical condition. Research findings described on this 
            site are based on preclinical studies and may not translate to clinical or human applications.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Accuracy of Information</h2>
          <p>
            Prices and product information are checked daily but may change between updates. We 
            recommend verifying prices, availability, and product specifications directly with 
            suppliers before making any purchase decisions.
          </p>
          <p className="mt-1">
            While we strive to keep all information accurate and up to date, ViralPeps makes no 
            representations or warranties of any kind, express or implied, about the completeness, 
            accuracy, reliability, suitability, or availability of the information on this site.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Third-Party Links</h2>
          <p>
            ViralPeps contains links to third-party supplier websites. These links are provided 
            for your convenience. We have no control over the content, accuracy, privacy practices, 
            or business practices of these third-party sites. Use them at your own discretion and 
            review their terms and policies independently.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Affiliate Disclosure</h2>
          <p>
            ViralPeps may earn a commission from qualifying purchases made through affiliate links 
            on this site. This means that if you click an affiliate link and make a purchase from 
            a supplier, we may receive a small commission at no extra cost to you.
          </p>
          <p className="mt-1">
            Affiliate relationships do not influence our pricing data, supplier rankings, or the 
            order in which suppliers appear. Prices shown are live market prices, not artificially 
            adjusted. Our commitment is to provide unbiased, accurate comparison data regardless 
            of affiliate relationships.
          </p>
          <p className="mt-1">
            ViralPeps is a participant in affiliate programmes with various third-party suppliers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. Featured Placements</h2>
          <p>
            Some suppliers may pay for featured placement on ViralPeps. Featured suppliers are 
            clearly marked. A featured placement is not an endorsement or guarantee of product 
            quality, purity, or service. We encourage users to conduct their own due diligence 
            when selecting a supplier.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, ViralPeps and its operators shall 
            not be held liable for any direct, indirect, incidental, consequential, or special 
            damages arising from or in connection with:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your use of or reliance on information on this site</li>
            <li>Any purchases made through third-party suppliers listed on this site</li>
            <li>Any errors, omissions, or inaccuracies in pricing or product data</li>
            <li>Any interruptions or downtime of the website</li>
            <li>Any loss or damage resulting from the use of research compounds</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">9. Legal Compliance</h2>
          <p>
            Users are responsible for ensuring compliance with all applicable laws and regulations 
            in their jurisdiction regarding the purchase, possession, and use of research peptides. 
            The legal status of specific compounds varies by country and region.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">10. Changes to This Disclaimer</h2>
          <p>
            We may update this disclaimer from time to time. Material changes will be notified on 
            the site. Continued use of ViralPeps after changes constitutes acceptance of the 
            updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">11. Contact</h2>
          <p>
            If you have any questions about this disclaimer, please contact us at{" "}
            <a href="mailto:info@viralpeps.co.uk" className="text-blue-600 hover:underline">info@viralpeps.co.uk</a>.
          </p>
        </div>

      </section>
      <Footer />
    </div>
  );
}
