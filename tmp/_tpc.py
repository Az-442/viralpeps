import json
d = json.load(open('/tmp/tpc.json'))
ps = d['products']
print(len(ps))
for p in ps:
    t = (p['handle'] + ' ' + p['title']).lower()
    if 'reta' in t or 'tirz' in t:
        print(p['handle'], '|', p['title'], '|', p['variants'][0].get('price'))
