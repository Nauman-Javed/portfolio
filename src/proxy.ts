import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  hasLocale,
  type Locale,
} from "@/i18n/config";

// First line of defense for /manage. Pages and Server Actions re-check the
// session themselves via requireAdmin(), so this is never the only guard.
const adminProxy = auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname === "/manage/login") return NextResponse.next();

  if (!req.auth?.user) {
    const url = new URL("/manage/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

/** Best match for the visitor: saved choice, then Accept-Language, then English. */
function preferredLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;

  const accepted = (req.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of accepted) {
    const match = LOCALES.find((l) => tag === l || tag.startsWith(`${l}-`));
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/manage" || pathname.startsWith("/manage/")) {
    return adminProxy(req, { params: Promise.resolve({}) });
  }

  // Standalone English-only page, outside the localized site.
  if (pathname === "/H3adShOt" || pathname.startsWith("/H3adShOt/")) {
    return NextResponse.next();
  }

  // Public pages live under /<locale>/…; send everything else there.
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip the API, Next internals, generated icons/images and any file with an
  // extension (sitemap.xml, robots.txt, fonts, …).
  matcher: ["/((?!api|_next|icon|apple-icon|opengraph-image|.*\..*).*)"],
};
