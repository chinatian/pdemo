import Link from "next/link";
import { GITHUB_PRETEXT, NPM_PRETEXT, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-800 dark:text-zinc-200">
              {SITE_NAME}
            </p>
            <p>
              本站为社区整理的介绍与演示页面，并非 Pretext
              官方站点。库作者为 Cheng Lou，源码以 MIT 许可发布。
            </p>
          </div>
          <ul className="flex flex-col gap-2 text-sm sm:items-end">
            <li>
              <Link
                href={GITHUB_PRETEXT}
                className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub：chenglou/pretext
              </Link>
            </li>
            <li>
              <Link
                href={NPM_PRETEXT}
                className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                rel="noopener noreferrer"
                target="_blank"
              >
                npm：@chenglou/pretext
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
