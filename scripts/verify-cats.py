#!/usr/bin/env python3
"""Verify new category structure"""
import json
from collections import defaultdict

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

cats = defaultdict(list)
for c in data:
    if not c.get('compareSlug'):
        cats[c.get('category', 'NONE')].append(c['name'])

order = ['growth-hormone', 'anti-aging', 'immunity-peptides', 'tanning-libido',
         'glp-1-agonists', 'thymosin-bpc', 'tb-500', 'peptide-fragments',
         'cognitive', 'aod-fragments', 'other']

for cat in order:
    items = cats.get(cat, [])
    print(f'\n{cat.upper()} ({len(items)})')
    for item in items:
        print(f'  - {item}')

old_cats = ['growth-factors', 'ghrp', 'growth-hormone-secretagogues', 'melanotans', 'cellular-peptides', 'cosmetic-peptides']
for oc in old_cats:
    if oc in cats:
        print(f'\nWARNING: Still has old category: {oc} - {cats[oc]}')

print('\nNo old categories remain' if not any(oc in cats for oc in old_cats) else '')
