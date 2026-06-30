#!/usr/bin/env python3
import json

with open('src/data/compounds.json') as f:
    data = json.load(f)

target_vendors = ['Express Peptides', 'Imperial Peptides UK', 'Research Peptides']

# Show all entries for these vendors
all_entries = []
for compound in data:
    for source in compound.get('sources', []):
        vendor = source.get('vendor', '')
        if vendor in target_vendors:
            all_entries.append({
                'compound': compound['name'],
                'vendor': vendor,
                'url': source.get('url', ''),
                'price': source.get('price', ''),
                'inStock': source.get('inStock', False)
            })

# Group by vendor
from collections import defaultdict
by_vendor = defaultdict(list)
for e in all_entries:
    by_vendor[e['vendor']].append(e)

for vendor, entries in sorted(by_vendor.items()):
    print(f"\n=== {vendor} ({len(entries)} entries) ===")
    for e in entries:
        url_domain = e['url'].split('/')[2] if '//' in e['url'] else e['url']
        print(f"  {e['compound']:30s} | {e['url'][:80]:80s} | {e['price']:10s} | stock={e['inStock']}")
