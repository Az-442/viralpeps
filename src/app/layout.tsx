import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ViralPeps — UK Research Peptide Directory & Vendor Comparison",
    template: "%s | ViralPeps UK",
  },
  description: "The UK's most comprehensive research peptide directory. Browse 37+ compounds including Tirzepatide, Semaglutide, BPC-157, and more. Compare verified UK vendors, prices, and purity specs. Free peptide tools and research guides.",
  keywords: ["research peptides UK", "peptide directory", "buy peptides UK", "Tirzepatide UK", "Semaglutide UK", "BPC-157", "peptide vendors UK", "research compounds UK"],
  metadataBase: new URL("https://www.viralpeps.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ViralPeps — UK Research Peptide Directory",
    description: "The UK's most comprehensive research peptide directory. Browse compounds, compare verified UK vendors, and find the information you need.",
    url: "https://www.viralpeps.co.uk",
    siteName: "ViralPeps",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ViralPeps — UK Research Peptide Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralPeps — UK Research Peptide Directory",
    description: "Browse 37+ research compounds, compare verified UK vendors, prices and purity specs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ViralPeps",
    "url": "https://www.viralpeps.co.uk",
    "description": "UK research peptide directory and vendor comparison platform.",
    "inLanguage": "en-GB",
  };

  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
