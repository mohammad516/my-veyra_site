import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import JsonLd from "./components/seo/JsonLd";
import { SITE_NAME, SITE_URL, siteGraphJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Veyra | Web Development, Web Design & SEO Agency in Beirut, Lebanon";
const DEFAULT_DESCRIPTION =
  "Veyra is a web development agency in Beirut, Lebanon, building fast, secure websites, mobile apps and SEO strategies for businesses in Lebanon and worldwide.";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Veyra",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Veyra",
    "Veyra Lebanon",
    "Veyra Web Development",
    "Veyra Agency",
    "web development Lebanon",
    "web design Beirut",
    "SEO agency Lebanon",
    "e-commerce development Lebanon",
    "mobile app development Lebanon",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",

  // Canonicals are set per page; a site-wide canonical here would be inherited by every route
  metadataBase: new URL(SITE_URL),

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
      >
        <JsonLd data={siteGraphJsonLd()} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
