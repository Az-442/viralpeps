import json
from collections import Counter

r3 = json.load(open('/Users/time4you/viralpeps/tmp/price_check_results.json'))

# run3 results were overwritten by run4; recompute coverage from run4 only
print("run4 entries:", len(r3))
for k, v in sorted(Counter(r['status'] for r in r3).items(), key=lambda x: -x[1]):
    print(f"  {k:12} {v}")

# delisted detail
print("\nDELISTED detail:")
for r in r3:
    if r['status'] == 'DELISTED':
        print(f"  {r['vendor']:18} | {r['compound']:14} | {r['note']:10} | {r['url']}")

print("\nGATED:")
for r in r3:
    if r['status'] == 'GATED':
        print(f"  {r['vendor']} | {r['compound']} | {r['url']}")
