#!/usr/bin/env python3
"""Fix: add missing Peptigen Labs dosage variants that were skipped."""
import json

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'
compounds = json.load(open(COMPOUNDS_PATH))
compounds_by_slug = {c['slug']: c for c in compounds}
count = 0

# Missing variants for Peptigen Labs:
# Semax 5mg
compounds_by_slug['semax']['sources'].append({
    'vendor': 'Peptigen Labs',
    'url': 'https://peptigenlabs.co.uk/products/PL-SMX-5',
    'price': '£29.99',
    'inStock': True,
    'image': '/images/products/peptigen-labs/semax-5mg.png',
    'dosage': '5mg'
})
count += 1
print("Added Peptigen Labs Semax 5mg")

# Retatrutide 20mg
compounds_by_slug['retatrutide']['sources'].append({
    'vendor': 'Peptigen Labs',
    'url': 'https://peptigenlabs.co.uk/products/PL-RET-20',
    'price': '£99.99',
    'inStock': True,
    'image': '/images/products/peptigen-labs/retatrutide-20mg.png',
    'dosage': '20mg'
})
count += 1
print("Added Peptigen Labs Retatrutide 20mg")

# Retatrutide 30mg
compounds_by_slug['retatrutide']['sources'].append({
    'vendor': 'Peptigen Labs',
    'url': 'https://peptigenlabs.co.uk/products/PL-RET-30',
    'price': '£139.99',
    'inStock': True,
    'image': '/images/products/peptigen-labs/retatrutide-30mg.png',
    'dosage': '30mg'
})
count += 1
print("Added Peptigen Labs Retatrutide 30mg")

# Bacteriostatic Water 10ml
compounds_by_slug['bacteriostatic-water']['sources'].append({
    'vendor': 'Peptigen Labs',
    'url': 'https://peptigenlabs.co.uk/products/PL-BACT-10',
    'price': '£7.99',
    'inStock': True,
    'image': '/images/products/peptigen-labs/bacteriostatic-water-10ml.png',
    'dosage': '10ml'
})
count += 1
print("Added Peptigen Labs Bacteriostatic Water 10ml")

json.dump(compounds, open(COMPOUNDS_PATH, 'w'), indent=2)
print(f"\nAdded {count} missing source entries")
