import json
v = json.load(open('src/data/vendors.json'))
# print last entry as template
print(json.dumps(v[-1], indent=2, ensure_ascii=False))
print("=== nilah-labs (recent) ===")
m = [x for x in v if x['slug']=='nilah-labs']
if m: print(json.dumps(m[0], indent=2, ensure_ascii=False))
