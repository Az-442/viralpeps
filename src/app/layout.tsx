import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LeadMagnetPopup from "@/components/LeadMagnetPopup";
import BestOffersBanner from "@/components/BestOffersBanner";

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
    default: "UK Peptide Price Comparison | ViralPeps",
    template: "%s | ViralPeps",
  },
  description: "The UK's most comprehensive research peptide directory. Compare 37+ compounds, verified vendors, prices and purity specs. Free tools and research guides.",
  keywords: ["research peptides UK", "peptide directory", "buy peptides UK", "Tirzepatide UK", "Semaglutide UK", "BPC-157", "peptide vendors UK", "research compounds UK"],
  metadataBase: new URL("https://www.viralpeps.co.uk"),
  openGraph: {
    title: "ViralPeps — UK Research Peptide Directory",
    description: "The UK's most comprehensive research peptide directory. Compare 37+ compounds, verified vendors, prices and purity specs. Free tools and research guides.",
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
    description: "The UK's most comprehensive research peptide directory. Compare 37+ compounds, verified vendors, prices and purity specs. Free tools and research guides.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-48x48.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.viralpeps.co.uk/#website",
        "name": "ViralPeps",
        "url": "https://www.viralpeps.co.uk",
        "description": "UK research peptide directory and vendor comparison platform.",
        "inLanguage": "en-GB",
      },
      {
        "@type": "Organization",
        "@id": "https://www.viralpeps.co.uk/#organization",
        "name": "ViralPeps",
        "url": "https://www.viralpeps.co.uk",
        "description": "UK research peptide price comparison directory.",
        "inLanguage": "en-GB",
      },
    ],
  };

  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCW568W4');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCW568W4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <BestOffersBanner />
        {children}
        <LeadMagnetPopup />
      </body>
    </html>
  );
}
