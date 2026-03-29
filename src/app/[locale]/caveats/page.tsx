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
    title: dict.caveats.title,
    description: dict.caveats.description,
    alternates: {
      canonical: canonicalUrl(locale, "/caveats"),
      languages: hreflangAlternates("/caveats"),
    },
  };
}

export default async function CaveatsPage({ params }: Props) {
  const { locale: raw } = await params;
  const dict = await getDictionary(isLocale(raw) ? raw : defaultLocale);
  const c = dict.caveats;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro title={c.title} description={c.description} />
      <div className="article">
        <ProseBlocks blocks={c.blocks} />
      </div>
    </article>
  );
}
