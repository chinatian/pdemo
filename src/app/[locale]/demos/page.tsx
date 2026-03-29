import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { canonicalUrl, hreflangAlternates } from "@/lib/site";

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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageIntro title={d.title} description={d.description} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {d.items.map((item, index) => {
          const external = item.href.startsWith("http");
          const href = external ? item.href : `/${locale}${item.href}`;
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
                <span className="mt-4 inline-block text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {cta}
                </span>
              </div>
            </>
          );

          return (
            <li
              key={item.href}
              className={item.featured ? "sm:col-span-2" : undefined}
            >
              {external ? (
                <a
                  href={href}
                  className={cardClassName}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {inner}
                </a>
              ) : (
                <Link href={href} className={cardClassName}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
