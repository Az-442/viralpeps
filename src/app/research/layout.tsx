import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Research Summaries & Deep Dives",
  description: "In-depth research summaries on popular peptides - mechanism of action, half-life, storage and evidence, written for UK researchers.",
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
