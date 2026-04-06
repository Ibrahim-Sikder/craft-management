/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log("Middleware - Path:", pathname);
  console.log("Middleware - Has token:", !!accessToken);

  // Allow public routes
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to home if no token
  if (!accessToken) {
    console.log("No token, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Decode token
  try {
    const decoded = jwtDecode(accessToken);
    console.log("Decoded token:", decoded);

    // Check role-based access
    const role = (decoded as any)?.role;
    const allowedRoutes: Record<string, RegExp[]> = {
      admin: [/^\/dashboard(\/.*)?$/],
      teacher: [/^\/dashboard(\/.*)?$/],
      super_admin: [/^\/dashboard(\/.*)?$/],
    };

    if (allowedRoutes[role]?.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }

    // Role doesn't have access
    console.log(`Role ${role} doesn't have access to ${pathname}`);
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|img).*)"],
};
