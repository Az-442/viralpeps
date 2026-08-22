#!/usr/bin/env python3
"""Add Bio Pulse Peptides source entries to compounds.json"""
import json
import re
from pathlib import Path

DATA_DIR = Path("/Users/time4you/viralpeps/src/data")
COMPOUNDS_FILE = DATA_DIR / "compounds.json"

# Bio Pulse Peptides product -> compound ID mapping
products = [
    {
        "compound_id": "bpc-157",
        "url": "https://biopulsepeptides.co.uk/shop/bpc-157-10mg/",
        "price": "£20.00",
        "image": "/images/products/bio-pulse-peptides/bpc-157.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "cjc-1295",
        "url": "https://biopulsepeptides.co.uk/shop/cjc-1295-no-dac-5mg/",
        "price": "£20.00",
        "image": "/images/products/bio-pulse-peptides/cjc-1295.webp",
        "dosage": "5mg"
    },
    {
        "compound_id": "dsip",
        "url": "https://biopulsepeptides.co.uk/shop/dsip/",
        "price": "£20.00",
        "image": "/images/products/bio-pulse-peptides/dsip.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "ghk-cu",
        "url": "https://biopulsepeptides.co.uk/shop/ghk-cu-100mg/",
        "price": "£30.00",
        "image": "/images/products/bio-pulse-peptides/ghk-cu.webp",
        "dosage": "100mg"
    },
    {
        "compound_id": "bacteriostatic-water",
        "url": "https://biopulsepeptides.co.uk/shop/hospira-bacteriostatic-water-30ml/",
        "price": "£25.00",
        "image": "/images/products/bio-pulse-peptides/bacteriostatic-water.webp",
        "dosage": "30ml"
    },
    {
        "compound_id": "ipamorelin",
        "url": "https://biopulsepeptides.co.uk/shop/ipamorelin/",
        "price": "£20.00",
        "image": "/images/products/bio-pulse-peptides/ipamorelin.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "mots-c",
        "url": "https://biopulsepeptides.co.uk/shop/mots-c/",
        "price": "£22.99",
        "image": "/images/products/bio-pulse-peptides/mots-c.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "nad-plus",
        "url": "https://biopulsepeptides.co.uk/shop/nad-500mg/",
        "price": "£44.99",
        "image": "/images/products/bio-pulse-peptides/nad-plus.webp",
        "dosage": "500mg"
    },
    {
        "compound_id": "pt-141",
        "url": "https://biopulsepeptides.co.uk/shop/pt-141-10mg/",
        "price": "£20.00",
        "image": "/images/products/bio-pulse-peptides/pt-141.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "ss-31",
        "url": "https://biopulsepeptides.co.uk/shop/ss-31-10mg/",
        "price": "£19.99",
        "image": "/images/products/bio-pulse-peptides/ss-31.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "tb-500",
        "url": "https://biopulsepeptides.co.uk/shop/tb-500/",
        "price": "£22.00",
        "image": "/images/products/bio-pulse-peptides/tb-500.webp",
        "dosage": "10mg"
    },
    {
        "compound_id": "tesamorelin",
        "url": "https://biopulsepeptides.co.uk/shop/tesamorelin-10mg/",
        "price": "£35.99",
        "image": "/images/products/bio-pulse-peptides/tesamorelin.webp",
        "dosage": "10mg"
    }
]

with open(COMPOUNDS_FILE, 'r') as f:
    data = json.load(f)

added_count = 0
for prod in products:
    compound_id = prod["compound_id"]
    # Find the compound
    for compound in data:
        if compound.get("id") == compound_id:
            if "sources" not in compound:
                compound["sources"] = []
            
            # Check if Bio Pulse Peptides already has an entry
            already_exists = any(
                s.get("vendor") == "Bio Pulse Peptides" for s in compound["sources"]
            )
            if already_exists:
                print(f"  SKIP {compound_id}: already has Bio Pulse Peptides source")
                continue
            
            source_entry = {
                "vendor": "Bio Pulse Peptides",
                "url": prod["url"],
                "price": prod["price"],
                "inStock": True,
                "image": prod["image"]
            }
            if "dosage" in prod:
                source_entry["dosage"] = prod["dosage"]
            
            compound["sources"].append(source_entry)
            added_count += 1
            print(f"  ADDED {compound_id}: {prod['price']}")
            break
    else:
        print(f"  SKIP {compound_id}: compound not found in database")

print(f"\nTotal source entries added: {added_count}")

if added_count > 0:
    with open(COMPOUNDS_FILE, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Written to {COMPOUNDS_FILE}")
else:
    print("No changes to write")
