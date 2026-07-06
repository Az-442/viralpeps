#!/usr/bin/env python3
"""Batch price checker runner - UK Peptides batch (with SPA extraction fix)."""
import json
import re
import sys
import subprocess
sys.path.insert(0, '/Users/time4you/viralpeps/scripts')

def extract_price_ukp(html: str) -> float | None:
    """Extract price from UK Peptides SPA page (prices in JSON in script tags)."""
    # Look for price: <number> patterns in JSON-like structures
    # UK Peptides embeds product data like: price:29.99 or "price":29.99
    patterns = [
        r'"price"\s*:\s*(\d+\.?\d*)',
        r'price:(\d+\.?\d*)',
    ]
    for p in patterns:
        matches = re.findall(p, html)
        if matches:
            # Return the first price value found (base price)
            return float(matches[0])
    return None

def scrape_url(url: str) -> tuple[float | None, str | None]:
    try:
        result = subprocess.run(
            ["curl", "-sL", "--max-time", "15", url],
            capture_output=True, text=True, timeout=30
        )
        html = result.stdout
        price = extract_price_ukp(html)
        if price:
            return price, None
        return None, "no_price_found"
    except subprocess.TimeoutExpired:
        return None, "timeout"
    except Exception as e:
        return None, str(e)

def compare_prices(stored: str, scraped: float) -> tuple[bool, float]:
    stored_str = stored.replace('£', '').replace('&pound;', '').replace('&#163;', '').strip()
    if stored_str == '—' or '–' in stored_str:
        return False, 0
    
    try:
        if '–' in stored_str or '-' in stored_str:
            return False, 0
        stored_val = float(stored_str)
    except ValueError:
        return False, 0
    
    if stored_val == 0:
        return False, 0
    
    pct_diff = abs(scraped - stored_val) / stored_val * 100
    return pct_diff > 5, pct_diff

data = json.load(open('/Users/time4you/viralpeps/scripts/batch_ukp.json'))

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
