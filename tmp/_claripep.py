import json
c=json.load(open('src/data/compounds.json'))
n=0
for comp in c:
    for s in comp.get('sources',[]):
        if 'claripep' in s.get('vendor','').lower():
            n+=1
            print(f"{comp['slug']}|{s.get('price')}|{s.get('url')}|{s.get('dosage','-')}|{s.get('image','-')}")
print('CLARIPEP TOTAL',n)
v=json.load(open('src/data/vendors.json'))
print(json.dumps([x for x in v if x.get('slug')=='claripep'],indent=2))
