#!/usr/bin/env python3
import json
c = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
v = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
print(f'Valid JSON: {len(c)} compounds, {len(v)} vendors')
