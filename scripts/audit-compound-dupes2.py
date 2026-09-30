#!/usr/bin/env python3
"""Deeper duplicate audit: exact name matches, case-only, and source overlap."""
import json, re
from collections import defaultdict

c = json.load(open('src/data/compounds.json'))
comps = c if isinstance(c, list) else c.get('compounds', [])

# Normalise name for comparison
def norm(n):
    n = n.lower()
    n = re.sub(r'\s*\(.*?\)\s*', ' ', n)          # drop parentheticals
    n = re.sub(r'\s*\d+\s*(mg|mcg|g|iu|ml)\b', ' ', n)  # drop dosage
    n = re.sub(r'[^a-z0-9]+', '', n)
    return n

byname = defaultdict(list)
for x in comps:
    byname[norm(x.get('name',''))].append(x)

print("=== SAME NORMALISED NAME, >1 ENTRY ===")
n=0
for k, v in sorted(byname.items()):
    if len(v) > 1:
        n+=1
        print("\n%s" % k)
        for x in v:
            print("   %-48s | %-38s | src=%d" % (x['id'], x.get('name','')[:38], len(x.get('sources',[]))))
print("\ntotal name-collision groups:", n)

# Empty compounds (0 sources) — candidates for removal
print("\n=== COMPOUNDS WITH 0 SOURCES ===")
empty = [x for x in comps if len(x.get('sources',[]))==0]
print("count:", len(empty))
for x in empty:
    print("   %-50s | %s" % (x['id'], x.get('name','')[:40]))

# Duplicate source URLs across compounds
print("\n=== DUPLICATE SOURCE URLs (same url in >1 compound) ===")
urlmap = defaultdict(list)
for x in comps:
    for s in x.get('sources',[]):
        u = (s.get('url') or '').strip().lower()
        if u:
            urlmap[u].append(x['id'])
dups = {u:v for u,v in urlmap.items() if len(set(v))>1}
print("count:", len(dups))
for u,v in list(dups.items())[:25]:
    print("   %s" % u)
    print("      -> %s" % sorted(set(v)))
