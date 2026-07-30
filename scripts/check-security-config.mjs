import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [sourceHtml, builtHtml, css, vercelConfig] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
  readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  readFile(new URL("../vercel.json", import.meta.url), "utf8").then(JSON.parse),
]);

for (const html of [sourceHtml, builtHtml]) {
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com|api\.fontshare\.com/);
}

assert.match(css, /url\("\/fonts\/satoshi-400\.ttf"\)/);
assert.match(css, /url\("\/fonts\/satoshi-700\.ttf"\)/);

const allResponses = vercelConfig.headers.find(({ source }) => source === "/(.*)");
assert.ok(allResponses, "Vercel must apply security headers to every response");

const headers = new Map(allResponses.headers.map(({ key, value }) => [key, value]));
assert.match(headers.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
assert.equal(headers.get("Referrer-Policy"), "strict-origin-when-cross-origin");
assert.match(headers.get("Permissions-Policy") ?? "", /camera=\(\)/);
assert.equal(headers.get("X-Content-Type-Options"), "nosniff");

console.log("Static font privacy and Vercel security-header configuration verified.");
