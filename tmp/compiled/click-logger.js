// Shared outbound-click logger for ViralPeps.
//
// Vercel serverless has no durable disk, so clicks are persisted by committing
// to the site's own GitHub repo (Az-442/viralpeps) — the same self-hosted
// pattern as /api/subscribe/route.ts. Every offsite click appends one row to
// clicks.json in the repo: { ts, type, vendorSlug, vendorName, compoundSlug,
// destUrl, refPage }. From this we can report clicks per supplier and per
// supplier-product, and see the exact destination of every outbound click.
//
// The logger is deliberately fire-and-forget: wrapped in try/catch so a log
// write failure NEVER blocks or slows the redirect it accompanies.
//
// ---------------------------------------------------------------------------
// WRITE-BATCHING (13 Sep 2026) — fixes the Vercel deploy-quota exhaustion
// ---------------------------------------------------------------------------
// HISTORY: the original implementation committed ONE GitHub commit PER CLICK to
// the `clicks-data` branch. The in-memory throttle (MIN_INTERVAL_MS) only ever
// throttled within a single warm serverless instance, so N concurrent instances
// produced N commits — observed at ~148 commits/day, well over Vercel's
// free-tier 100 deploys/day cap. That starved `main` of deploy slots and took
// supplier pages down on 12 Sep 2026.
//
// FIX: clicks are now accumulated in an in-process buffer and flushed to GitHub
// at most once per FLUSH_INTERVAL_MS (default 5 minutes), and only when the
// buffer is non-empty. Worst case with a handful of concurrent instances is a
// small number of commits per 5-minute window instead of one per click.
//
// TRADE-OFF: because serverless instances are ephemeral, a click buffered in an
// instance that is then frozen/recycled before its flush window elapses will be
// lost. In practice URL-redirect traffic keeps instances warm and the buffer is
// flushed on every request that crosses the interval, so loss is minimal — and
// it is strictly better than saturating the deploy quota. Clicks are analytics,
// not billing: the redirect itself is never affected.
//
// DURABLE FIX (recommended, not yet implemented): move click events off git
// entirely into a KV/DB store (Vercel KV / Upstash Redis). That removes the
// commit-per-write pattern completely. The buffer below is a safe interim.
const REPO = "Az-442/viralpeps";
const LIST_PATH = "clicks.json";
// Data branch: clicks are committed here, NEVER to main. Vercel only builds
// from main, so writing to a separate branch stops every outbound click from
// triggering a production deploy (which was burning the daily deploy quota).
// Vercel MUST also be told to ignore this branch (Settings -> Git -> Ignored
// Build Step), otherwise these commits still consume Preview deploy quota.
const DATA_BRANCH = "clicks-data";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
// Minimum wall-clock gap between GitHub flushes, per warm instance.
// 5 minutes -> at most 12 commits/hour/instance instead of ~6/minute.
const FLUSH_INTERVAL_MS = 5 * 60 * 1000;
// Hard cap on buffered rows so a long-lived instance cannot grow unbounded
// between flushes. Oldest rows are dropped first if exceeded.
const MAX_BUFFER_ROWS = 500;
// --- module-scoped buffer (lives for the life of a warm serverless instance) --
let buffer = [];
let lastFlushAt = 0;
let flushing = false;
async function getCurrentFile() {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}?ref=${DATA_BRANCH}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
    });
    if (res.status === 404)
        return { content: "[]" };
    if (!res.ok)
        return { ok: false, error: `clicks read failed (${res.status})` };
    const data = await res.json();
    const content = Buffer.from(data.content || "", "base64").toString("utf8");
    return { content, sha: data.sha };
}
function parseRows(content) {
    try {
        const arr = JSON.parse(content);
        if (Array.isArray(arr))
            return arr;
    }
    catch {
        /* fall through */
    }
    return [];
}
/** Read-modify-write the buffered rows into clicks.json. Never throws. */
async function flush() {
    if (!GITHUB_TOKEN || buffer.length === 0 || flushing)
        return false;
    flushing = true;
    const batch = buffer;
    buffer = [];
    try {
        const file = await getCurrentFile();
        if (!("content" in file)) {
            // Put the batch back so it can be retried on the next interval.
            buffer = batch.concat(buffer);
            console.warn("[click-logger] could not read clicks.json", file.error);
            return false;
        }
        const rows = parseRows(file.content);
        rows.push(...batch);
        const newContent = `${JSON.stringify(rows, null, 2)}\n`;
        const body = {
            message: `Log outbound clicks: ${batch.length} event${batch.length === 1 ? "" : "s"} ` +
                `(${new Date().toISOString()}) [bot]`,
            content: Buffer.from(newContent).toString("base64"),
            branch: DATA_BRANCH,
        };
        if (file.sha)
            body.sha = file.sha;
        const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!res.ok && res.status !== 409) {
            // 409 = concurrent update — another writer already moved the branch.
            // Re-buffer so the batch is not silently lost.
            buffer = batch.concat(buffer);
            console.warn("[click-logger] push failed", res.status);
            return false;
        }
        lastFlushAt = Date.now();
        return true;
    }
    catch (err) {
        buffer = batch.concat(buffer);
        console.warn("[click-logger] unexpected flush error — batch re-buffered", err);
        return false;
    }
    finally {
        flushing = false;
    }
}
/**
 * Record one outbound click into the in-process buffer, and flush to GitHub at
 * most once per FLUSH_INTERVAL_MS. Fire-and-forget: never throws. Callers MUST
 * treat the return as advisory only (logging must never break the redirect).
 *
 * Returns true when the click was accepted into the buffer (the normal case),
 * false only when there is no token configured or the row is invalid.
 */
export async function logClick(row) {
    try {
        if (!row || !row.vendorSlug)
            return false;
        if (!GITHUB_TOKEN) {
            // Fail soft — no token set (e.g. local dev). Redirect must still work.
            console.warn("[click-logger] GITHUB_TOKEN not set — click not persisted", row.vendorSlug);
            return false;
        }
        buffer.push({ ts: new Date().toISOString(), ...row });
        if (buffer.length > MAX_BUFFER_ROWS) {
            buffer = buffer.slice(-MAX_BUFFER_ROWS);
        }
        // Only pay the network round-trip once the interval has elapsed.
        if (Date.now() - lastFlushAt >= FLUSH_INTERVAL_MS) {
            await flush();
        }
        return true;
    }
    catch (err) {
        console.warn("[click-logger] unexpected error — click NOT persisted", err);
        return false;
    }
}
/**
 * Force a flush of any buffered clicks. Safe to call anytime (no-op when the
 * buffer is empty). Exposed for scripts/tests and for a future cron sweep.
 */
export async function flushClicks() {
    return flush();
}
/** Introspection for diagnostics — never used on the redirect hot path. */
export function clickBufferState() {
    return { buffered: buffer.length, lastFlushAt };
}
