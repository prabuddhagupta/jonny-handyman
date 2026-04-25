import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { site } from "@/site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.brandName} — ${site.tagline}`,
    template: `%s · ${site.brandName}`,
  },
  description: `Honest home repairs and small remodels in ${site.primaryCity} and the surrounding areas. Licensed, insured, and quick to respond on WhatsApp.`,
  openGraph: {
    title: `${site.brandName} — ${site.tagline}`,
    description: `Honest home repairs in ${site.primaryCity} and surrounding areas.`,
    url: `https://${site.domain}`,
    siteName: site.brandName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} — ${site.tagline}`,
    description: `Honest home repairs in ${site.primaryCity} and surrounding areas.`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white text-[var(--color-ink)]"
        suppressHydrationWarning
      >
        <LocalBusinessSchema />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
