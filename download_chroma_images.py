#!/usr/bin/env python3
"""Download Chroma Peptides product images, matching shop names to compound slugs."""

import subprocess, sys, os, re

# All product data from all 4 shop pages
shop_products = {
    "5-Amino-1MQ": "https://chromapeptides.co.uk/wp-content/uploads/2025/07/5-Amino-1MQ-5mg_1-mockup-1024x1024.webp",
    "Acetic Acid 0.6%": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Acetic-Acid-0.6-10mL-mockup-1024x1024.webp",
    "AOD-9604": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/AOD-9604-5mg_1-mockup-1024x1024.webp",
    "Bacteriostatic Water": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Bacteriostatic-Water-3mL_1-1-mockup-1024x1024.webp",
    "BPC-157": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/BPC-157-5mg-mockup-1024x1024.webp",
    "BPC-157 TB-500 Blend": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/BPC-157-TB-500-Blend-5mg-5mg_1-mockup-1024x1024.webp",
    "Cartalax": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/tmp-cartalax-1024x1024.jpeg",
    "CJC-1295 (DAC)": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/CJC-1295-DAC-5-MG_BPC-157-5MG-1024x1024.webp",
    "CJC-1295 (No DAC)": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/CJC-1295-No-DAC_5mg-mockup-1024x1024.webp",
    "Dihexa": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/dihexa-1024x1024.webp",
    "DMSO": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/DMSO-3ml.webp",
    "DSIP": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/DSIP-5mg_1-mockup-1024x1024.webp",
    "Epithalon": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Epithalon-10MG-mockup-1024x1024.webp",
    "GHK-Cu": "https://chromapeptides.co.uk/wp-content/uploads/2025/07/GHK-Cu-50mg-mockup-1-1024x1024.webp",
    "GHRP-2": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/GHRP-2-5mg-mockup-1024x1024.webp",
    "GHRP-6": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/GHRP-6-5mg-mockup-1024x1024.webp",
    "GLOW Blend": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/GLOW-70mg-1024x1024.webp",
    "Glutathione": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/glutathione-1500-1024x1024.webp",
    "Hexarelin": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Hexarelin-5mg-mockup-1024x1024.webp",
    "HGH-Fragment 176-191": "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T104726.266-1024x1024.webp",
    "IGF-1 LR3": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/IGF-1-LR3-1mg-mockup-1024x1024.webp",
    "Ipamorelin": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/ipamorelin-5mg-mockup-1024x1024.webp",
    "Kisspeptin": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/tmp-kisspeptin-1024x1024.png",
    "KLOW Blend": "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T102135.593-1024x1024.webp",
    "KPV": "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T111642.617-1024x1024.webp",
    "Melanotan 2 (MT-II)": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Melanotan-II-MT-2-10mg_1-mockup-1024x1024.webp",
    "Melanotan I (MT-1)": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/mt1-1024x1024.webp",
    "Methylene Blue (1% USP Grade)": "https://chromapeptides.co.uk/wp-content/uploads/2025/11/mockup-update-1024x1024.png",
    "MOTS-C": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/MOTS-C-10mg-mockup-1024x1024.webp",
    "NAD+": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/NAD-500mg_1-mockup-1024x1024.webp",
    "PT-141 (Bremelanotide)": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/PT-141-Bremelanotide_1-1024x1024.webp",
    "RU-58841 (5% solution)": "https://chromapeptides.co.uk/wp-content/uploads/2026/01/fef98001-f89d-4079-a734-adc9c651371b-1024x1024.webp",
    "Selank": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/111-1024x1024.webp",
    "Semax": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Selank-5mg_1-mockup-1024x1024.webp",
    "Sermorelin": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Sermorelin-5mg_1-mockup-1024x1024.webp",
    "SLU-PP-332": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/SLU-PP-332-5mg_1-mockup-1024x1024.webp",
    "SNAP-8 plus GHK-Cu plus Matrixyl plus Hyaluronic Acid Serum": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/SNAP-8-_-GHK-CU-_Matrixyl_hyaluronic-acid-1024x1024.webp",
    "SS-31": "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T103311.708-1024x1024.webp",
    "SS-31 50mg": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/ss31-50-1024x1024.webp",
    "TB-500": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/TB-500-5mg-mockup-1024x1024.webp",
    "Tesamorelin": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/tesamorelin-2mg-mockup-1024x1024.webp",
    "Thymosin Alpha-1": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Thymosin-Alpha-1-5mg_1-mockup-1024x1024.webp",
}

