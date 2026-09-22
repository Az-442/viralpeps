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

## Day 4 — Sat 19 Sep (3 articles) ✅ DONE
Completed 20 Sep 03:00 by daily blog cron (main branch, direct).
- `cognitive-peptide-suppliers-uk` — cognitive peptide suppliers UK (grouped) — section: research-hub
- `uk-peptide-directory` — UK peptide directory (pillar) — section: research-hub
- `where-to-buy-peptides-uk` — where to buy peptides (buy) — section: research-hub

Cards: `public/images/guides/{cognitive-peptide-suppliers-uk,uk-peptide-directory,where-to-buy-peptides-uk}.png`
Card scripts: `scripts/make_kw_phase1_day4_cards.py` (Semax-vial Pillow template for the
compound-group article) and `scripts/compose_kw_day4_photo_cards.py` (Pillow text chrome over
AI-generated photorealistic FAL Flux 2 base imagery for the two non-compound guides).
Word counts (visible body, incl. chrome): 3,801 / 3,392 / 3,604
Build: passed (148/148 pages). All 27 internal links verified 200. All PMIDs fetched and
verified against NCBI E-utilities (title + journal), not guessed.

Commit: `a045de6a` · live on main (rebased onto `d8a87c04` before push).

### ⚠️ Lesson — research-content.ts seam is `],\n}\n\n};\nexport default content;`
The last existing entry closes with `}` on the line AFTER its `references` array —
NOT `},\n\n};\n\nexport default content;`. An earlier `SEAM` of `}\n\n};\n\nexport default content;`
silently matched the `}` closing the references array instead of the object, producing
`],\n,\n\n'new-slug'` and a Turbopack parse error at the stray comma. Match the full
`],\n}\n\n};\nexport default content;` tail and replace it with `],\n},\n\n<block>\n\n};\nexport default content;`.

---

## Day 5 — Sun 20 Sep (2 articles) ✅ DONE
Completed 21 Sep 03:00 by daily blog cron (main branch, direct).
- `mots-c-vs-5-amino-1mq` — mots-c (vs) — section: comparisons, compound: MOTS-c, compoundSlug2: 5-amino-1mq
- `semax-suppliers-uk` — semax suppliers UK (suppliers) — section: research-hub, compound: Semax

Cards: `public/images/guides/{mots-c-vs-5-amino-1mq,semax-suppliers-uk}.png`
Card script: `scripts/make_kw_phase1_day5_cards.py` (shared Pillow template — dual-vial
50%-height layout for the comparison, 75%-height single vial for the supplier card).
Word counts (visible body, incl. chrome): 3,120 / 2,877
Build: passed (150/150 pages). 31 PMIDs verified via NCBI E-utilities (title + journal
matched individually, not guessed). 15 internal links verified live 200 before publishing.

Commit: `994d4846` · pushed to main (0 unpushed).

### ⚠️ Two things fixed / learned this run
1. **Compound vial label typo found and fixed.** `public/images/compounds/5-amino-1mq.png`
   had the compound name printed as **`5-Amio-1MQ`** (missing the "n"). Because that vial
   is used by every 5-Amino-1MQ guide card, the typo would have shipped into the card.
   Fixed with `scripts/fix_5amino1mq_label.py`. **Do NOT paint a flat rectangle over the
   band** — the name sits in a soft shadow band, so a flat fill leaves a visible grey
   plate (vision QA caught it). The working method is a feathered 2-D gradient
   reconstruction sampled from a clean ring around the band, then stamping the text at
   the fitted size. Verify with the vision tool, not by eye on the numbers.
   Also note: `cv2` is NOT installed — the script falls back to the gradient path.

2. **research-content.ts seam — the note in the Day 4 entry is right but incomplete.**
   `SEAM = '],\n}\n\n};\nexport default content;'` matched exactly once, but a naive
   `rc[:seam] + ',\n\n' + block` reconstruction splits the last entry's `]` from its `}`,
   producing `],\n,\n\n'new-slug'` and a Turbopack/tsc parse error at the stray comma.
   The correct replacement keeps the seam's own `],\n}` closing AND adds the record
   separator: replace the seam with
   `],\n},\n\n<block>,\n\n};\nexport default content;` — i.e. the **last new entry itself
   must carry a trailing comma** because it is no longer last. Two follow-on traps:
   the first new entry needs its `slug:` field (the Record key does not satisfy
   `ResearchPageContent`, which requires `slug`), and the final entry must end `},` not `}`.

