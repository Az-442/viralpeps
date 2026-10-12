#!/usr/bin/env python3
"""Inspect compound data for Day-20 articles: p21, semax, plus supplier footprints."""
import json
import os

os.chdir('/Users/time4you/viralpeps')
compounds = json.load(open('src/data/compounds.json'))
print('total compounds:', len(compounds))

targets = ['p21', 'semax']
for cid in targets:
    hits = [x for x in compounds if x.get('slug') == cid]
    print('\n===', cid, '===')
    if not hits:
        print('MISSING')
        continue
    x = hits[0]
    print('name:', x.get('name'), '| id:', x.get('id'), '| cat:', x.get('category'))
    srcs = x.get('sources', [])
    print('sources:', len(srcs))
    vendors = sorted({s.get('vendor') for s in srcs})
    print('vendors:', vendors)
    prices = []
    for s in srcs:
        p = s.get('price', '')
        try:
            prices.append(float(str(p).replace('£', '').replace(',', '')))
        except Exception:
            pass
    if prices:
        print('price min/max: £%.2f / £%.2f' % (min(prices), max(prices)))
    print('dosages:', x.get('commonDosages'))
    print('areas:', x.get('researchAreas'))
    print('halfLife:', x.get('halfLife'))
    print('cas:', x.get('cas'))
    print('desc:', (x.get('description') or '')[:260])

# Which master compounds are weight-loss / metabolic (for grouped article)
print('\n=== category distribution ===')
from collections import Counter
cnt = Counter((c.get('category') or 'NONE') for c in compounds if not c.get('compareSlug'))
for k, v in cnt.most_common():
    print(' ', k, v)
