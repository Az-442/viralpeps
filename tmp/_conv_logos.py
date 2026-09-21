from PIL import Image
import os

jobs = [
 ("public/images/vendors/vialverse.jpg", "public/images/vendors/vialverse.png"),
 ("public/images/vendors/peptx.webp", "public/images/vendors/peptx.png"),
]
for src, dst in jobs:
    im = Image.open(src)
    print(src, im.mode, im.size)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im2 = im.convert("RGBA")
        bg.paste(im2, mask=im2.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    im.save(dst, "PNG")
    print("  ->", dst, os.path.getsize(dst), "bytes")

# report all three logos
for f in ["vialverse.png", "kings-bio-labs.png", "peptx.png"]:
    p = f"public/images/vendors/{f}"
    if os.path.exists(p):
        im = Image.open(p)
        print(f"{f:24} {im.mode} {im.size} {os.path.getsize(p)}b")
    else:
        print(f"{f:24} MISSING")
