import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProseBlocks } from "@/components/ProseBlocks";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { canonicalUrl, hreflangAlternates } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.apiReference.title,
    description: dict.apiReference.description,
    alternates: {
      canonical: canonicalUrl(locale, "/api-reference"),
      languages: hreflangAlternates("/api-reference"),
    },
  };
}

export default async function ApiReferencePage({ params }: Props) {
  const { locale: raw } = await params;
  const dict = await getDictionary(isLocale(raw) ? raw : defaultLocale);
  const a = dict.apiReference;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro title={a.title} description={a.description} />
      <div className="article">
        <ProseBlocks blocks={a.blocks} />
      </div>
    </article>
  );
}
