#!/usr/bin/env python3
"""Add OL Research NAD+ sources to existing nad-plus compound"""
import json

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'

with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)

# Find NAD+ and add OL Research sources
for compound in compounds:
    if compound['id'] == 'nad-plus':
        sources = compound.get('sources', [])
        existing = {s.get('vendor') for s in sources}
        
        if 'OL Research' not in existing:
            sources.append({
                "vendor": "OL Research",
                "url": "https://olresearch.co.uk/product/nad-500mg/",
                "price": "£40.50",
                "inStock": True,
                "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-NAD-500-900x900.webp",
                "dosage": "500mg"
            })
            sources.append({
                "vendor": "OL Research",
                "url": "https://olresearch.co.uk/product/nad-1000mg/",
                "price": "£76.50",
                "inStock": True,
                "image": "https://olresearch.co.uk/wp-content/uploads/2026/03/OLC-NAD-1000-900x900.webp",
                "dosage": "1000mg"
            })
            print("Added OL Research to nad-plus")
        else:
            print("OL Research already in nad-plus")
        break

with open(COMPOUNDS_PATH, 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print("Done!")
