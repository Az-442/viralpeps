#!/usr/bin/env python3
"""Fix Chroma Peptides source additions - allow multiple dosages from same URL."""
import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

compound_map = {c['id']: c for c in compounds}

def add_source(compound_id, vendor_name, url, price, in_stock, image, dosage=None):
    if compound_id not in compound_map:
        print(f"⚠️ Compound '{compound_id}' not found - skipping")
        return False
    
    compound = compound_map[compound_id]
    # Allow duplicate URLs if dosage is different
    for s in compound.get('sources', []):
        if s.get('vendor') == vendor_name and s.get('url') == url:
            if dosage and s.get('dosage') == dosage:
                print(f"  ⏭️ Already exists: {vendor_name} → {compound_id} ({dosage})")
                return False
    
    source = {
        "vendor": vendor_name,
        "url": url,
        "price": price,
        "inStock": in_stock,
        "image": image
    }
    if dosage:
        source["dosage"] = dosage
    
    if 'sources' not in compound:
        compound['sources'] = []
    compound['sources'].append(source)
    print(f"  ✅ Added: {vendor_name} → {compound_id} ({price}, {dosage})")
    return True

chroma_name = "Chroma Peptides"
chroma_base = "https://chromapeptides.co.uk"

chroma_products = [
    # (compound_id, url, price, in_stock, image, dosage)
    ("bpc-157", f"{chroma_base}/product/bpc-157/", "£18.33", True, "/images/products/chroma-peptides/bpc-157.webp", "5mg"),
    ("bpc-157", f"{chroma_base}/product/bpc-157/", "£29.49", True, "/images/products/chroma-peptides/bpc-157.webp", "10mg"),
    ("cjc-1295-no-dac", f"{chroma_base}/product/cjc-1295-no-dac/", "£22.27", True, "/images/products/chroma-peptides/cjc-1295-no-dac.webp", "5mg"),
    ("cjc-1295-no-dac", f"{chroma_base}/product/cjc-1295-no-dac/", "£45.50", True, "/images/products/chroma-peptides/cjc-1295-no-dac.webp", "10mg"),
    ("dsip", f"{chroma_base}/product/dsip/", "£22.27", True, "/images/products/chroma-peptides/dsip.webp", "5mg"),
    ("dsip", f"{chroma_base}/product/dsip/", "£40.09", True, "/images/products/chroma-peptides/dsip.webp", "10mg"),
    ("epitalon", f"{chroma_base}/product/epithalon/", "£19.75", True, "/images/products/chroma-peptides/epithalon.webp", "5mg"),
    ("epitalon", f"{chroma_base}/product/epithalon/", "£88.88", True, "/images/products/chroma-peptides/epithalon.webp", "25mg"),
    ("ghk-cu", f"{chroma_base}/product/ghk-cu/", "£24.15", True, "/images/products/chroma-peptides/ghk-cu.webp", "50mg"),
    ("ghk-cu", f"{chroma_base}/product/ghk-cu/", "£41.61", True, "/images/products/chroma-peptides/ghk-cu.webp", "100mg"),
    ("ghrp-2", f"{chroma_base}/product/ghrp-2/", "£22.25", False, "/images/products/chroma-peptides/ghrp-2.webp", "5mg"),
    ("ghrp-2", f"{chroma_base}/product/ghrp-2/", "£40.02", False, "/images/products/chroma-peptides/ghrp-2.webp", "10mg"),
    ("ghrp-6", f"{chroma_base}/product/ghrp-6/", "£22.03", True, "/images/products/chroma-peptides/ghrp-6.webp", "5mg"),
    ("ghrp-6", f"{chroma_base}/product/ghrp-6/", "£39.65", True, "/images/products/chroma-peptides/ghrp-6.webp", "10mg"),
    ("ipamorelin", f"{chroma_base}/product/ipamorelin/", "£20.27", True, "/images/products/chroma-peptides/ipamorelin.webp", "5mg"),
    ("ipamorelin", f"{chroma_base}/product/ipamorelin/", "£38.22", True, "/images/products/chroma-peptides/ipamorelin.webp", "10mg"),
    ("mots-c", f"{chroma_base}/product/mots-c/", "£22.25", True, "/images/products/chroma-peptides/mots-c.webp", "5mg"),
    ("mots-c", f"{chroma_base}/product/mots-c/", "£80.25", True, "/images/products/chroma-peptides/mots-c.webp", "10mg"),
    ("nad-plus", f"{chroma_base}/product/nad/", "£98.95", True, "/images/products/chroma-peptides/nad.webp", "500mg"),
    ("nad-plus", f"{chroma_base}/product/nad/", "£178.15", True, "/images/products/chroma-peptides/nad.webp", "1000mg"),
    ("selank", f"{chroma_base}/product/selank/", "£18.85", True, "/images/products/chroma-peptides/selank.webp", "5mg"),
    ("selank", f"{chroma_base}/product/selank/", "£33.93", True, "/images/products/chroma-peptides/selank.webp", "10mg"),
    ("semax", f"{chroma_base}/product/semax/", "£22.75", True, "/images/products/chroma-peptides/semax.webp", "5mg"),
    ("semax", f"{chroma_base}/product/semax/", "£40.95", True, "/images/products/chroma-peptides/semax.webp", "10mg"),
    ("sermorelin", f"{chroma_base}/product/sermorelin/", "£28.85", True, "/images/products/chroma-peptides/sermorelin.webp", "5mg"),
    ("sermorelin", f"{chroma_base}/product/sermorelin/", "£51.93", True, "/images/products/chroma-peptides/sermorelin.webp", "10mg"),
    ("tb-500", f"{chroma_base}/product/tb-500/", "£27.55", False, "/images/products/chroma-peptides/tb-500.webp", "5mg"),
    ("tb-500", f"{chroma_base}/product/tb-500/", "£41.13", False, "/images/products/chroma-peptides/tb-500.webp", "10mg"),
    ("tesamorelin", f"{chroma_base}/product/tesamorelin/", "£28.85", True, "/images/products/chroma-peptides/tesamorelin.webp", "5mg"),
    ("tesamorelin", f"{chroma_base}/product/tesamorelin/", "£72.95", True, "/images/products/chroma-peptides/tesamorelin.webp", "10mg"),
    ("thymosin-alpha-1", f"{chroma_base}/product/thymosin-alpha-1/", "£30.25", False, "/images/products/chroma-peptides/thymosin-alpha-1.webp", "5mg"),
    ("thymosin-alpha-1", f"{chroma_base}/product/thymosin-alpha-1/", "£54.49", False, "/images/products/chroma-peptides/thymosin-alpha-1.webp", "10mg"),
    ("cjc-1295-ipamorelin-blend", f"{chroma_base}/product/ipamorelin-cjc-1295-no-dac-combo/", "£40.91", True, "/images/products/chroma-peptides/ipam-cjc-combo.webp", "Combo"),
    ("cjc-1295-ipamorelin-blend", f"{chroma_base}/product/ipamorelin-cjc-1295-no-dac-combo/", "£74.38", True, "/images/products/chroma-peptides/ipam-cjc-combo.webp", "Blend"),
    ("bacteriostatic-water", f"{chroma_base}/product/bacteriostatic-water/", "£4.99", True, "/images/products/chroma-peptides/bacteriostatic-water.webp", "5ml"),
    ("bacteriostatic-water", f"{chroma_base}/product/bacteriostatic-water/", "£8.50", True, "/images/products/chroma-peptides/bacteriostatic-water.webp", "10ml"),
]

for cid, url, price, stock, img, dosage in chroma_products:
    add_source(cid, chroma_name, url, price, stock, img, dosage)

# Write back
with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print("\n✅ Chroma Peptides sources updated with all dosage variants!")
