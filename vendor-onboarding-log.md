# ViralPeps — Vendor Onboarding & Monetisation Log

Tracks suppliers Azar is onboarding: widget installs, TrustScore changes, package
upgrades, and paid marketing (banners, promo products, etc.).

**Purpose:** know at a glance which vendors are engaged, what they've actually
done vs what they've only been offered, and what they still owe.

---

## Status key

| Code | Meaning |
|---|---|
| `FREE` | Listed for free, no widget, no payment |
| `WIDGET` | Free TrustScore widget installed (worth +20 domain credit) |
| `TRIAL` | On a trial of a paid package |
| `PAID` | Paying for a package |
| `DECLINED` | Offered and declined |
| `AWAITING` | Offer sent, no response yet |

---

## Vendor log

### SPX Labs — `spx-labs`

- **Site:** https://spxlabs.co.uk
- **Status:** `WIDGET` — widget installed, **not** upgraded
- **TrustScore:** **65** (was 55 before widget install)
- **Widget installed:** ✅ yes — earns the +20 free domain credit
- **Package upgrade (needs £50/month):** ❌ **NOT upgraded**
- **Marketing banners bought:** ❌ none
- **Promo products bought:** ❌ none
- **Verified (paid tier):** No — `verified: false` in vendors.json
- **Last TrustScore check:** 2026-09-16

**Notes:** Installed the free widget and took the TrustScore bump, but has not
converted to the paid £50/month package or bought any additional marketing.
Prime upsell candidate — they've shown willingness to engage but stopped at free.

**Next action:** follow up on the £50/month package; reference their improved
TrustScore (65) as the reason to go verified/paid.

---

### PeptX — `peptx`

- **Site:** https://peptx.co.uk
- **Status:** `FREE` — listed, no widget, no payment
- **TrustScore:** 4.3 rating, `verified: false`, `labTested: false` (INCORRECT — see below)
- **Widget installed:** ❌ no
- **Package upgrade:** ❌ no
- **Marketing banners bought:** ❌ none
- **Promo products bought:** ❌ none
- **Last TrustScore check:** 2026-09-16

**Notes:** ⚠️ **Listings found broken 17 Sep.** PeptX moved to a dual supply model
(UK Express single vials / Factory Direct bulk boxes). All 22 ViralPeps listings were
wrong: prices drifted (Retatrutide listed £109 vs live £43.99), 8 of 22 URLs pointed at
the `/shop` category page, 3 pointed at soft-404 `/product/*` URLs, and all 18 product
images were byte-identical placeholders.

PeptX DOES hold real third-party certificates (Janoshik, Analiza Białek, Vanguard) —
`labTested: false` understates them. PeptX is a **trading name of PX Reagents Ltd**,
registered in Scotland (SC890970), ICO ZC236652 — genuine UK business.

**Next action:** 22 listings being corrected in the 18 Sep supplier cron (single-vial
prices as the comparable retail price; bulk box goes to a separate wholesale/trade
listing). Then upsell candidate — no widget installed yet.

---

## Upsell opportunities (vendors with WIDGET but no PAID)

| Vendor | TrustScore | Package | Banners | Status |
|---|---|---|---|---|
| SPX Labs | 65 | ❌ | ❌ | `WIDGET` |

*Add rows here as vendors install the widget without upgrading.*

---

## Fixes owed / in progress

| Vendor | Issue | Status |
|---|---|---|
| PeptX | 22 listings wrong (prices/URLs/images/TrustScore) | ⏳ In 18 Sep supplier cron |
| PeptX | No widget installed — free-listing only | 📋 Upsell target |

---

## Changelog

