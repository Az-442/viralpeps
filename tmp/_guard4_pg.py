#!/usr/bin/env python3
"""Guard 4 — price sanity vs median for each compound; also verify compound ids exist."""
import json
PRODUCTS = [
  ("mt2-pen","mt2"),("glow-peptide-pen","glow"),("ghk-cu-pen","ghk-cu"),("klow-pen","klow"),
  ("mots-c-pen","mots-c"),("tesamorelin-pen","tesamorelin"),("bpc-157-tb-500-pen","bpc-157-tb-500"),
  ("semax-pen","semax"),("selank-pen","selank"),("ipamorelin-pen","ipamorelin"),
  ("ghk-cu-50mg-vial","ghk-cu"),("ghk-cu-100mg-vial","ghk-cu"),("bpc-157-5mg-vial","bpc-157"),
  ("bpc-157-10mg-vial","bpc-157"),("tb-500-5mg-vial","tb-500"),("tb-500-10mg-vial","tb-500"),
  ("ipamorelin-5mg-vial","ipamorelin"),("ipamorelin-10mg-vial","ipamorelin"),
  ("bacteriostatic-water-10ml","bacteriostatic-water"),("bacteriostatic-water-3ml","bacteriostatic-water"),
  ("acetic-acid-water-10ml","acetic-acid-10ml"),("cjc-1295-no-dac-5mg-vial","cjc-1295"),
  ("cjc-1295-dac-2mg-vial","cjc-1295-dac"),("selank-5mg-vial","selank"),("selank-10mg-vial","selank"),
  ("semax-5mg-vial","semax"),("semax-10mg-vial","semax"),("epithalon-10mg-vial","epitalon"),
  ("mots-c-10mg-vial","mots-c"),("dsip-5mg-vial","dsip"),("pinealon-10mg-vial","pinealon"),
  ("kisspeptin-10-5mg-vial","kisspeptin-10"),
]
scrape = {p["url"].split("/product/")[-1].strip("/"): p for p in json.load(open("tmp/_pg_scrape.json"))}
c = json.load(open("src/data/compounds.json"))
by_id = {x["id"]: x for x in c}

# check ids
missing = [cid for _, cid in PRODUCTS if cid not in by_id]
print("missing ids:", missing)

# price sanity
for pslug, cid in PRODUCTS:
    comp = by_id.get(cid)
    if not comp: continue
    price = float(scrape[pslug]["jsonld_prices"][0])
    others = []
    for s in comp.get("sources", []):
        try:
            others.append(float(str(s["price"]).replace("\u00a3","").replace(",","")))
        except Exception:
            pass
    if not others:
        print(f"  {cid:24s} new={price:8.2f}  (no comparison data)"); continue
    others.sort()
    med = others[len(others)//2]
    flag = ""
    if price > 3*med: flag = "  <-- >3x median"
    elif price < med/3: flag = "  <-- <1/3 median"
    print(f"  {cid:24s} new={price:8.2f} med={med:8.2f} n={len(others):3d}{flag}")
