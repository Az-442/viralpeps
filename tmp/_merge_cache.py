import json, subprocess

# current cache (post --slug run)
cur = json.load(open('src/data/trustscore-autocheck.json'))
print("cache entries now:", len(cur))
print("keys:", list(cur.keys())[:10])

# HEAD version
head_raw = subprocess.check_output(['git','show','HEAD:src/data/trustscore-autocheck.json']).decode()
head = json.loads(head_raw)
print("HEAD cache entries:", len(head))

# merge: HEAD + new kingston
merged = dict(head)
merged['kingston-peptides'] = cur['kingston-peptides']
print("merged entries:", len(merged))
json.dump(merged, open('src/data/trustscore-autocheck.json','w'), indent=2, ensure_ascii=False)
print("WROTE merged cache")
