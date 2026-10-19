import json, re, ssl, urllib.request
from concurrent.futures import ThreadPoolExecutor
import random

CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"

chg = json.load(open('/Users/time4you/viralpeps/scripts/changes_v3.json'))
applied_pool = [r for r in chg if "rendered==jsonld" in r["reason"] or (r["reason"] == "single jsonld" and 0.5 <= r["new_v"]/r["old_v"] <= 2.1)]
random.seed(7)
sample = random.sample(applied_pool, 12)


def check(r):
    req = urllib.request.Request(r["url"], headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25, context=CTX) as resp:
            h = resp.read().decode("utf-8", "replace")
    except Exception as e:
        return (r, "ERR", str(e)[:40])
    ld = set()
    for m in re.finditer(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', h, re.S | re.I):
        b = m.group(1)
        if '"Product"' in b:
            for pm in re.finditer(r'"price"\s*:\s*"?([0-9.]+)"?', b):
                try:
                    v = float(pm.group(1))
                except ValueError:
                    continue
                if 0 < v < 100000:
                    ld.add(round(v, 2))
    found = r["new_v"] in ld
    return (r, "OK" if found else "MISMATCH", f"new£{r['new_v']} ld={sorted(ld)[:4]}")


with ThreadPoolExecutor(max_workers=6) as ex:
    for r, status, info in ex.map(check, sample):
        print(f"{status:8} {r['vendor'][:20]:20} {r['slug'][:24]:24} old={r['old']:>8} new=£{r['new_v']:<8} {info[:60]}")
