#!/usr/bin/env python3
"""
Check which PeptX products exist as `single_vial` (UK Express) vs `box_10` (Factory Direct).

The user-approved rule: the single-vial retail price is the comparable price for
the main comparison table. The Factory Direct bulk box belongs in a separate
wholesale/trade listing — never in the main comparison.

Our 28 entries point at box_10 products where `price_gbp` is the whole BOX.
The single-vial price is a different product row (`product_type == 'single_vial'`)
where `price_gbp` IS the single-vial retail price.
"""
import json, re

live = json.load(open('/tmp/peptx_live.json'))
products = live['products']
variants = live['variants']
by_pid = {}
for v in variants:
    by_pid.setdefault(v['product_id'], []).append(v)

singles = [p for p in products if p.get('product_type') == 'single_vial']
boxes = [p for p in products if p.get('product_type') == 'box_10']
print('single_vial products:', len(singles))
print('box_10 products     :', len(boxes))
print()

print('=' * 100)
print('SINGLE-VIAL (UK Express) catalogue — the comparable retail price')
print('=' * 100)
for p in sorted(singles, key=lambda x: x['name']):
    for v in sorted(by_pid.get(p['id'], []), key=lambda v: str(v.get('dose'))):
        if not v.get('is_active'):
            continue
        print('%-34s id=%-18s dose=%-12s price_gbp=%-8s in_stock=%-5s sku=%s'
              % (p['name'][:34], p['id'], v.get('dose'), v.get('price_gbp'),
                 v.get('in_stock'), v.get('sku')))
