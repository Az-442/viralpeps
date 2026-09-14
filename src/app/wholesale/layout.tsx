import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Wholesale UK — Bulk Supplier Directory & B2B",
  description:
    "Invite-only UK peptide wholesale marketplace. Vetted suppliers list bulk research peptide stock for approved labs and facilities. Apply to list your business.",
  alternates: {
    canonical: "https://www.viralpeps.co.uk/wholesale",
  },
  openGraph: {
    title: "Peptide Wholesale UK — Bulk Supplier Directory | ViralPeps",
    description:
      "Invite-only B2B wholesale marketplace for bulk research peptides. Vetted suppliers, verified stock, approved buyers only.",
    url: "https://www.viralpeps.co.uk/wholesale",
    siteName: "ViralPeps",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ViralPeps — Peptide Wholesale UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Wholesale UK — Bulk Supplier Directory | ViralPeps",
    description:
      "Invite-only B2B wholesale marketplace for bulk research peptides. Vetted suppliers, verified stock, approved buyers only.",
  },
};

export default function WholesaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
