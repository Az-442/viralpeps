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
//     Card/bank payment + verified entity (Ltd OR sole trader) (+25)
//     Limited company + crypto (+20)  |  Sole trader + crypto (+10)
//     -- Real-money, traceable payment is the deciding signal: any verified
//        entity taking card/bank reaches the top tier; crypto cannot.
//     -- Flagship "Excellent" band (90+) is reserved for card/bank entities.
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
  if (paymentMethod === "card" || paymentMethod === "bank") return 25; // real-money: any verified entity reaches the top tier
  if (entityType === "ltd") return 20; // Ltd, crypto only
  if (entityType === "sole_trader") return 10; // Sole trader, crypto only
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

// ── TrustScore bands ──────────────────────────────────────────────────────────
// Single source of truth for the colour bands published on /trust-score
// ("What a score means"). Any surface showing a TrustScore MUST use these so
// the colour always matches the published band.
//   86–100  Excellent Trust  — emerald-500
//   65–85   High Trust       — green-100 / green-800
//   45–64   Moderate Trust   — amber-100 / amber-800
//   30–44   Limited Trust    — red-100 / red-800
//   0–29    Low Trust        — red-100 / red-800
export type TrustBand = {
  label: string;
  range: string;
  /** Tailwind classes for the pill (bg + text). */
  className: string;
  /** Solid hex used to fill the shield icon. */
  hex: string;
};

export function getTrustBand(score: number): TrustBand {
  if (score >= 86) {
    return { label: "Excellent Trust", range: "86 – 100", className: "bg-emerald-500 text-white", hex: "#10b981" };
  }
  if (score >= 65) {
    return { label: "High Trust", range: "65 – 85", className: "bg-green-100 text-green-800", hex: "#22a06b" };
  }
  if (score >= 45) {
    return { label: "Moderate Trust", range: "45 – 64", className: "bg-amber-100 text-amber-800", hex: "#f59e0b" };
  }
  if (score >= 30) {
    return { label: "Limited Trust", range: "30 – 44", className: "bg-red-100 text-red-800", hex: "#dc2626" };
  }
  return { label: "Low Trust", range: "0 – 29", className: "bg-red-100 text-red-800", hex: "#b91c1c" };
}
