#!/usr/bin/env python3
"""Add product sources from Bluewell Peptides and Anglo Peptides to compounds.json"""
import json

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)

# Build lookup by ID
compound_map = {c['id']: c for c in compounds}

# ============================================================
# BLUEWELL PEPTIDES product-to-compound mapping
# ============================================================
bluewell_sources = [
    # (compound_id, url_slug, price, dosage, inStock)
    ("5-amino-1mq", "product/5-amino-1mq-10mg", "£34.95", "10mg", True),
    ("5-amino-1mq-50mg", "product/5-amino-1mq-50mg", "£99.95", "50mg", True),
    ("ara-290", "product/ara-290-10mg", "£34.95", "10mg", True),
    ("aod9604", "product/aod-9604-5mg", "£52.95", "5mg", True),
    ("adamax", "product/adamax-10mg", "£49.95", "10mg", True),
    ("bpc-157-5mg", "product/bpc-157-5mg", "£16.95", "5mg", True),
    ("bpc-157", "product/bpc-157-10mg", "£32.95", "10mg", True),
    ("tb-500", "product/tb-500-5mg", "£24.95", "5mg", True),
    ("cjc-1295", "product/cjc-1295-no-dac-5mg", "£25.99", "5mg", True),
    ("ipamorelin", "product/ipamorelin-5mg", "£21.99", "5mg", True),
    ("tesamorelin", "product/tesamorelin-5mg", "£32.95", "5mg", True),
    ("dsip", "product/dsip-5mg", "£16.95", "5mg", True),
    ("kpv", "product/kpv-5mg", "£19.95", "5mg", True),
    ("igf-1-lr3", "product/igf1-lr3-1mg", "£59.95", "1mg", True),
    ("kisspeptin-10", "product/kisspeptin-10-10mg", "£39.95", "10mg", True),
    ("pt-141", "product/pt-141-10mg", "£20.95", "10mg", True),
    ("sermorelin", "product/sermorelin-5mg", "£24.99", "5mg", True),
    ("selank", "product/selank-5mg", "£15.99", "5mg", True),
    ("semax", "product/semax-5mg", "£22.99", "5mg", True),
    ("thymosin-alpha-1", "product/thymosin-alpha-1-5mg", "£26.95", "5mg", True),
    ("ss-31", "product/ss-31-10mg", "£34.95", "10mg", True),
    ("snap-8", "product/snap-8-10mg", "£21.95", "10mg", True),
    ("slu-pp-332", "product/slu-pp-332-10mg", "£45.95", "10mg", True),
    ("ahk-cu", "product/ahk-cu-100mg", "£29.95", "100mg", True),
    ("adipotide-ftpp-5mg", "product/fftp-adipotide-5mg", "£39.95", "5mg", True),
    ("pinealon", "product/pinealon-20mg", "£48.95", "20mg", True),
    ("ll-37", "product/ll-37-5mg", "£34.95", "5mg", True),
    ("aicar", "product/aicar-50mg", "£39.95", "50mg", True),
    ("dermorphin", "product/dermorphin-5mg", "£26.95", "5mg", True),
    ("pnc-27", "product/pnc-27-5mg", "£39.95", "5mg", True),
    ("vip", "product/vip-10mg", "£59.95", "10mg", True),
    ("thymalin", "product/thymalin-10mg", "£21.95", "10mg", True),
    ("vesugen", "product/vesugen-20mg", "£36.95", "20mg", True),
    ("oxytocin", "product/oxytocin-acetate-10mg", "£39.95", "10mg", True),
    ("cerebrolysin", "product/cerebrolysin-60mg", "£32.95", "60mg", True),
    ("glutathione", "product/l-glutathione-1500mg", "£39.95", "1500mg", True),
    ("mots-c", "product/mots-c-10mg", "£26.95", "10mg", True),
    ("mt2", "product/melanotan-2-10mg", "£22.95", "10mg", True),
    ("ghk-cu", "product/ghk-cu-50mg", "£25.95", "50mg", True),
    ("epitalon", "product/epithalon-10mg", "£22.95", "10mg", True),
    ("nad-plus", "product/nad-500mg", "£59.95", "500mg", True),
    ("bacteriostatic-water", "product/bacteriostatic-water-3ml", "£3.45", "3ml", True),
]

# Blend products
bluewell_blend_sources = [
    ("cjc-1295-ipamorelin-blend", "product/cjc-1295-no-dac-ipamorelin-10mg-blend", "£45.95", "10mg", True),
    ("wolverine-stack-bpc157-tb500-blend", "product/bpc-157-tb-500-20mg-blend", "£79.95", "20mg", True),
    ("glow", "product/glow-blend-70mg", "£82.95", "70mg", True),
    ("klow", "product/klow-blend-80mg", "£94.95", "80mg", True),
]

