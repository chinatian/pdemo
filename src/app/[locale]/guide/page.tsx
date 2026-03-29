import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { ProseBlocks } from "@/components/ProseBlocks";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  canonicalUrl,
  GITHUB_PRETEXT_BUILDER,
  hreflangAlternates,
} from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.guide.title,
    description: dict.guide.description,
    alternates: {
      canonical: canonicalUrl(locale, "/guide"),
      languages: hreflangAlternates("/guide"),
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const g = dict.guide;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro title={g.title} description={g.description} />
      <div className="article">
        <ProseBlocks blocks={g.blocks} />
        <p className="mb-4 leading-relaxed">
          {g.resourceBuilder.before}{" "}
          <a
            href={GITHUB_PRETEXT_BUILDER}
            className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
            rel="noopener noreferrer"
            target="_blank"
          >
            {g.resourceBuilder.linkLabel}
          </a>
          {g.resourceBuilder.after}
        </p>
        <p className="mb-4 leading-relaxed">
          {g.footerLinks.before}{" "}
          <Link
            href={`/${locale}/caveats`}
            className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            {g.footerLinks.caveats}
          </Link>
          {g.footerLinks.mid}{" "}
          <Link
            href={`/${locale}/api-reference`}
            className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            {g.footerLinks.api}
          </Link>
          {g.footerLinks.after}
        </p>
      </div>
    </article>
  );
}
