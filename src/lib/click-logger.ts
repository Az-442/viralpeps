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
// WRITE-BATCHING + BUILD-IGNORE (14 Sep 2026) — deploy-quota exhaustion FIXED
// ---------------------------------------------------------------------------
// HISTORY: the original implementation committed ONE GitHub commit PER CLICK to
// the `clicks-data` branch. The in-memory throttle (MIN_INTERVAL_MS) only ever
// throttled within a single warm serverless instance, so N concurrent instances
// produced N commits — observed at ~148 commits/day, well over Vercel's
// free-tier 100 deploys/day cap. That starved `main` of deploy slots and took
// supplier pages down on 12 Sep 2026 (and again 14 Sep 2026).
//
// FIX (two layers, both applied):
//  1. BUILD-IGNORE (primary) — vercel.json sets `ignoreCommand` to
//     scripts/ignore-clicks-data.sh, which exits 0 for the `clicks-data`
//     branch so Vercel SKIPS the build entirely. Commits to that branch no
//     longer consume any deploy quota. This is what actually stops the leak.
//  2. BATCHING (secondary) — clicks accumulate in an in-process buffer and
//     flush at most once per FLUSH_INTERVAL_MS (30 min), cutting the git
//     commit rate to <=2/hour/instance.
//
// TRADE-OFF: serverless instances are ephemeral, so a click buffered in an
// instance recycled before its flush window elapses is lost. Redirect traffic
// keeps instances warm and the buffer flushes on any later request past the
// interval, so loss is small — and strictly better than saturating the quota.
// Clicks are analytics, not billing: the redirect itself is never affected.
//
// DURABLE UPGRADE (not implemented): move clicks off git into Vercel KV /
// Upstash Redis. That removes the commit-per-write pattern completely. The
// two layers above are sufficient to protect the deploy quota meanwhile.

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
//
// TUNED 14 Sep 2026: raised 5min -> 30min. Even with the per-instance buffer,
// N concurrent serverless instances still each flushed every 5 minutes, which
// held the commit rate at ~70/day on `clicks-data` — enough to matter against
// Vercel's free-tier 100 deploys/day cap.
//
// The PRIMARY fix is vercel.json -> ignoreCommand (scripts/ignore-clicks-data.sh),
// which stops Vercel from building `clicks-data` at all. This interval is the
// belt-and-braces second layer: it caps the git commit rate regardless of how
// many instances are warm, so the branch can never run away again.
//
// 30 minutes -> at most 2 commits/hour/instance.
const FLUSH_INTERVAL_MS = 30 * 60 * 1000;
// Hard cap on buffered rows so a long-lived instance cannot grow unbounded
// between flushes. Oldest rows are dropped first if exceeded.
const MAX_BUFFER_ROWS = 500;

export type ClickType = "vendor-site" | "product" | "vendor-profile";

/** In-memory row supplied by callers (no timestamp — added at write time). */
export interface ClickRow {
  type: ClickType;
  vendorSlug: string;
  vendorName?: string;
  compoundSlug?: string;
  destUrl?: string; // exact URL left to (for direct /go/{vendor} and /go/{vendor}/{compound})
  refPage?: string; // page the click happened on (referrer)
  visitorId?: string; // anonymous, one-way hash — lets us count unique humans
}

/** Row as persisted to clicks.json (timestamp prepended). */
export interface StoredClickRow extends ClickRow {
  ts: string; // ISO timestamp
}

// --- module-scoped buffer (lives for the life of a warm serverless instance) --
let buffer: StoredClickRow[] = [];
let lastFlushAt = 0;
let flushing = false;

async function getCurrentFile(): Promise<{ content: string; sha?: string } | { ok: false; error: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}?ref=${DATA_BRANCH}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) return { content: "[]" };
  if (!res.ok) return { ok: false, error: `clicks read failed (${res.status})` };
  const data = await res.json();
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  return { content, sha: data.sha };
}

function parseRows(content: string): StoredClickRow[] {
  try {
    const arr = JSON.parse(content);
    if (Array.isArray(arr)) return arr;
  } catch {
    /* fall through */
  }
  return [];
}

/** Read-modify-write the buffered rows into clicks.json. Never throws. */
async function flush(): Promise<boolean> {
  if (!GITHUB_TOKEN || buffer.length === 0 || flushing) return false;
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
    const body: Record<string, unknown> = {
      message:
        `Log outbound clicks: ${batch.length} event${batch.length === 1 ? "" : "s"} ` +
        `(${new Date().toISOString()}) [bot]`,
      content: Buffer.from(newContent).toString("base64"),
      branch: DATA_BRANCH,
    };
    if (file.sha) body.sha = file.sha;

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
  } catch (err) {
    buffer = batch.concat(buffer);
    console.warn("[click-logger] unexpected flush error — batch re-buffered", err);
    return false;
  } finally {
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
export async function logClick(row: ClickRow): Promise<boolean> {
  try {
    if (!row || !row.vendorSlug) return false;
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
  } catch (err) {
    console.warn("[click-logger] unexpected error — click NOT persisted", err);
    return false;
  }
}

/**
 * Force a flush of any buffered clicks. Safe to call anytime (no-op when the
 * buffer is empty). Exposed for scripts/tests and for a future cron sweep.
 */
export async function flushClicks(): Promise<boolean> {
  return flush();
}

/** Introspection for diagnostics — never used on the redirect hot path. */
export function clickBufferState(): { buffered: number; lastFlushAt: number } {
  return { buffered: buffer.length, lastFlushAt };
}
