import re, json

js = open('/tmp/peptx_app.js', encoding='utf-8', errors='ignore').read()
paths = re.findall(r'"(/__l5e/assets-v1/[a-f0-9-]+/[a-z0-9._-]+\.(?:webp|png|jpg|avif))"', js)
uniq = sorted(set(paths))
print("TOTAL UNIQUE ASSETS:", len(uniq))
for p in uniq:
    print(p)
json.dump(uniq, open('tmp/_peptx_assets.json','w'), indent=2)
