import type { Metadata } from "next";
import Link from "next/link";
import { MeasureDemo } from "@/components/demos/demo-dynamic";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "演示：测高与行数",
  description:
    "使用 Pretext 的 prepare 与 layout，在浏览器中交互调节容器宽度与行高，查看多行文本总高度与行数。",
  alternates: { canonical: "/demos/measure" },
};

export default function MeasureDemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/demos" className="hover:text-emerald-700 dark:hover:text-emerald-400">
          演示
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">测高与行数</span>
      </nav>
      <PageIntro
        title="测高与行数"
        description="对应常用 API：prepare() 一次，layout() 在不同宽度下重复调用，得到 height 与 lineCount。"
      />
      <MeasureDemo />
    </div>
  );
}
