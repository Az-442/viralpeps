import json

v = json.load(open('src/data/vendors.json'))
print("COUNT", len(v))
for x in v:
    print(f"{x.get('slug')} | {x.get('name')} | rating={x.get('rating')} | verified={x.get('verified')} | labTested={x.get('labTested')} | lastTested={x.get('lastTested')!r}")
