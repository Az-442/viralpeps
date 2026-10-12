import json
v = json.load(open('src/data/vendors.json'))
vs = v if isinstance(v, list) else v.get('vendors', v)
print("VENDORS:", len(vs))
for x in vs:
    print(x.get('slug'), '|', x.get('name'), '| rating', x.get('rating'), '| verified', x.get('verified'), '| featured', x.get('featured'))
c = json.load(open('src/data/compounds.json'))
comps = c if isinstance(c, list) else c.get('compounds', c)
# find any slug containing ll
for x in comps:
    if 'll-37' in str(x.get('slug')) or 'll37' in str(x.get('slug')):
        print("LL:", x.get('slug'), x.get('name'))
