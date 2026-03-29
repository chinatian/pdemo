import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
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
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${base}${path === "" ? "/" : path}`,
    lastModified,
    changeFrequency: path.startsWith("/demos") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/demos" ? 0.9 : 0.8,
  }));
}
