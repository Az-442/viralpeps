// TrustScore — derives a 0-100 rating per UK supplier from a strict mix of
// AUTOMATED (machine-vetted against the supplier's live site) and AUDITED signals.
//
// Published methodology (on /trust-score):
//   AUTOMATED (system checks the live site) — max 55:
//     Lab-Tested (+25) — COA / certificate of analysis available on the website
//     Reviews    (+10) — independent review platform confirmed (Trustpilot/Reviews.io/etc)
//     Contact    (+10) — checkable contact route (email/phone/support page)
//     Shipping    (+5) — tracked shipping advertised
//     Compliant   (+5) — RUO (research-use-only) disclaimer on site AND products
//   DOMAIN (+20) — FREE: supplier installs the TrustScore badge on their site
//     (linking back to ViralPeps), then we confirm domain ownership once live.
//   ENTITY (£50/month recertification audit — set by us, never auto):
//     Limited company + card/bank (+25)  |  Limited company + crypto (+20)
//     Sole trader     + card/bank (+15)  |  Sole trader     + crypto (+10)
//     -- A registered entity with real-money payment methods outranks crypto.
//     -- Lite flagship "Excellent" band (90+) is reserved for Ltd + card/bank.
//
// AUTOMATED signals are read from the `_autoChecks` block on each vendor record,
// which is produced by `scripts/checks/vendor-autocheck.mjs`. A signal only
// credits when the crawler actually confirmed it (strict ===true). It is NEVER
// inferred or derived — nothing is credited from implied state.
//
// Entity points are set ONLY from the manual audit — never guessed.
// Scores are NEVER for sale and independent of any paid pack.

import vendorsData from "@/data/vendors.json";

export interface TrustScoreBreakdown {
  score: number;
  max: number;
  ticks: string[];
  partial: number;
}

// Entity audit → points. entityType: "ltd" | "sole_trader"
// paymentMethod: "card" | "bank" | "crypto"
export function entityPoints(entityType?: string, paymentMethod?: string): number {
  if (entityType === "ltd") return paymentMethod === "crypto" ? 20 : 25;
  if (entityType === "sole_trader") return paymentMethod === "crypto" ? 10 : 15;
  return 0;
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

  // ---- AUTOMATED signals (machine-vetted) ---- max 55
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

  // ---- DOMAIN (+20) — FREE widget backlink code ----
  if (v.embedded === true || v.domainVerified === true) {
    score += 20;
    ticks.push("Domain");
  }

  // ---- ENTITY (£50/month recertification audit) ----
  const ep = entityPoints(v.entityType, v.paymentMethod);
  if (ep > 0) {
    score += ep;
    const ent = v.entityType === "ltd" ? "Registered Business" : "Sole Trader Verified";
    ticks.push(ent);
  }

  return {
    score: Math.min(score, 100),
    max: 100,
    ticks,
    partial: score,
  };
}
