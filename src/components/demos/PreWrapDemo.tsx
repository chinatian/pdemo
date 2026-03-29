"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useMemo, useState } from "react";
import { DEMO_FONT } from "@/lib/site";

const SAMPLE = "保留空格  与\n硬换行\n\t（tab 按 8 格对齐）";

function PreWrapDemo() {
  const [maxWidth, setMaxWidth] = useState(360);
  const [lineHeight, setLineHeight] = useState(24);
  const [text, setText] = useState(SAMPLE);

  const prepared = useMemo(
    () => prepareWithSegments(text, DEMO_FONT, { whiteSpace: "pre-wrap" }),
    [text],
  );
  const result = useMemo(
    () => layoutWithLines(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight],
  );

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        使用 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">prepareWithSegments(..., &#123; whiteSpace: &apos;pre-wrap&apos; &#125;)</code>{" "}
        时，空格、制表符与换行会按 textarea / pre-wrap 语义保留。
      </p>
      <div>
        <label htmlFor="prewrap-text" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          文本
        </label>
        <textarea
          id="prewrap-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="prewrap-width" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>最大宽度（px）</span>
            <span className="tabular-nums text-zinc-500">{maxWidth}</span>
          </label>
          <input
            id="prewrap-width"
            type="range"
            min={160}
            max={520}
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="prewrap-lh" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>行高（px）</span>
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </label>
          <input
            id="prewrap-lh"
            type="range"
            min={18}
            max={36}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>
      <div
        className="overflow-x-auto rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
        style={{ maxWidth }}
      >
        <div className="whitespace-pre-wrap break-words p-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
          {result.lines.map((line, i) => (
            <div key={`${i}-${line.text.slice(0, 8)}`} style={{ lineHeight: `${lineHeight}px` }}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PreWrapDemo };
export default PreWrapDemo;
