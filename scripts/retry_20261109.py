#!/usr/bin/env python3
"""Retry inconclusive entries slowly (rate-limits / network errors)."""
import json, ssl, urllib.request, urllib.error, re, time
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE

res = json.load(open(f"{ROOT}/scripts/scan_20261109.json"))
incon = [r for r in res if r["status"] is None or r["status"] in (429, 500, 502, 503, 520, 521, 522, 524)]
print("inconclusive to retry:", len(incon))

# group by host, serialise per host with delay to avoid rate limits
byhost = defaultdict(list)
for r in incon:
    byhost[r["url"].split("/")[2]].append(r)


def work(host_items):
    host, lst = host_items
    for it in lst:
        for attempt in range(2):
            req = urllib.request.Request(it["url"], headers={"User-Agent": UA,
                                                            "Accept-Language": "en-GB,en;q=0.9"})
            try:
                with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
                    body = r.read(120000).decode("utf-8", "replace")
                    it["status"] = r.status
                txt = re.sub(r"<[^>]+>", " ", body).lower()
                it["nf"] = any(k in txt for k in ("page not found", "404 not found", "product not found",
                                                  "no longer available", "has been discontinued",
                                                  "product unavailable", "couldn't find that page",
                                                  "this product is no longer"))
                break
            except urllib.error.HTTPError as e:
                it["status"] = e.code
                if e.code in (404, 410):
                    break
            except Exception:
                it["status"] = it.get("status")
            time.sleep(2.5)
        time.sleep(0.8)
    return host, len(lst)


with ThreadPoolExecutor(max_workers=8) as ex:
    for host, n in ex.map(work, list(byhost.items())):
        pass

merged = {r["url"]: r for r in res}
for r in incon:
    merged[r["url"]] = r
final = list(merged.values())
json.dump(final, open(f"{ROOT}/scripts/scan_20261109_retry.json", "w"), indent=1)

bad = [r for r in final if r["status"] in (404, 410) or r.get("nf")]
json.dump(bad, open(f"{ROOT}/scripts/delisted_candidates_20261109.json", "w"), indent=1)
from collections import Counter
print("after retry statuses:", Counter(r["status"] for r in final).most_common(12))
print("bad:", len(bad))
print("by vendor:", Counter(r["vendor"] for r in bad).most_common(40))
