import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Agreement — Veyra",
  description:
    "Professional Service Agreement for Veyra web development and software services.",
  robots: { index: false, follow: false },
};

export default function ContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
