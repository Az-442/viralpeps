import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Research Summaries & Deep Dives",
  description: "In-depth research summaries on popular peptides. Learn about mechanisms, comparisons, and latest findings from verified sources.",
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
