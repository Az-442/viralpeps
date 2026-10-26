import json

DATA = '/Users/time4you/viralpeps/src/data/compounds.json'
RES = '/Users/time4you/viralpeps/tmp/price_check_results.json'

data = json.load(open(DATA))
res = json.load(open(RES))

changed = [r for r in res if r['status'] == 'CHANGED']
applied = 0
for r in changed:
    src = data[r['ci']]['sources'][r['si']]
    print(f"{r['vendor']:20} | {r['compound']:14} | {str(r['dosage']):6} | {src['price']:>9} -> {r['scraped']}")
    src['price'] = r['scraped']
    applied += 1

json.dump(data, open(DATA, 'w'), indent=2, ensure_ascii=False)
print(f"\nApplied {applied} updates")
