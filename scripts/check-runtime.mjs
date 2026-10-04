import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
const base = "http://127.0.0.1:3100";
const server = spawn(process.execPath, ["scripts/serve-static.mjs"], { stdio: "inherit", windowsHide: true, env: { ...process.env, PORT: "3100" } });
let failure;
server.on("error", (error) => { failure = error; });
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (failure) throw failure;
    if (server.exitCode !== null) throw new Error("Verification server exited before becoming ready");
    try {
      ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok;
    } catch { /* Wait for startup only; never swallow verification failures. */ }
    if (ready) break;
    await setTimeout(500);
  }
  if (!ready) throw new Error("Verification server startup timed out");
  process.argv[2] = base;
  await import("./verify-local.mjs");
} finally {
  server.kill();
}
