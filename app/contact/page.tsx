import type { Metadata } from "next";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import About from "../components/sections/About";
import ContactInfo from "../components/sections/ContactInfo";
import Contact from "../components/sections/Contact";
import JsonLd from "../components/seo/JsonLd";
import {
  BUSINESS_ID,
  DEFAULT_OG_IMAGE,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";

const TITLE = "Contact Veyra | Web Development Agency in Beirut, Lebanon";
const DESCRIPTION =
  "Contact Veyra in Beirut, Lebanon for a free consultation on websites, mobile apps, SEO and digital marketing. Email info@veyra.website or message us on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact", images: [DEFAULT_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  url: absoluteUrl("/contact"),
  description: DESCRIPTION,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden">
      <NavBar />
      <JsonLd
        data={[
          contactJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <div className="pt-24 min-h-[80vh]">
        <About />
        <ContactInfo />
        <Contact headingAs="h1" />
      </div>
      <Footer />
    </main>
  );
}
