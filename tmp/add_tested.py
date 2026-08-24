import json

VENDOR_SLUG = "tested-peptides"
VENDOR_NAME = "Tested Peptides"

# compound-id -> (product url, price, inStock, image, dosage label)
MAPPING = {
    "bpc-157":                ("https://www.testedpeptides.co.uk/product/bpc-157-10mg/", "£29.99", True, "10mg"),
    "tb-500":                 ("https://www.testedpeptides.co.uk/product/tb-500-10mg/", "£29.99", False, "10mg"),
    "ghk-cu":                 ("https://www.testedpeptides.co.uk/product/ghk-cu-100mg/", "£45.99", True, "100mg"),
    "epitalon":               ("https://www.testedpeptides.co.uk/product/epitalon-10mg/", "£16.99", True, "10mg"),
    "igf-1-lr3":              ("https://www.testedpeptides.co.uk/product/igf-1-lr3-1mg/", "£39.99", True, "1mg"),
    "ss-31":                  ("https://www.testedpeptides.co.uk/product/ss-31-10-mg-research-peptide/", "£37.99", True, "10mg"),
    "aod9604":                ("https://www.testedpeptides.co.uk/product/aod-9604-5mg-peptide/", "£44.99", True, "5mg"),
    "dsip":                   ("https://www.testedpeptides.co.uk/product/dsip-5-mg-research-peptide/", "£15.99", True, "5mg"),
    "cjc-1295-no-dac":        ("https://www.testedpeptides.co.uk/product/cjc-1295-5mg-no-dac/", "£29.99", True, "5mg"),
    "ghrp-6":                 ("https://www.testedpeptides.co.uk/product/ghrp-6-10-mg-research-peptide/", "£16.99", True, "10mg"),
    "kpv":                    ("https://www.testedpeptides.co.uk/product/kpv-5mg/", "£22.99", True, "5mg"),
    "mots-c":                 ("https://www.testedpeptides.co.uk/product/mots-c-peptide-10mg/", "£24.99", True, "10mg"),
    "nad-plus":               ("https://www.testedpeptides.co.uk/product/nad-500mg/", "£74.99", True, "500mg"),
    "ipamorelin":             ("https://www.testedpeptides.co.uk/product/ipamorelin-5-mg/", "£19.99", True, "5mg"),
    "follistatin-344":        ("https://www.testedpeptides.co.uk/product/follistatin-344-1mg/", "£49.99", True, "1mg"),
    "cjc-1295-with-dac":      ("https://www.testedpeptides.co.uk/product/cjc-1295-with-dac-5mg/", "£36.99", True, "5mg"),
    "kisspeptin-10":          ("https://www.testedpeptides.co.uk/product/kissptin-10-10mg/", "£37.99", True, "10mg"),
    "5-amino-1mq":            ("https://www.testedpeptides.co.uk/product/5-amino-1mq-10-mg-research-peptide/", "£29.99", True, "10mg"),
    "glutathione":            ("https://www.testedpeptides.co.uk/product/l-glutathione-600mg/", "£22.99", True, "600mg"),
    "ll-37":                  ("https://www.testedpeptides.co.uk/product/ll-37-5-mg-research-peptide/", "£29.99", True, "5mg"),
    "cjc-1295-ipamorelin-blend": ("https://www.testedpeptides.co.uk/product/cjc-1295-no-dac-5-mg-ipamorelin-5-mg-research-peptide-blend/", "£41.99", True, "5mg+5mg"),
    "bacteriostatic-water":   ("https://www.testedpeptides.co.uk/product/bacteriostatic-bac-water-10ml/", "£7.95", True, "10ml"),
}

# ---- 1. Update vendors.json ----
vendors_path = "src/data/vendors.json"
vendors = json.load(open(vendors_path))
if any(v["slug"] == VENDOR_SLUG for v in vendors):
    print("VENDOR ALREADY EXISTS, skipping")
else:
    new_vendor = {
        "id": VENDOR_SLUG,
        "name": VENDOR_NAME,
        "slug": VENDOR_SLUG,
        "website": "https://www.testedpeptides.co.uk",
        "rating": 4.8,
        "verified": True,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier independently verified by The Peptide Watch. Every batch HPLC-tested by Janoshik with client-named Certificates of Analysis, 99%+ purity, and same-day dispatch before 3:30pm for next-day UK delivery.",
        "highlights": [
            "Janoshik HPLC tested (client-named COA)",
            "The Peptide Watch verified",
            "99%+ purity lab-tested",
            "Same-day dispatch (before 3:30pm)",
            "Next-day UK delivery",
            "Secure payments & discreet packaging"
        ],
        "shipping": [
            "UK next-day (order before 3:30pm Mon-Fri)",
            "Free UK delivery over £100"
        ],
        "payment": [
            "Cards",
            "Apple Pay",
            "Google Pay",
            "Bank transfer"
        ],
        "lastTested": "2026-08-03",
        "labTested": True
    }
    vendors.append(new_vendor)
    json.dump(vendors, open(vendors_path, "w"), indent=2, ensure_ascii=False)
    print(f"Added vendor: {VENDOR_NAME}")

# ---- 2. Update compounds.json ----
compounds_path = "src/data/compounds.json"
compounds = json.load(open(compounds_path))
added = 0
skipped = []
for c in compounds:
    cid = c["id"]
    if cid not in MAPPING:
        continue
    # skip if this vendor already has a source here
    if any(s.get("vendor") == VENDOR_NAME for s in c.get("sources", [])):
        skipped.append(cid)
        continue
    url, price, instock, dosage = MAPPING[cid]
    new_source = {
        "vendor": VENDOR_NAME,
        "url": url,
        "price": price,
        "inStock": instock,
        "image": f"/images/products/{VENDOR_SLUG}/{cid}.webp",
        "dosage": dosage,
    }
    c.setdefault("sources", []).append(new_source)
    added += 1

json.dump(compounds, open(compounds_path, "w"), indent=2, ensure_ascii=False)
print(f"\nAdded {added} sources to compounds.json")
print(f"Skipped (already present): {skipped}")
