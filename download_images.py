#!/usr/bin/env python3
import urllib.request, os, sys

images = {
    'bacteriostatic-water': 'https://reta-uk.com/cdn/shop/files/bac-water-10ml_1_e52adb90-4b87-49bc-8883-fc5b5449c5fc.webp',
    'bpc-157-tb-500-mix': 'https://reta-uk.com/cdn/shop/files/BPC-157TB-500Mix20mg.webp',
    'cjc-1295-no-dac': 'https://reta-uk.com/cdn/shop/files/cjc-1295-no-DAC.webp',
    'cjc-1295-no-dac-ipamorelin-mix': 'https://reta-uk.com/cdn/shop/files/CJC-No_DAC_OpamorelinMix.webp',
    'eloralintide': 'https://reta-uk.com/cdn/shop/files/eloralintide-10mg-peptide-research-uk.webp',
    'ghk-cu': 'https://reta-uk.com/cdn/shop/files/GHK-Cu50mg.webp',
    'glow': 'https://reta-uk.com/cdn/shop/files/glow.webp',
    'igf-lr3': 'https://reta-uk.com/cdn/shop/files/IGF-1LR31mg.webp',
    'ipamorelin': 'https://reta-uk.com/cdn/shop/files/Ipamorelin10mg.webp',
    'klow': 'https://reta-uk.com/cdn/shop/files/klow-55mg-peptide-research.webp',
    'melanotan-1': 'https://reta-uk.com/cdn/shop/files/melanotan-I-10mg.jpg',
    'melanotan-2': 'https://reta-uk.com/cdn/shop/files/melanotan-II-10mg_eb4842df-77d8-486a-8109-54826b76371b.webp',
    'mots-c': 'https://reta-uk.com/cdn/shop/files/MOTS-C10mg.webp',
    'nad-plus': 'https://reta-uk.com/cdn/shop/files/NAD_500mg.webp',
    'pinealon-10': 'https://reta-uk.com/cdn/shop/files/pinealon10-10mg-peptides-nootropic.webp',
    'pt-141': 'https://reta-uk.com/cdn/shop/files/PT-14110mg_c1a0a9d9-a473-447e-8da2-3109df156f00.webp',
    'selank': 'https://reta-uk.com/cdn/shop/files/Selank10mg.webp',
    'semax': 'https://reta-uk.com/cdn/shop/files/Semax10mg.webp',
    'ss-31': 'https://reta-uk.com/cdn/shop/files/SS-3150mg.webp',
    'tb-500': 'https://reta-uk.com/cdn/shop/files/TB-50010mg.webp',
    'tesamorelin': 'https://reta-uk.com/cdn/shop/files/Tesamorelin10mg_702bfd4f-1c7e-48c7-a3ea-613fd5517179.webp',
}

outdir = 'public/images/products/reta-uk'
os.makedirs(outdir, exist_ok=True)

for slug, url in images.items():
    url_800 = url.replace('width=3840', 'width=800').replace('width=1200', 'width=800')
    ext = url.rsplit('.', 1)[-1].split('?')[0]
    outpath = f'{outdir}/{slug}.webp' if ext != 'jpg' else f'{outdir}/{slug}.jpg'
    try:
        urllib.request.urlretrieve(url_800, outpath)
        print(f'OK: {slug}')
    except Exception as e:
        print(f'FAIL: {slug}: {e}')
print('DONE')
