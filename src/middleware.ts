import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isLocale, negotiateLocale } from "@/i18n/config";

const STATIC_FILE = /\.(?:ico|png|jpg|jpeg|svg|gif|webp|txt|xml)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    STATIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const suffix = pathname === "/" ? "" : pathname;
  const locale = negotiateLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${suffix}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
