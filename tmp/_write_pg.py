#!/usr/bin/env python3
"""Write Peptide Global into vendors.json + compounds.json (ADD ONLY)."""
import json, os, shutil

VENDOR_NAME = "Peptide Global"
VENDOR_SLUG = "peptide-global"
IMG_DIR = "/images/products/peptide-global"

# product slug -> (compound id in compounds.json, dosage, price gbp, image filename)
PRODUCTS = [
  # pens (pre-mixed) — mapped to their compound
  ("mt2-pen",                       "mt2",                                      "20mg", "melanotan-ii"),
  ("glow-peptide-pen",              "glow",                                     "140mg","glow"),
  ("ghk-cu-pen",                    "ghk-cu",                                   "100mg","ghk-cu-pen"),
  ("klow-pen",                      "klow",                                     "160mg","klow-pen"),
  ("mots-c-pen",                    "mots-c",                                   "60mg", "mots-c-pen"),
  ("tesamorelin-pen",               "tesamorelin",                              "20mg", "tesamorelin-pen"),
  ("bpc-157-tb-500-pen",            "bpc-157-tb-500",                           "40mg", "bpc-157-tb-500-pen"),
  ("semax-pen",                     "semax",                                    "20mg", "semax-pen"),
  ("selank-pen",                    "selank",                                   "20mg", "selank-pen"),
  ("ipamorelin-pen",                "ipamorelin",                               "20mg", "ipamorelin-pen"),
  # vials
  ("ghk-cu-50mg-vial",              "ghk-cu",                                   "50mg", "ghk-cu-50mg"),
  ("ghk-cu-100mg-vial",             "ghk-cu",                                   "100mg","ghk-cu-100mg"),
  ("bpc-157-5mg-vial",              "bpc-157",                                  "5mg",  "bpc-157-5mg"),
  ("bpc-157-10mg-vial",             "bpc-157",                                  "10mg", "bpc-157-10mg"),
  ("tb-500-5mg-vial",               "tb-500",                                   "5mg",  "tb-500-5mg"),
  ("tb-500-10mg-vial",              "tb-500",                                   "10mg", "tb-500-10mg"),
  ("ipamorelin-5mg-vial",           "ipamorelin",                               "5mg",  "ipamorelin-5mg"),
  ("ipamorelin-10mg-vial",          "ipamorelin",                               "10mg", "ipamorelin-10mg"),
  ("bacteriostatic-water-10ml",     "bacteriostatic-water",                     "10ml", "bacteriostatic-water-10ml"),
  ("bacteriostatic-water-3ml",      "bacteriostatic-water",                     "3ml",  "bacteriostatic-water-3ml"),
  ("acetic-acid-water-10ml",        "acetic-acid-10ml",                         "10ml", "acetic-acid-10ml"),
  ("cjc-1295-no-dac-5mg-vial",      "cjc-1295",                                 "5mg",  "cjc-1295-no-dac-5mg"),
  ("cjc-1295-dac-2mg-vial",         "cjc-1295-dac",                             "2mg",  "cjc-1295-dac-2mg"),
  ("selank-5mg-vial",               "selank",                                   "5mg",  "selank-5mg"),
  ("selank-10mg-vial",              "selank",                                   "10mg", "selank-10mg"),
  ("semax-5mg-vial",                "semax",                                    "5mg",  "semax-5mg"),
  ("semax-10mg-vial",               "semax",                                    "10mg", "semax-10mg"),
  ("epithalon-10mg-vial",           "epitalon",                                 "10mg", "epitalon-10mg"),
  ("mots-c-10mg-vial",              "mots-c",                                   "10mg", "mots-c-10mg"),
  ("dsip-5mg-vial",                 "dsip",                                     "5mg",  "dsip-5mg"),
  ("pinealon-10mg-vial",            "pinealon",                                 "10mg", "pinealon-10mg"),
  ("kisspeptin-10-5mg-vial",        "kisspeptin-10",                            "5mg",  "kisspeptin-10-5mg"),
]

