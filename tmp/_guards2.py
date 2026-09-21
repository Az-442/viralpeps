#!/usr/bin/env python3
"""Run the mandatory guards against every source of the three target vendors."""
import json, os, re, hashlib, glob, sys

base = "/Users/time4you/viralpeps/src/data"
c = json.load(open(os.path.join(base, "compounds.json")))
comps = c if isinstance(c, list) else c.get("compounds", [])

def num(p):
    m = re.search(r"[\d.]+", str(p).replace(",", ""))
    return float(m.group()) if m else None

TARGETS = ["peptx", "claripep", "vialverse"]

print("=" * 78)
print("GUARD 1/2: URL shape check for target vendors")
print("=" * 78)
for t in TARGETS:
    urls, bad = [], []
    for comp in comps:
        for s in comp.get("sources", []):
            if str(s.get("vendor", "")).lower().find(t) == -1:
                pass
    for comp in comps:
        for s in comp.get("sources", []):
            v = str(s.get("vendor", "")).lower()
            if t not in v:
                continue
            u = str(s.get("url", ""))
            urls.append((comp.get("slug"), u))
            low = u.lower().rstrip("/")
            if low.endswith("/shop") or low.endswith("/products") or "/collections/" in low or "/product-category/" in low or "/category/" in low:
                bad.append((comp.get("slug"), u))
    print("%-10s sources=%-4d category-page-URLs=%d" % (t, len(urls), len(bad)))
    for b in bad:
        print("     BAD:", b)

print()
print("=" * 78)
print("GUARD: total source counts per vendor (site-wide)")
print("=" * 78)
from collections import Counter
cnt = Counter()
for comp in comps:
    for s in comp.get("sources", []):
        cnt[s.get("vendor")] += 1
for t in TARGETS:
    for name, n in cnt.items():
        if t in str(name).lower():
            print("  %-12s -> %s = %d source entries" % (t, name, n))

print()
print("=" * 78)
print("GUARD 4: price sanity for claripep (flagged >3x previously)")
print("=" * 78)
for comp in comps:
    cp = [s for s in comp.get("sources", []) if "claripep" in str(s.get("vendor", "")).lower()]
    if not cp:
        continue
    others = [num(s.get("price")) for s in comp.get("sources", [])
              if "claripep" not in str(s.get("vendor", "")).lower()]
    others = [o for o in others if o]
    p = num(cp[0].get("price"))
    if p and others:
        med = sorted(others)[len(others) // 2]
        r = p / med if med else 0
        # dossier-aware: does the dosage explain it?
        dose = str(cp[0].get("dosage", ""))
        dm = re.search(r"([\d.]+)\s*mg", dose)
        expl = ""
        if dm:
            mg = float(dm.group(1))
            ppm = p / mg
            peers_ppm = []
            for s in comp.get("sources", []):
                if "claripep" in str(s.get("vendor", "")).lower():
                    continue
                d2 = re.search(r"([\d.]+)\s*mg", str(s.get("dosage", "")))
                pr = num(s.get("price"))
                if d2 and pr:
                    v = float(d2.group(1))
                    if v > 0:
                        peers_ppm.append(pr / v)
            if peers_ppm:
                pmed = sorted(peers_ppm)[len(peers_ppm) // 2]
                expl = "  ppm=%.2f peer_ppm_med=%.2f ppm_ratio=%.2f" % (ppm, pmed, ppm / pmed if pmed else 0)
        flag = "  <<< FLAG" if (r > 3 or r < 1 / 3) else ""
        print("  %-26s clp=%-7s dose=%-7s median=%-8.2f ratio=%.2f%s%s" % (
            comp.get("slug"), p, dose, med, r, flag, expl))
