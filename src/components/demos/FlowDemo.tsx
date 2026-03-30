"use client";

import {
  useFlowLines,
  usePreparedSegments,
} from "./usePretextLayout";
import { useState } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";

function FlowDemo() {
  const { messages: dict } = useLocaleContext();
  const [fullWidth, setFullWidth] = useState(400);
  const [narrowWidth, setNarrowWidth] = useState(220);
  const [narrowLines, setNarrowLines] = useState(3);
  const [lineHeight, setLineHeight] = useState(24);
  const [text, setText] = useState(() => dict.demoSamples.flow);

  const maxNarrow = Math.max(120, fullWidth - 40);
  const effectiveNarrow = Math.min(narrowWidth, maxNarrow);

  const prepared = usePreparedSegments(text);
  const lines = useFlowLines(prepared, narrowLines, effectiveNarrow, fullWidth);

  const headerText = dict.demoUi.flowHeaderFmt
    .replace("{n}", String(narrowLines))
    .replace("{nw}", String(effectiveNarrow))
    .replace("{fw}", String(fullWidth));

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div>
        <label
          htmlFor="flow-text"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {dict.demoUi.textLabel}
        </label>
        <textarea
          id="flow-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="flow-full"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.flowFullWidth}</span>
            <span className="tabular-nums text-zinc-500">{fullWidth}</span>
          </label>
          <input
            id="flow-full"
            type="range"
            min={280}
            max={560}
            value={fullWidth}
            onChange={(e) => {
              const v = Number(e.target.value);
              setFullWidth(v);
              const m = Math.max(120, v - 40);
              setNarrowWidth((w) => Math.min(w, m));
            }}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label
            htmlFor="flow-narrow"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.flowNarrowWidth}</span>
            <span className="tabular-nums text-zinc-500">{effectiveNarrow}</span>
          </label>
          <input
            id="flow-narrow"
            type="range"
            min={120}
            max={maxNarrow}
            value={Math.min(narrowWidth, maxNarrow)}
            onChange={(e) => setNarrowWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label
            htmlFor="flow-count"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.flowNarrowLines}</span>
            <span className="tabular-nums text-zinc-500">{narrowLines}</span>
          </label>
          <input
            id="flow-count"
            type="range"
            min={0}
            max={8}
            value={narrowLines}
            onChange={(e) => setNarrowLines(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label
            htmlFor="flow-lh"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.lineHeight}</span>
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </label>
          <input
            id="flow-lh"
            type="range"
            min={18}
            max={36}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800">
          {headerText}
        </div>
        <div className="p-3 font-sans text-base text-zinc-900 dark:text-zinc-100">
          {lines.map((line, i) => {
            const used = i < narrowLines ? effectiveNarrow : fullWidth;
            const tint =
              i < narrowLines
                ? "bg-amber-50/80 dark:bg-amber-950/20"
                : "bg-zinc-50/50 dark:bg-zinc-900/40";
            return (
              <div
                key={`${i}-${line.text.slice(0, 12)}`}
                className={`flex items-baseline gap-2 border-b border-dashed border-zinc-100 py-0.5 last:border-0 dark:border-zinc-800/80 ${tint}`}
                style={{ lineHeight: `${lineHeight}px`, minHeight: lineHeight }}
              >
                <span
                  className="inline-block shrink-0 text-xs tabular-nums text-zinc-400"
                  style={{ width: 48 }}
                >
                  {dict.demoUi.lineWidthFmt.replace("{w}", String(used))}
                </span>
                <span className="min-w-0 flex-1">{line.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { FlowDemo };
export default FlowDemo;
