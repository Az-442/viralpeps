import json

c = json.load(open('src/data/compounds.json'))
by_slug = {x['slug']: x for x in c}

# Verify target compounds exist and check a sample source entry format
for s in ['bpc-157','tb-500','ghk-cu','melanotan-ii','selank','semax','retatrutide',
          'bacteriostatic-water','glow','wolverine-stack-bpc157-tb500-blend']:
    comp = by_slug.get(s)
    print(s, '->', 'FOUND' if comp else 'MISSING', '| sources:', len(comp['sources']) if comp else 0)
    if comp and comp['sources']:
        print('   sample:', json.dumps(comp['sources'][0], ensure_ascii=False))
        # check no existing kingston source
        has = any(x.get('vendor')=='Kingston Peptides' for x in comp['sources'])
        print('   already has Kingston:', has)
