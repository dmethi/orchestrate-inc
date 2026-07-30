import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

async function listTree(path) {
  try {
    return await readdir(new URL(path, import.meta.url), { recursive: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

const [sourceHtml, builtHtml, css, publicEntries, logoEntries, distEntries, vercelConfig] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
  readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  listTree("../public"),
  listTree("../logo"),
  listTree("../dist"),
  readFile(new URL("../vercel.json", import.meta.url), "utf8").then(JSON.parse),
]);

for (const source of [sourceHtml, builtHtml, css]) {
  assert.doesNotMatch(source, /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com/i);
}

assert.doesNotMatch(css, /@font-face|Satoshi/i);
assert.match(css, /--font-body: system-ui,/);
assert.ok(
  [...publicEntries, ...logoEntries, ...distEntries].every((entry) => !/\.(?:otf|ttf|woff2?)$/i.test(entry)),
  "The public, logo, and build trees must not contain font binaries",
);

const allResponses = vercelConfig.headers.find(({ source }) => source === "/(.*)");
assert.ok(allResponses, "Vercel must apply security headers to every response");

const headers = new Map(allResponses.headers.map(({ key, value }) => [key, value]));
assert.match(headers.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
assert.equal(headers.get("Referrer-Policy"), "strict-origin-when-cross-origin");
assert.match(headers.get("Permissions-Policy") ?? "", /camera=\(\)/);
assert.equal(headers.get("X-Content-Type-Options"), "nosniff");

console.log("Static font privacy and Vercel security-header configuration verified.");
