#!/usr/bin/env python3
"""Download Peptide Global product images (og:image → .webp)."""
import json, re, ssl, urllib.request, os, hashlib

ctx = ssl._create_unverified_context()
HDRS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36", "Accept-Language": "en-GB,en;q=0.9"}
SLUG = "peptide-global"
OUT = f"public/images/products/{SLUG}"
os.makedirs(OUT, exist_ok=True)

data = json.load(open("tmp/_pg_scrape.json"))
# Map product slug -> compound slug (for file naming)
MAP = {
 "mt2-pen": "melanotan-ii",
 "glow-peptide-pen": "glow",
 "ghk-cu-pen": "ghk-cu-pen",
 "klow-pen": "klow-pen",
 "mots-c-pen": "mots-c-pen",
 "tesamorelin-pen": "tesamorelin-pen",
 "bpc-157-tb-500-pen": "bpc-157-tb-500-pen",
 "semax-pen": "semax-pen",
 "selank-pen": "selank-pen",
 "ipamorelin-pen": "ipamorelin-pen",
 "ghk-cu-50mg-vial": "ghk-cu-50mg",
 "ghk-cu-100mg-vial": "ghk-cu-100mg",
 "bpc-157-5mg-vial": "bpc-157-5mg",
 "bpc-157-10mg-vial": "bpc-157-10mg",
 "tb-500-5mg-vial": "tb-500-5mg",
 "tb-500-10mg-vial": "tb-500-10mg",
 "ipamorelin-5mg-vial": "ipamorelin-5mg",
 "ipamorelin-10mg-vial": "ipamorelin-10mg",
 "bacteriostatic-water-10ml": "bacteriostatic-water-10ml",
 "bacteriostatic-water-3ml": "bacteriostatic-water-3ml",
 "acetic-acid-water-10ml": "acetic-acid-10ml",
 "cjc-1295-no-dac-5mg-vial": "cjc-1295-no-dac-5mg",
 "cjc-1295-dac-2mg-vial": "cjc-1295-dac-2mg",
 "selank-5mg-vial": "selank-5mg",
 "selank-10mg-vial": "selank-10mg",
 "semax-5mg-vial": "semax-5mg",
 "semax-10mg-vial": "semax-10mg",
 "epithalon-10mg-vial": "epitalon-10mg",
 "mots-c-10mg-vial": "mots-c-10mg",
 "dsip-5mg-vial": "dsip-5mg",
 "pinealon-10mg-vial": "pinealon-10mg",
 "kisspeptin-10-5mg-vial": "kisspeptin-10-5mg",
}

results = []
for p in data:
    slug = p["url"].split("/product/")[-1].strip("/")
    name = MAP.get(slug, slug)
    img = p.get("og_image", "")
    if not img:
        print("NO IMAGE", slug); continue
    dest = os.path.join(OUT, f"{name}.webp")
    try:
        req = urllib.request.Request(img, headers=HDRS)
        raw = urllib.request.urlopen(req, timeout=30, context=ctx).read()
        open(dest, "wb").write(raw)
        md5 = hashlib.md5(raw).hexdigest()
        magic = raw[:4]
        print(f"{'OK ' if magic in (b'RIFF',) else 'BAD'} {name:28s} {len(raw):8d} bytes md5={md5[:10]} src={img.split('/')[-1]}")
        results.append({"slug": name, "url": p["url"], "file": dest, "bytes": len(raw), "md5": md5, "src": img})
    except Exception as e:
        print("ERR", name, str(e)[:70])

json.dump(results, open("tmp/_pg_images.json", "w"), indent=2)
print("\nDownloaded:", len(results))
md5s = [r["md5"] for r in results]
print("unique MD5s:", len(set(md5s)), "of", len(md5s))
