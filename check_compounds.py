#!/usr/bin/env python3
import json

with open('src/data/compounds.json', 'r') as f:
    compounds = json.load(f)

# Compounds Lab77 sells (based on their catalog)
lab77_compounds = [
    'tirzepatide', 'retatrutide', 'bpc-157', 'tb-500', 'ghk-cu',
    'mots-c', 'semax', 'selank', 'dsip', 'melanotan-ii',
    'pt-141-bremelanotide', 'epitalon', 'cjc-1295', 'ipamorelin',
    'tesamorelin', 'sermorelin', 'igf-1-lr3', 'thymosin-alpha-1',
    'kisspeptin-10', 'glutathione',
    'cagrilintide', 'hgh-somatropin', 'hcg', 'methylcobalamin'
]

# Check which ones exist
compound_ids = {c['id']: c for c in compounds}
found = []
not_found = []
for c in lab77_compounds:
    if c in compound_ids:
        found.append(c)
    else:
        not_found.append(c)

print(f'Found: {len(found)} compounds')
for c in found:
    print(f'  ✓ {c}')
print(f'Not found: {len(not_found)} compounds')
for c in not_found:
    print(f'  ✗ {c}')
