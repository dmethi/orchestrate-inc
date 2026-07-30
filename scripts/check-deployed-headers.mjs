import assert from "node:assert/strict";

const target = process.argv[2];
assert.ok(target, "Pass the deployed site URL to check");

const url = new URL(target);
assert.equal(url.protocol, "https:", "The deployed header check requires HTTPS");

const response = await fetch(url, { redirect: "error" });
assert.ok(response.ok, `Expected ${url.origin} to return 2xx, got ${response.status}`);

const contentSecurityPolicy = response.headers.get("content-security-policy") ?? "";
assert.match(contentSecurityPolicy, /frame-ancestors 'none'/);
assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
assert.equal(response.headers.get("x-content-type-options"), "nosniff");

console.log(`Deployed security headers verified at ${url.origin}.`);
