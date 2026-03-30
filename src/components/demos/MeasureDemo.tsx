"use client";

import { useState } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";
import { useMeasuredLayout, usePreparedText } from "./usePretextLayout";

function MeasureDemo() {
  const { messages: dict } = useLocaleContext();
  const [maxWidth, setMaxWidth] = useState(320);
  const [lineHeight, setLineHeight] = useState(24);
  const [text, setText] = useState(() => dict.demoSamples.measure);

  const prepared = usePreparedText(text);
  const { height, lineCount } = useMeasuredLayout(prepared, maxWidth, lineHeight);

  const resultText = dict.demoUi.layoutResultFmt
    .replace("{h}", height.toFixed(1))
    .replace("{n}", String(lineCount));

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div>
        <label
          htmlFor="measure-text"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {dict.demoUi.textLabel}
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
          <label
            htmlFor="measure-width"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.maxWidth}</span>
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
          <label
            htmlFor="measure-lh"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.lineHeight}</span>
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
        <span className="font-medium text-emerald-900 dark:text-emerald-200">
          {dict.demoUi.layoutResult}
        </span>{" "}
        <span className="tabular-nums text-emerald-800 dark:text-emerald-300">
          {resultText}
        </span>
      </output>
    </div>
  );
}

export { MeasureDemo };
export default MeasureDemo;
