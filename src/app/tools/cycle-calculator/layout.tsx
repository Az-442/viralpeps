import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Cycle Calculator (Free Tool) | ViralPeps",
  description: "Plan a research peptide cycle in seconds. Enter compound, dose and duration for an instant, easy-to-follow schedule.",
};

export default function CycleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
