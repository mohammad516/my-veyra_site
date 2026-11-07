"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/posts";

const POSTS_PER_PAGE = 6;

const BlogGrid = ({ posts }: { posts: BlogPost[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("blog-posts")?.scrollIntoView({ behavior: "smooth" });
  };

  // Build page number items with ellipsis (e.g. 1, 2, ..., 5)
  const pageItems: (number | "ellipsis")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pageItems.push(i);
    } else if (pageItems[pageItems.length - 1] !== "ellipsis") {
      pageItems.push("ellipsis");
    }
  }

  return (
    <div id="blog-posts" className="scroll-mt-24">
      {/* Cards grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {currentPosts.map((post, index) => (
          <motion.article
            key={post._id ?? post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="group bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <Link href={`/${post.slug}`} className="flex flex-col flex-1">
            {/* Image with category badge */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={post.title}
                src={post.image}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full shadow-sm">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug mb-3 group-hover:text-blue-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>

              {/* Author meta */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-white dark:bg-neutral-700 ring-2 ring-neutral-100 dark:ring-neutral-600 flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    alt={post.author}
                    src={post.authorAvatar}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 text-sm">
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {post.author}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-600">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400">{post.date}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400">{post.readTime}</span>
                </div>
              </div>
            </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-14">
        {pageItems.map((item, i) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="text-neutral-400 font-semibold px-1">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => goToPage(item)}
              aria-label={`Go to page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={`h-12 w-12 rounded-full font-semibold transition-all duration-200 ${
                item === currentPage
                  ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white shadow-lg"
                  : "border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-blue-400 hover:text-blue-500"
              }`}
            >
              {item}
            </button>
          )
        )}

        {currentPage < totalPages && (
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="h-12 px-6 rounded-full border border-neutral-300 dark:border-neutral-600 font-semibold text-neutral-700 dark:text-neutral-300 hover:border-blue-400 hover:text-blue-500 transition-all duration-200 flex items-center gap-2"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
