#!/usr/bin/env python3
"""Recategorise ViralPeps compounds - merge GH+GHRP, add anti-aging, immunity, tanning-libido"""
import json

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

new_cats = {
    # Growth hormone (merged: growth-factors + ghrp + growth-hormone + secretagogues)
    'cjc-1295': 'growth-hormone',
    'cjc-1295-with-dac': 'growth-hormone',
    'cjc-1295-ipamorelin-blend': 'growth-hormone',
    'igf-1-lr3': 'growth-hormone',
    'igf-1-des': 'growth-hormone',
    'tesamorelin': 'growth-hormone',
    'sermorelin': 'growth-hormone',
    'gonadorelin': 'growth-hormone',
    'follistatin': 'growth-hormone',
    'peg-mgf': 'growth-hormone',
    'hgh-97': 'growth-hormone',
    'mgf': 'growth-hormone',
    'ghrp-2': 'growth-hormone',
    'ghrp-6': 'growth-hormone',
    'ipamorelin': 'growth-hormone',
    'hexarelin': 'growth-hormone',
    'follistatin-344': 'growth-hormone',
    # Anti-aging
    'ghk-cu': 'anti-aging',
    'pal-ghk': 'anti-aging',
    'ahk-cu': 'anti-aging',
    'epitalon': 'anti-aging',
    'nad-plus': 'anti-aging',
    'nad-1000-mg-nasal-spray': 'anti-aging',
    'thymalin': 'anti-aging',
    'pinealon': 'anti-aging',
    'dsip': 'anti-aging',
    'ara-290': 'anti-aging',
    'glutathione': 'anti-aging',
    'aicar': 'anti-aging',
    'slu-pp-332': 'anti-aging',
    '5-amino-1mq': 'anti-aging',
    'adipotide-ftpp': 'anti-aging',
    'dihexa': 'anti-aging',
    'noopept': 'anti-aging',
    'p21': 'anti-aging',
    'oxytocin': 'anti-aging',
    # Immunity peptides
    'thymosin-alpha-1': 'immunity-peptides',
    'll-37': 'immunity-peptides',
    'kpv': 'immunity-peptides',
    'vip': 'immunity-peptides',
    'bronchogen': 'immunity-peptides',
    'cartalax': 'immunity-peptides',
    'selank': 'immunity-peptides',
    'semax': 'immunity-peptides',
    'thymosin-alpha-1-10mg': 'immunity-peptides',
    # Tanning & libido
    'melanotan-ii': 'tanning-libido',
    'pt-141-bremelanotide': 'tanning-libido',
    'pt-141-nasal-spray': 'tanning-libido',
    'kisspeptin-10': 'tanning-libido',
    'hcg': 'tanning-libido',
    'kisspeptin-nasal-spray': 'tanning-libido',
    'melanotan-i': 'tanning-libido',
}

changed = 0
for c in data:
    slug = c['slug']
    if slug in new_cats:
        old_cat = c.get('category', '')
        new_cat = new_cats[slug]
        if old_cat != new_cat:
            c['category'] = new_cat
            changed += 1
            print(f'  {c["name"]:35s} {old_cat:25s} -> {new_cat}')

print(f'\n{changed} compounds recategorised')

# Also fix compareSlug child entries - they should inherit master category
cs_fixed = 0
for c in data:
    if c.get('compareSlug'):
        master_slug = c['compareSlug']
        # Find master
        master = next((m for m in data if m['slug'] == master_slug), None)
        if master:
            master_cat = master.get('category', '')
            if c.get('category') != master_cat:
                c['category'] = master_cat
                cs_fixed += 1

print(f'{cs_fixed} child entries recategorised to match master')

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2)
print('Saved')
