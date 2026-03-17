import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "trabexia_admin";
const LOG_PREFIX = "[MIDDLEWARE]";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasCookie = request.cookies.get(ADMIN_COOKIE)?.value != null;

  console.log(`${LOG_PREFIX} pathname:`, pathname);
  console.log(`${LOG_PREFIX} cookie exists:`, hasCookie);

  const passWithPath = () => {
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: reqHeaders } });
  };

  // 1. /admin/login siempre permitida; si ya tiene cookie, redirigir a /admin
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    if (hasCookie) {
      const target = new URL("/admin", request.url);
      console.log(`${LOG_PREFIX} redirect: /admin/login -> /admin (has cookie)`);
      return NextResponse.redirect(target);
    }
    console.log(`${LOG_PREFIX} allow: /admin/login (no redirect)`);
    return passWithPath();
  }

  // 2. Rutas protegidas: /admin y /admin/candidatos/*
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!hasCookie) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      console.log(`${LOG_PREFIX} redirect: ${pathname} -> /admin/login (no cookie)`);
      return NextResponse.redirect(login);
    }
    console.log(`${LOG_PREFIX} allow: ${pathname} (protected, has cookie)`);
    return passWithPath();
  }

  console.log(`${LOG_PREFIX} allow: ${pathname} (not admin)`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
