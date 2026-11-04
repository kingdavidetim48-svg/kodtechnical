import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { COMPANY_INFO } from "@/lib/constants";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL =
  process.env.SITE_URL ||
  (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://kodtechnical.vercel.app");

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_INFO.name} — Rotating Equipment & Oilfield Engineering Nigeria`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description:
    "Indigenous engineering and oilfield servicing firm in Port Harcourt, Nigeria. Specializing in precision laser alignment, rotating machinery overhauls, dynamic balancing, machine shop services, and technical procurement.",
  keywords: [
    "KOD Technical Services",
    "Oil and gas engineering services Nigeria",
    "Rotating equipment maintenance Nigeria",
    "Industrial pump maintenance Port Harcourt",
    "Laser shaft alignment Rivers State",
    "Machine shop Port Harcourt",
    "API 610 centrifugal pump overhaul",
    "Dynamic balancing Nigeria",
    "Gas compressor maintenance Nigeria",
    "Condition monitoring vibration analysis",
    "Industrial equipment installation Nigeria",
  ],
  authors: [{ name: COMPANY_INFO.name, url: SITE_URL }],
  creator: COMPANY_INFO.name,
  publisher: COMPANY_INFO.name,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} — Rotating Equipment & Oilfield Engineering`,
    description:
      "Precision engineering and maintenance services for industrial pumps, gas compressors, and heavy rotating machinery across Nigeria.",
    images: [
      {
        url: "/images/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_INFO.name} — Rotating Equipment & Oilfield Engineering, Port Harcourt, Nigeria`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} — Rotating Equipment & Oilfield Engineering`,
    description:
      "Precision laser alignment, rotating machinery overhaul, dynamic balancing, and machine shop servicing in Port Harcourt, Nigeria.",
    images: ["/images/brand/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/brand/kod-logo-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/kod-logo-thumb.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/images/brand/kod-logo-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-navy-void text-industrial-platinum selection:bg-amber-primary selection:text-navy-void antialiased">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
