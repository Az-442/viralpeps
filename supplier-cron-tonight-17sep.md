# Supplier-Addition Cron — Tonight's Job (17 Sep 2026)

Purpose: tonight's `52e36371d2c1` daily supplier-addition run does 4 tasks, then reverts to normal tomorrow.

---

## TASK 1 — Rebuild all 22 PeptX listings (FIX)

PeptX moved to a dual supply model. Existing listings are wrong: wrong prices, 8 of 22 URLs
point at `/shop` (category, not product), 3 point at soft-404 `/product/*` URLs, and every
image is the same placeholder file.

**Rule (user-approved):** list the **single vials** (UK Express) as the comparable retail
price. PeptX's Factory Direct bulk box is a separate **wholesale/trade listing** — do not
use bulk prices in the main comparison.

### Verified live single-vial prices (scraped 17 Sep 2026, all in stock)

Canonical URL form: `https://peptx.co.uk/single-vials/<slug>`

| Compound on VP      | slug                     | Price   | Dose options      |
|---------------------|--------------------------|---------|-------------------|
| tirzepatide         | tirzepatide              | £46.99  | 10/20/30/60mg     |
| semaglutide         | semaglutide              | £42.99  | 20mg              |
| retatrutide         | retatrutide              | £43.99  | 10/20/30/40mg     |
| bpc-157             | bpc-157                  | £27.99  | 10mg              |
| ghk-cu              | ghk-cu                   | £21.99  | 50/100mg          |
| tesamorelin         | tesamorelin              | £41.99  | 10mg              |
| mots-c              | mots-c                   | £22.99  | 10/20mg           |
| ss-31               | ss-31                    | £32.99  | 10mg              |
| selank              | selank                   | £24.99  | 10mg              |
| semax               | semax                    | £24.99  | 10mg              |
| kisspeptin          | kisspeptin-10            | £24.99  | 5mg               |
| pt-141              | pt-141                   | £23.99  | 10mg              |
| nad-plus            | nad                      | £28.99  | 500mg             |
| aod-9604            | (no single-vial page)    | —       | —                 |
| cagrilintide        | (no single-vial page)    | —       | —                 |
| liraglutide         | (no single-vial page)    | —       | —                 |
| eloralintide        | eloralintide             | (renders, no price found) | 5/10mg  |
| kpv                 | kpv                      | £25.99  | 10/60mg           |
| sermorelin          | sermorelin               | £32.99  | 10mg              |
| ipamorelin          | ipamorelin               | £19.99  | 5mg               |
| dsip                | dsip                     | £19.99  | 5mg               |
| mt-1                | mt-1                     | £20.99  | 10mg              |
| ahk-cu              | ahk-cu                   | £24.99  | 100mg             |
| 5-amino-1mq         | 5-amino-1mq              | £24.99  | 50/500mg          |
| ara-290             | ara-290                  | £34.99  | 16mg              |
| cartalax            | cartalax                 | £45.99  | 40mg              |
| pe-22-28            | pe-22-28                 | £25.99  | 10mg              |
| mazdutide           | mazdutide                | £27.99  | 10mg              |
| thymosin-alpha-1    | ta-1-thymosin-alpha-1    | £25.99  | 5mg               |
| klow-blend          | klow-blend               | £63.99  | 80mg              |
| glutathione         | glutathione              | £19.99  | 1500mg            |
| l-carnitine         | l-carnitine              | £16.99  | —                 |
| oxytocin-acetate    | oxytocin-acetate         | £23.99  | 5mg               |

### Changes to apply

1. **URL** — replace all `/shop` and `/product/*` links with the real `/single-vials/<slug>` URL.
2. **Price** — replace with the verified single-vial price above.
3. **Dose** — set `dosage` from the dose-option list (use the base/lowest dose).
4. **Image** — the 18 files in `public/images/products/peptx/` are all byte-identical
   placeholder. Replace with real product images (fetch each product image from PeptX, or
   generate vial renders via FAL using the approved `-vial.png` templates). **Do NOT ship
   placeholders again.**
5. **TrustScore** — rating 4.3, `verified: false`, `labTested: false`, `lastTested: ""`.
   PeptX has real Janoshik / Analiza Białek / Vanguard certificates on its product pages.
   Set `labTested: true` and a `lastTested` date so the score reflects reality.

### Compounds with NO single-vial page
`aod-9604`, `cagrilintide`, `liraglutide` — PeptX has no UK Express single vial for these.
Do NOT invent a price. Either mark them as **Factory Direct / bulk only** or remove the
PeptX source from those 3 compounds. Report which option was taken.

