#!/usr/bin/env python3
"""
Post-addition verification script for ViralPeps supplier data.
Usage: python3 scripts/verify_supplier.py [vendor_name]

Checks:
1. No orphan sources (vendor names in sources must match vendors.json)
2. All image fields are actual CDN URLs (start with http)
3. All URL fields are product-specific (not generic shop URLs)
4. Product counts (total sources, unique compounds)
5. Vendor logos exist
6. URL resolution: sample 3 product URLs via HEAD request (optional, needs network)
7. Image URL resolution: sample 3 image URLs via HEAD request (optional, needs network)
"""
import json, sys, os, urllib.request
from pathlib import Path

DATA = Path(__file__).parent.parent / 'src' / 'data'
PUBLIC_IMAGES = Path(__file__).parent.parent / 'public' / 'images'

def check_url(url: str, timeout: int = 8) -> tuple[bool, str]:
    """Check if a URL resolves with 200. Returns (ok, status_string)."""
    try:
        req = urllib.request.Request(url, method='HEAD')
        req.add_header('User-Agent', 'Mozilla/5.0 (ViralPeps-Verifier)')
        resp = urllib.request.urlopen(req, timeout=timeout)
        return resp.status == 200, str(resp.status)
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}"
    except Exception as e:
        return False, str(e)[:40]

def main():
    vendor_filter = sys.argv[1] if len(sys.argv) > 1 else None

    with open(DATA / 'vendors.json') as f:
        vendors = json.load(f)
    with open(DATA / 'compounds.json') as f:
        compounds = json.load(f)

    vendor_names = {v['name']: v for v in vendors}
    vendor_slugs = {v['slug'] for v in vendors}

    errors = []
    warnings = []

    # 1. Check for orphan sources
    for c in compounds:
        for s in c.get('sources', []):
            if s['vendor'] not in vendor_names:
                errors.append(f"ORPHAN: {c['id']} has source '{s['vendor']}' not in vendors.json")

    # 2. Check image fields
    for c in compounds:
        for s in c.get('sources', []):
            img = s.get('image', '')
            if img and not img.startswith('http'):
                errors.append(f"LOCAL IMAGE: {c['id']}/{s['vendor']} img={img[:60]}")

    # 3. Check URL fields for generics
    for c in compounds:
        for s in c.get('sources', []):
            url = s.get('url', '')
            if not url.startswith('http'):
                errors.append(f"MISSING URL: {c['id']}/{s['vendor']}")
            elif '/shop/' in url.lower() and '/product/' not in url.lower():
                warnings.append(f"GENERIC URL: {c['id']}/{s['vendor']} url={url[:70]}")
            elif '/collections/' in url.lower():
                warnings.append(f"COLLECTION URL: {c['id']}/{s['vendor']} url={url[:70]}")

    # 4. Check vendor logos
    for v in vendors:
        logo_path = PUBLIC_IMAGES / 'vendors' / f"{v['slug']}.png"
        if not logo_path.exists():
            warnings.append(f"MISSING LOGO: public/images/vendors/{v['slug']}.png")

    # 5. Product counts per vendor
    print(f"{'Vendor':30s} {'Sources':>7s} {'Compounds':>9s}")
    print('-' * 48)
    for v in sorted(vendors, key=lambda x: x['name']):
        total = 0
        unique = set()
        for c in compounds:
            for s in c.get('sources', []):
                if s['vendor'] == v['name']:
                    total += 1
                    unique.add(c['id'])
        print(f'{v["name"]:30s} {total:7d} {len(unique):9d}')

    # 6. Sample URL resolution test (3 URLs, 3 images per filtered vendor or first found)
    if vendor_filter:
        print(f"\n--- URL resolution test for '{vendor_filter}' ---")
        urls_tested = 0
        imgs_tested = 0
        for c in compounds:
            for s in c.get('sources', []):
                if s['vendor'] == vendor_filter:
                    if urls_tested < 3:
                        url = s.get('url', '')
                        if url:
                            ok, status = check_url(url)
                            marker = "OK" if ok else "BROKEN"
                            if not ok:
                                errors.append(f"URL {marker}: {c['name']} -> {status} ({url[:60]})")
                            urls_tested += 1
                    if imgs_tested < 3:
                        img = s.get('image', '')
                        if img:
                            ok, status = check_url(img)
                            marker = "OK" if ok else "BROKEN"
                            if not ok:
                                warnings.append(f"IMAGE {marker}: {c['name']} -> {status} ({img[:60]})")
                            imgs_tested += 1
                    if urls_tested >= 3 and imgs_tested >= 3:
                        break
            if urls_tested >= 3 and imgs_tested >= 3:
                break

    print()
    if errors:
        print(f"❌ ERRORS ({len(errors)}):")
        for e in errors:
            print(f"  {e}")
    else:
        print("✅ No errors found")

    if warnings:
        print(f"\n⚠️  WARNINGS ({len(warnings)}):")
        for w in warnings:
            print(f"  {w}")

    return 1 if errors else 0

if __name__ == '__main__':
    sys.exit(main())
