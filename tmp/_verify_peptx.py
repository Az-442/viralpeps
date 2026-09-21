import json
c = json.load(open('src/data/compounds.json'))
print("=== PeptX entries now ===")
seen_urls = {}
n = 0
for comp in c:
    for s in comp.get("sources", []):
        if s.get("vendor") == "PeptX":
            n += 1
            print(f'{comp["slug"]:22} {s.get("price"):8} dose={str(s.get("dosage")):7} instock={s.get("inStock")} {s.get("url")}  img={s.get("image")}')
            seen_urls.setdefault(s["url"], []).append(comp["slug"])
print("TOTAL PeptX sources:", n)
print("\n=== duplicate URLs (should be 0) ===")
dups = {u: v for u, v in seen_urls.items() if len(v) > 1}
print(dups if dups else "none")
