import { Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Arabic font for the Arabic pages (Inter has no Arabic glyphs). It only
// downloads on pages that use Arabic text.
export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500"],
});
