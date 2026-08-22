import json

compounds = json.load(open("src/data/compounds.json"))
for cid in ["dsip", "glutathione"]:
    matches = [c for c in compounds if c["id"] == cid]
    print(f"=== {cid}: {len(matches)} records ===")
    for i, c in enumerate(matches):
        tp = [s for s in c.get("sources", []) if s.get("vendor") == "Tested Peptides"]
        print(f"  [{i}] slug={c.get('slug')} name={c.get('name')!r} compareSlug={c.get('compareSlug')!r}")
        print(f"      n_sources={len(c.get('sources', []))} has_compareSlug={c.get('compareSlug')}")
        print(f"      tp_sources={len(tp)}")
        for s in tp:
            print(f"         -> {s['url']} {s['price']}")
