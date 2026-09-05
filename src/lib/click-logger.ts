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

const REPO = "Az-442/viralpeps";
const LIST_PATH = "clicks.json";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const MIN_INTERVAL_MS = 1200; // guard against rapid duplicate commits

export type ClickType = "vendor-site" | "product" | "vendor-profile";

/** In-memory row supplied by callers (no timestamp — added at write time). */
export interface ClickRow {
  type: ClickType;
  vendorSlug: string;
  vendorName?: string;
  compoundSlug?: string;
  destUrl?: string; // exact URL left to (for direct /go/{vendor} and /go/{vendor}/{compound})
  refPage?: string; // page the click happened on (referrer)
}

/** Row as persisted to clicks.json (timestamp prepended). */
export interface StoredClickRow extends ClickRow {
  ts: string; // ISO timestamp
}

let lastPushAt = 0;

async function getCurrentFile(): Promise<{ content: string; sha?: string } | { ok: false; error: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}`, {
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

/**
 * Append one click row to clicks.json. Fire-and-forget: returns a boolean but
 * never throws. Callers MUST treat the return as advisory only (logging must
 * never break the redirect it accompanies).
 */
export async function logClick(row: ClickRow): Promise<boolean> {
  try {
    if (!row || !row.vendorSlug) return false;
    if (!GITHUB_TOKEN) {
      // Fail soft — no token set (e.g. local dev). Redirect must still work.
      console.warn("[click-logger] GITHUB_TOKEN not set — click not persisted", row.vendorSlug);
      return false;
    }

    const file = await getCurrentFile();
    if (!("content" in file)) {
      console.warn("[click-logger] could not read clicks.json", file.error);
      return false;
    }

    const rows = parseRows(file.content);
    rows.push({ ts: new Date().toISOString(), ...row });

    const newContent = `${JSON.stringify(rows, null, 2)}\n`;
    const body: Record<string, unknown> = {
      message: `Log outbound click: ${row.vendorSlug}${row.compoundSlug ? "/" + row.compoundSlug : ""} [bot]`,
      content: Buffer.from(newContent).toString("base64"),
    };
    if (file.sha) body.sha = file.sha;

    const now = Date.now();
    if (now - lastPushAt < MIN_INTERVAL_MS) {
      return true; // rate-guarded but treated as accepted
    }
    lastPushAt = now;

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
      // 409 = concurrent update — the click is effectively captured by another write
      console.warn("[click-logger] push failed", res.status);
      // Optionally retry once after refetching:
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[click-logger] unexpected error — click NOT persisted", err);
    return false;
  }
}
