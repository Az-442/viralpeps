#!/usr/bin/env python3
"""Scan all real-URL source entries for 404/410/gone signals."""
import json, ssl, urllib.request, urllib.error, re, time
from concurrent.futures import ThreadPoolExecutor

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

compounds = json.load(open(f"{ROOT}/src/data/compounds.json"))
items = []
for c in compounds:
    for s in c.get("sources", []):
        u = s.get("url", "")
        if u and "example.com" not in u:
            items.append({"vendor": s["vendor"], "compound": c["name"], "slug": c["slug"], "url": u})


def check(it):
    url = it["url"]
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=20, context=CTX) as r:
            body = r.read(120000).decode("utf-8", "replace")
            it["status"] = r.status
    except urllib.error.HTTPError as e:
        it["status"] = e.code
        body = ""
    except Exception:
        it["status"] = None
        body = ""
    txt = re.sub(r"<[^>]+>", " ", body).lower()
    it["nf"] = any(k in txt for k in ("page not found", "404 not found", "product not found",
                                      "no longer available", "has been discontinued",
                                      "product unavailable", "couldn't find that page",
                                      "this product is no longer"))
    it["oos"] = any(k in txt for k in ("out of stock", "sold out", "currently unavailable"))
    return it


with ThreadPoolExecutor(max_workers=24) as ex:
    res = list(ex.map(check, items))

bad = [r for r in res if r["status"] in (404, 410) or r["nf"]]
json.dump(res, open(f"{ROOT}/scripts/scan_20261109.json", "w"), indent=1)
json.dump(bad, open(f"{ROOT}/scripts/delisted_candidates_20261109.json", "w"), indent=1)

from collections import Counter
print("total", len(res), "bad", len(bad))
print(Counter(r["status"] for r in res).most_common(12))
byv = Counter(r["vendor"] for r in bad)
print("vendors:", byv.most_common(40))
