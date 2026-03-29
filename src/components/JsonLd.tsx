import { GITHUB_PRETEXT, SITE_NAME, getSiteUrl } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl().origin;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url,
        description:
          "Pretext 多行文本测量与排版库的中文介绍、API 说明与交互演示。",
        inLanguage: "zh-CN",
      },
      {
        "@type": "SoftwareSourceCode",
        name: "Pretext",
        description:
          "Pure JavaScript/TypeScript library for multiline text measurement and layout without DOM reflow.",
        codeRepository: GITHUB_PRETEXT,
        programmingLanguage: ["TypeScript", "JavaScript"],
        license: "https://opensource.org/licenses/MIT",
        url: GITHUB_PRETEXT,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
