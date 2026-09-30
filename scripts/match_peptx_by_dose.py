#!/usr/bin/env python3
"""
PeptX price verification — MATCHED BY DOSE.

The previous pass compared our listed price against the cheapest variant of the
product, which is the LOWEST dose (e.g. Tirzepatide has 10/20/30/60mg — its
cheapest variant is a different vial size entirely). That produces false drift.

Correct comparison: our `dosage` field must be matched to the variant row whose
`dose` equals it, then compare against `per_vial_price` / `price_gbp` for that
specific dose.
"""
import json, re, difflib

live = json.load(open('/tmp/peptx_live.json'))
products = live['products']
variants = live['variants']
ROOT = '/Users/time4you/viralpeps'
comp = json.load(open(ROOT + '/src/data/compounds.json'))

by_pid = {}
for v in variants:
    by_pid.setdefault(v['product_id'], []).append(v)


def norm(x):
    return re.sub(r'[^a-z0-9]', '', str(x).lower())


def dose_num(s):
    m = re.search(r'([\d.]+)', str(s or ''))
    return float(m.group(1)) if m else None


ours = []
for c in comp:
    for s in c.get('sources', []):
        if s.get('vendor') == 'PeptX':
            ours.append({'compound': c['slug'], 'name': c.get('name'),
                         'peptx_slug': s['url'].rstrip('/').split('/')[-1], **s})

print('=' * 100)
print('PeptX LIVE PRICE VERIFICATION — matched on dose')
print('=' * 100)

mismatch = []
no_variant_for_dose = []
for e in ours:
    tok = norm(e['peptx_slug'])
    best, best_score = None, 0
    for p in products:
        for cand in [p.get('name') or ''] + (p.get('aliases') or []):
            n = norm(cand)
            if not n:
                continue
            score = difflib.SequenceMatcher(None, tok, n).ratio()
            if n in tok or tok in n:
                score = max(score, 0.92)
            if score > best_score:
                best_score, best = score, p
    if not best or best_score < 0.6:
        print('NO MATCH   %-22s (%s)' % (e['compound'], e['peptx_slug']))
        continue

    vs = [v for v in by_pid.get(best['id'], []) if v.get('is_active')]
    want = dose_num(e.get('dosage'))
    match = None
    for v in vs:
        if dose_num(v.get('dose')) == want:
            match = v
            break

    doses = sorted(set(str(v.get('dose')) for v in vs))
    if match is None:
        no_variant_for_dose.append((e['compound'], e.get('dosage'), doses))
        print('DOSE ABSENT %-22s want=%-8s available=%s' % (e['compound'], e.get('dosage'), doses))
        continue

    live_price = None
    for k in ('per_vial_price', 'price_gbp'):
        if match.get(k) is not None:
            live_price = float(match[k])
            break
    our_price = float(re.search(r'([\d.]+)', e.get('price', '0')).group(1))
    ok = live_price is not None and abs(our_price - live_price) < 0.01
    print('%-22s %-24s dose=%-7s live £%-7.2f ours %-8s %s  stock=%s'
          % (e['compound'], best['name'][:24], e.get('dosage'),
             live_price if live_price is not None else -1, e.get('price'),
             'OK  ' if ok else 'DRIFT', match.get('in_stock')))
    if not ok:
        mismatch.append((e['compound'], e.get('dosage'), live_price, e.get('price')))

print()
print('=' * 100)
print('dose-matched price mismatches:', len(mismatch))
for m in mismatch:
    print('   ', m)
print('doses with no matching live variant:', len(no_variant_for_dose))
for x in no_variant_for_dose:
    print('   ', x)
