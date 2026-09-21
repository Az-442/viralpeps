#!/usr/bin/env python3
"""Guard 4 — price sanity check per vendor per compound.
Flags any price >3x or <1/3 the vendor's own median for that compound.
Also runs the bulk/MOQ leak check for PeptX (Factory Direct vs single-vial)."""
import json, re, statistics

c = json.load(open('src/data/compounds.json'))
VENDORS = ['PeptX', 'Claripep', 'VialVerse']

def num(p):
    if not p:
        return None
    m = re.sub(r'[£$€,\s]', '', str(p))
    try:
        return float(m)
    except Exception:
        return None

flags = []
for comp in c:
    for s in comp.get('sources', []):
        v = s.get('vendor')
        if v not in VENDORS:
            continue
        p = num(s.get('price'))
        if p is None:
            continue
        peers = [p for p in (num(x.get('price')) for x in comp.get('sources', [])) if p is not None]
        if len(peers) < 3:
            continue
        med = statistics.median(peers)
        if med <= 0:
            continue
        if p > 3 * med:
            flags.append((v, comp['slug'], p, med, 'HIGH (>3x median)'))
        elif p < med / 3:
            flags.append((v, comp['slug'], p, med, 'LOW (<1/3 median)'))

print(f"price-sanity flags: {len(flags)}")
for f in flags:
    print(f"  {f[0]:10s} {f[1]:22s} {f[2]:9.2f} vs median {f[3]:9.2f}  {f[4]}")

# PeptX-specific: confirm no Factory Direct bulk price leaked into single-vial field
print("\n=== PeptX price range vs task-file verified single-vial prices ===")
TASK = {'tirzepatide':'£46.99','semaglutide':'£42.99','retatrutide':'£43.99','bpc-157':'£27.99',
 'ghk-cu':'£21.99','tesamorelin':'£41.99','mots-c':'£22.99','ss-31':'£32.99','selank':'£24.99',
 'semax':'£24.99','kisspeptin':'£24.99','pt-141':'£23.99','nad-plus':'£28.99','kpv':'£25.99',
 'sermorelin':'£32.99','ipamorelin':'£19.99','dsip':'£19.99','ahk-cu':'£24.99','5-amino-1mq':'£24.99',
 'ara-290':'£34.99','cartalax':'£45.99','pe-22-28':'£25.99','mazdutide':'£27.99',
 'thymosin-alpha-1':'£25.99','klow':'£63.99','glutathione':'£19.99','l-carnitine':'£16.99',
 'oxytocin-acetate':'£23.99','melanotan-i':'£20.99'}
mismatch = []
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') == 'PeptX':
            t = TASK.get(comp['slug'])
            if t and s.get('price') != t:
                mismatch.append((comp['slug'], s.get('price'), t))
print("price mismatches vs verified task file:", mismatch or "NONE — all match")
