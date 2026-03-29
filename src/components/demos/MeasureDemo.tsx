"use client";

import { layout, prepare } from "@chenglou/pretext";
import { useMemo, useState } from "react";
import { DEMO_FONT } from "@/lib/site";

const SAMPLE =
  "Pretext 可在不触碰 DOM 的情况下计算多行文本高度，适合虚拟列表与防布局抖动。AGI 春天到了. بدأت الرحلة 🚀";

function MeasureDemo() {
  const [maxWidth, setMaxWidth] = useState(320);
  const [lineHeight, setLineHeight] = useState(24);
  const [text, setText] = useState(SAMPLE);

  const prepared = useMemo(() => prepare(text, DEMO_FONT), [text]);
  const { height, lineCount } = useMemo(
    () => layout(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight],
  );

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div>
        <label htmlFor="measure-text" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          文本
        </label>
        <textarea
          id="measure-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="measure-width" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>最大宽度（px）</span>
            <span className="tabular-nums text-zinc-500">{maxWidth}</span>
          </label>
          <input
            id="measure-width"
            type="range"
            min={120}
            max={560}
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="measure-lh" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>行高（px）</span>
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </label>
          <input
            id="measure-lh"
            type="range"
            min={16}
            max={40}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>
      <output className="block rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <span className="font-medium text-emerald-900 dark:text-emerald-200">layout() 结果：</span>{" "}
        <span className="tabular-nums text-emerald-800 dark:text-emerald-300">
          总高度 {height.toFixed(1)} px，共 {lineCount} 行
        </span>
      </output>
    </div>
  );
}

export { MeasureDemo };
export default MeasureDemo;
