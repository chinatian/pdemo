"use client";

import { layout, prepare } from "@chenglou/pretext";
import { useEffect, useMemo, useState } from "react";
import { useLocaleContext } from "@/components/LocaleProvider";

/** 与 <pre> 内联样式一致，便于 Pretext 与屏幕像素对齐 */
const CLOCK_FONT =
  '24px ui-serif, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, serif';

/** 每行 3 个全角格：用「密」拼成 5×3 点阵数字 */
const DIGITS: string[][] = [
  ["密密密", "密　密", "密　密", "密　密", "密密密"],
  ["　密　", "密密　", "　密　", "　密　", "　密　"],
  ["密密密", "　　密", "密密密", "密　　", "密密密"],
  ["密密密", "　　密", "密密密", "　　密", "密密密"],
  ["密　密", "密　密", "密密密", "　　密", "　　密"],
  ["密密密", "密　　", "密密密", "　　密", "密密密"],
  ["密密密", "密　　", "密密密", "密　密", "密密密"],
  ["密密密", "　　密", "　　密", "　　密", "　　密"],
  ["密密密", "密　密", "密密密", "密　密", "密密密"],
  ["密密密", "密　密", "密密密", "　　密", "　　密"],
];

/** 冒号：上下两点，3 格宽 */
const COLON = ["　　", "　密", "　　", "　密", "　　"];

function glyphFor(ch: string): string[] {
  if (ch === ":") return COLON;
  const d = Number(ch);
  if (d >= 0 && d <= 9) return DIGITS[d] ?? DIGITS[0];
  return DIGITS[0];
}

function buildClockRows(h: number, m: number, s: number): string[] {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const str = `${pad(h)}:${pad(m)}:${pad(s)}`;
  const rows = ["", "", "", "", ""];
  for (let i = 0; i < str.length; i++) {
    const g = glyphFor(str[i] ?? "0");
    for (let r = 0; r < 5; r++) {
      rows[r] += (i > 0 ? "  " : "") + (g[r] ?? "");
    }
  }
  return rows;
}

function ClockDemo() {
  const { messages: dict } = useLocaleContext();
  const [, setTick] = useState(0);
  const [lineHeight, setLineHeight] = useState(32);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const d = new Date();
  const block = buildClockRows(
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
  ).join("\n");

  const prepared = useMemo(
    () =>
      prepare(block, CLOCK_FONT, {
        whiteSpace: "pre-wrap",
      }),
    [block],
  );

  const maxWidth = 2400;
  const { height, lineCount } = useMemo(
    () => layout(prepared, maxWidth, lineHeight),
    [prepared, lineHeight],
  );

  const stats = dict.demoUi.clockPretextFmt
    .replace("{h}", height.toFixed(1))
    .replace("{n}", String(lineCount));

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {dict.demoUi.clockHint}
      </p>
      <pre
        className="overflow-x-auto rounded-lg border border-zinc-300 bg-zinc-950 p-4 text-[24px] text-amber-100 shadow-inner dark:border-zinc-700"
        style={{
          fontFamily:
            'ui-serif, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, serif',
          lineHeight: `${lineHeight}px`,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {block}
      </pre>
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:max-w-xs">
          <span className="flex justify-between">
            {dict.demoUi.lineHeight}
            <span className="tabular-nums text-zinc-500">{lineHeight}</span>
          </span>
          <input
            type="range"
            min={24}
            max={48}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </label>
        <output className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <span className="font-medium text-emerald-900 dark:text-emerald-200">
            {dict.demoUi.layoutResult}
          </span>{" "}
          <span className="tabular-nums text-emerald-800 dark:text-emerald-300">
            {stats}
          </span>
        </output>
      </div>
    </div>
  );
}

export { ClockDemo };
export default ClockDemo;
