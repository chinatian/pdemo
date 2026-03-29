import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getSiteUrl } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const siteUrl = getSiteUrl();

  return {
    title: {
      default: `${dict.meta.siteName} — Pretext`,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    keywords: dict.meta.keywords,
    authors: [{ name: dict.meta.siteName }],
    openGraph: {
      type: "website",
      locale: dict.meta.defaultOgLocale,
      alternateLocale:
        locale === "en" ? ["zh_CN"] : ["en_US"],
      url: siteUrl,
      siteName: dict.meta.siteName,
      title: `${dict.meta.siteName} — Pretext`,
      description: dict.meta.defaultDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.meta.siteName} — Pretext`,
      description: dict.meta.twitterDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = await getDictionary(locale);
  const htmlLang = locale === "en" ? "en" : "zh-CN";

  return (
    <div lang={htmlLang} className="flex min-h-full flex-col">
      <LocaleProvider locale={locale} messages={dict}>
        <SiteHeader locale={locale} dict={dict}>
          <LanguageSwitcher locale={locale} dict={dict} />
        </SiteHeader>
        <main className="flex-1">{children}</main>
        <SiteFooter dict={dict} />
      </LocaleProvider>
    </div>
  );
}
