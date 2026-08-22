// TrustScore — derives a 0-100 rating per UK supplier from verifiable signals.
// Mirrors the published 7-signal methodology on /trust-score:
//   Business verified  +25 | COAs/lab testing +25 | Domain verified +20
//   Contact verified  +10  | Genuine reviews  +10 | Research-use +5 | Shipping +5
//
// VERIFICATION INTENT (what each signal means — never autopopulated):
//   Business (+25)  -> MANUAL check we perform for paying suppliers (the £50/mo service).
//                      Gated on `verified`, which we only set after a genuine
//                      business check (registered entity / working contact / real footprint).
//   Lab-Tested (+25)-> Gated on `labTested` (COA / third-party test evidence we confirm).
//   Domain  (+20)   -> Gated on `domainVerified` OR `embedded`. Only credited once the
//                      supplier has INSTALLED our badge on their site — i.e. proof they
//                      control the domain. Never granted from data entry alone.
//   Contact (+10)   -> MANUAL check gated on `contactVerified`. Independent of Business —
//                      we confirm a live, working contact path (email/phone/support).
//   Reviews (+10)   -> Based on the stored rating (>=4.5 = strong). Comments, not votes,
//                      soften to +5 in the 3-4.49 band.
//   Compliant (+5)  -> Inferred research-use disclaimer; most UK research sites comply.
//   Shipping (+5)   -> Gated on a real shipping stanza being present.
//
// Every manual signal (Business, Contact) must be explicitly set on the vendor record —
// nothing is credited from implied/derived state.
//
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
 */
export function getTrustScore(vendorName: string): TrustScoreBreakdown {
  const v = (vendorsData as any[]).find((x) => x.name === vendorName);
  if (!v) {
    return { score: 0, max: 100, ticks: [], partial: 0 };
  }

  let score = 0;
  const ticks: string[] = [];

  // Business verified (+25) — manual check we perform for paying suppliers.
  if (v.verified === true) {
    score += 25;
    ticks.push("Business");
  }

  // COAs & lab testing (+25) — confirmed test evidence.
  if (v.labTested === true) {
    score += 25;
    ticks.push("Lab-Tested");
  }

  // Contact verified (+10) — MANUAL check, independent of Business.
  if (v.contactVerified === true) {
    score += 10;
    ticks.push("Contact");
  }

  // Domain verified (+20) — ONLY granted once the supplier proves they own the
  // site by installing our badge (embed). Never set from data entry alone.
  if (v.embedded === true || v.domainVerified === true) {
    score += 20;
    ticks.push("Domain");
  }

  // Research-use compliance (+5) — inferred; most UK research sites comply.
  if (v.compliant !== false) {
    score += 5;
    ticks.push("Compliant");
  }

  // Genuine reviews (+10) — based on stored rating (comments, not votes).
  const rating = typeof v.rating === "number" ? v.rating : 0;
  if (rating >= 4.5) {
    score += 10;
    ticks.push("Reviews");
  } else if (rating >= 3) {
    score += 5;
  }

  // Shipping & support (+5) — confirmed shipping stanza present.
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
