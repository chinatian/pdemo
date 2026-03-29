import type { ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";

const paths = [
  { key: "home" as const, path: "" },
  { key: "guide" as const, path: "/guide" },
  { key: "api" as const, path: "/api-reference" },
  { key: "demos" as const, path: "/demos" },
  { key: "caveats" as const, path: "/caveats" },
];

export function SiteHeader({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Messages;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {dict.meta.siteName}
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <nav
            aria-label={dict.nav.aria}
            className="flex flex-wrap items-center gap-1 sm:gap-2"
          >
            {paths.map((item) => (
              <Link
                key={item.key}
                href={item.path ? `/${locale}${item.path}` : `/${locale}`}
                className="rounded-md px-2 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    </header>
  );
}
