import json

with open('src/data/vendors.json') as f:
    vendors = json.load(f)
ukpl = [v for v in vendors if v['id'] == 'uk-peptide-lab']
print(f'Vendor entry found: {len(ukpl) > 0}')

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

count_sources = 0
count_with_image = 0
for c in compounds:
    for s in c['sources']:
        if s['vendor'] == 'UK Peptide Lab':
            count_sources += 1
            if s.get('image'):
                count_with_image += 1

print(f'Total UK Peptide Lab source entries: {count_sources}')
print(f'Source entries WITH image field set: {count_with_image}')
print(f'All sources have images: {count_sources == count_with_image}')
