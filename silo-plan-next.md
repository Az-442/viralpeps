# ViralPeps — Next KW Silo Pages (Tirzepatide) + Repeatable SOP

**Created:** Sep 2026
**Status:** ✅ TIRZEPATIDE SILO BUILT + HUB INDEX BUILT — LIVE (commit `447f1fd9`)
**Basis:** Google UK autocomplete evidence (pulled live, see Evidence section) + the existing
Retatrutide silo as the reference implementation. NO keyword was invented.

---

## ✅ DONE — what shipped

- **`/compound-guides` hub index** (was 404) — new page, reads the `SILOS` registry.
- **Tirzepatide silo** — 6 spokes live, all 200, 1,379–2,113 words each, 0 duplication.
- **Generic components** `PriceTable.tsx` + `SiloTiles.tsx` — serve every compound.
- **`[slug]/page.tsx` refactored** compound-aware (Retatrutide + Tirzepatide).
- **`src/data/silos.ts`** registry — sitemap + hub index + cross-links read from it.
- **Sitemap** lists hub index + all 12 spokes.
- **Tirzepatide hub** (`/compounds/tirzepatide`) shows the 6 buying-guide tiles.
- Spoke 5 = `tirzepatide-uk-supplier` (**NOT** `for-sale` — 0 UK autocomplete results).

**Live URLs:** https://www.viralpeps.co.uk/compound-guides (index) +
`/compound-guides/{where-to-buy-tirzepatide-uk, cheapest-tirzepatide-uk,
tirzepatide-price-comparison-uk, buy-tirzepatide-online-uk, tirzepatide-uk-supplier,
best-tirzepatide-peptide}`

**Evidence-documented plan below (retained for the SOP and the next silos).**

---

## ✅ DONE — SEMAGLUTIDE SILO (commit `7b7f3051`)

Queue item 2 of 5. Built per the locked SOP. Deploy verified live 2026-09-30.

**Live URLs (all 200, verified):**
- https://www.viralpeps.co.uk/compound-guides/where-to-buy-semaglutide-uk
- https://www.viralpeps.co.uk/compound-guides/cheapest-semaglutide-uk
- https://www.viralpeps.co.uk/compound-guides/semaglutide-price-comparison-uk
- https://www.viralpeps.co.uk/compound-guides/buy-semaglutide-online-uk
- https://www.viralpeps.co.uk/compound-guides/semaglutide-uk-supplier
- https://www.viralpeps.co.uk/compound-guides/best-semaglutide-peptide

**Verified metrics:** rendered words 1,738–1,911 · titles 44–56 chars · descriptions
155–160 chars · focus keyword present in H1 + intro[0] · 27 live price rows from
compounds.json · hub tiles present on `/compounds/semaglutide` (12 compound-guides links) ·
index lists Semaglutide.

### Autocomplete evidence (Google UK, pulled live 2026-09-30)

All 6 modifiers returned ≥1 UK result — **no substitution needed** (unlike Tirzepatide's
`for sale`, which was dropped).

| Modifier | UK autocomplete result |
|---|---|
| `where to buy semaglutide uk` | **exact match #1** |
| `cheapest semaglutide uk` | **exact match #1** (+ `semaglutide prices uk`, `semaglutide best price uk`) |
| `semaglutide price comparison uk` | **exact match #1** |
| `buy semaglutide online uk` | **exact match #1** (+ `buy semaglutide online`, `buy semaglutide uk`) |
| `semaglutide uk supplier` | **`semaglutide suppliers uk` #1** (close match — plural form) |
| `best semaglutide peptide` | **exact match #2** (after `...company`) |

Corroborating hits from the broad probes: `semaglutide uk price`, `semaglutide uk cheapest`,
`semaglutide uk buy`, `where can i buy semaglutide uk online`, `is semaglutide available in uk`.

### Collision check (KW Phase 1)
`grep -niE "semaglutide|where-to-buy|cheapest" ~/viralpeps/kw-phase-1-list.md` returned
**zero semaglutide matches**. Only unrelated rows: `where-to-buy-peptides-uk` (line 34),
`where-to-buy-tirzepatide-uk` (line 88), `cheapest-peptides-uk` (line 122).
**No plan collisions — nothing removed.**

