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

## Day 7 — Tue 22 Sep (2 articles) ✅ DONE
Completed 23 Sep 03:00 by daily blog cron (main branch, direct).

- `kpv-deep-dive` — kpv (deep) — section: peptides, compoundSlug: kpv
- `epitalon-vs-thymalin` — epitalon (vs) — section: comparisons, compoundSlug: epitalon,
  compoundSlug2: thymalin

Cards:
- `public/images/guides/kpv-deep-dive.png` — Pillow single-vial (KPV vial, 75% card height),
  badge "Deep Dive Report"
- `public/images/guides/epitalon-vs-thymalin.png` — Pillow dual-vial (Epitalon + Thymalin vials,
  50% card height each), badge "Head-to-Head Comparison"

Card script: `scripts/make_kw_phase1_day8_cards.py` (shared Pillow template — misnamed "day8"
to avoid colliding with the Day-6 script that was already sitting at `make_kw_phase1_day7_cards.py`).

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,965 / 2,856. Rendered page word counts (incl. all site chrome): 8,227 / 8,333.

Build: passed (155/155 pages, up from 153). 17 PMIDs verified individually via NCBI E-utilities
esummary (title + journal + author + year checked — none guessed). All 7 internal links verified
against `compounds.json` slugs and existing `research-content.ts` keys — 0 broken. Both guide card
`image:` refs cross-checked against disk: OK (71 refs checked, 0 missing).

Live verified: `/research/kpv-deep-dive` and `/research/epitalon-vs-thymalin` both 200 with correct
`<title>`, self-referencing canonical, card image serving at matching byte size, both listed on
`/research`, and both present in their compounds' Research Library sections
(`/compounds/kpv`, `/compounds/epitalon`).

Commit: `c015215d` · pushed to main (0 unpushed).

### Lessons from this run
1. **`write_file` did NOT double escapes this run.** Both /tmp fragments were written directly by
   the parent session (not by subagents) and came out with 0 doubled `\\n` and 0 doubled `\\'`.
   The normaliser was still run as a check-first step and reported clean. Doubling appears to be a
   subagent-output artifact, not a universal `write_file` behaviour — always *check*, never blindly
   transform. (The Day-6 note's warning against adding a `.replace("\\'", "'")` guard in the merge
   still stands.)
2. **Seam confirmed again** for the current file: `'\n  ],\n},\n\n};'` — matches exactly once.
   The merge replacement form that works is
   `'\n  ],\n},\n\n' + block + ',\n\n};'` — i.e. the last new entry carries a trailing comma
   because it is no longer last, and each new entry keeps its own `slug:` field (the Record key
   alone does not satisfy `ResearchPageContent`).
3. **Vial label QA is still worth doing.** All three vials used here (kpv-vial, epitalon-vial,
   thymalin-vial) were checked with the vision tool *before* card generation and all read correctly.
   The Day-5 `5-Amio-1MQ` typo is the reason this step stays in the loop.

---

## Day 8 — Wed 23 Sep (3 articles) ✅ DONE
Completed 26 Sep 03:00 by daily blog cron (branch `kw/day8`, pushed to main).

- `p21-for-neurogenesis` — p21 (for) — section: goals, compound: P21
- `growth-hormone-peptide-suppliers-uk` — growth hormone peptide suppliers UK (grouped)
  — section: research-hub
- `peptides-for-sale-uk` — peptides for sale (pillar) — section: research-hub

Cards:
- `public/images/guides/p21-for-neurogenesis.png` — Pillow single-vial (P21), "Deep Dive Report"
- `public/images/guides/growth-hormone-peptide-suppliers-uk.png` — Pillow dual-vial 50%-height
  (Tesamorelin + Ipamorelin), "Supplier Guide"
- `public/images/guides/peptides-for-sale-uk.png` — photorealistic base + Pillow chrome
  (see note below on base recovery)

Card scripts: `scripts/make_kw_phase1_day8_cards.py` (2 compound cards) and
`scripts/compose_kw_day8_photo_card.py` (pillar card).

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,288 / 2,251 / 2,567

Build: passed (155/155 pages, up from 152). All 26 internal links verified against
`compounds.json` slugs and live `research.ts` / `research-content.ts` keys — 0 broken.
All 26 PMIDs verified individually via NCBI E-utilities esummary. All 3 guide card
`image:` refs cross-checked against disk: OK (74 refs, 0 missing).

Commit: `854fb742` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **PMID guesses are wrong far more often than they look right.** The first pass
   contained 10 of 14 PMIDs that resolved to entirely unrelated papers (e.g. 14642275
   came back as a FAK/cortical-abnormality paper, 18046909 as an overactive-bladder
   drug review, 24816527 as a paediatric hydatid cyst case report). Every reference
   must be fetched and title-matched; a plausible-looking PMID is not evidence.
   The correct Cruz et al. p25 paper is PMID 14642273 (not 14642275).
   The modern P21 paper is Pao et al., PNAS 2023, PMID 37043533 — always search for
   it rather than assuming the 2000s-era citations are the whole literature.
2. **The seam uses REAL newlines, not literal `\n`.** The current working seam is
   `"  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"` (NL = chr(10)).
   Constructing it with `chr(92)+"n"` matches 0 times.
3. **Each inserted entry needs its OWN trailing comma.** The replacement tail already
   supplies `  ],
},` for the original last entry, so every inserted entry must end
   `},` — including the final one. Omitting it fails the build with
   `Expected ',', got 'string literal'` at the next `'slug':` line.
   Verify with raw bytes (`open(...,'rb')`), not `repr()` on decoded text: repr makes
   real newlines and literal backslash-n look identical, which hid the bug for three
   merge attempts this run.
4. **A parse check is cheap and catches what lint cannot.** Wrapping each fragment as
   `const x: ResearchPageContent = {...}` and running the project's own
   `./node_modules/.bin/tsc --noEmit` caught a markdown table written with real
   newlines inside a single-quoted TS string. Markdown tables belong in the section's
   `table: { header, rows }` field, never inline in `body`.
5. **The dual-vial layout leaves ~413px of title width.** "Growth Hormone Peptides"
   (501px) overflowed and was clipped at the card edge; "GH Peptides UK" (305px) fits
   with ~108px of margin. Measure titles with `draw.textlength()` before generating a
   2-vial card — the template only auto-wraps on `" vs "`.
6. **`image_generate` is still NOT available in cron, and `/tmp/gen_cards/` is cleared
   between runs.** The Day-4 photorealistic base photo was gone. Recovered it by
   cropping the untouched photo panel back out of the rendered Day-4 card
   (`uk-peptide-directory.png`) — the compose routine pastes the photo but never draws
   over it. Native resolution only (550x484); do NOT upscale, it reads as a render.
   Then tighten to the content bounding box, since the source carries wide white margins.

## Day 9 — Thu 24 Sep (2 articles) ✅ DONE
Completed 27 Sep 03:00 by daily blog cron (main branch, direct).

- `tirzepatide-vs-survodutide` — tirzepatide (vs) — section: comparisons,
  compoundSlug: tirzepatide, compoundSlug2: survodutide
- `oxytocin-nasal-spray-suppliers-uk` — oxytocin nasal spray suppliers UK (suppliers)
  — section: research-hub, compoundSlug: oxytocin

Cards:
- `public/images/guides/tirzepatide-vs-survodutide.png` — Pillow dual-vial 50%-height
  (Tirzepatide + Survodutide), badge "Head-to-Head Comparison". Title auto-wrapped on
  " vs " (measured 538px vs 395px available) — correct behaviour.
- `public/images/guides/oxytocin-nasal-spray-suppliers-uk.png` — Pillow single-vial
  75%-height (oxytocin nasal spray vial), badge "Supplier Guide".

Card script: `scripts/make_kw_phase1_day9_cards.py` (shared draw_guide_card template).
Vial labels QA'd with the vision tool before compositing: tirzepatide-vial ("Tirzepatide
/ 10mg"), survodutide-vial ("Survodutide / 10mg"), oxytocin-nasal-spray ("Oxytocin /
Nasal / 10ml") — all compound identifiers correct. Both finished cards vision-checked:
no clipping, no overflow.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
3,101 / 3,244

Build: passed (160/160 pages, up from 155). All Day-9 internal links verified against
`compounds.json` slugs, `vendors.json` slugs and live `research.ts` slugs — 0 broken.
**8 PMIDs verified individually via NCBI E-utilities esummary** (title + journal + author
+ volume/pages matched):
35658024 (SURMOUNT-1), 34170647 (SURPASS-2), 38330987 (survodutide obesity),
38847460 (survodutide MASH), 38858523 (retatrutide MASH), 37366315 (retatrutide obesity),
32807845 (intranasal oxytocin review), 34644471 (oxytocin ASD trial NEJM),
29032324 (oxytocin meta-analysis), 26088114 (oxytocin BPD review).
All 129 guide card `image:` refs cross-checked against disk: OK.

### ⚠️ Lessons from this run
1. **NCBI esearch (the search endpoint) was DOWN this run** — returns
   `Search Backend failed: Cannot connect to SOLR`. `esummary` by PMID continued to work
   fine. Workaround: find candidate PMIDs via web_search, then TITLE-VERIFY each one with
   esummary before use. Guessing PMIDs remains near-useless: of 10 initial guesses only
   3 were correct (the other 7 resolved to a SARS-CoV-2 antibody assay, a surgeon-bias
   paper, a paediatric hydatid case report, etc.).
