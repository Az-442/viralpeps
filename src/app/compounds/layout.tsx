import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All UK Peptide Prices A-Z",
  description: "Browse and compare every research peptide we track, sorted cheapest first. Filter by compound, purity and verified UK supplier.",
};

export default function CompoundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
