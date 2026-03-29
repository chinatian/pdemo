import Link from "next/link";
import {
  GITHUB_PRETEXT,
  GITHUB_PRETEXT_BUILDER,
  NPM_PRETEXT,
} from "@/lib/site";
import type { Messages } from "@/i18n/types";

export function SiteFooter({ dict }: { dict: Messages }) {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-800 dark:text-zinc-200">
              {dict.meta.siteName}
            </p>
            <p>{dict.footer.disclaimer}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm sm:items-end">
            <ul className="flex flex-col gap-2 sm:items-end">
              <li>
                <Link
                  href={GITHUB_PRETEXT}
                  className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {dict.footer.githubLabel}
                </Link>
              </li>
              <li>
                <Link
                  href={NPM_PRETEXT}
                  className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {dict.footer.npmLabel}
                </Link>
              </li>
            </ul>
            <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {dict.footer.resourcesTitle}
              </p>
              <ul className="flex flex-col gap-2 sm:items-end">
                <li>
                  <Link
                    href={GITHUB_PRETEXT_BUILDER}
                    className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {dict.footer.pretextBuilderLabel}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {dict.meta.siteName}
        </p>
      </div>
    </footer>
  );
}
