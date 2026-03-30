import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { canonicalUrl, getSiteUrl, hreflangAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const cardClassName =
  "block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-800";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.demosIndex.title,
    description: dict.demosIndex.description,
    alternates: {
      canonical: canonicalUrl(locale, "/demos"),
      languages: hreflangAlternates("/demos"),
    },
  };
}

export default async function DemosIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.demosIndex;
  const base = getSiteUrl().origin;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageIntro title={d.title} description={d.description} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {d.items.map((item, index) => {
          const external = item.href.startsWith("http");
          const href = external ? item.href : `/${locale}${item.href}`;
          const shareUrl = external ? item.href : `${base}/${locale}${item.href}`;
          const xShareHref = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}`;
          const fbShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          const cta = external ? d.openExternalDemo : d.openDemo;

          const inner = (
            <>
              {item.coverSrc ? (
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={item.coverSrc}
                    alt={item.title}
                    fill
                    className="object-cover object-[center_15%]"
                    sizes="(max-width:640px) 100vw, min(896px, 100vw)"
                    priority={index === 0}
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {external ? (
                    <a
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-sm font-medium text-emerald-700 dark:text-emerald-400"
                    >
                      {cta}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm font-medium text-emerald-700 dark:text-emerald-400"
                    >
                      {cta}
                    </Link>
                  )}
                  <a
                    href={xShareHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-xs text-zinc-500 underline-offset-4 hover:text-zinc-700 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    {d.shareX}
                  </a>
                  <a
                    href={fbShareHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-xs text-zinc-500 underline-offset-4 hover:text-zinc-700 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    {d.shareFacebook}
                  </a>
                </div>
              </div>
            </>
          );

          return (
            <li
              key={item.href}
              className={item.featured ? "sm:col-span-2" : undefined}
            >
              <article className={cardClassName}>{inner}</article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