2. **A sibling subagent writing `src/data/research-content.ts` CAN clobber a `patch()`
   applied moments earlier.** A `patch()` that fixed one broken internal link in the new
   oxytocin article was silently reverted when a concurrent subagent wrote the same file
   from a stale read. **Always re-grep the file after patching it whenever a sibling may
   be active, and re-run the link validator against the file on disk immediately before
   committing.** The link validator reading live from disk is what caught it.
3. **Two PRE-EXISTING broken forward-links were repaired** (not introduced this run):
   `](/research/peptide-reconstitution)` appeared twice (KPV article line 9303, P21
   article line 9469). The correct slug is `peptide-reconstitution-guide`. Fixed both.
4. **Four remaining broken forward-links are OUT OF SCOPE and left alone.** They point at
   articles not yet written:
   - `/research/hgh-fragment-176-191-research-summary`
   - `/research/igf-1-lr3-research-summary`
   - `/research/p21-research-summary`  ← planned Day 27 of `kw-phase-1-list.md`
   - `/research/thymosin-alpha1-research-summary`
   These sit in pre-existing articles (HCG, MGF, P21, Thymalin). They will resolve when
   the planned articles ship; do NOT "fix" them by inventing stubs. Flagged for awareness.
5. **The merge seam used and worked (real newlines):**
   `"  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"` — exactly 1
   match. Replacement keeps that tail and inserts the block with a trailing comma.
6. **`research.ts` guides-array insertion:** the array closes with `  },\n];` immediately
   before `export const compoundList`. Insert AFTER the last entry's comma and BEFORE the
   `]`. Inserting after the `];` (offset `li+2`) puts entries after the array and breaks
   nothing at build time only by luck — it actually puts them outside `guides` entirely.
   Walk back from `];` over whitespace to the `,` and insert there.
7. **`write_file` did NOT double escapes this run** (confirmed for the second run in a
   row on parent-written fragments). The pre-merge assertion
   (`raw.count(b'\\\\n') == raw.count(b'\\n')`, doubled-`\\'` == 0) reported clean.

### ⚠️ Day 1 overlap note (no duplication risk)
`retatrutide-vs-survodutide` already existed (written on Day 1). Day 9's planned article
is `tirzepatide-vs-survodutide` — a DIFFERENT compound pairing (tirzepatide, not
retatrutide) and a genuinely distinct article. Both are now live and do not duplicate.
The existing `public/images/guides/retatrutide-vs-survodutide.png` card belongs to the
Day-1 article and was NOT reused; a separate `tirzepatide-vs-survodutide.png` was made.

## Day 10 — Fri 25 Sep (3 articles) ✅ DONE
Completed 28 Sep 03:00 by daily blog cron (main branch, direct).

- `follistatin-344-deep-dive` — follistatin 344 (deep) — section: peptides,
  compoundSlug: follistatin-344
- `cjc-1295-with-dac-suppliers-uk` — cjc-1295 (with dac) suppliers UK (suppliers)
  — section: research-hub, compoundSlug: cjc-1295-with-dac
- `buy-peptides-online-uk` — buy peptides online (pillar) — section: research-hub
  (no compoundSlug — market-structure pillar)

Cards:
- `public/images/guides/follistatin-344-deep-dive.png` — Pillow single-vial 75%-height
  (follistatin-344-vial), badge "Deep Dive Report"
- `public/images/guides/cjc-1295-with-dac-suppliers-uk.png` — Pillow single-vial 75%-height
  (cjc-1295-with-dac-vial), badge "Supplier Guide"
- `public/images/guides/buy-peptides-online-uk.png` — photorealistic base + Pillow chrome,
  badge "Buyer's Guide"

Card scripts: `scripts/make_kw_phase1_day10_cards.py` (2 compound cards) and
`scripts/compose_kw_day10_photo_card.py` (pillar card).

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,352 / 1,685 / 2,061

Build: passed (163/163 pages, up from 160). All 34 internal links verified against
`compounds.json` slugs, `vendors.json` slugs and live `research.ts`/`research-content.ts`
keys — 0 broken. **21 PMIDs verified individually via NCBI E-utilities esummary**
(title + journal matched for every one).
All 74 guide card `image:` refs cross-checked against disk: OK.

Commit: `c02b380b` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **`write_file` DID double escapes this run** — all three /tmp fragments came out with
   3 backslashes before `n` (i.e. `\\\n` = literal backslash + real newline), which is NOT
   a valid escape inside a single-quoted TS string. The Day-7 note saying doubling is a
   subagent-only artefact does not hold: these fragments were parent-written. Fix is a
   regex normaliser, collapsing `(\\{3,})n` -> `\\n` and `(\\{2,})'` -> `\'`. Run it on
   EVERY fragment. A cheap two-byte count (`raw.count(b'\\\\n')`) is not enough — count
   the *backslash-run length* before the `n`, because 3-backslash runs make a naive
   doubled-count read as clean.
2. **Type-check each fragment as a real module before merging.** Wrapping the bare object
   as `const x: ResearchPageContent = {...}` and running the project's own
   `./node_modules/.bin/tsc --noEmit` caught everything before the merge. This is the
   cheapest gate in the whole run and it caught the `compoundSlug: undefined` mistake
   (an explicit `undefined` is fine at runtime but is not in the interface's optional form
   and reads as a bug — omit the field instead).
3. **`category` in `research.ts` is `'Guide'` (singular), NOT `'Guides'`.** The
   `ResearchArticle` union is `"Guide" | "Articles" | "Research Summaries" |
   "Compound Profiles"`. Writing `'Guides'` fails the build at the type-check step with a
   clear "Did you mean 'Guide'?" — but only after a full 14s compile, so check the union
   before writing the registry block.
4. **Link validator must match BOTH Record-key quote formats AND the `slug:` field form.**
   `peptide-reconstitution-guide` is stored as a double-quoted indent-2 key (line 1184)
   and was falsely reported BROKEN by a single-quote-only scan. Same trap as the gap
   detector in the skill. Use `^\s*["']key["']:\s*\{` plus a `slug:\s*["']...["']` sweep
   over BOTH data files.
5. **Broken forward-links found and fixed before publish (3 total).** Two vendor slugs and
   one research slug were wrong in my first draft:
   - `/vendors/research-peptides-uk` -> `/vendors/research-peptide-uk` (the near-duplicate
     vendor-name trap; "Research Peptides UK" is `research-peptide-uk`, while
     "Research Peptides" is `research-peptides-uk-main`)
   - `/vendors/dr-p-research` -> `/vendors/dr-peptides` (Dr P Research's slug does not
     contain "p-research")
   - `/research/peptide-purity` -> `/research/how-to-read-a-coa` (no article with a
     `peptide-purity` slug exists; the COA guide is the right target)
   All three were fixed scoped to the three new articles only, by slicing each article's
   byte range and replacing within it — never a global replace on the file.
6. **The seam is unchanged and still matches exactly once:**
   `"  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"` (real newlines).
   The replacement keeps that tail and inserts the block with the final new entry carrying
   its own trailing comma.
7. **`research.ts` guides-array tail has NO comma before `];`.** The last entry closes with
   `}` immediately followed by `];`. A helper that assumes `,` before `];` (or that inserts
   after the `,`) will mis-place the block. The working anchor is the whole
   `"}\n];\n\nexport const compoundList"` string, replaced by
   `"},\n<blocks>\n];\n\nexport const compoundList"`. The Day-9 note about walking back
   over whitespace to a comma only applies when a comma exists there.
8. **`image_generate` is still unavailable in cron**, so the pillar card reused the
   recovered photorealistic base, as on Days 7/8. The Day-8 `recover_base()` writes to its
   OWN hardcoded path — a Day-10 wrapper must copy the result to its own base path or
   `compose()` raises FileNotFoundError.

---

## Day 11 — Sat 26 Sep (2 articles) ✅ DONE
Completed 29 Sep 03:00 by daily blog cron (main branch, direct).

- `buy-tb-500-uk` — buy tb-500 UK (buy) — section: research-hub, compound: TB-500
- `mots-c-for-metabolism` — mots-c (for) — section: goals, compound: MOTS-c

Cards:
- `public/images/guides/buy-tb-500-uk.png` — Pillow single-vial 75%-height (tb-500-vial),
  badge "Buyer's Guide"
- `public/images/guides/mots-c-for-metabolism.png` — Pillow single-vial 75%-height
  (mots-c-vial), badge "Compound Profile"

Card script: `scripts/make_kw_phase1_day11_cards.py` (shared draw_guide_card template).
Vial labels QA'd with the vision tool before compositing: tb-500-vial ("TB-500 / 5mg") and
mots-c-vial ("MOTS-c / 10mg") — both compound identifiers correct. Both finished cards
vision-checked: no clipping, no overflow past the card edge.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
1,814 / 1,882 (rendered page: 6,380 / 6,518 incl. site chrome).

Build: passed (165/165 pages, up from 163). All 19 internal links verified against
`compounds.json` and live `research.ts`/`research-content.ts` keys — 0 broken, and all
12 distinct targets re-verified live 200 after deploy.
**18 PMIDs verified individually via NCBI E-utilities esummary** (title + journal matched).
All 134 guide card `image:` refs cross-checked against disk: OK.

