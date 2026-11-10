/**
 * HMG silo spokes — content for /compound-guides/[slug].
 *
 * Each spoke targets a distinct keyword with its own SERP intent. NO canonicals
 * between spokes. Prices are NEVER hardcoded here — the page renders them live
 * from src/data/hmg-silo.ts, which reads compounds.json.
 *
 * Internal links use inline markdown: [text](/path)
 *
 * Spoke manifest — Google UK autocomplete harvested 2026-11-10 via
 * suggestqueries.google.com (client=firefox, hl=en, gl=uk). HMG does not behave
 * like a GLP-1 or a cosmetic peptide: the raw "hmg" token collides with three
 * unrelated meanings — Her Majesty's Government ("hmg uk government", "hmg uk
 * crown"), HMG Paints ("hmg paint suppliers"), and the heavy machine gun /
 * HMG-CoA / High Mobility Group terms ("best hmg gun", "best hmgb1 blocker",
 * "hmg coa reductase inhibitor"). Every generic UK modifier therefore returns
 * an EMPTY array for the bare "hmg", and the surrounding probes surface the
 * disambiguated forms that carry the real demand.
 *
 *   GENERIC MODIFIERS — ALL 6 RETURNED 0 (empty array):
 *   `where to buy hmg uk` = [], `cheapest hmg uk` = [], `hmg price comparison uk` = [],
 *   `buy hmg online uk` = [], `hmg uk supplier` = [], `best hmg peptide` = [].
 *   Also 0: `buy hmg uk`, `cheapest hmg`, `hmg for sale`, `where to buy menotropin`.
 *
 *   SUBSTITUTED DEMAND CLUSTERS (the clean, disambiguated forms Google returns):
 *   1. where-to-buy-hmg-uk → `where to buy hmg uk` = 0. Substituted the buying
 *        cluster that Google does return: `hmg price uk` → **`where to buy hmg`** (#3),
 *        and `hmg supplier` → **`where to buy hmg`** (#9). Plus the clean unit-qualified
 *        cluster `hmg 75iu` → `hmg 75iu peptide`, `hmg 75iu injection`,
 *        `hmg 75iu for men`, `hmg 75iu * 10`, `hmg 75iu reddit`.
 *   2. cheapest-hmg-uk → `cheapest hmg uk` = 0, `cheapest hmg` = 0. Substituted
 *        `hmg price uk` → **`hmg injection price uk`** (#1); corroborated by
 *        `hmg injections uk` → `hmg injection price uk` (#2), `hmg injection uk`.
 *   3. hmg-price-comparison-uk → `hmg price comparison uk` = 0. Substituted
 *        `hmg price uk` → **`hmg injection price uk`** (#1), `what is hmg`,
 *        `where to buy hmg`; plus `hmg peptides uk` → **`hmg price list`** (#2).
 *   4. buy-hmg-online-uk → `buy hmg online uk` = 0, `buy hmg uk` = 0, `hmg for sale` = 0.
 *        Substituted `hmg peptides uk` → **`hmg peptide uk`** (#1), plus the
 *        `hmg 75iu` buying cluster. (`hmg online` = a medical provider's portal,
 *        NOT peptide intent — discarded.)
 *   5. hmg-supplier-uk → `hmg uk supplier` = 0. Substituted `hmg supplier` →
 *        **`hmg supplier`** (exact #1) alongside `where to buy hmg` (#9). The same
 *        probe also returns HMG Paints noise (`hmg paint suppliers near me`), so
 *        this spoke leads with the identity question rather than a bare supplier
 *        list. Corroborated by `hmg uk` → **`hmg peptide uk`** (#10).
 *   6. best-hmg-peptide → `best hmg peptide` = 0. Substituted `best hmg` →
 *        **`best hmg injection`** (#4) amid heavy gaming/weapons noise (`best hmg
 *        cyberpunk 2077`, `best hmg gun`, `best hmg backpack`). Plus the clean
 *        `hmg menotropin` cluster → `hmg menotropin 75`, `menotropin hmg injection`,
 *        `menotropin hmg 150 iu injection`, `menotropin hmg 75iu`, `hmg vs menotropin`.
 *
 * UK demand is real; it simply renders under the disambiguated forms "hmg 75iu",
 * "menotropin" and "hmg peptide uk" rather than under the bare "hmg" + generic
 * modifier set.
 *
 * COLLISION CHECK (`grep -niE "hmg|menotropin" kw-phase-1-list.md`): zero hits —
 * no shopping-intent duplicate in the plan, so all six spokes own their terms.
 * The two existing HMG articles in research.ts — `hmg-research-guide` ("No CAS,
 * No Formula, No MW") and `hmg-uk-price-guide` ("HMG UK Price Per IU") — are
 * informational link-targets, not competitors: this silo owns the six
 * transactional queries and links up to the /compounds/hmg buying hub.
 *
 * MOLECULAR IDENTITY — HMG IS A BIOLOGICAL MIXTURE AND HAS NO CAS / FORMULA / MW.
 *   Menotropin is a urinary gonadotropin extract supplying FSH and LH activity,
 *   extracted from postmenopausal urine and standardised by bioassay in IU. It
 *   is not a molecule: no CAS (vendor 61489-71-2 is unverified and pairs with a
 *   nonsense formula), no formula, no molecular weight. The LH activity is
 *   largely hCG (Capolupo et al., Int J Mol Sci 2024, PMID 39273352) and ≥30% of
 *   material is non-gonadotropin urinary protein (van de Weijer et al., RBM
 *   Online 2003, PMID 14680547). Rule 0 of compound-data-verification.md applies:
 *   the price model is per 1,000 IU rather than per mg for exactly that reason.
 *
 * LEGAL NOTE — menotropin is a prescription-only medicine in the UK for human use
 * (BNF), supplied through fertility clinics. Every spoke states this and labels
 * all listings research-use-only. No dosage, administration or human-use
 * guidance appears in any spoke.
 */
import type { Spoke } from "./hmg-spokes-types";
import { spoke as s1 } from "./hmg-spokes-01";
import { spoke as s2 } from "./hmg-spokes-02";
import { spoke as s3 } from "./hmg-spokes-03";
import { spoke as s4 } from "./hmg-spokes-04";
import { spoke as s5 } from "./hmg-spokes-05";
import { spoke as s6 } from "./hmg-spokes-06";

export type { Spoke, SpokeSection, SpokeFaq, SpokeSource } from "./hmg-spokes-types";

export const spokes: Spoke[] = [s1, s2, s3, s4, s5, s6];

export function getSpoke(slug: string): Spoke | undefined {
  return spokes.find((s) => s.slug === slug);
}
