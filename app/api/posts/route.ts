import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPosts, slugExists } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title || !data.slug || !data.image) {
      return NextResponse.json(
        { error: "Title, slug and main image are required" },
        { status: 400 }
      );
    }

    if (await slugExists(data.slug)) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const post = await createPost(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
