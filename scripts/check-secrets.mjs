import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([".git", ".next", ".tools", "node_modules", "out", ".migration"]);
const ignoredFiles = new Set(["package-lock.json"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".css", ".html", ".txt", ".example"]);
const patterns = [
  { name: "GitHub fine-grained token", regex: /github_pat_[A-Za-z0-9_]{40,}/ },
  { name: "Supabase secret key", regex: /sb_secret_[A-Za-z0-9_-]{20,}/ },
  { name: "GitHub token", regex: /gh[pousr]_[A-Za-z0-9_]{30,}/ },
  { name: "Private key", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
];
const findings = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    if (ignoredFiles.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (textExtensions.has(path.extname(entry.name)) || entry.name.startsWith(".env")) {
      const content = await fs.readFile(fullPath, "utf8");
      for (const pattern of patterns) if (pattern.regex.test(content)) findings.push(`${pattern.name}: ${path.relative(root, fullPath)}`);
    }
  }
}

await walk(root);
if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("Nenhum padrão conhecido de segredo foi encontrado.");
