import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Dosage Calculator (Free Tool)",
  description: "Free peptide dosage calculator for research purposes. Calculate the correct reconstitution dosage based on vial size, dosage amount, and bacteriostatic water volume.",
};

export default function DosageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