### Data
- 27 semaglutide sources in compounds.json → 27 rows (no `options[]` arrays; single price per source).
- Vendor pool: Raccoon Peptides, Brit Peptides, CMSR Labs, Eva Peptide UK, Raw Peptides,
  Astra Labs, Bio Peptides UK, PeptX, SupplyPeptides, PeptidesX, PepNOVA, MyPep Biotech,
  LeoLab Peptides UK, ApexPure, Peptides UK 4U, United Peptides, Bionik Peptides, JGPep+.
- **Stale URL flagged (pre-existing, NOT a silo regression):** the Astra Labs semaglutide
  source URL `https://astralabs.co.uk/product/semaglutide-10mg-uk/` returns 404 on Astra's
  own site (their homepage and BPC-157 URL both return 200). The `/go/astra-labs/semaglutide`
  route itself returns 302 correctly. This is a scraper/compounds.json data issue to fix in a
  separate data-maintenance pass — it affects the semaglutide hub too, not just the silo.

### PubMed sources used (all verified via NCBI E-utilities, not guessed)
- 33567185 — STEP 1, Once-Weekly Semaglutide in Adults with Overweight or Obesity (NEJM 2021)
- 33755728 — STEP 4, Weight Loss Maintenance (JAMA 2021)
- 35441470 — STEP 1 extension, weight regain (DOM 2022)
- 37952131 — SELECT, Semaglutide and Cardiovascular Outcomes (NEJM 2023)
- 38785209 — FLOW, Semaglutide on Chronic Kidney Disease (NEJM 2024)
- 33185364 — Nonalcoholic Steatohepatitis phase 2 (NEJM 2021)
- 34170647 — SURPASS-2, Tirzepatide vs Semaglutide (NEJM 2021)

⚠️ **Caution for future silos:** several plausible-looking PMIDs I initially drafted were
wrong (33862079, 37086756, 38625444, 37952181, 37796089 resolved to unrelated papers).
**Always verify every PMID through the NCBI E-utilities `esummary` API** — PubMed's HTML
returns 203 bot-shield, so a plain curl cannot confirm a PMID resolves.

### Files changed
`src/data/semaglutide-silo.ts` (new) · `src/data/semaglutide-spokes.ts` (new) ·
`src/data/silos.ts` (registry entry + type export) ·
`src/app/compound-guides/[slug]/page.tsx` (compound-aware switch for 3 compounds) ·
`src/app/compounds/[slug]/page.tsx` (hub tile block).
Sitemap auto-includes the 6 spokes + hub index via the SILOS registry — no edit needed.

---

## Part 1 — Where we are

### Retatrutide silo (reference implementation, live)

- **Hub:** `/compounds/retatrutide` (indexed, owns "retatrutide uk") — DO NOT touch.
- **6 spokes** live at `/compound-guides/[slug]`, all **200**:
  | # | Keyword | Slug | tableMode | rows |
  |---|---|---|---|---|
  | 1 | where to buy retatrutide uk | where-to-buy-retatrutide | price | 25 |
  | 2 | cheapest retatrutide uk | cheapest-retatrutide-uk | perMg | 25 |
  | 3 | retatrutide price comparison uk | retatrutide-price-comparison-uk | perMg | 0 (all) |
  | 4 | buy retatrutide online uk | buy-retatrutide-online-uk | full | 20 |
  | 5 | retatrutide for sale | retatrutide-for-sale | price | 30 |
  | 6 | best retatrutide peptide | best-retatrutide-peptide | trust | 25 |
- **Hub index `/compound-guides` = 404** ⚠️ — must be built (see Part 3).
- Content 100% unique per spoke (1,518–1,607 words). No duplication.
- Spokes are drafted pages but share one composition template (data density varies only).

### Architecture (what a silo actually is)

```
/compounds/<compound>            ← HUB (owns "<compound> uk", indexed, never rebuilt)
        │  tiles link down
        ▼
/compound-guides/<spoke>         ← 6 SPOKES (long-tail buying intent)
        │  cross-link to each other + back to hub
        └──────────────► all read live price data from compounds.json
```

**Data source (single owner):** `src/data/compounds.json` → `<compound>.sources[]`.
Prices are NEVER hardcoded in page markup. The weekly scraper refreshes the file.

