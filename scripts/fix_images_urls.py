#!/usr/bin/env python3
"""Fix all remaining image and URL issues for the 4 new suppliers."""
import json
from pathlib import Path

DATA = Path('/Users/time4you/viralpeps/src/data')
with open(DATA / 'compounds.json') as f:
    compounds = json.load(f)

# ── KENSINGTON LABS ── 13 products with broken URLs/images ──
KENS_FIXES = {
    "hexarelin": {"url": "https://kensingtonlabs.co.uk/product/hexarelin-acetate-5/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2024/07/hexarelin-acetate-2.png", "dosage": "5mg"},
    "kisspeptin-10": {"url": "https://kensingtonlabs.co.uk/product/kisspeptin-10mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/06/kisspeptin-10mg.png", "dosage": "10mg"},
    "gonadorelin": {"url": "https://kensingtonlabs.co.uk/product/gonadorelin-5mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Gonadorelin-5mg.png", "dosage": "5mg"},
    "lipo-c": {"url": "https://kensingtonlabs.co.uk/product/lipo-c-10ml/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Lipo-c-10ml.png", "dosage": "10ml"},
    "pinealon": {"url": "https://kensingtonlabs.co.uk/product/pinealon-10mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Pinealon-10mg.png", "dosage": "10mg"},
    "crystagen": {"url": "https://kensingtonlabs.co.uk/product/crystagen-20mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Crystagen-20mg.png", "dosage": "20mg"},
    "acth-1-39": {"url": "https://kensingtonlabs.co.uk/product/acth-1-39-5mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Acth-1-39-5mg.png", "dosage": "5mg"},
    "cortagen": {"url": "https://kensingtonlabs.co.uk/product/cortagen-20mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Cortagen-20mg.png", "dosage": "20mg"},
    "dermorphin": {"url": "https://kensingtonlabs.co.uk/product/dermorphin-5mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2024/11/dermorphin.png", "dosage": "5mg"},
    "hmg-75iu": {"url": "https://kensingtonlabs.co.uk/product/hmg-75iu/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/HMG-75iu.png", "dosage": "75IU"},
    "humanin": {"url": "https://kensingtonlabs.co.uk/product/humanin-10mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Humanin-10mg.png", "dosage": "10mg"},
    "oxytocin": {"url": "https://kensingtonlabs.co.uk/product/oxytocin-10mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/Oxytocin-10mg.png", "dosage": "10mg"},
    "gdf-8": {"url": "https://kensingtonlabs.co.uk/product/gdf-8-1mg/", "img": "https://kensingtonlabs.co.uk/wp-content/uploads/2025/08/GDF-8-1mg.png", "dosage": "1mg"},
}

kens_fixed = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Kensington Labs UK':
            cid = c['id']
            if cid in KENS_FIXES:
                fix = KENS_FIXES[cid]
                changed = False
                if s['url'] == 'https://www.kensingtonlabs.co.uk/shop/' or not s['url'].startswith('http'):
                    s['url'] = fix['url']
                    changed = True
                if not s.get('image', '').startswith('http'):
                    s['image'] = fix['img']
                    changed = True
                if changed:
                    kens_fixed += 1

print(f"Kensington Labs: {kens_fixed} entries fixed")

# ── RACCOON PEPTIDES ── 3 products with broken URLs/images ──
RACCOON_FIXES = {
    "mazdutide": {"url": "https://www.raccoonpeptides.com/peptides/49-mazdutide-10mg.html", "img": "https://www.raccoonpeptides.com/83-large_default/mazdutide-10mg.jpg", "dosage": "10mg"},
    "mgf": {"dosage": "2mg"},  # MGF not found on site - mark as out of stock and keep reasonable URL
    "sterling-cagrilintide-5mg": {"url": "https://www.raccoonpeptides.com/peptides/22-cagrilintide-5mg.html", "img": "https://www.raccoonpeptides.com/32-large_default/cagrilintide-5mg.jpg", "dosage": "5mg"},
    "sterling-cagrilintide-10mg": {"url": "https://www.raccoonpeptides.com/peptides/23-cagrilintide-10mg.html", "img": "https://www.raccoonpeptides.com/33-large_default/cagrilintide-10mg.jpg", "dosage": "10mg"},
}

raccoon_fixed = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Raccoon Peptides':
            cid = c['id']
            if cid in RACCOON_FIXES:
                fix = RACCOON_FIXES[cid]
                changed = False
                if 'url' in fix and (s['url'] == 'https://www.raccoonpeptides.com/collections/peptides' or not s['url'].startswith('http')):
                    s['url'] = fix['url']
                    changed = True
                if 'img' in fix and (not s.get('image', '').startswith('http')):
                    s['image'] = fix['img']
                    changed = True
                if cid == 'mgf':
                    s['inStock'] = False
                    changed = True
                if changed:
                    raccoon_fixed += 1

print(f"Raccoon Peptides: {raccoon_fixed} entries fixed")

# ── PEPTIDES LAB UK ── 2 products with broken images ──
PLU_FIXES = {
    "igf-1-des": {"url": "https://peptideslabuk.com/product/igf-des/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/IGF-DES-470x588.jpg"},
    "sterling-cagrilintide-5mg": {
        "url": "https://peptideslabuk.com/product/cagrilintide/",
        "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Cagrilintide-10-mg-470x588.jpg"
    },
}

plu_fixed = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Peptides Lab UK':
            cid = c['id']
            if cid in PLU_FIXES:
                fix = PLU_FIXES[cid]
                changed = False
                if 'url' in fix and (s['url'] == 'https://peptideslabuk.com' or not s['url'].startswith('http')):
                    s['url'] = fix['url']
                    changed = True
                if 'img' in fix and (not s.get('image', '').startswith('http')):
                    s['image'] = fix['img']
                    changed = True
                if changed:
                    plu_fixed += 1

print(f"Peptides Lab UK: {plu_fixed} entries fixed")

# ── VERIFY ──
print("\n=== VERIFICATION ===")
for vn in ['Raccoon Peptides', 'Kensington Labs UK', 'Peptides Lab UK', 'Biohack Peptides']:
    total = 0
    with_cdn = 0
    for c in compounds:
        for s in c.get('sources', []):
            if s['vendor'] == vn:
                total += 1
                if s.get('image', '').startswith('http'):
                    with_cdn += 1
    print(f'{vn:25s}: {total:3d} entries, {with_cdn:3d} CDN images')

# ── SAVE ──
with open(DATA / 'compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)
print("\nSaved.")
