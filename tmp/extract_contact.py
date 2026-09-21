#!/usr/bin/env python3
"""STEP 5 — Extract contact + delivery details for the 3 new/live suppliers."""
import re, ssl, urllib.request

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'}

PAGES = {
    'Claripep': [
        'https://claripep.co.uk/shipping/',
        'https://claripep.co.uk/contact/',
        'https://claripep.co.uk/',
    ],
    'VialVerse': [
        'https://vialverse.com/pages/shipping',
        'https://vialverse.com/pages/contact',
        'https://vialverse.com/',
    ],
    'PeptX': [
        'https://peptx.co.uk/shipping',
        'https://peptx.co.uk/contact',
        'https://peptx.co.uk/',
    ],
}

def fetch(u):
    try:
        req = urllib.request.Request(u, headers=UA)
        resp = urllib.request.urlopen(req, timeout=25, context=ctx)
        return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return f'__ERR__ {e}'

EMAIL = re.compile(r'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}', re.I)
# strip tags for readable text
def text(html):
    h = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.S | re.I)
    h = re.sub(r'<style[^>]*>.*?</style>', ' ', h, flags=re.S | re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = re.sub(r'&nbsp;', ' ', h)
    h = re.sub(r'\s+', ' ', h)
    return h

KEYWORDS = ['delivery', 'ship', 'dispatch', 'tracked', 'royal mail', 'free over', '£', 'courier',
            'evri', 'dpd', 'parcelforce', 'international', 'uk only', 'days']

for vendor, urls in PAGES.items():
    print("=" * 78)
    print(vendor)
    print("=" * 78)
    allmails = set()
    for u in urls:
        h = fetch(u)
        if h.startswith('__ERR__'):
            print(f"  [{u}] {h[:70]}")
            continue
        mails = set(EMAIL.findall(h))
        mails = {m for m in mails if not m.lower().endswith(('.png', '.jpg', '.webp', '.gif', '.svg'))}
        allmails |= mails
        t = text(h)
        print(f"\n  --- {u} ---")
        # find delivery sentences
        for kw in ['delivery', 'dispatch', 'shipping', 'free over', 'international']:
            for m in re.finditer(kw, t, re.I):
                seg = t[max(0, m.start() - 90):m.start() + 150].strip()
                if len(seg) > 40:
                    print(f"      · {seg[:230]}")
                break
    print(f"\n  EMAILS FOUND: {sorted(allmails) or 'NONE'}")
    print()
