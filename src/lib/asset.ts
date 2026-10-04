const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Site-relative paths (images saved by the panel, e.g. /images/uploads/x.jpg) need the GitHub Pages prefix. */
export function asset(path: string): string {
  if (/^https:\/\//.test(path)) return path;
  if (path.startsWith("/") && !path.startsWith("//")) return basePath + path;
  return "";
}
