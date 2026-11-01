"use client";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center min-h-[80vh] relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-neutral-900 dark:text-white">About Us</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mt-4">
          Coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
