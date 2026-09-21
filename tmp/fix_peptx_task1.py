#!/usr/bin/env python3
"""
TASK 1 COMPLETION — Fix the remaining PeptX defects left by the 18 Sep run:

  A. 20 compounds had downloaded images but NO source entry -> add them.
  B. 5x duplicate semaglutide, 2x mots-c, 2x ghk-cu identical entries -> dedupe.
  C. aod-9604 / cagrilintide / liraglutide: PeptX has NO single-vial page
     (confirmed: generic site title = soft-404). Source already removed; the
     orphaned .webp files were deleted by the prior run. Confirm clean.

Verified single-vial prices from supplier-cron-tonight-17sep.md (scraped 17 Sep 2026).
All 30 URLs re-verified 19 Sep 2026 with the title-content guard (product-specific titles).
"""
import json, os, shutil

DATA = 'src/data/compounds.json'
IMG_DIR = 'public/images/products/peptx'

# slug -> (price, dosage)  -- dosage = base/lowest dose option per task file
TARGETS = {
    'tirzepatide':      ('£46.99', '10mg'),
    'semaglutide':      ('£42.99', '20mg'),
    'retatrutide':      ('£43.99', '10mg'),
    'bpc-157':          ('£27.99', '10mg'),
    'ghk-cu':           ('£21.99', '50mg'),
    'tesamorelin':      ('£41.99', '10mg'),
    'mots-c':           ('£22.99', '10mg'),
    'ss-31':            ('£32.99', '10mg'),
    'selank':           ('£24.99', '10mg'),
    'semax':            ('£24.99', '10mg'),
    'kisspeptin':       ('£24.99', '5mg'),
    'pt-141':           ('£23.99', '10mg'),
    'nad-plus':         ('£28.99', '500mg'),
    'eloralintide':     ('',       '5mg'),   # renders, no price found on site
    'kpv':              ('£25.99', '10mg'),
    'sermorelin':       ('£32.99', '10mg'),
    'ipamorelin':       ('£19.99', '5mg'),
    'dsip':             ('£19.99', '5mg'),
    'mt-1':             ('£20.99', '10mg'),
    'ahk-cu':           ('£24.99', '100mg'),
    '5-amino-1mq':      ('£24.99', '50mg'),
    'ara-290':          ('£34.99', '16mg'),
    'cartalax':         ('£45.99', '40mg'),
    'pe-22-28':         ('£25.99', '10mg'),
    'mazdutide':        ('£27.99', '10mg'),
    'thymosin-alpha-1': ('£25.99', '5mg'),
    'klow-blend':       ('£63.99', '80mg'),
    'glutathione':      ('£19.99', '1500mg'),
    'l-carnitine':      ('£16.99', ''),
    'oxytocin-acetate': ('£23.99', '5mg'),
}

# PeptX URL slug differs from the VP compound slug for these:
URL_SLUG = {
    'nad-plus': 'nad',
    'kisspeptin': 'kisspeptin-10',
    'thymosin-alpha-1': 'ta-1-thymosin-alpha-1',
}

# compounds.json slug differs from the image filename for these:
IMG_NAME = {
    'kisspeptin': 'kisspeptin-10',
    'nad-plus': 'nad-plus',
}

# Those with no single-vial page -> source must not exist
NO_SINGLE_VIAL = ['aod-9604', 'cagrilintide', 'liraglutide']

c = json.load(open(DATA))
by_slug = {x['slug']: x for x in c}

changes = {'added': [], 'deduped': [], 'skipped_missing_compound': [], 'image_fixed': []}

# ---- B: dedupe identical PeptX entries -------------------------------------
for comp in c:
    srcs = comp.get('sources', [])
    seen = set()
    out = []
    for s in srcs:
        if s.get('vendor') == 'PeptX':
            key = (s.get('url'), s.get('price'), s.get('dosage'))
            if key in seen:
                changes['deduped'].append(f"{comp['slug']} (dropped dup {key[1]}/{key[2]})")
                continue
            seen.add(key)
        out.append(s)
    comp['sources'] = out

# ---- A: add missing PeptX source entries -----------------------------------
for slug, (price, dosage) in TARGETS.items():
    if slug in NO_SINGLE_VIAL:
        continue
    comp = by_slug.get(slug)
    if not comp:
        changes['skipped_missing_compound'].append(slug)
        continue

    url = f"https://peptx.co.uk/single-vials/{URL_SLUG.get(slug, slug)}"
    imgname = IMG_NAME.get(slug, slug)
    imgpath = f"/images/products/peptx/{imgname}.webp"

    # ensure the image file exists on disk
    disk = os.path.join(IMG_DIR, f"{imgname}.webp")
    if not os.path.exists(disk):
        # try alternate real-filename variants
        alt = {
            'tirzepatide': 'tirzepatide', 'semaglutide': 'semaglutide',
            'retatrutide': 'retatrutide', 'mots-c': 'mots-c',
        }.get(slug)
        changes['image_fixed'].append(f"{slug}: MISSING {disk}")
        continue

    existing = [s for s in comp['sources'] if s.get('vendor') == 'PeptX']
    if existing:
        # update in place (single entry after dedupe)
        s = existing[0]
        if s.get('url') != url:
            s['url'] = url
        if price and s.get('price') != price:
            s['price'] = price
        if dosage and s.get('dosage') != dosage:
            s['dosage'] = dosage
        s['image'] = imgpath
        s['inStock'] = True
        changes['added'].append(f"{slug}: UPDATED -> {url} {price} {dosage}")
    else:
        entry = {
            "vendor": "PeptX",
            "url": url,
            "price": price,
            "inStock": True,
            "image": imgpath,
        }
        if dosage:
            entry["dosage"] = dosage
        comp['sources'].append(entry)
        changes['added'].append(f"{slug}: ADDED -> {url} {price} {dosage}")

# ---- C: confirm no PeptX source on bulk-only compounds ---------------------
for slug in NO_SINGLE_VIAL:
    comp = by_slug.get(slug)
    if comp:
        before = len(comp['sources'])
        comp['sources'] = [s for s in comp['sources'] if s.get('vendor') != 'PeptX']
        if len(comp['sources']) != before:
            changes['deduped'].append(f"{slug}: removed PeptX (bulk-only)")

json.dump(c, open(DATA, 'w'), indent=2)

print("=== ADDED / UPDATED ===")
for x in changes['added']:
    print("  ", x)
print(f"\n=== DEDUPED / REMOVED ===  ({len(changes['deduped'])})")
for x in changes['deduped']:
    print("  ", x)
if changes['skipped_missing_compound']:
    print("\n=== SKIPPED (compound not in data) ===")
    for x in changes['skipped_missing_compound']:
        print("  ", x)
if changes['image_fixed']:
    print("\n=== IMAGE PROBLEMS ===")
    for x in changes['image_fixed']:
        print("  ", x)
