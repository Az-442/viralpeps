import json, os

vendors = json.load(open('src/data/vendors.json'))
print('TOTAL VENDORS:', len(vendors))
print('VENDOR SLUGS:', ', '.join(v['id'] for v in vendors))

compounds = json.load(open('src/data/compounds.json'))
src_vendors = set()
missing_image = 0
total_sources = 0
for c in compounds:
    for s in c.get('sources', []):
        total_sources += 1
        src_vendors.add(s.get('vendor'))
        if not s.get('image'):
            missing_image += 1
print('\nTOTAL COMPOUNDS:', len(compounds))
print('TOTAL SOURCES:', total_sources)
print('SOURCES MISSING IMAGE:', missing_image)
print('\nVENDOR NAMES USED IN SOURCES:')
print(', '.join(sorted(src_vendors)))
