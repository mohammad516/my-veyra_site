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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Veyra",
    url: "https://veyra.website",
    logo: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117640/log_ctyaz9.png", 
    sameAs: [
      "https://www.facebook.com/profile.php?id=61579729479913",
      "https://www.instagram.com/veyra.web/",
      "https://www.tiktok.com/@veyra2211?_t=ZS-8zj371LZP1O&_r=1",
      "https://www.linkedin.com/company/veyraweb/"
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Veyra",
    url: "https://veyra.website",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Veyra",
    url: "https://veyra.website",
    logo: "https://res.cloudinary.com/dp0wyn4dg/image/upload/f_auto,q_auto/v1762117640/log_ctyaz9.png",
    areaServed: {
      "@type": "City",
      name: "Beirut",
      addressCountry: "LB",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
