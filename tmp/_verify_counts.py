import json
v=json.load(open('src/data/vendors.json'))
print('total vendors:', len(v))
print('last 3 slugs:', [x['slug'] for x in v[-3:]])
c=json.load(open('src/data/compounds.json'))
ks=sum(1 for comp in c for s in comp.get('sources',[]) if s.get('vendor')=='Kingston Peptides')
print('Kingston sources:', ks)
