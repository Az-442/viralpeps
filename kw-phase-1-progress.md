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

## Next up
**Day 11 — Sat 26 Sep (2 articles)**
- `buy-tb-500-uk` — **buy tb-500 UK** (buy)
- `mots-c-for-metabolism` — **mots-c** (for)

None of the two slugs exist yet. Re-check both quote formats AND the `slug:` field
form before writing (see the gap/stub detection note in the skill), and remember
`category` in `research.ts` is `'Guide'` singular for guide-type articles.

---

## Notes for future runs
- Day 1 slugs are already in `research-content.ts` — do not re-write them.
- Day 2 slugs are in `research-content.ts` + `research.ts` (guides array).
- Insert registry entries into the `guides` array (ends before `export const compoundList`), NOT the later `compoundList` string array. Both end with `];` — use `rt.find("export const compoundList")` as the boundary, or the insert lands inside `compoundList` and the build fails with *"Type '{...}' is not assignable to type 'string'"*.
- Turbopack rejects `node_modules` symlinks pointing outside the filesystem root. A git worktree at `/tmp/…` cannot build. Use a worktree **inside** the repo (`.wt/<name>`) with a relative `node_modules` symlink (`ln -s ../../node_modules node_modules`).
