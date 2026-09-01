"use client";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Blog</h1>
        <p className="text-lg text-neutral-500 max-w-2xl">
          Insights, thoughts, and industry updates from the Veyra team. Coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
