#!/usr/bin/env python3
import subprocess, os
pairs = [
    "bpc-157","bpc-157-tb-500","cjc-1295-no-dac","cjc-1295-ipamorelin",
    "ghk-cu","ipamorelin","mots-c","retatrutide","retatrutide-20mg",
    "tb-500","tesamorelin","bacteriostatic-water",
]
dst="/Users/time4you/viralpeps/public/images/products/spx-labs"
ffmpeg=os.path.expanduser("~/.local/bin/ffmpeg")
for name in pairs:
    src=os.path.join(dst,f"src-{name}.png")
    out=os.path.join(dst,f"{name}.webp")
    if not os.path.exists(src):
        print(f"MISSING {src}"); continue
    if os.path.exists(out): os.remove(out)
    r=subprocess.run([ffmpeg,"-y","-i",src,"-quality","90",out],capture_output=True,text=True)
    ok=os.path.exists(out)
    sz=os.path.getsize(out) if ok else 0
    print(f"{name}: ok={ok} size={sz} rc={r.returncode}")
