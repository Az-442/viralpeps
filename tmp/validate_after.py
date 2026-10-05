#!/usr/bin/env python3
"""Validate compounds.json after delisting removal."""
import json

PATH = '/Users/time4you/viralpeps/src/data/compounds.json'
data = json.load(open(PATH))
print(f'Valid JSON. Compounds: {len(data)}')
print(f'Total sources: {sum(len(c.get("sources", [])) for c in data)}')

# Confirm the 7 target URLs are gone
targets = [
    'https://supplypeptides.co.uk/products/tirz-20mg',
    'https://supplypeptides.co.uk/products/retatrutide',
    'https://supplypeptides.co.uk/products/sema',
    'https://precision-peptides.shop/product/glp-2-tirz-15mg/',
    'https://precision-peptides.shop/product/glp-2-tirz-30mg/',
    'https://precision-peptides.shop/product/glp-3-reta-10mg/',
    'https://precision-peptides.shop/product/glp-3-reta-20mg/',
]
found = [u for c in data for s in c.get('sources', []) if s.get('url') in targets]
print(f'Target URLs still present: {len(found)} (expect 0)')

# Sanity: SupplyPeptides now 18, Precision now 32
for v in ['SupplyPeptides', 'Precision Peptides']:
    n = sum(1 for c in data for s in c.get('sources', []) if s.get('vendor') == v)
    print(f'{v}: {n} entries')
