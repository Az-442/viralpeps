import json
c = json.load(open('src/data/compounds.json'))
slugs = []
for comp in c:
    if not comp.get('compareSlug'):
        slugs.append(comp['slug'])
slugs.sort()
for s in slugs:
    print(s)
print('---')
print('Total master compounds:', len(slugs))