compound_slugs = [
    "bpc-157", "tb-500", "melanotan-ii", "ghrp-2", "ghrp-6", "aod-9604",
    "igf-1-lr3", "tesamorelin", "sermorelin", "mots-c", "ss-31", "ghk-cu",
    "kpv", "epitalon", "semax", "selank", "hgh-fragment-176-191", "ipamorelin",
    "pt-141-bremelanotide", "dsip", "glow", "klow", "bacteriostatic-water",
    "nad", "cjc-1295-no-dac", "cjc-1295-dac", "mt-1-melanotan-1-acetate-10mg",
    "5-amino-1mq", "hexarelin", "kisspeptin", "acetic-acid-reconstitution-solvent-10ml",
    "cartalax", "dihexa", "dmso", "glutathione", "methylene-blue", "ru-58841",
    "slu-pp-332", "snap-8", "ss-31-50mg", "thymosin-alpha-1"
]

def slugify(name):
    s = name.lower().strip()
    s = re.sub(r'\([^)]*\)', '', s)
    s = s.replace('\u2013', '-').replace('\u2014', '-')
    s = s.replace("'", "").replace("'", "")
    s = s.replace(' / ', '-').replace(' + ', '-').replace(', ', '-')
    s = s.replace(' blend', '').replace(' solution', '').replace(' grade', '')
    s = s.replace(' serum', '').replace(' no label', '')
    s = s.replace(' plus ', '-')
    s = re.sub(r'\s+', '-', s.strip('-'))
    s = s.strip('-')
    return s

from difflib import SequenceMatcher

def best_match(shop_name, slugs):
    shop_slug = slugify(shop_name)
    
    if shop_slug in slugs:
        return shop_slug
    
    best_score = 0
    best_slug = None
    
    for slug in slugs:
        score = SequenceMatcher(None, shop_slug, slug).ratio()
        if shop_slug in slug or slug in shop_slug:
            score = max(score, 0.85)
        shop_parts = set(shop_slug.replace('-', ' ').split())
        slug_parts = set(slug.replace('-', ' ').split())
        common = shop_parts & slug_parts
        if common:
            overlap = len(common) / max(len(shop_parts), len(slug_parts))
            score = max(score, overlap * 0.9)
        
        if score > best_score:
            best_score = score
            best_slug = slug
    
    if best_score >= 0.5:
        return best_slug
    return None

outdir = "/Users/time4you/viralpeps/public/images/products/chroma-peptides"
mapping = {}
unmatched = []

for shop_name, img_url in shop_products.items():
    matched_slug = best_match(shop_name, compound_slugs)
    if matched_slug:
        mapping[matched_slug] = img_url
        print(f"MATCH: '{shop_name}' -> '{matched_slug}'")
    else:
        unmatched.append(shop_name)
        print(f"NO MATCH: '{shop_name}'")

if unmatched:
    print(f"\nUNMATCHED products ({len(unmatched)}):")
    for u in unmatched:
        print(f"  - {u}")

print(f"\nTotal mapped: {len(mapping)}")

# Check which slugs are still missing
matched_slugs = set(mapping.keys())
missing_slugs = [s for s in compound_slugs if s not in matched_slugs]
if missing_slugs:
    print(f"\nSlugs with NO image found ({len(missing_slugs)}):")
    for s in missing_slugs:
        print(f"  - {s}")

print("\n=== Downloading images ===")
for slug, url in sorted(mapping.items()):
    outpath = os.path.join(outdir, slug + ".webp")
    
    # Try full-resolution URL first (remove WordPress size suffix)
    full_url = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', url)
    
    result = subprocess.run(
        ['curl', '-sL', '-o', outpath, full_url],
        capture_output=True, text=True
    )
    
    if result.returncode == 0 and os.path.getsize(outpath) > 1000:
        size = os.path.getsize(outpath)
        print(f"  {slug}: {size} bytes - OK")
    else:
        # Try original URL
        result2 = subprocess.run(
            ['curl', '-sL', '-o', outpath, url],
            capture_output=True, text=True
        )
        if result2.returncode == 0:
            size = os.path.getsize(outpath)
            status = "OK" if size > 1000 else "SUSPICIOUS (small)"
            print(f"  {slug}: {size} bytes - {status} (from sized URL)")
        else:
            print(f"  {slug}: FAILED")

print("\n=== Verification ===")
result = subprocess.run(
    ['file'] + [os.path.join(outdir, f) for f in sorted(os.listdir(outdir))],
    capture_output=True, text=True
)
print(result.stdout)

# Count images that are actually HTML (error pages)
html_count = 0
for f in sorted(os.listdir(outdir)):
    fp = os.path.join(outdir, f)
    with open(fp, 'rb') as fh:
        header = fh.read(1024)
        if b'<!DOCTYPE' in header or b'<html' in header or b'<HTML' in header:
            html_count += 1
            print(f"  HTML content in: {f}")

print(f"\nHTML error pages: {html_count}")
print(f"Total files: {len(os.listdir(outdir))}")
print("=== Done ===")
