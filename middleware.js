import { NextResponse } from "next/server";

export function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken");

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

  if (!refreshToken && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (refreshToken && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};