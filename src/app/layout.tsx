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
  title: "ViralPeps — UK Research Peptide Directory & Vendor Comparison",
  description: "The UK's most comprehensive research peptide directory. Browse 22+ compounds including Tirzepatide, Semaglutide, BPC-157, and more. Compare verified UK and international vendors, prices, and purity specs. Free peptide tools and research guides.",
  keywords: ["research peptides UK", "peptide directory", "buy peptides UK", "Tirzepatide UK", "Semaglutide UK", "BPC-157", "peptide vendors", "research compounds"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
