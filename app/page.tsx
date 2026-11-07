import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Web Development Agency in Beirut, Lebanon | Veyra";
const DESCRIPTION =
  "Veyra is a web development agency in Beirut, Lebanon. We build fast, secure websites, mobile apps and SEO, AEO and GEO strategies for businesses worldwide.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/", images: [DEFAULT_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

export default function HomePage() {
  return <HomeClient />;
}
