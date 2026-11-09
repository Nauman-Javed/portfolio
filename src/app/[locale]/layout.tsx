import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getProfile } from "@/data/queries";
import { LOCALES, OG_LOCALES, dirOf, hasLocale } from "@/i18n/config";
import { MESSAGES } from "@/i18n/messages";
import { PROFILE_FIELDS, localize } from "@/i18n/localize";
import { I18nProvider } from "@/i18n/provider";
import { getT } from "@/i18n/server";
import { inter, jetbrains, ibmPlexArabic } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const rawProfile = await getProfile();
  const profile = rawProfile && localize(rawProfile, locale, PROFILE_FIELDS);
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
      locale: OG_LOCALES[locale],
    },
    twitter: { card: "summary_large_image" },
  };
}

// This is a root layout: it owns <html>, so the language and text direction
// (right-to-left for Arabic) are set here and every page below inherits them.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = getT(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      data-site="public"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${jetbrains.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <I18nProvider key={locale} locale={locale} messages={MESSAGES[locale]}>
          <div id="top" className="flex flex-1 flex-col">
            <a
              href="#main"
              className="bg-teal text-onteal sr-only z-50 rounded-md px-4 py-3 text-[13px] font-medium focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
            >
              {t("common.skipToContent")}
            </a>
            <SiteHeader locale={locale} />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter locale={locale} />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
