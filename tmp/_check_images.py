import json, os

c = json.load(open('src/data/compounds.json'))
missing = []
checked = 0
for comp in c:
    for s in comp.get("sources", []):
        if s.get("vendor") not in ("VialVerse", "Kings BioLabs", "PeptX"):
            continue
        img = s.get("image")
        if not img:
            missing.append((s["vendor"], comp["slug"], "NO IMAGE FIELD"))
            continue
        p = "public" + img
        checked += 1
        if not os.path.exists(p):
            missing.append((s["vendor"], comp["slug"], img))

print(f"checked {checked} vendor image paths")
if missing:
    print(f"\n*** MISSING {len(missing)} ***")
    for v, cs, i in missing:
        print(f"  {v:16} {cs:30} {i}")
else:
    print("ALL IMAGE PATHS RESOLVE OK")
