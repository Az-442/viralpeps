/**
 * hCG silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword with its own SERP intent. NO canonicals
 * between spokes. Prices are NEVER hardcoded here — the page renders them live
 * from src/data/hcg-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — Google UK autocomplete harvested 2026-10-28 via
 * suggestqueries.google.com (client=firefox, hl=en, gl=uk). hCG does not behave
 * like a GLP-1 or a cosmetic peptide: the generic UK modifier set
 * ("where to buy X uk", "cheapest X uk", "X price comparison uk") returns an
 * EMPTY array for "hcg", and the surrounding probes surface fertility-clinic and
 * blood-test intent plus a live "is hcg legal in uk" question. Every modifier was
 * therefore verified against a substitution probe rather than assumed.
 *
 *   1. where-to-buy-hcg-uk → `where to buy hcg uk` = 0 (empty array).
 *        Substituted the buying-intent cluster that Google does return:
 *        `hcg peptides uk` → **`buy hcg peptides uk`** (exact #1),
 *        `hcg uk peptide`, `hcg peptide pens uk`; plus `buy hcg uk` →
 *        `buy hcg uk reddit`, `buy hcg injections uk`; plus
 *        `where can i buy hcg` → **`where can i buy hcg peptide`** (#4).
 *        UK demand is real; it just does not render with the word "where".
 *   2. cheapest-hcg-uk → `cheapest hcg uk` = 2 but BOTH on-topic-adjacent:
 *        `buy hcg uk reddit`, `is hcg legal in uk`. Substituted `cheapest hcg`,
 *        which returns **`cheapest hcg online`** (#2), `cheapest hcg reddit`,
 *        `cheap hcg`. Also `hcg price uk` → `hcg 5000 injection price uk`,
 *        `hcg 10000 iu price`.
 *   3. hcg-price-comparison-uk → `hcg price comparison uk` = 0. Substituted
 *        `hcg price uk`, which returns **`hcg price uk`** (exact #1),
 *        `hcg injection price uk`, `hcg 5000 injection price uk`,
 *        `hcg cost uk`, `hcg price list`. Also `hcg 5000iu uk` →
 *        `puretrig hcg 5000iu uk`, `hcg 5000iu price`.
 *   4. buy-hcg-online-uk → `buy hcg online uk` = 0. Substituted
 *        `buy hcg uk` → **`buy hcg uk reddit`**, `buy hcg injections uk`;
 *        and `hcg online uk` → `hcg injections uk`. The legal-question probe
 *        `is hcg legal in uk` recurs across every cluster, so this spoke leads
 *        with prescription-only status rather than with ordering mechanics.
 *   5. hcg-supplier-uk → `hcg uk supplier` returned **`hcg supplier uk`**
 *        (exact #1) alongside `hcg drops uk`, `hcg cost uk` — PASSED.
 *        Corroborated by `hcg uk` → `hcg uk peptide`, `hcg uk pharmacy`,
 *        `hcg uk europe dmc`, `hcg uk eu dmc limited`.
 *   6. best-hcg-peptide → `best hcg peptide` returned **`best hcg peptide`**
 *        (exact #1) plus `hcg peptide review`, `best place to buy hcg peptides`,
 *        `is hcg a peptide`, `best hcg brand`, `best hcg for men` — PASSED.
 *
 * COLLISION CHECK (`grep -niE "hcg" kw-phase-1-list.md`): one hit,
 * "AOD-9604 vs HCG UK" — an informational comparison, kept. No shopping-intent
 * duplicate in the plan, so all six spokes own their terms. The two existing
 * hCG articles in research.ts — `hcg-research-guide` (literature hub) and
 * `hcg-uk-price-guide` ("HCG UK Price Per IU") — are informational and
 * link-targets, not competitors: this silo owns the six transactional queries
 * and links up to the /compounds/hcg buying hub.
 *
 * MOLECULAR IDENTITY — hCG IS A BIOLOGICAL AND HAS NO CAS / FORMULA / MW.
 *   Heterodimeric glycoprotein: alpha subunit ~92 aa (CGA, UniProt P01215,
 *   shared with LH, FSH and TSH) + beta subunit ~145 aa mature from a 165 aa
 *   precursor (CGB, UniProt P01233). Quantified in international units by
 *   biological activity against the WHO standard — NOT in milligrams.
 *   Rule 0 of compound-data-verification.md applies: no CAS, no formula, no
 *   molecular weight is stated anywhere in this silo, and the price model is
 *   per 1,000 IU rather than per mg for exactly that reason.
 *
 * LEGAL NOTE — hCG is a prescription-only medicine in the UK for human use
 * (BNF). Every spoke states this and labels all listings research-use-only.
 * No dosage, administration or human-use guidance appears in any spoke.
 */
import type { Spoke } from "./hcg-spokes-types";
import { spoke as s1 } from "./hcg-spokes-01";
import { spoke as s2 } from "./hcg-spokes-02";
import { spoke as s3 } from "./hcg-spokes-03";
import { spoke as s4 } from "./hcg-spokes-04";
import { spoke as s5 } from "./hcg-spokes-05";
import { spoke as s6 } from "./hcg-spokes-06";

export type { Spoke, SpokeSection, SpokeFaq, SpokeSource } from "./hcg-spokes-types";

export const spokes: Spoke[] = [s1, s2, s3, s4, s5, s6];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
