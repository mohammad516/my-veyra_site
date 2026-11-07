import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "veyra_admin";

// Edge Runtime has no node:crypto — use the Web Crypto API instead
async function expectedToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD || "veyra-admin-2026";
  const data = new TextEncoder().encode(`veyra-admin:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page and login API must stay reachable
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authed = token === (await expectedToken());

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (!authed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect mutating API routes (GET stays public so the blog can read posts)
  if (
    (pathname.startsWith("/api/posts") || pathname.startsWith("/api/upload")) &&
    request.method !== "GET"
  ) {
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/posts/:path*", "/api/upload"],
};
