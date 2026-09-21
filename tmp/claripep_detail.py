import json
c = json.load(open('src/data/compounds.json'))
name = 'Claripep'
vc = [x for x in c if any(s.get('vendor') == name for s in x.get('sources', []))]
has_catalog = any((x.get('compareSlug') and all(s.get('vendor') == name for s in x.get('sources', []))) for x in vc)
print("Claripep has_catalog:", has_catalog)
for x in vc:
    allmine = all(s.get('vendor') == name for s in x.get('sources', []))
    print(f"  {x['slug']:28s} compareSlug={str(x.get('compareSlug','-')):28s} all-sources-mine={allmine}  n={len(x.get('sources',[]))}")
