#!/usr/bin/env python3
"""Update Tide Labs entries where I confirmed product page URLs and prices."""

import json

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'r') as f:
    data = json.load(f)

# Only confirmed product page URLs from scraping
tide_updates = {
    "bpc-157": ("https://tidelabs.co.uk/products/bpc-157", "£16.90"),
    "cjc-1295": ("https://tidelabs.co.uk/products/cjc-1295", "£13.90"),
}

updates_count = 0
for compound in data:
    slug = compound.get("slug", "")
    if slug in tide_updates:
        new_url, new_price = tide_updates[slug]
        for source in compound.get("sources", []):
            if source.get("vendor") == "Tide Labs":
                old_url = source.get("url", "")
                old_price = source.get("price", "")
                source["url"] = new_url
                source["price"] = new_price
                updates_count += 1
                print(f"UPDATED: {slug} - Tide Labs")
                print(f"  URL: {old_url} -> {new_url}")
                print(f"  Price: {old_price} -> {new_price}")

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nTotal Tide Labs updates: {updates_count}")
