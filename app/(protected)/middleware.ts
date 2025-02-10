import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (session) {
    const userRole = session.user.role; // Assuming the role is stored in the session

    if (userRole === "BANNED") {
      // Redirect to a banned page
      return NextResponse.redirect(new URL("/banned", req.url));
    }
  } else {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to the protected routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
