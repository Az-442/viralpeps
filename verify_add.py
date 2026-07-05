#!/usr/bin/env python3
import json

d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
cmsr = sum(1 for i in d for s in i.get('sources',[]) if 'CMSR Labs' in s.get('vendor',''))
prof = sum(1 for i in d for s in i.get('sources',[]) if 'Proforma Peptides' in s.get('vendor',''))

v = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
vids = [x['id'] for x in v]

print(f"CMSR Labs sources: {cmsr}")
print(f"Proforma Peptides sources: {prof}")
print(f"Total vendors: {len(v)}")
print(f"Vendor IDs: {vids}")
