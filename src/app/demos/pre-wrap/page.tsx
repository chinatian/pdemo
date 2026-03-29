import type { Metadata } from "next";
import Link from "next/link";
import { PreWrapDemo } from "@/components/demos/demo-dynamic";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "演示：pre-wrap",
  description:
    "Pretext whiteSpace: pre-wrap 模式演示：保留空格、制表符与换行，接近 textarea 与 CSS pre-wrap 的排版体验。",
  alternates: { canonical: "/demos/pre-wrap" },
};

export default function PreWrapDemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/demos" className="hover:text-emerald-700 dark:hover:text-emerald-400">
          演示
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 dark:text-zinc-200">pre-wrap</span>
      </nav>
      <PageIntro
        title="pre-wrap 模式"
        description="在 prepareWithSegments 的选项中开启 pre-wrap，即可保留空白字符与硬换行。"
      />
      <PreWrapDemo />
    </div>
  );
}
