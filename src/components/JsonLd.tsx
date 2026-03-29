import { GITHUB_PRETEXT, getSiteUrl } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl().origin;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "pretextonline",
        url,
        description:
          "pretextonline — bilingual guide and live demos for Pretext: multiline text measurement and layout without DOM reflow (中文 / English).",
        inLanguage: ["zh-CN", "en"],
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
