# ViralPeps — Progress Log (Sep 2026)

## Completed this session
- **Wholesale page** — built, live at /wholesale. Invite-only B2B wholesale marketplace. Form wired to FormSubmit → info@viralpeps.co.uk (same as vendor form). Nav tab moved next to FAQ. Footer Directory + Resources links added.
- **Vercel deploy** — fixed. Vercel token is TEAM-scoped (credentials.json). Force-deploy via API works. GITHUB_TOKEN env set on Vercel project. /api/subscribe now works (HTTP 200, {"ok":true}).
- **Subscriber list** — /api/subscribe writes to subscribers.json in repo (self-hosted, no external mail platform). Real subscribers arriving (azar_pt@hotmail.co.uk, azarpitstop@icloud.com).
- **Email popups** — removed GLP-1 + recon guide popups. ONE price-drop popup live: "Never Overpay for Peptides", "Get Price Drop Alerts", fires on /compounds + 2nd page view, once/session. LeadMagnetPopup.tsx in global layout. Wired to /api/subscribe.
- **Subscriber alert cron** — daily 9am (job 65c59938967a), via ~/.hermes/scripts/viralpeps-subscriber-watch.sh. Baseline: ~/.hermes/viralpeps-subscribers-baseline.json. Notifies new emails only.
- **Vercel token reminder cron** — deleted (resolved).

## Scheduled
- **Breadcrumbs build** — cron at 2am Wed 2 Sep (job 4af0451fabfb). Builds BreadcrumbList component + config-driven data + schema JSON-LD + dead-link guards (pre-commit + weekly cron). Compounds → /compounds/[slug], Vendors → /vendors/[slug]. DO NOT link /research/[slug] (dead 404 route).

## DEPLOY BLOCKER — 12 Sep 2026 (quota exhausted by click-logger loop)
- **Symptom:** `/vendors/apexpure` (28dba68d) and `/vendors/peptide-pal` (fb7d32f5) both HTTP 404 live.
  Both commits are pushed to `origin/main`; production is still serving `b02d2dba`. "Pushed, not deployed."
- **Cause:** 100 deployments in 24h on project `viralpeps` — the free-tier daily cap —
  and **all 100 are from the `clicks-data` branch** (0 from `main`), metronomic 4/hour, messages
  `Log outbound click: {vendor}/{compound} [bot]`. The outbound-click logger writes one git commit
  per click; Vercel builds each as a Preview, saturating the quota so `main` gets no slot.
- **Proof:** force-deploy of HEAD → HTTP **402 payment_required**,
  `api-deployments-free-per-day` limit 100 / remaining 0 / **reset 2026-09-13T01:38Z**.
- **Fix (in order):** (1) stop commit-per-click at the writer — batch writes or move click events to
  a DB/KV store; (2) Settings → Git → ignore/disable Preview builds for `clicks-data`;
  (3) after reset, force-deploy the existing `fb7d32f5` via `scripts/force_deploy.py`.
- **Do NOT** redo or re-push supplier work — the commits are correct; this is pipeline-only.
- Detail file: `tmp/_deploy_blocker_2026-09-12.md`.

## 13 Sep 2026 — daily supplier added: Advanced Peptides UK
- Added `advanced-peptides-uk` (advancedpeptidesuk.co.uk) — 34 in-stock products, logo (png+webp), 34 product .webp images, `_autoChecks` set. TrustScore **45/100** after autocheck.
- Website is WooCommerce (Elementor) — the WC Store API (`/wp-json/wc/store/v1/products?per_page=100`) returned the full catalogue with prices + image URLs in one call. Fast path for any future WooCommerce supplier; no browser scraping needed.
- Real company: B.T.NORMAN GROUP LTD, Company No. 16142816.
- Three downloaded files arrived as PNG mislabelled `.webp` (5-amino-1-mq-10mg, ghk-cu-100mg, melanotan-2) — re-encoded to real webp with `sharp` (`tmp/_convert_auk.cjs`). Worth checking `file *` after ANY image download batch.
- Commit `029edba9`, pushed to main, **live** (HTTP 200) within ~90s.

## ⚠️ DEPLOY BLOCKER STILL OPEN (writer not fixed)
- Quota reset 2026-09-13T01:38Z, deploys resumed (apexpure + peptide-pal now 200). But **only the symptom was cleared, not the cause**:
  - `src/lib/click-logger.ts` STILL commits one git commit per outbound click to `clicks-data` (line ~100, `message: Log outbound click: ...`).
  - Vercel is still building `clicks-data` — deploy cadence 4/hour flat overnight, 18 deploys in the 17:00 hour on 12 Sep. All newer ones show CANCELED.
  - Nothing in `next.config.ts` / Vercel settings ignores the branch.
- **The 100/day cap will be re-exhausted the next time click volume spikes.** Both fixes from `tmp/_deploy_blocker_2026-09-12.md` are still unapplied:
  1. Batch the click writes (or move to KV/DB) so clicks stop creating a commit each.
  2. Vercel → Settings → Git → Ignored Build Step / untrack `clicks-data` so its commits never build.
- Needed before the next high-traffic day, otherwise supplier deploys silently queue again.

## Key credentials location
- All tokens stored in `~/.hermes/credentials.json` (Vercel, GitHub, etc.). chmod 600.

## Standalone popup preview
- /Users/time4you/viralpeps-standalone-popup.html (renders the single price-drop popup isolated)
