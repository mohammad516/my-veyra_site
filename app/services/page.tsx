import type { Metadata } from "next";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import Services from "../components/sections/Services";
import WhatWeDo from "../components/sections/WhatWeDo";
import Process from "../components/sections/Process";
import JsonLd from "../components/seo/JsonLd";
import { DEFAULT_OG_IMAGE, breadcrumbJsonLd, servicesJsonLd } from "@/lib/seo";

const TITLE = "Web Development, Web Design & SEO Services in Beirut, Lebanon";
const DESCRIPTION =
  "Veyra's services in Beirut, Lebanon: website development, web design, digital marketing, SEO, hosting, domains, maintenance and mobile app development.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: `${TITLE} | Veyra`, description: DESCRIPTION, url: "/services", images: [DEFAULT_OG_IMAGE] },
  twitter: { title: `${TITLE} | Veyra`, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden">
      <NavBar />
      <JsonLd
        data={[
          servicesJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <div className="pt-24 min-h-[80vh]">
        <Services headingAs="h1" />
        <WhatWeDo />
        <Process />
      </div>
      <Footer />
    </main>
  );
}
