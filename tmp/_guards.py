import json, os, hashlib, glob

base = "/Users/time4you/viralpeps/src/data"
c = json.load(open(os.path.join(base, "compounds.json")))
comps = c if isinstance(c, list) else c.get("compounds", [])

# 1. Every PeptX source: URL must be /single-vials/, never /shop or /product/
print("=== GUARD 2: category / soft-404 URL check (ALL vendors) ===")
bad = []
for comp in comps:
    for s in comp.get("sources", []):
        u = str(s.get("url", ""))
        if not u:
            continue
        low = u.lower()
        if any(p in low for p in ["/shop", "/products", "/category/", "/collections/", "/product/"]):
            bad.append((s.get("vendor"), comp.get("slug"), u))
for b in bad[:40]:
    print("  BAD:", b)
print("  total bad URLs:", len(bad))
print()

# 2. placeholder / example.com
print("=== GUARD: placeholder URLs ===")
ph = [(s.get("vendor"), comp.get("slug"), s.get("url")) for comp in comps
      for s in comp.get("sources", []) if "example.com" in str(s.get("url", ""))]
print("  example.com count:", len(ph))
for p in ph[:10]:
    print("   ", p)
print()

# 3. Missing image fields per vendor
print("=== Missing image field (new vendors) ===")
for target in ["claripep", "vialverse", "peptx"]:
    miss = []
    tot = 0
    for comp in comps:
        for s in comp.get("sources", []):
            if target in str(s.get("vendor", "")).lower():
                tot += 1
                if not s.get("image"):
                    miss.append(comp.get("slug"))
    print("  %-10s total=%d missing_image=%d %s" % (target, tot, len(miss), miss[:8]))
print()

# 4. PeptX price sanity vs other vendors for same compound
print("=== GUARD 4: PeptX price vs other vendors (same compound) ===")
import re
def num(p):
    m = re.search(r"[\d.]+", str(p).replace(",", ""))
    return float(m.group()) if m else None
for comp in comps:
    px = [s for s in comp.get("sources", []) if "peptx" in str(s.get("vendor","")).lower()]
    if not px:
        continue
    others = [num(s.get("price")) for s in comp.get("sources", [])
              if "peptx" not in str(s.get("vendor","")).lower()]
    others = [o for o in others if o]
    p = num(px[0].get("price"))
    if p and others:
        med = sorted(others)[len(others)//2]
        ratio = p/med if med else 0
        flag = "  <<< FLAG" if (ratio > 3 or ratio < 1/3) else ""
        print("  %-22s peptx=%-8s median_others=%-8.2f ratio=%.2f%s" % (comp.get("slug"), p, med, ratio, flag))
print()

# 5. image MD5 uniqueness per vendor
print("=== GUARD 3: image MD5 uniqueness ===")
for v in ["peptx", "claripep", "vialverse"]:
    d = "/Users/time4you/viralpeps/public/images/products/%s" % v
    if not os.path.isdir(d):
        print("  %s: NO DIR" % v); continue
    md5s = {}
    for f in glob.glob(os.path.join(d, "*")):
        if os.path.isfile(f):
            h = hashlib.md5(open(f, "rb").read()).hexdigest()
            md5s.setdefault(h, []).append(os.path.basename(f))
    dups = {h: fs for h, fs in md5s.items() if len(fs) > 1}
    print("  %-10s files=%d unique_md5=%d dup_groups=%d" % (v, sum(len(f) for f in md5s.values()), len(md5s), len(dups)))
    if dups:
        for h, fs in list(dups.items())[:3]:
            print("      dup(%d):" % len(fs), fs[:6])
