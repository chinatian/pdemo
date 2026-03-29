import type { Locale } from "@/i18n/config";

export function getSiteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  return new URL(raw);
}

export const GITHUB_PRETEXT = "https://github.com/chenglou/pretext";
export const GITHUB_PRETEXT_BUILDER =
  "https://github.com/Cactusinhand/pretext-builder";
export const NPM_PRETEXT = "https://www.npmjs.com/package/@chenglou/pretext";

/** Community Breakout-style demo showcasing dynamic Pretext layout. */
export const PRETEXT_BREAKER_DEMO_URL = "https://pretext-breaker.netlify.app/";

/** Interactive manuscript-style text experience (Neither/Nor). */
export const ILLUSTRATED_MANUSCRIPT_DEMO_URL =
  "https://illustrated-manuscript.vercel.app/";

/** Canvas `font` string aligned with page typography (Geist via Next font). */
export const DEMO_FONT =
  '16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/** Path after locale, e.g. "" for home, "/guide" for guide. */
export function canonicalUrl(locale: Locale, pathAfterLocale: string): string {
  const base = getSiteUrl().origin;
  const p =
    pathAfterLocale === "" || pathAfterLocale === "/"
      ? ""
      : pathAfterLocale.startsWith("/")
        ? pathAfterLocale
        : `/${pathAfterLocale}`;
  return `${base}/${locale}${p}`;
}

export function hreflangAlternates(pathAfterLocale: string): Record<string, string> {
  const p =
    pathAfterLocale === "" || pathAfterLocale === "/"
      ? ""
      : pathAfterLocale.startsWith("/")
        ? pathAfterLocale
        : `/${pathAfterLocale}`;
  const base = getSiteUrl().origin;
  return {
    "zh-CN": `${base}/zh${p}`,
    en: `${base}/en${p}`,
    "x-default": `${base}/en${p}`,
  };
}
