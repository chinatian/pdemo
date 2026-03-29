export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

/** Fallback when no `Accept-Language` or unparsable; non-Chinese browsers use English. */
export const defaultLocale: Locale = "en";

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

/**
 * `zh`, `zh-CN`, `zh-TW`, etc. → Chinese; everything else → English.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage?.trim()) return defaultLocale;
  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;
    if (tag === "zh" || tag.startsWith("zh-")) return "zh";
  }
  return defaultLocale;
}
