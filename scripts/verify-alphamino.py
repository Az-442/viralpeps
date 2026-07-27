#!/usr/bin/env python3
"""Verify Alphamino data integrity"""

import json

with open('src/data/vendors.json') as f:
    vendors = json.load(f)
with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# Check Alphamino vendor exists
v = [v for v in vendors if v['id'] == 'alphamino']
print(f'Vendor found: {len(v) > 0}')
if v:
    print(f'Name: {v[0]["name"]}, Website: {v[0]["website"]}')
    print(f'Verified: {v[0]["verified"]}, Rating: {v[0]["rating"]}')
    print(f'Total vendors: {len(vendors)}')

# Check how many Alphamino sources
count = sum(1 for c in compounds for s in c.get('sources', []) if s.get('vendor') == 'Alphamino')
print(f'Total Alphamino source entries across all compounds: {count}')

# Verify all source entries have image field set
no_image = sum(1 for c in compounds for s in c.get('sources', []) if s.get('vendor') == 'Alphamino' and not s.get('image'))
print(f'Alphamino sources WITHOUT image field: {no_image}')

# List which compounds have Alphamino
print('\nCompounds with Alphamino sources:')
for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor') == 'Alphamino':
            print(f'  - {c["id"]} ({c["name"]}): {s["price"]}, image={s.get("image","MISSING")}')
            break
