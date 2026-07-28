import json, sys

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

slugs = sorted([c['slug'] for c in compounds])
for s in slugs:
    print(s)
