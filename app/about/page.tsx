import type { Metadata } from "next";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import AboutHero from "../components/sections/AboutHero";

// Keep out of search indexes until the About page has full content
export const metadata: Metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden flex flex-col">
      <NavBar />
      <AboutHero />
      <Footer />
    </main>
  );
}
