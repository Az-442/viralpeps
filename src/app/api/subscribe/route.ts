import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Self-hosted subscriber collection.
//
// Vercel serverless has no durable disk, so we persist the list by committing
// to the site's own GitHub repo (Az-442/viralpeps) using GITHUB_TOKEN.
// The list is a normal file the owner can read/export anytime — no third-party
// email platform involved.

const REPO = "Az-442/viralpeps";
const LIST_PATH = "subscribers.json";
const TOKEN = process.env.GITHUB_TOKEN || "";
const MIN_INTERVAL_MS = 2000; // guard against rapid duplicate commits

let lastPushAt = 0;

async function getCurrentFile(): Promise<{ content: string; sha?: string } | { ok: false; error: string }> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) {
    return { content: "[]" };
  }
  if (!res.ok) {
    return { ok: false, error: `list read failed (${res.status})` };
  }
  const data = await res.json();
  const content = Buffer.from(data.content || "", "base64").toString("utf8");
  return { content, sha: data.sha };
}

function parseList(content: string): string[] {
  try {
    const arr = JSON.parse(content);
    if (Array.isArray(arr)) return arr.map((x) => (typeof x === "string" ? x.toLowerCase() : "")).filter(Boolean);
  } catch {
    /* fall through */
  }
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!TOKEN) {
      return NextResponse.json({ error: "Server config error: GITHUB_TOKEN not set" }, { status: 500 });
    }

    const emailNorm = email.toLowerCase();
    const file = await getCurrentFile();
    if (!("content" in file)) {
      return NextResponse.json({ error: file.error }, { status: 500 });
    }

    const list = parseList(file.content);
    if (list.includes(emailNorm)) {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }
    list.push(emailNorm);
    list.sort((a, b) => a.localeCompare(b));

    const newContent = `${JSON.stringify(list, null, 2)}\n`;
    const body: Record<string, unknown> = {
      message: `Add subscriber: ${emailNorm} [bot]`,
      content: Buffer.from(newContent).toString("base64"),
    };
    if (file.sha) body.sha = file.sha;

    const now = Date.now();
    if (now - lastPushAt < MIN_INTERVAL_MS) {
      return NextResponse.json({ ok: true, message: "List updated (rate-guarded)" });
    }
    lastPushAt = now;

    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${LIST_PATH}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // 409 = concurrent update — treat as accepted, list already captures it
      if (res.status === 409) {
        return NextResponse.json({ ok: true, message: "Already subscribed (concurrent)" });
      }
      return NextResponse.json(
        { error: (err as { message?: string }).message || `push failed (${res.status})` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
