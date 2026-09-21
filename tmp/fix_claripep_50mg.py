import json
DATA='src/data/compounds.json'
c=json.load(open(DATA))
n=0
for comp in c:
    for s in comp.get('sources',[]):
        if s.get('vendor')=='Claripep' and not s.get('dosage') and 'ghk-cu' in s.get('url',''):
            s['dosage']='50mg'
            n+=1
            print('fixed', comp['slug'], s.get('price'), '-> 50mg')
json.dump(c, open(DATA,'w'), indent=2)
print('total', n)
remain=[(s['vendor'],comp['slug'],s.get('url')) for comp in c for s in comp.get('sources',[]) if s.get('vendor') in ('Claripep','VialVerse') and not s.get('dosage')]
print('remaining without dosage:', len(remain))
for r in remain: print('  ', r)
