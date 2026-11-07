import type { Metadata } from "next";
import { notFound } from "next/navigation";

// The CMS is private: keep every admin route out of search indexes
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Runtime check per request, not at build time
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // The admin panel only exists where ADMIN_ENABLED=true (local CMS).
  // On the deployed site every /admin route renders the 404 page.
  if (process.env.ADMIN_ENABLED !== "true") notFound();
  return children;
}