- **2026-09-17** — Created log. SPX Labs recorded: widget installed, TrustScore 65, no package upgrade, no banners/promo products.
- **2026-09-17** — Added PeptX. 22 listings found broken (prices, `/shop` URLs, soft-404 URLs, identical placeholder images); TrustScore `labTested:false` understates real certificates. Fix scheduled in 18 Sep supplier cron. Added "Fixes owed" table.
- **2026-10-01** — Added **Pyrox Labs** (`pyrox-labs`, pyroxlabs.co.uk, Pyrox Labs Ltd, registered England & Wales). Status `FREE`, TrustScore **60/100** (Lab-Tested + Contact + Compliant + Shipping; no reviews platform, no widget, no paid audit). 33 single-unit source entries across 20 master compounds, 33 real localised product images, logo installed (navy-panel variant — the "Dark" logo was white-on-transparent and invisible on the white card, so the panel variant was used instead). All 33 URLs passed the GET + `<title>` content check; price-sanity guard flagged only the documented Pillar 8 mg-normalisation false positive (`tirzepatide 5mg £24.99` vs a median dominated by 20–60mg doses — per-mg curve verifies as correct). Multi-vial research bundles, starter kits and Bac Water multipacks were excluded from the single-unit comparison column (PeptX Pitfall 3). Reconfirmed the `vendor-autocheck.mjs --slug=` cache-wipe bug — the per-slug run replaced the 97-key `trustscore-autocheck.json` with a 1-key file; restored by merging HEAD + new entry (98 keys).
- **2026-10-06** — Added **Peptide Global** (`peptide-global`, peptideglobal.co.uk, **Peptide Global Ltd**, registered England & Wales, company number 17355820). Status `FREE`, TrustScore **60/100** (Lab-Tested + Contact + Compliant + Shipping; no reviews platform, no widget, no paid audit). 32 source entries across 20 master compounds (10 pre-mixed pens + 22 vial/liquid formats), 32 real localised product images (32 unique MD5s — Guard 3 pass), logo installed (`logo-stacked-blue` variant — the primary logo's white S-ribbon vanishes on white; the stacked-blue mark is blue with a white-on-blue GLOBAL badge, safe on white). All 32 URLs passed the GET + `<title>` content check. Coverage reconciliation (Pillar 7) clean. Guard 4 flagged the 10 pens at >3x the vial median — verified as the documented **Pillar 8 mg-normalisation false positive** (pens are multi-dose formats; per-mg maths confirms genuine pricing, not MOQ leaks). Reconfirmed the `--slug=` cache-wipe bug; cache restored by merging HEAD + new entry (103 keys). Email `sales@peptideglobal.co.uk`; free tracked UK next-day, same-day dispatch before 2pm GMT; payment by open banking / bank transfer.
- **2026-10-07** — Added **Nilah Labs** (`nilah-labs`, nilahlabs.co.uk, **Nilah Ltd**, trading as Nilah Labs, registered England & Wales, company number 16924398). Status `FREE`, TrustScore **55/100** (Lab-Tested + Reviews + Contact + Compliant + Shipping; no widget, no paid audit). 23 source entries across 15 master compounds, 15 real localised product images (15 unique MD5s — Guard 3 pass), logo installed (`Nilah_Labs_Logo_Black` variant — the black mark on a white card). All 15 product URLs passed GET + `<title>` content check + price/cart presence (Shopify `/products/<handle>` URLs). Guard 4 clean (no price-sanity flags). **Note:** the `pt-141` compound **id is duplicated** in compounds.json across two masters (`pt-141-bremelanotide`, 48 vendors, canonical; and `pt-141`, 14 vendors, legacy) — the Nilah entry was placed on the canonical `pt-141-bremelanotide` to match where every recent vendor's PT-141 sits; the legacy duplicate was left byte-identical to its pre-run state. Pre-existing data debt, logged for cleanup. Email `support@nilahlabs.co.uk`, phone +44 3301 333 390; free Royal Mail Tracked 24 next-day on all UK orders, same-day dispatch before 3pm GMT; Trustpilot rated 5/5; UK mainland only, no international shipping; card/PayPal/Google Pay/Shop Pay.

---

### Peptide Global — `peptide-global` (FREE, upsell candidate)

- **Site:** https://peptideglobal.co.uk
- **Legal entity:** Peptide Global Ltd — England & Wales, company number **17355820**
- **Status:** `FREE` — listed, no widget, no paid package
- **TrustScore:** **60/100** | Widget installed: ❌ no | Package upgrade: ❌ no
- **Email:** sales@peptideglobal.co.uk
- **Delivery:** Free tracked UK next-day on every order (no minimum) · same-day dispatch before 2pm GMT · 24–48h · EU 2–4 working days, RoW 3–7 at checkout · cold-chain handled
- **Payment:** Open banking / bank transfer (no card details collected)
- **Next action:** no widget installed — upsell the free TrustScore badge, then the £50/mo package.

---

### Nilah Labs — `nilah-labs` (FREE, upsell candidate)

- **Site:** https://nilahlabs.co.uk
- **Legal entity:** Nilah Ltd — trading as Nilah Labs · England & Wales, company number **16924398**
- **Registered address:** 66 Paul Street, London, England, EC2A 4NA
- **Status:** `FREE` — listed, no widget, no paid package
- **TrustScore:** **55/100** | Widget installed: ❌ no | Package upgrade: ❌ no
- **Email:** support@nilahlabs.co.uk · Phone: +44 3301 333 390 (Mon–Fri 9am–5pm)
- **Delivery:** Free Royal Mail Tracked 24 next-day on all UK orders (no minimum) · same-day dispatch before 3pm GMT Mon–Fri · all orders processed within 24h · **UK mainland only — no international shipping**
- **Payment:** Card, PayPal, Google Pay, Shop Pay
- **Reviews:** Trustpilot (rated 5/5) · Judge.me installed
- **Products listed:** 15 products → 23 dosage entries across 15 master compounds
- **Next action:** no widget installed — upsell the free TrustScore badge, then the £50/mo package.
