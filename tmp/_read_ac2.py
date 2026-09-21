import json, re
d = json.load(open('src/data/trustscore-autocheck.json'))
for k in ("vialverse", "kings-bio-labs"):
    print(f"\n===== {k} =====")
    print(json.dumps(d.get(k), indent=2))
print("\nautocheck keys:", list(d.keys()))
