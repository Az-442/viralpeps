#!/usr/bin/env python3
"""Fix compound source entries - correct the compound IDs."""
import json

BASE = '/Users/time4you/viralpeps/src/data'

with open(f'{BASE}/compounds.json') as f:
    compounds = json.load(f)

compound_map = {c['id']: c for c in compounds}

BBP = "Be Better Peptides"
EVA = "Eva Peptide UK"

def add_source(compound_id, vendor_name, url, price, dosage, image_path):
    c = compound_map.get(compound_id)
    if not c:
        print(f"  WARN: compound '{compound_id}' not found")
        return False
    existing_urls = {(s.get('vendor',''), s.get('url','')) for s in c.get('sources', [])}
    if (vendor_name, url) in existing_urls:
        print(f"  SKIP: {vendor_name} -> {compound_id} (already exists)")
        return False
    
    entry = {"vendor": vendor_name, "url": url, "price": price, "inStock": True}
    if image_path:
        entry["image"] = image_path
    if dosage:
        entry["dosage"] = dosage
    
    if 'sources' not in c:
        c['sources'] = []
    c['sources'].append(entry)
    print(f"  ADDED: {vendor_name} -> {compound_id} ({price})")
    return True

print("--- Fixing Eva Peptide UK sources ---")
add_source("epitalon", EVA, "https://evapeptide.co.uk/product/buy-epithalon-uk/",
           "£42.00", "10mg×10vials", "/images/products/eva-peptide/epithalon.png")
add_source("aod9604", EVA, "https://evapeptide.co.uk/product/buy-aod9604-uk/",
           "£142.00", "5mg×10vials", "/images/products/eva-peptide/aod9604.png")
add_source("gagrilintide-5mg", EVA, "https://evapeptide.co.uk/product/buy-cagrilintide-uk/",
           "£142.00", "5mg×10vials", "/images/products/eva-peptide/cagrilintide.png")
add_source("fragment-176-191", EVA, "https://evapeptide.co.uk/product/buy-hgh-fragment-176-191-uk/",
           "£63.00", "5mg×10vials", "/images/products/eva-peptide/hgh-fragment.png")
add_source("mt2", EVA, "https://evapeptide.co.uk/product/buy-melanotan-2-uk/",
           "£42.00", "10mg×10vials", "/images/products/eva-peptide/melanotan-2.png")
add_source("5-amino-1mq", EVA, "https://evapeptide.co.uk/product/buy-5-amino-1mq-uk/",
           "£90.00", "10mg×10vials", "/images/products/eva-peptide/5-amino-1mq.png")
add_source("ss-31", EVA, "https://evapeptide.co.uk/product/buy-ss-31-uk/",
           "£120.00", "5mg×10vials", "/images/products/eva-peptide/ss-31.png")
add_source("cjc-1295-no-dac", EVA, "https://evapeptide.co.uk/product/buy-cjc-1295-no-dac-uk/",
           "£47.00", "5mg×10vials", "/images/products/eva-peptide/cjc-1295-no-dac.png")

print("\n--- Fixing Be Better Peptides sources ---")
add_source("epitalon", BBP, "https://bebetterpeptides.com/products/epithalon",
           "£18.99", "10mg", "/images/products/be-better-peptides/epithalon.png")
add_source("aod9604", BBP, "https://bebetterpeptides.com/products/aod-9604-5mg",
           "£24.99", "5mg", "/images/products/be-better-peptides/aod9604.png")
add_source("fragment-176-191", BBP, "https://bebetterpeptides.com/products/buy-hgh-fragment-176-191-5mg",
           "£23.99", "5mg", "/images/products/be-better-peptides/hgh-fragment.png")
add_source("5-amino-1mq", BBP, "https://bebetterpeptides.com/products/5-amino-1mq-5mg",
           "£24.99", "10mg", "/images/products/be-better-peptides/5-amino-1mq.png")

with open(f'{BASE}/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)
    f.write('\n')

print("\nDone! Additional sources added.")
