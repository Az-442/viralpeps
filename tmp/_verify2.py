#!/usr/bin/env python3
import json, os
V = "Peptide Global"
c = json.load(open("src/data/compounds.json"))
srcs = [(comp["slug"], s) for comp in c for s in comp.get("sources", []) if s.get("vendor") == V]
missing = [s["image"] for _, s in srcs if not os.path.exists("public" + s["image"])]
print("source entries:", len(srcs))
print("missing image files:", len(missing), missing[:5] if missing else "")
print("distinct compounds covered:", len({cs for cs, _ in srcs}))
print()
for cs, s in sorted(srcs):
    print(f"   {cs:26s} {s.get('dosage',''):6s} {s['price']:>8s}  {os.path.basename(s['image'])}")