**Files that make up a silo (per compound):**
| File | Role |
|---|---|
| `src/data/<compound>-silo.ts` | Data layer: rows, stats, sorters, `SPOKES` const |
| `src/data/<compound>-spokes.ts` | Content: title/meta/H1/intro/sections/faq/sources per spoke |
| `src/components/<Compound>SiloTiles.tsx` | Hub tile block (grid linking to spokes) |
| `src/app/compound-guides/[slug]/page.tsx` | The route that renders a spoke |
| `src/app/compounds/[slug]/page.tsx` | HUB — add tiles + stats for this compound |
| `src/app/sitemap.ts` | List spokes ONLY once live |

---

## Part 2 — Next silo: TIRZEPATIDE

**Why Tirzepatide next (verified, not assumed):**
- Live hub exists: `/compounds/tirzepatide` → 200.
- **79 sources** in compounds.json (2nd-largest GLP-1 pool after Retatrutide's 109).
- Every spoke modifier appears in **UK autocomplete** (see Evidence).
- Same SERP family as Reta — proven that the pattern ranks.

### Evidence (Google UK autocomplete — pulled live)

| Query | UK autocomplete result |
|---|---|
| `tirzepatide uk ` | **tirzepatide uk price**, **tirzepatide uk buy online**, tirzepatide uk peptide, **tirzepatide uk supplier**, tirzepatide uk buy |
| `buy tirzepatide ` | buy tirzepatide peptide, buy tirzepatide peptide online, **buy tirzepatide uk**, buy tirzepatide pen |
| `where to buy tirzepatide uk` | **exact match #1** |
| `cheapest tirzepatide uk` | **exact match #1**, tirzepatide prices uk, tirzepatide best price uk |
| `tirzepatide price comparison uk` | **exact match #1** |
| `buy tirzepatide online uk` | **exact match #1** |
| `best tirzepatide peptide` | **exact match #2** (after "...company") |
| `best tirzepatide uk` | exact match #1, tirzepatide best price uk, best place to buy tirzepatide uk |
| `tirzepatide for sale uk` | ⚠️ **ZERO results** |

### ⚠️ Two evidence-driven deviations from the Reta template

**1. DROP spoke 5 (`for sale`).**
`tirzepatide for sale uk` returns **0** autocomplete suggestions (tested 3 ways). Reta's
`for sale` had real demand; Tirzepatide's does not. Building it would be a page with no demand.
**Replacement → spoke 5 = `tirzepatide uk supplier`** (verified in autocomplete under
`tirzepatide uk `). Different intent from spoke 1 (supplier = who supplies, where-to-buy = how to buy).

**2. `cheapest` and `price comparison` must NOT render the same table.**
Reta gave them different `tableMode` (perMg vs perMg) — in practice near-identical. For Tirzepatide:
- `cheapest-tirzepatide-uk` → **per-mg sorted**, single "cheapest" answer callout, top-10 rows.
- `tirzepatide-price-comparison-uk` → **full price table, ALL rows**, range stats, no single winner.
This keeps decision-2 of the silo pattern ("each spoke distinct") honest.

### The 6 Tirzepatide spokes (proposed)

| # | Keyword | Slug | tableMode | rowLimit | Distinction |
|---|---|---|---|---|---|
| 1 | where to buy tirzepatide uk | `where-to-buy-tirzepatide-uk` | price | 25 | supplier table + TrustScore badges |
| 2 | cheapest tirzepatide uk | `cheapest-tirzepatide-uk` | perMg | 10 | single cheapest-per-mg answer, short |
| 3 | tirzepatide price comparison uk | `tirzepatide-price-comparison-uk` | full | 0 | every source, range stats |
| 4 | buy tirzepatide online uk | `buy-tirzepatide-online-uk` | full | 20 | ordering/payment/delivery angle |
| 5 | tirzepatide uk supplier | `tirzepatide-uk-supplier` | trust | 25 | who supplies, verification angle |
| 6 | best tirzepatide peptide | `best-tirzepatide-peptide` | trust | 25 | ranked by TrustScore |

### ⚠️ Collision handling (KW Phase 1 plan)

The plan at `~/viralpeps/kw-phase-1-list.md` currently contains:
- **line 88** `where-to-buy-tirzepatide-uk` → **DUPLICATE** of spoke 1. Remove from plan (spoke owns it).
- **line 126** `buy-tirzepatide-uk` → **DUPLICATE** of spoke 4's intent. Remove from plan.
- **line 27** `tirzepatide-suppliers-uk` → informational intent, NOT a silo duplicate.
  **KEEP** in plan; internally link it to the hub + spokes.
- **line 60** `tirzepatide-vs-survodutide` → distinct (vs intent). **KEEP.**

Rule: **fold, don't canonicalise.** Canonicals are only for true duplicates.

### After Tirzepatide → the queue

| Order | Compound | Sources | Hub live | Evidence |
|---|---|---|---|---|
| 1 | **Tirzepatide** | 79 | ✅ | ✅ strong — **BUILT** (`447f1fd9`) |
| 2 | **Semaglutide** | 27 | ✅ | ✅ strong — **BUILT** (`7b7f3051`) |
| 3 | Semax | 79 | ✅ (verify) | GLP-1-adjacent, high source count |
| 4 | Selank | 77 | ✅ (verify) | same |
| 5 | Ipamorelin | 86 | ✅ (verify) | growth-hormone family, big pool |
| 6 | MOTS-c | 109 | ✅ (verify) | 3rd-largest pool |

**Rule: only pick a compound whose spokes ALL appear in autocomplete.** Re-run the harvest
script per compound; some modifiers (e.g. `for sale`) fail for non-GLP-1 compounds.
Do NOT blindly clone all 6 slugs.

**Search volume caveat (unresolved):** autocomplete proves phrasing, not demand.
The 6 Reta keywords and the Tirzepatide set still have NO verified UK volume on file
(no Keyword Planner access). Check volumes before committing to a build order.

---

## Part 3 — Fix the missing hub (`/compound-guides` = 404)

Currently 404. Needs an index page listing every compound that has a silo, with its 6 spoke tiles.
Without it there is no parent for the spokes and no crawl path down into them.

Plan:
1. New route `src/app/compound-guides/page.tsx` (index).
2. Reads a registry of live silos: `{ compound, slug, stats, spokes[] }`.
3. Renders one tile-group per compound (reuse `<Compound>SiloTiles`).
4. Add `/compound-guides` to `src/app/sitemap.ts` (this one IS live once built).
5. Update the layout metadata (currently hardcodes "Retatrutide" — must go generic).

**Registry file needed:** `src/data/silos.ts` — the single list of which compounds have silos,
so the hub index, cross-links, and sitemap all read from one place.

---

## Part 4 — SOP: adding a silo for any compound

**Trigger:** adding intent spokes for a compound, or scaling the silo to more compounds.

### Step 0 — Pick the compound (evidence first)
1. Confirm the hub exists and returns 200: `curl -s -o /dev/null -w "%{http_code}" .../compounds/<slug>`
2. Count sources in `compounds.json` — need enough listings for a meaningful table (aim ≥20).
3. Run the autocomplete harvest (Step 1). **If a spoke's modifier returns 0 results, substitute it.**

### Step 1 — Harvest real keyword evidence (never invent)
```bash
for q in "<compound> " "buy <compound> " "<compound> uk " "<compound> price " \
         "where to buy <compound> uk" "cheapest <compound> uk" \
         "<compound> price comparison uk" "buy <compound> online uk" \
         "best <compound> peptide" "<compound> uk supplier"; do
  echo "--- [$q] ---"
  curl -s --max-time 15 \
    "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=uk&q=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$q")" \
    | python3 -c "import sys,json;d=json.load(sys.stdin);print('  count:',len(d[1]));[print('  ',x) for x in d[1][:8]]"
done
```
Record the output in the silo plan. Each chosen spoke must have ≥1 exact/close autocomplete hit.

### Step 2 — Collision check against KW Phase 1
```bash
grep -niE "<compound>|where-to-buy|cheapest" ~/viralpeps/kw-phase-1-list.md
```
- Duplicate shopping intent → **remove from plan** (spoke owns it).
- Informational intent (`-suppliers-uk`, `-vs-...`) → **keep**, internally link to hub + spokes.

### Step 3 — Write the per-page plan and GET APPROVAL
Before any code, write out for EACH spoke: (a) target KW, (b) H1/H2 structure,
(c) which data it shows and how much, (d) what makes its layout distinct.
**The Reta v1 failure was building 6 pages off one layout without an approved per-page plan.**

### Step 4 — Data layer
Create `src/data/<compound>-silo.ts` (copy the Reta file, swap the compound slug):
- `getRows()` — flatten `sources[]` + `options[]` into rows.
- `getStats()` — suppliers, products, min/max/avg, bestPerMg, topTrust, packs.
- Sorters: price / perMg / trust.
- `export const <COMPOUND>_SPOKES = [...]` — the spoke manifest (drives tiles + cross-links).
- Resolve `verified` from `vendors.json` (source entries don't carry it).
- TrustScore derived from `trustscore-autocheck.json` signals (see Reta file).

**Prices live in `compounds.json` ONLY.** Never hardcode.

### Step 5 — Content layer
Create `src/data/<compound>-spokes.ts`:
- Per spoke: `slug, title (<70 chars), description (155–160 chars), h1, focusKeyword, intro[], sections[], faq[], sources[], tableMode, tableHeading, rowLimit`.
- **Min 1,200 words per spoke.** Paragraph 1 contains the focus keyword verbatim.
- Inline internal links as markdown: `[text](/path)`.
- **No canonicals between spokes** (distinct SERPs).
- Unique content — 0 duplication against sibling spokes or the plan.
- Compliance: research-use framing; no human-use claims; compound name capitalised in prose.
- Link to the compound's **money page** as a `strong` anchor where pricing is discussed.

### Step 6 — Route + tiles
1. The shared route `src/app/compound-guides/[slug]/page.tsx` renders any spoke — but hubs
   differ, so add a compound-aware switch OR give the compound its own spoke renderer.
2. Create `src/components/<Compound>SiloTiles.tsx` (copy Reta, swap the spokes source).
3. On the HUB `src/app/compounds/[slug]/page.tsx`:
   - import the tiles + `getStats()`;
   - compute stats only for this slug: `const s = slug === "<compound>" ? getStats() : null;`
   - render `{slug === "<compound>" && s && <CompoundSiloTiles stats={s} />}`.
4. Cross-link each spoke to the other 5 + back to the hub (tight mesh).
5. **Each spoke gets its own title/meta/H1** — unique, keyword-led, no brand suffix.

### Step 7 — Sitemap (only when live)
- Add spokes to `src/app/sitemap.ts` ONLY once the pages return 200 with real content.
- Add `/compound-guides` (hub index) when built.
- **Never list a draft/unbuilt route.** (User instruction, Sep 2026.)

### Step 8 — Verify (all must pass before reporting done)
```bash
# every spoke returns 200
for s in <slug1> <slug2> ...; do
  curl -s -o /dev/null -w "%{http_code}  /compound-guides/$s\n" "https://www.viralpeps.co.uk/compound-guides/$s"
done
# hub tiles present + links resolve
curl -s "https://www.viralpeps.co.uk/compounds/<compound>" | grep -c "compound-guides"
# word count per spoke ≥1200, and 0 duplication across spokes
# title <70 chars, description 155-160, focus keyword in H1 + intro[0]
```
Report live URLs + confirmation, not intentions.

### Step 9 — Update this file + the skill
Record the new silo in `silo-plan-next.md` and, if the pattern changed, patch the
`viralpeps` skill reference `compound-silo-pattern.md`.

---

## Pitfalls (carry these into every build)

- **Never build `/<compound>-uk`** — the hub owns it. (Error made 15 Sep 2026.)
- **Never clone all 6 slugs blindly** — `for sale` failed for Tirzepatide (0 results).
- **Never hardcode prices** — read `compounds.json`.
- **Never add drafts to the sitemap.**
- **Don't force every page to open with the same table** — vary density (some full, some top-3).
- **Autocomplete ≠ volume.** Get Keyword Planner numbers before scaling past 2 silos.
- **One content cluster at a time** — don't run a silo build alongside a blog cluster push.
- **Verify on the live URL** before reporting done (Azar's rule).
- Competitor `peptidesupermarket.co.uk` is Cloudflare-protected — not visually verifiable.
