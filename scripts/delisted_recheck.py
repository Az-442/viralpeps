#!/usr/bin/env python3
"""Re-verify delisted candidates with retries + a vendor-level health check."""
import json, ssl, time, urllib.request, urllib.error
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE


def get(url, tries=3):
    last = None
    for i in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA,
                                                   "Accept-Language": "en-GB,en;q=0.9"})
        try:
            with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
                return r.status, r.read(6000).decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            last = e.code
            if e.code in (404, 410):
                return e.code, ""
        except Exception as e:
            last = None
        time.sleep(1.2 * (i + 1))
    return last, ""


v3 = json.load(open(f"{ROOT}/scripts/scan_v3.json"))
gone = [r for r in v3 if r["confirmed"] == "DELISTED"]

# vendor health: fetch homepage
vendors = sorted({r["vendor"] for r in gone})
websites = {}
data = json.load(open(f"{ROOT}/src/data/compounds.json"))
for c in data:
    for s in c.get("sources", []):
        if s["vendor"] in vendors and s.get("vendorWebsite") is None:
            pass
vsite = {}
for c in data:
    for s in c.get("sources", []):
        if not s.get("url"):
            continue
        u = s["url"]
        parts = u.split("/")
        if len(parts) > 2:
            vsite.setdefault(s["vendor"], f"{parts[0]}//{parts[2]}")

health = {}
for v in vendors:
    site = vsite.get(v)
    if not site:
        continue
    st, body = get(site, tries=2)
    health[v] = (st, len(body))


def recheck(r):
    st, _ = get(r["url"])
    r["recheck"] = st
    return r


with ThreadPoolExecutor(max_workers=10) as ex:
    results = list(ex.map(recheck, gone))

print("=== VENDOR HOME HEALTH ===")
for v in sorted(health):
    st, n = health[v]
    print(f"{v[:24]:24} home={st} bytes={n}")

print("\n=== RECHECK ===")
from collections import Counter
print(Counter(r["recheck"] for r in results).most_common())

still = [r for r in results if r["recheck"] in (404, 410)]
recovered = [r for r in results if r["recheck"] == 200]
print(f"still 404/410: {len(still)}   recovered(200): {len(recovered)}   other: {len(results)-len(still)-len(recovered)}")

byv = defaultdict(lambda: [0, 0])
for r in results:
    if r["recheck"] in (404, 410):
        byv[r["vendor"]][0] += 1
    elif r["recheck"] == 200:
        byv[r["vendor"]][1] += 1

print("\nvendor   still404  recovered")
for v, (a, b) in sorted(byv.items(), key=lambda x: -x[1][0]):
    print(f"{v[:24]:24} {a:5} {b:7}   {'SITEWIDE/URL-CHANGE' if b else 'all-dead'}")

json.dump(results, open(f"{ROOT}/scripts/delisted_recheck.json", "w"), indent=1)
json.dump({k: list(v) for k, v in health.items()}, open(f"{ROOT}/scripts/vendor_health.json", "w"), indent=1)
