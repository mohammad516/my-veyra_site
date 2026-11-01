import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import FaqAccordion from "../blog/components/FaqAccordion";
import { blogPosts, defaultFaqs } from "../blog/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render all blog post slugs at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden flex flex-col">
      <NavBar />

      {/* Hero image - full bleed with overlay content */}
      <div className="relative w-full aspect-[1023/1162] md:aspect-auto md:h-[75vh] overflow-hidden">
        {/* Mobile hero image */}
        <Image
          alt={post.title}
          className="object-cover md:hidden"
          src="/blog-main1.jpeg"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Desktop hero image */}
        <Image
          alt={post.title}
          className="hidden md:block object-cover"
          src="/blog-main.png"
          fill
          priority
          sizes="100vw"
          quality={85}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-lg max-w-4xl">
            {post.title}
          </h1>

          {/* Breadcrumb pill */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-blue-500 bg-black/40 backdrop-blur-sm px-6 py-3 text-sm sm:text-base font-semibold text-white">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Veyra
            </Link>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent font-black">
              ✦
            </span>
            <span className="text-neutral-200">{post.title}</span>
          </div>
        </div>

        {/* Colorful gradient line at the bottom of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
      </div>

      <article className="flex-1 w-full max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        {/* Post title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-8 lg:mb-12">
          {post.title}
        </h2>

        {/* Featured image */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg mb-10 lg:mb-14">
          <Image
            alt={post.title}
            src={post.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
            className="object-cover"
          />
        </div>

        {/* Introduction */}
        <div className="space-y-5 lg:space-y-6 mb-12 lg:mb-16">
          <p className="text-xs lg:text-sm font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
            Introduction
          </p>
          {post.intro.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Sections */}
        {post.sections.map((section, i) => (
          <div key={i}>
            {/* Second large image after the second section */}
            {i === 2 && (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg mb-12 lg:mb-16">
                <Image
                  alt={post.title}
                  src={post.image2}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                  className="object-cover"
                />
              </div>
            )}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-6 lg:mb-8">
              {section.heading}
            </h3>

            {section.paragraphs?.map((paragraph, j) => (
              <p key={j} className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 lg:mb-6">
                {paragraph}
              </p>
            ))}

            {section.numbered && (
              <ol className="space-y-4 lg:space-y-5 mb-6">
                {section.numbered.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="flex-shrink-0 h-7 w-7 lg:h-9 lg:w-9 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white text-sm lg:text-base font-bold flex items-center justify-center">
                      {j + 1}
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            {section.bullets && (
              <ul className="space-y-4 lg:space-y-5 mb-6">
                {section.bullets.map((item, j) => (
                  <li key={j} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 mt-2.5 lg:mt-3 h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <span className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {section.checklist && (
              <ul className="space-y-4 lg:space-y-5 mb-6">
                {section.checklist.map((item, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 h-6 w-6 lg:h-7 lg:w-7 rounded-md bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                      <Check className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={3} />
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {section.image && (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg my-8 lg:my-10">
                <Image
                  alt={section.heading}
                  src={section.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
          </div>
        ))}

        {/* Final thoughts */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-6 lg:mb-8">
            Final Thoughts
          </h3>
          {post.finalThoughts.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5 lg:mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-6 lg:mb-10">
            Frequently Asked Questions
          </h3>
          <FaqAccordion faqs={post.faqs ?? defaultFaqs} />
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-8 lg:p-12 text-center">
          <p className="text-lg lg:text-2xl font-semibold mb-2">Need a website that works?</p>
          <p className="text-neutral-500 dark:text-neutral-400 lg:text-lg mb-6 lg:mb-8">
            Contact Veyra for a free consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white font-semibold px-8 py-3 lg:px-10 lg:py-4 lg:text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Contact Us
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

