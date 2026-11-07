import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <p className="text-neutral-400 text-sm mt-1">
              {posts.length} post{posts.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-5 py-2.5 font-semibold text-sm"
            >
              + New Post
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-xl p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="h-16 w-24 object-cover rounded-lg shrink-0 bg-neutral-800"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold truncate">{post.title}</h2>
                <p className="text-neutral-400 text-sm truncate">
                  /blog/{post.slug} · {post.category} · {post.date}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:border-neutral-500"
                >
                  View
                </Link>
                <Link
                  href={`/admin/edit/${post._id}`}
                  className="rounded-lg border border-blue-700 px-3 py-1.5 text-sm text-blue-400 hover:border-blue-500"
                >
                  Edit
                </Link>
                <DeleteButton id={post._id!} title={post.title} />
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-neutral-500 text-center py-16">
              No posts yet. Click &quot;+ New Post&quot; to create your first one.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
