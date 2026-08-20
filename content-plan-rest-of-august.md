# ViralPeps — August Content Plan (16–31 Aug 2026)
**Format v2** — written after Azar's feedback. Anchored on the 16 core compounds, prioritised. Goal articles ("X for [goal]") included. Every article deduplicated against existing content.

## Rule (built into the cron)
Before writing ANY article, the cron MUST:
1. Check `src/data/research.ts` AND `src/data/research-content.ts` for the compound AND the proposed angle/title
2. If the compound already has the exact article type (summary/deep-dive/goal) OR the title is duplicated → SKIP to the next compound/angle
3. Only write if compound + angle is genuinely new
4. Each article links to its compound page + 1-2 related articles (mandatory)

## New Article Format
- **Title:** `{Compound} for {Goal}` OR `{Compound} Deep Dive — {Differentiator}`
- **Structure (per article):**
  - Intro/overview (compound + goal relevance)
  - Mechanism of action (how it works for that goal)
  - Research evidence (PMID citations, clinical data)
  - Dosage/protocol for that goal
  - Comparison/alternatives for that goal (1 short section)
  - Stacking suggestions (if applicable)
  - FAQ (2-3 questions)
  - References section
  - Internal links: compound page + 1-2 related articles

## August List (1 article/day via 3am cron = 16 articles)

### Week 1 (Aug 16–22) — T1/T2 compounds, fill thinnest first
- Aug 16 — **TB-500** Deep Dive (thinnest, only 2)
- Aug 17 — **TB-500 for Recovery** (goal)
- Aug 18 — **AOD 9604** Deep Dive (thinnest)
- Aug 19 — **AOD 9604 for Fat Loss** (goal)
- Aug 20 — **GHK-Cu for Skin** or **GHK-Cu for Hair** (goal — highest-ROI compound)
- Aug 21 — **Retatrutide for Weight Loss** (goal)
- Aug 22 — **Oxytocin for Bonding** (goal)

### Week 2 (Aug 23–31) — remaining T1/T2 + goal angles
- Aug 23 — **Semax for Focus/ADHD** (goal)
- Aug 24 — **Selank for Anxiety** (goal)
- Aug 25 — **Tesamorelin for Belly Fat** (goal)
- Aug 26 — **Melanotan 2 Tanning Guide** (goal)
- Aug 27 — **Sermorelin for Muscle Growth** (goal)
- Aug 28 — **Ipamorelin for Muscle Growth** (goal)
- Aug 29 — **PT-141 for Men** (goal)
- Aug 30 — **CJC-1295 for Muscle Growth** (goal)
- Aug 31 — **BPC-157 for Recovery/Gut** (goal)

### Coverage note
- Semaglutide + Tirzepatide have strong existing coverage (4-5 each) → dropped this month, already saturated
- Goal articles are the priority — they're the thinnest and highest-traffic-intent
- TB-500 and AOD 9604 (thinnest at 2 each) get Deep Dive + goal first

## Every article MUST
- Link to its compound page `/compounds/{slug}`
- Cross-link to 1-2 related articles
- Self-canonical, meta title <70, image card
- Pass the dedupe check (no duplicate title/angle vs research.ts + research-content.ts)
