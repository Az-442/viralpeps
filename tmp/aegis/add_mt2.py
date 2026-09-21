#!/usr/bin/env python3
import json, os
VENDOR = "Aegis Peptides"
COMP = "/Users/time4you/viralpeps/src/data/compounds.json"
data = json.load(open(COMP))

# find by slug melanotan-ii OR id mt2
node = next((x for x in data if (x.get("slug")=="melanotan-ii") or (x.get("id")=="mt2")), None)
assert node, "mt2 node not found"
src = node.setdefault("sources", [])
if any(s.get("vendor")==VENDOR for s in src):
    print("Aegis already present in mt2 node")
else:
    e = {
        "vendor": VENDOR,
        "url": "https://aegispeptidesuk.co.uk/product/mt-2/",
        "price": "\u00a324.99",
        "inStock": True,
        "image": "/images/products/aegis-peptides/mt-2.webp",
        "dosage": "10mg",
    }
    src.append(e)
    with open(COMP, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print("added MT-2 source to melanotan-ii node")
