function resolveSiteOrigin(value: string | undefined, indexable: boolean): string {
  const url = new URL(value?.trim() || "http://localhost:3000");
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.");
  }
  const local = url.hostname === "localhost" || url.hostname.endsWith(".local") || url.hostname === "[::1]" || /^127\./.test(url.hostname);
  if (indexable && (url.protocol !== "https:" || local)) throw new Error("Indexing requires the real public HTTPS domain in NEXT_PUBLIC_SITE_URL.");
  return url.origin;
}

export const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
export const siteOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL, siteIndexable);
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function siteUrl(path = "/"): string {
  return new URL(basePath + path, siteOrigin).toString();
}
