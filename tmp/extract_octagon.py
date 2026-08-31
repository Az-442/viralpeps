#!/usr/bin/env python3
"""Extract Octagon Peptides and other flagged sources from compounds.json."""
import json

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

octagon = []
flagged = []
for comp in data:
    for src in comp.get('sources', []):
        vendor = src.get('vendor', '')
        if vendor == 'Octagon Peptides':
            octagon.append({
                'compound': comp.get('name'),
                'slug': comp.get('slug'),
                'vendor': vendor,
                'price': src.get('price'),
                'inStock': src.get('inStock'),
                'url': src.get('url'),
            })
        if src.get('inStock') is False:
            flagged.append({
                'compound': comp.get('name'),
                'slug': comp.get('slug'),
                'vendor': vendor,
                'price': src.get('price'),
                'url': src.get('url'),
            })

print(f"=== OCTAGON PEPTIDES: {len(octagon)} sources ===")
for o in octagon:
    print(json.dumps(o))
print(f"\n=== ALL inStock:false entries: {len(flagged)} ===")
for f_ in flagged:
    print(json.dumps(f_))

# Also check vendors with 'cmsr' or 'bio peptides uk'
print("\n=== CMSR LABS sources ===")
for comp in data:
    for src in comp.get('sources', []):
        if src.get('vendor', '').lower() in ('cmsr labs', 'bio peptides uk'):
            print(json.dumps({
                'compound': comp.get('name'),
                'vendor': src.get('vendor'),
                'price': src.get('price'),
                'inStock': src.get('inStock'),
                'url': src.get('url'),
            }))
