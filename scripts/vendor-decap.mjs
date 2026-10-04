// Copies Decap CMS into public/admin/vendor/ so the admin panel does not load
// code from a third-party CDN at runtime. The npm tarball is pinned by version
// and by its registry integrity hash; any mismatch fails the build.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, copyFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const VERSION = "3.16.3";
const INTEGRITY =
  "sha512-hf+dPlCh7TJmWl8+6VRzHYOWhri5xgUknrZbDewaWe4s9B7xJ8PQugp2QHeSldMUKzav6+z0oIpwUYhUJDYtYw==";
const target = join(process.cwd(), "public", "admin", "vendor");
const marker = join(target, ".version");

if (existsSync(marker) && readFileSync(marker, "utf8").trim() === INTEGRITY) {
  console.log(`Decap CMS ${VERSION} already vendored`);
  process.exit(0);
}

const work = mkdtempSync(join(tmpdir(), "decap-"));
try {
  const npmArgs = ["pack", `decap-cms@${VERSION}`, "--silent", "--pack-destination", work];
  const npmCli = process.env.npm_execpath || (process.platform === "win32" ? join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js") : "");
  execFileSync(npmCli ? process.execPath : "npm", npmCli ? [npmCli, ...npmArgs] : npmArgs, { stdio: ["ignore", "ignore", "inherit"] });
  const tarball = join(work, `decap-cms-${VERSION}.tgz`);
  const actual = `sha512-${createHash("sha512").update(readFileSync(tarball)).digest("base64")}`;
  if (actual !== INTEGRITY) throw new Error(`decap-cms ${VERSION} integrity mismatch: ${actual}`);

  execFileSync("tar", ["xzf", `decap-cms-${VERSION}.tgz`, "package/dist"], { cwd: work });
  const dist = join(work, "package", "dist");
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  const files = readdirSync(dist).filter((name) => name.endsWith("decap-cms.js") || name === "cms.css");
  for (const name of files) copyFileSync(join(dist, name), join(target, name));
  writeFileSync(marker, `${INTEGRITY}\n`);
  console.log(`Vendored Decap CMS ${VERSION} (${files.length} files)`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
