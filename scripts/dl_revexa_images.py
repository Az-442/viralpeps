#!/usr/bin/env python3
"""Download Revexa product images from Wix CDN at full size, save as .webp.
Maps each Revexa product to the internal compound slug used in compounds.json.
"""
import json
import os
import subprocess
import sys

VENDOR = "revexa"
OUT = f"public/images/products/{VENDOR}"
os.makedirs(OUT, exist_ok=True)

# (revexa product name, image base url without /v1/, target filename slug)
PRODUCTS = [
    ("MOTS-C 40mg", "70dd52_6725ed47ecd14c9eae0942db3a7c7436~mv2.png", "mots-c-40mg"),
    ("Adamax 10mg", "70dd52_d2a96f8411164960a8f24feab58671ff~mv2.jpg", "adamax-10mg"),
    ("SNAP-8 10mg", "70dd52_594353bcd31344b28137a4b3128ee1f9~mv2.jpg", "snap-8-10mg"),
    ("AHK-Cu 50mg", "70dd52_0be7ec024bac487a970222de031cfc4a~mv2.jpg", "ahk-cu-50mg"),
    ("IGF-1 LR3 1mg", "70dd52_64fb433ae4ad480bab6860cbc24a1d25~mv2.jpg", "igf-1-lr3-1mg"),
    ("SS-31 10mg", "70dd52_924050e302014a159830b4e36631ae72~mv2.jpg", "ss-31-10mg"),
    ("KPV 10mg", "70dd52_285d6f1c216941c286762d4ca27826e9~mv2.jpg", "kpv-10mg"),
    ("DSIP 10mg", "70dd52_76404570c44146a4882582ade0150862~mv2.jpg", "dsip-10mg"),
    ("PT-141 10mg", "70dd52_3b6239a9d17e429fb5635dbf5d2b8d16~mv2.jpg", "pt-141-10mg"),
    ("Semax 10mg", "70dd52_f59a6429d7aa43f1ab91ec4801c81fe8~mv2.jpg", "semax-10mg"),
    ("Pinealon 10mg", "70dd52_8820d0a2cb8d42e5a2ee6d7533c9ae65~mv2.jpg", "pinealon-10mg"),
    ("Epitalon 10mg", "70dd52_2bb192f5272c4624a36563ffed3210c3~mv2.jpg", "epitalon-10mg"),
    ("Kisspeptin 5mg", "70dd52_e7bd5755f289434a9fd5d794c47e61ad~mv2.jpg", "kisspeptin-5mg"),
    ("Selank 10mg", "70dd52_245439809cb44d5795c12950193e300d~mv2.jpg", "selank-10mg"),
    ("Retatrutide 20mg 5-pack", "70dd52_9dfc743067594204a4bc2139df617f68~mv2.jpeg", "retatrutide-20mg-5pack"),
    ("Tirzepatide 20mg 5-pack", "70dd52_c0d986afe45445e89fccf8824094767b~mv2.jpg", "tirzepatide-20mg-5pack"),
    ("Tirzepatide 40mg 5-pack", "70dd52_f7b03ff963bf4b5587c908740fe8959a~mv2.jpg", "tirzepatide-40mg-5pack"),
    ("Retatrutide 40mg 5-pack", "70dd52_9dfc743067594204a4bc2139df617f68~mv2.jpeg", "retatrutide-40mg-5pack"),
    ("Klow Blend 80mg", "70dd52_fe57747b113749c5a85a5b5535cbc424~mv2.jpg", "klow-blend-80mg"),
    ("5-Amino-1MQ 10mg", "70dd52_7930f140b1e748bf8cced938f69a58a0~mv2.jpg", "5-amino-1mq-10mg"),
    ("DSIP 5mg", "70dd52_88e03c7d8c2e4ec1a5a4fa01494e4881~mv2.jpg", "dsip-5mg"),
    ("MOTS-C 10mg", "70dd52_3ad53965272044ebb3ab038ebc7c2d87~mv2.jpg", "mots-c-10mg"),
    ("Tesamorelin 10mg", "70dd52_c22934f9eb0849b68a83236fecef9ce0~mv2.jpg", "tesamorelin-10mg"),
    ("Ipamorelin 10mg", "70dd52_eb8e146b61b3471299bb06b93fb8128c~mv2.jpg", "ipamorelin-10mg"),
    ("BPC-157 5mg", "70dd52_77e8f835f7354dd3a51b8bf28fb8d310~mv2.jpg", "bpc-157-5mg"),
    ("TB-500 5mg", "70dd52_2f490926869548dda3192db3726a58d5~mv2.jpg", "tb-500-5mg"),
    ("Tirzepatide 40mg", "70dd52_57c403972f454a398521569dbd1b8c6f~mv2.jpg", "tirzepatide-40mg"),
    ("Tirzepatide 30mg", "70dd52_87c5e70ea3b4497180943bf8e929ad10~mv2.jpg", "tirzepatide-30mg"),
    ("Tirzepatide 20mg", "70dd52_1d081dca25ef46109bd1120b0e94c540~mv2.jpg", "tirzepatide-20mg"),
    ("GHK-Cu 50mg", "70dd52_71426db06fed4fc6bde45c262df29c06~mv2.jpg", "ghk-cu-50mg"),
    ("NAD+ 1000mg", "70dd52_d7412fcef9944cd1bdd2965d8b1fcab6~mv2.jpg", "nad-plus-1000mg"),
    ("NAD+ 500mg", "70dd52_e85ac1810a754809be056d849aee5fdd~mv2.jpg", "nad-plus-500mg"),
    ("NAD+ 100mg", "70dd52_fe291b45b60a4300bb20f1210214e4d3~mv2.jpg", "nad-plus-100mg"),
    ("Retatrutide 30mg", "70dd52_3172efaeb8a84721aa8f0622977b6a0f~mv2.jpg", "retatrutide-30mg"),
    ("Retatrutide 20mg", "70dd52_2e576374bee64bd6ba56a3e7344ff342~mv2.jpg", "retatrutide-20mg"),
    ("Retatrutide 10mg", "70dd52_6566d041d909422f8f4d40a5c20bb250~mv2.jpg", "retatrutide-10mg"),
    ("Bacteriostatic Water 10ml", "70dd52_eb2f7310ab7248caace51db9d31f4c95~mv2.jpg", "bacteriostatic-water"),
    ("Retatrutide 40mg", "70dd52_06facb3873964ce3beef312845710307~mv2.jpg", "retatrutide-40mg"),
    ("Tirzepatide 10mg", "70dd52_312d6b8c53d243168fefa99e42cb6444~mv2.jpg", "tirzepatide-10mg"),
    ("BPC-157 10mg", "70dd52_989d21fcc5734cbc9272dd774fd9672b~mv2.jpg", "bpc-157-10mg"),
    ("TB-500 10mg", "70dd52_d93df68652634c4781ea61bd1340a669~mv2.jpg", "tb-500-10mg"),
    ("GHK-Cu 100mg", "70dd52_64025efda87b407aab73de32d5990f50~mv2.jpg", "ghk-cu-100mg"),
    ("Melanotan 2 10mg", "70dd52_6a9e3a902c514c04947b093ccc5b8931~mv2.jpg", "melanotan-2-10mg"),
]


