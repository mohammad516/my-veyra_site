import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Admin API only exists where ADMIN_ENABLED=true (local CMS)
  if (process.env.ADMIN_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const { password } = await request.json();

    if (!verifyPassword(password ?? "")) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, adminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
