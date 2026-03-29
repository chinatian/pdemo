import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "注意事项",
  description:
    "使用 Pretext 时需注意的 CSS 对应关系、macOS system-ui 字体、默认断行行为与 pre-wrap 模式说明。",
  alternates: { canonical: "/caveats" },
};

export default function CaveatsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro
        title="注意事项与限制"
        description="Pretext 瞄准常见 Web 排版默认行为，但并非完整排版引擎。下列条目摘自官方 README 精神，集成时请对照你的设计稿与目标浏览器。"
      />
      <Prose>
        <h2>与 CSS 对齐</h2>
        <p>
          测量用的 <code>font</code> 字符串应与页面上真实文本的 CSS <code>font</code>（字号、字重、样式、族）一致；<code>lineHeight</code> 应与{" "}
          <code>line-height</code> 一致，否则像素级结果可能与 DOM 渲染有偏差。
        </p>
        <h2>默认目标行为</h2>
        <p>库当前主要对齐类似以下的组合（具体以官方文档为准）：</p>
        <ul>
          <li><code>white-space: normal</code>（或使用 pre-wrap 模式时的 pre-wrap 语义）</li>
          <li><code>word-break: normal</code></li>
          <li><code>overflow-wrap: break-word</code></li>
          <li><code>line-break: auto</code></li>
        </ul>
        <p>
          在极窄宽度下仍可能在字素边界处断词内字符，以模拟 <code>break-word</code>。
        </p>
        <h2>pre-wrap 模式</h2>
        <p>
          传入 <code>{`{ whiteSpace: 'pre-wrap' }`}</code> 时，普通空格、<code>\t</code> 与 <code>\n</code>{" "}
          会保留；tab 按常见浏览器的 8 格对齐理解。
        </p>
        <h2>字体名</h2>
        <p>
          在 macOS 上，将 <code>system-ui</code> 作为唯一字体族可能导致测量与预期不一致；官方建议改用具体字体族名。
        </p>
        <h2>演示</h2>
        <p>
          本站 <Link href="/demos">演示页</Link> 使用通用无衬线栈；若你需要与生产环境像素级一致，请在本地把{" "}
          <code>DEMO_FONT</code> 改成与产品相同的 <code>font</code> 声明。
        </p>
      </Prose>
    </article>
  );
}
