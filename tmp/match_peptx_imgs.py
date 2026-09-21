#!/usr/bin/env python3
"""Match PeptX real product images to compound slugs; report disk state."""
import json, os, re

imgs = json.load(open('tmp/peptx_imgmap_raw.json'))
names = [k.split('/')[-1] for k in imgs.keys()]

# compound slug -> candidate peptx image filename substrings
mapping = {
    'tirzepatide':      ['tirz-10mg.webp', 'SV-Tirzepatide_20mg.webp'],
    'semaglutide':      ['sema-20mg.webp'],
    'retatrutide':      ['reta-10mg.webp', 'SV-Reta_20mg.webp'],
    'bpc-157':          ['bpc-157-10mg.webp', 'SV-BPC157_10mg.webp'],
    'ghk-cu':           ['ghk-cu-50mg.webp', 'SV-GHK_CU_50mg.webp'],
    'tesamorelin':      ['tesamorelin-10mg.webp', 'SV-Tesamorelin_10mg.webp'],
    'mots-c':           ['mots-c-10mg.webp', 'SV-Mots-c_10mg.webp'],
    'ss-31':            ['ss-31-10mg.webp', 'SV-SS31_10mg.webp'],
    'selank':           ['selank-10mg.webp', 'SV-Selank_10mg.webp'],
    'semax':            ['semax-10mg.webp', 'SV-Semax_10mg.webp'],
    'kisspeptin':       ['kisspeptin-10-5mg.webp', 'SV-Kisspeptin_5mg.webp'],
    'pt-141':           ['pt-141-10mg.webp', 'SV-PT141_10mg.webp'],
    'nad-plus':         ['nad-500mg.webp', 'SV-NAD_500mg.webp'],
    'eloralintide':     ['elora-10mg.webp', 'SV-Eloralintide_10mg.webp'],
    'kpv':              ['kpv-10mg.webp'],
    'sermorelin':       ['sermorelin-10mg.webp', 'SV-Sermorelin_10mg.webp'],
    'ipamorelin':       ['ipamorelin-5mg.webp', 'SV-Ipamorelin_5mg.png'],
    'dsip':             ['dsip-5mg.webp'],
    'mt-1':             ['mt1-10mg.webp'],
    'mt-2':             ['mt2-10mg.webp', 'SV-MT-2-10mg.webp'],
    'ahk-cu':           ['ahk-cu-100mg.webp', 'SV-AHK-CU_100mg.webp'],
    '5-amino-1mq':      ['5-amino-1mq-50mg.webp', 'SV-5AMINO_50mg.webp'],
    'ara-290':          ['ara-290-16mg.webp'],
    'cartalax':         ['cartalax-40mg.webp'],
    'pe-22-28':         ['pe-22-28-10mg.webp'],
    'mazdutide':        ['maz-10mg.webp', 'SV-Mazdu_10mg.webp'],
    'thymosin-alpha-1': ['ta1-thymosin-alpha1-5mg.webp', 'SV-TA-1_5mg.webp'],
    'klow-blend':       ['klow-blend-80mg.webp', 'SV-KLOW_80mg.webp'],
    'glutathione':      ['glutathione-1500mg.webp', 'SV-GLUTA-1200.png'],
    'l-carnitine':      ['l-carnitine-600mg-10ml.webp', 'SV-L-Carnitine_600mg.webp'],
    'oxytocin-acetate': ['oxytocin-acetate-5mg.webp', 'SV-oxytocin_5mg.webp'],
}

print(f"{'compound':20s} {'disk?':6s} {'peptx-img-available':38s}")
found_all = True
for slug, cands in mapping.items():
    disk = os.path.exists(f'public/images/products/peptx/{slug}.webp')
    avail = next((c for c in cands if c in names), None)
    if not avail:
        found_all = False
    print(f"{slug:20s} {str(disk):6s} {str(avail):38s}")
print("\nAll compounds have an image candidate:", found_all)

# Which images on disk are real (unique)?
disk_files = sorted(os.listdir('public/images/products/peptx'))
import hashlib
print(f"\ndisk files: {len(disk_files)}")
hashmap = {}
for f in disk_files:
    h = hashlib.md5(open(f'public/images/products/peptx/{f}', 'rb').read()).hexdigest()
    hashmap.setdefault(h, []).append(f)
dupes = {k: v for k, v in hashmap.items() if len(v) > 1}
print("duplicate-content files:", dupes if dupes else "NONE (all unique)")
