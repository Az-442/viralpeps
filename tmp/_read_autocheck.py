import json
d = json.load(open('src/data/trustscore-autocheck.json'))
if isinstance(d, dict):
    print("KEYS:", list(d.keys())[:10])
    rec = d.get('peptx') or d.get('PeptX')
    print(json.dumps(rec, indent=2)[:3000])
else:
    print(json.dumps(d[:3], indent=2)[:3000])
