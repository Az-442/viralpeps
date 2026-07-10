#!/usr/bin/env python3
"""Add new supplier sources to compounds.json"""
import json
import sys

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'r') as f:
    data = json.load(f)

# Define the new sources to add for each compound
new_sources_map = {
    'retatrutide': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/retatrutide-20mg-99-69-purity", "price": "\u00a380.00", "inStock": True, "image": "/images/products/the-peptide-code/retatrutide-20mg.jpg", "dosage": "20mg"},
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/retatrutide-30mg", "price": "\u00a390.00", "inStock": True, "image": "/images/products/the-peptide-code/retatrutide-30mg.png", "dosage": "30mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/retatrutide-20mg/", "price": "\u00a3150.00", "inStock": True, "image": "/images/products/raw-peptides/retatrutide-20mg.jpg", "dosage": "20mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/retatrutide-30mg/", "price": "\u00a3165.00", "inStock": True, "image": "/images/products/raw-peptides/retatrutide-30mg.jpg", "dosage": "30mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/retatrutide-40mg/", "price": "\u00a3180.00", "inStock": True, "image": "/images/products/raw-peptides/retatrutide-40mg.jpg", "dosage": "40mg"}
    ],
    'tirzepatide': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/tirzepatide-20mg", "price": "\u00a360.00", "inStock": True, "image": "/images/products/the-peptide-code/tirzepatide-20mg.png", "dosage": "20mg"},
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/tirzepatide-30mg", "price": "\u00a370.00", "inStock": True, "image": "/images/products/the-peptide-code/tirzepatide-30mg.jpg", "dosage": "30mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-2-5mg/", "price": "\u00a3110.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "2.5mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-5mg/", "price": "\u00a3120.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "5mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-7-5mg/", "price": "\u00a3135.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "7.5mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-10mg/", "price": "\u00a3145.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "10mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-12-5mg/", "price": "\u00a3155.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "12.5mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/tirzepatide-15mg/", "price": "\u00a3165.00", "inStock": True, "image": "/images/products/raw-peptides/tirzepatide.jpg", "dosage": "15mg"}
    ],
    'semaglutide': [
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/semaglutide-30mg/", "price": "\u00a3119.99", "inStock": True, "image": "/images/products/raw-peptides/semaglutide-30mg.jpg", "dosage": "30mg"}
    ],
    'bpc-157': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/bpc-157-10mg", "price": "\u00a322.99", "inStock": True, "image": "/images/products/the-peptide-code/bpc-157-10mg.jpg"}
    ],
    'wolverine-stack-bpc157-tb500-blend': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/bpc-157-tb-500-blend", "price": "\u00a342.99", "inStock": True, "image": "/images/products/the-peptide-code/bpc-157-tb500-blend.jpg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/bpc157-10mg-tb500-10mg/", "price": "\u00a389.99", "inStock": True, "image": "/images/products/raw-peptides/bpc157-tb500.jpg"}
    ],
    'cjc-1295': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/cjc-1295-ipamorelin-uk-research", "price": "\u00a344.99", "inStock": True, "image": "/images/products/the-peptide-code/cjc-1295-ipamorelin.jpg"}
    ],
    'epitalon': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/epithalon-10mg", "price": "\u00a314.99", "inStock": True, "image": "/images/products/the-peptide-code/epithalon-10mg.jpg"}
    ],
    'ghk-cu': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/ghk-cu-100mg", "price": "\u00a332.99", "inStock": True, "image": "/images/products/the-peptide-code/ghk-cu-100mg.jpg"}
    ],
    'mt2': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/melanotan-ii-10mg", "price": "\u00a314.99", "inStock": True, "image": "/images/products/the-peptide-code/melanotan-ii-10mg.jpg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/mt2-30mg/", "price": "\u00a389.99", "inStock": True, "image": "/images/products/raw-peptides/mt2-30mg.jpg", "dosage": "30mg"}
    ],
    'mots-c': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/mots-c-10mg", "price": "\u00a314.99", "inStock": True, "image": "/images/products/the-peptide-code/mots-c-10mg.jpg", "dosage": "10mg"},
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/mots-c-40mg-uk-research-peptide", "price": "\u00a339.99", "inStock": True, "image": "/images/products/the-peptide-code/mots-c-40mg.jpg", "dosage": "40mg"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/mots-c-40mg/", "price": "\u00a3129.99", "inStock": True, "image": "/images/products/raw-peptides/mots-c-40mg.png", "dosage": "40mg"}
    ],
    'ss-31': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/ss-31-10mg", "price": "\u00a334.99", "inStock": True, "image": "/images/products/the-peptide-code/ss31-10mg.png"}
    ],
    'tesamorelin': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/tesamorelin-10mg", "price": "\u00a329.99", "inStock": True, "image": "/images/products/the-peptide-code/tesamorelin-10mg.jpg"}
    ],
    'semax': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/semax-10mg", "price": "\u00a322.99", "inStock": True, "image": "/images/products/the-peptide-code/semax-10mg.jpg"}
    ],
    'selank': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/selank-10mg", "price": "\u00a324.99", "inStock": True, "image": "/images/products/the-peptide-code/selank-10mg.png"}
    ],
    'sermorelin': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/sermorelin-10mg", "price": "\u00a324.99", "inStock": True, "image": "/images/products/the-peptide-code/sermorelin-10mg.jpg"}
    ],
    'glow': [
        {"vendor": "ThePeptideCode", "url": "https://thepeptidecode.co.uk/products/glow70-peptide-pen", "price": "\u00a390.00", "inStock": True, "image": "/images/products/the-peptide-code/glow70-pen.png"},
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/glow-70mg/", "price": "\u00a389.99", "inStock": True, "image": "/images/products/raw-peptides/glow-70mg.jpg"}
    ],
    'dsip': [
        {"vendor": "Raw Peptides", "url": "https://rawpeptides.co.uk/product/dsip-10mg/", "price": "\u00a389.99", "inStock": True, "image": "/images/products/raw-peptides/dsip-10mg.png"}
    ]
}

changes = 0
for compound in data:
    cid = compound['id']
    if cid in new_sources_map:
        compound['sources'].extend(new_sources_map[cid])
        changes += len(new_sources_map[cid])
        print(f"Added {len(new_sources_map[cid])} sources to {cid}")

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=True)

print(f"\nTotal: {changes} source entries added across {len(new_sources_map)} compounds")
