#!/usr/bin/env python3
import json
c = json.load(open("src/data/compounds.json"))
# Check mt2 and acetic acid equivalents, and existing vendor naming conventions
for kw in ["mt-2", "melanotan", "acetic", "mt2"]:
    print("---", kw)
    for x in c:
        if kw in x["slug"].lower() or kw in x["name"].lower():
            print(f'  id={x["id"]:38s} slug={x["slug"]:32s} name={x["name"]:40s} compare={x.get("compareSlug","-")}')
print()
# show an existing vendor's source entries for reference (a recent single-unit vendor)
import collections
vnames = collections.Counter()
for x in c:
    for s in x.get("sources", []):
        vnames[s["vendor"]] += 1
print("sample vendor source counts:", list(vnames.items())[:8])
print()
# show a few BPC-157 sources as a template
for x in c:
    if x["slug"] == "bpc-157":
        print("BPC-157 sources sample:")
        for s in x["sources"][:4]:
            print("  ", json.dumps(s))
