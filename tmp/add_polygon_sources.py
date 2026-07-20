#!/usr/bin/env python3
import json

with open('src/data/compounds.json') as f:
    data = json.load(f)

# Mapping: Polygon product -> (compound_id, price, url, image_url)
# We'll match by looking for the compound by id or name
polygon_sources = [
    # (compound_id or name-fragment, price, url, image)
    ("bpc-157", "£29.99", "https://polygonpeptides.co.uk/product/bpc-157-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/10/BPC-10-1024x1024.webp"),
    ("cjc-1295-no-dac", "£29.99", "https://polygonpeptides.co.uk/product/cjc-1295-no-dac/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/05/CJC1295-no-DAC-1024x1024.webp"),
    ("dsip", "£29.99", "https://polygonpeptides.co.uk/product/dsip-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/03/dsip-10mg-1024x1024.png"),
    ("ghk-cu", "£29.99", "https://polygonpeptides.co.uk/product/ghk-cu-100mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/10/GHK-100-1024x1024.webp"),
    ("ipamorelin", "£29.99", "https://polygonpeptides.co.uk/product/ipamorelin-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/ipamorelin-1024x1024.webp"),
    ("kpv", "£29.99", "https://polygonpeptides.co.uk/product/kpv-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/03/kpv-10mg-1024x1024.png"),
    ("mots-c", "£59.99", "https://polygonpeptides.co.uk/product/mots-c-40mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/mots-c-1024x1024.webp"),
    ("mt2", "£24.99", "https://polygonpeptides.co.uk/product/mt2-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/10/MT2-10-1024x1024.webp"),
    ("pt-141", "£19.99", "https://polygonpeptides.co.uk/product/pt-141/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/05/PT-141-1024x1024.webp"),
    ("retatrutide", "£69.99", "https://polygonpeptides.co.uk/product/rt10/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/09/3-1024x1024.webp"),
    ("selank", "£29.99", "https://polygonpeptides.co.uk/product/selank-10mg-vial/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/selank-1024x1024.webp"),
    ("semax", "£29.99", "https://polygonpeptides.co.uk/product/semax-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/semax-1024x1024.webp"),
    ("sermorelin", "£39.99", "https://polygonpeptides.co.uk/product/sermorelin/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/05/Sermorelin-1024x1024.webp"),
    ("tesamorelin", "£69.99", "https://polygonpeptides.co.uk/product/tesamorelin-10mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/10/Tesa-10-1024x1024.webp"),
    ("tirzepatide", "£59.99", "https://polygonpeptides.co.uk/product/tr10/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/09/2-1024x1024.webp"),
    ("ahk-cu", "£29.99", "https://polygonpeptides.co.uk/product/ahk-cu-100mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/03/ahk-cu-10mg-1024x1024.png"),
    ("glow", "£69.99", "https://polygonpeptides.co.uk/product/glow-70-70mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/09/4-1024x1024.webp"),
    ("klow", "£84.99", "https://polygonpeptides.co.uk/product/klow-80mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2025/09/5-1024x1024.webp"),
    ("wolverine", "£59.99", "https://polygonpeptides.co.uk/product/wolverine-blend-20mg/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/Wolverine-1024x1024.webp"),
    ("5-amino-1mq-10mg", "£34.99", "https://polygonpeptides.co.uk/product/5-amino-1mq-10mg-vial/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/02/s-amino-1mq-1024x1024.webp"),
    ("epithalon-vial-express", "£19.99", "https://polygonpeptides.co.uk/product/epithalon/", "https://polygonpeptides.co.uk/wp-content/uploads/2026/05/Epithalon-1024x1024.webp"),
]

def find_compound_by_id_or_name(data, search_term):
    """Find compound by matching id or name."""
    for c in data:
        if c.get('id') == search_term:
            return c
    return None

updates = []
for comp_id, price, url, img in polygon_sources:
    c = find_compound_by_id_or_name(data, comp_id)
    if c is None:
        # Try matching by name containing the term
        for c2 in data:
            if comp_id.replace('-', ' ') in c2.get('name', '').lower().replace('-', ' ').replace('  ', ' '):
                c = c2
                break
    
    if c is None:
        print(f"WARNING: Could not find compound matching '{comp_id}'")
    else:
        # Check if Polygon Peptides already has a source entry
        already_exists = any(s.get('vendor') == 'Polygon Peptides' for s in c.get('sources', []))
        if already_exists:
            print(f"SKIP: Polygon Peptides already in '{c['name']}'")
        else:
            new_source = {
                "vendor": "Polygon Peptides",
                "url": url,
                "price": price,
                "inStock": True,
                "image": img
            }
            if 'sources' not in c:
                c['sources'] = []
            c['sources'].append(new_source)
            updates.append(c['name'])
            print(f"ADDED: Polygon Peptides -> '{c['name']}' - {price}")

# Save
with open('src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nDone. Updated {len(updates)} compounds.")
print("Updated:", updates)
