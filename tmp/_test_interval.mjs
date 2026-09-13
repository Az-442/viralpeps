// Verify a second burst INSIDE the interval produces no extra commit,
// and that flushClicks() forces a write.
let puts = 0;
globalThis.fetch = async (url, opts = {}) => {
  const m = (opts.method || "GET").toUpperCase();
  if (m === "PUT") {
    puts++;
    return new Response(JSON.stringify({ commit: { sha: "m" } }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ content: Buffer.from("[]").toString("base64"), sha: "a" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const KEY = ["GITHUB", "TOKEN"].join("_");
Object.assign(process.env, { [KEY]: "mock-token-for-test" });

const mod = await import("file:///Users/time4you/viralpeps/tmp/compiled/click-logger.js");
const click = () => mod.logClick({ type: "vendor-site", vendorSlug: "v" });

for (let i = 0; i < 10; i++) await click();   // burst 1 -> 1 flush
const p1 = puts;
for (let i = 0; i < 10; i++) await click();   // burst 2, inside interval -> 0 more
const p2 = puts;
await mod.flushClicks();                       // forced -> 1 more
const p3 = puts;

console.log(`\n  burst1 (10 clicks): ${p1} commits`);
console.log(`  burst2 (10 clicks, same window): ${p2 - p1} commits  (expect 0)`);
console.log(`  forced flushClicks(): ${p3 - p2} commit  (expect 1)`);
const ok = p1 === 1 && (p2 - p1) === 0 && (p3 - p2) === 1;
console.log(`\n  RESULT: ${ok ? "PASS" : "FAIL"}\n`);
process.exit(ok ? 0 : 1);
