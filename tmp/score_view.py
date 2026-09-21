#!/usr/bin/env python3
import json
v=json.load(open('src/data/vendors.json'))
s=[x for x in v if x['slug']=='spx-labs'][0]
ac=s['_autoChecks']
print('spx-labs _autoChecks:', json.dumps(ac))
# score
score = 0
if ac.get('coa'): score+=25
if ac.get('ruo'): score+=5
if ac.get('reviews'): score+=10
if ac.get('shipping'): score+=5
if ac.get('contact'): score+=10
print('Automated TrustScore (max 55):', score)
