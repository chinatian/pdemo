"use client";

import { useState } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";
import { useLayoutLines, usePreparedSegments } from "./usePretextLayout";

function LinesDemo() {
  const { messages: dict } = useLocaleContext();
  const [maxWidth, setMaxWidth] = useState(280);
  const [lineHeight, setLineHeight] = useState(26);
  const [text, setText] = useState(() => dict.demoSamples.lines);

  const prepared = usePreparedSegments(text);
  const result = useLayoutLines(prepared, maxWidth, lineHeight);

  const footer = dict.demoUi.linesTotalFmt
    .replace("{n}", String(result.lineCount))
    .replace("{h}", result.height.toFixed(1));

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div>
        <label
          htmlFor="lines-text"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {dict.demoUi.textLabel}
        </label>
        <textarea
          id="lines-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lines-width"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.maxWidth}</span>
            <span className="tabular-nums text-zinc-500">{maxWidth}</span>
          </label>
          <input
            id="lines-width"
            type="range"
            min={120}
            max={480}
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label
            htmlFor="lines-lh"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.lineHeight}</span>
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </label>
          <input
            id="lines-lh"
            type="range"
            min={18}
            max={40}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>
      <div
        className="overflow-hidden rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
        style={{ maxWidth }}
      >
        <div className="border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800">
          {dict.demoUi.linesHeaderFmt.replace("{w}", String(maxWidth))}
        </div>
        <div className="p-3 font-sans text-base text-zinc-900 dark:text-zinc-100">
          {result.lines.map((line, i) => (
            <div
              key={`${i}-${line.text}`}
              style={{ lineHeight: `${lineHeight}px`, minHeight: lineHeight }}
              className="border-b border-dashed border-zinc-100 last:border-0 dark:border-zinc-800/80"
            >
              <span className="text-zinc-400 dark:text-zinc-600">{i + 1}. </span>
              {line.text || (
                <span className="text-zinc-400">{dict.demoUi.emptyLine}</span>
              )}
              <span className="ml-2 text-xs tabular-nums text-zinc-400">
                {dict.demoUi.lineWidthFmt.replace(
                  "{w}",
                  line.width.toFixed(1),
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{footer}</p>
    </div>
  );
}

export { LinesDemo };
export default LinesDemo;
