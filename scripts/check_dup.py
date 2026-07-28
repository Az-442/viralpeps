import json
with open('src/data/compounds.json') as f:
    compounds = json.load(f)

for c in compounds:
    if c['slug'] in ('melanotan-ii', 'dsip'):
        print(f"slug={c['slug']} id={c['id']} name={c['name']} sources_count={len(c.get('sources',[]))}")
        for s in c.get('sources',[]):
            if s['vendor'] == 'FORM Peptides':
                print(f"  FORM: {s['price']} {s.get('dosage','')}")
