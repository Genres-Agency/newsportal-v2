import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./route";

export async function middleware(req: NextRequest) {
  console.log("Request URL:", req.url);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // console.log("token======>", token);
  const isAuthenticated = !!token;
  const userRole = token?.role;

  const { nextUrl } = req;
  const isPublicRoute = publicRoutes.some((route) => {
    // Convert route pattern to regex
    const pattern = route
      .replace(/\[.*?\]/g, "[^/]+")
      .replace(/\*/g, ".*")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(nextUrl.pathname);
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (userRole === "BANNED") {
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
