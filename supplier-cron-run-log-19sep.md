# Supplier Cron Run Log — 19 Sep 2026 (one-off expanded run)

**Job:** `52e36371d2c1` — ONE-OFF 4-task run. **Reverts to normal (1 supplier/day) tomorrow.**

Commit: `e8e962e9` — `fix(peptx): complete 33-listing rebuild + remove dead Kings BioLabs`
Deploy: verified live on www.viralpeps.co.uk

---

## TASK 1 — PeptX FIX (COMPLETED)

The prior run (18 Sep) did a partial job: it fixed 13 listings but **20 compounds had real product
images downloaded and no source entry at all**, plus duplicate entries and orphaned images.

| Metric | Before | After |
|---|---|---|
| PeptX source entries | 13 (+6 duplicates = 19 rows) | **30** (0 duplicates) |
| Unique product images used | 30 on disk, 13 wired | **30, all unique MD5** |
| URLs on `/single-vials/` | 13 | **30** |
| Prices matching verified scrape | 13 | **30 (0 mismatches)** |

Details:
- **URLs replaced:** 0 remaining `/shop` or `/product/*` links (the prior run had already moved the
  13 it touched to `/single-vials/`). The 20 newly-added compounds used `/single-vials/<slug>`.
- **Prices corrected:** 30/30 now match the verified single-vial scrape in
  `supplier-cron-tonight-17sep.md`.
- **Dosages:** set from the dose-option list (base/lowest dose). `l-carnitine` has no mg dose
  (600mg/10ml liquid); `eloralintide` has no price published on the site (left blank — not invented).
- **Images replaced:** 30 real PeptX CDN renders, extracted from the live JS bundle
  (`/__l5e/assets-v1/<uuid>/<name>.webp`). **0 placeholders, 0 shared MD5.**
  The prior run's placeholder files were already replaced; this run wired the remaining 20.
- **Duplicates removed:** 6 identical rows — semaglutide ×5, mots-c ×2, ghk-cu ×2
  (deduped on `(url, price, dosage)`).
- **Orphaned images:** `aod-9604.webp`, `cagrilintide.webp`, `liraglutide.webp` were already deleted
  by the prior run (0 bytes) — confirmed clean.
- **TrustScore:** inputs fixed — `labTested: true`, `lastTested: 2026-09-19`.
  PeptX's **COA Library** (`/coa-library`) publishes real per-batch independent results:
  BPC-157 99.97% (Marfleet), MOTS-c 99.84% (Marfleet), Retatrutide 99.29% (Analiza Białek),
  PT-141 99.91% (Janoshik), SS-31 99.90% (BT Labs). Score **45/100**
  (Lab-Tested + Compliant + Shipping + Contact). `verified: false` and `reviews: false` are
  **correct** — PeptX's "14 verified customer reviews" are first-party on-site, not an independent
  review platform, so the +10 Reviews credit must NOT be awarded.
- **Bulk-only, no single vial:** `aod-9604`, `cagrilintide`, `liraglutide` — PeptX has **no** UK
  Express single-vial page. Confirmed by title-content check: all three return the generic site
  title `"Peptx, Research Peptides Direct from Factory"` = soft-404. **Action taken: PeptX source
  removed entirely from all three compounds** (not marked bulk-only with a price). No price invented.

### PeptX contact + delivery (Step 5)
- Email: `Dave@peptx.co.uk`
- Delivery: UK Express single vials — 24-hour UK dispatch, free UK delivery over £100.
  Factory Direct (bulk) — 10-vial MOQ, **ships from outside the UK**, times shown at checkout.
  International worldwide (48h factory dispatch).
- Note: PeptX "UK Express closed 21–27 Sep"; Factory Direct lead time 3–4 weeks until mid-Oct.

---

## TASK 2 — Claripep (claripep.co.uk) — COMPLETED by prior run, hardened here

- 12 source entries across 11 compounds. TrustScore **45/100**.
- All 12 URLs pass the title-content guard.
- Missing `dosage` populated on 11 entries from the live product URLs (e.g. `ghk-cu-200mg` → 200mg).
- Verified GHK-Cu pricing on the live page: **200mg = £90, 50mg = £30** — both correct.
- 2 duplicate dose-variant image files consolidated to canonical (cjc-1295, ghk-cu).
- Email: `research@claripep.co.uk`
- Delivery: Royal Mail Tracked 24, next-working-day aim · same-day dispatch before 2pm ·
  every order tracked · UK-only.

---

