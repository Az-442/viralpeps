import json, os
base = "/Users/time4you/viralpeps/src/data"
v = json.load(open(os.path.join(base, "vendors.json")))
vendors = v if isinstance(v, list) else v.get("vendors", [])
for x in vendors:
    if x.get("slug") in ("claripep", "vialverse", "peptx"):
        print("=" * 78)
        print("SLUG:", x.get("slug"))
        for k in ["name", "website", "rating", "reviews", "verified", "labTested",
                  "lastTested", "delivery", "founded", "country"]:
            print("  %-12s %s" % (k, x.get(k)))
        print("  shipping:")
        for s in x.get("shipping", []) or []:
            print("     -", s)
        print("  payment:", x.get("payment"))
        print("  highlights:")
        for h in x.get("highlights", []) or []:
            print("     -", h)
        ac = x.get("_autoChecks")
        if ac:
            print("  _autoChecks:", json.dumps(ac)[:500])
        print("  keys:", sorted(x.keys()))
