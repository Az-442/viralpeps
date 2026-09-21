#!/usr/bin/env python3
import json, os
data=json.load(open('src/data/compounds.json'))
paths_used=set()
count=0
for it in data:
    for s in (it.get('sources') or []):
        if isinstance(s,dict) and s.get('vendor')=="SPX Labs":
            count+=1
            img=s.get('image','')
            # image refs are served from public/ root
            paths_used.add((img, os.path.exists('public'+img)))
for img,exists in sorted(paths_used):
    print(("OK  " if exists else "MISS"), img)
print("Total SPX source entries:", count)
