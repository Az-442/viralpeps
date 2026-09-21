import json
c = json.load(open('src/data/compounds.json'))
for slug in ["aod-9604","cagrilintide","liraglutide"]:
    comp = [x for x in c if x["slug"]==slug][0]
    print(f'\n=== {slug} ({comp.get("name")}) ===')
    print('compareSlug:', comp.get("compareSlug"))
    for i,s in enumerate(comp["sources"]):
        if s["vendor"] in ("PeptX","MyPep Biotech"):
            print(f'  [{i}] {s["vendor"]:16} {s.get("price"):9} dose={str(s.get("dosage")):8} url={s.get("url")}')
