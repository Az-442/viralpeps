import json

COMP = 'src/data/compounds.json'
c = json.load(open(COMP))
by_slug = {x["slug"]: x for x in c}

# ---- final VialVerse map: vialverse slug -> (target compound slug, price_gbp, dose) ----
# lowest single-unit price per product page (from tmp/_vv_pages.json)
VV = {
 "retatrutide":            ("retatrutide",            "39.00", None),
 "mots-c":                 ("mots-c",                 "19.00", None),
 "nad":                    ("nad-plus",               "26.00", "500mg"),
 "bpc-157":                ("bpc-157",                "19.00", None),
 "ghk-cu":                 ("ghk-cu",                 "15.00", None),
 "glow-blend":             ("glow",                   "44.00", None),
 "tesamorelin":            ("tesamorelin",            "40.00", "10mg"),
 "cjc-1295-ipamorelin":    ("cjc-1295-ipamorelin-blend", "29.00", None),
 "klow-blend":             ("klow",                   "52.00", "80mg"),
 "tb-500":                 ("tb-500",                 "24.00", None),
 "ipamorelin":             ("ipamorelin",             "24.00", None),
 "cjc-1295-no-dac":        ("cjc-1295-no-dac",        "26.00", None),
 "cjc-1295-with-dac":      ("cjc-1295-with-dac",      "31.00", None),
 "semax":                  ("semax",                  "25.00", "10mg"),
 "5-amino-1mq":            ("5-amino-1mq",            "30.00", None),
 "adipotide":              ("adipotide",              "50.00", "10mg"),
 "melanotan-ii":           ("melanotan-ii",           "26.00", "10mg"),
 "ll-37":                  ("ll-37",                  "30.00", "5mg"),
 "slu-pp-332":             ("slu-pp-332",             "27.00", "5mg"),
 "abaloparatide":          ("abaloparatide",          "85.00", "3mg"),
 "teriparatide":           ("teriparatide",           "55.00", "750mcg"),
 "thymosin-alpha-1":       ("thymosin-alpha-1",       "54.00", "10mg"),
 "survodutide":            ("survodutide",            "40.00", "10mg"),
 "sermorelin":             ("sermorelin",             "24.00", "5mg"),
 "pt-141":                 ("pt-141",                 "19.00", "10mg"),
 "glutathione":            ("glutathione",            "44.00", "1500mg"),
 "melanotan-i":            ("melanotan-i",            "19.00", "10mg"),
 "snap-8":                 ("snap-8",                 "16.00", "10mg"),
 "igf-1-lr3":              ("igf-1-lr3",              "30.00", "1mg"),
 "selank":                 ("selank",                 "23.00", "10mg"),
 "ghrp-6":                 ("ghrp-6",                 "14.00", "10mg"),
 "ara-290":                ("ara-290",                "32.00", "16mg"),
 "ss-31":                  ("ss-31",                  "25.00", None),
 "cagrilintide":           ("cagrilintide",           "28.00", None),
 "aicar":                  ("aicar",                  "34.00", None),
 "pe-22-28":               ("pe-22-28",               "32.00", "10mg"),
 "thymulin":               ("thymulin",               "32.00", "10mg"),
 "tesamorelin-ipamorelin": ("tesamorelin-ipamorelin", "42.00", "10mg"),
 "matrixyl":               ("matrixyl-3000",          "32.00", "10mg"),
 "hexarelin":              ("hexarelin",              "25.00", "3mg"),
 "bpc-157-tb-500":         ("bpc-157-tb-500",         "26.15", None),
 "ghrp-2":                 ("ghrp-2",                 "17.00", "10mg"),
 "dsip":                   ("dsip",                   "12.00", None),
 "mazdutide":              ("mazdutide",              "52.00", "10mg"),
 "aod-9604":               ("aod-9604",               "20.00", None),
 "adamax":                 ("adamax",                 "42.00", "10mg"),
 "kisspeptin-10":          ("kisspeptin-10",          "29.00", "10mg"),
 "oxytocin":               ("oxytocin-acetate",       "26.00", "10mg"),
 "kpv":                    ("kpv",                    "22.00", "10mg"),
 "vip":                    ("vip",                    "32.00", "10mg"),
 "p21":                    ("p21",                    "32.00", "10mg"),
 "pnc-27":                 ("pnc-27",                 "83.00", "30mg"),
}

# ---- Kings Bio Labs map ----
KBL = {
 "tesamorelin":         ("tesamorelin",         "45.00", "10mg"),
 "bpc-157":             ("bpc-157",             "18.00", "10mg"),
 "tb-500":              ("tb-500",              "25.00", "10mg"),
 "ghk-cu":              ("ghk-cu",              "45.00", "100mg"),
 "mots-c":              ("mots-c",              "55.00", "40mg"),
 "ss-31":               ("ss-31",               "40.00", "10mg"),
 "kpv":                 ("kpv",                 "20.00", "10mg"),
 "selank":              ("selank",              "25.00", "10mg"),
 "dsip":                ("dsip",                "40.00", "10mg"),
 "nad":                 ("nad-plus",            "50.00", "1000mg"),
 "ara-290":             ("ara-290",             "30.00", "10mg"),
 "thymosin-alpha-1":    ("thymosin-alpha-1",    "55.00", "10mg"),
 "cjc-1295-ipamorelin": ("cjc-1295-ipamorelin-blend", "40.00", "10mg"),
}

def add(vendor_name, vendor_slug, url_slug, tgt, price, dose, report, label):
    comp = by_slug.get(tgt)
    if not comp:
        report.append(f"  MISSING TARGET: {tgt} (from {url_slug})")
        return
    # skip if vendor already has an entry on this compound
    for s in comp.get("sources", []):
        if s.get("vendor") == vendor_name:
            report.append(f"  SKIP (already present): {vendor_name} on {tgt}")
            return
    entry = {
        "vendor": vendor_name,
        "url": f"https://{label}/{url_slug}",
        "price": f"£{price}",
        "inStock": True,
        "image": f"/images/products/{vendor_slug}/{tgt}.webp",
    }
    if dose:
        entry["dosage"] = dose
    comp.setdefault("sources", []).append(entry)
    report.append(f"  + {vendor_name:14} -> {tgt:28} £{price:8} dose={str(dose):8} {entry['url']}")

report = []
print("=== VIALVERSE additions ===")
for vs, (tgt, price, dose) in sorted(VV.items()):
    add("VialVerse", "vialverse", f"peptides/{vs}", tgt, price, dose, report, "vialverse.com")
print("\n".join(report)); report.clear()

print("\n=== KINGS BIO LABS additions ===")
for vs, (tgt, price, dose) in sorted(KBL.items()):
    add("Kings BioLabs", "kings-bio-labs", vs, tgt, price, dose, report, "www.kingsbiolabs.co.uk")
print("\n".join(report)); report.clear()

json.dump(c, open(COMP, 'w'), indent=2, ensure_ascii=False)
print("\nsaved compounds.json")
