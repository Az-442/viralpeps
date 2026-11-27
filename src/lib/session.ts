// Durable sessions for BOTH portals (seller + owner).
//
// Why this exists: the original implementation stored the session token on the
// sellers/owners row and *overwrote* it on every login. That meant any second
// login (another tab, another device, or the assistant signing in to verify a
// deploy) silently invalidated the cookie already in the browser, so the user
// got logged out constantly. Rotating the token also happened on password
// reset, which is correct — but a plain login must never evict a live session.
//
// Sessions now live in their own table, so:
//   • each login ADDS a session instead of replacing one
//   • a password reset / explicit logout can revoke every session for that user
//   • a deploy or re-login elsewhere leaves the existing cookie working

import { randomBytes } from "crypto";
import { sql } from "@vercel/postgres";

export type SessionScope = "seller" | "owner";

const TTL_DAYS: Record<SessionScope, number> = {
  seller: 30,
  owner: 30,
};

export function newToken(): string {
  return randomBytes(32).toString("hex");
}

export async function ensureSessionsTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      token       text PRIMARY KEY,
      scope       text NOT NULL,
      subject_id  integer NOT NULL,
      created_at  timestamptz NOT NULL DEFAULT now(),
      expires_at  timestamptz NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS auth_sessions_subject_idx ON auth_sessions (scope, subject_id)`;
}

/** Creates a session row and returns the opaque token for the cookie. */
export async function createSession(scope: SessionScope, subjectId: number): Promise<string> {
  await ensureSessionsTable();
  const token = newToken();
  await sql`
    INSERT INTO auth_sessions (token, scope, subject_id, expires_at)
    VALUES (${token}, ${scope}, ${subjectId}, now() + (${TTL_DAYS[scope]} || ' days')::interval)
  `;
  return token;
}

/** Resolves a token to its subject id, or null when missing/expired. */
export async function resolveSession(scope: SessionScope, token: string | null): Promise<number | null> {
  if (!token) return null;
  try {
    await ensureSessionsTable();
    const r = await sql`
      SELECT subject_id FROM auth_sessions
      WHERE token = ${token} AND scope = ${scope} AND expires_at > now()
    `;
    const row = r.rows[0] as { subject_id: number } | undefined;
    return row ? Number(row.subject_id) : null;
  } catch {
    return null;
  }
}

/** Revokes ONE session (logout of the current browser only). */
export async function revokeSession(token: string | null): Promise<void> {
  if (!token) return;
  try {
    await sql`DELETE FROM auth_sessions WHERE token = ${token}`;
  } catch {
    /* no-op */
  }
}

/** Revokes EVERY session for a subject — used on password reset / suspension. */
export async function revokeAllSessions(scope: SessionScope, subjectId: number): Promise<void> {
  try {
    await sql`DELETE FROM auth_sessions WHERE scope = ${scope} AND subject_id = ${subjectId}`;
  } catch {
    /* no-op */
  }
}

export const SESSION_MAX_AGE: Record<SessionScope, number> = {
  seller: 60 * 60 * 24 * TTL_DAYS.seller,
  owner: 60 * 60 * 24 * TTL_DAYS.owner,
};
