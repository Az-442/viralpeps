import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import VerifiedPackageForm from "@/components/VerifiedPackageForm";

export const metadata = {
  title: "Verified Package Agreement — ViralPeps",
  description:
    "Sign the ViralPeps TrustScore Verified Package agreement online. £50/month by Direct Debit or £60/month by bank transfer. No printing required.",
};

export default function VerifiedPackagePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-[820px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Verified Package Agreement
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Terms &amp; Conditions · Version 1.0 — sign online, no printing required.
          </p>
        </div>
      </section>

      <VerifiedPackageForm />

      <Footer />
    </div>
  );
}
