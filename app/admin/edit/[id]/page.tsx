import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import PostForm from "../../PostForm";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Edit: {post.title}</h1>
        <PostForm post={post} />
      </div>
    </main>
  );
}