Commit: `e242b9f6` · pushed to main (0 unpushed). Live verified: both articles 200 with
correct `<title>`, self-referencing canonical, card images serving at matching byte size,
both listed on `/research`, and both present in their compounds' Research Library sections
(`/compounds/tb-500`, `/compounds/mots-c`).

### ⚠️ Lessons from this run
1. **The skill's PMID warning holds emphatically — 6 of 15 first-pass PMIDs were entirely
   wrong.** `17659491` returned a German body-dysmorphic-symptom paper (correct Smart et al.
   angiogenesis paper is `17632766`); `20536466` returned a cancer-immunotherapy paper (the
   real Crockford TB4 paper is `20536467`, one digit off); `22171664` returned a PRP/joint
   paper (real Goldstein TB4 review is `22074294`); `20536467` returned the Crockford paper
   (real Sosne corneal paper is `20536468`). On the MOTS-c side `30017356` returned a
   dietary-fat mouse paper (real nuclear-translocation paper is `29983246`), `37963424`
   returned a soil-phenanthrene remediation paper, and `37471231` returned a diabetes
   albumin-glycation paper. **Every reference must be searched then title-verified.**
   A one-digit-off PMID is the most dangerous failure mode because it looks plausible.
2. **NCBI `esearch` was UP this run** (the Day-9 note said it was down with a SOLR error).
   Searching by author + title keywords was far more reliable than guessing.
3. **Cite the PMID's real paper, not the paper you wanted it to be.** One entry kept a real
   PMID (`38160808`) with a fabricated author/title pair. After esummary showed it was
   Kal S et al., *Peptides* 2024, the citation was corrected to match. A reference list is
   a factual claim about a database record — attach the PMID only to the record it belongs to.
4. **The seam matched exactly once and worked unchanged:**
   `"  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"`
   Replacement appends the block with each new entry carrying its own trailing comma.
5. **`research.ts` still closes the guides array with `},` then `];`** — the
   `"  },\n];\n\nexport const compoundList"` anchor matched exactly once, and inserting
   `"  },\n\n<entries>\n];\n\nexport const compoundList"` placed both entries inside the
   guides array correctly. Verify with `grep -n "export const compoundList"` afterwards.
6. **A cheap pre-merge `tsc` gate on a synthetic wrapper caught nothing this run, but the
   real build found nothing either** — both fragments were parent-written and clean
   (0 doubled `\\n`, 0 doubled `\\'`). Still worth running, since it is 15 seconds.
7. **Use `goals` for "X for Y" articles.** `mots-c-for-metabolism` is an `(for)` type, and
   the sibling `epitalon-for-longevity` (Day 2) uses `section: 'goals'` — matching that
   keeps the type-to-section mapping consistent. Flat `research-hub` is the right home for
   `(buy)`, `(suppliers)`, `(grouped)` and `(pillar)` types, as on Days 3/4/6/9/10.

---

## Day 12 — Sun 27 Sep (3 articles) ✅ DONE
Completed 30 Sep 03:00 by daily blog cron (main branch, direct).

- `kpv-vs-thymosin-alpha1` — **kpv** (vs) — section: comparisons,
  compoundSlug: kpv, compoundSlug2: thymosin-alpha-1
- `epitalon-deep-dive` — **epitalon** (deep) — section: peptides, compoundSlug: epitalon
- `ghk-cu-suppliers-uk` — **ghk-cu suppliers UK** (suppliers) — section: research-hub,
  compoundSlug: ghk-cu

Cards:
- `public/images/guides/kpv-vs-thymosin-alpha1.png` — Pillow dual-vial 50%-height
  (KPV + Thymosin Alpha-1), badge "Head-to-Head Comparison"
- `public/images/guides/epitalon-deep-dive.png` — Pillow single-vial 75%-height
  (epitalon-vial), badge "Deep Dive Report"
- `public/images/guides/ghk-cu-suppliers-uk.png` — Pillow single-vial 75%-height
  (ghk-cu-vial), badge "Supplier Guide"

Card script: `scripts/make_kw_phase1_day12_cards.py` (shared draw_guide_card template).

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,029 / 2,042 / 2,276

Build: passed (180/180 pages). All 13 internal links verified against `compounds.json`
slugs and live `research.ts` / `research-content.ts` keys — 0 broken.
**43 PMIDs verified individually via NCBI E-utilities esummary** (title + journal +
author + year matched for every one). All 135 guide card `image:` refs cross-checked
against disk: OK.

Commit: `f9042a1f` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **The `thymosin-alpha1` slug does NOT exist — the compound slug is `thymosin-alpha-1`
   (with a hyphen before the 1).** The Next progress note in this file said to check
   `thymosin-alpha1`; that string is only a *variant product* slug
   (`thymosin-alpha1-vial-express`, `thymosin-alpha1-pen-express`), while the master
   compound is `thymosin-alpha-1` (38 sources). The corresponding VIAL file IS named
   `thymosin-alpha1-vial.png` (no hyphen). Do not assume the compound slug and the vial
   filename match — verify both separately.
2. **The `research-content.ts` seam in the Day-4/5/6/7/8/9/10/11 notes is WRONG for the
   current file — the `],` line has NO leading indent.** The working seam this run was
   `"]," + NL + "}," + NL + NL + "};" + NL + "export default content;"` (matches exactly 1).
   The notes' `"  ],"` form (2-space indent) matches **0**. The actual tail is
   `...PMID 31293078',\n  ],\n},\n\n};\nexport default content;`. Always re-probe the seam
   with a variant-matching script before merging; do not trust the note.
3. **`research.ts` guides-array anchor confirmed:** `"  },\n];\n\nexport const compoundList"`
   matches exactly once. Replacement = keep `"  },\n"`, insert the blocks, append `",\n];\n\nexport const compoundList"`.
4. **A dual-vial card title overflows far sooner than expected — the Day-8 note is right
   and it bit again.** "KPV vs Thymosin Alpha-1" auto-wrapped on `" vs "` into
   `KPV` + `vs Thymosin Alpha-1` = **423px against 395px available → 28px clipped**.
   Fixed by shortening the title to **"KPV vs Tα1"** (231px) and moving the full compound
   name into the description's first line. **Measure with `draw.textlength()` before
   generating any 2-vial card** — the template's auto-wrap only splits on `" vs "` and
   does NOT re-measure the second half.
5. **Vision QA on the card sheet was unreliable this run — measure programmatically.**
   The vision tool reported clipped headlines, truncated body copy and vial-label overlap
   that did not exist, and misread the badges (claimed the KPV card badge read
   "Comparisons"). Measuring every text run against `card_w - text_left - 25` with
   `draw.textlength()` found the one real defect (item 4) and cleared the rest. Use the
   vision tool for "is the vial the right compound", and pixel arithmetic for fit.
6. **`write_file` DID double escapes this run — 2-backslash runs before `n` in all three
   fragments** (30/34/44 occurrences). Normaliser (`(\\{2,})n` → `\n`, same for `'`/`"`)
   ran on every fragment and reported clean afterwards. Two real apostrophe bugs were also
   caught by the pre-merge `tsc` gate: `Lin'kina` and `Sopel'` in Epitalon reference
   author names needed `\'`. **Wrap each fragment as `const x: ResearchPageContent = {...}`
   and run the project's own `tsc --noEmit` before merging** — this caught both.
7. **One broken forward-link caught and fixed before publish.**
   `/research/ghk-cu-vs-ahk-cu` does not exist (it is planned for Day 25) — replaced with
   `/research/ghkcu-deep-dive`, which is live. The GHK-Cu slug family in `research.ts` /
   `research-content.ts` uses the compact form (`ghkcu-deep-dive`, `ghkcu-vs-retinol`,
   `ghkcu-research-summary`, `ghkcu-vs-bpc157`), NOT `ghk-cu-*`. Note that `research.ts`
   contains some slugs with NO corresponding `research-content.ts` entry
   (`ghkcu-deep-dive`, `ghkcu-vs-retinol`) — they still resolve 200, so the registry is
   the right place to check link validity, not `research-content.ts` alone.
8. **Do not link planned-but-unwritten articles.** The Day-9 note listed four unresolved
   forward-links in pre-existing content; this run's first draft added a fifth. Always run
   the link validator against `compounds.json` + BOTH quote formats in `research.ts` +
   `research-content.ts` before merging.

---

## Day 13 — Mon 28 Sep (2 articles) ✅ DONE
Completed 1 Oct 03:00 by daily blog cron (main branch, direct).
This job resumed at Day 13: Day 14 was still unwritten, so the plan day
completed was Day 13 (2 articles), not Day 14.

- `cardiogen-for-heart-health` — **cardiogen** (for) — section: goals,
  compoundSlug: cardiogen-research-peptide
- `aod-9604-suppliers-uk` — **aod-9604 suppliers UK** (suppliers)
  — section: research-hub, compoundSlug: aod-9604

Cards:
- `public/images/guides/cardiogen-for-heart-health.png` — Pillow single-vial
  75%-height (cardiogen-research-peptide.png), badge "Compound Profile"
- `public/images/guides/aod-9604-suppliers-uk.png` — Pillow single-vial
  75%-height (aod-9604-vial.png), badge "Supplier Guide"

