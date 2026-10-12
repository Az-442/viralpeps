#!/usr/bin/env python3
"""List weight-loss compounds and vendor stats for Day-20 grouped + pillar articles."""
import json
import os

os.chdir('/Users/time4you/viralpeps')
compounds = json.load(open('src/data/compounds.json'))
vendors = json.load(open('src/data/vendors.json'))

print('=== glp-1-agonists compounds (masters) ===')
for c in compounds:
    if c.get('category') == 'glp-1-agonists' and not c.get('compareSlug'):
        srcs = c.get('sources', [])
        prices = []
        for s in srcs:
            try:
                prices.append(float(str(s.get('price', '')).replace('£', '').replace(',', '')))
            except Exception:
                pass
        mn = '£%.2f' % min(prices) if prices else '-'
        print(' %-28s %-40s srcs=%3d min=%s' % (c.get('slug'), (c.get('name') or '')[:40], len(srcs), mn))

print('\n=== vendors count ===', len(vendors))
print('\n=== top vendors by source count ===')
foot = {}
for c in compounds:
    for s in c.get('sources', []):
        v = s.get('vendor')
        foot[v] = foot.get(v, 0) + 1
for v, n in sorted(foot.items(), key=lambda x: -x[1])[:25]:
    print(' %-32s %d' % (v, n))
print('\n=== total listings ===', sum(foot.values()))
print('=== master compounds (no compareSlug) ===', sum(1 for c in compounds if not c.get('compareSlug')))
