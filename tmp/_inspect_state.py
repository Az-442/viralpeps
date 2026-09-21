import json, os

base = "/Users/time4you/viralpeps/src/data"

v = json.load(open(os.path.join(base, "vendors.json")))
vendors = v if isinstance(v, list) else v.get("vendors", [])
print("=== VENDORS (%d) ===" % len(vendors))
for x in vendors:
    print("%-32s | slug=%-32s | labTested=%-5s | verified=%-5s" % (
        x.get("name", "?"), x.get("slug", "?"), x.get("labTested"), x.get("verified")))
print()

c = json.load(open(os.path.join(base, "compounds.json")))
comps = c if isinstance(c, list) else c.get("compounds", [])
print("=== COMPOUNDS: %d ===" % len(comps))

print("=== PEPTX SOURCES ===")
n = 0
for comp in comps:
    for s in comp.get("sources", []):
        if "peptx" in str(s.get("vendor", "")).lower():
            n += 1
            print("%-24s | %-9s | %-6s | %s" % (
                comp.get("slug", "?"), s.get("price", "?"), s.get("dosage", "-"), s.get("url", "?")))
print("TOTAL PEPTX SOURCES:", n)

print()
print("=== NEW-VENDOR PRESENCE CHECK ===")
for target in ["claripep", "vialverse", "kings"]:
    hits = []
    for comp in comps:
        for s in comp.get("sources", []):
            if target in str(s.get("vendor", "")).lower():
                hits.append(comp.get("slug"))
    print("%-12s -> %d sources %s" % (target, len(hits), hits[:5]))

print()
print("=== IMAGE DIRS ===")
pdir = "/Users/time4you/viralpeps/public/images/products"
if os.path.isdir(pdir):
    for d in sorted(os.listdir(pdir)):
        fp = os.path.join(pdir, d)
        if os.path.isdir(fp):
            files = [f for f in os.listdir(fp) if not f.startswith(".")]
            print("%-28s %d files" % (d, len(files)))
vdir = "/Users/time4you/viralpeps/public/images/vendors"
if os.path.isdir(vdir):
    print()
    print("vendor logos:", len([f for f in os.listdir(vdir) if not f.startswith(".")]))
