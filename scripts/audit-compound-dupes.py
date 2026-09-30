#!/usr/bin/env python3
"""Audit compounds.json for duplicate/redirect entries."""
import json, re
from collections import defaultdict

c = json.load(open('src/data/compounds.json'))
comps = c if isinstance(c, list) else c.get('compounds', [])
print("TOTAL COMPOUNDS:", len(comps))

redirs = [x for x in comps if x['id'].endswith('-redirect')]
print("\n=== EXPLICIT *-redirect ENTRIES:", len(redirs), "===")
for x in redirs:
    print("  %-45s | %-35s | src=%d" % (x['id'], x.get('name','')[:35], len(x.get('sources',[]))))

def base(slug):
    s = slug.lower()
    s = re.sub(r'-redirect$', '', s)
    s = re.sub(r'-(\d+mg|\d+mcg|\d+g|\d+iu|pen|vial|kit|nasal|injectable|pre-?mixed|powder|spray|tablets?|capsules?)$', '', s)
    return s.strip('-')

groups = defaultdict(list)
for x in comps:
    groups[base(x['id'])].append(x)

dupes = {k: v for k, v in groups.items() if len(v) > 1}
print("\n=== SLUG-FAMILY GROUPS WITH >1 ENTRY:", len(dupes), "===")
for k, v in sorted(dupes.items()):
    print("\n%s  (%d entries)" % (k, len(v)))
    for x in v:
        print("   %-48s | %-38s | src=%d" % (x['id'], x.get('name','')[:38], len(x.get('sources',[]))))
