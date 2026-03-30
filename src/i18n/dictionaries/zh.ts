import {
  ILLUSTRATED_MANUSCRIPT_DEMO_URL,
  PRETEXT_BREAKER_DEMO_URL,
} from "@/lib/site";
import type { Messages } from "../types";

export const zh: Messages = {
  meta: {
    siteName: "pretextonline",
    headerBrand: "PretextOnline",
    titleSuffix: "pretextonline",
    defaultDescription:
      "介绍 Pretext（@chenglou/pretext）：无需 DOM 测量即可计算多行文本高度与断行，支持 Canvas 渲染与虚拟列表等场景。含 API 说明与在线演示。",
    defaultOgLocale: "zh_CN",
    keywords: [
      "pretextonline",
      "Pretext",
      "chenglou",
      "文本测量",
      "多行排版",
      "Canvas",
      "虚拟列表",
      "layout",
      "measureText",
      "TypeScript",
    ],
    twitterDescription:
      "无需 DOM reflow 的多行文本测量与排版库，含在线演示与 API 说明。",
    jsonLdSiteDescription:
      "pretextonline：Pretext 多行文本测量与排版库的中文介绍、API 说明与交互演示。",
  },
  nav: {
    home: "首页",
    guide: "介绍",
    api: "API",
    demos: "演示",
    caveats: "注意事项",
    aria: "主导航",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
  },
  langSwitch: {
    label: "语言",
    toEn: "English",
    toZh: "中文",
  },
  footer: {
    disclaimer:
      "本站为社区整理的介绍与演示页面，并非 Pretext 官方站点。库作者为 Cheng Lou，源码以 MIT 许可发布。",
    githubLabel: "GitHub：chenglou/pretext",
    npmLabel: "npm：@chenglou/pretext",
    resourcesTitle: "资源",
    pretextBuilderLabel: "pretext-builder（社区文档与 Cursor 技能）",
  },
  home: {
    title: "多行文本测量，不必再碰 DOM",
    description:
      "Pretext（@chenglou/pretext）用浏览器字体引擎做基准测量，在纯算术层面完成折行与高度计算，适合虚拟列表、Canvas 绘制与防布局抖动等场景。",
    heroLiquid: {
      ariaLabel:
        "AI 实时流式排版画卷：文本从顶部下流，绕开中心 3D 形态障碍，并在宽度变化时即时重排。",
      subtitle:
        "模拟 AI 持续输出代码与文档：拖拽分隔线可改变瀑布宽度，Pretext 会在每一帧实时重算折行并绕开中心模型。",
      seoText:
        "AI 实时流式排版、高性能前端、Web Vitals、Core Web Vitals、LCP、CLS、INP、FID、SEO、动态宽度重排、障碍物绕流、可访问性、SSR、静态站点生成、虚拟列表、Canvas 文本、layout、measureText、无 reflow、Pretext、多行排版、chenglou、pretextonline。",
      wallKeywords: [
        "Web Vitals",
        "Core Web Vitals",
        "LCP",
        "CLS",
        "INP",
        "FID",
        "SEO",
        "首屏",
        "高性能前端",
        "虚拟列表",
        "Canvas",
        "layout",
        "measureText",
        "无 reflow",
        "Pretext",
        "SSR",
        "SSG",
        "静态生成",
        "可访问性",
        "a11y",
        "性能预算",
        "长列表",
        "排版",
        "折行",
        "字体测量",
        "INP 优化",
        "CLS 稳定",
        "LCP 优化",
        "语义化 HTML",
        "结构化数据",
        "Core Web",
        "前端工程化",
        "TypeScript",
        "requestAnimationFrame",
        "零 DOM 读",
        "纯数据布局",
        "chenglou",
        "pretextonline",
        "多行高度",
        "行盒",
        "断行",
        "emoji",
        "混排",
        "RTL",
        "pre-wrap",
        "虚拟化",
        "滚动性能",
        "GPU",
        "合成层",
        "懒加载",
        "预加载",
        "缓存策略",
        "CDN",
        "边缘计算",
        "流式渲染",
        "岛屿架构",
        "岛屿",
        "hydration",
        "水合",
        "流式 SSR",
      ],
    },
    ctaDemos: "查看交互演示",
    ctaGuide: "了解原理与用途",
    ctaApi: "API 速查",
    colPerformanceTitle: "性能",
    colPerformanceBody:
      "一次 prepare 缓存字形宽度后，layout 可在微秒级重复计算不同宽度下的高度。",
    colCapabilityTitle: "能力",
    colCapabilityBody:
      "多语言、emoji、混排方向；可选 pre-wrap 语义；并提供逐行 API 供 Canvas / 变宽排版使用。",
    colOpenTitle: "开源",
    colOpenBody:
      "MIT 许可，仓库 chenglou/pretext。本站 pretextonline 为独立整理站点。",
    colOpenLink: "chenglou/pretext",
  },
  guide: {
    title: "Pretext 是什么",
    description:
      "面向前端排版与测量的工具库：把「测宽 + 断行 + 高度」从 DOM 布局里抽出来，用与浏览器一致的字体测量结果做纯数据层面的布局。",
    blocks: [
      { type: "h2", text: "为什么需要它" },
      {
        type: "p",
        text: "常见做法是用隐藏节点或 getBoundingClientRect、offsetHeight 等 API 测量文字块高度。这些读取往往会触发布局（reflow），在列表、动画或频繁更新场景下成本很高。",
      },
      {
        type: "p",
        text: "Pretext 在内部使用 Canvas 的文本测量能力与自身的断行逻辑，先把字符串整理成可复用的「已准备」结构，再在任意宽度、行高下用纯算术求高度或逐行结果——无需把文本挂到 DOM 上。",
      },
      { type: "h2", text: "核心流程" },
      {
        type: "ul",
        items: [
          "prepare(text, font)：规范化空白、分段、测量各段宽度，返回不透明句柄（一次性较重）。",
          "layout(prepared, maxWidth, lineHeight)：在给定宽度和行高下计算总行数与总高度（热路径，很轻）。",
        ],
      },
      {
        type: "p",
        text: "若需要每一行的字符串（例如画在 Canvas 上），使用 prepareWithSegments 配合 layoutWithLines；若每一行可用宽度不同（例如绕开浮层），使用 layoutNextLine 迭代。",
      },
      { type: "h2", text: "典型场景" },
      {
        type: "ul",
        items: [
          "聊天、信息流虚拟列表：先算出行高再渲染，减少跳动与错误缓存。",
          "Canvas / WebGL 文字：拿到每行文本与宽度后直接绘制。",
          "设计稿或 CI 里校验「按钮文案是否折行」而无需启动完整浏览器布局。",
        ],
      },
      { type: "h2", text: "延伸阅读" },
      {
        type: "p",
        text: "安装：npm install @chenglou/pretext。官方 README 与源码见 GitHub 仓库；亦可访问作者提供的在线演示（与本站独立）。",
      },
    ],
    resourceBuilder: {
      before: "社区资源",
      linkLabel: "Cactusinhand/pretext-builder",
      after:
        "：快速上手、布局模式对照表、以及 document.fonts.ready 等实践说明（第三方整理，非 Pretext 官方仓库）。",
    },
    footerLinks: {
      before: "使用上的限制（字体名、white-space 行为等）见",
      caveats: "注意事项",
      mid: "；API 明细见",
      api: "API 参考",
      after: "。",
    },
  },
  apiReference: {
    title: "API 参考",
    description: "以下为常用 API 的精简说明，完整行为以包内类型定义与官方文档为准。",
    blocks: [
      { type: "h2", text: "用例一：只关心高度" },
      {
        type: "pre",
        code: `import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('你好世界', '16px Inter')
const { height, lineCount } = layout(prepared, 280, 24)`,
      },
      {
        type: "ul",
        items: [
          "prepare(text, font, options?)：font 与 CanvasRenderingContext2D.font 格式一致；可选 { whiteSpace: 'pre-wrap' }。",
          "layout(prepared, maxWidth, lineHeight)：返回高度与行数。",
        ],
      },
      { type: "h2", text: "用例二：需要每行文本或变宽断行" },
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
      { type: "h3", text: "主要类型（概念）" },
      {
        type: "ul",
        items: [
          "LayoutLine：text、width、start、end。",
          "LayoutCursor：segmentIndex、graphemeIndex。",
        ],
      },
      { type: "h2", text: "其他" },
      {
        type: "ul",
        items: [
          "clearCache()：清空内部测量缓存（例如频繁切换字体时）。",
          "setLocale(locale?)：影响后续 prepare 的区域设置并会清空缓存。",
          "profilePrepare(...)：性能剖析用。",
        ],
      },
    ],
  },
  caveats: {
    title: "注意事项与限制",
    description:
      "Pretext 瞄准常见 Web 排版默认行为，但并非完整排版引擎。下列条目摘自官方 README 精神，集成时请对照你的设计稿与目标浏览器。",
    blocks: [
      { type: "h2", text: "与 CSS 对齐" },
      {
        type: "p",
        text: "测量用的 font 字符串应与页面上真实文本的 CSS font（字号、字重、样式、族）一致；lineHeight 应与 line-height 一致，否则像素级结果可能与 DOM 渲染有偏差。",
      },
      { type: "h2", text: "默认目标行为" },
      {
        type: "p",
        text: "库当前主要对齐类似以下的组合（具体以官方文档为准）：",
      },
      {
        type: "ul",
        items: [
          "white-space: normal（或使用 pre-wrap 模式时的 pre-wrap 语义）",
          "word-break: normal",
          "overflow-wrap: break-word",
          "line-break: auto",
        ],
      },
      {
        type: "p",
        text: "在极窄宽度下仍可能在字素边界处断词内字符，以模拟 break-word。",
      },
      { type: "h2", text: "pre-wrap 模式" },
      {
        type: "pCode",
        before: "传入 ",
        code: "{ whiteSpace: 'pre-wrap' }",
        after: " 时，普通空格、制表符与换行会保留；tab 按常见浏览器的 8 格对齐理解。",
      },
      { type: "h2", text: "字体名" },
      {
        type: "p",
        text: "在 macOS 上，将 system-ui 作为唯一字体族可能导致测量与预期不一致；官方建议改用具体字体族名。",
      },
      { type: "h2", text: "演示" },
      {
        type: "p",
        text: "本站演示页使用通用无衬线栈；若你需要与生产环境像素级一致，请在本地把 DEMO_FONT 改成与产品相同的 font 声明。",
      },
    ],
  },
  demosIndex: {
    title: "交互演示",
    description:
      "本站内嵌示例可现场改参数；另收录社区在线演示（新标签页打开）。",
    openDemo: "打开演示 →",
    openExternalDemo: "在新标签页打开 →",
    items: [
      {
        href: PRETEXT_BREAKER_DEMO_URL,
        title: "Pretext Breaker",
        desc: "打砖块玩法：文字墙随球与挡板碰撞实时重排，展示 Pretext 动态断行与排版。",
        coverSrc: "/demos/pretext-breaker-cover.png",
        featured: true,
      },
      {
        href: ILLUSTRATED_MANUSCRIPT_DEMO_URL,
        title: "Illustrated Manuscript",
        desc: "仿中世纪抄本视觉：羊皮纸底色、哥特体与装饰首字母，互动叙事文本（Neither/Nor 作品）。",
        coverSrc: "/demos/illustrated-manuscript-cover.png",
        featured: true,
      },
      {
        href: "/demos/measure",
        title: "测高与行数",
        desc: "prepare + layout：调节宽度与行高，查看总高度与行数。",
      },
      {
        href: "/demos/lines",
        title: "分行列表",
        desc: "layoutWithLines：展示每一行文本与测量宽度。",
      },
      {
        href: "/demos/pre-wrap",
        title: "pre-wrap",
        desc: "保留空格、制表符与换行的排版效果。",
      },
      {
        href: "/demos/flow",
        title: "变宽逐行",
        desc: "layoutNextLine：前几行窄宽度、后续全宽的简化绕排示例。",
      },
      {
        href: "/demos/editor",
        title: "简单文本编辑器",
        desc: "一个基于 Pretext 的 pre-wrap 小编辑器，实时预览分行布局。",
      },
    ],
  },
  demos: {
    breadcrumb: "演示",
    measure: {
      title: "测高与行数",
      description:
        "对应常用 API：prepare() 一次，layout() 在不同宽度下重复调用，得到 height 与 lineCount。",
    },
    lines: {
      title: "分行列表",
      description:
        "prepareWithSegments 与 layoutWithLines：输出每一行字符串与 line.width，便于对照绘制或调试。",
    },
    preWrap: {
      title: "pre-wrap 模式",
      description:
        "在 prepareWithSegments 的选项中开启 pre-wrap，即可保留空白字符与硬换行。",
    },
    flow: {
      title: "变宽逐行",
      description:
        "用 layoutNextLine 从上一行结束游标继续断行，每行传入不同的可用宽度，适合不规则容器。",
    },
    editor: {
      title: "简单文本编辑器",
      description:
        "输入文本后，Pretext 会按你设置的宽度与行高实时计算 pre-wrap 分行结果。",
    },
  },
  demoUi: {
    textLabel: "文本",
    maxWidth: "最大宽度（px）",
    lineHeight: "行高（px）",
    layoutResult: "layout() 结果：",
    layoutResultFmt: "总高度 {h} px，共 {n} 行",
    px: "px",
    linesTotalFmt: "共 {n} 行，总高度 {h} px。",
    preWrapHint:
      "使用 prepareWithSegments(..., { whiteSpace: 'pre-wrap' }) 时，空格、制表符与换行会按 textarea / pre-wrap 语义保留。",
    lineWidthFmt: "{w}px",
    emptyLine: "（空行）",
    linesHeaderFmt: "layoutWithLines — 每行宽度 {w}px",
    flowHeaderFmt: "layoutNextLine — 前 {n} 行宽度 {nw}px，其余 {fw}px",
    flowNarrowLines: "前几行用窄宽",
    flowFullWidth: "全宽（px）",
    flowNarrowWidth: "窄宽（px）",
    editorPreviewTitle: "预览（Pretext）",
    editorStatsFmt: "共 {n} 行，总高度 {h} px。",
  },
  demoSamples: {
    measure:
      "Pretext 可在不触碰 DOM 的情况下计算多行文本高度，适合虚拟列表与防布局抖动。AGI 春天到了. بدأت الرحلة 🚀",
    lines: "第一行与第二行会按最大宽度自动折行。Numbers 123 与 emoji 🎨 同样参与排版。",
    preWrap: "保留空格  与\n硬换行\n\t（tab 按 8 格对齐）",
    flow: "模拟「一侧有浮层」时每一行可用宽度不同：前几行较窄，之后恢复全宽。文本会继续按当前行的 maxWidth 排版。",
    editor:
      "从这里开始编辑。\n\n这个小编辑器使用 prepareWithSegments + layoutWithLines，并开启 { whiteSpace: 'pre-wrap' }。\n调整宽度和行高滑块，可实时查看段落重排。",
  },
};
