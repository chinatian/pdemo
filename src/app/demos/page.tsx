import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "交互演示",
  description:
    "Pretext 在线演示：layout 测高、layoutWithLines 分行、pre-wrap 模式、layoutNextLine 变宽逐行排版。",
  alternates: { canonical: "/demos" },
};

const demos = [
  {
    href: "/demos/measure",
    title: "测高与行数",
    desc: "prepare + layout：调节宽度与行高，查看总高度与行数。",
  },
  {
    href: "/demos/lines",
    title: "分行列表",
    desc: "layoutWithLines：展示每一行文本与测量宽度。",
  },
  {
    href: "/demos/pre-wrap",
    title: "pre-wrap",
    desc: "保留空格、制表符与换行的排版效果。",
  },
  {
    href: "/demos/flow",
    title: "变宽逐行",
    desc: "layoutNextLine：前几行窄宽度、后续全宽的简化绕排示例。",
  },
] as const;

export default function DemosIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <PageIntro
        title="交互演示"
        description="以下示例均在浏览器中运行 @chenglou/pretext，可直接改动文案与参数观察结果。"
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {demos.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-800"
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {d.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {d.desc}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-emerald-700 dark:text-emerald-400">
                打开演示 →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
