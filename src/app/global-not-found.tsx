import type { Metadata } from "next";
import { NotFoundContent } from "@/components/public/not-found-content";
import { inter } from "@/lib/fonts";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = { title: "Page not found" };

// Shown for URLs that match no route at all. There is no shared layout, so it
// renders its own document (in English, since no language can be known here).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={`dark ${inter.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="flex min-h-screen items-center justify-center px-4">
          <NotFoundContent locale="en" />
        </main>
      </body>
    </html>
  );
}
