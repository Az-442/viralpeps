import json, os, re
base = "/Users/time4you/viralpeps/src/data"
c = json.load(open(os.path.join(base, "compounds.json")))
comps = c if isinstance(c, list) else c.get("compounds", [])

print("=== CLARIPEP stored sources ===")
for comp in comps:
    for s in comp.get("sources", []):
        if "claripep" in str(s.get("vendor","")).lower():
            print("%-20s | %-8s | %-6s | inStock=%-5s | %s" % (
                comp.get("slug"), s.get("price"), s.get("dosage","-"),
                s.get("inStock"), str(s.get("url"))[:70]))

print()
print("=== VIALVERSE stored sources (first 60) ===")
n=0
for comp in comps:
    for s in comp.get("sources", []):
        if "vialverse" in str(s.get("vendor","")).lower():
            n+=1
            if n<=60:
                print("%-24s | %-8s | %-6s | %s" % (
                    comp.get("slug"), s.get("price"), s.get("dosage","-"),
                    str(s.get("url"))[:60]))
print("VIALVERSE TOTAL:", n)

print()
print("=== VialVerse price sanity vs peers ===")
def num(p):
    m = re.search(r"[\d.]+", str(p).replace(",",""))
    return float(m.group()) if m else None
flags=0
for comp in comps:
    vv = [s for s in comp.get("sources",[]) if "vialverse" in str(s.get("vendor","")).lower()]
    if not vv: continue
    others=[num(s.get("price")) for s in comp.get("sources",[])
            if "vialverse" not in str(s.get("vendor","")).lower()]
    others=[o for o in others if o]
    p=num(vv[0].get("price"))
    if p and others:
        med=sorted(others)[len(others)//2]
        r=p/med if med else 0
        if r>3 or r<1/3:
            flags+=1
            print("  FLAG %-24s vv=%-8s median_others=%-8.2f ratio=%.2f" % (comp.get("slug"),p,med,r))
print("  price flags:", flags)

print()
print("=== CLARIPEP price sanity vs peers ===")
for comp in comps:
    cp = [s for s in comp.get("sources",[]) if "claripep" in str(s.get("vendor","")).lower()]
    if not cp: continue
    others=[num(s.get("price")) for s in comp.get("sources",[])
            if "claripep" not in str(s.get("vendor","")).lower()]
    others=[o for o in others if o]
    p=num(cp[0].get("price"))
    if p and others:
        med=sorted(others)[len(others)//2]
        r=p/med if med else 0
        mark = "  <<< FLAG" if (r>3 or r<1/3) else ""
        print("  %-20s claripep=%-8s median_others=%-8.2f ratio=%.2f%s" % (comp.get("slug"),p,med,r,mark))

print()
print("=== vendor records (new 3) ===")
v=json.load(open(os.path.join(base,"vendors.json")))
vendors = v if isinstance(v,list) else v.get("vendors",[])
for x in vendors:
    if x.get("slug") in ("claripep","vialverse","peptx"):
        print(json.dumps(x, indent=2)[:1400])
        print("-"*70)
