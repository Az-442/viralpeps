#!/usr/bin/env python3
"""Confirm zero placeholder URLs remain in compounds.json"""
import json, re

with open('src/data/compounds.json') as f:
    data = json.load(f)

total_sources = 0
example_urls = []
homepage_urls = []
vendor_counts = {}

for compound in data:
    cid = compound['id']
    for source in compound.get('sources', []):
        total_sources += 1
        vendor = source.get('vendor', '')
        url = source.get('url', '')
        vendor_counts[vendor] = vendor_counts.get(vendor, 0) + 1

        if 'example' in url.lower():
            example_urls.append(f"{cid:20s} | {vendor:25s} | {url}")

        # Check if URL is just a homepage (no product path)
        if vendor in ['Express Peptides', 'Imperial Peptides UK', 'Research Peptides']:
            parsed = url.split('/')
            domain_parts = [p for p in parsed if p]
            # A homepage has just the domain (3 parts: https:, '', domain.com)
            if len(domain_parts) <= 3:
                homepage_urls.append(f"{cid:20s} | {vendor:25s} | {url}")

print(f"Total source entries: {total_sources}")
print(f"Example.com URLs found: {len(example_urls)}")
for u in example_urls:
    print(f"  {u}")

print(f"\nHomepage-only URLs found: {len(homepage_urls)}")
for u in homepage_urls:
    print(f"  {u}")

print(f"\nSource entries by vendor:")
for v, c in sorted(vendor_counts.items()):
    print(f"  {v:30s}: {c}")
