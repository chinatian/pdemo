"use client";

import {
  layout,
  layoutNextLine,
  layoutWithLines,
  prepare,
  prepareWithSegments,
  type LayoutCursor,
  type LayoutLine,
} from "@chenglou/pretext";
import { useMemo } from "react";
import { DEMO_FONT } from "@/lib/site";

type PrepareSegmentOptions = Parameters<typeof prepareWithSegments>[2];

export function usePreparedText(text: string) {
  return useMemo(() => prepare(text, DEMO_FONT), [text]);
}

export function usePreparedSegments(
  text: string,
  options?: PrepareSegmentOptions,
) {
  return useMemo(() => prepareWithSegments(text, DEMO_FONT, options), [text, options]);
}

export function useMeasuredLayout(
  prepared: ReturnType<typeof prepare>,
  maxWidth: number,
  lineHeight: number,
) {
  return useMemo(
    () => layout(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight],
  );
}

export function useLayoutLines(
  prepared: ReturnType<typeof prepareWithSegments>,
  maxWidth: number,
  lineHeight: number,
) {
  return useMemo(
    () => layoutWithLines(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight],
  );
}

export function useFlowLines(
  prepared: ReturnType<typeof prepareWithSegments>,
  narrowUntilLine: number,
  narrowWidth: number,
  fullWidth: number,
) {
  return useMemo(
    () => collectFlowLines(prepared, narrowUntilLine, narrowWidth, fullWidth),
    [prepared, narrowUntilLine, narrowWidth, fullWidth],
  );
}

function collectFlowLines(
  prepared: ReturnType<typeof prepareWithSegments>,
  narrowUntilLine: number,
  narrowWidth: number,
  fullWidth: number,
): LayoutLine[] {
  const lines: LayoutLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let lineIndex = 0;

  while (true) {
    const width = lineIndex < narrowUntilLine ? narrowWidth : fullWidth;
    const line = layoutNextLine(prepared, cursor, width);
    if (line === null) {
      break;
    }
    lines.push(line);
    cursor = line.end;
    lineIndex += 1;
  }

  return lines;
}