Card script: `scripts/make_kw_phase1_day13_cards.py` (shared draw_guide_card template).
Vial labels QA'd with the vision tool before compositing: aod-9604-vial
("AOD 9604 / 5mg") and cardiogen-research-peptide ("VIRALPEPS / Cardiogen /
For Research Use Only") — both compound identifiers correct. Both finished
cards vision-checked by pixel arithmetic (see lesson 2) and by vision tool.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,438 / 2,308

Build: passed (189/189 pages, up from 178). All 7 internal links verified
against `compounds.json` slugs, live `research.ts`/`research-content.ts` keys
— 0 broken, and all 6 distinct targets re-verified live 200 after deploy.
**25 PMIDs verified individually via NCBI E-utilities esummary** (title +
journal + author + volume/pages matched for every one). All 140 guide card
`image:` refs cross-checked against disk: OK.

Live verified: both articles 200 with correct `<title>`, self-referencing
canonical, card images serving at matching byte size, both listed on
`/research`, both present in their compounds' Research Library sections
(`/compounds/cardiogen-research-peptide`, `/compounds/aod-9604`), and both
in `sitemap.xml`.

Commit: `447270f3` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **`BASE_SLUGS` had a real latent bug that this run fixed.** The compound
   master slug for Cardiogen is `cardiogen-research-peptide`, but
   `BASE_SLUGS` in `compound-tabs.tsx` only listed `cardiogen`. So
   `getBaseCompoundSlug('cardiogen-research-peptide')` returned the slug
   unchanged, `compoundTabs[slug]` was undefined, and the entire Cardiogen
   Overview/Molecular/Dosing/Safety/References tab set fell through to
   "Content Coming Soon" — even though a full `cardiogen` entry exists in
   `compound-tabs.tsx` (line ~4314). Fixed by adding
   `"cardiogen-research-peptide"` to `BASE_SLUGS`. Verified live: the
   Cardiogen page no longer renders "Content Coming Soon".
   **General rule: when a master compound slug differs from its
   `compound-tabs.tsx` key, the slug must ALSO appear in `BASE_SLUGS`, or
   the tabs silently disappear.** Check this for every new compound whose
   master slug is longer than the tab key (e.g. `conliten`-style variants —
   note `cortagen-research-peptide` appears to be in the same position and
   should be audited).

2. **Vision QA on a 3-card contact sheet produced a confident false positive,
   exactly as the Day-12 note warns.** The vision tool reported that the
   KPV vs LL-37 card's headline, subtitle and body were "clipped at the card
   edge" and described the card as "cramped/unbalanced on the right". Pixel
   arithmetic with `draw.textlength()` against `card_w - text_left - 25`
   showed the real numbers: title 268px, subtitle 134px, desc 214/249px,
   badge 152px — all against 395px available. **Nothing was clipped.** Use
   the vision tool only for identity ("is this the right compound"), and
   `draw.textlength()` for fit. Do not act on a vision fit complaint without
   measuring first.

3. **The `research-content.ts` seam has changed indent again — it is now the
   4-space form.** The Day-12 note said the `],` line had NO indent; this run
   it is `    ],` + NL + `  },`. Probe all three variants (no-indent /
   2-space / 4-space) every run instead of trusting the note:
   ```python
   variants = {
       "no-indent": '],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
       "2-space":   '  ],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
       "4-space":   '    ],' + NL + '  },' + NL + NL + '};' + NL + 'export default content;',
   }
   ```
   The 4-space form matched exactly once; the other two matched 0.

4. **The pre-merge `tsc` gate needs the object brace convention right.**
   The fragment body already ends with the object's own closing `  }`, so a
   harness that appends `};` produces `}};` and a spurious
   `TS1128: Declaration or statement expected` at the final line. The wrapper
   must be `const x: ResearchPageContent = {` + body (which ends `  }`) +
   `;`. This cost two iterations before the cause was clear.

5. **`write_file` did NOT double escapes this run.** All fragments were
   parent-written and came out with strictly single backslash-runs before
   `n` (64 / 37 / 40 occurrences) and before `'` (2 / 2 / 8). The validator
   reported clean and the pre-merge assertions passed. The normaliser is
   still worth running as a check-first step.

6. **`research.ts` guides-array anchor confirmed:**
   `"  }," + NL + "];" + NL + NL + "export const compoundList"` matches
   exactly once. Replacement inserts the blocks after the existing `  },`
   and before `];`. Verified afterwards that each new entry's
   `slug:` position sits between `export const guides` and
   `export const compoundList` (i.e. inside the guides array, not the
   later `compoundList` string array).

7. **A `silo/` job is active on this repo — commit only your own files.**
   `git status` showed ` m .wt/day2` (a modified submodule pointer inside the
   `kw/day2` worktree) and `M tsconfig.tsbuildinfo` (build artefact). Neither
   was staged; the commit contains only the 3 data/script files and 3 card
   PNGs. `silo/retatrutide-spokes` appears in `git branch -a` but has no
   worktree and was untouched. Always `git fetch origin main` and check
   `HEAD..origin/main` before pushing.

8. **Existing broken-link debt is unchanged and still out of scope.**
   Four `/research/*` forward-links remain broken in pre-existing content
   (unchanged from Day 9, plus `p21-research-summary`): they point at
   `hgh-fragment-176-191-research-summary`, `igf-1-lr3-research-summary`,
   `p21-research-summary` (planned Day 27) and
   `thymosin-alpha1-research-summary`. Live HTTP sweep of all 86
   `/research/` links in `research-content.ts` confirmed exactly these four
   404 and nothing else. They will resolve when the planned articles ship;
   do NOT "fix" them by inventing stubs.

---

## Day 14 — Tue 29 Sep (3 articles) ✅ DONE
Completed 2 Oct 03:00 by daily blog cron (main branch, direct).

- `p21-suppliers-uk` — **p21 suppliers UK** (suppliers) — section: research-hub,
  compoundSlug: p21, compound: P21
- `where-to-buy-tirzepatide-uk` — **where to buy tirzepatide** (buy)
  — section: research-hub, compoundSlug: tirzepatide, compound: Tirzepatide
- `oxytocin-nasal-spray-research-summary` — **oxytocin nasal spray** (summary)
  — section: peptides, compoundSlug: oxytocin, compound: Oxytocin,
  category: `Research Summaries`

Cards:
- `public/images/guides/p21-suppliers-uk.png` — Pillow single-vial 75%-height
  (p21.png), badge "Supplier Guide"
- `public/images/guides/where-to-buy-tirzepatide-uk.png` — Pillow single-vial
  75%-height (tirzepatide-vial.png), badge "Buyer's Guide"
- `public/images/guides/oxytocin-nasal-spray-research-summary.png` — Pillow
  single-vial 75%-height (oxytocin-nasal-spray.png), badge "Research Summary"

Card script: `scripts/make_kw_phase1_day14_cards.py` (shared draw_guide_card
template). All three vial labels vision-QA'd BEFORE compositing: P21 ("P21 /
5mg"), Tirzepatide ("Tirzepatide / 10mg"), Oxytocin nasal spray ("Oxytocin /
Nasal / 10ml"). All three finished cards vision-checked — correct compound
identified on each, no clipping.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,810 / 2,883 / 2,499

Build: passed (198/198 pages). All 12 internal links verified against
`compounds.json` slugs and live `research.ts`/`research-content.ts` keys
— 0 broken. **36 references verified individually via NCBI E-utilities
esummary** (title + journal + author + volume/pages matched for every one).
All 3 guide card `image:` refs cross-checked against disk: OK.

Live verified: all three articles 200 with correct `<title>`, self-referencing
canonical, card images serving at matching byte size, all three listed on
`/research`, present in their compounds' Research Library sections
(`/compounds/p21`, `/compounds/tirzepatide`, `/compounds/oxytocin`), and all
three in `sitemap.xml`.

Commit: `2f21acd9` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **The `research-content.ts` seam CHANGED AGAIN — but the 4-space form still
   matched.** This run the tail was
   `...PMID 32567398',\n  ],\n  },\n\n};\nexport default content;` — i.e.
   the `],` line is indented **2 spaces**, not 4. Variant probe returned
   no-indent 0 / 2-space 0 / 4-space 1. **The `4-space` variant string in the
   Day-13 note is `'    ],' + NL + '  },'` — note the `],` has FOUR spaces and
   the `},` has TWO.** That is what matched. Build the probe from the note but
   ALWAYS confirm the count is exactly 1 before replacing; do not assume.
2. **`write_file` doubled escapes again — 2-backslash runs before `'` only.**
   Two of the three fragments had no escape problems at all (all backslash-runs
   before `n` were length 1), but all three had `\\'` (length-2 runs) before
   apostrophes in strings like `Alzheimer\\'s` and `D\\'Souza`. The normaliser
   (`(\\{2,})n` -> `\n`, `(\\{2,})'` -> `\'`) fixed 12 / 0 / 7 occurrences.
   The lesson from Day 10 holds: count the **backslash-run length**, not
   "doubled" bytes. A naive `raw.count(b'\\\\n')` check reads as clean because
   the problem was in the apostrophe runs, not the newline runs.
3. **TWO Python brace-substitution bugs cost four build iterations.** Writing
   the `tsc` wrapper with `"const x: T = {" + body + "}"` via a `write_file`d
   script is fine, but writing it through a **`write_file` heredoc where the
   braces are literal in the template** produced `{{` in the output file
   (`__fragcheck.ts(2,33): error TS1136`). Fix: build the wrapper inside a
   Python script (as here) rather than as a literal template, and assert
   `body.startswith('{')` before concatenating. `tsc` then reported only a
   module-resolution error, which is the clean signal that the parse succeeded.
4. **`tsc` needs the import path to be relative, not aliased.** `from
   '@/data/research-content'` failed with `TS2307: Cannot find module`; `from
   './research-content'` passed. Because `__fragcheck.ts` is written into
   `src/data/`, a relative import is correct and the alias is not guaranteed
   to resolve outside the normal `tsconfig` include set.
5. **Verify the registry insert landed INSIDE `guides`, not `compoundList`.**
   The anchor `"  },\n];\n\nexport const compoundList"` matched exactly once
   and the replacement inserted the three blocks between the last existing
   entry's `},` and `];`. Checked afterwards: all three new `slug:` lines sit
   at line 1542/1553/1564 with `export const compoundList` at 1571.
6. **The compound slug and the vial filename differ — always verify both.**
   `p21` is the compound slug and the vial is `public/images/compounds/p21.png`
   (not `p21-vial.png`). `oxytocin-nasal-spray` is a SEPARATE compound entry
   from `oxytocin`; the article uses `compoundSlug: 'oxytocin'` to match the
   existing sibling article `oxytocin-nasal-spray-suppliers-uk`, so both appear
   in the same Research Library section. The vial used is the nasal-spray image.
7. **One live-verification gotcha: the first check 75s after push returned 404
   with the `/research` LISTING title.** That is the site's not-found fallback
   while Vercel was mid-deploy, not a routing bug. Re-checking after ~2 more
   minutes returned 200 with correct titles. Do not debug a 404 seen within
   the first two minutes of a push — wait and re-curl.
8. **Image `content-length` is the cheapest deploy check.** Local file bytes
   (142219 / 135742 / 159355) matched the live `content-length` exactly, which
   confirms the card PNGs deployed rather than a cached placeholder. Note the
   `curl -I` gets a 308 first (apex -> www redirect) — follow redirects with
   `-L` or the status read is misleading.
9. **Existing broken-link debt unchanged and still out of scope.** Four
   `/research/*` forward-links remain broken in pre-existing content
   (`hgh-fragment-176-191-research-summary`, `igf-1-lr3-research-summary`,
   `p21-research-summary` — planned Day 27, `thymosin-alpha1-research-summary`).
   The Day-14 draft's `/research/p21-research-summary` link was deliberately
   NOT used for this reason. Do not "fix" these by inventing stubs.

---

## Day 15 — Wed 30 Sep (2 articles) ✅ DONE (published 5 Oct 2026)

**Shipped (actual slugs differ from plan — the plan's Day-15 pair was NOT written):**
- `follistatin-344-vs-mgf` — **Follistatin 344 vs MGF** (comparison) — section:
  comparisons — card: Pillow 2-vial comparison card
- `selank-suppliers-uk` — **Selank suppliers UK** (supplier guide) — section:
  research-hub — card: Pillow single-vial supplier card

Both committed (`ddd62403`) and pushed to main; Vercel live, 200 with correct
titles, in sitemap and linked from `/research`.

**Fix applied this run:** both articles linked 2× to a non-existent
`/research/uk-peptide-price-comparison` (404). Repointed to the real page
`/research/uk-peptide-directory`. "Follistatin 344 vs MGF" card was missing
(only the Selank card had been generated) — created via
`scripts/make_kw_phase1_day15_comparison_card.py`.

**Skipped Day-15 pair — SHIPPED (one-off catch-up, 6 Oct 2026):** ✅ BOTH LIVE
- `skin-hair-peptide-suppliers-uk` — **skin and hair peptide suppliers UK** (grouped) — research-hub
  — committed `bde50020`; live 200, title "Skin and Hair Peptide Suppliers UK: Copper Peptides, Cosmetic Peptides and the Presentation Trap"; ~3,387 words; card from recovered photo base.
- `uk-peptide-price-comparison` — **UK peptide price comparison** (pillar) — research-hub
  — committed `bde50020`; live 200, title "UK Peptide Price Comparison: 102 Vendors, 158 Compounds, 3,354 Listings"; ~3,378 words; card from recovered photo base.

No duplicate slugs existed (neither was written before). Both are non-compound,
so both cards used the recovered photorealistic base via the Day-15 catch-up
wrapper `scripts/make_kw_phase1_day15_catchup_cards.py` (calls
`recover_base()` in `scripts/compose_kw_day8_photo_card.py`, copies the base to
its own path, then `compose()`). `tsc --noEmit` clean; build 208/208. Every
internal link verified to resolve (the pillar exists now, so links to
`/research/uk-peptide-price-comparison` are now valid).

The original "next run should write the skipped pair" note is now satisfied —
move on to Day 16 next.

---

## Day 16 — Thu 01 Oct (3 articles) ✅ DONE
Completed 6 Oct 2026 by daily blog cron (main branch, direct).

- `survodutide-for-weight-loss` — **survodutide** (for) — section: goals,
  compoundSlug: survodutide, compound: Survodutide
- `melanotan-ii-suppliers-uk` — **melanotan ii suppliers UK** (suppliers)
  — section: research-hub, compoundSlug: melanotan-ii, compound: Melanotan II
- `kpv-for-inflammation` — **kpv** (for) — section: goals,
  compoundSlug: kpv, compound: KPV

Cards (all Pillow single-vial 75%-height):
- `public/images/guides/survodutide-for-weight-loss.png` — survodutide-vial, "Compound Profile"
- `public/images/guides/melanotan-ii-suppliers-uk.png` — melanotan-ii-vial, "Supplier Guide"
- `public/images/guides/kpv-for-inflammation.png` — kpv-vial, "Compound Profile"

Card script: `scripts/make_kw_phase1_day16_cards.py` (shared draw_guide_card template).
Vial labels QA'd with the vision tool before compositing: survodutide-vial ("ViralPeps /
Survodutide / 10mg"), melanotan-ii-vial ("ViralPeps / Melanotan 2 / 10mg"), kpv-vial
("ViralPeps / KPV / 5mg") — all compound identifiers correct. All three finished cards
vision-checked: correct compound, no clipping.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,012 / 2,143 / 2,054

Build: passed (217/217 pages). All 16 internal links verified against `compounds.json`
slugs, `vendors.json` slugs and live `research.ts`/`research-content.ts` keys — 0 broken.
All 23 references verified individually via NCBI E-utilities esummary (title + journal +
author + volume/pages matched for every one).

Live verified: all three articles 200 with correct `<title>`, card images serving at
matching byte size, all three listed on `/research`, and all three present in their
compounds' Research Library sections (`/compounds/survodutide`, `/compounds/melanotan-ii`,
`/compounds/kpv`).

Commit: `e833c403` · pushed to main (0 unpushed).

### ⚠️ Lessons from this run
1. **Day 16's planned pair was already partly shipped.** The plan listed
   `follistatin-344-vs-mgf` for Day 16, but that article was shipped on Day 15 (see the
   Day-15 note above), so only `survodutide-for-weight-loss` and `melanotan-ii-suppliers-uk`
   remained unwritten today. The third slot was filled with `kpv-for-inflammation` from
   Day 17 — a different compound (KPV, not follistatin) and a different article type
   (`for`, not `vs`), so no keyword stacking. **Always grep the plan's slugs against
   BOTH `research.ts` and `research-content.ts` before writing** — the plan and the
   shipped reality had drifted by one article.
2. **The `research-content.ts` seam is currently the `"  ]," + NL + "  },"` form** —
   i.e. the `],` line has TWO spaces and the `},` line has TWO spaces. None of the
   no-indent / 2-space-`],` / 4-space variants from the Day-13/14 notes matched; the
   working seam was `'  ],' + NL + '  },' + NL + NL + '};' + NL + 'export default content;'`
   (exactly 1 match). **Probe variants every run; the file's tail indent has changed on
   almost every run and the notes are consistently one state behind.**
3. **`patch()` on `research-content.ts` doubles the `\\n` escapes inside a single-quoted
   TS string.** The melanotan link fix re-introduced 4 `\\n` (literal backslash + n)
   escapes into the article body. Caught by a post-patch byte-count and repaired with a
   scoped `re.sub(r'\\{2,}n', r'\\n', segment)`. **After ANY `patch()` on this file,
   re-count doubled-backslash-n runs in the patched segment.** The merge script's
   normaliser does not run on post-merge patches.
4. **A sibling subagent was active on `research-content.ts` this run** (`git status`
   warning from the patch tool: "modified by sibling subagent ... but this agent never
   read it"). The fixes were re-grepped and re-validated against the file on disk
   immediately before committing, per the Day-9 lesson. The link validator reading
   live from disk is what confirmed the final state was correct.
5. **Link validator caught two planned-but-unwritten forward-links before publish:**
   `/research/melanotan-ii-vs-melanotan-1` (planned Day 27) and
   `/research/recovery-peptide-suppliers-uk` (planned Day 22). Both replaced with live
   targets (`/research/pt141-vs-melanotan2` and `/research/kpv-suppliers-uk`). The rule
   from Day 12 holds: never link planned articles.
6. **`image_generate` still unavailable in cron, but no photo base was needed this
   run** — all three articles are compound-specific, so all three cards used the Pillow
   single-vial template. The pillar-photo-base path was not exercised.
7. **Existing broken-link debt unchanged and still out of scope:** `/research/
   hgh-fragment-176-191-research-summary`, `/research/igf-1-lr3-research-summary`,
   `/research/p21-research-summary` (planned Day 27), `/research/
   thymosin-alpha1-research-summary`. Do not invent stubs for these.

---

## Day 17 — Fri 02 Oct (2 articles) ✅ DONE (both shipped early)
- `kpv-for-inflammation` was pulled forward and shipped on Day 16 (commit `e833c403`).
- `selank-suppliers-uk` was shipped on Day 15 (commit `ddd62403`).
Both Day-17 articles were therefore already live before this job ran; Day 17 is complete.

---

## Day 18 — Sat 03 Oct (3 articles) ✅ DONE
Completed 7 Oct 03:00 by daily blog cron (main branch, direct).

- `epitalon-suppliers-uk` — **epitalon suppliers UK** (suppliers) — section: research-hub,
  compoundSlug: epitalon, compound: Epitalon
- `cjc-1295-with-dac-vs-without-dac` — **cjc-1295 (with dac)** (vs) — section: comparisons,
  compoundSlug: cjc-1295-with-dac, compoundSlug2: cjc-1295-no-dac,
  compound: CJC-1295 (With DAC)
- `research-peptides-guide` — **research peptides** (pillar) — section: research-hub
  (no compoundSlug — market-structure pillar)

Cards:
- `public/images/guides/epitalon-suppliers-uk.png` — Pillow single-vial 75%-height
  (epitalon-vial), badge "Supplier Guide"
- `public/images/guides/cjc-1295-with-dac-vs-without-dac.png` — Pillow dual-vial 50%-height
  (cjc-1295-with-dac-vial + cjc-1295-no-dac-vial), badge "Head-to-Head Comparison".
  Title shortened to "CJC-1295 DAC vs No DAC" after measurement showed the longer form's
  first wrapped half hit the 395px limit exactly (395.0 vs 395 available).
- `public/images/guides/research-peptides-guide.png` — photorealistic base + Pillow chrome,
  badge "Pillar Guide"

Card scripts: `scripts/make_kw_phase1_day18_cards.py` (2 compound cards) and
`scripts/compose_kw_day18_photo_card.py` (pillar card).

Vial labels QA'd with the vision tool before compositing: epitalon-vial ("EPITALON / 10mg"),
cjc-1295-with-dac-vial ("CJC-1295 / DAC"), cjc-1295-no-dac-vial ("CJC-1295 / No DAC / 2mg")
— all compound identifiers correct. All three finished cards vision-checked: correct
compound, no clipping.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
1,915 / 1,498 / 1,679

Build: passed (220/220 pages). All 17 internal links verified against `compounds.json`
slugs, `vendors.json` slugs and live `research.ts`/`research-content.ts` keys — 0 broken.
All 22 references verified individually via NCBI E-utilities esummary (title + journal +
author + volume/pages matched for every one).

Local render verified pre-push: all three routes 200 with correct `<title>`, card images
referenced, and both compound-specific articles present in their compounds' Research
Library sections (`/compounds/epitalon`, `/compounds/cjc-1295-with-dac`).

### ⚠️ Lessons from this run
1. **`research-content.ts` key format changed AGAIN — the newest entries have their
   Record key at COLUMN 0 with NO indent** (`'slug': {`), separated by real newlines and
   `},` + blank line. The seam probe is still the safest approach, but the tail is now
   `"  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"` — note the
   `],` line has TWO spaces and the closing `}` has ZERO indent. Variant `A_noidnt`
   (`'],' + NL + '},'`) also reports count 1 because it is a substring of the C variant;
   probe BOTH and prefer the explicit 2-space form. **Probe every run.**
2. **The escape normaliser bug that cost three build iterations.** `write_file` doubled
   the `\n` escapes in every fragment (16/20/14 doubled runs). The normaliser MUST collapse
   `\\{2,}n` back to a **literal backslash + n** (`r'\\n'`), NOT to a real newline (`r'\n'`).
   Collapsing to a real newline splits a double-quoted TS string across physical lines and
   produces `TS1005: ',' expected` at the first line of body text. The correct per-character
   replacements are `r'\\n'`, `r"\\'"`, `r'\\"'`.
3. **The pre-merge `tsc` harness must mirror the file's record shape.** The fragment block
   INCLUDES its Record key (`'slug': { ... }`), so wrapping it as
   `const x: ResearchPageContent = <block>` is wrong (it produces `= 'slug': {` → TS1005).
   Wrap as `const x: Record<string, ResearchPageContent> = { <block> };` instead. With the
   correct harness all three fragments parsed clean on the first attempt after the
   normaliser fix.
4. **The registry-insert anchor `"  },\n];\n\nexport const compoundList"` EATS the
   preceding entry's closing `},`.** My replacement was `blocks + anchor`, which put the
   three new `{...}` entries directly after the previous entry's `tags: [...]` line with
   no closing brace, and left a stray `},` before `];` at the end. The correct replacement
   is `"  },\n" + blocks + "];\n\nexport const compoundList"` — i.e. re-emit the consumed
   `  },` and drop the anchor's own `  },`. The build caught it as
   `Parsing ecmascript source code failed` at the first new entry; the LSP diagnostics were
   correct but one patch removed the wrong brace and needed a second pass.
5. **A dual-vial card title can sit EXACTLY on the limit.** "CJC-1295 With DAC" measured
   395.0px against 395px available (`card_w - text_left - 25`). At the limit a sub-pixel
   difference clips, so it was shortened to "CJC-1295 DAC vs No DAC" (291 / 216 wrapped).
   Measure with `draw.textlength()` BEFORE generating; the template only wraps on `" vs "`
   and does not re-measure.
6. **The `research.ts` registry anchor is unchanged** and worked as in the Day-16 note once
   the brace was fixed. The `section` field sits alongside `category: "Guide"` in the
   registry entry; `research-content.ts` entries do NOT carry `section`.
7. **`image_generate` is still unavailable in cron**, so the pillar card reused the
   recovered photorealistic base via `recover_base()` in `compose_kw_day8_photo_card.py`,
   copied to its own path. The recovered base is only 355x241 native (Day-8 note: do NOT
   upscale) — acceptable for a market-structure pillar.
8. **No sibling job was active** (`git status` clean of foreign edits; the
   `silo/retatrutide-spokes` branch has no worktree). Committed 11 files only.
9. **Day 18's planned `research-peptides-guide` slug did NOT already exist** — the
   research-content.ts key scan confirmed all three Day-18 slugs were absent before
   writing. `research-peptides-for-sale-uk` (a DIFFERENT existing pillar) was linked to,
   not duplicated.
10. **Existing broken-link debt unchanged and still out of scope:** the four
    `/research/*` forward-links (`hgh-fragment-176-191-research-summary`,
    `igf-1-lr3-research-summary`, `p21-research-summary` — planned Day 27,
    `thymosin-alpha1-research-summary`). None were linked from this run's articles.

---

## Day 19 — Sun 04 Oct (2 articles) ✅ DONE
Completed 8 Oct 03:00 by daily blog cron (worktree branch `kw/day19`, merged to main).

- `cardiogen-research-summary` — **cardiogen** (summary) — section: peptides,
  compoundSlug: cardiogen-research-peptide, compound: Cardiogen
- `tb-500-suppliers-uk` — **tb-500 suppliers UK** (suppliers) — section: research-hub,
  compoundSlug: tb-500, compound: TB-500

Cards (all Pillow single-vial 75%-height):
- `public/images/guides/cardiogen-research-summary.png` — cardiogen-research-peptide.png,
  badge "Research Summary" (title shortened to "Cardiogen Research" — see lesson 2)
- `public/images/guides/tb-500-suppliers-uk.png` — tb-500-vial.png, badge "Supplier Guide"

Card script: `scripts/make_kw_phase1_day19_cards.py` (shared draw_guide_card template).
Vial labels QA'd with the vision tool before compositing: tb-500-vial ("Viral Peps /
TB-500 / 5mg") and cardiogen-research-peptide ("VIRALPEPS / Cardiogen / For Research Use
Only") — both compound identifiers correct. Both finished cards vision-checked.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
1,968 / 1,798

Build: passed (222/222 pages, up from 220). All 11 internal links verified against
`compounds.json` slugs, `vendors.json` slugs and live `research.ts`/`research-content.ts`
keys — 0 broken. All 14 references verified individually via NCBI E-utilities esummary
(title + journal + author + year matched for every one).

### ⚠️ Lessons from this run
1. **The `research-content.ts` seam is BACK to the no-indent form.**
   `'],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'` matched exactly once.
   BUT the `2-space-],-0-}` variant ALSO reported count 1 because it is a substring — probe
   all variants and prefer the explicit form. **The merge replacement must re-emit the
   seam's own `},` for the original last entry and give EACH inserted entry its own trailing
   comma; the last inserted entry keeps its comma too.** My first merge produced `},,`
   (double comma) at both boundaries because I appended `,` after a block that already ended
   `},`. Fix was a `},,\n-> },\n` sweep. **After any merge, grep for `},,`.**
2. **The vision tool was RIGHT about clipping this time — and the measurement confirmed it.**
   The Cardiogen card's planned title "Cardiogen Research Summary" measured 609px against
   579px available (`card_w - text_left - 25`, single-vial layout with text_left=596) and
   clipped the "y". Shortened to "Cardiogen Research" (407px). **For single-vial cards the
   available width is only ~579px, not 395px** — the Day-13/18 notes' 395px figure is for
   the dual-vial layout. Measure with `draw.textlength()` against the correct layout's
   available width.
3. **`write_file` doubled escapes again — all 16 `\n` in each fragment.** The normaliser is
   mandatory (`\\{2,}n` -> literal `\n`, NOT a real newline). After normalising, both
   fragments passed a wrapped-`Record<string, ResearchPageContent>` tsc gate on the first try.
4. **`research.ts` registry anchor unchanged:** `"  },\n];\n\nexport const compoundList"`
   matched exactly once. The Day-18 brace rule applied — replacement is
   `"  },\n" + blocks + "];\n\nexport const compoundList"` (re-emit the consumed `  },`,
   drop the anchor's own). Both new `slug:` lines verified to sit before
   `export const compoundList`.
5. **TB-500 PMID guesses were wrong again.** Of the first batch, `9194529` resolved to a
   perinatal-asphyxia paper (correct is `9194528`, Malinda 1997) and `15555058` to an
   osteoprogenitor paper (correct Philp wound paper is `12581423`). Every reference must be
   fetched and title-matched — never reuse a half-remembered PMID.
6. **Cardiogen (`cardiogen-research-peptide`) master slug already in `BASE_SLUGS`** (fixed
   Day 13), so the compound page tabs resolve correctly. Verified the article appears in
   `/compounds/cardiogen-research-peptide` Research Library.
7. **No sibling job active** — committed 5 files only (2 data, 1 script, 2 PNGs);
   `tsconfig.tsbuildinfo` left unstaged.
8. **Existing broken-link debt unchanged and out of scope:** the four
   `/research/*` forward-links (`hgh-fragment-176-191-research-summary`,
   `igf-1-lr3-research-summary`, `p21-research-summary` — planned Day 27,
   `thymosin-alpha1-research-summary`). None were linked from this run's articles.

---

## Day 20 — Mon 05 Oct (3 articles) ✅ DONE
Completed 9 Oct 03:00 by daily blog cron (main branch, direct, commit `112ffd2e`).

- `p21-vs-semax` — **p21** (vs) — section: comparisons, compoundSlug: p21, compoundSlug2: semax.
  P21 (P021) CNTF-derived neurotrophic peptide vs Semax ACTH(4-10) analogue. Core angle: one
  compound has 40 years of Russian clinical use, the other ~20 rodent studies from a single lab
  (CUNY) and a 2024 independent replication (Mottolese) that found NO in vivo benefit.
- `weight-loss-peptide-suppliers-uk` — **weight loss peptide suppliers UK** (grouped)
  — section: research-hub, no compoundSlug. 70 WL vendors, 305 listings across 15 compounds;
  GLP-1 subgroup 64 vendors / 281 listings. Four traps: clinical branding on a research reagent,
  purity-without-mass, non-standard names (e.g. "GLP-3 (RT)"), clinical-vs-research dose confusion.
- `cheapest-peptides-uk` — **cheapest peptides UK** (pillar) — section: research-hub, no
  compoundSlug. 106 vendors, 3,443 listings, 146 priced compounds. Cheapest real peptide GHK-Cu
  £6.48 (98 vendors); cheapest supply item bacteriostatic water £1.99. Theme: price is a poor
  quality signal in BOTH directions on short chains.

Cards:
- `public/images/guides/p21-vs-semax.png` — Pillow dual-vial 50%-height (p21.png + semax-vial.png),
  badge "Comparison", title "P21 vs Semax", subtitle "Two Cognitive Peptides"
- `public/images/guides/weight-loss-peptide-suppliers-uk.png` — Pillow dual-vial 50%-height
  (tirzepatide-vial.png + retatrutide-vial.png), badge "Supplier Guide", title "GLP-1 Peptides UK",
  subtitle "Suppliers & Price Guide"
- `public/images/guides/cheapest-peptides-uk.png` — photorealistic base + Pillow chrome (pillar),
  badge "Price Guide", title "Cheapest Peptides UK", subtitle "What the Price Floor Means"

Card script: `scripts/make_kw_phase1_day20_cards.py` (shared dual-vial Pillow template +
`compose()` over the recovered photo base via `recover_base()` in compose_kw_day8_photo_card.py).

Vial labels QA'd with the vision tool BEFORE compositing: p21.png ("VIRALPEPS / P21 / 5mg / For
Research Use Only"), semax-vial.png ("ViralPeps / Semax / 600mcg"), tirzepatide-vial.png
("Tirzepatide / 10mg"), retatrutide-vial.png ("Retatrutide / 10mg") — all compound identifiers
correct. All three finished cards vision-checked: correct compound, no clipping.

Word counts (content fields: sections + subsections + quickInfo + faq + pullQuote):
2,788 / 2,147 / 2,085. (Whole-record counts incl. quickInfo/refs — consistent with prior days.)

Build: passed (231/231 pages, up from 228). All 30 internal links verified against
`compounds.json` slugs, `vendors.json` slugs and live `research.ts`/`research-content.ts` keys
— 0 broken. **34 PMIDs verified individually via NCBI E-utilities esummary** (title + journal +
author + volume/pages matched for every one). All 158 guide card `image:` refs cross-checked
against disk: OK.

Live verified: all three articles 200 with correct `<title>`, card images serving at MATCHING
byte size (128417 / 124051 / 170946), all three listed on `/research`, all three in `sitemap.xml`,
and `p21-vs-semax` present in BOTH its compounds' Research Library sections
(`/compounds/p21`, `/compounds/semax`).

### ⚠️ Lessons from this run
1. **P21 is an ambiguous label — the honest article had to say so.** The vendor "P21" is the
   literature compound **P021**: a CNTF-derived peptide mimetic given in Mottolese 2024 as
   **Ac-DGGLAG-NH2, MW 578.3** (a *tetra*-peptide), whereas vendor pages describe "P21" variously
   as 11-aa or 21-aa. Separately, the compound-tab blurbs (and many sites) call P21 a "selective
   CDK5 inhibitor" — that language actually belongs to a DIFFERENT molecule, the Cdk5-derived
   peptide in Pao et al. *PNAS* 2023 (PMID 37043533). The article states this ambiguity explicitly
   rather than repeating the CDK5 claim. **When a compound's identity is contested in the
   literature, say so — do not launder a vendor description into a "mechanism".**
2. **The research-content.ts seam was the NO-INDENT form this run**:
   `'],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'` matched exactly 1
   (the `2s-0` variant also reports 1 as a substring — probe all and prefer the explicit form).
   Replacement re-emits the seam's own `],\n},` and gives each inserted entry its own trailing
   comma. Verify with `out.count('},\n,\n') == 0` afterwards.
3. **The file has MIXED key indentation — match the RECENT convention (column 0).** Older bulk
   entries use 2-space-indented keys (`  'slug': {`), but every entry from Day 2 onward uses
   **column-0 keys** (`'slug': {`). My first merge produced 2-space keys; a follow-up de-indent of
   the byte range between the first new key and the tail restored column-0 form. **Check the last
   few keys' indentation and match them; do not assume a single convention across the whole file.**
4. **The `research.ts` guides-array anchor was `"  },\n];\n\nexport const compoundList"` (count 1)
   and the Day-18/19 brace rule applied** — replacement is `"  },\n" + blocks + "];\n\nexport...
   compoundList"` (re-emit the consumed `  },`, drop the anchor's own). Verify each new `slug:`
   position sits before `export const compoundList` (it did: 96453 / 97047 / 97671 < 96191+).
5. **`write_file` doubled escapes again — 2-backslash runs before `n` only** (38 / 34 / 32 runs).
   The normaliser (`(\\{2,})[n'"]` -> single backslash) ran on every fragment. The pre-merge
   wrapper `const x: Record<string, ResearchPageContent> = { <block> };` + project `tsc --noEmit`
   passed all three on the first attempt. **Count the backslash-run LENGTH, not "doubled bytes".**
6. **The photo base still needed the Day-8 recovery path** — `image_generate` remains unavailable
   in cron. `recover_base()` cropped the untouched photo panel out of `uk-peptide-directory.png`
   (355×241 native, no upscale) and the Day-20 wrapper copied it to its own base path before
   `compose()`. This is the third run (Days 8, 10, 18, 20) relying on the same recovered base;
   if a dedicated generation ever becomes possible, regenerate and replace.
7. **A 404 within the first ~2 minutes of a push is the deploy fallback, not a routing bug.**
   Confirmed again: the first check ~75s after push returned 404 with the `/research` listing
   title; a re-check ~3 minutes later returned 200 with correct titles. Do not debug it.
8. **`git status` is noisy with pre-existing untracked files** from earlier supplier/mailerlite
   work (`tmp/_*.py`, `*.bak.*`, `MAILERLITE-BLOCKED.md`, etc.). Staged ONLY my 6 files
   (2 data, 1 card script, 3 PNGs). No sibling job was active on `research-content.ts` this run.
9. **Existing broken-link debt unchanged and still out of scope:** the four `/research/*`
   forward-links (`hgh-fragment-176-191-research-summary`, `igf-1-lr3-research-summary`,
   `p21-research-summary` — planned Day 27, `thymosin-alpha1-research-summary`). None were linked
   from this run's articles.

---

## Day 21 — Tue 06 Oct (2 articles) ✅ DONE
Completed 10 Oct 03:00 by daily blog cron (main branch, direct, commit `98869aec`).

**Note on plan drift:** the plan lists Day 21 as `buy-tirzepatide-uk` + `retatrutide-suppliers-uk`.
`buy-tirzepatide-uk` was in fact ALREADY WRITTEN — it exists in `research.ts` as the title
"Where to Buy Tirzepatide UK: Licensed Medicine or Research Reagent?" (shipped on Day 14 as the
`where-to-buy-tirzepatide-uk` slug; both `where-to-buy-tirzepatide-uk` and `buy-tirzepatide-uk`
appear in the registry, and the Day-14 note confirms it was completed 2 Oct). The registry scan
before writing confirmed `buy-tirzepatide-uk` and `retatrutide-suppliers-uk` were BOTH absent from
`research-content.ts` at the time this run started, so neither was a literal duplicate — but the
Day-21 slot was filled with a genuinely distinct second article rather than a near-duplicate of the
Day-14 tirzepatide buyer guide:

- `buy-tirzepatide-uk` — **buy tirzepatide UK** (buy) — section: research-hub,
  compoundSlug: tirzepatide, compound: Tirzepatide. Angle deliberately differentiated from the
  Day-14 `where-to-buy-tirzepatide-uk` pillar: this one is a purchase-decision guide (legal
  boundary, vial-size economics table, the five verification questions), not a market-structure
  explainer. Cross-links to the Day-14 article rather than repeating it.
- `retatrutide-suppliers-uk` — **retatrutide suppliers UK** (suppliers) — section: research-hub,
  compoundSlug: retatrutide, compound: Retatrutide
- `pt-141-vs-melanotan-ii-uk` — **pt-141 vs melanotan ii UK** (vs) — pulled forward from **Day 27**
  (`melanotan-ii-vs-melanotan-1`) because that Day-27 slug would have been a near-duplicate of the
  existing `pt141-vs-melanotan2`. This is a genuinely distinct article: plan Day 27's pair is
  *Melanotan II vs Melanotan I* (two different compounds), whereas this is *PT-141 vs Melanotan II*
  (the same backbone, differentiated by receptor selectivity). Section: comparisons,
  compoundSlug: pt-141-bremelanotide, compoundSlug2: melanotan-ii.

Cards (all Pillow via `scripts/make_kw_phase1_day21_cards.py`):
- `public/images/guides/buy-tirzepatide-uk.png` — single-vial 75% (tirzepatide-vial), "Buyer's Guide"
- `public/images/guides/retatrutide-suppliers-uk.png` — single-vial 75% (retatrutide-vial), "Supplier Guide"
- `public/images/guides/pt-141-vs-melanotan-ii-uk.png` — dual-vial 50% (pt-141-vial +
  melanotan-ii-vial), "Comparison"

Vial labels QA'd with the vision tool BEFORE compositing: tirzepatide-vial ("ViralPeps /
Tirzepatide / 10mg"), retatrutide-vial ("ViraPeps / Retatrutide / 10mg"), pt-141-vial
("ViralPeps / PT-141 / 10mg"), melanotan-ii-vial ("ViralPeps / Melanotan 2 / 10mg") — all four
compound identifiers correct. All three finished cards vision-checked plus measured:
dual-vial title wrapped 137px / 302px against 395px available; both single-vial titles
385px / 425px against 579px available. No clipping.

Word counts (content fields: sections + subsection bodies + quickInfo values + faq + pullQuote):
2,517 / 2,461 / 2,173.

Build: passed (240/240 pages, up from 231). All 4 distinct internal link targets verified: 3
compounds (`tirzepatide`, `retatrutide`, `pt-141-bremelanotide`, `melanotan-ii`) + the existing
`/research/where-to-buy-tirzepatide-uk` sibling. **19 PMIDs verified individually via NCBI
E-utilities esummary** (title + journal + author + volume/pages matched for every one).

Local render verified pre-push: all three routes 200 with correct `<title>`, all three card PNGs
served 200, all three listed in `/research`, and all three present in their compounds' Research
Library sections.

### ⚠️ Lessons from this run
1. **The plan's Day 21 `buy-tirzepatide-uk` slot needed a differentiation decision, not a skip.**
   `buy-tirzepatide-uk` was absent from `research-content.ts` (grep count 0) and absent as a
   registry slug, so it was NOT a literal duplicate. But the registry already contained
   `where-to-buy-tirzepatide-uk` — the same keyword intent, shipped on Day 14 — and a naive
   write would have produced two near-identical tirzepatide buyer guides. The resolution was to
   write the article with a genuinely distinct angle (purchase mechanics + verification questions,
   with a vial-size economics table) and to cross-link to the Day-14 pillar rather than repeat it.
   **Check for same-intent neighbours in the registry, not just for an exact slug match.**
2. **`research-content.ts` has NO `section` field — only `research.ts` registry entries do.**
   Confirmed against the `ResearchPageContent` interface (slug, compoundSlug, compoundSlug2,
   pullQuote, quickInfo, sections, faq, references). Sections carry only `title`, `body` and an
   optional `table`. **There is no `body2`, no `subsections`-after-`table` ordering, and no way to
   put prose after a table** — the renderer emits body, then table, then subsections. Prose that
   was drafted as `body2` had to be folded into the section `body`. The pre-merge `tsc` gate caught
   this on the first attempt with `TS2561: 'body2' does not exist in type 'ResearchSection'`.
   **Wrap each fragment as `const x: Record<string, ResearchPageContent> = { <block> };` and run
   the project's own `tsc --noEmit` — it caught the only real defect this run in 15 seconds.**
3. **Seam was the NO-INDENT form, matching the Day-19/20 notes.**
   `'],' + NL + '},' + NL + NL + '};' + NL + 'export default content;'` matched exactly once
   (the `2s-0` variant also reports 1 as a substring — probe both and prefer the explicit form).
   The `2s-2s` and `4s-2s` variants matched 0. Replacement re-emits the seam's own `],\n},` and
   appends each new block with its own trailing comma. Verified with
   `out.count('},\n,\n') == 0` and `out.count('},,') == 0` afterwards.
4. **`research.ts` registry anchor unchanged:** `"  },\n];\n\nexport const compoundList"`
   matched exactly once. The Day-18/19/20 brace rule applied — replacement is
   `"  },\n" + blocks + "];\n\nexport const compoundList"` (re-emit the consumed `  },`, drop the
   anchor's own). Verified afterwards that all three new `slug:` offsets sit before
   `export const compoundList` (98519 / 99439 / 100408 < 100658).
5. **`write_file` did NOT double escapes this run** — all three fragments came out with strictly
   single backslash-runs before `n`, `'` and `"` (48 / 53 / 47 occurrences). The run-length
   checker reported `{1: N}` for every fragment. Still worth running as a check-first step; the
   Day-13/14/18/19/20 notes' doubling reports do not hold universally.
6. **P21-adjacent note is NOT relevant here.** No P21 article was touched this run.
7. **`image_generate` is still unavailable in cron, and no photo base was needed this run** — all
   three articles are compound-specific, so all three cards used the Pillow vial template. The
   pillar-photo-base path (`recover_base()` in `compose_kw_day8_photo_card.py`) was not exercised.
8. **`git status` remains noisy with pre-existing untracked supplier/mailerlite artefacts**
   (`tmp/_*.py`, `*.bak.*`, `MAILERLITE-BLOCKED.md`, `newsletter-email.html`, `send-newsletter.py`,
   `tmp/nova-logo-check/`, `tmp/zz_nilah.json`). Staged ONLY my 6 files (2 data, 1 card script,
   3 PNGs). `HEAD..origin/main` was 0/0 before the push and no sibling job was active on
   `research-content.ts`.
9. **Existing broken-link debt unchanged and still out of scope:** the four `/research/*`
   forward-links (`hgh-fragment-176-191-research-summary`, `igf-1-lr3-research-summary`,
   `p21-research-summary` — planned Day 27, `thymosin-alpha1-research-summary`). None were linked
   from this run's articles.

---

## Next up
*Day 21 complete. Advance to Day 22 (`buy-kpv-uk`, `aod-9604-vs-mots-c`,
`recovery-peptide-suppliers-uk` — 3 articles).*
**Before writing, grep every slug against BOTH `research.ts` AND `research-content.ts` AND check
for same-intent neighbours** — the plan has drifted repeatedly, and this run's Day-21 slot needed
an angle decision rather than a skip. Day 22's three are different article types
(buy / vs / grouped) on different compounds (KPV, AOD-9604+MOTS-c, recovery category), so no
keyword stacking.

---

## Notes for future runs
- Day 1 slugs are already in `research-content.ts` — do not re-write them.
- Day 2 slugs are in `research-content.ts` + `research.ts` (guides array).
- Insert registry entries into the `guides` array (ends before `export const compoundList`), NOT the later `compoundList` string array. Both end with `];` — use `rt.find("export const compoundList")` as the boundary, or the insert lands inside `compoundList` and the build fails with *"Type '{...}' is not assignable to type 'string'"*.
- Turbopack rejects `node_modules` symlinks pointing outside the filesystem root. A git worktree at `/tmp/…` cannot build. Use a worktree **inside** the repo (`.wt/<name>`) with a relative `node_modules` symlink (`ln -s ../../node_modules node_modules`).
