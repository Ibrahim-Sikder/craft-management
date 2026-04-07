/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // Allow public routes
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decoded = jwtDecode(accessToken);
    const role = (decoded as any)?.role;

    const allowedRoutes: Record<string, RegExp[]> = {
      super_admin: [/^\/dashboard(\/.*)?$/],
      admin: [/^\/dashboard(\/.*)?$/],
      teacher: [/^\/dashboard(\/.*)?$/],
      accountant: [/^\/dashboard(\/.*)?$/],
      student: [/^\/dashboard(\/.*)?$/],
      class_teacher: [/^\/dashboard(\/.*)?$/],
      super_visor: [/^\/dashboard(\/.*)?$/],
    };

    // Check if the role has access to the requested route
    if (allowedRoutes[role]?.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|img).*)"],
};
