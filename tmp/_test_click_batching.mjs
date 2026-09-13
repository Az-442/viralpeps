#!/usr/bin/env node
/**
 * Verify the click-logger write-batching fix against the REAL compiled module.
 *
 * Proves: N rapid clicks must NOT produce N GitHub commits.
 *
 * Mocks global.fetch to count GitHub PUT (commit) calls — no real writes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COMPILED = path.join(ROOT, "tmp/compiled/click-logger.js");

// --- mock fetch and count PUTs --------------------------------------------
let puts = 0;
globalThis.fetch = async (url, opts = {}) => {
  const method = (opts.method || "GET").toUpperCase();
  const u = String(url);
  if (method === "PUT" && u.includes("contents/clicks.json")) {
    puts++;
    return new Response(JSON.stringify({ commit: { sha: "mock" } }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }
  if (method === "GET" && u.includes("contents/clicks.json")) {
    return new Response(
      JSON.stringify({ content: Buffer.from("[]").toString("base64"), sha: "abc123" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  throw new Error("unexpected fetch: " + method + " " + u);
};

// The compiled module reads process.env.GITHUB_TOKEN at import time.
process.env.GITHUB_TOKEN = "mock-token-for-test";

const mod = await import("file://" + COMPILED);

const N = 50;
for (let i = 0; i < N; i++) {
  await mod.logClick({
    type: "vendor-site",
    vendorSlug: "test-vendor",
    vendorName: "Test Vendor",
    compoundSlug: "bpc-157",
    destUrl: "https://example.com/x",
    refPage: "/vendors/test-vendor",
    visitorId: "visitor-1",
  });
}

const state = mod.clickBufferState();
console.log(`\n=== click-logger batching test ===`);
console.log(`  clicks fired     : ${N}`);
console.log(`  GitHub PUT calls : ${puts}`);
console.log(`  still buffered   : ${state.buffered}`);

// Desired: the FIRST click crosses the interval -> 1 flush. Remaining 49 buffer.
const ok = puts === 1 && state.buffered === N - 1;
console.log(`\n  RESULT: ${ok ? "PASS" : "FAIL"}`);
console.log(`  ${N} clicks -> ${puts} commit(s); ${state.buffered} rows waiting for the next flush window.`);
console.log(`  Old behaviour was ${N} commits for ${N} clicks (this is the fix).\n`);
process.exit(ok ? 0 : 1);
