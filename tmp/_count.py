import json
data = json.load(open("/Users/time4you/viralpeps/src/data/compounds.json"))
compounds = len(data)
sources = 0
urls = set()
seen = set()
for c in data:
    for s in c.get("sources", []):
        sources += 1
        u = s.get("url", "") or ""
        if u.startswith("http"):
            urls.add(u)
        key = (u, s.get("dosage"), s.get("price"))
        seen.add(key)
print("compounds:", compounds)
print("sources:", sources)
print("http urls (unique):", len(urls))
print("dedup keys:", len(seen))
