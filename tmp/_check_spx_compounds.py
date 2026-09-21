import json, os
c = json.load(open('src/data/compounds.json'))

spx_sources = []
for comp in c:
    for src in comp.get('sources', []):
        vendor = src.get('vendor','') or src.get('vendorSlug','')
        url = src.get('url','')
        if 'spx' in str(vendor).lower() or 'spx' in str(url).lower() or 'spxlabs' in str(url).lower():
            spx_sources.append({
                'compound': comp.get('slug'),
                'compound_name': comp.get('name'),
                'vendor': vendor,
                'url': url,
                'image': src.get('image'),
                'price': src.get('price')
            })

print("SPX SOURCE COUNT:", len(spx_sources))
for s in spx_sources:
    img = s.get('image')
    exists = os.path.exists('/Users/time4you/viralpeps/public' + img) if img else False
    print(f"- {s['compound_name']} ({s['compound']})")
    print(f"    vendor={s['vendor']} | price={s.get('price')}")
    print(f"    url={s['url']}")
    print(f"    image={img} | ON_DISK={exists}")
