import json
from collections import Counter
from urllib.parse import urlparse

res = json.load(open('/Users/time4you/viralpeps/tmp/price_check_results.json'))
print("total checked this run:", len(res))
c = Counter(r['status'] for r in res)
for k, v in sorted(c.items(), key=lambda x: -x[1]):
    print(f"  {k:12} {v}")

# vendors never yielding a price
by_vendor = {}
for r in res:
    by_vendor.setdefault(r['vendor'], Counter())[r['status']] += 1
bad = [(v, dict(cnt)) for v, cnt in by_vendor.items()
       if not cnt.get('OK') and not cnt.get('CHANGED')]
print("\nVENDORS WITH ZERO USABLE PRICES THIS RUN:")
for v, cnt in sorted(bad):
    print(f"  {v:26} {cnt}")

# repeated URL used for multiple dosages (structural issue)
dup = {}
for r in res:
    dup.setdefault((r['vendor'], r['url']), set()).add(r.get('dosage'))
print("\nONE URL -> MULTIPLE DOSAGES (cannot be priced per-size):")
n = 0
for (v, u), doses in dup.items():
    if len(doses) > 1:
        n += 1
print(f"  count: {n}")
