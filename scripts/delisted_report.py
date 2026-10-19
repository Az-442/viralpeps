#!/usr/bin/env python3
import json, ssl, urllib.request, urllib.error, re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE

v3 = json.load(open(f"{ROOT}/scripts/scan_v3.json"))
gone = [r for r in v3 if r["confirmed"] == "DELISTED"]
oos = [r for r in v3 if r["confirmed"] == "OOS"]

data = json.load(open(f"{ROOT}/src/data/compounds.json"))
idx = {}
for c in data:
    for s in c.get("sources", []):
        idx[(s["vendor"], s.get("url"))] = s.get("image")


def probe(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20, context=CTX) as r:
            return r.status, r.read(4000).decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return None, ""


def check(r):
    st, body = probe(r["url"].rsplit("/product", 1)[0] + "/" if "/product" in r["url"] else r["url"])
    return st


print(f"DELISTED (404/410): {len(gone)}")
byv = Counter(r["vendor"] for r in gone)
print("by vendor:", byv.most_common())

# group by vendor and sample-check the vendor homepage to see if it's a sitewide change
print("\n-- delisted entries --")
for r in sorted(gone, key=lambda x: x["vendor"]):
    print(f"{r['status']} {r['vendor'][:22]:22} {r['slug'][:30]:30} {r['url']}")

json.dump(gone, open(f"{ROOT}/scripts/delisted_v3.json", "w"), indent=1)
json.dump(oos, open(f"{ROOT}/scripts/oos_v3.json", "w"), indent=1)
print(f"\nOUT OF STOCK (schema): {len(oos)}  vendors:", Counter(r['vendor'] for r in oos).most_common(15))
