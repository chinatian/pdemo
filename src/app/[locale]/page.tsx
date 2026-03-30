import type { Metadata } from "next";
import Link from "next/link";
import { LiquidTextWallHero } from "@/components/home/LiquidTextWallHero";
import { PageIntro } from "@/components/PageIntro";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { canonicalUrl, GITHUB_PRETEXT, hreflangAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: locale === "en" ? "Home" : "首页",
    description: dict.home.description,
    alternates: {
      canonical: canonicalUrl(locale, ""),
      languages: hreflangAlternates(""),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const h = dict.home;

  return (
    <>
      <LiquidTextWallHero dict={dict} />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro description={h.description} />
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link
          href={`/${locale}/demos`}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          {h.ctaDemos}
        </Link>
        <Link
          href={`/${locale}/guide`}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          {h.ctaGuide}
        </Link>
        <Link
          href={`/${locale}/api-reference`}
          className="inline-flex items-center justify-center rounded-lg border border-transparent px-5 py-3 text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
        >
          {h.ctaApi}
        </Link>
      </div>
      <section className="mt-16 grid gap-8 border-t border-zinc-200 pt-16 dark:border-zinc-800 sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {h.colPerformanceTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {h.colPerformanceBody}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {h.colCapabilityTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {h.colCapabilityBody}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {h.colOpenTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {h.colOpenBody.split(h.colOpenLink)[0]}
            <a
              href={GITHUB_PRETEXT}
              className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
              rel="noopener noreferrer"
              target="_blank"
            >
              {h.colOpenLink}
            </a>
            {h.colOpenBody.split(h.colOpenLink)[1] ?? ""}
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
