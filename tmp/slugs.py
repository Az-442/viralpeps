#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
slugs = [it['slug'] for it in d]
print("COMPOUND SLUG COUNT:", len(slugs))
# display the slugs
for s in sorted(slugs):
    print(s)
