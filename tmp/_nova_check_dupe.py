import json
c = json.load(open('src/data/compounds.json'))
for cid in ['tb-500','retatrutide','wolverine-stack-bpc157-tb500-blend']:
    comp = [x for x in c if x['id']==cid][0]
    print(f"=== {cid} ===")
    for s in comp['sources']:
        if s.get('vendor')=='Nova Peptide Lab':
            print("   ", json.dumps(s, ensure_ascii=False))
