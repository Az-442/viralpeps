import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All UK Peptide Prices A-Z",
  description: "Browse and compare prices for all research peptides from verified UK suppliers. Filter by category, price, and supplier rating.",
};

export default function CompoundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
