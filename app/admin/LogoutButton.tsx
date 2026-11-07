"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 hover:border-neutral-500"
    >
      Log out
    </button>
  );
}
