import json
c = json.load(open('src/data/compounds.json'))
for slug in ["aod-9604","cagrilintide","liraglutide"]:
    m = [x for x in c if x["slug"]==slug]
    for comp in m:
        vs = [s["vendor"] for s in comp["sources"]]
        print(f'{slug} ({comp.get("name")}): {len(vs)} sources -> {vs}')
    if not m: print(f'{slug}: NOT FOUND')
