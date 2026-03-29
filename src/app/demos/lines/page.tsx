import type { Metadata } from "next";
import Link from "next/link";
import { LinesDemo } from "@/components/demos/demo-dynamic";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "演示：分行列表",
  description:
    "Pretext layoutWithLines 演示：在固定最大宽度下查看每一行的文本内容与测量宽度，适合 Canvas 绘制前预览。",
  alternates: { canonical: "/demos/lines" },
};

export default function LinesDemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/demos" className="hover:text-emerald-700 dark:hover:text-emerald-400">
          演示
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">分行列表</span>
      </nav>
      <PageIntro
        title="分行列表"
        description="prepareWithSegments 与 layoutWithLines：输出每一行字符串与 line.width，便于对照绘制或调试。"
      />
      <LinesDemo />
    </div>
  );
}
