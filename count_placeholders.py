#!/usr/bin/env python3
"""Count placeholder URLs remaining in compounds.json."""
import json

with open('/Users/time4you/viralpeps/src/data/compounds.json') as f:
    data = json.load(f)

total_sources = 0
placeholder_urls = 0
homepage_urls = 0
real_urls = 0
by_vendor = {}

for compound in data:
    slug = compound.get("slug", "")
    for source in compound.get("sources", []):
        vendor = source.get("vendor", "")
        url = source.get("url", "")
        total_sources += 1
        if "example.com" in url:
            placeholder_urls += 1
            by_vendor.setdefault(vendor, {"placeholder": 0, "homepage": 0, "real": 0})
            by_vendor[vendor]["placeholder"] += 1
        elif url.count("/") <= 2 or url.endswith(".co.uk") or url.endswith(".com"):
            homepage_urls += 1
            by_vendor.setdefault(vendor, {"placeholder": 0, "homepage": 0, "real": 0})
            by_vendor[vendor]["homepage"] += 1
        else:
            real_urls += 1
            by_vendor.setdefault(vendor, {"placeholder": 0, "homepage": 0, "real": 0})
            by_vendor[vendor]["real"] += 1

print(f"Total source entries: {total_sources}")
print(f"Placeholder URLs (example.com): {placeholder_urls}")
print(f"Homepage-only URLs: {homepage_urls}")
print(f"Specific product URLs: {real_urls}")
print()
print("By Vendor:")
for v, counts in sorted(by_vendor.items()):
    print(f"  {v:25s} Placeholder={counts['placeholder']:3d}  Homepage={counts['homepage']:3d}  Product={counts['real']:3d}")
