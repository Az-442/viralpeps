#!/usr/bin/env python3
import json
r="/Users/time4you/viralpeps/"
vend=json.load(open(r+"src/data/vendors.json"))
comp=json.load(open(r+"src/data/compounds.json"))
a=next(x for x in vend if x["slug"]=="aegis-peptides")
names=[c["name"] for c in comp if any(s.get("vendor")=="Aegis Peptides" for s in (c.get("sources") or []))]
# count product/mg unique sources across all Aegis entries
srcs=[(c["slug"], s) for c in comp for s in (c.get("sources") or []) if s.get("vendor")=="Aegis Peptides"]
prices=[float(s["price"].replace("£","")) for c,s in srcs for s_ in [s]]
minp=min(float(s["price"].replace("\u00a3","")) for _,s in srcs)
print("Vendor: Aegis Peptides | slug aegis-peptides")
print("living compounds:", len(names))
print("total Aegis source rows:", len(srcs))
print("price min: %.2f" % minp)
print("products:", ", ".join(sorted(names)))
print("rating/verified:", a["rating"], a["verified"])
print("autocheck:", a["_autoChecks"])
