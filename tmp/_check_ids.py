#!/usr/bin/env python3
import json
c = json.load(open("src/data/compounds.json"))
want = ["mt2", "glow", "ghk-cu", "klow", "mots-c", "tesamorelin", "bpc-157-tb-500",
        "semax", "selank", "ipamorelin", "bpc-157", "tb-500", "bacteriostatic-water",
        "acetic-acid-water", "cjc-1295", "cjc-1295-dac", "epitalon", "dsip", "pinealon",
        "kisspeptin-10", "wolverine-stack-bpc157-tb500-blend", "epithalon"]
for w in want:
    for x in c:
        if x["slug"] == w:
            print(f'id={x["id"]:40s} slug={x["slug"]:34s} name={x["name"]:45s} compare={x.get("compareSlug","-")} srcs={len(x.get("sources",[]))}')