def main():
    ok = fail = 0
    for name, media, slug in PRODUCTS:
        dest = os.path.join(OUT, f"{slug}.webp")
        # Wix CDN: append transform for a larger, non-blurred render
        url = (
            f"https://static.wixstatic.com/media/{media}"
            f"/v1/fill/w_600,h_600,al_c,q_90,usm_0.66_1.00_0.01/{media}"
        )
        tmp = f"/tmp/rev_{slug}.img"
        r = subprocess.run(
            ["curl", "-sL", "-A", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
             "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
             url, "-o", tmp, "-w", "%{http_code}"],
            capture_output=True, text=True,
        )
        code = r.stdout.strip()
        size = os.path.getsize(tmp) if os.path.exists(tmp) else 0
        if code != "200" or size < 2000:
            print(f"FAIL {slug}: HTTP {code} size {size}")
            fail += 1
            continue
        # Convert to webp via sips->png then cwebp, or ImageMagick if present
        conv = subprocess.run(
            ["sips", "-s", "format", "webp", tmp, "--out", dest],
            capture_output=True, text=True,
        )
        if conv.returncode != 0 or not os.path.exists(dest):
            # fallback: keep as-is with correct extension (png/jpg) copy
            ext = os.path.splitext(media)[1].lstrip(".")
            alt = os.path.join(OUT, f"{slug}.{ext}")
            subprocess.run(["cp", tmp, alt], check=False)
            print(f"WARN {slug}: webp conv failed, saved .{ext} ({size/1024:.0f}KB)")
            ok += 1
            continue
        print(f"OK   {slug}.webp ({os.path.getsize(dest)/1024:.0f}KB)")
        ok += 1
    print(f"\n{ok} ok, {fail} failed")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
