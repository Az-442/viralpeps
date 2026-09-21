#!/usr/bin/env python3
import json
d = json.load(open('/tmp/spx_products.json'))
print("COUNT:", len(d))
for p in d:
    print("===")
    print("ID:", p.get('id'))
    print("NAME:", p.get('name'))
    print("SLUG:", p.get('slug'))
    print("LINK:", p.get('link'))
    print("PRICE:", p.get('price'))
