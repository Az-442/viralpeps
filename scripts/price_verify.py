#!/usr/bin/env python3
"""Verify OOS / delisted flags before reporting. Re-fetch and require strong evidence:
 - 404/410 status => delisted (confirmed)
 - JSON-LD availability == OutOfStock / OutOfStock schema => oos
 - literal phrase in the main product area (not sitewide nav)
"""
import json, re, ssl, urllib.request, urllib.error
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return None, ""


def audit(rec):
    url = rec["url"]
    st, html = fetch(url)
    rec["verify_status"] = st
    ld_avail = set()
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        b = m.group(1)
        if '"Product"' in b and '"availability"' in b:
            ld_avail |= set(re.findall(r'"availability"\s*:\s*"([^"]+)"', b))
    rec["ld_availability"] = sorted(ld_avail)

    if st == 404:
        rec["verdict"] = "delisted-404"
    elif st == 410:
        rec["verdict"] = "delisted-410"
    elif any("OutOfStock" in a for a in ld_avail):
        rec["verdict"] = "out-of-stock"
    elif any("InStock" in a for a in ld_avail):
        rec["verdict"] = "in-stock"
    elif st in (403, 429, 503, 202) or st is None:
        rec["verdict"] = f"blocked-{st}"
    else:
        # weak evidence: single occurrence of out-of-stock phrase AND no InStock schema
        n = len(re.findall(r"out of stock|sold out", html, re.I))
        rec["verdict"] = "likely-oos-unverified" if n else "unknown"
    return rec


def main():
    res = json.load(open(f"{ROOT}/scripts/price_scan_v2.json"))
    todo = [r for r in res if r["stock"] in ("oos", "delisted")]
    print(f"verifying {len(todo)} flagged records")
    out = []
    with ThreadPoolExecutor(max_workers=12) as ex:
        for i, r in enumerate(ex.map(audit, todo), 1):
            out.append(r)
            if i % 200 == 0:
                print(" ", i, flush=True)
    json.dump(out, open(f"{ROOT}/scripts/price_verify.json", "w"), indent=1)
    print(Counter(r["verdict"] for r in out).most_common())


if __name__ == "__main__":
    main()
