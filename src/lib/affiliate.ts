// Affiliate conversions — server-side contract for supplier postbacks.
//
// Replaces the old /api/postback, which had four serious flaws:
//   1. ONE shared POSTBACK_SECRET across every supplier — one leak forged the
//      whole network's commission data.
//   2. It trusted a caller-supplied `order_value`, so commission was whatever
//      the supplier decided to declare.
//   3. A single insert only — no pending/paid/refund lifecycle, so refunds
//      over-invoiced and unpaid orders counted as sales.
//   4. Silently dropped anything it did not like. Suppliers cannot trust a
//      system that will not say why an order did not pay.
//
// The new contract, deliberately modelled on the best parts of the
// established supplier networks (see the private teardown notes):
//   • per-supplier token, stored hashed, never shared
//   • idempotent per order_id — a replayed postback UPDATES, never duplicates
//   • explicit lifecycle: pending → completed → refunded/cancelled/failed
//   • commission base computed from line items (ex shipping, inc tax)
//   • every ignored order returns a machine-readable `reason`
//   • "test": true validates and reports what WOULD happen, writes nothing

import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { sql } from "@vercel/postgres";

export const ATTRIBUTION_WINDOW_DAYS = 90;

export type ConversionStatus = "pending" | "completed" | "refunded" | "cancelled" | "failed";

export type IgnoreReason =
  | "not_referred"
  | "outside_attribution_window"
  | "repeat_not_commissionable"
  | "rejected"
  | "test_mode";

// ── tokens ────────────────────────────────────────────────────────────────

export function newServerToken(): string {
  // Prefixed so a leaked token is recognisable in logs and secret scanners.
  return `vps_${randomBytes(24).toString("hex")}`;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time compare of a presented token against a stored hash. */
export function tokenMatches(presented: string, storedHash: string): boolean {
  const a = Buffer.from(hashToken(presented), "hex");
  let b: Buffer;
  try {
    b = Buffer.from(storedHash, "hex");
  } catch {
    return false;
  }
  return a.length === b.length && timingSafeEqual(a, b);
}

// ── schema ────────────────────────────────────────────────────────────────

/**
 * Adds the columns the new contract needs. Idempotent and cheap, but only run
 * on the write path (postback) so read paths never pay for it.
 */
export async function ensureAffiliateSchema(): Promise<void> {
  await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS postback_token_hash text`;
  await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS postback_token_hint text`;
  await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS postback_connected_at timestamptz`;
  await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS postback_store_url text`;

  // Single-use install codes. Only the hash is stored, so a database dump
  // does not yield working codes. One live code per supplier at a time.
  await sql`
    CREATE TABLE IF NOT EXISTS affiliate_claim_codes (
      id               serial PRIMARY KEY,
      claim_code_hash  text NOT NULL UNIQUE,
      vendor_slug      text NOT NULL,
      expires_at       timestamptz NOT NULL,
      used_at          timestamptz,
      store_url        text,
      store_name       text,
      platform         text,
      plugin_version   text,
      used_ip          text,
      created_at       timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS claim_codes_vendor_idx ON affiliate_claim_codes (vendor_slug)`;
  await sql`CREATE INDEX IF NOT EXISTS claim_codes_expiry_idx ON affiliate_claim_codes (expires_at)`;

  // sales gains the lifecycle fields. Existing rows keep working: they get
  // status 'completed' by the default and were all reported as paid.
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'completed'`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS subtotal numeric(12,2)`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS refunded_amount numeric(12,2) NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'GBP'`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS customer_ref text`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS source text`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS occurred_at timestamptz`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS ignored_reason text`;
  await sql`ALTER TABLE sales ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now()`;

  // A conversion is identified by (supplier, their order id). The old table
  // had order_id uniquely ALONE — a global UNIQUE CONSTRAINT, which means two
  // different suppliers could never use the same order number. A constraint
  // is not a plain index: DROP INDEX fails with "constraint requires it", so
  // the constraint itself must go.
  await sql`ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_order_id_key`;
  await sql`DROP INDEX IF EXISTS sales_order_id_key`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS sales_vendor_order_idx ON sales (vendor_slug, order_id)`;
  await sql`CREATE INDEX IF NOT EXISTS sales_customer_ref_idx ON sales (vendor_slug, customer_ref)`;
  await sql`CREATE INDEX IF NOT EXISTS sales_status_idx ON sales (status)`;
}

// ── commission ────────────────────────────────────────────────────────────

export interface ConversionItem {
  sku?: string;
  name?: string;
  quantity?: number;
  price?: number;
}

/**
 * The amount commission is charged on.
 *
 * Built UP from line items rather than passed in, so shipping and order-level
 * fees are excluded by construction instead of by remembering to subtract
 * them. Tax IS included: commission is agreed on the price the customer paid.
 *
 * Falls back to `subtotal` when no line items were sent, so a minimal
 * integration still works. Returns null when neither is usable.
 */
export function commissionBase(
  items: ConversionItem[] | undefined,
  subtotal: unknown
): number | null {
  if (Array.isArray(items) && items.length > 0) {
    let total = 0;
    for (const it of items.slice(0, 100)) {
      const qty = Math.max(1, Number(it?.quantity ?? 1) || 1);
      const price = Number(it?.price);
      if (!Number.isFinite(price) || price < 0) continue;
      total += price * qty;
    }
    if (total > 0) return Math.round(total * 100) / 100;
  }
  const s = Number(subtotal);
  if (Number.isFinite(s) && s > 0) return Math.round(s * 100) / 100;
  return null;
}

/** Commission owed for a conversion, in pounds, 2dp. */
export function commissionFor(base: number, pct: number, refunded = 0): number {
  const net = Math.max(0, base - Math.max(0, refunded));
  return Math.round(net * pct) / 100;
}

// ── date window ───────────────────────────────────────────────────────────

export function withinAttributionWindow(
  clickedAt: string | Date | null | undefined,
  windowDays = ATTRIBUTION_WINDOW_DAYS
): boolean {
  if (!clickedAt) return false;
  const t = new Date(clickedAt).getTime();
  if (isNaN(t)) return false;
  return Date.now() - t <= windowDays * 24 * 3600 * 1000;
}
