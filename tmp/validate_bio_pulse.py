#!/usr/bin/env python3
"""Validate Bio Pulse Peptides data"""
import json
from pathlib import Path

BASE = Path("/Users/time4you/viralpeps")

# Check vendors.json
vendors = json.load(open(BASE / "src/data/vendors.json"))
vendor = [v for v in vendors if v["id"] == "bio-pulse-peptides"]
print(f"vendors.json: valid ({len(vendors)} total)")
print(f"Bio Pulse Peptides vendor entry: {'FOUND' if vendor else 'MISSING'}")

# Check compounds.json
compounds = json.load(open(BASE / "src/data/compounds.json"))
matches = [c for c in compounds if any(s.get("vendor")=="Bio Pulse Peptides" for s in c.get("sources",[]))]
print(f"compounds.json: valid ({len(compounds)} total)")
print(f"Bio Pulse Peptides source entries: {len(matches)}")
for c in matches:
    sources = [s for s in c["sources"] if s["vendor"]=="Bio Pulse Peptides"]
    for s in sources:
        print(f"  - {c['id']}: {s['price']} -> {s.get('image','NO IMAGE')}")

# Check images
img_dir = BASE / "public/images/products/bio-pulse-peptides"
if img_dir.exists():
    files = list(img_dir.iterdir())
    print(f"\nProduct images: {len(files)} files")
    for f in files:
        print(f"  {f.name} ({f.stat().st_size//1024}KB)")
else:
    print(f"\nMISSING: {img_dir}")

logo = BASE / "public/images/vendors/bio-pulse-peptides.png"
if logo.exists():
    print(f"\nVendor logo: {logo.name} ({logo.stat().st_size//1024}KB)")
else:
    print(f"\nMISSING vendor logo")

print("\n--- DONE ---")
