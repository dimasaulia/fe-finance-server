import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/routes.config";
import { SESSION_COOKIE_NAME } from "@/modules/auth/services/session.service";

const protectedRoutes = [
  routes.dashboard,
  routes.users,
  routes.financeHome,
  routes.account,
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (pathname.startsWith(routes.login)) {
    if (hasSession) {
      return NextResponse.redirect(new URL(routes.financeHome, request.url));
    }

    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!hasSession) {
    const loginUrl = new URL(routes.login, request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/home/:path*",
    "/account/:path*",
    "/login",
  ],
};
