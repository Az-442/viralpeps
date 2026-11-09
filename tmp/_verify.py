import json, hashlib, os, subprocess

COMPOUNDS = "/Users/time4you/viralpeps/src/data/compounds.json"
BACKUP = "/Users/time4you/viralpeps/tmp/compounds.backup.2026-11-09.json"

# 1. valid JSON
data = json.load(open(COMPOUNDS))
print("JSON VALID — compounds:", len(data))

# 2. backup exists
print("BACKUP EXISTS:", os.path.exists(BACKUP), os.path.getsize(BACKUP) if os.path.exists(BACKUP) else 0, "bytes")

# 3. at least one changed value differs from pre-run snapshot
pre = json.load(open(BACKUP))
diffs = 0
samples = []
for ci, c in enumerate(data):
    for si, s in enumerate(c.get("sources", [])):
        old = pre[ci]["sources"][si].get("price")
        if s.get("price") != old:
            diffs += 1
            if len(samples) < 5:
                samples.append((s["vendor"], c["name"], s.get("dosage"), old, s.get("price")))
print("PRICE VALUES CHANGED IN FILE:", diffs)
for x in samples:
    print("   ", x)
