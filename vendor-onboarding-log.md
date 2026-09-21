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