---

## Day 6 — Mon 21 Sep (3 articles) ✅ DONE
Completed 22 Sep 03:00 by daily blog cron (main branch, direct).

- `cardiogen-suppliers-uk` — cardiogen suppliers UK (suppliers) — section: research-hub
- `buy-melanotan-ii-uk` — buy melanotan ii UK (buy) — section: research-hub, compoundSlug: melanotan-ii
- `research-peptides-for-sale-uk` — research peptides for sale UK (pillar) — section: research-hub

Cards:
- `public/images/guides/cardiogen-suppliers-uk.png` — Pillow single-vial (Cardiogen vial)
- `public/images/guides/buy-melanotan-ii-uk.png` — Pillow single-vial (Melanotan II vial)
- `public/images/guides/research-peptides-for-sale-uk.png` — photorealistic AI base + Pillow chrome.
  Base reused from the approved Day-4 FAL Flux 2 photo because **`image_generate` is NOT available
  in this cron session's toolset** — a fresh generation was not possible inside the job. The base
  is compound-neutral and unbranded apart from the VIRALPEPS wordmark, which suits a
  market-structure pillar. Regenerate and replace if a dedicated generation becomes possible.

Card scripts: `scripts/make_kw_phase1_day7_cards.py` (2 compound cards, shared Pillow template)
and `scripts/compose_kw_day7_photo_card.py` (pillar, Pillow chrome over photorealistic base).

Word counts (visible body: sections + subsections + pullQuote + FAQ):
3,002 / 2,941 / 3,024

Build: passed (153/153 pages). All 20 internal links verified against `compounds.json` slugs and
existing `research-content.ts` keys — 0 broken. All 31 PMIDs verified individually via NCBI
E-utilities esummary (author, journal, title, year checked — none guessed). All 3 guide card
`image:` refs cross-checked against disk: OK.

### ⚠️ Lessons from this run
1. **`write_file` doubles `\'` escapes in /tmp fragments** (confirmed again). Every fragment needed
   a raw-byte normalisation pass (`\\'` → `\'`) before merging, or the build fails with
   `Expected ',', got 'ident'` at the apostrophe. `references/write_file-escape-doubling.md` is
   right. Always run the normaliser on every fragment.
2. **Do NOT add a `.replace("\\'", "'")` "guard" in the merge script.** That was the actual cause of
   the first build failure this run: it stripped correct escapes from the merged content, producing
   the same parse error. Assert the absence of doubled escapes; never transform them in the merge.
3. **The `research-content.ts` seam form in the Day-4 note is WRONG for the current file.** The
   working seam is a TWO-SPACE indent before `]`:
   `'\n  ],\n},\n\n};\nexport default content;'` (matches exactly once).
   The Day-4 note's `'],\n}\n\n};'` form matches 0 times.
4. **`image_generate` unavailable in cron.** Non-compound guides cannot get a fresh photorealistic
   FAL base from inside the job — reuse an approved existing base and re-compose the chrome.

---

## Next up
**Day 7 — Tue 22 Sep (2 articles)**
- `kpv-deep-dive` — kpv (deep)
- `epitalon-vs-thymalin` — epitalon (vs)

Neither slug exists yet (verified — 0 matches across BOTH `research-content.ts` and `research.ts`).

---

## Notes for future runs
- Day 1 slugs are already in `research-content.ts` — do not re-write them.
- Day 2 slugs are in `research-content.ts` + `research.ts` (guides array).
- Insert registry entries into the `guides` array (ends before `export const compoundList`), NOT the later `compoundList` string array. Both end with `];` — use `rt.find("export const compoundList")` as the boundary, or the insert lands inside `compoundList` and the build fails with *"Type '{...}' is not assignable to type 'string'"*.
- Turbopack rejects `node_modules` symlinks pointing outside the filesystem root. A git worktree at `/tmp/…` cannot build. Use a worktree **inside** the repo (`.wt/<name>`) with a relative `node_modules` symlink (`ln -s ../../node_modules node_modules`).
