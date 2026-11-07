import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";

// Posts live in MongoDB, so the sitemap is built per request
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Keep the static URLs available even if the database is unreachable
  }

  const latestPostUpdate = posts
    .map((p) => p.updatedAt ?? p.createdAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop();

  // /about is a "coming soon" placeholder set to noindex, so it is left out
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: post.updatedAt ?? post.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}


