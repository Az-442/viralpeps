"""Generate PT-141 card matching Ipamorelin/TB-500/AOD/CJC design exactly.
- Large vial (540px) filling left panel
- Gradient background matching all other compound profiles
- Text column at vial-right-edge + 50px
- Consistent badge, colors, spacing"""

from PIL import Image, ImageDraw, ImageFont
import os

# === CONFIG ===
COMPOUND = "PT-141"
DOSAGE = "10mg"
CATEGORY = "Compound Profile"
SUBHEADING = "Research Summary"
DESC_LINES = [
    "Overview of PT-141 (Bremelanotide), an",
    "FDA-approved melanocortin receptor agonist",
    "for HSDD research.",
]
VIAL_SRC = "public/images/compounds/pt-141-vial.png"
OUTPUT = "public/images/guides/pt141-research-summary.png"
# ==============

card_w, card_h = 1200, 675
card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Background gradient — exactly matching BPC-157 output
for y in range(card_h):
    ratio = y / card_h
    r = int(245 - ratio * 14)
    g = int(248 - ratio * 14)
    b = int(255 - ratio * 14)
    for x in range(0, card_w, 4):
        draw.point((x, y), fill=(r, g, b))

# Decorative circles
draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

# Vial — make white pixels transparent so vial floats on gradient
vial = Image.open(VIAL_SRC).convert("RGBA")
data = vial.getdata()
new_data = []
for item in data:
    r, g, b, a = item
    # If nearly white, make transparent
    if r > 248 and g > 248 and b > 248:
        new_data.append((r, g, b, 0))
    else:
        new_data.append(item)
vial.putdata(new_data)

vial_ratio = vial.width / vial.height
target_h = int(card_h * 0.88)  # 594px — large enough to fill panel
target_w = int(target_h * vial_ratio)
if target_w > card_w // 2 - 40:
    target_w = card_w // 2 - 60
    target_h = int(target_w / vial_ratio)
vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
vial_x, vial_y = 50, (card_h - target_h) // 2
card.paste(vial_resized, (vial_x, vial_y), vial_resized)

# Fonts
font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 54, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 30)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 20)
    small_font = ImageFont.truetype(helvetica, 16)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

# Text area — starts at vial right edge + 50px gap
text_x = vial_x + target_w + 50

# Category badge
BLUE = (37, 99, 235)
badge_x, badge_y = text_x, 140
draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
draw.text((badge_x + 85, badge_y + 15), CATEGORY, fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title
draw.text((text_x, badge_y + 55), COMPOUND, fill=(15, 30, 50), font=title_font)

# Subtitle
draw.text((text_x, badge_y + 125), SUBHEADING, fill=BLUE, font=subtitle_font)

# Description
y_off = badge_y + 185
for line in DESC_LINES:
    draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
    y_off += 30

# Footer
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

# Blue accent stripe
draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

# Save
card.save(OUTPUT, "PNG", quality=97)
print(f"Saved: {OUTPUT} ({os.path.getsize(OUTPUT)} bytes)")
print(f"Vial: {target_w}x{target_h} at x={vial_x}, text_x={text_x}")
