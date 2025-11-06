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
    default: "Veyra - Crafting High-Impact Websites",
    template: "%s | Veyra"
  },
  description: "Veyra is a modern platform offering amazing features and services for users worldwide. We blend strategy, design, and engineering to launch fast, responsive, SEO-ready sites.",
  keywords: ["web development", "website design", "SEO", "responsive design", "modern websites", "Veyra"],
  authors: [{ name: "Veyra" }],
  creator: "Veyra",
  publisher: "Veyra",
  metadataBase: new URL("https://veyra.website"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veyra.website",
    siteName: "Veyra",
    title: "Veyra - Crafting High-Impact Websites",
    description: "Veyra is a modern platform offering amazing features and services for users worldwide. We blend strategy, design, and engineering to launch fast, responsive, SEO-ready sites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra - Crafting High-Impact Websites",
    description: "Veyra is a modern platform offering amazing features and services for users worldwide.",
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
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-verification-code",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
