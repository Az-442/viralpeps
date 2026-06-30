#!/usr/bin/env python3
"""Precise fix for remaining Kensington Labs URL/image issues."""
import json
from pathlib import Path

DATA = Path('/Users/time4you/viralpeps/src/data')
with open(DATA / 'compounds.json') as f:
    compounds = json.load(f)

# Kensington Labs compound ID -> (url, image) fixes
KENS_FIXES = {
    "hexarelin": ("https://kensingtonlabs.co.uk/product/hexarelin-acetate-5/", "https://kensingtonlabs.co.uk/wp-content/uploads/2024/07/hexarelin-acetate-2.png"),
    "kisspeptin-10": ("https://kensingtonlabs.co.uk/product/kisspeptin-10mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/06/kisspeptin-10mg.png"),
    "kisspeptin": ("https://kensingtonlabs.co.uk/product/kisspeptin-5mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/06/kisspeptin-10mg.png"),
    "gonadorelin": ("https://kensingtonlabs.co.uk/product/gonadorelin-5mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Gonadorelin-5mg.png"),
    "lipo-c": ("https://kensingtonlabs.co.uk/product/lipo-c-10ml/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Lipo-c-10ml.png"),
    "pinealon": ("https://kensingtonlabs.co.uk/product/pinealon-10mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Pinealon-10mg.png"),
    "dermorphin": ("https://kensingtonlabs.co.uk/product/dermorphin-5mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2024/11/dermorphin.png"),
    "gdf-8": ("https://kensingtonlabs.co.uk/product/gdf-8-1mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/GDF-8-1mg.png"),
    "acth-1-39": ("https://kensingtonlabs.co.uk/product/acth-1-39-5mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Acth-1-39-5mg.png"),
    "ace-031-1mg": ("https://kensingtonlabs.co.uk/product/ace-031-1mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Ace031-1mg.png"),
    "b7-33": ("https://kensingtonlabs.co.uk/product/b7-33-10mg/", "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/B7-33-10mg.png"),
    "adamax": ("https://www.kensingtonlabs.co.uk/product/adamax-5mg/", "https://www.kensingtonlabs.co.uk/wp-content/uploads/adamax-5mg.jpg"),
}

fixed_count = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Kensington Labs UK' and c['id'] in KENS_FIXES:
            url, img = KENS_FIXES[c['id']]
            changed = False
            if not s['url'].startswith('http') or '/shop/' in s['url']:
                s['url'] = url
                changed = True
            if not s.get('image', '').startswith('http'):
                s['image'] = img
                changed = True
            if changed:
                fixed_count += 1

print(f"Kensington: {fixed_count} entries fixed")

with open(DATA / 'compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

# Verify
with open(DATA / 'compounds.json') as f:
    compounds = json.load(f)

total = 0
bad = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Kensington Labs UK':
            total += 1
            if not s.get('image', '').startswith('http'):
                print(f'STILL BAD: {c["id"]} url={s["url"][:50]} img={s.get("image","")[:50]}')
                bad += 1

print(f"Kensington: {total} total, {bad} still bad")
print("Done.")
