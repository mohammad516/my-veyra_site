import { notFound } from "next/navigation";

// The About page is disabled: every request to /about returns 404
export default function AboutPage() {
  notFound();
}
