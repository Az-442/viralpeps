#!/usr/bin/env python3
"""Scrape and compare peptide prices against stored data."""

import json
import re
import subprocess
import sys
from pathlib import Path

DATA_FILE = Path("/Users/time4you/viralpeps/src/data/compounds.json")
SCRIPT_DIR = Path("/Users/time4you/viralpeps/scripts")

def extract_price(html: str) -> float | None:
    """Extract the current/sale price from WooCommerce HTML."""
    # Look for ins (sale price) first
    ins_pattern = re.compile(r'<ins[^>]*>.*?£?(\d+\.?\d*).*?</ins>', re.DOTALL)
    ins_match = ins_pattern.search(html)
    if ins_match:
        try:
            return float(ins_match.group(1))
        except ValueError:
            pass
    
    # Look for price in the format: <span class="woocommerce-Price-amount amount">
    price_pattern = re.compile(r'woocommerce-Price-currencySymbol[^>]*>\s*(?:£|&pound;|&#163;)?\s*(\d+\.?\d*)', re.IGNORECASE)
    matches = price_pattern.findall(html)
    for m in matches:
        try:
            return float(m)
        except ValueError:
            pass
    
    # Fallback: simple £ prefix
    simple = re.findall(r'[£&]pound;?\s*(\d+\.\d+|\d+)', html)
    if simple:
        try:
            return float(simple[0])
        except ValueError:
            pass
    
    return None

def scrape_url(url: str) -> tuple[float | None, str | None]:
    """Scrape a single URL and return (price, error)."""
    try:
        result = subprocess.run(
            ["curl", "-sL", "--max-time", "15", url],
            capture_output=True, text=True, timeout=30
        )
        html = result.stdout
        price = extract_price(html)
        if price:
            return price, None
        # Age gate might block - some sites require cookie/age verification
        if "age-gate" in html.lower():
            return None, "age_gate"
        return None, "no_price_found"
    except subprocess.TimeoutExpired:
        return None, "timeout"
    except Exception as e:
        return None, str(e)

def compare_prices(stored: str, scraped: float) -> tuple[bool, float]:
    """Compare stored vs scraped price. Returns (has_changed, pct_diff)."""
    # Parse stored price - it might have £ prefix
    stored_str = stored.replace('£', '').replace('&pound;', '').replace('&#163;', '').strip()
    if stored_str == '—' or '–' in stored_str:
        return False, 0  # Range/missing prices can't be compared
    
    try:
        # Handle ranges like "£29.00 – £59.00"
        if '–' in stored_str or '-' in stored_str:
            return False, 0
        stored_val = float(stored_str)
    except ValueError:
        return False, 0
    
    if stored_val == 0:
        return False, 0
    
    pct_diff = abs(scraped - stored_val) / stored_val * 100
    return pct_diff > 5, pct_diff

def find_source_in_compound(compound: dict, vendor_name: str) -> dict | None:
    """Find a source entry in a compound by vendor name."""
    for source in compound.get("sources", []):
        if source.get("vendor_name") == vendor_name:
            return source
    return None

def main():
    scraper_entries = json.loads(sys.stdin.read())
    
    if not DATA_FILE.exists():
        print(f"ERROR: Data file {DATA_FILE} not found")
        return
    
    compounds_data = json.loads(DATA_FILE.read_text())
    
    changes = []
    checked = 0
    errors = []
    no_changes = 0
    
    for entry in scraper_entries:
        url = entry.get("url", "")
        compound_slug = entry.get("compound_slug", "")
        vendor = entry.get("vendor", "")
        stored_price = entry.get("current_price", "")
        stored_in_stock = entry.get("in_stock", True)
        
        if not url or not compound_slug:
            continue
        
        checked += 1
        scraped_price, error = scrape_url(url)
        
        if error or scraped_price is None:
            errors.append({"vendor": vendor, "compound": compound_slug, "error": error or "scraped_none", "url": url, "stored": stored_price})
            continue
        
        has_changed, pct_diff = compare_prices(stored_price, scraped_price)
        
        if has_changed:
            changes.append({
                "vendor": vendor, "compound": compound_slug, 
                "stored": stored_price, "scraped": f"£{scraped_price:.2f}",
                "pct_diff": f"{pct_diff:.1f}%", "url": url
            })
            
            # Update the compounds.json file
            for compound in compounds_data:
                if compound.get("slug") == compound_slug:
                    source = find_source_in_compound(compound, vendor)
                    if source:
                        source["price"] = f"£{scraped_price:.2f}"
                        print(f"UPDATED: {vendor} - {compound_slug}: {stored_price} -> £{scraped_price:.2f}")
        else:
            no_changes += 1
    
    # Write updated compounds.json if changes were made
    if changes:
        DATA_FILE.write_text(json.dumps(compounds_data, indent=2))
        print(f"\nWritten updated compounds.json with {len(changes)} price changes")
    
    # Report summary
    print(f"\n{'='*60}")
    print(f"PRICE CHECKER REPORT")
    print(f"{'='*60}")
    print(f"Total URLs checked: {checked}")
    print(f"Prices unchanged: {no_changes}")
    print(f"Prices changed: {len(changes)}")
    print(f"Errors: {len(errors)}")
    
    if changes:
        print(f"\n--- PRICE CHANGES ---")
        for c in changes:
            print(f"  {c['vendor']} | {c['compound']}: {c['stored']} -> {c['scraped']} ({c['pct_diff']} diff)")
    
    if errors:
        print(f"\n--- ERRORS ---")
        for e in errors:
            print(f"  {e['vendor']} | {e['compound']}: {e['error']} (stored: {e['stored']})")
            print(f"    URL: {e['url']}")

if __name__ == "__main__":
    main()
