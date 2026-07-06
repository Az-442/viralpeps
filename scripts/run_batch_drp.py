#!/usr/bin/env python3
"""Batch price checker runner - Dr P Research batch."""
import json
import sys
import os

# Add scripts dir to path
sys.path.insert(0, '/Users/time4you/viralpeps/scripts')

from price_checker import scrape_url, compare_prices

data = json.load(open('/Users/time4you/viralpeps/scripts/batch_drp.json'))

for entry in data:
    url = entry['url']
    price, err = scrape_url(url)
    if err or price is None:
        print(f"ERROR: {entry['vendor']} - {entry['compound_slug']}: {err}")
    else:
        changed, pct = compare_prices(entry['current_price'], price)
        if changed:
            print(f"CHANGED: {entry['vendor']} - {entry['compound_slug']}: {entry['current_price']} -> £{price:.2f} ({pct:.1f}% diff)")
        else:
            print(f"OK: {entry['vendor']} - {entry['compound_slug']}: £{price:.2f} (stored: {entry['current_price']})")
