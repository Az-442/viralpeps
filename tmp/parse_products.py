import json, sys

d = json.load(open(sys.argv[1]))
print('N products:', len(d['products']))
for p in d['products']:
    handle = p['handle']
    title = p['title']
    price = None
    for v in p['variants']:
        price = v['price']
        break
    img = p['images'][0]['src'] if p.get('images') else None
    print(f"{handle}\t{title}\t{price}\t{img}")
