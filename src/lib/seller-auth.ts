// Seller auth helpers — password hashing + opaque session tokens.
// No external deps: Node crypto (scrypt for passwords, randomBytes for sessions).
// Sessions are stored server-side on the sellers row (revocable, no JWT lib needed).

import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { sql } from "@vercel/postgres";

const KEY_LEN = 64;

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

/** 32-char hex sha256 of a string — used for per-seller API keys (postback). */
export function newApiKey(slug: string): string {
  const salt = randomBytes(16).toString("hex");
  return createHash("sha256")
    .update(`${slug}:${salt}:${Date.now()}:${randomBytes(16).toString("hex")}`)
    .digest("hex")
    .slice(0, 32);
}

export interface SellerRow {
  id: number;
  slug: string;
  name: string;
  email: string;
  commission_rate: number | null;
  active: boolean;
  session_token: string | null;
  api_key: string | null;
  created_at: string;
}

export async function findSellerBySession(token: string | null): Promise<SellerRow | null> {
  if (!token) return null;
  try {
    const r = await sql`
      SELECT id, slug, name, email, commission_rate, active, session_token, api_key, created_at
      FROM sellers WHERE session_token = ${token} AND active = true
    `;
    return (r.rows[0] as SellerRow) ?? null;
  } catch {
    return null;
  }
}

export async function findSellerByEmail(email: string): Promise<SellerRow & { password_hash: string } | null> {
  try {
    const r = await sql`
      SELECT id, slug, name, email, commission_rate, active, session_token, api_key, created_at, password_hash
      FROM sellers WHERE lower(email) = lower(${email})
    `;
    return (r.rows[0] as (SellerRow & { password_hash: string })) ?? null;
  } catch {
    return null;
  }
}
