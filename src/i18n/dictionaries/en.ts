import type { Messages } from "../types";

export const en: Messages = {
  meta: {
    siteName: "Pretext Guide",
    titleSuffix: "Pretext Guide",
    defaultDescription:
      "Pretext (@chenglou/pretext): multiline text measurement and line breaking without DOM reads—ideal for Canvas, virtualized lists, and preventing layout shift. Includes API notes and live demos.",
    defaultOgLocale: "en_US",
    keywords: [
      "Pretext",
      "chenglou",
      "text measurement",
      "multiline layout",
      "Canvas",
      "virtual list",
      "layout",
      "measureText",
      "TypeScript",
    ],
    twitterDescription:
      "Multiline text measurement without DOM reflow—live demos and API overview.",
    jsonLdSiteDescription:
      "Introduction, API reference, and interactive demos for the Pretext multiline text layout library.",
  },
  nav: {
    home: "Home",
    guide: "Guide",
    api: "API",
    demos: "Demos",
    caveats: "Caveats",
    aria: "Main navigation",
  },
  langSwitch: {
    label: "Language",
    toEn: "English",
    toZh: "中文",
  },
  footer: {
    disclaimer:
      "This site is an independent community guide and demo collection—not an official Pretext site. Library by Cheng Lou, MIT licensed.",
    githubLabel: "GitHub: chenglou/pretext",
    npmLabel: "npm: @chenglou/pretext",
  },
  home: {
    title: "Measure multiline text without touching the DOM",
    description:
      "Pretext (@chenglou/pretext) uses the browser font engine for ground-truth widths, then does line breaking and height math in pure data—great for virtual lists, Canvas text, and stable layouts.",
    ctaDemos: "Try live demos",
    ctaGuide: "How it works",
    ctaApi: "API cheat sheet",
    colPerformanceTitle: "Performance",
    colPerformanceBody:
      "prepare() measures once; layout() re-runs in microseconds for new widths.",
    colCapabilityTitle: "Capabilities",
    colCapabilityBody:
      "Many languages, emoji, mixed bidi; optional pre-wrap; line-by-line APIs for Canvas and ragged widths.",
    colOpenTitle: "Open source",
    colOpenBody:
      "MIT licensed at chenglou/pretext. This Pretext Guide site is maintained separately.",
    colOpenLink: "chenglou/pretext",
  },
  guide: {
    title: "What is Pretext",
    description:
      "A library for front-end text metrics: width, line breaks, and height decoupled from DOM layout, using measurements consistent with the browser.",
    blocks: [
      { type: "h2", text: "Why it exists" },
      {
        type: "p",
        text: "Often we measure text with hidden nodes or APIs like getBoundingClientRect and offsetHeight. Those reads can trigger reflow—expensive in lists, animation, or high-frequency updates.",
      },
      {
        type: "p",
        text: "Pretext uses canvas text measurement plus its own line-breaking pipeline. prepare() builds a reusable handle; layout() and related APIs answer height or per-line strings with arithmetic—no need to mount the text in the DOM.",
      },
      { type: "h2", text: "Core flow" },
      {
        type: "ul",
        items: [
          "prepare(text, font): normalize whitespace, segment, measure—returns an opaque handle (heavier, run once).",
          "layout(prepared, maxWidth, lineHeight): line count and total height (cheap hot path).",
        ],
      },
      {
        type: "p",
        text: "Need each line’s string (e.g. for Canvas)? Use prepareWithSegments with layoutWithLines. Need different widths per line (e.g. around a float)? Use layoutNextLine in a loop.",
      },
      { type: "h2", text: "Typical use cases" },
      {
        type: "ul",
        items: [
          "Chat or feed virtualization: know row height before paint, fewer jumps and bad caches.",
          "Canvas / WebGL labels: draw with line.text and line.width.",
          "Design or CI checks that labels don’t wrap—without a full layout engine.",
        ],
      },
      { type: "h2", text: "Learn more" },
      {
        type: "p",
        text: "Install: npm install @chenglou/pretext. Upstream README and source live on GitHub; the author also hosts demos elsewhere.",
      },
    ],
    footerLinks: {
      before: "For limitations (font names, white-space behavior, etc.), see",
      caveats: "Caveats",
      mid: ". For the full API, see the",
      api: "API reference",
      after: ".",
    },
  },
  apiReference: {
    title: "API reference",
    description:
      "Short overview of common APIs—see package types and upstream docs for full behavior.",
    blocks: [
      { type: "h2", text: "Use case 1: height only" },
      {
        type: "pre",
        code: `import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Hello', '16px Inter')
const { height, lineCount } = layout(prepared, 280, 24)`,
      },
      {
        type: "ul",
        items: [
          "prepare(text, font, options?): font matches CanvasRenderingContext2D.font; optional { whiteSpace: 'pre-wrap' }.",
          "layout(prepared, maxWidth, lineHeight): returns height and line count.",
        ],
      },
      { type: "h2", text: "Use case 2: line strings or varying widths" },
      {
        type: "pre",
        code: `import {
  prepareWithSegments,
  layoutWithLines,
  walkLineRanges,
  layoutNextLine,
} from '@chenglou/pretext'

const p = prepareWithSegments(text, font)
const { lines, height, lineCount } = layoutWithLines(p, maxWidth, lineHeight)

walkLineRanges(p, maxWidth, (line) => {
  // line.width, line.start, line.end
})

let cursor = { segmentIndex: 0, graphemeIndex: 0 }
for (;;) {
  const line = layoutNextLine(p, cursor, widthForThisLine)
  if (line === null) break
  cursor = line.end
}`,
      },
      { type: "h3", text: "Main types (conceptual)" },
      {
        type: "ul",
        items: [
          "LayoutLine: text, width, start, end.",
          "LayoutCursor: segmentIndex, graphemeIndex.",
        ],
      },
      { type: "h2", text: "Other helpers" },
      {
        type: "ul",
        items: [
          "clearCache(): drop internal measurement caches (e.g. when swapping many fonts).",
          "setLocale(locale?): affects future prepare calls and clears cache.",
          "profilePrepare(...): timing breakdown for profiling.",
        ],
      },
    ],
  },
  caveats: {
    title: "Caveats and limits",
    description:
      "Pretext targets common web defaults—not a full typesetting engine. Align with your target browsers and designs.",
    blocks: [
      { type: "h2", text: "Match your CSS" },
      {
        type: "p",
        text: "The font string passed to prepare should match the rendered CSS font (size, weight, style, family). lineHeight should match CSS line-height for pixel-accurate comparisons.",
      },
      { type: "h2", text: "Default behavior" },
      {
        type: "p",
        text: "The library broadly targets stacks like (see upstream for exact guarantees):",
      },
      {
        type: "ul",
        items: [
          "white-space: normal (or pre-wrap when that mode is enabled)",
          "word-break: normal",
          "overflow-wrap: break-word",
          "line-break: auto",
        ],
      },
      {
        type: "p",
        text: "Very narrow boxes may still break inside words at grapheme boundaries, similar to break-word.",
      },
      { type: "h2", text: "pre-wrap mode" },
      {
        type: "pCode",
        before: "With ",
        code: "{ whiteSpace: 'pre-wrap' }",
        after: ", spaces, tabs, and newlines are preserved; tabs follow an 8-column stop model like common browsers.",
      },
      { type: "h2", text: "Font family names" },
      {
        type: "p",
        text: "On macOS, using system-ui alone for measurement can be unreliable; prefer explicit family names.",
      },
      { type: "h2", text: "Demos on this site" },
      {
        type: "p",
        text: "Demos use a generic sans-serif stack. For production parity, set DEMO_FONT in code to match your product font declaration.",
      },
    ],
  },
  demosIndex: {
    title: "Live demos",
    description:
      "These examples run @chenglou/pretext in the browser—edit text and sliders to see results.",
    openDemo: "Open demo →",
    items: [
      {
        href: "/demos/measure",
        title: "Height & line count",
        desc: "prepare + layout: change width and line-height, read total height and line count.",
      },
      {
        href: "/demos/lines",
        title: "Line list",
        desc: "layoutWithLines: each line’s text and measured width.",
      },
      {
        href: "/demos/pre-wrap",
        title: "pre-wrap",
        desc: "Preserve spaces, tabs, and hard breaks.",
      },
      {
        href: "/demos/flow",
        title: "Varying line widths",
        desc: "layoutNextLine: first lines narrow, then full width—simple float-style flow.",
      },
    ],
  },
  demos: {
    breadcrumb: "Demos",
    measure: {
      title: "Height & line count",
      description:
        "prepare() once, then layout() at different widths to get height and lineCount.",
    },
    lines: {
      title: "Line list",
      description:
        "prepareWithSegments + layoutWithLines: inspect each line’s string and line.width.",
    },
    preWrap: {
      title: "pre-wrap mode",
      description:
        "Enable { whiteSpace: 'pre-wrap' } on prepareWithSegments to keep whitespace and breaks.",
    },
    flow: {
      title: "Varying width per line",
      description:
        "layoutNextLine advances a cursor; pass a different maxWidth each line for irregular containers.",
    },
  },
  demoUi: {
    textLabel: "Text",
    maxWidth: "Max width (px)",
    lineHeight: "Line height (px)",
    layoutResult: "layout() result:",
    layoutResultFmt: "Total height {h} px, {n} lines",
    px: "px",
    linesTotalFmt: "{n} lines, total height {h} px.",
    preWrapHint:
      "With prepareWithSegments(..., { whiteSpace: 'pre-wrap' }), spaces, tabs, and newlines follow textarea / pre-wrap semantics.",
    lineWidthFmt: "{w}px",
    emptyLine: "(empty line)",
    linesHeaderFmt: "layoutWithLines — line width {w}px",
    flowHeaderFmt: "layoutNextLine — first {n} lines at {nw}px, then {fw}px",
    flowNarrowLines: "Narrow lines at start",
    flowFullWidth: "Full width (px)",
    flowNarrowWidth: "Narrow width (px)",
  },
  demoSamples: {
    measure:
      "Pretext measures multiline height without the DOM—great for virtual lists and stable layouts. AGI, spring is here. بدأت الرحلة 🚀",
    lines: "First and second lines wrap at max width. Numbers 123 and emoji 🎨 join the layout.",
    preWrap: "Keep spaces  and\nhard breaks\n\t(tab stops every 8 columns)",
    flow: "Like text beside a float: early lines are narrower, then the full column width. Each line uses its own maxWidth.",
  },
};
