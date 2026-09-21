#!/usr/bin/env python3
"""
TASK 1 — FIX all 22 PeptX listings.

Sources of truth:
  - tmp/_peptx_live.json  (live Supabase catalogue, scraped 2026-09-18)
  - supplier-cron-tonight-17sep.md (verified single-vial prices)

Rules applied:
  - URL  -> https://peptx.co.uk/single-vials/<slug>   (real product page, title-verified)
  - Price-> verified cheapest IN-STOCK single-vial price
  - Dose -> the dose matching that price
  - Image-> /images/products/peptx/<vp-slug>.webp (real CDN render, downloaded)
  - aod-9604 / cagrilintide / liraglutide -> PeptX source REMOVED (box_10 bulk only,
    no single-vial page; bulk box must never appear in the retail comparison)
"""
import json, shutil, os

COMPOUNDS = 'src/data/compounds.json'
c = json.load(open(COMPOUNDS))

# vp_slug -> (peptx_url_slug, price_gbp, dose, in_stock)
FIX = {
 "tirzepatide":           ("tirzepatide",            "£46.99", "30mg",  True),
 "semaglutide":           ("semaglutide",            "£42.99", "20mg",  True),
 "retatrutide":           ("retatrutide",            "£43.99", "10mg",  True),
 "bpc-157":               ("bpc-157",                "£27.99", "10mg",  True),
 "ghk-cu":                ("ghk-cu",                 "£21.99", "50mg",  True),
 "tesamorelin":           ("tesamorelin",            "£41.99", "10mg",  False),
 "mots-c":                ("mots-c",                 "£22.99", "10mg",  True),
 "ss-31":                 ("ss-31",                  "£32.99", "10mg",  True),
 "selank":                ("selank",                 "£24.99", "10mg",  True),
 "semax":                 ("semax",                  "£24.99", "10mg",  True),
 "kisspeptin":            ("kisspeptin-10",          "£24.99", "5mg",   True),
 "pt-141":                ("pt-141",                 "£23.99", "10mg",  True),
 "nad-plus":              ("nad",                    "£28.99", "500mg", True),
 "kpv":                   ("kpv",                    "£25.99", "10mg",  True),
 "sermorelin":            ("sermorelin",             "£32.99", "10mg",  True),
 "ipamorelin":            ("ipamorelin",             "£19.99", "5mg",   True),
 "dsip":                  ("dsip",                   "£19.99", "5mg",   True),
 "mt-1":                  ("mt-1",                   "£20.99", "10mg",  True),
 "ahk-cu":                ("ahk-cu",                 "£24.99", "100mg", True),
 "5-amino-1mq":           ("5-amino-1mq",            "£24.99", "50mg",  True),
 "ara-290":               ("ara-290",                "£34.99", "16mg",  True),
 "cartalax":              ("cartalax",               "£45.99", "40mg",  True),
 "pe-22-28":              ("pe-22-28",               "£25.99", "10mg",  True),
 "mazdutide":             ("mazdutide",              "£27.99", "10mg",  True),
 "thymosin-alpha-1":      ("ta-1-thymosin-alpha-1",  "£25.99", "5mg",   True),
 "klow-blend":            ("klow-blend",             "£63.99", "80mg",  True),
 "glutathione":           ("glutathione",            "£19.99", "1500mg",False),
 "l-carnitine":           ("l-carnitine",            "£16.99", None,    True),
 "oxytocin-acetate":      ("oxytocin-acetate",       "£23.99", "5mg",   True),
 "eloralintide":          ("eloralintide",           "£45.99", "5mg",   False),
}

# compound slugs whose PeptX source is REMOVED (bulk-only, no single vial)
DROP_PEPTX = {"aod-9604", "cagrilintide", "liraglutide"}

report = {"urls_fixed": [], "prices_fixed": [], "doses_fixed": [],
          "images_fixed": [], "dropped": [], "unchanged": []}

for comp in c:
    slug = comp["slug"]
    srcs = comp.get("sources", [])

    # --- removals ---
    if slug in DROP_PEPTX:
        before = len(srcs)
        comp["sources"] = [s for s in srcs if s.get("vendor") != "PeptX"]
        if len(comp["sources"]) < before:
            report["dropped"].append(slug)
        continue

    fix = FIX.get(slug)
    for s in srcs:
        if s.get("vendor") != "PeptX":
            continue
        if not fix:
            report["unchanged"].append(slug)
            continue
        peptic_slug, price, dose, in_stock = fix
        old_url, old_price, old_dose, old_img = s.get("url"), s.get("price"), s.get("dosage"), s.get("image")

        new_url = f"https://peptx.co.uk/single-vials/{peptic_slug}"
        if old_url != new_url:
            report["urls_fixed"].append((slug, old_url, new_url))
            s["url"] = new_url
        if old_price != price:
            report["prices_fixed"].append((slug, old_price, price))
            s["price"] = price
        if (old_dose or None) != dose:
            report["doses_fixed"].append((slug, old_dose, dose))
            if dose:
                s["dosage"] = dose
            else:
                s.pop("dosage", None)

        new_img = f"/images/products/peptx/{slug}.webp"
        if old_img != new_img:
            report["images_fixed"].append((slug, old_img, new_img))
            s["image"] = new_img
        s["inStock"] = in_stock

# also normalise the nad-plus image name (file saved as nad-plus.webp already)
json.dump(c, open(COMPOUNDS, 'w'), indent=2, ensure_ascii=False)

print("=== PeptX FIX report ===")
print(f'URLs replaced      : {len(report["urls_fixed"])}')
for slug, o, n in report["urls_fixed"]:
    kind = "/shop" if o and o.endswith("/shop") else ("soft-404" if o and "/product/" in o else "other")
    print(f'   {slug:22} [{kind:8}] {o}  ->  {n}')
print(f'Prices corrected   : {len(report["prices_fixed"])}')
for slug, o, n in report["prices_fixed"]:
    print(f'   {slug:22} {o} -> {n}')
print(f'Doses corrected    : {len(report["doses_fixed"])}')
for slug, o, n in report["doses_fixed"]:
    print(f'   {slug:22} {o} -> {n}')
print(f'Images replaced    : {len(report["images_fixed"])}')
print(f'PeptX sources DROPPED (bulk-only): {report["dropped"]}')
print(f'Unmapped (no fix)  : {report["unchanged"]}')

json.dump(report, open('tmp/_peptx_fix_report.json','w'), indent=2)
