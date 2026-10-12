import json

c = json.load(open('src/data/compounds.json'))
# Find master compounds (no compareSlug) matching these names
targets = {
    'bpc-157': 'BPC-157',
    'tb-500': 'TB-500',
    'ghk-cu': 'GHK-Cu',
    'melanotan-ii': 'Melanotan',
    'selank': 'Selank',
    'semax': 'Semax',
    'retatrutide': 'Retatrutide',
    'bacteriostatic-water': 'Bacteriostatic',
    'glow': 'GLOW',
    'wolverine': 'Wolverine',
    'bpc157-tb500-blend': 'BPC',
}
for comp in c:
    nm = comp['name']
    low = nm.lower()
    slug = comp['slug']
    for k, v in targets.items():
        if v.lower() in low or k in slug:
            print(f"{slug:45s} | {nm:40s} | cat={comp.get('category')} | srcs={len(comp.get('sources',[]))} | compareSlug={comp.get('compareSlug','-')}")
            break
