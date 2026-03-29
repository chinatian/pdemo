import type { Locale } from "./config";
import { defaultLocale, isLocale } from "./config";
import { en } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";
import type { Messages } from "./types";

const map: Record<Locale, Messages> = { zh, en };

export async function getDictionary(locale: string): Promise<Messages> {
  const loc = isLocale(locale) ? locale : defaultLocale;
  return map[loc];
}
