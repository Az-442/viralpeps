#!/usr/bin/env python3
import json
v=json.load(open('src/data/vendors.json'))
s=[x for x in v if x['slug']=='spx-labs'][0]
print(json.dumps(s.get('_autoChecks'), indent=2))
print("\nfinal rating/verified/labTested:", s['rating'], s['verified'], s['labTested'])
