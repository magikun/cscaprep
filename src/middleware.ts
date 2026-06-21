import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/tests", "/materials", "/profile", "/progress"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path requires auth
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected) {
    // Check for Supabase session cookie
    const hasSession = request.cookies.has("sb-access-token") ||
      request.cookies.getAll().some((c) => c.name.includes("auth-token"));

    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
