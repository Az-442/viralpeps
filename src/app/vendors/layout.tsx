import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare UK Peptide Suppliers & Vendors",
  description: "Compare verified UK research peptide suppliers side by side. View ratings, product ranges, prices, and shipping policies.",
};

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
