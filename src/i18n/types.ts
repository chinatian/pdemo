import type { Locale } from "./config";

export type NavKey = "home" | "guide" | "api" | "demos" | "caveats";

export type ProseBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pre"; code: string }
  | { type: "pCode"; before: string; code: string; after: string };

export type Messages = {
  meta: {
    siteName: string;
    /** Logo / header wordmark (e.g. PretextOnline) */
    headerBrand: string;
    titleSuffix: string;
    defaultDescription: string;
    defaultOgLocale: string;
    keywords: string[];
    twitterDescription: string;
    jsonLdSiteDescription: string;
  };
  nav: Record<NavKey, string> & {
    aria: string;
    menuOpen: string;
    menuClose: string;
  };
  langSwitch: { label: string; toEn: string; toZh: string };
  footer: {
    disclaimer: string;
    githubLabel: string;
    npmLabel: string;
    resourcesTitle: string;
    pretextBuilderLabel: string;
  };
  home: {
    title: string;
    description: string;
    /** Liquid text wall hero (home only): SEO + dense keyword pool for Canvas wall */
    heroLiquid: {
      ariaLabel: string;
      subtitle: string;
      seoText: string;
      wallKeywords: string[];
    };
    ctaDemos: string;
    ctaGuide: string;
    ctaApi: string;
    colPerformanceTitle: string;
    colPerformanceBody: string;
    colCapabilityTitle: string;
    colCapabilityBody: string;
    colOpenTitle: string;
    colOpenBody: string;
    colOpenLink: string;
  };
  guide: {
    title: string;
    description: string;
    blocks: ProseBlock[];
    resourceBuilder: {
      before: string;
      linkLabel: string;
      after: string;
    };
    footerLinks: {
      before: string;
      caveats: string;
      mid: string;
      api: string;
      after: string;
    };
  };
  apiReference: {
    title: string;
    description: string;
    blocks: ProseBlock[];
  };
  caveats: {
    title: string;
    description: string;
    blocks: ProseBlock[];
  };
  demosIndex: {
    title: string;
    description: string;
    openDemo: string;
    openExternalDemo: string;
    shareX: string;
    shareFacebook: string;
    items: {
      href: string;
      title: string;
      desc: string;
      /** Public path e.g. `/demos/foo.png` */
      coverSrc?: string;
      /** Wider card on `sm+` when true */
      featured?: boolean;
    }[];
  };
  demos: {
    breadcrumb: string;
    measure: { title: string; description: string };
    lines: { title: string; description: string };
    preWrap: { title: string; description: string };
    flow: { title: string; description: string };
    editor: { title: string; description: string };
  };
  demoUi: {
    textLabel: string;
    maxWidth: string;
    lineHeight: string;
    layoutResult: string;
    layoutResultFmt: string;
    px: string;
    linesTotalFmt: string;
    preWrapHint: string;
    lineWidthFmt: string;
    emptyLine: string;
    linesHeaderFmt: string;
    flowHeaderFmt: string;
    flowNarrowLines: string;
    flowFullWidth: string;
    flowNarrowWidth: string;
    editorPreviewTitle: string;
    editorStatsFmt: string;
  };
  demoSamples: {
    measure: string;
    lines: string;
    preWrap: string;
    flow: string;
    editor: string;
  };
};

export type { Locale };
