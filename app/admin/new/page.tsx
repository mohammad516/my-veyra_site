import PostForm from "../PostForm";

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">New Blog Post</h1>
        <PostForm />
      </div>
    </main>
  );
}
