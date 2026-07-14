import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware bảo vệ routes
 * - Public routes: /, /sign-in, /sign-up, /api/auth/*
 * - Protected routes: /dashboard/*, /profile/*, ...
 */

const PUBLIC_ROUTES = [
  "/",
  "/sign-in",
  "/sign-up",
];

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cho phép tất cả API auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Kiểm tra session bằng cách fetch nội bộ (Edge-safe)
  let session = null;
  try {
    const origin = request.nextUrl.origin;
    const res = await fetch(`${origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    if (res.ok) {
      session = await res.json();
    }
  } catch (error) {
    console.error("Lỗi xác thực session trong middleware:", error);
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // Redirect user đã đăng nhập ra khỏi auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect user chưa đăng nhập về sign-in nếu vào protected route
  if (!session && !isPublicRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả request paths ngoại trừ:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, fonts, ...)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
