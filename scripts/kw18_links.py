#!/usr/bin/env python3
"""Validate every internal link in the 3 new Day-18 articles against
compounds.json slugs, vendors.json slugs, research.ts registry slugs,
and research-content.ts keys. Scoped to the 3 new entries only.
"""
import json, re, os

ROOT = "/Users/time4you/viralpeps"
rc = open(f"{ROOT}/src/data/research-content.ts", encoding="utf-8").read()

NEW = ["epitalon-suppliers-uk", "cjc-1295-with-dac-vs-without-dac", "research-peptides-guide"]

# locate each new entry's byte range
ranges = []
for slug in NEW:
    i = rc.find(f"'{slug}': {{")
    end = rc.find("\n},\n", i)
    ranges.append((slug, i, end))

# build valid sets
compounds = json.load(open(f"{ROOT}/src/data/compounds.json"))
compounds = compounds["compounds"] if isinstance(compounds, dict) and "compounds" in compounds else compounds
comp_slugs = {c.get("slug") for c in compounds if c.get("slug")}

vendors = json.load(open(f"{ROOT}/src/data/vendors.json"))
vendors = vendors["vendors"] if isinstance(vendors, dict) and "vendors" in vendors else vendors
vend_slugs = {v.get("slug") for v in vendors if v.get("slug")}

# research slugs: registry (double-quoted) + content keys (both quote styles)
rt = open(f"{ROOT}/src/data/research.ts", encoding="utf-8").read()
research_slugs = set(re.findall(r'slug:\s*"([a-z0-9-]+)"', rt))
research_slugs |= set(re.findall(r"'([a-z0-9-]+)':\s*\{", rc))
research_slugs |= set(re.findall(r'"([a-z0-9-]+)":\s*\{', rc))

bad = 0
for slug, i, end in ranges:
    seg = rc[i:end]
    links = re.findall(r'\]\((/[^)\s]+)\)', seg)
    print(f"=== {slug}: {len(links)} internal links")
    for link in sorted(set(links)):
        target = link.strip("/")
        parts = target.split("/")
        ok = None
        if link.startswith("/compounds/"):
            ok = parts[1] in comp_slugs
            kind = "compound"
        elif link.startswith("/vendors/"):
            ok = parts[1] in vend_slugs
            kind = "vendor"
        elif link.startswith("/research/"):
            ok = parts[1] in research_slugs
            kind = "research"
        else:
            ok = True; kind = "other"
        mark = "OK " if ok else "BAD"
        if not ok:
            bad += 1
        print(f"   [{mark}] {link}  ({kind})")
print(f"\nBAD LINKS: {bad}")
