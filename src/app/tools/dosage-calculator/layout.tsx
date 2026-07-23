import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Dosage Calculator (Free Tool) | ViralPeps",
  description: "Instantly calculate peptide reconstitution and dosing volumes. Free, easy-to-use calculator built for UK research peptide users.",
};

export default function DosageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
