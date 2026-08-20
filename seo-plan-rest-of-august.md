# ViralPeps — SEO Plan for the Rest of August (16–31 Aug 2026)

## Current State (August 15)
- **134 unique compound pages** live (from `/compounds/` — the target pages; the 403 in compounds.json includes dosage/vendor variant + blend duplicates)
- **55 research articles** (30 Compound Profiles, 15 Comparisons/Articles, 11 Guides)
- Internal compound links: now 100% (all 55 articles link to compounds)
- Daily cron: 1 research article/day at 3am → auto git push → Vercel

## Anchor Keyword List on File (839 keywords — kw-plan/peptide_kw_organized.txt)
- **169 Primary** (compound names + core/dosage/benefits terms)
- **339 Long-tail** (how-to, comparison X vs Y, questions)
- **129 Related** (goals/benefits/stacks: "X for [goal]")
- **202 Transactional** ("buy X", "X uk", "X for sale", "where to buy")
- Core money compounds: AOD 9604, BPC-157, CJC-1295, GHK-Cu, Ipamorelin, Melanotan 2, Oxytocin, PT-141, Retatrutide, Selank, Semaglutide, Semax, Sermorelin, TB-500, Tesamorelin, Tirzepatide

## Internally-Linked Target Pages (134 compound pages)

## The Core Opportunity
Compound pages are the cheapest, highest-volume rankings (GHK-Cu 36K/mo global, Retatrutide 14.8K). But **134 compound pages / 55 articles** means only ~40 of the 134 have a supporting article. The plan's job: (1) keep feeding compound pages with targeted content, (2) grow authority/backlinks so the "Leave/need-DA-first" compounds (BPC-157 1.9-8.1K/mo, Tirzepatide, Semaglutide KD 60-89) become rankable.

## 3 Workstreams

### A. Daily Content (sustained) — the 3am cron
- Keep 1 new research article/day. Let the cron pick uncovered T1→T2 priority compounds.
- **Priority order for Aug 16–31 (KD + volume, ranked):** GHK-Cu → Retatrutide → Oxytocin → Semax → Selank → Tesamorelin → Melanotan II → Sermorelin → TB-500 → AOD 9604 → CJC-1295 → Ipamorelin → PT-141
- **Fill top-compound gaps first:** every T1/T2 compound should have a profile + at least one supporting article before moving to long-tail compounds.
- Keep internal-link compliance (every new article must compound-link + cross-link).

### B. Authority / Backlinks (the real ranking lever) — 2×/week
The single biggest missing piece. The 134 target pages can't rank without domain authority.
- **Re-start guest-post outreach** (currently paused): 10 verified UK/English niche sites per run → backlinks to compound pages + homepage.
- **Directory/submission wins:** supplier directories, research/peptide communities, forums (already documented forum-directory-submissions reference).
- **Target 5–10 quality backlinks/week** to raise DA toward ranking the high-KD compounds.

### C. Technical / On-page cleanup (one-time) — first week
- [DONE] Internal compound links: all 55 articles now link (commit 0d8a7b1).
- **Next:** audit the 134 compound pages for thin/duplicate descriptions; consolidate via canonical or unique copy where they overlap (e.g. CJC-1295 vs CJC-1295-with-DAC vs CJC-1295-no-DAC distinct pages).
- **Breadcrumb/silo:** enforce organic category → compound page → article hierarchy (silo pages were planned for weeks 2-3).
- Verify CRITICAL: after deploy each day, spot-check 1-2 new pages for correct canonical (self), meta title <70, and internal links.

## Proposed Week-by-Week (Aug 16–31)

### Week of Aug 16–22
- Daily: 1 article (T1/T2 compounds: GHK-Cu deep dives, Retatrutide, Oxytocin, Semax, Selank angle pieces)
- Tue/Thu: guest-post outreach runs (10 opportunities each) + submit to 3-5 directories
- Mon: thin-content audit on top 50 compound pages; flag duplicates for canonical/rewrite

### Week of Aug 23–31
- Daily: 1 article (continue priority compounds + long-tail: KPV, DSIP, GHRP-2/6, Epitalon, HCG, Kisspeptin)
- Tue/Thu: outreach + directories continue
- Build out 2-3 **silo pages** per compound cluster (start with GHK-Cu, Retatrutide, BPC-157)
- Fri Aug 28: month-end review — rankings, indexed pages, backlinks gained

## Priorities / What I'd Do First (asked as defaults)
1. **Re-enable guest-post outreach cron** (highest leverage — it's the DA bottleneck)
2. Keep the daily article cron as-is but steer it to T1/T2 priority order
3. Run the thin/duplicate compound page audit (technical cleanup)

---
*Grounded in: research.ts (55 articles), compounds.json (403 pages), content-plan-and-kw-research.md (KD/volume tiers), SKILL.md internal-link mandate.*
