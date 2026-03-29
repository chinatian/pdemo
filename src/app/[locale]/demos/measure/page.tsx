import type { Metadata } from "next";
import Link from "next/link";
import { MeasureDemo } from "@/components/demos/demo-dynamic";
import { PageIntro } from "@/components/PageIntro";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { canonicalUrl, hreflangAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const m = dict.demos.measure;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: canonicalUrl(locale, "/demos/measure"),
      languages: hreflangAlternates("/demos/measure"),
    },
  };
}

export default async function MeasureDemoPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const m = dict.demos.measure;
  const crumb = dict.demos.breadcrumb;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link
          href={`/${locale}/demos`}
          className="hover:text-emerald-700 dark:hover:text-emerald-400"
        >
          {crumb}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">{m.title}</span>
      </nav>
      <PageIntro title={m.title} description={m.description} />
      <MeasureDemo key={locale} />
    </div>
  );
}
