// TrustScore — derives a 0-100 rating per UK supplier from verifiable signals.
// Mirrors the published 7-signal methodology on /trust-score:
//   Business verified  +25 | COAs/lab testing +25 | Domain verified +20
//   Contact verified  +10  | Genuine reviews  +10 | Research-use +5 | Shipping +5
// Scores are NEVER for sale and independent of any paid pack.

import vendorsData from "@/data/vendors.json";

export interface TrustScoreBreakdown {
  score: number;
  max: number;
  ticks: string[];
  partial: number;
}

/**
 * Derive a supplier's TrustScore from their verified data profile.
 * A supplier that has proven domain ownership via the TrustScore embed gets
 * the Domain (+20) signal — the strongest indicator they actually run the site.
 */
export function getTrustScore(vendorName: string): TrustScoreBreakdown {
  const v = (vendorsData as any[]).find((x) => x.name === vendorName);
  if (!v) {
    return { score: 0, max: 100, ticks: [], partial: 0 };
  }

  let score = 0;
  const ticks: string[] = [];

  // Business verified (+25)
  if (v.verified) {
    score += 25;
    ticks.push("Business");
  }

  // COAs & lab testing (+25)
  if (v.labTested) {
    score += 25;
    ticks.push("Lab-Tested");
  }

  // Contact verified (+10) — infer from presence of verified business + contact info
  if (v.verified && (!v.incompleteContact)) {
    score += 10;
    ticks.push("Contact");
  } else if (v.contact !== false) {
    // soft credit — they have some contact path
    score += 0;
  }

  // Domain verified (+20) — only granted when supplier proves they own the site (via embed)
  if (v.embedded === true || v.domainVerified === true) {
    score += 20;
    ticks.push("Domain");
  }

  // Research-use compliance (+5) — inferred; most UK research sites comply
  if (v.compliant !== false) {
    score += 5;
    ticks.push("Compliant");
  }

  // Genuine reviews (+10) — based on stored rating (4.5+ = strong)
  const rating = typeof v.rating === "number" ? v.rating : 0;
  if (rating >= 4.5) {
    score += 10;
    ticks.push("Reviews");
  } else if (rating >= 3) {
    score += 5;
  }

  // Shipping & support (+5)
  if (Array.isArray(v.shipping) && v.shipping.length > 0) {
    score += 5;
    ticks.push("Shipping");
  }

  return {
    score: Math.min(score, 100),
    max: 100,
    ticks,
    partial: score,
  };
}
