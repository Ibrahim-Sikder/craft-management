/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AuthRoutes = ["/", "/login", "/register"]; // Add all public routes here

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard(\/.*)?$/],
  teacher: [/^\/dashboard(\/.*)?$/],
  super_admin: [/^\/dashboard(\/.*)?$/],
  accountant: [/^\/dashboard(\/.*)?$/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value ?? null;

  // If user is on a public route (like home page), allow access regardless of token
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, check if token exists
  if (!accessToken) {
    // Redirect to home page if no token
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Token exists, try to decode it
  let decodedData = null;
  try {
    decodedData = jwtDecode(accessToken) as any;
  } catch (error: any) {
    // Invalid token - redirect to home
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = decodedData?.role as Role;

  // Check if the route is allowed for this role
  if (role && roleBasedPrivateRoutes[role]) {
    const routes = roleBasedPrivateRoutes[role];
    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  // If role doesn't have permission for this route, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|img).*)"],
};
