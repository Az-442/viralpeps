#!/usr/bin/env python3
"""
FINAL PeptX verification: compare each of our 29 entries against the live
`single_vial` (UK Express) catalogue row that matches the listed dose.

This is the authoritative check:
  - product_type == 'single_vial'  -> UK Express retail vial
  - that row's price_gbp           -> the comparable retail price
  - (box_10 price_gbp is the WHOLE BOX -> wholesale, excluded by policy)
"""
import json, re, difflib

live = json.load(open('/tmp/peptx_live.json'))
products = live['products']
variants = live['variants']
by_pid = {}
for v in variants:
    by_pid.setdefault(v['product_id'], []).append(v)

ROOT = '/Users/time4you/viralpeps'
comp = json.load(open(ROOT + '/src/data/compounds.json'))


def norm(x):
    return re.sub(r'[^a-z0-9]', '', str(x).lower())


def dose_num(s):
    m = re.search(r'([\d.]+)', str(s or ''))
    return float(m.group(1)) if m else None


# Build index of single-vial rows: (normalised product name) -> list of variants
sv = []
for p in products:
    if p.get('product_type') != 'single_vial':
        continue
    for v in by_pid.get(p['id'], []):
        if not v.get('is_active'):
            continue
        sv.append({'pname': p['name'], 'pid': p['id'], 'dose': v.get('dose'),
                   'price': v.get('price_gbp'), 'stock': v.get('in_stock'),
                   'sku': v.get('sku'), 'nname': norm(p['name'])})

ours = []
for c in comp:
    for s in c.get('sources', []):
        if s.get('vendor') == 'PeptX':
            ours.append({'compound': c['slug'], 'name': c.get('name'),
                         'peptx_id': s['url'].rstrip('/').split('/')[-1], **s})

print('=' * 104)
print('PeptX FINAL CHECK — our entry vs live UK Express single-vial row (same dose)')
print('=' * 104)

bad = []
for e in ours:
    # our url slug is the /single-vials/<slug> page slug, e.g. nad, ta-1-thymosin-alpha-1, klow-blend
    slug_n = norm(e['peptx_id'])
    want = dose_num(e.get('dosage'))

    # candidate single-vial rows whose product name resembles our slug, or whose
    # product id resembles it (sv-<slug>)
    cands = []
    for r in sv:
        score = 0
        if r['pid'] and slug_n in norm(r['pid']):
            score = 0.95
        name_score = difflib.SequenceMatcher(None, slug_n, r['nname']).ratio()
        score = max(score, name_score)
        if slug_n in r['nname'] or r['nname'] in slug_n:
            score = max(score, 0.9)
        cands.append((score, r))
    cands.sort(key=lambda x: -x[0])

    if not cands or cands[0][0] < 0.55:
        print('NO SINGLE-VIAL  %-22s slug=%-24s' % (e['compound'], e['peptx_id']))
        bad.append((e['compound'], 'no single-vial row', None, e.get('price')))
        continue

    top_score, top = cands[0]
    # among the rows for that same product, pick the one matching our dose
    same = [r for s, r in cands if r['pid'] == top['pid']]
    pick = None
    for r in same:
        if dose_num(r['dose']) == want:
            pick = r
            break
    if pick is None:
        avail = sorted(set(str(r['dose']) for r in same))
        print('DOSE ABSENT     %-22s want=%-8s avail=%s' % (e['compound'], e.get('dosage'), avail))
        bad.append((e['compound'], 'dose absent', str(avail), e.get('price')))
        continue

    our_price = float(re.search(r'([\d.]+)', e.get('price', '0')).group(1))
    live_price = float(pick['price'])
    ok = abs(our_price - live_price) < 0.01
    print('%-22s %-32s dose=%-22s live £%-7.2f ours %-8s %s stock=%s'
          % (e['compound'], top['pname'][:32], str(pick['dose'])[:22], live_price,
             e.get('price'), 'OK   ' if ok else 'DRIFT', pick['stock']))
    if not ok:
        bad.append((e['compound'], 'price drift', live_price, e.get('price')))

print()
print('=' * 104)
print('entries needing attention:', len(bad))
for b in bad:
    print('   ', b)
