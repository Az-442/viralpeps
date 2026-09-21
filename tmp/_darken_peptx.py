from PIL import Image
import numpy as np, os

# PeptX brand mark is pale gold (#C9A96A-ish) on transparent/cream.
# The vendor containers are bg-white, so remap the mid-tone gold to a dark
# charcoal that keeps the mark's identity (a "PX" monogram in a circle) but
# gives real contrast on white. Cream/off-white background -> pure white.

SRC = "public/images/vendors/peptx.png"
im = Image.open(SRC).convert("RGBA")
a = np.array(im).astype(np.float32)
r, g, b, alpha = a[..., 0], a[..., 1], a[..., 2], a[..., 3]

lum = 0.299 * r + 0.587 * g + 0.114 * b
# "ink" = anything meaningfully darker than the pale cream background
ink = np.clip((252.0 - lum) / 120.0, 0, 1) ** 0.85
ink = np.where(lum > 246, 0.0, ink)          # kill near-white background
ink = np.where(lum < 120, 1.0, ink)          # already-dark pixels stay solid

# brand charcoal (matches site's #0b1a2e / #1a2d4a palette family) + gold accent kept subtle
CHARCOAL = np.array([18, 28, 48], dtype=np.float32)

out = np.zeros_like(a)
out[..., 0] = 255 - (255 - CHARCOAL[0]) * ink
out[..., 1] = 255 - (255 - CHARCOAL[1]) * ink
out[..., 2] = 255 - (255 - CHARCOAL[2]) * ink
out[..., 3] = 255.0

res = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGBA")
# trim transparent/white padding, then pad to a clean square with margin
bbox = Image.fromarray((ink * 255).astype(np.uint8)).getbbox()
print("ink bbox:", bbox)
if bbox:
    res = res.crop(bbox)
w, h = res.size
side = max(w, h)
pad = int(side * 0.14)
canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (255, 255, 255, 255))
canvas.paste(res, ((side - w) // 2 + pad, (side - h) // 2 + pad), res)
canvas = canvas.resize((512, 512), Image.LANCZOS)
canvas.save("public/images/vendors/peptx.png", "PNG")
print("saved public/images/vendors/peptx.png", os.path.getsize("public/images/vendors/peptx.png"), "b", canvas.size)
