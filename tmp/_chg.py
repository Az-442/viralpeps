import json
R = "/Users/time4you/viralpeps/tmp/price_check_results.json"
res = json.load(open(R))
chg = [r for r in res if r.get("status") == "CHANGED"]
for r in chg:
    print(f"{r['vendor']} | {r['compound']} | {r.get('dosage') or '-'} | {r['stored']} -> {r['scraped']} | {r['method']} | {r['url']}")
