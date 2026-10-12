#!/usr/bin/env python3
import json
v = json.load(open("src/data/vendors.json"))
e = [x for x in v if x["slug"] == "peptide-global"][0]
print("name:", e["name"])
print("_autoChecks:", json.dumps(e.get("_autoChecks"), indent=2))
