// Owner (admin) auth — separate from seller auth on purpose.
// An owner account is NOT a seller: it never appears in the sellers table,
// so nothing in the seller UI, affiliate logic or badge issuance can collide
// with it. Sessions are server-side rows (revocable) keyed by an httpOnly
// cookie scoped to /admin so it is never sent to seller or public routes.

import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { sql } from "@vercel/postgres";

const KEY_LEN = 64;

export const OWNER_COOKIE = "vp_owner_session";
export const OWNER_SESSION_DAYS = 7;

export interface OwnerRow {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
}

/** CREATE TABLE IF NOT EXISTS — safe to call on every request, cheap. */
export async function ensureOwnerTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS owners (
      id            serial PRIMARY KEY,
      email         text UNIQUE NOT NULL,
      name          text NOT NULL DEFAULT 'Owner',
      password_hash text NOT NULL,
      active        boolean NOT NULL DEFAULT true,
      session_token text,
      session_expires timestamptz,
      last_login_at timestamptz,
      created_at    timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS owners_session_idx ON owners (session_token)`;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const test = scryptSync(password, salt, KEY_LEN);
    const ref = Buffer.from(hash, "hex");
    return test.length === ref.length && timingSafeEqual(test, ref);
  } catch {
    return false;
  }
}

export function newSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export async function countOwners(): Promise<number> {
  try {
    await ensureOwnerTable();
    const r = await sql`SELECT count(*)::int AS n FROM owners`;
    return (r.rows[0] as { n: number })?.n ?? 0;
  } catch {
    return 0;
  }
}

/** Returns the owner for a session token, or null. Also enforces expiry. */
export async function findOwnerBySession(token: string | null): Promise<OwnerRow | null> {
  if (!token) return null;
  try {
    await ensureOwnerTable();
    const r = await sql`
      SELECT id, email, name, password_hash, active, created_at, last_login_at
      FROM owners
      WHERE session_token = ${token}
        AND active = true
        AND session_expires IS NOT NULL
        AND session_expires > now()
    `;
    return (r.rows[0] as OwnerRow) ?? null;
  } catch {
    return null;
  }
}

export async function findOwnerByEmail(email: string): Promise<OwnerRow | null> {
  try {
    await ensureOwnerTable();
    const r = await sql`
      SELECT id, email, name, password_hash, active, created_at, last_login_at
      FROM owners WHERE lower(email) = lower(${email})
    `;
    return (r.rows[0] as OwnerRow) ?? null;
  } catch {
    return null;
  }
}

/** Reads the owner cookie off any Request-ish object and resolves the session. */
export async function getOwnerFromRequest(req: {
  cookies: { get(name: string): { value: string } | undefined };
}): Promise<OwnerRow | null> {
  const token = req.cookies.get(OWNER_COOKIE)?.value ?? null;
  return findOwnerBySession(token);
}

/** 64-char hex digest of the owner id — used to namespace admin audit rows. */
export function ownerFingerprint(id: number): string {
  return createHash("sha256").update(`owner:${id}`).digest("hex").slice(0, 16);
}
