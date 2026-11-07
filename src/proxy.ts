import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// First line of defense for /manage. Pages and Server Actions re-check the
// session themselves via requireAdmin(), so this is never the only guard.
export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname === "/manage/login") return NextResponse.next();

  if (!req.auth?.user) {
    const url = new URL("/manage/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/manage/:path*"],
};
