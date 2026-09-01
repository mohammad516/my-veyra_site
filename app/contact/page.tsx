"use client";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden">
      <NavBar />
      <div className="pt-24 min-h-[80vh]">
        <About />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
