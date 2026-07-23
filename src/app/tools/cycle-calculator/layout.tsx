import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Cycle Calculator (Free Tool) | ViralPeps",
  description: "Free peptide cycle calculator for research planning. Map out research timelines, dosages, and protocols.",
};

export default function CycleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
