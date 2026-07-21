import json

# Load compounds
with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# Chilton Labs peptide products mapped to compound slugs
# Format: (compound_slug, display_name, url, price, dosage)
products = [
    ("retatrutide", "Retatrutide 10mg", "https://chiltonlabs.co.uk/product/retatrutide-10mg-vial/", "£61.49", "10mg"),
    ("cagrilintide", "Cagrilintide 5mg", "https://chiltonlabs.co.uk/product/cagrilintide-5mg-vial/", "£39.89", "5mg"),
    ("mazdutide", "Mazdutide 10mg", "https://chiltonlabs.co.uk/product/mazdutide-10mg-vial/", "£55.89", "10mg"),
    ("bpc-157", "BPC-157 10mg", "https://chiltonlabs.co.uk/product/bpc-157-10mg-vial/", "£31.75", "10mg"),
    ("tb-500", "Thymosin TB-500 10mg", "https://chiltonlabs.co.uk/product/thymosin-tb-500-10mg-vial/", "£31.19", "10mg"),
    ("ghk-cu", "GHK-Cu 50mg", "https://chiltonlabs.co.uk/product/ghk-cu-50mg/", "£23.49", "50mg"),
    ("mots-c", "MOTS-C 10mg", "https://chiltonlabs.co.uk/product/mots-c-10mg-vial/", "£27.89", "10mg"),
    ("nad-plus", "NAD+ 500mg", "https://chiltonlabs.co.uk/product/nad-500mg-vial/", "£39.89", "500mg"),
    ("ipamorelin", "Ipamorelin 10mg", "https://chiltonlabs.co.uk/product/ipamorelin-10mg-vial/", "£32.89", "10mg"),
    ("tesamorelin", "Tesamorelin 10mg", "https://chiltonlabs.co.uk/product/tesamorelin-10mg-vial/", "£54.89", "10mg"),
    ("ghrp-2", "GHRP-2 5mg", "https://chiltonlabs.co.uk/product/ghrp-2-5mg-vial/", "£9.95", "5mg"),
    ("ghrp-6", "GHRP-6 5mg", "https://chiltonlabs.co.uk/product/ghrp-6-5mg-vial/", "£9.95", "5mg"),
    ("melanotan-ii", "Melanotan II MT2 10mg", "https://chiltonlabs.co.uk/product/melanotan-ii-mt2-10mg/", "£23.49", "10mg"),
    ("pt-141-bremelanotide", "PT-141 10mg", "https://chiltonlabs.co.uk/product/pt-141-10mg/", "£22.39", "10mg"),
    ("igf-1-lr3", "IGF-1 LR3 1mg", "https://chiltonlabs.co.uk/product/igf-1-lr3-1mg-vial/", "£32.29", "1mg"),
    ("hcg", "HCG 5000iu", "https://chiltonlabs.co.uk/product/hcg-5000iu-vial-bac-water-included/", "£24.79", "5000iu"),
    ("bacteriostatic-water", "Bacteriostatic Water 10ml", "https://chiltonlabs.co.uk/product/bacteriostatic-water/", "£7.49", "10ml"),
]

# Map compound slug to product data for image naming
slug_to_name = {p[0]: p[1] for p in products}

added = 0
not_found = []

for slug, name, url, price, dosage in products:
    found = False
    for comp in compounds:
        if comp['slug'] == slug or comp.get('compareSlug') == slug:
            # Check if Chilton Labs already has a source here
            has_cl = any(s['vendor'] == 'Chilton Labs' for s in comp['sources'])
            if has_cl:
                print(f"Already has Chilton Labs source: {slug}")
                found = True
                continue
            
            # Add new source
            new_source = {
                "vendor": "Chilton Labs",
                "url": url,
                "price": price,
                "inStock": True,
                "image": f"/images/products/chilton-labs/{slug}.webp",
                "dosage": dosage
            }
            comp['sources'].append(new_source)
            added += 1
            print(f"Added: {slug} → {price}")
            found = True
            break
    
    if not found:
        # Look for the compound slug in all compounds (master + catalog entries)
        all_slugs = set()
        for comp in compounds:
            all_slugs.add(comp['slug'])
            if comp.get('compareSlug'):
                all_slugs.add(comp['compareSlug'])
        
        if slug not in all_slugs:
            not_found.append(slug)
            print(f"NOT FOUND: {slug}")

print(f"\nAdded {added} product sources for Chilton Labs")
if not_found:
    print(f"Compound slugs NOT found (need to create): {not_found}")

# Save
with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)
print("Saved compounds.json")
