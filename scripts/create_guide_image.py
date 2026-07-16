from PIL import Image, ImageDraw, ImageFont
import os

# === CONFIG ===
COMPOUND = "PT-141"
DOSAGE = "10mg"
CATEGORY = "Compound Profile"
SUBHEADING = "Research Summary"
DESCRIPTION_LINES = [
    "Overview of PT-141 (Bremelanotide), an",
    "FDA-approved melanocortin receptor agonist",
    "for HSDD research.",
]
VIAL_SOURCE = "public/images/compounds/pt-141-vial.png"
OUTPUT_PATH = "public/images/guides/pt141-research-summary.png"
# ==============

card_w, card_h = 1200, 675
card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Background gradient (light blue-gray — matching BPC-157 original)
for y in range(card_h):
    ratio = y / card_h
    r = int(245 - ratio * 15)
    g = int(248 - ratio * 15)
    b = int(255 - ratio * 15)
    pt = (r, g, b)
    for x in range(card_w):
        card.putpixel((x, y), pt)

# Decorative circles (soft blue)
draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

# Load vial image and crop to actual vial bounds (remove white padding)
vial = Image.open(VIAL_SOURCE)
w, h = vial.size

# Find actual vial bounding box (non-white pixels)
min_x, max_x = w, 0
min_y, max_y = h, 0
for y in range(h):
    for x in range(w):
        px = vial.getpixel((x, y))
        if not (px[0] > 245 and px[1] > 245 and px[2] > 245):
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

# Crop to vial bounds
vial_cropped = vial.crop((min_x, min_y, max_x + 1, max_y + 1))

# Resize - make it proportional to card height, but smaller than full card width
vial_w, vial_h = vial_cropped.size
vial_ratio = vial_w / vial_h

# Target height (same as original make_card_image pattern)
target_h = int(card_h * 0.78)
target_w = int(target_h * vial_ratio)

# Ensure it doesn't exceed half the card minus margin
max_w = card_w // 2 - 60
if target_w > max_w:
    target_w = max_w
    target_h = int(target_w / vial_ratio)

vial_resized = vial_cropped.resize((target_w, target_h), Image.LANCZOS)

# Position vial on left with some padding
vial_x, vial_y = 55, (card_h - target_h) // 2

# Paste - no white background will extend beyond vial
card.paste(vial_resized, (vial_x, vial_y))

# Load fonts
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

# Text area start — after vial right edge + gap
text_x = vial_x + target_w + 50

# Category badge (blue pill)
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
for line in DESCRIPTION_LINES:
    draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
    y_off += 30

# Footer
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

# Blue accent stripe
draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

# Save
card.save(OUTPUT_PATH, "PNG", quality=97)
print(f"Saved: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)")
print(f"Vial cropped to {vial_w}x{vial_h}, resized to {target_w}x{target_h}, placed at x={vial_x}")
print(f"Text starts at x={text_x}, vial right edge = {vial_x + target_w}")
