// Umami (https://umami.is): anonymous visit and click statistics, no cookies.
// Paste the "Website ID" from Umami here (or set NEXT_PUBLIC_UMAMI_WEBSITE_ID).
// Empty means statistics are off and no script is loaded.
const WEBSITE_ID = "";

export const ANALYTICS = {
  websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || WEBSITE_ID,
  scriptUrl: "https://cloud.umami.is/script.js",
  // Only the real domain is counted, so previews and local tests stay out of the numbers.
  domains: "anselmoaxo.github.io",
} as const;

type Umami = { track: (event: string, data?: Record<string, string | number>) => void };

export function trackEvent(event: string, data?: Record<string, string | number>) {
  try {
    (window as unknown as { umami?: Umami }).umami?.track(event, data);
  } catch {
    /* Statistics must never break the store. */
  }
}
