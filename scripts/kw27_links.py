#!/usr/bin/env python3
"""kw27: validate every internal link in the three new articles."""
import json
import re

WT = "/Users/time4you/viralpeps/.wt/kw27"
NEW = ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]

content = open(WT + "/src/data/research-content.ts", encoding="utf-8").read()
reg = open(WT + "/src/data/research.ts", encoding="utf-8").read()
comps = {c["slug"] for c in json.load(open(WT + "/src/data/compounds.json"))}
vendors = {v["slug"] for v in json.load(open(WT + "/src/data/vendors.json"))}

research_slugs = set(re.findall(r'["\']([a-z0-9-]+)["\']\s*:\s*\{', content))
research_slugs |= set(re.findall(r"slug:\s*['\"]([a-z0-9-]+)['\"]", reg))

# slice each new article's byte range
offs = sorted([(content.find("'%s': {" % s) if content.find("'%s': {" % s) >= 0
                else content.find('"%s": {' % s), s) for s in NEW])
print("article offsets:", offs)

ok = bad = 0
for i, (start, slug) in enumerate(offs):
    end = offs[i + 1][0] if i + 1 < len(offs) else len(content)
    seg = content[start:end]
    links = sorted(set(re.findall(r"\]\((/[a-z0-9/\-]+)\)", seg)))
    print("\n==", slug)
    for L in links:
        parts = L.strip("/").split("/")
        if parts[0] == "compounds":
            good = len(parts) == 2 and parts[1] in comps
        elif parts[0] == "research":
            good = len(parts) == 2 and parts[1] in research_slugs
        elif parts[0] == "vendors":
            good = len(parts) == 2 and parts[1] in vendors
        else:
            good = False
        print("  ", "OK  " if good else "BROKEN", L)
        ok += good
        bad += (not good)

print("\nlinks ok:", ok, "broken:", bad)
