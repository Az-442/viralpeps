#!/usr/bin/env python3
"""Verify Bio Peptides UK sources in compounds.json"""
import json

COMPOUNDS_PATH = '/Users/time4you/viralpeps/src/data/compounds.json'
VENDOR_NAME = 'Bio Peptides UK'

with open(COMPOUNDS_PATH) as f:
    compounds = json.load(f)

# 1. URL Check
print("=== URL CHECK ===")
bad_urls = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == VENDOR_NAME:
            u = s.get('url', '')
            if '/shop/' in u or '/collections/' in u or 'page/' in u or not u.startswith('http'):
                print(f'BAD URL: {c["id"]} -> {u}')
                bad_urls += 1
print(f'{bad_urls} bad URLs found')

# 2. Image Format Check
print("\n=== IMAGE FORMAT CHECK ===")
bad_images = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == VENDOR_NAME and 'image' in s:
            img = s.get('image', '')
            if not img.startswith('/images/products/') and not img.startswith('http'):
                print(f'UNEXPECTED IMG: {c["id"]} -> {img}')
                bad_images += 1
print(f'{bad_images} unexpected image formats found')

# 3. Total Count
print("\n=== COUNT CHECK ===")
total = sum(1 for c in compounds for s in c.get('sources', []) if s['vendor'] == VENDOR_NAME)
print(f'{VENDOR_NAME}: {total} total source entries')

# 4. List all compounds with sources from this vendor
print("\n=== COMPOUNDS WITH SOURCES ===")
for c in compounds:
    sources = [s for s in c.get('sources', []) if s['vendor'] == VENDOR_NAME]
    if sources:
        for s in sources:
            print(f'  {c["id"]} | {s.get("dosage","?")} | {s.get("price","?")} | {s.get("url","?")}')
