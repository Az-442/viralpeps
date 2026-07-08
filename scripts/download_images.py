#!/usr/bin/env python3
"""Download vendor logos and product images for Eva Peptide and Be Better Peptides."""
import urllib.request
import os

base = '/Users/time4you/viralpeps/public'

images = {
    # Logos (already downloaded)
    #'vendors/eva-peptide.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/eva-peptide-logo-white.png',
    #'vendors/be-better-peptides.png': 'https://bebetterpeptides.com/cdn/shop/files/DE4A60A5-3E6B-497D-820D-E5B810269F28.png?height=100&v=1780947361',
    
    # Eva Peptide product images (from actual shop pages)
    'products/eva-peptide/tirzepatide.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Tirzepatide-%E2%84%A2-430x430.png',
    'products/eva-peptide/semaglutide.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Semaglutide-%E2%84%A2-430x430.png',
    'products/eva-peptide/retatrutide.png': 'https://evapeptide.co.uk/wp-content/uploads/2025/08/Retatrutide-%E2%84%A2-430x430.png',
    'products/eva-peptide/mots-c.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/MOTS-c-%E2%84%A2-430x430.png',
    'products/eva-peptide/tb500.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/TB500Thymosin-B4-Acetate-%E2%84%A2-430x430.png',
    'products/eva-peptide/ghk-cu.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/GHK-CU-%E2%84%A2-430x430.png',
    'products/eva-peptide/cjc-1295-dac.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/CJC-1295-dac%C2%AE-430x430.png',
    'products/eva-peptide/cjc-1295-no-dac.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/CJC-1295-no-dac-430x430.png',
    'products/eva-peptide/ipamorelin.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Ipamorelin-%E2%84%A2-430x430.png',
    'products/eva-peptide/epithalon.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Epithalon-%E2%84%A2-430x430.png',
    'products/eva-peptide/aod9604.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/AOD9604-%E2%84%A2-430x430.png',
    'products/eva-peptide/bpc-157.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/BPC-157-%E2%84%A2-430x430.png',
    'products/eva-peptide/cagrilintide.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/cagrilintide-%E2%84%A2-430x430.png',
    'products/eva-peptide/tesamorelin.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Tesamorelin-%C2%AE-430x430.png',
    'products/eva-peptide/thymosin-alpha-1.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Thymosin-Alpha-1-%E2%84%A2-430x430.png',
    'products/eva-peptide/ss-31.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/SS-31-%E2%84%A2-430x430.png',
    'products/eva-peptide/ghrp-2.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/GHRP-2.png',
    'products/eva-peptide/hgh-fragment.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/HGH-Fragment-176-191-%E2%84%A2-430x430.png',
    'products/eva-peptide/5-amino-1mq.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/5-amino-1mq-%E2%84%A2-430x430.png',
    'products/eva-peptide/pt-141.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/PT-141-%E2%84%A2-430x430.png',
    'products/eva-peptide/melanotan-2.png': 'https://evapeptide.co.uk/wp-content/uploads/2026/03/Melanotan-2-Acetate-%E2%84%A2-430x430.png',
    
    # Be Better Peptides product images
    'products/be-better-peptides/tirzepatide.png': 'https://bebetterpeptides.com/cdn/shop/files/tirzepatide-10mg-research-peptide-be-better-peptides.png',
    'products/be-better-peptides/semaglutide.png': 'https://bebetterpeptides.com/cdn/shop/files/semaglutide-10mg-research-peptide.png',
    'products/be-better-peptides/retatrutide.png': 'https://bebetterpeptides.com/cdn/shop/files/retatrutide-10mg-research-peptide-hero.png',
    'products/be-better-peptides/tb500.png': 'https://bebetterpeptides.com/cdn/shop/files/tb-500-10mg-peptide-vial-hero.png',
}

for path, url in images.items():
    full_path = f'{base}/{path}'
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    try:
        urllib.request.urlretrieve(url, full_path)
        size = os.path.getsize(full_path)
        # Validate it's not an HTML file
        with open(full_path, 'rb') as f:
            header = f.read(1024)
        if b'<html' in header.lower() or b'<!doctype' in header.lower():
            print(f'WARN: {path} is HTML - deleting')
            os.remove(full_path)
        else:
            print(f'OK: {path} ({size} bytes)')
    except Exception as e:
        print(f'FAIL: {path}: {e}')
