import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "介绍",
  description:
    "Pretext 解决什么问题：DOM 测量的成本、prepare 与 layout 的分工、典型使用场景与官方资源链接。",
  alternates: { canonical: "/guide" },
};

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro
        title="Pretext 是什么"
        description="面向前端排版与测量的工具库：把「测宽 + 断行 + 高度」从 DOM 布局里抽出来，用与浏览器一致的字体测量结果做纯数据层面的布局。"
      />
      <Prose>
        <h2>为什么需要它</h2>
        <p>
          常见做法是用隐藏节点或 <code>getBoundingClientRect</code>、<code>offsetHeight</code>{" "}
          等 API 测量文字块高度。这些读取往往会触发布局（reflow），在列表、动画或频繁更新场景下成本很高。
        </p>
        <p>
          Pretext 在内部使用 Canvas 的文本测量能力与自身的断行逻辑，先把字符串整理成可复用的「已准备」结构，再在任意宽度、行高下用纯算术求高度或逐行结果——无需把文本挂到 DOM 上。
        </p>
        <h2>核心流程</h2>
        <ul>
          <li>
            <strong>prepare(text, font)</strong>：规范化空白、分段、测量各段宽度，返回不透明句柄（一次性较重）。
          </li>
          <li>
            <strong>layout(prepared, maxWidth, lineHeight)</strong>：在给定宽度和行高下计算总行数与总高度（热路径，很轻）。
          </li>
        </ul>
        <p>
          若需要每一行的字符串（例如画在 Canvas 上），使用{" "}
          <code>prepareWithSegments</code> 配合 <code>layoutWithLines</code>；若每一行可用宽度不同（例如绕开浮层），使用{" "}
          <code>layoutNextLine</code> 迭代。
        </p>
        <h2>典型场景</h2>
        <ul>
          <li>聊天、信息流虚拟列表：先算出行高再渲染，减少跳动与错误缓存。</li>
          <li>Canvas / WebGL 文字：拿到每行文本与宽度后直接绘制。</li>
          <li>设计稿或 CI 里校验「按钮文案是否折行」而无需启动完整浏览器布局。</li>
        </ul>
        <h2>延伸阅读</h2>
        <p>
          安装：<code>npm install @chenglou/pretext</code>。官方 README 与源码见{" "}
          <a href="https://github.com/chenglou/pretext" rel="noopener noreferrer" target="_blank">
            GitHub 仓库
          </a>
          ；亦可访问作者提供的在线演示（与本站独立）。
        </p>
        <p>
          使用上的限制（字体名、<code>white-space</code> 行为等）见{" "}
          <Link href="/caveats">注意事项</Link>；API 明细见{" "}
          <Link href="/api-reference">API 参考</Link>。
        </p>
      </Prose>
    </article>
  );
}
