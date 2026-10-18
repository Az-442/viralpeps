import json, re, statistics as st
from collections import defaultdict

d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))


def num(p):
    if not isinstance(p, str):
        return None
    m = re.search(r"[\d.]+", p.replace(',', ''))
    return float(m.group()) if m else None


def vial_size(dos):
    """Return mg in one vial from a dosage string, or None."""
    if not dos:
        return None
    s = str(dos).lower().replace(' ', '')
    # bulk packs like 10mgx10vials
    m = re.match(r"([\d.]+)mg[x×](\d+)vials?", s)
    if m:
        return float(m.group(1)), int(m.group(2))
    m = re.search(r"([\d.]+)mg", s)
    if m:
        return float(m.group(1)), 1
    return None


def report(slug):
    c = [x for x in d if x.get('slug') == slug][0]
    srcs = c.get('sources', [])
    vendors = {s['vendor'] for s in srcs}
    print("=" * 78)
    print(f"{slug} | {c.get('name')} | listings={len(srcs)} vendors={len(vendors)}")
    groups = defaultdict(list)
    nodose = 0
    for s in srcs:
        p = num(s.get('price'))
        if p is None:
            continue
        vs = vial_size(s.get('dosage'))
        if not vs:
            nodose += 1
            groups['UNSTATED'].append(p)
            continue
        mg, n = vs
        key = s.get('dosage')
        groups[str(key)].append(p)
        groups['NORM_' + str(key)].append(round(p / (mg * n), 2))
    print(f"  unstated dosage listings: {nodose}")
    for k in sorted(groups, key=lambda x: (x.startswith('NORM'), x)):
        v = sorted(groups[k])
        print(f"  {k:18} n={len(v):3}  min=£{v[0]:.2f}  med=£{st.median(v):.2f}  max=£{v[-1]:.2f}")
    prices = [num(s.get('price')) for s in srcs if num(s.get('price'))]
    print(f"  ALL: min=£{min(prices):.2f} med=£{st.median(prices):.2f} max=£{max(prices):.2f} spread={max(prices)/min(prices):.1f}x")


for s in ['mots-c', 'bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'ghk-cu']:
    try:
        report(s)
    except Exception as e:
        print(s, "ERR", e)

# Global: how many listings across the whole catalogue have no stated dosage?
tot = 0
nod = 0
for c in d:
    for s in c.get('sources', []):
        tot += 1
        if not s.get('dosage'):
            nod += 1
print(f"\nCATALOGUE: {tot} listings, {nod} with no stated dosage ({100*nod/tot:.1f}%)")
print(f"compounds: {len(d)}, vendors referenced: {len({s['vendor'] for c in d for s in c.get('sources',[])})}")
