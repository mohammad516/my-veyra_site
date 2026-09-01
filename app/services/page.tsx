"use client";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import Services from "../components/sections/Services";
import WhatWeDo from "../components/sections/WhatWeDo";
import Process from "../components/sections/Process";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden">
      <NavBar />
      <div className="pt-24 min-h-[80vh]">
        <Services />
        <WhatWeDo />
        <Process />
      </div>
      <Footer />
    </main>
  );
}
