#!/usr/bin/env python3
import json
d=json.load(open('src/data/vendors.json'))
for sl in ['nupex','leolab','grey-matter-peptides','mypep-biotech']:
    v=[x for x in d if x['slug']==sl]
    if v:
        print("=====",sl,"=====")
        print(json.dumps(v[0], indent=1))