scrape = {p["url"].split("/product/")[-1].strip("/"): p for p in json.load(open("tmp/_pg_scrape.json"))}

# ---------- 1. vendors.json ----------
v = json.load(open("src/data/vendors.json"))
assert not any(x["slug"] == VENDOR_SLUG for x in v), "vendor already present!"

entry = {
  "id": VENDOR_SLUG,
  "name": VENDOR_NAME,
  "slug": VENDOR_SLUG,
  "website": "https://peptideglobal.co.uk",
  "rating": 4.5,
  "verified": False,
  "founded": 2026,
  "country": "UK",
  "description": (
    "Peptide Global is a UK-based research peptide supplier (Peptide Global Ltd, registered in England & Wales, "
    "company number 17355820) supplying premium research-grade compounds in both lyophilised vials and pre-mixed "
    "dosing pens. Orders are cold-chain handled and dispatched from their own UK facility the same working day before "
    "the 2pm GMT cut-off, with free tracked UK next-day delivery (24-48 hours) as standard. Payment is by secure open "
    "banking or direct bank transfer - no card details are collected. Sold strictly for laboratory research use only."
  ),
  "highlights": [
    "UK-registered company (Peptide Global Ltd, company number 17355820, England & Wales)",
    "40+ compounds stocked in lyophilised vials and pre-mixed pens",
    "Free tracked UK next-day delivery on every order - no minimum spend",
    "Same-day dispatch on orders before 2pm GMT from their own UK facility",
    "Cold-chain handled with thermal packaging and tamper seals",
    "Secure open banking / bank transfer payment (no card details collected)",
    "Research-use-only - not for human or veterinary consumption"
  ],
  "shipping": [
    "Free tracked UK delivery on every order (no minimum spend)",
    "UK: tracked next-day, 1 working day (free)",
    "Same-day dispatch on orders placed before 2pm GMT",
    "Typical delivery 24-48 hours from dispatch",
    "EU: tracked express 2-4 working days (calculated at checkout)",
    "Rest of world: tracked international 3-7 working days (calculated at checkout)",
    "Tracking number emailed the moment the order ships",
    "Cold-chain handled with thermal packaging and tamper seals"
  ],
  "payment": [
    "Open banking",
    "Bank transfer"
  ],
  "lastTested": "2026-10-06",
  "labTested": True,
  "email": "sales@peptideglobal.co.uk",
  "delivery": "Free tracked UK next-day delivery on every order (no minimum) \u00b7 same-day dispatch before 2pm GMT \u00b7 24-48h delivery \u00b7 EU 2-4 working days, RoW 3-7 working days at checkout \u00b7 cold-chain handled"
}
v.append(entry)
json.dump(v, open("src/data/vendors.json", "w"), indent=2, ensure_ascii=False)
print("vendors.json += Peptide Global | count:", len(v))

# ---------- 2. compounds.json ----------
c = json.load(open("src/data/compounds.json"))
by_id = {}
for comp in c:
    by_id.setdefault(comp["id"], comp)

added, missing = 0, []
for pslug, cid, dosage, imgname in PRODUCTS:
    comp = by_id.get(cid)
    if comp is None:
        missing.append((pslug, cid))
        continue
    sc = scrape[pslug]
    price = sc["jsonld_prices"][0]
    src = {
        "vendor": VENDOR_NAME,
        "url": sc["url"],
        "price": f"\u00a3{float(price):.2f}",
        "inStock": True,
        "image": f"{IMG_DIR}/{imgname}.webp",
        "dosage": dosage
    }
    # guard against duplicates
    if any(s.get("vendor") == VENDOR_NAME and s.get("url") == src["url"] for s in comp.get("sources", [])):
        print("DUP skip", cid); continue
    comp.setdefault("sources", []).append(src)
    added += 1
    print(f"  + {cid:24s} {dosage:6s} \u00a3{float(price):>6.2f}  {imgname}.webp")

json.dump(c, open("src/data/compounds.json", "w"), indent=2, ensure_ascii=False)
print(f"\ncompounds.json: {added} source entries added")
if missing:
    print("MISSING COMPOUND IDS:", missing)
