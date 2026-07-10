#!/usr/bin/env python3
"""Add new supplier sources to compounds.json for retatrutide"""
import json
import sys

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'r') as f:
    data = json.load(f)

# Find retatrutide compound
for compound in data:
    if compound['id'] == 'retatrutide':
        new_sources = [
            {
                "vendor": "ThePeptideCode",
                "url": "https://thepeptidecode.co.uk/products/retatrutide-20mg-99-69-purity",
                "price": "£80.00",
                "inStock": True,
                "image": "/images/products/the-peptide-code/retatrutide-20mg.jpg",
                "dosage": "20mg"
            },
            {
                "vendor": "ThePeptideCode",
                "url": "https://thepeptidecode.co.uk/products/retatrutide-30mg",
                "price": "£90.00",
                "inStock": True,
                "image": "/images/products/the-peptide-code/retatrutide-30mg.png",
                "dosage": "30mg"
            },
            {
                "vendor": "Raw Peptides",
                "url": "https://rawpeptides.co.uk/product/retatrutide-20mg/",
                "price": "£150.00",
                "inStock": True,
                "image": "/images/products/raw-peptides/retatrutide-20mg.jpg",
                "dosage": "20mg"
            },
            {
                "vendor": "Raw Peptides",
                "url": "https://rawpeptides.co.uk/product/retatrutide-30mg/",
                "price": "£165.00",
                "inStock": True,
                "image": "/images/products/raw-peptides/retatrutide-30mg.jpg",
                "dosage": "30mg"
            },
            {
                "vendor": "Raw Peptides",
                "url": "https://rawpeptides.co.uk/product/retatrutide-40mg/",
                "price": "£180.00",
                "inStock": True,
                "image": "/images/products/raw-peptides/retatrutide-40mg.jpg",
                "dosage": "40mg"
            }
        ]
        compound['sources'].extend(new_sources)
        print(f"Added {len(new_sources)} sources to retatrutide")
        break
else:
    print("ERROR: retatrutide not found")
    sys.exit(1)

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Done - compounds.json updated")
