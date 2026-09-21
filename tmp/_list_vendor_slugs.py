import json
d = json.load(open('src/data/vendors.json'))
print("VENDOR SLUGS:")
for v in d:
    print(" -", v['slug'])
print("TOTAL:", len(d))
