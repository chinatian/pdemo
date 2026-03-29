"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import type { Messages } from "@/i18n/types";

export function LanguageSwitcher({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Messages;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const rest =
    first && locales.includes(first as Locale)
      ? segments.slice(1).join("/")
      : segments.join("/");
  const other: Locale = locale === "zh" ? "en" : "zh";
  const href = rest ? `/${other}/${rest}` : `/${other}`;
  const label = locale === "zh" ? dict.langSwitch.toEn : dict.langSwitch.toZh;

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="sr-only">{dict.langSwitch.label}</span>
      <Link
        href={href}
        hrefLang={other}
        lang={other}
        className="rounded-md px-2 py-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
      >
        {label}
      </Link>
    </div>
  );
}
