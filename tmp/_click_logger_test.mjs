// Shared outbound-click logger for ViralPeps.
//
// Vercel serverless has no durable disk, so clicks are persisted by committing
// to the site's own GitHub repo (Az-442/viralpeps) — the same self-hosted
// pattern as /api/subscribe/route.ts. Every offsite click appends one row to
// clicks.json in the repo> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}?ref=${DATA_BRANCH}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) return { content: "[]" };
  if (!res.ok) return { ok: false, error: `clicks read failed (${res.status})` };
  const data = await res.json();
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  return { content, sha: data.sha };
}

function parseRows(content: string): [] {
  try {
    const arr = JSON.parse(content);
    if (Array.isArray(arr)) return arr;
  } catch {
    /* fall through */
  }
  return [];
}

/** Read-modify-write the buffered rows into clicks.json. Never throws. */
async function flush(): Promise {
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
export async function logClick(row) {
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
export async function flushClicks(): Promise {
  return flush();
}

/** Introspection for diagnostics — never used on the redirect hot path. */
export function clickBufferState(): { buffered: number; lastFlushAt: number } {
  return { buffered: buffer.length, lastFlushAt };
}
