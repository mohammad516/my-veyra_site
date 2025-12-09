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
    default: "Veyra — Web Development Agency Beirut Lebanon",
    template: "%s | Veyra"
  },
  description:
    "Veyra a web development agency based in Beirut building fast, secure, and SEO-optimized websites for clients in Lebanon and worldwide. We combine strategy, design, and engineering to deliver high-performance digital experiences.",
  keywords: [
    "web development Lebanon",
    "web development Beirut",
    "website design Lebanon",
    "web agency Lebanon",
    "remote web developers",
    "SEO optimized websites",
    "custom website development",
    "modern web design"
  ],
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
    title: "Veyra — Web Development Agency Beirut Lebanon",
    description:
      "Veyra builds high-performance, SEO-ready websites for brands in Lebanon and around the world. Strategy, design, and engineering combined into one seamless service.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Veyra — Web Development Agency Beirut Lebanon",
    description:
      "High-performance, SEO-ready websites crafted by a Beirut-based web development agency working with clients worldwide.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    },
  },

  verification: {
    // google: "your-code-here"
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
