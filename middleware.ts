import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./route";
import { hasRouteAccess } from "./config/route-access";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as UserRole | undefined;

  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.some((route) => {
    const pattern = route
      .replace(/\[.*?\]/g, "[^/]+")
      .replace(/\*/g, ".*")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(nextUrl.pathname);
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (userRole === UserRole.BANNED) {
    return NextResponse.redirect(new URL("/banned", nextUrl));
  }

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    // Check role-based access for dashboard routes
    if (!hasRouteAccess(nextUrl.pathname, userRole)) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Allow authenticated users to stay on home page
  if (nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
