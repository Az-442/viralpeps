#!/usr/bin/env python3
import json
d = json.load(open('src/data/compounds.json'))
print("Type:", type(d), "len:", len(d))
# print first item structure
for it in d[:3]:
    print("===")
    if isinstance(it, dict):
        for k,v in it.items():
            if isinstance(v, list):
                print(f"{k}: [{len(v)} items] sample:", json.dumps(v[0] if v else '')[:300])
            else:
                print(f"{k}: {str(v)[:150]}")
    break
# find leolab
cnt=0
for it in d:
    s=json.dumps(it)
    if 'LeoLab' in s or 'leolab' in s:
        cnt+=1
print("items mentioning leolab:", cnt)
