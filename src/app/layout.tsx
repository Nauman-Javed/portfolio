import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/data/queries";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = profile?.name ?? "Portfolio";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: profile ? `${name} — ${profile.headline}` : name,
      template: `%s — ${name}`,
    },
    description: profile?.summary,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