## TASK 3 — VialVerse (vialverse.com) — COMPLETED by prior run, hardened here

- 52 source entries across 52 compounds. TrustScore **55/100** (highest of the three — has an
  independent review platform, so it earns the +10 Reviews credit).
- All 52 URLs pass the title-content guard (`https://vialverse.com/peptides/<slug>`).
- Scraped live per-variant dose/price for the 17 entries missing `dosage` and confirmed
  **all 17 stored prices already equalled the lowest single-unit variant** (per the task rule).
  Dosages now populated (e.g. BPC-157 10mg £19, Retatrutide 10mg £39, GHK-Cu 50mg £15).
- Email: `info@vialverse.com`
- Delivery: £4.95 standard UK delivery · **free over £75** · Royal Mail Tracked 24 · UK-only ·
  1–2 working days to dispatch.

---

## TASK 4 — Kings BioLabs — REMOVED (site dead)

**Cannot list a supplier whose entire site returns 404.**

Evidence (19 Sep 2026):
- Homepage, `/sitemap.xml`, `/robots.txt` **all return HTTP 404**.
- The 404 is **Webflow's own error page** (`app-assets.website-files.com/css/webflow-https-errors.webflow.css`).
- DNS still points at the Webflow CDN (`cdn.webflow.com` → 198.202.211.1) with MX → Google Workspace
  ⇒ the **domain is live but the Webflow site has been unpublished/deleted**.
- `cf-cache-status: HIT`, `max-age=432000` (~5 days) ⇒ a cached 404, not a transient block.
- The Wayback Machine has **never archived** the domain.
- No alternate domain exists (`.com`, `.co`, `.uk`, `www.<name>.shop` all fail DNS).

**The business is real** — active Instagram (@kingsbiolabs, 39 posts) and a Trustpilot profile —
so this is a temporarily-unpublished site, not a fabricated vendor. On **18 Sep** the 13 URLs were
genuinely live (`Buy BPC-157 10mg UK | Research Use Only | Kings BioLabs`) — the site died within
24 hours. The prior run's commit message shows it worked from a **Supabase catalogue** rather than
the live site, which is how they passed.

**Action:** removed the `vendors.json` entry, all 13 `compounds.json` sources, the logo and the
product images (parked in `tmp/removed-kings-bio-labs/`, not hard-deleted, for easy restore).
Live profile page now correctly returns **404**; 0 references remain on compound pages.

---

## GUARDS — now enforced (documented in `references/supplier-url-verification-sop.md`)

1. **Title-content check** — soft-404 rejection. Caught all 3 PeptX bulk-only compounds.
2. **Category-page reject** — `/shop`, `/products`, `/category/*`, `/collections/*`.
3. **Image uniqueness (MD5)** — all 3 vendors pass (PeptX 30 unique, VialVerse 52 unique,
   Claripep 10 files for 12 entries with 2 legitimate dose-variant shares).
4. **Price sanity** (>3x / <1/3 median) — 1 flag, **verified false positive**: Claripep GHK-Cu
   200mg £90 vs a 50mg-dominated median. Confirmed correct on the live page; left unchanged.
5. **NEW — site-alive check** — probe homepage + sitemap + robots before trusting any listing.
6. **NEW — coverage reconciliation** — image files on disk ≠ source entries written.

---

## PRE-EXISTING SITE-WIDE BACKLOG (NOT touched tonight — flag for follow-up)

A full sweep of all 2,351 catalogue URLs found **364 non-200s**:
- **118 real 404s** — anglopeptides.com (20), bioplexpeptides.co.uk (15), mypepbiotech.co.uk (14),
  newwavepeptides.co.uk (11), biopeptides-uk.com (10), proformapeptides.co.uk (8),
  thepeptidecompany.co.uk (8), thepeptidecode.co.uk (6), xlpeptides.com (6), + smaller
- **123 dead DNS** (nodename/name-resolution failures) — supplier domains gone
- **48 × 403 bot-blocks** (sterlingpeptides, raccoonpeptides — likely alive, just WAF-blocked)
- **38 × 503**, **19 × 402 Payment Required**, **17 × SSL errors**, **1 × 410 Gone**

This is a much larger remediation than tonight's 4-task scope. Recommend a dedicated
dead-link remediation run.

---

## REVERT NOTE

This was the **one-off expanded run**. Tomorrow `52e36371d2c1` returns to normal:
**one new supplier per day, standard prompt.** The new guards (site-alive check,
coverage reconciliation) should be kept in the standard prompt.
