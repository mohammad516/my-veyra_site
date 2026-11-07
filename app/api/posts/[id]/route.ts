import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById, slugExists, updatePost } from "@/lib/posts";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (data.slug && (await slugExists(data.slug, id))) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const updated = await updatePost(id, data);
    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const post = await getPostById(id);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
