import type { Metadata } from "next";

// The CMS is private: keep every admin route out of search indexes
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
