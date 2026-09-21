import json
c = json.load(open('src/data/compounds.json'))
print("=== ALL compound slugs/names (for resolving unmatched) ===")
for x in sorted(c, key=lambda y: y["slug"]):
    print(f'{x["slug"]:34} | {x["name"]}')
