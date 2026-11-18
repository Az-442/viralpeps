// Apply approved entity/payment claims to vendors.json → live TrustScore.
//
// Profile-review approval (in /admin) promotes a supplier's entity_type /
// payment_method claim into `entity_type_verified` / `payment_method_verified`
// on seller_profiles. This script reads those APPROVED values and writes them
// into src/data/vendors.json (the sync source-of-truth that getTrustScore
// reads), then commits + pushes so Vercel redeploys and the score goes live.
//
// Run locally after approving claims in /admin:
//   node scripts/apply-verified-entity.mjs
//
// Safe to run repeatedly: only vendors with approved-but-unapplied values change.
// Use --dry to preview without writing or pushing.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { createClient } from "@vercel/postgres";

const DRY = process.argv.includes("--dry");
const REPO = "/Users/time4you/viralpeps";
const VENDORS_PATH = `${REPO}/src/data/vendors.json`;

function loadConnStr() {
  const envPath = "/Users/time4you/.hermes/viralpeps/neon.env";
  const env = readFileSync(envPath, "utf8");
  const m = env.match(/POSTGRES_URL_NON_POOLING=(.+)/);
  if (!m) throw new Error("POSTGRES_URL_NON_POOLING not found in neon.env");
  return m[1].trim();
}

const client = createClient({ connectionString: loadConnStr() });
await client.connect();

const r = await client.query(`
  SELECT seller_slug, entity_type_verified, payment_method_verified
  FROM seller_profiles
  WHERE review_status = 'approved'
    AND (entity_type_verified IS NOT NULL OR payment_method_verified IS NOT NULL)
`);
const rows = r.rows;
await client.end();

if (rows.length === 0) {
  console.log("No approved entity/payment claims to apply.");
  process.exit(0);
}

const vendors = JSON.parse(readFileSync(VENDORS_PATH, "utf8"));
const changes = [];

for (const row of rows) {
  const v = vendors.find((x) => x.slug === row.seller_slug);
  if (!v) {
    console.log(`⚠️  ${row.seller_slug}: not found in vendors.json — skipping`);
    continue;
  }
  const before = { entityType: v.entityType ?? null, paymentMethod: v.paymentMethod ?? null };
  const after = {
    entityType: row.entity_type_verified ?? v.entityType ?? null,
    paymentMethod: row.payment_method_verified ?? v.paymentMethod ?? null,
  };
  if (before.entityType === after.entityType && before.paymentMethod === after.paymentMethod) {
    continue; // already applied
  }
  v.entityType = after.entityType ?? undefined;
  v.paymentMethod = after.paymentMethod ?? undefined;
  changes.push({
    slug: v.slug,
    before,
    after,
  });
}

if (changes.length === 0) {
  console.log("All approved claims already applied — no changes.");
  process.exit(0);
}

console.log(`Applying ${changes.length} verified entity claim(s):`);
for (const c of changes) {
  console.log(
    `  ${c.slug}: entity ${c.before.entityType ?? "—"} → ${c.after.entityType ?? "—"} · payment ${c.before.paymentMethod ?? "—"} → ${c.after.paymentMethod ?? "—"}`
  );
}

if (DRY) {
  console.log("\n--dry: not writing or pushing.");
  process.exit(0);
}

writeFileSync(VENDORS_PATH, JSON.stringify(vendors, null, 2) + "\n");

execSync(`git -C ${REPO} add src/data/vendors.json`, { stdio: "inherit" });
execSync(`git -C ${REPO} commit -m "Apply verified entity/payment flags to vendors.json"`, { stdio: "inherit" });
execSync(`git -C ${REPO} push origin main`, { stdio: "inherit" });

console.log("\nPushed. Vercel will redeploy and the TrustScore updates.");
