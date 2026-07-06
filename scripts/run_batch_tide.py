#!/usr/bin/env python3
"""Batch price checker runner - Tide Labs batch (fixed extraction)."""
import json
import re
import sys
import subprocess
sys.path.insert(0, '/Users/time4you/viralpeps/scripts')

def extract_price_tide(html: str) -> float | None:
    """Extract price from Tide Labs (Shopify) page."""
    # The actual product price is always in "amount":XX or "price":"XX.XX" format
    # where XX.XX is the real price (not 4-digit like 2290)
    
    # First try "price": {"amount": X} format
    m = re.search(r'"amount"\s*:\s*(\d+\.?\d*)', html)
    if m:
        val = float(m.group(1))
        if val < 1000:  # Sanity check - peptide prices under £1000
            return val
    
    # Try "price": "X.XXXX" format (with decimal string)
    m = re.search(r'"price"\s*:\s*"(\d+\.\d+)"', html)
    if m:
        val = float(m.group(1))
        if val < 1000:
            return val
    
    # Try "price": X (number format)
    m = re.search(r'"price"\s*:\s*(\d+\.\d+)', html)
    if m:
        val = float(m.group(1))
        if val < 1000:
            return val
    
    # WooCommerce fallback
    m = re.search(r'<ins[^>]*>.*?[£&]pound;?\s*(\d+\.?\d*).*?</ins>', html, re.DOTALL)
    if m:
        val = float(m.group(1))
        if val < 1000:
            return val
    
    # Simple £ match
    m = re.search(r'[£&]pound;?\s*(\d+\.\d{2})', html)
    if m:
        val = float(m.group(1))
        if val < 1000:
            return val
    
    return None

def scrape_url(url: str) -> tuple[float | None, str | None]:
    try:
        result = subprocess.run(
            ["curl", "-sL", "--max-time", "15", url],
            capture_output=True, text=True, timeout=30
        )
        html = result.stdout
        price = extract_price_tide(html)
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

data = json.load(open('/Users/time4you/viralpeps/scripts/batch_tidelabs.json'))

changes = []
for entry in data:
    url = entry['url']
    price, err = scrape_url(url)
    if err or price is None:
        print(f"ERROR: {entry['vendor']} - {entry['compound_slug']}: {err} ({entry['current_price']})")
    else:
        changed, pct = compare_prices(entry['current_price'], price)
        if changed:
            print(f"CHANGED: {entry['vendor']} - {entry['compound_slug']}: {entry['current_price']} -> £{price:.2f} ({pct:.1f}% diff)")
            changes.append(entry)
        else:
            print(f"OK: {entry['vendor']} - {entry['compound_slug']}: £{price:.2f} (stored: {entry['current_price']})")

print(f"\n--- SUMMARY ---")
print(f"Total checked: {len(data)}")
print(f"Changes found: {len(changes)}")
for c in changes:
    print(f"  UPDATE: {c['vendor']} | {c['compound_slug']} | {c['current_price']} -> need to scrape again")
