import json
c = json.load(open('src/data/compounds.json'))
print('---- melanotan / mt ----')
for x in c:
    nm = x['name'].lower(); sl = x['slug'].lower()
    if 'melanotan' in nm or 'mt-1' in nm or 'mt-2' in nm or sl in ('mt-1','mt-2') or 'mt1' in sl:
        print(f"  {x['slug']:45s} | {x['name']:28s} | id={x.get('id')} | compareSlug={x.get('compareSlug','-')}")
print('---- klow ----')
for x in c:
    if 'klow' in x['slug'].lower() or 'klow' in x['name'].lower():
        print(f"  {x['slug']:45s} | {x['name']:28s} | id={x.get('id')} | compareSlug={x.get('compareSlug','-')} | sources={len(x.get('sources',[]))}")
