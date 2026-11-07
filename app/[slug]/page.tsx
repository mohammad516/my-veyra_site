import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getPostByPreviousSlug, getPostBySlug } from "@/lib/posts";
import { postPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface LegacyPostPageProps {
  params: Promise<{ slug: string }>;
}

// Posts used to live at /{slug}. They now live under /blog/{slug}; this route
// only keeps the old URLs working with a permanent redirect.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function LegacyPostRedirect({ params }: LegacyPostPageProps) {
  const { slug } = await params;

  const post = (await getPostBySlug(slug)) ?? (await getPostByPreviousSlug(slug));
  if (post) permanentRedirect(postPath(post.slug));

  notFound();
}
