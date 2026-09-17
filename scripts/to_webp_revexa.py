#!/usr/bin/env python3
"""Convert the downloaded Revexa product images (jpg/png/jpeg) to .webp."""
import os

from PIL import Image

OUT = "public/images/products/revexa"

converted = 0
for fn in sorted(os.listdir(OUT)):
    ext = os.path.splitext(fn)[1].lower()
    if ext == ".webp":
        continue
    if ext not in (".jpg", ".jpeg", ".png"):
        continue
    src = os.path.join(OUT, fn)
    dest = os.path.join(OUT, os.path.splitext(fn)[0] + ".webp")
    try:
        im = Image.open(src)
        if im.mode in ("RGBA", "P", "LA"):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGB")
        im.save(dest, "WEBP", quality=88, method=5)
        os.remove(src)
        print(f"OK {dest} ({os.path.getsize(dest)//1024}KB)")
        converted += 1
    except Exception as e:  # noqa: BLE001
        print(f"FAIL {src}: {e}")

print(f"\n{converted} converted")
