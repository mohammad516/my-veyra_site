import type { Metadata } from "next";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import Section from "../../components/ui/Section";
import BlogGrid from "./components/BlogGrid";
import BlogHero from "./components/BlogHero";
import JsonLd from "../components/seo/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { ORG_ID, WEBSITE_ID, DEFAULT_OG_IMAGE, absoluteUrl, breadcrumbJsonLd, personId, postPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

const TITLE = "Blog: Web Development, Web Design & SEO Insights from Lebanon";
const DESCRIPTION =
  "Guides and insights from Veyra on website development, web design, SEO, AEO and GEO for businesses in Lebanon and worldwide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: `${TITLE} | Veyra`, description: DESCRIPTION, url: "/blog", images: [DEFAULT_OG_IMAGE] },
  twitter: { title: `${TITLE} | Veyra`, description: DESCRIPTION, images: [DEFAULT_OG_IMAGE.url] },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Veyra Blog",
    url: absoluteUrl("/blog"),
    description: DESCRIPTION,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(postPath(post.slug)),
      description: post.excerpt,
      image: post.image,
      datePublished: post.createdAt,
      dateModified: post.updatedAt ?? post.createdAt,
      author: { "@type": "Person", "@id": personId(post.author), name: post.author },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white relative overflow-x-hidden flex flex-col">
      <NavBar />
      <JsonLd
        data={[
          blogJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <BlogHero />

      {/* Blog cards + pagination */}
      <Section className="pb-24">
        <BlogGrid posts={posts} />
      </Section>

      <Footer />
    </main>
  );
}
