import type { Metadata } from "next";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Peptide Dosage & Cycle Calculators",
  description: "Free research tools for UK peptide users: dosage calculator, reconstitution calculator and cycle planner. No sign-up required.",
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
