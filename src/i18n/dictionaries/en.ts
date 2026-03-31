import {
  ILLUSTRATED_MANUSCRIPT_DEMO_URL,
  PRETEXT_BREAKER_DEMO_URL,
} from "@/lib/site";
import type { Messages } from "../types";

export const en: Messages = {
  meta: {
    siteName: "pretextonline",
    headerBrand: "PretextOnline",
    titleSuffix: "pretextonline",
    defaultDescription:
      "Pretext (@chenglou/pretext): multiline text measurement and line breaking without DOM reads—ideal for Canvas, virtualized lists, and preventing layout shift. Includes API notes and live demos.",
    defaultOgLocale: "en_US",
    keywords: [
      "pretextonline",
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
      "pretextonline — introduction, API reference, and interactive demos for the Pretext multiline text layout library.",
  },
  nav: {
    home: "Home",
    guide: "Guide",
    api: "API",
    demos: "Demos",
    caveats: "Caveats",
    aria: "Main navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
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
    resourcesTitle: "Resources",
    pretextBuilderLabel: "pretext-builder (community docs & Cursor skill)",
  },
  home: {
    title: "Measure multiline text without touching the DOM",
    description:
      "Pretext (@chenglou/pretext) uses the browser font engine for ground-truth widths, then does line breaking and height math in pure data—great for virtual lists, Canvas text, and stable layouts.",
    heroLiquid: {
      ariaLabel:
        "AI stream scroll: text cascades from the top, wraps around a 3D-like obstacle, and reflows as stream width changes.",
      subtitle:
        "A real-time AI stream: drag the divider to change waterfall width, and watch Pretext recompute line breaks around the center model at 60fps.",
      seoText:
        "AI stream layout, high-performance frontend, Web Vitals, Core Web Vitals, LCP, CLS, INP, FID, SEO, streaming text, dynamic width reflow, obstacle wrapping, SSR, static generation, virtual list, Canvas text, layout, measureText, no reflow, Pretext, multiline layout, chenglou, pretextonline.",
      wallKeywords: [
        "Web Vitals",
        "Core Web Vitals",
        "LCP",
        "CLS",
        "INP",
        "FID",
        "SEO",
        "first contentful",
        "high performance",
        "virtual list",
        "Canvas",
        "layout",
        "measureText",
        "no reflow",
        "Pretext",
        "SSR",
        "SSG",
        "static generation",
        "a11y",
        "accessibility",
        "performance budget",
        "long list",
        "line break",
        "font metrics",
        "INP tuning",
        "CLS stability",
        "LCP budget",
        "semantic HTML",
        "structured data",
        "TypeScript",
        "requestAnimationFrame",
        "zero DOM reads",
        "pure data layout",
        "chenglou",
        "pretextonline",
        "multiline height",
        "line box",
        "emoji",
        "bidi",
        "RTL",
        "pre-wrap",
        "virtualization",
        "scroll perf",
        "GPU",
        "compositor",
        "lazy load",
        "preload",
        "cache",
        "CDN",
        "edge",
        "streaming",
        "islands",
        "hydration",
        "streaming SSR",
      ],
    },
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
      "MIT licensed at chenglou/pretext. pretextonline is maintained separately.",
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
    resourceBuilder: {
      before: "Community resource",
      linkLabel: "Cactusinhand/pretext-builder",
      after:
        " on GitHub: quick start, a layout-pattern cheat sheet, and practical notes such as waiting for document.fonts.ready (third-party, not an official Pretext repo).",
    },
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
      "Embedded examples you can tweak here, plus external demos that open in a new tab.",
    openDemo: "Open demo →",
    openExternalDemo: "Open in new tab →",
    shareX: "Share on X",
    shareFacebook: "Share on Facebook",
    items: [
      {
        href: PRETEXT_BREAKER_DEMO_URL,
        title: "Pretext Breaker",
        desc: "Breakout-style game: the text wall recomposes as the ball and paddle collide—dynamic layout with Pretext.",
        coverSrc: "/demos/pretext-breaker-cover.png",
        featured: true,
      },
      {
        href: ILLUSTRATED_MANUSCRIPT_DEMO_URL,
        title: "Illustrated Manuscript",
        desc: "Parchment-like page with blackletter type and an ornate drop cap—interactive narrative by Neither/Nor (e.g. click for fire).",
        coverSrc: "/demos/illustrated-manuscript-cover.png",
        featured: true,
      },
      {
        href: "https://notes.designtips.today/text-with-love",
        title: "Text, with Love",
        desc: "Poetic text-and-flower canvas experience inspired by The Book of Tea.",
        coverSrc: "/demos/text-with-love-cover.png",
        featured: true,
      },
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
      {
        href: "/demos/editor",
        title: "Simple text editor",
        desc: "A tiny pre-wrap editor powered by Pretext with live line layout preview.",
      },
      {
        href: "/demos/clock",
        title: "Dense glyph clock",
        desc: "Hours, minutes, and seconds as a 密-filled dot matrix; Pretext measures the full block height.",
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
    editor: {
      title: "Simple text editor",
      description:
        "Type freely, then let Pretext lay out pre-wrap lines in real time under your selected width and line height.",
    },
    clock: {
      title: "Dense glyph clock",
      description:
        "Each digit is a 5×3 grid of the Han character 密 (dense). prepare + layout report total height under pre-wrap.",
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
    editorPreviewTitle: "Preview (Pretext)",
    editorStatsFmt: "{n} lines, total height {h} px.",
    clockHint:
      "Five rows by three full-width cells per digit, with two spaces between symbols. Colons are two dots. When you change line height, layout()’s total height should match line height × line count.",
    clockPretextFmt: "Total height {h} px, {n} lines",
  },
  demoSamples: {
    measure:
      "Pretext measures multiline height without the DOM—great for virtual lists and stable layouts. AGI, spring is here. بدأت الرحلة 🚀",
    lines: "First and second lines wrap at max width. Numbers 123 and emoji 🎨 join the layout.",
    preWrap: "Keep spaces  and\nhard breaks\n\t(tab stops every 8 columns)",
    flow: "Like text beside a float: early lines are narrower, then the full column width. Each line uses its own maxWidth.",
    editor:
      "Start editing here.\n\nThis mini editor uses prepareWithSegments + layoutWithLines with { whiteSpace: 'pre-wrap' }.\nAdjust width and line-height sliders to preview how paragraphs reflow.",
  },
};
