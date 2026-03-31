"use client";

import dynamic from "next/dynamic";

const pulse = (
  <div
    className="min-h-56 animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80"
    aria-hidden
  />
);

export const MeasureDemo = dynamic(() => import("./MeasureDemo"), {
  ssr: false,
  loading: () => pulse,
});

export const LinesDemo = dynamic(() => import("./LinesDemo"), {
  ssr: false,
  loading: () => pulse,
});

export const PreWrapDemo = dynamic(() => import("./PreWrapDemo"), {
  ssr: false,
  loading: () => pulse,
});

export const FlowDemo = dynamic(() => import("./FlowDemo"), {
  ssr: false,
  loading: () => pulse,
});

export const EditorDemo = dynamic(() => import("./EditorDemo"), {
  ssr: false,
  loading: () => pulse,
});

export const ClockDemo = dynamic(() => import("./ClockDemo"), {
  ssr: false,
  loading: () => pulse,
});
