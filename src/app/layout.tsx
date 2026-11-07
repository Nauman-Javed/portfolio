import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/data/queries";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "400",
});

// Runs before first paint. Dark is the default; only an explicit "light" choice
// (saved by the toggle) removes the class.
const themeScript = `(function(){try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){}})()`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = profile?.name ?? "Portfolio";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: profile ? `${name} — ${profile.headline}` : name,
      template: `%s — ${name}`,
    },
    description: profile?.summary,
    openGraph: {
      type: "website",
      siteName: name,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
