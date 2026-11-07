import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// First line of defense for /admin. Pages and Server Actions re-check the
// session themselves via requireAdmin(), so this is never the only guard.
export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  if (!req.auth?.user) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
