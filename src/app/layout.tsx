import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${SITE_NAME} — Pretext 多行文本测量与排版`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "介绍 Pretext（@chenglou/pretext）：无需 DOM 测量即可计算多行文本高度与断行，支持 Canvas 渲染与虚拟列表等场景。含 API 说明与在线演示。",
  keywords: [
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
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Pretext 多行文本测量与排版`,
    description:
      "Pretext 中文介绍、API 参考与交互演示：prepare、layout、layoutWithLines、layoutNextLine 等。",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Pretext`,
    description:
      "无需 DOM reflow 的多行文本测量与排版库，含在线演示与 API 说明。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <JsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
