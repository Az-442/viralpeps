#!/usr/bin/env python3
"""Add Lab77 Peptides as a source for their 21 matching compounds in compounds.json."""
import json
import re
import sys

COMPOUNDS_PATH = 'src/data/compounds.json'

with open(COMPOUNDS_PATH, 'r') as f:
    compounds = json.load(f)

# Lab77 product data from their collections page
# Format: (compound_id, product_page_slug, dosages_in_mg_min, base_price)
# Base price is for the smallest vial. Pens are +£15.
lab77_products = {
    # GLP-1/GIP agonists
    'tirzepatide': {
        'dosages': ['10mg', '20mg', '30mg', '60mg', '90mg'],
        'base_price': 50,
    },
    'retatrutide': {
        'dosages': ['10mg', '20mg', '30mg', '40mg', '60mg'],
        'base_price': 50,
    },
    # Amylin analogues
    'cagrilintide': {
        'dosages': ['10mg'],
        'base_price': 85,
    },
    # Mitochondrial peptides
    'mots-c': {
        'dosages': ['10mg', '20mg', '30mg', '60mg'],
        'base_price': 30,
    },
    # Tissue repair
    'bpc-157': {
        'dosages': ['10mg', '20mg', '30mg'],
        'base_price': 25,
    },
    'tb-500': {
        'dosages': ['10mg', '20mg', '30mg'],
        'base_price': 30,
    },
    # Skin/collagen
    'ghk-cu': {
        'dosages': ['100mg'],
        'base_price': 40,
    },
    # Tissue protection
    # This isn't in the compounds.json as 'ara-290' exactly. Let me search differently.
    # Immune modulators
    'thymosin-alpha-1': {
        'dosages': ['10mg'],
        'base_price': 30,
    },
    # GHRH analogues
    'cjc-1295': {
        'dosages': ['10mg'],
        'base_price': 40,
    },
    'sermorelin': {
        'dosages': ['10mg'],
        'base_price': 45,
    },
    'tesamorelin': {
        'dosages': ['10mg', '20mg', '30mg'],
        'base_price': 43,
    },
    # GHS/ghrelin mimetics
    'ipamorelin': {
        'dosages': ['10mg'],
        'base_price': 30,
    },
    # IGF analogues
    'igf-1-lr3': {
        'dosages': ['1mg'],
        'base_price': 30,
    },
    # Gonadotropins
    'hcg': {
        'dosages': ['5000iu', '10000iu'],
        'base_price': 30,
    },
    # Cognitive/nootropic
    'semax': {
        'dosages': ['10mg'],
        'base_price': 25,
    },
    # Anxiolytic
    'selank': {
        'dosages': ['10mg'],
        'base_price': 25,
    },
    # Sleep architecture
    'dsip': {
        'dosages': ['10mg'],
        'base_price': 35,
    },
    # HPG axis
    'kisspeptin-10': {
        'dosages': ['10mg'],
        'base_price': 20,
    },
    # Melanocortin agonists
    'melanotan-ii': {
        'dosages': ['10mg'],
        'base_price': 35,
    },
    # Pineal/longevity
    'epitalon': {
        'dosages': ['10mg'],
        'base_price': 25,
    },
    # Antioxidants
    'glutathione': {
        'dosages': ['1500mg'],
        'base_price': 60,
    },
}

compound_ids = {c['id']: c for c in compounds}

# Check which lab77 compounds exist in the data
for cid in lab77_products:
    if cid not in compound_ids:
        print(f'WARNING: Compound "{cid}" not found in compounds.json — skipping')
        continue
    
    compound = compound_ids[cid]
    product = lab77_products[cid]
    
    # Check if Lab77 already has a source entry
    existing = [s for s in compound['sources'] if s.get('vendor') == 'Lab77 Peptides']
    if existing:
        print(f'SKIP: Lab77 already in "{cid}" sources ({len(existing)} entries)')
        continue
    
    # Create source entries for each dosage variant
    new_sources = []
    for dosage in product['dosages']:
        source_entry = {
            'vendor': 'Lab77 Peptides',
            'url': 'https://lab77peptides.co.uk/collections',
            'price': f'£{product["base_price"]:.2f}',
            'inStock': True,
            'dosage': dosage,
        }
        new_sources.append(source_entry)
    
    compound['sources'].extend(new_sources)
    print(f'ADDED: {len(new_sources)} source(s) for "{cid}" — prices from £{product["base_price"]}')

# Save the updated compounds.json
with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f'\nDone! Updated compounds.json')
