import type { Metadata } from "next";
import { AppToaster } from "@/components/admin/app-toaster";
import { inter, jetbrains } from "@/lib/fonts";
import { themeScript } from "@/lib/theme-script";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// The dashboard is its own root layout: always English, left-to-right, and
// untouched by the public site's language setting.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="bg-background min-h-screen">
          {children}
          <AppToaster />
        </div>
      </body>
    </html>
  );
}
