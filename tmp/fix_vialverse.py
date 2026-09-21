#!/usr/bin/env python3
"""Compare stored VialVerse prices against the scraped LOWEST single-unit variant price.
Fix both price (to the lowest unit) and dosage, per the task rule:
'Capture the LOWEST single-unit price per product.'"""
import json

DATA = 'src/data/compounds.json'
c = json.load(open(DATA))
doses = json.load(open('tmp/vialverse_doses.json'))

fixes = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') != 'VialVerse':
            continue
        u = s.get('url')
        if u not in doses:
            continue
        dose, price = doses[u]
        oldp, oldd = s.get('price'), s.get('dosage')
        newp = f"£{price}"
        if oldp != newp or oldd != dose:
            fixes.append((comp['slug'], oldp, newp, oldd, dose))
            s['price'] = newp
            s['dosage'] = dose

json.dump(c, open(DATA, 'w'), indent=2)
print(f"VialVerse entries fixed: {len(fixes)}")
print(f"{'compound':30s} {'old price':10s} {'new price':10s} {'old dose':9s} {'new dose'}")
for f in fixes:
    print(f"  {f[0]:28s} {str(f[1]):10s} {str(f[2]):10s} {str(f[3]):9s} {f[4]}")
