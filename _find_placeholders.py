#!/usr/bin/env python3
import json

with open('src/data/compounds.json') as f:
    data = json.load(f)

target_vendors = ['Express Peptides', 'Imperial Peptides UK', 'Research Peptides']
problematic = []

for compound in data:
    for source in compound.get('sources', []):
        vendor = source.get('vendor', '')
        url = source.get('url', '')
        if vendor in target_vendors:
            if 'example' in url.lower() or url == '' or url is None:
                problematic.append({
                    'compound': compound['name'],
                    'vendor': vendor,
                    'url': url
                })

print(f'Found {len(problematic)} placeholder entries:')
for p in problematic:
    print(f"  {p['compound']:30s} | {p['vendor']:22s} | {p['url']}")
