import json, collections
R = "/Users/time4you/viralpeps/tmp/price_check_results.json"
res = json.load(open(R))
c = collections.Counter(r.get("status") for r in res)
print("TOTAL:", len(res))
for k, v in c.most_common():
    print(f"  {k}: {v}")

ok = [r for r in res if r.get("status") == "OK"]
chg = [r for r in res if r.get("status") == "CHANGED"]
print("\nOK (<=5% drift):", len(ok))
print("CHANGED (>5%):", len(chg))
up = [r for r in chg if r.get("pct", 0) > 0]
dn = [r for r in chg if r.get("pct", 0) < 0]
print("  up:", len(up), " down:", len(dn))

print("\nTOP 30 ABS CHANGE:")
for r in sorted(chg, key=lambda x: abs(x.get("pct", 0)), reverse=True)[:30]:
    print(f"  {r['vendor'][:22]:22} | {r['compound'][:24]:24} | {r.get('dosage') or '-':8} | {r['stored']:>9} -> {r['scraped']:>9} ({r['pct']:+.1f}%) [{r.get('method')}]")
