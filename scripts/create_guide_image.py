from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Open the vial image
vial = Image.open("public/images/compounds/tirzepatide-vial.png")
COMPOUND_NAME = "Tirzepatide"
DOSAGE = "10mg"
CATEGORY = "Compound Profile"
SUBHEADING = "Research Summary"
DESCRIPTION_LINES = [
    "Overview of Tirzepatide, a dual GIP/GLP-1 receptor",
    "agonist for research into type 2 diabetes, obesity,",
    "MASH/NASH, and cardiovascular outcomes.",
]
OUTPUT_PATH = "public/images/guides/tirzepatide-summary.png"

# Create a canvas for the guide card - 1200x675 (16:9) like the existing one
card_w, card_h = 1200, 675
card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Background gradient (subtle blue to white)
for y in range(card_h):
    ratio = y / card_h
    r = int(245 - ratio * 15)
    g = int(248 - ratio * 15)
    b = int(255 - ratio * 15)
    draw.point((0, y), fill=(r, g, b))
    for x in range(1, card_w):
        draw.point((x, y), fill=(r, g, b))

# Decorative subtle blue circles
draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
draw.ellipse([card_w-180, card_h-180, card_w+80, card_h+80], fill=(240, 245, 255))

# Paste the vial image - resize and position on the left
vial_ratio = vial.width / vial.height
target_h = int(card_h * 0.8)
target_w = int(target_h * vial_ratio)

# Cap width so it doesn't overflow into text area
if target_w > card_w // 2 - 40:
    target_w = card_w // 2 - 60
    target_h = int(target_w / vial_ratio)

vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)

# Position vial on left side with padding
vial_x = 50
vial_y = (card_h - target_h) // 2

# Paste vial (handle transparency)
if vial.mode == 'RGBA':
    card.paste(vial_resized, (vial_x, vial_y), vial_resized)
else:
    card.paste(vial_resized, (vial_x, vial_y))

# Try to load fonts
font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
helvetica_bold = os.path.join(font_dir, "Helvetica.ttc")
sf_pro = os.path.join(font_dir, "SFNSDisplay.ttf")

title_font_path = sf_pro if os.path.exists(sf_pro) else helvetica
body_font_path = helvetica if os.path.exists(helvetica) else None

if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 54, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 30)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 20)
    small_font = ImageFont.truetype(helvetica, 16)
    tiny_font = ImageFont.truetype(helvetica, 12)
else:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    body_font = ImageFont.load_default()
    small_font = ImageFont.load_default()
    tiny_font = ImageFont.load_default()

# Text area starting position
text_x = vial_x + target_w + 50

# Category badge
badge_x, badge_y = text_x, 140
draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=(37, 99, 235))
draw.text((text_x, badge_y + 15), CATEGORY, fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title
title_y = badge_y + 55
draw.text((text_x, title_y), COMPOUND_NAME, fill=(15, 30, 50), font=title_font)

# Subtitle
subtitle_y = title_y + 70
draw.text((text_x, subtitle_y), SUBHEADING, fill=(37, 99, 235), font=subtitle_font)

# Description
y_off = subtitle_y + 60
for line in DESCRIPTION_LINES:
    draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
    y_off += 30

# ViralPeps branding at bottom
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

# Blue accent stripe at very bottom
draw.rounded_rectangle([0, card_h-4, card_w, card_h], radius=0, fill=(37, 99, 235))

# Save
out_path = OUTPUT_PATH
card.save(out_path, "PNG", quality=97)
print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")
print(f"Size: {card.size}")
