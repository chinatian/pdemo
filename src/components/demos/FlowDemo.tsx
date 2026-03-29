"use client";

import {
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
  type LayoutLine,
} from "@chenglou/pretext";
import { useMemo, useState } from "react";
import { DEMO_FONT } from "@/lib/site";

const SAMPLE =
  "模拟「一侧有浮层」时每一行可用宽度不同：前几行较窄，之后恢复全宽。文本会继续按当前行的 maxWidth 排版。";

function collectLines(
  prepared: ReturnType<typeof prepareWithSegments>,
  narrowUntilLine: number,
  narrowWidth: number,
  fullWidth: number,
): LayoutLine[] {
  const lines: LayoutLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let lineIndex = 0;
  while (true) {
    const w = lineIndex < narrowUntilLine ? narrowWidth : fullWidth;
    const line = layoutNextLine(prepared, cursor, w);
    if (line === null) break;
    lines.push(line);
    cursor = line.end;
    lineIndex += 1;
  }
  return lines;
}

function FlowDemo() {
  const [fullWidth, setFullWidth] = useState(400);
  const [narrowWidth, setNarrowWidth] = useState(220);
  const [narrowLines, setNarrowLines] = useState(3);
  const [lineHeight, setLineHeight] = useState(24);
  const [text, setText] = useState(SAMPLE);

  const prepared = useMemo(
    () => prepareWithSegments(text, DEMO_FONT),
    [text],
  );

  const lines = useMemo(
    () => collectLines(prepared, narrowLines, narrowWidth, fullWidth),
    [prepared, narrowLines, narrowWidth, fullWidth],
  );

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <div>
        <label htmlFor="flow-text" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          文本
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
          <label htmlFor="flow-full" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>全宽（px）</span>
            <span className="tabular-nums text-zinc-500">{fullWidth}</span>
          </label>
          <input
            id="flow-full"
            type="range"
            min={280}
            max={560}
            value={fullWidth}
            onChange={(e) => setFullWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="flow-narrow" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>窄宽（px）</span>
            <span className="tabular-nums text-zinc-500">{narrowWidth}</span>
          </label>
          <input
            id="flow-narrow"
            type="range"
            min={120}
            max={fullWidth - 40}
            value={narrowWidth}
            onChange={(e) => setNarrowWidth(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="flow-count" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>前几行用窄宽</span>
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
          <label htmlFor="flow-lh" className="mb-2 flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span>行高（px）</span>
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
          layoutNextLine — 前 {narrowLines} 行宽度 {narrowWidth}px，其余 {fullWidth}px
        </div>
        <div className="p-3 font-sans text-base text-zinc-900 dark:text-zinc-100">
          {lines.map((line, i) => {
            const used =
              i < narrowLines ? narrowWidth : fullWidth;
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
                  style={{ width: 36 }}
                >
                  {used}px
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
