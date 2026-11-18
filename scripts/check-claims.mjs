// Watch pending listing claims + profile reviews and emit new ones (for Telegram).
// Prints NOTHING when there is nothing new, so the cron stays silent.
// Queries VP Postgres via @vercel/postgres + ~/.hermes/viralpeps/neon.env.

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { createClient } from "@vercel/postgres";

const STATE = "/Users/time4you/.hermes/viralpeps/.review-alert-seen.json";

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE, "utf8"));
  } catch {
    return {};
  }
}

function saveState(s) {
  mkdirSync("/Users/time4you/.hermes/viralpeps", { recursive: true });
  writeFileSync(STATE, JSON.stringify(s));
}

try {
  const env = readFileSync("/Users/time4you/.hermes/viralpeps/neon.env", "utf8");
  const m = env.match(/POSTGRES_URL_NON_POOLING=(.+)/);
  if (!m) throw new Error("POSTGRES_URL_NON_POOLING not found in neon.env");
  const client = createClient({ connectionString: m[1].trim() });
  await client.connect();

  const state = loadState();

  // New pending listing claims (by id > last seen).
  const lastClaimId = Number(state.lastClaimId || 0);
  const claims = await client.query(
    `SELECT id, slug, name, email, email_domain_match, created_at
     FROM listing_claims
     WHERE status = 'pending' AND id > $1
     ORDER BY id ASC`,
    [lastClaimId]
  );

  // New pending profile reviews (entity/payment claims by updated_at).
  const lastReviewAt = state.lastReviewAt || "1970-01-01T00:00:00Z";
  const reviews = await client.query(
    `SELECT p.seller_slug AS slug, s.name, p.entity_type, p.payment_method, p.updated_at
     FROM seller_profiles p JOIN sellers s ON s.slug = p.seller_slug
     WHERE p.review_status = 'pending' AND p.updated_at > $1
     ORDER BY p.updated_at ASC`,
    [lastReviewAt]
  );

  const lines = [];
  for (const c of claims.rows) {
    lines.push("🏷️ NEW LISTING CLAIM");
    lines.push(`Listing: ${c.name} (${c.slug})`);
    lines.push(`Email: ${c.email}`);
    lines.push(`Domain match: ${c.email_domain_match ? "✓" : "✗ (verify manually)"}`);
    lines.push(`At: ${new Date(c.created_at).toISOString().replace("T", " ").slice(0, 16)} UTC`);
    lines.push("");
  }
  for (const r of reviews.rows) {
    lines.push("🛡️ NEW PROFILE REVIEW");
    lines.push(`Supplier: ${r.name} (${r.slug})`);
    lines.push(`Claimed entity: ${r.entity_type || "—"} · payment: ${r.payment_method || "—"}`);
    lines.push(`At: ${new Date(r.updated_at).toISOString().replace("T", " ").slice(0, 16)} UTC`);
    lines.push("");
  }

  if (lines.length > 0) {
    lines.unshift("ViralPeps — needs your approval in /admin");
    console.log(lines.join("\n"));
  }

  // Advance the seen-cursors only if we printed (so a transient failure doesn't skip alerts).
  if (claims.rows.length > 0) {
    state.lastClaimId = Math.max(...claims.rows.map((r) => Number(r.id)));
  }
  if (reviews.rows.length > 0) {
    state.lastReviewAt = reviews.rows[reviews.rows.length - 1].updated_at.toISOString
      ? new Date(reviews.rows[reviews.rows.length - 1].updated_at).toISOString()
      : String(reviews.rows[reviews.rows.length - 1].updated_at);
  }
  saveState(state);

  await client.end();
} catch (err) {
  console.error("❌ review-alert check FAILED:", err?.message || err);
  process.exit(1);
}
