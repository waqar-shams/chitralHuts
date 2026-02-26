import { NextResponse } from "next/server";

export function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken");

  // normalize paths - login can live under /auth/login
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/login" || pathname === "/auth/login";
  const isProtected = pathname.startsWith("/dashboard");

  if (!refreshToken && isProtected) {
    // no session - force to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (refreshToken && isLoginPage) {
    // already authenticated, bounce away from login route
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/login"],
};