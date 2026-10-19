#!/usr/bin/env python3
"""ViralPeps price scraper v2 - trusted JSON-LD / Shopify-variant extraction.

Only accepts a scraped price when it comes from:
  A) JSON-LD Product offers.price  (authoritative)
  B) Shopify product JSON (variant.price in pence) for *.myshopify-style shops
Otherwise the result is marked "unverified" and NEVER written.
"""
import json, re, sys, ssl, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from collections import Counter, defaultdict

ROOT = "/Users/time4you/viralpeps"
DATA = f"{ROOT}/src/data/compounds.json"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

GONE_KW = ("page not found", "product not found", "404 not found",
           "no longer available", "has been removed", "discontinued")
OOS_KW = ("out of stock", "sold out", "currently unavailable", "notify me when")


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.geturl(), r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", "replace")
        except Exception:
            body = ""
        return e.code, url, body
    except Exception as e:
        return None, url, "__ERR__" + type(e).__name__


def jsonld_price(html):
    """Extract offers.price from JSON-LD Product blocks. Returns list of floats."""
    out = []
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        blob = m.group(1)
        if '"Product"' not in blob and "'Product'" not in blob:
            continue
        if '"price"' not in blob:
            continue
        for pm in re.finditer(r'"price"\s*:\s*"?([0-9]+(?:\.[0-9]{1,2})?)"?', blob):
            try:
                v = float(pm.group(1))
            except ValueError:
                continue
            if 0 < v < 100000:
                out.append(v)
    return out


def shopify_price(html):
    """Shopify: /products/xxx.js has price in pence. Look for inline product JSON instead."""
    out = []
    for pm in re.finditer(r'"price"\s*:\s*(\d{3,7})\b', html):
        v = int(pm.group(1)) / 100.0
        if 0.5 < v < 100000:
            out.append(v)
    return out


def main():
    limit = None
    for a in sys.argv:
        if a.startswith("--limit="):
            limit = int(a.split("=")[1])

    data = json.load(open(DATA))
    seen, uniq = set(), []
    for c in data:
        for s in c.get("sources", []):
            u = s.get("url", "")
            if not (u and u.startswith("http")):
                continue
            k = (s["vendor"], u)
            if k in seen:
                continue
            seen.add(k)
            uniq.append((c["slug"], s["vendor"], u, s.get("price")))
    if limit:
        uniq = uniq[:limit]
    print(f"unique urls: {len(uniq)}", flush=True)

    def work(it):
        slug, vendor, url, old = it
        st, final, html = fetch(url)
        rec = {"slug": slug, "vendor": vendor, "url": url, "status": st,
               "old": old, "new": None, "method": None, "stock": None,
               "note": ""}
        if html.startswith("__ERR__"):
            rec["note"] = "neterr:" + html[7:]
            return rec
        low = html.lower()
        if st in (404, 410):
            rec["stock"] = "delisted"
            rec["note"] = f"HTTP {st}"
            return rec
        if st in (403, 503, 402, 429):
            rec["note"] = f"blocked HTTP {st}"
            return rec
        for kw in GONE_KW:
            if kw in low:
                rec["stock"] = "delisted"
                rec["note"] = f"page says '{kw}'"
                return rec
        rec["stock"] = "oos" if any(k in low for k in OOS_KW) else "in"
        jp = jsonld_price(html)
        if jp:
            rec["new"] = f"£{min(jp):.2f}"
            rec["method"] = "json-ld" + (f"+{len(set(jp))}vars" if len(set(jp)) > 1 else "")
            return rec
        sp = shopify_price(html)
        if sp:
            rec["new"] = f"£{min(sp):.2f}"
            rec["method"] = "inline-json"
            return rec
        rec["note"] = "unverified: no structured price"
        return rec

    results = []
    with ThreadPoolExecutor(max_workers=12) as ex:
        for i, r in enumerate(ex.map(work, uniq), 1):
            results.append(r)
            if i % 250 == 0:
                print(f"  {i}", flush=True)

    json.dump(results, open(f"{ROOT}/scripts/price_scan_v2.json", "w"), indent=1)
    print(f"\nscanned={len(results)}")
    print("methods:", Counter(r["method"] for r in results).most_common())
    print("status:", Counter(r["status"] for r in results).most_common(8))
    print("stock:", Counter(r["stock"] for r in results).most_common())


if __name__ == "__main__":
    main()
