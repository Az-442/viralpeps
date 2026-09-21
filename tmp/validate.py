#!/usr/bin/env python3
import json
json.load(open('src/data/compounds.json'))
print('compounds.json valid JSON : OK')
json.load(open('src/data/vendors.json'))
print('vendors.json valid JSON   : OK')
