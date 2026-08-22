// TrustScore — derives a 0-100 rating per UK supplier from a strict mix of
// AUTOMATED (machine-vetted against the supplier's live site) and MANUAL signals.
//
// Published 7-signal methodology (on /trust-score):
//   AUTOMATED (system checks the live site):
//     Lab-Tested (+25) — COA / certificate of analysis available on the website
//     Compliant  (+5)  — RUO (research-use-only) disclaimer on site AND products
//     Reviews    (+10) — independent review platform confirmed (Trustpilot/Reviews.io/etc)
//     Shipping   (+5)  — tracked shipping advertised
//     Contact    (+10) — checkable contact route (email/phone/support page)
//   MANUAL (the paid £50/month service — set by us in vendors.json, never auto):
//     Business (+25) — manual business verification on signup (`verified:true`)
//     Domain   (+20) — manual once supplier agrees + installs the badge (`domainVerified`/`embedded`)
//
// AUTOMATED signals are read from the `_autoChecks` block on each vendor record,
// which is produced by `scripts/checks/vendor-autocheck.mjs`. A signal only
// credits when the crawler actually confirmed it (strict ===true). It is NEVER
// inferred or derived — nothing is credited from implied state.
//
// Scores are NEVER for sale and independent of any paid pack.

import vendorsData from "@/data/vendors.json";

export interface TrustScoreBreakdown {
  score: number;
  max: number;
  ticks: string[];
  partial: number;
}

export function getTrustScore(vendorName: string): TrustScoreBreakdown {
  const v = (vendorsData as any[]).find((x) => x.name === vendorName);
  if (!v) {
    return { score: 0, max: 100, ticks: [], partial: 0 };
  }

  const auto = v._autoChecks as
    | {
        coa?: boolean;
        ruo?: boolean;
        reviews?: boolean;
        shipping?: boolean;
        contact?: boolean;
      }
    | undefined;

  let score = 0;
  const ticks: string[] = [];

  // ---- AUTOMATED signals (machine-vetted) ----
  // Lab-Tested (+25)
  if (auto?.coa === true) {
    score += 25;
    ticks.push("Lab-Tested");
  }
  // Compliant (+5) — RUO on the site
  if (auto?.ruo === true) {
    score += 5;
    ticks.push("Compliant");
  }
  // Reviews (+10) — independent platform
  if (auto?.reviews === true) {
    score += 10;
    ticks.push("Reviews");
  }
  // Shipping (+5) — tracked
  if (auto?.shipping === true) {
    score += 5;
    ticks.push("Shipping");
  }
  // Contact (+10) — checkable contact route
  if (auto?.contact === true) {
    score += 10;
    ticks.push("Contact");
  }

  // ---- MANUAL signals (paid verification service) ----
  // Business (+25) — manual on signup
  if (v.verified === true) {
    score += 25;
    ticks.push("Business");
  }
  // Domain (+20) — manual once they install our badge
  if (v.embedded === true || v.domainVerified === true) {
    score += 20;
    ticks.push("Domain");
  }

  return {
    score: Math.min(score, 100),
    max: 100,
    ticks,
    partial: score,
  };
}
