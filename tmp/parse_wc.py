import json, sys

d = json.load(open(sys.argv[1]))
print('N products:', len(d))
for p in d:
    name = p.get('name')
    slug = p.get('slug')
    permalink = p.get('permalink')
    prices = p.get('prices', {})
    price = prices.get('price')
    reg_price = prices.get('regular_price')
    img = None
    if p.get('images'):
        img = p['images'][0].get('src')
    print(f"{slug}\t{name}\t{price}\t{reg_price}\t{permalink}")
    if img:
        print(f"  IMG: {img}")
