#!/usr/bin/env python3
"""
Add Bio Peptides UK product sources to compounds.json.
Uses local placeholder image paths as per project convention.
"""
import json

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'
VENDOR_NAME = 'Bio Peptides UK'

# Product mapping: (compound_id, slug_for_image, url, price, dosage, in_stock)
PRODUCTS = [
    # BPC-157
    ('bpc-157', 'bpc-157-10mg', 'https://biopeptides-uk.com/product/bpc-157-10mg/', '£34.99', '10mg', True),
    ('bpc-157', 'bpc-157-20mg', 'https://biopeptides-uk.com/product/bpc-157-20mg-2/', '£55.90', '20mg', True),

    # TB-500
    ('tb-500', 'tb-500-10mg', 'https://biopeptides-uk.com/product/tb-500-10mg/', '£39.00', '10mg', True),

    # Retatrutide
    ('retatrutide', 'retatrutide-10mg', 'https://biopeptides-uk.com/product/retatrutide-10mg/', '£89.00', '10mg', True),
    ('retatrutide', 'retatrutide-20mg', 'https://biopeptides-uk.com/product/retatrutide-20mg/', '£149.00', '20mg', True),
    ('retatrutide', 'retatrutide-30mg', 'https://biopeptides-uk.com/product/retatrutide-30mg/', '£179.00', '30mg', True),

    # Tirzepatide
    ('tirzepatide', 'tirzepatide-10mg', 'https://biopeptides-uk.com/product/tirzepatide-10mg/', '£89.00', '10mg', True),

    # Semaglutide
    ('semaglutide', 'semaglutide-10mg', 'https://biopeptides-uk.com/product/semaglutide-10mg/', '£59.00', '10mg', True),
    ('semaglutide', 'semaglutide-20mg', 'https://biopeptides-uk.com/product/semaglutide-20mg/', '£89.00', '20mg', True),

    # Tesamorelin
    ('tesamorelin', 'tesamorelin-5mg', 'https://biopeptides-uk.com/product/tesamorelin-5mg/', '£39.00', '5mg', True),
    ('tesamorelin-10mg', 'tesamorelin-10mg', 'https://biopeptides-uk.com/product/tesamorelin-10mg/', '£59.00', '10mg', True),

    # MOTS-c
    ('mots-c-10mg', 'mots-c-10mg', 'https://biopeptides-uk.com/product/mots-c-10mg/', '£32.99', '10mg', True),
    ('mots-c-40mg', 'mots-c-40mg', 'https://biopeptides-uk.com/product/mots-c-40mg/', '£69.99', '40mg', True),

    # GHK-Cu
    ('ghk-cu', 'ghk-cu-50mg', 'https://biopeptides-uk.com/product/ghk-cu-50mg/', '£28.99', '50mg', True),
    ('ghk-cu', 'ghk-cu-100mg', 'https://biopeptides-uk.com/product/ghk-cu-100mg/', '£55.00', '100mg', True),

    # Semax
    ('semax', 'semax-5mg', 'https://biopeptides-uk.com/product/semax-5mg/', '£23.50', '5mg', True),
    ('semax', 'semax-10mg', 'https://biopeptides-uk.com/product/semax-10mg/', '£32.00', '10mg', True),

    # Cagrilintide
    ('cagrilintide', 'cagrilintide-10mg', 'https://biopeptides-uk.com/product/cagrilintide-10mg/', '£57.99', '10mg', True),

    # Ipamorelin
    ('ipamorelin', 'ipamorelin-10mg', 'https://biopeptides-uk.com/product/ipamorelin-10mg/', '£25.99', '10mg', True),

    # 5-Amino-1MQ
    ('5-amino-1mq', '5-amino-1mq-5mg', 'https://biopeptides-uk.com/product/5-amino-1mq-5mg/', '£33.92', '5mg', True),

    # KPV
    ('kpv', 'kpv-10mg', 'https://biopeptides-uk.com/product/kpv-10mg/', '£35.00', '10mg', True),

    # NAD+
    ('nad-plus', 'nad-500mg', 'https://biopeptides-uk.com/product/nad-500mg/', '£47.99', '500mg', True),

    # Selank
    ('selank', 'selank-10mg', 'https://biopeptides-uk.com/product/selank-10mg/', '£30.00', '10mg', True),

    # Epitalon
    ('epitalon', 'epitalon-10mg', 'https://biopeptides-uk.com/product/epitalon-10mg/', '£24.50', '10mg', True),

    # DSIP
    ('dsip', 'dsip-15mg', 'https://biopeptides-uk.com/product/dsip-15mg/', '£49.50', '15mg', True),

    # SS-31
    ('ss-31', 'ss-31-50mg', 'https://biopeptides-uk.com/product/ss-31-50mg/', '£125.00', '50mg', True),

    # Bacteriostatic Water
    ('bacteriostatic-water', 'bac-water-10ml', 'https://biopeptides-uk.com/product/bacteriostatic-water-10ml-biopura/', '£9.99', '10ml', True),
    ('bacteriostatic-water', 'bac-water-3ml', 'https://biopeptides-uk.com/product/bacteriostatic-water-3ml/', '£4.99', '3ml', True),

    # AOD 9604
    ('aod9604', 'aod-9604-5mg', 'https://biopeptides-uk.com/product/aod-9604-5mg/', '£52.24', '5mg', True),

    # KLOW Blend
    ('klow', 'klow-blend-80mg', 'https://biopeptides-uk.com/product/klow-blend-80mg/', '£99.00', '80mg', True),

    # GLOW Blend
    ('glow', 'glow-blend-70mg', 'https://biopeptides-uk.com/product/glow-70mg/', '£89.00', '70mg', True),

    # CJC-1295 with DAC
    ('cjc-1295-with-dac', 'cjc-1295-dac-2mg', 'https://biopeptides-uk.com/product/cjc-1295-with-dac-2mg/', '£38.99', '2mg', True),

    # Kisspeptin
    ('kisspeptin-10', 'kisspeptin-10mg', 'https://biopeptides-uk.com/product/kisspeptin-10mg/', '£33.00', '10mg', True),

    # Glutathione
    ('glutathione', 'glutathione-1500mg', 'https://biopeptides-uk.com/product/glutathione-1500mg/', '£30.00', '1500mg', True),

    # Thymosin Alpha-1
    ('thymosin-alpha-1', 'thymosin-alpha-1-10mg', 'https://biopeptides-uk.com/product/thymosin-alpha-1-10mg/', '£31.00', '10mg', True),

    # GHRP-6
    ('ghrp-6', 'ghrp-6-10mg', 'https://biopeptides-uk.com/product/ghrp-6-10mg/', '£19.90', '10mg', True),

    # GHRP-2
    ('ghrp-2', 'ghrp-2-10mg', 'https://biopeptides-uk.com/product/ghrp-2-10mg/', '£33.16', '10mg', True),

    # Sermorelin
    ('sermorelin', 'sermorelin-10mg', 'https://biopeptides-uk.com/product/sermorelin-10mg/', '£48.99', '10mg', True),

    # Oxytocin
    ('oxytocin', 'oxytocin-2mg', 'https://biopeptides-uk.com/product/oxytocin-2mg/', '£28.00', '2mg', True),

    # Pinealon
    ('pinealon', 'pinealon-10mg', 'https://biopeptides-uk.com/product/pinealon-10mg/', '£26.99', '10mg', True),

    # IGF-1 LR3
    ('igf-1-lr3', 'igf-1-lr3-1mg', 'https://biopeptides-uk.com/product/igf-1-long-r3-1mg/', '£89.99', '1mg', True),

    # PT-141
    ('pt-141', 'pt-141-10mg', 'https://biopeptides-uk.com/product/pt-141-10mg/', '£25.00', '10mg', True),

    # VIP
    ('vip', 'vip-10mg', 'https://biopeptides-uk.com/product/vip-10mg/', '£44.90', '10mg', True),

    # ACE-031
    ('ace-031-1mg', 'ace-031-1mg', 'https://biopeptides-uk.com/product/ace-031-1mg/', '£46.99', '1mg', True),

    # SNAP-8
    ('snap-8', 'snap-8-10mg', 'https://biopeptides-uk.com/product/snap-8-10mg/', '£23.00', '10mg', True),

    # AHK-Cu
    ('ahk-cu', 'ahk-cu-100mg', 'https://biopeptides-uk.com/product/ahk-cu-100mg/', '£26.35', '100mg', True),

    # Acetic Acid
    ('acetic-acid-10ml', 'acetic-acid-10ml', 'https://biopeptides-uk.com/product/acetic-acid-10ml/', '£5.86', '10ml', True),
    ('acetic-acid-10ml', 'acetic-acid-3ml', 'https://biopeptides-uk.com/product/acetic-acid-3ml/', '£4.51', '3ml', True),

    # Wolverine Stack
    ('wolverine-stack-bpc157-tb500-blend', 'wolverine-blend-10mg', 'https://biopeptides-uk.com/product/wolverine-blend-10mg/', '£75.00', '10mg', True),
]


