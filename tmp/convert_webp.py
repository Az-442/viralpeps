#!/usr/bin/env python3
import subprocess, os
# Convert src-*.png (already downloaded into spx-labs dir) to final {name}.webp
pairs = [
    "bpc-157","bpc-157-tb-500","cjc-1295-no-dac","cjc-1295-ipamorelin",
    "ghk-cu","ipamorelin","mots-c","retatrutide","retatrutide-20mg",
    "tb-500","tesamorelin","bacteriostatic-water",
]
dst="/Users/time4you/viralpeps/public/images/products/spx-labs"
for name in pairs:
    src=os.path.join(dst,f"src-{name}.png")
    out=os.path.join(dst,f"{name}.webp")
    if not os.path.exists(src):
        print(f"MISSING {src}"); continue
    r=subprocess.run(["sips","-s","format","webp",src,"--out",out],capture_output=True,text=True)
    ok=os.path.exists(out)
    print(f"{name}: webp={ok} {r.returncode}")
