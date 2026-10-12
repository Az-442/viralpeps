#!/usr/bin/env python3
import json
v = json.load(open("src/data/vendors.json"))
print("keys:", list(v[-1].keys()))
print()
print(json.dumps(v[-1], indent=2)[:2000])
