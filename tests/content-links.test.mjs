import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

// Content edited in the admin panel ends up in links on the public site.
// Only https:// links (plus mailto:/site-relative paths for images) may be published.
const LINK_KEYS = new Set(["url", "instagram"]);

function* links(value, path = "") {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) yield* links(item, `${path}[${index}]`);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (LINK_KEYS.has(key) && typeof item === "string" && item !== "") yield [`${path}.${key}`, item];
      else yield* links(item, `${path}.${key}`);
    }
  }
}

test("links in src/content use https", () => {
  const dir = new URL("../src/content/", import.meta.url);
  for (const file of readdirSync(dir).filter((name) => name.endsWith(".json"))) {
    const content = JSON.parse(readFileSync(new URL(file, dir), "utf8"));
    for (const [path, link] of links(content)) {
      assert.ok(URL.canParse(link) && new URL(link).protocol === "https:", `${file}${path}: ${link}`);
    }
  }
});
