import json, re, statistics as st
from collections import defaultdict
d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))


def num(p):
    if not isinstance(p, str):
        return None
    m = re.search(r"[\d.]+", p.replace(',', ''))
    return float(m.group()) if m else None


def vials(dos):
    if not dos:
        return None
    s = str(dos).lower().replace(' ', '')
    m = re.match(r"([\d.]+)mg[x×](\d+)vials?", s)
    if m:
        return float(m.group(1)) * int(m.group(2))
    m = re.search(r"([\d.]+)mg", s)
    return float(m.group(1)) if m else None


# For a set of big compounds: cheapest sticker vs cheapest per-mg, and where each sits
for slug in ['mots-c', 'bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'ghk-cu', 'epitalon', 'cjc-1295-no-dac']:
    hits = [x for x in d if x.get('slug') == slug]
    if not hits:
        continue
    c = hits[0]
    rows = []
    for s in c.get('sources', []):
        p = num(s.get('price'))
        v = vials(s.get('dosage'))
        if p and v:
            rows.append((p, v, round(p / v, 2), s.get('dosage'), s.get('vendor')))
    if not rows:
        continue
    by_price = sorted(rows, key=lambda r: r[0])
    by_mg = sorted(rows, key=lambda r: r[2])
    print(f"{slug:18} n={len(rows):3}")
    print(f"   cheapest STICKER : £{by_price[0][0]:7.2f}  {by_price[0][3]:>12} = £{by_price[0][2]:6.2f}/mg")
    print(f"   cheapest PER MG  : £{by_mg[0][0]:7.2f}  {by_mg[0][3]:>12} = £{by_mg[0][2]:6.2f}/mg")
    if by_price[0][0] != by_mg[0][0]:
        print(f"   -> DIFFERENT listings. sticker-cheapest costs {by_price[0][2]/by_mg[0][2]:.1f}x the best rate")

# catalogue-wide: for each compound with >=5 sized listings, is sticker-cheapest also per-mg-cheapest?
same = 0
diff = 0
big = []
for c in d:
    rows = [(num(s.get('price')), vials(s.get('dosage'))) for s in c.get('sources', [])]
    rows = [(p, v) for p, v in rows if p and v]
    if len(rows) < 5:
        continue
    sp = min(rows, key=lambda r: r[0])
    mm = min(rows, key=lambda r: r[0] / r[1])
    if sp[1] == mm[1] and abs(sp[0] - mm[0]) < 0.01:
        same += 1
    else:
        diff += 1
        big.append((sp[0] / sp[1]) / (mm[0] / mm[1]))
print(f"\nCOMPOUNDS with >=5 sized listings: {same+diff}")
print(f"   sticker-cheapest == per-mg-cheapest : {same}")
print(f"   sticker-cheapest MISLEADS           : {diff}  ({100*diff/(same+diff):.0f}%)")
print(f"   median penalty for following sticker price: {st.median(big):.1f}x")
print(f"   max penalty: {max(big):.1f}x")
