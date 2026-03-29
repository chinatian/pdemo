export const SITE_NAME = "Pretext 指南";

export function getSiteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  return new URL(raw);
}

export const GITHUB_PRETEXT = "https://github.com/chenglou/pretext";
export const NPM_PRETEXT = "https://www.npmjs.com/package/@chenglou/pretext";

/** Canvas `font` string aligned with page typography (Geist via Next font). */
export const DEMO_FONT =
  '16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
