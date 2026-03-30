"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";

const paths = [
  { key: "home" as const, path: "" },
  { key: "guide" as const, path: "/guide" },
  { key: "api" as const, path: "/api-reference" },
  { key: "demos" as const, path: "/demos" },
  { key: "caveats" as const, path: "/caveats" },
];

const navLinkClass =
  "rounded-md px-2 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100";

const navLinkClassMobile =
  "block rounded-lg px-3 py-2.5 text-base text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800";

export function SiteHeader({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Messages;
  children?: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const mobileMenu =
    mobileOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[100] md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={dict.nav.aria}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label={dict.nav.menuClose}
          onClick={() => setMobileOpen(false)}
        />
        <nav
          id={panelId}
          aria-label={dict.nav.aria}
          className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex h-14 shrink-0 items-center justify-end border-b border-zinc-200 px-2 dark:border-zinc-800">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              aria-label={dict.nav.menuClose}
              onClick={() => setMobileOpen(false)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
            {paths.map((item) => (
              <Link
                key={item.key}
                href={item.path ? `/${locale}${item.path}` : `/${locale}`}
                className={navLinkClassMobile}
                onClick={() => setMobileOpen(false)}
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </div>
        </nav>
      </div>,
      document.body,
    );

  return (
    <header className="relative z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {dict.meta.headerBrand}
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label={dict.nav.aria}
            className="hidden flex-wrap items-center gap-1 md:flex md:gap-2"
          >
            {paths.map((item) => (
              <Link
                key={item.key}
                href={item.path ? `/${locale}${item.path}` : `/${locale}`}
                className={navLinkClass}
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            {children}
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden dark:text-zinc-200 dark:hover:bg-zinc-900"
              aria-expanded={mobileOpen}
              aria-controls={panelId}
              aria-label={mobileOpen ? dict.nav.menuClose : dict.nav.menuOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
}
