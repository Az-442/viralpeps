#!/usr/bin/env python3
"""Convert any non-webp files in peptide-global dir to real webp via PIL."""
import os, glob
from PIL import Image
d = "public/images/products/peptide-global"
conv = 0
for f in sorted(glob.glob(os.path.join(d, "*.webp"))):
    with open(f, "rb") as fh:
        magic = fh.read(4)
    if magic == b"RIFF":
        continue
    try:
        im = Image.open(f).convert("RGB")
        im.save(f, "WEBP", quality=88, method=6)
        conv += 1
        print("converted", os.path.basename(f))
    except Exception as e:
        print("ERR", f, e)
print("converted:", conv)
# verify
bad = []
for f in sorted(glob.glob(os.path.join(d, "*.webp"))):
    with open(f, "rb") as fh:
        if fh.read(4) != b"RIFF":
            bad.append(os.path.basename(f))
print("total:", len(glob.glob(os.path.join(d,'*.webp'))), "still-not-webp:", bad)
