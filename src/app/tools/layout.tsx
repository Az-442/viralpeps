import type { Metadata } from "next";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Peptide Dosage & Cycle Calculators",
  description: "Free online peptide dosage calculator and cycle planner tools. Calculate reconstitution doses, plan research cycles, and more.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {children}
      <Footer />
    </div>
  );
}
