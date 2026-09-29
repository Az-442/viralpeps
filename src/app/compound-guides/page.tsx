import type { Metadata } from "next";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BreadcrumbList from "@/components/BreadcrumbList";
import SiloTiles from "@/components/SiloTiles";
import { SILOS } from "@/data/silos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Peptide Buying Guides UK: Price Comparison & Supplier Research",
  description:
    "Peptide buying guides for UK researchers — where to buy, cheapest price per mg, full supplier price comparisons, ordering help and TrustScore rankings.",
  alternates: { canonical: "https://www.viralpeps.co.uk/compound-guides" },
};

export default function CompoundGuidesIndex() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />

      <BreadcrumbList items={[{ label: "Home", href: "/" }, { label: "Compound Guides" }]} />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#162d50] to-[#0f1f38] text-white">
        <div className="max-w-[76rem] mx-auto px-4 py-10 md:py-14">
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest">
            Buying Guides
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 mt-4">
            Peptide Buying Guides UK
          </h1>
          <p className="text-blue-200 text-sm md:text-base max-w-3xl leading-relaxed">
            Independent, data-driven buying guides across the compounds we track. Each guide compares live
            UK supplier prices, pack sizes and verification signals — refreshed weekly from suppliers'
            own listing pages.
          </p>
        </div>
      </section>

      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-[76rem] mx-auto px-4 py-2.5 text-center">
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            For educational and research reference only. Not medical advice. All peptides referenced are
            for in-vitro research use only and are not for human consumption.
          </p>
        </div>
      </div>

      <main className="max-w-[76rem] mx-auto px-4 py-12">
        {SILOS.map((silo) => (
          <section key={silo.compoundSlug} className="mb-14 last:mb-0">
            <SiloTiles silo={silo} />
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
