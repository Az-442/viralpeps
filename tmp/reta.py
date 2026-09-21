#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
by_slug = {it['slug']: it for it in d}

r = by_slug.get('retatrutide')
if r and r.get('sources'):
    print("retatrutide sources count:", len(r['sources']))
    for s in r['sources'][:60]:
        print("  ", s.get('vendor'), "|", s.get('price'), "|", s.get('url'))
else:
    print("no retatrutide base")

print("\n=== dosage-specific retatrutide* (non-base) ===")
for it in d:
    if it['slug'].startswith('retatrutide') and it['slug'] != 'retatrutide':
        srcs = it.get('sources') or []
        print(it['slug'], [s.get('vendor') for s in srcs])
