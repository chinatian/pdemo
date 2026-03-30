"use client";

import { useState } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";
import { useLayoutLines, usePreparedSegments } from "./usePretextLayout";

function EditorDemo() {
  const { messages: dict } = useLocaleContext();
  const [text, setText] = useState(() => dict.demoSamples.editor);
  const [maxWidth, setMaxWidth] = useState(480);
  const [lineHeight, setLineHeight] = useState(24);

  const prepared = usePreparedSegments(text, { whiteSpace: "pre-wrap" });
  const result = useLayoutLines(prepared, maxWidth, lineHeight);

  const statsText = dict.demoUi.editorStatsFmt
    .replace("{n}", String(result.lineCount))
    .replace("{h}", result.height.toFixed(1));

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="editor-text"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {dict.demoUi.textLabel}
          </label>
          <textarea
            id="editor-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={13}
            className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {dict.demoUi.editorPreviewTitle}
          </h3>
          <div
            className="overflow-hidden rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
            style={{ maxWidth }}
          >
            <div className="border-b border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800">
              {dict.demoUi.linesHeaderFmt.replace("{w}", String(maxWidth))}
            </div>
            <div className="p-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
              {result.lines.map((line, i) => (
                <div
                  key={`${i}-${line.text.slice(0, 16)}`}
                  style={{ lineHeight: `${lineHeight}px`, minHeight: lineHeight }}
                  className="border-b border-dashed border-zinc-100 last:border-0 dark:border-zinc-800/80"
                >
                  {line.text || " "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="editor-width"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.maxWidth}</span>
            <span className="tabular-nums text-zinc-500">{maxWidth}</span>
          </label>
          <input
            id="editor-width"
            type="range"
            min={200}
            max={760}
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label
            htmlFor="editor-lh"
            className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            <span>{dict.demoUi.lineHeight}</span>
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </label>
          <input
            id="editor-lh"
            type="range"
            min={16}
            max={40}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">{statsText}</p>
    </div>
  );
}

export { EditorDemo };
export default EditorDemo;
