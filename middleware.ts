import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "veyra_admin";

// The admin panel and its APIs exist only where ADMIN_ENABLED=true (the local
// CMS). In production the variable is simply not set, and every admin route
// answers 404 so the public site exposes no admin surface at all.
const ADMIN_ENABLED = process.env.ADMIN_ENABLED === "true";

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

  // Admin disabled (production): hide the admin API surface entirely.
  // /admin pages are handled by app/admin/layout.tsx, which renders a 404.
  if (!ADMIN_ENABLED) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.next();
  }

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
  matcher: [
    "/admin/:path*",
    "/admin",
    "/api/admin/:path*",
    "/api/posts/:path*",
    "/api/upload",
  ],
};