# ============================================================
# ANGLO PEPTIDES product-to-compound mapping
# ============================================================
anglo_sources = [
    # (compound_id, url_slug, price, dosage, inStock)
    ("5-amino-1mq", "product/5-amino-1mq-10mg-vial-research-peptide", "£50.00", "10mg", True),
    ("adamax", "product/adamax-10mg-research-peptide-batch-101", "£49.00", "10mg", True),
    ("aod9604", "product/aod-9604-5mg-research-peptide", "£45.00", "5mg", True),
    ("ara-290", "product/ara-290-16mg-20mg-research-peptide-batch-101", "£40.00", "16mg", True),
    ("bpc-157", "product/bpc-157-10mg-batch-108-research-peptide", "£28.99", "10mg", True),
    ("bpc-157-5mg", "product/bpc-157-5mg", "£28.99", "5mg", False),
    ("tb-500", "product/tb-500-10mg-batch-109", "£30.00", "10mg", True),
    ("cjc-1295", "product/cjc-1295-without-dac-10mg-batch-170", "£39.99", "10mg", True),
    ("dsip", "product/dsip-5mg-new-batch-105", "£16.00", "5mg", True),
    ("epitalon", "product/epitalon-10mg-batch-103", "£18.00", "10mg", True),
    ("fragment-176-191", "product/frag-176-191-5mg-batch-102", "£25.00", "5mg", True),
    ("ghk-cu", "product/ghk-cu-50mg-batch-105", "£24.00", "50mg", True),
    ("ghrp-6", "product/ghrp-6-10mg-research-peptide", "£18.00", "10mg", True),
    ("glutathione", "product/glutathione-1500mg", "£35.00", "1500mg", True),
    ("ipamorelin", "product/ipamorelin-10mg-batch-169", "£29.99", "10mg", True),
    ("kisspeptin-10", "product/kisspeptin-10-batch-104", "£25.00", "10mg", True),
    ("kpv", "product/kpv-10mg-batch-104", "£29.00", "10mg", True),
    ("mots-c", "product/mots-c-10mg-batch-107", "£25.00", "10mg", True),
    ("nad-plus", "product/nad-500mg-batch-102", "£55.00", "500mg", True),
    ("pt-141", "product/pt-141-10mg", "£20.00", "10mg", True),
    ("retatrutide", "product/retatrutide-10mg-batch-111", "£60.00", "10mg", True),
    ("selank", "product/selank-peptide-10mg-batch-103", "£31.00", "10mg", True),
    ("semax", "product/semax-10mg-batch-103", "£31.00", "10mg", True),
    ("sermorelin", "product/sermorelin-5mg", "£28.00", "5mg", True),
    ("snap-8", "product/snap-8-10mg", "£22.00", "10mg", True),
    ("ss-31", "product/ss-31-10mg-batch-103", "£40.00", "10mg", True),
    ("tesamorelin", "product/tesa-10mg-batch-105", "£60.00", "10mg", True),
    ("thymosin-alpha-1", "product/thymosin-alpha-1-batch-101", "£39.50", None, True),
    ("vip", "product/vip-10mg-batch-102", "£45.00", "10mg", True),
    ("oxytocin", "product/oxytocin-10mg", "£28.00", "10mg", True),
    ("slu-pp-332", "product/slu-pp-332-1mg-x100", "£160.00", "1mg×100", True),
    ("aicar", "product/aicar-50mg", "£35.00", "50mg", True),
    ("pnc-27", "product/pnc-27-5mg", "£38.00", "5mg", True),
    ("cjc-1295-ipamorelin-blend", "product/cjc-1295-without-dac-ipamorelin-5mg-5mg-batch-102", "£38.00", "5mg+5mg", True),
    ("wolverine-stack-bpc157-tb500-blend", "product/bpc-157-tb4-blend-10mg-10mg-batch-104-research-peptide", "£55.00", "10mg+10mg", True),
    ("glow", "product/glow-blend-peptide-70mg-vial-batch-104", "£65.00", "70mg", True),
    ("klow", "product/klow-blend-80mg-vial-batch-108", "£80.00", "80mg", True),
    ("bacteriostatic-water", "product/bacteriostatic-water-10ml-vial-research-peptide", "£6.99", "10ml", True),
    ("bacteriostatic-water", "product/bacteriostatic-water-3ml-vial", "£3.50", "3ml", True),
    ("kisspeptin-10", "product/kisspeptin-10-batch-104", "£25.00", "10mg", True),
    ("ghk-cu", "product/ghk-cu-100mg-batch-106", "£44.00", "100mg", True),
    ("ipamorelin", "product/ipamorelin-10mg-batch-169", "£29.99", "10mg", True),
]

def add_source(compound_id, vendor_slug, url_slug, price, dosage, in_stock):
    """Add a source to a compound if it doesn't already exist for this vendor"""
    compound = compound_map.get(compound_id)
    if not compound:
        print(f"  WARNING: Compound '{compound_id}' not found, skipping")
        return False
    
    url = f"https://bluewellpeptides.com/{url_slug}" if vendor_slug == "bluewell-peptides" else f"https://anglopeptides.com/{url_slug}"
    image = f"/images/products/{vendor_slug}/{url_slug.split('/')[-1]}.webp"
    
    vendor_name = "Bluewell Peptides" if vendor_slug == "bluewell-peptides" else "Anglo Peptides"
    
    # Check if this exact vendor already has a source for this compound
    for s in compound.get('sources', []):
        if s.get('vendor') == vendor_name:
            print(f"  SKIP: {vendor_name} already has source for {compound_id}")
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
    print(f"  ADDED: {vendor_name} → {compound_id}: {price}")
    return True

# Track counts
bw_count = 0
anglo_count = 0

print("\n=== Adding Bluewell Peptides sources ===")
for cid, slug, price, dosage, instock in bluewell_sources:
    if add_source(cid, "bluewell-peptides", slug, price, dosage, instock):
        bw_count += 1

for cid, slug, price, dosage, instock in bluewell_blend_sources:
    if add_source(cid, "bluewell-peptides", slug, price, dosage, instock):
        bw_count += 1

print("\n=== Adding Anglo Peptides sources ===")
for cid, slug, price, dosage, instock in anglo_sources:
    if add_source(cid, "anglo-peptides", slug, price, dosage, instock):
        anglo_count += 1

# Deduplicate anglo_sources (kisspeptin and ghk-cu were listed twice)
print(f"\n=== Summary ===")
print(f"Bluewell Peptides: {bw_count} sources added")
print(f"Anglo Peptides: {anglo_count} sources added")

# Write back
with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print("compounds.json updated successfully")
