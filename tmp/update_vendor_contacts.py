#!/usr/bin/env python3
"""
STEP 5 — Write verified contact + delivery details into vendors.json for the
3 live suppliers onboarded by the prior run. Only sets fields that were MISSING
or wrong; never overwrites unrelated data.

Also finalises PeptX TrustScore inputs (task 1.5):
  labTested: true  (real Janoshik / Analiza Bialek / Vanguard certificates on product pages)
  lastTested: 2026-09-19 (re-verified tonight)
"""
import json

V = 'src/data/vendors.json'
v = json.load(open(V))
by = {x['name']: x for x in v}

UPDATES = {
    'Claripep': {
        'email': 'research@claripep.co.uk',
        'delivery': 'Next-working-day via Royal Mail Tracked 24 · same-day dispatch on orders before 2pm · every order tracked (tracking emailed)',
        'shipping': [
            'UK — Royal Mail Tracked 24 (next-working-day aim)',
            'Same-day dispatch on orders placed before 2pm; weekends/after 2pm dispatch next working day',
            'Every order sent tracked — tracking number emailed on dispatch',
            'Lyophilised powder shipped in original vial with desiccant sachet',
        ],
    },
    'VialVerse': {
        'email': 'info@vialverse.com',
        'delivery': '£4.95 standard UK delivery · free over £75 · Royal Mail Tracked 24 · UK-only · 1-2 working days to dispatch',
        'shipping': [
            'UK — Royal Mail Tracked 24 (next-working-day delivery aim after dispatch)',
            'Standard UK delivery £4.95',
            'Free UK delivery on orders of £75 or more',
            'Orders normally prepared for dispatch within 1-2 working days',
            'Tracking information supplied after dispatch',
        ],
    },
    'PeptX': {
        'email': 'Dave@peptx.co.uk',
        'delivery': 'UK Express single vials: 24-hour UK dispatch, free UK delivery over £100 · Factory Direct: ships from outside the UK, 10-vial MOQ, times at checkout · international available',
        'shipping': [
            'UK Express (single vials) — 24-hour UK dispatch, free UK delivery over £100',
            'Factory Direct (bulk) — 10-vial MOQ, ships from outside the UK; delivery times shown at checkout',
            'International worldwide (48h factory dispatch)',
        ],
        'labTested': True,
        'lastTested': '2026-09-19',
    },
}

for name, upd in UPDATES.items():
    vend = by.get(name)
    if not vend:
        print(f"MISSING vendor: {name}")
        continue
    print(f"\n{name}:")
    for k, val in upd.items():
        old = vend.get(k)
        if old != val:
            print(f"  {k}: {str(old)[:70]!r} -> {str(val)[:70]!r}")
            vend[k] = val
        else:
            print(f"  {k}: unchanged")

json.dump(v, open(V, 'w'), indent=2)
print("\nsaved vendors.json")
