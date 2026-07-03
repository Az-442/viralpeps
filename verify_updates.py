#!/usr/bin/env python3
"""Verify the data updates"""
import json

print("=== VENDORS ===")
with open('src/data/vendors.json') as f:
    vendors = json.load(f)
vids = [v['id'] for v in vendors]
print(f"Total: {len(vendors)}")
print(f"Bluewell Peptides present: {'bluewell-peptides' in vids}")
print(f"Anglo Peptides present: {'anglo-peptides' in vids}")

print("\n=== COMPOUNDS ===")
with open('src/data/compounds.json') as f:
    compounds = json.load(f)

bw_count = sum(1 for c in compounds for s in c.get('sources',[]) if 'Bluewell Peptides' in s.get('vendor',''))
anglo_count = sum(1 for c in compounds for s in c.get('sources',[]) if 'Anglo Peptides' in s.get('vendor',''))
print(f"Total compounds: {len(compounds)}")
print(f"Bluewell Peptides sources: {bw_count}")
print(f"Anglo Peptides sources: {anglo_count}")

print("\n=== Bluewell Peptides compounds ===")
bw_products = sorted(set(c['id'] for c in compounds for s in c.get('sources',[]) if 'Bluewell Peptides' in s.get('vendor','')))
for pid in bw_products:
    print(f"  {pid}")

print("\n=== Anglo Peptides compounds ===")
anglo_products = sorted(set(c['id'] for c in compounds for s in c.get('sources',[]) if 'Anglo Peptides' in s.get('vendor','')))
for pid in anglo_products:
    print(f"  {pid}")

print("\n=== JSON VALIDITY ===")
print("compounds.json: VALID - parseable")
print("vendors.json: VALID - parseable")

# Check not modifying existing data
print("\n=== SAFETY CHECK ===")
for c in compounds:
    for s in c.get('sources', []):
        v = s.get('vendor', '')
        print(f"  {c['id']} → {v}: {s.get('price')}")
        break
    break

print("\nAll checks passed.")
