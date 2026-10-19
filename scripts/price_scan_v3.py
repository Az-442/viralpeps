#!/usr/bin/env python3
"""v3: agreement-based extraction.

Trust a price only when the RENDERED price markup and the JSON-LD offer agree
(or when only one source exists and it is unambiguous).
"""
import json, re, ssl, sys, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from collections import Counter

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE

# Rendered-price patterns, ordered by reliability
RENDER_PATS = [
    r'id="variant-price-actual"[^>]*>\s*&pound;\s*<span>\s*([0-9.,]+)',   # Express-style
    r'class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>(?:\s*<[^>]+>)*\s*(?:&#163;|&pound;|£)\s*([0-9.,]+)',
    r'(?:&#163;|&pound;)<!-- -->([0-9.,]+)',                              # Next.js style
    r'<span[^>]*class="[^"]*price[^"]*"[^>]*>\s*(?:&#163;|&pound;|£)\s*([0-9.,]+)',
]


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return None, ""


def parse(html):
    ld = set()
    ld_avail = set()
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        b = m.group(1)
        if '"Product"' not in b:
            continue
        for pm in re.finditer(r'"price"\s*:\s*"?([0-9]+(?:\.[0-9]{1,4})?)"?', b):
            try:
                v = float(pm.group(1))
            except ValueError:
                continue
            if 0 < v < 100000:
                ld.add(round(v, 2))
        ld_avail |= set(re.findall(r'"availability"\s*:\s*"([^"]+)"', b))

    rendered = None
    for pat in RENDER_PATS:
        m = re.search(pat, html, re.I)
        if m:
            try:
                rendered = round(float(m.group(1).replace(",", "")), 2)
            except ValueError:
                rendered = None
            if rendered:
                break
    return ld, ld_avail, rendered


def work(it):
    slug, vendor, url, old = it
    st, html = fetch(url)
    rec = {"slug": slug, "vendor": vendor, "url": url, "status": st, "old": old,
           "ld": [], "rendered": None, "avail": [], "confirmed": None, "reason": ""}
    if st in (404, 410):
        rec["reason"] = f"HTTP {st}"
        rec["confirmed"] = "DELISTED"
        return rec
    if st in (403, 429, 503, 202, None):
        rec["reason"] = f"blocked HTTP {st}"
        return rec
    ld, avail, rendered = parse(html)
    rec["ld"] = sorted(ld); rec["rendered"] = rendered; rec["avail"] = sorted(avail)

    if "OutOfStock" in " ".join(avail):
        rec["confirmed"] = "OOS"

    if not ld and rendered is None:
        rec["reason"] = "no price found"
        return rec

    if rendered and ld and any(abs(rendered - x) < 0.02 for x in ld):
        rec["confirmed"] = rec["confirmed"] or "PRICE"
        rec["new"] = rendered
        rec["reason"] = "rendered==jsonld"
    elif rendered and not ld:
        rec["confirmed"] = rec["confirmed"] or "PRICE"
        rec["new"] = rendered
        rec["reason"] = "rendered only"
    elif len(ld) == 1 and not rendered:
        rec["confirmed"] = rec["confirmed"] or "PRICE"
        rec["new"] = list(ld)[0]
        rec["reason"] = "single jsonld"
    else:
        rec["reason"] = f"ambiguous (ld={len(ld)}, rendered={rendered})"
    return rec


def main():
    data = json.load(open(f"{ROOT}/src/data/compounds.json"))
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
    print("urls:", len(uniq), flush=True)

    out = []
    with ThreadPoolExecutor(max_workers=12) as ex:
        for i, r in enumerate(ex.map(work, uniq), 1):
            out.append(r)
            if i % 300 == 0:
                print(" ", i, flush=True)
    json.dump(out, open(f"{ROOT}/scripts/scan_v3.json", "w"), indent=1)
    print(Counter(r["confirmed"] for r in out).most_common())
    print(Counter(r["reason"] for r in out).most_common(8))


if __name__ == "__main__":
    main()
