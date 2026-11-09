import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import "./headshot.css";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const inter = Inter({
  variable: "--font-hs-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const mono = JetBrains_Mono({
  variable: "--font-hs-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "H3adShOt — CS2 Config",
  description:
    "H3adShOt's Counter-Strike 2 setup: mouse, crosshair, video, keybinds, viewmodel, launch options, audio, HUD and gear.",
};

// Standalone English-only page: its own root layout, outside the localized site.
export default function HeadshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${chakra.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="hs">{children}</body>
    </html>
  );
}
