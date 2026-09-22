#!/usr/bin/env python3
"""
Apply the 2 genuine PeptX data fixes found by the live single-vial audit.

Confirmed against PeptX's own live catalogue (product_type = single_vial):

1. tirzepatide — entry said 10mg / £46.99. Live rows:
       10mg £31.99 (OUT OF STOCK)
       20mg £41.99 (OUT OF STOCK)
       30mg £46.99 (IN STOCK)   <-- £46.99 belongs to the 30mg vial
       60mg £68.99 (IN STOCK)
   £46.99 + 10mg is a mis-pairing. Correcting the dose to 30mg so the price
   matches the live row, stays the lowest IN-STOCK dose, and is a price that
   genuinely exists on the site.

2. l-carnitine — dosage was empty. Live single-vial dose label is
   "600mg / 10ml". Price £16.99 already correct. Filling the dosage field.
"""
import json

ROOT = '/Users/time4you/viralpeps'
path = ROOT + '/src/data/compounds.json'
comp = json.load(open(path))

FIXES = [
    ('tirzepatide', lambda s: s.update({'dosage': '30mg'})),
    ('l-carnitine', lambda s: s.update({'dosage': '600mg / 10ml'})),
]

for slug, fn in FIXES:
    c = next((x for x in comp if x['slug'] == slug), None)
    if not c:
        print('!! compound not found:', slug)
        continue
    for s in c.get('sources', []):
        if s.get('vendor') != 'PeptX':
            continue
        before = dict(s)
        fn(s)
        changed = {k: (before.get(k), s.get(k)) for k in s
                   if before.get(k) != s.get(k)}
        print('%-16s %s' % (slug, changed))

json.dump(comp, open(path, 'w'), indent=2)
open(path, 'a').write('\n')
print('\nwritten:', path)
