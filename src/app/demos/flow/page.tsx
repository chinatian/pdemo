import type { Metadata } from "next";
import Link from "next/link";
import { FlowDemo } from "@/components/demos/demo-dynamic";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "演示：变宽逐行",
  description:
    "Pretext layoutNextLine 演示：每一行可使用不同的 maxWidth，模拟绕开浮层或侧栏时的排版。",
  alternates: { canonical: "/demos/flow" },
};

export default function FlowDemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/demos" className="hover:text-emerald-700 dark:hover:text-emerald-400">
          演示
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">变宽逐行</span>
      </nav>
      <PageIntro
        title="变宽逐行"
        description="用 layoutNextLine 从上一行结束游标继续断行，每行传入不同的可用宽度，适合不规则容器。"
      />
      <FlowDemo />
    </div>
  );
}
