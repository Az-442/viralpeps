#!/usr/bin/env python3
"""
Investigate the single Guard-4 price flag:
  Claripep ghk-cu £90.00 vs site-wide median £29.47 (3.05x)

Is £90 a leaked bulk price, or a legitimately larger vial size?
Compare like-for-like: Claripep's GHK-Cu price per mg against every other vendor.
"""
import json, re

ROOT = '/Users/time4you/viralpeps'
comp = json.load(open(ROOT + '/src/data/compounds.json'))


def num(p):
    m = re.search(r'([\d.]+)', str(p).replace(',', ''))
    return float(m.group(1)) if m else None


def mg(d):
    m = re.search(r'([\d.]+)\s*mg', str(d or ''), re.I)
    return float(m.group(1)) if m else None


print('GHK-Cu — every source, with price/mg')
print('=' * 96)
rows = []
for c in comp:
    if c['slug'] != 'ghk-cu':
        continue
    for s in c.get('sources', []):
        p, d = num(s.get('price')), mg(s.get('dosage'))
        ppm = (p / d) if (p and d) else None
        rows.append((ppm if ppm else 9e9, s.get('vendor'), s.get('price'),
                     s.get('dosage'), ppm, s.get('url')))
rows.sort()
for _, v, p, d, ppm, u in rows:
    print('%-26s %-9s %-9s %s' % (v[:26], str(p), str(d), ('£%.3f/mg' % ppm) if ppm else 'n/a'))
print()
print('Claripep GHK-Cu rows above should be priced per-mg in line with the rest')
print('if £90 is a 200mg vial. If it is a BULK/MOQ price it must come out.')
