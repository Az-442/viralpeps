import json, re

compounds = json.load(open('src/data/compounds.json'))
print('Total compounds:', len(compounds))
for c in compounds:
    print(f"{c['id']}\t{c['name']}")
