# ViralPeps Content Planner — 30-Day Aggressive Attack

## Priority by SEO Difficulty

| Tier | Compound | KD | UK Vol/mo | Why |
|------|----------|-----|-----------|-----|
| T1 | GHK-Cu | 11-14 | 36K global | Highest ROI, massive gap |
| T1 | Retatrutide | ~15 | 14,800 | High vol + easy |
| T1 | Oxytocin | ~10 | 50 (+191%) | Early mover |
| T1 | Semax | 12 | 9.1K global | Very easy |
| T1 | Selank | 20 | 4K global | Easy |
| T2 | Tesamorelin | ~25 | 1,000 (+64%) | Rising |
| T2 | Melanotan 2 | ~20 | 320 | Easy |
| T2 | Sermorelin | ~25 | 210 (+48%) | Rising |
| T3 | TB-500, AOD 9604, CJC, Ipamorelin, PT-141 | 25-40 | 90-170 | Medium |
| Leave | BPC-157, Tirzepatide, Semaglutide | 60-89 | 1,900-8,100 | Need DA first |

## Content Types (from user)
1. Compound profile (every compound needs at least 1)
2. Deep dive (popular compounds only)
3. Comparison (limited amount)
4. Practical guides (plenty)
5. Research and summaries (start with popular)
6. Goal articles
7. Goal/compounds articles
8. Best stack for goal articles
9. Silo pages (build per compound, start after 2-3 weeks)

## Week 1 — Profiles (build base for internal linking)
| Night | Article 1 | Article 2 | Article 3 | Article 4 |
|-------|-----------|-----------|-----------|-----------|
| 1 | GHK-Cu profile | Retatrutide profile | Semax profile | Selank profile |
| 2 | Oxytocin profile | Tesamorelin profile | Melanotan 2 profile | Sermorelin profile |
| 3 | TB-500 profile | AOD 9604 profile | CJC-1295 profile | Ipamorelin profile |
| 4 | PT-141 profile | GHK-Cu deep dive | Retatrutide deep dive | Semax deep dive |
| 5 | BPC-157 profile | Tirzepatide profile | Semaglutide profile | NAD+ profile |
| 6 | Tesamorelin deep dive | Melanotan 2 deep dive | Oxytocin deep dive | Sermorelin deep dive |
| 7 | GHK-Cu research summary | Retatrutide research summary | Semax research summary | Selank research summary |

## Week 2 — Comparisons + Practical Guides
| Night | Article 1 | Article 2 | Article 3 | Article 4 |
|-------|-----------|-----------|-----------|-----------|
| 8 | GHK-Cu vs BPC-157 | Retatrutide vs Tirzepatide | Semax vs Selank | Peptide Reconstitution Guide |
| 9 | TB-500 vs BPC-157 | CJC-1295 vs Ipamorelin | Tesamorelin vs Sermorelin | How to Read a COA |
| 10 | BPC-157 vs TB-500 | PT-141 vs Melanotan 2 | AOD 9604 vs Tesamorelin | Peptide Storage Guide |
| 11 | Semaglutide vs Tirzepatide | Retatrutide vs Semaglutide | Oxytocin vs PT-141 | Choosing a UK Supplier |
| 12 | GHK-Cu vs Retinol | CJC vs Tesamorelin | Selank vs Semax for ADHD | Peptide Injection Guide |
| 13 | Practical: Peptide Cycling | Reconstitution Calculations | Dosing Guide | Syringe Guide |
| 14 | BPC-157 deep dive 2 | Tirzepatide deep dive 2 | Semaglutide deep dive | How Peptides Work (primer) |

## Week 3 — Goal Articles + Stacks
| Night | Article 1 | Article 2 | Article 3 | Article 4 |
|-------|-----------|-----------|-----------|-----------|
| 15 | Best Peptides for Muscle Growth | Best Peptides for Weight Loss | Best Peptides for Skin | Best Peptides for Recovery |
| 16 | GHK-Cu for Skin/Hair | Retatrutide for Weight Loss | Semax for ADHD | Selank for Anxiety |
| 17 | BPC-157 for Gut Health | TB-500 for Recovery | Tesamorelin for Belly Fat | Oxytocin for Bonding |
| 18 | Best Stack for Muscle Growth | Best Stack for Fat Loss | Best Stack for Anti-Aging | Best Stack for Recovery |
| 19 | CJC + Ipamorelin Stack | BPC-157 + TB-500 Stack | GHK-Cu + BPC-157 Stack | GLOW Blend Guide |
| 20 | Peptides for Bodybuilding | Peptides for Anti-Aging | Peptides for Cognitive | Peptides for Sleep |
| 21 | Peptides for Gut Health | Peptides for Joint Repair | Peptides for Hair Growth | Peptides for Libido |

## Week 4 — Goal/Compound + Research Summaries
| Night | Article 1 | Article 2 | Article 3 | Article 4 |
|-------|-----------|-----------|-----------|-----------|
| 22 | Best GHK-Cu Guide | Best Retatrutide Guide | Best Semax Guide | Best Selank Guide |
| 23 | Retatrutide Research Summary | Semaglutide Research Summary | BPC-157 Research Summary 2 | TB-500 Research Summary |
| 24 | GHK-Cu Research Summary | Tesamorelin Research Summary | Oxytocin Research Summary | Melanotan 2 Research Summary |
| 25 | Peptide Half-Lives Explained | Peptide Mechanisms Explained | Peptide Purity Guide | COA Reading Guide |
| 26 | GHK-Cu for Women | Retatrutide for Women | BPC-157 for Women | Tesamorelin for Women |
| 27 | CJC-1295 for Bodybuilding | Ipamorelin for Bodybuilding | Sermorelin for Bodybuilding | AOD 9604 for Fat Loss |
| 28 | Where to Buy Peptides UK | Best UK Peptide Suppliers | Cheap Peptides UK | Research Peptides UK Guide |

## Workflow (Cron)
1. Check PS + PepGuide + PeptideGuide for existing content on the compound
2. If found → extract + rewrite 100% unique
3. If not found → write original from KWs + research
4. Use saved FAL vial image (reuse existing, no new generation per article)
5. Composite guide card with Pillow script
6. Update research.ts + research-content.ts
7. Build + deploy (single git push at end)

## Reference Sites
1. Peptide Supermarket (peptidesupermarket.co.uk/research) — layout, pull quotes, compare banner
2. PepGuide.io — tables, PMID citations, structured data
3. PeptideGuide.com — scorecards, comparison tables
