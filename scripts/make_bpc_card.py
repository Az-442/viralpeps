"""Composite BPC-157 vial onto guide card with correct text overlay."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/Users/time4you/viralpeps/public/images/guides"
VIAL = "/tmp/bpc157-vial.png"
W, H = 1200, 675

img = Image.new("RGB", (W, H), "#f0f5ff")
draw = ImageDraw.Draw(img)

# Gradient bg
for y in range(H):
    r = int(240 - (y / H) * 40)
    g = int(245 - (y / H) * 30)
    b = int(255 - (y / H) * 20)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Decorative circles
draw.ellipse((-80, -80, 160, 160), fill=(220, 235, 255, 130))
draw.ellipse((W - 120, H - 120, W + 40, H + 40), fill=(200, 225, 250, 100))

# Paste BPC-157 vial on left
vial = Image.open(VIAL).convert("RGBA")
vial_h = 260
vial_w = int(vial.width * vial_h / vial.height)
vial = vial.resize((vial_w, vial_h), Image.LANCZOS)
vx = 200 - vial_w // 2
vy = H // 2 - vial_h // 2 + 10
img.paste(vial, (vx, vy), vial)

# Text right side
tx = 420
ty = 150

# Brand badge
draw.rounded_rectangle([tx, ty, tx + 85, ty + 12], radius=6, fill="#2563eb")
draw.text((tx + 15, ty - 1), "COMPOUND PROFILE", fill="white")

ty += 36

# Title
draw.text((tx, ty), "BPC-157", fill="#0f172a")
ty += 44

# Subheading
draw.text((tx, ty), "Research Summary", fill="#2563eb")
ty += 34

# Description
desc = "Overview of BPC-157, its research applications, dosing protocols, and current literature."
words = desc.split()
lines = []
current = ""
for w in words:
    test = current + (" " if current else "") + w
    bb = draw.textbbox((0, 0), test)
    if bb[2] - bb[0] <= W - tx - 40:
        current = test
    else:
        lines.append(current)
        current = w
if current:
    lines.append(current)
for line in lines:
    draw.text((tx, ty), line, fill="#64748b")
    ty += 22

# Footer
draw.text((tx, H - 40), "viralpeps.co.uk", fill="#94a3b8")

out_path = f"{OUT}/bpc157-summary.png"
img.save(out_path, "PNG")
print(f"✓ bpc157-summary.png saved")
