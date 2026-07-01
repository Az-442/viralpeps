import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Disclaimer — ViralPeps UK",
  description: "ViralPeps disclaimer — important information about our role as a price comparison directory.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Disclaimer</h1>
          <p className="text-gray-300 text-sm">Last updated: 1 July 2026</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-sm text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Not a Seller</h2>
          <p>ViralPeps is a price comparison directory only. We do not manufacture, sell, or distribute any peptides or research chemicals. We do not handle payments, process orders, or ship products.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Research Use Only</h2>
          <p>The compounds listed on ViralPeps are intended for in-vitro research purposes only. They are not for human or veterinary consumption. Always consult relevant regulations and guidelines before purchasing.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Accuracy of Information</h2>
          <p>Prices and product information are checked daily but may change between updates. We recommend verifying prices directly with suppliers before making any purchase decisions.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Third-Party Links</h2>
          <p>ViralPeps links to third-party supplier websites. We are not responsible for the content, accuracy, or practices of these sites. Use them at your own discretion.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">No Liability</h2>
          <p>ViralPeps shall not be held liable for any loss, damage, or inconvenience arising from the use of this website or from purchases made through listed suppliers.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
