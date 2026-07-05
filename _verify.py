#!/usr/bin/env python3
"""Verify the data additions."""
import json

with open('src/data/vendors.json') as f:
    vendors = json.load(f)
for v in vendors:
    if v['id'] in ['xl-peptides', 'chroma-peptides']:
        print(f'✅ {v["name"]} - {v["website"]}')
        print(f'   Highlights: {len(v["highlights"])}')
        print(f'   Shipping: {v["shipping"]}')
        print(f'   Payment: {v["payment"]}')
        print()

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

xl_count = sum(1 for c in compounds for s in c.get('sources',[]) if 'XL Peptides' in s.get('vendor',''))
chroma_count = sum(1 for c in compounds for s in c.get('sources',[]) if 'Chroma Peptides' in s.get('vendor',''))

print(f'--- Source Counts ---')
print(f'XL Peptides: {xl_count} sources across compounds')
print(f'Chroma Peptides: {chroma_count} sources across compounds')

print(f'\n--- XL Peptides product coverage ---')
for c in compounds:
    for s in c.get('sources',[]):
        if 'XL Peptides' in s.get('vendor',''):
            print(f'  {c["name"]:30s} | {s["price"]:10s} | {s.get("dosage","N/A")}')
            break

print(f'\n--- Chroma Peptides product coverage ---')
for c in compounds:
    for s in c.get('sources',[]):
        if 'Chroma Peptides' in s.get('vendor',''):
            print(f'  {c["name"]:35s} | {s["price"]:10s} | {s.get("dosage","N/A"):10s} | {"In Stock" if s["inStock"] else "SOLD OUT"}')
            break
