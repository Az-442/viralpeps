#!/usr/bin/env python3
"""Pre-deploy count consistency check: ALL_VISIBLE_COUNTS vs actual entries."""
import json
c = json.load(open('src/data/compounds.json'))
v = json.load(open('src/data/vendors.json'))

def visible_count(name):
    """Mirrors getVisibleCount() in vendor-stats.ts."""
    vc = [x for x in c if any(s.get('vendor') == name for s in x.get('sources', []))]
    has_catalog = any((x.get('compareSlug') and all(s.get('vendor') == name for s in x.get('sources', []))) for x in vc)
    if has_catalog:
        return len([x for x in vc if x.get('compareSlug') or all(s.get('vendor') == name for s in x.get('sources', []))])
    return len(vc)

print(f"{'vendor':22s} {'visible':8s} {'raw entries':12s} {'compounds':10s}")
for name in ['PeptX', 'Claripep', 'VialVerse']:
    raw = sum(1 for x in c for s in x.get('sources', []) if s.get('vendor') == name)
    comps = len({x['slug'] for x in c if any(s.get('vendor') == name for s in x.get('sources', []))})
    print(f"{name:22s} {visible_count(name):8d} {raw:12d} {comps:10d}")

print("\nvendors total:", len(v))
print("compounds total:", len(c))
print("\ncompareSlug compounds per new vendor:")
for name in ['PeptX', 'Claripep', 'VialVerse']:
    cs = [x['slug'] for x in c if x.get('compareSlug') and any(s.get('vendor') == name for s in x.get('sources', []))]
    print(f"  {name}: {cs or 'none'}")
