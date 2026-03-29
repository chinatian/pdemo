import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "API 参考",
  description:
    "Pretext 的 prepare、layout、prepareWithSegments、layoutWithLines、walkLineRanges、layoutNextLine 等 API 摘要与类型说明。",
  alternates: { canonical: "/api-reference" },
};

export default function ApiReferencePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageIntro
        title="API 参考"
        description="以下为常用 API 的精简说明，完整行为以包内类型定义与官方文档为准。"
      />
      <Prose>
        <h2>用例一：只关心高度</h2>
        <pre>
          <code>{`import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('你好世界', '16px Inter')
const { height, lineCount } = layout(prepared, 280, 24)`}</code>
        </pre>
        <ul>
          <li>
            <code>prepare(text, font, options?)</code>：<code>font</code> 与{" "}
            <code>CanvasRenderingContext2D.font</code> 格式一致；可选{" "}
            <code>{`{ whiteSpace: 'pre-wrap' }`}</code>。
          </li>
          <li>
            <code>layout(prepared, maxWidth, lineHeight)</code>：返回高度与行数。
          </li>
        </ul>
        <h2>用例二：需要每行文本或变宽断行</h2>
        <pre>
          <code>{`import {
  prepareWithSegments,
  layoutWithLines,
  walkLineRanges,
  layoutNextLine,
} from '@chenglou/pretext'

const p = prepareWithSegments(text, font)
const { lines, height, lineCount } = layoutWithLines(p, maxWidth, lineHeight)

walkLineRanges(p, maxWidth, (line) => {
  // line.width, line.start, line.end
})

let cursor = { segmentIndex: 0, graphemeIndex: 0 }
for (;;) {
  const line = layoutNextLine(p, cursor, widthForThisLine)
  if (line === null) break
  cursor = line.end
}`}</code>
        </pre>
        <h3>主要类型（概念）</h3>
        <ul>
          <li>
            <code>LayoutLine</code>：<code>text</code>、<code>width</code>、<code>start</code>、<code>end</code>。
          </li>
          <li>
            <code>LayoutCursor</code>：<code>segmentIndex</code>、<code>graphemeIndex</code>。
          </li>
        </ul>
        <h2>其他</h2>
        <ul>
          <li>
            <code>clearCache()</code>：清空内部测量缓存（例如频繁切换字体时）。
          </li>
          <li>
            <code>setLocale(locale?)</code>：影响后续 prepare 的区域设置并会清空缓存。
          </li>
          <li>
            <code>profilePrepare(...)</code>：性能剖析用。
          </li>
        </ul>
      </Prose>
    </article>
  );
}