def main():
    with open(COMPOUNDS_PATH) as f:
        compounds = json.load(f)

    # Build lookup by ID
    compound_map = {c['id']: c for c in compounds}

    added = 0
    skipped_existing = 0
    not_found = []

    for cid, img_slug, url, price, dosage, in_stock in PRODUCTS:
        if cid not in compound_map:
            not_found.append(cid)
            continue

        compound = compound_map[cid]

        # Ensure sources array exists
        if 'sources' not in compound:
            compound['sources'] = []

        # Check if this exact source already exists (dedup by vendor + dosage)
        already_exists = any(
            s.get('vendor') == VENDOR_NAME and s.get('dosage') == dosage
            for s in compound['sources']
        )

        if already_exists:
            skipped_existing += 1
            continue

        # Add new source with local placeholder image
        image_path = f'/images/products/bio-peptides-uk/{img_slug}.webp'
        compound['sources'].append({
            'vendor': VENDOR_NAME,
            'url': url,
            'price': price,
            'inStock': in_stock,
            'image': image_path,
            'dosage': dosage
        })
        added += 1

    # Write back
    with open(COMPOUNDS_PATH, 'w') as f:
        json.dump(compounds, f, indent=2)

    print(f'Added: {added} source entries')
    print(f'Skipped (already exists): {skipped_existing}')
    if not_found:
        print(f'NOT FOUND compound IDs: {not_found}')
    print('Done!')


if __name__ == '__main__':
    main()
