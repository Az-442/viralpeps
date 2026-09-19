# KW Phase 1 Progress

Tracks which days of `kw-phase-1-list.md` are complete. The daily blog cron reads this to know where to resume.

**Rule:** Next day = first day in `kw-phase-1-list.md` whose articles are not all written, EXCLUDING Day 1 (owned by one-shot job `540cdc14856a`).

---

## Day 1 — Wed 16 Sep (3 articles) ✅ DONE
Owned by one-shot job `540cdc14856a` (ran 17 Sep).
- `kpv-suppliers-uk` — kpv suppliers UK (suppliers)
- `retatrutide-vs-survodutide` — retatrutide (vs)
- `p21-deep-dive` — p21 (deep)

Commit: `c6fa62e0` · live on main.

---

## Day 2 — Thu 17 Sep (3 articles) ✅ DONE
Completed 18 Sep 03:00 by daily blog cron (branch `kw/day2`).
- `epitalon-for-longevity` — epitalon (for) — section: goals
- `cjc-1295-with-dac-deep-dive` — cjc-1295 (with dac) (deep) — section: peptides
- `types-of-research-peptides` — types of research peptides (pillar) — section: research-hub

Cards: `public/images/guides/{epitalon-for-longevity,cjc-1295-with-dac-deep-dive,types-of-research-peptides}.png`
Word counts: 2,573 / 2,712 / 3,120
Build: passed. All internal links + PMIDs verified.

---

## Day 3 — Fri 18 Sep (3 articles) ✅ DONE
Completed 19 Sep 03:00 by daily blog cron (main branch, direct).
- `buy-follistatin-344-uk` — buy follistatin 344 UK (buy) — section: research-hub
- `tirzepatide-suppliers-uk` — tirzepatide suppliers UK (suppliers) — section: research-hub
- `tb-500-vs-ghk-cu` — tb-500 (vs) — section: comparisons

Cards: `public/images/guides/{buy-follistatin-344-uk,tirzepatide-suppliers-uk,tb-500-vs-ghk-cu}.png`
Card script: `scripts/make_kw_phase1_day3_cards.py`
Word counts (visible body, incl. chrome): 3,072 / 2,859 / 2,751
Build: passed (145/145 pages). All internal links verified 200. 35 PubMed IDs verified via E-utilities.

### ⚠️ Known cosmetic bug found (pre-existing, NOT introduced by Day 3)
The big "Compare … Prices" banner at the bottom of a comparison article renders a
DE-SLUGGED slug for the second compound — `Ghk cuPrices →`. The template
(`src/app/research/[slug]/page.tsx` line ~403) uses
`content.compoundSlug2.charAt(0).toUpperCase() + ...slice(1).replace(/-/g,' ')`
instead of the compound's display name. It already affects the Day 1 article
`retatrutide-vs-survodutide` (renders `SurvodutidePrices →`). The teal hero chip
renders correctly (`TB-500 vs GHK-Cu`) because it uses `guide.compound`.
Fix would be a one-line change to the template — deliberately left untouched to
avoid a site-wide change inside a content cron. Needs a separate scoped task.

---

## Next up
**Day 4 — Sat 19 Sep (3 articles)**
- `cognitive-peptide-suppliers-uk` — cognitive peptide suppliers UK (grouped)
- `uk-peptide-directory` — UK peptide directory (pillar)
- `where-to-buy-peptides-uk` — where to buy peptides (buy)

---

## Notes for future runs
- Day 1 slugs are already in `research-content.ts` — do not re-write them.
- Day 2 slugs are in `research-content.ts` + `research.ts` (guides array).
- Insert registry entries into the `guides` array (ends before `export const compoundList`), NOT the later `compoundList` string array. Both end with `];` — use `rt.find("export const compoundList")` as the boundary, or the insert lands inside `compoundList` and the build fails with *"Type '{...}' is not assignable to type 'string'"*.
- Turbopack rejects `node_modules` symlinks pointing outside the filesystem root. A git worktree at `/tmp/…` cannot build. Use a worktree **inside** the repo (`.wt/<name>`) with a relative `node_modules` symlink (`ln -s ../../node_modules node_modules`).
