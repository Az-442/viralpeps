from PIL import Image
import os

src = "tmp/img/logo_source.webp"
out = "public/images/vendors/tested-peptides.png"
img = Image.open(src).convert("RGBA")
# Relatively wide logo; scale to fit nicely. Keep aspect ratio.
img.thumbnail((520, 260), Image.Resampling.LANCZOS)
# Paste onto white background for a clean card look (logo may be dark/coloured)
bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
bg.alpha_composite(img)
bg.convert("RGB").save(out, "PNG")
print("wrote", out, os.path.getsize(out), "bytes", img.size)
