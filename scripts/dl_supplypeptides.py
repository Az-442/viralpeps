#!/usr/bin/env python3
"""Download SupplyPeptides product images + vendor logo for ViralPeps."""
import os, urllib.request, ssl

BASE = "https://cdn.shopify.com/s/files/1/1065/2483/6185/files/"

# (compound_slug, cdn_filename)
PRODUCTS = [
    ("retatrutide", "Retatrutide-10mg.png?v=1785070541"),
    ("tirzepatide", "Tirzepatide-10mg.png?v=1785070620"),
    ("semaglutide", "Semaglutide-10mg.png?v=1785070579"),
    ("ghk-cu", "GHK-Cu-50mg.png?v=1785070467"),
    ("bpc-157-tb-500", "BPC-157-TB-500-Mix-10mg.png?v=1785070436"),
    ("tesamorelin", "Tesamorelin-5mg.png?v=1785070605"),
    ("semax", "Semax-5mg.png?v=1785070585"),
    ("selank", "Selank-5mg.png?v=1785070570"),
    ("klow", "KLOW-80mg.png?v=1785070497"),
    ("igf-1-lr3", "IGF-LR3-1mg.png?v=1785070482"),
    ("mots-c", "MOTS-c-10mg.png?v=1785070503"),
    ("pt-141-bremelanotide", "PT-141-10mg.png?v=1785070529"),
    ("ss-31", "SS-31-10mg.png?v=1785070560"),
    ("tb-500", "TB-500-5mg.png?v=1785070595"),
    ("nad-plus", "NAD-500mg.png?v=1785070524"),
    ("ipamorelin", "Ipamorelin-5mg.png?v=1785070487"),
    ("melanotan-ii", "Melanotan-2-10mg.png?v=1785070519"),
    ("pinealon", "Pinealon-10mg.png?v=1785070535"),
    ("glow", "GLOW-70mg.png?v=1785070477"),
    ("cjc-1295", "CJC-1295-No-DAC-5mg.png?v=1785070447"),
    ("cjc-1295-ipamorelin-blend", "CJC-1295-Ipamorelin-Mix-10mg.png?v=1785070442"),
]

LOGO_URL = "https://cdn.shopify.com/oxygen-v2/58028/160950/329228/4070989/assets/supply-peptides-logo-DdlrPkvP.png"

OUT_DIR = "public/images/products/supply-peptides"
LOGO_DIR = "public/images/vendors"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(LOGO_DIR, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def dl(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as r, open(dest, "wb") as f:
        f.write(r.read())
    size = os.path.getsize(dest)
    print(f"OK {size:>7}B  {dest}")
    return size

# Download product images as .webp (convert inline via re-encode if PIL available)
try:
    from PIL import Image
    HAVE_PIL = True
except Exception:
    HAVE_PIL = False

for slug, fname in PRODUCTS:
    tmp = f"/tmp/sp_{slug}.png"
    try:
        dl(BASE + fname, tmp)
        if HAVE_PIL:
            img = Image.open(tmp).convert("RGB")
            dest = f"{OUT_DIR}/{slug}.webp"
            img.save(dest, "WEBP", quality=88)
            print(f"   -> WEBP {os.path.getsize(dest):>7}B  {dest}")
            os.remove(tmp)
        else:
            dest = f"{OUT_DIR}/{slug}.png"
            os.replace(tmp, dest)
    except Exception as e:
        print(f"FAIL {slug}: {e}")

# Logo
try:
    dl(LOGO_URL, f"{LOGO_DIR}/supply-peptides.png")
except Exception as e:
    print(f"FAIL logo: {e}")

print("DONE")
