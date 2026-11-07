import { getAllPosts } from "@/lib/posts";
import { SITE_EMAIL, SITE_PHONE, SITE_SERVICES, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

// llms.txt: a plain-text map of the site for AI assistants and answer engines
export async function GET() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Serve the static sections if the database is unreachable
  }

  const lines = [
    "# Veyra",
    "",
    "> Veyra is a web development and digital marketing agency in Beirut, Lebanon. It builds websites, online stores, mobile apps and SEO, AEO and GEO strategies for businesses in Lebanon and worldwide.",
    "",
    "## Services",
    "",
    ...SITE_SERVICES.map((s) => `- ${s.name}: ${s.description}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}): Overview of Veyra and its services`,
    `- [Services](${SITE_URL}/services): Everything Veyra offers`,
    `- [Blog](${SITE_URL}/blog): Guides on web development, web design and SEO`,
    `- [Contact](${SITE_URL}/contact): Get in touch for a free consultation`,
    "",
    "## Blog posts",
    "",
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/${p.slug}): ${p.excerpt}`),
    "",
    "## Contact",
    "",
    `- Email: ${SITE_EMAIL}`,
    `- Phone / WhatsApp: ${SITE_PHONE}`,
    "- Location: Beirut, Lebanon",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
