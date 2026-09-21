#!/usr/bin/env python3
import json, os, glob
root="/Users/time4you/viralpeps"
for p in ["src/data/vendors.json","src/data/compounds.json"]:
    try:
        d=json.load(open(os.path.join(root,p)))
        print("JSON OK", p, "len", len(d))
    except Exception as e:
        print("JSON FAIL", p, e)

# validate aegis vendor present
vend=json.load(open(os.path.join(root,"src/data/vendors.json")))
a=[x for x in vend if x.get("slug")=="aegis-peptides"]
print("aegis vendor present:", bool(a), a[0]["name"] if a else "NA")
c=json.load(open(os.path.join(root,"src/data/compounds.json")))
# count Aegis sources and verify image files exist
cnt=0; bad=0
for comp in c:
    for s in (comp.get("sources") or []):
        if s.get("vendor")=="Aegis Peptides":
            cnt+=1
            img=s.get("image")
            if img:
                fp=root+"/public"+img if not img.startswith("/images/products/aegis-peptides") else root+"/public"+img
                if not os.path.exists(root+"/public"+img):
                    bad+=1
                    print("MISSING IMG", img)
print("aegis source entries:", cnt, "missing images:", bad)
# distinct compounds aegis mapped
slugs=sorted({comp['slug'] for comp in c if any(s.get('vendor')=='Aegis Peptides' for s in (comp.get('sources') or []))})
print("compounds:", slugs)
