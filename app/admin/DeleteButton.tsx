"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete the post");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg border border-red-800 px-3 py-1.5 text-sm text-red-400 hover:border-red-500 disabled:opacity-50"
    >
      {deleting ? "..." : "Delete"}
    </button>
  );
}
