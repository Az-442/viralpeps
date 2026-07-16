"""Generate PT-141 card matching the EXACT same design as BPC-157 original.
- Small transparent vial (RGBA mask)
- Centered in left panel
- Text column at x=420
- Identical gradient, badge, colors, spacing"""

from PIL import Image, ImageDraw, ImageFont
import os, math

# === CONFIG ===
COMPOUND = "PT-141"
DOSAGE = "10mg"
CATEGORY = "Compound Profile"
SUBHEADING = "Research Summary"
DESC = "Overview of PT-141 (Bremelanotide), an FDA-approved melanocortin receptor agonist for HSDD research."
VIAL_SRC = "public/images/compounds/pt-141-vial.png"
OUTPUT = "public/images/guides/pt141-research-summary.png"
# ==============

W, H = 1200, 675
img = Image.new("RGB", (W, H), (230, 240, 255))
draw = ImageDraw.Draw(img)

# Gradient bg — same as BPC-157 original
for y in range(H):
    r = int(230 - (y / H) * 25)
    g = int(240 - (y / H) * 20)
    b = int(255 - (y / H) * 15)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Decorative circles
draw.ellipse((-80, -80, 160, 160), fill=(220, 235, 255, 130))
draw.ellipse((W - 120, H - 120, W + 40, H + 40), fill=(200, 225, 250, 100))

# Vial — convert to RGBA and use as mask for transparency
vial = Image.open(VIAL_SRC).convert("RGBA")
vial_h = 260
vial_w = int(vial.width * vial_h / vial.height)
vial = vial.resize((vial_w, vial_h), Image.LANCZOS)
vx = 200 - vial_w // 2
vy = H // 2 - vial_h // 2 + 10
img.paste(vial, (vx, vy), vial)

# Fonts
fdir = "/System/Library/Fonts"
if os.path.exists(fdir + "/Helvetica.ttc"):
    f_badge = ImageFont.truetype(fdir + "/Helvetica.ttc", 22)
    f_title = ImageFont.truetype(fdir + "/Helvetica.ttc", 42, index=1)
    f_sub   = ImageFont.truetype(fdir + "/Helvetica.ttc", 26)
    f_desc  = ImageFont.truetype(fdir + "/Helvetica.ttc", 18)
    f_foot  = ImageFont.truetype(fdir + "/Helvetica.ttc", 14)
else:
    f_badge = f_title = f_sub = f_desc = f_foot = ImageFont.load_default()

# Text column starts at x=420
tx = 420
ty = 150

# Category badge
BLUE = (37, 99, 235)
bw = draw.textbbox((0, 0), CATEGORY, font=f_badge)
bw = bw[2] - bw[0] + 28
draw.rounded_rectangle([tx, ty, tx + bw, ty + 32], radius=14, fill=BLUE)
draw.text((tx + 14, ty + 6), CATEGORY, fill="white", font=f_badge)

# Title
ty += 50
draw.text((tx, ty), COMPOUND, fill=(15, 30, 50), font=f_title)

# Subtitle
ty += 56
draw.text((tx, ty), SUBHEADING, fill=BLUE, font=f_sub)

# Description (wrapped)
ty += 44
max_w = W - tx - 40
desc_lines = []
for w in DESC.split():
    if not desc_lines:
        desc_lines.append(w)
    else:
        test = desc_lines[-1] + " " + w
        bb = draw.textbbox((0, 0), test, font=f_desc)
        if bb[2] - bb[0] <= max_w:
            desc_lines[-1] = test
        else:
            desc_lines.append(w)

for line in desc_lines:
    draw.text((tx, ty), line, fill=(100, 116, 139), font=f_desc)
    ty += 26

# Footer
draw.text((tx, H - 40), "viralpeps.co.uk", fill=(148, 163, 184), font=f_foot)

# Blue bottom stripe
draw.rounded_rectangle([0, H - 4, W, H], radius=0, fill=BLUE)

img.save(OUTPUT, "PNG", quality=97)
print(f"Saved: {OUTPUT} ({os.path.getsize(OUTPUT)} bytes)")
