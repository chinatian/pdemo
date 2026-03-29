import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { GITHUB_PRETEXT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "首页",
  description:
    "Pretext 是纯 JavaScript/TypeScript 的多行文本测量与排版库，避免 getBoundingClientRect 等 DOM 测量带来的 reflow。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        title="多行文本测量，不必再碰 DOM"
        description="Pretext（@chenglou/pretext）用浏览器字体引擎做基准测量，在纯算术层面完成折行与高度计算，适合虚拟列表、Canvas 绘制与防布局抖动等场景。"
      />
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link
          href="/demos"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          查看交互演示
        </Link>
        <Link
          href="/guide"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          了解原理与用途
        </Link>
        <Link
          href="/api-reference"
          className="inline-flex items-center justify-center rounded-lg border border-transparent px-5 py-3 text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
        >
          API 速查
        </Link>
      </div>
      <section className="mt-16 grid gap-8 border-t border-zinc-200 pt-16 dark:border-zinc-800 sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            性能
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            一次 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">prepare</code>{" "}
            缓存字形宽度后，<code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">layout</code>{" "}
            可在微秒级重复计算不同宽度下的高度。
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            能力
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            多语言、emoji、混排方向；可选 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">pre-wrap</code>{" "}
            语义；并提供逐行 API 供 Canvas / 变宽排版使用。
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            开源
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            MIT 许可，仓库{" "}
            <a
              href={GITHUB_PRETEXT}
              className="text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
              rel="noopener noreferrer"
              target="_blank"
            >
              chenglou/pretext
            </a>
            。本站 {SITE_NAME} 为独立整理站点。
          </p>
        </div>
      </section>
    </div>
  );
}