---

## TASK 2 — Add supplier: Claripep (claripep.co.uk)

WordPress/WooCommerce, All-in-One SEO. Live. 8 products in the product sitemap.

Real product URLs (verified, HTTP 200, product-specific titles):
- https://claripep.co.uk/product/cjc-1295no-dac-5mg/
- https://claripep.co.uk/product/cjc-1295-no-dac-10mg/
- https://claripep.co.uk/product/epithalon-50mg/
- https://claripep.co.uk/product/ipamorelin-5mg/
- https://claripep.co.uk/product/ipamorelin-10mg/
- https://claripep.co.uk/product/tb-500-5mg/
- https://claripep.co.uk/product/tb-500-10mg/
- https://claripep.co.uk/product/bpc-157-5mg/

Run the TrustScore autocheck. Capture price per product at run time (site is JS-light —
standard fetch should work; verify with the title-check rule).

---

## TASK 3 — Add supplier: VialVerse (vialverse.com)

Shopify-style, 50+ peptide pages found. Live, HTTP 200, product-specific titles.

Canonical URL form: `https://vialverse.com/peptides/<slug>`

Notable slugs (verified live): retatrutide, mots-c, nad, bpc-157, ghk-cu, glow-blend,
tesamorelin, cjc-1295-ipamorelin, klow-blend, tb-500, ipamorelin, cjc-1295-with-dac,
cjc-1295-no-dac, semax, 5-amino-1mq, melanotan-ii, pt-141, selank, ss-31, cagrilintide,
kisspeptin-10, dsip, mazdutide, aod-9604, ara-290, glutathione, sermorelin, semax,
thymosin-alpha-1, survodutide, teriparatide.

Full list: `https://vialverse.com/vv-sitemap-1-gb-1.xml`

Prices are per-variant. Capture the **lowest single-unit price** for the comparison table.

---

## TASK 4 — Add supplier: Kings Bio Labs (kingsbiolabs.co.uk)

Live, HTTP 200, product-specific titles (format: "Buy <Compound> <Dose> UK | Research Use
Only | Kings BioLabs"). **Canonical host is `www.kingsbiolabs.co.uk`.**

Verified product URLs and prices:
- https://www.kingsbiolabs.co.uk/tesamorelin — £45 (10mg)
- https://www.kingsbiolabs.co.uk/bpc-157 — £18 (10mg)
- https://www.kingsbiolabs.co.uk/tb-500 — £25 (10mg)
- https://www.kingsbiolabs.co.uk/ghk-cu — £45 (100mg)
- https://www.kingsbiolabs.co.uk/mots-c — £55 (40mg)
- https://www.kingsbiolabs.co.uk/ss-31 — £40 (10mg)
- https://www.kingsbiolabs.co.uk/kpv — £20 (10mg)
- https://www.kingsbiolabs.co.uk/selank — £25 (10mg)
- https://www.kingsbiolabs.co.uk/dsip — £40 (10mg)
- https://www.kingsbiolabs.co.uk/nad — £50 (1000mg)
- https://www.kingsbiolabs.co.uk/ara-290 — £30 (10mg)
- https://www.kingsbiolabs.co.uk/thymosin-alpha-1 — £55 (10mg)
- https://www.kingsbiolabs.co.uk/cjc-1295-ipamorelin — £40 (10mg)

(£4.99 and the small values in the scrape are shipping/related items — ignore.)

---

## GUARD — must be added to the cron this run

The PeptX failure happened because the cron accepted URLs without validating them.
Add these checks before ANY listing is written:

1. **Title-content check.** Fetch the URL. If `<title>` equals the generic site name
   (e.g. "Peptx, Research Peptides Direct from Factory") instead of naming the compound,
   the URL is a **soft-404** — reject it.
2. **Reject category pages.** `/shop`, `/products`, `/category/*`, `/collections/*` are
   never valid product URLs.
3. **Image uniqueness check.** If a vendor's product images are byte-identical
   (same MD5), they are placeholders — do not ship; fetch real images or generate vial
   renders.
4. **Price sanity.** Flag any price that is >3x or <1/3 of the vendor's median for that
   compound — usually means a bulk/MOQ price leaked into a single-unit field.

---

## REVERT

This is a **one-off expanded run**. Tomorrow `52e36371d2c1` returns to normal:
one new supplier per day, standard checks.
