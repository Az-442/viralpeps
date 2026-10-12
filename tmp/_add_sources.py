import json

cp = 'src/data/compounds.json'
c = json.load(open(cp))
by_slug = {x['slug']: x for x in c}

V = "Kingston Peptides"
BASE = "https://kingstonpeptides.com/en/products"
IMG = "/images/products/kingston-peptides"

# compound slug -> list of source entries
sources = {
    "bpc-157": [
        {"vendor": V, "url": f"{BASE}/bpc-157", "price": "£13.00", "inStock": True,
         "image": f"{IMG}/bpc-157.webp", "dosage": "5mg",
         "options": [{"size": "5mg", "price": "£13.00"}, {"size": "10mg", "price": "£22.00"}]},
    ],
    "tb-500": [
        {"vendor": V, "url": f"{BASE}/tb-500", "price": "£12.00", "inStock": True,
         "image": f"{IMG}/tb-500.webp", "dosage": "5mg",
         "options": [{"size": "5mg", "price": "£12.00"}, {"size": "10mg", "price": "£20.00"}]},
    ],
    "ghk-cu": [
        {"vendor": V, "url": f"{BASE}/ghk-cu", "price": "£20.00", "inStock": True,
         "image": f"{IMG}/ghk-cu.webp", "dosage": "100mg"},
    ],
    "melanotan-ii": [
        {"vendor": V, "url": f"{BASE}/melanotan-ii", "price": "£14.00", "inStock": True,
         "image": f"{IMG}/melanotan-ii.webp", "dosage": "10mg"},
    ],
    "selank": [
        {"vendor": V, "url": f"{BASE}/selank", "price": "£23.00", "inStock": True,
         "image": f"{IMG}/selank.webp", "dosage": "10mg"},
    ],
    "semax": [
        {"vendor": V, "url": f"{BASE}/semax", "price": "£23.00", "inStock": True,
         "image": f"{IMG}/semax.webp", "dosage": "10mg"},
    ],
    "retatrutide": [
        {"vendor": V, "url": f"{BASE}/reta", "price": "£29.00", "inStock": False,
         "image": f"{IMG}/retatrutide.webp", "dosage": "10mg"},
    ],
    "bacteriostatic-water": [
        {"vendor": V, "url": f"{BASE}/bacteriostatic-water", "price": "£3.00", "inStock": True,
         "image": f"{IMG}/bacteriostatic-water.webp", "dosage": "10ml"},
    ],
    "glow": [
        {"vendor": V, "url": f"{BASE}/glow-bpc-157-tb-500-ghk-cu", "price": "£39.00", "inStock": True,
         "image": f"{IMG}/glow.webp", "dosage": "BPC 10mg + TB 10mg + GHK 50mg"},
    ],
    "wolverine-stack-bpc157-tb500-blend": [
        {"vendor": V, "url": f"{BASE}/wolverine-bpc-157-tb-500", "price": "£21.00", "inStock": True,
         "image": f"{IMG}/wolverine-stack-bpc157-tb500-blend.webp", "dosage": "BPC 5mg + TB 5mg"},
    ],
}

added = 0
for slug, entries in sources.items():
    comp = by_slug[slug]
    for e in entries:
        comp['sources'].append(e)
        added += 1
    print(f"{slug:40s} + {len(entries)} source(s) -> total {len(comp['sources'])}")

json.dump(c, open(cp, 'w'), indent=2, ensure_ascii=False)
print("SOURCES ADDED:", added)
