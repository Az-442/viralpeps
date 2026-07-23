import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare UK Peptide Suppliers & Vendors",
  description: "Compare 40+ UK research peptide suppliers by rating, pricing and independent purity testing, all verified and reviewed by ViralPeps.",
};

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
