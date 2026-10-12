import json
c = json.load(open('src/data/compounds.json'))
comps = c if isinstance(c, list) else c.get('compounds', c)
by = {x['slug']: x for x in comps}

def stats(slug):
    x = by.get(slug)
    if not x:
        print(slug, "NOT FOUND"); return
    srcs = x.get('sources', [])
    vendors = sorted(set(s.get('vendor') for s in srcs))
    prices = []
    for s in srcs:
        p = str(s.get('price','')).replace('£','').replace(',','')
        try: prices.append(float(p))
        except: pass
    print(f"--- {slug} | {x['name']} | cat={x.get('category')}")
    print(f"  listings={len(srcs)} vendors={len(vendors)} price=£{min(prices):.2f}-£{max(prices):.2f}")
    print(f"  cas={x.get('cas')} mw={x.get('molarMass')} halflife={x.get('halfLife')} form={x.get('form')}")
    print(f"  seq={str(x.get('sequence'))[:90]}")
    print(f"  researchAreas={x.get('researchAreas')}")
    print(f"  dosages={x.get('commonDosages')}")
    print(f"  aliases={x.get('aliases')}")
    print(f"  vendors={vendors[:60]}")

for s in ['kpv','aod-9604','mots-c']:
    stats(s)
    print()
