import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Business | ViralPeps",
  description: "Are you a UK research peptide supplier? Register your business to be listed, verified and compared on ViralPeps.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
