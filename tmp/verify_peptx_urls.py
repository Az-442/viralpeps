#!/usr/bin/env python3
"""Verify PeptX single-vial URLs: HTTP status + title-content check (soft-404 guard)."""
import json, os, re, ssl, urllib.request, sys

ctx = ssl._create_unverified_context()
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36'}

slugs = [
    "tirzepatide","semaglutide","retatrutide","bpc-157","ghk-cu","tesamorelin","mots-c",
    "ss-31","selank","semax","kisspeptin-10","pt-141","nad","aod-9604","cagrilintide",
    "liraglutide","eloralintide","kpv","sermorelin","ipamorelin","dsip","mt-1","ahk-cu",
    "5-amino-1mq","ara-290","cartalax","pe-22-28","mazdutide","ta-1-thymosin-alpha-1",
    "klow-blend","glutathione","l-carnitine","oxytocin-acetate",
]

results = {}
for slug in slugs:
    url = f"https://peptx.co.uk/single-vials/{slug}"
    try:
        req = urllib.request.Request(url, method='GET', headers=UA)
        resp = urllib.request.urlopen(req, timeout=25, context=ctx)
        html = resp.read().decode('utf-8', errors='ignore')
        code = resp.getcode()
        t = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
        title = (t.group(1).strip() if t else 'NO TITLE')
        title = re.sub(r'\s+', ' ', title)
        # look for price patterns
        prices = re.findall(r'£\s?([0-9]+\.[0-9]{2})', html)
        results[slug] = {'code': code, 'title': title[:110], 'prices': sorted(set(prices), key=float)[:8], 'len': len(html)}
    except Exception as e:
        results[slug] = {'code': 'ERR', 'title': str(e)[:80], 'prices': [], 'len': 0}

for slug, r in results.items():
    print(f"{slug:32s} {str(r['code']):4s} len={r['len']:7d} prices={r['prices']}")
    print(f"    title: {r['title']}")

json.dump(results, open('tmp/peptx_verify.json', 'w'), indent=2)
print("\nSaved tmp/peptx_verify.json")
