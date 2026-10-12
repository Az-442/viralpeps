import re, json, os, sys

ROOT = '/Users/time4you/viralpeps'
rc = open(os.path.join(ROOT,'src/data/research-content.ts')).read()
rt = open(os.path.join(ROOT,'src/data/research.ts')).read()

rc_keys = set(re.findall(r"^\s*['\"]([a-z0-9\-\.]+)['\"]:\s*\{", rc, re.M))
rc_slugs = set(re.findall(r"slug:\s*['\"]([a-z0-9\-\.]+)['\"]", rc))
rt_slugs = set(re.findall(r"slug:\s*['\"]([a-z0-9\-\.]+)['\"]", rt))

c = json.load(open(os.path.join(ROOT,'src/data/compounds.json')))
comps = c if isinstance(c, list) else c.get('compounds', c)
compound_slugs = set(x['slug'] for x in comps)
v = json.load(open(os.path.join(ROOT,'src/data/vendors.json')))
vs = v if isinstance(v, list) else v.get('vendors', v)
vendor_slugs = set(x['slug'] for x in vs)

# Extract the three new article byte ranges
new_slugs = ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']
positions = []
for s in new_slugs:
    m = re.search(r"['\"]%s['\"]:\s*\{" % re.escape(s), rc)
    positions.append((s, m.start() if m else -1))
positions.append(("END", len(rc)))
print("positions:", positions)

for i in range(len(new_slugs)):
    start = positions[i][1]
    end = positions[i+1][1]
    seg = rc[start:end]
    links = re.findall(r"\]\((/[^\)]+)\)", seg)
    print("=== %s (%d chars, %d links)" % (new_slugs[i], len(seg), len(links)))
    for l in sorted(set(links)):
        ok = None
        if l.startswith('/compounds/'):
            ok = l[len('/compounds/'):] in compound_slugs
        elif l.startswith('/vendors/'):
            ok = l[len('/vendors/'):] in vendor_slugs
        elif l.startswith('/research/'):
            sl = l[len('/research/'):]
            ok = sl in rc_keys or sl in rc_slugs or sl in rt_slugs
        else:
            ok = 'UNKNOWN-PREFIX'
        print("   ", "OK " if ok is True else ("BROKEN" if ok is False else ok), l)
