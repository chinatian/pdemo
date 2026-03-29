import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const nav = [
  { href: "/", label: "首页" },
  { href: "/guide", label: "介绍" },
  { href: "/api-reference", label: "API" },
  { href: "/demos", label: "演示" },
  { href: "/caveats", label: "注意事项" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="主导航" className="flex flex-wrap items-center gap-1 sm:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
