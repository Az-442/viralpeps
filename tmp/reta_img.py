#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
by_slug = {it['slug']: it for it in d}
r = by_slug['retatrutide']
print("Astra Labs reta sources:")
for s in r['sources']:
    if s.get('vendor')=='Astra Labs':
        print("  ", s.get('price'), "|", s.get('image'), "|", s.get('url'))
print("\nLeoLabs reta:")
for s in r['sources']:
    if s.get('vendor')=='LeoLab Peptides UK':
        print("  ", s.get('price'), "|", s.get('image'), "|", s.get('url'))
