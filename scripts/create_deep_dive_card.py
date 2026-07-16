"""Create a single deep dive card image (purple template).
Edit the CONFIG block below for your compound, then run:
    python3 scripts/create_deep_dive_card.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ===================== CONFIG =====================
COMPOUND = "GHK-Cu"
VIAL_PATH = "public/images/compounds/ghk-cu-vial.png"
OUTPUT_PATH = "public/images/guides/ghkcu-deep-dive.png"
DESCRIPTION_LINES = [
    "Comprehensive deep dive into GHK-Cu,",
    "the copper-binding tripeptide that",
    "modulates over 4,000 genes. Wound",
    "healing, skin rejuvenation, and",
    "neuroprotection research.",
]
# ==================================================

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

card_w, card_h = 1200, 675
PURPLE = (124, 58, 237)

card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Purple-tinted gradient — every pixel
# Top: (248, 247, 255) → Bottom: (240, 238, 255)
for y in range(card_h):
    ratio = y / card_h
    r = int(248 - ratio * 8)
    g = int(247 - ratio * 9)
    b = int(255)
    for x in range(card_w):
        draw.point((x, y), fill=(r, g, b))

# Decorative circles — light lavender
draw.ellipse([-80, -80, 250, 250], fill=(237, 233, 254))
draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(237, 233, 254))

# Vial
if os.path.exists(VIAL_PATH):
    vial = Image.open(VIAL_PATH)
    vial_ratio = vial.width / vial.height
    target_h = int(card_h * 0.8)
    target_w = int(target_h * vial_ratio)
    if target_w > card_w // 2 - 40:
        target_w = card_w // 2 - 60
        target_h = int(target_w / vial_ratio)
    vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
    vial_x, vial_y = 50, (card_h - target_h) // 2
    if vial.mode == "RGBA":
        card.paste(vial_resized, (vial_x, vial_y), vial_resized)
    else:
        card.paste(vial_resized, (vial_x, vial_y))
else:
    vial_x, target_w = 50, 0

text_x = vial_x + target_w + 50

# Badge — purple
badge_x, badge_y = text_x, 140
draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=PURPLE)
draw.text((badge_x + 85, badge_y + 15), "Deep Dive Report", fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title
draw.text((text_x, badge_y + 55), COMPOUND, fill=(15, 30, 50), font=title_font)

# Subtitle — purple
draw.text((text_x, badge_y + 125), "Deep Dive", fill=PURPLE, font=subtitle_font)

# Description
y_off = badge_y + 185
for line in DESCRIPTION_LINES:
    draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
    y_off += 30

# Footer
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

# Purple accent stripe
draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=PURPLE)

card.save(OUTPUT_PATH, "PNG", quality=97)
print(f"Saved: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)")
