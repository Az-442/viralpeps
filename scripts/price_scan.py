#!/usr/bin/env python3
"""ViralPeps weekly price scraper - direct HTTP, no external extract backend.

Reads src/data/compounds.json, visits every source URL that has a real http URL,
extracts the primary price and stock state, and reports discrepancies.
Does NOT write the file unless --apply is passed.
"""
import json
import re
import sys
import time
import urllib.request
import urllib.error
import ssl
from concurrent.futures import ThreadPoolExecutor

ROOT = "/Users/time4you/viralpeps"
DATA = f"{ROOT}/src/data/compounds.json"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

PRICE_RE = re.compile(r"£\s?(\d{1,4}(?:,\d{3})?(?:\.\d{1,2})?)")
OOS_PAT = re.compile(
    r"(out of stock|sold out|currently unavailable|no longer available|"
    r"product not found|page not found|404 not found|discontinued)",
    re.I,
)
JSONLD_PRICE = re.compile(r'"price"\s*:\s*"?([0-9]+(?:\.[0-9]{1,2})?)"?')
META_PRICE = re.compile(
    r'<meta[^>]+(?:property|name)="(?:product:price:amount|og:price:amount)"[^>]+content="([0-9.,]+)"',
    re.I,
)
META_PRICE_REV = re.compile(
    r'<meta[^>]+content="([0-9.,]+)"[^>]+(?:property|name)="(?:product:price:amount|og:price:amount)"',
    re.I,
)


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            raw = r.read()
            try:
                html = raw.decode("utf-8", "replace")
            except Exception:
                html = str(raw)
            return r.status, r.geturl(), html
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", "replace")
        except Exception:
            body = ""
        return e.code, url, body
    except Exception as e:
        return None, url, f"__ERR__{type(e).__name__}: {e}"


def to_gbp(s):
    return float(s.replace(",", ""))


def extract(html, url):
    """Return (price_str, note) best-effort."""
    # Prefer JSON-LD product offer price
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        blob = m.group(1)
        if '"price"' in blob and ('Product' in blob or 'product' in blob):
            pm = JSONLD_PRICE.search(blob)
            if pm:
                return f"£{float(pm.group(1)):.2f}", "json-ld"
    m = META_PRICE.search(html) or META_PRICE_REV.search(html)
    if m:
        return f"£{float(m.group(1).replace(',', '')):.2f}", "meta"
    # Shopify-style: look for "price": 1234 in JS (pence)
    prices = PRICE_RE.findall(html)
    if prices:
        vals = sorted({to_gbp(p) for p in prices})
        return f"£{vals[0]:.2f}", f"html-min({len(vals)} found)"
    return None, "no-price-found"


def check_stock(html, status):
    if status == 404:
        return False, "HTTP 404"
    if status is None:
        return None, "fetch failed"
    if status == 403:
        return None, "HTTP 403 blocked"
    if status == 503:
        return None, "HTTP 503 blocked"
    low = html.lower()
    for kw in ("out of stock", "sold out", "currently unavailable",
               "product not found", "no longer available", "discontinued",
               "page not found"):
        if kw in low:
            # crude guard: only flag if the phrase is near-ish a product/price area
            return False, f"page says '{kw}'"
    return True, "in stock"


def work(item):
    slug, vendor, url, old_price = item
    status, final_url, html = fetch(url)
    if html.startswith("__ERR__"):
        return {"slug": slug, "vendor": vendor, "url": url, "status": status,
                "error": html[7:60], "new_price": None, "note": "net-error",
                "in_stock": None}
    new_price, note = extract(html, final_url)
    in_stock, stock_note = check_stock(html, status)
    return {"slug": slug, "vendor": vendor, "url": url, "status": status,
            "final_url": final_url, "old_price": old_price,
            "new_price": new_price, "note": note,
            "in_stock": in_stock, "stock_note": stock_note}


def main():
    apply = "--apply" in sys.argv
    limit = None
    for a in sys.argv:
        if a.startswith("--limit="):
            limit = int(a.split("=")[1])

    data = json.load(open(DATA))
    items = []
    for c in data:
        for s in c.get("sources", []):
            u = s.get("url", "")
            if u and u.startswith("http"):
                items.append((c["slug"], s["vendor"], u, s.get("price")))

    # de-dup identical (vendor,url)
    seen = set()
    uniq = []
    for it in items:
        k = (it[1], it[2])
        if k in seen:
            continue
        seen.add(k)
        uniq.append(it)

    print(f"total source URLs: {len(items)}  unique: {len(uniq)}")
    if limit:
        uniq = uniq[:limit]

    results = []
    with ThreadPoolExecutor(max_workers=12) as ex:
        for i, r in enumerate(ex.map(work, uniq), 1):
            results.append(r)
            if i % 25 == 0:
                print(f"  ...{i}/{len(uniq)}", flush=True)

    json.dump(results, open(f"{ROOT}/scripts/price_scan_result.json", "w"), indent=1)
    print(f"\nscanned {len(results)}")
    ok = [r for r in results if r["new_price"]]
    print(f"prices extracted: {len(ok)}")
    from collections import Counter
    print(Counter(r["note"].split("(")[0] for r in results).most_common())
    print(Counter(r["status"] for r in results).most_common())


if __name__ == "__main__":
    main()
