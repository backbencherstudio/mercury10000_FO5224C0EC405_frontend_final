import { NextRequest, NextResponse } from "next/server";
import { getDashboardPathByRole, normalizeAppRole } from "./helper/auth.helper";

const AUTH_ROUTES = ["/log-in", "/login", "/sign-up", "/verify-email", "/verify-success", "/region"];
const ADMIN_PREFIX = "/dashboard";
const SECRETARY_PREFIX = "/secretary-dashboard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  const userType = request.cookies.get("userType")?.value;
  const resolvedRole = normalizeAppRole(userRole) ?? normalizeAppRole(userType);

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAdminRoute = pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
  const isSecretaryRoute =
    pathname === SECRETARY_PREFIX || pathname.startsWith(`${SECRETARY_PREFIX}/`);
  const isProtectedRoute = isAdminRoute || isSecretaryRoute;
  const isAuthenticated = Boolean(userCookie && resolvedRole);

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    const destination = getDashboardPathByRole(resolvedRole);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isAuthenticated && isAdminRoute && resolvedRole !== "admin") {
    return NextResponse.redirect(new URL(SECRETARY_PREFIX, request.url));
  }

  if (isAuthenticated && isSecretaryRoute && resolvedRole !== "secretary") {
    return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/secretary-dashboard/:path*", "/log-in", "/login", "/sign-up", "/verify-email", "/verify-success", "/region"],
};
