import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const paths = [
  "",
  "/guide",
  "/api-reference",
  "/caveats",
  "/demos",
  "/demos/measure",
  "/demos/lines",
  "/demos/pre-wrap",
  "/demos/flow",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const urlPath = path === "" ? `/${locale}` : `/${locale}${path}`;
      entries.push({
        url: `${base}${urlPath}`,
        lastModified,
        changeFrequency: path.startsWith("/demos") ? "weekly" : "monthly",
        priority:
          path === ""
            ? 1
            : path === "/demos"
              ? 0.9
              : 0.8,
      });
    }
  }

  return entries;
}
