#!/usr/bin/env python3
"""Compute accurate market stats for Day-20 articles 2 and 3."""
import json
import os
import re
from collections import Counter, defaultdict

os.chdir('/Users/time4you/viralpeps')
compounds = json.load(open('src/data/compounds.json'))
vendors = json.load(open('src/data/vendors.json'))


def price_num(p):
    try:
        return float(re.sub(r'[^0-9.]', '', str(p)))
    except Exception:
        return None


# ---------- ARTICLE 2: weight-loss peptide suppliers UK ----------
# Master compounds in weight-loss / metabolic space
WL_SLUGS = ['tirzepatide', 'semaglutide', 'retatrutide', 'mazdutide', 'lipo-c',
            'l-carnitine', 'adipotide-ftpp-5mg', 'tesofensine-500mcg-60-capsules',
            'tesofensine-500mcg-100-tablets', 'gagrilintide-5mg', 'survodutide',
            'glp-3', 'liraglutide', 'eloralintide', 'bam15']

by_slug = {c.get('slug'): c for c in compounds}
print('=== ARTICLE 2: Weight-loss / metabolic compounds ===')
wl_vendor_counts = Counter()
wl_listings = 0
wl_compounds = 0
for s in WL_SLUGS:
    c = by_slug.get(s)
    if not c:
        print('  [missing]', s)
        continue
    srcs = c.get('sources', [])
    wl_compounds += 1
    wl_listings += len(srcs)
    prices = [price_num(x.get('price')) for x in srcs]
    prices = [p for p in prices if p]
    vs = {x.get('vendor') for x in srcs}
    for v in vs:
        wl_vendor_counts[v] += 1
    print('  %-32s srcs=%3d vendors=%3d min=%s' % (
        s, len(srcs), len(vs), ('£%.2f' % min(prices)) if prices else '-'))

print('\n  distinct vendors across WL compounds:', len(wl_vendor_counts))
print('  total WL listings:', wl_listings)
print('  top 15 WL vendors:')
for v, n in wl_vendor_counts.most_common(15):
    print('    %-30s %d' % (v, n))

# GLP-1 only (the injected incretins)
GLP1 = ['tirzepatide', 'semaglutide', 'retatrutide', 'survodutide', 'mazdutide',
        'liraglutide', 'gagrilintide-5mg', 'eloralintide', 'glp-3']
print('\n  --- GLP-1 / incretin group only ---')
glp1_v = Counter()
glp1_list = 0
glp1_min = {}
for s in GLP1:
    c = by_slug.get(s)
    if not c:
        continue
    srcs = c.get('sources', [])
    glp1_list += len(srcs)
    prices = [price_num(x.get('price')) for x in srcs]
    prices = [p for p in prices if p]
    if prices:
        glp1_min[s] = min(prices)
    for v in {x.get('vendor') for x in srcs}:
        glp1_v[v] += 1
print('  listings:', glp1_list, 'vendors:', len(glp1_v))
print('  mins:', {k: '£%.2f' % v for k, v in glp1_min.items()})
print('  top 12 glp1 vendors:', glp1_v.most_common(12))

# ---------- ARTICLE 3: cheapest peptides UK ----------
print('\n=== ARTICLE 3: cheapest peptides across the whole catalogue ===')
master = [c for c in compounds if not c.get('compareSlug')]
rows = []
for c in master:
    srcs = c.get('sources', [])
    prices = [price_num(x.get('price')) for x in srcs]
    prices = [p for p in prices if p]
    if not prices:
        continue
    rows.append((min(prices), c.get('name'), c.get('slug'), len(srcs), len({x.get('vendor') for x in srcs})))
rows.sort()
print('  15 cheapest master compounds by lowest listing:')
for mn, name, slug, n, nv in rows[:15]:
    print('    £%-8.2f %-38s %-28s srcs=%d vendors=%d' % (mn, (name or '')[:38], slug, n, nv))

print('\n  total master compounds with >=1 price:', len(rows))
all_listings = sum(len(c.get('sources', [])) for c in compounds)
print('  total listings (all compounds incl. children):', all_listings)
print('  vendor count:', len(vendors))

# Cheapest vendors by cheapest product
print('\n  --- cheapest individual listings in catalogue ---')
allp = []
for c in compounds:
    for x in c.get('sources', []):
        p = price_num(x.get('price'))
        if p:
            allp.append((p, x.get('vendor'), c.get('name')))
allp.sort()
for p, v, n in allp[:20]:
    print('    £%-8.2f %-30s %s' % (p, v, (n or '')[:34]))
