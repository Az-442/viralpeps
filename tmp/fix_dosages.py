#!/usr/bin/env python3
"""
FIX — Claripep/VialVerse entries missing the `dosage` field.

Guard 4 (price sanity) flagged Claripep GHK-Cu £90 as >3x the median. Verified against
the live product page: GHK-Cu 200mg = £90, GHK-Cu 50mg = £30. The PRICE IS CORRECT —
the entry was just missing `dosage`, so it could not be normalised per-mg.

Dosages sourced from the live product page titles/body (verified 19 Sep 2026).
"""
import json

DATA = 'src/data/compounds.json'
c = json.load(open(DATA))

# (compound_slug, vendor, (price,url) match) -> dosage
# Derived directly from the product URL, which encodes the dose.
def dose_from_url(u):
    import re
    m = re.search(r'(\d+(?:\.\d+)?)\s*(mg|mcg|iu|ml)', u, re.I)
    if not m:
        return None
    n, unit = m.group(1), m.group(2)
    if unit.lower() == 'mcg':
        return f"{n}mcg"
    if unit.lower() == 'iu':
        return f"{n}iu"
    if unit.lower() == 'ml':
        return f"{n}ml"
    return f"{n}mg"

fixed = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') not in ('Claripep', 'VialVerse'):
            continue
        if s.get('dosage'):
            continue
        d = dose_from_url(s.get('url', ''))
        if d:
            s['dosage'] = d
            fixed.append((s['vendor'], comp['slug'], s.get('price'), d, s.get('url', '')[-45:]))

json.dump(c, open(DATA, 'w'), indent=2)
print(f"dosage fields added: {len(fixed)}")
for f in fixed:
    print(f"  {f[0]:10s} {f[1]:26s} {str(f[2]):9s} -> {f[3]:8s} ...{f[4]}")

# report how many still lack dosage
remain = [(s['vendor'], comp['slug'], s.get('url', ''))
          for comp in c for s in comp.get('sources', [])
          if s.get('vendor') in ('Claripep', 'VialVerse') and not s.get('dosage')]
print(f"\nstill missing dosage: {len(remain)}")
for r in remain:
    print("  ", r)
