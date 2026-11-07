"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(searchParams.get("from") || "/admin");
      router.refresh();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Veyra Admin</h1>
          <p className="text-neutral-400 text-sm mt-1">Sign in to manage blog posts</p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            autoFocus
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 py-2.5 font-semibold disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

// useSearchParams needs a Suspense boundary for the page to prerender
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
