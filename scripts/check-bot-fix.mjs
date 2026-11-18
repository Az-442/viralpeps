import { readFileSync } from "fs";
import { createClient } from "@vercel/postgres";

// Self-contained bot-fix verification. Reads the DB connection string from the
// local neon.env (chmod 600), queries clicks since the referrer-path fix went
// live, and prints a complete report to stdout.

const CUTOFF = "2026-11-17 17:00:00+00"; // referrer fix (0a2991e) went READY 16:57 UTC

function fmt(n) {
  return n.toLocaleString("en-GB");
}

try {
  const env = readFileSync("/Users/time4you/.hermes/viralpeps/neon.env", "utf8");
  const m = env.match(/POSTGRES_URL_NON_POOLING=(.+)/);
  if (!m) throw new Error("POSTGRES_URL_NON_POOLING not found in neon.env");
  const client = createClient({ connectionString: m[1].trim() });
  await client.connect();

  const totals = await client.query(
    `SELECT count(*)::int AS n, count(DISTINCT vendor_slug)::int AS vendors, count(DISTINCT visitor_id)::int AS visitors FROM clicks WHERE created_at >= $1`,
    [CUTOFF]
  );

  const bots = await client.query(
    `SELECT
       count(*) FILTER (WHERE ref_page IS NULL OR ref_page = '')::int AS no_ref,
       count(*) FILTER (WHERE ref_page ~ '^https?://(www\\.)?viralpeps\\.co\\.uk/?$')::int AS bare_homepage,
       count(*) FILTER (WHERE ref_page IS NOT NULL AND ref_page <> '' AND ref_page !~ '^https?://(www\\.)?viralpeps\\.co\\.uk')::int AS offsite
     FROM clicks WHERE created_at >= $1`,
    [CUTOFF]
  );

  const legit = await client.query(
    `SELECT count(*)::int AS n FROM clicks WHERE created_at >= $1 AND ref_page ~ '^https?://(www\\.)?viralpeps\\.co\\.uk/.+'`,
    [CUTOFF]
  );

  const noIp = await client.query(
    `SELECT count(*)::int AS n FROM clicks WHERE created_at >= $1 AND ip IS NULL`,
    [CUTOFF]
  );

  const topVendors = await client.query(
    `SELECT vendor_slug, count(*)::int AS n FROM clicks WHERE created_at >= $1 GROUP BY vendor_slug ORDER BY n DESC LIMIT 10`,
    [CUTOFF]
  );

  const t = totals.rows[0];
  const b = bots.rows[0];
  const botTotal = b.no_ref + b.bare_homepage + b.offsite;

  const lines = [];
  lines.push("🤖 Bot-fix check — " + new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC");
  lines.push("");
  lines.push("Since the fix went live (17 Nov 17:00 UTC):");
  lines.push("");
  lines.push(`Total clicks: ${fmt(t.n)}`);
  lines.push(`  across ${t.vendors} vendors · ${fmt(t.visitors)} distinct visitors`);
  lines.push(`Legit (specific-page referrer): ${fmt(legit.rows[0].n)}`);
  lines.push("");
  lines.push("Bot signatures (all should be 0):");
  lines.push(`  • bare-homepage referrer: ${fmt(b.bare_homepage)}`);
  lines.push(`  • no referrer: ${fmt(b.no_ref)}`);
  lines.push(`  • offsite referrer: ${fmt(b.offsite)}`);
  lines.push(`Clicks missing IP (should be 0): ${fmt(noIp.rows[0].n)}`);
  lines.push("");
  if (botTotal === 0) {
    lines.push("VERDICT: ✅ FIX WORKING — zero bot clicks logged since deploy.");
  } else {
    lines.push(`VERDICT: ❌ FIX NOT FULLY WORKING — ${fmt(botTotal)} bot click(s) got through (bare=${b.bare_homepage}, no-ref=${b.no_ref}, offsite=${b.offsite}).`);
  }
  lines.push("");
  lines.push("Top vendors since fix:");
  for (const r of topVendors.rows) lines.push(`  ${r.vendor_slug}: ${fmt(r.n)}`);

  console.log(lines.join("\n"));
  await client.end();
} catch (err) {
  console.error("❌ Bot-fix check FAILED:", err?.message || err);
  process.exit(1);
}
